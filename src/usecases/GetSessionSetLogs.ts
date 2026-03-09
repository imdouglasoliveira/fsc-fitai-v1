import { ForbiddenError, NotFoundError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
  workoutPlanId: string;
  workoutDayId: string;
  sessionId: string;
}

export interface OutputDto {
  exercises: Array<{
    exerciseId: string;
    exerciseName: string;
    plannedSets: number;
    plannedReps: number;
    plannedRestInSeconds: number;
    completedSets: number;
    sets: Array<{
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
    }>;
  }>;
}

export class GetSessionSetLogs {
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

    // 5. Buscar exercícios do dia
    const exercises = await this.db.workoutExercise.findMany({
      where: { workoutDayId: dto.workoutDayId },
      orderBy: { order: "asc" },
    });

    // 6. Buscar set logs da sessão
    const setLogs = await this.db.exerciseSetLog.findMany({
      where: { workoutSessionId: dto.sessionId },
      orderBy: { setNumber: "asc" },
    });

    // 7. Agrupar
    const exercisesWithLogs = exercises.map((exercise) => {
      const exerciseLogs = setLogs.filter((log) => log.workoutExerciseId === exercise.id);

      return {
        exerciseId: exercise.id,
        exerciseName: exercise.name,
        plannedSets: exercise.sets,
        plannedReps: exercise.reps,
        plannedRestInSeconds: exercise.restTimeInSeconds,
        completedSets: exerciseLogs.length,
        sets: exerciseLogs.map((log) => ({
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
        })),
      };
    });

    return { exercises: exercisesWithLogs };
  }
}
