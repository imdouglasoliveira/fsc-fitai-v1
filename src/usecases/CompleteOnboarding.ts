import { OnboardingAlreadyCompletedError } from "../errors/index.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import {
  ActivityLevel,
  AssessmentType,
  EquipmentAccess,
  ExperienceLevel,
  FitnessGoal,
  SessionDuration,
  TrainingFrequency,
} from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";

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
        createdAt: assessment.createdAt,
      };
    });
  }
}
