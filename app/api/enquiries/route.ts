import { NextRequest, NextResponse } from 'next/server';
import { generateRecordId, getCurrentFormattedDate } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, enquiryType, message, department } = body || {};

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
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

    const enquiryRecord = {
      id: generateRecordId('ENQ'),
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone || '').trim(),
      enquiryType: String(enquiryType || 'General Institutional Enquiry').trim(),
      department: String(department || 'Northriding Academic Desk').trim(),
      message: String(message || '').trim(),
      createdAt: getCurrentFormattedDate(),
      status: 'Open · Routed to Northriding Desk',
    };

    console.log('[ENQUIRY_LOGGED]', JSON.stringify(enquiryRecord));

    return NextResponse.json({
      success: true,
      message: 'Enquiry received. Our academic team will respond within 24 business hours.',
      reference: enquiryRecord.id,
      record: enquiryRecord,
    });
  } catch (error: unknown) {
    console.error('Error logging enquiry:', error);
    return NextResponse.json(
      { error: 'Failed to record enquiry.' },
      { status: 500 }
    );
  }
}

