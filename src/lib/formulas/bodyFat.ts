/**
 * CUN-BAE formula (Clínica Universitaria de Navarra — Body Adiposity Estimator).
 * Based on BMI, age, and sex.
 */
export function estimateBodyFat(params: {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "MALE" | "FEMALE";
}): number {
  const heightM = params.heightCm / 100;
  const bmi = params.weightKg / (heightM * heightM);
  const s = params.sex === "FEMALE" ? 1 : 0;
  const bf =
    -44.988 +
    0.503 * params.age +
    10.689 * s +
    3.172 * bmi -
    0.026 * bmi * bmi +
    0.181 * bmi * s -
    0.02 * bmi * params.age -
    0.005 * bmi * bmi * s +
    0.00021 * bmi * bmi * params.age;
  return Math.max(0, Math.min(50, bf)); // clamp 0-50%
}

interface UsNavyParams {
  heightCm: number;
  waistCm: number;
  neckCm: number;
  hipCm?: number; // required for FEMALE
  sex: "MALE" | "FEMALE";
}

/**
 * US Navy method — uses circumference measurements.
 * MALE:   BF% = 86.010 × log₁₀(waist_in - neck_in) - 70.041 × log₁₀(height_in) + 36.76
 * FEMALE: BF% = 163.205 × log₁₀(waist_in + hip_in - neck_in) - 97.684 × log₁₀(height_in) - 78.387
 */
export function estimateBodyFatUsNavy(params: UsNavyParams): number {
  const toInches = (cm: number) => cm / 2.54;
  const heightIn = toInches(params.heightCm);
  const waistIn = toInches(params.waistCm);
  const neckIn = toInches(params.neckCm);

  let bf: number;
  if (params.sex === "MALE") {
    bf =
      86.01 * Math.log10(waistIn - neckIn) -
      70.041 * Math.log10(heightIn) +
      36.76;
  } else {
    const hipIn = toInches(params.hipCm!);
    bf =
      163.205 * Math.log10(waistIn + hipIn - neckIn) -
      97.684 * Math.log10(heightIn) -
      78.387;
  }

  return Math.max(0, Math.min(50, bf)); // clamp 0-50%
}

interface AutoBodyFatParams {
  weightKg: number;
  heightCm: number;
  age: number;
  sex: "MALE" | "FEMALE";
  waistCm?: number;
  neckCm?: number;
  hipCm?: number;
}

interface AutoBodyFatResult {
  bodyFatPercentage: number;
  method: "US_NAVY" | "CUN_BAE";
}

/**
 * Automatic method selection:
 * - MALE: if waistCm AND neckCm present → US Navy
 * - FEMALE: if waistCm AND neckCm AND hipCm present → US Navy
 * - Otherwise → CUN-BAE (fallback)
 */
export function estimateBodyFatAuto(
  params: AutoBodyFatParams,
): AutoBodyFatResult {
  const canUseUsNavy =
    params.waistCm != null &&
    params.neckCm != null &&
    (params.sex === "MALE" || params.hipCm != null);

  if (canUseUsNavy) {
    return {
      bodyFatPercentage: estimateBodyFatUsNavy({
        heightCm: params.heightCm,
        waistCm: params.waistCm!,
        neckCm: params.neckCm!,
        hipCm: params.hipCm,
        sex: params.sex,
      }),
      method: "US_NAVY",
    };
  }

  return {
    bodyFatPercentage: estimateBodyFat({
      weightKg: params.weightKg,
      heightCm: params.heightCm,
      age: params.age,
      sex: params.sex,
    }),
    method: "CUN_BAE",
  };
}
