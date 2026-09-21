"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronsLeftRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Component as ImageAutoSlider } from "./ui/image-auto-slider";

import { TRANSFORMATIONS } from "@/config/site.config";

function BeforeAfterCard({
  label,
  duration,
  beforeImage,
  afterImage,
  className = "",
}: (typeof TRANSFORMATIONS)[number] & { className?: string }) {
  return (
    <div
      className={`rounded-xl overflow-hidden border border-teal-900/60 bg-brand-card-2 p-2.5 sm:p-3 shadow-xl ${className}`}
    >
      <div className="relative rounded-lg overflow-hidden flex items-center h-52 xs:h-56 sm:h-52 bg-slate-900">
        {/* Before */}
        <div className="w-1/2 h-full relative overflow-hidden border-r border-teal-400/40">
          <Image
            src={beforeImage}
            alt={`${label} — before treatment`}
            fill
            sizes="(max-width: 768px) 50vw, 24vw"
            className="object-cover"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] uppercase font-bold text-slate-300 z-10">
            Before
          </span>
        </div>

        {/* After */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <Image
            src={afterImage}
            alt={`${label} — after treatment`}
            fill
            sizes="(max-width: 768px) 50vw, 24vw"
            className="object-cover"
          />
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-brand-teal/20 border border-brand-teal/50 text-[10px] uppercase font-bold text-brand-teal z-10">
            After
          </span>
        </div>

        {/* Slider handle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900 border-2 border-brand-teal flex items-center justify-center text-brand-teal shadow-md pointer-events-none">
          <ChevronsLeftRight className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="mt-3 px-2 flex justify-between items-center gap-3 text-xs">
        <span className="text-slate-300 font-medium whitespace-nowrap">
          {label}
        </span>
        <span className="text-brand-teal whitespace-nowrap">{duration}</span>
      </div>
    </div>
  );
}

export default function Transformations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const total = TRANSFORMATIONS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const currentItem = TRANSFORMATIONS[currentIndex];

  return (
    <section
      id="transformations"
      className="py-20 bg-brand-card-3 border-y border-teal-950/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Real Smiles. Real Transformations."
          title="Clinical Before & After Results"
        />

        {/* Desktop / Tablet: Auto-scrolling slider */}
        <div className="hidden sm:block">
          <ImageAutoSlider
            speed={60}
            items={TRANSFORMATIONS.map((item) => (
              <BeforeAfterCard
                key={item.label}
                {...item}
                className="w-[270px] xs:w-80 sm:w-96 shrink-0"
              />
            ))}
          />
        </div>

        {/* Mobile: Single Before/After card with < > navigation */}
        <div className="block sm:hidden">
          <div
            className="w-full max-w-sm mx-auto"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {currentItem && (
              <BeforeAfterCard
                key={currentItem.label}
                {...currentItem}
                className="w-full"
              />
            )}

            {/* < > Navigation Controls */}
            <div className="flex items-center justify-between gap-4 mt-4 px-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous transformation"
                className="w-11 h-11 rounded-full border border-teal-500/40 bg-brand-card-2 hover:bg-teal-950/80 active:scale-95 text-brand-teal flex items-center justify-center transition-all shadow-md cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-xs font-mono text-slate-300">
                  {currentIndex + 1} of {total}
                </span>
                <div className="flex items-center gap-1.5">
                  {TRANSFORMATIONS.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to transformation ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? "w-5 bg-brand-teal"
                          : "w-1.5 bg-teal-950 border border-teal-800"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next transformation"
                className="w-11 h-11 rounded-full border border-teal-500/40 bg-brand-card-2 hover:bg-teal-950/80 active:scale-95 text-brand-teal flex items-center justify-center transition-all shadow-md cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
