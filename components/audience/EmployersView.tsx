'use client';

import React, { useState, useMemo } from 'react';
import { generateRecordId, getCurrentFormattedDate } from '@/lib/utils';
import { Course } from '@/lib/academy-data';
import { calculateCorporateRoi } from '@/lib/roi-calculator';
import ResilientImage from '../ResilientImage';
import {
  Download,
  Plus,
  FileSpreadsheet,
  Calculator,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { CorporateQuoteRecord } from '../AudienceJourneys';

export interface EmployersViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onOpenBrochure: (course: Course) => void;
  onSaveQuote: (quote: CorporateQuoteRecord) => void;
  onEnrolCourse?: (course: Course) => void;
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
      idNumber: '9101015000081',
      site: 'Sandton Towers Precinct',
      courseCode: 'QCTO-CP-L3',
      progress: 85,
      status: 'Practical Bay Passed · EISA Ready',
    },
    {
      id: 'st-2',
      fullName: 'Nomsa Dlamini',
      idNumber: '9401015000082',
      site: 'Rosebank Medical Suites',
      courseCode: 'QCTO-CC-L1',
      progress: 100,
      status: 'Competent · Certificate Issued',
    },
    {
      id: 'st-3',
      fullName: 'Kabelo Mthembu',
      idNumber: '8901015000083',
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

  // B-BBEE & Section 12H ROI Math powered by dedicated domain engine
  const roiCourse =
    courses.find((c) => c.id === roiCourseId) || courses[0];

  const roi = useMemo(
    () =>
      calculateCorporateRoi({
        courseCategory: roiCourse.category,
        priceZAR: roiCourse.priceZAR,
        groupPricePerLearnerZAR: roiCourse.groupPricePerLearnerZAR,
        learnerCount: roiLearners,
        disabledCount: roiDisabledCount,
        reliefStaffDays: roiReliefDays,
      }),
    [roiCourse, roiLearners, roiDisabledCount, roiReliefDays]
  );

  const {
    grossTuitionZAR: roiGrossTuition,
    grossReliefCostZAR: roiReliefTotal,
    estimatedSetaGrantZAR: estimatedSetaGrant,
    totalSection12HDeductionZAR: total12HDeductionAllowance,
    cashTaxSaving12HZAR: cashTaxSaving12H,
    netEffectiveCostZAR: netEffectiveCost,
  } = roi;

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim() || !contactEmail.trim()) return;

    const record: CorporateQuoteRecord = {
      id: generateRecordId('QT-2026'),
      companyName,
      contactPerson: contactPerson || 'HR / L&D Lead',
      email: contactEmail,
      industry: selectedIndustry,
      courseTitle: chosenCourse.title,
      staffCount,
      includeReliefStaff: includeRelief,
      totalEstimatedZAR: totalQuoteZAR,
      createdAt: getCurrentFormattedDate(),
    };

    try {
      await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          contactPerson: contactPerson || 'HR / L&D Lead',
          email: contactEmail,
          industry: selectedIndustry,
          courseId: chosenCourse.id,
          courseTitle: chosenCourse.title,
          courseCategory: chosenCourse.category,
          priceZAR: chosenCourse.priceZAR,
          groupPricePerLearnerZAR: chosenCourse.groupPricePerLearnerZAR,
          staffCount,
          includeReliefStaff: includeRelief,
          reliefDays: 2,
        }),
      });
    } catch (err) {
      console.warn('API corporate quote sync deferred; saved locally:', err);
    }

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
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
        <div>
          <p className="text-xs font-semibold text-[#D91B24] mb-2">
            06. Training for Employers · HR, L&D, WSP/ATR & Operations
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B] max-w-2xl">
            Upskill Your Hygiene & Facility Teams Without Site Disruption
          </h1>
          <p className="mt-3 text-base text-[#52525B] max-w-2xl">
            QCTO and Services SETA-aligned workforce training backed by Cleaning Africa Services. Train on-site or at our Randburg campus—with optional vetted Relief Staff at R380/day while your core team trains.
          </p>
        </div>

        <div className="bg-[#1C1B1B] text-white p-4 rounded-xl text-xs space-y-1 shrink-0">
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
        <h2 className="text-lg font-bold text-[#1C1B1B] mb-3">
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
                  ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                  : 'bg-white text-slate-700 border-[#E5E7EB] hover:bg-slate-50'
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
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={c.image}
                    alt={c.title}
                    fallbackTitle={c.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs text-[#52525B] font-mono">
                    {c.code} · {c.nqfLevel} · {c.credits} Credits
                  </p>
                  <h3 className="text-base font-bold text-[#1C1B1B] mt-1">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#52525B] mt-2">{c.shortSummary}</p>
                </div>
              </div>
              <div className="px-5 pb-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs text-[#52525B] block">
                    Group Rate (5+)
                  </span>
                  <span className="text-base font-bold font-mono text-[#D91B24] tabular-nums">
                    R{c.groupPricePerLearnerZAR.toLocaleString('en-ZA')}/staff
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenBrochure(c)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Brochure</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCourse(c.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1C1B1B] hover:bg-[#27272A] rounded-lg cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Justification Tool: ROI Calculator */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
          <div className="flex items-start gap-3">
            <Calculator className="w-6 h-6 text-[#D91B24] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#D91B24]">
                Interactive Financial Justification Tool · SARS Section 12H & SETA Rebates
              </p>
              <h2 className="text-xl font-bold text-[#1C1B1B]">
                02. Corporate B-BBEE, Section 12H Tax Allowance & Relief Staff ROI Calculator
              </h2>
              <p className="text-xs text-[#52525B] mt-1">
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
                className="block text-xs font-semibold text-[#1C1B1B] mb-1.5"
              >
                Select Accredited Qualification or Skills Programme
              </label>
              <select
                id="roi-course-select"
                value={roiCourseId}
                onChange={(e) => setRoiCourseId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg text-[#1C1B1B] font-medium"
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.code} — {c.title} ({c.nqfLevel})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <label htmlFor="roi-learners">Total Staff Cohort</label>
                  <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
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
                  className="w-full accent-[#D91B24] cursor-pointer"
                />
              </div>

              <div className="p-4 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <label htmlFor="roi-disabled">Learners w/ Disability</label>
                  <span className="font-mono font-bold text-[#D91B24] tabular-nums">
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
                  className="w-full accent-[#D91B24] cursor-pointer"
                />
              </div>

              <div className="p-4 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1.5">
                  <label htmlFor="roi-relief">Relief Staff Days</label>
                  <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
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
                  className="w-full accent-[#D91B24] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Financial Ledger Output */}
          <div className="lg:col-span-5 bg-[#1C1B1B] text-white rounded-xl p-6 space-y-3 text-xs">
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
            <div className="flex justify-between py-1.5 border-b border-white/10 text-red-300">
              <span>Est. Services SETA Grant Recovery (~25%)</span>
              <span className="font-mono font-semibold tabular-nums">
                - R{estimatedSetaGrant.toLocaleString('en-ZA')}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-white/10 text-red-300">
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
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 className="text-xl font-bold text-[#1C1B1B]">
                03. Guided 3-Step Group Quote Builder
              </h2>
              <p className="text-xs text-[#52525B] mt-0.5">
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
                      ? 'bg-[#1C1B1B] text-white'
                      : quoteStep > s
                      ? 'bg-[#FEF2F2] text-[#D91B24] border border-[#FECACA]'
                      : 'bg-[#FCF9F8] text-[#52525B] border border-[#E5E7EB]'
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
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
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
                    <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
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
                    className="w-full accent-[#D91B24] cursor-pointer"
                  />
                </div>

                <div className="p-3.5 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeRelief}
                      onChange={(e) => setIncludeRelief(e.target.checked)}
                      className="mt-0.5 rounded border-[#E5E7EB] text-[#D91B24]"
                    />
                    <span className="text-xs text-slate-700">
                      <strong className="text-[#1C1B1B] block">
                        Include Cleaning Africa Services Relief Staff (R380/day per operative)
                      </strong>
                      Keep your buildings fully serviced while your staff complete practical training.
                    </span>
                  </label>
                  {includeRelief && (
                    <div className="mt-2.5 pl-6 flex items-center gap-2">
                      <span className="text-xs text-[#52525B]">Relief Days:</span>
                      {[1, 2, 3, 5].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setReliefDays(d)}
                          className={`px-2.5 py-1 text-xs rounded font-mono cursor-pointer ${
                            reliefDays === d
                              ? 'bg-[#1C1B1B] text-white font-semibold'
                              : 'bg-white border border-[#E5E7EB] text-slate-700'
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
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
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
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
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
                    className="px-4 py-2 text-xs font-semibold text-[#52525B] hover:text-[#1C1B1B] inline-flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuoteStep(3)}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
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
                      className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
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
                      className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
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
                    className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                  />
                </div>

                <div className="p-4 bg-[#1C1B1B] text-white rounded-lg flex items-center justify-between">
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
                      className="px-5 py-2.5 text-xs font-semibold bg-[#D91B24] hover:bg-[#B91C1C] text-white rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Generate Official Quote
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>

          {submittedQuote && (
            <div className="mt-5 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B] space-y-1">
              <p className="font-bold text-sm text-[#991B1B]">
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

        {/* Right 6 Cols: Multi-Staff Enrolment & Progress Portal */}
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
            <div>
              <h2 className="text-xl font-bold text-[#1C1B1B]">
                04. Multi-Staff Cohort Enrolment & Authorised Progress Portal
              </h2>
              <p className="text-xs text-[#52525B] mt-1">
                Enrol multiple employees with admin support and monitor real-time completion for WSP/ATR reporting.
              </p>
            </div>
            <button
              type="button"
              onClick={exportWspReport}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#D91B24]" />
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
              className="sm:col-span-4 px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
            />
            <input
              type="text"
              placeholder="SA ID / Passport *"
              value={newStaffId}
              onChange={(e) => setNewStaffId(e.target.value)}
              className="sm:col-span-3 px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg font-mono"
            />
            <input
              type="text"
              placeholder="Site Location"
              value={newStaffSite}
              onChange={(e) => setNewStaffSite(e.target.value)}
              className="sm:col-span-3 px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
            />
            <button
              type="submit"
              className="sm:col-span-2 py-2 px-3 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enrol</span>
            </button>
          </form>

          {batchMessage && (
            <p className="mt-2 text-xs text-[#D91B24] font-medium">
              {batchMessage}
            </p>
          )}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-[#52525B]">
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
                      <p className="font-semibold text-[#1C1B1B]">
                        {st.fullName}
                      </p>
                      <p className="font-mono text-[#52525B] tabular-nums">
                        {st.idNumber}
                      </p>
                    </td>
                    <td className="py-3 px-3 text-[#52525B]">{st.site}</td>
                    <td className="py-3 px-3 font-mono text-[#1C1B1B]">
                      {st.courseCode}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-[#D91B24] tabular-nums">
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

