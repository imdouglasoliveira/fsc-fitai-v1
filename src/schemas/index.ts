import { z } from "zod";

import { WeekDay } from "../generated/prisma/enums.js";

export const ErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
  statusCode: z.number(),
});

export const WorkoutPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  workoutDays: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      weekDay: z.enum(WeekDay),
      isRest: z.boolean(),
      estimatedDurationInSeconds: z.number(),
      coverImageUrl: z.string().nullable(),
      createdAt: z.date(),
      exercises: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          order: z.number(),
          sets: z.number(),
          reps: z.number(),
          restTimeInSeconds: z.number(),
          createdAt: z.date(),
        })
      ),
    })
  ),
});

export const StartWorkoutSessionResponseSchema = z.object({
  userWorkoutSessionId: z.string().uuid(),
});

export const WorkoutSessionResponseSchema = z.object({
  id: z.string().uuid(),
  startedAt: z.date(),
  completedAt: z.date().nullable(),
});