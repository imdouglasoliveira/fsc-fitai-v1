import { ConflictError, ForbiddenError, NotFoundError, WorkoutPlanNotActiveError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
}

export interface OutputDto {
  userWorkoutSessionId: string;
}

export class StartWorkoutSession {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    const workoutPlan = await this.db.workoutPlan.findUnique({
      where: { id: dto.workoutPlanId },
    });

    if (!workoutPlan) {
      throw new NotFoundError("Workout plan não encontrado.");
    }

    if (!workoutPlan.isActive) {
      throw new WorkoutPlanNotActiveError("Este plano de treino não está ativo.");
    }

    if (workoutPlan.userId !== dto.userId) {
      throw new ForbiddenError("Usuário não é dono do workout plan.");
    }

    const workoutDay = await this.db.workoutDay.findUnique({
      where: { id: dto.workoutDayId },
      include: {
        sessions: {
          where: {
            completedAt: null,
          }
        }
      }
    });

    if (!workoutDay || workoutDay.workoutPlanId !== dto.workoutPlanId) {
      throw new NotFoundError("Workout day não encontrado ou não pertence ao plan.");
    }

    if (workoutDay.sessions.length > 0) {
      throw new ConflictError("Dia já possui uma sessão em andamento.");
    }

    const sessionCreated = await this.db.workoutSession.create({
      data: {
        workoutDayId: dto.workoutDayId,
      },
    });

    return {
      userWorkoutSessionId: sessionCreated.id,
    };
  }
}
