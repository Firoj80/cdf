import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title:
    "City Dental and Face Hospital — Best Dental & Facial Hospital in Siwan Bihar | Dr. Vijay Kumar (BDS, MDS)",
  description:
    "City Dental and Face Hospital is the best dental clinic in Siwan, Bihar. Led by Dr. Vijay Kumar (BDS, MDS). Expert in Root Canal (RCT), Dental Implants, Braces, Smile Makeover, Teeth Whitening, Facial & Maxillofacial Surgery. Located on Hospital Road, Siwan. Book appointment on WhatsApp.",
  keywords: [
    // Brand
    "City Dental and Face Hospital",
    "City Dental Face Hospital Siwan",
    // Primary local
    "best dental clinic in siwan",
    "best dentist in siwan bihar",
    "dental clinic near me",
    "dentist in siwan bihar",
    "dentist siwan",
    "dental clinic siwan",
    "best dental hospital in siwan",
    "dental hospital siwan bihar",
    // Doctor
    "Dr Vijay Kumar dentist siwan",
    "Dr Vijay Kumar BDS MDS siwan",
    "oral surgeon siwan bihar",
    "dental specialist siwan",
    // Treatments
    "root canal treatment siwan",
    "RCT dentist siwan bihar",
    "dental implants siwan",
    "braces siwan",
    "teeth braces siwan bihar",
    "orthodontist in siwan",
    "teeth whitening siwan",
    "smile makeover siwan",
    "painless dentistry siwan",
    "painless root canal treatment siwan",
    "tooth extraction siwan",
    "wisdom tooth removal siwan",
    "invisible aligners siwan",
    "pediatric dentist siwan",
    "child dentist siwan bihar",
    // Facial
    "facial surgery siwan",
    "maxillofacial surgeon siwan",
    "face hospital siwan",
    "oral surgeon siwan",
    "jaw surgery siwan",
    // Near me / local
    "dentist near me siwan",
    "best dentist near me siwan",
    "dental clinic hospital road siwan",
    "emergency dentist siwan",
    // Area
    "dental clinic in siwan bihar",
    "dentist maharajganj siwan",
    "dentist gopalganj near siwan",
    // Reputation
    "best rated dental clinic siwan",
    "top dental clinic siwan bihar",
    "5 star dental clinic siwan",
    // Affordable
    "affordable dental clinic siwan",
    "low cost dental treatment siwan",
  ],
  authors: [{ name: "Dr. Vijay Kumar", url: "https://citydentalsiwan.com" }],
  creator: "City Dental and Face Hospital",
  publisher: "City Dental and Face Hospital",
  category: "health",
  openGraph: {
    title:
      "City Dental and Face Hospital — Best Dental & Facial Hospital in Siwan Bihar",
    description:
      "Best dental and facial hospital in Siwan, Bihar. Led by Dr. Vijay Kumar (BDS, MDS). Root Canal, Implants, Braces, Smile Makeover, Facial Surgery. 5-Star Rated. Hospital Road, Siwan. Book on WhatsApp.",
    type: "website",
    locale: "en_IN",
    siteName: "City Dental and Face Hospital",
  },
  twitter: {
    card: "summary_large_image",
    title: "City Dental and Face Hospital — Best Dental Clinic in Siwan Bihar",
    description:
      "Root Canal, Dental Implants, Braces, Smile Makeover & Facial Surgery in Siwan, Bihar. Dr. Vijay Kumar (BDS, MDS). Hospital Road, Siwan. Book via WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

// JSON-LD Structured Data for Local Business (Dentist)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
  name: "City Dental and Face Hospital",
  alternateName: "CDF Hospital Siwan",
  description:
    "Best dental and facial hospital in Siwan, Bihar. Led by Dr. Vijay Kumar (BDS, MDS). Specializing in Root Canal Treatment, Dental Implants, Braces, Smile Makeover, Teeth Whitening, Painless Dentistry, Facial Surgery and Maxillofacial Surgery.",
  url: "https://citydentalsiwan.com",
  telephone: "+91-XXXXXXXXXX",
  priceRange: "₹₹",
  image: "https://citydentalsiwan.com/upload/hero.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Hospital Road",
    addressLocality: "Siwan",
    addressRegion: "Bihar",
    postalCode: "841226",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.2173,
    longitude: 84.3552,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    bestRating: "5",
    worstRating: "1",
    ratingCount: "100",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  medicalSpecialty: ["Dentistry", "OralAndMaxillofacialSurgery"],
  availableService: [
    { "@type": "MedicalProcedure", name: "Root Canal Treatment" },
    { "@type": "MedicalProcedure", name: "Dental Implants" },
    { "@type": "MedicalProcedure", name: "Dental Braces & Orthodontics" },
    { "@type": "MedicalProcedure", name: "Teeth Whitening" },
    { "@type": "MedicalProcedure", name: "Smile Makeover" },
    { "@type": "MedicalProcedure", name: "Facial Surgery" },
    { "@type": "MedicalProcedure", name: "Maxillofacial Surgery" },
    { "@type": "MedicalProcedure", name: "Pediatric Dentistry" },
    { "@type": "MedicalProcedure", name: "Wisdom Tooth Removal" },
    { "@type": "MedicalProcedure", name: "Invisible Aligners" },
  ],
  hasMap: "https://maps.app.goo.gl/vwQnt9aoxgen2cDs8",
  sameAs: ["https://maps.app.goo.gl/vwQnt9aoxgen2cDs8"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
