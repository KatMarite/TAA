'use client';

import React, { useState, useMemo } from 'react';
import {
  Course,
  PageId,
} from '@/lib/academy-data';
import ResilientImage from './ResilientImage';
import {
  Search,
  SlidersHorizontal,
  ArrowRight,
  Download,
  CheckCircle2,
  BookOpen,
  PlayCircle,
  FlaskConical,
  Award,
  Users,
  FileText,
  Scale,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface CatalogueViewProps {
  courses: Course[];
  initialSearch?: string;
  initialCategory?: string;
  initialScope?: 'all' | 'accredited' | 'short';
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
  onOpenBrochure: (course: Course) => void;
  onNavigate: (page: PageId) => void;
}

export function CatalogueView({
  courses,
  initialSearch = '',
  initialCategory = 'All',
  initialScope = 'all',
  onSelectCourse,
  onEnrolCourse,
  onOpenBrochure,
  onNavigate,
}: CatalogueViewProps) {
  // 1. Keyword
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  // 2. Subject / Industry
  const [selectedSubject, setSelectedSubject] = useState<string>(
    initialCategory !== 'All' ? initialCategory : 'All'
  );
  // 3. Accreditation Status
  const [selectedAccreditation, setSelectedAccreditation] = useState<string>(
    initialScope === 'accredited'
      ? 'Accredited (QCTO & Services SETA)'
      : initialScope === 'short'
      ? 'Non-Accredited (Certificate of Completion)'
      : 'All'
  );
  // 4. Price (Max Individual Fee)
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  // 5. Learner Type
  const [selectedLearnerType, setSelectedLearnerType] = useState<string>('All');
  // 6. NQF Level (Where Applicable)
  const [selectedNqfLevel, setSelectedNqfLevel] = useState<string>('All');
  // 7. Format (Study Modality)
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  // 8. Location
  const [selectedLocation, setSelectedLocation] = useState<string>('All');
  // 9. Duration
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  // 10. Intake / Date
  const [selectedIntake, setSelectedIntake] = useState<string>('All');

  // Expandable All-Filters Panel State
  const [showAllFilters, setShowAllFilters] = useState<boolean>(true);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const subjectOptions: string[] = [
    'All',
    'Occupational Qualifications',
    'Specialized Hygiene & Technical',
    'Foundational Cleaning Modules',
    'Business & Entrepreneurship',
  ];

  const accreditationOptions: string[] = [
    'All',
    'Accredited (QCTO & Services SETA)',
    'Non-Accredited (Certificate of Completion)',
  ];

  const learnerTypeOptions: string[] = [
    'All',
    'Individual Learner',
    'Corporate / Employer Cohort',
    'Learnership Applicant',
    'Entrepreneur / SMME',
  ];

  const nqfLevelOptions: string[] = [
    'All',
    'NQF Level 1',
    'NQF Level 3',
    'NQF Level 4',
    'Non-Accredited Skills Short Course',
  ];

  const formatOptions: string[] = [
    'All',
    'Self-Paced Online',
    'Blended (Online + Practical)',
    'In-Person Practical / Classroom',
  ];

  const locationOptions: string[] = [
    'All',
    'Nationwide (Online LMS)',
    'Randburg Campus (Northriding)',
    'On-Site at Client Premises',
  ];

  const durationOptions: string[] = [
    'All',
    'Short (1–2 Days)',
    'Intensive (3–5 Days)',
    'Qualification / Learnership (12 Months)',
  ];

  const intakeOptions: string[] = [
    'All',
    'Immediate Online Start',
    'Weekly / Bi-Weekly Practical Intake',
    'Monthly / Quarterly Cohort Intake',
  ];

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (selectedSubject !== 'All') count++;
    if (selectedAccreditation !== 'All') count++;
    if (maxPrice < 25000) count++;
    if (selectedLearnerType !== 'All') count++;
    if (selectedNqfLevel !== 'All') count++;
    if (selectedFormat !== 'All') count++;
    if (selectedLocation !== 'All') count++;
    if (selectedDuration !== 'All') count++;
    if (selectedIntake !== 'All') count++;
    return count;
  }, [
    searchQuery,
    selectedSubject,
    selectedAccreditation,
    maxPrice,
    selectedLearnerType,
    selectedNqfLevel,
    selectedFormat,
    selectedLocation,
    selectedDuration,
    selectedIntake,
  ]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedSubject('All');
    setSelectedAccreditation('All');
    setMaxPrice(25000);
    setSelectedLearnerType('All');
    setSelectedNqfLevel('All');
    setSelectedFormat('All');
    setSelectedLocation('All');
    setSelectedDuration('All');
    setSelectedIntake('All');
  };

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      // 1. Keyword
      const q = searchQuery.trim().toLowerCase();
      const matchesKeyword =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.careerOutcome.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.saqaId.toLowerCase().includes(q) ||
        c.shortSummary.toLowerCase().includes(q) ||
        c.fullDescription.toLowerCase().includes(q);

      // 2. Subject / Industry
      const matchesSubject =
        selectedSubject === 'All' || c.category === selectedSubject;

      // 3. Accreditation Status
      const isAccredited = c.category === 'Occupational Qualifications';
      const matchesAccreditation =
        selectedAccreditation === 'All' ||
        (selectedAccreditation === 'Accredited (QCTO & Services SETA)' &&
          isAccredited) ||
        (selectedAccreditation ===
          'Non-Accredited (Certificate of Completion)' &&
          !isAccredited);

      // 4. Price
      const matchesPrice = c.priceZAR <= maxPrice;

      // 5. Learner Type
      const matchesLearnerType =
        selectedLearnerType === 'All' ||
        (selectedLearnerType === 'Individual Learner' &&
          (c.targetAudience === 'Individual Learner' ||
            c.targetAudience === 'Individual & Corporate')) ||
        (selectedLearnerType === 'Corporate / Employer Cohort' &&
          (c.targetAudience === 'Individual & Corporate' ||
            c.targetAudience === 'Employer Teams' ||
            c.targetAudience === 'Learnership Applicant')) ||
        (selectedLearnerType === 'Learnership Applicant' &&
          c.targetAudience === 'Learnership Applicant') ||
        (selectedLearnerType === 'Entrepreneur / SMME' &&
          (c.category === 'Business & Entrepreneurship' ||
            c.id === 'nqf4-new-venture-creation'));

      // 6. NQF Level
      const matchesNqf =
        selectedNqfLevel === 'All' || c.nqfLevel === selectedNqfLevel;

      // 7. Format (Study Modality)
      const matchesFormat =
        selectedFormat === 'All' ||
        (selectedFormat === 'Self-Paced Online' &&
          c.deliveryModes.includes('Self-Paced Online')) ||
        (selectedFormat === 'Blended (Online + Practical)' &&
          c.deliveryModes.includes('Blended (Online + Practical)')) ||
        (selectedFormat === 'In-Person Practical / Classroom' &&
          (c.deliveryModes.includes('Classroom & Assessment Bay (Randburg)') ||
            c.deliveryModes.includes('On-Site Client Premises')));

      // 8. Location
      const matchesLocation =
        selectedLocation === 'All' ||
        (selectedLocation === 'Nationwide (Online LMS)' &&
          (c.onlineEligible ||
            c.deliveryModes.includes('Self-Paced Online') ||
            c.deliveryModes.includes('Blended (Online + Practical)'))) ||
        (selectedLocation === 'Randburg Campus (Northriding)' &&
          (c.deliveryModes.includes('Classroom & Assessment Bay (Randburg)') ||
            c.deliveryModes.includes('Blended (Online + Practical)'))) ||
        (selectedLocation === 'On-Site at Client Premises' &&
          c.deliveryModes.includes('On-Site Client Premises'));

      // 9. Duration
      const dur = c.duration.toLowerCase();
      const matchesDuration =
        selectedDuration === 'All' ||
        (selectedDuration === 'Short (1–2 Days)' && dur.includes('2 days')) ||
        (selectedDuration === 'Intensive (3–5 Days)' &&
          (dur.includes('3 days') || dur.includes('5 days'))) ||
        (selectedDuration === 'Qualification / Learnership (12 Months)' &&
          dur.includes('12 months'));

      // 10. Intake / Date
      const intake = c.nextIntake.toLowerCase();
      const matchesIntake =
        selectedIntake === 'All' ||
        (selectedIntake === 'Immediate Online Start' &&
          (intake.includes('immediate') ||
            c.deliveryModes.includes('Self-Paced Online'))) ||
        (selectedIntake === 'Weekly / Bi-Weekly Practical Intake' &&
          (intake.includes('weekly') || intake.includes('every second monday'))) ||
        (selectedIntake === 'Monthly / Quarterly Cohort Intake' &&
          (intake.includes('monthly') ||
            intake.includes('quarterly') ||
            intake.includes('january') ||
            intake.includes('february')));

      return (
        matchesKeyword &&
        matchesSubject &&
        matchesAccreditation &&
        matchesPrice &&
        matchesLearnerType &&
        matchesNqf &&
        matchesFormat &&
        matchesLocation &&
        matchesDuration &&
        matchesIntake
      );
    });
  }, [
    courses,
    searchQuery,
    selectedSubject,
    selectedAccreditation,
    maxPrice,
    selectedLearnerType,
    selectedNqfLevel,
    selectedFormat,
    selectedLocation,
    selectedDuration,
    selectedIntake,
  ]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const comparedCourses = courses.filter((c) => compareIds.includes(c.id));

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5E7EB]">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-3">
            SETA Accredited & Industry Short Courses · 10-Dimension Course Finder
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1B1B] max-w-2xl">
            Accredited Qualifications, Specialized Hygiene & Enterprise Courses
          </h1>
          <p className="mt-3 text-base text-[#52525B] max-w-2xl">
            Filter across all 10 RFQ criteria—subject/industry, learner type, accreditation status, NQF level, format, location, price, duration, intake/date, and keyword.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('employers')}
            className="px-5 py-2.5 text-sm font-bold text-white bg-[#18181B] hover:bg-brand rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Multi-Staff Quote
          </button>
        </div>
      </div>

      {/* Interactive 10-Dimension Filter Bar (Primary Row + Expandable All-Filters Panel) */}
      <div className="mt-8 bg-white border border-[#E5E7EB] rounded-xl p-6 shadow-2xs space-y-5">
        {/* Primary Row: Keyword, Subject/Industry, Accreditation Status, Price Slider */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* 1. Keyword Search */}
          <div className="md:col-span-4">
            <label
              htmlFor="catalogue-search"
              className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
            >
              01. Keyword (Title, Outcome, SAQA ID)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-[#52525B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="catalogue-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Supervisor, Solar Panel, NQF 3, Startup..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              />
            </div>
          </div>

          {/* 2. Subject / Industry */}
          <div className="md:col-span-3">
            <label
              htmlFor="filter-subject"
              className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
            >
              02. Subject / Industry
            </label>
            <select
              id="filter-subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
            >
              {subjectOptions.map((subj) => (
                <option key={subj} value={subj}>
                  {subj === 'All' ? 'All Subjects & Industries' : subj}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Accreditation Status */}
          <div className="md:col-span-3">
            <label
              htmlFor="filter-accreditation"
              className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
            >
              03. Accreditation Status
            </label>
            <select
              id="filter-accreditation"
              value={selectedAccreditation}
              onChange={(e) => setSelectedAccreditation(e.target.value)}
              className="w-full px-3 py-2.5 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
            >
              {accreditationOptions.map((acc) => (
                <option key={acc} value={acc}>
                  {acc === 'All' ? 'All Accreditation Types' : acc}
                </option>
              ))}
            </select>
          </div>

          {/* 4. Price (Max Individual Fee) */}
          <div className="md:col-span-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#1C1B1B] mb-1.5">
              <label htmlFor="filter-price">04. Price</label>
              <span className="font-mono font-bold text-brand tabular-nums">
                R{maxPrice.toLocaleString('en-ZA')}
              </span>
            </div>
            <input
              id="filter-price"
              type="range"
              min={1400}
              max={25000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum course fee in Rand"
              className="w-full accent-[#D91B24] cursor-pointer"
            />
          </div>
        </div>

        {/* Expandable All-Filters Panel: Learner Type, NQF Level, Format, Location, Duration, Intake/Date */}
        {showAllFilters && (
          <div className="pt-4 border-t border-[#E5E7EB] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3.5">
            {/* 5. Learner Type */}
            <div>
              <label
                htmlFor="filter-learner-type"
                className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
              >
                05. Learner Type
              </label>
              <select
                id="filter-learner-type"
                value={selectedLearnerType}
                onChange={(e) => setSelectedLearnerType(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              >
                {learnerTypeOptions.map((lt) => (
                  <option key={lt} value={lt}>
                    {lt === 'All' ? 'All Learner Types' : lt}
                  </option>
                ))}
              </select>
            </div>

            {/* 6. NQF Level (Where Applicable) */}
            <div>
              <label
                htmlFor="filter-nqf"
                className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
              >
                06. NQF Level
              </label>
              <select
                id="filter-nqf"
                value={selectedNqfLevel}
                onChange={(e) => setSelectedNqfLevel(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              >
                {nqfLevelOptions.map((nqf) => (
                  <option key={nqf} value={nqf}>
                    {nqf === 'All' ? 'All NQF Levels' : nqf}
                  </option>
                ))}
              </select>
            </div>

            {/* 7. Format */}
            <div>
              <label
                htmlFor="filter-format"
                className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
              >
                07. Format
              </label>
              <select
                id="filter-format"
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              >
                {formatOptions.map((fmt) => (
                  <option key={fmt} value={fmt}>
                    {fmt === 'All' ? 'All Study Formats' : fmt}
                  </option>
                ))}
              </select>
            </div>

            {/* 8. Location */}
            <div>
              <label
                htmlFor="filter-location"
                className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
              >
                08. Location
              </label>
              <select
                id="filter-location"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              >
                {locationOptions.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === 'All' ? 'All Training Locations' : loc}
                  </option>
                ))}
              </select>
            </div>

            {/* 9. Duration */}
            <div>
              <label
                htmlFor="filter-duration"
                className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
              >
                09. Duration
              </label>
              <select
                id="filter-duration"
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              >
                {durationOptions.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur === 'All' ? 'All Durations' : dur}
                  </option>
                ))}
              </select>
            </div>

            {/* 10. Intake / Date */}
            <div>
              <label
                htmlFor="filter-intake"
                className="block text-xs font-bold text-[#1C1B1B] mb-1.5"
              >
                10. Intake / Date
              </label>
              <select
                id="filter-intake"
                value={selectedIntake}
                onChange={(e) => setSelectedIntake(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-brand text-[#1C1B1B]"
              >
                {intakeOptions.map((intk) => (
                  <option key={intk} value={intk}>
                    {intk === 'All' ? 'All Intakes & Dates' : intk}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Quick Subject Tabs + Expandable Drawer Toggle + Result Counter */}
        <div className="pt-4 border-t border-[#E5E7EB] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg">
            {subjectOptions.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedSubject(cat)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedSubject === cat
                    ? 'bg-brand text-white shadow-xs'
                    : 'text-[#52525B] hover:text-[#1C1B1B]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#52525B]">
            <button
              type="button"
              onClick={() => setShowAllFilters((prev) => !prev)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E5E7EB] bg-[#FCF9F8] hover:border-brand text-[#1C1B1B] font-bold cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand" />
              <span>
                {showAllFilters ? 'Hide Advanced Filters' : 'Show All 10 Filters'}
              </span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-brand text-white tabular-nums">
                  {activeFilterCount}
                </span>
              )}
              {showAllFilters ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </button>

            <span className="tabular-nums font-bold text-[#1C1B1B]">
              Showing {filteredCourses.length} of {courses.length} programmes
            </span>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-brand hover:underline font-bold cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Panel (if courses selected) */}
      {comparedCourses.length > 0 && (
        <div className="mt-6 bg-[#18181B] text-white rounded-xl p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              <h2 className="text-sm font-bold">
                Course Comparison Matrix ({comparedCourses.length}/3 Selected)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="text-xs text-zinc-300 hover:text-white underline cursor-pointer"
            >
              Clear Comparison
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs text-amber-400 font-mono">
                    {c.code} · {c.nqfLevel} · {c.credits} Credits
                  </p>
                  <h3 className="text-sm font-bold text-white mt-1">{c.title}</h3>
                  <p className="text-xs text-zinc-300 mt-2">
                    Career Outcome: {c.careerOutcome}
                  </p>
                  <p className="text-xs text-zinc-300 mt-1">
                    Duration: {c.duration}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    {c.quoteOnly
                      ? 'Variable / Corporate Quote-Only'
                      : `R${c.priceZAR.toLocaleString('en-ZA')} Incl. VAT`}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectCourse(c.id)}
                    className="text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                  >
                    View Course Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State Recovery if 0 courses match */}
      {filteredCourses.length === 0 ? (
        <div className="mt-8 bg-white border border-[#E5E7EB] rounded-xl p-10 text-center space-y-3">
          <p className="text-base font-bold text-[#1C1B1B]">
            No courses match your current combination of filters.
          </p>
          <p className="text-xs text-[#52525B] max-w-md mx-auto">
            Try broadening your NQF level, location, or fee range—or reset all 10 filters to view the full Training Africa Academy catalogue.
          </p>
          <button
            type="button"
            onClick={resetAllFilters}
            className="mt-2 px-5 py-2.5 text-xs font-bold text-white bg-brand rounded-lg inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All 10 Filters</span>
          </button>
        </div>
      ) : (
        /* 3-Column Elevated Course Grid (gap: 2rem) */
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => {
            const isCompared = compareIds.includes(course.id);
            const isAccreditedQual =
              course.category === 'Occupational Qualifications';
            const badgeLabel = isAccreditedQual
              ? `QCTO & Services SETA Accredited (${course.nqfLevel})`
              : 'Non-Accredited Skills Short Course';
            const secondaryBadge = isAccreditedQual
              ? `${course.credits} Credits`
              : 'Certificate of Completion';

            return (
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`px-2.5 py-1 rounded-md text-white text-[11px] font-bold shadow-xs ${
                          isAccreditedQual
                            ? 'bg-brand'
                            : 'bg-[#18181B]/95 border border-white/15'
                        }`}
                      >
                        {badgeLabel}
                      </span>
                      <span className="px-2 py-1 rounded-md bg-[#18181B]/90 text-amber-300 text-[11px] font-mono font-semibold">
                        {secondaryBadge}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                      <span>{course.code}</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <p className="text-xs font-bold text-brand">
                        {course.category}
                      </p>
                      <span className="text-[11px] font-mono text-[#52525B]">
                        {isAccreditedQual
                          ? course.saqaId
                          : 'Certificate of Completion'}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#1C1B1B] leading-snug">
                      <button
                        type="button"
                        onClick={() => onSelectCourse(course.id)}
                        className="text-left hover:text-brand transition-colors cursor-pointer"
                      >
                        {course.title}
                      </button>
                    </h2>

                    <p className="mt-2 text-sm text-[#52525B] line-clamp-2 leading-relaxed">
                      {course.shortSummary}
                    </p>

                    <div className="mt-4 pt-4 border-t border-[#E5E7EB] space-y-1.5 text-xs text-[#52525B]">
                      <p>
                        <strong className="text-[#1C1B1B]">Outcome:</strong>{' '}
                        {course.careerOutcome}
                      </p>
                      <p>
                        <strong className="text-[#1C1B1B]">Learner Type:</strong>{' '}
                        {course.targetAudience}
                      </p>
                      <p>
                        <strong className="text-[#1C1B1B]">Format & Location:</strong>{' '}
                        {course.deliveryModes.slice(0, 2).join(' · ')}
                      </p>
                      <p>
                        <strong className="text-[#1C1B1B]">Next Intake:</strong>{' '}
                        {course.nextIntake}
                      </p>
                    </div>
                  </div>
                </div>

              <div className="px-6 pb-6 pt-4 bg-[#FCF9F8] border-t border-[#E5E7EB]">
                {course.quoteOnly ? (
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#52525B] block">
                        Pricing Model
                      </span>
                      <span className="text-sm font-extrabold font-mono text-[#1C1B1B]">
                        Variable / Corporate Quote-Only
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#52525B] block">
                        Est. Cohort (5+)
                      </span>
                      <span className="text-xs font-bold font-mono text-brand tabular-nums">
                        R{course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Incl. VAT / staff
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-[#52525B] block">Individual Fee</span>
                      <span className="text-lg sm:text-xl font-extrabold font-mono text-[#1C1B1B] tabular-nums">
                        R{course.priceZAR.toLocaleString('en-ZA')}{' '}
                        <span className="text-xs font-semibold text-[#52525B]">
                          Incl. VAT
                        </span>
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-[#52525B] block">Employer Group (5+)</span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-brand tabular-nums">
                        R{course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Incl. VAT / staff
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course.id)}
                    className="text-xs font-bold text-[#1C1B1B] hover:text-brand transition-colors cursor-pointer"
                  >
                    View Course Details →
                  </button>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenBrochure(course)}
                      title="Download Course Brochure"
                      aria-label={`Download brochure for ${course.title}`}
                      className="p-2 text-[#52525B] bg-white border border-[#E5E7EB] hover:text-[#1C1B1B] rounded-lg transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEnrolCourse(course)}
                      className={`px-3.5 py-2 text-xs font-bold text-white rounded-lg transition-colors cursor-pointer ${
                        course.quoteOnly
                          ? 'bg-[#18181B] hover:bg-brand'
                          : 'bg-brand'
                      }`}
                    >
                      {course.quoteOnly ? 'Request Group Quote' : 'Enrol Now'}
                    </button>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-[#52525B]">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => toggleCompare(course.id)}
                      className="rounded border-[#E5E7EB] text-brand"
                    />
                    <span>Compare course</span>
                  </label>
                  {course.reliefStaffAvailable && (
                    <span className="font-medium text-[#1C1B1B]">
                      Relief Staff: R380/day Excl. VAT
                    </span>
                  )}
                </div>
              </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}

interface CourseDetailViewProps {
  course: Course;
  allCourses: Course[];
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
  onOpenBrochure: (course: Course) => void;
  onLaunchOnlineLearning: (courseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export function CourseDetailView({
  course,
  allCourses,
  onSelectCourse,
  onEnrolCourse,
  onOpenBrochure,
  onLaunchOnlineLearning,
  onNavigate,
}: CourseDetailViewProps) {
  const [learnerCount, setLearnerCount] = useState<number>(1);
  const [needReliefStaff, setNeedReliefStaff] = useState<boolean>(false);
  const [reliefDays, setReliefDays] = useState<number>(2);

  const unitRate = learnerCount >= 5 ? course.groupPricePerLearnerZAR : course.priceZAR;
  const tuitionSubtotal = unitRate * learnerCount;
  const reliefCost =
    needReliefStaff && course.reliefStaffAvailable
      ? learnerCount * reliefDays * course.reliefStaffRatePerDayZAR
      : 0;
  const totalEstimate = tuitionSubtotal + reliefCost;

  const recommendedCourses = allCourses.filter((c) =>
    course.recommendedNextCourseIds.includes(c.id)
  );

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Course Switcher Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-2 text-xs text-[#52525B]">
          <button
            type="button"
            onClick={() => onNavigate('catalogue')}
            className="hover:text-[#1C1B1B] underline cursor-pointer"
          >
            All Courses
          </button>
          <span aria-hidden="true">/</span>
          <span>{course.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#1C1B1B] font-semibold">{course.code}</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="switch-course-detail" className="text-xs font-medium text-[#52525B]">
            Inspect Another Programme:
          </label>
          <select
            id="switch-course-detail"
            value={course.id}
            onChange={(e) => onSelectCourse(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-[#E5E7EB] rounded-lg text-[#1C1B1B] font-medium focus:outline-none focus:border-[#D91B24]"
          >
            {allCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Columns: Full Course Specification */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            <div className="relative h-64 sm:h-80 w-full">
              <ResilientImage
                src={course.image}
                alt={course.title}
                fallbackTitle={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1B1B]/90 via-[#1C1B1B]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200 mb-2">
                  <span>{course.accreditationBody}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.saqaId}</span>
                  <span aria-hidden="true">·</span>
                  <span>{course.nqfLevel}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{course.credits} Credits</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  {course.title}
                </h1>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1C1B1B] mb-3">
                Programme Overview & Industry Outcome
              </h2>
              <p className="text-[#52525B] text-base leading-relaxed">
                {course.fullDescription}
              </p>

              {/* Key Specifications Grid */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB] grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-[#52525B] block">Target Role</span>
                  <span className="text-sm font-semibold text-[#1C1B1B] mt-0.5 block">
                    {course.careerOutcome}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#52525B] block">Duration</span>
                  <span className="text-sm font-semibold text-[#1C1B1B] mt-0.5 block">
                    {course.duration}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#52525B] block">Next Intake</span>
                  <span className="text-sm font-semibold text-[#D91B24] mt-0.5 block">
                    {course.nextIntake}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#52525B] block">Relief Staff Support</span>
                  <span className="text-sm font-semibold text-[#1C1B1B] mt-0.5 block">
                    {course.reliefStaffAvailable
                      ? `Available (R${course.reliefStaffRatePerDayZAR}/day)`
                      : 'Self-Paced / Flexible'}
                  </span>
                </div>
              </div>

              {/* Prerequisites & Delivery Modes */}
              <div className="mt-6 pt-6 border-t border-[#E5E7EB] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-[#1C1B1B] mb-2">
                    Entry Prerequisites
                  </h3>
                  <ul className="space-y-2 text-sm text-[#52525B]">
                    {course.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D91B24] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#1C1B1B] mb-2">
                    Available Delivery Formats
                  </h3>
                  <ul className="space-y-2 text-sm text-[#52525B]">
                    {course.deliveryModes.map((mode, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#1C1B1B] shrink-0 mt-0.5" />
                        <span>{mode}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
              <div>
                <h2 className="text-xl font-bold text-[#1C1B1B]">
                  Curriculum & Module Structure
                </h2>
                <p className="text-sm text-[#52525B] mt-1">
                  Combines QCTO-aligned theory, Randburg practical simulation bays, and workplace application.
                </p>
              </div>
              {course.onlineEligible && (
                <button
                  type="button"
                  onClick={() => onLaunchOnlineLearning(course.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#D91B24]" />
                  <span>Preview Online Module Player</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-200 mt-2">
              {course.modules.map((mod) => (
                <div key={mod.id} className="py-5 first:pt-4 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#52525B] mb-1.5">
                    <span className="font-mono font-semibold text-[#D91B24]">
                      Module {mod.number} · {mod.type}
                    </span>
                    <span className="font-mono tabular-nums">{mod.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1C1B1B]">{mod.title}</h3>
                  <p className="text-sm text-[#52525B] mt-1.5">{mod.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#52525B]">
                    <span className="font-semibold text-slate-700">Competencies:</span>
                    {mod.keyTopics.map((topic, i) => (
                      <React.Fragment key={topic}>
                        <span>{topic}</span>
                        {i < mod.keyTopics.length - 1 && <span aria-hidden="true">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Online Theory vs. Practical/EISA Guardrail Callout (RFQ Section 6) */}
            <div className="mt-6 p-4 sm:p-5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs sm:text-sm text-[#991B1B] leading-relaxed">
              <strong className="font-bold text-[#1C1B1B] block mb-1">
                Delivery & Assessment Notice:
              </strong>
              Online modules cover theoretical knowledge only. Accredited NQF certification requires completion of mandatory supervised practical hours at our Randburg Simulation Bays and an External Integrated Summative Assessment (EISA) at an approved assessment centre.
            </div>
          </div>

          {/* Next-Course Recommendations */}
          {recommendedCourses.length > 0 && (
            <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#1C1B1B]">
                Recommended Next-Stage Progression
              </h2>
              <p className="text-sm text-[#52525B] mt-1 mb-5">
                Graduates of {course.title} typically advance into these higher NQF or specialist programmes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-lg border border-[#E5E7EB] bg-[#FCF9F8] flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs text-[#52525B]">
                        {rec.accreditationBody} · {rec.duration}
                      </p>
                      <h3 className="text-sm font-bold text-[#1C1B1B] mt-1">
                        {rec.title}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#E5E7EB]/80 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#1C1B1B] tabular-nums">
                        {rec.quoteOnly
                          ? 'Variable / Corporate Quote-Only'
                          : `R${rec.priceZAR.toLocaleString('en-ZA')} Incl. VAT`}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectCourse(rec.id)}
                        className="text-xs font-semibold text-[#D91B24] hover:underline cursor-pointer"
                      >
                        View Programme →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Columns: Transparent Pricing, Enrolment & Relief Staff Calculator */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <p className="text-xs font-semibold text-[#D91B24] mb-1">
              Transparent Fee Calculator (Incl. VAT)
            </p>
            <h2 className="text-xl font-bold text-[#1C1B1B]">
              {course.quoteOnly
                ? 'Corporate Quote & ESD Cohort Calculator'
                : 'Enrol Online or Calculate Team Cost'}
            </h2>

            <div className="mt-5 p-4 bg-[#FCF9F8] rounded-lg border border-[#E5E7EB]">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs text-[#52525B]">
                  {course.quoteOnly ? 'Est. Cohort Rate' : 'Rate per Learner'}
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-[#1C1B1B] tabular-nums">
                  R{unitRate.toLocaleString('en-ZA')}{' '}
                  <span className="text-xs font-semibold text-[#52525B]">
                    Incl. VAT
                  </span>
                </span>
              </div>
              <p className="text-xs text-[#52525B] mt-1">
                {course.quoteOnly
                  ? 'Variable / Corporate Quote-Only programme — customised for Enterprise & Supplier Development (ESD) and learnership cohorts.'
                  : learnerCount >= 5
                  ? 'Corporate Cohort Discount Applied (5+ Staff)'
                  : `Enrol 5+ staff to unlock R${course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} Incl. VAT/learner rate`}
              </p>
            </div>

            {/* Number of Learners */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                <label htmlFor="detail-learner-count">Number of Learners / Staff</label>
                <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                  {learnerCount} {learnerCount === 1 ? 'Learner' : 'Learners'}
                </span>
              </div>
              <input
                id="detail-learner-count"
                type="range"
                min={1}
                max={30}
                value={learnerCount}
                onChange={(e) => setLearnerCount(Number(e.target.value))}
                className="w-full accent-[#D91B24] cursor-pointer"
              />
            </div>

            {/* Optional Relief Staff Add-on (Signature Cleaning Africa Services Advantage) */}
            {course.reliefStaffAvailable && (
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needReliefStaff}
                    onChange={(e) => setNeedReliefStaff(e.target.checked)}
                    className="mt-0.5 rounded border-[#E5E7EB] text-[#D91B24] focus:ring-[#D91B24]"
                  />
                  <span className="text-xs text-slate-700">
                    <strong className="text-[#1C1B1B] block">
                      Include Vetted Relief Staff (R{course.reliefStaffRatePerDayZAR}/day Excl. VAT)
                    </strong>
                    We supply trained temporary cleaners on your site while your core employees attend practical training.
                  </span>
                </label>

                {needReliefStaff && (
                  <div className="mt-3 pl-6">
                    <label htmlFor="relief-days-input" className="block text-xs text-[#52525B] mb-1">
                      Number of Relief Days Required: <strong className="font-mono">{reliefDays} days</strong>
                    </label>
                    <input
                      id="relief-days-input"
                      type="range"
                      min={1}
                      max={10}
                      value={reliefDays}
                      onChange={(e) => setReliefDays(Number(e.target.value))}
                      className="w-full accent-[#D91B24] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Total Breakdown */}
            <div className="mt-5 pt-4 border-t border-[#E5E7EB] space-y-2 text-xs">
              <div className="flex justify-between text-[#52525B]">
                <span>Tuition ({learnerCount} × R{unitRate.toLocaleString('en-ZA')} Incl. VAT)</span>
                <span className="font-mono tabular-nums">R{tuitionSubtotal.toLocaleString('en-ZA')} Incl. VAT</span>
              </div>
              {reliefCost > 0 && (
                <div className="flex justify-between text-[#52525B]">
                  <span>Relief Staff ({learnerCount} × {reliefDays}d × R380)</span>
                  <span className="font-mono tabular-nums">R{reliefCost.toLocaleString('en-ZA')} Excl. VAT</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#1C1B1B] pt-2 border-t border-[#E5E7EB]">
                <span>Total (Incl. Study Material & Assessment)</span>
                <span className="font-mono tabular-nums">R{totalEstimate.toLocaleString('en-ZA')} Incl. VAT</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => onEnrolCourse(course)}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
              >
                {course.quoteOnly
                  ? `Request Group Quote (R${totalEstimate.toLocaleString('en-ZA')} Incl. VAT Est.)`
                  : learnerCount === 1
                  ? `Register & Pay Now (R${totalEstimate.toLocaleString('en-ZA')} Incl. VAT)`
                  : `Enrol ${learnerCount} Staff / Generate Pro-Forma Invoice`}
              </button>
              <button
                type="button"
                onClick={() => onOpenBrochure(course)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Course Brochure & WSP Spec</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface OnlineLearningViewProps {
  courses: Course[];
  activeCourseId: string;
  completedModuleIds: string[];
  onSelectCourse: (courseId: string) => void;
  onMarkModuleComplete: (moduleId: string, courseId: string) => void;
  onNavigate: (page: PageId) => void;
}

export function OnlineLearningView({
  courses,
  activeCourseId,
  completedModuleIds,
  onSelectCourse,
  onMarkModuleComplete,
  onNavigate,
}: OnlineLearningViewProps) {
  const onlineCourses = courses.filter((c) => c.onlineEligible);
  const currentCourse =
    onlineCourses.find((c) => c.id === activeCourseId) || onlineCourses[0];

  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);
  const currentModule =
    currentCourse.modules[selectedModuleIndex] || currentCourse.modules[0];

  // Video Captions & Lesson Tab State (RFQ F07 & Section 5)
  const [captionsEnabled, setCaptionsEnabled] = useState<boolean>(true);
  const [activeLessonTab, setActiveLessonTab] = useState<
    'briefing' | 'lab' | 'quiz'
  >('briefing');

  // Interactive Chemical Dilution & pH Safety Simulation State
  const [bucketLitres, setBucketLitres] = useState<number>(10);
  const [dilutionPartsWater, setDilutionPartsWater] = useState<number>(50);
  const [selectedPh, setSelectedPh] = useState<number>(7);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const concentrateMl = Math.round((bucketLitres * 1000) / dilutionPartsWater);

  const downloadStudyChecklistPdf = () => {
    const checklistItems = (
      currentModule.onlineContent?.practicalChecklist ||
      currentModule.keyTopics
    )
      .map((item, idx) => `[ ] ${idx + 1}. ${item}`)
      .join('\n');

    const content = `TRAINING AFRICA ACADEMY — OFFICIAL LMS STUDY CHECKLIST & MODULE GUIDE
====================================================================
Programme:      ${currentCourse.title} (${currentCourse.code})
Accreditation:  ${currentCourse.accreditationBody}
Active Module:  Module ${currentModule.number} — ${currentModule.title}
Duration:       ${currentModule.onlineContent?.videoDuration || currentModule.duration}
====================================================================

CORE TECHNICAL BRIEFING:
${
  currentModule.onlineContent?.readingNotes ||
  currentModule.summary
}

PRACTICAL & STUDY VERIFICATION CHECKLIST:
${checklistItems}

DELIVERY & ASSESSMENT GUARDRAIL:
Online modules cover theoretical knowledge only. Accredited NQF certification requires completion of mandatory supervised practical hours at our Randburg Simulation Bays and an External Integrated Summative Assessment (EISA) at an approved assessment centre.
====================================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Study_Checklist_${currentCourse.code}_Module_${currentModule.number}.pdf.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPhClassification = (ph: number) => {
    if (ph <= 3) {
      return {
        label: 'Strong Acidic Descaler (pH 1–3)',
        colourZone: 'Red Zone — Sanitary Porcelain & Urinals Only',
        warning: 'CORROSIVE: Never apply to marble, terrazzo, limestone, or chrome fittings.',
        tone: 'text-red-700 bg-red-50 border-red-200',
      };
    }
    if (ph <= 6) {
      return {
        label: 'Mild Acidic Rinse / Carpet Neutralizer (pH 4–6)',
        colourZone: 'Yellow Zone — Washroom Tiles & Textile Acid Rinse',
        warning: 'CAUTION: Wear nitrile gloves; neutralizes alkaline detergent residues.',
        tone: 'text-amber-800 bg-amber-50 border-amber-200',
      };
    }
    if (ph <= 8) {
      return {
        label: 'Neutral Daily Floor & Surface Cleaner (pH 7–8)',
        colourZone: 'Blue Zone — Sealed Vinyl, Epoxy, Polished Stone & Glass',
        warning: 'NOMINAL: Safe for daily rotary auto-scrubbing without stripping floor polish.',
        tone: 'text-[#991B1B] bg-[#FEF2F2] border-[#FECACA]',
      };
    }
    if (ph <= 11) {
      return {
        label: 'Heavy-Duty Alkaline Degreaser (pH 9–11)',
        colourZone: 'Green Zone — Commercial Kitchens & Food Prep Surfaces',
        warning: 'ALKALINE: Emulsifies animal/vegetable fats; rinse thoroughly with potable water.',
        tone: 'text-sky-800 bg-sky-50 border-sky-200',
      };
    }
    return {
      label: 'High-Alkaline Polish Stripper / Oven Cleaner (pH 12–14)',
      colourZone: 'Industrial Deep-Strip Only — Full PPE & Eye Protection Mandatory',
      warning: 'HIGH HAZARD: Requires splash goggles, chemical apron, and wet-vac recovery.',
      tone: 'text-red-800 bg-red-50 border-red-200',
    };
  };

  const phInfo = getPhClassification(selectedPh);
  const quizContent = currentModule?.onlineContent;
  const isModuleCompleted = completedModuleIds.includes(currentModule?.id);

  const handleQuizSubmit = () => {
    if (selectedQuizAnswer === null) return;
    setQuizSubmitted(true);
    if (
      quizContent &&
      selectedQuizAnswer === quizContent.correctOptionIndex
    ) {
      onMarkModuleComplete(currentModule.id, currentCourse.id);
    }
  };

  const nextRecommendations = courses.filter((c) =>
    currentCourse.recommendedNextCourseIds.includes(c.id)
  );

  // 3 Mandatory Pilot Course Archetypes for Quick Demo Switching (RFQ F07 & Section 5)
  const pilotArchetypes = [
    {
      id: 'short-intro-cleaning-1-2',
      tag: 'Pilot 1 · Commercial Cleaning Short Course',
      label: 'Introduction to Professional Cleaning',
    },
    {
      id: 'short-business-startup',
      tag: 'Pilot 2 · Soft-Skills / Business Skills Course',
      label: 'Cleaning Enterprise Startup & Marketing',
    },
    {
      id: 'occ-cleaning-practitioner-nqf3',
      tag: 'Pilot 3 · Nominated Accredited Qualification',
      label: 'Occupational Qualification: Cleaning Practitioner',
    },
  ];

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Course Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#E5E7EB]">
        <div>
          <p className="text-xs font-semibold text-[#D91B24] mb-2">
            05. Self-Paced Online Learning · Interactive Theory, Simulation & Assessment
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1B1B]">
            {currentCourse.title}
          </h1>
          <p className="text-sm text-[#52525B] mt-1">
            {currentCourse.code} · {currentCourse.nqfLevel} · {currentCourse.accreditationBody}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="lms-course-select" className="text-xs font-medium text-[#52525B]">
            Switch Active Online Course:
          </label>
          <select
            id="lms-course-select"
            value={currentCourse.id}
            onChange={(e) => {
              onSelectCourse(e.target.value);
              setSelectedModuleIndex(0);
              setSelectedQuizAnswer(null);
              setQuizSubmitted(false);
            }}
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-[#E5E7EB] rounded-lg text-[#1C1B1B]"
          >
            {onlineCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3 Mandatory Pilot Course Archetype Quick-Switcher Bar (RFQ F07 & Section 5) */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        {pilotArchetypes.map((pilot) => {
          const isCurrent = currentCourse.id === pilot.id;
          return (
            <button
              key={pilot.id}
              type="button"
              onClick={() => {
                onSelectCourse(pilot.id);
                setSelectedModuleIndex(0);
                setSelectedQuizAnswer(null);
                setQuizSubmitted(false);
              }}
              className={`p-3.5 rounded-xl border text-left transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                  : 'bg-white text-[#1C1B1B] border-[#E5E7EB] hover:border-[#D91B24]'
              }`}
            >
              <span
                className={`block text-[11px] font-mono font-bold ${
                  isCurrent ? 'text-[#F59E0B]' : 'text-[#D91B24]'
                }`}
              >
                {pilot.tag}
              </span>
              <span className="block text-xs sm:text-sm font-bold mt-0.5">
                {pilot.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Two-Zone Sandbox Layout (Left 7 cols Stage + Lab, Right 5 cols Control & Assessment Deck) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: Interactive Lesson Stage & Chemical Dilution Lab */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Lesson Stage with Video Player, CC / Captions Toggle, Downloadable Checklist & Lesson Tabs */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
            {/* Simulated Low-Bandwidth Video Stage */}
            <div className="relative aspect-video w-full bg-[#18181B] overflow-hidden">
              <ResilientImage
                src={currentCourse.image}
                alt={currentModule.title}
                fallbackTitle={currentModule.title}
                className="w-full h-full object-cover opacity-55"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/40" />

              {/* Top Video Bar: Module Info & CC / Captions Toggle + Download Checklist */}
              <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/75 text-white text-xs font-mono">
                  Module {currentModule.number} of {currentCourse.modules.length} ·{' '}
                  {quizContent?.videoDuration || currentModule.duration}
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCaptionsEnabled((prev) => !prev)}
                    aria-pressed={captionsEnabled}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold font-mono transition-colors cursor-pointer border ${
                      captionsEnabled
                        ? 'bg-[#F59E0B] text-[#1C1B1B] border-[#F59E0B]'
                        : 'bg-black/75 text-white border-white/25 hover:bg-black'
                    }`}
                  >
                    CC / Captions: {captionsEnabled ? 'ON' : 'OFF'}
                  </button>

                  <button
                    type="button"
                    onClick={downloadStudyChecklistPdf}
                    className="px-3 py-1.5 rounded-md bg-[#D91B24] hover:bg-[#B91C1C] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Study Checklist</span>
                  </button>
                </div>
              </div>

              {/* Center Play Indicator & Lesson Title */}
              <div className="absolute inset-x-4 bottom-4 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-full bg-[#D91B24] text-white flex items-center justify-center shrink-0">
                    <PlayCircle className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                      {currentModule.title}
                    </h2>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {currentModule.summary}
                    </p>
                  </div>
                </div>

                {/* Live Closed Captions Bar (Accessible / Low-Bandwidth Mode) */}
                {captionsEnabled && (
                  <div
                    role="region"
                    aria-label="Closed Captions"
                    className="p-2.5 rounded-lg bg-black/85 border border-white/15 text-xs text-amber-200 font-mono leading-relaxed"
                  >
                    [CC · English / Multilingual Track]: &ldquo;
                    {(
                      quizContent?.readingNotes ||
                      currentModule.summary
                    ).slice(0, 145)}
                    ...&rdquo;
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Lesson Player Tabs (Briefing, Dilution Lab, Interactive Quiz) */}
            <div className="px-6 pt-4 border-b border-[#E5E7EB] flex flex-wrap items-center justify-between gap-2 bg-[#FCF9F8]">
              <div role="tablist" aria-label="Lesson Player Views" className="flex flex-wrap gap-1.5 pb-3">
                {[
                  { id: 'briefing' as const, label: '1. Study Briefing & Checklist' },
                  { id: 'lab' as const, label: '2. Chemical Dilution Lab' },
                  { id: 'quiz' as const, label: '3. Interactive Quiz' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeLessonTab === tab.id}
                    onClick={() => setActiveLessonTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      activeLessonTab === tab.id
                        ? 'bg-[#1C1B1B] text-white'
                        : 'bg-white text-[#52525B] border border-[#E5E7EB] hover:text-[#1C1B1B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={downloadStudyChecklistPdf}
                className="mb-3 text-xs font-bold text-[#D91B24] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Study Checklist</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#1C1B1B] mb-2">
                  Core Technical Briefing
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-[#FCF9F8] p-4 rounded-lg border border-[#E5E7EB]">
                  {quizContent?.readingNotes ||
                    'Every commercial hygiene operation requires strict adherence to SABS colour-coding, accurate chemical dilution ratios, and pre-shift safety verification.'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-[#1C1B1B]">
                    Practical Simulation & Workplace Study Checklist
                  </h3>
                  <button
                    type="button"
                    onClick={downloadStudyChecklistPdf}
                    className="text-xs font-semibold text-[#D91B24] hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Save PDF Study Checklist</span>
                  </button>
                </div>
                <ul className="space-y-2 text-sm text-[#52525B]">
                  {(
                    quizContent?.practicalChecklist ||
                    currentModule.keyTopics
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#D91B24] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Chemical Dilution & pH Surface Compatibility Simulator */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="w-5 h-5 text-[#D91B24]" />
                <div>
                  <h2 className="text-base font-bold text-[#1C1B1B]">
                    Interactive Chemical Dilution & Surface pH Lab
                  </h2>
                  <p className="text-xs text-[#52525B]">
                    Practice dosing calculations and SABS colour-coding compatibility before your practical assessment
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Sliders */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor="sim-bucket-litres">Container / Scrubber Tank Volume</label>
                    <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                      {bucketLitres} Litres
                    </span>
                  </div>
                  <input
                    id="sim-bucket-litres"
                    type="range"
                    min={1}
                    max={40}
                    value={bucketLitres}
                    onChange={(e) => setBucketLitres(Number(e.target.value))}
                    className="w-full accent-[#D91B24] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor="sim-dilution-ratio">Manufacturer Dilution Ratio</label>
                    <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                      1 : {dilutionPartsWater}
                    </span>
                  </div>
                  <input
                    id="sim-dilution-ratio"
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={dilutionPartsWater}
                    onChange={(e) => setDilutionPartsWater(Number(e.target.value))}
                    className="w-full accent-[#D91B24] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor="sim-ph-slider">Chemical Solution pH Value</label>
                    <span className="font-mono font-bold text-[#1C1B1B] tabular-nums">
                      pH {selectedPh}.0
                    </span>
                  </div>
                  <input
                    id="sim-ph-slider"
                    type="range"
                    min={1}
                    max={14}
                    step={1}
                    value={selectedPh}
                    onChange={(e) => setSelectedPh(Number(e.target.value))}
                    className="w-full accent-[#1C1B1B] cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Output Readout */}
              <div className="bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#52525B] block">
                    Required Concentrate Dose
                  </span>
                  <p className="text-3xl font-bold font-mono text-[#1C1B1B] tabular-nums mt-0.5">
                    {concentrateMl} ml
                  </p>
                  <p className="text-xs text-[#52525B] mt-1">
                    Add <strong className="font-mono">{concentrateMl} ml</strong> chemical into{' '}
                    <strong className="font-mono">{bucketLitres}L</strong> clean cold water (1:{dilutionPartsWater})
                  </p>
                </div>

                <div className={`mt-4 p-3 rounded-lg border text-xs ${phInfo.tone}`}>
                  <p className="font-bold">{phInfo.label}</p>
                  <p className="mt-1 font-medium">{phInfo.colourZone}</p>
                  <p className="mt-1">{phInfo.warning}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Zone: Module Selector, Knowledge Check & Next-Course Recommender */}
        <div className="lg:col-span-5 space-y-6">
          {/* Module Selector Deck */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <h2 className="text-base font-bold text-[#1C1B1B] mb-3">
              Course Modules ({completedModuleIds.length} Completed)
            </h2>
            <div className="space-y-2">
              {currentCourse.modules.map((m, idx) => {
                const done = completedModuleIds.includes(m.id);
                const active = idx === selectedModuleIndex;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => {
                      setSelectedModuleIndex(idx);
                      setSelectedQuizAnswer(null);
                      setQuizSubmitted(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-lg border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                      active
                        ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                        : 'bg-[#FCF9F8] text-[#1C1B1B] border-[#E5E7EB] hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-mono ${active ? 'text-[#F59E0B]' : 'text-[#52525B]'}`}>
                        Module {m.number} · {m.duration}
                      </p>
                      <p className="text-sm font-semibold mt-0.5">{m.title}</p>
                    </div>
                    <span className="text-xs font-semibold shrink-0">
                      {done ? '✓ Completed' : active ? 'Active' : 'Start'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Knowledge Check Quiz */}
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#1C1B1B]">
                Formative Competency Assessment
              </h2>
              {isModuleCompleted && (
                <span className="text-xs font-semibold text-[#D91B24]">
                  ✓ Competency Verified
                </span>
              )}
            </div>

            {quizContent ? (
              <div>
                <p className="text-sm font-medium text-[#1C1B1B] mb-4">
                  {quizContent.quizQuestion}
                </p>
                <div className="space-y-2">
                  {quizContent.quizOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                        selectedQuizAnswer === idx
                          ? 'border-[#D91B24] bg-[#D91B24]/5 font-semibold text-[#1C1B1B]'
                          : 'border-[#E5E7EB] hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`quiz-${currentModule.id}`}
                        checked={selectedQuizAnswer === idx}
                        onChange={() => {
                          setSelectedQuizAnswer(idx);
                          setQuizSubmitted(false);
                        }}
                        className="text-[#D91B24] focus:ring-[#D91B24]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>

                {quizSubmitted && (
                  <div
                    className={`mt-4 p-3.5 rounded-lg border text-xs font-medium ${
                      selectedQuizAnswer === quizContent.correctOptionIndex
                        ? 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'
                        : 'bg-red-50 border-red-200 text-red-900'
                    }`}
                  >
                    {selectedQuizAnswer === quizContent.correctOptionIndex
                      ? 'Correct! Module competency recorded on your Learner Dashboard.'
                      : 'Not quite right. Review the Core Technical Briefing on the left and try again.'}
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleQuizSubmit}
                  className="mt-4 w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Assessment & Record Progress
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-[#52525B] mb-4">
                  Confirm that you have reviewed the module briefing and workplace logbook checklist to mark this unit complete.
                </p>
                <button
                  type="button"
                  onClick={() => onMarkModuleComplete(currentModule.id, currentCourse.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg transition-colors cursor-pointer"
                >
                  {isModuleCompleted ? '✓ Module Completed' : 'Mark Module Complete'}
                </button>
              </div>
            )}
          </div>

          {/* Next-Course Recommendations */}
          <div className="bg-[#1C1B1B] text-white rounded-xl p-6">
            <p className="text-xs font-semibold text-[#F59E0B]">
              Personalised Progression Engine
            </p>
            <h2 className="text-base font-bold mt-1">
              Recommended Next Courses for Your Career Path
            </h2>
            <div className="mt-4 space-y-3">
              {nextRecommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-lg bg-white/10 border border-white/10 flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="text-xs text-slate-300">
                      {rec.nqfLevel} · R{rec.priceZAR.toLocaleString('en-ZA')}
                    </p>
                    <p className="text-sm font-semibold text-white mt-0.5">
                      {rec.title}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectCourse(rec.id);
                      onNavigate('course-detail');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-[#D91B24] hover:bg-[#B91C1C] text-white rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Inspect
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
