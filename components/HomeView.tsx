'use client';

import React, { useMemo, useState } from 'react';
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
  CheckCircle2,
  Compass,
  ChevronDown,
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
  const [courseTab, setCourseTab] = useState<'featured' | 'accredited' | 'short'>(
    'featured'
  );

  const setaAccreditedCourses = useMemo(
    () => courses.filter((c) => c.category === 'Occupational Qualifications'),
    [courses]
  );

  const shortCoursesList = useMemo(
    () => courses.filter((c) => c.category !== 'Occupational Qualifications'),
    [courses]
  );

  const displayedCourses = useMemo(() => {
    if (courseTab === 'accredited') {
      return setaAccreditedCourses.slice(0, 3);
    }
    if (courseTab === 'short') {
      return shortCoursesList.slice(0, 3);
    }
    // Featured mix: 1 entry short course, 1 NQF 3 supervisor qualification, 1 specialist/startup course
    const featured = [
      shortCoursesList[0],
      setaAccreditedCourses[0],
      shortCoursesList[2] || shortCoursesList[1],
    ].filter(Boolean);
    return featured.length === 3 ? featured : courses.slice(0, 3);
  }, [courseTab, setaAccreditedCourses, shortCoursesList, courses]);

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* ============================================================== */}
      {/* 1. HERO SECTION: CLEAR AUDIENCE ENTRY & COURSE DISCOVERY       */}
      {/* ============================================================== */}
      <section className="arch-hero-surface border-b border-[var(--border-subtle)]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 7 Cols: Clear Proposition, Two Primary Audience Routes & Course Search */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quiet Unboxed Accreditation Kicker */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-semibold text-brand">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>QCTO & Services SETA Accredited</span>
                <span aria-hidden="true" className="text-[var(--text-muted)]">
                  ·
                </span>
                <span className="text-[var(--text-muted)] font-medium">
                  Division of Cleaning Africa Services (Est. 2000)
                </span>
              </div>

              {/* Hero Headline */}
              <div>
                <h1
                  className="font-extrabold tracking-[-0.03em] text-[var(--text-primary)] leading-[1.12]"
                  style={{
                    fontSize: 'clamp(2rem, 4.2vw, 3.5rem)',
                    textWrap: 'balance',
                  }}
                >
                  Advancing Knowledge,{' '}
                  <span className="text-brand">Transforming Lives.</span>
                </h1>

                <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] max-w-[62ch] leading-relaxed">
                  Accredited commercial cleaning, hygiene, and solar maintenance training in Northriding, Randburg and online. Choose your path below to start a certified career or upskill your workforce with upfront ZAR pricing.
                </p>
              </div>

              {/* Primary First Step: Two Distinct Audience Entry Cards */}
              <div
                aria-label="Choose your starting path"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
              >
                {/* Route 1: Individual Learner */}
                <button
                  type="button"
                  onClick={() => {
                    setAudienceMode('learner');
                    onNavigateCourseFilter('all');
                  }}
                  className={`group p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[168px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] ${
                    audienceMode === 'learner'
                      ? 'bg-[var(--brand-secondary)] text-white border-[var(--brand-secondary)] shadow-sm'
                      : 'bg-white text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-brand'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-xs font-bold ${
                          audienceMode === 'learner'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      >
                        For Individual Learners
                      </span>
                      <GraduationCap
                        className={`w-5 h-5 shrink-0 ${
                          audienceMode === 'learner'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight">
                      I want to study
                    </h2>
                    <p
                      className={`text-sm mt-1.5 leading-relaxed ${
                        audienceMode === 'learner'
                          ? 'text-zinc-200'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      Compare accredited qualifications (NQF 1–4) and 2–5 day short courses from R1,450. Enrol online or study at our Randburg campus.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                      audienceMode === 'learner'
                        ? 'border-white/15 text-amber-400'
                        : 'border-[var(--border-subtle)] text-brand'
                    }`}
                  >
                    <span>Explore Courses & Fees</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>

                {/* Route 2: Employer / HR / L&D */}
                <button
                  type="button"
                  onClick={() => {
                    setAudienceMode('employer');
                    onNavigate('employers');
                  }}
                  className={`group p-5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[168px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] ${
                    audienceMode === 'employer'
                      ? 'bg-[var(--brand-secondary)] text-white border-[var(--brand-secondary)] shadow-sm'
                      : 'bg-white text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-brand'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span
                        className={`text-xs font-bold ${
                          audienceMode === 'employer'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      >
                        For Employers, HR & Operations
                      </span>
                      <Building2
                        className={`w-5 h-5 shrink-0 ${
                          audienceMode === 'employer'
                            ? 'text-amber-400'
                            : 'text-brand'
                        }`}
                      />
                    </div>
                    <h2 className="text-xl font-extrabold tracking-tight">
                      Train my team
                    </h2>
                    <p
                      className={`text-sm mt-1.5 leading-relaxed ${
                        audienceMode === 'employer'
                          ? 'text-zinc-200'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      Request group quotes, add R380/day vetted relief staff while your team trains, and calculate SARS Section 12H tax savings.
                    </p>
                  </div>
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-bold ${
                      audienceMode === 'employer'
                        ? 'border-white/15 text-amber-400'
                        : 'border-[var(--border-subtle)] text-brand'
                    }`}
                  >
                    <span>Employer Quotes & Tax ROI</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </button>
              </div>

              {/* Easy-to-Find Course Search & Secondary Quick Filters */}
              <div className="bg-white border border-[var(--border-subtle)] rounded-xl p-4 space-y-3">
                <form
                  onSubmit={onHomeSearchSubmit}
                  className="flex flex-col sm:flex-row gap-2.5"
                >
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={homeSearchQuery}
                      onChange={(e) => setHomeSearchQuery(e.target.value)}
                      placeholder="Search courses by role, NQF level, or skill (e.g. Supervisor, Solar, Startup)..."
                      aria-label="Search courses"
                      className="w-full pl-10 pr-4 py-2.5 min-h-[44px] text-sm bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-lg focus:outline-none focus:border-brand text-[var(--text-primary)]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 min-h-[44px] text-sm font-bold text-white bg-brand rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Search Courses
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[var(--text-muted)]">
                  <span className="font-semibold text-[var(--text-primary)]">
                    Quick browse:
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigateCourseFilter('accredited')}
                    className="hover:text-brand underline underline-offset-4 cursor-pointer"
                  >
                    NQF 1–4 Qualifications
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigateCourseFilter('short')}
                    className="hover:text-brand underline underline-offset-4 cursor-pointer"
                  >
                    2–5 Day Short Courses
                  </button>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('assessment-centre')}
                    className="hover:text-brand underline underline-offset-4 cursor-pointer"
                  >
                    Randburg Venue Hire
                  </button>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Clean Campus Image with Legible Below-Image Facts */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-white shadow-sm">
                <div className="aspect-[16/11] w-full bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={BRAND_IMAGES.heroAcademy}
                    alt="Training Africa Academy Facilitator and Learners in Randburg"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Secondary Details Beneath Image (No Competing Overlay Badges) */}
                <div className="p-5 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-brand">
                      Northriding, Randburg Campus & Nationwide On-Site
                    </p>
                    <h2 className="text-base font-bold text-[var(--text-primary)] mt-0.5">
                      Practical Hygiene Bays, Solar PV Rigs & Self-Paced Online LMS
                    </h2>
                    <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                      We combine 70% practical workplace simulation with self-paced digital modules, and deploy vetted Cleaning Africa Services relief staff so employer sites never lose coverage during training.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[var(--border-subtle)] text-left">
                    <div>
                      <span className="block text-base sm:text-lg font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                        94.6%
                      </span>
                      <span className="block text-[11px] text-[var(--text-muted)] leading-snug">
                        QCTO EISA Pass Rate
                      </span>
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-extrabold font-mono text-brand tabular-nums">
                        R380/day
                      </span>
                      <span className="block text-[11px] text-[var(--text-muted)] leading-snug">
                        Vetted Relief Staff
                      </span>
                    </div>
                    <div>
                      <span className="block text-base sm:text-lg font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                        Est. 2000
                      </span>
                      <span className="block text-[11px] text-[var(--text-muted)] leading-snug">
                        Industry Heritage
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. KEY TRUST POINTS & HERITAGE (PLAIN-LANGUAGE CREDIBILITY)    */}
      {/* ============================================================== */}
      <section className="bg-white border-b border-[var(--border-subtle)] py-12 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs font-bold text-brand">
                Who We Are · Built by Cleaning Africa Services (Pty) Ltd
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] leading-tight">
                25+ Years of Real-World Commercial Hygiene Experience
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed max-w-[60ch]">
                Founded as the dedicated training division of{' '}
                <strong className="text-[var(--text-primary)]">
                  Cleaning Africa Services (Pty) Ltd
                </strong>{' '}
                (established in 2000), we train individual job-seekers and corporate facility teams across commercial offices, healthcare, hospitality, and solar maintenance.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-[var(--text-primary)]">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>70% Practical Simulation</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                  <span>6 SA Languages Supported</span>
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-brand font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>About & Accreditations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 4 Scannable Trust Cards Explaining Key Terms Plainly */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-5">
                <p className="text-xs font-bold text-brand">
                  QCTO & Services SETA
                </p>
                <p className="text-lg font-extrabold text-[var(--text-primary)] mt-1">
                  Nationally Accredited
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Registered with the Quality Council for Trades and Occupations (QCTO) and Services SETA for NQF Level 1 to 4 qualifications.
                </p>
              </div>

              <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-5">
                <p className="text-xs font-bold text-brand">
                  Upfront ZAR Pricing
                </p>
                <p className="text-lg font-extrabold text-[var(--text-primary)] mt-1 font-mono tabular-nums">
                  From R1,450
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Transparent single-learner fees and discounted group rates for 5+ staff, with instant official PDF brochures and quotes.
                </p>
              </div>

              <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-5">
                <p className="text-xs font-bold text-brand">
                  Zero Site Downtime
                </p>
                <p className="text-lg font-extrabold text-[var(--text-primary)] mt-1 font-mono tabular-nums">
                  R380 / Day Relief Staff
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Employers can book vetted temporary cleaners to cover shifts on-site while permanent staff complete practical training.
                </p>
              </div>

              <div className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-5">
                <p className="text-xs font-bold text-brand">
                  Tax & Grant Recovery
                </p>
                <p className="text-lg font-extrabold text-[var(--text-primary)] mt-1 font-mono tabular-nums">
                  Up to R80,000 / Learner
                </p>
                <p className="text-xs text-[var(--text-muted)] mt-1 leading-relaxed">
                  Qualifying learnerships unlock SARS Section 12H tax allowances and Workplace Skills Plan (WSP) mandatory grant claims.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CURATED COURSES & QUALIFICATIONS (SINGLE SCANNABLE SECTION) */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
          <div>
            <p className="text-xs font-bold text-brand">
              Accredited Qualifications & Practical Short Courses
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1">
              Explore Popular Programmes
            </h2>
            <p className="text-sm text-[var(--text-muted)] mt-1 max-w-[62ch]">
              Compare our most popular programmes below, or open the full catalogue to filter by NQF (National Qualifications Framework) level, duration, and delivery mode.
            </p>
          </div>

          {/* Interactive Filter Tabs (Fits 390px cleanly) */}
          <div
            role="tablist"
            aria-label="Filter home page courses"
            className="flex flex-wrap items-center gap-1 p-1 bg-white border border-[var(--border-subtle)] rounded-xl w-full sm:w-auto"
          >
            {[
              { id: 'featured' as const, label: 'Featured' },
              {
                id: 'accredited' as const,
                label: `Qualifications (${setaAccreditedCourses.length})`,
              },
              {
                id: 'short' as const,
                label: `Short Courses (${shortCoursesList.length})`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={courseTab === tab.id}
                onClick={() => setCourseTab(tab.id)}
                className={`flex-1 sm:flex-initial px-2.5 sm:px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap text-center cursor-pointer ${
                  courseTab === tab.id
                    ? 'bg-[var(--brand-secondary)] text-white'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Curated 3-Card Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedCourses.map((course) => (
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
                </div>

                <div className="p-6">
                  {/* Unboxed Metadata Line */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] mb-2">
                    <span className="font-bold text-brand">{course.nqfLevel}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.credits} Credits</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.duration.split('(')[0].trim()}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--text-primary)] leading-snug">
                    <button
                      type="button"
                      onClick={() => onInspectCourse(course.id)}
                      className="text-left hover:text-brand transition-colors cursor-pointer"
                    >
                      {course.title}
                    </button>
                  </h3>

                  <p className="mt-2 text-sm text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                    {course.shortSummary}
                  </p>

                  <p className="mt-3 text-xs text-[var(--text-muted)]">
                    <strong className="text-[var(--text-primary)]">Outcome:</strong>{' '}
                    {course.careerOutcome}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)]">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-[var(--text-muted)] block">
                      Individual Fee
                    </span>
                    <span className="text-xl font-extrabold font-mono text-[var(--text-primary)] tabular-nums">
                      R{course.priceZAR.toLocaleString('en-ZA')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[var(--text-muted)] block">
                      Group Rate (5+)
                    </span>
                    <span className="text-sm font-bold font-mono text-brand tabular-nums">
                      R{course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} / learner
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-3 border-t border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => onInspectCourse(course.id)}
                    className="py-2 text-xs font-bold text-[var(--text-primary)] hover:text-brand transition-colors cursor-pointer"
                  >
                    View Course Details →
                  </button>
                  <button
                    type="button"
                    onClick={() => onEnrolCourse(course)}
                    className="px-4 py-2 min-h-[38px] text-xs font-bold text-white bg-brand rounded-lg transition-colors cursor-pointer"
                  >
                    Enrol Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Clear Link to Full Course Catalogue & Career Pathways */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[var(--border-subtle)]">
          <p className="text-sm text-[var(--text-muted)]">
            Showing 3 of {courses.length} accredited qualifications and practical short courses.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('pathways')}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[var(--text-primary)] bg-white hover:bg-zinc-100 border border-[var(--border-subtle)] rounded-xl transition-colors cursor-pointer"
            >
              View Career Pathways
            </button>
            <button
              type="button"
              onClick={() => onNavigateCourseFilter('all')}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[var(--brand-secondary)] hover:bg-brand rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View Full Course Catalogue ({courses.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. ROUTE TO THE 3-STEP COURSE MATCHER                          */}
      {/* ============================================================== */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-white border border-[var(--border-subtle)] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand">
                <Compass className="w-4 h-4" />
                <span>Guided Course Matcher</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                Not sure which qualification or short course fits your goal?
              </h2>
              <p className="text-sm text-[var(--text-muted)] max-w-[62ch]">
                Answer 3 quick questions on your career goal, preferred learning format, and budget to see matched programmes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowFinderWizard(!showFinderWizard)}
              aria-expanded={showFinderWizard}
              className="px-5 py-3 min-h-[44px] text-xs sm:text-sm font-bold text-white bg-brand rounded-xl inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>
                {showFinderWizard ? 'Hide Course Matcher' : 'Start 3-Step Course Matcher'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showFinderWizard ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {showFinderWizard && (
            <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
              <CourseFinderWizard
                courses={courses}
                onSelectCourse={onInspectCourse}
                onEnrolCourse={onEnrolCourse}
                onOpenBrochure={onOpenBrochure}
                onNavigate={onNavigate}
              />
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 5. EMPLOYER SERVICES & RANDBURG CAMPUS HIGHLIGHTS              */}
      {/* ============================================================== */}
      <section className="bg-white border-t border-[var(--border-subtle)] py-14 sm:py-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Employer & Specialist Services */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <p className="text-xs font-bold text-brand">
                  Employer & Assessment Solutions
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1">
                  Workforce Training, Relief Staff & Venue Hire
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1 max-w-[62ch]">
                  Practical support for HR, Learning & Development (L&D), and operations teams across South Africa.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('other-services')}
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] hover:bg-zinc-100 border border-[var(--border-subtle)] rounded-xl transition-colors shrink-0 cursor-pointer"
              >
                All Employer & Venue Services →
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {OTHER_SERVICES_LIST.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
                      <ResilientImage
                        src={srv.image}
                        alt={srv.title}
                        fallbackTitle={srv.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-mono font-bold text-brand">
                        {srv.priceHighlight}
                      </p>
                      <h3 className="text-base font-bold text-[var(--text-primary)] mt-1 leading-snug">
                        {srv.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
                        {srv.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <button
                      type="button"
                      onClick={() => onNavigate(srv.targetPage)}
                      className="w-full pt-3 border-t border-[var(--border-subtle)] text-xs font-bold text-brand hover:underline text-left cursor-pointer"
                    >
                      {srv.ctaLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concise Randburg Campus & Gallery Preview */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[var(--border-subtle)]">
              <div>
                <p className="text-xs font-bold text-brand">
                  Northriding, Randburg Campus
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] mt-1">
                  Inside Our Practical Simulation Bays & Solar PV Rigs
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('assessment-centre')}
                  className="px-4 py-2 text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] hover:bg-zinc-100 border border-[var(--border-subtle)] rounded-lg cursor-pointer"
                >
                  Book Assessment Venue
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="px-4 py-2 text-xs font-bold text-brand hover:underline cursor-pointer"
                >
                  Open Full Gallery →
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {GALLERY_ITEMS.slice(0, 3).map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-primary)] flex flex-col justify-between"
                >
                  <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
                    <ResilientImage
                      src={item.image}
                      alt={item.title}
                      fallbackTitle={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs font-mono text-brand font-semibold">
                      {item.category} · {item.location}
                    </p>
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
