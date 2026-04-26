import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Showcase } from "@/components/Showcase";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";
import { ShiningDots } from "@/components/ShiningDots";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-brand-black overflow-hidden">
      {/* Global shining dots — fixed behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ShiningDots count={70} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <Showcase />
        <Waitlist />
        <Footer />
      </div>
    </main>
  );
}
