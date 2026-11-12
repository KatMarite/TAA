'use client';

import React, { useMemo } from 'react';
import {
  BRAND_IMAGES,
  OTHER_SERVICES_LIST,
  GALLERY_ITEMS,
  Course,
  PageId,
} from '@/lib/academy-data';
import ResilientImage from '@/components/ResilientImage';
import { CourseFinderWizard } from '@/components/UxEnhancements';
import {
  Search,
  GraduationCap,
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
} from 'lucide-react';

export interface HomeViewProps {
  courses: Course[];
  audienceMode: 'learner' | 'employer';
  setAudienceMode: (mode: 'learner' | 'employer') => void;
  homeSearchQuery: string;
  setHomeSearchQuery: (query: string) => void;
  showFinderWizard: boolean;
  setShowFinderWizard: (show: boolean) => void;
  onNavigate: (page: PageId) => void;
  onNavigateCourseFilter: (filter: 'all' | 'accredited' | 'short') => void;
  onInspectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
  onOpenBrochure: (course: Course) => void;
  onHomeSearchSubmit: (e: React.FormEvent) => void;
}

export function HomeView({
  courses,
  audienceMode,
  setAudienceMode,
  homeSearchQuery,
  setHomeSearchQuery,
  showFinderWizard,
  setShowFinderWizard,
  onNavigate,
  onNavigateCourseFilter,
  onInspectCourse,
  onEnrolCourse,
  onOpenBrochure,
  onHomeSearchSubmit,
}: HomeViewProps) {
  // Memoized courses filtering to avoid re-calculating on unrelated parent renders
  const setaAccreditedCourses = useMemo(
    () => courses.filter((c) => c.category === 'Occupational Qualifications'),
    [courses]
  );

  const shortCoursesList = useMemo(
    () => courses.filter((c) => c.category !== 'Occupational Qualifications'),
    [courses]
  );

  return (
    <div>
      {/* ============================================================== */}
      {/* 1. SPLIT-SCREEN ARCHITECTURAL HERO SECTION                     */}
      {/* ============================================================== */}
      <section className="arch-hero-surface border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left 7 Cols: SETA Accredited Badge, Headline, High-Contrast CTA Group & Entry Routes */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* SETA Accredited Trust Indicator */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-soft border border-brand-soft text-brand text-xs font-bold tracking-wide mb-6">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>
                    SETA Accredited · QCTO Registered · Division of Cleaning Africa Services (Est. 2000)
                  </span>
                </div>

                {/* Hero Headline: font-weight 800, letter-spacing -0.03em, line-height 1.1 */}
                <h1
                  className="font-extrabold tracking-[-0.03em] text-[#1C1B1B] leading-[1.1]"
                  style={{
                    fontSize: 'clamp(2.5rem, 4.6vw, 4.1rem)',
                    textWrap: 'balance',
                  }}
                >
                  Advancing Knowledge,{' '}
                  <span className="text-brand underline decoration-wavy decoration-1 underline-offset-8">
                    Transforming Lives.
                  </span>
                </h1>

                {/* Readable Measure Body Copy (max-width: 65ch, line-height: 1.6) */}
                <p className="mt-5 text-base sm:text-lg text-[#52525B] max-w-[65ch] leading-[1.6]">
                  South Africa’s industry-born vocational training academy and QCTO assessment centre in Northriding, Randburg. Build a certified career or upskill your commercial facility workforce with upfront ZAR pricing, self-paced online modules, and optional R380/day relief staff.
                </p>

                {/* High-Contrast Two-Button CTA Group */}
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onNavigateCourseFilter('accredited')}
                    className="px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-brand rounded-xl shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Qualifications (NQF 1–4)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateCourseFilter('short')}
                    className="px-7 py-3.5 text-sm sm:text-base font-bold text-[#1C1B1B] bg-white hover:bg-[#18181B] hover:text-white border-2 border-[#18181B] rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Short Courses</span>
                  </button>
                </div>

                {/* Two Prominent Accessible Audience Entry Routes */}
                <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setAudienceMode('learner');
                      onNavigate('catalogue');
                    }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-left w-full focus:outline-none focus:ring-2 focus:ring-[#D91B24] ${
                      audienceMode === 'learner'
                        ? 'bg-[#18181B] text-white border-[#18181B] shadow-md'
                        : 'bg-white text-[#1C1B1B] border-[#E5E7EB] hover:border-brand'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-mono font-bold ${
                          audienceMode === 'learner'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      >
                        Entry Route 01 · Individual Learner
                      </span>
                      <GraduationCap
                        className={`w-5 h-5 ${
                          audienceMode === 'learner'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      />
                    </div>
                    <h2 className="text-lg font-extrabold">“I want to study”</h2>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        audienceMode === 'learner'
                          ? 'text-zinc-300'
                          : 'text-[#52525B]'
                      }`}
                    >
                      Filter courses by career outcome, view upfront ZAR fees, enrol & pay online, and study self-paced or practical modules.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setAudienceMode('employer');
                      onNavigate('employers');
                    }}
                    className={`p-5 rounded-xl border transition-all cursor-pointer text-left w-full focus:outline-none focus:ring-2 focus:ring-[#D91B24] ${
                      audienceMode === 'employer'
                        ? 'bg-[#18181B] text-white border-[#18181B] shadow-md'
                        : 'bg-white text-[#1C1B1B] border-[#E5E7EB] hover:border-brand'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={`text-xs font-mono font-bold ${
                          audienceMode === 'employer'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      >
                        Entry Route 02 · Employer / HR / L&D
                      </span>
                      <Building2
                        className={`w-5 h-5 ${
                          audienceMode === 'employer'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      />
                    </div>
                    <h2 className="text-lg font-extrabold">“Train my team”</h2>
                    <p
                      className={`text-xs mt-1 leading-relaxed ${
                        audienceMode === 'employer'
                          ? 'text-zinc-300'
                          : 'text-[#52525B]'
                      }`}
                    >
                      Calculate Section 12H tax ROI, request group quotes with R380/day relief staff, enrol multiple staff, and track progress.
                    </p>
                  </button>
                </div>
              </div>

              {/* Course Discovery Search Bar */}
              <form
                onSubmit={onHomeSearchSubmit}
                className="mt-7 pt-6 border-t border-[#E5E7EB] flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#52525B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={homeSearchQuery}
                    onChange={(e) => setHomeSearchQuery(e.target.value)}
                    placeholder="Search courses by role, NQF level or skill (e.g. Supervisor, Solar, Startup)..."
                    aria-label="Search courses"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:border-brand text-[#1C1B1B]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 text-sm font-bold text-white bg-[#18181B] hover:bg-brand rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Search Catalogue
                </button>
              </form>
            </div>

            {/* Right 5 Cols: Campus Photography + Verification Cards */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xl bg-white">
                <div className="aspect-[4/4.3] w-full relative">
                  <ResilientImage
                    src={BRAND_IMAGES.heroAcademy}
                    alt="Training Africa Academy Facilitator and Learners in Randburg"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/95 via-[#18181B]/30 to-transparent" />
                </div>

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-md bg-[#18181B]/90 backdrop-blur-xs text-white text-xs font-bold">
                    Northriding, Randburg Campus
                  </span>
                  <span className="px-3 py-1 rounded-md bg-brand text-white text-xs font-mono font-bold">
                    94.6% EISA Pass Rate
                  </span>
                </div>

                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-md border border-[#E5E7EB] rounded-xl p-4 text-[#1C1B1B] shadow-lg">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-brand mb-1">
                    <span>ZERO DOWNTIME GUARANTEE</span>
                    <span>R380.00 / DAY</span>
                  </div>
                  <p className="text-sm font-extrabold text-[#1C1B1B]">
                    Practical Hygiene Bays, Solar PV Rigs & Self-Paced LMS
                  </p>
                  <p className="text-xs text-[#52525B] mt-1">
                    We supply vetted Cleaning Africa Services relief staff on your premises while your permanent employees train.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. "WHO WE ARE" TWO-COLUMN ASYMMETRIC BENTO SECTION            */}
      {/* ============================================================== */}
      <section className="bg-white border-b border-[#E5E7EB] py-16 lg:py-20">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Bento Card (7 Cols): Heritage */}
            <div className="lg:col-span-7 bg-[#FCF9F8] border border-[#E5E7EB] rounded-2xl p-8 sm:p-10 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-4">
                  Who We Are · Heritage Since 2000
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#1C1B1B] leading-tight">
                  Forged from 25+ Years of Real-World Commercial Hygiene Excellence
                </h2>
                <p className="mt-4 text-base text-[#52525B] max-w-[65ch] leading-[1.6]">
                  Established as the dedicated training and skills development arm of{' '}
                  <strong className="text-[#1C1B1B]">
                    Cleaning Africa Services (Pty) Ltd
                  </strong>{' '}
                  (founded in 2000), Training Africa Academy was created to address critical skills shortages across South Africa’s commercial cleaning, healthcare sanitation, hospitality, and green solar maintenance sectors.
                </p>
                <p className="mt-3 text-sm text-[#52525B] max-w-[65ch] leading-[1.6]">
                  We empower both unemployed youth seeking their first NQF qualification and corporate facility teams requiring SETA-accredited upskilling, B-BBEE Skills Development points, and SARS Section 12H learnership tax allowances.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6 text-xs font-bold text-[#1C1B1B]">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand" />
                    <span>70% Practical Simulation</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand" />
                    <span>6 SA Languages Supported</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-xs sm:text-sm font-bold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Our Full Heritage & Accreditations</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Metrics Grid (5 Cols) */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#18181B] text-white rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs font-mono font-bold text-amber-400">
                  01 · HERITAGE
                </span>
                <div className="my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums">
                    20+ Years
                  </span>
                  <p className="text-sm font-bold text-white mt-1">
                    Industry Experience
                  </p>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Rooted in Cleaning Africa Services (Pty) Ltd since 2000 across commercial & industrial estates.
                </p>
              </div>

              <div className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs font-mono font-bold text-brand">
                  02 · QUALITY ASSURANCE
                </span>
                <div className="my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#1C1B1B] tabular-nums">
                    SETA
                  </span>
                  <p className="text-sm font-bold text-[#1C1B1B] mt-1">
                    QCTO & Services SETA
                  </p>
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Accredited NQF Level 1 to Level 4 qualifications (120–149 credits) and registered assessors.
                </p>
              </div>

              <div className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs font-mono font-bold text-brand">
                  03 · SECTOR SCOPE
                </span>
                <div className="my-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#1C1B1B]">
                    Multi-Industry
                  </span>
                  <p className="text-sm font-bold text-[#1C1B1B] mt-1">
                    Nationwide Training
                  </p>
                </div>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Commercial offices, hospitals, retail malls, hospitality, solar PV arrays & SMME contractors.
                </p>
              </div>

              <div className="bg-brand text-white rounded-2xl p-6 flex flex-col justify-between">
                <span className="text-xs font-mono font-bold text-white/90">
                  04 · CONTINUITY
                </span>
                <div className="my-4">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums">
                    R380/Day
                  </span>
                  <p className="text-sm font-bold text-white mt-1">
                    Vetted Relief Staff
                  </p>
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Temporary replacement cleaners deployed on your site while your permanent team trains.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. SETA ACCREDITED QUALIFICATIONS (3-COLUMN ELEVATED GRID)     */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 pt-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5E7EB]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-2">
              National Qualifications Framework · QCTO & Services SETA
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1B1B]">
              SETA Accredited Qualifications & Learnerships
            </h2>
            <p className="text-sm text-[#52525B] mt-1 max-w-[65ch]">
              Full credit-bearing NQF Level 1, Level 3, and Level 4 qualifications eligible for Workplace Skills Plans (WSP), mandatory grants, and SARS Section 12H tax allowances.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('qualifications')}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#18181B] hover:bg-brand rounded-xl transition-colors cursor-pointer shrink-0"
          >
            View Learnership Intakes & Apply →
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {setaAccreditedCourses.map((course) => (
            <article
              key={course.id}
              className="course-card-elevated overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={course.image}
                    alt={course.title}
                    fallbackTitle={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-brand text-white text-xs font-bold shadow-xs">
                      {course.nqfLevel}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#18181B]/90 text-white text-xs font-mono font-semibold">
                      {course.credits} Credits
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-200 font-mono">
                    <span>{course.saqaId}</span>
                    <span>{course.duration}</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold text-brand mb-1">
                    {course.accreditationBody}
                  </p>
                  <h3 className="text-lg font-bold text-[#1C1B1B] leading-snug">
                    <button
                      type="button"
                      onClick={() => onInspectCourse(course.id)}
                      className="text-left hover:text-brand transition-colors cursor-pointer"
                    >
                      {course.title}
                    </button>
                  </h3>
                  <p className="mt-2 text-sm text-[#52525B] line-clamp-2 leading-relaxed">
                    {course.shortSummary}
                  </p>
                  <p className="mt-3 text-xs text-[#52525B]">
                    <strong className="text-[#1C1B1B]">Career Outcome:</strong>{' '}
                    {course.careerOutcome}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 bg-[#FCF9F8] border-t border-[#E5E7EB]">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-[#52525B] block">
                      Single Learner
                    </span>
                    <span className="text-xl font-extrabold font-mono text-[#1C1B1B] tabular-nums">
                      R{course.priceZAR.toLocaleString('en-ZA')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#52525B] block">
                      Employer Cohort (5+)
                    </span>
                    <span className="text-sm font-bold font-mono text-brand tabular-nums">
                      R{course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} / staff
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => onInspectCourse(course.id)}
                    className="text-xs font-bold text-[#1C1B1B] hover:text-brand transition-colors cursor-pointer"
                  >
                    View Course Details →
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnrolCourse(course)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-brand rounded-lg transition-colors cursor-pointer"
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. SHORT COURSES & SKILLS PROGRAMMES (3-COLUMN ELEVATED GRID)  */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5E7EB]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-zinc-200/80 text-[#1C1B1B] text-xs font-bold mb-2">
              Rapid Upskilling · Self-Paced Online & Randburg Practicals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1B1B]">
              Specialized Short Courses & Entrepreneurship Masterclasses
            </h2>
            <p className="text-sm text-[#52525B] mt-1 max-w-[65ch]">
              High-impact 2-day to 5-day practical certifications in Commercial Cleaning Modules 1 & 2, Solar Panel Cleaning, Carpet Extraction, and Cleaning Business Startup.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateCourseFilter('short')}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#1C1B1B] bg-white hover:bg-[#18181B] hover:text-white border border-[#18181B] rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Browse All Short Courses →
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shortCoursesList.slice(0, 3).map((course) => (
            <article
              key={course.id}
              className="course-card-elevated overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={course.image}
                    alt={course.title}
                    fallbackTitle={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-[#18181B] text-white text-xs font-bold shadow-xs">
                      Short Course
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-brand text-white text-xs font-mono font-bold">
                      {course.duration.split('(')[0].trim()}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-zinc-200 font-mono">
                    <span>{course.code}</span>
                    <span>{course.credits} Credits</span>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-bold text-brand mb-1">
                    {course.category}
                  </p>
                  <h3 className="text-lg font-bold text-[#1C1B1B] leading-snug">
                    <button
                      type="button"
                      onClick={() => onInspectCourse(course.id)}
                      className="text-left hover:text-brand transition-colors cursor-pointer"
                    >
                      {course.title}
                    </button>
                  </h3>
                  <p className="mt-2 text-sm text-[#52525B] line-clamp-2 leading-relaxed">
                    {course.shortSummary}
                  </p>
                  <p className="mt-3 text-xs text-[#52525B]">
                    <strong className="text-[#1C1B1B]">Delivery:</strong>{' '}
                    {course.deliveryModes.slice(0, 2).join(' · ')}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 bg-[#FCF9F8] border-t border-[#E5E7EB]">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-[#52525B] block">
                      Single Learner
                    </span>
                    <span className="text-xl font-extrabold font-mono text-[#1C1B1B] tabular-nums">
                      R{course.priceZAR.toLocaleString('en-ZA')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#52525B] block">
                      Employer Cohort (5+)
                    </span>
                    <span className="text-sm font-bold font-mono text-brand tabular-nums">
                      R{course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} / staff
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => onInspectCourse(course.id)}
                    className="text-xs font-bold text-[#1C1B1B] hover:text-brand transition-colors cursor-pointer"
                  >
                    View Course Details →
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnrolCourse(course)}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-brand rounded-lg transition-colors cursor-pointer"
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* INTERACTIVE 3-STEP CAREER & COURSE FINDER WIZARD */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-8">
        {showFinderWizard ? (
          <CourseFinderWizard
            courses={courses}
            onSelectCourse={onInspectCourse}
            onEnrolCourse={onEnrolCourse}
            onOpenBrochure={onOpenBrochure}
            onNavigate={onNavigate}
          />
        ) : (
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex items-center justify-between">
            <span className="text-sm font-bold text-[#1C1B1B]">
              Need help matching the right NQF qualification or short course?
            </span>
            <button
              type="button"
              onClick={() => setShowFinderWizard(true)}
              className="px-4 py-2 text-xs font-bold text-white bg-brand rounded-lg cursor-pointer"
            >
              Open 3-Step Course Matcher
            </button>
          </div>
        )}
      </section>

      {/* ============================================================== */}
      {/* 5. OTHER SERVICES SECTION (RELIEF STAFF, VENUE HIRE, WSP/12H)  */}
      {/* ============================================================== */}
      <section className="bg-white border-y border-[#E5E7EB] py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5E7EB]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-2">
                Other Services · Turnkey Employer & Assessment Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1B1B]">
                Operational Relief Staff, Randburg Venue Hire & WSP Advisory
              </h2>
              <p className="text-sm text-[#52525B] mt-1 max-w-[65ch]">
                Backed by Cleaning Africa Services (Pty) Ltd, we eliminate every operational barrier to workforce training.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('other-services')}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#18181B] hover:bg-brand rounded-xl transition-colors cursor-pointer shrink-0"
            >
              Explore All Specialist Services →
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OTHER_SERVICES_LIST.map((srv) => (
              <div
                key={srv.id}
                className="course-card-elevated p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded bg-[#18181B] text-white text-[11px] font-bold mb-3">
                    {srv.badge}
                  </span>
                  <h3 className="text-base font-bold text-[#1C1B1B] leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs font-mono font-bold text-brand mt-2">
                    {srv.priceHighlight}
                  </p>
                  <p className="text-xs text-[#52525B] mt-2 leading-relaxed">
                    {srv.summary}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(srv.targetPage)}
                  className="mt-5 pt-3 border-t border-[#E5E7EB] text-xs font-bold text-brand hover:underline text-left cursor-pointer"
                >
                  {srv.ctaLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. TRAINING & FACILITY GALLERY SHOWCASE                        */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-[#E5E7EB]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-2">
              Campus & Practical Gallery · Northriding, Randburg
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1C1B1B]">
              Inside Our Simulation Bays, Solar PV Rigs & Lecture Suites
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('gallery')}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#1C1B1B] bg-white hover:bg-[#18181B] hover:text-white border border-[#18181B] rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Open Full Training Gallery →
          </button>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="course-card-elevated overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    fallbackTitle={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#18181B]/90 text-white text-[11px] font-bold">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-xs font-mono text-brand font-bold">
                    {item.location}
                  </p>
                  <h3 className="text-base font-bold text-[#1C1B1B] mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#52525B] mt-1.5 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

