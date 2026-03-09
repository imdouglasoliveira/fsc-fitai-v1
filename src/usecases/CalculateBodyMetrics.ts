import { ConflictError, ForbiddenError, NotFoundError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";
import {
  calculateBmr,
  calculateCaloricGoal,
  calculateMacros,
  calculateTdee,
  estimateBodyFatAuto,
  getActivityMultiplier,
  simulateWeightProjection,
} from "../lib/formulas/index.js";

interface InputDto {
  userId: string;
  assessmentId: string;
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
}

export class CalculateBodyMetrics {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    // 1. Fetch assessment
    const assessment = await this.db.userAssessment.findUnique({
      where: { id: dto.assessmentId },
    });

    if (!assessment) {
      throw new NotFoundError("Assessment not found.");
    }

    // 2. Validate ownership
    if (assessment.userId !== dto.userId) {
      throw new ForbiddenError("Assessment does not belong to user.");
    }

    // 3. Check duplicate
    const existingMetrics = await this.db.userMetrics.findUnique({
      where: { assessmentId: dto.assessmentId },
    });

    if (existingMetrics) {
      throw new ConflictError("Metrics already calculated.");
    }

    // 4. Convert units
    const weightKg = assessment.weightInGrams / 1000;
    const heightCm = assessment.heightInCentimeters;
    const { age, sex } = assessment;

    // 5. Calculate BMR
    const bmr = calculateBmr({ weightKg, heightCm, age, sex });

    // 6. Resolve activity multiplier
    const activityMultiplier = getActivityMultiplier(
      assessment.activityLevel,
      assessment.trainingFrequency,
    );

    // 7. Calculate TDEE
    const tdee = calculateTdee(bmr, activityMultiplier);

    // 8. Estimate body fat (auto-select US Navy or CUN-BAE)
    const { bodyFatPercentage, method: bodyFatMethod } = estimateBodyFatAuto({
      weightKg,
      heightCm,
      age,
      sex,
      waistCm: assessment.waistCm ?? undefined,
      neckCm: assessment.neckCm ?? undefined,
      hipCm: assessment.hipCm ?? undefined,
    });

    // 9. Body composition
    const fatMassKg = Math.round((weightKg * (bodyFatPercentage / 100)) * 100) / 100;
    const leanMassKg = Math.round((weightKg - fatMassKg) * 100) / 100;

    // 10. Caloric goal
    const caloricGoal = calculateCaloricGoal(tdee, assessment.goal);

    // 11. Macros
    const macros = calculateMacros(weightKg, tdee);

    // 12. Weight projection (12 weeks = 84 days)
    const projection = simulateWeightProjection({
      startWeightKg: weightKg,
      bodyFatPct: bodyFatPercentage,
      tdee,
      targetCaloriesKcal: caloricGoal.maxKcal,
      durationDays: 84,
    });

    // 13. Persist
    const metrics = await this.db.userMetrics.create({
      data: {
        userId: dto.userId,
        assessmentId: dto.assessmentId,
        bmr: Math.round(bmr),
        tdee,
        bodyFatPercentage: Math.round(bodyFatPercentage * 100) / 100,
        bodyFatMethod,
        fatMassKg,
        leanMassKg,
        caloricGoalMin: caloricGoal.minKcal,
        caloricGoalMax: caloricGoal.maxKcal,
        proteinGrams: macros.proteinGrams,
        carbsGrams: macros.carbsGrams,
        fatGrams: macros.fatGrams,
        projectionJson: JSON.parse(JSON.stringify(projection.series)),
        projectionWeeks: projection.summary.weeks,
        projectedEndWeight: projection.summary.endWeightKg,
      },
    });

    // 14. Return OutputDto
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
      projectionSeries: projection.series,
    };
  }
}
