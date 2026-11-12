import { NextRequest, NextResponse } from 'next/server';
import { generateRecordId, getCurrentFormattedDate } from '@/lib/utils';
import { calculateCorporateRoi } from '@/lib/roi-calculator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      companyName,
      contactPerson,
      email,
      industry,
      courseId,
      courseTitle,
      courseCategory,
      priceZAR,
      groupPricePerLearnerZAR,
      staffCount,
      includeReliefStaff,
      reliefDays,
    } = body || {};

    if (!companyName || !email || !staffCount) {
      return NextResponse.json(
        { error: 'Missing required corporate quote fields (companyName, email, staffCount).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid corporate email address.' },
        { status: 400 }
      );
    }

    const count = Math.max(1, Number(staffCount) || 1);
    const relief = Boolean(includeReliefStaff);
    const rDays = relief ? Math.max(0, Number(reliefDays) || 2) : 0;

    // Calculate verified financial figures on the server
    const financialBreakdown = calculateCorporateRoi({
      courseCategory: String(courseCategory || 'Specialized Hygiene & Technical'),
      priceZAR: Number(priceZAR) || 2450,
      groupPricePerLearnerZAR: Number(groupPricePerLearnerZAR) || 1950,
      learnerCount: count,
      disabledCount: 0,
      reliefStaffDays: rDays,
    });

    const quoteRecord = {
      id: generateRecordId('QT-2026'),
      companyName: String(companyName).trim(),
      contactPerson: String(contactPerson || 'HR & Procurement Lead').trim(),
      email: String(email).trim().toLowerCase(),
      industry: String(industry || 'Commercial Facilities & Real Estate').trim(),
      courseId: String(courseId || '').trim(),
      courseTitle: String(courseTitle || 'Vocational Training Programme').trim(),
      staffCount: count,
      includeReliefStaff: relief,
      reliefDays: rDays,
      totalEstimatedZAR: financialBreakdown.grossTotalInvestmentZAR,
      financialBreakdown,
      createdAt: getCurrentFormattedDate(),
      status: 'Quotation Issued · Pending Purchase Order',
    };

    console.log('[QUOTE_GENERATED]', JSON.stringify(quoteRecord));

    return NextResponse.json({
      success: true,
      message: 'Corporate quotation generated successfully.',
      record: quoteRecord,
    });
  } catch (error: unknown) {
    console.error('Error processing corporate quote:', error);
    return NextResponse.json(
      { error: 'Failed to process corporate quote.' },
      { status: 500 }
    );
  }
}

