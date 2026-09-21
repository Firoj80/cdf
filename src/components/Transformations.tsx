"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ChevronsLeftRight,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Component as ImageAutoSlider } from "./ui/image-auto-slider";
import CarouselStacked, { type Slide } from "./ui/carousel-07";
import { TRANSFORMATIONS } from "@/config/site.config";

function BeforeAfterCard({
  label,
  duration,
  beforeImage,
  afterImage,
  className = "",
  onClick,
}: (typeof TRANSFORMATIONS)[number] & {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-xl overflow-hidden border border-teal-900/60 bg-brand-card-2 p-2.5 sm:p-3 shadow-xl cursor-pointer hover:border-teal-400/80 transition-all duration-300 group ${className}`}
    >
      <div className="relative rounded-lg overflow-hidden flex items-center h-48 sm:h-52 bg-slate-900">
        {/* Before */}
        <div className="w-1/2 h-full relative overflow-hidden border-r border-teal-400/40 bg-slate-950">
          <Image
            src={beforeImage}
            alt={`${label} — before treatment`}
            fill
            sizes="(max-width: 768px) 50vw, 24vw"
            className="object-contain p-1"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] uppercase font-bold text-slate-300 z-10">
            Before
          </span>
        </div>

        {/* After */}
        <div className="w-1/2 h-full relative overflow-hidden bg-slate-950">
          <Image
            src={afterImage}
            alt={`${label} — after treatment`}
            fill
            sizes="(max-width: 768px) 50vw, 24vw"
            className="object-contain p-1"
          />
          <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-brand-teal/20 border border-brand-teal/50 text-[10px] uppercase font-bold text-brand-teal z-10">
            After
          </span>
        </div>

        {/* Slider handle */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900 border-2 border-brand-teal flex items-center justify-center text-brand-teal shadow-md pointer-events-none group-hover:scale-110 transition-transform">
          <ChevronsLeftRight className="w-3.5 h-3.5" />
        </div>

        {/* Zoom hint overlay on hover */}
        <div className="absolute bottom-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 border border-teal-500/40 text-[10px] text-emerald-400 backdrop-blur-xs">
          <ZoomIn className="w-3 h-3" />
          <span>View</span>
        </div>
      </div>

      <div className="mt-3 px-2 flex justify-between items-center gap-3 text-xs">
        <span className="text-slate-300 font-medium whitespace-nowrap group-hover:text-white transition-colors">
          {label}
        </span>
        <span className="text-brand-teal whitespace-nowrap">{duration}</span>
      </div>
    </div>
  );
}

const transformationSlides: Slide[] = TRANSFORMATIONS.map((item) => ({
  image: item.afterImage || item.beforeImage,
  title: item.label,
  description: `Clinical transformation • Completed in ${item.duration}`,
  badge: item.duration,
}));

export default function Transformations() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"after" | "before">("after");

  const total = TRANSFORMATIONS.length;

  const handlePrev = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx - 1 + total) % total);
  }, [selectedIdx, total]);

  const handleNext = useCallback(() => {
    if (selectedIdx === null) return;
    setSelectedIdx((selectedIdx + 1) % total);
  }, [selectedIdx, total]);

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (selectedIdx === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedIdx(null);
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIdx, handlePrev, handleNext]);

  const selectedItem =
    selectedIdx !== null ? TRANSFORMATIONS[selectedIdx] : null;

  const currentImage = selectedItem
    ? viewMode === "before"
      ? selectedItem.beforeImage
      : selectedItem.afterImage
    : "";

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

        {/* Mobile View: 3D Stacked Swipeable Carousel */}
        <div className="block md:hidden">
          <CarouselStacked
            slides={transformationSlides}
            onSlideClick={(_, index) => setSelectedIdx(index)}
          />
          <p className="text-center text-xs text-slate-400 -mt-2 font-medium tracking-wide">
            Swipe or drag to explore • Tap card to view full image
          </p>
        </div>

        {/* Desktop View: Continuous Auto-scrolling Slider */}
        <div className="hidden md:block">
          <ImageAutoSlider
            speed={60}
            items={TRANSFORMATIONS.map((item, idx) => (
              <BeforeAfterCard
                key={item.label}
                {...item}
                onClick={() => setSelectedIdx(idx)}
                className="w-[270px] xs:w-80 sm:w-96 shrink-0"
              />
            ))}
          />
        </div>
      </div>

      {/* Full Image Modal / Lightbox */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedIdx(null);
          }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-between gap-4 pb-3 border-b border-teal-900/50">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                {selectedItem.duration}
              </span>
              <h4 className="text-white text-base sm:text-lg font-playfair font-bold truncate">
                {selectedItem.label}
              </h4>
            </div>

            <button
              onClick={() => setSelectedIdx(null)}
              className="p-2 rounded-full bg-slate-900/80 border border-teal-500/30 text-slate-300 hover:text-white hover:border-emerald-400 transition-colors cursor-pointer"
              aria-label="Close full view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container */}
          <div className="relative w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center my-3 overflow-hidden">
            {/* Before / After View Toggle */}
            {selectedItem.beforeImage !== selectedItem.afterImage && (
              <div className="flex items-center gap-2 mb-3 z-10">
                <button
                  onClick={() => setViewMode("before")}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === "before"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "bg-slate-900 border border-teal-900 text-slate-300 hover:text-white"
                  }`}
                >
                  Before
                </button>
                <button
                  onClick={() => setViewMode("after")}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === "after"
                      ? "bg-emerald-500 text-slate-950 shadow-md"
                      : "bg-slate-900 border border-teal-900 text-slate-300 hover:text-white"
                  }`}
                >
                  After
                </button>
              </div>
            )}

            {/* Uncropped Full Image */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] flex items-center justify-center">
              {/* Subtle ambient backdrop blur */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-105 pointer-events-none"
              />

              {/* Full Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage}
                alt={`${selectedItem.label} - ${viewMode}`}
                className="relative max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-teal-500/30 z-10"
              />
            </div>
          </div>

          {/* Bottom Bar / Navigation */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-between pt-3 border-t border-teal-900/50 text-xs text-slate-400">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-teal-900 hover:border-teal-500 text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="font-mono text-emerald-400">
              {selectedIdx! + 1} / {total}
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-teal-900 hover:border-teal-500 text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
