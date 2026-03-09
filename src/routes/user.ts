import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";

import { OnboardingAlreadyCompletedError } from "../errors/index.js";
import { getAuthenticatedUser } from "../lib/auth-utils.js";
import {
  CompleteOnboardingBodySchema,
  CompleteOnboardingResponseSchema,
  ErrorSchema,
  OnboardingStatusResponseSchema,
  UserTrainDataSchema,
} from "../schemas/index.js";
import { CompleteOnboarding } from "../usecases/CompleteOnboarding.js";
import { GetOnboardingStatus } from "../usecases/GetOnboardingStatus.js";
import { GetUserTrainData } from "../usecases/GetUserTrainData.js";
import { UpsertUserTrainData } from "../usecases/UpsertUserTrainData.js";

export const userRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/me",
    schema: {
      response: {
        200: UserTrainDataSchema.nullable(),
        401: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const user = await getAuthenticatedUser(request.headers);

        if (!user) {
          return reply.status(401).send({
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const getUserTrainData = new GetUserTrainData();
        const result = await getUserTrainData.execute({
          userId: user.id,
        });

        return reply.status(200).send(result);
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({
          error: "Erro interno",
          code: "INTERNAL_SERVER_ERROR",
          statusCode: 500,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/me/train-data",
    schema: {
      body: UserTrainDataSchema.omit({ userId: true, userName: true }),
      response: {
        200: UserTrainDataSchema.omit({ userName: true }),
        401: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const user = await getAuthenticatedUser(request.headers);

        if (!user) {
          return reply.status(401).send({
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const upsertUserTrainData = new UpsertUserTrainData();
        const result = await upsertUserTrainData.execute({
          userId: user.id,
          ...request.body,
        });

        return reply.status(200).send(result);
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({
          error: "Erro interno",
          code: "INTERNAL_SERVER_ERROR",
          statusCode: 500,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/onboarding",
    schema: {
      tags: ["User"],
      summary: "Complete user onboarding",
      body: CompleteOnboardingBodySchema,
      response: {
        201: CompleteOnboardingResponseSchema,
        401: ErrorSchema,
        409: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      console.log("DEBUG: Onboarding route called", request.url, request.headers.authorization);
      try {
        const user = await getAuthenticatedUser(request.headers);

        if (!user) {
          return reply.status(401).send({
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const completeOnboarding = new CompleteOnboarding();
        const result = await completeOnboarding.execute({
          userId: user.id,
          ...request.body,
        });

        return reply.status(201).send(result);
      } catch (err) {
        if (err instanceof OnboardingAlreadyCompletedError) {
          return reply.status(409).send({
            error: err.message,
            code: "ONBOARDING_ALREADY_COMPLETED_ERROR",
            statusCode: 409,
          });
        }
        request.log.error(err);
        return reply.status(500).send({
          error: "Erro interno",
          code: "INTERNAL_SERVER_ERROR",
          statusCode: 500,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/onboarding/status",
    schema: {
      tags: ["User"],
      summary: "Check if user has completed onboarding",
      response: {
        200: OnboardingStatusResponseSchema,
        401: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      try {
        const user = await getAuthenticatedUser(request.headers);

        if (!user) {
          return reply.status(401).send({
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const getOnboardingStatus = new GetOnboardingStatus();
        const result = await getOnboardingStatus.execute({
          userId: user.id,
        });

        return reply.status(200).send(result);
      } catch (err) {
        request.log.error(err);
        return reply.status(500).send({
          error: "Erro interno",
          code: "INTERNAL_SERVER_ERROR",
          statusCode: 500,
        });
      }
    },
  });
};
