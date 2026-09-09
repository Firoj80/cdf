"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  ExternalLink,
  Heart,
  MessageCircle,
  Phone,
  RotateCcw,
  Shield,
  Sparkles,
} from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { APPOINTMENT, CLINIC, CONTACT, DOCTORS } from "@/config/site.config";

const INPUT_CLASSES =
  "w-full bg-brand-dark border border-teal-900/70 focus:border-brand-teal focus:ring-1 focus:ring-brand-teal rounded-lg px-3 py-2 text-xs text-white placeholder:text-slate-500 outline-none transition";

const BADGES = [
  { icon: CalendarCheck, label: "Direct WhatsApp Booking" },
  { icon: Clock, label: "Flexible Daily Slots" },
  { icon: Shield, label: "Painless Endodontics" },
  { icon: Heart, label: "2 BDS, MDS Specialists" },
];

const DOCTOR_OPTIONS = ["Any Available Specialist", ...DOCTORS.map((d) => d.shortLabel)];

export default function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [previewText, setPreviewText] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    preferredDate: "",
    timeSlot: APPOINTMENT.timeSlots[0],
    treatment: APPOINTMENT.treatments[0],
    doctor: DOCTOR_OPTIONS[0],
    message: "",
  });

  const today = new Date().toISOString().split("T")[0];

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function generateWhatsAppMessage() {
    const lines = [
      `*🌟 NEW APPOINTMENT REQUEST 🌟*`,
      `🏥 *${CLINIC.name.toUpperCase()}*`,
      `📍 *${CONTACT.addressFull}*`,
      "──────────────────────────────",
      `👤 *Patient Name:* ${form.name.trim()}`,
      `📞 *Contact Number:* ${form.phone.trim()}`,
      `📅 *Preferred Date:* ${form.preferredDate}`,
      `⏰ *Preferred Slot:* ${form.timeSlot}`,
      `🩺 *Required Treatment:* ${form.treatment}`,
      `👨‍⚕️ *Consulting Doctor:* ${form.doctor}`,
      form.message.trim() ? `💬 *Patient Query:* ${form.message.trim()}` : null,
      "──────────────────────────────",
      `✨ _Sent via ${CLINIC.name} official website._`,
    ].filter(Boolean);

    return lines.join("\n");
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const cleanedNumber = CONTACT.whatsapp.replace(/[^0-9]/g, "");
    const text = generateWhatsAppMessage();
    const url = `https://wa.me/${cleanedNumber}?text=${encodeURIComponent(text)}`;

    setPreviewText(text);
    setWhatsappUrl(url);
    setSubmitted(true);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  function handleReset() {
    setSubmitted(false);
    setWhatsappUrl("");
    setPreviewText("");
    setForm({
      name: "",
      phone: "",
      preferredDate: "",
      timeSlot: APPOINTMENT.timeSlots[0],
      treatment: APPOINTMENT.treatments[0],
      doctor: DOCTOR_OPTIONS[0],
      message: "",
    });
  }

  const quickChatUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(APPOINTMENT.quickChatMessage)}`;

  return (
    <div>
      {submitted ? (
        <div className="space-y-3.5 py-2">
          <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs sm:text-sm text-white">
                  Appointment Details Prepared for WhatsApp!
                </h4>
                <p className="text-[11px] text-emerald-200/90 mt-0.5 leading-relaxed">
                  WhatsApp opened in a new tab. Simply tap <strong>Send</strong> to confirm with {CLINIC.name}!
                </p>
              </div>
            </div>
          </div>

          <div className="bg-brand-dark/90 border border-teal-900/60 rounded-xl p-3">
            <p className="text-[10px] font-semibold text-brand-teal uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Message Preview
            </p>
            <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono bg-black/40 p-2.5 rounded-lg border border-teal-950">
              {previewText}
            </pre>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>Open WhatsApp Chat</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              type="button"
              onClick={handleReset}
              className="py-2.5 px-4 rounded-lg border border-teal-800 hover:border-teal-500/60 bg-teal-950/30 text-slate-300 hover:text-white text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Book Another</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Row 1: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                Patient Name <span className="text-brand-teal">*</span>
              </label>
              <input
                required
                type="text"
                placeholder="e.g. Rahul Kumar"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={INPUT_CLASSES}
              />
            </div>
            <div>
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                WhatsApp Phone <span className="text-brand-teal">*</span>
              </label>
              <input
                required
                type="tel"
                placeholder="e.g. 098352 75256"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={INPUT_CLASSES}
              />
            </div>
          </div>

          {/* Row 2: Date, Slot, Treatment */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                Preferred Date <span className="text-brand-teal">*</span>
              </label>
              <input
                required
                type="date"
                min={today}
                value={form.preferredDate}
                onChange={(e) => update("preferredDate", e.target.value)}
                className={`${INPUT_CLASSES} text-slate-300`}
              />
            </div>
            <div>
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                Preferred Slot
              </label>
              <select
                value={form.timeSlot}
                onChange={(e) => update("timeSlot", e.target.value)}
                className={`${INPUT_CLASSES} text-slate-300`}
              >
                {APPOINTMENT.timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                Treatment
              </label>
              <select
                value={form.treatment}
                onChange={(e) => update("treatment", e.target.value)}
                className={`${INPUT_CLASSES} text-slate-300`}
              >
                {APPOINTMENT.treatments.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Specialist & Note */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <div>
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                Consulting Specialist
              </label>
              <select
                value={form.doctor}
                onChange={(e) => update("doctor", e.target.value)}
                className={`${INPUT_CLASSES} text-slate-300`}
              >
                {DOCTOR_OPTIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10.5px] font-medium text-slate-300 mb-1">
                Dental Symptoms / Note <span className="text-slate-500">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Toothache, RCT inquiry, braces..."
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={INPUT_CLASSES}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.45)] cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span>Book Consultation on WhatsApp</span>
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-1">
              Direct connection to {CONTACT.phone} • Fast &amp; verified.
            </p>
          </div>

          {/* Secondary contact line */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-[11px] pt-0.5">
            <a
              href={quickChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-brand-teal hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Chat with Desk</span>
            </a>
            <span className="hidden sm:inline text-slate-600">•</span>
            <a
              href={CONTACT.phoneDial}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-brand-teal" />
              <span>Call: {CONTACT.phoneShort}</span>
            </a>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400 pt-2 border-t border-teal-950/60">
            {BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5">
                <Icon className="w-3 h-3 text-brand-teal shrink-0" />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </div>
        </form>
      )}
    </div>
  );
}
