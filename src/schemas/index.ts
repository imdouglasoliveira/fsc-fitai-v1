import { z } from "zod";

import {
  ActivityLevel,
  AssessmentType,
  EquipmentAccess,
  ExperienceLevel,
  FitnessGoal,
  SessionDuration,
  TrainingFrequency,
  WeekDay,
} from "../generated/prisma/enums.js";

export const ErrorSchema = z.object({
  error: z.string(),
  code: z.string(),
  statusCode: z.number(),
});

export const WorkoutPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.date(),
  workoutDays: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      weekDay: z.enum(WeekDay),
      isRest: z.boolean(),
      estimatedDurationInSeconds: z.number(),
      coverImageUrl: z.string().nullable(),
      createdAt: z.date(),
      exercises: z.array(
        z.object({
          id: z.string(),
          name: z.string(),
          order: z.number(),
          sets: z.number(),
          reps: z.number(),
          restTimeInSeconds: z.number(),
          createdAt: z.date(),
        })
      ),
    })
  ),
});

export const StartWorkoutSessionResponseSchema = z.object({
  userWorkoutSessionId: z.string().uuid(),
});

export const WorkoutSessionResponseSchema = z.object({
  id: z.string().uuid(),
  startedAt: z.date(),
  completedAt: z.date().nullable(),
});

export const HomeDataResponseSchema = z.object({
  activeWorkoutPlanId: z.string().uuid().nullable(),
  todayWorkoutDay: z
    .object({
      workoutPlanId: z.string().uuid(),
      id: z.string().uuid(),
      name: z.string(),
      isRest: z.boolean(),
      weekDay: z.enum(WeekDay),
      estimatedDurationInSeconds: z.number(),
      coverImageUrl: z.string().nullable().optional(),
      exercisesCount: z.number(),
    })
    .nullable(),
  workoutStreak: z.number().int().min(0),
  consistencyByDay: z.record(
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    z.object({
      workoutDayCompleted: z.boolean(),
      workoutDayStarted: z.boolean(),
    })
  ),
});

export const WorkoutPlanDetailsResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  workoutDays: z.array(
    z.object({
      id: z.string().uuid(),
      weekDay: z.enum(WeekDay),
      name: z.string(),
      isRest: z.boolean(),
      coverImageUrl: z.string().nullable().optional(),
      estimatedDurationInSeconds: z.number(),
      exercisesCount: z.number(),
    })
  ),
});

export const WorkoutDayDetailsResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  isRest: z.boolean(),
  coverImageUrl: z.string().nullable().optional(),
  estimatedDurationInSeconds: z.number(),
  weekDay: z.enum(WeekDay),
  exercises: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      order: z.number(),
      workoutDayId: z.string().uuid(),
      sets: z.number(),
      reps: z.number(),
      restTimeInSeconds: z.number(),
    })
  ),
  sessions: z.array(
    z.object({
      id: z.string().uuid(),
      workoutDayId: z.string().uuid(),
      startedAt: z.date(),
      completedAt: z.date().nullable(),
    })
  ),
});

export const StatsResponseSchema = z.object({
  workoutStreak: z.number().int().min(0),
  consistencyByDay: z.record(
    z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    z.object({
      workoutDayCompleted: z.boolean(),
      workoutDayStarted: z.boolean(),
    })
  ),
  completedWorkoutsCount: z.number().int().min(0),
  conclusionRate: z.number().min(0).max(1),
  totalTimeInSeconds: z.number().int().min(0),
});

export const UserTrainDataSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  weightInGrams: z.number().int().min(0),
  heightInCentimeters: z.number().int().min(0),
  age: z.number().int().min(0),
  bodyFatPercentage: z.number().min(0).max(1),
});

// Onboarding Schemas (Task 10)
export const CompleteOnboardingBodySchema = z.object({
  goal: z.enum([
    FitnessGoal.LOSE_WEIGHT,
    FitnessGoal.GAIN_MUSCLE,
    FitnessGoal.CONDITIONING,
    FitnessGoal.GENERAL_HEALTH,
  ]),
  experienceLevel: z.enum([
    ExperienceLevel.BEGINNER,
    ExperienceLevel.INTERMEDIATE,
    ExperienceLevel.ADVANCED,
  ]),
  trainingFrequency: z.enum([
    TrainingFrequency.DAYS_2,
    TrainingFrequency.DAYS_3,
    TrainingFrequency.DAYS_4,
    TrainingFrequency.DAYS_5_PLUS,
  ]),
  sessionDuration: z.enum([
    SessionDuration.MIN_30_45,
    SessionDuration.MIN_45_60,
    SessionDuration.MIN_60_PLUS,
  ]),
  heightInCentimeters: z.number().int().min(140).max(220),
  weightInGrams: z.number().int().min(40000).max(200000),
  age: z.number().int().min(14).max(80),
  activityLevel: z.enum([ActivityLevel.LOW, ActivityLevel.MEDIUM, ActivityLevel.HIGH]).optional(),
  equipmentAccess: z
    .enum([EquipmentAccess.FULL_GYM, EquipmentAccess.HOME, EquipmentAccess.BASIC])
    .optional(),
  injuryOrRestriction: z.string().max(500).optional(),
});

export const CompleteOnboardingResponseSchema = z.object({
  id: z.string().uuid(),
  type: z.literal(AssessmentType.ONBOARDING),
  goal: z.enum([
    FitnessGoal.LOSE_WEIGHT,
    FitnessGoal.GAIN_MUSCLE,
    FitnessGoal.CONDITIONING,
    FitnessGoal.GENERAL_HEALTH,
  ]),
  experienceLevel: z.enum([
    ExperienceLevel.BEGINNER,
    ExperienceLevel.INTERMEDIATE,
    ExperienceLevel.ADVANCED,
  ]),
  trainingFrequency: z.enum([
    TrainingFrequency.DAYS_2,
    TrainingFrequency.DAYS_3,
    TrainingFrequency.DAYS_4,
    TrainingFrequency.DAYS_5_PLUS,
  ]),
  sessionDuration: z.enum([
    SessionDuration.MIN_30_45,
    SessionDuration.MIN_45_60,
    SessionDuration.MIN_60_PLUS,
  ]),
  heightInCentimeters: z.number(),
  weightInGrams: z.number(),
  age: z.number(),
  activityLevel: z.enum([ActivityLevel.LOW, ActivityLevel.MEDIUM, ActivityLevel.HIGH]).nullable(),
  equipmentAccess: z
    .enum([EquipmentAccess.FULL_GYM, EquipmentAccess.HOME, EquipmentAccess.BASIC])
    .nullable(),
  injuryOrRestriction: z.string().nullable(),
  createdAt: z.date(),
});

export const OnboardingStatusResponseSchema = z.object({
  completed: z.boolean(),
  completedAt: z.date().nullable(),
});

// Set Tracking Schemas (Task 11)
export const LogExerciseSetBodySchema = z.object({
  exerciseId: z.string().uuid(),
  setNumber: z.number().int().min(1),
  repsCompleted: z.number().int().min(1),
  weightInGrams: z.number().int().min(0),
  setStartedAt: z.string().datetime(), // ISO 8601
  setCompletedAt: z.string().datetime(), // ISO 8601
  restInSeconds: z.number().int().min(0).nullable(), // null na última série
});

export const ExerciseSetLogSchema = z.object({
  id: z.string().uuid(),
  workoutSessionId: z.string().uuid(),
  workoutExerciseId: z.string().uuid(),
  setNumber: z.number().int(),
  repsCompleted: z.number().int(),
  weightInGrams: z.number().int(),
  setStartedAt: z.date(), // After transform or directly from DB
  setCompletedAt: z.date(),
  restInSeconds: z.number().int().nullable(),
  createdAt: z.date(),
});

export const SessionSetLogsResponseSchema = z.array(
  z.object({
    exerciseId: z.string().uuid(),
    exerciseName: z.string(),
    plannedSets: z.number().int(),
    plannedReps: z.number().int(),
    plannedRestInSeconds: z.number().int(),
    completedSets: z.number().int(),
    sets: z.array(
      z.object({
        id: z.string().uuid(),
        workoutSessionId: z.string().uuid(),
        workoutExerciseId: z.string().uuid(),
        setNumber: z.number().int(),
        repsCompleted: z.number().int(),
        weightInGrams: z.number().int(),
        setStartedAt: z.date(),
        setCompletedAt: z.date(),
        restInSeconds: z.number().int().nullable(),
        createdAt: z.date(),
      })
    ),
  })
);