'use client';

import React, { useState } from 'react';
import {
  generateRecordId,
  getCurrentFormattedDate,
  validateSouthAfricanIdNumber,
} from '@/lib/utils';
import { Course } from '@/lib/academy-data';
import { CheckCircle2 } from 'lucide-react';
import { LearnershipApplicationRecord } from '../AudienceJourneys';

export interface QualificationsViewProps {
  courses: Course[];
  onSelectCourse: (courseId: string) => void;
  onSaveApplication: (app: LearnershipApplicationRecord) => void;
}

export function QualificationsView({
  courses,
  onSelectCourse,
  onSaveApplication,
}: QualificationsViewProps) {
  const qualificationCourses = courses.filter(
    (c) => c.category === 'Occupational Qualifications'
  );

  const [applicantName, setApplicantName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [idError, setIdError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [applicantType, setApplicantType] = useState<
    'Individual Applicant' | 'Employer-Sponsored Cohort'
  >('Individual Applicant');
  const [selectedQualId, setSelectedQualId] = useState(
    qualificationCourses[0]?.id || ''
  );
  const [highestGrade, setHighestGrade] = useState('Grade 12 / Matric (NQF 4)');
  const [intakeWindow, setIntakeWindow] = useState('January 2027 Q1 Intake');
  const [confirmation, setConfirmation] =
    useState<LearnershipApplicationRecord | null>(null);

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !idNumber.trim() || !email.trim()) return;

    const validation = validateSouthAfricanIdNumber(idNumber.trim());
    if (!validation.valid) {
      setIdError(validation.reason || 'Invalid SA ID Number');
      return;
    }
    setIdError(null);

    const qual =
      qualificationCourses.find((q) => q.id === selectedQualId) ||
      qualificationCourses[0];

    const record: LearnershipApplicationRecord = {
      id: generateRecordId('LSH-2026'),
      applicantName: applicantName.trim(),
      idNumber: idNumber.trim(),
      email: email.trim(),
      phone: phone.trim() || '+27 82 000 0000',
      applicantType,
      qualificationTitle: qual.title,
      highestGrade,
      intakeWindow,
      status: 'Document Verification & Screening Scheduled',
      createdAt: getCurrentFormattedDate(),
    };

    try {
      await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.warn('API application sync deferred; saved locally:', err);
    }

    setConfirmation(record);
    onSaveApplication(record);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          07. Qualifications & Learnerships · QCTO & Services SETA Registered
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B] max-w-3xl">
          National Occupational Qualifications & 12-Month Learnerships
        </h1>
        <p className="mt-3 text-base text-[#52525B] max-w-2xl">
          Review entry criteria, SAQA credits, upcoming intake schedules, and submit your structured application online.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {qualificationCourses.map((q) => (
          <div
            key={q.id}
            className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono text-[#D91B24] mb-2">
                {q.saqaId} · {q.nqfLevel} · {q.credits} Credits
              </div>
              <h2 className="text-lg font-bold text-[#1C1B1B]">{q.title}</h2>
              <p className="text-sm text-[#52525B] mt-2">{q.fullDescription}</p>

              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-[#52525B]">
                <p>
                  <strong className="text-[#1C1B1B]">Duration:</strong>{' '}
                  {q.duration}
                </p>
                <p>
                  <strong className="text-[#1C1B1B]">Next Intake:</strong>{' '}
                  {q.nextIntake}
                </p>
                <p>
                  <strong className="text-[#1C1B1B]">Entry Criteria:</strong>{' '}
                  {q.prerequisites.join('; ')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#52525B] block">
                  Learnership Tuition
                </span>
                <span className="font-mono text-lg font-bold text-[#1C1B1B] tabular-nums">
                  R{q.priceZAR.toLocaleString('en-ZA')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onSelectCourse(q.id)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#1C1B1B] hover:bg-[#27272A] rounded-lg cursor-pointer"
              >
                View Modules
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 bg-[#1C1B1B] text-white rounded-xl p-6 sm:p-8 space-y-6">
          <div>
            <p className="text-xs font-semibold text-[#F59E0B]">
              Mandatory Documentation & Intake Rules
            </p>
            <h2 className="text-xl font-bold mt-1">
              Learnership Application Checklist
            </h2>
          </div>

          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Certified copy of South African ID or valid work permit (certified within 3 months).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Certified copy of highest school qualification or ABET numeracy/literacy transcript.
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Host Employer workplace placement letter (or select Training Africa Academy host placement assistance).
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0 mt-1" />
              <span>
                Tripartite Learnership Agreement registration with Services SETA prior to induction.
              </span>
            </li>
          </ul>

          <div className="p-4 bg-white/10 rounded-lg border border-white/10 text-xs space-y-1">
            <p className="font-bold text-[#F59E0B]">
              Employer Tax Benefit (Section 12H SARS Allowance)
            </p>
            <p className="text-slate-200">
              Host employers can claim up to{' '}
              <strong className="font-mono">R40,000</strong> annual commencement +{' '}
              <strong className="font-mono">R40,000</strong> completion tax deduction per able-bodied learner (up to{' '}
              <strong className="font-mono">R60,000 + R60,000</strong> for learners with disabilities).
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#1C1B1B]">
            Submit Structured Learnership Application
          </h2>
          <p className="text-sm text-[#52525B] mt-1">
            Complete the form below to receive your official application reference and next-steps induction pack.
          </p>

          <form onSubmit={handleSubmitApplication} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-name"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Applicant / Coordinator Full Name *
                </label>
                <input
                  id="lsh-name"
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Lerato Khumalo"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="lsh-id"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  SA ID Number (13 Digits) *
                </label>
                <input
                  id="lsh-id"
                  type="text"
                  required
                  value={idNumber}
                  onChange={(e) => {
                    setIdNumber(e.target.value);
                    if (idError) setIdError(null);
                  }}
                  placeholder="9605140291081"
                  className={`w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border rounded-lg font-mono ${
                    idError ? 'border-red-500 focus:ring-red-500' : 'border-[#E5E7EB]'
                  }`}
                />
                {idError && (
                  <p className="mt-1 text-xs text-red-600 font-medium">{idError}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-email"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="lsh-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="lerato@example.co.za"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="lsh-phone"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Mobile / WhatsApp Number *
                </label>
                <input
                  id="lsh-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+27 82 539 8605"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-type"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Application Category
                </label>
                <select
                  id="lsh-type"
                  value={applicantType}
                  onChange={(e) =>
                    setApplicantType(
                      e.target.value as
                        | 'Individual Applicant'
                        | 'Employer-Sponsored Cohort'
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  <option value="Individual Applicant">
                    Individual Self-Funded / Bursary Applicant
                  </option>
                  <option value="Employer-Sponsored Cohort">
                    Employer-Sponsored Learnership Cohort
                  </option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="lsh-grade"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Highest School / NQF Qualification Completed
                </label>
                <select
                  id="lsh-grade"
                  value={highestGrade}
                  onChange={(e) => setHighestGrade(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  <option value="Grade 9 / ABET Level 4 (NQF 1)">
                    Grade 9 / ABET Level 4 (NQF 1)
                  </option>
                  <option value="Grade 10 / Grade 11 (NQF 2–3)">
                    Grade 10 / Grade 11 (NQF 2–3)
                  </option>
                  <option value="Grade 12 / Matric (NQF 4)">
                    Grade 12 / Matric (NQF 4)
                  </option>
                  <option value="Post-School Certificate / Diploma">
                    Post-School Certificate / Diploma
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="lsh-qual"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Target Qualification
                </label>
                <select
                  id="lsh-qual"
                  value={selectedQualId}
                  onChange={(e) => setSelectedQualId(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  {qualificationCourses.map((q) => (
                    <option key={q.id} value={q.id}>
                      {q.nqfLevel} — {q.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="lsh-intake"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Preferred Intake Window
                </label>
                <select
                  id="lsh-intake"
                  value={intakeWindow}
                  onChange={(e) => setIntakeWindow(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  <option value="January 2027 Q1 Intake">
                    January 2027 Q1 Intake
                  </option>
                  <option value="April 2027 Q2 Intake">
                    April 2027 Q2 Intake
                  </option>
                  <option value="Immediate Corporate Cohort">
                    Immediate Corporate Cohort
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
            >
              Submit Learnership Application & Receive Next Steps
            </button>
          </form>

          {confirmation && (
            <div className="mt-6 p-5 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#991B1B] space-y-2">
              <p className="text-sm font-bold text-[#991B1B]">
                ✓ Application Confirmed — Reference:{' '}
                <span className="font-mono">{confirmation.id}</span>
              </p>
              <p>
                Applicant: <strong>{confirmation.applicantName}</strong> (
                {confirmation.applicantType}) · Qualification:{' '}
                <strong>{confirmation.qualificationTitle}</strong> (
                {confirmation.intakeWindow}).
              </p>
              <div className="pt-2 border-t border-[#FECACA]">
                <p className="font-semibold text-[#991B1B] mb-1">
                  Your Next Steps:
                </p>
                <p>
                  01. Email certified ID & qualification copies quoting ref{' '}
                  <strong className="font-mono">{confirmation.id}</strong> to
                  info@trainingafricaacademy.co.za.
                </p>
                <p>
                  02. Attend online or Randburg placement numeracy/literacy screening within 5 business days.
                </p>
                <p>
                  03. Sign SETA Tripartite Learnership Agreement and receive your induction schedule.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

