import { fromNodeHeaders } from "better-auth/node";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { auth } from "../lib/auth.js";
import { ErrorSchema, HomeDataResponseSchema } from "../schemas/index.js";
import { GetHomeData } from "../usecases/GetHomeData.js";

export const homeRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "GET",
    url: "/:date",
    schema: {
      params: z.object({
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      }),
      response: {
        200: HomeDataResponseSchema,
        401: ErrorSchema,
        500: ErrorSchema,
      },
    },
    handler: async (request, reply) => {
      try {
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

        const getHomeData = new GetHomeData();
        const result = await getHomeData.execute({
          userId: session.user.id,
          date: request.params.date,
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
