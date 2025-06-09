
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Template } from '@/app/create/page'; // For template prop type

// Import the actual preview components
import WeddingInvitePreview from '@/components/create/templates/WeddingInvitePreview';
import CorporateInvitePreview from '@/components/create/templates/CorporateInvitePreview';
import MeetupInvitePreview from '@/components/create/templates/MeetupInvitePreview';
// Note: Party and Conference previews are not used in the current Demos array, but could be added.

interface DemoItem {
  title: string;
  templateId: 'wedding' | 'corporate' | 'meetup'; // Added to map to specific preview
  imageUrl: string; // Still needed for the template prop structure
  aiHint: string; // Still needed for the template prop structure
  shortLink: string;
  description: string;
}

const demos: DemoItem[] = [
  {
    title: 'Wedding Invitation',
    templateId: 'wedding',
    imageUrl: 'https://placehold.co/600x800.png', // Original was 600x400, adjusted to match preview aspect better if fallback was used
    aiHint: 'wedding invitation elegant',
    shortLink: 'event.link/wed-demo',
    description: 'A beautiful and elegant invitation for a wedding celebration, complete with RSVP tracking.',
  },
  {
    title: 'Corporate Event',
    templateId: 'corporate',
    imageUrl: 'https://placehold.co/600x800.png',
    aiHint: 'corporate event professional',
    shortLink: 'event.link/corp-demo',
    description: 'Professional invitation for a corporate conference or seminar, with easy sharing options.',
  },
  {
    title: 'Community Meetup',
    templateId: 'meetup',
    imageUrl: 'https://placehold.co/600x800.png',
    aiHint: 'meetup flyer casual',
    shortLink: 'event.link/meet-demo',
    description: 'Casual and friendly invitation for a local community meetup or workshop.',
  },
];

const renderDemoPreview = (demo: DemoItem) => {
  // Construct the 'template' prop needed by the preview components
  const templateForPreview: Template = {
    id: demo.templateId,
    name: demo.title,
    previewImageUrl: demo.imageUrl, // Passed but not directly used by HTML previews
    description: demo.description,
    aiHint: demo.aiHint, // Passed but not directly used by HTML previews
  };

  // The container helps maintain aspect ratio and centers the preview
  const previewContainerClasses = "w-full h-auto aspect-[3/4] object-cover rounded-t-lg overflow-hidden bg-muted flex items-center justify-center";

  switch (demo.templateId) {
    case 'wedding':
      return <div className={previewContainerClasses}><WeddingInvitePreview template={templateForPreview} /></div>;
    case 'corporate':
      return <div className={previewContainerClasses}><CorporateInvitePreview template={templateForPreview} /></div>;
    case 'meetup':
      return <div className={previewContainerClasses}><MeetupInvitePreview template={templateForPreview} /></div>;
    default:
      // Fallback to an image if templateId is unrecognized, though it shouldn't happen with current setup
      return (
        <img
          src={demo.imageUrl}
          alt={demo.title}
          width={600}
          height={800} // Adjusted for 3/4 aspect ratio
          className="w-full h-auto aspect-[3/4] object-cover rounded-t-lg"
          data-ai-hint={demo.aiHint}
        />
      );
  }
};

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
                {renderDemoPreview(demo)}
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="text-xl font-semibold mb-2 font-headline text-foreground">{demo.title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">{demo.description}</p>
              </CardContent>
              <CardFooter className="p-6 bg-muted/50">
                <Button variant="outline" asChild className="w-full border-accent text-accent hover:bg-accent/10">
                  {/* These links are for display purposes only as per PRD */}
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
