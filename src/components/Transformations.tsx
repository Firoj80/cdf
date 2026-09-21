"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
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
    <div className={`rounded-xl overflow-hidden border border-teal-900/60 bg-brand-card-2 p-2.5 sm:p-3 shadow-xl ${className}`}>
      <div className="relative rounded-lg overflow-hidden flex items-center h-48 sm:h-52 bg-slate-900">
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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const children = Array.from(container.children) as HTMLElement[];
    if (!children.length) return;

    const containerCenter = scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(containerCenter - childCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const child = container.children[index] as HTMLElement;
    if (child) {
      const left = child.offsetLeft - (container.clientWidth - child.offsetWidth) / 2;
      container.scrollTo({ left, behavior: "smooth" });
    }
  };

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

        {/* Mobile View: Swipeable Carousel with pill-dot indicator and prompt */}
        <div className="block md:hidden">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 px-2 scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {TRANSFORMATIONS.map((item) => (
              <div
                key={item.label}
                className="w-[85vw] max-w-[320px] shrink-0 snap-center transition-transform duration-300"
              >
                <BeforeAfterCard {...item} className="w-full" />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            {TRANSFORMATIONS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToSlide(idx)}
                className={`transition-all duration-300 h-2 rounded-full cursor-pointer ${
                  activeIndex === idx
                    ? "w-7 bg-emerald-400"
                    : "w-2 bg-slate-700/80 hover:bg-slate-600"
                }`}
                aria-label={`Go to transformation ${idx + 1}`}
              />
            ))}
          </div>

          {/* Swipe or drag hint */}
          <p className="text-center text-xs text-slate-400 mt-2 font-medium tracking-wide">
            Swipe or drag to explore
          </p>
        </div>

        {/* Desktop View: Continuous Auto-scrolling Slider */}
        <div className="hidden md:block">
          <ImageAutoSlider
            speed={60}
            items={TRANSFORMATIONS.map((item) => (
              <BeforeAfterCard key={item.label} {...item} className="w-[270px] xs:w-80 sm:w-96 shrink-0" />
            ))}
          />
        </div>
      </div>
    </section>
  );
}
