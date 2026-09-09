import AppointmentForm from "./AppointmentForm";
import Testimonials from "./Testimonials";

export default function AppointmentSection() {
  return (
    <section id="appointment" className="py-10 sm:py-14 md:py-16 bg-brand-dark relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 items-stretch">
          {/* Testimonials Card */}
          <Testimonials />

          {/* Booking form Card */}
          <div className="bg-brand-card border border-teal-900/60 rounded-2xl p-3.5 sm:p-6 shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="mb-4">
                <p className="text-brand-teal text-[10.5px] font-bold uppercase tracking-[0.2em] mb-1">
                  WhatsApp Consultation &amp; Booking
                </p>
                <h3 className="text-xl sm:text-2xl font-playfair font-bold text-white leading-snug">
                  City Dental &amp; Face Hospital, Siwan
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Fill the details below to connect directly with Dr. Vijay Kumar&rsquo;s desk on WhatsApp.
                </p>
              </div>

              <AppointmentForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
