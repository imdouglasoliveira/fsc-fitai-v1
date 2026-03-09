type ActivityLevelEnum = "LOW" | "MEDIUM" | "HIGH";
type TrainingFrequencyEnum = "DAYS_2" | "DAYS_3" | "DAYS_4" | "DAYS_5_PLUS";

const ACTIVITY_LEVEL_MULTIPLIERS: Record<ActivityLevelEnum, number> = {
  LOW: 1.2,
  MEDIUM: 1.55,
  HIGH: 1.725,
};

const TRAINING_FREQUENCY_MULTIPLIERS: Record<
  TrainingFrequencyEnum,
  number
> = {
  DAYS_2: 1.375,
  DAYS_3: 1.55,
  DAYS_4: 1.55,
  DAYS_5_PLUS: 1.725,
};

export function getActivityMultiplier(
  activityLevel?: ActivityLevelEnum | null,
  trainingFrequency?: TrainingFrequencyEnum | null,
): number {
  if (activityLevel) {
    return ACTIVITY_LEVEL_MULTIPLIERS[activityLevel];
  }
  if (trainingFrequency) {
    return TRAINING_FREQUENCY_MULTIPLIERS[trainingFrequency];
  }
  return 1.2; // sedentary fallback
}

export function calculateTdee(
  bmr: number,
  activityMultiplier: number,
): number {
  return Math.round(bmr * activityMultiplier);
}
