
'use client';

import { useState } from 'react';
import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from './CustomizeDetailsStep';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check, Copy, ExternalLink, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface Plan {
  id: string;
  name: string;
  price: number;
  visits: string;
  description: string;
  isPopular?: boolean;
}

const plans: Plan[] = [
  { id: 'free', name: 'Free', price: 0, visits: '20 visits', description: 'Up to 20 invitation views.' },
  { id: 'starter', name: 'Starter', price: 5, visits: '50 visits', description: 'Up to 50 invitation views.', isPopular: true },
  { id: 'pro', name: 'Pro', price: 10, visits: '100 visits', description: 'Up to 100 invitation views.' },
  { id: 'unlimited', name: 'Unlimited', price: 15, visits: 'Unlimited visits', description: 'Unlimited invitation views.' },
];

interface ChoosePlanStepProps {
  onPlanSelect: (plan: Plan) => void;
  eventDetails: EventDetailsFormData;
  selectedTemplate: Template | null;
}

const ChoosePlanStep: React.FC<ChoosePlanStepProps> = ({ onPlanSelect, eventDetails, selectedTemplate }) => {
  const [selectedPlanId, setSelectedPlanId] = useState<string>(plans.find(p => p.isPopular)?.id || 'starter');
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const currentPlan = plans.find(p => p.id === selectedPlanId);

  const handleGenerateLink = async () => {
    if (!currentPlan || !selectedTemplate) {
      toast({
        title: "Error",
        description: "Please select a plan and ensure template and details are set.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    onPlanSelect(currentPlan);
    
    const eventId = Math.random().toString(36).substring(2, 10); // Generate a unique ID for the event

    try {
      // Simulate payment for non-free plans
      if (currentPlan.price > 0) {
        toast({
          title: "Payment Required",
          description: `Simulating Stripe checkout for ${currentPlan.name} plan ($${currentPlan.price}). Please wait...`,
          duration: 3000,
        });
        // Simulate a delay for payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Save to Firestore
      const eventData = {
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        eventDetails: eventDetails,
        planId: currentPlan.id,
        planName: currentPlan.name,
        createdAt: serverTimestamp(),
        eventId: eventId,
      };
      await setDoc(doc(db, "invites", eventId), eventData);

      // Use relative path for Next.js Link component
      const newGeneratedLink = `/invite/${eventId}`;
      setGeneratedLink(newGeneratedLink);
      
      toast({
        title: "Link Generated & Saved!",
        description: "Your event invitation link is ready and saved to Firestore.",
      });

    } catch (error) {
      console.error("Error generating link or saving to Firestore: ", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your link or saving data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (generatedLink) {
      // For copying the full URL
      const fullUrl = `${window.location.origin}${generatedLink}`;
      navigator.clipboard.writeText(fullUrl).then(() => {
        setIsCopied(true);
        toast({ title: "Copied!", description: "Full link copied to clipboard." });
        setTimeout(() => setIsCopied(false), 2000);
      }).catch(err => {
        toast({ title: "Error", description: "Failed to copy link.", variant: "destructive" });
      });
    }
  };

  if (generatedLink) {
    const fullDisplayUrl = `${window.location.origin}${generatedLink}`;
    return (
      <section className="animate-fadeIn text-center max-w-md mx-auto">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold font-headline text-primary">Your Link is Ready!</CardTitle>
            <CardDescription className="text-muted-foreground">Share this link with your guests.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input type="text" value={fullDisplayUrl} readOnly className="flex-grow" />
              <Button onClick={handleCopyToClipboard} variant="outline" size="icon" className="border-accent text-accent hover:bg-accent/10">
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Selected Plan: <span className="font-semibold text-accent">{currentPlan?.name}</span> ({currentPlan?.visits})
            </p>
            <Button variant="link" asChild className="text-primary hover:text-primary/80">
              <a href={generatedLink} target="_blank" rel="noopener noreferrer">
                Preview Your Invite <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </CardContent>
          <CardFooter>
            <Button onClick={() => window.location.reload()} className="w-full bg-primary text-primary-foreground">
              Create Another Invite
            </Button>
          </CardFooter>
        </Card>
      </section>
    );
  }

  return (
    <section className="animate-fadeIn">
      <h2 className="text-3xl font-bold font-headline text-center mb-2 text-primary">Step 3: Choose Plan & Generate Link</h2>
      <p className="text-center text-muted-foreground mb-10">Select a plan based on your expected number of invitation views.</p>

      <RadioGroup
        value={selectedPlanId}
        onValueChange={setSelectedPlanId}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
      >
        {plans.map((plan) => (
          <Label
            key={plan.id}
            htmlFor={plan.id}
            className={`block cursor-pointer rounded-lg border-2 bg-card p-4 transition-all hover:shadow-lg
              ${selectedPlanId === plan.id ? 'border-primary shadow-primary/30' : 'border-border hover:border-muted'}
              ${plan.isPopular ? 'relative' : ''}`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs text-primary-foreground font-semibold">
                Popular
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold font-headline text-foreground">{plan.name}</h3>
              <RadioGroupItem value={plan.id} id={plan.id} className="h-5 w-5"/>
            </div>
            <p className="text-3xl font-extrabold text-primary">
              ${plan.price} <span className="text-sm font-normal text-muted-foreground">/event</span>
            </p>
            <p className="text-sm text-muted-foreground mt-1">{plan.visits}</p>
            <p className="text-xs text-muted-foreground mt-2">{plan.description}</p>
          </Label>
        ))}
      </RadioGroup>
      
      <div className="mt-6 text-center">
        <p className="text-lg text-muted-foreground mb-2">
          Selected Plan: <span className="font-semibold text-accent">{currentPlan?.name}</span>
        </p>
        <p className="text-md text-muted-foreground mb-6">
          Visits included: <span className="font-semibold text-accent">{currentPlan?.visits}</span>
        </p>
        <Button 
          onClick={handleGenerateLink} 
          size="lg" 
          className="w-full max-w-xs mx-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/30 transition-all duration-300 hover:shadow-accent/50 transform hover:scale-105"
          disabled={!currentPlan || isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Processing...' : (currentPlan?.price && currentPlan.price > 0 ? `Pay $${currentPlan.price} & Generate Link` : 'Generate Free Link')}
        </Button>
         <p className="mt-4 text-xs text-muted-foreground">
            You will be redirected to Stripe for payment if applicable. Firestore saving is now active.
          </p>
      </div>

      <Card className="mt-12 bg-card/50 border-dashed border-border">
        <CardHeader>
          <CardTitle className="text-lg font-headline text-muted-foreground">Your Event Setup (Summary)</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1 text-muted-foreground">
          <p><strong>Template:</strong> {selectedTemplate?.name}</p>
          <p><strong>Event Name:</strong> {eventDetails.eventName}</p>
          <p><strong>Date & Time:</strong> {eventDetails.eventDate} at {eventDetails.eventTime}</p>
          <p><strong>Invite Color:</strong> <span style={{display: 'inline-block', width: '12px', height: '12px', backgroundColor: eventDetails.primaryColor, border: '1px solid var(--border)'}}></span> {eventDetails.primaryColor}</p>
          <p><strong>Font:</strong> {eventDetails.fontStyle}</p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ChoosePlanStep;
