interface ProjectionParams {
  startWeightKg: number;
  bodyFatPct: number;
  tdee: number;
  targetCaloriesKcal: number; // caloric goal (uses max from caloricGoal)
  durationDays: number; // default 84 (12 weeks)
  proteinGPerKg?: number; // default 1.8
}

export interface DailyPoint {
  day: number;
  weightKg: number;
  fatKg: number;
  leanKg: number;
}

interface ProjectionResult {
  series: DailyPoint[];
  summary: {
    startWeightKg: number;
    endWeightKg: number;
    deltaWeightKg: number;
    endFatKg: number;
    endLeanKg: number;
    days: number;
    weeks: number;
    avgDeficitPerDay: number;
  };
}

/**
 * Simplified NIH Body Weight Planner model.
 *
 * Daily loop:
 * 1. Adapted TDEE = base TDEE + (25 × accumulated weight delta in kg)
 * 2. Daily deficit = adapted TDEE - targetCalories
 * 3. Fat fraction in deficit: protein >= 2.0 g/kg → 0.85, >= 1.6 → 0.80, else 0.70
 * 4. Energy per kg: (fatFraction × 7700) + ((1 - fatFraction) × 1000)
 * 5. Weight delta = deficit / energy_per_kg
 * 6. Guard-rail: max 1% of current weight per week (÷7 per day)
 * 7. Update weight, fat mass, lean mass
 */
export function simulateWeightProjection(
  params: ProjectionParams,
): ProjectionResult {
  const {
    startWeightKg,
    bodyFatPct,
    tdee,
    targetCaloriesKcal,
    durationDays,
    proteinGPerKg = 1.8,
  } = params;

  let currentWeight = startWeightKg;
  let fatKg = startWeightKg * (bodyFatPct / 100);
  let leanKg = startWeightKg - fatKg;

  const fatFraction =
    proteinGPerKg >= 2.0 ? 0.85 : proteinGPerKg >= 1.6 ? 0.8 : 0.7;

  const energyPerKg = fatFraction * 7700 + (1 - fatFraction) * 1000;

  const series: DailyPoint[] = [
    {
      day: 0,
      weightKg: round2(currentWeight),
      fatKg: round2(fatKg),
      leanKg: round2(leanKg),
    },
  ];

  let totalDeficit = 0;

  for (let day = 1; day <= durationDays; day++) {
    const deltaAccumulated = currentWeight - startWeightKg;
    const adaptedTdee = tdee + 25 * deltaAccumulated;
    const dailyDeficit = adaptedTdee - targetCaloriesKcal;

    let deltaWeight = dailyDeficit / energyPerKg;

    // Guard-rail: max 1% of current weight per week (÷7 per day)
    const maxDailyLoss = (currentWeight * 0.01) / 7;
    if (Math.abs(deltaWeight) > maxDailyLoss) {
      deltaWeight = Math.sign(deltaWeight) * maxDailyLoss;
    }

    currentWeight -= deltaWeight;
    const fatDelta = deltaWeight * fatFraction;
    const leanDelta = deltaWeight * (1 - fatFraction);
    fatKg -= fatDelta;
    leanKg -= leanDelta;

    // Ensure non-negative
    fatKg = Math.max(0, fatKg);
    leanKg = Math.max(0, leanKg);

    totalDeficit += dailyDeficit;

    series.push({
      day,
      weightKg: round2(currentWeight),
      fatKg: round2(fatKg),
      leanKg: round2(leanKg),
    });
  }

  const endPoint = series[series.length - 1];

  return {
    series,
    summary: {
      startWeightKg: round2(startWeightKg),
      endWeightKg: endPoint.weightKg,
      deltaWeightKg: round2(endPoint.weightKg - startWeightKg),
      endFatKg: endPoint.fatKg,
      endLeanKg: endPoint.leanKg,
      days: durationDays,
      weeks: Math.round(durationDays / 7),
      avgDeficitPerDay: Math.round(totalDeficit / durationDays),
    },
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
