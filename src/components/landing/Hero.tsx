import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export function Hero() {
  return (
    <section id="hero" className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background to-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline text-primary">
              Create Stunning Event Invites in Minutes
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl lg:text-lg">
              No sign-up needed—generate short links with RSVP tracking and integrations for Telegram, WhatsApp, Zoom, and more.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transition-all duration-300 hover:shadow-accent/50 transform hover:scale-105">
                Get Started Now
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105">
                Learn More
              </Button>
            </div>
             <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    Instant invite creation
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    No registration required
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent" />
                    RSVP tracking & analytics
                </li>
            </ul>
          </div>
          <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <Image
              src="https://placehold.co/1200x800.png"
              alt="Event Invitation Template"
              width={1200}
              height={800}
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center shadow-2xl sm:w-full lg:order-last"
              data-ai-hint="invitation template modern"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
