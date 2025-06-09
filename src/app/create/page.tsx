
'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import SelectTemplateStep from '@/components/create/SelectTemplateStep';
import CustomizeDetailsStep, { type EventDetailsFormData } from '@/components/create/CustomizeDetailsStep';
import ChoosePlanStep, { type Plan } from '@/components/create/ChoosePlanStep';
import { Toaster } from '@/components/ui/toaster'; 

export interface Template {
  id: string;
  name: string;
  previewImageUrl: string;
  description: string;
  aiHint: string;
}

const templates: Template[] = [
  { id: 'wedding', name: 'Elegant Wedding', previewImageUrl: 'https://placehold.co/600x800.png', description: 'A classic and elegant template for weddings.', aiHint: 'wedding invitation elegant' },
  { id: 'corporate', name: 'Modern Corporate', previewImageUrl: 'https://placehold.co/600x800.png', description: 'A professional template for corporate events.', aiHint: 'corporate event professional' },
  { id: 'meetup', name: 'Casual Meetup', previewImageUrl: 'https://placehold.co/600x800.png', description: 'A friendly template for community meetups.', aiHint: 'meetup flyer casual' },
  { id: 'party', name: 'Birthday Bash', previewImageUrl: 'https://placehold.co/600x800.png', description: 'A fun and vibrant template for parties.', aiHint: 'birthday party fun' },
  { id: 'conference', name: 'Tech Conference', previewImageUrl: 'https://placehold.co/600x800.png', description: 'A sleek template for tech conferences.', aiHint: 'tech conference modern' },
];

const CreateEventPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetailsFormData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const progressValue = useMemo(() => {
    if (currentStep === 1) return 33;
    if (currentStep === 2) return 66;
    if (currentStep === 3) return 100;
    return 0;
  }, [currentStep]);

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    handleNextStep();
  };

  const handleDetailsSubmit = (data: EventDetailsFormData) => {
    setEventDetails(data);
    handleNextStep();
  };

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    // In a real app, proceed to generation/payment here
  };


  return (
    <>
      <Head>
        <title>Create Event Invite - EventLink</title>
        <meta name="description" content="Create your custom event invitation with EventLink." />
      </Head>

      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Page Header */}
        <header className="py-8 bg-card shadow-md relative">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary relative">
              Create Your Event Invite Now
            </h1>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Progress value={progressValue} className="w-full h-3 mb-2 bg-muted" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Select Template</span>
            <span>Customize Details</span>
            <span>Choose Plan & Generate</span>
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
          {currentStep === 1 && (
            <SelectTemplateStep templates={templates} onTemplateSelect={handleTemplateSelect} />
          )}
          {currentStep === 2 && selectedTemplate && (
            <CustomizeDetailsStep
              template={selectedTemplate}
              onSubmit={handleDetailsSubmit}
              initialData={eventDetails}
            />
          )}
          {currentStep === 3 && eventDetails && (
            <ChoosePlanStep
              onPlanSelect={handlePlanSelect}
              eventDetails={eventDetails}
              selectedTemplate={selectedTemplate}
            />
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between items-center">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={handlePreviousStep} className="border-primary text-primary hover:bg-primary/10">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            ) : <div />}
            
            {currentStep < 3 && (currentStep === 1 ? !selectedTemplate : !eventDetails) && (
                 <Button 
                    variant="default" 
                    onClick={handleNextStep} 
                    disabled={currentStep === 1 ? !selectedTemplate : (currentStep === 2 ? !eventDetails : false) }
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                   {currentStep === 1 && !selectedTemplate ? "Select a Template to Proceed" : "Next Step"}
                 </Button>
            )}
          </div>
        </main>

        {/* Page Footer */}
        <footer className="py-8 border-t border-border/40 bg-card text-center">
          <div className="container mx-auto px-4 md:px-6">
            <p className="text-sm text-muted-foreground mb-2">
              No account needed—pay per event!
            </p>
            <div className="flex justify-center items-center space-x-4">
              <Link href="/" className="text-sm text-accent hover:underline">
                Back to Landing Page
              </Link>
              <a href="mailto:support@eventlink.com" className="text-sm flex items-center text-accent hover:underline">
                <MessageSquare className="mr-1 h-4 w-4" /> Support
              </a>
            </div>
          </div>
        </footer>
      </div>
      <Toaster />
    </>
  );
};

export default CreateEventPage;
