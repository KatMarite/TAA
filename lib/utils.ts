import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let recordCounter = 0;

/**
 * Generate a collision-resistant unique record ID with a given prefix.
 * Combines high-resolution timestamp, monotonic counter, and random entropy.
 */
export function generateRecordId(prefix: string): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  recordCounter = (recordCounter + 1) % 1679616; // 36^4
  const countStr = recordCounter.toString(36).padStart(4, '0').toUpperCase();
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${countStr}${randomSuffix}`;
}

/**
 * Returns current date formatted consistently (e.g., '11 Nov 2026').
 */
export function getCurrentFormattedDate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Validates a South African National ID number using the Department of Home Affairs
 * official modulus-10 checksum algorithm:
 * - A = Sum of digits in odd positions (1, 3, 5, 7, 9, 11)
 * - B = Even position digits concatenated, then multiplied by 2
 * - C = Sum of digits of B
 * - Check digit = (10 - ((A + C) % 10)) % 10
 */
export function validateSouthAfricanIdNumber(idNumber: string): {
  valid: boolean;
  reason?: string;
  gender?: 'Female' | 'Male';
  citizenship?: 'SA Citizen' | 'Permanent Resident';
  checkDigit?: number;
} {
  const clean = idNumber.replace(/\s+/g, '');
  if (!/^\d{13}$/.test(clean)) {
    return { valid: false, reason: 'ID must contain exactly 13 digits' };
  }

  const month = parseInt(clean.substring(2, 4), 10);
  const day = parseInt(clean.substring(4, 6), 10);

  if (month < 1 || month > 12 || day < 1 || day > 31) {
    return { valid: false, reason: 'Invalid birth date in ID number' };
  }

  // 1. Sum digits in odd positions (0-indexed: 0, 2, 4, 6, 8, 10)
  let sumOdd = 0;
  for (let i = 0; i < 11; i += 2) {
    sumOdd += parseInt(clean[i], 10);
  }

  // 2. Concatenate digits in even positions (0-indexed: 1, 3, 5, 7, 9, 11)
  let evenStr = '';
  for (let i = 1; i < 12; i += 2) {
    evenStr += clean[i];
  }
  const multipliedEven = parseInt(evenStr, 10) * 2;

  // 3. Sum digits of the multiplied number
  let sumEvenDigits = 0;
  for (const char of String(multipliedEven)) {
    sumEvenDigits += parseInt(char, 10);
  }

  // 4. Calculate expected check digit
  const total = sumOdd + sumEvenDigits;
  const expectedCheckDigit = (10 - (total % 10)) % 10;
  const actualCheckDigit = parseInt(clean[12], 10);

  if (actualCheckDigit !== expectedCheckDigit) {
    return {
      valid: false,
      reason: `Checksum verification failed (expected check digit ${expectedCheckDigit}, got ${actualCheckDigit})`,
      checkDigit: expectedCheckDigit,
    };
  }

  const genderCode = parseInt(clean.substring(6, 10), 10);
  const gender = genderCode >= 5000 ? 'Male' : 'Female';
  const citizenshipCode = parseInt(clean[10], 10);
  const citizenship = citizenshipCode === 0 ? 'SA Citizen' : 'Permanent Resident';

  return {
    valid: true,
    gender,
    citizenship,
    checkDigit: expectedCheckDigit,
  };
}
