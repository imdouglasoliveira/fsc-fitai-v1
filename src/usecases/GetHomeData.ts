import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

import type { PrismaClient } from "../generated/prisma/client.js";
import { WeekDay } from "../generated/prisma/enums.js";
import { prisma } from "../lib/db.js";

dayjs.extend(utc);

interface InputDto {
  userId: string;
  date: string; // YYYY-MM-DD
}

export interface OutputDto {
  activeWorkoutPlanId: string | null;
  todayWorkoutDay: {
    workoutPlanId: string;
    id: string;
    name: string;
    isRest: boolean;
    weekDay: WeekDay;
    estimatedDurationInSeconds: number;
    coverImageUrl?: string | null;
    exercisesCount: number;
  } | null;
  workoutStreak: number;
  consistencyByDay: Record<string, {
    workoutDayCompleted: boolean;
    workoutDayStarted: boolean;
  }>;
}

const dayToWeekDay: Record<number, WeekDay> = {
  0: WeekDay.SUNDAY,
  1: WeekDay.MONDAY,
  2: WeekDay.TUESDAY,
  3: WeekDay.WEDNESDAY,
  4: WeekDay.THURSDAY,
  5: WeekDay.FRIDAY,
  6: WeekDay.SATURDAY,
};

export class GetHomeData {
  constructor(private readonly db: PrismaClient = prisma) {}

  async execute(dto: InputDto): Promise<OutputDto> {
    const targetDate = dayjs.utc(dto.date);
    
    // 1. Get active plan
    const activePlan = await this.db.workoutPlan.findFirst({
      where: {
        userId: dto.userId,
        isActive: true,
      },
      include: {
        workoutDays: {
          include: {
            _count: {
              select: { exercises: true }
            }
          }
        }
      }
    });

    // 2. Today's workout day
    const targetWeekDayEnum = dayToWeekDay[targetDate.day()];
    const todayWorkoutDayRaw = activePlan?.workoutDays.find(d => d.weekDay === targetWeekDayEnum);
    
    const todayWorkoutDay = todayWorkoutDayRaw ? {
      workoutPlanId: todayWorkoutDayRaw.workoutPlanId,
      id: todayWorkoutDayRaw.id,
      name: todayWorkoutDayRaw.name,
      isRest: todayWorkoutDayRaw.isRest,
      weekDay: todayWorkoutDayRaw.weekDay,
      estimatedDurationInSeconds: todayWorkoutDayRaw.estimatedDurationInSeconds,
      coverImageUrl: todayWorkoutDayRaw.coverImageUrl,
      exercisesCount: todayWorkoutDayRaw._count.exercises,
    } : null;

    // 3. Consistency (Sun-Sat range)
    const weekStart = targetDate.startOf('week'); // Sunday
    const weekEnd = targetDate.endOf('week'); // Saturday

    const sessions = await this.db.workoutSession.findMany({
      where: {
        workoutDay: {
          workoutPlan: {
            userId: dto.userId
          }
        },
        startedAt: {
          gte: weekStart.toDate(),
          lte: weekEnd.toDate(),
        }
      }
    });

    const consistencyByDay: Record<string, { workoutDayCompleted: boolean; workoutDayStarted: boolean; }> = {};
    for (let i = 0; i < 7; i++) {
      const current = weekStart.add(i, 'day');
      const dateStr = current.format('YYYY-MM-DD');
      
      const sessionToday = sessions.find(s => dayjs.utc(s.startedAt).format('YYYY-MM-DD') === dateStr);
      
      consistencyByDay[dateStr] = {
        workoutDayStarted: !!sessionToday,
        workoutDayCompleted: !!sessionToday?.completedAt,
      };
    }

    // 4. Streak calculation
    // Look back at all completed sessions
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
      orderBy: {
        completedAt: 'desc'
      },
      select: {
        completedAt: true,
      },
    });

    const completedDates = new Set(allCompletedSessions.map(s => dayjs.utc(s.completedAt).format('YYYY-MM-DD')));
    
    let workoutStreak = 0;
    let currentStreakDate = targetDate;
    
    // Check if target date itself is completed
    if (completedDates.has(currentStreakDate.format('YYYY-MM-DD'))) {
      workoutStreak++;
      currentStreakDate = currentStreakDate.subtract(1, 'day');
      while (completedDates.has(currentStreakDate.format('YYYY-MM-DD'))) {
        workoutStreak++;
        currentStreakDate = currentStreakDate.subtract(1, 'day');
      }
    } else {
      // If not completed today, maybe completed yesterday?
      currentStreakDate = currentStreakDate.subtract(1, 'day');
      while (completedDates.has(currentStreakDate.format('YYYY-MM-DD'))) {
        workoutStreak++;
        currentStreakDate = currentStreakDate.subtract(1, 'day');
      }
    }

    return {
      activeWorkoutPlanId: activePlan?.id ?? null,
      todayWorkoutDay,
      workoutStreak,
      consistencyByDay,
    };
  }
}
