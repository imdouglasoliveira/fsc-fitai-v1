import { fromNodeHeaders } from "better-auth/node";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { NotFoundError } from "../errors/index.js";
import { WeekDay } from "../generated/prisma/enums.js";
import { auth } from "../lib/auth.js";
import { ErrorSchema, WorkoutPlanSchema } from "../schemas/index.js";
import { CreateWorkoutPlan, OutputDto } from "../usecases/CreateWorkoutPlan.js";

export const workoutPlanRoutes = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/",
    schema: {
      body: z.object({
        name: z.string().trim().min(1),
        description: z.string().optional(),
        workoutDays: z.array(
          z.object({
            name: z.string().trim().min(1),
            weekDay: z.enum(WeekDay),
            isRest: z.boolean().default(false),
            estimatedDurationInSeconds: z.number().min(1),
            coverImageUrl: z.string().url().optional(),
            exercises: z.array(
              z.object({
                name: z.string().trim().min(1),
                order: z.number().min(0).positive(),
                sets: z.number().min(1),
                reps: z.number().min(1),
                restTimeInSeconds: z.number().min(1),
              })
            ),
          })
        ),
      }),
      response: {
        201: WorkoutPlanSchema,
        400: ErrorSchema,
        401: ErrorSchema,
        404: ErrorSchema,
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
            error: "Unauthorized",
            statusCode: 401,
          });
        }

        const createWorkoutPlan = new CreateWorkoutPlan();
        const result: OutputDto = await createWorkoutPlan.execute({
          ...request.body,
          userId: session.user.id,
        });

        return reply.status(201).send(result);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            statusCode: 404,
          });
        }
        return reply.status(500).send({
          error: "Internal server error",
          statusCode: 500,
        });
      }
    },
  });
};