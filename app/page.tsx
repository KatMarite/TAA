'use client';

import React, { useState, useEffect } from 'react';
import {
  INITIAL_COURSES,
  CAREER_PATHWAYS,
  ASSESSMENT_FACILITIES,
  FACILITATORS,
  NEWS_ARTICLES,
  BRAND_IMAGES,
  Course,
  PageId,
} from '@/lib/academy-data';
import TopBarAndNav from '@/components/TopBarAndNav';
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
  Compass,
} from 'lucide-react';

const STORAGE_KEY = 'taa_platform_state_v2';

function loadStoredValue<T>(field: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && parsed[field] !== undefined) {
      return parsed[field] as T;
    }
  } catch {
    // Ignore storage read errors
  }
  return fallback;
}

export default function TrainingAfricaAcademyPlatform() {
  const [activePage, setActivePage] = useState<PageId>('home');
  const [previousPage, setPreviousPage] = useState<PageId | null>(null);
  const [audienceMode, setAudienceMode] = useState<'learner' | 'employer'>(
    'learner'
  );
  const [courses, setCourses] = useState<Course[]>(() =>
    loadStoredValue<Course[]>('courses', INITIAL_COURSES)
  );
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    INITIAL_COURSES[0].id
  );
  const [catalogueInitialSearch, setCatalogueInitialSearch] =
    useState<string>('');
  const [homeSearchQuery, setHomeSearchQuery] = useState<string>('');
  const [showFinderWizard, setShowFinderWizard] = useState<boolean>(true);
  const [tourOpen, setTourOpen] = useState<boolean>(false);

  // Learner & Conversion State
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<string[]>(() =>
    loadStoredValue<string[]>('enrolledCourseIds', [
      'short-intro-cleaning-1-2',
      'occ-cleaning-practitioner-nqf3',
    ])
  );
  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>(() =>
    loadStoredValue<string[]>('completedModuleIds', ['ic-m1', 'cp-m1'])
  );
  const [enrolments, setEnrolments] = useState<EnrolmentRecord[]>(() =>
    loadStoredValue<EnrolmentRecord[]>('enrolments', [
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
    ])
  );

  const [quotes, setQuotes] = useState<CorporateQuoteRecord[]>(() =>
    loadStoredValue<CorporateQuoteRecord[]>('quotes', [
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
    ])
  );

  const [applications, setApplications] = useState<
    LearnershipApplicationRecord[]
  >(() =>
    loadStoredValue<LearnershipApplicationRecord[]>('applications', [
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
    ])
  );

  const [venueBookings, setVenueBookings] = useState<VenueBookingRecord[]>(() =>
    loadStoredValue<VenueBookingRecord[]>('venueBookings', [
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
    ])
  );

  // Active Modals
  const [enrolModalCourse, setEnrolModalCourse] = useState<Course | null>(null);
  const [brochureModalCourse, setBrochureModalCourse] = useState<Course | null>(
    null
  );
  const [certificateModalCourse, setCertificateModalCourse] =
    useState<Course | null>(null);
  const [certificateModalOpen, setCertificateModalOpen] =
    useState<boolean>(false);

  // Save to localStorage whenever state updates
  useEffect(() => {
    try {
      const payload = JSON.stringify({
        courses,
        enrolledCourseIds,
        completedModuleIds,
        enrolments,
        quotes,
        applications,
        venueBookings,
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
    setActivePage('home');
  };

  const selectedCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  const handleNavigate = (page: PageId) => {
    setPreviousPage(activePage);
    setActivePage(page);
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
    setCatalogueInitialSearch(homeSearchQuery);
    handleNavigate('catalogue');
  };

  const featuredCourses = courses.filter((c) => c.featured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B2545] pb-16 md:pb-0">
      <TopBarAndNav
        activePage={activePage}
        previousPage={previousPage}
        onNavigate={handleNavigate}
        enrolledCount={enrolledCourseIds.length}
        audienceMode={audienceMode}
        onToggleAudienceMode={setAudienceMode}
        onOpenTour={() => setTourOpen(true)}
        onOpenCertificateVerify={() => {
          setCertificateModalCourse(selectedCourse);
          setCertificateModalOpen(true);
        }}
        onResetState={handleResetDemoState}
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
            {/* SECTION 1: HERO & DUAL-AUDIENCE ENTRY GATEWAY */}
            <section className="bg-white border-b border-slate-200">
              <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
                  {/* Left 7 Cols: Value Proposition, Two Prominent Entry Routes & Search */}
                  <div className="lg:col-span-7 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-[#059669] mb-3">
                        Training Division of Cleaning Africa Services (Pty) Ltd · QCTO & Services SETA Aligned
                      </p>
                      <h1
                        className="font-bold tracking-tight text-[#0B2545] leading-[1.12]"
                        style={{
                          fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                          textWrap: 'balance',
                        }}
                      >
                        Accredited Hygiene Qualifications, Technical Skills & Workforce Training
                      </h1>
                      <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                        Build a certified career or upskill your commercial facility team with transparent ZAR pricing, self-paced online modules, Randburg practical simulation bays, and optional R380/day relief staff.
                      </p>

                      {/* TWO PROMINENT ENTRY ROUTES: "I want to study" & "Train my team" */}
                      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          onClick={() => {
                            setAudienceMode('learner');
                            handleNavigate('catalogue');
                          }}
                          className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
                            audienceMode === 'learner'
                              ? 'bg-[#0B2545] text-white border-[#0B2545]'
                              : 'bg-[#F8FAFC] text-[#0B2545] border-slate-200 hover:border-[#059669]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-xs font-mono font-semibold ${
                                audienceMode === 'learner'
                                  ? 'text-[#F59E0B]'
                                  : 'text-[#059669]'
                              }`}
                            >
                              Entry Route 01 · Individual Learner
                            </span>
                            <GraduationCap className="w-5 h-5 text-[#059669]" />
                          </div>
                          <h2 className="text-xl font-bold">“I want to study”</h2>
                          <p
                            className={`text-xs mt-1.5 leading-relaxed ${
                              audienceMode === 'learner'
                                ? 'text-slate-200'
                                : 'text-slate-600'
                            }`}
                          >
                            Filter courses by career outcome, view upfront ZAR fees, enrol & pay online, and study self-paced or blended modules.
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#F59E0B]">
                            <span>Explore Individual Courses</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>

                        <div
                          onClick={() => {
                            setAudienceMode('employer');
                            handleNavigate('employers');
                          }}
                          className={`p-5 rounded-xl border transition-all cursor-pointer text-left ${
                            audienceMode === 'employer'
                              ? 'bg-[#0B2545] text-white border-[#0B2545]'
                              : 'bg-[#F8FAFC] text-[#0B2545] border-slate-200 hover:border-[#059669]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span
                              className={`text-xs font-mono font-semibold ${
                                audienceMode === 'employer'
                                  ? 'text-[#F59E0B]'
                                  : 'text-[#059669]'
                              }`}
                            >
                              Entry Route 02 · Employer / HR / L&D
                            </span>
                            <Building2 className="w-5 h-5 text-[#059669]" />
                          </div>
                          <h2 className="text-xl font-bold">“Train my team”</h2>
                          <p
                            className={`text-xs mt-1.5 leading-relaxed ${
                              audienceMode === 'employer'
                                ? 'text-slate-200'
                                : 'text-slate-600'
                            }`}
                          >
                            Calculate Section 12H tax ROI, request group quotes with R380/day relief staff, enrol multiple staff, and track cohort completion.
                          </p>
                          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#059669]">
                            <span>Open Employer & WSP Portal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Prominent Course Discovery Search Bar + Primary CTA */}
                    <form
                      onSubmit={handleHomeSearchSubmit}
                      className="mt-6 pt-6 border-t border-slate-200 flex flex-col sm:flex-row gap-3"
                    >
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={homeSearchQuery}
                          onChange={(e) => setHomeSearchQuery(e.target.value)}
                          placeholder="Search courses by role, NQF level or skill (e.g. Supervisor, Solar, Startup)..."
                          aria-label="Search courses"
                          className="w-full pl-10 pr-4 py-3 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#059669] text-[#0B2545]"
                        />
                      </div>
                      {/* Single Primary CTA for Hero Section */}
                      <button
                        type="submit"
                        className="px-6 py-3 text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        Find Matching Courses
                      </button>
                    </form>
                  </div>

                  {/* Right 5 Cols: High-Impact Visual Carrier */}
                  <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 min-h-[340px]">
                    <ResilientImage
                      src={BRAND_IMAGES.heroAcademy}
                      alt="Training Africa Academy Facilitator and Learners in Johannesburg"
                      className="w-full h-full lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/25 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <p className="text-xs text-[#F59E0B] font-semibold">
                        Northriding, Randburg Campus & Nationwide On-Site Teams
                      </p>
                      <p className="text-base font-bold mt-1">
                        Practical Hygiene Bays, Solar PV Rigs & Self-Paced Online Learning
                      </p>
                      <p className="text-xs text-slate-200 mt-1">
                        Courses from R1,450 · NQF Level 1 to Level 4 Qualifications · Vetted Relief Staff Available
                      </p>
                    </div>
                  </div>
                </div>

                {/* Full-Width 4-Column Credibility Evidence Strip Below Hero Split */}
                <div className="mt-10 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#0B2545] tabular-nums">
                      Est. 2000
                    </span>
                    <p className="text-xs font-semibold text-[#059669] mt-0.5">
                      Cleaning Africa Services Heritage
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      25+ years of real-world commercial and industrial hygiene execution across South Africa.
                    </p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#0B2545] tabular-nums">
                      NQF 1 – 4
                    </span>
                    <p className="text-xs font-semibold text-[#059669] mt-0.5">
                      QCTO & Services SETA Aligned
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Registered occupational qualifications (120 to 149 credits) plus rapid short skills courses.
                    </p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#0B2545] tabular-nums">
                      R380 / Day
                    </span>
                    <p className="text-xs font-semibold text-[#059669] mt-0.5">
                      Optional Workplace Relief Staff
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      We supply trained temporary cleaners on your site while your core employees attend training.
                    </p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold font-mono text-[#0B2545] tabular-nums">
                      94.6% Pass
                    </span>
                    <p className="text-xs font-semibold text-[#059669] mt-0.5">
                      Practical & EISA Competency Rate
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      70% hands-on equipment simulation paired with multilingual facilitator support in 6 SA languages.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* INTERACTIVE 3-STEP CAREER & COURSE FINDER WIZARD */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
              {showFinderWizard ? (
                <CourseFinderWizard
                  courses={courses}
                  onSelectCourse={handleInspectCourse}
                  onEnrolCourse={(c) => setEnrolModalCourse(c)}
                  onOpenBrochure={(c) => setBrochureModalCourse(c)}
                  onNavigate={handleNavigate}
                />
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#0B2545]">
                    Need help picking the right NQF qualification or short course?
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowFinderWizard(true)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#059669] rounded-lg cursor-pointer"
                  >
                    Open 3-Step Course Matcher
                  </button>
                </div>
              )}
            </section>

            {/* SECTION 2: FEATURED COURSES WITH TRANSPARENT PRICE VISIBILITY */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-200">
                <div>
                  <p className="text-xs font-semibold text-[#059669] mb-1">
                    01. Featured Programmes & Transparent Pricing
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
                    Accredited Qualifications, Specialized Hygiene & Startup Courses
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Every programme displays upfront individual tuition, corporate group rates (5+ learners), and delivery modes.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredCourses.map((course) => (
                  <article
                    key={course.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
                  >
                    <div>
                      <div className="relative h-48 w-full">
                        <ResilientImage
                          src={course.image}
                          alt={course.title}
                          fallbackTitle={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-4 right-4 text-xs text-slate-200 font-medium">
                          <span>{course.code}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{course.nqfLevel}</span>
                          <span aria-hidden="true"> · </span>
                          <span className="tabular-nums">
                            {course.credits} Credits
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="text-xs text-slate-500 mb-2">
                          <span className="text-[#059669] font-medium">
                            {course.category}
                          </span>
                          <span aria-hidden="true"> · </span>
                          <span>{course.duration}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0B2545] leading-snug">
                          <button
                            type="button"
                            onClick={() => handleInspectCourse(course.id)}
                            className="text-left hover:text-[#059669] transition-colors cursor-pointer"
                          >
                            {course.title}
                          </button>
                        </h3>
                        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                          {course.shortSummary}
                        </p>
                        <p className="mt-3 text-xs text-slate-500">
                          <strong className="text-[#0B2545]">Delivery:</strong>{' '}
                          {course.deliveryModes.slice(0, 2).join(' · ')}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 bg-[#F8FAFC] border-t border-slate-200/80">
                      <div className="flex items-baseline justify-between mb-4">
                        <div>
                          <span className="text-xs text-slate-500 block">
                            Single Learner
                          </span>
                          <span className="text-xl font-bold font-mono text-[#0B2545] tabular-nums">
                            R{course.priceZAR.toLocaleString('en-ZA')}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-slate-500 block">
                            Employer Cohort (5+)
                          </span>
                          <span className="text-sm font-semibold font-mono text-[#059669] tabular-nums">
                            R
                            {course.groupPricePerLearnerZAR.toLocaleString(
                              'en-ZA'
                            )}{' '}
                            / staff
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-semibold pt-2 border-t border-slate-200/70">
                        <button
                          type="button"
                          onClick={() => handleInspectCourse(course.id)}
                          className="text-[#0B2545] hover:text-[#059669] cursor-pointer"
                        >
                          Review Prerequisites & Curriculum →
                        </button>
                        <button
                          type="button"
                          onClick={() => setEnrolModalCourse(course)}
                          className="text-[#059669] hover:underline cursor-pointer"
                        >
                          Enrol Now
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Single Primary CTA for Featured Courses Section */}
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => handleNavigate('catalogue')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#0B2545] hover:bg-[#133B6E] rounded-lg transition-colors cursor-pointer"
                >
                  View Full Course Catalogue & Compare Programmes
                </button>
              </div>
            </section>

            {/* SECTION 3: 4 FLEXIBLE DELIVERY MODES (ASYMMETRIC BENTO GRID) */}
            <section className="bg-white border-y border-slate-200 py-14">
              <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-8">
                  <p className="text-xs font-semibold text-[#059669] mb-1">
                    02. Flexible Learning & Assessment Delivery Modes
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
                    Study Online, in Our Randburg Simulation Bays, or On-Site at Your Facility
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#059669]">
                        01. Self-Paced Digital LMS + Interactive Chemical & pH Lab
                      </span>
                      <h3 className="text-xl font-bold text-[#0B2545] mt-2">
                        Mobile-First Self-Paced Online Learning
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
                        Complete foundational theory, MSDS safety modules, chemical dilution simulations, and entrepreneurship masterclasses from any smartphone, tablet, or desktop—with instant auto-graded assessments and next-course recommendations.
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
                      <span>
                        Immediate Access on Payment · Low-Data Optimised · Verifiable Digital Certificates
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#059669]">
                        02. Randburg Assessment Centre
                      </span>
                      <h3 className="text-lg font-bold text-[#0B2545] mt-2">
                        Practical Hygiene Bays & Solar PV Rig
                      </h3>
                      <p className="text-sm text-slate-600 mt-2">
                        Hands-on machine operation (auto-scrubbers, burnishers, extractors, 12m deionized water-fed solar poles) at our Northriding campus.
                      </p>
                    </div>
                    <p className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
                      Unit 14 Fancourt Office Park, Randburg
                    </p>
                  </div>

                  <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#059669]">
                        03. On-Site Workplace Training
                      </span>
                      <h3 className="text-lg font-bold text-[#0B2545] mt-2">
                        Client Premises + R380/Day Relief Staff
                      </h3>
                      <p className="text-sm text-slate-600 mt-2">
                        Our assessors train your team directly on your site’s floors, washrooms, and equipment—backed by optional relief staff so shifts never stop.
                      </p>
                    </div>
                    <p className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-500">
                      Available for Corporate Cohorts (8+ Staff)
                    </p>
                  </div>

                  <div className="lg:col-span-2 bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#F59E0B]">
                        04. Blended QCTO Learnerships & Venue Hire
                      </span>
                      <h3 className="text-xl font-bold mt-2">
                        12-Month Occupational Qualifications & Accredited EISA Venue Booking
                      </h3>
                      <p className="text-sm text-slate-200 mt-2 max-w-2xl">
                        Combine digital knowledge modules, simulated practicals, and structured workplace logbooks for NQF Level 1, 3, and 4 qualifications—or book our Randburg trade test bays on the interactive calendar.
                      </p>
                    </div>
                    {/* Single Primary CTA for Delivery Modes Section */}
                    <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-slate-300">
                        Test our interactive self-paced player and chemical dilution simulator right now:
                      </span>
                      <button
                        type="button"
                        onClick={() => handleNavigate('online-learning')}
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
                      >
                        Launch Interactive Online Learning Player
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 4: FOUR AUDIENCE CONVERSION PATHWAYS & CREDIBILITY PROOF */}
            <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold text-[#059669] mb-1">
                  03. Dedicated Journeys & Verified Client Outcomes
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
                  Purpose-Built Workflows for Learners, Employers, Applicants & Venue Clients
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#059669]">
                      Audience 01 · Self-Funded Learner
                    </span>
                    <h3 className="text-base font-bold text-[#0B2545] mt-1">
                      Career Pathways & Instant Enrolment
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Choose a career track → compare ZAR fees & prerequisites → register & pay in 3 steps → complete online modules → unlock next-course recommendations.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('pathways')}
                    className="mt-5 text-xs font-semibold text-[#059669] hover:underline text-left cursor-pointer"
                  >
                    Explore Career Pathways →
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#059669]">
                      Audience 02 · Employer / HR / L&D
                    </span>
                    <h3 className="text-base font-bold text-[#0B2545] mt-1">
                      Section 12H ROI, Quotes & Cohort Portal
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Calculate Section 12H tax savings → download brochure → request group quote with R380/day relief staff → enrol multiple staff → export cohort progress.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('employers')}
                    className="mt-5 text-xs font-semibold text-[#059669] hover:underline text-left cursor-pointer"
                  >
                    Open Employer Portal →
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#059669]">
                      Audience 03 · Learnership Applicant
                    </span>
                    <h3 className="text-base font-bold text-[#0B2545] mt-1">
                      NQF 1, 3 & 4 Intake Applications
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Review SAQA entry criteria, credits & 2026/2027 intakes → submit structured application → receive instant reference & next steps.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('qualifications')}
                    className="mt-5 text-xs font-semibold text-[#059669] hover:underline text-left cursor-pointer"
                  >
                    Apply for Learnership →
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#059669]">
                      Audience 04 · Assessment & Venue Client
                    </span>
                    <h3 className="text-base font-bold text-[#0B2545] mt-1">
                      Interactive Calendar & Bay Hire
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Inspect facility capacity, approved QCTO scope & interactive November/December calendar → select dates → receive instant formal quotation.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleNavigate('assessment-centre')}
                    className="mt-5 text-xs font-semibold text-[#059669] hover:underline text-left cursor-pointer"
                  >
                    Book Assessment Venue →
                  </button>
                </div>
              </div>

              {/* Claim-to-Proof Adjacent Attributable Testimonials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <blockquote className="bg-white border border-slate-200 rounded-xl p-6">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    “Before partnering with Training Africa Academy, taking 18 cleaners off shift for NQF Level 3 supervisory training caused SLA backlogs across our Sandton buildings. Using their R380/day Relief Staff option alongside blended learning, we achieved a 100% EISA pass rate in 6 months with zero tenant complaints.”
                  </p>
                  <footer className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    <strong className="text-[#0B2545]">Mpho Sithole</strong> · Regional Operations & L&D Manager, Sandton Commercial Property Group
                  </footer>
                </blockquote>

                <blockquote className="bg-white border border-slate-200 rounded-xl p-6">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    “I completed the 5-day Cleaning Enterprise Startup Masterclass and the 3-day Specialized Solar Panel Cleaning course. The BCCCI tender costing templates helped me price my first three office-park contracts at a 28% net margin within 90 days of graduating.”
                  </p>
                  <footer className="mt-4 pt-3 border-t border-slate-100 text-xs">
                    <strong className="text-[#0B2545]">Zanele Mkhize</strong> · Founder & Managing Director, EcoShine Commercial Hygiene (Pty) Ltd
                  </footer>
                </blockquote>
              </div>

              {/* Single Primary CTA for Section 4 */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => handleNavigate('sitemap')}
                  className="px-6 py-3 text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
                >
                  Inspect Full 15-Page Platform Architecture & Sitemap
                </button>
              </div>
            </section>
          </div>
        )}

        {activePage === 'catalogue' && (
          <CatalogueView
            courses={courses}
            initialSearch={catalogueInitialSearch}
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

      {/* Responsive & Accessible Business-Hours Live Chat & Department Routing Widget */}
      <LiveChatWidget onNavigate={handleNavigate} />

      {/* Sticky Mobile Thumb-Zone Bottom Action & Conversion Bar (< 768px) */}
      <MobileThumbBar
        activePage={activePage}
        onNavigate={handleNavigate}
        onTriggerPrimaryAction={() => setEnrolModalCourse(selectedCourse)}
      />

      {/* Quiet Institutional Footer Mirroring All 15 Page Templates */}
      <footer className="bg-[#0B2545] text-slate-300 border-t border-slate-800 mt-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-white/10">
            <div className="lg:col-span-2 space-y-3">
              <p className="text-lg font-bold text-white">
                Training Africa Academy
              </p>
              <p className="text-xs text-slate-300 max-w-sm leading-relaxed">
                Official training and workforce skills development division of{' '}
                <strong className="text-white">
                  Cleaning Africa Services (Pty) Ltd
                </strong>{' '}
                (Est. 2000). QCTO & Services SETA-aligned qualifications, specialized hygiene training, and accredited assessment centre.
              </p>
              <div className="text-xs text-slate-400 space-y-1 pt-1">
                <p>
                  Unit 14 Fancourt Office Park, Northriding, Randburg, 2188
                </p>
                <p className="font-mono">
                  +27 (0)11 794 6665 · +27 (0)82 539 8605
                </p>
                <p className="font-mono">info@trainingafricaacademy.co.za</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#F59E0B] mb-3">
                Learner Journeys
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('home')}
                    className="hover:text-white cursor-pointer"
                  >
                    01. Home Gateway
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('catalogue')}
                    className="hover:text-white cursor-pointer"
                  >
                    03. Find a Course / Catalogue
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('course-detail')}
                    className="hover:text-white cursor-pointer"
                  >
                    04. Individual Course Detail
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('online-learning')}
                    className="hover:text-white cursor-pointer"
                  >
                    05. Online Learning Player
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('pathways')}
                    className="hover:text-white cursor-pointer"
                  >
                    08. Career / Learning Pathways
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#F59E0B] mb-3">
                Employers & Venues
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('employers')}
                    className="hover:text-white cursor-pointer"
                  >
                    06. Training for Employers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('qualifications')}
                    className="hover:text-white cursor-pointer"
                  >
                    07. Qualifications & Learnerships
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('assessment-centre')}
                    className="hover:text-white cursor-pointer"
                  >
                    09. Assessment Centre & Venue Hire
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('about')}
                    className="hover:text-white cursor-pointer"
                  >
                    02. About & Accreditations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('facilitators')}
                    className="hover:text-white cursor-pointer"
                  >
                    10. Facilitators & Approach
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold text-[#F59E0B] mb-3">
                Resources & Governance
              </p>
              <ul className="space-y-2 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('resources')}
                    className="hover:text-white cursor-pointer"
                  >
                    11. Resources & FAQs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('news')}
                    className="hover:text-white cursor-pointer"
                  >
                    12. News & Insights
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('contact')}
                    className="hover:text-white cursor-pointer"
                  >
                    13. Contact & Locations
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('policies')}
                    className="hover:text-white cursor-pointer"
                  >
                    14. Privacy, Terms & Policies
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('dashboard')}
                    className="hover:text-white cursor-pointer"
                  >
                    15. Login / Learner Dashboard & CMS
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('sitemap')}
                    className="text-[#059669] font-semibold hover:underline cursor-pointer"
                  >
                    Full 15-Page Interactive Sitemap →
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} Training Africa Academy — A Division
              of Cleaning Africa Services (Pty) Ltd. All rights reserved.
            </p>
            <p>
              QCTO & Services SETA Aligned · POPIA Compliant · Randburg,
              Gauteng, South Africa
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
