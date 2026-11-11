export type PageId =
  | 'home'
  | 'about'
  | 'catalogue'
  | 'course-detail'
  | 'online-learning'
  | 'employers'
  | 'qualifications'
  | 'pathways'
  | 'assessment-centre'
  | 'facilitators'
  | 'resources'
  | 'news'
  | 'contact'
  | 'policies'
  | 'dashboard'
  | 'sitemap';

export type DeliveryMode =
  | 'Self-Paced Online'
  | 'Blended (Online + Practical)'
  | 'Classroom & Assessment Bay (Randburg)'
  | 'On-Site Client Premises';

export type CourseCategory =
  | 'Occupational Qualifications'
  | 'Specialized Hygiene & Technical'
  | 'Foundational Cleaning Modules'
  | 'Business & Entrepreneurship';

export interface CourseModule {
  id: string;
  number: string;
  title: string;
  duration: string;
  type: 'Theory & Interactive Video' | 'Practical Simulation' | 'Workplace Logbook' | 'Online Assessment';
  summary: string;
  keyTopics: string[];
  onlineContent?: {
    videoDuration: string;
    readingNotes: string;
    practicalChecklist: string[];
    quizQuestion: string;
    quizOptions: string[];
    correctOptionIndex: number;
  };
}

export interface Course {
  id: string;
  code: string;
  title: string;
  shortSummary: string;
  fullDescription: string;
  category: CourseCategory;
  careerOutcome: string;
  nqfLevel: string;
  credits: number;
  saqaId: string;
  accreditationBody: string;
  duration: string;
  deliveryModes: DeliveryMode[];
  priceZAR: number;
  groupPricePerLearnerZAR: number;
  reliefStaffAvailable: boolean;
  reliefStaffRatePerDayZAR: number;
  prerequisites: string[];
  targetAudience: 'Individual & Corporate' | 'Individual Learner' | 'Employer Teams' | 'Learnership Applicant';
  image: string;
  nextIntake: string;
  featured: boolean;
  onlineEligible: boolean;
  recommendedNextCourseIds: string[];
  modules: CourseModule[];
}

export interface CareerPathway {
  id: string;
  title: string;
  subtitle: string;
  targetRole: string;
  estimatedEarningsRange: string;
  totalDuration: string;
  steps: {
    stepNumber: string;
    stageTitle: string;
    courseId: string;
    nqf: string;
    outcome: string;
  }[];
}

export interface AssessmentFacility {
  id: string;
  name: string;
  capacity: string;
  accreditationScope: string;
  dailyHireRateZAR: number;
  halfDayRateZAR: number;
  equipmentIncluded: string[];
  availableDates: string[];
}

export interface Facilitator {
  id: string;
  name: string;
  role: string;
  registrationCode: string;
  specialisation: string;
  yearsExperience: number;
  languages: string[];
  bio: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  content: string[];
}

export const BRAND_IMAGES = {
  heroAcademy: '/images/hero_training_academy_1794335777871.jpg',
  commercialHygiene: '/images/course_commercial_hygiene_1794335775485.jpg',
  supervisoryManagement: '/images/course_supervisory_management_1794335778105.jpg',
  solarSpecialized: '/images/course_solar_specialized_1794335779941.jpg',
  assessmentCentre: '/images/assessment_centre_facility_1794335779489.jpg',
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'occ-cleaning-practitioner-nqf3',
    code: 'QCTO-CP-L3',
    title: 'Occupational Qualification: Cleaning Practitioner',
    shortSummary:
      'National occupational qualification preparing cleaning team leaders and supervisors to manage commercial hygiene operations, quality audits, and staff scheduling.',
    fullDescription:
      'Mapped to QCTO and Services SETA standards, this flagship NQF Level 3 occupational qualification equips experienced cleaners and newly appointed supervisors with the knowledge, practical simulation mastery, and workplace experience required to oversee multi-site cleaning contracts, OHS compliance, chemical inventory control, and team performance.',
    category: 'Occupational Qualifications',
    careerOutcome: 'Cleaning Supervisor / Hygiene Team Leader',
    nqfLevel: 'NQF Level 3',
    credits: 126,
    saqaId: 'SAQA 118707',
    accreditationBody: 'QCTO & Services SETA Accredited',
    duration: '12 Months (Learnership / Blended)',
    deliveryModes: [
      'Blended (Online + Practical)',
      'Classroom & Assessment Bay (Randburg)',
      'On-Site Client Premises',
    ],
    priceZAR: 18500,
    groupPricePerLearnerZAR: 15900,
    reliefStaffAvailable: true,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: [
      'NQF Level 1 Commercial Cleaner or equivalent foundational numeracy & literacy',
      'Minimum 6 months workplace exposure in hygiene or facilities',
    ],
    targetAudience: 'Learnership Applicant',
    image: BRAND_IMAGES.supervisoryManagement,
    nextIntake: '18 January 2027 · Monthly Corporate Intakes',
    featured: true,
    onlineEligible: true,
    recommendedNextCourseIds: ['nqf4-new-venture-creation', 'short-business-startup'],
    modules: [
      {
        id: 'cp-m1',
        number: '01',
        title: 'Principles of Commercial Hygiene Supervision & OHS Act Compliance',
        duration: '3 Weeks',
        type: 'Theory & Interactive Video',
        summary: 'Supervisory responsibilities under the South African Occupational Health and Safety Act, hazard identification, and SABS colour-coding governance.',
        keyTopics: ['OHS Act 85 of 1993', 'Cross-contamination prevention', 'SABS colour-coding zones', 'Daily inspection checklists'],
        onlineContent: {
          videoDuration: '28 mins',
          readingNotes:
            'In South African commercial, healthcare, and food-prep environments, colour-coding is the primary barrier against bacterial cross-contamination: Red is strictly reserved for high-risk sanitary fixtures (toilets/urinals), Yellow for washbasins and bathroom tiles, Blue for general low-risk office/window areas, and Green for food preparation and kitchen surfaces.',
          practicalChecklist: [
            'Verify chemical SDS (Safety Data Sheets) are mounted in the chemical cage',
            'Audit mop and microfibre separation by Red, Yellow, Blue, and Green zones',
            'Sign off pre-shift PPE inspection register for all operatives',
          ],
          quizQuestion: 'According to South African commercial hygiene standards taught at Training Africa Academy, which colour code is designated strictly for high-risk sanitary appliances (toilets and urinals)?',
          quizOptions: [
            'Blue — General low-risk surfaces',
            'Red — High-risk sanitary fixtures and floors',
            'Green — Food service and catering zones',
            'Yellow — Washbasins and clinical surfaces',
          ],
          correctOptionIndex: 1,
        },
      },
      {
        id: 'cp-m2',
        number: '02',
        title: 'Chemical Dilution Science, pH Scale & Surface Compatibility',
        duration: '4 Weeks',
        type: 'Practical Simulation',
        summary: 'Safe chemical handling, automated dosing systems, pH compatibility with natural stone, vinyl, epoxy, and stainless steel.',
        keyTopics: ['pH scale 0–14 mastery', 'Dilution ratio calculation (1:10 to 1:100)', 'MSDS emergency spill response', 'Eco-certified chemical stewardship'],
        onlineContent: {
          videoDuration: '34 mins',
          readingNotes:
            'Improper dilution either wastes chemical budget and leaves sticky residues that attract soil (over-dosing) or fails to achieve bactericidal log-reduction (under-dosing). Always add chemical to cold water—never hot water with chlorinated disinfectants—and verify surface pH sensitivity before applying acidic descalers.',
          practicalChecklist: [
            'Calculate exact ml of concentrate for a 5-litre trigger bucket at 1:50 ratio (100 ml)',
            'Demonstrate neutral pH 7 daily maintenance scrubbing on sealed vinyl flooring',
            'Complete eye-wash and spill-kit drill in the Randburg simulation bay',
          ],
          quizQuestion: 'How much chemical concentrate is required to prepare a 10-litre mop bucket at a 1:50 dilution ratio?',
          quizOptions: ['50 ml concentrate', '100 ml concentrate', '200 ml concentrate', '500 ml concentrate'],
          correctOptionIndex: 2,
        },
      },
      {
        id: 'cp-m3',
        number: '03',
        title: 'Workforce Scheduling, Relief Planning & Quality Auditing',
        duration: '4 Weeks',
        type: 'Workplace Logbook',
        summary: 'Structuring shift rosters, calculating square-metre productivity rates, managing relief staff, and conducting SLA client walkthroughs.',
        keyTopics: ['ISSA productivity rates per m²', 'SLA scorecards', 'Consumable stock control', 'EISA readiness portfolio'],
      },
    ],
  },
  {
    id: 'occ-commercial-cleaner-nqf1',
    code: 'QCTO-CC-L1',
    title: 'Occupational Qualification: Commercial Cleaner',
    shortSummary:
      'Foundational 120-credit NQF Level 1 qualification covering professional equipment handling, chemical safety, floor care, and commercial hygiene.',
    fullDescription:
      'Designed for entry-level hygiene operatives and corporate learnership cohorts, this 1-year qualification builds verifiable competence across manual and rotary floor care, washroom sanitation, waste segregation, and safe chemical handling in offices, malls, hospitals, and industrial sites.',
    category: 'Occupational Qualifications',
    careerOutcome: 'Certified Commercial Hygiene Operative',
    nqfLevel: 'NQF Level 1',
    credits: 120,
    saqaId: 'SAQA 118708',
    accreditationBody: 'QCTO & Services SETA Accredited',
    duration: '12 Months (120 Credits)',
    deliveryModes: [
      'Classroom & Assessment Bay (Randburg)',
      'On-Site Client Premises',
      'Blended (Online + Practical)',
    ],
    priceZAR: 14800,
    groupPricePerLearnerZAR: 12400,
    reliefStaffAvailable: true,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: ['Basic foundational literacy (ABET Level 3 / Grade 9 equivalent)'],
    targetAudience: 'Learnership Applicant',
    image: BRAND_IMAGES.commercialHygiene,
    nextIntake: '18 January 2027 · Quarterly Intakes',
    featured: true,
    onlineEligible: true,
    recommendedNextCourseIds: ['occ-cleaning-practitioner-nqf3', 'spec-solar-panel-cleaning'],
    modules: [
      {
        id: 'cc-m1',
        number: '01',
        title: 'Foundations of Professional Hygiene & Personal Protective Equipment',
        duration: '3 Weeks',
        type: 'Theory & Interactive Video',
        summary: 'Workplace safety, PPE selection, slip-trip-fall prevention signage, and professional conduct on client premises.',
        keyTopics: ['Hazard signage placement', 'Glove & respirator selection', 'Ergonomic posture'],
      },
      {
        id: 'cc-m2',
        number: '02',
        title: 'Rotary Single-Disc Scrubbing, Burnishing & Wet-Vac Operations',
        duration: '5 Weeks',
        type: 'Practical Simulation',
        summary: 'Hands-on mastery of industrial scrubbers, pad colour selection (black, green, red, white), and pre-use electrical cord inspections.',
        keyTopics: ['Floor pad selection', 'Ride-on & walk-behind auto-scrubbers', 'Machine post-use sanitation'],
      },
    ],
  },
  {
    id: 'spec-solar-panel-cleaning',
    code: 'TAA-SOLAR-04',
    title: 'Specialized Commercial Solar Panel & High-Reach Window Cleaning',
    shortSummary:
      'Intensive practical certification in deionized water-fed pole systems, thermal-shock prevention, and work-at-height safety for commercial PV arrays.',
    fullDescription:
      'South Africa’s commercial rooftop solar boom requires certified technicians who understand photovoltaic glass coatings, early-morning thermal shock prevention, deionized (DI) resin filtration, and safe roof-access protocols. Ideal for cleaning contractors expanding into high-margin technical services and facility maintenance teams.',
    category: 'Specialized Hygiene & Technical',
    careerOutcome: 'Certified Solar PV & High-Access Hygiene Technician',
    nqfLevel: 'Skills Programme (NQF Level 2 Aligned)',
    credits: 12,
    saqaId: 'SP-SOLAR-2026',
    accreditationBody: 'Services SETA Aligned Skills Programme',
    duration: '3 Days (1 Day Online Theory + 2 Days Practical Rig)',
    deliveryModes: [
      'Blended (Online + Practical)',
      'Classroom & Assessment Bay (Randburg)',
      'On-Site Client Premises',
    ],
    priceZAR: 3450,
    groupPricePerLearnerZAR: 2850,
    reliefStaffAvailable: true,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: ['Physical fitness for outdoor/rooftop work', 'Basic Cleaning Module 1 recommended'],
    targetAudience: 'Individual & Corporate',
    image: BRAND_IMAGES.solarSpecialized,
    nextIntake: 'Every Second Monday · Immediate Online Start',
    featured: true,
    onlineEligible: true,
    recommendedNextCourseIds: ['short-business-startup', 'occ-cleaning-practitioner-nqf3'],
    modules: [
      {
        id: 'sol-m1',
        number: '01',
        title: 'Photovoltaic Soiling Losses, Thermal Shock & Pure Water Chemistry',
        duration: '1 Day (Online Self-Paced)',
        type: 'Theory & Interactive Video',
        summary: 'Why mineral-free deionized water (0–10 TDS) is mandatory for solar panels and how to avoid micro-cracking hot PV glass.',
        keyTopics: ['TDS meter calibration (0 ppm target)', 'Ambient temperature windows', 'Electrical isolation awareness'],
        onlineContent: {
          videoDuration: '24 mins',
          readingNotes:
            'Never apply cold municipal water to solar panels exposed to direct midday sun (>40°C surface temp)—thermal shock causes micro-fractures in silicon cells and voids manufacturer warranties. Always clean between 05:30 and 09:30 using purified deionized water testing below 10 ppm Total Dissolved Solids (TDS).',
          practicalChecklist: [
            'Test pure water output with digital TDS meter (<10 ppm)',
            'Inspect non-abrasive nylon brush bristles and gooseneck angle',
            'Verify DC isolator location and roof lifeline anchor certification',
          ],
          quizQuestion: 'What is the maximum acceptable Total Dissolved Solids (TDS) reading when rinsing commercial solar panels with a purified water-fed pole system?',
          quizOptions: ['Under 10 ppm', 'Between 150 and 300 ppm', '500 ppm municipal tap standard', 'TDS does not affect solar glass'],
          correctOptionIndex: 0,
        },
      },
      {
        id: 'sol-m2',
        number: '02',
        title: 'Water-Fed Pole Handling, Roof Harness Safety & Lichen Removal',
        duration: '2 Days (Randburg Practical Rig)',
        type: 'Practical Simulation',
        summary: 'Hands-on pole technique up to 15 metres, soft-wash biofilm treatment, and fall-arrest inspection.',
        keyTopics: ['Carbon-fibre pole ergonomics', 'Bird-dropping & lichen removal', 'Yield verification reporting'],
      },
    ],
  },
  {
    id: 'short-intro-cleaning-1-2',
    code: 'TAA-IC-101',
    title: 'Introduction to Professional Cleaning (Modules 1 & 2 Combined)',
    shortSummary:
      'Fast-track 2-day foundational course covering chemical safety (MSDS), colour-coding, deep washroom hygiene, and routine commercial cleaning.',
    fullDescription:
      'Our most popular rapid-onboarding course for individuals seeking immediate employment in the cleaning sector and employers onboarding new contract staff. Combines Intro to Cleaning Module 1 (Principles, Colour-Coding, Chemical Safety) and Module 2 (Deep Bathroom Sanitation, Dusting, Floor Maintenance).',
    category: 'Foundational Cleaning Modules',
    careerOutcome: 'Entry-Level Commercial & Hospitality Cleaner',
    nqfLevel: 'Foundational Skills Certificate (NQF 1 Aligned)',
    credits: 8,
    saqaId: 'TAA-MOD-101',
    accreditationBody: 'Training Africa Academy & Services SETA Aligned',
    duration: '2 Days (or 8 Hours Self-Paced Online)',
    deliveryModes: [
      'Self-Paced Online',
      'Classroom & Assessment Bay (Randburg)',
      'On-Site Client Premises',
    ],
    priceZAR: 1450,
    groupPricePerLearnerZAR: 1150,
    reliefStaffAvailable: true,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: ['No prior formal qualification required — open to all learners'],
    targetAudience: 'Individual & Corporate',
    image: BRAND_IMAGES.commercialHygiene,
    nextIntake: 'Start Immediately Online · Weekly Randburg Practicals',
    featured: true,
    onlineEligible: true,
    recommendedNextCourseIds: ['short-deep-bathroom-carpet', 'occ-commercial-cleaner-nqf1'],
    modules: [
      {
        id: 'ic-m1',
        number: '01',
        title: 'Module 1: Hygiene Principles, SABS Colour-Coding & Chemical MSDS',
        duration: '4 Hours',
        type: 'Theory & Interactive Video',
        summary: 'Core rules of professional cleaning, Sinner’s Circle (Time, Temperature, Mechanical Action, Chemistry), and personal safety.',
        keyTopics: ['Sinner’s Circle of cleaning efficiency', 'Reading MSDS pictograms', 'Microfibre folding method (8-sided fold)'],
        onlineContent: {
          videoDuration: '22 mins',
          readingNotes:
            'Sinner’s Circle states that every cleaning process relies on four interdependent variables: Chemical Action, Mechanical Agitation, Temperature, and Contact Dwell Time. If you reduce contact dwell time on a disinfectant, disinfection fails even if you scrub harder.',
          practicalChecklist: [
            'Fold microfibre cloth into 8 clean working faces',
            'Identify corrosive, irritant, and environmental hazard pictograms',
            'Demonstrate top-to-bottom, clockwise room dusting sequence',
          ],
          quizQuestion: 'Which four factors make up Sinner’s Circle in professional cleaning science?',
          quizOptions: [
            'Water, Soap, Mop, and Bucket',
            'Time, Temperature, Mechanical Action, and Chemistry',
            'Sweeping, Mopping, Polishing, and Vacuuming',
            'Price, Speed, Staff, and Supervision',
          ],
          correctOptionIndex: 1,
        },
      },
      {
        id: 'ic-m2',
        number: '02',
        title: 'Module 2: Deep Cleaning Bathrooms, Descaling & Odour Elimination',
        duration: '4 Hours',
        type: 'Practical Simulation',
        summary: 'Step-by-step sanitation of high-traffic commercial restrooms, uric-acid scale removal, and biofilm eradication.',
        keyTopics: ['10-step restroom sanitation sequence', 'Acidic descaler safety', 'Touchpoint disinfection'],
      },
    ],
  },
  {
    id: 'short-business-startup',
    code: 'TAA-BIZ-201',
    title: 'Cleaning Enterprise Startup, Tendering & Marketing Masterclass',
    shortSummary:
      'Built on 25+ years of Cleaning Africa Services expertise: how to register, price per square metre, tender, and market a profitable cleaning company.',
    fullDescription:
      'Created for aspiring South African cleaning entrepreneurs and SMME owners. Combines our acclaimed Business Startup Course and Business Marketing Course into an actionable blueprint: CIPC/CSD compliance, BCCCI (Bargaining Council for the Contract Cleaning Industry) wage costing, equipment selection, B-BBEE positioning, and corporate client acquisition.',
    category: 'Business & Entrepreneurship',
    careerOutcome: 'Cleaning & Hygiene Business Owner / Contractor',
    nqfLevel: 'Entrepreneurship Programme (NQF 4 Aligned)',
    credits: 16,
    saqaId: 'TAA-ENT-201',
    accreditationBody: 'Services SETA New Venture Aligned',
    duration: '5 Days (Self-Paced Online or Hybrid)',
    deliveryModes: ['Self-Paced Online', 'Blended (Online + Practical)', 'Classroom & Assessment Bay (Randburg)'],
    priceZAR: 4250,
    groupPricePerLearnerZAR: 3600,
    reliefStaffAvailable: false,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: ['Basic financial literacy; passion for starting or scaling a service business'],
    targetAudience: 'Individual Learner',
    image: BRAND_IMAGES.supervisoryManagement,
    nextIntake: 'Start Immediately Online · Monthly Entrepreneur Bootcamps',
    featured: true,
    onlineEligible: true,
    recommendedNextCourseIds: ['nqf4-new-venture-creation', 'spec-solar-panel-cleaning'],
    modules: [
      {
        id: 'biz-m1',
        number: '01',
        title: 'Compliance, BCCCI Sectoral Determinations & Profitable Bidding',
        duration: '2.5 Days',
        type: 'Theory & Interactive Video',
        summary: 'How to cost commercial cleaning contracts per m² without underquoting statutory labour, UIF, COIDA, and chemical overheads.',
        keyTopics: ['BCCCI minimum wage & levy tables', 'Bill of quantities (BoQ) pricing', 'COIDA & CSD registration'],
      },
      {
        id: 'biz-m2',
        number: '02',
        title: 'B2B Marketing, SLA Proposals & Client Retention Systems',
        duration: '2.5 Days',
        type: 'Online Assessment',
        summary: 'Positioning your cleaning business for property managers, schools, clinics, and body corporates.',
        keyTopics: ['Site inspection walkthroughs', 'SLA KPI templates', 'Recurring contract retention'],
      },
    ],
  },
  {
    id: 'short-deep-bathroom-carpet',
    code: 'TAA-SPEC-105',
    title: 'Specialized Carpet Extraction, Upholstery & Deep Washroom Hygiene',
    shortSummary:
      'Hands-on technical certification in fibre identification, hot-water extraction, stain chemistry, and intensive washroom deep-cleans.',
    fullDescription:
      'Equip your hygiene team or yourself with high-demand specialist skills: textile pH testing, spotting kit chemistry (tannin, protein, oil, and dye stains), rotary bonnet maintenance, hot-water spray extraction, and deep washroom descaling.',
    category: 'Specialized Hygiene & Technical',
    careerOutcome: 'Carpet, Upholstery & Deep-Hygiene Specialist',
    nqfLevel: 'Skills Programme (NQF Level 2 Aligned)',
    credits: 10,
    saqaId: 'TAA-SPEC-105',
    accreditationBody: 'Training Africa Academy Certified',
    duration: '2 Days Practical / Blended',
    deliveryModes: [
      'Classroom & Assessment Bay (Randburg)',
      'On-Site Client Premises',
      'Blended (Online + Practical)',
    ],
    priceZAR: 2450,
    groupPricePerLearnerZAR: 1950,
    reliefStaffAvailable: true,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: ['Introduction to Professional Cleaning Module 1 or workplace experience'],
    targetAudience: 'Individual & Corporate',
    image: BRAND_IMAGES.assessmentCentre,
    nextIntake: 'Weekly Thursday–Friday Sessions in Randburg',
    featured: false,
    onlineEligible: true,
    recommendedNextCourseIds: ['spec-solar-panel-cleaning', 'occ-cleaning-practitioner-nqf3'],
    modules: [
      {
        id: 'dc-m1',
        number: '01',
        title: 'Carpet Fibre Testing, Spotting Chemistry & Hot-Water Extraction',
        duration: '1 Day',
        type: 'Practical Simulation',
        summary: 'Preventing browning, shrinkage, and delamination while removing stubborn commercial traffic lanes.',
        keyTopics: ['Wool vs synthetic fibre burn/pH test', 'Defoamer & acid-rinse neutralization', 'Turbo air-mover placement'],
      },
    ],
  },
  {
    id: 'nqf4-new-venture-creation',
    code: 'SAQA-66249',
    title: 'Further Education & Training Certificate: New Venture Creation (NQF 4)',
    shortSummary:
      'Full 149-credit Services SETA accredited qualification for emerging contractors, ESD suppliers, and enterprise development cohorts.',
    fullDescription:
      'Ideal for Corporate Enterprise & Supplier Development (ESD) programmes and ambitious entrepreneurs launching contract cleaning, hygiene, or facilities management companies. Covers financial management, business plan execution, labour law, and operations.',
    category: 'Occupational Qualifications',
    careerOutcome: 'Accredited SMME Director / ESD Supplier',
    nqfLevel: 'NQF Level 4',
    credits: 149,
    saqaId: 'SAQA 66249',
    accreditationBody: 'Services SETA Accredited',
    duration: '12 Months (Learnership / ESD Cohort)',
    deliveryModes: ['Blended (Online + Practical)', 'Classroom & Assessment Bay (Randburg)'],
    priceZAR: 22500,
    groupPricePerLearnerZAR: 18900,
    reliefStaffAvailable: false,
    reliefStaffRatePerDayZAR: 380,
    prerequisites: ['Grade 11 / NQF Level 3 or equivalent communication and mathematical literacy'],
    targetAudience: 'Learnership Applicant',
    image: BRAND_IMAGES.supervisoryManagement,
    nextIntake: '01 February 2027 · Corporate ESD Intakes Anytime',
    featured: false,
    onlineEligible: true,
    recommendedNextCourseIds: ['short-business-startup'],
    modules: [
      {
        id: 'nvc-m1',
        number: '01',
        title: 'Market Feasibility, Costing & Financial Cashflow Management',
        duration: '16 Weeks',
        type: 'Theory & Interactive Video',
        summary: 'Building bankable service business models, tender costing, and working capital control.',
        keyTopics: ['Income statements & cashflow forecasts', 'Contract pricing margins', 'Tax & VAT compliance'],
      },
    ],
  },
];

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'pathway-hygiene-professional',
    title: 'Pathway 01 · From Entry Operative to Accredited Hygiene Supervisor',
    subtitle: 'Structured NQF progression from first-time job seeker to managing commercial facility teams.',
    targetRole: 'Commercial Cleaning Supervisor / Site Manager',
    estimatedEarningsRange: 'R6,500 – R18,500 / month (Sectoral & Supervisory Tiers)',
    totalDuration: '12–24 Months Progressive',
    steps: [
      {
        stepNumber: 'Stage 01',
        stageTitle: 'Rapid Onboarding & Chemical Safety',
        courseId: 'short-intro-cleaning-1-2',
        nqf: 'NQF 1 Aligned Short Course',
        outcome: 'Qualify for entry-level commercial and hospitality cleaning roles within 48 hours.',
      },
      {
        stepNumber: 'Stage 02',
        stageTitle: 'Certified Commercial Cleaner Qualification',
        courseId: 'occ-commercial-cleaner-nqf1',
        nqf: 'NQF Level 1 · 120 Credits',
        outcome: 'Master industrial rotary machines, floor care, and full workplace logbook competence.',
      },
      {
        stepNumber: 'Stage 03',
        stageTitle: 'Occupational Cleaning Practitioner & Team Leader',
        courseId: 'occ-cleaning-practitioner-nqf3',
        nqf: 'NQF Level 3 · 126 Credits',
        outcome: 'Lead multi-shift teams, manage SLA audits, and oversee chemical & relief rosters.',
      },
    ],
  },
  {
    id: 'pathway-technical-specialist',
    title: 'Pathway 02 · High-Margin Technical Specialist (Solar, High-Access & Extraction)',
    subtitle: 'Specialize in technical commercial services that command premium daily rates across South Africa.',
    targetRole: 'Senior Technical Hygiene & Solar Maintenance Specialist',
    estimatedEarningsRange: 'R9,500 – R24,000 / month or Subcontracting Rates',
    totalDuration: '1–3 Months Intensive',
    steps: [
      {
        stepNumber: 'Stage 01',
        stageTitle: 'Foundational Hygiene & MSDS Mastery',
        courseId: 'short-intro-cleaning-1-2',
        nqf: 'NQF 1 Aligned',
        outcome: 'Understand surface pH, dilution ratios, and PPE compliance.',
      },
      {
        stepNumber: 'Stage 02',
        stageTitle: 'Carpet Extraction & Deep Washroom Sanitation',
        courseId: 'short-deep-bathroom-carpet',
        nqf: 'NQF 2 Aligned Skills Programme',
        outcome: 'Deliver periodic deep-cleans and textile restoration for corporate estates.',
      },
      {
        stepNumber: 'Stage 03',
        stageTitle: 'Commercial Solar PV & High-Reach Pure Water Cleaning',
        courseId: 'spec-solar-panel-cleaning',
        nqf: 'NQF 2 Aligned Technical Cert',
        outcome: 'Maintain commercial rooftop solar arrays with deionized water-fed pole systems.',
      },
    ],
  },
  {
    id: 'pathway-cleaning-entrepreneur',
    title: 'Pathway 03 · Cleaning Enterprise Founder & B-BBEE ESD Supplier',
    subtitle: 'Launch, register, price, and scale your own profitable contract cleaning business.',
    targetRole: 'Managing Director — Contract Cleaning & Facility Services SMME',
    estimatedEarningsRange: 'R25,000 – R150,000+ / month Contract Revenue',
    totalDuration: '5 Days Bootcamp to 12 Months NQF 4',
    steps: [
      {
        stepNumber: 'Stage 01',
        stageTitle: 'Cleaning Business Startup & Marketing Masterclass',
        courseId: 'short-business-startup',
        nqf: 'NQF 4 Aligned Masterclass',
        outcome: 'Set up BCCCI-compliant pricing per m², win your first 3 commercial contracts.',
      },
      {
        stepNumber: 'Stage 02',
        stageTitle: 'Technical Service Differentiation (Solar & Extraction)',
        courseId: 'spec-solar-panel-cleaning',
        nqf: 'High-Margin Service Add-On',
        outcome: 'Bundle solar panel & window cleaning to increase contract margin by 35%.',
      },
      {
        stepNumber: 'Stage 03',
        stageTitle: 'FET Certificate: New Venture Creation',
        courseId: 'nqf4-new-venture-creation',
        nqf: 'NQF Level 4 · 149 Credits',
        outcome: 'Qualify for corporate Enterprise & Supplier Development (ESD) procurement panels.',
      },
    ],
  },
];

export const ASSESSMENT_FACILITIES: AssessmentFacility[] = [
  {
    id: 'bay-hygiene-sim',
    name: 'Practical Hygiene & Floor-Care Simulation Bay (Bay A)',
    capacity: 'Up to 20 Candidates per Session',
    accreditationScope: 'QCTO EISA Commercial Cleaner L1 & Cleaning Practitioner L3 Practicals',
    dailyHireRateZAR: 4800,
    halfDayRateZAR: 2900,
    equipmentIncluded: [
      'Multi-surface test floors (sealed vinyl, quarry tile, porcelain, carpet, epoxy)',
      'Walk-behind & ride-on auto-scrubbers, high-speed burnishers, wet/dry extractors',
      'Full SABS colour-coded chemical dosing station & eyewash bay',
    ],
    availableDates: ['2026-11-16', '2026-11-19', '2026-11-24', '2026-11-27', '2026-12-03', '2026-12-08'],
  },
  {
    id: 'bay-solar-rig',
    name: 'Outdoor Solar PV Array & High-Reach Water-Fed Pole Training Rig (Bay B)',
    capacity: 'Up to 12 Technicians per Session',
    accreditationScope: 'Solar Panel Hygiene, Pure-Water DI Filtration & Working at Height',
    dailyHireRateZAR: 5400,
    halfDayRateZAR: 3200,
    equipmentIncluded: [
      'Pitched commercial solar PV test array & 3-storey glass facade',
      '4-stage RO/DI pure water filtration system with inline digital TDS meters',
      'Carbon-fibre water-fed poles (12m) & certified fall-arrest anchor points',
    ],
    availableDates: ['2026-11-17', '2026-11-20', '2026-11-25', '2026-12-01', '2026-12-04'],
  },
  {
    id: 'room-executive-seminar',
    name: 'Northriding Accredited Lecture & EISA Computer Assessment Suite',
    capacity: '32 Seated (U-Shape / Classroom) · 24 Workstations',
    accreditationScope: 'QCTO External Integrated Summative Assessment (EISA) Theory & Corporate Workshops',
    dailyHireRateZAR: 3900,
    halfDayRateZAR: 2400,
    equipmentIncluded: [
      '4K Interactive laser projection, uncapped fibre Wi-Fi & backup solar/inverter power',
      'Biometric candidate sign-in & CCTV invigilation compliance for QCTO EISA',
      'Optional tea/coffee & halaal-friendly working lunch catering',
    ],
    availableDates: ['2026-11-13', '2026-11-18', '2026-11-23', '2026-11-26', '2026-12-02', '2026-12-09'],
  },
];

export const FACILITATORS: Facilitator[] = [
  {
    id: 'fac-1',
    name: 'Thabo Mokoena',
    role: 'Lead Occupational Facilitator & Registered QCTO Assessor',
    registrationCode: 'SSETA-ASS-88412',
    specialisation: 'Commercial Hygiene Operations, Auto-Scrubber Fleet Mastery & OHS Compliance',
    yearsExperience: 16,
    languages: ['English', 'isiZulu', 'Sesotho'],
    bio: 'With 16 years in large-scale commercial and healthcare hygiene across Gauteng, Thabo leads practical simulation assessments and on-site corporate workforce upskilling.',
  },
  {
    id: 'fac-2',
    name: 'Sarah Molefe',
    role: 'Head of Enterprise Development & NQF Moderator',
    registrationCode: 'SSETA-MOD-44910',
    specialisation: 'Cleaning Business Startup, BCCCI Tender Costing & NQF Level 4 New Venture Creation',
    yearsExperience: 14,
    languages: ['English', 'Setswana', 'isiXhosa'],
    bio: 'Sarah has mentored over 180 South African cleaning SMMEs through CIPC/BCCCI compliance, profitable per-square-metre tendering, and corporate ESD programmes.',
  },
  {
    id: 'fac-3',
    name: 'Johan van der Merwe',
    role: 'Technical Specialist Instructor (Solar PV, Window & Textile Restoration)',
    registrationCode: 'TAA-TECH-2091',
    specialisation: 'Deionized Water-Fed Pole Systems, Solar PV Maintenance & Carpet Chemistry',
    yearsExperience: 19,
    languages: ['English', 'Afrikaans'],
    bio: 'Specialist in high-reach purified water systems and commercial solar array maintenance, training facility teams to protect asset warranties and boost PV output.',
  },
];

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'news-qcto-2026',
    title: 'Employer Guide: Transitioning to QCTO Occupational Qualifications in the Hygiene Sector',
    category: 'Accreditation & Policy',
    date: '04 November 2026',
    readTime: '4 min read',
    author: 'Sarah Molefe · Head of Enterprise Development',
    excerpt:
      'How South African facility managers and HR leaders can align their 2026/2027 Workplace Skills Plans (WSP) with QCTO NQF Level 1 and Level 3 occupational qualifications.',
    content: [
      'South Africa’s skills development landscape has shifted decisively toward Quality Council for Trades and Occupations (QCTO) occupational qualifications that integrate three compulsory components: Knowledge Modules, Practical Skill Modules in an accredited simulation centre, and Workplace Experience Modules.',
      'For employers in the commercial cleaning, healthcare, retail, and property management sectors, enrolling staff into the NQF Level 1 Commercial Cleaner (120 Credits) or NQF Level 3 Cleaning Practitioner (126 Credits) unlocks both Mandatory and Discretionary SETA grant recoveries while qualifying for Section 12H tax allowances and B-BBEE Skills Development points.',
      'Because operational continuity cannot stop while cleaners train, Training Africa Academy—backed by Cleaning Africa Services—uniquely provides vetted Relief Staff at R380/day so your sites remain 100% staffed during classroom and simulation blocks.',
    ],
  },
  {
    id: 'news-solar-yield',
    title: 'Why Uncleaned Commercial Solar Arrays Lose Up to 18% Generation Yield in Gauteng',
    category: 'Technical Hygiene Insights',
    date: '21 October 2026',
    readTime: '5 min read',
    author: 'Johan van der Merwe · Technical Specialist Instructor',
    excerpt:
      'Highveld dust, diesel particulates, and bird fouling create hot-spots on commercial rooftop PV panels. Here is why municipal tap water ruins solar glass—and how DI pure water solves it.',
    content: [
      'Commercial landlords across Johannesburg, Midrand, and Pretoria have invested billions in rooftop solar PV installations. However, dry winter dust and industrial particulates rapidly coat anti-reflective solar glass, cutting kilowatt-hour output by 12% to 18%.',
      'Using borehole or municipal tap water with high mineral content leaves calcium carbonate scaling on the glass, while cleaning hot panels midday causes thermal shock micro-cracks. Our 3-day Specialized Solar Panel Cleaning course certifies technicians in 0–10 ppm deionized water-fed pole operations and early-morning safety protocols.',
    ],
  },
  {
    id: 'news-cleaning-startup',
    title: 'How to Price Commercial Cleaning Contracts Per Square Metre Without Underquoting BCCCI Wages',
    category: 'Entrepreneurship',
    date: '09 October 2026',
    readTime: '6 min read',
    author: 'Sarah Molefe · Head of Enterprise Development',
    excerpt:
      'The #1 reason emerging cleaning contractors fail in their first year is underpricing labour and statutory levies. Learn the exact costing formula taught in our Startup Masterclass.',
    content: [
      'Winning a cleaning tender at a loss is worse than losing the bid. Every legitimate contract cleaning business in South Africa must factor in Bargaining Council (BCCCI) minimum hourly rates, annual bonuses, UIF, COIDA, provident fund contributions, uniform replacements, and chemical consumption per square metre.',
      'In our 5-day Cleaning Enterprise Startup & Marketing Masterclass, learners build live Excel costing sheets calibrated for office parks, clinics, schools, and industrial warehouses.',
    ],
  },
];

export const SITEMAP_SPEC: {
  id: PageId;
  number: string;
  title: string;
  urlPath: string;
  primaryAudience: string;
  conversionGoal: string;
  keyModules: string[];
}[] = [
  {
    id: 'home',
    number: '01',
    title: 'Home (Dual-Audience Gateway)',
    urlPath: '/',
    primaryAudience: 'Individual Learners & Corporate Employers',
    conversionGoal: 'Route user via "I want to study" or "Train my team", search courses, and trigger immediate enrolment or corporate quote',
    keyModules: ['Dual Entry Hero', 'Live Course Search', 'Featured Courses with Transparent ZAR Pricing', '4 Delivery Modes', 'Cleaning Africa Services Credibility Strip'],
  },
  {
    id: 'about',
    number: '02',
    title: 'About & Accreditations',
    urlPath: '/about-accreditations',
    primaryAudience: 'All Audiences & Quality Auditors',
    conversionGoal: 'Verify QCTO, Services SETA, SAQA alignment & Cleaning Africa Services heritage (est. 2000)',
    keyModules: ['25+ Year Heritage Timeline', 'QCTO & Services SETA Verification Matrix', 'Downloadable Accreditation Proof'],
  },
  {
    id: 'catalogue',
    number: '03',
    title: 'Find a Course / Course Catalogue',
    urlPath: '/courses',
    primaryAudience: 'Individual Learners & L&D Managers',
    conversionGoal: 'Filter by career outcome, NQF level, delivery mode & budget; compare and select course',
    keyModules: ['Multi-Facet Filter Bar', 'Transparent Pricing Cards', 'Side-by-Side Course Comparison'],
  },
  {
    id: 'course-detail',
    number: '04',
    title: 'Individual Course Detail',
    urlPath: '/courses/[slug]',
    primaryAudience: 'Prospective Enrollees & HR Buyers',
    conversionGoal: 'Review curriculum, prerequisites, cost & relief staff options; Enrol & Pay or Download Brochure',
    keyModules: ['Module-by-Module Breakdown', 'Individual vs Group Pricing Calculator', 'Instant PDF Brochure Spec Sheet'],
  },
  {
    id: 'online-learning',
    number: '05',
    title: 'Online Learning (Self-Paced LMS Player)',
    urlPath: '/online-learning',
    primaryAudience: 'Enrolled Individual & Corporate Learners',
    conversionGoal: 'Complete interactive modules, use Chemical Dilution Simulator, pass assessment & unlock next course',
    keyModules: ['Interactive Lesson Player', 'Chemical Dilution & pH Lab Simulator', 'Auto-Graded Assessment Quiz', 'Next-Course Recommender'],
  },
  {
    id: 'employers',
    number: '06',
    title: 'Training for Employers (Corporate L&D)',
    urlPath: '/employers',
    primaryAudience: 'HR, L&D, Operations & WSP Managers',
    conversionGoal: 'Calculate group quote with optional R380/day relief staff, batch-enrol multiple staff & track cohort completion',
    keyModules: ['Industry Training Selector', 'Group Quote & Relief Staff Calculator', 'Multi-Staff Batch Enrolment Table', 'Authorised Cohort Progress Portal'],
  },
  {
    id: 'qualifications',
    number: '07',
    title: 'Qualifications & Learnerships',
    urlPath: '/qualifications-learnerships',
    primaryAudience: 'Learnership Applicants & Host Employers',
    conversionGoal: 'Review NQF 1, 3 & 4 entry criteria, intake dates & Section 12H tax benefits; submit structured application',
    keyModules: ['SAQA Qualification Matrix', '2026/2027 Intake Calendar', 'Structured Application Form with Reference Generator'],
  },
  {
    id: 'pathways',
    number: '08',
    title: 'Career / Learning Pathways',
    urlPath: '/career-pathways',
    primaryAudience: 'Career Starters, Supervisors & Entrepreneurs',
    conversionGoal: 'Map step-by-step progression from NQF 1 Cleaner to NQF 3 Supervisor or NQF 4 Business Owner',
    keyModules: ['Interactive 3-Track Career Map', 'Earnings & Role Outcomes', '1-Click Stage Enrolment'],
  },
  {
    id: 'assessment-centre',
    number: '09',
    title: 'Assessment Centre & Venue Hire',
    urlPath: '/assessment-centre-venue-hire',
    primaryAudience: 'External Training Providers, Trade Test Candidates & Corporate Clients',
    conversionGoal: 'Inspect Randburg simulation bays & lecture rooms, check live dates, and generate instant booking quotation',
    keyModules: ['Facility & Bay Specifications', 'Live Date Availability Picker', 'Instant Venue Quotation & Confirmation'],
  },
  {
    id: 'facilitators',
    number: '10',
    title: 'Facilitators / Training Approach',
    urlPath: '/facilitators-approach',
    primaryAudience: 'Learners & Corporate Quality Assurance Teams',
    conversionGoal: 'Build confidence in 70/30 practical pedagogy, multilingual instruction & registered SETA assessors',
    keyModules: ['70% Practical / 30% Theory Methodology', 'Registered Assessor & Moderator Profiles', 'Workplace Integration Model'],
  },
  {
    id: 'resources',
    number: '11',
    title: 'Resources / FAQs',
    urlPath: '/resources-faqs',
    primaryAudience: 'All Audiences',
    conversionGoal: 'Resolve pre-enrolment questions and download free compliance checklists & colour-coding guides',
    keyModules: ['Categorised FAQ Search', 'Downloadable SABS Colour-Coding Chart', 'WSP & MSDS Toolkits'],
  },
  {
    id: 'news',
    number: '12',
    title: 'News / Insights',
    urlPath: '/news-insights',
    primaryAudience: 'Facility Managers, Entrepreneurs & Learners',
    conversionGoal: 'Educate market on QCTO transitions, solar hygiene ROI, and BCCCI tender pricing',
    keyModules: ['Editorial Industry Briefs', 'Full Article Reader', 'Contextual Course Links'],
  },
  {
    id: 'contact',
    number: '13',
    title: 'Contact / Locations',
    urlPath: '/contact-locations',
    primaryAudience: 'All Audiences',
    conversionGoal: 'Connect with Northriding Randburg campus or schedule nationwide mobile on-site training',
    keyModules: ['Randburg Head Office Details', 'National On-Site Coverage Matrix', 'Validated Direct Enquiry Form'],
  },
  {
    id: 'policies',
    number: '14',
    title: 'Privacy, Terms & Learner Policies',
    urlPath: '/policies',
    primaryAudience: 'Learners, Employers & Regulators',
    conversionGoal: 'Provide transparent governance on POPIA, refunds, RPL, and assessment appeals',
    keyModules: ['POPIA Data Protection', 'Refund & Deferral Terms', 'RPL & Assessment Appeals Charter'],
  },
  {
    id: 'dashboard',
    number: '15',
    title: 'Login / Learner Dashboard & In-House CMS',
    urlPath: '/dashboard',
    primaryAudience: 'Enrolled Learners, Corporate Admins & In-House Academy Staff',
    conversionGoal: 'Track active courses, download certificates, see next-course recommendations, and expand programmes in-house with Nano Banana AI visuals',
    keyModules: ['Learner Progress & Certificate Hub', 'Next-Course Recommendation Engine', 'In-House Programme Expansion CMS + Nano Banana Studio'],
  },
];
