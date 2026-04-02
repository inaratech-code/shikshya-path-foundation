/**
 * Central copy for Shikshya Path — contact, destinations, services, SEO helpers.
 */

export const SITE_MOTTO = 'Your Dream Our Guidance';

/**
 * Full main logo — header, footer, about, admin login, social previews, SEO, structured data.
 * `public/images/SPF_Cropped-removebg-preview.png`
 */
export const MAIN_SITE_LOGO_PATH = '/images/SPF_Cropped-removebg-preview.png' as const;

/**
 * Admin sidebar mark (same asset as main logo for a consistent brand mark).
 */
export const NAVBAR_LOGO_PATH = '/images/SPF_Cropped-removebg-preview.png' as const;

/** @deprecated Use MAIN_SITE_LOGO_PATH — kept for older imports */
export const SITE_LOGO_PATH = MAIN_SITE_LOGO_PATH;

/** Browser tab / favicon — same asset as `MAIN_SITE_LOGO_PATH`. */
export const SITE_FAVICON_PATH = MAIN_SITE_LOGO_PATH;

function siteOriginBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://shikshyapath.edu.np').replace(/\/$/, '');
}

export function getMainSiteLogoAbsoluteUrl(): string {
  return `${siteOriginBase()}${MAIN_SITE_LOGO_PATH}`;
}

export function getNavbarLogoAbsoluteUrl(): string {
  return `${siteOriginBase()}${NAVBAR_LOGO_PATH}`;
}

/** Organization logo for JSON-LD / SEO — full main logo. */
export function getSiteLogoAbsoluteUrl(): string {
  return getMainSiteLogoAbsoluteUrl();
}

export function getSiteFaviconAbsoluteUrl(): string {
  return getNavbarLogoAbsoluteUrl();
}

export const siteContact = {
  addressLines: ['Ramshah Path, Putalisadak', 'Kathmandu, Nepal'],
  addressSingle: 'Ramshah Path, Putalisadak, Kathmandu, Nepal',
  email: 'shikshyapathofficial@gmail.com',
  whatsappDisplay: '+977 9712036939',
  whatsappTel: '9779712036939',
  phoneLandline: '01-4528000 / 01-4529000',
  mobile: '+977 9851408110',
} as const;

export const siteSocial = {
  facebook: {
    name: 'Shikshya Path Foundation',
    url: 'https://www.facebook.com/share/1CL399G2iT/',
  },
  instagram: {
    name: 'Shikshya Path Foundation',
    url: 'https://www.instagram.com/shikshyapathfoundation?igsh=MWlsb2YydDNrN2ZsaQ==',
  },
  tiktok: {
    name: 'Shikshya Path Foundation',
    url: 'https://www.tiktok.com/@shikshyapathfoundation?_r=1&_t=ZS-94wsUtjKrQa',
  },
} as const;

export const servicesCopy = {
  abroadStudies: {
    title: 'Abroad Studies',
    body:
      'We act as a trusted bridge between Nepalese students and leading educational institutions worldwide, enabling access to quality international education. Built on a foundation of integrity, reliability, and commitment, we guide aspiring students toward the right academic pathways abroad. Our consistent success, combined with transparent counseling and a supportive environment, has earned us a strong reputation and lasting trust in the industry.',
  },
  testPreparation: {
    title: 'Test Preparation',
    body:
      'Getting ready to study abroad means preparing for important exams—and we’re here to help. We offer classroom training for IELTS and PTE with flexible schedules and personal support. From updated study materials to practice tests and expert guidance, we make sure you feel confident and fully prepared to achieve your best score.',
  },
  documentationGuide: {
    title: 'Documentation Guide',
    body:
      'We provide complete documentation guidance to ensure a smooth and hassle-free study abroad process for our students. From application forms and academic transcripts to financial documents, SOPs, and visa requirements, we assist at every step with accuracy and attention to detail. Our team offers clear instructions, regular follow-ups, and personalized support to help students prepare and organize their documents effectively. With up-to-date knowledge of embassy requirements and institutional guidelines, we minimize errors and delays, making the entire documentation process simple, efficient, and reliable for our students.',
  },
  universityCollegeGuide: {
    title: 'University / College Guide',
    body:
      'We offer expert guidance in selecting the right university or college that aligns with each student’s academic background, career goals, and financial considerations. With in-depth knowledge of global education systems and institutions, we help students explore suitable options across various countries and programs. Our counselors provide personalized recommendations, ensuring that students make informed decisions about their future. From shortlisting institutions to assisting with applications, we support students at every step, making the selection process clear, strategic, and stress-free.',
  },
} as const;

export type StudyDestinationBlock = {
  slug: string;
  key: string;
  accordionTitle: string;
  universityCardTitle: string;
  showOnUniversityTiles: boolean;
  flagImgAccordion: string;
  flagImgTile: string;
  bgImg: string;
  bgImgAlt: string;
  heroForPage: string;
  destinationValue: string;
  /** Short lead for cards / meta */
  seoSummary: string;
  /** Two rich paragraphs for SEO */
  bodyParagraphs: [string, string];
  requirements: string[];
  intakeInfo: string;
  cost: string;
};

/** Fallback when Pexels primary fails (university cards use this chain) */
const H = {
  au: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb886?auto=format&fit=crop&w=1400&q=85',
  uk: 'https://images.unsplash.com/photo-1513635269976-596596e8df88?auto=format&fit=crop&w=1400&q=85',
  nz: 'https://images.unsplash.com/photo-1469528849692-9bcd8c38e792?auto=format&fit=crop&w=1400&q=85',
  ca: 'https://images.unsplash.com/photo-1517935706615-2717063c2215?auto=format&fit=crop&w=1400&q=85',
  us: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1400&q=85',
  eu: 'https://images.unsplash.com/photo-1467261338127-7a468c63a068?auto=format&fit=crop&w=1400&q=85',
  jp: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1400&q=85',
  kr: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1400&q=85',
} as const;

/** Country banner + card imagery (Pexels — reliable CDN). heroForPage matches bgImg for accordions. */
const PX = {
  au: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=1600',
  uk: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600',
  nz: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1600',
  ca: 'https://images.pexels.com/photos/2449452/pexels-photo-2449452.jpeg?auto=compress&cs=tinysrgb&w=1600',
  us: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1600&q=82',
  /** Pexels 161901 was unreliable; use Unsplash (same as H.eu) + Pexels UK as card fallback */
  eu: 'https://images.unsplash.com/photo-1467261338127-7a468c63a068?auto=format&fit=crop&w=1600&q=82',
  jp: 'https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1600',
  kr: 'https://images.pexels.com/photos/6147369/pexels-photo-6147369.jpeg?auto=compress&cs=tinysrgb&w=1600',
} as const;

export const studyDestinations: StudyDestinationBlock[] = [
  {
    slug: 'australia',
    key: 'australia',
    accordionTitle: 'Study in Australia',
    universityCardTitle: 'Popular Universities Australia',
    showOnUniversityTiles: true,
    flagImgAccordion: 'https://flagcdn.com/w320/au.png',
    flagImgTile: 'https://flagcdn.com/w80/au.png',
    bgImg: PX.au,
    bgImgAlt: H.au,
    heroForPage: PX.au,
    destinationValue: 'australia',
    seoSummary:
      'Study in Australia from Nepal in 2026 — world-class education and post-study work pathways for Nepali students.',
    bodyParagraphs: [
      'Studying in Australia from Nepal in 2026 offers access to world-class education along with valuable post-study work opportunities. To apply, students must have completed 12 years of education, meet English language requirements (such as an IELTS score of 6.0+ or PTE 50+), obtain a Confirmation of Enrolment (CoE) from a CRICOS-registered institution, and apply for the Subclass 500 student visa. The average annual cost of study ranges from AUD 20,000 to AUD 45,000.',
      'This guide provides a complete overview of available courses, tuition fees, the visa application process, and scholarship opportunities for Nepali students planning to study in Australia.',
    ],
    requirements: [
      '12 years of completed education',
      'English proficiency (IELTS 6.0+ or PTE 50+ typically)',
      'CoE from a CRICOS-registered institution',
      'Subclass 500 student visa application',
      'Financial documents as per immigration requirements',
    ],
    intakeInfo:
      'Major intakes include February (main), July (major), and November at select institutions. Plan tests and applications early to secure your CoE.',
    cost: 'Annual tuition often ranges from approximately AUD 20,000 to AUD 45,000 depending on course and institution. We help you compare options and scholarships.',
  },
  {
    slug: 'uk',
    key: 'uk',
    accordionTitle: 'Study in UK',
    universityCardTitle: 'Popular Universities UK',
    showOnUniversityTiles: true,
    flagImgAccordion: 'https://flagcdn.com/w320/gb.png',
    flagImgTile: 'https://flagcdn.com/w80/gb.png',
    bgImg: PX.uk,
    bgImgAlt: H.uk,
    heroForPage: PX.uk,
    destinationValue: 'uk',
    seoSummary:
      'Study in the UK from Nepal — globally recognised degrees, CAS, Student visa, and tuition guidance for Nepali students.',
    bodyParagraphs: [
      'Dreaming of studying in the UK from Nepal? The UK offers top-quality education, globally recognized degrees, and great post-study career opportunities. To get started, students need to complete 12 years of education, meet English language requirements, prepare necessary documents, receive a Confirmation of Acceptance for Studies (CAS) from a UK university, and apply for a Student visa. Tuition fees usually range between GBP 12,000 and GBP 25,000 per year.',
      'With its historic cities, vibrant culture, and world-renowned universities, the UK is a favorite choice for Nepali students. This guide covers everything you need to know about courses, tuition fees, the visa process, and scholarship options for studying in the UK from Nepal.',
    ],
    requirements: [
      'Valid passport and academic transcripts',
      'English proficiency (IELTS/PTE as required)',
      'CAS from a licensed UK institution',
      'Financial proof for visa',
      'Student visa application',
    ],
    intakeInfo:
      'Common intakes include September (main), January, and May for select programs. Deadlines vary by university.',
    cost: 'Tuition often falls between approximately GBP 12,000 and GBP 25,000 per year depending on course and location.',
  },
  {
    slug: 'new-zealand',
    key: 'new-zealand',
    accordionTitle: 'Study in New Zealand',
    universityCardTitle: 'Popular Universities New Zealand',
    showOnUniversityTiles: true,
    flagImgAccordion: 'https://flagcdn.com/w320/nz.png',
    flagImgTile: 'https://flagcdn.com/w80/nz.png',
    bgImg: PX.nz,
    bgImgAlt: H.nz,
    heroForPage: PX.nz,
    destinationValue: 'new-zealand',
    seoSummary:
      'Study in New Zealand from Nepal — safe campuses, recognised degrees, and student visa guidance for 2026.',
    bodyParagraphs: [
      'Planning to study in New Zealand from Nepal in 2026? New Zealand offers high-quality education, internationally recognized degrees, and excellent post-study work opportunities. To apply, students need to complete 12 years of education, meet English language requirements (such as IELTS 6.0+ or PTE 50+), obtain an Offer of Place from a recognized institution, and apply for a Student Visa. Tuition fees usually range from NZD 20,000 to NZD 40,000 per year.',
      'New Zealand is a top choice for Nepali students due to its safe and welcoming environment, vibrant culture, and globally respected universities. This guide provides everything you need to know about courses, tuition fees, the visa process, and available scholarship opportunities for Nepali students planning to study in New Zealand.',
    ],
    requirements: [
      'Offer of Place from a recognised NZ provider',
      'English test scores as required',
      'Genuine student documentation',
      'Student visa application',
      'Financial evidence',
    ],
    intakeInfo:
      'Popular intakes include February and July, with limited November options at some institutions.',
    cost: 'Annual tuition often ranges from approximately NZD 20,000 to NZD 40,000 depending on program and city.',
  },
  {
    slug: 'canada',
    key: 'canada',
    accordionTitle: 'Study in Canada',
    universityCardTitle: 'Popular Universities Canada',
    showOnUniversityTiles: true,
    flagImgAccordion: 'https://flagcdn.com/w320/ca.png',
    flagImgTile: 'https://flagcdn.com/w80/ca.png',
    bgImg: PX.ca,
    bgImgAlt: H.ca,
    heroForPage: PX.ca,
    destinationValue: 'canada',
    seoSummary:
      'Study in Canada from Nepal — DLI admissions, study permit, and costs for Nepali students in 2026.',
    bodyParagraphs: [
      'Looking to study in Canada from Nepal in 2026? Canada offers world-class education, globally recognized degrees, and excellent post-study work opportunities. To apply, students need to complete 12 years of education, meet English language requirements (IELTS 6.0+ or PTE 50+), secure a Letter of Acceptance from a designated learning institution (DLI), and apply for a Study Permit. Tuition fees usually range from CAD 15,000 to CAD 35,000 per year.',
      'Canada is a top choice for Nepali students thanks to its safe, multicultural environment, high quality of life, and internationally respected universities. This guide provides all the essential information on courses, costs, the visa process, and scholarship opportunities for Nepali students planning to study in Canada.',
    ],
    requirements: [
      'Letter of Acceptance from a DLI',
      'English proficiency (IELTS/PTE as required)',
      'Study Permit application',
      'Financial proof (GIC where applicable)',
      'Valid passport and academic records',
    ],
    intakeInfo:
      'Major intakes often include September, January, and May depending on the program and college or university.',
    cost: 'Tuition commonly ranges from approximately CAD 15,000 to CAD 35,000 per year before living expenses.',
  },
  {
    slug: 'usa',
    key: 'usa',
    accordionTitle: 'Study in USA',
    universityCardTitle: 'Popular Universities USA',
    showOnUniversityTiles: true,
    flagImgAccordion: 'https://flagcdn.com/w320/us.png',
    flagImgTile: 'https://flagcdn.com/w80/us.png',
    bgImg: PX.us,
    bgImgAlt: H.us,
    heroForPage: PX.us,
    destinationValue: 'usa',
    seoSummary:
      'Study in the USA from Nepal — I-20, F-1 visa, and tuition planning for Nepali students in 2026.',
    bodyParagraphs: [
      'Studying in the USA from Nepal in 2026 offers world-class education, globally recognized degrees, and excellent post-study work opportunities. To study in the USA, students must complete 12 years of education, meet English language proficiency requirements (such as IELTS 6.0+ or TOEFL 80+), obtain an I-20 form from a SEVP-certified university, and apply for an F-1 Student Visa. Tuition fees typically range from USD 20,000 to USD 50,000 per year, depending on the university and program.',
      'The United States is one of the most popular destinations for Nepali students due to its diverse culture, top-ranked universities, and wide range of academic programs. This guide provides complete information on courses, tuition fees, the visa process, and scholarship opportunities for students planning to study in the USA from Nepal.',
    ],
    requirements: [
      'I-20 from a SEVP-certified institution',
      'English scores (IELTS/TOEFL as required)',
      'F-1 visa interview and documentation',
      'Proof of funds',
      'Academic transcripts and supporting documents',
    ],
    intakeInfo:
      'Common entry points include Fall (August–September), Spring (January), and Summer terms depending on the program.',
    cost: 'Annual tuition often ranges from approximately USD 20,000 to USD 50,000 depending on institution and field of study.',
  },
  {
    slug: 'europe',
    key: 'europe',
    accordionTitle: 'Study in Europe',
    universityCardTitle: 'Popular Universities Europe',
    showOnUniversityTiles: false,
    flagImgAccordion: 'https://flagcdn.com/w320/eu.png',
    flagImgTile: 'https://flagcdn.com/w80/eu.png',
    bgImg: PX.eu,
    bgImgAlt: PX.uk,
    heroForPage: PX.eu,
    destinationValue: 'europe',
    seoSummary:
      'Study in Europe from Nepal — English-taught programs, visas by country, and tuition ranges for Nepali students.',
    bodyParagraphs: [
      'Thinking about studying in Europe from Nepal in 2026? Europe offers world-class education, internationally recognized degrees, and great opportunities for post-study work. To get started, students need to complete 12 years of education, meet English language requirements (such as IELTS or TOEFL), secure an admission offer from a recognized university, and apply for the student visa of the country they plan to study in. Tuition fees usually range from EUR 8,000 to EUR 30,000 per year, depending on the program and country.',
      'Europe is a top choice for Nepali students because of its rich culture, historic cities, and high-quality universities. This guide provides everything you need to know about courses, tuition fees, visa requirements, and scholarship options for students planning to study in Europe from Nepal.',
    ],
    requirements: [
      'Admission offer from a recognised institution',
      'English or local language proof (program-dependent)',
      'Student visa for the chosen country',
      'Financial documentation',
      'Valid passport and academic records',
    ],
    intakeInfo:
      'Intakes vary by country and university—Fall and Spring are common; confirm deadlines on your offer letter.',
    cost: 'Tuition often ranges from approximately EUR 8,000 to EUR 30,000 per year depending on destination and program.',
  },
  {
    slug: 'japan',
    key: 'japan',
    accordionTitle: 'Study in Japan',
    universityCardTitle: 'Popular Universities Japan',
    showOnUniversityTiles: false,
    flagImgAccordion: 'https://flagcdn.com/w320/jp.png',
    flagImgTile: 'https://flagcdn.com/w80/jp.png',
    bgImg: PX.jp,
    bgImgAlt: H.jp,
    heroForPage: PX.jp,
    destinationValue: 'japan',
    seoSummary:
      'Study in Japan from Nepal — student visa, language tests, and tuition for Nepali applicants.',
    bodyParagraphs: [
      'Planning to study in Japan from Nepal in 2026? Japan is known for its world-class education, advanced technology, and unique cultural experience. To study there, you’ll need to complete 12 years of education, meet Japanese or English language requirements (JLPT, IELTS, or TOEFL), secure an admission offer from a recognized university, and apply for a Student Visa. Tuition fees typically range from JPY 535,000 to JPY 1,200,000 per year.',
      'With its innovative universities, safe environment, and rich culture, Japan is a popular choice for Nepali students. This guide provides all the essential information on courses, tuition fees, visa requirements, and scholarship opportunities for studying in Japan from Nepal.',
    ],
    requirements: [
      'Admission from a recognised institution',
      'JLPT / IELTS / TOEFL as required by the program',
      'Certificate of Eligibility (COE) process',
      'Student visa application',
      'Financial proof',
    ],
    intakeInfo:
      'April and September/October intakes are common; confirm with your chosen university.',
    cost: 'Annual tuition often falls between approximately JPY 535,000 and JPY 1,200,000 depending on program and institution.',
  },
  {
    slug: 'korea',
    key: 'korea',
    accordionTitle: 'Study in South Korea',
    universityCardTitle: 'Popular Universities South Korea',
    showOnUniversityTiles: false,
    flagImgAccordion: 'https://flagcdn.com/w320/kr.png',
    flagImgTile: 'https://flagcdn.com/w80/kr.png',
    bgImg: PX.kr,
    bgImgAlt: H.kr,
    heroForPage: PX.kr,
    destinationValue: 'korea',
    seoSummary:
      'Study in South Korea from Nepal — TOPIK/English scores, student visa, and tuition for Nepali students.',
    bodyParagraphs: [
      'Thinking about studying in South Korea from Nepal in 2026? South Korea offers high-quality education, cutting-edge research opportunities, and exciting career prospects after graduation. To apply, students need to complete 12 years of education, meet Korean or English language requirements (TOPIK, IELTS, or TOEFL), secure an admission offer from a recognized university, and apply for a Student Visa. Tuition fees usually range from KRW 5,000,000 to KRW 15,000,000 per year, depending on the program and university.',
      'South Korea is a top choice for Nepali students because of its modern education system, vibrant culture, and globally recognized universities. This guide covers everything you need to know about courses, tuition fees, visa requirements, and scholarship opportunities for students planning to study in South Korea from Nepal.',
    ],
    requirements: [
      'Admission offer from a recognised Korean institution',
      'TOPIK / IELTS / TOEFL as required',
      'Student visa (D-2) documentation',
      'Financial and academic records',
    ],
    intakeInfo:
      'March and September intakes are widely used; check your university calendar.',
    cost: 'Annual tuition often ranges from approximately KRW 5,000,000 to KRW 15,000,000 depending on university and field.',
  },
];

export function getStudyDestinationHero(slug: string): string {
  const n = normalizeStudySlug(slug);
  const d = studyDestinations.find((x) => x.slug === n);
  return d?.heroForPage ?? 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=1400';
}

export function normalizeStudySlug(raw: string): string {
  const s = raw.toLowerCase().trim();
  const aliases: Record<string, string> = {
    us: 'usa',
    'united-states': 'usa',
    america: 'usa',
    'united-kingdom': 'uk',
    britain: 'uk',
    england: 'uk',
    gb: 'uk',
    nz: 'new-zealand',
    'new zealand': 'new-zealand',
    'south-korea': 'korea',
    'south korea': 'korea',
    kr: 'korea',
    eu: 'europe',
  };
  return aliases[s] ?? s;
}

export type PreferredUniRegion = {
  id: string;
  title: string;
  universities: { name: string; blurb: string }[];
};

/** Options for Apply / Contact forms */
export const applyDestinationSelectOptions = [
  { value: '', label: 'Select a destination' },
  ...studyDestinations.map((d) => ({
    value: d.destinationValue,
    label: d.accordionTitle.replace(/^Study in /, ''),
  })),
];

export const preferredUniversitiesByRegion: PreferredUniRegion[] = [
  {
    id: 'uk',
    title: 'Highly preferred by Nepalese students — UK',
    universities: [
      { name: 'University of Hertfordshire', blurb: 'Very popular among Nepalese students for affordable tuition and strong student support.' },
      { name: 'University of East London', blurb: 'Known for flexible entry requirements and practical courses.' },
      { name: 'Coventry University', blurb: 'Offers career-focused programs and good placement opportunities.' },
      { name: 'University of Greenwich', blurb: 'Popular for business, IT, and engineering courses.' },
      { name: 'University of West London', blurb: 'Known for hospitality, business, and health-related programs.' },
    ],
  },
  {
    id: 'australia',
    title: 'Highly preferred by Nepalese students — Australia',
    universities: [
      { name: 'University of Tasmania', blurb: 'Popular for affordable tuition fees and strong support for international students.' },
      { name: 'Central Queensland University', blurb: 'Known for flexible entry requirements and practical, career-focused programs.' },
      { name: 'Federation University Australia', blurb: 'Offers a supportive learning environment and good post-study opportunities.' },
      { name: 'Charles Sturt University', blurb: 'Recognized for quality education, especially in business, IT, and health courses.' },
      { name: 'Southern Cross University', blurb: 'Well-known for affordable programs and student-friendly campuses.' },
    ],
  },
  {
    id: 'new-zealand',
    title: 'Highly preferred by Nepalese students — New Zealand',
    universities: [
      { name: 'Auckland University of Technology', blurb: 'Popular for modern facilities, practical learning, and strong student support.' },
      { name: 'University of Waikato', blurb: 'Known for business, IT, and management programs with good career outcomes.' },
      { name: 'Massey University', blurb: 'Offers flexible study options and a wide range of courses.' },
      { name: 'University of Canterbury', blurb: 'Well-regarded for engineering, science, and research-focused programs.' },
      { name: 'Lincoln University', blurb: 'Specializes in agriculture, environment, and applied sciences.' },
    ],
  },
  {
    id: 'usa',
    title: 'Highly preferred by Nepalese students — USA',
    universities: [
      { name: 'University of Texas at Arlington', blurb: 'Popular for affordable tuition, scholarships, and strong programs in engineering and business.' },
      { name: 'University of Central Missouri', blurb: 'Known for budget-friendly fees and flexible admission requirements.' },
      { name: 'Wichita State University', blurb: 'Offers career-focused education with strong internship opportunities.' },
      { name: 'Webster University', blurb: 'Recognized for small class sizes and a personalized learning environment.' },
      { name: 'Southeast Missouri State University', blurb: 'Well-known for affordable programs and supportive international student services.' },
    ],
  },
  {
    id: 'canada',
    title: 'Highly preferred by Nepalese students — Canada',
    universities: [
      { name: 'Cape Breton University', blurb: 'Popular for affordable tuition fees and strong support for international students.' },
      { name: 'University Canada West', blurb: 'Known for business and management programs with flexible intakes.' },
      { name: 'Conestoga College', blurb: 'Offers career-focused programs with strong co-op opportunities.' },
      { name: 'Centennial College', blurb: 'One of the most popular colleges for practical and industry-oriented courses.' },
      { name: 'Seneca College', blurb: 'Well-known for diverse programs and excellent student support services.' },
    ],
  },
  {
    id: 'europe',
    title: 'Highly preferred by Nepalese students — Europe',
    universities: [
      { name: 'IU International University of Applied Sciences', blurb: 'Popular for flexible study options, English-taught programs, and affordable tuition.' },
      { name: 'GISMA Business School', blurb: 'Known for business and management programs with strong industry links.' },
      { name: 'University of Europe for Applied Sciences', blurb: 'Offers career-focused courses in business, tech, and design.' },
      { name: 'Fontys University of Applied Sciences', blurb: 'Well-known for practical learning and an international environment.' },
      { name: 'Vistula University', blurb: 'Popular for affordable tuition and diverse programs for international students.' },
    ],
  },
];
