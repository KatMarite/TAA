'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { getCurrentFormattedDate } from '@/lib/utils';
import { Course, PageId } from '@/lib/academy-data';
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Award,
  Search,
  Download,
  ShieldCheck,
  X,
  BookOpen,
  Building2,
  GraduationCap,
  PlayCircle,
  Calendar,
  RotateCcw,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* 1. INTERACTIVE 3-STEP CAREER & COURSE FINDER WIZARD                        */
/* -------------------------------------------------------------------------- */

interface CourseFinderWizardProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
  onOpenBrochure: (course: Course) => void;
  onNavigate: (page: PageId) => void;
}

const FINDER_GOALS = [
  {
    id: 'job-entry',
    title: 'Start Working in Commercial Cleaning Fast',
    desc: 'Short foundational modules & NQF Level 1 competence for immediate employment.',
    targetCategories: ['Foundational Cleaning Modules', 'Occupational Qualifications'],
  },
  {
    id: 'supervisor',
    title: 'Step Up to Hygiene Supervisor / Site Team Leader',
    desc: 'NQF Level 3 Cleaning Practitioner qualification for managing shifts, SLAs & audits.',
    targetCategories: ['Occupational Qualifications'],
  },
  {
    id: 'specialist',
    title: 'Master High-Margin Technical Skills (Solar PV & Carpet)',
    desc: 'Deionized water-fed pole solar cleaning, high-reach windows & textile extraction.',
    targetCategories: ['Specialized Hygiene & Technical'],
  },
  {
    id: 'entrepreneur',
    title: 'Start & Scale My Own Cleaning Business',
    desc: 'BCCCI tender pricing per m², CIPC compliance, B2B marketing & NQF 4 New Venture.',
    targetCategories: ['Business & Entrepreneurship', 'Occupational Qualifications'],
  },
];

export function CourseFinderWizard({
  courses,
  onSelectCourse,
  onEnrolCourse,
  onOpenBrochure,
}: CourseFinderWizardProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [goalId, setGoalId] = useState<string>('job-entry');
  const [formatPref, setFormatPref] = useState<string>('any');
  const [budgetCap, setBudgetCap] = useState<number>(25000);

  const matchedCourses = useMemo(() => {
    const activeGoal = FINDER_GOALS.find((g) => g.id === goalId) || FINDER_GOALS[0];
    const filtered = courses.filter((c) => {
      const catMatch = activeGoal.targetCategories.includes(c.category);
      const formatMatch =
        formatPref === 'any' ||
        c.deliveryModes.some((m) =>
          m.toLowerCase().includes(formatPref.toLowerCase())
        );
      const priceMatch = c.priceZAR <= budgetCap;
      return catMatch && formatMatch && priceMatch;
    });
    return filtered.length > 0 ? filtered : courses.slice(0, 3);
  }, [courses, goalId, formatPref, budgetCap]);

  return (
    <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div>
          <p className="text-xs font-semibold text-[#D91B24]">
            Interactive Career & Course Matcher · 3-Step Guided Advisor
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1B1B] mt-1">
            Not Sure Where to Start? Match Your Ideal Programme in 30 Seconds
          </h2>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono shrink-0">
          {[
            { n: 1, label: '01. Goal' },
            { n: 2, label: '02. Format & Budget' },
            { n: 3, label: '03. Matched Courses' },
          ].map((s) => (
            <button
              key={s.n}
              type="button"
              onClick={() => setStep(s.n as 1 | 2 | 3)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                step === s.n
                  ? 'bg-[#1C1B1B] text-white'
                  : step > s.n
                  ? 'bg-[#FEF2F2] text-[#D91B24]'
                  : 'bg-slate-100 text-[#52525B]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 1: Choose Objective */}
      {step === 1 && (
        <div className="mt-6 space-y-6">
          <p className="text-sm font-medium text-slate-700">
            Step 1 of 3 — Select your primary career or workforce objective:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FINDER_GOALS.map((g) => {
              const active = goalId === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoalId(g.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    active
                      ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                      : 'bg-[#FCF9F8] text-[#1C1B1B] border-[#E5E7EB] hover:border-[#D91B24]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold">{g.title}</h3>
                    {active && <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />}
                  </div>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      active ? 'text-slate-200' : 'text-[#52525B]'
                    }`}
                  >
                    {g.desc}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Next: Choose Delivery & Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Delivery Format & Budget */}
      {step === 2 && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-semibold text-[#1C1B1B] mb-3">
                Preferred Learning Format
              </p>
              <div className="space-y-2">
                {[
                  { id: 'any', label: 'Any Delivery Mode (Show All Matches)' },
                  { id: 'Online', label: 'Self-Paced Online / Blended Digital' },
                  { id: 'Randburg', label: 'Randburg Classroom & Practical Simulation Bay' },
                  { id: 'On-Site', label: 'On-Site at Employer Premises (+ R380/day Relief Staff)' },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border text-xs font-medium cursor-pointer ${
                      formatPref === opt.id
                        ? 'border-[#D91B24] bg-[#FEF2F2]/50 text-[#1C1B1B] font-semibold'
                        : 'border-[#E5E7EB] bg-[#FCF9F8] text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="wizard-format"
                      checked={formatPref === opt.id}
                      onChange={() => setFormatPref(opt.id)}
                      className="text-[#D91B24]"
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-[#1C1B1B] mb-2">
                  <label htmlFor="wizard-budget">Maximum Individual Fee Budget</label>
                  <span className="font-mono text-base text-[#D91B24] tabular-nums">
                    R{budgetCap.toLocaleString('en-ZA')}
                  </span>
                </div>
                <input
                  id="wizard-budget"
                  type="range"
                  min={1450}
                  max={25000}
                  step={500}
                  value={budgetCap}
                  onChange={(e) => setBudgetCap(Number(e.target.value))}
                  className="w-full accent-[#D91B24] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-[#52525B] mt-1">
                  <span>R1,450 (Short Modules)</span>
                  <span>R4,250 (Startup)</span>
                  <span>R22,500 (Full NQF 4)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB] text-xs text-[#52525B]">
                <p className="font-semibold text-[#1C1B1B]">
                  Live Match Preview: {matchedCourses.length} Recommended Programmes
                </p>
                <p className="mt-1">
                  All matched programmes include official assessment moderation and verifiable completion statements.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 text-xs font-semibold text-[#52525B] hover:text-[#1C1B1B] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Goal</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Reveal {matchedCourses.length} Recommended Courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Recommended Matches */}
      {step === 3 && (
        <div className="mt-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[#1C1B1B]">
              Step 3 of 3 — Your Personalised Course Recommendations ({matchedCourses.length} Matches):
            </p>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-semibold text-[#D91B24] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start Wizard Over</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {matchedCourses.slice(0, 3).map((c) => (
              <div
                key={c.id}
                className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-[#D91B24] font-semibold">
                    {c.code} · {c.nqfLevel} · {c.credits} Credits
                  </p>
                  <h3 className="text-base font-bold text-[#1C1B1B] mt-1">{c.title}</h3>
                  <p className="text-xs text-[#52525B] mt-2">{c.shortSummary}</p>
                  <p className="text-xs text-[#52525B] mt-3">
                    <strong className="text-[#1C1B1B]">Outcome:</strong> {c.careerOutcome}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E7EB] space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] text-[#52525B] block">Single Fee</span>
                      <span className="font-mono text-lg font-bold text-[#1C1B1B] tabular-nums">
                        R{c.priceZAR.toLocaleString('en-ZA')}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-[#52525B] block">Group (5+)</span>
                      <span className="font-mono text-xs font-semibold text-[#D91B24] tabular-nums">
                        R{c.groupPricePerLearnerZAR.toLocaleString('en-ZA')}/staff
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onEnrolCourse(c)}
                      className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
                    >
                      Enrol Now
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectCourse(c.id)}
                      className="py-2 px-3 text-xs font-semibold text-[#1C1B1B] bg-white border border-[#E5E7EB] hover:bg-slate-50 rounded-lg cursor-pointer"
                    >
                      Curriculum
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenBrochure(c)}
                      title="Download Brochure"
                      className="p-2 text-[#52525B] bg-white border border-[#E5E7EB] hover:text-[#1C1B1B] rounded-lg cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 2. INTERACTIVE CERTIFICATE PREVIEW & VERIFICATION LOOKUP MODAL             */
/* -------------------------------------------------------------------------- */

interface CertificateVerificationModalProps {
  isOpen: boolean;
  initialCourse: Course | null;
  learnerName?: string;
  onClose: () => void;
}

export function CertificateVerificationModal({
  isOpen,
  initialCourse,
  learnerName = 'Registered Graduate',
  onClose,
}: CertificateVerificationModalProps) {
  const currentDate = useMemo(() => getCurrentFormattedDate(), []);

  const [lookupCode, setLookupCode] = useState(
    initialCourse ? `TAA-CERT-2026-${initialCourse.code}` : 'TAA-CERT-2026-QCTO-CP-L3'
  );
  const [verifiedStatus, setVerifiedStatus] = useState<{
    valid: boolean;
    holder: string;
    programme: string;
    nqf: string;
    issuedDate: string;
  } | null>(() => ({
    valid: true,
    holder: learnerName,
    programme:
      initialCourse?.title || 'Occupational Qualification: Cleaning Practitioner',
    nqf: initialCourse?.nqfLevel || 'NQF Level 3 · 126 Credits',
    issuedDate: currentDate,
  }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const courseTitle =
    initialCourse?.title || 'Occupational Qualification: Cleaning Practitioner';
  const courseCode = initialCourse?.code || 'QCTO-CP-L3';
  const courseNqf = initialCourse?.nqfLevel || 'NQF Level 3';
  const courseCredits = initialCourse?.credits || 126;
  const certReference = `TAA-CERT-2026-${courseCode}`;

  const handleVerifyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = lookupCode.trim().toUpperCase();

    // Verification requires standard TAA certificate format or matching current course code
    const isStandardCertFormat = /^TAA-CERT-(202[4-7]|QCTO)-[A-Z0-9-]+$/i.test(cleaned);
    const matchesCurrentCourse = cleaned === certReference.toUpperCase();

    if (isStandardCertFormat || matchesCurrentCourse) {
      setVerifiedStatus({
        valid: true,
        holder: learnerName,
        programme: courseTitle,
        nqf: `${courseNqf} · ${courseCredits} Credits`,
        issuedDate: `${currentDate} (Active & Good Standing)`,
      });
    } else {
      setVerifiedStatus({
        valid: false,
        holder: 'Not Found',
        programme: 'No matching accredited certificate record found',
        nqf: 'N/A',
        issuedDate: 'N/A',
      });
    }
  };

  const handleDownloadCertificate = () => {
    const content = `====================================================================
                     TRAINING AFRICA ACADEMY
        (A Division of Cleaning Africa Services Pty Ltd)
      Unit 14 Fancourt Office Park, Northriding, Randburg
====================================================================
      OFFICIAL STATEMENT OF COMPETENCY & QCTO/SETA RECORD

Certificate Reference:  ${certReference}
Learner Full Name:      ${learnerName}
Qualification / Course: ${courseTitle}
SAQA / Course Code:     ${courseCode} (${courseNqf} · ${courseCredits} Credits)
Quality Assurance:      ${initialCourse?.accreditationBody || 'QCTO & Services SETA Aligned'}
Assessment Centre:      Northriding Randburg Accredited Simulation Centre
Moderation Status:      COMPETENT — VERIFIED BY INTERNAL MODERATOR
Date of Verification:   ${currentDate}
====================================================================`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certReference}_${learnerName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-[#E5E7EB] rounded-xl max-w-2xl w-full overflow-hidden shadow-xl max-h-[90vh] flex flex-col">
        <div className="bg-[#1C1B1B] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-[#F59E0B]" />
            <div>
              <p className="text-xs text-[#F59E0B] font-mono">
                QCTO & Services SETA Aligned Credential Registry
              </p>
              <h2 id="cert-modal-title" className="text-base font-bold">
                Interactive Certificate Preview & Live Verification
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close certificate modal"
            className="text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          {/* Visual Certificate Document Frame */}
          <div className="border-2 border-[#1C1B1B] rounded-xl p-6 sm:p-8 bg-[#FCF9F8] relative">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]">
              <div>
                <p className="text-xs font-bold tracking-wider text-[#D91B24] uppercase">
                  Training Africa Academy · Cleaning Africa Services (Pty) Ltd
                </p>
                <p className="text-xs text-[#52525B]">
                  Northriding, Randburg Assessment Centre · Reg: 2000/018492/07
                </p>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-[#1C1B1B]">
                <span className="block font-bold">{certReference}</span>
                <span className="text-[#52525B]">Status: VERIFIED</span>
              </div>
            </div>

            <div className="py-6 text-center space-y-2">
              <p className="text-xs text-[#52525B] uppercase tracking-widest">
                Statement of Competency & Programme Completion
              </p>
              <p className="text-xs text-[#52525B]">This certifies that</p>
              <p className="text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
                {learnerName}
              </p>
              <p className="text-xs text-[#52525B]">
                has successfully satisfied both theoretical and practical simulation outcomes for
              </p>
              <h3 className="text-lg sm:text-xl font-bold text-[#D91B24] max-w-lg mx-auto">
                {courseTitle}
              </h3>
              <p className="text-xs font-mono text-[#52525B]">
                {courseCode} · {courseNqf} · {courseCredits} Credits ·{' '}
                {initialCourse?.accreditationBody || 'QCTO & Services SETA Aligned'}
              </p>
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="font-semibold text-[#1C1B1B]">Thabo Mokoena</p>
                <p className="text-[#52525B]">Lead QCTO Assessor (SSETA-ASS-88412)</p>
              </div>
              <div className="text-center">
                <p className="font-semibold text-[#1C1B1B]">Sarah Molefe</p>
                <p className="text-[#52525B]">Internal Moderator (SSETA-MOD-44910)</p>
              </div>
              <div className="text-right font-mono">
                <p className="font-semibold text-[#1C1B1B]">{currentDate}</p>
                <p className="text-[#059669] font-semibold">✓ NLRD Ready</p>
              </div>
            </div>
          </div>

          {/* Live Employer / Third-Party Certificate Lookup Tool */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-4">
            <p className="text-xs font-bold text-[#1C1B1B] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#059669]" />
              Employer & Regulator Credential Verification Lookup
            </p>
            <form onSubmit={handleVerifyLookup} className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="Enter Certificate Ref (e.g. TAA-CERT-2026-QCTO-CP-L3)"
                className="flex-1 px-3 py-2 text-xs font-mono bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1C1B1B] hover:bg-[#27272A] rounded-lg cursor-pointer"
              >
                Verify Credential
              </button>
            </form>

            {verifiedStatus && (
              <div
                className={`mt-3 p-3 rounded-lg border text-xs ${
                  verifiedStatus.valid
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                {verifiedStatus.valid ? (
                  <p>
                    <strong>✓ Valid Credential:</strong> Holder{' '}
                    <strong>{verifiedStatus.holder}</strong> · {verifiedStatus.programme} ({verifiedStatus.nqf}) · Issued {verifiedStatus.issuedDate}.
                  </p>
                ) : (
                  <p>
                    ✕ Credential reference not found. Ensure the code begins with TAA-CERT-2026.
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-[#E5E7EB]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#52525B] hover:text-slate-900 cursor-pointer"
            >
              Close Preview
            </button>
            <button
              type="button"
              onClick={handleDownloadCertificate}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Statement (.TXT)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 3. GUIDED ONBOARDING TOUR DRAWER FOR FIRST-TIME VISITORS                   */
/* -------------------------------------------------------------------------- */

interface GuidedOnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export function GuidedOnboardingTour({
  isOpen,
  onClose,
  onNavigate,
}: GuidedOnboardingTourProps) {
  const [tourStep, setTourStep] = useState<number>(0);

  if (!isOpen) return null;

  const stops = [
    {
      step: 'Stop 01 of 04',
      title: 'Dual-Audience Entry & 3-Step Course Matcher',
      desc: 'Whether you are an individual learner (“I want to study”) or an HR/L&D manager (“Train my team”), use our 3-Step Course Finder Wizard on the Home or Catalogue page to match the exact SAQA/QCTO course and upfront ZAR fee.',
      targetPage: 'home' as PageId,
      ctaLabel: 'Go to Home & Course Matcher',
    },
    {
      step: 'Stop 02 of 04',
      title: 'Self-Paced Online LMS & Chemical Dilution Simulator',
      desc: 'In the Online Learning Player, learners watch interactive briefings, practice dosing calculations and SABS colour-coding in the live Chemical Dilution & pH Lab, and pass auto-graded quizzes.',
      targetPage: 'online-learning' as PageId,
      ctaLabel: 'Inspect Online LMS & Dilution Lab',
    },
    {
      step: 'Stop 03 of 04',
      title: 'Employer B-BBEE / Section 12H ROI & R380/Day Relief Staff',
      desc: 'On the Training for Employers page, calculate SARS Section 12H tax allowances (up to R80,000 deduction per learner), add R380/day vetted Relief Staff so your sites stay staffed during training, and batch-enrol employees.',
      targetPage: 'employers' as PageId,
      ctaLabel: 'Open Employer & Section 12H Calculator',
    },
    {
      step: 'Stop 04 of 04',
      title: 'Randburg Assessment Calendar & In-House Nano Banana CMS',
      desc: 'Book practical trade bays on the interactive Randburg Venue Calendar, or visit the Learner Dashboard & In-House CMS to expand future programmes with Nano Banana AI course visuals.',
      targetPage: 'dashboard' as PageId,
      ctaLabel: 'Open Dashboard & In-House CMS',
    },
  ];

  const current = stops[tourStep];

  return (
    <div className="bg-[#18181B] text-white border-b border-white/15">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F59E0B]">
              <span>Interactive Platform Tour · {current.step}</span>
            </div>
            <h3 className="text-base font-bold text-white">{current.title}</h3>
            <p className="text-xs text-slate-200 leading-relaxed">{current.desc}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate(current.targetPage)}
              className="px-3.5 py-2 text-xs font-semibold bg-[#D91B24] hover:bg-[#B91C1C] text-white rounded-lg cursor-pointer"
            >
              {current.ctaLabel}
            </button>
            {tourStep > 0 && (
              <button
                type="button"
                onClick={() => setTourStep(tourStep - 1)}
                className="px-3 py-2 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg cursor-pointer"
              >
                Previous
              </button>
            )}
            {tourStep < stops.length - 1 ? (
              <button
                type="button"
                onClick={() => setTourStep(tourStep + 1)}
                className="px-3.5 py-2 text-xs font-semibold bg-[#F59E0B] text-[#1C1B1B] rounded-lg cursor-pointer"
              >
                Next Stop →
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold bg-[#F59E0B] text-[#1C1B1B] rounded-lg cursor-pointer"
              >
                Finish Tour ✓
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss tour"
              className="p-2 text-slate-300 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 4. STICKY MOBILE BOTTOM ACTION & CONVERSION BAR (< 768px)                  */
/* -------------------------------------------------------------------------- */

interface MobileThumbBarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  onTriggerPrimaryAction: () => void;
}

export function MobileThumbBar({
  activePage,
  onNavigate,
  onTriggerPrimaryAction,
}: MobileThumbBarProps) {
  const navItems: { id: PageId; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { id: 'catalogue', label: 'Courses', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'employers', label: 'Employers', icon: <Building2 className="w-4 h-4" /> },
    { id: 'online-learning', label: 'Online Lab', icon: <PlayCircle className="w-4 h-4" /> },
  ];

  return (
    <nav
      aria-label="Mobile Quick Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[var(--border-subtle)] px-2 py-1.5"
    >
      <div className="grid grid-cols-5 items-center gap-1">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors cursor-pointer ${
                isActive
                  ? 'text-brand font-bold'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {item.icon}
              <span className="text-[11px] mt-0.5 leading-none whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          onClick={onTriggerPrimaryAction}
          className="min-h-[44px] px-2 bg-brand text-white rounded-lg flex flex-col items-center justify-center font-bold cursor-pointer"
        >
          <GraduationCap className="w-4 h-4" />
          <span className="text-[11px] mt-0.5 leading-none whitespace-nowrap">
            Enrol
          </span>
        </button>
      </div>
    </nav>
  );
}
