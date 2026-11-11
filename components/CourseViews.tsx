'use client';

import React, { useState, useMemo } from 'react';
import {
  Course,
  CourseCategory,
  DeliveryMode,
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
} from 'lucide-react';

interface CatalogueViewProps {
  courses: Course[];
  initialSearch?: string;
  initialCategory?: string;
  onSelectCourse: (courseId: string) => void;
  onEnrolCourse: (course: Course) => void;
  onOpenBrochure: (course: Course) => void;
  onNavigate: (page: PageId) => void;
}

export function CatalogueView({
  courses,
  initialSearch = '',
  initialCategory = 'All',
  onSelectCourse,
  onEnrolCourse,
  onOpenBrochure,
  onNavigate,
}: CatalogueViewProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(25000);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const categories: string[] = [
    'All',
    'Occupational Qualifications',
    'Specialized Hygiene & Technical',
    'Foundational Cleaning Modules',
    'Business & Entrepreneurship',
  ];

  const deliveryOptions: string[] = [
    'All',
    'Self-Paced Online',
    'Blended (Online + Practical)',
    'Classroom & Assessment Bay (Randburg)',
    'On-Site Client Premises',
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchesSearch =
        !searchQuery.trim() ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.careerOutcome.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortSummary.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || c.category === selectedCategory;

      const matchesDelivery =
        selectedDelivery === 'All' ||
        c.deliveryModes.includes(selectedDelivery as DeliveryMode);

      const matchesPrice = c.priceZAR <= maxPrice;

      return matchesSearch && matchesCategory && matchesDelivery && matchesPrice;
    });
  }, [courses, searchQuery, selectedCategory, selectedDelivery, maxPrice]);

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
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <p className="text-xs font-semibold text-[#059669] mb-2">
            03. Find a Course · Transparent Pricing & Accredited Pathways
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0B2545] max-w-2xl">
            Accredited Qualifications, Specialized Hygiene & Enterprise Courses
          </h1>
          <p className="mt-3 text-base text-slate-600 max-w-2xl">
            Filter by career outcome, NQF level, delivery format, or training budget. Every course displays full single-learner and corporate cohort rates upfront.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('employers')}
            className="px-4 py-2.5 text-sm font-semibold text-[#0B2545] bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Request Multi-Staff Quote
          </button>
        </div>
      </div>

      {/* Interactive Filter Controls */}
      <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
          {/* Search Input */}
          <div className="md:col-span-5">
            <label htmlFor="catalogue-search" className="block text-xs font-medium text-slate-700 mb-1.5">
              Search by Outcome, Job Role, Course Title or SAQA ID
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="catalogue-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Supervisor, Solar Panel, NQF 3, Startup..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#059669] text-[#0B2545]"
              />
            </div>
          </div>

          {/* Delivery Mode Dropdown */}
          <div className="md:col-span-4">
            <label htmlFor="delivery-select" className="block text-xs font-medium text-slate-700 mb-1.5">
              Preferred Delivery Mode
            </label>
            <select
              id="delivery-select"
              value={selectedDelivery}
              onChange={(e) => setSelectedDelivery(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-[#F8FAFC] border border-slate-300 rounded-lg focus:outline-none focus:border-[#059669] text-[#0B2545]"
            >
              {deliveryOptions.map((mode) => (
                <option key={mode} value={mode}>
                  {mode === 'All' ? 'All Delivery Formats' : mode}
                </option>
              ))}
            </select>
          </div>

          {/* Budget Slider */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>Max Individual Fee</span>
              <span className="font-mono font-semibold text-[#0B2545] tabular-nums">
                R{maxPrice.toLocaleString('en-ZA')}
              </span>
            </div>
            <input
              type="range"
              min={1400}
              max={25000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximum course fee in Rand"
              className="w-full accent-[#059669] cursor-pointer"
            />
          </div>
        </div>

        {/* Category Filter Tabs (Functional Segmented Buttons) */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B2545] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B2545]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="tabular-nums font-medium text-[#0B2545]">
              Showing {filteredCourses.length} of {courses.length} programmes
            </span>
            {(searchQuery || selectedCategory !== 'All' || selectedDelivery !== 'All' || maxPrice < 25000) && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedDelivery('All');
                  setMaxPrice(25000);
                }}
                className="inline-flex items-center gap-1 text-[#059669] hover:underline font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Panel (if courses selected) */}
      {comparedCourses.length > 0 && (
        <div className="mt-6 bg-[#0B2545] text-white rounded-xl p-6">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#F59E0B]" />
              <h2 className="text-sm font-semibold">
                Course Comparison Matrix ({comparedCourses.length}/3 Selected)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCompareIds([])}
              className="text-xs text-slate-300 hover:text-white underline cursor-pointer"
            >
              Clear Comparison
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedCourses.map((c) => (
              <div key={c.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-[#F59E0B] font-mono">
                    {c.code} · {c.nqfLevel} · {c.credits} Credits
                  </p>
                  <h3 className="text-sm font-semibold text-white mt-1">{c.title}</h3>
                  <p className="text-xs text-slate-300 mt-2">
                    Career Outcome: {c.careerOutcome}
                  </p>
                  <p className="text-xs text-slate-300 mt-1">
                    Duration: {c.duration}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-sm font-bold text-white tabular-nums">
                    R{c.priceZAR.toLocaleString('en-ZA')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectCourse(c.id)}
                    className="text-xs font-semibold text-[#F59E0B] hover:underline cursor-pointer"
                  >
                    Inspect Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Course Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isCompared = compareIds.includes(course.id);
          return (
            <article
              key={course.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <ResilientImage
                    src={course.image}
                    alt={course.title}
                    fallbackTitle={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between text-white">
                    <div className="text-xs font-medium text-slate-200">
                      <span>{course.code}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{course.nqfLevel}</span>
                      <span aria-hidden="true"> · </span>
                      <span className="tabular-nums">{course.credits} Credits</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Unboxed quiet metadata line */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <span className="text-[#059669] font-medium">{course.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{course.duration}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#0B2545] leading-snug">
                    <button
                      type="button"
                      onClick={() => onSelectCourse(course.id)}
                      className="text-left hover:text-[#059669] transition-colors cursor-pointer"
                    >
                      {course.title}
                    </button>
                  </h2>

                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {course.shortSummary}
                  </p>

                  {/* Outcome & Accreditation Metadata */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                    <p>
                      <span className="font-semibold text-[#0B2545]">Outcome:</span>{' '}
                      {course.careerOutcome}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0B2545]">Delivery:</span>{' '}
                      {course.deliveryModes.slice(0, 2).join(' / ')}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0B2545]">Next Intake:</span>{' '}
                      {course.nextIntake}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 bg-[#F8FAFC] border-t border-slate-200/80">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-xs text-slate-500 block">Individual Fee</span>
                    <span className="text-xl font-bold font-mono text-[#0B2545] tabular-nums">
                      R{course.priceZAR.toLocaleString('en-ZA')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Employer Group (5+)</span>
                    <span className="text-sm font-semibold font-mono text-[#059669] tabular-nums">
                      R{course.groupPricePerLearnerZAR.toLocaleString('en-ZA')} / learner
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onEnrolCourse(course)}
                    className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer text-center"
                  >
                    Enrol & Pay
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectCourse(course.id)}
                    className="py-2.5 px-3.5 text-xs font-semibold text-[#0B2545] bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Curriculum
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenBrochure(course)}
                    title="Download Course Brochure"
                    aria-label={`Download brochure for ${course.title}`}
                    className="p-2.5 text-slate-600 bg-white border border-slate-300 hover:text-[#0B2545] hover:bg-slate-50 rounded-lg transition-colors shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isCompared}
                      onChange={() => toggleCompare(course.id)}
                      className="rounded border-slate-300 text-[#059669] focus:ring-[#059669]"
                    />
                    <span>Compare course</span>
                  </label>
                  {course.reliefStaffAvailable && (
                    <span>Relief Staff: R380/day optional</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate('catalogue')}
            className="hover:text-[#0B2545] underline cursor-pointer"
          >
            All Courses
          </button>
          <span aria-hidden="true">/</span>
          <span>{course.category}</span>
          <span aria-hidden="true">/</span>
          <span className="text-[#0B2545] font-semibold">{course.code}</span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="switch-course-detail" className="text-xs font-medium text-slate-600">
            Inspect Another Programme:
          </label>
          <select
            id="switch-course-detail"
            value={course.id}
            onChange={(e) => onSelectCourse(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-[#0B2545] font-medium focus:outline-none focus:border-[#059669]"
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
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="relative h-64 sm:h-80 w-full">
              <ResilientImage
                src={course.image}
                alt={course.title}
                fallbackTitle={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/40 to-transparent" />
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
              <h2 className="text-lg font-bold text-[#0B2545] mb-3">
                Programme Overview & Industry Outcome
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {course.fullDescription}
              </p>

              {/* Key Specifications Grid */}
              <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-slate-500 block">Target Role</span>
                  <span className="text-sm font-semibold text-[#0B2545] mt-0.5 block">
                    {course.careerOutcome}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Duration</span>
                  <span className="text-sm font-semibold text-[#0B2545] mt-0.5 block">
                    {course.duration}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Next Intake</span>
                  <span className="text-sm font-semibold text-[#059669] mt-0.5 block">
                    {course.nextIntake}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Relief Staff Support</span>
                  <span className="text-sm font-semibold text-[#0B2545] mt-0.5 block">
                    {course.reliefStaffAvailable
                      ? `Available (R${course.reliefStaffRatePerDayZAR}/day)`
                      : 'Self-Paced / Flexible'}
                  </span>
                </div>
              </div>

              {/* Prerequisites & Delivery Modes */}
              <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-[#0B2545] mb-2">
                    Entry Prerequisites
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {course.prerequisites.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B2545] mb-2">
                    Available Delivery Formats
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {course.deliveryModes.map((mode, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0B2545] shrink-0 mt-0.5" />
                        <span>{mode}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h2 className="text-xl font-bold text-[#0B2545]">
                  Curriculum & Module Structure
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Combines QCTO-aligned theory, Randburg practical simulation bays, and workplace application.
                </p>
              </div>
              {course.onlineEligible && (
                <button
                  type="button"
                  onClick={() => onLaunchOnlineLearning(course.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[#059669]" />
                  <span>Preview Online Module Player</span>
                </button>
              )}
            </div>

            <div className="divide-y divide-slate-200 mt-2">
              {course.modules.map((mod) => (
                <div key={mod.id} className="py-5 first:pt-4 last:pb-0">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-mono font-semibold text-[#059669]">
                      Module {mod.number} · {mod.type}
                    </span>
                    <span className="font-mono tabular-nums">{mod.duration}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#0B2545]">{mod.title}</h3>
                  <p className="text-sm text-slate-600 mt-1.5">{mod.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
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
          </div>

          {/* Next-Course Recommendations */}
          {recommendedCourses.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8">
              <h2 className="text-lg font-bold text-[#0B2545]">
                Recommended Next-Stage Progression
              </h2>
              <p className="text-sm text-slate-600 mt-1 mb-5">
                Graduates of {course.title} typically advance into these higher NQF or specialist programmes:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedCourses.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-4 rounded-lg border border-slate-200 bg-[#F8FAFC] flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs text-slate-500">
                        {rec.nqfLevel} · {rec.duration}
                      </p>
                      <h3 className="text-sm font-bold text-[#0B2545] mt-1">
                        {rec.title}
                      </h3>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#0B2545] tabular-nums">
                        R{rec.priceZAR.toLocaleString('en-ZA')}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectCourse(rec.id)}
                        className="text-xs font-semibold text-[#059669] hover:underline cursor-pointer"
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
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <p className="text-xs font-semibold text-[#059669] mb-1">
              Transparent Fee Calculator
            </p>
            <h2 className="text-xl font-bold text-[#0B2545]">
              Enrol Online or Calculate Team Cost
            </h2>

            <div className="mt-5 p-4 bg-[#F8FAFC] rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-500">Rate per Learner</span>
                <span className="text-2xl font-bold font-mono text-[#0B2545] tabular-nums">
                  R{unitRate.toLocaleString('en-ZA')}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {learnerCount >= 5
                  ? 'Corporate Cohort Discount Applied (5+ Staff)'
                  : `Enrol 5+ staff to unlock R${course.groupPricePerLearnerZAR.toLocaleString('en-ZA')}/learner rate`}
              </p>
            </div>

            {/* Number of Learners */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                <label htmlFor="detail-learner-count">Number of Learners / Staff</label>
                <span className="font-mono font-bold text-[#0B2545] tabular-nums">
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
                className="w-full accent-[#059669] cursor-pointer"
              />
            </div>

            {/* Optional Relief Staff Add-on (Signature Cleaning Africa Services Advantage) */}
            {course.reliefStaffAvailable && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needReliefStaff}
                    onChange={(e) => setNeedReliefStaff(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#059669] focus:ring-[#059669]"
                  />
                  <span className="text-xs text-slate-700">
                    <strong className="text-[#0B2545] block">
                      Include Vetted Relief Staff (R{course.reliefStaffRatePerDayZAR}/day)
                    </strong>
                    We supply trained temporary cleaners on your site while your core employees attend practical training.
                  </span>
                </label>

                {needReliefStaff && (
                  <div className="mt-3 pl-6">
                    <label htmlFor="relief-days-input" className="block text-xs text-slate-600 mb-1">
                      Number of Relief Days Required: <strong className="font-mono">{reliefDays} days</strong>
                    </label>
                    <input
                      id="relief-days-input"
                      type="range"
                      min={1}
                      max={10}
                      value={reliefDays}
                      onChange={(e) => setReliefDays(Number(e.target.value))}
                      className="w-full accent-[#059669] cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Total Breakdown */}
            <div className="mt-5 pt-4 border-t border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Tuition ({learnerCount} × R{unitRate.toLocaleString('en-ZA')})</span>
                <span className="font-mono tabular-nums">R{tuitionSubtotal.toLocaleString('en-ZA')}</span>
              </div>
              {reliefCost > 0 && (
                <div className="flex justify-between text-slate-600">
                  <span>Relief Staff ({learnerCount} × {reliefDays}d × R380)</span>
                  <span className="font-mono tabular-nums">R{reliefCost.toLocaleString('en-ZA')}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-[#0B2545] pt-2 border-t border-slate-200">
                <span>Total (Incl. Study Material & Assessment)</span>
                <span className="font-mono tabular-nums">R{totalEstimate.toLocaleString('en-ZA')}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <button
                type="button"
                onClick={() => onEnrolCourse(course)}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
              >
                {learnerCount === 1
                  ? `Register & Pay Now (R${totalEstimate.toLocaleString('en-ZA')})`
                  : `Enrol ${learnerCount} Staff / Generate Pro-Forma Invoice`}
              </button>
              <button
                type="button"
                onClick={() => onOpenBrochure(course)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
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

  // Interactive Chemical Dilution & pH Safety Simulation State
  const [bucketLitres, setBucketLitres] = useState<number>(10);
  const [dilutionPartsWater, setDilutionPartsWater] = useState<number>(50);
  const [selectedPh, setSelectedPh] = useState<number>(7);

  // Quiz state
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const concentrateMl = Math.round((bucketLitres * 1000) / dilutionPartsWater);

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
        tone: 'text-emerald-800 bg-emerald-50 border-emerald-200',
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

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header & Course Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-slate-200">
        <div>
          <p className="text-xs font-semibold text-[#059669] mb-2">
            05. Self-Paced Online Learning · Interactive Theory, Simulation & Assessment
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0B2545]">
            {currentCourse.title}
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            {currentCourse.code} · {currentCourse.nqfLevel} · {currentCourse.accreditationBody}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="lms-course-select" className="text-xs font-medium text-slate-600">
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
            className="px-3.5 py-2 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-[#0B2545]"
          >
            {onlineCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.code} — {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Two-Zone Sandbox Layout (Left 7 cols Stage + Lab, Right 5 cols Control & Assessment Deck) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Zone: Interactive Lesson Stage & Chemical Dilution Lab */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Lesson Stage */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="bg-[#0B2545] text-white p-6">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                <span>
                  Module {currentModule.number} of {currentCourse.modules.length} · {currentModule.type}
                </span>
                <span className="font-mono tabular-nums">
                  {quizContent?.videoDuration || currentModule.duration}
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{currentModule.title}</h2>
              <p className="text-sm text-slate-300 mt-2">{currentModule.summary}</p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-[#0B2545] mb-2">
                  Core Technical Briefing
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed bg-[#F8FAFC] p-4 rounded-lg border border-slate-200">
                  {quizContent?.readingNotes ||
                    'Every commercial hygiene operation requires strict adherence to SABS colour-coding, accurate chemical dilution ratios, and pre-shift safety verification.'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#0B2545] mb-2">
                  Practical Simulation & Workplace Checklist
                </h3>
                <ul className="space-y-2 text-sm text-slate-600">
                  {(
                    quizContent?.practicalChecklist ||
                    currentModule.keyTopics
                  ).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Chemical Dilution & pH Surface Compatibility Simulator */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <FlaskConical className="w-5 h-5 text-[#059669]" />
                <div>
                  <h2 className="text-base font-bold text-[#0B2545]">
                    Interactive Chemical Dilution & Surface pH Lab
                  </h2>
                  <p className="text-xs text-slate-500">
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
                    <span className="font-mono font-bold text-[#0B2545] tabular-nums">
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
                    className="w-full accent-[#059669] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor="sim-dilution-ratio">Manufacturer Dilution Ratio</label>
                    <span className="font-mono font-bold text-[#0B2545] tabular-nums">
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
                    className="w-full accent-[#059669] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                    <label htmlFor="sim-ph-slider">Chemical Solution pH Value</label>
                    <span className="font-mono font-bold text-[#0B2545] tabular-nums">
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
                    className="w-full accent-[#0B2545] cursor-pointer"
                  />
                </div>
              </div>

              {/* Live Output Readout */}
              <div className="bg-[#F8FAFC] border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-slate-500 block">
                    Required Concentrate Dose
                  </span>
                  <p className="text-3xl font-bold font-mono text-[#0B2545] tabular-nums mt-0.5">
                    {concentrateMl} ml
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
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
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-base font-bold text-[#0B2545] mb-3">
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
                        ? 'bg-[#0B2545] text-white border-[#0B2545]'
                        : 'bg-[#F8FAFC] text-[#0B2545] border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-mono ${active ? 'text-[#F59E0B]' : 'text-slate-500'}`}>
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
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-bold text-[#0B2545]">
                Formative Competency Assessment
              </h2>
              {isModuleCompleted && (
                <span className="text-xs font-semibold text-[#059669]">
                  ✓ Competency Verified
                </span>
              )}
            </div>

            {quizContent ? (
              <div>
                <p className="text-sm font-medium text-[#0B2545] mb-4">
                  {quizContent.quizQuestion}
                </p>
                <div className="space-y-2">
                  {quizContent.quizOptions.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg border text-xs sm:text-sm cursor-pointer transition-colors ${
                        selectedQuizAnswer === idx
                          ? 'border-[#059669] bg-[#059669]/5 font-semibold text-[#0B2545]'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
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
                        className="text-[#059669] focus:ring-[#059669]"
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>

                {quizSubmitted && (
                  <div
                    className={`mt-4 p-3.5 rounded-lg border text-xs font-medium ${
                      selectedQuizAnswer === quizContent.correctOptionIndex
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
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
                  className="mt-4 w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
                >
                  Submit Assessment & Record Progress
                </button>
              </div>
            ) : (
              <div>
                <p className="text-sm text-slate-600 mb-4">
                  Confirm that you have reviewed the module briefing and workplace logbook checklist to mark this unit complete.
                </p>
                <button
                  type="button"
                  onClick={() => onMarkModuleComplete(currentModule.id, currentCourse.id)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors cursor-pointer"
                >
                  {isModuleCompleted ? '✓ Module Completed' : 'Mark Module Complete'}
                </button>
              </div>
            )}
          </div>

          {/* Next-Course Recommendations */}
          <div className="bg-[#0B2545] text-white rounded-xl p-6">
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
                    className="px-3 py-1.5 text-xs font-semibold bg-[#059669] hover:bg-[#047857] text-white rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
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
