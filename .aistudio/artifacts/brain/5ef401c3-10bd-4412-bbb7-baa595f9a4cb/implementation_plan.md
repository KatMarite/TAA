# Training Africa Academy — UX & Conversion Optimization Plan

This plan upgrades the Training Africa Academy digital learning and workforce platform with guided course discovery, mobile thumb-zone ergonomics, multi-step checkout and quote wizards, a live SARS Section 12H & B-BBEE ROI calculator, an interactive Randburg venue calendar, verifiable certificate previews, and persistent cross-session state.

## User Review & Critical Decisions

> [!IMPORTANT]
> All nine UX enhancements selected during the clarification phase are incorporated below while preserving all 15 page templates, the four target audience conversion journeys, and the existing Training Africa Academy visual identity.

- **Confirmed Navigation & Discovery Upgrades**:
  - **Interactive Career & Course Finder Wizard**: 3-step guided matcher (Goal/Audience → Delivery & Timeframe → Budget/Funding) recommending exact NQF qualifications or short courses.
  - **Sticky Mobile Bottom Action & Conversion Bar**: Thumb-zone navigation and contextual CTA bar on mobile viewports (`< 768px`), strictly capped below 15% of viewport height with $\ge 44\times 44\text{px}$ touch targets.
  - **Streamlined Navigation & Breadcrumb Trail**: Contextual breadcrumb bar with an instant 4-Audience Journey Lens switcher and quick step-back history.
- **Confirmed Conversion & Employer Workflow Upgrades**:
  - **Multi-Step Guided Enrolment & Quote Flows**: Progressive 3-step wizards for both Individual Enrolment Checkout and Corporate Group Quotes to reduce form fatigue and cognitive load.
  - **Interactive B-BBEE & Section 12H ROI Calculator**: Real-time financial calculator showing SARS Section 12H tax allowances (commencement + completion deductions), SETA grant recovery estimates, and net effective cost per learner.
  - **Interactive Calendar Grid for Randburg Venue Bookings**: Visual month-view availability calendar for Bay A, Bay B, and the EISA Lecture Suite supporting multi-date selection and instant quotation calculation.
- **Confirmed Retention & Platform Usability Upgrades**:
  - **Interactive Certificate Preview & Verification Modal**: Formatted competency certificate viewer with unique verification code lookup and print/download actions.
  - **Persistent LocalStorage State Across Reloads**: Automatic client-side persistence for enrolments, module completions, corporate quotes, learnership applications, venue bookings, and in-house CMS courses (with a one-click demo state reset).
  - **Guided Onboarding Tour for First-Time Visitors**: Non-intrusive interactive walkthrough bar and step-by-step spotlight drawer highlighting the four audience funnels and key interactive simulators.

---

## 1. Overview & Core Concept

- **What It Does**: Transforms the 15-page Training Africa Academy platform from a feature-complete portal into a frictionless, high-converting digital learning and B2B procurement experience.
- **Target Audience / Persona**:
  1. *Individual / Self-Funded Learners* needing rapid guidance on which course matches their budget and career goal, mobile-friendly study controls, and verifiable certificates.
  2. *Employers / HR / L&D / WSP Managers* needing financial justification (Section 12H tax deductions + SETA grants + R380/day relief staff ROI) and streamlined multi-step quote generation.
  3. *Learnership Applicants* needing clear eligibility self-checks before submitting applications.
  4. *Assessment-Centre & Venue Clients* needing visual calendar availability across practical bays and lecture rooms.
- **Key Value**: Reduces drop-off during course selection and checkout, quantifies financial ROI for corporate buyers, and preserves learner progress across browser reloads.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Guided Course Discovery Flow (3-Step Finder Wizard)**:
   - *Step 1 (Objective)*: User selects whether they want rapid employment entry, supervisory promotion, high-margin technical specialization (Solar/Carpet), Entrepreneurship, or Corporate Team Upskilling.
   - *Step 2 (Format & Schedule)*: User chooses between Self-Paced Online, Blended Practical, Randburg Classroom, or On-Site Workplace delivery.
   - *Step 3 (Instant Match)*: Displays top recommended programmes with transparent ZAR fees, credit values, and direct **Enrol Now** or **Download Brochure** actions.
2. **Employer B-BBEE & Section 12H Financial ROI Flow**:
   - HR/L&D user adjusts sliders for learner count, qualification level (NQF 1, 3, or 4), learner disability status, corporate tax rate (27%), and optional R380/day relief staff days.
   - The calculator outputs gross tuition + relief cost alongside SARS Section 12H Commencement & Completion tax savings and estimated Services SETA grant rebates, revealing the **Net Effective Investment per Learner**.
3. **Multi-Step Enrolment & Checkout Flow**:
   - *Step 1*: Confirm delivery mode, preferred intake date, and single vs. cohort count (plus optional relief staff).
   - *Step 2*: Enter learner or company billing details with real-time field validation.
   - *Step 3*: Select payment method (Instant EFT / PayFast, Card, or Corporate Pro-Forma Invoice), complete enrolment, and immediately unlock the course or download the official invoice.
4. **Visual Assessment Centre Calendar Flow**:
   - Venue clients select a Randburg facility bay, browse an interactive November/December 2026 calendar grid showing Available, Limited, and Booked dates, click one or multiple dates, toggle catering/invigilation, and generate an itemised booking confirmation.
5. **Certificate Verification & Preview Flow**:
   - From the Learner Dashboard or Online Learning Player, users open the **Certificate Preview & Verification Modal** to inspect an official Training Africa Academy / QCTO-aligned Statement of Competency, verify any certificate reference number, or download/print the document.

### Visual Identity & Theme

- **Aesthetic Direction**: Clean, authoritative South African corporate vocational academy aesthetic—structured, high-contrast, and user-centric.
- **Color Palette & Mood (60-30-10 Discipline)**:
  - **60% Dominant Neutral Canvas**: Crisp Cool Alabaster (`#F8FAFC`) and Pure White (`#FFFFFF`) container surfaces.
  - **30% Structural Surfaces & Corporate Primary**: Deep Corporate Navy (`#0B2545` / `#0F2C59`), Slate prose (`#334155`), and subtle hairline borders (`#E2E8F0`).
  - **10% Accent Budget**: Eco-Hygiene Emerald Green (`#059669`) for primary conversion CTAs and active progress states, paired with Warm Accreditation Gold (`#F59E0B`) for QCTO/SETA highlights and wizard milestones.
- **Typography & Hierarchy**:
  - *Display & Headings*: `Plus Jakarta Sans` (SemiBold/Bold, tight tracking, `text-wrap: balance`).
  - *Body Prose*: `DM Sans` (Regular/Medium, comfortable reading measure).
  - *Financials, Metrics & SAQA Codes*: `JetBrains Mono` with `tabular-nums` for vertical alignment across calculators, tables, and calendars.
- **Component Styling & Layout**:
  - Strict adherence to the **3-Zone Top Bar Contract** on desktop (`Brand Wordmark` — `5 Concise Nav Links` — `1 Primary Action Button`).
  - **Contextual Breadcrumb & Journey Bar** directly beneath the top bar showing current location within the 15 templates, a 4-Audience Journey Lens selector, and a trigger for the Guided Platform Tour.
  - **Zero-Pill Metadata Discipline**: Course codes, NQF levels, credits, and dates rendered as clean unboxed typography separated by `·` or `/`.

### Interactive Feedback & Motion

- **Micro-Interactions**: $\le 200\text{ms}$ compositor-only transitions (`transform`, `opacity`) on wizard steps, calendar date selections, and modal transitions.
- **Mobile Ergonomics**: Fixed bottom navigation & conversion bar on viewports $< 768\text{px}$ with $\ge 44\times 44\text{px}$ touch hitboxes and total sticky height $\le 15\%$ of viewport height.
- **Non-Intrusive Onboarding**: A top interactive tour ribbon allows first-time users to step through a 4-stop guided spotlight tour at their own pace without firing an unsolicited arrival modal on load.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Progressive 3-Step Wizards vs. Long Single-Screen Forms**
  - *Chosen Approach*: Break the Enrolment Checkout and Corporate Quote forms into 3 guided steps with a visual progress bar and instant back/next validation.
  - *Why*: Reduces perceived complexity for mobile learners and busy HR managers while capturing structured data accurately.
  - *Alternatives Considered*: Keeping all inputs stacked in a single long form, which increases vertical scrolling and mobile abandonment.
- **Decision 2: Client-Side LocalStorage Persistence with Hydration Guard**
  - *Chosen Approach*: Persist all user actions (enrolments, completed modules, quotes, applications, venue bookings, custom CMS courses, and tour state) in `localStorage` with a safe post-mount hydration sync and a "Reset Demo Data" button.
  - *Why*: Guarantees zero data loss when users refresh the browser while avoiding Next.js SSR hydration mismatches.
  - *Alternatives Considered*: Ephemeral in-memory React state only, which loses learner progress on page reload.
- **Decision 3: Interactive Section 12H & SETA ROI Calculator in Employer & Learnership Views**
  - *Chosen Approach*: Embed a live financial calculator modelling South African SARS Section 12H tax allowances (`R40,000`–`R60,000` deductions at 27% corporate tax rate) alongside the R380/day relief staff option.
  - *Why*: Turns training from a perceived cost centre into a quantifiable net-positive tax and B-BBEE investment for corporate decision-makers.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

### Architecture & Component Diagram

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                 Root Platform State & LocalStorage Sync Layer                │
│  (Courses, Enrolments, Module Progress, Quotes, Applications, Venue Bookings)│
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
         ┌─────────────────────────────┼─────────────────────────────┐
         ▼                             ▼                             ▼
┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐
│  Navigation & Discovery │ │   Audience Conversion   │ │  Retention & Governance │
│        Shell            │ │        Workspaces       │ │         Systems         │
├─────────────────────────┤ ├─────────────────────────┤ ├─────────────────────────┤
│ • 3-Zone Top Header     │ │ • 3-Step Enrolment &    │ │ • Certificate Preview & │
│ • Contextual Breadcrumb │ │   Payment Wizard Modal  │ │   Verification Lookup   │
│   & Audience Switcher   │ │ • Employer B-BBEE &     │ │ • Online LMS Player +   │
│ • 4-Step Guided Tour    │ │   Section 12H ROI Calc  │ │   Chemical Dilution Lab │
│ • 3-Step Course Finder  │ │ • Multi-Step Corporate  │ │ • In-House CMS Studio + │
│   Wizard                │ │   Quote & Cohort Roster │ │   Server Nano Banana API│
│ • Mobile Thumb-Zone     │ │ • Interactive Calendar  │ │ • 15-Page Sitemap &     │
│   Bottom Bar (<768px)   │ │   Grid for Venue Hire   │ │   Demo State Reset      │
└─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘
```

### Data Model & State

- **Persistent Storage Key (`taa_platform_state_v2`)**: Stores serialized arrays of `courses`, `enrolledCourseIds`, `completedModuleIds`, `enrolments`, `quotes`, `applications`, `venueBookings`, and `onboardingCompleted`.
- **Certificate Verification Registry**: Maps each enrolled/completed course and sample graduate record to a deterministic verification code (`TAA-CERT-2026-...`) queryable from the Certificate Modal and About & Accreditations page.
- **Calendar Availability Model**: Maps each of the 3 Randburg assessment facilities across November and December 2026 dates with status flags (`available`, `limited`, `booked`) and dynamic multi-day pricing.

### Interactive Component & State Mapping

- **Course Finder Wizard**: Selecting goal + delivery format + budget filters the live `courses` array and highlights top matches with 1-click routing to `CourseDetailView` or `EnrolmentModal`.
- **3-Step Enrolment Modal**: Step 1 updates learner count, intake date, and relief staff days; Step 2 validates learner/company contact fields; Step 3 records the `EnrolmentRecord`, updates `enrolledCourseIds`, persists to `localStorage`, and opens the Certificate/LMS confirmation.
- **B-BBEE & Section 12H Calculator**: Adjusts cohort size, NQF level, disability count, and relief days in real time, computing Gross Tuition, Relief Staff Cost, SARS Section 12H Tax Saving (`27%` of eligible allowance), Mandatory Grant Estimate (`20%` SDL recovery), and Net Cost per Learner.
- **Interactive Venue Calendar**: Clicking available dates toggles selection in an array of booked dates, dynamically multiplying the facility daily/half-day rate and catering add-on before saving a `VenueBookingRecord`.
