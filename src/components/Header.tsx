"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { ToothIcon, WhatsAppIcon } from "./icons";
import { CLINIC, CONTACT, HOURS } from "@/config/site.config";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Meet Specialists", href: "#dentists" },
  { label: "Gallery", href: "#gallery" },
  { label: "Patient Reviews", href: "#patients" },
  { label: "Contact & Map", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#050a0a]/95 backdrop-blur-md border-b border-teal-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand logo */}
        <a href="#home" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-teal-950/70 border border-teal-500/40 flex items-center justify-center text-brand-teal group-hover:glow-teal-sm transition-all shrink-0 overflow-hidden">
            <img src="/logo_header.png" alt="City Dental" className="w-full h-full object-cover scale-125" />
          </div>
          <div className="min-w-0">
            <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white block leading-tight font-playfair truncate">
              {CLINIC.nameLine1}
            </span>
            <span className="text-[8.5px] sm:text-[10px] tracking-[0.14em] sm:tracking-[0.18em] text-brand-teal uppercase font-semibold block truncate">
              {CLINIC.nameLine2}
            </span>
          </div>
        </a>

        {/* Desktop navigation - No mobile number in desktop view */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-xs font-medium text-slate-300 tracking-wider uppercase">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={
                link.href === "#home"
                  ? "text-brand-teal transition-colors"
                  : "hover:text-brand-teal transition-colors"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right action area */}
        <div className="flex items-center gap-3">
          {/* Desktop Book Appointment CTA */}
          <a
            href="#appointment"
            className="hidden sm:flex px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg border border-teal-500/50 bg-brand-teal text-slate-950 text-xs font-bold tracking-wide uppercase hover:bg-brand-teal-hover hover:shadow-[0_0_20px_rgba(0,242,212,0.4)] transition-all duration-300 items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Appointment</span>
          </a>

          {/* Mobile hamburger button */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-lg text-slate-200 hover:text-white hover:bg-teal-950/60 border border-teal-900/70 transition-colors cursor-pointer"
          >
            {open ? <X className="w-6 h-6 text-brand-teal" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Right Slide-in Drawer via createPortal */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
              open
                ? "opacity-100 pointer-events-auto visible"
                : "opacity-0 pointer-events-none invisible"
            }`}
            aria-hidden={!open}
          >
            {/* Backdrop overlay */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
              onClick={() => setOpen(false)}
            />

            {/* Right Drawer panel */}
            <div
              className={`absolute top-0 right-0 bottom-0 w-[300px] xs:w-[320px] max-w-[85vw] h-dvh bg-[#050a0a] border-l border-teal-900/80 p-5 shadow-2xl flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 ease-in-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div>
                {/* Drawer Header with Title & Close Button */}
                <div className="flex items-center justify-between pb-4 border-b border-teal-950/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-lg bg-teal-950/70 border border-teal-500/40 flex items-center justify-center text-brand-teal overflow-hidden">
                      <img src="/logo_header.png" alt="City Dental" className="w-full h-full object-cover scale-125" />
                    </div>
                    <div>
                      <span className="text-sm font-bold tracking-tight text-white block font-playfair leading-tight">
                        {CLINIC.nameLine1}
                      </span>
                      <span className="text-[8.5px] tracking-[0.14em] text-brand-teal uppercase font-semibold block">
                        {CLINIC.nameLine2}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-teal-950/80 border border-teal-900/80 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5 text-brand-teal" />
                  </button>
                </div>

                {/* Navigation links */}
                <nav className="flex flex-col gap-1.5 py-5">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase text-slate-200 hover:text-brand-teal hover:bg-teal-950/40 transition-colors"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-teal-800" />
                    </a>
                  ))}
                </nav>
              </div>

              {/* Quick Actions in Mobile Drawer */}
              <div className="pt-4 border-t border-teal-950/80 space-y-2.5">
                <a
                  href="#appointment"
                  onClick={() => setOpen(false)}
                  className="w-full py-3 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                  <span>Book on WhatsApp</span>
                </a>

                <a
                  href={CONTACT.phoneDial}
                  onClick={() => setOpen(false)}
                  className="w-full py-2.5 px-4 rounded-lg border border-teal-800/80 bg-teal-950/40 text-brand-teal text-xs font-semibold text-center flex items-center justify-center gap-2 hover:bg-teal-900/40 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {CONTACT.phoneShort}</span>
                </a>

                <div className="p-2.5 rounded-lg bg-teal-950/30 border border-teal-950 text-[11px] text-slate-400 space-y-1">
                  <div className="flex items-start gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0 mt-0.5" />
                    <span>{CONTACT.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Clock className="w-3 h-3 text-brand-teal shrink-0" />
                    <span>{HOURS.combined}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
}
