import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import AdopcionesExitosas from "@/components/AdopcionesExitosas";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import MagicParticles from "@/components/MagicParticles";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <MagicParticles />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <AdopcionesExitosas />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
