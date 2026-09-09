/**
 * ============================================================
 *  SITE CONFIG — CITY DENTAL & FACE HOSPITAL
 * ============================================================
 *  Edit this ONE file to update content across the entire site.
 *  Changes here automatically reflect in every component.
 * ============================================================
 */


// ─────────────────────────────────────────────
// 1. CLINIC — Name, tagline, rating
// ─────────────────────────────────────────────
export const CLINIC = {
  name: "City Dental & Face Hospital",
  nameLine1: "City Dental & Face",
  nameLine2: "HOSPITAL • SIWAN",
  tagline: "Best Dental & Facial Hospital in Siwan, Bihar",
  rating: "5.0 ★",
  ratingCaption: "Google Reviews",
  ratingHighlight: "Highest Rated Clinic in Siwan",
  copyrightName: "CITY DENTAL & FACE HOSPITAL (Siwan)",
};

// ─────────────────────────────────────────────
// 2. CONTACT — Phone, WhatsApp, Address, Maps
// ─────────────────────────────────────────────
export const CONTACT = {
  phone: "+91 98352 75256",
  phoneShort: "098352 75256",
  phoneDial: "tel:+919835275256",
  whatsapp: "918051313614",
  address: "Hospital Rd, Naya Bazar, Siwan",
  addressFull: "Hospital Road, Naya Bazar, Siwan, Bihar 841226",
  pincode: "841226",
  city: "Siwan",
  state: "Bihar",
  country: "IN",
  googleMapsUrl: "https://maps.app.goo.gl/vwQnt9aoxgen2cDs8",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.472714264779!2d84.3608678!3d26.2267175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3992fd0dec45ab31%3A0xce565f7b3c8e6b56!2sCITY%20DENTAL%20%26%20FACE%20HOSPITAL!5e0!3m2!1sen!2sin!4v1725870000000!5m2!1sen!2sin",
};

// ─────────────────────────────────────────────
// 3. HOURS — Opening times
// ─────────────────────────────────────────────
export const HOURS = {
  weekdays: "Mon–Sat 9AM–6PM",
  sunday: "Sun 10AM–6PM",
  combined: "Mon–Sat 9AM–6PM | Sun 10AM–6PM",
  footer: "Mon–Sat: 9 AM–6 PM | Sun: 10 AM–6 PM",
};

// ─────────────────────────────────────────────
// 4. SOCIAL — Social media links
// ─────────────────────────────────────────────
export const SOCIAL = {
  whatsapp: `https://wa.me/${CONTACT.whatsapp}`,
  facebook: "#",
  instagram: "#",
  youtube: "#",
};

// ─────────────────────────────────────────────
// 5. DOCTORS — Doctor profiles + visibility toggle
// ─────────────────────────────────────────────
export interface DoctorHighlight {
  iconName: string;
  text: string;
}

export interface Doctor {
  id: string;
  visible: boolean;
  name: string;
  degrees: string;
  role: string;
  tagline: string;
  image: string;
  bio: string;
  specialties: string[];
  highlights: DoctorHighlight[];
  whatsappNote: string;
  shortLabel: string;
}

export const DOCTORS: Doctor[] = [
  {
    id: "vijay-kumar",
    visible: true,
    name: "Dr. Vijay Kumar",
    degrees: "B.D.S., M.D.S.",
    role: "Chief Dental Surgeon & Facial Specialist",
    tagline: "Founder & Lead Maxillofacial Surgeon",
    image: "/upload/doctor1.jpg",
    bio: "Specialist in complex facial and oral surgical procedures, maxillofacial trauma, and advanced dental implantology. Commended by Siwan patients for his compassionate touch and surgical precision.",
    specialties: [
      "Facial & Maxillofacial Surgery",
      "Dental Implants & Fixed Teeth",
      "Impacted Wisdom Tooth Surgery",
      "Oral Trauma & Emergency Care",
    ],
    highlights: [
      { iconName: "GraduationCap", text: "B.D.S. & M.D.S. Surgical Specialist" },
      { iconName: "Heart", text: "Polite, Patient-First Care" },
    ],
    whatsappNote: "Consultation with Dr. Vijay Kumar (Oral & Facial Surgery)",
    shortLabel: "Dr. Vijay Kumar (Chief Dental & Facial Surgeon)",
  },
  {
    id: "neha-kumari",
    visible: true,
    name: "Dr. Neha Kumari",
    degrees: "B.D.S., M.D.S.",
    role: "Consultant Dental Surgeon & Endodontist",
    tagline: "Root Canal & Aesthetic Specialist",
    image: "/upload/doctor2.jpg",
    bio: "Dedicated specialist in painless single-sitting rotary root canal therapy, aesthetic smile transformations, and modern orthodontic alignment. Committed to stress-free dental care for adults and children.",
    specialties: [
      "Painless Rotary Root Canal (RCT)",
      "Orthodontic Braces & Clear Aligners",
      "Cosmetic Veneers & Smile Makeovers",
      "Pediatric & Family Dentistry",
    ],
    highlights: [
      { iconName: "ShieldCheck", text: "Painless Endodontic Expert" },
      { iconName: "Award", text: "Aesthetic & Orthodontic Care" },
    ],
    whatsappNote: "Consultation with Dr. Neha Kumari (RCT & Aesthetic Care)",
    shortLabel: "Dr. Neha Kumari (Consultant Endodontist)",
  },
];

// ─────────────────────────────────────────────
// 6. HERO — Homepage hero section content
// ─────────────────────────────────────────────
export const HERO = {
  headlineLine1: "Advanced Dental Care",
  headlineLine2: "& Facial Surgery Center",
  ctaPrimary: "Book on WhatsApp",
  ctaSecondary: "Locate on Map",
  heroImage: "/upload/hero.jpg",
  heroImageAlt: "City Dental and Face Hospital clinical procedure in Siwan",
  highlights: [
    { iconName: "Award", title: "Dr. Vijay Kumar (BDS, MDS)", caption: "Chief Dental & Facial Surgeon" },
    { iconName: "Star", title: "5.0 \u2605 Google Rating", caption: "Highest Rated Clinic in Siwan" },
    { iconName: "HeartPulse", title: "Painless Dental Care", caption: "Gentle RCT & Oral Surgery" },
    { iconName: "MapPin", title: "Hospital Road, Siwan", caption: "In front of Adda, Naya Bazar" },
  ],
  badge: {
    clinicLabel: "CITY DENTAL & FACE HOSPITAL",
    doctorLabel: "Dr. Vijay Kumar (B.D.S., M.D.S.)",
    rating: "5.0 \u2605",
    ratingCaption: "Google Reviews",
  },
};

// ─────────────────────────────────────────────
// 7. ABOUT — About section content
// ─────────────────────────────────────────────
export const ABOUT = {
  eyebrow: "About City Dental & Face Hospital",
  headline: "Compassionate Care, Modern Technology & Surgical Excellence",
  doctorName: "Dr. Vijay Kumar (B.D.S., M.D.S.)",
  ctaLabel: "Meet Dr. Vijay Kumar",
  image: "/upload/about.jpg",
  imageAlt: "Modern dental operatory room with high-tech monitors and chair at City Dental & Face Hospital",
  imageCaption: "Advanced Treatment Suite",
  imageLocation: "Hospital Road, Siwan",
  checklist: [
    "Comprehensive Dental & Face Hospital Infrastructure",
    "Specialist Care by Dr. Vijay Kumar (BDS, MDS)",
    "Painless Root Canal & Dental Implants",
    "Centrally Located on Hospital Road, Siwan",
  ],
  features: [
    { iconName: "ScanFace", title: "Digital Diagnostic Imaging", caption: "Accurate diagnosis for precision tooth and facial treatment" },
    { iconName: "Sparkles", title: "Rotary Endodontics (Painless RCT)", caption: "Faster, pain-free root canal treatment with high success rate" },
    { iconName: "ShieldCheck", title: "Strict Sterilization Protocols", caption: "Hospital-grade autoclaving & 100% hygienic operatory care" },
    { iconName: "Clock4", title: "Face & Oral Trauma Care", caption: "Prompt emergency care & maxillofacial surgical expertise" },
  ],
};

// ─────────────────────────────────────────────
// 8. TREATMENTS — Treatment cards (icon names resolved in component)
// ─────────────────────────────────────────────
export const TREATMENTS_CONFIG = [
  { name: "Root Canal Treatment", description: "Painless single & multi-sitting RCT to save infected teeth with rotary endodontics.", iconName: "RootCanal" },
  { name: "Facial & Oral Surgery", description: "Specialized maxillofacial surgery, trauma care, and jaw corrective treatments.", iconName: "Tooth" },
  { name: "Dental Implants", description: "Permanent, natural-looking titanium implants, fixed crowns & bridge replacements.", iconName: "Implant" },
  { name: "Orthodontics & Braces", description: "Metal & ceramic braces, invisible clear aligners for perfect teeth alignment.", iconName: "Orthodontics" },
  { name: "Cosmetic Dentistry", description: "Smile designing, gap closures, porcelain veneers & professional teeth whitening.", iconName: "Whitening" },
  { name: "Tooth Extractions", description: "Gentle surgical extractions of impacted wisdom teeth & preventive oral surgery.", iconName: "GeneralDentistry" },
];

// ─────────────────────────────────────────────
// 9. APPOINTMENT — Booking form content
// ─────────────────────────────────────────────
export const APPOINTMENT = {
  treatments: [
    "Root Canal Treatment (RCT)",
    "Facial & Oral Surgery",
    "Dental Implants & Fixed Teeth",
    "Orthodontic Braces & Aligners",
    "Teeth Whitening & Cleaning",
    "Wisdom Tooth Extraction",
    "Toothache / Emergency Care",
    "General Consultation",
  ],
  timeSlots: [
    "Morning (09:00 AM - 01:00 PM)",
    "Afternoon (01:00 PM - 04:00 PM)",
    "Evening (04:00 PM - 06:00 PM)",
  ],
  phoneNote: "+91 98352 75256",
  quickChatMessage: "Hello City Dental & Face Hospital! I want to enquire about dental treatment with your specialists in Siwan.",
};

// ─────────────────────────────────────────────
// 10. REVIEWS — Patient testimonials
// ─────────────────────────────────────────────
export const REVIEWS = [
  { quote: "Dr. Vijay Kumar BDS.MDS. Dental surgeon. He is a good and youngest dental surgeon of siwan and he is very kind hearted Dr.", name: "Parmeshwar Prasad", label: "Google Verified Reviewer", initials: "PP", time: "2 months ago" },
  { quote: "One of the best dentist I have visited.. polite behaviour of doctor. Very satisfied with the treatment.", name: "Punit Kumar", label: "Google Verified Reviewer", initials: "PK", time: "2 months ago" },
  { quote: "Excellent care and professional treatment by Dr. Vijay Kumar. Modern clinic and painless procedures. Highly recommended clinic in Siwan.", name: "Anand Verma", label: "Google Verified Reviewer", initials: "AV", time: "Verified Patient" },
  { quote: "Best dental and face hospital in Siwan. Modern equipment and painless root canal treatment. Dr. Vijay Kumar explained everything clearly.", name: "Rakesh Kumar", label: "Google Verified Reviewer", initials: "RK", time: "Verified Patient" },
];

// ─────────────────────────────────────────────
// 11. SEO — Metadata for layout.tsx
// ─────────────────────────────────────────────
export const SEO = {
  title: "City Dental and Face Hospital — Best Dental & Facial Hospital in Siwan Bihar | Dr. Vijay Kumar (BDS, MDS)",
  description: "Best dental clinic in Siwan Bihar. City Dental and Face Hospital offers painless root canal, dental implants, braces, facial surgery & cosmetic dentistry. Led by Dr. Vijay Kumar (BDS, MDS). Located on Hospital Road, Siwan. Book appointment on WhatsApp.",
  siteUrl: "https://citydentalsiwan.com",
  keywords: [
    "City Dental and Face Hospital", "City Dental Face Hospital Siwan",
    "best dental clinic in siwan", "best dentist in siwan bihar", "dental clinic near me",
    "dentist in siwan bihar", "dentist siwan", "dental clinic siwan",
    "best dental hospital in siwan", "dental hospital siwan bihar",
    "Dr Vijay Kumar dentist siwan", "Dr Vijay Kumar BDS MDS siwan", "dental surgeon siwan", "maxillofacial surgeon siwan",
    "root canal treatment siwan", "painless root canal siwan", "dental implants siwan",
    "braces siwan bihar", "orthodontics siwan", "teeth whitening siwan",
    "wisdom tooth extraction siwan", "dental crown siwan", "cosmetic dentistry siwan",
    "smile makeover siwan", "veneers siwan", "dental cleaning siwan",
    "facial surgery siwan", "oral surgery siwan", "maxillofacial surgery siwan bihar", "jaw surgery siwan", "face hospital siwan",
    "dentist near me siwan", "dental clinic near siwan", "dental hospital near me siwan",
    "best dental near siwan", "tooth doctor near siwan", "dental care siwan",
    "5 star dental clinic siwan", "highest rated dentist siwan", "top dentist siwan", "trusted dentist siwan",
    "affordable dentist siwan", "low cost dental siwan", "emergency dentist siwan",
    "painless dental treatment siwan bihar", "best dental and face hospital siwan",
    "single sitting rct siwan", "dental implant cost siwan bihar", "clear aligners siwan bihar",
  ],
};
