
import { Header } from '@/components/landing/Header';
import { Footer } from '@/components/landing/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function LearnMorePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-16 md:py-24">
        <section className="animate-fadeIn">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline text-primary mb-6">
              Discover the Power of EventLink
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              EventLink is designed to make your event planning seamless, efficient, and enjoyable. Create stunning invitations, manage your guests, and focus on what truly matters: hosting an unforgettable event.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-card p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-semibold font-headline text-accent mb-4">Why Choose EventLink?</h2>
              <p className="text-muted-foreground mb-4">
                We believe that creating and managing event invitations shouldn't be a chore. EventLink offers a modern, user-friendly solution without the need for complicated sign-ups or subscriptions.
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Simplicity First:</strong> Intuitive design means you can create beautiful invites in minutes, not hours.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span><strong>No Account Needed:</strong> Get started right away and pay only for what you use. Perfect for one-off events or frequent planners.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Powerful Features:</strong> From RSVP tracking to easy sharing via short links and platform integrations, we've got you covered.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Modern & Professional:</strong> Impress your guests with stylish, responsive invitations that look great on any device.</span>
                </li>
              </ul>
            </div>
            <div className="bg-card p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-semibold font-headline text-accent mb-4">Our Core Features</h2>
              <p className="text-muted-foreground mb-4">
                EventLink is packed with features to streamline your event invitation process:
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Instant Invite Creation:</strong> Pick a template, customize details, and your invite is ready.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Customizable Templates:</strong> Choose from a variety of designs for weddings, corporate events, parties, and more.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Unique Short Links:</strong> Easy-to-share links for your invitations (e.g., event.link/your-event).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>RSVP Tracking:</strong> (Coming Soon) Keep track of who's attending.</span>
                </li>
                 <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Social & Meeting Links:</strong> Easily add links for Twitter, LinkedIn, Zoom, Google Meet, and more directly to your invite.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                  <span><strong>Pay-Per-Event:</strong> Transparent pricing with no subscriptions.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Ready to create your next amazing event invitation?
            </p>
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transform hover:scale-105 transition-all" asChild>
              <Link href="/create">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
