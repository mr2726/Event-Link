
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    visits: '20 visits',
    features: ['Basic RSVP Tracking', 'Standard Templates', 'Email Support'],
    cta: 'Get Started for Free',
    popular: false,
  },
  {
    name: 'Starter',
    price: '$5',
    visits: '50 visits',
    features: ['Enhanced RSVP Tracking', 'More Templates', 'Priority Email Support', 'Basic Integrations'],
    cta: 'Choose Starter',
    popular: true,
  },
  {
    name: 'Pro',
    price: '$10',
    visits: '100 visits',
    features: ['Advanced RSVP Tracking', 'Customizable Templates', 'Chat & Email Support', 'All Integrations'],
    cta: 'Choose Pro',
    popular: false,
  },
  {
    name: 'Unlimited',
    price: '$15',
    visits: 'Unlimited visits',
    features: ['Full RSVP Suite', 'Premium Templates', 'Dedicated Support', 'All Integrations', 'Custom Domain Option'],
    cta: 'Go Unlimited',
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-accent font-medium">Pricing Plans</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Choose the plan that fits your needs. No hidden fees, upgrade or downgrade anytime.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pricingTiers.map((tier, index) => (
            <Card 
              key={tier.name} 
              className={`flex flex-col shadow-lg hover:shadow-primary/20 transition-shadow duration-300 animate-fadeIn ${tier.popular ? 'border-2 border-primary relative' : 'bg-card'}`}
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs text-primary-foreground font-semibold">
                  Most Popular
                </div>
              )}
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold font-headline text-foreground">{tier.name}</CardTitle>
                <CardDescription className="text-4xl font-extrabold text-primary">{tier.price} <span className="text-sm font-normal text-muted-foreground">/event</span></CardDescription>
                <p className="text-sm text-muted-foreground">{tier.visits} included</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <ul className="space-y-2">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-accent" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild
                  className={`w-full ${tier.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/90'}`}
                >
                  <Link href="/create">{tier.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
         <p className="mt-8 text-center text-sm text-muted-foreground">
            All prices are one-time per event. Contact us for custom enterprise solutions.
          </p>
      </div>
    </section>
  );
}

