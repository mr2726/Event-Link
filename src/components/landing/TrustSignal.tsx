import { Users, Award, Star } from 'lucide-react';

export function TrustSignal() {
  return (
    <section id="trust" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
           <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-accent font-medium">Trusted & Reliable</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Join Thousands of Happy Event Planners
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            EventLink is built to be reliable, fast, and user-friendly, ensuring your event invitations make a great first impression.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card shadow-md animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <Award className="h-12 w-12 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">Industry Recognized</h3>
            <p className="text-sm text-center text-muted-foreground">Praised for its simplicity and effectiveness by event professionals.</p>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card shadow-md animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            <Users className="h-12 w-12 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">Growing Community</h3>
            <p className="text-sm text-center text-muted-foreground">Trusted by a rapidly expanding base of users for events of all sizes.</p>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card shadow-md animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <Star className="h-12 w-12 text-accent" />
            <h3 className="text-xl font-semibold text-foreground">Top-Rated Support</h3>
            <p className="text-sm text-center text-muted-foreground">Our dedicated team is here to help you succeed with your events.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
