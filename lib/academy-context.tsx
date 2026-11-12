'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import { Course, PageId, INITIAL_COURSES } from './academy-data';
import {
  CorporateQuoteRecord,
  LearnershipApplicationRecord,
  VenueBookingRecord,
} from '@/components/AudienceJourneys';
import { EnrolmentRecord } from '@/components/DashboardAndModals';
import { ThemeClass } from '@/components/TopBarAndNav';

const STORAGE_KEY = 'taa_platform_state_v2';

interface AcademyContextType {
  // Navigation & Page View
  activePage: PageId;
  previousPage: PageId | null;
  navigate: (page: PageId) => void;
  audienceMode: 'learner' | 'employer';
  setAudienceMode: (mode: 'learner' | 'employer') => void;
  themeClass: ThemeClass;
  setThemeClass: (theme: ThemeClass) => void;

  // Courses
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  selectedCourseId: string;
  setSelectedCourseId: (id: string) => void;
  selectedCourse: Course;

  // Learner & Transactions State
  enrolledCourseIds: string[];
  completedModuleIds: string[];
  enrolments: EnrolmentRecord[];
  quotes: CorporateQuoteRecord[];
  applications: LearnershipApplicationRecord[];
  venueBookings: VenueBookingRecord[];

  // Mutators
  addEnrolment: (enrolment: EnrolmentRecord) => void;
  addQuote: (quote: CorporateQuoteRecord) => void;
  addApplication: (app: LearnershipApplicationRecord) => void;
  addVenueBooking: (booking: VenueBookingRecord) => void;
  markModuleCompleted: (courseId: string, moduleId: string) => void;
  resetPlatformState: () => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

export function AcademyProvider({ children }: { children: ReactNode }) {
  const hasHydratedRef = useRef<boolean>(false);

  // Navigation
  const [activePage, setActivePage] = useState<PageId>('home');
  const [previousPage, setPreviousPage] = useState<PageId | null>(null);
  const [audienceMode, setAudienceMode] = useState<'learner' | 'employer'>('learner');
  const [themeClass, setThemeClass] = useState<ThemeClass>('theme-crimson');

  // Courses
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [selectedCourseId, setSelectedCourseId] = useState<string>(INITIAL_COURSES[0].id);

  // Records
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
      courseTitle: 'Introduction to Professional Cleaning (Modules 1 & 2 Combined)',
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
  const [applications, setApplications] = useState<LearnershipApplicationRecord[]>([
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

  // Hydrate from localStorage
  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.courses)) setCourses(parsed.courses);
          if (Array.isArray(parsed.enrolledCourseIds))
            setEnrolledCourseIds(parsed.enrolledCourseIds);
          if (Array.isArray(parsed.completedModuleIds))
            setCompletedModuleIds(parsed.completedModuleIds);
          if (Array.isArray(parsed.enrolments))
            setEnrolments(parsed.enrolments);
          if (Array.isArray(parsed.quotes)) setQuotes(parsed.quotes);
          if (Array.isArray(parsed.applications))
            setApplications(parsed.applications);
          if (Array.isArray(parsed.venueBookings))
            setVenueBookings(parsed.venueBookings);
          if (parsed.themeClass) setThemeClass(parsed.themeClass);
        }
      } catch {
        // Ignore parse errors
      } finally {
        hasHydratedRef.current = true;
      }
    });
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  // Persist to localStorage (debounced)
  useEffect(() => {
    if (!hasHydratedRef.current) return;
    const timer = setTimeout(() => {
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
        // Ignore quota errors
      }
    }, 300);

    return () => clearTimeout(timer);
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

  const navigate = useCallback((page: PageId) => {
    setActivePage((current) => {
      setPreviousPage(current);
      return page;
    });
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const addEnrolment = useCallback((record: EnrolmentRecord) => {
    setEnrolments((prev) => [record, ...prev]);
    setEnrolledCourseIds((prev) =>
      prev.includes(record.courseId) ? prev : [...prev, record.courseId]
    );
  }, []);

  const addQuote = useCallback((quote: CorporateQuoteRecord) => {
    setQuotes((prev) => [quote, ...prev]);
  }, []);

  const addApplication = useCallback((app: LearnershipApplicationRecord) => {
    setApplications((prev) => [app, ...prev]);
  }, []);

  const addVenueBooking = useCallback((booking: VenueBookingRecord) => {
    setVenueBookings((prev) => [booking, ...prev]);
  }, []);

  const markModuleCompleted = useCallback((courseId: string, moduleId: string) => {
    setCompletedModuleIds((prev) =>
      prev.includes(moduleId) ? prev : [...prev, moduleId]
    );
  }, []);

  const resetPlatformState = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.location.reload();
    } catch {
      // Fallback
    }
  }, []);

  const selectedCourse =
    courses.find((c) => c.id === selectedCourseId) || courses[0];

  return (
    <AcademyContext.Provider
      value={{
        activePage,
        previousPage,
        navigate,
        audienceMode,
        setAudienceMode,
        themeClass,
        setThemeClass,
        courses,
        setCourses,
        selectedCourseId,
        setSelectedCourseId,
        selectedCourse,
        enrolledCourseIds,
        completedModuleIds,
        enrolments,
        quotes,
        applications,
        venueBookings,
        addEnrolment,
        addQuote,
        addApplication,
        addVenueBooking,
        markModuleCompleted,
        resetPlatformState,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
}

export function useAcademy() {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error('useAcademy must be used within an AcademyProvider');
  }
  return context;
}

