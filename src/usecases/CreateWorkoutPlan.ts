import { NotFoundError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { WeekDay } from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  name: string;
  description?: string;
  workoutDays: Array<{
    name: string;
    weekDay: WeekDay;
    isRest: boolean;
    estimatedDurationInSeconds: number;
    coverImageUrl?: string;
    exercises: Array<{
      name: string;
      order: number;
      sets: number;
      reps: number;
      restTimeInSeconds: number;
    }>;
  }>;
}

export interface OutputDto {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  workoutDays: Array<{
    id: string;
    name: string;
    weekDay: WeekDay;
    isRest: boolean;
    estimatedDurationInSeconds: number;
    coverImageUrl: string | null;
    createdAt: Date;
    exercises: Array<{
      id: string;
      name: string;
      order: number;
      sets: number;
      reps: number;
      restTimeInSeconds: number;
      createdAt: Date;
    }>;
  }>;
}

export class CreateWorkoutPlan {
  constructor(private readonly db: PrismaClient = prisma) {}
  async execute(dto: InputDto): Promise<OutputDto> {
    // Transaction - Atomicidade
    return this.db.$transaction(
      async (
        tx: Omit<
          PrismaClient,
          | "$connect"
          | "$disconnect"
          | "$on"
          | "$transaction"
          | "$use"
          | "$extends"
        >,
      ) => {
        const user = await tx.user.findUnique({
          where: { id: dto.userId },
        });

        if (!user) {
          throw new NotFoundError("Usuário não encontrado.");
        }

        const existingWorkoutPlan = await tx.workoutPlan.findFirst({
          where: {
            userId: dto.userId,
            isActive: true,
          },
        });
        if (existingWorkoutPlan) {
          await tx.workoutPlan.update({
            where: {
              id: existingWorkoutPlan.id,
            },
            data: {
              isActive: false,
            },
          });
        }

        const result = await tx.workoutPlan.create({
          data: {
            userId: dto.userId,
            name: dto.name,
            description: dto.description ?? "",
            workoutDays: {
              create: dto.workoutDays.map((workoutDay) => ({
                name: workoutDay.name,
                weekDay: workoutDay.weekDay,
                isRest: workoutDay.isRest,
                estimatedDurationInSeconds:
                  workoutDay.estimatedDurationInSeconds,
                coverImageUrl: workoutDay.coverImageUrl,
                exercises: {
                  create: workoutDay.exercises.map((exercise) => ({
                    name: exercise.name,
                    order: exercise.order,
                    sets: exercise.sets,
                    reps: exercise.reps,
                    restTimeInSeconds: exercise.restTimeInSeconds,
                  })),
                },
              })),
            },
          },
          include: {
            workoutDays: {
              include: {
                exercises: true,
              },
            },
          },
        });

        const output: OutputDto = {
          id: result.id,
          name: result.name,
          description: result.description,
          createdAt: result.createdAt,
          workoutDays: result.workoutDays.map((day) => ({
            id: day.id,
            name: day.name,
            weekDay: day.weekDay,
            isRest: day.isRest,
            estimatedDurationInSeconds: day.estimatedDurationInSeconds,
            coverImageUrl: day.coverImageUrl,
            createdAt: day.createdAt,
            exercises: day.exercises.map((exercise) => ({
              id: exercise.id,
              name: exercise.name,
              order: exercise.order,
              sets: exercise.sets,
              reps: exercise.reps,
              restTimeInSeconds: exercise.restTimeInSeconds,
              createdAt: exercise.createdAt,
            })),
          })),
        };

        return output;
      },
    );
  }
}
