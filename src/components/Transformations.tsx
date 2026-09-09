import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { Component as ImageAutoSlider } from "./ui/image-auto-slider";

const TRANSFORMATIONS = [
  {
    label: "Full Porcelain Veneers",
    duration: "2 Weeks",
    image: "/upload/treatment1.jpg",
  },
  {
    label: "Invisalign Clear Aligners",
    duration: "6 Months",
    image: "/upload/treatment2.jpg",
  },
  {
    label: "Laser In-Office Whitening",
    duration: "1 Session",
    image: "/upload/treatment3.jpg",
  },
  {
    label: "Smile Makeover Design",
    duration: "3 Weeks",
    image: "/upload/treatment4.jpg",
  },
  {
    label: "Ceramic Veneer Placement",
    duration: "2 Visits",
    image: "/upload/treatment5.jpg",
  },
  {
    label: "Teeth Bonding & Contouring",
    duration: "1 Session",
    image: "/upload/treatment6.jpg",
  },
];

function BeforeAfterCard({
  label,
  duration,
  image,
}: (typeof TRANSFORMATIONS)[number]) {
  return (
    <div className="rounded-xl overflow-hidden border border-teal-900/60 bg-brand-card-2 p-2.5 sm:p-3 shadow-xl w-[270px] xs:w-80 sm:w-96 shrink-0">
      <div className="relative rounded-lg overflow-hidden flex items-center h-44 xs:h-48 sm:h-52 bg-slate-900">
        {/* Before */}
        <div className="w-1/2 h-full relative overflow-hidden border-r border-teal-400/40">
          <Image
            src={image}
            alt={`${label} — before treatment`}
            fill
            sizes="(max-width: 768px) 40vw, 24vw"
            className="object-cover grayscale brightness-90 sepia-[.25]"
          />
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] uppercase font-bold text-slate-300 z-10">
            Before
          </span>
        </div>

        {/* After */}
        <div className="w-1/2 h-full relative overflow-hidden">
          <Image
            src={image}
            alt={`${label} — after treatment`}
            fill
            sizes="(max-width: 768px) 40vw, 24vw"
            className="object-cover brightness-110 contrast-110"
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

        {/* Auto-scrolling before & after slider */}
        <div>
          <ImageAutoSlider
            speed={60}
            items={TRANSFORMATIONS.map((item) => (
              <BeforeAfterCard key={item.label} {...item} />
            ))}
          />
        </div>

      </div>
    </section>
  );
}
