import { fromNodeHeaders } from "better-auth/node";
import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

import { ConflictError, ForbiddenError, NotFoundError, WorkoutPlanNotActiveError } from "../errors/index.js";
import { WeekDay } from "../generated/prisma/enums.js";
import { auth } from "../lib/auth.js";
import {
  ErrorSchema,
  ExerciseSetLogSchema,
  LogExerciseSetBodySchema,
  SessionSetLogsResponseSchema,
  StartWorkoutSessionResponseSchema,
  WorkoutDayDetailsResponseSchema,
  WorkoutPlanDetailsResponseSchema,
  WorkoutPlanSchema,
  WorkoutSessionResponseSchema,
} from "../schemas/index.js";
import { CreateWorkoutPlan, OutputDto } from "../usecases/CreateWorkoutPlan.js";
import { FinishWorkoutSession } from "../usecases/FinishWorkoutSession.js";
import { GetSessionSetLogs } from "../usecases/GetSessionSetLogs.js";
import { GetWorkoutDayDetails } from "../usecases/GetWorkoutDayDetails.js";
import { GetWorkoutPlanDetails } from "../usecases/GetWorkoutPlanDetails.js";
import { LogExerciseSet } from "../usecases/LogExerciseSet.js";
import { StartWorkoutSession } from "../usecases/StartWorkoutSession.js";

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
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
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
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
          });
        }
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
    url: "/:workoutPlanId/days/:workoutPlanDayId/sessions",
    schema: {
      params: z.object({
        workoutPlanId: z.string().uuid(),
        workoutPlanDayId: z.string().uuid(),
      }),
      response: {
        201: StartWorkoutSessionResponseSchema,
        400: ErrorSchema,
        401: ErrorSchema,
        403: ErrorSchema,
        404: ErrorSchema,
        409: ErrorSchema,
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

        const startWorkoutSession = new StartWorkoutSession();
        const result = await startWorkoutSession.execute({
          userId: session.user.id,
          workoutPlanId: request.params.workoutPlanId,
          workoutDayId: request.params.workoutPlanDayId,
        });

        return reply.status(201).send(result);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
          });
        }
        if (err instanceof ForbiddenError) {
          return reply.status(403).send({
            error: err.message,
            code: "FORBIDDEN_ERROR",
            statusCode: 403,
          });
        }
        if (err instanceof ConflictError) {
          return reply.status(409).send({
            error: err.message,
            code: "CONFLICT_ERROR",
            statusCode: 409,
          });
        }
        if (err instanceof WorkoutPlanNotActiveError) {
          return reply.status(400).send({
            error: err.message,
            code: "WORKOUT_PLAN_NOT_ACTIVE_ERROR",
            statusCode: 400,
          });
        }
        return reply.status(500).send({
          error: "Erro interno",
          code: "INTERNAL_SERVER_ERROR",
          statusCode: 500,
        });
      }
    },
  });

  app.withTypeProvider<ZodTypeProvider>().route({
    method: "PATCH",
    url: "/:workoutPlanId/days/:workoutPlanDayId/sessions/:sessionId",
    schema: {
      params: z.object({
        workoutPlanId: z.string().uuid(),
        workoutPlanDayId: z.string().uuid(),
        sessionId: z.string().uuid(),
      }),
      body: z.object({
        completedAt: z.string().datetime(),
      }),
      response: {
        200: WorkoutSessionResponseSchema,
        401: ErrorSchema,
        403: ErrorSchema,
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
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const finishWorkoutSession = new FinishWorkoutSession();
        const result = await finishWorkoutSession.execute({
          userId: session.user.id,
          workoutPlanId: request.params.workoutPlanId,
          workoutDayId: request.params.workoutPlanDayId,
          sessionId: request.params.sessionId,
          completedAt: new Date(request.body.completedAt),
        });

        return reply.status(200).send(result);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
            });
        }
        if (err instanceof ForbiddenError) {
          return reply.status(403).send({
            error: err.message,
            code: "FORBIDDEN_ERROR",
            statusCode: 403,
          });
        }
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
    url: "/:id",
    schema: {
      params: z.object({
        id: z.string().uuid(),
      }),
      response: {
        200: WorkoutPlanDetailsResponseSchema,
        401: ErrorSchema,
        403: ErrorSchema,
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
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const getWorkoutPlanDetails = new GetWorkoutPlanDetails();
        const result = await getWorkoutPlanDetails.execute({
          userId: session.user.id,
          id: request.params.id,
        });

        return reply.status(200).send(result);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
          });
        }
        if (err instanceof ForbiddenError) {
          return reply.status(403).send({
            error: err.message,
            code: "FORBIDDEN_ERROR",
            statusCode: 403,
          });
        }
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
    url: "/:workoutPlanId/days/:workoutPlanDayId",
    schema: {
      params: z.object({
        workoutPlanId: z.string().uuid(),
        workoutPlanDayId: z.string().uuid(),
      }),
      response: {
        200: WorkoutDayDetailsResponseSchema,
        401: ErrorSchema,
        403: ErrorSchema,
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
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const getWorkoutDayDetails = new GetWorkoutDayDetails();
        const result = await getWorkoutDayDetails.execute({
          userId: session.user.id,
          workoutPlanId: request.params.workoutPlanId,
          workoutDayId: request.params.workoutPlanDayId,
        });

        return reply.status(200).send(result);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
          });
        }
        if (err instanceof ForbiddenError) {
          return reply.status(403).send({
            error: err.message,
            code: "FORBIDDEN_ERROR",
            statusCode: 403,
          });
        }
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
    url: "/:workoutPlanId/days/:workoutPlanDayId/sessions/:sessionId/sets",
    schema: {
      tags: ["Workout Session"],
      summary: "Log a completed exercise set",
      params: z.object({
        workoutPlanId: z.string().uuid(),
        workoutPlanDayId: z.string().uuid(),
        sessionId: z.string().uuid(),
      }),
      body: LogExerciseSetBodySchema,
      response: {
        201: ExerciseSetLogSchema,
        401: ErrorSchema,
        403: ErrorSchema,
        404: ErrorSchema,
        409: ErrorSchema,
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

        const logExerciseSet = new LogExerciseSet();
        const result = await logExerciseSet.execute({
          userId: session.user.id,
          workoutPlanId: request.params.workoutPlanId,
          workoutDayId: request.params.workoutPlanDayId,
          sessionId: request.params.sessionId,
          ...request.body,
        });

        return reply.status(201).send(result);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
          });
        }
        if (err instanceof ForbiddenError) {
          return reply.status(403).send({
            error: err.message,
            code: "FORBIDDEN_ERROR",
            statusCode: 403,
          });
        }
        if (err instanceof ConflictError) {
          return reply.status(409).send({
            error: err.message,
            code: "CONFLICT_ERROR",
            statusCode: 409,
          });
        }
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
    url: "/:workoutPlanId/days/:workoutPlanDayId/sessions/:sessionId/sets",
    schema: {
      tags: ["Workout Session"],
      summary: "List exercise set logs for a session",
      params: z.object({
        workoutPlanId: z.string().uuid(),
        workoutPlanDayId: z.string().uuid(),
        sessionId: z.string().uuid(),
      }),
      response: {
        200: SessionSetLogsResponseSchema,
        401: ErrorSchema,
        403: ErrorSchema,
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
            error: "Usuário não autenticado",
            code: "UNAUTHORIZED",
            statusCode: 401,
          });
        }

        const getSessionSetLogs = new GetSessionSetLogs();
        const result = await getSessionSetLogs.execute({
          userId: session.user.id,
          workoutPlanId: request.params.workoutPlanId,
          workoutDayId: request.params.workoutPlanDayId,
          sessionId: request.params.sessionId,
        });

        return reply.status(200).send(result.exercises);
      } catch (err) {
        request.log.error(err);
        if (err instanceof NotFoundError) {
          return reply.status(404).send({
            error: err.message,
            code: "NOT_FOUND_ERROR",
            statusCode: 404,
          });
        }
        if (err instanceof ForbiddenError) {
          return reply.status(403).send({
            error: err.message,
            code: "FORBIDDEN_ERROR",
            statusCode: 403,
          });
        }
        return reply.status(500).send({
          error: "Erro interno",
          code: "INTERNAL_SERVER_ERROR",
          statusCode: 500,
        });
      }
    },
  });
};
