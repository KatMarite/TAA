'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  INITIAL_COURSES,
  CAREER_PATHWAYS,
  ASSESSMENT_FACILITIES,
  FACILITATORS,
  NEWS_ARTICLES,
  Course,
  PageId,
} from '@/lib/academy-data';
import TopBarAndNav, { ThemeClass } from '@/components/TopBarAndNav';
import { HomeView } from '@/components/HomeView';
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
  CertificateVerificationModal,
  GuidedOnboardingTour,
  MobileThumbBar,
} from '@/components/UxEnhancements';
import LiveChatWidget from '@/components/LiveChatWidget';
import {
  ShieldCheck,
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
  const [showFinderWizard, setShowFinderWizard] = useState<boolean>(false);
  const [tourOpen, setTourOpen] = useState<boolean>(false);
  const [helpChatOpen, setHelpChatOpen] = useState<boolean>(false);

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
      learnerName: 'Thabo Molefe',
      learnerEmail: 'thabo.molefe@example.co.za',
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
      email: 'contact@sandtonprop.co.za',
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
      idNumber: '9801015000088',
      email: 'bongani.zwane@example.co.za',
      phone: '+27 11 000 0000',
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
      email: 'info@gsac.org.za',
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

  // Persist to localStorage after client hydration (debounced by 300ms)
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    const timeoutId = setTimeout(() => {
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
    }, 300);

    return () => clearTimeout(timeoutId);
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

  const handleNavigateCourseFilter = (
    filterType: 'all' | 'accredited' | 'short'
  ) => {
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

  return (
    <div
      className={`${themeClass} min-h-screen w-full max-w-full overflow-x-hidden flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]`}
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
        onOpenHelpChat={() => setHelpChatOpen(true)}
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
          <HomeView
            courses={courses}
            audienceMode={audienceMode}
            setAudienceMode={setAudienceMode}
            homeSearchQuery={homeSearchQuery}
            setHomeSearchQuery={setHomeSearchQuery}
            showFinderWizard={showFinderWizard}
            setShowFinderWizard={setShowFinderWizard}
            onNavigate={handleNavigate}
            onNavigateCourseFilter={handleNavigateCourseFilter}
            onInspectCourse={handleInspectCourse}
            onEnrolCourse={(course) => setEnrolModalCourse(course)}
            onOpenBrochure={(course) => setBrochureModalCourse(course)}
            onHomeSearchSubmit={handleHomeSearchSubmit}
          />
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

      {/* Live Chat & WhatsApp Support Modal + Desktop Launcher */}
      <LiveChatWidget
        onNavigate={handleNavigate}
        isOpen={helpChatOpen}
        onOpenChange={setHelpChatOpen}
      />

      {/* In-Flow Mobile Quick Navigation Dock (< 768px) */}
      <MobileThumbBar
        activePage={activePage}
        onNavigate={handleNavigate}
        onTriggerPrimaryAction={() => setEnrolModalCourse(selectedCourse)}
      />

      {/* ================================================================== */}
      {/* STRUCTURED 4-COLUMN DARK CHARCOAL (#1C1B1B) FOOTER                 */}
      {/* ================================================================== */}
      <footer className="bg-[#1C1B1B] text-zinc-300 border-t border-zinc-800 mt-8 md:mt-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            {/* Column 1: Brand Identity & Parent Company Credit */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-sm">
                  <Image
                    src="/assets/aistudio/1_bff70370.svg"
                    alt="Training Africa Academy Logo"
                    width={40}
                    height={40}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 object-contain"
                  />
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
              <p className="text-xs text-amber-400 font-semibold flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>QCTO & Services SETA Accredited Provider</span>
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                Main Navigation
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
                    onClick={() => handleNavigateCourseFilter('all')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Course Catalogue
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('qualifications')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Qualifications & Learnerships (NQF 1–4)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigateCourseFilter('short')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Short Courses (2–5 Days)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('employers')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    For Employers (Quotes, Relief Staff & Tax ROI)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('assessment-centre')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Assessment Centre & Venue Hire
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('about')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    About & Accreditations
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Learning Portals, Tools & Governance */}
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-white mb-4">
                Learner Hub & Support Tools
              </h3>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('dashboard')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Learner Hub & Course Studio
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('online-learning')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Self-Paced Online Learning Lab
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('pathways')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Career & Learning Pathways
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setCertificateModalCourse(selectedCourse);
                      setCertificateModalOpen(true);
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Verify a Certificate
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('resources')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Resources, Toolkits & FAQs
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
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('sitemap')}
                    className="text-amber-400 font-bold hover:underline cursor-pointer"
                  >
                    Full Site Directory →
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
