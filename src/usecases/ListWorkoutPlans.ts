import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

interface InputDto {
  userId: string;
}

export class ListWorkoutPlans {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto) {
    return this.db.workoutPlan.findMany({
      where: { userId: dto.userId },
      orderBy: { createdAt: "desc" },
      include: {
        _count: {
          select: { workoutDays: true },
        },
      },
    });
  }
}
