'use client';

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

export { EmployersView } from './audience/EmployersView';
export { QualificationsView } from './audience/QualificationsView';
export { PathwaysView } from './audience/PathwaysView';
export { AssessmentCentreView } from './audience/AssessmentCentreView';
