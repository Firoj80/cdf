"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Star } from "lucide-react";

const REVIEWS = [
  {
    quote:
      "Dr. Vijay Kumar BDS.MDS. Dental surgeon. He is a good and youngest dental surgeon of siwan and he is very kind hearted Dr.",
    name: "Parmeshwar Prasad",
    label: "Google Verified Reviewer",
    initials: "PP",
    time: "2 months ago",
  },
  {
    quote:
      "One of the best dentist I have visited.. polite behaviour of doctor. Very satisfied with the treatment.",
    name: "Punit Kumar",
    label: "Google Verified Reviewer",
    initials: "PK",
    time: "2 months ago",
  },
  {
    quote:
      "Excellent care and professional treatment by Dr. Vijay Kumar. Modern clinic and painless procedures. Highly recommended clinic in Siwan.",
    name: "Anand Verma",
    label: "Google Verified Reviewer",
    initials: "AV",
    time: "Verified Patient",
  },
  {
    quote:
      "Best dental and face hospital in Siwan. Modern equipment and painless root canal treatment. Dr. Vijay Kumar explained everything clearly.",
    name: "Rakesh Kumar",
    label: "Google Verified Reviewer",
    initials: "RK",
    time: "Verified Patient",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setActive((prev) => (prev + 1) % REVIEWS.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const current = REVIEWS[active];

  return (
    <div
      id="patients"
      className="bg-brand-card border border-teal-900/60 rounded-2xl p-3.5 sm:p-6 shadow-xl flex flex-col justify-between h-full scroll-mt-28"
    >
      <div>
        {/* Header matching appointment card */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-brand-teal text-[10.5px] font-bold uppercase tracking-[0.2em]">
              Verified Patient Experiences
            </p>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-bold text-emerald-400">
              5.0 ★ Google Rating
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white leading-snug">
            Real Reviews From Siwan Patients
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Verified feedback from Google Maps for Dr. Vijay Kumar &amp; our hospital.
          </p>
        </div>

        {/* Inner Review Box */}
        <div className="bg-brand-card-2 border border-teal-900/50 rounded-xl p-3.5 sm:p-5 relative min-h-[160px] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-amber-300">5.0</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">
                {current.time}
              </span>
            </div>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-normal italic">
              &ldquo;{current.quote}&rdquo;
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 mt-4 border-t border-teal-950">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-teal-950 border border-teal-500/40 flex items-center justify-center text-brand-teal font-bold text-xs">
                {current.initials}
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white leading-tight">{current.name}</h4>
                <span className="text-[10px] text-brand-teal font-medium">
                  {current.label}
                </span>
              </div>
            </div>

            <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              Verified
            </span>
          </div>
        </div>

        {/* Trust metrics strip matching appointment footer badges */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 my-3 py-2 px-2 sm:px-3 rounded-lg bg-teal-950/40 border border-teal-900/40 text-center">
          <div>
            <p className="text-[11px] sm:text-[12.5px] font-bold text-white font-mono">5.0 ★★★★★</p>
            <p className="text-[8.5px] sm:text-[9.5px] text-slate-400">Google Rating</p>
          </div>
          <div className="border-x border-teal-900/40">
            <p className="text-[11px] sm:text-[12.5px] font-bold text-brand-teal font-mono">100%</p>
            <p className="text-[8.5px] sm:text-[9.5px] text-slate-400">Painless RCT</p>
          </div>
          <div>
            <p className="text-[11px] sm:text-[12.5px] font-bold text-white font-mono">BDS, MDS</p>
            <p className="text-[8.5px] sm:text-[9.5px] text-slate-400">Oral Surgeon</p>
          </div>
        </div>
      </div>

      {/* Footer controls & Google Maps link */}
      <div className="flex items-center justify-between pt-2 border-t border-teal-900/40">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                aria-label={`Show review ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === active
                    ? "bg-brand-teal w-6"
                    : "bg-slate-700 hover:bg-slate-500 w-2"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={() => setActive((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
              aria-label="Previous review"
              className="w-6 h-6 rounded-md bg-teal-950/80 hover:bg-teal-900 border border-teal-800/40 flex items-center justify-center text-slate-300 hover:text-white text-xs cursor-pointer transition-colors"
            >
              ‹
            </button>
            <button
              onClick={() => setActive((prev) => (prev + 1) % REVIEWS.length)}
              aria-label="Next review"
              className="w-6 h-6 rounded-md bg-teal-950/80 hover:bg-teal-900 border border-teal-800/40 flex items-center justify-center text-slate-300 hover:text-white text-xs cursor-pointer transition-colors"
            >
              ›
            </button>
          </div>
        </div>

        <a
          href="https://maps.app.goo.gl/vwQnt9aoxgen2cDs8"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-slate-400 hover:text-brand-teal flex items-center gap-1 transition-colors group"
        >
          <span className="group-hover:underline">View on Google Maps</span>
          <ExternalLink className="w-3 h-3 text-brand-teal" />
        </a>
      </div>
    </div>
  );
}
