import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const demos = [
  {
    title: 'Wedding Invitation',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'wedding invitation elegant',
    shortLink: 'event.link/wed-demo',
    description: 'A beautiful and elegant invitation for a wedding celebration, complete with RSVP tracking.',
  },
  {
    title: 'Corporate Event',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'corporate event professional',
    shortLink: 'event.link/corp-demo',
    description: 'Professional invitation for a corporate conference or seminar, with easy sharing options.',
  },
  {
    title: 'Community Meetup',
    imageUrl: 'https://placehold.co/600x400.png',
    aiHint: 'meetup flyer casual',
    shortLink: 'event.link/meet-demo',
    description: 'Casual and friendly invitation for a local community meetup or workshop.',
  },
];

export function Demos() {
  return (
    <section id="demos" className="w-full py-16 md:py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-accent font-medium">Live Demos</div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-primary">
            See EventLink in Action
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Explore these sample invitations to get a feel for the customization and features EventLink offers.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {demos.map((demo, index) => (
            <Card 
              key={demo.title} 
              className="flex flex-col overflow-hidden bg-background shadow-lg hover:shadow-accent/20 transition-shadow duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 0.1 + 0.2}s` }}
            >
              <CardHeader className="p-0">
                <Image
                  src={demo.imageUrl}
                  alt={demo.title}
                  width={600}
                  height={400}
                  className="aspect-video w-full object-cover"
                  data-ai-hint={demo.aiHint}
                />
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2 font-headline text-foreground">{demo.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">{demo.description}</p>
              </CardContent>
              <CardFooter className="p-6 bg-muted/50">
                <Button variant="outline" asChild className="w-full border-accent text-accent hover:bg-accent/10">
                  <Link href="#" target="_blank" rel="noopener noreferrer">
                    View Demo (Link: {demo.shortLink})
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
