/**
 * Training Africa Academy — Corporate B-BBEE, Section 12H & SETA Financial Engine
 *
 * Implements South African statutory workforce skills training calculations:
 * - SARS Section 12H Learnership Tax Allowances (Income Tax Act No. 58 of 1962)
 *   * Able-bodied learners: R40,000 commencement + R40,000 completion = R80,000 deduction
 *   * Learners with disability: R60,000 commencement + R60,000 completion = R120,000 deduction
 * - Corporate Income Tax cash savings at current SA corporate rate (27%)
 * - Services SETA mandatory / discretionary grant recoveries (~25% tuition estimate)
 * - Cleaning Africa Services vetted relief staff daily rate models (R380/day)
 */

export const SA_CORPORATE_TAX_RATE = 0.27; // 27% SA corporate tax rate
export const SECTION_12H_ABLE_BODIED_ALLOWANCE = 80000; // R80k per able-bodied learner
export const SECTION_12H_DISABLED_ALLOWANCE = 120000; // R120k per learner with disability
export const DEFAULT_RELIEF_STAFF_DAILY_RATE_ZAR = 380; // R380 per operative per day
export const DEFAULT_SETA_GRANT_RECOVERY_RATE = 0.25; // ~25% estimated SETA recovery
export const GROUP_PRICING_THRESHOLD = 5; // 5+ learners unlock cohort tier pricing

export interface RoiCalculationInput {
  courseCategory: string;
  priceZAR: number;
  groupPricePerLearnerZAR: number;
  learnerCount: number;
  disabledCount: number;
  reliefStaffDays: number;
  dailyReliefRateZAR?: number;
  corporateTaxRate?: number;
  setaRecoveryRate?: number;
}

export interface RoiCalculationResult {
  isLearnershipEligible: boolean;
  unitTuitionZAR: number;
  grossTuitionZAR: number;
  grossReliefCostZAR: number;
  grossTotalInvestmentZAR: number;
  ableBodiedCount: number;
  disabledCount: number;
  totalSection12HDeductionZAR: number;
  cashTaxSaving12HZAR: number;
  estimatedSetaGrantZAR: number;
  totalFinancialOffsetZAR: number;
  netEffectiveCostZAR: number;
  effectiveCostPerLearnerZAR: number;
  isNetTaxPositive: boolean;
  netBenefitGainZAR: number;
}

/**
 * Calculates Section 12H tax allowance deduction amount.
 */
export function calculateSection12HAllowance(
  isLearnership: boolean,
  ableBodiedCount: number,
  disabledCount: number
): number {
  if (!isLearnership) return 0;
  return (
    Math.max(0, ableBodiedCount) * SECTION_12H_ABLE_BODIED_ALLOWANCE +
    Math.max(0, disabledCount) * SECTION_12H_DISABLED_ALLOWANCE
  );
}

/**
 * Calculates cash tax saving from Section 12H allowance based on corporate tax rate.
 */
export function calculateCashTaxSaving(
  allowanceZAR: number,
  taxRate: number = SA_CORPORATE_TAX_RATE
): number {
  return Math.round(Math.max(0, allowanceZAR) * taxRate);
}

/**
 * Calculates gross cohort tuition factoring in volume group discounts.
 */
export function calculateGrossTuition(
  priceZAR: number,
  groupPriceZAR: number,
  learnerCount: number
): { unitRate: number; grossTotal: number } {
  const count = Math.max(0, learnerCount);
  const unitRate = count >= GROUP_PRICING_THRESHOLD ? groupPriceZAR : priceZAR;
  return {
    unitRate,
    grossTotal: unitRate * count,
  };
}

/**
 * Calculates relief staff operational coverage cost.
 */
export function calculateReliefStaffCost(
  learnerCount: number,
  reliefDays: number,
  dailyRate: number = DEFAULT_RELIEF_STAFF_DAILY_RATE_ZAR
): number {
  return Math.max(0, learnerCount) * Math.max(0, reliefDays) * Math.max(0, dailyRate);
}

/**
 * Calculates estimated SETA grant recovery.
 */
export function calculateSetaGrantRecovery(
  grossTuitionZAR: number,
  recoveryRate: number = DEFAULT_SETA_GRANT_RECOVERY_RATE
): number {
  return Math.round(Math.max(0, grossTuitionZAR) * Math.max(0, recoveryRate));
}

/**
 * Full master calculation for the Corporate ROI & B-BBEE Calculator.
 */
export function calculateCorporateRoi(input: RoiCalculationInput): RoiCalculationResult {
  const count = Math.max(1, input.learnerCount);
  const disabled = Math.min(count, Math.max(0, input.disabledCount));
  const ableBodied = Math.max(0, count - disabled);
  const reliefDays = Math.max(0, input.reliefStaffDays);
  const dailyRate = input.dailyReliefRateZAR ?? DEFAULT_RELIEF_STAFF_DAILY_RATE_ZAR;
  const taxRate = input.corporateTaxRate ?? SA_CORPORATE_TAX_RATE;
  const setaRate = input.setaRecoveryRate ?? DEFAULT_SETA_GRANT_RECOVERY_RATE;

  const isLearnership = input.courseCategory === 'Occupational Qualifications';

  // 1. Tuition
  const { unitRate, grossTotal: grossTuitionZAR } = calculateGrossTuition(
    input.priceZAR,
    input.groupPricePerLearnerZAR,
    count
  );

  // 2. Relief Staff
  const grossReliefCostZAR = calculateReliefStaffCost(count, reliefDays, dailyRate);
  const grossTotalInvestmentZAR = grossTuitionZAR + grossReliefCostZAR;

  // 3. Tax Allowance (Section 12H)
  const totalSection12HDeductionZAR = calculateSection12HAllowance(
    isLearnership,
    ableBodied,
    disabled
  );
  const cashTaxSaving12HZAR = calculateCashTaxSaving(totalSection12HDeductionZAR, taxRate);

  // 4. SETA Grant
  const estimatedSetaGrantZAR = calculateSetaGrantRecovery(grossTuitionZAR, setaRate);

  // 5. Net Cost & Savings
  const totalFinancialOffsetZAR = cashTaxSaving12HZAR + estimatedSetaGrantZAR;
  const netEffectiveCostZAR = grossTotalInvestmentZAR - totalFinancialOffsetZAR;
  const isNetTaxPositive = netEffectiveCostZAR <= 0;
  const netBenefitGainZAR = isNetTaxPositive ? Math.abs(netEffectiveCostZAR) : 0;
  const effectiveCostPerLearnerZAR = isNetTaxPositive
    ? 0
    : Math.round(netEffectiveCostZAR / count);

  return {
    isLearnershipEligible: isLearnership,
    unitTuitionZAR: unitRate,
    grossTuitionZAR,
    grossReliefCostZAR,
    grossTotalInvestmentZAR,
    ableBodiedCount: ableBodied,
    disabledCount: disabled,
    totalSection12HDeductionZAR,
    cashTaxSaving12HZAR,
    estimatedSetaGrantZAR,
    totalFinancialOffsetZAR,
    netEffectiveCostZAR,
    effectiveCostPerLearnerZAR,
    isNetTaxPositive,
    netBenefitGainZAR,
  };
}

