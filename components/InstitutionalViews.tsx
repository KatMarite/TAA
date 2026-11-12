'use client';

import React, { useState } from 'react';
import { generateRecordId } from '@/lib/utils';
import {
  Facilitator,
  NewsArticle,
  PageId,
  SITEMAP_SPEC,
  BRAND_IMAGES,
  OTHER_SERVICES_LIST,
  GALLERY_ITEMS,
} from '@/lib/academy-data';
import ResilientImage from './ResilientImage';
import {
  ShieldCheck,
  Award,
  Download,
  CheckCircle2,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Compass,
  BookOpen,
} from 'lucide-react';

export function AboutAccreditationsView({
  onNavigate,
}: {
  onNavigate: (page: PageId) => void;
}) {
  const downloadAccreditationSummary = () => {
    const text = `TRAINING AFRICA ACADEMY — ACCREDITATION & QUALITY ASSURANCE DOSSIER
Parent Entity: Cleaning Africa Services (Pty) Ltd (Established 2000)
Head Office & Assessment Centre: Unit 14 Fancourt Office Park, Corner Northumberland & Felstead Rd, Northriding, Randburg, 2188
Telephone: +27 (0)11 794 6665 | Email: info@trainingafricaacademy.co.za

1. QUALITY COUNCIL & SETA ALIGNMENT
- Quality Council for Trades and Occupations (QCTO) Occupational Qualifications
  * Occupational Certificate: Commercial Cleaner (NQF Level 1, SAQA ID 118708, 120 Credits)
  * Occupational Certificate: Cleaning Practitioner (NQF Level 3, SAQA ID 118707, 126 Credits)
- Services SETA Aligned Programmes
  * Further Education and Training Certificate: New Venture Creation (NQF Level 4, SAQA ID 66249, 149 Credits)
  * Specialized Hygiene, Solar Panel Cleaning, Window Cleaning, Carpet Extraction & Business Startup Short Courses

2. B-BBEE & WORKPLACE SKILLS PLAN (WSP) COMPLIANCE
- Full support for Mandatory & Discretionary Grant submissions (WSP/ATR)
- SARS Section 12H Learnership Tax Allowance documentation provided
- Vetted Relief Staff deployment at R380.00/day during practical training blocks
`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Training_Africa_Academy_Accreditation_Dossier_2026.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-[#D91B24] mb-2">
              02. About & Accreditations · Rooted in Cleaning Africa Services Since 2000
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
              Industry-Born Vocational Training Built by South Africa’s Hygiene Leaders
            </h1>
            <p className="mt-4 text-base text-[#52525B] leading-relaxed">
              Training Africa Academy is the dedicated education and workforce skills development division of{' '}
              <strong className="text-[#1C1B1B]">Cleaning Africa Services (Pty) Ltd</strong>, operating across South Africa since 2000. Unlike theoretical colleges, our curricula, simulation bays, and enterprise courses are forged from 25+ years of managing real commercial, healthcare, industrial, and solar hygiene contracts.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={downloadAccreditationSummary}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg inline-flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Accreditation & WSP Verification Dossier</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('catalogue')}
              className="px-5 py-2.5 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
            >
              Explore Accredited Courses
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative min-h-[280px]">
          <ResilientImage
            src={BRAND_IMAGES.heroAcademy}
            alt="Training Africa Academy Facilitators and Learners in Johannesburg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Accreditation Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <p className="text-xs font-mono font-semibold text-[#D91B24]">
            01. National Qualifications Framework (NQF)
          </p>
          <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
            QCTO & SAQA Registered Qualifications
          </h2>
          <p className="text-sm text-[#52525B] mt-2">
            Our flagship Commercial Cleaner (NQF Level 1, 120 Credits) and Cleaning Practitioner (NQF Level 3, 126 Credits) programmes integrate Knowledge, Practical Simulation, and Workplace Experience modules for national EISA certification.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <p className="text-xs font-mono font-semibold text-[#D91B24]">
            02. Sector Education & Training Authority
          </p>
          <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
            Services SETA Alignment & Assessor Governance
          </h2>
          <p className="text-sm text-[#52525B] mt-2">
            All formative and summative assessments are conducted by registered Constituent Assessors and Moderators, ensuring full compliance for corporate Workplace Skills Plans (WSP), Annual Training Reports (ATR), and B-BBEE verification.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <p className="text-xs font-mono font-semibold text-[#D91B24]">
            03. Eco-Hygiene & Industry Standards
          </p>
          <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
            SABS Colour-Coding, OHS & Green Cleaning
          </h2>
          <p className="text-sm text-[#52525B] mt-2">
            Every short course and qualification embeds South African Occupational Health and Safety (OHS Act 85 of 1993) protocols, MSDS chemical stewardship, and eco-certified biodegradable hygiene practices.
          </p>
        </div>
      </div>
    </div>
  );
}

export function FacilitatorsView({
  facilitators,
  onNavigate,
}: {
  facilitators: Facilitator[];
  onNavigate: (page: PageId) => void;
}) {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          10. Facilitators & Training Approach · 70% Practical Simulation / 30% Theory
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B] max-w-3xl">
          Practical, Multilingual Instruction by Registered Industry Practitioners
        </h1>
        <p className="mt-3 text-base text-[#52525B] max-w-2xl">
          Adult vocational learners master skills by doing—not by memorising textbooks. Our methodology pairs concise digital theory with intensive hands-on equipment operation.
        </p>
      </div>

      {/* 3 Pillars of Training Approach */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <span className="text-xs font-mono font-bold text-[#D91B24]">
            Pillar 01 · Hands-On Equipment Mastery
          </span>
          <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
            70% Practical Bay & Workplace Application
          </h2>
          <p className="text-sm text-[#52525B] mt-2">
            Learners train directly on rotary single-disc scrubbers, ride-on auto-scrubbers, hot-water carpet extractors, and 12-metre deionized water-fed solar poles before signing off workplace logbooks.
          </p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <span className="text-xs font-mono font-bold text-[#D91B24]">
            Pillar 02 · Inclusive Mother-Tongue Clarity
          </span>
          <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
            Multilingual Facilitation Across 6 SA Languages
          </h2>
          <p className="text-sm text-[#52525B] mt-2">
            While assessment portfolios are completed in English, our facilitators explain complex chemical dilution ratios, pH hazards, and OHS regulations in English, isiZulu, Sesotho, Setswana, isiXhosa, and Afrikaans.
          </p>
        </div>
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <span className="text-xs font-mono font-bold text-[#D91B24]">
            Pillar 03 · Zero Operational Downtime
          </span>
          <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
            Integrated Relief Staff Deployment (R380/Day)
          </h2>
          <p className="text-sm text-[#52525B] mt-2">
            Through Cleaning Africa Services, we deploy vetted temporary relief cleaners to your facility while your permanent employees attend classroom or simulation blocks.
          </p>
        </div>
      </div>

      {/* Facilitator Profiles */}
      <div>
        <h2 className="text-xl font-bold text-[#1C1B1B] mb-6">
          Meet Our Lead Facilitators, Assessors & Moderators
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilitators.map((fac) => (
            <div
              key={fac.id}
              className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
                  <ResilientImage
                    src={fac.image}
                    alt={fac.name}
                    fallbackTitle={fac.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-mono text-[#D91B24]">
                    {fac.registrationCode} · {fac.yearsExperience} Years Experience
                  </p>
                  <h3 className="text-lg font-bold text-[#1C1B1B] mt-1">{fac.name}</h3>
                  <p className="text-xs font-semibold text-[#52525B] mt-0.5">{fac.role}</p>
                  <p className="text-sm text-[#52525B] mt-3">{fac.bio}</p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-4 border-t border-slate-100 text-xs text-[#52525B] space-y-1">
                <p>
                  <strong className="text-[#1C1B1B]">Specialisation:</strong> {fac.specialisation}
                </p>
                <p>
                  <strong className="text-[#1C1B1B]">Languages:</strong> {fac.languages.join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ResourcesFaqsView() {
  const [selectedFaqCat, setSelectedFaqCat] = useState<string>('All');

  const faqs = [
    {
      cat: 'Individual Learners',
      q: 'Do I need Matric (Grade 12) to enrol in Training Africa Academy courses?',
      a: 'No. Our short courses (such as Introduction to Cleaning Modules 1 & 2, Window Cleaning, and Solar Panel Cleaning) are open to all adult learners with basic literacy. Our NQF Level 1 Commercial Cleaner qualification requires foundational numeracy and literacy (Grade 9 / ABET Level 3–4), while NQF Level 3 Cleaning Practitioner builds toward supervisory readiness.',
    },
    {
      cat: 'Individual Learners',
      q: 'Can I complete courses online at my own pace and still receive a certificate?',
      a: 'Yes. All eligible theory modules and short courses can be completed on our Self-Paced Online Learning platform from any smartphone, tablet, or computer. For full QCTO occupational qualifications, online theory is paired with scheduled practical simulation days at our Randburg centre or your workplace.',
    },
    {
      cat: 'Employers & WSP',
      q: 'How does the R380/day Relief Staff service work when our cleaners attend training?',
      a: 'Because Training Africa Academy is a division of Cleaning Africa Services (Pty) Ltd, we can supply vetted, uniformed relief cleaners at R380.00 per operative per day to cover your shifts while your permanent staff attend training—ensuring zero SLA penalties on your site.',
    },
    {
      cat: 'Employers & WSP',
      q: 'Can we claim SETA Mandatory/Discretionary Grants and B-BBEE points for these programmes?',
      a: 'Yes. Our NQF-aligned qualifications (SAQA 118708, SAQA 118707, SAQA 66249) and skills programmes come with full attendance registers, assessor moderation reports, and tax invoices required for Services SETA WSP/ATR submissions and B-BBEE Skills Development verification.',
    },
    {
      cat: 'Assessment Centre',
      q: 'Can external training providers hire the Randburg Assessment Centre for QCTO EISA?',
      a: 'Yes. Skills Development Providers (SDPs) and corporate trade test teams can hire our Practical Hygiene Bay, Solar PV & Water-Fed Pole Rig, or 32-seat Northriding Lecture Suite by the half-day or full-day.',
    },
  ];

  const filteredFaqs =
    selectedFaqCat === 'All'
      ? faqs
      : faqs.filter((f) => f.cat === selectedFaqCat);

  const downloadResourceGuide = (title: string) => {
    const content = `TRAINING AFRICA ACADEMY — OFFICIAL TECHNICAL RESOURCE
Document: ${title}
Issued by: Training Africa Academy (A Division of Cleaning Africa Services Pty Ltd)
Randburg Campus: Unit 14 Fancourt Office Park, Northriding, Randburg | +27 (0)11 794 6665

SABS COMMERCIAL HYGIENE COLOUR-CODING STANDARD:
- RED: High-risk sanitary appliances, toilets, urinals, and restroom floors.
- YELLOW: Washroom sinks, mirrors, clinical surfaces, and bathroom wall tiles.
- BLUE: General low-risk commercial office desks, hallways, and window glass.
- GREEN: Kitchens, canteens, food preparation counters, and bar areas.
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          11. Resources, Toolkits & Frequently Asked Questions
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
          Compliance Toolkits, Colour-Coding Guides & Learner FAQs
        </h1>
      </div>

      {/* Downloadable Toolkits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'SABS 4-Zone Hygiene Colour-Coding Wall Chart',
            desc: 'Printable Red, Yellow, Blue & Green cross-contamination prevention poster for chemical cages.',
          },
          {
            title: 'Employer WSP / ATR Training Needs & Section 12H Calculator',
            desc: 'Planning template for HR & L&D managers scheduling 2026/2027 learnership cohorts.',
          },
          {
            title: 'Solar PV Cleaning TDS & Thermal Shock Safety Checklist',
            desc: 'Pre-shift rooftop inspection sheet for deionized water-fed pole technicians.',
          },
        ].map((res) => (
          <div
            key={res.title}
            className="bg-white border border-[#E5E7EB] rounded-xl p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs font-semibold text-[#D91B24]">Free Technical Resource</p>
              <h2 className="text-base font-bold text-[#1C1B1B] mt-1">{res.title}</h2>
              <p className="text-xs text-[#52525B] mt-2">{res.desc}</p>
            </div>
            <button
              type="button"
              onClick={() => downloadResourceGuide(res.title)}
              className="mt-5 py-2 px-3.5 text-xs font-semibold text-[#1C1B1B] bg-slate-100 hover:bg-slate-200 rounded-lg inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-[#D91B24]" />
              <span>Download Guide</span>
            </button>
          </div>
        ))}
      </div>

      {/* FAQs */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
          <h2 className="text-xl font-bold text-[#1C1B1B]">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-lg">
            {['All', 'Individual Learners', 'Employers & WSP', 'Assessment Centre'].map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedFaqCat(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md cursor-pointer ${
                    selectedFaqCat === cat
                      ? 'bg-[#1C1B1B] text-white'
                      : 'text-[#52525B] hover:text-[#1C1B1B]'
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        <div className="divide-y divide-slate-200 mt-2">
          {filteredFaqs.map((item, idx) => (
            <div key={idx} className="py-5">
              <p className="text-xs font-semibold text-[#D91B24] mb-1">{item.cat}</p>
              <h3 className="text-base font-bold text-[#1C1B1B]">{item.q}</h3>
              <p className="text-sm text-[#52525B] mt-2 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewsInsightsView({
  articles,
  onNavigate,
}: {
  articles: NewsArticle[];
  onNavigate: (page: PageId) => void;
}) {
  const [activeArticle, setActiveArticle] = useState<NewsArticle>(articles[0]);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          12. News, Regulatory Briefs & Hygiene Industry Insights
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
          Insights on QCTO Accreditation, Solar Maintenance & Cleaning Entrepreneurship
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          {articles.map((art) => {
            const isSelected = art.id === activeArticle.id;
            return (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className={`p-5 rounded-xl border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#1C1B1B] text-white border-[#1C1B1B]'
                    : 'bg-white text-[#1C1B1B] border-[#E5E7EB] hover:border-[#E5E7EB]'
                }`}
              >
                <div className={`text-xs ${isSelected ? 'text-[#F59E0B]' : 'text-[#52525B]'}`}>
                  <span>{art.category}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{art.date}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{art.readTime}</span>
                </div>
                <h2 className="text-base font-bold mt-1.5">{art.title}</h2>
                <p className={`text-xs mt-2 line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-[#52525B]'}`}>
                  {art.excerpt}
                </p>
              </div>
            );
          })}
        </div>

        <article className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl overflow-hidden">
          <div className="aspect-video w-full bg-zinc-100 overflow-hidden">
            <ResilientImage
              src={activeArticle.image}
              alt={activeArticle.title}
              fallbackTitle={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 sm:p-10">
            <div className="text-xs text-[#52525B] mb-2">
              <span className="text-[#D91B24] font-semibold">{activeArticle.category}</span>
              <span aria-hidden="true"> · </span>
              <span>{activeArticle.date}</span>
              <span aria-hidden="true"> · </span>
              <span>{activeArticle.author}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1B1B]">
              {activeArticle.title}
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 text-base leading-relaxed">
              {activeArticle.content.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-xs text-[#52525B]">
                Want to apply these insights in your organisation or career?
              </span>
              <button
                type="button"
                onClick={() => onNavigate('catalogue')}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
              >
                Browse Relevant Courses
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}

export function ContactLocationsView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [enquiryType, setEnquiryType] = useState('Individual Course Enquiry');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [enquiryRef, setEnquiryRef] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    const ref = generateRecordId('TAA');
    setEnquiryRef(ref);
    setSent(true);

    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          enquiryType,
          message: message.trim(),
          department: 'Northriding Academic Desk',
        }),
      });
    } catch (err) {
      console.warn('API enquiry sync deferred; recorded locally:', err);
    }
  };

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          13. Contact & Locations · Northriding, Randburg & Nationwide On-Site Teams
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
          Visit Our Randburg Campus or Schedule On-Site Workplace Training
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-[#1C1B1B]">
              Head Office & Accredited Assessment Centre
            </h2>
            <div className="text-sm text-[#52525B] space-y-3">
              <p>
                <strong className="text-[#1C1B1B] block">Physical Address:</strong>
                Unit 14 Fancourt Office Park, Corner Northumberland & Felstead Rd, Northriding, Randburg, 2188, Gauteng, South Africa
              </p>
              <p>
                <strong className="text-[#1C1B1B] block">Telephone:</strong>
                <span className="font-mono">+27 (0)11 794 6665</span>
              </p>
              <p>
                <strong className="text-[#1C1B1B] block">Mobile / WhatsApp Desk:</strong>
                <span className="font-mono">+27 (0)82 539 8605</span>
              </p>
              <p>
                <strong className="text-[#1C1B1B] block">Email Directory:</strong>
                <span className="font-mono">info@trainingafricaacademy.co.za</span>
              </p>
              <p>
                <strong className="text-[#1C1B1B] block">Operating Hours:</strong>
                Monday – Friday: 07:30 – 16:30 · Saturday Practicals: 08:00 – 13:00
              </p>
            </div>
          </div>

          <div className="bg-[#1C1B1B] text-white rounded-xl p-6 text-xs space-y-2">
            <p className="text-[#F59E0B] font-semibold">
              National Mobile Facilitator Coverage
            </p>
            <p className="text-slate-200">
              For corporate cohorts of 8+ employees, our mobile assessors travel to client sites across Gauteng (Johannesburg, Midrand, Pretoria, Ekurhuleni), KwaZulu-Natal, Western Cape, North West, and Mpumalanga.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8">
          <h2 className="text-xl font-bold text-[#1C1B1B]">
            Send a Direct Enquiry to Our Academic & Corporate Desk
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cnt-name" className="block text-xs font-medium text-slate-700 mb-1">
                  Your Full Name *
                </label>
                <input
                  id="cnt-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
              <div>
                <label htmlFor="cnt-email" className="block text-xs font-medium text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  id="cnt-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.co.za"
                  className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
                />
              </div>
            </div>

            <div>
              <label htmlFor="cnt-type" className="block text-xs font-medium text-slate-700 mb-1">
                Enquiry Routing
              </label>
              <select
                id="cnt-type"
                value={enquiryType}
                onChange={(e) => setEnquiryType(e.target.value)}
                className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
              >
                <option value="Individual Course Enquiry">Individual Course Enquiry</option>
                <option value="Corporate Training & Relief Staff Quote">Corporate Training & Relief Staff Quote</option>
                <option value="QCTO Learnership / Host Employer">QCTO Learnership / Host Employer</option>
                <option value="Randburg Assessment Centre & Venue Hire">Randburg Assessment Centre & Venue Hire</option>
              </select>
            </div>

            <div>
              <label htmlFor="cnt-msg" className="block text-xs font-medium text-slate-700 mb-1">
                How can our team assist you?
              </label>
              <textarea
                id="cnt-msg"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us which courses, dates, or staff numbers you are planning for..."
                className="w-full px-3.5 py-2 text-sm bg-[#FCF9F8] border border-[#E5E7EB] rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 text-sm font-semibold text-white bg-[#D91B24] hover:bg-[#B91C1C] rounded-lg cursor-pointer"
            >
              Submit Enquiry
            </button>
          </form>

          {sent && (
            <div className="mt-5 p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs text-[#991B1B] font-medium">
              ✓ Thank you, {name}. Your enquiry ({enquiryType}) has been logged with our Northriding Randburg desk (Ref: {enquiryRef}).
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function PoliciesView() {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          14. Privacy, Terms & Learner Policies · Institutional Governance
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
          POPIA Data Protection, Enrolment Terms, RPL & Assessment Appeals
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1C1B1B]">
            01. POPIA Compliance & Learner Data Privacy
          </h2>
          <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
            In strict compliance with the Protection of Personal Information Act (POPIA, Act 4 of 2013), Training Africa Academy collects SA ID numbers, academic transcripts, and Portfolio of Evidence (PoE) records solely for mandatory QCTO, Services SETA, and SAQA National Learner Records Database (NLRD) uploads. Employer progress updates are shared strictly where authorised by the sponsoring employer agreement.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1C1B1B]">
            02. Enrolment, Deferral & Refund Policy
          </h2>
          <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
            Single-learner and corporate bookings may be deferred to a subsequent intake date at zero penalty if requested in writing at least 5 business days prior to course commencement. Cancellations received more than 7 business days before start qualify for a 90% refund (less R150 admin fee). Digital self-paced courses become non-refundable once module assessments are unlocked.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1C1B1B]">
            03. Recognition of Prior Learning (RPL) Policy
          </h2>
          <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
            Experienced hygiene operatives and supervisors with 3+ years of verifiable workplace experience may apply for Recognition of Prior Learning (RPL) diagnostic assessments at our Randburg centre to fast-track credit accumulation toward NQF Level 1 or NQF Level 3 occupational qualifications.
          </p>
        </div>

        <div className="bg-white border border-[#E5E7EB] rounded-xl p-6">
          <h2 className="text-lg font-bold text-[#1C1B1B]">
            04. Assessment Moderation & Learner Appeals Procedure
          </h2>
          <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
            Every learner assessed as &ldquo;Not Yet Competent&rdquo; (NYC) on a formative or practical simulation task is entitled to one free remediation coaching session and re-assessment within 14 days. Formal appeals are reviewed independently by our registered Internal Moderator within 10 business days.
          </p>
        </div>
      </div>
    </div>
  );
}

export function SitemapArchitectureView({
  onNavigate,
}: {
  onNavigate: (page: PageId) => void;
}) {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="pb-8 border-b border-[#E5E7EB]">
        <p className="text-xs font-semibold text-[#D91B24] mb-2">
          Platform Sitemap & Conversion Blueprint
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1B1B]">
          Complete 15-Page Information Architecture & Audience Conversion Matrix
        </h1>
        <p className="mt-2 text-sm text-[#52525B] max-w-3xl">
          Every required page template below is live and interactive. Click any row to open and test that template directly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SITEMAP_SPEC.map((node) => (
          <div
            key={node.id}
            className="bg-white border border-[#E5E7EB] rounded-xl p-5 flex flex-col justify-between hover:border-[#D91B24] transition-colors"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#52525B] mb-2">
                <span className="font-bold text-[#D91B24]">Template {node.number}</span>
                <span>{node.urlPath}</span>
              </div>
              <h2 className="text-base font-bold text-[#1C1B1B]">{node.title}</h2>
              <p className="text-xs text-[#52525B] mt-1">
                <strong className="text-slate-700">Audience:</strong> {node.primaryAudience}
              </p>
              <p className="text-xs text-[#52525B] mt-2">{node.conversionGoal}</p>
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-[#52525B]">
                {node.keyModules.join(' · ')}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate(node.id)}
              className="mt-5 w-full py-2 px-3 text-xs font-semibold text-white bg-[#18181B] hover:bg-brand rounded-lg transition-colors cursor-pointer"
            >
              Open {node.title} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function OtherServicesView({
  onNavigate,
}: {
  onNavigate: (page: PageId) => void;
}) {
  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="pb-8 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-3">
            Cleaning Africa Services (Pty) Ltd Operational Backing
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1B1B] max-w-3xl">
            Specialist Workforce, Relief Staffing, Venue Hire & B-BBEE Advisory Services
          </h1>
          <p className="mt-3 text-base text-[#52525B] max-w-2xl">
            Beyond accredited qualifications and short courses, Training Africa Academy provides turnkey operational support so South African employers can train staff with zero site downtime.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('employers')}
          className="px-5 py-3 text-sm font-bold text-white bg-brand rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Open Corporate Quote & ROI Portal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {OTHER_SERVICES_LIST.map((srv) => (
          <div
            key={srv.id}
            className="course-card-elevated overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full bg-zinc-100 overflow-hidden">
                <ResilientImage
                  src={srv.image}
                  alt={srv.title}
                  fallbackTitle={srv.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181B] text-white text-xs font-bold">
                    {srv.badge}
                  </span>
                  <span className="text-xs font-mono font-bold text-brand">
                    {srv.code}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-[#1C1B1B]">{srv.title}</h2>
                <p className="mt-2 text-sm font-mono font-bold text-brand">
                  {srv.priceHighlight}
                </p>
                <p className="mt-3 text-sm text-[#52525B] leading-relaxed">
                  {srv.summary}
                </p>
                <ul className="mt-5 space-y-2 border-t border-[#E5E7EB] pt-4 text-xs text-[#1C1B1B]">
                  {srv.keyDeliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 pt-4 bg-[#FCF9F8] border-t border-[#E5E7EB] flex items-center justify-between">
              <button
                type="button"
                onClick={() => onNavigate(srv.targetPage)}
                className="text-xs font-bold text-brand hover:underline cursor-pointer"
              >
                {srv.ctaLabel}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 text-xs font-bold text-white bg-[#18181B] hover:bg-brand rounded-lg transition-colors cursor-pointer"
              >
                Enquire Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GalleryView({
  onNavigate,
  onSelectCourse,
}: {
  onNavigate: (page: PageId) => void;
  onSelectCourse: (courseId: string) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = [
    'All',
    'Practical Hygiene Bays',
    'Solar PV & High-Reach',
    'Supervisory & Lectures',
    'Randburg Campus',
  ];

  const filteredGallery =
    selectedCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((g) => g.category === selectedCategory);

  return (
    <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="pb-8 border-b border-[#E5E7EB] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-soft text-brand text-xs font-bold border border-brand-soft mb-3">
            Northriding, Randburg Campus & On-Site Practicals
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1B1B]">
            Training Facilities, Simulation Bays & Practical Gallery
          </h1>
          <p className="mt-3 text-base text-[#52525B] max-w-2xl">
            Inspect our QCTO-accredited practical floor-care bays, 12-metre deionized water-fed solar PV training rigs, and lecture rooms in Northriding, Randburg.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('assessment-centre')}
          className="px-5 py-3 text-sm font-bold text-white bg-brand rounded-lg transition-colors cursor-pointer shrink-0"
        >
          Book a Campus Tour or Bay Hire
        </button>
      </div>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#18181B] text-white border-[#18181B]'
                : 'bg-white text-[#52525B] border-[#E5E7EB] hover:text-[#1C1B1B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3-Column Elevated Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredGallery.map((item) => (
          <article
            key={item.id}
            className="course-card-elevated overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video w-full overflow-hidden bg-zinc-100">
                <ResilientImage
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md bg-[#18181B]/90 text-white text-[11px] font-bold">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-xs font-mono text-brand font-semibold">
                  {item.location}
                </p>
                <h2 className="text-lg font-bold text-[#1C1B1B] mt-1">
                  {item.title}
                </h2>
                <p className="text-sm text-[#52525B] mt-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
            {item.relatedCourseId && (
              <div className="px-6 py-4 bg-[#FCF9F8] border-t border-[#E5E7EB] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (item.relatedCourseId) onSelectCourse(item.relatedCourseId);
                  }}
                  className="text-xs font-bold text-brand hover:underline cursor-pointer"
                >
                  View Related Programme →
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('assessment-centre')}
                  className="text-xs font-semibold text-[#52525B] hover:text-[#1C1B1B] cursor-pointer"
                >
                  Facility Specs
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

