'use client';

import React, { useState } from 'react';
import {
  Course,
  CareerPathway,
  AssessmentFacility,
  BRAND_IMAGES,
} from '@/lib/academy-data';
import ResilientImage from './ResilientImage';
import {
  Download,
  CheckCircle2,
  Plus,
  FileSpreadsheet,
  Calendar,
  Calculator,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

export interface CorporateQuoteRecord {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  industry: string;
  courseTitle: string;
  staffCount: number;
  includeReliefStaff: boolean;
  totalEstimatedZAR: number;
  createdAt: string;
}

export interface LearnershipApplicationRecord {
  id: string;
  applicantName: string;
  idNumber: string;
  email: string;
  phone: string;
  applicantType: 'Individual Applicant' | 'Employer-Sponsored Cohort';
  qualificationTitle: string;
  highestGrade: string;
  intakeWindow: string;
  status: string;
  createdAt: string;
}

export interface VenueBookingRecord {
  id: string;
  organisationName: string;
  contactName: string;
  email: string;
  facilityName: string;
  selectedDate: string;
  sessionDuration: 'Full Day (08:00–16:30)' | 'Half Day (08:00–12:30)';
  candidateCount: number;
  purpose: string;
  quotedAmountZAR: number;
  createdAt: string;
}

interface EmployersViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onOpenBrochure: (course: Course) => void;
  onSaveQuote: (quote: CorporateQuoteRecord) => void;
  onEnrolCourse: (course: Course) => void;
}

export function EmployersView({
  courses,
  onSelectCourse,
  onOpenBrochure,
  onSaveQuote,
}: EmployersViewProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>(
    'Commercial Real Estate & Facilities'
  );

  // Multi-Step Guided Corporate Quote State
  const [quoteStep, setQuoteStep] = useState<1 | 2 | 3>(1);
  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [staffCount, setStaffCount] = useState<number>(10);
  const [deliveryLocation, setDeliveryLocation] = useState<string>(
    'On-Site at Client Premises'
  );
  const [preferredMonth, setPreferredMonth] = useState<string>(
    'January 2027 Q1 Rollout'
  );
  const [includeRelief, setIncludeRelief] = useState<boolean>(true);
  const [reliefDays, setReliefDays] = useState<number>(2);
  const [submittedQuote, setSubmittedQuote] =
    useState<CorporateQuoteRecord | null>(null);

  // Interactive B-BBEE & SARS Section 12H ROI Calculator State
  const [roiLearners, setRoiLearners] = useState<number>(10);
  const [roiDisabledCount, setRoiDisabledCount] = useState<number>(2);
  const [roiCourseId, setRoiCourseId] = useState<string>(
    'occ-cleaning-practitioner-nqf3'
  );
  const [roiReliefDays, setRoiReliefDays] = useState<number>(3);

  // Multi-staff batch enrolment state
  const [staffRoster, setStaffRoster] = useState<
    {
      id: string;
      fullName: string;
      idNumber: string;
      site: string;
      courseCode: string;
      progress: number;
      status: string;
    }[]
  >([
    {
      id: 'st-1',
      fullName: 'Sipho Ndlovu',
      idNumber: '9104125812084',
      site: 'Sandton Towers Precinct',
      courseCode: 'QCTO-CP-L3',
      progress: 85,
      status: 'Practical Bay Passed · EISA Ready',
    },
    {
      id: 'st-2',
      fullName: 'Nomsa Dlamini',
      idNumber: '9408220491082',
      site: 'Rosebank Medical Suites',
      courseCode: 'QCTO-CC-L1',
      progress: 100,
      status: 'Competent · Certificate Issued',
    },
    {
      id: 'st-3',
      fullName: 'Kabelo Mthembu',
      idNumber: '8911035291087',
      site: 'Midrand Logistics Hub',
      courseCode: 'TAA-SOLAR-04',
      progress: 60,
      status: 'Online Theory Complete · Practical Scheduled',
    },
  ]);

  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffId, setNewStaffId] = useState('');
  const [newStaffSite, setNewStaffSite] = useState('');
  const [newStaffCourse] = useState('QCTO-CP-L3');
  const [batchMessage, setBatchMessage] = useState('');

  const industries = [
    'Commercial Real Estate & Facilities',
    'Healthcare & Hospital Groups',
    'Hospitality, Hotels & Retail Malls',
    'Industrial, Warehousing & Manufacturing',
    'Solar PV & Commercial Roof Assets',
    'Enterprise & Supplier Development (ESD)',
  ];

  const chosenCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const unitCost =
    staffCount >= 5
      ? chosenCourse.groupPricePerLearnerZAR
      : chosenCourse.priceZAR;
  const reliefCost = includeRelief ? staffCount * reliefDays * 380 : 0;
  const totalQuoteZAR = unitCost * staffCount + reliefCost;

  // B-BBEE & Section 12H ROI Math
  const roiCourse =
    courses.find((c) => c.id === roiCourseId) || courses[0];
  const roiGrossTuition =
    (roiLearners >= 5
      ? roiCourse.groupPricePerLearnerZAR
      : roiCourse.priceZAR) * roiLearners;
  const roiReliefTotal = roiLearners * roiReliefDays * 380;
  const roiGrossTotal = roiGrossTuition + roiReliefTotal;

  const isLearnershipEligible =
    roiCourse.category === 'Occupational Qualifications';
  const ableBodiedCount = Math.max(0, roiLearners - roiDisabledCount);
  // SARS Section 12H: R40k commencement + R40k completion = R80k deduction per able-bodied learner; R60k + R60k = R120k per disabled learner
  const total12HDeductionAllowance = isLearnershipEligible
    ? ableBodiedCount * 80000 + roiDisabledCount * 120000
    : 0;
  // At 27% South African corporate income tax rate:
  const cashTaxSaving12H = Math.round(total12HDeductionAllowance * 0.27);
  // Estimated Services SETA Mandatory/Discretionary grant recovery (~25% of tuition)
  const estimatedSetaGrant = Math.round(roiGrossTuition * 0.25);
  const netEffectiveCost = roiGrossTotal - cashTaxSaving12H - estimatedSetaCost(estimatedSetaGrant);

  function estimatedSetaCost(grant: number) {
    return grant;
  }

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactEmail.trim()) return;

    const record: CorporateQuoteRecord = {
      id: `QT-2026-${4100 + companyName.trim().length * 19 + staffCount}`,
      companyName,
      contactPerson: contactPerson || 'HR / L&D Lead',
      email: contactEmail,
      industry: selectedIndustry,
      courseTitle: chosenCourse.title,
      staffCount,
      includeReliefStaff: includeRelief,
      totalEstimatedZAR: totalQuoteZAR,
      createdAt: '10 Nov 2026',
    };
    setSubmittedQuote(record);
    onSaveQuote(record);
  };

  const handleAddStaffMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffName.trim() || !newStaffId.trim()) return;
    setStaffRoster((prev) => [
      ...prev,
      {
        id: `st-${prev.length + 10}`,
        fullName: newStaffName.trim(),
        idNumber: newStaffId.trim(),
        site: newStaffSite.trim() || 'Head Office Site',
        courseCode: newStaffCourse,
        progress: 10,
        status: 'Enrolled · Onboarding Link Sent',
      },
    ]);
    setNewStaffName('');
    setNewStaffId('');
    setNewStaffSite('');
    setBatchMessage(
      'Staff member enrolled into corporate cohort with automated SMS/email login link.'
    );
  };

  const exportWspReport = () => {
    const headers =
      'Full Name,SA ID Number,Site Location,Course Code,Completion %,Competency Status\n';
    const rows = staffRoster
      .map(
        (s) =>
          `"${s.fullName}","${s.idNumber}","${s.site}","${s.courseCode}",${s.progress}%,"${s.status}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Training_Africa_Academy_WSP_ATR_Cohort_Report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <p className="text-xs font-semibold text-[#059669] mb-2">
            06. Training for Employers · HR, L&D, WSP/ATR & Operations
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545] max-w-2xl">
            Upskill Your Hygiene & Facility Teams Without Site Disruption
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            QCTO and Services SETA-aligned workforce training backed by Cleaning Africa Services. Train on-site or at our Randburg campus—with optional vetted Relief Staff at R380/day while your core team trains.
          </p>
        </div>

        <div className="bg-[#0B2545] text-white p-4 rounded-xl text-xs space-y-1 shrink-0">
          <p className="text-[#F59E0B] font-semibold">
            B-BBEE & SETA Compliance Ready
          </p>
          <p className="text-slate-200">· Mandatory & Discretionary Grant Support</p>
          <p className="text-slate-200">· Section 12H Learnership Tax Allowances</p>
          <p className="text-slate-200">· Authorised Employer Progress Reporting</p>
        </div>
      </div>

      {/* Step 1: Industry Selector & Recommended Corporate Programmes */}
      <div>
        <h2 className="text-lg font-bold text-[#0B2545] mb-3">
          01. Select Your Industry or Operational Training Need
        </h2>
        <div className="flex flex-wrap gap-2">
          {industries.map((ind) => (
            <button
              key={ind}
              type="button"
              onClick={() => setSelectedIndustry(ind)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                selectedIndustry === ind
                  ? 'bg-[#0B2545] text-white border-[#0B2545]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {ind}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {courses.slice(0, 3).map((c) => (
            <div
              key={c.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs text-slate-500 font-mono">
                  {c.code} · {c.nqfLevel} · {c.credits} Credits
                </p>
                <h3 className="text-base font-bold text-[#0B2545] mt-1">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2">{c.shortSummary}</p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-slate-500 block">
                    Group Rate (5+)
                  </span>
                  <span className="text-base font-bold font-mono text-[#059669] tabular-nums">
                    R{c.groupPricePerLearnerZAR.toLocaleString('en-ZA')}/staff
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure(c)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Brochure</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCourse(c.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#133B6E] rounded-lg cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEW UX ENHANCEMENT: INTERACTIVE B-BBEE & SARS SECTION 12H ROI CALCULATOR */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <Calculator className="w-6 h-6 text-[#059669] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#059669]">
                Interactive Financial Justification Tool · SARS Section 12H & SETA Rebates
              </p>
              <h2 className="text-xl font-bold text-[#0B2545]">
                02. Corporate B-BBEE, Section 12H Tax Allowance & Relief Staff ROI Calculator
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Model your gross training + relief staff expenditure against South African Section 12H corporate tax savings (27% corporate tax rate) and Services SETA grant recoveries.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left 7 Cols: Interactive Sliders */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <label
                htmlFor="roi-course-select"
                className="block text-xs font-semibold text-[#0B2545] mb-1.5"
              >
                Select Accredited Qualification or Skills Programme
              </label>
              <select
                id="roi-course-select"
                value={roiCourseId}
                onChange={(e) => setRoiCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg text-[#0B2545] font-medium"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.title} ({c.nqfLevel})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <label htmlFor="roi-learners">Total Staff Cohort</label>
                  <span className="font-mono font-bold text-[#0B2545] tabular-nums">
                    {roiLearners}
                  </span>
                </div>
                <input
                  id="roi-learners"
                  type="range"
                  min={1}
                  max={50}
                  value={roiLearners}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setRoiLearners(val);
                    if (roiDisabledCount > val) setRoiDisabledCount(val);
                  }}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <label htmlFor="roi-disabled">Learners w/ Disability</label>
                  <span className="font-mono font-bold text-[#059669] tabular-nums">
                    {roiDisabledCount}
                  </span>
                </div>
                <input
                  id="roi-disabled"
                  type="range"
                  min={0}
                  max={roiLearners}
                  value={roiDisabledCount}
                  onChange={(e) => setRoiDisabledCount(Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-lg">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <label htmlFor="roi-relief">Relief Staff Days</label>
                  <span className="font-mono font-bold text-[#0B2545] tabular-nums">
                    {roiReliefDays}d
                  </span>
                </div>
                <input
                  id="roi-relief"
                  type="range"
                  min={0}
                  max={10}
                  value={roiReliefDays}
                  onChange={(e) => setRoiReliefDays(Number(e.target.value))}
                  className="w-full accent-[#059669] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Financial Ledger Output */}
          <div className="lg:col-span-5 bg-[#0B2545] text-white rounded-xl p-6 space-y-3 text-xs">
            <p className="text-[#F59E0B] font-semibold">
              Corporate Financial & Tax Impact Breakdown ({roiLearners} Staff)
            </p>
            <div className="flex justify-between py-1.5 border-b border-white/10">
              <span className="text-slate-300">Gross Cohort Tuition</span>
              <span className="font-mono font-semibold tabular-nums">
                R{roiGrossTuition.toLocaleString('en-ZA')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/10">
              <span className="text-slate-300">
                Vetted Relief Staff ({roiLearners} × {roiReliefDays}d × R380)
              </span>
              <span className="font-mono font-semibold tabular-nums">
                R{roiReliefTotal.toLocaleString('en-ZA')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/10 text-emerald-300">
              <span>Est. Services SETA Grant Recovery (~25%)</span>
              <span className="font-mono font-semibold tabular-nums">
                - R{estimatedSetaGrant.toLocaleString('en-ZA')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/10 text-emerald-300">
              <span>
                SARS Sec 12H Cash Tax Saving (27% of R
                {total12HDeductionAllowance.toLocaleString('en-ZA')})
              </span>
              <span className="font-mono font-semibold tabular-nums">
                - R{cashTaxSaving12H.toLocaleString('en-ZA')}
              </span>
            </div>
            <div className="pt-2 flex items-baseline justify-between">
              <div>
                <span className="text-sm font-bold text-white block">
                  Net Effective Cost After Tax & Grants
                </span>
                <span className="text-[11px] text-slate-300">
                  {netEffectiveCost <= 0
                    ? 'Net Tax-Positive Learnership Benefit!'
                    : `Effective R${Math.round(netEffectiveCost / roiLearners).toLocaleString('en-ZA')} per employee`}
                </span>
              </div>
              <span className="text-xl font-bold font-mono text-[#F59E0B] tabular-nums">
                {netEffectiveCost <= 0
                  ? `+R${Math.abs(netEffectiveCost).toLocaleString('en-ZA')} Gain`
                  : `R${netEffectiveCost.toLocaleString('en-ZA')}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 3 & 4: 3-Step Guided Group Quote Wizard & Multi-Staff Cohort Portal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: 3-Step Guided Group Quote Wizard */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">
                03. Guided 3-Step Group Quote Builder
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Step {quoteStep} of 3 — Instant official quotation for procurement & WSP
              </p>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {[1, 2, 3].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuoteStep(s as 1 | 2 | 3)}
                  className={`w-7 h-7 rounded-md font-bold cursor-pointer ${
                    quoteStep === s
                      ? 'bg-[#0B2545] text-white'
                      : quoteStep > s
                      ? 'bg-emerald-100 text-[#059669]'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleQuoteSubmit} className="mt-5 space-y-5">
            {quoteStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="emp-course"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    1. Select Accredited Qualification or Short Course
                  </label>
                  <select
                    id="emp-course"
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} — {c.title} (Group Rate: R
                        {c.groupPricePerLearnerZAR.toLocaleString('en-ZA')})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor="emp-staff-slider">
                      2. Number of Employees to Train
                    </label>
                    <span className="font-mono font-bold text-[#0B2545] tabular-nums">
                      {staffCount} Staff Members
                    </span>
                  </div>
                  <input
                    id="emp-staff-slider"
                    type="range"
                    min={2}
                    max={60}
                    value={staffCount}
                    onChange={(e) => setStaffCount(Number(e.target.value))}
                    className="w-full accent-[#059669] cursor-pointer"
                  />
                </div>

                <div className="p-3.5 bg-[#F8FAFC] border border-slate-200 rounded-lg">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRelief}
                      onChange={(e) => setIncludeRelief(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#059669]"
                    />
                    <span className="text-xs text-slate-700">
                      <strong className="text-[#0B2545] block">
                        Include Cleaning Africa Services Relief Staff (R380/day per operative)
                      </strong>
                      Keep your buildings fully serviced while your staff complete practical training.
                    </span>
                  </label>
                  {includeRelief && (
                    <div className="mt-2.5 pl-6 flex items-center gap-2">
                      <span className="text-xs text-slate-600">Relief Days:</span>
                      {[1, 2, 3, 5].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setReliefDays(d)}
                          className={`px-2.5 py-1 text-xs rounded font-mono cursor-pointer ${
                            reliefDays === d
                              ? 'bg-[#0B2545] text-white font-semibold'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setQuoteStep(2)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Delivery & Schedule</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {quoteStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="emp-delivery"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Preferred Training Delivery Site
                  </label>
                  <select
                    id="emp-delivery"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  >
                    <option value="On-Site at Client Premises">
                      On-Site at Client Premises
                    </option>
                    <option value="Randburg Training & Assessment Centre">
                      Randburg Training & Assessment Centre
                    </option>
                    <option value="Blended (Online Theory + Practical Bay)">
                      Blended (Online Theory + Practical Bay)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="emp-month"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Target Rollout Window
                  </label>
                  <select
                    id="emp-month"
                    value={preferredMonth}
                    onChange={(e) => setPreferredMonth(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  >
                    <option value="Immediate (Next 14 Days)">
                      Immediate (Next 14 Days)
                    </option>
                    <option value="January 2027 Q1 Rollout">
                      January 2027 Q1 Rollout
                    </option>
                    <option value="Q2 2027 WSP Cycle">
                      Q2 2027 WSP Cycle
                    </option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setQuoteStep(1)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-[#0B2545] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuoteStep(3)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Company Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {quoteStep === 3 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="emp-company"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Company / Organisation Name *
                    </label>
                    <input
                      id="emp-company"
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Growthpoint Properties"
                      className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="emp-contact"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      HR / L&D / Operations Contact *
                    </label>
                    <input
                      id="emp-contact"
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="emp-email"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Corporate Email Address *
                  </label>
                  <input
                    id="emp-email"
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="hr@company.co.za"
                    className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                  />
                </div>

                <div className="p-4 bg-[#0B2545] text-white rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-300 block">
                      Total Corporate Quote ({staffCount} Staff · {preferredMonth})
                    </span>
                    <span className="text-2xl font-bold font-mono tabular-nums">
                      R{totalQuoteZAR.toLocaleString('en-ZA')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuoteStep(2)}
                      className="px-3 py-2 text-xs text-slate-300 hover:text-white cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-xs font-semibold bg-[#059669] hover:bg-[#047857] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Generate Official Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>

          {submittedQuote && (
            <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1">
              <p className="font-bold text-sm text-emerald-900">
                ✓ Formal Quotation Generated — Ref: {submittedQuote.id}
              </p>
              <p>
                Prepared for <strong>{submittedQuote.companyName}</strong> (
                {submittedQuote.contactPerson}) · {submittedQuote.staffCount}{' '}
                staff on <strong>{submittedQuote.courseTitle}</strong>.
              </p>
              <p>
                Total Quoted:{' '}
                <strong className="font-mono">
                  R{submittedQuote.totalEstimatedZAR.toLocaleString('en-ZA')}
                </strong>{' '}
                · Saved to your persistent Employer Ledger.
              </p>
            </div>
          )}
        </div>

        {/* Right 6 Cols: Multi-Staff Enrolment & Authorised Cohort Progress Tracker */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-xl font-bold text-[#0B2545]">
                04. Multi-Staff Cohort Enrolment & Authorised Progress Portal
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Enrol multiple employees with admin support and monitor real-time completion for WSP/ATR reporting.
              </p>
            </div>
            <button
              type="button"
              onClick={exportWspReport}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#059669]" />
              <span>Export WSP CSV</span>
            </button>
          </div>

          <form
            onSubmit={handleAddStaffMember}
            className="mt-4 grid grid-cols-1 sm:grid-cols-12 gap-2.5"
          >
            <input
              type="text"
              placeholder="Employee Full Name *"
              value={newStaffName}
              onChange={(e) => setNewStaffName(e.target.value)}
              className="sm:col-span-4 px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="SA ID / Passport *"
              value={newStaffId}
              onChange={(e) => setNewStaffId(e.target.value)}
              className="sm:col-span-3 px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg font-mono"
            />
            <input
              type="text"
              placeholder="Site Location"
              value={newStaffSite}
              onChange={(e) => setNewStaffSite(e.target.value)}
              className="sm:col-span-3 px-3 py-2 text-xs bg-[#F8FAFC] border border-slate-300 rounded-lg"
            />
            <button
              type="submit"
              className="sm:col-span-2 py-2 px-3 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enrol</span>
            </button>
          </form>

          {batchMessage && (
            <p className="mt-2 text-xs text-[#059669] font-medium">
              {batchMessage}
            </p>
          )}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="py-2.5 pr-3 font-semibold">Employee & ID</th>
                  <th className="py-2.5 px-3 font-semibold">Site</th>
                  <th className="py-2.5 px-3 font-semibold">Course</th>
                  <th className="py-2.5 px-3 font-semibold">Progress</th>
                  <th className="py-2.5 pl-3 font-semibold">
                    Verification Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {staffRoster.map((st) => (
                  <tr key={st.id}>
                    <td className="py-3 pr-3">
                      <p className="font-semibold text-[#0B2545]">
                        {st.fullName}
                      </p>
                      <p className="font-mono text-slate-500 tabular-nums">
                        {st.idNumber}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-slate-600">{st.site}</td>
                    <td className="py-3 px-3 font-mono text-[#0B2545]">
                      {st.courseCode}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#059669] tabular-nums">
                      {st.progress}%
                    </td>
                    <td className="py-3 pl-3 text-slate-700 font-medium">
                      {st.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QualificationsViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onSaveApplication: (app: LearnershipApplicationRecord) => void;
}

export function QualificationsView({
  courses,
  onSelectCourse,
  onSaveApplication,
}: QualificationsViewProps) {
  const qualificationCourses = courses.filter(
    (c) => c.category === 'Occupational Qualifications'
  );

  const [applicantName, setApplicantName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applicantType, setApplicantType] = useState<
    'Individual Applicant' | 'Employer-Sponsored Cohort'
  >('Individual Applicant');
  const [selectedQualId, setSelectedQualId] = useState(
    qualificationCourses[0]?.id || ''
  );
  const [highestGrade, setHighestGrade] = useState('Grade 12 / Matric (NQF 4)');
  const [intakeWindow, setIntakeWindow] = useState('January 2027 Q1 Intake');
  const [confirmation, setConfirmation] =
    useState<LearnershipApplicationRecord | null>(null);

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !idNumber.trim() || !email.trim()) return;

    const qual =
      qualificationCourses.find((q) => q.id === selectedQualId) ||
      qualificationCourses[0];

    const record: LearnershipApplicationRecord = {
      id: `LSH-2026-${
        34800 + applicantName.trim().length * 17 + idNumber.trim().length
      }`,
      applicantName: applicantName.trim(),
      idNumber: idNumber.trim(),
      email: email.trim(),
      phone: phone.trim() || '+27 82 000 0000',
      applicantType,
      qualificationTitle: qual.title,
      highestGrade,
      intakeWindow,
      status: 'Document Verification & Screening Scheduled',
      createdAt: '10 Nov 2026',
    };
    setConfirmation(record);
    onSaveApplication(record);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="pb-8 border-b border-slate-200">
        <p className="text-xs font-semibold text-[#059669] mb-2">
          07. Qualifications & Learnerships · QCTO & Services SETA Registered
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545] max-w-3xl">
          National Occupational Qualifications & 12-Month Learnerships
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl">
          Review entry criteria, SAQA credits, upcoming intake schedules, and submit your structured application online.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {qualificationCourses.map((q) => (
          <div
            key={q.id}
            className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono text-[#059669] mb-2">
                {q.saqaId} · {q.nqfLevel} · {q.credits} Credits
              </div>
              <h2 className="text-lg font-bold text-[#0B2545]">{q.title}</h2>
              <p className="text-sm text-slate-600 mt-2">{q.fullDescription}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                <p>
                  <strong className="text-[#0B2545]">Duration:</strong>{' '}
                  {q.duration}
                </p>
                <p>
                  <strong className="text-[#0B2545]">Next Intake:</strong>{' '}
                  {q.nextIntake}
                </p>
                <p>
                  <strong className="text-[#0B2545]">Entry Criteria:</strong>{' '}
                  {q.prerequisites.join('; ')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 block">
                  Learnership Tuition
                </span>
                <span className="font-mono text-lg font-bold text-[#0B2545] tabular-nums">
                  R{q.priceZAR.toLocaleString('en-ZA')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectCourse(q.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#0B2545] hover:bg-[#133B6E] rounded-lg cursor-pointer"
              >
                View Modules
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#F59E0B]">
              Mandatory Documentation & Intake Rules
            </p>
            <h2 className="text-xl font-bold mt-1">
              Learnership Application Checklist
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Certified copy of South African ID or valid work permit (certified within 3 months).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Certified copy of highest school qualification or ABET numeracy/literacy transcript.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Host Employer workplace placement letter (or select Training Africa Academy host placement assistance).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Tripartite Learnership Agreement registration with Services SETA prior to induction.
              </span>
            </li>
          </ul>

          <div className="p-4 bg-white/10 rounded-lg border border-white/10 text-xs space-y-1">
            <p className="font-bold text-[#F59E0B]">
              Employer Tax Benefit (Section 12H SARS Allowance)
            </p>
            <p className="text-slate-200">
              Host employers can claim up to{' '}
              <strong className="font-mono">R40,000</strong> annual commencement +{' '}
              <strong className="font-mono">R40,000</strong> completion tax deduction per able-bodied learner (up to{' '}
              <strong className="font-mono">R60,000 + R60,000</strong> for learners with disabilities).
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0B2545]">
            Submit Structured Learnership Application
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Complete the form below to receive your official application reference and next-steps induction pack.
          </p>

          <form onSubmit={handleSubmitApplication} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-name"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Applicant / Coordinator Full Name *
                </label>
                <input
                  id="lsh-name"
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Lerato Khumalo"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="lsh-id"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  SA ID Number (13 Digits) *
                </label>
                <input
                  id="lsh-id"
                  type="text"
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="9605140291081"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-email"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="lsh-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lerato@example.co.za"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="lsh-phone"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Mobile / WhatsApp Number *
                </label>
                <input
                  id="lsh-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 82 539 8605"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-type"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Application Category
                </label>
                <select
                  id="lsh-type"
                  value={applicantType}
                  onChange={(e) =>
                    setApplicantType(
                      e.target.value as
                        | 'Individual Applicant'
                        | 'Employer-Sponsored Cohort'
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                >
                  <option value="Individual Applicant">
                    Individual Self-Funded / Bursary Applicant
                  </option>
                  <option value="Employer-Sponsored Cohort">
                    Employer-Sponsored Learnership Cohort
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="lsh-grade"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Highest School / NQF Qualification Completed
                </label>
                <select
                  id="lsh-grade"
                  value={highestGrade}
                  onChange={(e) => setHighestGrade(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                >
                  <option value="Grade 9 / ABET Level 4 (NQF 1)">
                    Grade 9 / ABET Level 4 (NQF 1)
                  </option>
                  <option value="Grade 10 / Grade 11 (NQF 2–3)">
                    Grade 10 / Grade 11 (NQF 2–3)
                  </option>
                  <option value="Grade 12 / Matric (NQF 4)">
                    Grade 12 / Matric (NQF 4)
                  </option>
                  <option value="Post-School Certificate / Diploma">
                    Post-School Certificate / Diploma
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-qual"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Target Qualification
                </label>
                <select
                  id="lsh-qual"
                  value={selectedQualId}
                  onChange={(e) => setSelectedQualId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                >
                  {qualificationCourses.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.nqfLevel} — {q.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="lsh-intake"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Preferred Intake Window
                </label>
                <select
                  id="lsh-intake"
                  value={intakeWindow}
                  onChange={(e) => setIntakeWindow(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                >
                  <option value="January 2027 Q1 Intake">
                    January 2027 Q1 Intake
                  </option>
                  <option value="April 2027 Q2 Intake">
                    April 2027 Q2 Intake
                  </option>
                  <option value="Immediate Corporate Cohort">
                    Immediate Corporate Cohort
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
            >
              Submit Learnership Application & Receive Next Steps
            </button>
          </form>

          {confirmation && (
            <div className="mt-6 p-5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-2">
              <p className="text-sm font-bold text-emerald-900">
                ✓ Application Confirmed — Reference:{' '}
                <span className="font-mono">{confirmation.id}</span>
              </p>
              <p>
                Applicant: <strong>{confirmation.applicantName}</strong> (
                {confirmation.applicantType}) · Qualification:{' '}
                <strong>{confirmation.qualificationTitle}</strong> (
                {confirmation.intakeWindow}).
              </p>
              <div className="pt-2 border-t border-emerald-200">
                <p className="font-semibold text-emerald-900 mb-1">
                  Your Next Steps:
                </p>
                <p>
                  01. Email certified ID & qualification copies quoting ref{' '}
                  <strong className="font-mono">{confirmation.id}</strong> to
                  info@trainingafricaacademy.co.za.
                </p>
                <p>
                  02. Attend online or Randburg placement numeracy/literacy screening within 5 business days.
                </p>
                <p>
                  03. Sign SETA Tripartite Learnership Agreement and receive your induction schedule.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface PathwaysViewProps {
  pathways: CareerPathway[];
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
}

export function PathwaysView({
  pathways,
  courses,
  onSelectCourse,
  onEnrolCourse,
}: PathwaysViewProps) {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="pb-8 border-b border-slate-200">
        <p className="text-xs font-semibold text-[#059669] mb-2">
          08. Career & Learning Pathways · Structured NQF Mobility
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545] max-w-3xl">
          Map Your Career from Entry Operative to Supervisor or Business Owner
        </h1>
        <p className="mt-3 text-base text-slate-600 max-w-2xl">
          Choose your desired occupational destination below to see the exact sequence of accredited modules, durations, and earning benchmarks.
        </p>
      </div>

      <div className="space-y-8">
        {pathways.map((pathway) => (
          <section
            key={pathway.id}
            className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#0B2545]">
                  {pathway.title}
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  {pathway.subtitle}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 shrink-0">
                <div>
                  <span className="block text-slate-400">Target Role</span>
                  <strong className="text-[#0B2545]">
                    {pathway.targetRole}
                  </strong>
                </div>
                <div>
                  <span className="block text-slate-400">
                    Typical Earnings / Revenue
                  </span>
                  <strong className="font-mono text-[#059669]">
                    {pathway.estimatedEarningsRange}
                  </strong>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pathway.steps.map((step) => {
                const matchedCourse = courses.find(
                  (c) => c.id === step.courseId
                );
                return (
                  <div
                    key={step.stepNumber}
                    className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span className="font-mono font-bold text-[#059669]">
                          {step.stepNumber}
                        </span>
                        <span>{step.nqf}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#0B2545]">
                        {step.stageTitle}
                      </h3>
                      <p className="text-xs text-slate-600 mt-2">
                        {step.outcome}
                      </p>
                    </div>

                    {matchedCourse && (
                      <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#0B2545] tabular-nums">
                          R{matchedCourse.priceZAR.toLocaleString('en-ZA')}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onSelectCourse(matchedCourse.id)}
                            className="text-xs font-semibold text-[#0B2545] hover:underline cursor-pointer"
                          >
                            Curriculum
                          </button>
                          <button
                            type="button"
                            onClick={() => onEnrolCourse(matchedCourse)}
                            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg cursor-pointer"
                          >
                            Enrol
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ASSESSMENT CENTRE & VENUE HIRE WITH INTERACTIVE MONTHLY CALENDAR GRID      */
/* -------------------------------------------------------------------------- */

interface AssessmentCentreViewProps {
  facilities: AssessmentFacility[];
  onSaveBooking: (booking: VenueBookingRecord) => void;
}

const NOVEMBER_2026_GRID: {
  day: number;
  dateStr: string;
  weekday: string;
  status: 'available' | 'limited' | 'booked' | 'weekend';
}[] = [
  { day: 16, dateStr: '2026-11-16', weekday: 'Mon', status: 'available' },
  { day: 17, dateStr: '2026-11-17', weekday: 'Tue', status: 'available' },
  { day: 18, dateStr: '2026-11-18', weekday: 'Wed', status: 'limited' },
  { day: 19, dateStr: '2026-11-19', weekday: 'Thu', status: 'available' },
  { day: 20, dateStr: '2026-11-20', weekday: 'Fri', status: 'available' },
  { day: 21, dateStr: '2026-11-21', weekday: 'Sat', status: 'limited' },
  { day: 23, dateStr: '2026-11-23', weekday: 'Mon', status: 'available' },
  { day: 24, dateStr: '2026-11-24', weekday: 'Tue', status: 'available' },
  { day: 25, dateStr: '2026-11-25', weekday: 'Wed', status: 'booked' },
  { day: 26, dateStr: '2026-11-26', weekday: 'Thu', status: 'available' },
  { day: 27, dateStr: '2026-11-27', weekday: 'Fri', status: 'available' },
  { day: 28, dateStr: '2026-11-28', weekday: 'Sat', status: 'limited' },
  { day: 30, dateStr: '2026-11-30', weekday: 'Mon', status: 'available' },
  { day: 1, dateStr: '2026-12-01', weekday: 'Tue', status: 'available' },
  { day: 2, dateStr: '2026-12-02', weekday: 'Wed', status: 'available' },
  { day: 3, dateStr: '2026-12-03', weekday: 'Thu', status: 'limited' },
  { day: 4, dateStr: '2026-12-04', weekday: 'Fri', status: 'available' },
  { day: 5, dateStr: '2026-12-05', weekday: 'Sat', status: 'booked' },
];

export function AssessmentCentreView({
  facilities,
  onSaveBooking,
}: AssessmentCentreViewProps) {
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    facilities[0]?.id || ''
  );
  const activeFacility =
    facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const [selectedDates, setSelectedDates] = useState<string[]>([
    activeFacility.availableDates[0] || '2026-11-19',
  ]);
  const [sessionDuration, setSessionDuration] = useState<
    'Full Day (08:00–16:30)' | 'Half Day (08:00–12:30)'
  >('Full Day (08:00–16:30)');
  const [candidateCount, setCandidateCount] = useState<number>(12);
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState(
    'QCTO EISA Practical Assessment / Trade Test'
  );
  const [includeCatering, setIncludeCatering] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<VenueBookingRecord | null>(null);

  const toggleCalendarDate = (dateStr: string) => {
    setSelectedDates((prev) =>
      prev.includes(dateStr)
        ? prev.length > 1
          ? prev.filter((d) => d !== dateStr)
          : prev
        : [...prev, dateStr]
    );
  };

  const daysCount = Math.max(1, selectedDates.length);
  const baseVenueRate =
    (sessionDuration === 'Full Day (08:00–16:30)'
      ? activeFacility.dailyHireRateZAR
      : activeFacility.halfDayRateZAR) * daysCount;
  const cateringCost = includeCatering
    ? candidateCount * 145 * daysCount
    : 0;
  const totalVenueQuote = baseVenueRate + cateringCost;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !email.trim()) return;

    const record: VenueBookingRecord = {
      id: `VEN-2026-${6200 + orgName.trim().length * 13 + candidateCount}`,
      organisationName: orgName.trim(),
      contactName: contactName.trim() || 'Assessment Coordinator',
      email: email.trim(),
      facilityName: activeFacility.name,
      selectedDate: selectedDates.join(', '),
      sessionDuration,
      candidateCount,
      purpose,
      quotedAmountZAR: totalVenueQuote,
      createdAt: '10 Nov 2026',
    };
    setConfirmedBooking(record);
    onSaveBooking(record);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#059669] mb-2">
              09. Accredited Assessment Centre & Venue Hire · Northriding, Randburg
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545]">
              Purpose-Built Practical Simulation Bays, Solar Rigs & EISA Lecture Suites
            </h1>
            <p className="mt-3 text-base text-slate-600">
              Located at Unit 14 Fancourt Office Park, Northriding, Randburg. Approved for QCTO External Integrated Summative Assessments (EISA), practical trade simulations, and external training provider venue hire.
            </p>
          </div>
          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">Backup Power</span>
              <strong className="text-[#0B2545]">100% Solar & Generator</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Assessment Scope</span>
              <strong className="text-[#0B2545]">QCTO & Services SETA</strong>
            </div>
            <div>
              <span className="text-slate-500 block">Parking & Access</span>
              <strong className="text-[#0B2545]">Secure Bus & Fleet Bay</strong>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative min-h-[260px]">
          <ResilientImage
            src={BRAND_IMAGES.assessmentCentre}
            alt="Randburg Accredited Vocational Assessment Centre and Simulation Bays"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: Select Facility & Interactive Monthly Calendar Grid */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#0B2545]">
              01. Select Assessment Bay or Training Suite
            </h2>
            {facilities.map((fac) => {
              const isSelected = fac.id === activeFacility.id;
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacilityId(fac.id)}
                  className={`p-5 rounded-xl border transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#059669] ring-1 ring-[#059669]'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-[#059669]">
                        {fac.accreditationScope}
                      </p>
                      <h3 className="text-base font-bold text-[#0B2545] mt-1">
                        {fac.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {fac.capacity}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs text-slate-500 block">
                        Full Day
                      </span>
                      <span className="font-mono text-base font-bold text-[#0B2545] tabular-nums">
                        R{fac.dailyHireRateZAR.toLocaleString('en-ZA')}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                    {fac.equipmentIncluded.map((eq, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] shrink-0 mt-0.5" />
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Interactive Calendar Grid for Randburg Venue Bookings */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#059669]" />
                <h3 className="text-base font-bold text-[#0B2545]">
                  02. Interactive Availability Calendar (Nov – Dec 2026)
                </h3>
              </div>
              <span className="text-xs font-mono text-[#059669] font-semibold">
                {selectedDates.length} Date(s) Selected
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Click one or multiple dates below to build a single-day or multi-day EISA assessment booking for{' '}
              <strong className="text-[#0B2545]">{activeFacility.name}</strong>:
            </p>

            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {NOVEMBER_2026_GRID.map((slot) => {
                const isPicked = selectedDates.includes(slot.dateStr);
                const isBooked = slot.status === 'booked';
                return (
                  <button
                    key={slot.dateStr}
                    type="button"
                    disabled={isBooked}
                    onClick={() => toggleCalendarDate(slot.dateStr)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isBooked
                        ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        : isPicked
                        ? 'bg-[#0B2545] border-[#0B2545] text-white cursor-pointer'
                        : 'bg-[#F8FAFC] border-slate-200 text-[#0B2545] hover:border-[#059669] cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span>{slot.weekday}</span>
                      <span
                        className={
                          isPicked
                            ? 'text-[#F59E0B] font-bold'
                            : slot.status === 'limited'
                            ? 'text-amber-600'
                            : 'text-[#059669]'
                        }
                      >
                        {isBooked
                          ? 'Full'
                          : isPicked
                          ? '✓'
                          : slot.status === 'limited'
                          ? '1 Bay'
                          : 'Open'}
                      </span>
                    </div>
                    <p className="text-xs font-bold font-mono mt-1 tabular-nums">
                      {slot.dateStr.slice(5)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Booking & Quotation Request Form */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#0B2545]">
            03. Confirm Assessment Centre Booking & Instant Quotation
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Selected Facility:{' '}
            <strong className="text-[#0B2545]">{activeFacility.name}</strong>
          </p>
          <p className="text-xs font-mono text-[#059669] mt-1">
            Selected Date(s): {selectedDates.join(' · ')} ({daysCount}{' '}
            {daysCount === 1 ? 'Day' : 'Days'})
          </p>

          <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ven-org"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Organisation / SDP Name *
                </label>
                <input
                  id="ven-org"
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Skills Development Provider / Employer"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="ven-contact"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Contact Person *
                </label>
                <input
                  id="ven-contact"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ven-email"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Email Address for Quotation *
                </label>
                <input
                  id="ven-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="assessments@organisation.co.za"
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="ven-duration"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Daily Session Duration
                </label>
                <select
                  id="ven-duration"
                  value={sessionDuration}
                  onChange={(e) =>
                    setSessionDuration(
                      e.target.value as
                        | 'Full Day (08:00–16:30)'
                        | 'Half Day (08:00–12:30)'
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
                >
                  <option value="Full Day (08:00–16:30)">
                    Full Day (08:00–16:30) — R
                    {activeFacility.dailyHireRateZAR.toLocaleString('en-ZA')}
                    /day
                  </option>
                  <option value="Half Day (08:00–12:30)">
                    Half Day (08:00–12:30) — R
                    {activeFacility.halfDayRateZAR.toLocaleString('en-ZA')}/day
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="ven-purpose"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Booking Purpose / Scope
              </label>
              <select
                id="ven-purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg"
              >
                <option value="QCTO EISA Practical Assessment / Trade Test">
                  QCTO EISA Practical Assessment / Trade Test
                </option>
                <option value="Corporate Practical Training Workshop">
                  Corporate Practical Training Workshop
                </option>
                <option value="RPL (Recognition of Prior Learning) Evaluation">
                  RPL (Recognition of Prior Learning) Evaluation
                </option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="ven-candidates">
                  Number of Candidates / Delegates
                </label>
                <span className="font-mono font-bold text-[#0B2545] tabular-nums">
                  {candidateCount} Candidates
                </span>
              </div>
              <input
                id="ven-candidates"
                type="range"
                min={4}
                max={32}
                value={candidateCount}
                onChange={(e) => setCandidateCount(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCatering}
                onChange={(e) => setIncludeCatering(e.target.checked)}
                className="rounded border-slate-300 text-[#059669]"
              />
              <span>
                Add Tea/Coffee & Working Lunch Catering (R145 per delegate/day)
              </span>
            </label>

            <div className="p-4 bg-[#0B2545] text-white rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 block">
                  Total Venue Quotation ({daysCount}{' '}
                  {daysCount === 1 ? 'Day' : 'Days'})
                </span>
                <span className="text-2xl font-bold font-mono tabular-nums">
                  R{totalVenueQuote.toLocaleString('en-ZA')}
                </span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold bg-[#059669] hover:bg-[#047857] text-white rounded-lg transition-colors cursor-pointer"
              >
                Reserve Date(s) & Quote
              </button>
            </div>
          </form>

          {confirmedBooking && (
            <div className="mt-5 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1">
              <p className="font-bold text-sm text-emerald-900">
                ✓ Provisional Venue Booking & Quotation Issued — Ref:{' '}
                {confirmedBooking.id}
              </p>
              <p>
                Facility: <strong>{confirmedBooking.facilityName}</strong> on{' '}
                <strong className="font-mono">
                  {confirmedBooking.selectedDate}
                </strong>{' '}
                ({confirmedBooking.sessionDuration}).
              </p>
              <p>
                Total Quoted:{' '}
                <strong className="font-mono">
                  R{confirmedBooking.quotedAmountZAR.toLocaleString('en-ZA')}
                </strong>{' '}
                · Saved to persistent Admin Ledger.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
