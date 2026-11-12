import { NextRequest, NextResponse } from 'next/server';
import { generateRecordId, getCurrentFormattedDate, validateSouthAfricanIdNumber } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      applicantName,
      idNumber,
      email,
      phone,
      applicantType,
      qualificationTitle,
      highestGrade,
      intakeWindow,
    } = body || {};

    if (!applicantName || !idNumber || !email) {
      return NextResponse.json(
        { error: 'Missing required fields (applicantName, idNumber, email).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // Verify SA ID number via Luhn algorithm
    const idCheck = validateSouthAfricanIdNumber(String(idNumber));
    if (!idCheck.valid) {
      return NextResponse.json(
        { error: `Invalid South African National ID: ${idCheck.reason}` },
        { status: 422 }
      );
    }

    const applicationRecord = {
      id: generateRecordId('LSH-2026'),
      applicantName: String(applicantName).trim(),
      idNumber: String(idNumber).replace(/\s+/g, ''),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '+27 11 000 0000').trim(),
      applicantType: String(applicantType || 'Individual Applicant'),
      qualificationTitle: String(qualificationTitle || 'Occupational Qualification').trim(),
      highestGrade: String(highestGrade || 'Grade 12 / Matric (NQF 4)').trim(),
      intakeWindow: String(intakeWindow || 'Next Available Intake').trim(),
      gender: idCheck.gender,
      citizenship: idCheck.citizenship,
      status: 'Document Verification & Screening Scheduled',
      createdAt: getCurrentFormattedDate(),
    };

    console.log('[LEARNERSHIP_APPLICATION_LOGGED]', JSON.stringify(applicationRecord));

    return NextResponse.json({
      success: true,
      message: 'Learnership application registered successfully.',
      record: applicationRecord,
    });
  } catch (error: unknown) {
    console.error('Error recording learnership application:', error);
    return NextResponse.json(
      { error: 'Failed to process application.' },
      { status: 500 }
    );
  }
}

