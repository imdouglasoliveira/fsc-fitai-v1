import type { PrismaClient } from "../generated/prisma/client.js";
import { AssessmentType } from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
}

export interface OutputDto {
  completed: boolean;
  completedAt: Date | null;
}

export class GetOnboardingStatus {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    const assessment = await this.db.userAssessment.findFirst({
      where: {
        userId: dto.userId,
        type: AssessmentType.ONBOARDING,
      },
      select: {
        createdAt: true,
      },
    });

    if (assessment) {
      return {
        completed: true,
        completedAt: assessment.createdAt,
      };
    }

    return {
      completed: false,
      completedAt: null,
    };
  }
}
