import Image from "next/image";
import {
  Award,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Heart,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { CONTACT, DOCTORS } from "@/config/site.config";

const HIGHLIGHT_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Heart,
  ShieldCheck,
  Award,
};

export default function Dentists() {
  const hospitalPhone = CONTACT.whatsapp;
  const visibleDoctors = DOCTORS.filter((d) => d.visible);
  const isSingle = visibleDoctors.length === 1;

  return (
    <section
      id="dentists"
      className="py-20 bg-brand-section border-t border-teal-950/60 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Medical Team"
          title="Meet Our Hospital Specialists"
        />

        <div className={`grid gap-8 ${isSingle ? "grid-cols-1 max-w-2xl mx-auto" : "grid-cols-1 lg:grid-cols-2"}`}>
          {visibleDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-brand-card-2 border border-teal-900/60 rounded-2xl sm:rounded-3xl overflow-hidden p-4 sm:p-8 flex flex-col justify-between hover:border-teal-500/50 transition-all duration-300 shadow-2xl group"
            >
              <div>
                <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
                  {/* Doctor image */}
                  <div className="relative w-full sm:w-48 h-52 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden shrink-0 border border-teal-500/30 bg-slate-900">
                    <Image
                      src={doctor.image}
                      alt={`${doctor.name} ${doctor.degrees} - City Dental & Face Hospital Siwan`}
                      fill
                      sizes="(max-width: 640px) 100vw, 200px"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-2.5 left-2.5 right-2.5 px-2 py-1 rounded bg-black/70 backdrop-blur-xs text-[10px] text-brand-teal font-mono text-center border border-teal-500/30">
                      {doctor.degrees}
                    </span>
                  </div>

                  {/* Doctor Header & Bio */}
                  <div className="space-y-2 flex-1">
                    <span className="inline-block text-[10px] font-semibold text-brand-teal uppercase tracking-widest bg-teal-950/80 px-2.5 py-1 rounded-full border border-teal-500/30">
                      {doctor.tagline}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white group-hover:text-brand-teal transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-medium text-emerald-400">
                      {doctor.role}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">
                      {doctor.bio}
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 my-5 pt-4 border-t border-teal-950/80">
                  {doctor.highlights.map(({ iconName, text }) => {
                    const Icon = HIGHLIGHT_ICON_MAP[iconName] ?? Award;
                    return (
                      <div
                        key={text}
                        className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-dark/60 border border-teal-950 text-xs text-slate-200"
                      >
                        <Icon className="w-4 h-4 text-brand-teal shrink-0" />
                        <span className="text-[11px] font-medium">{text}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Specialties list */}
                <div className="space-y-1.5 pb-6">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Areas of Expertise:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {doctor.specialties.map((spec) => (
                      <div key={spec} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                        <span className="text-[11px]">{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-teal-950 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${hospitalPhone}?text=${encodeURIComponent(
                    `Hello City Dental & Face Hospital! I would like to book a consultation for ${doctor.whatsappNote}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)]"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Consult {doctor.name.split(" ").slice(0, 2).join(" ")}</span>
                </a>
                <a
                  href="#appointment"
                  className="py-3 px-4 rounded-lg border border-teal-800 hover:border-teal-500 text-slate-300 hover:text-white text-xs font-medium text-center transition-colors"
                >
                  Fill Booking Form
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
