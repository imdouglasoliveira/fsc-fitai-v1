import { openai } from "@ai-sdk/openai";
import { stepCountIs, streamText, tool } from "ai";
import { fromNodeHeaders } from "better-auth/node";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { WeekDay } from "../generated/prisma/enums.js";
import { auth } from "../lib/auth.js";
import { CreateWorkoutPlan } from "../usecases/CreateWorkoutPlan.js";
import { GetUserTrainData } from "../usecases/GetUserTrainData.js";
import { ListWorkoutPlans } from "../usecases/ListWorkoutPlans.js";
import { UpsertUserTrainData } from "../usecases/UpsertUserTrainData.js";

export const aiRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post("/chat", {
    schema: {
      body: z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string(),
          })
        ),
      }),
    },
    handler: async (request, reply) => {
      const session = await auth.api.getSession({
        headers: fromNodeHeaders(request.headers),
      });

      if (!session || !session.user) {
        return reply.status(401).send({
          error: "Usuário não autenticado",
          code: "UNAUTHORIZED",
          statusCode: 401,
        });
      }

      const userId = session.user.id;

      const result = streamText({
        model: openai("gpt-4o"),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages: request.body.messages as any,
        system: `Você é um personal trainer virtual especialista em montagem de planos de treino de musculação.
        Siga estas regras rigorosamente:
        - Tenha um tom amigável, motivador, linguagem simples e sem jargões técnicos. Seu público é leigo.
        - **SEMPRE** chame a ferramenta 'getUserTrainData' antes de qualquer interação para conhecer o usuário.
        - Se o usuário não tiver dados cadastrados (retorno null): pergunte nome, peso (kg), altura (cm), idade e % de gordura corporal em uma única mensagem direta. Quando receber, use a ferramenta 'updateUserTrainData' (converta o peso de kg para gramas).
        - Se o usuário já tiver dados: cumprimente-o pelo nome e pergunte como pode ajudar hoje.
        - Para criar um plano de treino: pergunte o objetivo (emagrecimento, hipertrofia, força), dias disponíveis por semana (ex: 3x, 5x) e se possui restrições físicas ou lesões.
        - Ao criar o plano via ferramenta 'createWorkoutPlan', ele DEVE ter exatamente 7 dias (MONDAY a SUNDAY).
        - Dias sem treino devem ter 'isRest: true', 'exercises: []' e 'estimatedDurationInSeconds: 0'.
        - Escolha a divisão de treino (Split) adequada:
          - 2-3 dias: Full Body ou ABC.
          - 4 dias: Upper/Lower ou ABCD.
          - 5 dias: PPLUL.
          - 6 dias: PPL 2x.
        - Princípios: músculos sinérgicos juntos, compostos primeiro, 4-8 exercícios por sessão, 3-4 séries, 8-12 reps (hipertrofia).
        - **Imagens de capa (coverImageUrl)**:
          - Dias Superiores: use 'https://gw8hy3fdcv.ufs.sh/f/ccoBDpLoAPCO3y8pQ6GBg8iqe9pP2JrHjwd1nfKtVSQskI0v' ou 'https://gw8hy3fdcv.ufs.sh/f/ccoBDpLoAPCOW3fJmqZe4yoUcwvRPQa8kmFprzNiC30hqftL'.
          - Dias Inferiores: use 'https://gw8hy3fdcv.ufs.sh/f/ccoBDpLoAPCOgCHaUgNGronCvXmSzAMs1N3KgLdE5yHT6Ykj' ou 'https://gw8hy3fdcv.ufs.sh/f/ccoBDpLoAPCO85RVu3morROwZk5NPhs1jzH7X8TyEvLUCGxY'.
          - Alterne entre as opções para variar. Dias de descanso usam imagem de superior.
        - Respostas curtas e objetivas.`,
        tools: {
          getUserTrainData: tool({
            description: "Busca os dados físicos do usuário (peso, altura, etc).",
            inputSchema: z.object({}),
            execute: async () => {
              const useCase = new GetUserTrainData();
              return useCase.execute({ userId });
            },
          }),
          updateUserTrainData: tool({
            description: "Cria ou atualiza os dados físicos do usuário.",
            execute: async (params) => {
              const useCase = new UpsertUserTrainData();
              return useCase.execute({ userId, ...params });
            },
            inputSchema: z.object({
              weightInGrams: z.number().describe("Peso em gramas (ex: 70kg = 70000)."),
              heightInCentimeters: z.number().describe("Altura em centímetros."),
              age: z.number().describe("Idade em anos."),
              bodyFatPercentage: z.number().describe("Percentual de gordura (ex: 0.15 para 15%)."),
            }),
          }),
          getWorkoutPlans: tool({
            description: "Lista os planos de treino existentes do usuário.",
            inputSchema: z.object({}),
            execute: async () => {
              const useCase = new ListWorkoutPlans();
              return useCase.execute({ userId });
            },
          }),
          createWorkoutPlan: tool({
            description: "Cria um novo plano de treino completo de 7 dias.",
            execute: async (params) => {
              const useCase = new CreateWorkoutPlan();
              return useCase.execute({ userId, ...params });
            },
            inputSchema: z.object({
              name: z.string().describe("Nome do plano de treino (ex: Hipertrofia Iniciante)."),
              workoutDays: z.array(
                z.object({
                  name: z.string().describe("Nome do dia (ex: Treino A - Superior)."),
                  weekDay: z.enum([
                    WeekDay.MONDAY,
                    WeekDay.TUESDAY,
                    WeekDay.WEDNESDAY,
                    WeekDay.THURSDAY,
                    WeekDay.FRIDAY,
                    WeekDay.SATURDAY,
                    WeekDay.SUNDAY,
                  ]),
                  isRest: z.boolean().describe("Se é dia de descanso."),
                  coverImageUrl: z.string().url(),
                  estimatedDurationInSeconds: z.number().describe("Duração estimada em segundos."),
                  exercises: z.array(
                    z.object({
                      name: z.string(),
                      order: z.number().int().min(1),
                      sets: z.number().int().min(1),
                      reps: z.number().int().min(1),
                      restTimeInSeconds: z.number().int().min(0),
                    })
                  ),
                })
              ),
            }),
          }),
        },
        stopWhen: stepCountIs(5),
      });

      return result.toTextStreamResponse();
    },
  });
};
