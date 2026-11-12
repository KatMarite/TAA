'use client';

import React, { useState, useEffect, useRef } from 'react';
import { generateRecordId } from '@/lib/utils';
import { PageId } from '@/lib/academy-data';
import {
  MessageSquare,
  X,
  Send,
  Phone,
  Clock,
  CheckCircle2,
  UserCheck,
  Building2,
  Headphones,
  Calendar,
  GraduationCap,
  ArrowRight,
  Download,
} from 'lucide-react';

export type ChatDepartmentId = 'sales' | 'corporate' | 'support' | 'bookings';

interface DepartmentConfig {
  id: ChatDepartmentId;
  label: string;
  shortLabel: string;
  agentName: string;
  agentRole: string;
  email: string;
  ext: string;
  welcomeMessage: string;
  quickPrompts: { text: string; reply: string; targetPage?: PageId; targetLabel?: string }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  senderName: string;
  departmentId: ChatDepartmentId;
  text: string;
  timestamp: string;
  actionPage?: PageId;
  actionLabel?: string;
}

const DEPARTMENTS: DepartmentConfig[] = [
  {
    id: 'sales',
    label: 'Sales & Individual Course Enrolments',
    shortLabel: 'Sales & Enrolments',
    agentName: 'Thandiwe Nkosi',
    agentRole: 'Senior Admissions Advisor',
    email: 'admissions@trainingafricaacademy.co.za',
    ext: 'Ext. 101',
    welcomeMessage:
      'Hello! I am Thandiwe from Course Sales & Admissions. How can I help you choose or enrol in a qualification or short course today?',
    quickPrompts: [
      {
        text: 'Which course is best to start working quickly?',
        reply:
          'Our 2-Day Introduction to Professional Cleaning (Modules 1 & 2 Combined) at R1,450 is our fastest entry route—covering SABS colour-coding, MSDS chemical safety, and deep washroom sanitation. You can start online immediately or attend weekly Randburg practicals.',
        targetPage: 'catalogue',
        targetLabel: 'View Course in Catalogue',
      },
      {
        text: 'What are the fees for NQF Level 1 & Level 3 qualifications?',
        reply:
          'The NQF Level 1 Commercial Cleaner (120 Credits) is R14,800 individual (R12,400 group rate), and the NQF Level 3 Cleaning Practitioner supervisor qualification (126 Credits) is R18,500 individual (R15,900 group rate).',
        targetPage: 'qualifications',
        targetLabel: 'Inspect Qualifications & Intakes',
      },
      {
        text: 'How do I start my own cleaning company?',
        reply:
          'Our 5-Day Cleaning Enterprise Startup, Tendering & Marketing Masterclass (R4,250) teaches BCCCI-compliant per-square-metre pricing, CIPC/CSD compliance, and B2B contract bidding.',
        targetPage: 'pathways',
        targetLabel: 'View Entrepreneur Pathway',
      },
    ],
  },
  {
    id: 'corporate',
    label: 'Corporate Training, WSP & Relief Staff',
    shortLabel: 'Corporate & WSP',
    agentName: 'Mpho Mabena',
    agentRole: 'Corporate L&D & B-BBEE Specialist',
    email: 'corporate@trainingafricaacademy.co.za',
    ext: 'Ext. 102',
    welcomeMessage:
      'Welcome to the Corporate L&D Desk. I can assist with multi-staff quotes, R380/day vetted Relief Staff, and SARS Section 12H tax allowances.',
    quickPrompts: [
      {
        text: 'How does the R380/day Relief Staff option work?',
        reply:
          'Because we are a division of Cleaning Africa Services (Pty) Ltd, we deploy vetted, uniformed temporary cleaners to your facility at R380/day per operative while your permanent staff train—ensuring zero SLA disruption on site.',
        targetPage: 'employers',
        targetLabel: 'Calculate Quote with Relief Staff',
      },
      {
        text: 'Can we claim SARS Section 12H & SETA grants?',
        reply:
          'Yes! Host employers enrolling staff in our QCTO NQF Level 1, 3, or 4 learnerships can claim up to R80,000 in Section 12H tax deductions per learner (R120,000 for learners with disabilities), plus Services SETA mandatory/discretionary grants.',
        targetPage: 'employers',
        targetLabel: 'Open Section 12H ROI Calculator',
      },
      {
        text: 'Can you train our team on-site at our premises?',
        reply:
          'Yes, for cohorts of 8 or more employees, our registered facilitators and assessors conduct training directly on your premises anywhere in Gauteng or nationwide.',
        targetPage: 'employers',
        targetLabel: 'Book Corporate Cohort',
      },
    ],
  },
  {
    id: 'support',
    label: 'Learner & Online LMS Support',
    shortLabel: 'Learner Support',
    agentName: 'Sipho Khumalo',
    agentRole: 'LMS & Assessment Support Officer',
    email: 'support@trainingafricaacademy.co.za',
    ext: 'Ext. 103',
    welcomeMessage:
      'Hi there! I am Sipho from Learner & LMS Support. Need help with online modules, the Chemical Dilution Lab, or verifying a certificate?',
    quickPrompts: [
      {
        text: 'How do I access my self-paced online modules?',
        reply:
          'Once enrolled, your courses unlock immediately in the Online Learning Player. You can practice in the interactive Chemical Dilution & pH Safety Lab and complete your formative quiz from any mobile device or computer.',
        targetPage: 'online-learning',
        targetLabel: 'Open Online LMS Player',
      },
      {
        text: 'How can an employer verify my certificate?',
        reply:
          'Every Statement of Competency carries a unique reference code (e.g., TAA-CERT-2026-QCTO-CP-L3) that can be verified instantly via the Verify Certificate tool in the top bar or Learner Dashboard.',
        targetPage: 'dashboard',
        targetLabel: 'Go to Learner Dashboard',
      },
      {
        text: 'What if I need a re-assessment or RPL evaluation?',
        reply:
          'All learners receive one free remediation coaching session and re-assessment within 14 days if assessed as Not Yet Competent. Experienced operatives can also apply for Recognition of Prior Learning (RPL).',
        targetPage: 'policies',
        targetLabel: 'View Learner Policies',
      },
    ],
  },
  {
    id: 'bookings',
    label: 'Assessment Centre & Venue Hire',
    shortLabel: 'Venue Bookings',
    agentName: 'Annelize Botha',
    agentRole: 'Randburg Assessment Centre Coordinator',
    email: 'venues@trainingafricaacademy.co.za',
    ext: 'Ext. 104',
    welcomeMessage:
      'Good day! I coordinate bookings at our Northriding, Randburg Assessment Centre (Simulation Bay A, Solar PV Rig Bay B, and the 32-Seat EISA Suite).',
    quickPrompts: [
      {
        text: 'What are the daily hire rates for Randburg bays?',
        reply:
          'Practical Hygiene Simulation Bay A is R4,800/day (R2,900 half-day), the Outdoor Solar PV & Water-Fed Pole Rig Bay B is R5,400/day, and the 32-seat EISA Lecture Suite is R3,900/day—all with 100% solar/generator backup.',
        targetPage: 'assessment-centre',
        targetLabel: 'Check Venue Calendar & Rates',
      },
      {
        text: 'Can external SDPs book the centre for QCTO EISA?',
        reply:
          'Yes, accredited Skills Development Providers (SDPs) and trade test coordinators can reserve single or multiple dates on our interactive calendar and generate an instant formal quotation.',
        targetPage: 'assessment-centre',
        targetLabel: 'Open Interactive Venue Calendar',
      },
      {
        text: 'Where is the Assessment Centre located?',
        reply:
          'We are at Unit 14 Fancourt Office Park, Corner Northumberland & Felstead Rd, Northriding, Randburg, 2188, with secure bus and fleet parking.',
        targetPage: 'contact',
        targetLabel: 'View Campus Address & Contact',
      },
    ],
  },
];

function checkIsSastBusinessHours(): { isOpen: boolean; sastTimeStr: string } {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === 'weekday')?.value || 'Tue';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '10', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const totalMinutes = hour * 60 + minute;
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} SAST`;

    if (weekday === 'Sun') {
      return { isOpen: false, sastTimeStr: `${weekday} ${formattedTime}` };
    }
    if (weekday === 'Sat') {
      // Sat 08:00 (480) to 13:00 (780)
      return {
        isOpen: totalMinutes >= 480 && totalMinutes <= 780,
        sastTimeStr: `${weekday} ${formattedTime}`,
      };
    }
    // Mon–Fri 07:30 (450) to 16:30 (990)
    return {
      isOpen: totalMinutes >= 450 && totalMinutes <= 990,
      sastTimeStr: `${weekday} ${formattedTime}`,
    };
  } catch {
    return { isOpen: true, sastTimeStr: '10:30 SAST' };
  }
}

interface LiveChatWidgetProps {
  onNavigate: (page: PageId) => void;
}

export default function LiveChatWidget({ onNavigate }: LiveChatWidgetProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedDeptId, setSelectedDeptId] = useState<ChatDepartmentId>('sales');
  const [availabilityMode, setAvailabilityMode] = useState<'auto' | 'online' | 'after-hours'>('online');
  const [inputValue, setInputValue] = useState<string>('');
  const [unreadCount, setUnreadCount] = useState<number>(1);

  // Offline / After-Hours Callback Form State
  const [visitorName, setVisitorName] = useState<string>('');
  const [visitorEmail, setVisitorEmail] = useState<string>('');
  const [visitorPhone, setVisitorPhone] = useState<string>('');
  const [offlineNote, setOfflineNote] = useState<string>('');
  const [offlineTicketRef, setOfflineTicketRef] = useState<string>('');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'agent',
      senderName: 'Thandiwe Nkosi (Sales & Enrolments)',
      departmentId: 'sales',
      text: 'Hello! Welcome to Training Africa Academy. Select a department below (Sales, Corporate & WSP, Learner Support, or Venue Bookings) or ask us a question directly.',
      timestamp: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const sastStatus = checkIsSastBusinessHours();
  const isBusinessHoursOnline =
    availabilityMode === 'online'
      ? true
      : availabilityMode === 'after-hours'
      ? false
      : sastStatus.isOpen;

  const activeDept =
    DEPARTMENTS.find((d) => d.id === selectedDeptId) || DEPARTMENTS[0];

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle Escape key for accessibility
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen]);

  const handleSelectDepartment = (deptId: ChatDepartmentId) => {
    setSelectedDeptId(deptId);
    setOfflineTicketRef('');
    const dept = DEPARTMENTS.find((d) => d.id === deptId) || DEPARTMENTS[0];

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-dept-${prev.length + 1}`,
        sender: 'agent',
        senderName: `${dept.agentName} (${dept.shortLabel})`,
        departmentId: dept.id,
        text: dept.welcomeMessage,
        timestamp: sastStatus.sastTimeStr,
      },
    ]);
  };

  const generateAgentReply = (
    query: string,
    dept: DepartmentConfig
  ): { text: string; actionPage?: PageId; actionLabel?: string } => {
    const q = query.toLowerCase();

    if (q.includes('relief') || q.includes('380') || q.includes('staff')) {
      return {
        text: 'We provide vetted, uniformed Relief Staff at R380.00 per operative per day through Cleaning Africa Services while your permanent cleaners attend practical training. You can include Relief Staff in our 3-Step Group Quote Builder.',
        actionPage: 'employers',
        actionLabel: 'Open Employer Quote Builder',
      };
    }
    if (q.includes('12h') || q.includes('tax') || q.includes('b-bbee') || q.includes('seta') || q.includes('wsp')) {
      return {
        text: 'Our QCTO & Services SETA qualifications qualify for SARS Section 12H tax allowances (up to R80,000 deduction per learner, or R120,000 for learners with disabilities) plus mandatory/discretionary SETA grants.',
        actionPage: 'employers',
        actionLabel: 'Try Section 12H ROI Calculator',
      };
    }
    if (q.includes('solar') || q.includes('window')) {
      return {
        text: 'Our 3-Day Specialized Commercial Solar Panel & High-Reach Window Cleaning course is R3,450 individual (R2,850 group rate for 5+). It covers 0–10 ppm deionized water-fed pole systems and thermal shock prevention.',
        actionPage: 'catalogue',
        actionLabel: 'View Solar Cleaning Course',
      };
    }
    if (q.includes('venue') || q.includes('bay') || q.includes('randburg') || q.includes('hire') || q.includes('eisa')) {
      return {
        text: 'Our Northriding, Randburg Assessment Centre offers Simulation Bay A (R4,800/day), Solar PV Rig Bay B (R5,400/day), and the 32-Seat EISA Lecture Suite (R3,900/day). You can select dates on our live calendar.',
        actionPage: 'assessment-centre',
        actionLabel: 'Open Venue Booking Calendar',
      };
    }
    if (q.includes('learnership') || q.includes('nqf') || q.includes('qualification')) {
      return {
        text: 'We offer NQF Level 1 Commercial Cleaner (120 Credits, R14,800), NQF Level 3 Cleaning Practitioner (126 Credits, R18,500), and NQF Level 4 New Venture Creation (149 Credits, R22,500). Next intakes start January 2027.',
        actionPage: 'qualifications',
        actionLabel: 'Apply for a Learnership',
      };
    }
    if (q.includes('price') || q.includes('cost') || q.includes('fee') || q.includes('course')) {
      return {
        text: 'Our short courses start from R1,450 (Intro to Professional Cleaning Modules 1 & 2) up to R4,250 (Cleaning Enterprise Startup Masterclass), with discounted group rates for 5+ learners.',
        actionPage: 'catalogue',
        targetPage: 'catalogue',
        actionLabel: 'Browse All Course Prices',
      } as { text: string; actionPage?: PageId; actionLabel?: string };
    }

    return {
      text: `Thank you for reaching out to ${dept.label}. ${dept.agentName} (${dept.ext}) has logged your question. You can also call our Randburg desk directly on +27 (0)11 794 6665 or explore the relevant portal section below.`,
      actionPage:
        dept.id === 'corporate'
          ? 'employers'
          : dept.id === 'bookings'
          ? 'assessment-centre'
          : dept.id === 'support'
          ? 'online-learning'
          : 'catalogue',
      actionLabel: `Open ${dept.shortLabel} Page`,
    };
  };

  const handleSendQuickPrompt = (promptObj: {
    text: string;
    reply: string;
    targetPage?: PageId;
    targetLabel?: string;
  }) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-u-${prev.length + 1}`,
        sender: 'user',
        senderName: 'You',
        departmentId: activeDept.id,
        text: promptObj.text,
        timestamp: sastStatus.sastTimeStr,
      },
      {
        id: `msg-a-${prev.length + 2}`,
        sender: 'agent',
        senderName: `${activeDept.agentName} (${activeDept.shortLabel})`,
        departmentId: activeDept.id,
        text: promptObj.reply,
        timestamp: sastStatus.sastTimeStr,
        actionPage: promptObj.targetPage,
        actionLabel: promptObj.targetLabel,
      },
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const text = inputValue.trim();
    setInputValue('');

    const replyObj = generateAgentReply(text, activeDept);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-u-${prev.length + 1}`,
        sender: 'user',
        senderName: 'You',
        departmentId: activeDept.id,
        text,
        timestamp: sastStatus.sastTimeStr,
      },
      {
        id: `msg-a-${prev.length + 2}`,
        sender: 'agent',
        senderName: `${activeDept.agentName} (${activeDept.shortLabel})`,
        departmentId: activeDept.id,
        text: replyObj.text,
        timestamp: sastStatus.sastTimeStr,
        actionPage: replyObj.actionPage,
        actionLabel: replyObj.actionLabel,
      },
    ]);
  };

  const handleOfflineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !visitorEmail.trim() || !offlineNote.trim()) return;
    const refCode = generateRecordId('CHAT-2026');
    setOfflineTicketRef(refCode);

    try {
      const existing = JSON.parse(localStorage.getItem('taa_offline_chat_tickets') || '[]');
      existing.push({
        refCode,
        dept: activeDept.id,
        name: visitorName.trim(),
        email: visitorEmail.trim(),
        phone: visitorPhone.trim(),
        note: offlineNote.trim(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('taa_offline_chat_tickets', JSON.stringify(existing));
    } catch {
      // Ignore storage errors in private browsing
    }
  };

  const downloadChatTranscript = () => {
    const lines = messages
      .map((m) => `[${m.timestamp}] ${m.senderName}: ${m.text}`)
      .join('\n\n');
    const content = `TRAINING AFRICA ACADEMY — LIVE CHAT TRANSCRIPT
Routed Desk: ${activeDept.label} (${activeDept.agentName} · ${activeDept.email})
Campus Phone: +27 (0)11 794 6665 | WhatsApp: +27 (0)82 539 8605
====================================================================

${lines}
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Training_Africa_Academy_Chat_Transcript.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDeptIcon = (id: ChatDepartmentId) => {
    switch (id) {
      case 'sales':
        return <GraduationCap className="w-3.5 h-3.5" />;
      case 'corporate':
        return <Building2 className="w-3.5 h-3.5" />;
      case 'support':
        return <Headphones className="w-3.5 h-3.5" />;
      case 'bookings':
        return <Calendar className="w-3.5 h-3.5" />;
    }
  };

  return (
    <>
      {/* Floating WhatsApp Quick-Chat Button + Live Chat Concierge Trigger in Bottom-Right Corner */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
        {!isOpen && (
          <>
            {/* Floating WhatsApp Quick-Chat Button */}
            <a
              href="https://wa.me/27825398605?text=Hello%20Training%20Africa%20Academy%2C%20I%20would%20like%20to%20enquire%20about%20courses%20and%20training."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Training Africa Academy on WhatsApp (+27 82 539 8605)"
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#15803D] hover:bg-[#166534] text-white shadow-lg border border-white/20 transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4 shrink-0" />
              <span className="text-xs font-bold tracking-tight">
                WhatsApp Quick Chat · 082 539 8605
              </span>
            </a>

            {/* Business-Hours Live Help & Department Routing Trigger */}
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setUnreadCount(0);
              }}
              aria-label="Open Training Africa Academy Live Chat and Department Routing"
              aria-expanded={isOpen}
              className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-[#18181B] hover:bg-zinc-800 text-white shadow-xl border border-white/15 transition-all cursor-pointer min-h-[48px]"
            >
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-white shrink-0">
                <MessageSquare className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-[#18181B] text-[10px] font-bold flex items-center justify-center font-mono">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="text-left pr-1">
                <p className="text-xs font-bold leading-tight text-white">
                  Live Help & Routing Desk
                </p>
                <p className="text-[11px] text-zinc-300 leading-tight mt-0.5">
                  Sales · Corporate · Support · Bookings
                </p>
              </div>
            </button>
          </>
        )}
      </div>

      {/* Responsive & Accessible Chat Dialog Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Training Africa Academy Live Support and Department Routing Chat"
          className="fixed bottom-20 md:bottom-6 right-2 left-2 sm:left-auto sm:right-6 z-50 sm:w-[420px] max-h-[80vh] bg-white border border-[#E5E7EB] rounded-xl shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Header: Brand, Business Hours Status & Simulator Toggle */}
          <div className="bg-[#18181B] text-white px-4 py-3.5 shrink-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {isBusinessHoursOnline
                      ? 'Business Hours Active (Mon–Fri 07:30–16:30 SAST)'
                      : 'After-Hours Callback Desk (Opens 07:30 SAST)'}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-white mt-0.5">
                  Training Africa Academy — Live Concierge
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize live chat window"
                className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Business Hours Mode Selector (Lets user test Online vs After-Hours behaviour) */}
            <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-300">Hours Mode:</span>
              <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-md">
                <button
                  type="button"
                  onClick={() => setAvailabilityMode('online')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    isBusinessHoursOnline
                      ? 'bg-[#D91B24] text-white font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  During Business Hours
                </button>
                <button
                  type="button"
                  onClick={() => setAvailabilityMode('after-hours')}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    !isBusinessHoursOnline
                      ? 'bg-[#F59E0B] text-[#1C1B1B] font-semibold'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  After-Hours Form
                </button>
              </div>
            </div>
          </div>

          {/* 4-Department Routing Selector Tabs */}
          <div className="bg-[#FCF9F8] border-b border-[#E5E7EB] px-3 py-2.5 shrink-0">
            <p className="text-[11px] font-semibold text-[#52525B] mb-1.5">
              Route Your Query to the Right Specialist Desk:
            </p>
            <div className="grid grid-cols-2 gap-1.5" role="tablist" aria-label="Chat Departments">
              {DEPARTMENTS.map((dept) => {
                const isSelected = dept.id === selectedDeptId;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectDepartment(dept.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer border ${
                      isSelected
                        ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                        : 'bg-white text-slate-700 border-[#E5E7EB] hover:border-[#D91B24]'
                    }`}
                  >
                    <span className={isSelected ? 'text-[#F59E0B]' : 'text-[#D91B24]'}>
                      {getDeptIcon(dept.id)}
                    </span>
                    <span className="truncate">{dept.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Specialist Card */}
            <div className="mt-2 pt-2 border-t border-[#E5E7EB]/80 flex items-center justify-between text-[11px] text-[#52525B]">
              <div className="flex items-center gap-1.5 truncate">
                <UserCheck className="w-3.5 h-3.5 text-[#D91B24] shrink-0" />
                <span className="truncate">
                  <strong className="text-[#1C1B1B]">{activeDept.agentName}</strong> ·{' '}
                  {activeDept.agentRole}
                </span>
              </div>
              <span className="font-mono text-[#52525B] shrink-0 ml-2">
                {activeDept.ext}
              </span>
            </div>
          </div>

          {/* BODY: Live Chat (During Business Hours) OR Priority Callback Ticket Form (After Hours) */}
          {isBusinessHoursOnline ? (
            <>
              {/* Message Feed */}
              <div
                aria-live="polite"
                className="flex-1 overflow-y-auto p-4 space-y-3 bg-white max-h-[310px]"
              >
                {messages.map((msg) => {
                  const isUser = msg.sender === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        isUser ? 'items-end' : 'items-start'
                      }`}
                    >
                      <span className="text-[10px] text-slate-400 mb-0.5 px-1">
                        {msg.senderName} · {msg.timestamp}
                      </span>
                      <div
                        className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                          isUser
                            ? 'bg-[#D91B24] text-white'
                            : 'bg-[#FCF9F8] text-[#1C1B1B] border border-[#E5E7EB]'
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.actionPage && msg.actionLabel && (
                          <button
                            type="button"
                            onClick={() => {
                              if (msg.actionPage) onNavigate(msg.actionPage);
                            }}
                            className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1C1B1B] text-white text-[11px] font-semibold hover:bg-[#27272A] transition-colors cursor-pointer"
                          >
                            <span>{msg.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Department Quick Prompts */}
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-[11px] font-semibold text-[#52525B] mb-1.5">
                    Common {activeDept.shortLabel} Questions (Click to Ask):
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {activeDept.quickPrompts.map((qp, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => handleSendQuickPrompt(qp)}
                        className="text-left text-xs px-3 py-1.5 rounded-lg bg-[#FCF9F8] hover:bg-[#FEF2F2] text-[#1C1B1B] border border-[#E5E7EB] hover:border-[#D91B24] transition-colors cursor-pointer"
                      >
                        {qp.text}
                      </button>
                    ))}
                  </div>
                </div>

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={handleSendMessage}
                className="p-3 bg-[#FCF9F8] border-t border-[#E5E7EB] flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Message ${activeDept.shortLabel}...`}
                  aria-label={`Type your message to ${activeDept.label}`}
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#D91B24] text-[#1C1B1B]"
                />
                <button
                  type="submit"
                  aria-label="Send chat message"
                  className="px-3.5 py-2 bg-[#D91B24] hover:bg-[#B91C1C] text-white rounded-lg inline-flex items-center justify-center cursor-pointer shrink-0 min-h-[36px]"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </>
          ) : (
            /* AFTER-HOURS / OFFLINE CALLBACK & PRIORITY ROUTING FORM */
            <div className="p-4 overflow-y-auto space-y-4 bg-white max-h-[360px]">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-950 space-y-1">
                <p className="font-bold">
                  Our Live Specialists Are Currently Offline
                </p>
                <p>
                  Standard Hours: <strong>Mon–Fri 07:30–16:30 SAST</strong> ·{' '}
                  <strong>Sat Practicals 08:00–13:00 SAST</strong>. Leave your details for{' '}
                  <strong>{activeDept.label}</strong> and {activeDept.agentName} will respond first thing at 07:30.
                </p>
              </div>

              {offlineTicketRef ? (
                <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs text-[#991B1B] space-y-2">
                  <div className="flex items-center gap-2 text-[#991B1B] font-bold text-sm">
                    <CheckCircle2 className="w-4 h-4 text-[#D91B24]" />
                    <span>Priority Enquiry Logged — {offlineTicketRef}</span>
                  </div>
                  <p>
                    Routed to: <strong>{activeDept.label}</strong> ({activeDept.email})
                  </p>
                  <p>
                    Contact: <strong>{visitorName}</strong> ({visitorEmail})
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setOfflineTicketRef('');
                      setOfflineNote('');
                    }}
                    className="mt-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#1C1B1B] rounded-lg cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOfflineSubmit} className="space-y-3 text-xs">
                  <div>
                    <label
                      htmlFor="chat-off-name"
                      className="block font-medium text-slate-700 mb-1"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="chat-off-name"
                      type="text"
                      required
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      placeholder="Full Name"
                      className="w-full px-3 py-2 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label
                        htmlFor="chat-off-email"
                        className="block font-medium text-slate-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        id="chat-off-email"
                        type="email"
                        required
                        value={visitorEmail}
                        onChange={(e) => setVisitorEmail(e.target.value)}
                        placeholder="you@company.co.za"
                        className="w-full px-3 py-2 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="chat-off-phone"
                        className="block font-medium text-slate-700 mb-1"
                      >
                        Mobile / WhatsApp
                      </label>
                      <input
                        id="chat-off-phone"
                        type="tel"
                        value={visitorPhone}
                        onChange={(e) => setVisitorPhone(e.target.value)}
                        placeholder="+27 82 000 0000"
                        className="w-full px-3 py-2 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="chat-off-note"
                      className="block font-medium text-slate-700 mb-1"
                    >
                      How can {activeDept.shortLabel} help you? *
                    </label>
                    <textarea
                      id="chat-off-note"
                      rows={3}
                      required
                      value={offlineNote}
                      onChange={(e) => setOfflineNote(e.target.value)}
                      placeholder="Course name, number of staff, or preferred Randburg venue dates..."
                      className="w-full px-3 py-2 bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
                  >
                    Schedule Next-Morning Callback ({activeDept.shortLabel})
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Direct Contact Channels Footer */}
          <div className="bg-slate-100 border-t border-[#E5E7EB] px-4 py-2 flex items-center justify-between text-[11px] text-[#52525B] shrink-0">
            <div className="flex items-center gap-3">
              <a
                href="tel:+27117946665"
                className="inline-flex items-center gap-1 hover:text-[#1C1B1B] font-medium"
              >
                <Phone className="w-3 h-3 text-[#D91B24]" />
                <span className="font-mono">+27 11 794 6665</span>
              </a>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-[#52525B]">WhatsApp: 082 539 8605</span>
            </div>
            <button
              type="button"
              onClick={downloadChatTranscript}
              title="Download Chat Transcript"
              className="inline-flex items-center gap-1 text-[#1C1B1B] hover:text-[#D91B24] font-semibold cursor-pointer"
            >
              <Download className="w-3 h-3" />
              <span>Save Chat</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
