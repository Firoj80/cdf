import { MapPin, Phone, Clock } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  ToothIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "./icons";
import { CLINIC, CONTACT, HOURS, SOCIAL } from "@/config/site.config";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Meet Specialists", href: "#dentists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Patient Reviews", href: "#patients" },
  { label: "Book Appointment", href: "#appointment" },
];

const SERVICES = [
  "Root Canal (RCT)",
  "Facial Surgery",
  "Dental Implants",
  "Orthodontic Braces",
  "Teeth Whitening",
  "Wisdom Tooth Care",
  "Emergency Dental",
  "Pediatric Care",
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-brand-footer border-t border-teal-950/70 pt-14 pb-8 text-xs text-slate-400"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-teal-950 items-start">
          {/* Column 1: Brand & Contact */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-lg bg-teal-950/70 border border-teal-500/40 flex items-center justify-center text-brand-teal shrink-0 overflow-hidden">
                <img src="/logo_header.png" alt="City Dental" className="w-full h-full object-cover scale-125" />
              </div>
              <div>
                <span className="text-base font-bold text-white font-playfair leading-tight block">
                  {CLINIC.nameLine1}
                </span>
                <span className="text-[8.5px] tracking-[0.18em] text-brand-teal uppercase font-semibold">
                  {CLINIC.nameLine2}
                </span>
              </div>
            </div>

            <p className="text-slate-300 text-[11px] leading-relaxed">
              Headed by <strong>Dr. Vijay Kumar (B.D.S., M.D.S.)</strong>. Advanced dental
              treatments and facial surgery center in Siwan, Bihar.
            </p>

            <div className="space-y-2 pt-0.5 text-[11px]">
              <p className="flex items-center gap-2 text-slate-200">
                <Phone className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                <a href={CONTACT.phoneDial} className="hover:text-brand-teal font-medium">
                  {CONTACT.phone}
                </a>
              </p>
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                <span className="leading-snug">{CONTACT.addressFull}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-[10.5px]">
                <Clock className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                <span>{HOURS.footer}</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 pt-1 text-slate-300">
              <a
                aria-label="WhatsApp"
                href={SOCIAL.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-teal-950/40 border border-teal-900 flex items-center justify-center hover:text-emerald-400 hover:border-emerald-500 transition-colors"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              </a>
              <a
                aria-label="Facebook"
                href={SOCIAL.facebook}
                className="w-7 h-7 rounded-full bg-teal-950/40 border border-teal-900 flex items-center justify-center hover:text-brand-teal hover:border-teal-500 transition-colors"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                aria-label="Instagram"
                href={SOCIAL.instagram}
                className="w-7 h-7 rounded-full bg-teal-950/40 border border-teal-900 flex items-center justify-center hover:text-brand-teal hover:border-teal-500 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>
              <a
                aria-label="YouTube"
                href={SOCIAL.youtube}
                className="w-7 h-7 rounded-full bg-teal-950/40 border border-teal-900 flex items-center justify-center hover:text-brand-teal hover:border-teal-500 transition-colors"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Columns 2 & 3: Side-by-side on mobile, individual columns on sm+ */}
          <div className="grid grid-cols-2 gap-6 sm:contents">
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="hover:text-brand-teal transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Treatments */}
            <div>
              <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
                Treatments
              </h4>
              <ul className="space-y-2">
                {SERVICES.map((service) => (
                  <li key={service}>
                    <a href="#treatments" className="hover:text-brand-teal transition-colors">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 4: Embedded Map */}
          <div className="flex flex-col">
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-brand-teal" />
              <span>Location Map</span>
            </h4>

            <div className="relative w-full h-[200px] rounded-xl overflow-hidden border border-teal-900/60 shadow-md bg-slate-950 group">
              {/* Floating Verified Badge */}
              <div className="absolute top-2 left-2 z-10 bg-slate-950/90 backdrop-blur-md border border-teal-500/40 rounded px-2 py-1 shadow pointer-events-none">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
                  <span className="text-white font-bold text-[10px] truncate max-w-[180px]">
                    {CLINIC.nameLine1.toUpperCase()}
                  </span>
                </div>
                <span className="text-[9px] text-amber-400 font-semibold block">
                  {CLINIC.rating} Google Rating
                </span>
              </div>

              <iframe
                title={`${CLINIC.name} Location`}
                src={CONTACT.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full opacity-95 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {currentYear} {CLINIC.copyrightName}. All Rights Reserved.</p>
          <p className="text-slate-400">
            Dr. Vijay Kumar (B.D.S., M.D.S.) • {CONTACT.addressFull}
          </p>
        </div>
      </div>
    </footer>
  );
}
