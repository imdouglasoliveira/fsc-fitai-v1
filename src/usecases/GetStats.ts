import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

import type { PrismaClient } from "../generated/prisma/client.js";
import { prisma } from "../lib/db.js";

dayjs.extend(utc);

interface InputDto {
  userId: string;
  from: string; // YYYY-MM-DD
  to: string; // YYYY-MM-DD
}

export interface OutputDto {
  workoutStreak: number;
  consistencyByDay: Record<string, {
    workoutDayCompleted: boolean;
    workoutDayStarted: boolean;
  }>;
  completedWorkoutsCount: number;
  conclusionRate: number;
  totalTimeInSeconds: number;
}

export class GetStats {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    const fromDate = dayjs.utc(dto.from).startOf('day');
    const toDate = dayjs.utc(dto.to).endOf('day');

    const sessions = await this.db.workoutSession.findMany({
      where: {
        workoutDay: {
          workoutPlan: {
            userId: dto.userId
          }
        },
        startedAt: {
          gte: fromDate.toDate(),
          lte: toDate.toDate(),
        }
      }
    });

    // 1. Consistency By Day & General Counts
    const consistencyByDay: Record<string, { workoutDayCompleted: boolean; workoutDayStarted: boolean; }> = {};
    let completedWorkoutsCount = 0;
    let totalTimeInSeconds = 0;

    sessions.forEach(session => {
      const dateStr = dayjs.utc(session.startedAt).format('YYYY-MM-DD');
      const isCompleted = !!session.completedAt;

      if (!consistencyByDay[dateStr]) {
        consistencyByDay[dateStr] = {
          workoutDayStarted: true,
          workoutDayCompleted: isCompleted,
        };
      } else {
        // If multiple sessions in one day, if any is started/completed, keep it
        consistencyByDay[dateStr].workoutDayStarted = true;
        if (isCompleted) {
          consistencyByDay[dateStr].workoutDayCompleted = true;
        }
      }

      if (isCompleted) {
        completedWorkoutsCount++;
        const duration = dayjs(session.completedAt).diff(dayjs(session.startedAt), 'second');
        totalTimeInSeconds += Math.max(0, duration);
      }
    });

    const totalSessions = sessions.length;
    const conclusionRate = totalSessions > 0 ? completedWorkoutsCount / totalSessions : 0;

    // 2. Streak Calculation (Backward from 'to' date)
    const allCompletedSessions = await this.db.workoutSession.findMany({
      where: {
        workoutDay: {
          workoutPlan: {
            userId: dto.userId
          }
        },
        completedAt: {
          not: null
        }
      },
      select: { completedAt: true }
    });

    const completedDates = new Set(allCompletedSessions.map(s => dayjs.utc(s.completedAt).format('YYYY-MM-DD')));
    
    let workoutStreak = 0;
    let currentStreakDate = dayjs.utc(dto.to);
    
    // Check if end date is completed
    if (completedDates.has(currentStreakDate.format('YYYY-MM-DD'))) {
      workoutStreak++;
      currentStreakDate = currentStreakDate.subtract(1, 'day');
      while (completedDates.has(currentStreakDate.format('YYYY-MM-DD'))) {
        workoutStreak++;
        currentStreakDate = currentStreakDate.subtract(1, 'day');
      }
    } else {
      // Check if it ended yesterday
      currentStreakDate = currentStreakDate.subtract(1, 'day');
      while (completedDates.has(currentStreakDate.format('YYYY-MM-DD'))) {
        workoutStreak++;
        currentStreakDate = currentStreakDate.subtract(1, 'day');
      }
    }

    return {
      workoutStreak,
      consistencyByDay,
      completedWorkoutsCount,
      conclusionRate,
      totalTimeInSeconds,
    };
  }
}
