"use client";

import { WhatsAppIcon } from "./icons";
import { CLINIC, CONTACT } from "@/config/site.config";

export default function FloatingWhatsApp() {
  const defaultMessage = encodeURIComponent(
    `Hello ${CLINIC.name}! 👋 I would like to enquire about an appointment with Dr. Vijay Kumar in Siwan.`
  );

  return (
    <aside aria-label="WhatsApp quick contact" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      {/* Tooltip / Label */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-medium border border-teal-500/30 shadow-lg backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
        Chat with {CLINIC.name}
      </span>

      {/* Button */}
      <a
        href={`https://wa.me/${CONTACT.whatsapp}?text=${defaultMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat and book appointment with ${CLINIC.name} on WhatsApp`}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-[0_4px_25px_rgba(37,211,102,0.5)] hover:shadow-[0_6px_30px_rgba(37,211,102,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 fill-current" />
      </a>
    </aside>
  );
}
