import { ConflictError, ForbiddenError, NotFoundError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
  exerciseId: string;
  setNumber: number;
  repsCompleted: number;
  weightInGrams: number;
  setStartedAt: string;
  setCompletedAt: string;
  restInSeconds: number | null;
}

export interface OutputDto {
  id: string;
  workoutSessionId: string;
  workoutExerciseId: string;
  setNumber: number;
  repsCompleted: number;
  weightInGrams: number;
  setStartedAt: Date;
  setCompletedAt: Date;
  restInSeconds: number | null;
  createdAt: Date;
}

export class LogExerciseSet {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    // 1. Validar plano
    const workoutPlan = await this.db.workoutPlan.findUnique({
      where: { id: dto.workoutPlanId },
    });
    if (!workoutPlan) throw new NotFoundError("Plano de treino não encontrado.");

    // 2. Validar propriedade
    if (workoutPlan.userId !== dto.userId) throw new ForbiddenError("Acesso negado.");

    // 3. Validar dia
    const workoutDay = await this.db.workoutDay.findFirst({
      where: { id: dto.workoutDayId, workoutPlanId: dto.workoutPlanId },
    });
    if (!workoutDay) throw new NotFoundError("Dia de treino não encontrado.");

    // 4. Validar sessão
    const session = await this.db.workoutSession.findFirst({
      where: { id: dto.sessionId, workoutDayId: dto.workoutDayId },
    });
    if (!session) throw new NotFoundError("Sessão não encontrada.");

    // 5. Validar sessão ativa
    if (session.completedAt !== null) {
      throw new ConflictError("Sessão já finalizada.");
    }

    // 6. Validar exercício
    const exercise = await this.db.workoutExercise.findFirst({
      where: { id: dto.exerciseId, workoutDayId: dto.workoutDayId },
    });
    if (!exercise) throw new NotFoundError("Exercício não encontrado.");

    // 7. Validar limite de sets
    if (dto.setNumber > exercise.sets) {
      throw new ConflictError("Número da série excede o planejado.");
    }

    // 8. Validar sequência
    if (dto.setNumber > 1) {
      const previousSetsCount = await this.db.exerciseSetLog.count({
        where: {
          workoutSessionId: dto.sessionId,
          workoutExerciseId: dto.exerciseId,
          setNumber: { lt: dto.setNumber },
        },
      });
      if (previousSetsCount < dto.setNumber - 1) {
        throw new ConflictError("Séries anteriores ainda não foram registradas.");
      }
    }

    // 9. Validar duplicata
    const existing = await this.db.exerciseSetLog.findFirst({
      where: {
        workoutSessionId: dto.sessionId,
        workoutExerciseId: dto.exerciseId,
        setNumber: dto.setNumber,
      },
    });
    if (existing) throw new ConflictError("Esta série já foi registrada.");

    // 10. Criar log
    const log = await this.db.exerciseSetLog.create({
      data: {
        workoutSessionId: dto.sessionId,
        workoutExerciseId: dto.exerciseId,
        setNumber: dto.setNumber,
        repsCompleted: dto.repsCompleted,
        weightInGrams: dto.weightInGrams,
        setStartedAt: new Date(dto.setStartedAt),
        setCompletedAt: new Date(dto.setCompletedAt),
        restInSeconds: dto.restInSeconds,
      },
    });

    return {
      id: log.id,
      workoutSessionId: log.workoutSessionId,
      workoutExerciseId: log.workoutExerciseId,
      setNumber: log.setNumber,
      repsCompleted: log.repsCompleted,
      weightInGrams: log.weightInGrams,
      setStartedAt: log.setStartedAt,
      setCompletedAt: log.setCompletedAt,
      restInSeconds: log.restInSeconds,
      createdAt: log.createdAt,
    };
  }
}
