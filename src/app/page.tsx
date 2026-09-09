import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Treatments from "@/components/Treatments";
import Transformations from "@/components/Transformations";
import AboutTechnology from "@/components/AboutTechnology";
import Dentists from "@/components/Dentists";
import Gallery from "@/components/Gallery";
import AppointmentSection from "@/components/AppointmentSection";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Treatments />
        <Transformations />
        <AboutTechnology />
        <Dentists />
        <Gallery />
        <AppointmentSection />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
