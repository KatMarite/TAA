'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { PageId } from '@/lib/academy-data';
import {
  Compass,
  ChevronDown,
  ArrowLeft,
  RotateCcw,
  Award,
  Menu,
  X,
  Palette,
  FileText,
  MessageSquare,
} from 'lucide-react';

export type ThemeClass = 'theme-crimson' | 'theme-emerald';

interface TopBarAndNavProps {
  activePage: PageId;
  previousPage: PageId | null;
  onNavigate: (page: PageId) => void;
  onNavigateCourseFilter: (filterType: 'all' | 'accredited' | 'short') => void;
  activeCourseFilter: 'all' | 'accredited' | 'short';
  enrolledCount: number;
  audienceMode: 'learner' | 'employer';
  onToggleAudienceMode: (mode: 'learner' | 'employer') => void;
  onOpenTour: () => void;
  onOpenCertificateVerify: () => void;
  onResetState: () => void;
  onOpenHelpChat?: () => void;
  themeClass?: ThemeClass;
  onSelectThemeClass?: (theme: ThemeClass) => void;
}

const PAGE_LABELS: Record<PageId, { title: string; section: string }> = {
  home: { title: 'Home', section: 'Main' },
  catalogue: { title: 'Course Catalogue', section: 'Courses' },
  'course-detail': { title: 'Course Details', section: 'Courses' },
  'online-learning': { title: 'Online Learning Lab', section: 'Learning' },
  pathways: { title: 'Career Pathways', section: 'Learning' },
  qualifications: { title: 'Accredited Qualifications & Learnerships', section: 'Qualifications' },
  employers: { title: 'Training for Employers', section: 'Employers' },
  'assessment-centre': { title: 'Assessment Centre & Venue Hire', section: 'Campus & Venue' },
  'other-services': { title: 'Employer & Campus Services', section: 'Employers' },
  gallery: { title: 'Campus & Practical Gallery', section: 'Campus & Venue' },
  about: { title: 'About & Accreditations', section: 'Academy' },
  facilitators: { title: 'Facilitators & Training Approach', section: 'Academy' },
  resources: { title: 'Resources & FAQs', section: 'Support' },
  news: { title: 'News & Industry Insights', section: 'Academy' },
  contact: { title: 'Contact & Locations', section: 'Support' },
  policies: { title: 'Privacy, Terms & Learner Policies', section: 'Support' },
  dashboard: { title: 'Learner Hub & Course Studio', section: 'Learner Hub' },
  sitemap: { title: 'Full Site Directory', section: 'Support' },
};

const MORE_DESTINATIONS: {
  id: PageId;
  label: string;
  desc: string;
  group: 'Learning & Career' | 'Employers & Venue' | 'Academy & Support';
}[] = [
  {
    id: 'online-learning',
    label: 'Self-Paced Online Learning Lab',
    desc: 'Interactive modules, chemical dilution lab & quizzes',
    group: 'Learning & Career',
  },
  {
    id: 'pathways',
    label: 'Career & Learning Pathways',
    desc: 'Step-by-step progression from NQF 1 to business owner',
    group: 'Learning & Career',
  },
  {
    id: 'assessment-centre',
    label: 'Assessment Centre & Venue Hire',
    desc: 'Book Randburg practical bays, solar rigs & lecture rooms',
    group: 'Employers & Venue',
  },
  {
    id: 'other-services',
    label: 'Relief Staff & WSP Services',
    desc: 'R380/day vetted relief cleaners & SETA grant advisory',
    group: 'Employers & Venue',
  },
  {
    id: 'gallery',
    label: 'Campus & Practical Gallery',
    desc: 'Inside our Northriding, Randburg training facilities',
    group: 'Academy & Support',
  },
  {
    id: 'facilitators',
    label: 'Facilitators & Training Approach',
    desc: 'Meet our QCTO assessors & moderators',
    group: 'Academy & Support',
  },
  {
    id: 'resources',
    label: 'Resources, Toolkits & FAQs',
    desc: 'Downloadable guides & common learner/employer answers',
    group: 'Academy & Support',
  },
  {
    id: 'news',
    label: 'News & Industry Insights',
    desc: 'Updates on QCTO qualifications, solar maintenance & hygiene',
    group: 'Academy & Support',
  },
  {
    id: 'policies',
    label: 'Learner Policies & POPIA',
    desc: 'RPL, remediation, refunds & data protection policies',
    group: 'Academy & Support',
  },
];

export default function TopBarAndNav({
  activePage,
  previousPage,
  onNavigate,
  onNavigateCourseFilter,
  activeCourseFilter,
  enrolledCount,
  onOpenTour,
  onOpenCertificateVerify,
  onResetState,
  onOpenHelpChat,
  themeClass,
  onSelectThemeClass,
}: TopBarAndNavProps) {
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localThemeClass, setLocalThemeClass] =
    useState<ThemeClass>('theme-crimson');
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  const resolvedThemeClass = themeClass || localThemeClass;

  const handleSelectTheme = (nextTheme: ThemeClass) => {
    setLocalThemeClass(nextTheme);
    if (onSelectThemeClass) {
      onSelectThemeClass(nextTheme);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        moreMenuRef.current &&
        !moreMenuRef.current.contains(e.target as Node)
      ) {
        setMoreMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMoreMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentMeta = PAGE_LABELS[activePage] || PAGE_LABELS.home;

  const isCoursesActive =
    activePage === 'catalogue' || activePage === 'course-detail';
  const isQualificationsActive = activePage === 'qualifications';
  const isEmployersActive =
    activePage === 'employers' || activePage === 'other-services';
  const isMorePageActive =
    MORE_DESTINATIONS.some(
      (d) => d.id === activePage && d.id !== 'other-services'
    ) || activePage === 'sitemap';

  return (
    <div className={`${resolvedThemeClass} sticky top-0 z-40 w-full max-w-full`}>
      {/* SINGLE COMPACT PRIMARY HEADER ROW */}
      <div className="w-full bg-[var(--bg-primary)]/95 backdrop-blur-md border-b border-[var(--border-subtle)]">
        <header className="max-w-[1360px] mx-auto flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-6 lg:px-8 h-14 sm:h-16">
          {/* Zone 1: Brand Wordmark (min-w-0 & truncate on mobile prevents 390px overflow) */}
          <button
            type="button"
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
              setMoreMenuOpen(false);
            }}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer min-w-0 flex-1 lg:flex-initial focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded-lg"
          >
            <Image
              src="/assets/aistudio/1_bff70370.svg"
              alt="Training Africa Academy Logo"
              width={40}
              height={40}
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
            />
            <span className="text-sm sm:text-base lg:text-lg font-extrabold tracking-tight text-[var(--text-primary)] group-hover:text-brand transition-colors truncate">
              Training Africa Academy
            </span>
          </button>

          {/* Zone 2: Simplified Primary Navigation Links (Desktop) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-semibold text-[var(--text-muted)]"
          >
            <button
              type="button"
              onClick={() => onNavigateCourseFilter('all')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                isCoursesActive
                  ? 'text-brand font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[var(--text-primary)]'
              }`}
            >
              Courses
            </button>

            <button
              type="button"
              onClick={() => onNavigate('qualifications')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                isQualificationsActive
                  ? 'text-brand font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[var(--text-primary)]'
              }`}
            >
              Qualifications
            </button>

            <button
              type="button"
              onClick={() => onNavigate('employers')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                isEmployersActive
                  ? 'text-brand font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[var(--text-primary)]'
              }`}
            >
              For Employers
            </button>

            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                activePage === 'dashboard'
                  ? 'text-brand font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[var(--text-primary)]'
              }`}
            >
              Learner Hub ({enrolledCount})
            </button>

            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                activePage === 'about'
                  ? 'text-brand font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[var(--text-primary)]'
              }`}
            >
              About
            </button>

            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                activePage === 'contact'
                  ? 'text-brand font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[var(--text-primary)]'
              }`}
            >
              Contact
            </button>

            {/* Consolidated "More & Tools" Dropdown for Secondary Pages & Utility Tools */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setMoreMenuOpen((prev) => !prev)}
                aria-expanded={moreMenuOpen}
                aria-haspopup="true"
                className={`inline-flex items-center gap-1 py-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] rounded ${
                  isMorePageActive || moreMenuOpen
                    ? 'text-brand font-bold'
                    : 'hover:text-[var(--text-primary)]'
                }`}
              >
                <span>More & Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-150 ${
                    moreMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {moreMenuOpen && (
                <div
                  role="menu"
                  aria-label="Additional Academy Pages and Tools"
                  className="absolute right-0 mt-3 w-[560px] max-w-[92vw] bg-white border border-[var(--border-subtle)] rounded-xl shadow-xl p-5 text-[var(--text-primary)] z-50"
                >
                  <div className="grid grid-cols-2 gap-4 pb-4 border-b border-[var(--border-subtle)]">
                    <div>
                      <p className="text-xs font-bold text-[var(--text-muted)] mb-2">
                        Learning, Campus & Venues
                      </p>
                      <div className="space-y-1">
                        {MORE_DESTINATIONS.slice(0, 5).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              onNavigate(item.id);
                              setMoreMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                              activePage === item.id
                                ? 'bg-brand-soft text-brand font-semibold'
                                : 'hover:bg-zinc-50'
                            }`}
                          >
                            <span className="block text-xs font-bold text-[var(--text-primary)]">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-[var(--text-muted)] leading-snug mt-0.5">
                              {item.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[var(--text-muted)] mb-2">
                        Academy Info & Policies
                      </p>
                      <div className="space-y-1">
                        {MORE_DESTINATIONS.slice(5).map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            role="menuitem"
                            onClick={() => {
                              onNavigate(item.id);
                              setMoreMenuOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                              activePage === item.id
                                ? 'bg-brand-soft text-brand font-semibold'
                                : 'hover:bg-zinc-50'
                            }`}
                          >
                            <span className="block text-xs font-bold text-[var(--text-primary)]">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-[var(--text-muted)] leading-snug mt-0.5">
                              {item.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Utility & Help Tools Area */}
                  <div className="pt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onOpenCertificateVerify();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] hover:bg-zinc-100 text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)] cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5 text-brand" />
                        <span>Verify Certificate</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onOpenTour();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] hover:bg-zinc-100 text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)] cursor-pointer"
                      >
                        <Compass className="w-3.5 h-3.5 text-brand" />
                        <span>Guided Tour</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setMoreMenuOpen(false);
                          onNavigate('sitemap');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] hover:bg-zinc-100 text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)] cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5 text-brand" />
                        <span>Site Directory</span>
                      </button>
                    </div>

                    {/* Theme & Reset Controls */}
                    <div className="flex items-center gap-2">
                      <div
                        className="inline-flex items-center gap-1 bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-subtle)]"
                        role="group"
                        aria-label="Color Theme"
                      >
                        <Palette className="w-3.5 h-3.5 text-[var(--text-muted)] ml-1" />
                        <button
                          type="button"
                          onClick={() => handleSelectTheme('theme-crimson')}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            resolvedThemeClass === 'theme-crimson'
                              ? 'bg-[#D91B24] text-white'
                              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          Crimson
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSelectTheme('theme-emerald')}
                          className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                            resolvedThemeClass === 'theme-emerald'
                              ? 'bg-[#059669] text-white'
                              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                          }`}
                        >
                          Emerald
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          handleSelectTheme('theme-crimson');
                          onResetState();
                          setMoreMenuOpen(false);
                        }}
                        title="Reset saved demo data"
                        className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-zinc-100 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Right Actions (Fits cleanly inside 390px without overflowing) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* On mobile (<768px), provide a clean Help & Chat button in the header so no floating button covers page cards */}
            {onOpenHelpChat && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHelpChat();
                }}
                aria-label="Open Help and WhatsApp Support"
                className="md:hidden inline-flex items-center gap-1 px-2.5 py-2 min-h-[40px] rounded-lg border border-[var(--border-subtle)] bg-white text-[var(--text-primary)] hover:bg-zinc-50 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 text-brand shrink-0" />
                <span>Help</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                onNavigate('contact');
                setMobileMenuOpen(false);
              }}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 min-h-[40px] text-xs sm:text-sm font-bold text-white bg-brand rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)]"
            >
              Enquire Now
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              className="lg:hidden inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 min-h-[40px] rounded-lg border border-[var(--border-subtle)] bg-white text-[var(--text-primary)] hover:bg-zinc-50 text-xs font-bold whitespace-nowrap shrink-0 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <>
                  <X className="w-4 h-4 shrink-0" />
                  <span>Close</span>
                </>
              ) : (
                <>
                  <Menu className="w-4 h-4 shrink-0" />
                  <span>Menu</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Quiet Sub-Page Breadcrumb Strip (Shown ONLY on inner pages, never on Home) */}
        {activePage !== 'home' && (
          <div className="border-t border-[var(--border-subtle)] bg-white/80">
            <div className="max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
              <div className="flex items-center gap-2 min-w-0 overflow-x-auto no-scrollbar">
                <button
                  type="button"
                  onClick={() => onNavigate(previousPage || 'home')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--bg-primary)] hover:bg-zinc-100 text-[var(--text-primary)] font-semibold border border-[var(--border-subtle)] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-[var(--text-primary)] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Home
                </button>
                <span aria-hidden="true">/</span>
                <span className="font-semibold text-[var(--text-primary)] truncate">
                  {currentMeta.title}
                </span>
              </div>

              <button
                type="button"
                onClick={onOpenCertificateVerify}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Verify Certificate</span>
              </button>
            </div>
          </div>
        )}

        {/* Accessible Mobile & Tablet Navigation Drawer (Constrained to 100% viewport width, zero horizontal clipping) */}
        {mobileMenuOpen && (
          <div
            role="dialog"
            aria-label="Mobile Navigation Menu"
            className="lg:hidden w-full max-w-full overflow-x-hidden bg-white border-t border-[var(--border-subtle)] px-3 sm:px-6 pt-4 pb-8 max-h-[calc(100vh-3.5rem)] overflow-y-auto shadow-xl space-y-5"
          >
            {/* Primary Mobile Actions */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  onNavigate('contact');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 px-3 min-h-[44px] text-xs font-bold text-white bg-brand rounded-xl text-center cursor-pointer"
              >
                Enquire Now
              </button>
              {onOpenHelpChat && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenHelpChat();
                  }}
                  className="w-full py-2.5 px-3 min-h-[44px] text-xs font-bold text-white bg-[var(--brand-secondary)] rounded-xl inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  <span>Help & WhatsApp</span>
                </button>
              )}
            </div>

            {/* Primary Destinations */}
            <div>
              <p className="text-xs font-bold text-[var(--text-muted)] mb-2">
                Main Navigation
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  {
                    label: 'Home',
                    sub: 'Individual & Employer starting point',
                    active: activePage === 'home',
                    action: () => onNavigate('home'),
                  },
                  {
                    label: 'Courses (All Programmes)',
                    sub: 'Browse all accredited & short courses',
                    active: isCoursesActive && activeCourseFilter === 'all',
                    action: () => onNavigateCourseFilter('all'),
                  },
                  {
                    label: 'Qualifications & Learnerships',
                    sub: 'QCTO & Services SETA (NQF 1–4)',
                    active: isQualificationsActive,
                    action: () => onNavigate('qualifications'),
                  },
                  {
                    label: 'Short Courses (2–5 Days)',
                    sub: 'Cleaning, Solar PV, Carpets & Startup',
                    active: isCoursesActive && activeCourseFilter === 'short',
                    action: () => onNavigateCourseFilter('short'),
                  },
                  {
                    label: 'For Employers & HR',
                    sub: 'Group quotes, R380/day relief staff & tax ROI',
                    active: activePage === 'employers',
                    action: () => onNavigate('employers'),
                  },
                  {
                    label: `Learner Hub (${enrolledCount})`,
                    sub: 'Enrolled courses, certificates & course studio',
                    active: activePage === 'dashboard',
                    action: () => onNavigate('dashboard'),
                  },
                  {
                    label: 'About & Accreditations',
                    sub: 'Our heritage since 2000 & SETA status',
                    active: activePage === 'about',
                    action: () => onNavigate('about'),
                  },
                  {
                    label: 'Contact & Randburg Campus',
                    sub: 'Address, phone, WhatsApp & enquiry form',
                    active: activePage === 'contact',
                    action: () => onNavigate('contact'),
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      item.action();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full p-3 rounded-xl text-left border transition-colors cursor-pointer min-h-[48px] ${
                      item.active
                        ? 'bg-brand-soft border-brand text-[var(--text-primary)]'
                        : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-primary)] hover:bg-zinc-100'
                    }`}
                  >
                    <span className="block text-sm font-bold break-words">
                      {item.label}
                    </span>
                    <span className="block text-xs text-[var(--text-muted)] mt-0.5 break-words">
                      {item.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Specialist Portals & Academy Pages (1 col on narrow mobile so labels never clip) */}
            <div className="pt-3 border-t border-[var(--border-subtle)]">
              <p className="text-xs font-bold text-[var(--text-muted)] mb-2">
                Portals, Venue Hire & Resources
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {MORE_DESTINATIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-xs font-semibold border transition-colors cursor-pointer min-h-[44px] break-words ${
                      activePage === item.id
                        ? 'bg-brand text-white border-brand'
                        : 'bg-white text-[var(--text-primary)] border-[var(--border-subtle)] hover:bg-zinc-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Utility & Help Tools */}
            <div className="pt-3 border-t border-[var(--border-subtle)] space-y-3">
              <p className="text-xs font-bold text-[var(--text-muted)]">
                Tools & Preferences
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCertificateVerify();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border-subtle)] cursor-pointer"
                >
                  <Award className="w-4 h-4 text-brand shrink-0" />
                  <span>Verify Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTour();
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border-subtle)] cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-brand shrink-0" />
                  <span>Guided Tour</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onNavigate('sitemap');
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)] text-xs font-bold border border-[var(--border-subtle)] cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-brand shrink-0" />
                  <span>Site Directory</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <div
                  className="inline-flex items-center gap-1.5 bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-subtle)]"
                  role="group"
                  aria-label="Color Theme"
                >
                  <span className="text-xs font-semibold text-[var(--text-muted)] px-2">
                    Theme:
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectTheme('theme-crimson')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer ${
                      resolvedThemeClass === 'theme-crimson'
                        ? 'bg-[#D91B24] text-white'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    Crimson
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectTheme('theme-emerald')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold cursor-pointer ${
                      resolvedThemeClass === 'theme-emerald'
                        ? 'bg-[#059669] text-white'
                        : 'text-[var(--text-primary)]'
                    }`}
                  >
                    Emerald
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    handleSelectTheme('theme-crimson');
                    onResetState();
                    setMobileMenuOpen(false);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Demo Data</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
