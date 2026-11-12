import { NextRequest, NextResponse } from 'next/server';
import { generateRecordId, getCurrentFormattedDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      courseId,
      courseTitle,
      learnerName,
      learnerEmail,
      paymentMethod,
      amountPaidZAR,
    } = body || {};

    if (!courseId || !courseTitle || !learnerName || !learnerEmail) {
      return NextResponse.json(
        { error: 'Missing required enrolment fields (courseId, title, learnerName, learnerEmail).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(learnerEmail)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const enrolmentRecord = {
      id: generateRecordId('ENR'),
      courseId: String(courseId).trim(),
      courseTitle: String(courseTitle).trim(),
      learnerName: String(learnerName).trim(),
      learnerEmail: String(learnerEmail).trim().toLowerCase(),
      paymentMethod: String(paymentMethod || 'Instant EFT / Secure Online').trim(),
      amountPaidZAR: Number(amountPaidZAR) || 0,
      enrolledAt: getCurrentFormattedDate(),
      status: 'Enrolled · Portal Access Active',
    };

    // Log to server console (in production, write to Postgres / Supabase / Prisma)
    console.log('[ENROLMENT_RECORDED]', JSON.stringify(enrolmentRecord));

    return NextResponse.json({
      success: true,
      message: 'Enrolment registered successfully.',
      record: enrolmentRecord,
    });
  } catch (error: unknown) {
    console.error('Error recording enrolment:', error);
    return NextResponse.json(
      { error: 'Failed to process enrolment request.' },
      { status: 500 }
    );
  }
}

