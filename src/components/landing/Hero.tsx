
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart, Briefcase, PartyPopper } from 'lucide-react';
import Link from 'next/link';

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
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transition-all duration-300 hover:shadow-accent/50 transform hover:scale-105" asChild>
                <Link href="/create">Get Started Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10 transition-all duration-300 transform hover:scale-105" asChild>
                <Link href="/learn-more">Learn More</Link>
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
          <div className="animate-fadeIn  lg:order-last" style={{ animationDelay: '0.4s' }}>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-xl bg-gradient-to-br from-card to-background/50 p-6 shadow-2xl">
              {/* Decorative background elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full opacity-50 animate-pulse animation-delay-2000"></div>

              {/* Mini Invite Cards */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Card 1 - Wedding */}
                <div className="absolute w-40 h-56 sm:w-48 sm:h-64 bg-rose-50 rounded-lg shadow-xl p-3 transform -rotate-6 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-out border border-rose-200">
                  <Heart className="w-8 h-8 text-rose-400 mb-2 opacity-80" />
                  <h4 className="font-headline text-sm font-semibold text-rose-700">Sophia & Liam</h4>
                  <p className="text-xs text-rose-500 mt-1">Wedding Day</p>
                  <div className="mt-2 h-12 bg-rose-100 rounded"></div>
                  <p className="text-xs text-rose-400 mt-2 text-center">View Invite</p>
                </div>

                {/* Card 2 - Corporate */}
                <div className="absolute w-40 h-56 sm:w-48 sm:h-64 bg-slate-100 rounded-lg shadow-xl p-3 transform rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-out border border-slate-300 z-10">
                  <Briefcase className="w-8 h-8 text-slate-500 mb-2 opacity-80" />
                  <h4 className="font-headline text-sm font-semibold text-slate-800">Corporate Summit</h4>
                  <p className="text-xs text-slate-600 mt-1">Annual Conference</p>
                  <div className="mt-2 h-12 bg-slate-200 rounded"></div>
                  <p className="text-xs text-slate-500 mt-2 text-center">Register Now</p>
                </div>

                {/* Card 3 - Party */}
                <div className="absolute w-40 h-56 sm:w-48 sm:h-64 bg-purple-100 rounded-lg shadow-xl p-3 transform rotate-8 translate-x-8 sm:translate-x-12 hover:rotate-0 hover:scale-105 transition-transform duration-300 ease-out border border-purple-300">
                   <PartyPopper className="w-8 h-8 text-purple-500 mb-2 opacity-80" />
                  <h4 className="font-headline text-sm font-semibold text-purple-800">Birthday Bash!</h4>
                  <p className="text-xs text-purple-600 mt-1">Join the Fun</p>
                  <div className="mt-2 h-12 bg-purple-200 rounded"></div>
                  <p className="text-xs text-purple-500 mt-2 text-center">RSVP Here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
