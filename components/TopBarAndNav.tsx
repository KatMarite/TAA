'use client';

import React, { useState } from 'react';
import { PageId } from '@/lib/academy-data';
import {
  Compass,
  ChevronDown,
  LayoutGrid,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Award,
  Menu,
  X,
  ShieldCheck,
} from 'lucide-react';

interface TopBarAndNavProps {
  activePage: PageId;
  previousPage: PageId | null;
  onNavigate: (page: PageId) => void;
  onNavigateCourseFilter: (filterType: 'accredited' | 'short') => void;
  activeCourseFilter: 'all' | 'accredited' | 'short';
  enrolledCount: number;
  audienceMode: 'learner' | 'employer';
  onToggleAudienceMode: (mode: 'learner' | 'employer') => void;
  onOpenTour: () => void;
  onOpenCertificateVerify: () => void;
  onResetState: () => void;
}

const PAGE_LABELS: Record<PageId, { title: string; section: string }> = {
  home: { title: 'Home (Dual-Audience Gateway)', section: 'Core Gateway' },
  catalogue: { title: 'Find a Course / Catalogue', section: 'Course Discovery' },
  'course-detail': { title: 'Individual Course Detail', section: 'Course Discovery' },
  'online-learning': { title: 'Self-Paced Online Learning LMS', section: 'Learner Journey' },
  pathways: { title: 'Career & Learning Pathways', section: 'Learner Journey' },
  qualifications: { title: 'SETA Accredited Qualifications & Learnerships', section: 'Learnership Journey' },
  employers: { title: 'Training for Employers (HR & WSP)', section: 'Employer Journey' },
  'assessment-centre': { title: 'Assessment Centre & Venue Hire', section: 'Venue Client Journey' },
  'other-services': { title: 'Other Services (Relief Staff, Venue & WSP)', section: 'Specialist Services' },
  gallery: { title: 'Campus & Practical Training Gallery', section: 'Visual Showcase' },
  about: { title: 'About & Accreditations', section: 'Institutional Trust' },
  facilitators: { title: 'Facilitators & Training Approach', section: 'Institutional Trust' },
  resources: { title: 'Resources, Toolkits & FAQs', section: 'Institutional Trust' },
  news: { title: 'News & Industry Insights', section: 'Institutional Trust' },
  contact: { title: 'Contact & Campus Locations', section: 'Governance & Support' },
  policies: { title: 'Privacy, Terms & Learner Policies', section: 'Governance & Support' },
  dashboard: { title: 'Learner Dashboard & In-House CMS', section: 'Authenticated Hub' },
  sitemap: { title: 'Interactive 15-Page Sitemap', section: 'Architecture' },
};

const ALL_PAGES: { id: PageId; label: string; group: string }[] = [
  { id: 'home', label: '01. Home Gateway', group: 'Core Gateway' },
  { id: 'about', label: '02. About & Accreditations', group: 'Academy Trust' },
  { id: 'catalogue', label: '03. Find a Course / Catalogue', group: 'Core Gateway' },
  { id: 'course-detail', label: '04. Individual Course Detail', group: 'Core Gateway' },
  { id: 'online-learning', label: '05. Online Learning LMS Player', group: 'Learner Journey' },
  { id: 'employers', label: '06. Training for Employers', group: 'Corporate & Venue' },
  { id: 'qualifications', label: '07. Qualifications & Learnerships', group: 'Learner Journey' },
  { id: 'pathways', label: '08. Career / Learning Pathways', group: 'Learner Journey' },
  { id: 'assessment-centre', label: '09. Assessment Centre & Venue Hire', group: 'Corporate & Venue' },
  { id: 'facilitators', label: '10. Facilitators & Approach', group: 'Academy Trust' },
  { id: 'resources', label: '11. Resources & FAQs', group: 'Academy Trust' },
  { id: 'news', label: '12. News & Insights', group: 'Academy Trust' },
  { id: 'contact', label: '13. Contact & Locations', group: 'Governance & Support' },
  { id: 'policies', label: '14. Privacy, Terms & Policies', group: 'Governance & Support' },
  { id: 'dashboard', label: '15. Learner Dashboard & CMS', group: 'Governance & Support' },
  { id: 'other-services', label: 'Other Services (Relief Staff & WSP)', group: 'Corporate & Venue' },
  { id: 'gallery', label: 'Practical Training & Campus Gallery', group: 'Academy Trust' },
  { id: 'sitemap', label: 'Interactive Sitemap (All 15 Templates)', group: 'Governance & Support' },
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
}: TopBarAndNavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentMeta = PAGE_LABELS[activePage] || PAGE_LABELS.home;

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* FULL-WIDTH HORIZONTAL GLASSMORPHISM STICKY HEADER */}
      <div className="w-full bg-[#FCF9F8]/90 backdrop-blur-md border-b border-[#E5E7EB]">
        <header className="max-w-[1360px] mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3.5">
          {/* Left: Training Africa Academy Brand Mark */}
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D91B24] text-white flex items-center justify-center font-extrabold text-sm tracking-tighter shadow-xs">
              TAA
            </div>
            <div>
              <span className="block text-base sm:text-lg font-extrabold tracking-tight text-[#1C1B1B] group-hover:text-[#D91B24] transition-colors leading-none">
                Training Africa Academy
              </span>
              <span className="block text-[11px] font-medium text-[#52525B] mt-1 leading-none">
                Cleaning Africa Services (Pty) Ltd · Est. 2000
              </span>
            </div>
          </button>

          {/* Center: Clean Navigation Links (Home, About, Accredited Courses, Short Courses, Other Services, Gallery, Contact) */}
          <nav
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-6 text-sm font-semibold text-[#52525B]"
          >
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'home'
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => onNavigate('about')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'about'
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              About
            </button>
            <button
              type="button"
              onClick={() => onNavigateCourseFilter('accredited')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'qualifications' ||
                (activePage === 'catalogue' && activeCourseFilter === 'accredited')
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              Accredited Courses
            </button>
            <button
              type="button"
              onClick={() => onNavigateCourseFilter('short')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'catalogue' && activeCourseFilter === 'short'
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              Short Courses
            </button>
            <button
              type="button"
              onClick={() => onNavigate('other-services')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'other-services' ||
                activePage === 'employers' ||
                activePage === 'assessment-centre'
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              Other Services
            </button>
            <button
              type="button"
              onClick={() => onNavigate('gallery')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'gallery'
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              Gallery
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
                activePage === 'contact'
                  ? 'text-[#D91B24] font-bold underline decoration-2 underline-offset-8'
                  : 'hover:text-[#1C1B1B]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right: Primary High-Contrast CTA + Learner Hub + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('dashboard')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-[#1C1B1B] bg-white hover:bg-zinc-100 border border-[#E5E7EB] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Learner Hub ({enrolledCount})</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              Enquire Now
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="xl:hidden p-2 rounded-lg border border-[#E5E7EB] bg-white text-[#1C1B1B] hover:bg-zinc-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {/* Mobile / Tablet Navigation Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-t border-[#E5E7EB] px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Home', action: () => onNavigate('home') },
                { label: 'About', action: () => onNavigate('about') },
                { label: 'Accredited Courses', action: () => onNavigateCourseFilter('accredited') },
                { label: 'Short Courses', action: () => onNavigateCourseFilter('short') },
                { label: 'Other Services', action: () => onNavigate('other-services') },
                { label: 'Gallery', action: () => onNavigate('gallery') },
                { label: 'Contact', action: () => onNavigate('contact') },
                { label: `Learner Hub (${enrolledCount})`, action: () => onNavigate('dashboard') },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.action();
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2.5 text-xs font-bold text-left rounded-lg bg-[#FCF9F8] hover:bg-zinc-100 text-[#1C1B1B] border border-[#E5E7EB] cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECONDARY UTILITY BAR: Breadcrumb, Audience Portals & 15-Page Directory */}
      <div className="bg-[#18181B] text-zinc-200 border-b border-zinc-800">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Contextual Breadcrumb Trail & Step-Back */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {activePage !== 'home' && (
              <button
                type="button"
                onClick={() => onNavigate(previousPage || 'home')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
              </button>
            )}
            <span className="inline-flex items-center gap-1 text-zinc-400 whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D91B24]" />
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-white cursor-pointer"
              >
                Academy
              </button>
            </span>
            <span aria-hidden="true" className="text-zinc-600">
              /
            </span>
            <span className="text-zinc-400 whitespace-nowrap shrink-0">
              {currentMeta.section}
            </span>
            <span aria-hidden="true" className="text-zinc-600">
              /
            </span>
            <span className="text-white font-semibold whitespace-nowrap shrink-0">
              {currentMeta.title}
            </span>
          </div>

          {/* Center: Interactive Audience Portals Quick Switcher */}
          <div className="hidden lg:flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <span className="text-zinc-400 mr-1 whitespace-nowrap">Audience Portals:</span>
            <button
              type="button"
              onClick={() => onNavigate('online-learning')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'online-learning'
                  ? 'bg-[#D91B24] text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Self-Paced LMS Lab
            </button>
            <button
              type="button"
              onClick={() => onNavigate('employers')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'employers'
                  ? 'bg-[#D91B24] text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Employer & WSP
            </button>
            <button
              type="button"
              onClick={() => onNavigate('qualifications')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'qualifications'
                  ? 'bg-[#D91B24] text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Learnerships
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assessment-centre')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'assessment-centre'
                  ? 'bg-[#D91B24] text-white font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Venue Hire
            </button>
          </div>

          {/* Right: Verify Certificate, Guided Tour, Sitemap & All-Pages Drawer */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenCertificateVerify}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-[#D91B24]" />
              <span className="hidden md:inline">Verify Cert</span>
            </button>
            <button
              type="button"
              onClick={onOpenTour}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#D91B24]" />
              <span className="hidden sm:inline">Guided Tour</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('sitemap')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'sitemap'
                  ? 'bg-[#D91B24] text-white font-bold'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>Sitemap</span>
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#D91B24] hover:bg-[#B91C1C] text-white font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All Pages</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  drawerOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expandable Full Platform Directory Drawer */}
        {drawerOpen && (
          <div className="bg-[#1C1B1B] border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1360px] mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-xs font-semibold text-white">
                  Complete Platform Directory — Jump to Any Page Template, Portal, or Interactive Calculator
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      onResetState();
                      setDrawerOpen(false);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#D91B24]" />
                    <span>Reset Persistent Demo Data</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="text-xs text-zinc-300 hover:text-white cursor-pointer"
                  >
                    Close Directory ✕
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {ALL_PAGES.map((pg) => (
                  <button
                    key={pg.id}
                    type="button"
                    onClick={() => {
                      onNavigate(pg.id);
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs transition-colors cursor-pointer ${
                      activePage === pg.id
                        ? 'bg-[#D91B24] text-white font-semibold'
                        : 'bg-white/5 text-zinc-200 hover:bg-white/15'
                    }`}
                  >
                    <span className="truncate">{pg.label}</span>
                    {activePage === pg.id && (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
