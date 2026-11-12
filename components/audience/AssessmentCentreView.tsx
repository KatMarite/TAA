'use client';

import React, { useState } from 'react';
import { generateRecordId, getCurrentFormattedDate } from '@/lib/utils';
import { AssessmentFacility, BRAND_IMAGES } from '@/lib/academy-data';
import ResilientImage from '../ResilientImage';
import { CheckCircle2, Calendar, ShieldCheck } from 'lucide-react';
import { VenueBookingRecord } from '../AudienceJourneys';

export interface AssessmentCentreViewProps {
  facilities: AssessmentFacility[];
  onSaveBooking: (booking: VenueBookingRecord) => void;
}

const NOVEMBER_2026_GRID: {
  day: number;
  dateStr: string;
  weekday: string;
  status: 'available' | 'limited' | 'booked' | 'weekend';
}[] = [
  { day: 16, dateStr: '2026-11-16', weekday: 'Mon', status: 'available' },
  { day: 17, dateStr: '2026-11-17', weekday: 'Tue', status: 'available' },
  { day: 18, dateStr: '2026-11-18', weekday: 'Wed', status: 'limited' },
  { day: 19, dateStr: '2026-11-19', weekday: 'Thu', status: 'available' },
  { day: 20, dateStr: '2026-11-20', weekday: 'Fri', status: 'available' },
  { day: 21, dateStr: '2026-11-21', weekday: 'Sat', status: 'limited' },
  { day: 23, dateStr: '2026-11-23', weekday: 'Mon', status: 'available' },
  { day: 24, dateStr: '2026-11-24', weekday: 'Tue', status: 'available' },
  { day: 25, dateStr: '2026-11-25', weekday: 'Wed', status: 'booked' },
  { day: 26, dateStr: '2026-11-26', weekday: 'Thu', status: 'available' },
  { day: 27, dateStr: '2026-11-27', weekday: 'Fri', status: 'available' },
  { day: 28, dateStr: '2026-11-28', weekday: 'Sat', status: 'limited' },
  { day: 30, dateStr: '2026-11-30', weekday: 'Mon', status: 'available' },
  { day: 1, dateStr: '2026-12-01', weekday: 'Tue', status: 'available' },
  { day: 2, dateStr: '2026-12-02', weekday: 'Wed', status: 'available' },
  { day: 3, dateStr: '2026-12-03', weekday: 'Thu', status: 'limited' },
  { day: 4, dateStr: '2026-12-04', weekday: 'Fri', status: 'available' },
  { day: 5, dateStr: '2026-12-05', weekday: 'Sat', status: 'booked' },
];

export function AssessmentCentreView({
  facilities,
  onSaveBooking,
}: AssessmentCentreViewProps) {
  const [selectedFacilityId, setSelectedFacilityId] = useState(
    facilities[0]?.id || ''
  );
  const activeFacility =
    facilities.find((f) => f.id === selectedFacilityId) || facilities[0];

  const [selectedDates, setSelectedDates] = useState<string[]>([
    activeFacility?.availableDates?.[0] || '2026-11-19',
  ]);
  const [sessionDuration, setSessionDuration] = useState<
    'Full Day (08:00–16:30)' | 'Half Day (08:00–12:30)'
  >('Full Day (08:00–16:30)');
  const [candidateCount, setCandidateCount] = useState<number>(12);
  const [orgName, setOrgName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState(
    'QCTO EISA Practical Assessment / Trade Test'
  );
  const [includeCatering, setIncludeCatering] = useState<boolean>(false);
  const [confirmedBooking, setConfirmedBooking] =
    useState<VenueBookingRecord | null>(null);

  const toggleCalendarDate = (dateStr: string) => {
    setSelectedDates((prev) =>
      prev.includes(dateStr)
        ? prev.length > 1
          ? prev.filter((d) => d !== dateStr)
          : prev
        : [...prev, dateStr]
    );
  };

  const daysCount = Math.max(1, selectedDates.length);
  const baseVenueRate =
    (sessionDuration === 'Full Day (08:00–16:30)'
      ? activeFacility.dailyHireRateZAR
      : activeFacility.halfDayRateZAR) * daysCount;
  const cateringCost = includeCatering
    ? candidateCount * 145 * daysCount
    : 0;
  const totalVenueQuote = baseVenueRate + cateringCost;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !email.trim()) return;

    const record: VenueBookingRecord = {
      id: generateRecordId('VEN-2026'),
      organisationName: orgName.trim(),
      contactName: contactName.trim() || 'Assessment Coordinator',
      email: email.trim(),
      facilityName: activeFacility.name,
      selectedDate: selectedDates.join(', '),
      sessionDuration,
      candidateCount,
      purpose,
      quotedAmountZAR: totalVenueQuote,
      createdAt: getCurrentFormattedDate(),
    };
    setConfirmedBooking(record);
    onSaveBooking(record);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#D91B24] mb-2">
              09. Accredited Assessment Centre & Venue Hire · Northriding, Randburg
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
              Purpose-Built Practical Simulation Bays, Solar Rigs & EISA Lecture Suites
            </h1>
            <p className="mt-3 text-base text-[#52525B]">
              Located at Unit 14 Fancourt Office Park, Northriding, Randburg. Approved for QCTO External Integrated Summative Assessments (EISA), practical trade simulations, and external training provider venue hire.
            </p>

            {/* Approved Scope Guardrail Callout (RFQ F10) */}
            <div className="mt-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-950">
              <ShieldCheck className="w-4 h-4 text-[#D91B24] shrink-0 mt-0.5" />
              <p className="italic leading-relaxed">
                <strong>Approved Scope Notice:</strong> Assessment centre bookings are subject to availability and strictly limited to Training Africa Academy&apos;s currently valid SETA/QCTO accreditation letters and approved assessment scope.
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-[#E5E7EB] grid grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-[#52525B] block">Backup Power</span>
              <strong className="text-[#1C1B1B]">100% Solar & Generator</strong>
            </div>
            <div>
              <span className="text-[#52525B] block">Assessment Scope</span>
              <strong className="text-[#1C1B1B]">QCTO & Services SETA</strong>
            </div>
            <div>
              <span className="text-[#52525B] block">Parking & Access</span>
              <strong className="text-[#1C1B1B]">Secure Bus & Fleet Bay</strong>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5 relative min-h-[260px]">
          <ResilientImage
            src={BRAND_IMAGES.assessmentCentre}
            alt="Randburg Accredited Vocational Assessment Centre and Simulation Bays"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 Cols: Select Facility & Interactive Monthly Calendar Grid */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1C1B1B]">
              01. Select Assessment Bay or Training Suite
            </h2>
            {facilities.map((fac) => {
              const isSelected = fac.id === activeFacility.id;
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacilityId(fac.id)}
                  className={`rounded-xl border overflow-hidden transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#D91B24] ring-1 ring-[#D91B24]'
                      : 'bg-white border-[#E5E7EB] hover:border-[#E5E7EB]'
                  }`}
                >
                  <div className="aspect-[21/9] w-full bg-zinc-100 overflow-hidden">
                    <ResilientImage
                      src={fac.image}
                      alt={fac.name}
                      fallbackTitle={fac.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold text-[#D91B24]">
                          {fac.accreditationScope}
                        </p>
                        <h3 className="text-base font-bold text-[#1C1B1B] mt-1">
                          {fac.name}
                        </h3>
                        <p className="text-xs text-[#52525B] mt-0.5">
                          {fac.capacity}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs text-[#52525B] block">
                          Full Day
                        </span>
                        <span className="font-mono text-base font-bold text-[#1C1B1B] tabular-nums">
                          R{fac.dailyHireRateZAR.toLocaleString('en-ZA')}{' '}
                          <span className="text-[11px] font-normal text-[#52525B]">
                            Incl. VAT
                          </span>
                        </span>
                      </div>
                    </div>

                    <ul className="mt-3 pt-3 border-t border-slate-100 space-y-1 text-xs text-[#52525B]">
                      {fac.equipmentIncluded.map((eq, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D91B24] shrink-0 mt-0.5" />
                          <span>{eq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Calendar Grid */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D91B24]" />
                <h3 className="text-base font-bold text-[#1C1B1B]">
                  02. Interactive Availability Calendar (Nov – Dec 2026)
                </h3>
              </div>
              <span className="text-xs font-mono text-[#D91B24] font-semibold">
                {selectedDates.length} Date(s) Selected
              </span>
            </div>

            <p className="text-xs text-[#52525B] mt-3">
              Click one or multiple dates below to build a single-day or multi-day EISA assessment booking for{' '}
              <strong className="text-[#1C1B1B]">{activeFacility.name}</strong>:
            </p>

            <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2">
              {NOVEMBER_2026_GRID.map((slot) => {
                const isPicked = selectedDates.includes(slot.dateStr);
                const isBooked = slot.status === 'booked';
                return (
                  <button
                    key={slot.dateStr}
                    type="button"
                    disabled={isBooked}
                    onClick={() => toggleCalendarDate(slot.dateStr)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isBooked
                        ? 'bg-slate-100 border-[#E5E7EB] text-slate-400 cursor-not-allowed'
                        : isPicked
                        ? 'bg-[#1C1B1B] border-[#1C1B1B] text-white cursor-pointer'
                        : 'bg-[#FCF9F8] border-[#E5E7EB] text-[#1C1B1B] hover:border-[#D91B24] cursor-pointer'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span>{slot.weekday}</span>
                      <span
                        className={
                          isPicked
                            ? 'text-[#F59E0B] font-bold'
                            : slot.status === 'limited'
                            ? 'text-amber-600'
                            : 'text-[#D91B24]'
                        }
                      >
                        {isBooked
                          ? 'Full'
                          : isPicked
                          ? '✓'
                          : slot.status === 'limited'
                          ? '1 Bay'
                          : 'Open'}
                      </span>
                    </div>
                    <p className="text-xs font-bold font-mono mt-1 tabular-nums">
                      {slot.dateStr.slice(5)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Booking Form */}
        <div className="lg:col-span-6 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#1C1B1B]">
            03. Check Venue Calendar & Book — Instant Quotation
          </h2>
          <p className="text-sm text-[#52525B] mt-1">
            Selected Facility:{' '}
            <strong className="text-[#1C1B1B]">{activeFacility.name}</strong>
          </p>
          <p className="text-xs font-mono text-[#D91B24] mt-1">
            Selected Date(s): {selectedDates.join(' · ')} ({daysCount}{' '}
            {daysCount === 1 ? 'Day' : 'Days'})
          </p>

          {/* Approved Scope Notice inside the Booking Form (RFQ F10) */}
          <div className="mt-4 p-3.5 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg flex items-start gap-2.5 text-xs text-[#52525B]">
            <ShieldCheck className="w-4 h-4 text-[#D91B24] shrink-0 mt-0.5" />
            <p className="italic leading-relaxed">
              <strong className="text-[#1C1B1B]">Approved Scope Notice:</strong>{' '}
              Assessment centre bookings are subject to availability and strictly limited to Training Africa Academy&apos;s currently valid SETA/QCTO accreditation letters and approved assessment scope.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ven-org"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Organisation / SDP Name *
                </label>
                <input
                  id="ven-org"
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Skills Development Provider / Employer"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="ven-contact"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Contact Person *
                </label>
                <input
                  id="ven-contact"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="ven-email"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Email Address for Quotation *
                </label>
                <input
                  id="ven-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="assessments@organisation.co.za"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="ven-duration"
                  className="block text-xs font-medium text-slate-700 mb-1"
                >
                  Daily Session Duration
                </label>
                <select
                  id="ven-duration"
                  value={sessionDuration}
                  onChange={(e) =>
                    setSessionDuration(
                      e.target.value as
                        | 'Full Day (08:00–16:30)'
                        | 'Half Day (08:00–12:30)'
                    )
                  }
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                >
                  <option value="Full Day (08:00–16:30)">
                    Full Day (08:00–16:30) — R
                    {activeFacility.dailyHireRateZAR.toLocaleString('en-ZA')}{' '}
                    Incl. VAT/day
                  </option>
                  <option value="Half Day (08:00–12:30)">
                    Half Day (08:00–12:30) — R
                    {activeFacility.halfDayRateZAR.toLocaleString('en-ZA')}{' '}
                    Incl. VAT/day
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="ven-purpose"
                className="block text-xs font-medium text-slate-700 mb-1"
              >
                Booking Purpose / Scope
              </label>
              <select
                id="ven-purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
              >
                <option value="QCTO EISA Practical Assessment / Trade Test">
                  QCTO EISA Practical Assessment / Trade Test
                </option>
                <option value="Corporate Practical Training Workshop">
                  Corporate Practical Training Workshop
                </option>
                <option value="RPL (Recognition of Prior Learning) Evaluation">
                  RPL (Recognition of Prior Learning) Evaluation
                </option>
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <label htmlFor="ven-candidates">
                  Number of Candidates / Delegates
                </label>
                <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                  {candidateCount} Candidates
                </span>
              </div>
              <input
                id="ven-candidates"
                type="range"
                min={4}
                max={32}
                value={candidateCount}
                onChange={(e) => setCandidateCount(Number(e.target.value))}
                className="w-full accent-[#D91B24] cursor-pointer"
              />
            </div>

            <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={includeCatering}
                onChange={(e) => setIncludeCatering(e.target.checked)}
                className="rounded border-[#E5E7EB] text-[#D91B24]"
              />
              <span>
                Add Tea/Coffee & Working Lunch Catering (R145 Incl. VAT per delegate/day)
              </span>
            </label>

            <div className="p-4 bg-[#1C1B1B] text-white rounded-lg flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-300 block">
                  Total Venue Quotation ({daysCount}{' '}
                  {daysCount === 1 ? 'Day' : 'Days'})
                </span>
                <span className="text-2xl font-bold font-mono tabular-nums">
                  R{totalVenueQuote.toLocaleString('en-ZA')}{' '}
                  <span className="text-xs font-normal text-slate-300">
                    Incl. VAT
                  </span>
                </span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold bg-[#D91B24] hover:bg-[#B91C1C] text-white rounded-lg transition-colors cursor-pointer"
              >
                Reserve Date(s) & Quote
              </button>
            </div>
          </form>

          {confirmedBooking && (
            <div className="mt-5 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B] space-y-1">
              <p className="font-bold text-sm text-[#991B1B]">
                ✓ Provisional Venue Booking & Quotation Issued — Ref:{' '}
                {confirmedBooking.id}
              </p>
              <p>
                Facility: <strong>{confirmedBooking.facilityName}</strong> on{' '}
                <strong className="font-mono">
                  {confirmedBooking.selectedDate}
                </strong>{' '}
                ({confirmedBooking.sessionDuration}).
              </p>
              <p>
                Total Quoted:{' '}
                <strong className="font-mono">
                  R{confirmedBooking.quotedAmountZAR.toLocaleString('en-ZA')} Incl. VAT
                </strong>{' '}
                · Saved to persistent Admin Ledger.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

