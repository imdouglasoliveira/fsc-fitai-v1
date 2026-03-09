interface BmrParams {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "MALE" | "FEMALE";
}

/**
 * Mifflin-St Jeor equation for Basal Metabolic Rate.
 * MALE:   10 × weight(kg) + 6.25 × height(cm) - 5 × age + 5
 * FEMALE: 10 × weight(kg) + 6.25 × height(cm) - 5 × age - 161
 */
export function calculateBmr(params: BmrParams): number {
  const base =
    10 * params.weightKg + 6.25 * params.heightCm - 5 * params.age;
  return params.sex === "MALE" ? base + 5 : base - 161;
}
