
'use client';

import type { Template } from '@/app/create/page';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Eye } from 'lucide-react';

import WeddingInvitePreview from './templates/WeddingInvitePreview';
import CorporateInvitePreview from './templates/CorporateInvitePreview';
import MeetupInvitePreview from './templates/MeetupInvitePreview';
import PartyInvitePreview from './templates/PartyInvitePreview';
import ConferenceInvitePreview from './templates/ConferenceInvitePreview';

interface SelectTemplateStepProps {
  templates: Template[];
  onTemplateSelect: (template: Template) => void;
}

const renderTemplatePreviewOnCard = (template: Template) => {
  // Ensure the preview components are styled to fit the card
  // The template preview components themselves handle their aspect ratio and basic styling.
  // We might need a wrapper div if specific sizing is needed here.
  const previewContainerClasses = "w-full h-auto aspect-[3/4] object-cover rounded-t-lg overflow-hidden";

  switch (template.id) {
    case 'wedding':
      return <div className={previewContainerClasses}><WeddingInvitePreview template={template} /></div>;
    case 'corporate':
      return <div className={previewContainerClasses}><CorporateInvitePreview template={template} /></div>;
    case 'meetup':
      return <div className={previewContainerClasses}><MeetupInvitePreview template={template} /></div>;
    case 'party':
      return <div className={previewContainerClasses}><PartyInvitePreview template={template} /></div>;
    case 'conference':
      return <div className={previewContainerClasses}><ConferenceInvitePreview template={template} /></div>;
    default:
      // Fallback to original image if no specific preview component is found
      // This also means the dialog will use this as a fallback too.
      return (
        <Image
          src={template.previewImageUrl}
          alt={template.name}
          width={600}
          height={800}
          className="w-full h-auto aspect-[3/4] object-cover rounded-t-lg"
          data-ai-hint={template.aiHint}
        />
      );
  }
};

const SelectTemplateStep: React.FC<SelectTemplateStepProps> = ({ templates, onTemplateSelect }) => {
  return (
    <section className="animate-fadeIn">
      <h2 className="text-3xl font-bold font-headline text-center mb-2 text-primary">Step 1: Select a Template</h2>
      <p className="text-center text-muted-foreground mb-10">Choose a base design for your event invitation.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="flex flex-col bg-card hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="p-0">
              {renderTemplatePreviewOnCard(template)}
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="text-lg font-semibold font-headline text-foreground">{template.name}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">{template.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 flex gap-2">
              <Button 
                onClick={() => onTemplateSelect(template)} 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 flex-1"
              >
                Select
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 p-2">
                    <Eye className="h-5 w-5" />
                    <span className="sr-only">Preview {template.name}</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] bg-card text-foreground">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-primary">{template.name} - Preview</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      {template.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="my-4">
                    <Image
                      src={template.previewImageUrl} // Dialog still uses placeholder image
                      alt={`Preview of ${template.name}`}
                      width={600}
                      height={800}
                      className="w-full h-auto object-contain rounded-md"
                      data-ai-hint={template.aiHint}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">Close</Button>
                    </DialogClose>
                     <Button 
                        onClick={() => {
                           // Need to find a way to close the dialog after selection if DialogClose is not enough
                           const closeButton = document.querySelector('[aria-label="Close"]');
                           if(closeButton instanceof HTMLElement) closeButton.click();
                           onTemplateSelect(template);
                        }} 
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                      >
                        Select This Template
                      </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default SelectTemplateStep;

