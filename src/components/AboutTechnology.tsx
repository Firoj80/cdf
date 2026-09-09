import Image from "next/image";
import {
  ArrowRight,
  CircleCheck,
  Clock4,
  Cpu,
  ScanFace,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ABOUT, CLINIC } from "@/config/site.config";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ScanFace,
  Sparkles,
  ShieldCheck,
  Clock4,
};

export default function AboutTechnology() {
  return (
    <section id="technology" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Story / About */}
          <div id="about" className="lg:col-span-4 space-y-6 scroll-mt-28">
            <p className="text-brand-teal text-xs font-bold uppercase tracking-[0.25em]">
              {ABOUT.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-white leading-tight">
              {ABOUT.headline}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Founded and managed by <strong>{ABOUT.doctorName}</strong>,{" "}
              <strong>{CLINIC.name}</strong> is one of Siwan&rsquo;s most
              trusted healthcare facilities for comprehensive dental treatments, cosmetic dentistry,
              and specialized facial surgery.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-300 font-medium pt-2">
              {ABOUT.checklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5">
                  <CircleCheck className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <a
                href="#dentists"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-teal-800 text-brand-teal text-xs font-semibold uppercase tracking-wider hover:border-brand-teal transition-colors"
              >
                <span>{ABOUT.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Operatory photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-teal-900/60 shadow-2xl group">
              <Image
                src={ABOUT.image}
                alt={ABOUT.imageAlt}
                width={1200}
                height={900}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-medium text-brand-teal">
                  <Cpu className="w-4 h-4" />
                  {ABOUT.imageCaption}
                </span>
                <span className="bg-black/60 px-2 py-0.5 rounded text-[10px] text-slate-400">
                  {ABOUT.imageLocation}
                </span>
              </div>
            </div>
          </div>

          {/* Tech mini cards */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-3.5">
            {ABOUT.features.map(({ iconName, title, caption }) => {
              const Icon = ICON_MAP[iconName] ?? ScanFace;
              return (
                <div
                  key={title}
                  className="p-3.5 rounded-xl bg-brand-card-2 border border-teal-900/50 flex items-start gap-3 hover:border-teal-500/40 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-teal-950/70 border border-teal-500/30 flex items-center justify-center text-brand-teal shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{title}</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">{caption}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
