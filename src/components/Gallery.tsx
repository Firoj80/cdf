"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
  title: string;
  caption: string;
  image: string;
  alt: string;
}

const ITEMS: GalleryItem[] = [
  {
    title: "Ultra-Luxury VIP Lounge & Reception",
    caption: "Curated ambiance tailored for serene relaxation",
    image: "/upload/gallery1.jpg",
    alt: "Ultra-luxury modern dental clinic interior lounge",
  },
  {
    title: "Serene Waiting & Wellness Lounge",
    caption: "Designer interiors with calming hospitality touches",
    image: "/upload/gallery2.jpg",
    alt: "Bright and clean dental clinic lounge with dental chair",
  },
  {
    title: "Next-Gen Surgical Operatory Suite",
    caption: "Ergonomic suites with 3D diagnostic computed monitors",
    image: "/upload/gallery3.jpg",
    alt: "State-of-the-art dental operating suite with precision instruments",
  },
  {
    title: "Digital Diagnostics & Precision Equipment",
    caption: "Millimeter-accurate imaging for flawless outcomes",
    image: "/upload/gallery4.jpg",
    alt: "Close up of advanced dental equipment in a modern sterile office",
  },
  {
    title: "Bespoke Ceramic Porcelain Veneers",
    caption: "Artisanal smile sculpting & millimeter accuracy",
    image: "/upload/gallery5.jpg",
    alt: "Close up of luxury dental ceramic porcelain veneers being applied",
  },
  {
    title: "Signature White Smile Gallery",
    caption: "Handcrafted aesthetics designed around your features",
    image: "/upload/gallery6.jpg",
    alt: "Radiant white smile close up after cosmetic treatment",
  },
  {
    title: "Personalized Smile Consultation",
    caption: "Compassionate one-on-one digital aesthetic design",
    image: "/upload/gallery7.jpg",
    alt: "Happy patient receiving a personalized dental consultation",
  },
  {
    title: "Gentle Two-Expert Dental Care",
    caption: "Team-based precision with a calming chairside manner",
    image: "/upload/gallery8.jpg",
    alt: "Two dental specialists treating a patient in a modern clinic",
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev - 1 + ITEMS.length) % ITEMS.length
        );
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev === null ? null : (prev + 1) % ITEMS.length
        );
      }
    },
    [lightboxIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section
      id="gallery"
      className="py-16 md:py-20 bg-[#060e10] border-t border-teal-950/60 relative overflow-hidden scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/30 text-xs uppercase tracking-widest text-brand-teal mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
            <span>Hospital Infrastructure &amp; Smiles</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-playfair font-bold text-white tracking-tight leading-tight">
            A Glimpse Into City Dental &amp; Face Hospital
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            Experience state-of-the-art operatory suites, strict hygiene protocols,
            and gentle dental care guided by Dr. Vijay Kumar (B.D.S., M.D.S.) on Hospital Road, Siwan.
          </p>
        </div>

        {/* Compact Grid of Images */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {ITEMS.map((item, index) => (
            <div
              key={item.title}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-xl overflow-hidden bg-brand-card-2 border border-teal-900/50 hover:border-brand-teal/60 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(0,242,212,0.15)] aspect-[4/3] cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

              {/* Bottom details */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <h3 className="text-xs sm:text-sm font-semibold text-white group-hover:text-brand-teal transition-colors truncate">
                  {item.title}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-300/80 truncate mt-0.5">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {lightboxIndex !== null && ITEMS[lightboxIndex] && (
          <div
            onClick={() => setLightboxIndex(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-brand-card-2 border border-teal-500/40 rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                type="button"
                aria-label="Close lightbox"
                onClick={() => setLightboxIndex(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/70 border border-teal-500/40 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-black transition-all"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Lightbox Image Stage */}
              <div className="relative w-full h-64 xs:h-72 sm:h-96 md:h-[480px] bg-slate-950">
                <Image
                  src={ITEMS[lightboxIndex].image}
                  alt={ITEMS[lightboxIndex].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 900px"
                  className="object-contain object-center"
                />

                {/* Nav buttons */}
                <button
                  type="button"
                  aria-label="Previous image"
                  onClick={() =>
                    setLightboxIndex(
                      (prev) => (prev! - 1 + ITEMS.length) % ITEMS.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-teal-500/40 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-black transition-all"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  aria-label="Next image"
                  onClick={() =>
                    setLightboxIndex((prev) => (prev! + 1) % ITEMS.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 border border-teal-500/40 flex items-center justify-center text-brand-teal hover:bg-brand-teal hover:text-black transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Lightbox Footer Details */}
              <div className="p-4 sm:p-5 bg-teal-950/50 border-t border-teal-900/60 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    {ITEMS[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {ITEMS[lightboxIndex].caption}
                  </p>
                </div>
                <span className="text-xs text-brand-teal font-mono shrink-0">
                  {lightboxIndex + 1} / {ITEMS.length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
