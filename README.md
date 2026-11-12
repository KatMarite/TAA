# Training Africa Academy — Digital Learning & Customer-Acquisition Platform

![Training Africa Academy Logo](public/assets/aistudio/1_bff70370.svg)

A modern, mobile-first Next.js 15+ EdTech and corporate workforce training platform built for **Training Africa Academy**—the dedicated vocational education and skills development division of **Cleaning Africa Services (Pty) Ltd** (established in 2000, headquartered in Northriding, Randburg, Gauteng, South Africa).

---

## 1. Executive Summary & Institutional Context

**Training Africa Academy** delivers **QCTO (Quality Council for Trades and Occupations)** and **Services SETA** aligned occupational qualifications, technical hygiene certifications, and cleaning entrepreneurship programmes across South Africa.

This platform reimagines the academy's digital presence from a static brochure site into an end-to-end **customer-acquisition, corporate quoting, and self-paced online learning (LMS) platform** serving four primary audiences:

1. **Individual Learners & Job Seekers**: Compare upfront ZAR pricing (from `R1,450`), filter by career outcome or NQF level, enrol online with instant invoice/EFT or card checkout, and complete interactive online modules.
2. **Employers, HR, L&D & Operations Managers**: Build multi-staff corporate training quotes with automatic cohort discounts (5+ learners), add vetted **Cleaning Africa Services Relief Staff (`R380/day`)** to prevent site SLA disruption during training, and model net training costs using the **SARS Section 12H & SETA Grant ROI Calculator**.
3. **Learnership & Enterprise Development (ESD) Applicants**: Inspect SAQA-registered NQF Level 1, Level 3, and Level 4 qualifications, check intake windows, and submit applications validated with a real-time **South African 13-digit ID Luhn checksum validator**.
4. **External Training Providers & Assessment-Centre Clients**: Inspect the Northriding, Randburg simulation bays and lecture suites, pick dates on an interactive availability calendar, and generate instant venue hire quotations.

---

## 2. Key Platform Features & Interactive Engines

### 2.1 Clear Dual-Audience Entry & Navigation Architecture
- **Single-Row Sticky Glassmorphic Header**: Streamlined primary navigation (`Courses`, `Qualifications`, `For Employers`, `Learner Hub`, `About`, `Contact`) paired with a consolidated **`More & Tools`** utility menu (`Theme Palette Switcher`, `Verify Certificate`, `Guided Tour`, `Other Services`, `Campus Gallery`, `Facilitators`, `Free Toolkits & FAQs`, `News & Insights`, `15-Page Sitemap`, and `Reset Demo Data`).
- **Dual-Audience Hero Gateway**: Routes visitors immediately via **"I want to study"** (Individual Learners) or **"Train my team"** (Employers, HR & Operations), supported by live keyword search and quick-browse filters.
- **390px Mobile-Safe Responsive Design**: Engineered with `min-w-0` flex truncation, responsive filter tabs, an in-flow mobile quick-navigation dock above the footer, and a header-integrated `Help` trigger so floating controls never obstruct reading on narrow mobile screens.

### 2.2 Accredited Qualifications & Short Courses Catalogue
- **Transparent ZAR Pricing**: Every course displays both single-learner tuition and discounted corporate group rates (5+ learners) upfront.
- **Multi-Facet Filtering & Side-by-Side Comparison**: Filter by category (*Occupational Qualifications*, *Specialized Hygiene & Technical*, *Foundational Cleaning Modules*, *Business & Entrepreneurship*), delivery mode (*Self-Paced Online*, *Blended*, *Randburg Classroom & Bay*, *On-Site Client Premises*), and maximum budget slider (`R1,400` – `R25,000`). Select up to 3 courses for side-by-side comparison.
- **Instant Spec-Sheet Brochure Modal**: Generate and download a structured `.txt` course specification sheet and curriculum breakdown for any programme.

| Code | Programme Title | Category | NQF / SAQA | Credits | Duration | Individual Fee | Group Rate (5+) |
| :--- | :--- | :--- | :--- | :---: | :--- | :---: | :---: |
| `QCTO-CP-L3` | **Occupational Qualification: Cleaning Practitioner** | Occupational Qualifications | NQF Level 3 (`SAQA 118707`) | 126 | 12 Months | R18,500 | R15,900 |
| `QCTO-CC-L1` | **Occupational Qualification: Commercial Cleaner** | Occupational Qualifications | NQF Level 1 (`SAQA 118708`) | 120 | 12 Months | R14,800 | R12,400 |
| `SAQA-66249` | **FET Certificate: New Venture Creation (NQF 4)** | Occupational Qualifications | NQF Level 4 (`SAQA 66249`) | 149 | 12 Months | R22,500 | R18,900 |
| `TAA-SOLAR-04` | **Specialized Commercial Solar Panel & High-Reach Window Cleaning** | Specialized Hygiene & Technical | NQF 2 Aligned Skills Prog | 12 | 3 Days | R3,450 | R2,850 |
| `TAA-SPEC-105` | **Specialized Carpet Extraction, Upholstery & Deep Washroom Hygiene** | Specialized Hygiene & Technical | NQF 2 Aligned Skills Prog | 10 | 2 Days | R2,450 | R1,950 |
| `TAA-IC-101` | **Introduction to Professional Cleaning (Modules 1 & 2 Combined)** | Foundational Cleaning Modules | NQF 1 Aligned Short Course | 8 | 2 Days / 8 Hrs | R1,450 | R1,150 |
| `TAA-BIZ-201` | **Cleaning Enterprise Startup, Tendering & Marketing Masterclass** | Business & Entrepreneurship | NQF 4 Aligned Masterclass | 16 | 5 Days | R4,250 | R3,600 |

### 2.3 Self-Paced Online Learning (LMS) & Chemical Dilution Simulator
- **Interactive Module Player**: Video/theory briefings, SABS 4-zone colour-coding notes (*Red*, *Yellow*, *Blue*, *Green*), practical workplace checklists, and auto-graded competency quizzes.
- **Interactive Chemical Dilution & pH Surface Compatibility Lab**:
  - Calculate exact chemical concentrate milliliters (`ml`) and water volumes for any container size (`1L` – `25L`) and dilution ratio (`1:10` to `1:100`).
  - Test chemical pH (`0` – `14`) against commercial surfaces (*Natural Marble/Terrazzo*, *Sealed Vinyl*, *Hospital Stainless Steel*, *Commercial Carpet*) to prevent surface etching or warranty damage.

### 2.4 Corporate Training Portal & SARS Section 12H ROI Calculator
- **3-Step Guided Corporate Quote Builder**: Select industry, programme, cohort size, delivery format, and optional **Cleaning Africa Services Relief Staff (`R380/day/operative`)**.
- **B-BBEE, WSP/ATR & SARS Section 12H Financial Justification Engine** (`/lib/roi-calculator.ts`):
  - Models gross tuition + relief staff expenditure against **Services SETA Mandatory & Discretionary Grant recoveries (up to 55%)** and **SARS Section 12H Learnership Tax Deductions** (`R40,000` commencement + `R40,000` completion allowance per able-bodied learner; `R60,000 + R60,000` per learner with a disability, valued at the 27% South African corporate income tax rate).
- **Multi-Staff Cohort Roster & CSV Export**: Enrol multiple employees and export an official `WSP_ATR_Cohort_Report.csv` for SETA verification.

### 2.5 Randburg Accredited Assessment Centre & Venue Hire
- **3 Purpose-Built Facilities at Unit 14 Fancourt Office Park, Northriding**:
  1. *Practical Hygiene & Floor-Care Simulation Bay (Bay A)* — `R4,800` Full-Day / `R2,900` Half-Day
  2. *Outdoor Solar PV Array & High-Reach Water-Fed Pole Training Rig (Bay B)* — `R5,400` Full-Day / `R3,200` Half-Day
  3. *Northriding Accredited Lecture & EISA Computer Assessment Suite (32 Seats)* — `R3,900` Full-Day / `R2,400` Half-Day
- **Interactive Multi-Date Calendar**: Select single or multiple assessment dates, add optional halaal-friendly catering (`R145/candidate/day`), and generate an instant booking reference (`VEN-2026-*`).

### 2.6 Certificate Verification Registry & In-House Nano Banana CMS
- **Interactive Certificate Preview & Live Verification Modal**: Preview official QCTO/SETA-aligned Statements of Competency featuring the Training Africa Academy crest, download verifiable records, and validate credential references (`TAA-CERT-2026-*`).
- **In-House Programme Expansion CMS**: Authorised academy staff can create and publish new courses directly from the Learner Hub & CMS dashboard, complete with runtime AI course photography generation powered by **Nano Banana (`gemini-2.5-flash-image`)** via `/api/generate-visual`.

---

## 3. Design System & Theme Architecture

The UI uses **Tailwind CSS v4** (`@import "tailwindcss";`) and semantic CSS variables scoped to hydration-safe theme classes in `/app/globals.css`:

- **Option A — Refined Crimson & Charcoal (`.theme-crimson`, Default)**:
  - Primary Canvas: `#FCF9F8` (Warm Alabaster)
  - Primary Ink: `#1C1B1B` (Deep Charcoal)
  - Brand Accent: `#D91B24` (Refined Academy Crimson, hover `#B91C1C`)
  - Secondary Surface: `#18181B` (Rich Zinc Charcoal)
- **Option B — Fresh EdTech Emerald & Deep Slate (`.theme-emerald`, Switchable in `More & Tools`)**:
  - Primary Canvas: `#F8FAFC` (Cool Alabaster)
  - Primary Ink: `#0F172A` (Deep Slate)
  - Brand Accent: `#059669` (EdTech Emerald, hover `#047857`)
  - Secondary Surface: `#0F172A` (Deep Slate)
- **Typography**: `Plus Jakarta Sans` for headings and body copy (`font-weight: 800`, tight tracking `-0.03em` on hero headlines) paired with `JetBrains Mono` (`tabular-nums`) for SAQA IDs, NQF credits, ZAR fees, and certificate codes.

---

## 4. Complete 15+ Page Information Architecture

All views are accessible without full-page reloads via the platform state router in `/app/page.tsx` and persisted in `localStorage`:

| # | Page ID | Template Name | Target Audience | Primary Conversion Action |
| :-: | :--- | :--- | :--- | :--- |
| 01 | `home` | **Home (Dual-Audience Gateway)** | Individual Learners & Employers | Choose Learner/Employer route, search courses, or launch 3-Step Course Matcher |
| 02 | `about` | **About & Accreditations** | All Audiences & Quality Auditors | Download QCTO, Services SETA & Cleaning Africa Services Accreditation Dossier |
| 03 | `catalogue` | **Course Catalogue** | Individual Learners & L&D Managers | Filter by NQF level, delivery mode, and budget; compare up to 3 courses |
| 04 | `course-detail` | **Individual Course Detail** | Prospective Enrollees & HR Buyers | Inspect modules, calculate group fee + relief staff, Enrol or Download Brochure |
| 05 | `online-learning` | **Self-Paced Online LMS Player** | Enrolled Learners | Complete video/theory modules, use Chemical Dilution Lab, pass quiz |
| 06 | `employers` | **Training for Employers (Corporate L&D)** | HR, L&D, WSP/ATR & Operations | Build 3-step group quote, model Section 12H tax ROI, export WSP CSV roster |
| 07 | `qualifications` | **Qualifications & Learnerships** | Learnership Applicants & Host Employers | Validate SA 13-digit ID number and submit structured learnership application |
| 08 | `pathways` | **Career & Learning Pathways** | Career Starters, Supervisors & SMMEs | Follow 3-stage progression from NQF 1 Cleaner to NQF 3 Supervisor or NQF 4 Founder |
| 09 | `assessment-centre` | **Assessment Centre & Venue Hire** | External SDPs & Trade Test Teams | Select Randburg bay, pick dates on live calendar, confirm instant venue quote |
| 10 | `facilitators` | **Facilitators & 70/30 Training Approach** | Learners & Corporate QA Teams | Review registered SETA assessors, moderators, and 6-language instruction model |
| 11 | `resources` | **Resources, Toolkits & FAQs** | All Audiences | Download free SABS 4-Zone Colour-Coding Wall Chart, WSP toolkit, and solar checklist |
| 12 | `news` | **News & Industry Insights** | Facility Managers & Entrepreneurs | Read full editorial briefs on QCTO transitions, solar PV yield, and BCCCI pricing |
| 13 | `contact` | **Contact & Locations** | All Audiences | Connect with Northriding Randburg campus or request nationwide mobile training |
| 14 | `policies` | **Privacy, POPIA & Learner Policies** | Learners, Employers & Regulators | Review POPIA data governance, deferral/refund rules, RPL, and assessment appeals |
| 15 | `dashboard` | **Learner Hub & In-House CMS** | Enrolled Learners & Academy Admins | Track progress, verify certificates, and publish new courses with Nano Banana visuals |
| 16 | `other-services` | **Specialist Employer & Venue Services** | Corporate Operations & HR | Explore R380/day Relief Staff, Bay Hire, WSP/12H Advisory, and Mobile Training |
| 17 | `gallery` | **Randburg Campus & Practical Gallery** | All Audiences | Filter high-res photography across Hygiene Bays, Solar Rigs, and Lectures |
| 18 | `sitemap` | **Interactive 15-Page Sitemap Matrix** | Evaluators & Visitors | Inspect conversion goals and jump directly to any template |

---

## 5. Project Structure

```text
├── app/
│   ├── api/
│   │   ├── applications/route.ts    # POST/GET endpoint for Learnership Applications (with SA ID validation)
│   │   ├── enquiries/route.ts       # POST/GET endpoint for Campus & Mobile Training Enquiries
│   │   ├── enrolments/route.ts      # POST/GET endpoint for Individual & Group Course Enrolments
│   │   ├── generate-visual/route.ts # POST endpoint for runtime Nano Banana (gemini-2.5-flash-image) visuals
│   │   └── quotes/route.ts          # POST/GET endpoint for Corporate Quotes & Section 12H ROI calculations
│   ├── globals.css                  # Tailwind v4 imports, .theme-crimson & .theme-emerald CSS variable scopes
│   ├── layout.tsx                   # Root layout with Plus Jakarta Sans & JetBrains Mono fonts and SEO metadata
│   └── page.tsx                     # Root platform shell, state persistence, modals, and 4-column dark footer
├── components/
│   ├── audience/
│   │   ├── AssessmentCentreView.tsx # Randburg facility cards, availability calendar, and instant venue booking
│   │   ├── EmployersView.tsx        # Corporate quote wizard, Section 12H ROI calculator, and WSP CSV roster
│   │   ├── PathwaysView.tsx         # 3-track career progression maps with course thumbnails
│   │   └── QualificationsView.tsx   # NQF 1, 3 & 4 qualification cards and SA ID-validated application form
│   ├── AudienceJourneys.tsx         # Shared record types and barrel exports for audience views
│   ├── CourseViews.tsx              # CatalogueView, CourseDetailView, and OnlineLearningView (with Dilution Lab)
│   ├── DashboardAndModals.tsx       # Learner Hub, In-House Nano Banana CMS, EnrolmentModal, and BrochureModal
│   ├── HomeView.tsx                 # Reworked clear Hero, Trust Bento, Tabbed Course Showcase, Services & Gallery
│   ├── InstitutionalViews.tsx       # About, Facilitators, Resources/FAQs, News, Contact, Policies, Services, Gallery
│   ├── LiveChatWidget.tsx           # Non-obstructive support concierge & WhatsApp (+27 82 539 8605) modal
│   ├── ResilientImage.tsx           # Resilient image loader with branded architectural fallback state
│   ├── TopBarAndNav.tsx             # Single-row sticky header, More & Tools dropdown, and mobile navigation drawer
│   └── UxEnhancements.tsx           # 3-Step Course Matcher Wizard, Guided Tour, Certificate Verifier, Mobile Dock
├── lib/
│   ├── academy-context.tsx          # React Context provider with hydration-safe localStorage state sync
│   ├── academy-data.ts              # Canonical dataset: courses, pathways, facilities, facilitators, services, gallery
│   ├── roi-calculator.ts            # Pure TypeScript SARS Section 12H & SETA Grant ROI domain engine
│   └── utils.ts                     # SA 13-digit ID Luhn checksum validator, currency/date helpers, ID generator
├── public/
│   ├── assets/aistudio/             # Official Training Africa Academy vector SVG brand mark
│   └── images/                      # High-resolution Nano Banana generated campus, course, and service photography
└── tests/
    └── domain-engine.test.mjs       # Automated Node.js test suite for ROI math & SA ID Luhn validation
```

---

## 6. Getting Started & Local Development

### Prerequisites
- **Node.js** `>= 20.x`
- **npm** or **bun**

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local` and provide your server-side Gemini API key (used by `/api/generate-visual` in the In-House CMS):

```bash
cp .env.example .env.local
```

```env
# .env.local
GEMINI_API_KEY=your_server_side_gemini_api_key
```
> **Security Note**: `GEMINI_API_KEY` is strictly a server-side secret and is never exposed to the browser or prefixed with `NEXT_PUBLIC_`.

### 3. Run the Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Run Domain Engine Unit Tests
Verify the SARS Section 12H tax allowance math, SETA grant calculations, and South African 13-digit ID Luhn checksum validator:
```bash
npm test
```

### 5. Production Build & Lint Verification
```bash
npm run lint
npm run build
npm start
```

---

## 7. Campus & Contact Information

- **Academy Name**: Training Africa Academy (A Division of Cleaning Africa Services Pty Ltd)
- **Head Office & Accredited Assessment Centre**: Unit 14 Fancourt Office Park, Corner Northumberland & Felstead Road, Northriding, Randburg, 2188, Gauteng, South Africa
- **Telephone**: `+27 (0)11 794 6665`
- **Mobile / WhatsApp Admissions Desk**: `+27 (0)82 539 8605`
- **Email**: `info@trainingafricaacademy.co.za`
- **Website**: [https://trainingafricaacademy.co.za/](https://trainingafricaacademy.co.za/)
