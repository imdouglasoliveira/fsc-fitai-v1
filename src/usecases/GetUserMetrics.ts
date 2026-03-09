import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";
import type { DailyPoint } from "../lib/formulas/index.js";

interface InputDto {
  userId: string;
}

interface OutputDto {
  id: string;
  bmr: number;
  tdee: number;
  bodyFatPercentage: number;
  bodyFatMethod: "US_NAVY" | "CUN_BAE";
  fatMassKg: number;
  leanMassKg: number;
  caloricGoalMin: number;
  caloricGoalMax: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  projectionWeeks: number;
  projectedEndWeight: number;
  projectionSeries: Array<{
    day: number;
    weightKg: number;
    fatKg: number;
    leanKg: number;
  }>;
  createdAt: Date;
}

export class GetUserMetrics {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto | null> {
    const metrics = await this.db.userMetrics.findFirst({
      where: { userId: dto.userId },
      orderBy: { createdAt: "desc" },
    });

    if (!metrics) {
      return null;
    }

    const projectionSeries = metrics.projectionJson as unknown as DailyPoint[];

    return {
      id: metrics.id,
      bmr: metrics.bmr,
      tdee: metrics.tdee,
      bodyFatPercentage: metrics.bodyFatPercentage,
      bodyFatMethod: metrics.bodyFatMethod,
      fatMassKg: metrics.fatMassKg,
      leanMassKg: metrics.leanMassKg,
      caloricGoalMin: metrics.caloricGoalMin,
      caloricGoalMax: metrics.caloricGoalMax,
      proteinGrams: metrics.proteinGrams,
      carbsGrams: metrics.carbsGrams,
      fatGrams: metrics.fatGrams,
      projectionWeeks: metrics.projectionWeeks,
      projectedEndWeight: metrics.projectedEndWeight,
      projectionSeries,
      createdAt: metrics.createdAt,
    };
  }
}
