/**
 * ============================================================
 *  SITE CONFIG — CITY DENTAL & FACE HOSPITAL
 * ============================================================
 *  Edit this ONE file to update content across the entire site.
 *  Changes here automatically reflect in every component.
 * ============================================================
 */
import siteData from './site-data.json';

// ─────────────────────────────────────────────
// 1. CLINIC — Name, tagline, rating
// ─────────────────────────────────────────────
export const CLINIC = siteData.CLINIC;

// ─────────────────────────────────────────────
// 2. CONTACT — Phone, WhatsApp, Address, Maps
// ─────────────────────────────────────────────
export const CONTACT = siteData.CONTACT;

// ─────────────────────────────────────────────
// 3. HOURS — Opening times
// ─────────────────────────────────────────────
export const HOURS = siteData.HOURS;

// ─────────────────────────────────────────────
// 4. SOCIAL — Social media links
// ─────────────────────────────────────────────
export const SOCIAL = siteData.SOCIAL;

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

export const DOCTORS: Doctor[] = siteData.DOCTORS;

// ─────────────────────────────────────────────
// 6. HERO — Homepage hero section content
// ─────────────────────────────────────────────
export const HERO = siteData.HERO;

// ─────────────────────────────────────────────
// 7. ABOUT — About section content
// ─────────────────────────────────────────────
export const ABOUT = siteData.ABOUT;

// ─────────────────────────────────────────────
// 8. TREATMENTS — Treatment cards (icon names resolved in component)
// ─────────────────────────────────────────────
export const TREATMENTS_CONFIG = siteData.TREATMENTS_CONFIG;

// ─────────────────────────────────────────────
// 9. APPOINTMENT — Booking form content
// ─────────────────────────────────────────────
export const APPOINTMENT = siteData.APPOINTMENT;

// ─────────────────────────────────────────────
// 10. REVIEWS — Patient testimonials
// ─────────────────────────────────────────────
export const REVIEWS = siteData.REVIEWS;

// ─────────────────────────────────────────────
// 11. SEO — Metadata for layout.tsx
// ─────────────────────────────────────────────
export const SEO = siteData.SEO;
