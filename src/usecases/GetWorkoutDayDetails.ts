import { ForbiddenError, NotFoundError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { WeekDay } from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
}

export interface OutputDto {
  id: string;
  name: string;
  isRest: boolean;
  coverImageUrl?: string | null;
  estimatedDurationInSeconds: number;
  exercises: Array<{
    id: string;
    name: string;
    order: number;
    workoutDayId: string;
    sets: number;
    reps: number;
    restTimeInSeconds: number;
  }>;
  weekDay: WeekDay;
  sessions: Array<{
    id: string;
    workoutDayId: string;
    startedAt: Date;
    completedAt: Date | null;
  }>;
}

export class GetWorkoutDayDetails {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    const workoutPlan = await this.db.workoutPlan.findUnique({
      where: { id: dto.workoutPlanId },
    });

    if (!workoutPlan) {
      throw new NotFoundError("Workout plan não encontrado.");
    }

    if (workoutPlan.userId !== dto.userId) {
      throw new ForbiddenError("Usuário não é dono do workout plan.");
    }

    const workoutDay = await this.db.workoutDay.findUnique({
      where: { id: dto.workoutDayId },
      include: {
        exercises: {
          orderBy: {
            order: "asc",
          },
        },
        sessions: {
          orderBy: {
            startedAt: "desc",
          },
        },
      },
    });

    if (!workoutDay || workoutDay.workoutPlanId !== dto.workoutPlanId) {
      throw new NotFoundError("Dia de treino não encontrado no plano.");
    }

    return {
      id: workoutDay.id,
      name: workoutDay.name,
      isRest: workoutDay.isRest,
      coverImageUrl: workoutDay.coverImageUrl,
      estimatedDurationInSeconds: workoutDay.estimatedDurationInSeconds,
      weekDay: workoutDay.weekDay,
      exercises: workoutDay.exercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        order: ex.order,
        workoutDayId: ex.workoutDayId,
        sets: ex.sets,
        reps: ex.reps,
        restTimeInSeconds: ex.restTimeInSeconds,
      })),
      sessions: workoutDay.sessions.map((s) => ({
        id: s.id,
        workoutDayId: s.workoutDayId,
        startedAt: s.startedAt,
        completedAt: s.completedAt,
      })),
    };
  }
}
