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
  Sparkles,
  Award,
} from 'lucide-react';

interface TopBarAndNavProps {
  activePage: PageId;
  previousPage: PageId | null;
  onNavigate: (page: PageId) => void;
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
  qualifications: { title: 'Qualifications & Learnerships', section: 'Learnership Journey' },
  employers: { title: 'Training for Employers (HR & WSP)', section: 'Employer Journey' },
  'assessment-centre': { title: 'Assessment Centre & Venue Hire', section: 'Venue Client Journey' },
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
  { id: 'sitemap', label: 'Interactive Sitemap (All 15 Templates)', group: 'Governance & Support' },
];

export default function TopBarAndNav({
  activePage,
  previousPage,
  onNavigate,
  enrolledCount,
  onOpenTour,
  onOpenCertificateVerify,
  onResetState,
}: TopBarAndNavProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const currentMeta = PAGE_LABELS[activePage] || PAGE_LABELS.home;

  return (
    <div className="w-full bg-white border-b border-slate-200">
      {/* Strict 1-Row, 3-Zone Top Bar Contract */}
      <header className="max-w-[1360px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="text-lg sm:text-xl font-bold tracking-tight text-[#0B2545] hover:text-[#059669] transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Training Africa Academy
        </button>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => onNavigate('catalogue')}
            className={`hover:text-[#0B2545] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'catalogue' || activePage === 'course-detail'
                ? 'text-[#0B2545] font-semibold underline decoration-[#059669] decoration-2'
                : ''
            }`}
          >
            Courses
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pathways')}
            className={`hover:text-[#0B2545] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'pathways' || activePage === 'qualifications'
                ? 'text-[#0B2545] font-semibold underline decoration-[#059669] decoration-2'
                : ''
            }`}
          >
            Pathways
          </button>
          <button
            type="button"
            onClick={() => onNavigate('employers')}
            className={`hover:text-[#0B2545] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'employers'
                ? 'text-[#0B2545] font-semibold underline decoration-[#059669] decoration-2'
                : ''
            }`}
          >
            For Employers
          </button>
          <button
            type="button"
            onClick={() => onNavigate('assessment-centre')}
            className={`hover:text-[#0B2545] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'assessment-centre'
                ? 'text-[#0B2545] font-semibold underline decoration-[#059669] decoration-2'
                : ''
            }`}
          >
            Assessment Centre
          </button>
          <button
            type="button"
            onClick={() => onNavigate('online-learning')}
            className={`hover:text-[#0B2545] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activePage === 'online-learning'
                ? 'text-[#0B2545] font-semibold underline decoration-[#059669] decoration-2'
                : ''
            }`}
          >
            Online Learning
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#059669] hover:bg-[#047857] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            Learner Hub ({enrolledCount})
          </button>
        </div>
      </header>

      {/* Streamlined Breadcrumb Trail, 4-Audience Journey Lens & All-15-Pages Directory Bar */}
      <div className="bg-[#0B2545] text-slate-200 border-t border-slate-800">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Contextual Breadcrumb Trail & Step-Back */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {activePage !== 'home' && (
              <button
                type="button"
                onClick={() => onNavigate(previousPage || 'home')}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="text-slate-300 hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              Academy
            </button>
            <span aria-hidden="true" className="text-slate-500">
              /
            </span>
            <span className="text-slate-400 whitespace-nowrap shrink-0">
              {currentMeta.section}
            </span>
            <span aria-hidden="true" className="text-slate-500">
              /
            </span>
            <span className="text-[#F59E0B] font-semibold whitespace-nowrap shrink-0">
              {currentMeta.title}
            </span>
          </div>

          {/* Center: 4-Audience Quick Journey Switcher */}
          <div className="hidden xl:flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            <span className="text-slate-400 mr-1 whitespace-nowrap">Audience Lens:</span>
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'catalogue' || activePage === 'online-learning'
                  ? 'bg-[#059669] text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Individual Learner
            </button>
            <button
              type="button"
              onClick={() => onNavigate('employers')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'employers'
                  ? 'bg-[#059669] text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Employer & WSP
            </button>
            <button
              type="button"
              onClick={() => onNavigate('qualifications')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'qualifications'
                  ? 'bg-[#059669] text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Learnerships
            </button>
            <button
              type="button"
              onClick={() => onNavigate('assessment-centre')}
              className={`px-2 py-0.5 rounded whitespace-nowrap cursor-pointer ${
                activePage === 'assessment-centre'
                  ? 'bg-[#059669] text-white font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Venue Hire
            </button>
          </div>

          {/* Right: Certificate Verify, Guided Tour, Sitemap & 15-Page Directory */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenCertificateVerify}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span className="hidden sm:inline">Verify Certificate</span>
            </button>
            <button
              type="button"
              onClick={onOpenTour}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-[#F59E0B] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Guided Tour</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('sitemap')}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activePage === 'sitemap'
                  ? 'bg-[#F59E0B] text-[#0B2545]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <span>Sitemap</span>
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(!drawerOpen)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#059669] hover:bg-[#047857] text-white font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All 15 Pages</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  drawerOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Expandable 15-Page Directory Drawer */}
        {drawerOpen && (
          <div className="bg-[#0F2C59] border-t border-white/10 py-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1360px] mx-auto">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <p className="text-xs font-semibold text-[#F59E0B]">
                  Complete Redevelopment Architecture — Jump to Any of the 15 Page Templates or Reset Demo State
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      onResetState();
                      setDrawerOpen(false);
                    }}
                    className="inline-flex items-center gap-1 text-xs text-slate-300 hover:text-white cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Reset Persistent Demo Data</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    className="text-xs text-slate-300 hover:text-white cursor-pointer"
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
                        ? 'bg-[#059669] text-white font-semibold'
                        : 'bg-white/5 text-slate-200 hover:bg-white/15'
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
