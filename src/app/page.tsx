import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Pricing } from '@/components/landing/Pricing';
import { Demos } from '@/components/landing/Demos';
import { TrustSignal } from '@/components/landing/TrustSignal';
import { Footer } from '@/components/landing/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <Demos />
        <TrustSignal />
      </main>
      <Footer />
    </div>
  );
}
