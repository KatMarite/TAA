'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_COURSES,
  CAREER_PATHWAYS,
  ASSESSMENT_FACILITIES,
  FACILITATORS,
  NEWS_ARTICLES,
  BRAND_IMAGES,
  OTHER_SERVICES_LIST,
  GALLERY_ITEMS,
  Course,
  PageId,
} from '@/lib/academy-data';
import TopBarAndNav, { ThemeClass } from '@/components/TopBarAndNav';
import ResilientImage from '@/components/ResilientImage';
import {
  CatalogueView,
  CourseDetailView,
  OnlineLearningView,
} from '@/components/CourseViews';
import {
  EmployersView,
  QualificationsView,
  PathwaysView,
  AssessmentCentreView,
  CorporateQuoteRecord,
  LearnershipApplicationRecord,
  VenueBookingRecord,
} from '@/components/AudienceJourneys';
import {
  AboutAccreditationsView,
  FacilitatorsView,
  ResourcesFaqsView,
  NewsInsightsView,
  ContactLocationsView,
  PoliciesView,
  SitemapArchitectureView,
  OtherServicesView,
  GalleryView,
} from '@/components/InstitutionalViews';
import {
  DashboardView,
  EnrolmentModal,
  BrochureModal,
  EnrolmentRecord,
} from '@/components/DashboardAndModals';
import {
  CourseFinderWizard,
  CertificateVerificationModal,
  GuidedOnboardingTour,
  MobileThumbBar,
} from '@/components/UxEnhancements';
import LiveChatWidget from '@/components/LiveChatWidget';
import {
  Search,
  GraduationCap,
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2,
  Users,
  Briefcase,
  Phone,
  MapPin,
  Mail,
} from 'lucide-react';

const STORAGE_KEY = 'taa_platform_state_v2';

export default function TrainingAfricaAcademyPlatform() {
  const hasHydratedRef = useRef<boolean>(false);

  const [activePage, setActivePage] = useState<PageId>('home');
  const [previousPage, setPreviousPage] = useState<PageId | null>(null);
  const [audienceMode, setAudienceMode] = useState<'learner' | 'employer'>(
    'learner'
  );
  const [activeCourseFilter, setActiveCourseFilter] = useState<
    'all' | 'accredited' | 'short'
  >('all');
  const [themeClass, setThemeClass] = useState<ThemeClass>('theme-crimson');

  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    INITIAL_COURSES[0].id
  );
  const [catalogueInitialSearch, setCatalogueInitialSearch] =
    useState<string>('');
  const [homeSearchQuery, setHomeSearchQuery] = useState<string>('');
  const [showFinderWizard, setShowFinderWizard] = useState<boolean>(true);
  const [tourOpen, setTourOpen] = useState<boolean>(false);

  // Learner & Conversion State (Initialized deterministically to prevent SSR/Client hydration mismatch)
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>([
    'short-intro-cleaning-1-2',
    'occ-cleaning-practitioner-nqf3',
  ]);
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([
    'ic-m1',
    'cp-m1',
  ]);
  const [enrolments, setEnrolments] = useState<EnrolmentRecord[]>([
    {
      id: 'ENR-84920',
      courseId: 'short-intro-cleaning-1-2',
      courseTitle:
        'Introduction to Professional Cleaning (Modules 1 & 2 Combined)',
      learnerName: 'Katleho Marite',
      learnerEmail: 'KatlehoMarite@gmail.com',
      paymentMethod: 'Instant EFT / PayFast Secure',
      amountPaidZAR: 1450,
      enrolledAt: '02 Nov 2026',
    },
  ]);

  const [quotes, setQuotes] = useState<CorporateQuoteRecord[]>([
    {
      id: 'QT-2026-4410',
      companyName: 'Sandton Commercial Property Group',
      contactPerson: 'Mpho Sithole',
      email: 'msithole@sandtonprop.co.za',
      industry: 'Commercial Real Estate & Facilities',
      courseTitle: 'Occupational Qualification: Cleaning Practitioner',
      staffCount: 14,
      includeReliefStaff: true,
      totalEstimatedZAR: 233240,
      createdAt: '05 Nov 2026',
    },
  ]);

  const [applications, setApplications] = useState<
    LearnershipApplicationRecord[]
  >([
    {
      id: 'LSH-2026-31902',
      applicantName: 'Bongani Zwane',
      idNumber: '9802145182086',
      email: 'bongani.zwane@mail.co.za',
      phone: '+27 73 419 2201',
      applicantType: 'Individual Applicant',
      qualificationTitle: 'Occupational Qualification: Commercial Cleaner',
      highestGrade: 'Grade 12 / Matric (NQF 4)',
      intakeWindow: 'January 2027 Q1 Intake',
      status: 'Document Verification Scheduled',
      createdAt: '08 Nov 2026',
    },
  ]);

  const [venueBookings, setVenueBookings] = useState<VenueBookingRecord[]>([
    {
      id: 'VEN-2026-7712',
      organisationName: 'Gauteng Skills Assessment Consortium',
      contactName: 'Annelize Botha',
      email: 'abotha@gsac.co.za',
      facilityName: 'Practical Hygiene & Floor-Care Simulation Bay (Bay A)',
      selectedDate: '2026-11-19',
      sessionDuration: 'Full Day (08:00–16:30)',
      candidateCount: 16,
      purpose: 'QCTO EISA Practical Assessment / Trade Test',
      quotedAmountZAR: 4800,
      createdAt: '07 Nov 2026',
    },
  ]);

  // Active Modals
  const [enrolModalCourse, setEnrolModalCourse] = useState<Course | null>(null);
  const [brochureModalCourse, setBrochureModalCourse] = useState<Course | null>(
    null
  );
  const [certificateModalCourse, setCertificateModalCourse] =
    useState<Course | null>(null);
  const [certificateModalOpen, setCertificateModalOpen] =
    useState<boolean>(false);

  // Restore saved state from localStorage after initial hydration completes
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed.courses) && parsed.courses.length > 0) {
            setCourses(parsed.courses);
          }
          if (Array.isArray(parsed.enrolledCourseIds)) {
            setEnrolledCourseIds(parsed.enrolledCourseIds);
          }
          if (Array.isArray(parsed.completedModuleIds)) {
            setCompletedModuleIds(parsed.completedModuleIds);
          }
          if (Array.isArray(parsed.enrolments)) {
            setEnrolments(parsed.enrolments);
          }
          if (Array.isArray(parsed.quotes)) {
            setQuotes(parsed.quotes);
          }
          if (Array.isArray(parsed.applications)) {
            setApplications(parsed.applications);
          }
          if (Array.isArray(parsed.venueBookings)) {
            setVenueBookings(parsed.venueBookings);
          }
          if (
            parsed.themeClass === 'theme-crimson' ||
            parsed.themeClass === 'theme-emerald'
          ) {
            setThemeClass(parsed.themeClass);
          }
        }
      } catch {
        // Ignore storage read errors
      } finally {
        hasHydratedRef.current = true;
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // Persist to localStorage after client hydration
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    try {
      const payload = JSON.stringify({
        courses,
        enrolledCourseIds,
        completedModuleIds,
        enrolments,
        quotes,
        applications,
        venueBookings,
        themeClass,
      });
      window.localStorage.setItem(STORAGE_KEY, payload);
    } catch {
      // Ignore storage quota errors
    }
  }, [
    courses,
    enrolledCourseIds,
    completedModuleIds,
    enrolments,
    quotes,
    applications,
    venueBookings,
    themeClass,
  ]);

  const handleResetDemoState = () => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    setCourses(INITIAL_COURSES);
    setEnrolledCourseIds([
      'short-intro-cleaning-1-2',
      'occ-cleaning-practitioner-nqf3',
    ]);
    setCompletedModuleIds(['ic-m1', 'cp-m1']);
    setThemeClass('theme-crimson');
    setActivePage('home');
  };

  const selectedCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleNavigate = (page: PageId) => {
    setPreviousPage(activePage);
    if (page !== 'catalogue') {
      setActiveCourseFilter('all');
    }
    setActivePage(page);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateCourseFilter = (filterType: 'accredited' | 'short') => {
    setPreviousPage(activePage);
    setActiveCourseFilter(filterType);
    setCatalogueInitialSearch('');
    setActivePage('catalogue');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInspectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    handleNavigate('course-detail');
  };

  const handleLaunchOnlineCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    handleNavigate('online-learning');
  };

  const handleMarkModuleComplete = (moduleId: string, courseId: string) => {
    setCompletedModuleIds((prev) =>
      prev.includes(moduleId) ? prev : [...prev, moduleId]
    );
    setEnrolledCourseIds((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    );
  };

  const handleCompleteEnrolment = (record: EnrolmentRecord) => {
    setEnrolments((prev) => [record, ...prev]);
    setEnrolledCourseIds((prev) =>
      prev.includes(record.courseId) ? prev : [...prev, record.courseId]
    );
    setEnrolModalCourse(null);
    handleNavigate('dashboard');
  };

  const handleHomeSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveCourseFilter('all');
    setCatalogueInitialSearch(homeSearchQuery);
    handleNavigate('catalogue');
  };

  // Separate SETA Accredited Qualifications & Short Courses for the 3-column grids
  const setaAccreditedCourses = courses.filter(
    (c) => c.category === 'Occupational Qualifications'
  );
  const shortCoursesList = courses.filter(
    (c) => c.category !== 'Occupational Qualifications'
  );

  return (
    <div
      className={`${themeClass} min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] pb-16 md:pb-0`}
    >
      <TopBarAndNav
        activePage={activePage}
        previousPage={previousPage}
        onNavigate={handleNavigate}
        onNavigateCourseFilter={handleNavigateCourseFilter}
        activeCourseFilter={activeCourseFilter}
        enrolledCount={enrolledCourseIds.length}
        audienceMode={audienceMode}
        onToggleAudienceMode={setAudienceMode}
        onOpenTour={() => setTourOpen(true)}
        onOpenCertificateVerify={() => {
          setCertificateModalCourse(selectedCourse);
          setCertificateModalOpen(true);
        }}
        onResetState={handleResetDemoState}
        themeClass={themeClass}
        onSelectThemeClass={setThemeClass}
      />

      {/* Interactive 4-Step Guided Onboarding Tour Bar */}
      <GuidedOnboardingTour
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {activePage === 'home' && (
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

                      {/* High-Contrast Two-Button CTA Group: Primary Filled "Qualifications" + Secondary Outline "Short Courses" */}
                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleNavigateCourseFilter('accredited')}
                          className="px-7 py-3.5 text-sm sm:text-base font-bold text-white bg-brand rounded-xl shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Award className="w-4 h-4" />
                          <span>Qualifications (NQF 1–4)</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigateCourseFilter('short')}
                          className="px-7 py-3.5 text-sm sm:text-base font-bold text-[#1C1B1B] bg-white hover:bg-[#18181B] hover:text-white border-2 border-[#18181B] rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                          <span>Short Courses</span>
                        </button>
                      </div>

                      {/* Two Prominent Audience Entry Routes: “I want to study” & “Train my team” */}
                      <div className="mt-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          onClick={() => {
                            setAudienceMode('learner');
                            handleNavigate('catalogue');
                          }}
                          className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
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
                        </div>

                        <div
                          onClick={() => {
                            setAudienceMode('employer');
                            handleNavigate('employers');
                          }}
                          className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
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
                        </div>
                      </div>
                    </div>

                    {/* Course Discovery Search Bar */}
                    <form
                      onSubmit={handleHomeSearchSubmit}
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

                  {/* Right 5 Cols: High-Res Campus Photography + Floating Verification Cards */}
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
                  {/* Left Asymmetric Bento Card (7 Cols): Heritage Since 2000 under Cleaning Africa Services */}
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
                        onClick={() => handleNavigate('about')}
                        className="text-xs sm:text-sm font-bold text-brand hover:underline inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Our Full Heritage & Accreditations</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right Asymmetric Bento Metrics Grid (5 Cols): Key Trust Metrics */}
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
                  onClick={() => handleNavigate('qualifications')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#18181B] hover:bg-brand rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  View Learnership Intakes & Apply →
                </button>
              </div>

              {/* 3-Column Responsive CSS Grid (gap: 2rem / gap-8) */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {setaAccreditedCourses.map((course) => (
                  <article
                    key={course.id}
                    className="course-card-elevated overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Consistent 16:9 Image Container */}
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
                            onClick={() => handleInspectCourse(course.id)}
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
                          onClick={() => handleInspectCourse(course.id)}
                          className="text-xs font-bold text-[#1C1B1B] hover:text-brand transition-colors cursor-pointer"
                        >
                          View Course Details →
                        </button>
                        <button
                          type="button"
                          onClick={() => setEnrolModalCourse(course)}
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
                  onClick={() => handleNavigateCourseFilter('short')}
                  className="px-5 py-2.5 text-xs sm:text-sm font-bold text-[#1C1B1B] bg-white hover:bg-[#18181B] hover:text-white border border-[#18181B] rounded-xl transition-colors cursor-pointer shrink-0"
                >
                  Browse All Short Courses →
                </button>
              </div>

              {/* 3-Column Responsive CSS Grid (gap: 2rem / gap-8) */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {shortCoursesList.slice(0, 3).map((course) => (
                  <article
                    key={course.id}
                    className="course-card-elevated overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Consistent 16:9 Image Container */}
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
                            onClick={() => handleInspectCourse(course.id)}
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
                          onClick={() => handleInspectCourse(course.id)}
                          className="text-xs font-bold text-[#1C1B1B] hover:text-brand transition-colors cursor-pointer"
                        >
                          View Course Details →
                        </button>
                        <button
                          type="button"
                          onClick={() => setEnrolModalCourse(course)}
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
                  onSelectCourse={handleInspectCourse}
                  onEnrolCourse={(c) => setEnrolModalCourse(c)}
                  onOpenBrochure={(c) => setBrochureModalCourse(c)}
                  onNavigate={handleNavigate}
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
                    onClick={() => handleNavigate('other-services')}
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
                        onClick={() => handleNavigate(srv.targetPage)}
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
                  onClick={() => handleNavigate('gallery')}
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
        )}

        {activePage === 'catalogue' && (
          <CatalogueView
            key={activeCourseFilter}
            courses={courses}
            initialSearch={catalogueInitialSearch}
            initialScope={activeCourseFilter}
            onSelectCourse={handleInspectCourse}
            onEnrolCourse={(course) => setEnrolModalCourse(course)}
            onOpenBrochure={(course) => setBrochureModalCourse(course)}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'course-detail' && (
          <CourseDetailView
            course={selectedCourse}
            allCourses={courses}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onEnrolCourse={(course) => setEnrolModalCourse(course)}
            onOpenBrochure={(course) => setBrochureModalCourse(course)}
            onLaunchOnlineLearning={handleLaunchOnlineCourse}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'online-learning' && (
          <OnlineLearningView
            courses={courses}
            activeCourseId={selectedCourseId}
            completedModuleIds={completedModuleIds}
            onSelectCourse={(id) => setSelectedCourseId(id)}
            onMarkModuleComplete={handleMarkModuleComplete}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'employers' && (
          <EmployersView
            courses={courses}
            onSelectCourse={handleInspectCourse}
            onOpenBrochure={(course) => setBrochureModalCourse(course)}
            onSaveQuote={(q) => setQuotes((prev) => [q, ...prev])}
            onEnrolCourse={(course) => setEnrolModalCourse(course)}
          />
        )}

        {activePage === 'qualifications' && (
          <QualificationsView
            courses={courses}
            onSelectCourse={handleInspectCourse}
            onSaveApplication={(app) =>
              setApplications((prev) => [app, ...prev])
            }
          />
        )}

        {activePage === 'pathways' && (
          <PathwaysView
            pathways={CAREER_PATHWAYS}
            courses={courses}
            onSelectCourse={handleInspectCourse}
            onEnrolCourse={(course) => setEnrolModalCourse(course)}
          />
        )}

        {activePage === 'assessment-centre' && (
          <AssessmentCentreView
            facilities={ASSESSMENT_FACILITIES}
            onSaveBooking={(b) => setVenueBookings((prev) => [b, ...prev])}
          />
        )}

        {activePage === 'other-services' && (
          <OtherServicesView onNavigate={handleNavigate} />
        )}

        {activePage === 'gallery' && (
          <GalleryView
            onNavigate={handleNavigate}
            onSelectCourse={handleInspectCourse}
          />
        )}

        {activePage === 'about' && (
          <AboutAccreditationsView onNavigate={handleNavigate} />
        )}

        {activePage === 'facilitators' && (
          <FacilitatorsView
            facilitators={FACILITATORS}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'resources' && <ResourcesFaqsView />}

        {activePage === 'news' && (
          <NewsInsightsView
            articles={NEWS_ARTICLES}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'contact' && <ContactLocationsView />}

        {activePage === 'policies' && <PoliciesView />}

        {activePage === 'dashboard' && (
          <DashboardView
            courses={courses}
            enrolledCourseIds={enrolledCourseIds}
            completedModuleIds={completedModuleIds}
            enrolments={enrolments}
            quotes={quotes}
            applications={applications}
            venueBookings={venueBookings}
            onLaunchOnlineCourse={handleLaunchOnlineCourse}
            onSelectCourse={handleInspectCourse}
            onEnrolCourse={(course) => setEnrolModalCourse(course)}
            onAddNewCourse={(newCourse) =>
              setCourses((prev) => [newCourse, ...prev])
            }
            onOpenCertificateModal={(course) => {
              setCertificateModalCourse(course);
              setCertificateModalOpen(true);
            }}
          />
        )}

        {activePage === 'sitemap' && (
          <SitemapArchitectureView onNavigate={handleNavigate} />
        )}
      </main>

      {/* Modals */}
      <EnrolmentModal
        course={enrolModalCourse}
        onClose={() => setEnrolModalCourse(null)}
        onCompleteEnrolment={handleCompleteEnrolment}
      />

      <BrochureModal
        course={brochureModalCourse}
        onClose={() => setBrochureModalCourse(null)}
        onEnrol={(course) => setEnrolModalCourse(course)}
      />

      <CertificateVerificationModal
        isOpen={certificateModalOpen}
        initialCourse={certificateModalCourse || selectedCourse}
        onClose={() => setCertificateModalOpen(false)}
      />

      {/* Floating WhatsApp Quick-Chat Button + Business-Hours Live Chat Concierge */}
      <LiveChatWidget onNavigate={handleNavigate} />

      {/* Sticky Mobile Bottom Conversion Bar (< 768px) */}
      <MobileThumbBar
        activePage={activePage}
        onNavigate={handleNavigate}
        onTriggerPrimaryAction={() => setEnrolModalCourse(selectedCourse)}
      />

      {/* ================================================================== */}
      {/* STRUCTURED 4-COLUMN DARK CHARCOAL (#1C1B1B) FOOTER                 */}
      {/* ================================================================== */}
      <footer className="bg-[#1C1B1B] text-zinc-300 border-t border-zinc-800 mt-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Brand Identity & Parent Company Credit */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-brand text-white flex items-center justify-center font-extrabold text-xs">
                  TAA
                </div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  Training Africa Academy
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Advancing Knowledge, Transforming Lives. We are the official vocational education and workforce training division of{' '}
                <strong className="text-white">
                  Cleaning Africa Services (Pty) Ltd
                </strong>{' '}
                (Established 2000).
              </p>
              <div className="pt-1">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 text-amber-400 text-[11px] font-mono font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SETA & QCTO Accredited Provider</span>
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                Quick Navigation
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('home')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About & Heritage
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateCourseFilter('accredited')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    SETA Accredited Courses
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateCourseFilter('short')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Short Courses & Skills Programmes
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('other-services')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Other Services (Relief Staff & Venue Hire)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('gallery')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Campus & Practical Gallery
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('sitemap')}
                    className="text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    Full 15-Page Interactive Sitemap →
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: SETA Accreditation Info & Portals */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                SETA Accreditation & Portals
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li className="text-zinc-400">
                  <strong className="text-zinc-200">QCTO NQF Level 3:</strong> Cleaning Practitioner (SAQA 118707 · 126 Credits)
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-200">QCTO NQF Level 1:</strong> Commercial Cleaner (SAQA 118708 · 120 Credits)
                </li>
                <li className="text-zinc-400">
                  <strong className="text-zinc-200">Services SETA NQF 4:</strong> New Venture Creation (SAQA 66249 · 149 Credits)
                </li>
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleNavigate('online-learning')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Self-Paced Online LMS & Dilution Lab
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('employers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Employer Section 12H & WSP Calculator
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('policies')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    POPIA, Terms & Learner Policies
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact Details & Randburg Campus */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                Contact & Assessment Centre
              </h3>
              <div className="space-y-3 text-xs text-zinc-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                  <span>
                    Unit 14 Fancourt Office Park, Cnr Northumberland & Felstead Rd, Northriding, Randburg, 2188
                  </span>
                </p>
                <p className="flex items-center gap-2 font-mono">
                  <Phone className="w-4 h-4 text-brand shrink-0" />
                  <a href="tel:+27117946665" className="hover:text-white">
                    +27 (0)11 794 6665
                  </a>
                </p>
                <p className="flex items-center gap-2 font-mono">
                  <Phone className="w-4 h-4 text-brand shrink-0" />
                  <a
                    href="https://wa.me/27825398605"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    WhatsApp: +27 (0)82 539 8605
                  </a>
                </p>
                <p className="flex items-center gap-2 font-mono">
                  <Mail className="w-4 h-4 text-brand shrink-0" />
                  <a
                    href="mailto:info@trainingafricaacademy.co.za"
                    className="hover:text-white truncate"
                  >
                    info@trainingafricaacademy.co.za
                  </a>
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => handleNavigate('contact')}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-brand rounded-lg transition-colors cursor-pointer text-center"
                  >
                    Send Direct Enquiry
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
            <p>
              © 2026 Training Africa Academy — A Division
              of Cleaning Africa Services (Pty) Ltd. All rights reserved.
            </p>
            <p>
              QCTO & Services SETA Accredited · POPIA Compliant · Randburg,
              Gauteng, South Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
