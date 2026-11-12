'use client';

import React, { useState, useEffect } from 'react';
import { generateRecordId, getCurrentFormattedDate } from '@/lib/utils';
import {
  Course,
  CourseCategory,
  DeliveryMode,
  BRAND_IMAGES,
} from '@/lib/academy-data';
import {
  CorporateQuoteRecord,
  LearnershipApplicationRecord,
  VenueBookingRecord,
} from './AudienceJourneys';
import ResilientImage from './ResilientImage';
import {
  PlayCircle,
  Award,
  Image as ImageIcon,
  Download,
  CreditCard,
  X,
  Loader2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Lock,
} from 'lucide-react';

export interface EnrolmentRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  learnerName: string;
  learnerEmail: string;
  paymentMethod: string;
  amountPaidZAR: number;
  enrolledAt: string;
}

interface DashboardViewProps {
  courses: Course[];
  enrolledCourseIds: string[];
  completedModuleIds: string[];
  enrolments: EnrolmentRecord[];
  quotes: CorporateQuoteRecord[];
  applications: LearnershipApplicationRecord[];
  venueBookings: VenueBookingRecord[];
  onLaunchOnlineCourse: (courseId: string) => void;
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
  onAddNewCourse: (newCourse: Course) => void;
  onOpenCertificateModal: (course: Course) => void;
}

export function DashboardView({
  courses,
  enrolledCourseIds,
  completedModuleIds,
  enrolments,
  quotes,
  applications,
  venueBookings,
  onLaunchOnlineCourse,
  onSelectCourse,
  onEnrolCourse,
  onAddNewCourse,
  onOpenCertificateModal,
}: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'learner' | 'cms'>('learner');

  // In-House Programme Expansion Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCode, setNewCode] = useState('TAA-HACCP-301');
  const [newCategory, setNewCategory] = useState<CourseCategory>(
    'Specialized Hygiene & Technical'
  );
  const [newNqf] = useState('Non-Accredited Skills Short Course');
  const [newCredits] = useState<number>(15);
  const [newPrice, setNewPrice] = useState<number>(3850);
  const [newGroupPrice, setNewGroupPrice] = useState<number>(3200);
  const [newOutcome] = useState(
    'Food-Safe & Healthcare Hygiene Compliance Specialist'
  );
  const [newSummary, setNewSummary] = useState(
    'Specialized infection control, food-processing surface sanitation, ATP bioluminescence swabbing, and HACCP hygiene compliance.'
  );
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>(
    BRAND_IMAGES.commercialHygiene
  );
  const [nanoPrompt, setNanoPrompt] = useState(
    'Editorial corporate photograph of South African hygiene specialists in navy blue and green protective attire conducting ATP surface swab testing inside a spotless modern commercial food and healthcare facility, bright natural light.'
  );
  const [isGeneratingImage, setIsGeneratingImage] = useState<boolean>(false);
  const [genError, setGenError] = useState<string>('');
  const [publishSuccess, setPublishSuccess] = useState<string>('');

  const enrolledCourses = courses.filter((c) =>
    enrolledCourseIds.includes(c.id)
  );

  const recommendedIds = Array.from(
    new Set(enrolledCourses.flatMap((c) => c.recommendedNextCourseIds))
  ).filter((id) => !enrolledCourseIds.includes(id));

  const recommendedCourses = courses.filter((c) =>
    recommendedIds.includes(c.id)
  );

  const handleGenerateNanoBananaImage = async () => {
    setIsGeneratingImage(true);
    setGenError('');
    try {
      const res = await fetch('/api/generate-visual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: nanoPrompt,
          courseTitle: newTitle || 'Healthcare & Food Hygiene Specialist',
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.imageUrl) {
        setGenError(
          data.error ||
            'Could not generate runtime image; using high-resolution Academy studio visual.'
        );
      } else {
        setGeneratedImageUrl(data.imageUrl);
      }
    } catch {
      setGenError('Network error calling Nano Banana endpoint.');
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handlePublishProgramme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Course = {
      id: `custom-${courses.length + 1}-${newCode.toLowerCase()}`,
      code: newCode.trim() || 'TAA-NEW-2026',
      title: newTitle.trim(),
      shortSummary: newSummary.trim(),
      fullDescription: newSummary.trim(),
      category: newCategory,
      careerOutcome: newOutcome.trim(),
      nqfLevel: newNqf,
      credits: Number(newCredits) || 12,
      saqaId: newCode.trim(),
      accreditationBody:
        newCategory === 'Occupational Qualifications'
          ? 'QCTO & Services SETA Accredited'
          : 'Non-Accredited Skills Short Course · Certificate of Completion',
      duration: '3 Days Blended / Online',
      deliveryModes: [
        'Self-Paced Online',
        'Blended (Online + Practical)',
        'On-Site Client Premises',
      ],
      priceZAR: Number(newPrice) || 2950,
      groupPricePerLearnerZAR: Number(newGroupPrice) || 2450,
      reliefStaffAvailable: true,
      reliefStaffRatePerDayZAR: 380,
      prerequisites: ['Foundational hygiene literacy'],
      targetAudience: 'Individual & Corporate',
      image: generatedImageUrl,
      nextIntake: 'Immediate Online Enrolment · Monthly Practical',
      featured: true,
      onlineEligible: true,
      recommendedNextCourseIds: ['occ-cleaning-practitioner-nqf3'],
      modules: [
        {
          id: `mod-custom-${courses.length + 1}`,
          number: '01',
          title: 'Core Compliance, Hygiene Standards & Practical Execution',
          duration: '3 Days',
          type: 'Theory & Interactive Video',
          summary: newSummary.trim(),
          keyTopics: [
            'Infection control',
            'Surface verification',
            'OHS compliance',
          ],
        },
      ],
    };

    onAddNewCourse(created);
    setPublishSuccess(
      `Programme "${created.title}" published to the live Course Catalogue and Home page (and persisted in LocalStorage).`
    );
    setNewTitle('');
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
        <div>
          <p className="text-xs font-semibold text-[#D91B24] mb-2">
            15. Authenticated Learner Dashboard & In-House Programme Expansion CMS
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
            {activeTab === 'learner'
              ? 'Welcome Back, Learner — Active Courses & Progression'
              : 'In-House Programme Manager & Revenue Ledger'}
          </h1>
          <p className="mt-2 text-sm text-[#52525B]">
            {activeTab === 'learner'
              ? 'Resume your self-paced online modules across our 3 pilot course archetypes, preview & verify eligible Certificates of Completion, and track practical/EISA requirements.'
              : 'Structured for in-house programme expansion: add new accredited courses, generate Nano Banana visuals, and track live enrolments and quotes.'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('learner')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'learner'
                ? 'bg-[#1C1B1B] text-white shadow-xs'
                : 'text-slate-700 hover:text-[#1C1B1B]'
            }`}
          >
            Learner Dashboard ({enrolledCourses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cms')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'cms'
                ? 'bg-[#D91B24] text-white shadow-xs'
                : 'text-slate-700 hover:text-[#1C1B1B]'
            }`}
          >
            In-House CMS & Revenue Ledger
          </button>
        </div>
      </div>

      {activeTab === 'learner' ? (
        <div className="space-y-10">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 className="text-xl font-bold text-[#1C1B1B]">
                Your Enrolled Programmes (3 Pilot Course Archetypes)
              </h2>
              <span className="text-xs text-[#52525B]">
                Conditional Certificate Governance Active · Short Courses issue Certificate of Completion at 100%; Accredited NQF Qualifications require Practical + EISA Sign-Off
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => {
                const totalMods = course.modules.length || 1;
                const doneMods = course.modules.filter((m) =>
                  completedModuleIds.includes(m.id)
                ).length;
                const pct = Math.min(
                  100,
                  Math.max(0, Math.round((doneMods / totalMods) * 100))
                );
                const isAccreditedQual =
                  course.category === 'Occupational Qualifications';
                const isCertificateUnlocked = !isAccreditedQual && pct === 100;

                return (
                  <div
                    key={course.id}
                    className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <div className="aspect-video w-full bg-zinc-100 overflow-hidden relative">
                        <ResilientImage
                          src={course.image}
                          alt={course.title}
                          fallbackTitle={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2.5 py-1 text-[11px] font-bold rounded-md shadow-xs ${
                              isAccreditedQual
                                ? 'bg-[#1C1B1B] text-white'
                                : 'bg-white/95 text-[#1C1B1B] border border-[#E5E7EB]'
                            }`}
                          >
                            {isAccreditedQual
                              ? `QCTO & Services SETA Accredited (${course.nqfLevel})`
                              : 'Non-Accredited Skills Short Course'}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between text-xs text-[#52525B] mb-2">
                          <span className="font-mono font-semibold text-[#D91B24]">
                            {course.code}
                          </span>
                          <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                            {pct}% Complete ({doneMods}/{totalMods} Modules)
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-[#1C1B1B] leading-snug">
                          {course.title}
                        </h3>
                        <div className="mt-3 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              pct === 100 ? 'bg-emerald-600' : 'bg-[#D91B24]'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-xs text-[#52525B] mt-3">
                          Outcome: {course.careerOutcome}
                        </p>
                        <p className="text-[11px] font-semibold text-[#1C1B1B] mt-1.5">
                          Award:{' '}
                          {isAccreditedQual
                            ? 'QCTO Occupational Certificate (Subject to Practical + EISA)'
                            : 'Certificate of Completion (Instant Digital Issue at 100%)'}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => onLaunchOnlineCourse(course.id)}
                        className="w-full px-4 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>
                          {pct === 100
                            ? 'Review Online Modules & Quiz'
                            : 'Continue Online Learning'}
                        </span>
                      </button>

                      {isCertificateUnlocked ? (
                        <button
                          type="button"
                          onClick={() => onOpenCertificateModal(course)}
                          className="w-full px-3.5 py-2.5 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Award className="w-4 h-4 text-[#F59E0B]" />
                          <span>Preview & Verify Certificate of Completion</span>
                        </button>
                      ) : (
                        <div
                          title="Certificate Locked (Requires 100% Completion + Practical/EISA Sign-Off)"
                          className="w-full px-3.5 py-2.5 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center gap-1.5 text-center"
                        >
                          <Lock className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>
                            Certificate Locked (Requires 100% Completion + Practical/EISA Sign-Off)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
            <p className="text-xs font-semibold text-[#D91B24]">
              Recommended Career Progression
            </p>
            <h2 className="text-xl font-bold text-[#1C1B1B] mt-1">
              Recommended Next Courses Based on Your Learning Profile
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommendedCourses.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
                      <ResilientImage
                        src={rec.image}
                        alt={rec.title}
                        fallbackTitle={rec.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-mono text-[#52525B]">
                        {rec.code} · {rec.nqfLevel}
                      </p>
                      <h3 className="text-base font-bold text-[#1C1B1B] mt-1">
                        {rec.title}
                      </h3>
                      <p className="text-xs text-[#52525B] mt-2">
                        {rec.shortSummary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-3 border-t border-[#E5E7EB] flex items-center justify-between gap-2">
                    {rec.quoteOnly ? (
                      <span className="font-mono text-xs font-bold text-[#1C1B1B]">
                        Variable / Corporate Quote-Only
                      </span>
                    ) : (
                      <span className="font-mono text-sm font-bold text-[#1C1B1B] tabular-nums">
                        R{rec.priceZAR.toLocaleString('en-ZA')}{' '}
                        <span className="text-[11px] font-normal text-[#52525B]">
                          Incl. VAT
                        </span>
                      </span>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(rec.id)}
                        className="text-xs font-semibold text-[#1C1B1B] hover:underline cursor-pointer"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => onEnrolCourse(rec)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
                      >
                        {rec.quoteOnly ? 'Request Group Quote' : 'Enrol'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
            <p className="text-xs font-semibold text-[#D91B24]">
              In-House Programme Expansion Studio
            </p>
            <h2 className="text-xl font-bold text-[#1C1B1B] mt-1">
              Publish a New Accredited Qualification or Short Course
            </h2>
            <p className="text-xs text-[#52525B] mt-1">
              New programmes added here immediately appear in the Course Catalogue, Employer Quote Calculator, and Homepage.
            </p>

            <form onSubmit={handlePublishProgramme} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="cms-title"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Programme Title *
                  </label>
                  <input
                    id="cms-title"
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Healthcare & Hospital Terminal Disinfection Certificate"
                    className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-code"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Course / SAQA Code
                  </label>
                  <input
                    id="cms-code"
                    type="text"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="cms-cat"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Programme Category
                  </label>
                  <select
                    id="cms-cat"
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as CourseCategory)
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                  >
                    <option value="Specialized Hygiene & Technical">
                      Specialized Hygiene & Technical
                    </option>
                    <option value="Occupational Qualifications">
                      Occupational Qualifications
                    </option>
                    <option value="Foundational Cleaning Modules">
                      Foundational Cleaning Modules
                    </option>
                    <option value="Business & Entrepreneurship">
                      Business & Entrepreneurship
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="cms-price"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Individual Fee (ZAR Incl. VAT)
                  </label>
                  <input
                    id="cms-price"
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cms-gprice"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Corporate Group Rate (ZAR Incl. VAT)
                  </label>
                  <input
                    id="cms-gprice"
                    type="number"
                    value={newGroupPrice}
                    onChange={(e) => setNewGroupPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="cms-summary"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Course Summary & Learning Outcomes
                </label>
                <textarea
                  id="cms-summary"
                  rows={2}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>

              <div className="p-4 bg-[#FCF9F8] border border-[#E5E7EB] rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C1B1B]">
                    Nano Banana Course Imagery Generator (gemini-3.1-flash-lite-image)
                  </span>
                  <button
                    type="button"
                    onClick={handleGenerateNanoBananaImage}
                    disabled={isGeneratingImage}
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-[#1C1B1B] hover:bg-[#27272A] rounded-lg inline-flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingImage ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Generating Visual...</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
                        <span>Generate Visual with Nano Banana</span>
                      </>
                    )}
                  </button>
                </div>

                <input
                  type="text"
                  value={nanoPrompt}
                  onChange={(e) => setNanoPrompt(e.target.value)}
                  aria-label="Prompt for Nano Banana course visual"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-lg"
                />

                {genError && (
                  <p className="text-xs text-amber-700">{genError}</p>
                )}

                <div className="h-40 w-full rounded-lg overflow-hidden border border-[#E5E7EB]">
                  <ResilientImage
                    src={generatedImageUrl}
                    alt="Course preview visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
              >
                Publish Programme to Live Platform
              </button>
            </form>

            {publishSuccess && (
              <div className="mt-4 p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs font-semibold text-[#991B1B]">
                ✓ {publishSuccess}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-4">
              <h2 className="text-base font-bold text-[#1C1B1B]">
                Live Platform Conversion & Revenue Ledger
              </h2>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg bg-[#FCF9F8] border border-[#E5E7EB]">
                  <span className="text-[#52525B] block">Online Enrolments</span>
                  <strong className="text-xl font-bold font-mono text-[#1C1B1B] tabular-nums">
                    {enrolments.length}
                  </strong>
                </div>
                <div className="p-3.5 rounded-lg bg-[#FCF9F8] border border-[#E5E7EB]">
                  <span className="text-[#52525B] block">Employer Quotes</span>
                  <strong className="text-xl font-bold font-mono text-[#D91B24] tabular-nums">
                    {quotes.length}
                  </strong>
                </div>
                <div className="p-3.5 rounded-lg bg-[#FCF9F8] border border-[#E5E7EB]">
                  <span className="text-[#52525B] block">Learnership Apps</span>
                  <strong className="text-xl font-bold font-mono text-[#1C1B1B] tabular-nums">
                    {applications.length}
                  </strong>
                </div>
                <div className="p-3.5 rounded-lg bg-[#FCF9F8] border border-[#E5E7EB]">
                  <span className="text-[#52525B] block">Venue Bookings</span>
                  <strong className="text-xl font-bold font-mono text-[#D91B24] tabular-nums">
                    {venueBookings.length}
                  </strong>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E7EB] space-y-2 text-xs">
                <p className="font-semibold text-[#1C1B1B]">
                  Recent Enrolments & Quotes:
                </p>
                {enrolments.map((enr) => (
                  <div
                    key={enr.id}
                    className="flex items-center justify-between py-1.5 border-b border-slate-100"
                  >
                    <div>
                      <p className="font-semibold text-[#1C1B1B]">
                        {enr.learnerName}
                      </p>
                      <p className="text-[#52525B]">{enr.courseTitle}</p>
                    </div>
                    <span className="font-mono font-bold text-[#D91B24] tabular-nums">
                      R{enr.amountPaidZAR.toLocaleString('en-ZA')} Incl. VAT
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MULTI-STEP GUIDED ENROLMENT & PAYMENT CHECKOUT WIZARD MODAL                */
/* -------------------------------------------------------------------------- */

interface EnrolmentModalProps {
  course: Course | null;
  onClose: () => void;
  onCompleteEnrolment: (record: EnrolmentRecord) => void;
}

export function EnrolmentModal({
  course,
  onClose,
  onCompleteEnrolment,
}: EnrolmentModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedDelivery, setSelectedDelivery] = useState<string>(
    course?.deliveryModes[0] || 'Self-Paced Online'
  );
  const [learnerQty, setLearnerQty] = useState<number>(
    course?.quoteOnly ? 10 : 1
  );
  const [addRelief, setAddRelief] = useState<boolean>(false);
  const [reliefDays, setReliefDays] = useState<number>(2);

  const [learnerName, setLearnerName] = useState('');
  const [learnerEmail, setLearnerEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  // Unchecked by default per POPIA requirement (RFQ F06 & Section 6)
  const [popiaMarketingConsent, setPopiaMarketingConsent] =
    useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState(
    'Instant EFT / PayFast Secure'
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const isQuoteOnly = Boolean(course.quoteOnly);

  const unitRate =
    learnerQty >= 5 ? course.groupPricePerLearnerZAR : course.priceZAR;
  const reliefTotal =
    addRelief && course.reliefStaffAvailable ? learnerQty * reliefDays * 380 : 0;
  const grandTotalZAR = unitRate * learnerQty + reliefTotal;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learnerName.trim() || !learnerEmail.trim()) return;

    const record: EnrolmentRecord = {
      id: generateRecordId(isQuoteOnly ? 'GRP-QT' : 'ENR'),
      courseId: course.id,
      courseTitle: course.title,
      learnerName: learnerName.trim(),
      learnerEmail: learnerEmail.trim(),
      paymentMethod: isQuoteOnly
        ? `Corporate Group Quote Request (${selectedDelivery})`
        : `${paymentMethod} (${selectedDelivery})`,
      amountPaidZAR: grandTotalZAR,
      enrolledAt: getCurrentFormattedDate(),
    };

    try {
      await fetch('/api/enrolments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...record,
          popiaMarketingConsent,
        }),
      });
    } catch (err) {
      console.warn('API enrolment sync deferred; saved locally:', err);
    }

    onCompleteEnrolment(record);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="enrolment-modal-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-[#E5E7EB] rounded-xl max-w-xl w-full overflow-hidden shadow-xl max-h-[92vh] overflow-y-auto">
        <div className="bg-[#1C1B1B] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#F59E0B] font-mono">
              Step {step} of 3 · {course.code} · {course.nqfLevel}
            </p>
            <h2 id="enrolment-modal-title" className="text-base font-bold">
              {isQuoteOnly
                ? 'Request Group Quote — Corporate Cohort Qualification'
                : 'Guided Online Enrolment & Checkout'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close enrolment modal"
            className="text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3-Step Progress Bar */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-[#E5E7EB] grid grid-cols-3 gap-2 text-xs font-mono">
          {[
            { n: 1, title: '01. Mode & Options' },
            { n: 2, title: '02. Learner Details' },
            {
              n: 3,
              title: isQuoteOnly ? '03. Submit Quote' : '03. Payment & Access',
            },
          ].map((item) => (
            <button
              key={item.n}
              type="button"
              onClick={() => setStep(item.n as 1 | 2 | 3)}
              className={`py-1 px-2 rounded text-center font-semibold cursor-pointer ${
                step === item.n
                  ? 'bg-[#1C1B1B] text-white'
                  : step > item.n
                  ? 'text-[#D91B24]'
                  : 'text-[#52525B]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <form onSubmit={handleCheckout} className="p-6 space-y-5">
          {/* Course Summary Banner */}
          <div className="p-3.5 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-[#1C1B1B]">{course.title}</p>
              <p className="text-xs text-[#52525B]">
                {course.duration} · {learnerQty}{' '}
                {learnerQty === 1 ? 'Learner' : 'Learners'}
              </p>
            </div>
            <div className="text-right shrink-0">
              {isQuoteOnly ? (
                <>
                  <span className="text-[10px] font-mono uppercase text-[#52525B] block">
                    Variable / Corporate Quote-Only
                  </span>
                  <span className="font-mono text-base font-bold text-[#D91B24] tabular-nums">
                    Est. R{grandTotalZAR.toLocaleString('en-ZA')}{' '}
                    <span className="text-[11px] font-normal text-[#52525B]">
                      Incl. VAT
                    </span>
                  </span>
                </>
              ) : (
                <span className="font-mono text-lg font-bold text-[#D91B24] tabular-nums">
                  R{grandTotalZAR.toLocaleString('en-ZA')}{' '}
                  <span className="text-xs font-normal text-[#52525B]">
                    Incl. VAT
                  </span>
                </span>
              )}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="wiz-delivery"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Select Delivery Mode
                </label>
                <select
                  id="wiz-delivery"
                  value={selectedDelivery}
                  onChange={(e) => setSelectedDelivery(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  {course.deliveryModes.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                  <label htmlFor="wiz-qty">Number of Learners</label>
                  <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                    {learnerQty} (
                    {learnerQty >= 5
                      ? `Group Rate R${course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Incl. VAT`
                      : `Standard Rate R${course.priceZAR.toLocaleString('en-ZA')} Incl. VAT`}
                    )
                  </span>
                </div>
                <input
                  id="wiz-qty"
                  type="range"
                  min={1}
                  max={25}
                  value={learnerQty}
                  onChange={(e) => setLearnerQty(Number(e.target.value))}
                  className="w-full accent-[#D91B24] cursor-pointer"
                />
              </div>

              {course.reliefStaffAvailable && (
                <div className="p-3 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
                  <label className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={addRelief}
                      onChange={(e) => setAddRelief(e.target.checked)}
                      className="mt-0.5 rounded border-[#E5E7EB] text-[#D91B24]"
                    />
                    <span>
                      <strong className="text-[#1C1B1B] block">
                        Add Workplace Relief Staff (R380/day Incl. VAT per operative)
                      </strong>
                      Keep your site staffed while employees attend practical training.
                    </span>
                  </label>
                  {addRelief && (
                    <div className="mt-2 pl-5 flex items-center gap-2 text-xs">
                      <span>Relief Days:</span>
                      {[1, 2, 3, 5].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setReliefDays(d)}
                          className={`px-2 py-0.5 rounded font-mono cursor-pointer ${
                            reliefDays === d
                              ? 'bg-[#1C1B1B] text-white'
                              : 'bg-white border border-[#E5E7EB]'
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next: Learner Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="chk-name"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    Learner / Coordinator Full Name *
                  </label>
                  <input
                    id="chk-name"
                    type="text"
                    required
                    value={learnerName}
                    onChange={(e) => setLearnerName(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                  />
                </div>
                <div>
                  <label
                    htmlFor="chk-id"
                    className="block text-xs font-medium text-slate-700 mb-1"
                  >
                    SA ID / Passport Number *
                  </label>
                  <input
                    id="chk-id"
                    type="text"
                    required
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="chk-email"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Email for Receipt & Immediate LMS Access *
                </label>
                <input
                  id="chk-email"
                  type="email"
                  required
                  value={learnerEmail}
                  onChange={(e) => setLearnerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>

              {/* POPIA Privacy Notice & Optional Marketing Consent (Unchecked by Default) */}
              <div className="p-3.5 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg space-y-2 text-xs text-[#52525B]">
                <p className="leading-relaxed">
                  <strong className="text-[#1C1B1B]">POPIA Privacy Notice:</strong>{' '}
                  Personal and SA ID details are processed strictly for QCTO/Services SETA learner registration, NLRD reporting, and tax invoicing in compliance with the Protection of Personal Information Act (POPIA).
                </p>
                <label className="flex items-start gap-2.5 text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={popiaMarketingConsent}
                    onChange={(e) => setPopiaMarketingConsent(e.target.checked)}
                    className="mt-0.5 rounded border-[#E5E7EB] text-[#D91B24]"
                  />
                  <span className="italic">
                    I have read the POPIA Privacy Notice and consent to receive course updates and marketing communications (optional).
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-[#52525B] hover:text-[#1C1B1B] inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>
                    {isQuoteOnly ? 'Next: Confirm Quote' : 'Next: Payment Method'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="chk-pay"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Select Secure Payment or Corporate Invoicing Method
                </label>
                <select
                  id="chk-pay"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  <option value="Instant EFT / PayFast Secure">
                    Instant EFT / PayFast Secure (Immediate LMS Access)
                  </option>
                  <option value="Visa / Mastercard Debit or Credit">
                    Visa / Mastercard Debit or Credit (Peach Payments / Payfast)
                  </option>
                  <option value="Scan-to-Pay / SnapScan / Zapper">
                    Scan-to-Pay / QR Code (Payfast / Peach Payments)
                  </option>
                  <option value="Corporate Purchase Order / Invoice">
                    Corporate Purchase Order / Pro-Forma VAT Tax Invoice
                  </option>
                </select>

                {/* PCI-DSS Zero-Card-Storage & VAT Tax Invoice Notice (RFQ F06 & Section 6) */}
                <div className="mt-2.5 p-3 bg-slate-50 border border-[#E5E7EB] rounded-lg flex items-start gap-2 text-xs text-[#52525B]">
                  <ShieldCheck className="w-4 h-4 text-[#D91B24] shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">
                    Processed securely via PCI-DSS compliant South African gateways (Payfast / Peach Payments — Card, Instant EFT &amp; Scan-to-Pay). Zero card details are stored on this website. An itemised VAT tax invoice is emailed automatically upon payment.
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B] space-y-1">
                <p className="font-bold">
                  ✓ {isQuoteOnly ? 'Corporate Group Quote & Cohort Reservation' : 'Enrolment Guarantee & Instant Unlock'}
                </p>
                <p>
                  Completing this step immediately unlocks{' '}
                  <strong>{course.title}</strong> in your Learner Dashboard and issues your official itemised VAT reference.
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-xs font-semibold text-[#52525B] hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>
                    {isQuoteOnly
                      ? `Submit Group Quote (Est. R${grandTotalZAR.toLocaleString('en-ZA')} Incl. VAT)`
                      : `Confirm & Pay (R${grandTotalZAR.toLocaleString('en-ZA')} Incl. VAT)`}
                  </span>
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export function BrochureModal({
  course,
  onClose,
  onEnrol,
}: {
  course: Course | null;
  onClose: () => void;
  onEnrol: (course: Course) => void;
}) {
  useEffect(() => {
    if (!course) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [course, onClose]);

  if (!course) return null;

  const downloadSpecTxt = () => {
    const spec = `TRAINING AFRICA ACADEMY — OFFICIAL COURSE BROCHURE & WSP SPECIFICATION
Programme:          ${course.title}
Course Code:        ${course.code} (${course.saqaId})
NQF & Credits:      ${course.nqfLevel} · ${course.credits} Credits
Accreditation:      ${course.accreditationBody}
Duration:           ${course.duration}
Individual Fee:     ${
      course.quoteOnly
        ? 'Variable / Corporate Quote-Only'
        : `R${course.priceZAR.toLocaleString('en-ZA')} Incl. VAT`
    }
Corporate Rate:     R${course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Incl. VAT per learner (5+ cohort)
Relief Staff Option: ${
      course.reliefStaffAvailable
        ? `Available at R${course.reliefStaffRatePerDayZAR}/day Incl. VAT per operative`
        : 'Not applicable'
    }

OVERVIEW:
${course.fullDescription}

MODULES:
${course.modules
  .map(
    (m) => `Module ${m.number}: ${m.title} (${m.duration}) — ${m.summary}`
  )
  .join('\n')}

Contact: +27 (0)11 794 6665 | info@trainingafricaacademy.co.za
Address: Unit 14 Fancourt Office Park, Northriding, Randburg, 2188
`;
    const blob = new Blob([spec], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Brochure_${course.code}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-[#E5E7EB] rounded-xl max-w-xl w-full overflow-hidden shadow-xl">
        <div className="bg-[#1C1B1B] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#F59E0B] font-mono">
              Official Course Brochure · {course.code}
            </p>
            <h2 id="brochure-modal-title" className="text-base font-bold">
              {course.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close brochure modal"
            className="text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
            <div>
              <span className="text-[#52525B] block">SAQA / NQF Status</span>
              <strong className="text-[#1C1B1B]">
                {course.saqaId} · {course.nqfLevel} ({course.credits} Credits)
              </strong>
            </div>
            <div>
              <span className="text-[#52525B] block">
                Fee Structure (Incl. VAT)
              </span>
              <strong className="font-mono text-[#D91B24]">
                {course.quoteOnly
                  ? `Variable / Corporate Quote-Only (Est. R${course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Incl. VAT)`
                  : `R${course.priceZAR.toLocaleString('en-ZA')} Single / R${course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Group Incl. VAT`}
              </strong>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-[#52525B]">
            {course.fullDescription}
          </p>

          <div>
            <p className="font-bold text-[#1C1B1B] mb-2">Curriculum Modules:</p>
            <ul className="space-y-2">
              {course.modules.map((m) => (
                <li
                  key={m.id}
                  className="p-2.5 bg-[#FCF9F8] rounded border border-[#E5E7EB]"
                >
                  <strong className="text-[#1C1B1B]">
                    Module {m.number}: {m.title}
                  </strong>{' '}
                  ({m.duration}) — {m.summary}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={downloadSpecTxt}
              className="px-4 py-2.5 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#D91B24]" />
              <span>Save Brochure File (.TXT)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onEnrol(course);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
            >
              {course.quoteOnly ? 'Request Group Quote' : 'Enrol in This Course'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
