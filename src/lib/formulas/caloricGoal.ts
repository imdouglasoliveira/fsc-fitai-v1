interface CaloricGoal {
  minKcal: number;
  maxKcal: number;
  description: string;
}

type FitnessGoalType =
  | "LOSE_WEIGHT"
  | "GAIN_MUSCLE"
  | "CONDITIONING"
  | "GENERAL_HEALTH";

/**
 * LOSE_WEIGHT:     deficit 15-20% → TDEE × 0.80 to TDEE × 0.85
 * GAIN_MUSCLE:     surplus 10-15% → TDEE × 1.10 to TDEE × 1.15
 * CONDITIONING:    maintenance   → TDEE
 * GENERAL_HEALTH:  maintenance   → TDEE
 */
export function calculateCaloricGoal(
  tdee: number,
  goal: FitnessGoalType,
): CaloricGoal {
  switch (goal) {
    case "LOSE_WEIGHT":
      return {
        minKcal: Math.round(tdee * 0.8),
        maxKcal: Math.round(tdee * 0.85),
        description: "Déficit calórico de 15-20%",
      };
    case "GAIN_MUSCLE":
      return {
        minKcal: Math.round(tdee * 1.1),
        maxKcal: Math.round(tdee * 1.15),
        description: "Superávit calórico de 10-15%",
      };
    case "CONDITIONING":
    case "GENERAL_HEALTH":
      return {
        minKcal: tdee,
        maxKcal: tdee,
        description: "Manutenção calórica",
      };
  }
}
