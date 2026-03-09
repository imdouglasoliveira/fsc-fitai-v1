interface MacroDistribution {
  proteinGrams: number; // weight × 2.2
  carbsGrams: number; // (TDEE × 0.45) / 4
  fatGrams: number; // (TDEE × 0.25) / 9
}

export function calculateMacros(
  weightKg: number,
  tdee: number,
): MacroDistribution {
  return {
    proteinGrams: Math.round(weightKg * 2.2),
    carbsGrams: Math.round((tdee * 0.45) / 4),
    fatGrams: Math.round((tdee * 0.25) / 9),
  };
}
