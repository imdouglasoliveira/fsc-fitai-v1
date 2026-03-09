import { ForbiddenError, NotFoundError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
  completedAt: Date;
}

export interface OutputDto {
  id: string;
  startedAt: Date;
  completedAt: Date | null;
}

export class FinishWorkoutSession {
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
    });

    if (!workoutDay || workoutDay.workoutPlanId !== dto.workoutPlanId) {
      throw new NotFoundError("Workout day não encontrado ou não pertence ao plan.");
    }

    const session = await this.db.workoutSession.findUnique({
      where: { id: dto.sessionId },
    });

    if (!session || session.workoutDayId !== dto.workoutDayId) {
      throw new NotFoundError("Sessão de treino não encontrada.");
    }

    const updatedSession = await this.db.workoutSession.update({
      where: { id: dto.sessionId },
      data: {
        completedAt: dto.completedAt,
      },
    });

    return {
      id: updatedSession.id,
      startedAt: updatedSession.startedAt,
      completedAt: updatedSession.completedAt,
    };
  }
}
