import { OnboardingAlreadyCompletedError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import {
  ActivityLevel,
  AssessmentType,
  EquipmentAccess,
  ExperienceLevel,
  FitnessGoal,
  SessionDuration,
  type Sex,
  TrainingFrequency,
} from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";
import { CalculateBodyMetrics } from "./CalculateBodyMetrics.js";

interface InputDto {
  userId: string;
  goal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  trainingFrequency: TrainingFrequency;
  sessionDuration: SessionDuration;
  heightInCentimeters: number;
  weightInGrams: number;
  age: number;
  activityLevel?: ActivityLevel;
  equipmentAccess?: EquipmentAccess;
  injuryOrRestriction?: string;
  sex: Sex;
  waistCm?: number;
  neckCm?: number;
  hipCm?: number;
}

export interface OutputDto {
  id: string;
  type: "ONBOARDING";
  goal: FitnessGoal;
  experienceLevel: ExperienceLevel;
  trainingFrequency: TrainingFrequency;
  sessionDuration: SessionDuration;
  heightInCentimeters: number;
  weightInGrams: number;
  age: number;
  activityLevel: ActivityLevel | null;
  equipmentAccess: EquipmentAccess | null;
  injuryOrRestriction: string | null;
  sex: Sex;
  waistCm: number | null;
  neckCm: number | null;
  hipCm: number | null;
  createdAt: Date;
}

export class CompleteOnboarding {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    const existing = await this.db.userAssessment.findFirst({
      where: {
        userId: dto.userId,
        type: AssessmentType.ONBOARDING,
      },
    });

    if (existing) {
      throw new OnboardingAlreadyCompletedError("Onboarding already completed.");
    }

    return this.db.$transaction(async (tx) => {
      const assessment = await tx.userAssessment.create({
        data: {
          userId: dto.userId,
          type: AssessmentType.ONBOARDING,
          goal: dto.goal,
          experienceLevel: dto.experienceLevel,
          trainingFrequency: dto.trainingFrequency,
          sessionDuration: dto.sessionDuration,
          heightInCentimeters: dto.heightInCentimeters,
          weightInGrams: dto.weightInGrams,
          age: dto.age,
          activityLevel: dto.activityLevel,
          equipmentAccess: dto.equipmentAccess,
          injuryOrRestriction: dto.injuryOrRestriction,
          sex: dto.sex,
          waistCm: dto.waistCm ?? null,
          neckCm: dto.neckCm ?? null,
          hipCm: dto.hipCm ?? null,
        },
      });

      // Maintain compatibility by updating UserTrainData
      await tx.userTrainData.upsert({
        where: { userId: dto.userId },
        create: {
          userId: dto.userId,
          weightInGrams: dto.weightInGrams,
          heightInCentimeters: dto.heightInCentimeters,
          age: dto.age,
          bodyFatPercentage: 0,
        },
        update: {
          weightInGrams: dto.weightInGrams,
          heightInCentimeters: dto.heightInCentimeters,
          age: dto.age,
        },
      });

      // Calculate body metrics automatically after onboarding
      const calculateBodyMetrics = new CalculateBodyMetrics(tx as PrismaClient);
      await calculateBodyMetrics.execute({
        userId: dto.userId,
        assessmentId: assessment.id,
      });

      return {
        id: assessment.id,
        type: "ONBOARDING",
        goal: assessment.goal,
        experienceLevel: assessment.experienceLevel,
        trainingFrequency: assessment.trainingFrequency,
        sessionDuration: assessment.sessionDuration,
        heightInCentimeters: assessment.heightInCentimeters,
        weightInGrams: assessment.weightInGrams,
        age: assessment.age,
        activityLevel: assessment.activityLevel,
        equipmentAccess: assessment.equipmentAccess,
        injuryOrRestriction: assessment.injuryOrRestriction,
        sex: assessment.sex,
        waistCm: assessment.waistCm,
        neckCm: assessment.neckCm,
        hipCm: assessment.hipCm,
        createdAt: assessment.createdAt,
      };
    });
  }
}
