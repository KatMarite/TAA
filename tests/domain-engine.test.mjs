/**
 * Training Africa Academy — Automated Domain & Financial Engine Test Suite
 * Run with: node tests/domain-engine.test.mjs
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

// Test targets
import {
  calculateSection12HAllowance,
  calculateCashTaxSaving,
  calculateGrossTuition,
  calculateReliefStaffCost,
  calculateSetaGrantRecovery,
  calculateCorporateRoi,
  SECTION_12H_ABLE_BODIED_ALLOWANCE,
  SECTION_12H_DISABLED_ALLOWANCE,
  SA_CORPORATE_TAX_RATE,
} from '../lib/roi-calculator.ts';

import {
  generateRecordId,
  validateSouthAfricanIdNumber,
  getCurrentFormattedDate,
} from '../lib/utils.ts';

describe('1. SARS Section 12H Tax Allowance Calculations', () => {
  test('returns 0 allowance for non-learnership / short course categories', () => {
    const allowance = calculateSection12HAllowance(false, 10, 2);
    assert.equal(allowance, 0);
  });

  test('calculates correct allowance for able-bodied learners (R80k each)', () => {
    const allowance = calculateSection12HAllowance(true, 5, 0);
    assert.equal(allowance, 5 * SECTION_12H_ABLE_BODIED_ALLOWANCE); // 5 * 80,000 = 400,000
    assert.equal(allowance, 400000);
  });

  test('calculates correct allowance for disabled learners (R120k each)', () => {
    const allowance = calculateSection12HAllowance(true, 0, 3);
    assert.equal(allowance, 3 * SECTION_12H_DISABLED_ALLOWANCE); // 3 * 120,000 = 360,000
    assert.equal(allowance, 360000);
  });

  test('calculates correct combined allowance for mixed cohorts', () => {
    // 8 able-bodied (8 * 80k = 640k) + 2 disabled (2 * 120k = 240k) = 880k
    const allowance = calculateSection12HAllowance(true, 8, 2);
    assert.equal(allowance, 880000);
  });

  test('calculates exact 27% SA corporate tax cash savings', () => {
    const allowance = 880000;
    const saving = calculateCashTaxSaving(allowance, SA_CORPORATE_TAX_RATE);
    // 880,000 * 0.27 = 237,600
    assert.equal(saving, 237600);
  });
});

describe('2. Volume Tuition & Relief Staff Pricing Engine', () => {
  test('applies single rate for cohorts under 5 learners', () => {
    const tuition = calculateGrossTuition(1450, 1150, 4);
    assert.equal(tuition.unitRate, 1450);
    assert.equal(tuition.grossTotal, 1450 * 4); // 5,800
  });

  test('applies discounted group rate for cohorts of 5 or more learners', () => {
    const tuition = calculateGrossTuition(1450, 1150, 5);
    assert.equal(tuition.unitRate, 1150);
    assert.equal(tuition.grossTotal, 1150 * 5); // 5,750
  });

  test('calculates relief staff cost at standard R380/day per operative', () => {
    // 10 learners, 3 relief days = 10 * 3 * 380 = 11,400
    const reliefCost = calculateReliefStaffCost(10, 3, 380);
    assert.equal(reliefCost, 11400);
  });

  test('calculates Services SETA 25% grant recovery estimate', () => {
    const grant = calculateSetaGrantRecovery(100000, 0.25);
    assert.equal(grant, 25000);
  });
});

describe('3. Master Corporate ROI & Net Benefit Engine', () => {
  test('accurately models an Occupational Qualification cohort with Section 12H benefit', () => {
    const result = calculateCorporateRoi({
      courseCategory: 'Occupational Qualifications',
      priceZAR: 16500,
      groupPricePerLearnerZAR: 13900,
      learnerCount: 10,
      disabledCount: 2,
      reliefStaffDays: 3,
    });

    assert.equal(result.isLearnershipEligible, true);
    assert.equal(result.ableBodiedCount, 8);
    assert.equal(result.disabledCount, 2);
    // Tuition: 10 * 13,900 = 139,000
    assert.equal(result.grossTuitionZAR, 139000);
    // Relief: 10 * 3 * 380 = 11,400
    assert.equal(result.grossReliefCostZAR, 11400);
    // Gross: 139,000 + 11,400 = 150,400
    assert.equal(result.grossTotalInvestmentZAR, 150400);
    // Allowance: 8 * 80k + 2 * 120k = 880k
    assert.equal(result.totalSection12HDeductionZAR, 880000);
    // Tax Saving: 880k * 0.27 = 237,600
    assert.equal(result.cashTaxSaving12HZAR, 237600);
    // SETA Grant: 139,000 * 0.25 = 34,750
    assert.equal(result.estimatedSetaGrantZAR, 34750);
    // Total offsets: 237,600 + 34,750 = 272,350
    assert.equal(result.totalFinancialOffsetZAR, 272350);
    // Net: 150,400 - 272,350 = -121,950 (Tax positive!)
    assert.equal(result.netEffectiveCostZAR, -121950);
    assert.equal(result.isNetTaxPositive, true);
    assert.equal(result.netBenefitGainZAR, 121950);
    assert.equal(result.effectiveCostPerLearnerZAR, 0);
  });
});

describe('4. Collision-Free Record Identifier Generation', () => {
  test('generates correctly formatted prefixed IDs', () => {
    const id = generateRecordId('ENR');
    assert.match(id, /^ENR-[0-9A-Z]+-[0-9A-Z]{8}$/);
  });

  test('produces zero collisions across 10,000 sequentially generated IDs', () => {
    const idSet = new Set();
    const count = 10000;
    for (let i = 0; i < count; i++) {
      const id = generateRecordId('TEST');
      assert.equal(idSet.has(id), false, `Collision detected on iteration ${i} with ID ${id}`);
      idSet.add(id);
    }
    assert.equal(idSet.size, count);
  });
});

describe('5. South African National ID Validation (Luhn Checksum)', () => {
  test('rejects IDs with incorrect lengths or non-digits', () => {
    assert.equal(validateSouthAfricanIdNumber('12345').valid, false);
    assert.equal(validateSouthAfricanIdNumber('980101500008A').valid, false);
    assert.equal(validateSouthAfricanIdNumber('').valid, false);
  });

  test('rejects IDs with impossible birth months or days', () => {
    assert.equal(validateSouthAfricanIdNumber('9813015000080').valid, false); // Month 13
    assert.equal(validateSouthAfricanIdNumber('9801325000080').valid, false); // Day 32
  });

  test('validates authentic SA ID numbers and extracts demographic metadata', () => {
    // 980101 5000 08 8 -> 98-01-01, Male (5000 >= 5000), SA Citizen (0), Check Digit = 8
    const res = validateSouthAfricanIdNumber('9801015000088');
    assert.equal(res.valid, true);
    assert.equal(res.gender, 'Male');
    assert.equal(res.citizenship, 'SA Citizen');
    assert.equal(res.checkDigit, 8);
  });

  test('correctly rejects incorrect check digit and identifies correct expected digit', () => {
    const res = validateSouthAfricanIdNumber('9801015000080'); // 0 instead of 8
    assert.equal(res.valid, false);
    assert.equal(res.checkDigit, 8);
  });

  test('correctly identifies female demographics for gender codes < 5000', () => {
    // 920512 0123 08 Z
    // A = 9 + 0 + 1 + 0 + 2 + 0 = 12
    // Even str = "252138", * 2 = 504276, sum = 5+0+4+2+7+6 = 24
    // total = 12 + 24 = 36, check digit = (10 - 6) % 10 = 4
    const id = '9205120123084';
    const check = validateSouthAfricanIdNumber(id);
    assert.equal(check.valid, true);
    assert.equal(check.gender, 'Female');
    assert.equal(check.citizenship, 'SA Citizen');
  });

  test('formats current date string consistently', () => {
    const fixedDate = new Date('2026-11-12T10:00:00Z');
    const formatted = getCurrentFormattedDate(fixedDate);
    assert.match(formatted, /12 Nov 2026/);
  });
});
