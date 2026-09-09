import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import {
  GeneralDentistryIcon,
  ImplantIcon,
  OrthodonticsIcon,
  RootCanalIcon,
  ToothIcon,
  WhiteningIcon,
} from "./icons";

const TREATMENTS = [
  {
    name: "Root Canal Treatment",
    description: "Painless single & multi-sitting RCT to save infected teeth with rotary endodontics.",
    icon: RootCanalIcon,
  },
  {
    name: "Facial & Oral Surgery",
    description: "Specialized maxillofacial surgery, trauma care, and jaw corrective treatments.",
    icon: ToothIcon,
  },
  {
    name: "Dental Implants",
    description: "Permanent, natural-looking titanium implants, fixed crowns & bridge replacements.",
    icon: ImplantIcon,
  },
  {
    name: "Orthodontics & Braces",
    description: "Metal & ceramic braces, invisible clear aligners for perfect teeth alignment.",
    icon: OrthodonticsIcon,
  },
  {
    name: "Cosmetic Dentistry",
    description: "Smile designing, gap closures, porcelain veneers & professional teeth whitening.",
    icon: WhiteningIcon,
  },
  {
    name: "Tooth Extractions",
    description: "Gentle surgical extractions of impacted wisdom teeth & preventive oral surgery.",
    icon: GeneralDentistryIcon,
  },
];

export default function Treatments() {
  return (
    <section id="treatments" className="py-20 bg-brand-dark relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Specialized Treatments"
          title="Advanced Dental Care & Face Hospital Procedures"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 max-w-7xl mx-auto">
          {TREATMENTS.map(({ name, description, icon: Icon }) => (
            <div
              key={name}
              className="bg-brand-card border border-teal-900/50 hover:border-teal-500/60 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(0,242,212,0.15)] group w-full min-h-[175px] sm:min-h-0 aspect-auto sm:aspect-square py-3.5 sm:py-3"
            >
              {/* Icon */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-brand-teal group-hover:scale-105 group-hover:border-teal-400 group-hover:glow-teal-sm transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5 stroke-[1.8]" />
              </div>

              {/* Text content */}
              <div className="my-auto px-0.5 flex flex-col items-center justify-center overflow-hidden">
                <h3 className="text-xs sm:text-sm font-bold text-white mb-1 group-hover:text-brand-teal transition-colors leading-tight line-clamp-2">
                  {name}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-slate-300/90 leading-tight line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Action */}
              <a
                href="#appointment"
                aria-label={`Book a ${name} appointment`}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-teal-500/40 bg-teal-950/40 flex items-center justify-center text-brand-teal group-hover:bg-brand-teal group-hover:text-black group-hover:shadow-[0_0_12px_rgba(0,242,212,0.5)] transition-all shrink-0"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
