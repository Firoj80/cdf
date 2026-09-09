"use client";

import Image from "next/image";
import { ArrowRight, Award, Calendar, HeartPulse, MapPin, ShieldCheck, Star } from "lucide-react";
import { ToothIcon } from "./icons";
import { CLINIC, CONTACT, HERO } from "@/config/site.config";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Star,
  HeartPulse,
  MapPin,
};

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-8 pb-16 sm:pt-12 sm:pb-20 md:py-24 overflow-hidden radial-bg"
    >
      {/* Decorative ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* Copy section */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-7">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl font-playfair font-bold text-white tracking-tight leading-[1.18] sm:leading-[1.15]">
              <span className="block">{HERO.headlineLine1}</span>
              <span className="text-brand-teal text-glow-teal block font-normal italic mt-1 sm:mt-2">
                {HERO.headlineLine2}
              </span>
            </h1>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-lg">
              Welcome to <strong>{CLINIC.name}</strong>, Siwan. Led by{" "}
              <strong>Dr. Vijay Kumar (B.D.S., M.D.S.)</strong>, we provide specialized
              dental surgery, painless root canals, facial &amp; maxillofacial care, and
              transformative smile makeovers.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
              <a
                href="#appointment"
                className="px-6 py-3.5 rounded-lg bg-brand-teal text-slate-950 text-xs sm:text-sm font-semibold tracking-wide hover:bg-brand-teal-hover glow-teal-sm hover:glow-teal-md transition-all flex items-center justify-center gap-2.5 shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>{HERO.ctaPrimary}</span>
              </a>
              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-lg border border-teal-900/80 bg-slate-900/40 text-slate-200 text-xs sm:text-sm font-semibold tracking-wide hover:border-teal-500/50 hover:text-brand-teal transition-all flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-brand-teal" />
                <span>{HERO.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Value highlights - 2x2 Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-5 sm:pt-6 border-t border-teal-950/60">
              {HERO.highlights.map(({ iconName, title, caption }) => {
                const Icon = ICON_MAP[iconName] ?? MapPin;
                return (
                  <div key={title} className="flex items-start gap-2.5 sm:gap-3">
                    <div className="p-2 rounded-lg bg-teal-950/50 border border-teal-800/40 text-brand-teal shrink-0">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-semibold text-white leading-snug">{title}</h4>
                      <p className="text-[10.5px] sm:text-[11px] text-slate-400 leading-snug mt-0.5">{caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual section */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-teal-500/20 bg-teal-950/20 p-2 shadow-2xl">
              {/* Neon tooth deco */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 text-brand-teal/70">
                <ToothIcon className="w-10 h-10 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(0,242,212,0.8)]" />
              </div>

              <div className="relative rounded-xl overflow-hidden h-[320px] xs:h-[380px] sm:h-[480px] w-full bg-slate-900">
                <Image
                  src={HERO.heroImage}
                  alt={HERO.heroImageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-linear-to-t from-brand-dark via-transparent to-black/30" />

                {/* Floating clinic badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 p-3 sm:p-4 rounded-xl bg-brand-card/90 backdrop-blur-md border border-teal-500/30 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-teal-500/20 border border-teal-400 flex items-center justify-center text-brand-teal shrink-0">
                      <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-brand-teal font-medium tracking-wide uppercase truncate">
                        {HERO.badge.clinicLabel}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-white truncate">
                        {HERO.badge.doctorLabel}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] sm:text-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded bg-teal-500/10 text-brand-teal font-mono border border-teal-500/20 inline-block font-bold">
                      {HERO.badge.rating}
                    </span>
                    <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5">{HERO.badge.ratingCaption}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
