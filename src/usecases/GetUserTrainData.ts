import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
}

export class GetUserTrainData {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto) {
    const user = await this.db.user.findUnique({
      where: { id: dto.userId },
      include: {
        trainData: true,
      },
    });

    if (!user || !user.trainData) {
      return null;
    }

    return {
      userId: user.id,
      userName: user.name,
      weightInGrams: user.trainData.weightInGrams,
      heightInCentimeters: user.trainData.heightInCentimeters,
      age: user.trainData.age,
      bodyFatPercentage: user.trainData.bodyFatPercentage,
    };
  }
}
