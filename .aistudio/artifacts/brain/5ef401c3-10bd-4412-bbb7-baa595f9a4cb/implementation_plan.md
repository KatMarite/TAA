# Training Africa Academy — UI & CSS Refactor Plan

## 1. Visual Identity, Typography & Live Color Palette Architecture
- **Option A Default (Refined Crimson & Charcoal — True to Brand Heritage) + Option B Live Theme Switcher (Modern Growth & Institutional Green)**:
  - **Surface Hierarchy**: Warm Off-White primary canvas (`#FCF9F8`), Pure White elevated cards (`#FFFFFF`), subtle borders (`#E5E7EB`), and Rich Charcoal (`#18181B` / `#1C1B1B`) for structural anchors and the 4-column footer.
  - **Typography & Hierarchy**: Strictly unified `Plus Jakarta Sans` & `Inter` sans-serif stack across all headings and body copy (zero script or mismatched serif fonts). Hero headline uses `font-weight: 800`, `letter-spacing: -0.03em`, `line-height: 1.1`, and body text maintains a clean `65ch` readable measure with `#1C1B1B` primary and `#52525B` muted slate contrast.
  - **Live Palette Switcher in Top Utility Bar**:
    - **Option A (Crimson & Charcoal — Default)**: Primary Brand Accent `#D91B24` (hover `#B91C1C`), Secondary Accent `#18181B`, soft badge surface `#FEF2F2`.
    - **Option B (Institutional Green & Gold)**: Primary Brand Accent `#006E1F` (hover `#005217`), Secondary Accent `#38A645`, Warm Gold highlight `#FDD835`, soft badge surface `#F0FDF4`.
    - Implemented via dynamic CSS custom properties (`--brand-primary`, `--brand-primary-hover`, `--brand-soft`, `--brand-highlight`) persisted in `localStorage` so users and stakeholders can preview both brand directions instantaneously across every component.

## 2. Layout & Navigation Architecture

### A. Full-Width Glassmorphism Sticky Top Navbar
- **Header Styling**: `backdrop-filter: blur(12px)` over `rgba(252, 249, 248, 0.88)` with a crisp `1px solid #E5E7EB` bottom border.
- **Left**: Training Africa Academy brand mark + *"A Division of Cleaning Africa Services (Pty) Ltd"* subtitle.
- **Center Navigation Links**: Clean horizontal links for `Home`, `About`, `Accredited Courses`, `Short Courses`, `Other Services`, `Gallery`, and `Contact`, plus quick access to the 15-page platform directory (LMS Player, Employer ROI Calculator, Randburg Venue Calendar, Learner Dashboard, and In-House CMS).
- **Right Actions**: Palette Switcher (`Option A: Crimson` / `Option B: Green`), interactive Course Finder trigger, and prominent high-contrast primary CTA button (`Enquire Now` / `View Courses`).

### B. Split-Screen Architectural Hero Section
- **Generous Whitespace & Backdrop**: `padding: 6rem 2rem` container set against `#FCF9F8` with a subtle architectural grid pattern and soft radial brand glow.
- **Left Column (Copy & Conversion)**:
  - **Trust Badge**: Crisp `"SETA Accredited • Established 2000"` indicator above the headline.
  - **Main Headline**: **"Advancing Knowledge, Transforming Lives"** in `font-extrabold tracking-[-0.03em] leading-[1.1]` with a high-contrast accent highlight on **"Transforming Lives."**
  - **High-Contrast Two-Button CTA Group**: Primary filled button for **"Qualifications"** (`#D91B24` in Option A / `#006E1F` in Option B) paired with a crisp secondary outline button for **"Short Courses"**, alongside direct audience routing for *"I want to study"* and *"Train my team"*.
- **Right Column (Visual Showcase)**: Framed high-resolution photography from the Northriding, Randburg training campus with floating verification cards (QCTO/Services SETA registration, R380/day workplace relief staff guarantee, and transparent ZAR pricing).

### C. "Who We Are" Asymmetric Two-Column Bento Section
- **Left Bento Card (Heritage & Narrative)**: Highlights Training Africa Academy's establishment in 2000 under **Cleaning Africa Services (Pty) Ltd**, bridging skills gaps for employed and unemployed South Africans across commercial cleaning, hygiene, solar PV maintenance, and entrepreneurship.
- **Right Bento Grid (Key Trust Metrics & Operational Differentiators)**:
  - **20+ Years Experience** (Established 2000 under Cleaning Africa Services).
  - **SETA Accredited** (QCTO & Services SETA NQF Level 1–4 pathways).
  - **Multi-Industry Training** (Commercial, Healthcare, Hospitality, Solar & SMEs).
  - **R380/day Vetted Relief Staff** (Zero operational downtime while client teams train).

### D. Separate 3-Column Responsive Course Grids
- **Section 1 — SETA Accredited Qualifications Grid**: 3-column CSS Grid (`gap: 2rem`) showcasing NQF Level 1–4 qualifications and learnerships (`QCTO-CP-L3`, `QCTO-CC-L1`, `SAQA-66249`).
- **Section 2 — Industry Short Courses & Skills Programmes Grid**: 3-column CSS Grid (`gap: 2rem`) showcasing high-impact short courses (Solar Panel Cleaning, Intro to Cleaning Modules 1 & 2, Cleaning Enterprise Startup & Marketing, Specialized Carpet & Deep Hygiene).
- **Elevated Card Specification**:
  - `border-radius: 12px`, `1px solid #E5E7EB`, pure white `#FFFFFF` surface, and smooth hover lift (`transform: translateY(-4px)` with elevated shadow).
  - Consistent `16:9` top image container with high-resolution course photography.
  - Top NQF Level / Course Category badge (`"NQF Level 3"`, `"NQF Level 4"`, `"Short Course"`).
  - Clean card title, delivery mode, transparent ZAR fee, and bottom action row featuring **"View Course Details →"** and immediate Enrol / Quote triggers.

### E. Dedicated "Other Services" & "Gallery" Sections + Full View Templates
- **Other Services Section & Dedicated View**:
  1. **Workplace Relief Staff Provision (`R380.00/day`)**: Vetted replacement staff deployed while permanent employees attend training.
  2. **Randburg Assessment Centre & Venue Hire**: Trade testing, RPL assessments, and classroom bookings at Unit 14 Fancourt Office Park with interactive monthly calendar availability.
  3. **B-BBEE Skills Development & Section 12H Advisory**: Turnkey WSP/ATR documentation and SARS tax allowance structuring.
  4. **Custom On-Site Mobile Training**: Nationwide practical facilitation at client premises.
- **Campus & Practical Training Gallery Section & Lightbox View**: Filterable visual showcase of practical hygiene labs, solar array maintenance training, supervisory workshops, and the Northriding assessment facility.

### F. Structured 4-Column Dark Charcoal Footer & Floating Quick-Chat Actions
- **4-Column Dark Charcoal (`#1C1B1B`) Footer**:
  - **Col 1**: Brand mark, mission statement, and parent company credit (*Cleaning Africa Services (Pty) Ltd*).
  - **Col 2**: Quick Links (`Home`, `About`, `Accredited Courses`, `Short Courses`, `Other Services`, `Gallery`, `Contact`, `Sitemap`).
  - **Col 3**: SETA & QCTO Accreditation Registry numbers, NQF qualifications, and learner policies.
  - **Col 4**: Northriding Randburg physical address, phone (`+27 11 794 6665`), WhatsApp (`+27 82 539 8605`), and email (`info@trainingafricaacademy.co.za`).
- **Floating Conversion Widgets**:
  - **Floating WhatsApp Quick-Chat Pill/Button** (`+27 82 539 8605`) in the bottom-right corner with pre-filled enquiry routing, harmoniously paired with the **Business-Hours Live Chat Drawer** (`Sales`, `Support`, `Bookings`, `Learnerships`).
