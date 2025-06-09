
'use client'; 

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, addDoc, collection, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { useParams, notFound } from 'next/navigation';

import WeddingInvitePreview from '@/components/create/templates/WeddingInvitePreview';
import CorporateInvitePreview from '@/components/create/templates/CorporateInvitePreview';
import MeetupInvitePreview from '@/components/create/templates/MeetupInvitePreview';
import PartyInvitePreview from '@/components/create/templates/PartyInvitePreview';
import ConferenceInvitePreview from '@/components/create/templates/ConferenceInvitePreview';
import type { EventDetailsFormData } from '@/components/create/CustomizeDetailsStep';
import type { Template } from '@/app/create/page'; 
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface EventDataFromFirestore {
  templateId: string;
  eventDetails: EventDetailsFormData;
  planId: string;
  planName: string;
  planMaxVisits: number | null;
  visitCount: number;
  // other fields like createdAt, eventId
}


const renderInviteTemplate = (templateId: string, eventDetails: EventDetailsFormData, isFullPage: boolean = true) => {
  const dummyTemplate: Template = { 
      id: templateId, 
      name: 'Custom Event', 
      previewImageUrl: 'https://placehold.co/600x800.png',
      description: 'Event invite',
      aiHint: 'event'
  };

  const containerClasses = isFullPage 
    ? "w-full max-w-2xl mx-auto shadow-2xl rounded-lg overflow-hidden" 
    : "w-full h-auto object-cover rounded-md border border-border overflow-hidden shadow-lg";

  switch (templateId) {
    case 'wedding':
      return <div className={containerClasses}><WeddingInvitePreview template={dummyTemplate} formData={eventDetails} /></div>;
    case 'corporate':
      return <div className={containerClasses}><CorporateInvitePreview template={dummyTemplate} formData={eventDetails} /></div>;
    case 'meetup':
      return <div className={containerClasses}><MeetupInvitePreview template={dummyTemplate} formData={eventDetails} /></div>;
    case 'party':
      return <div className={containerClasses}><PartyInvitePreview template={dummyTemplate} formData={eventDetails} /></div>;
    case 'conference':
      return <div className={containerClasses}><ConferenceInvitePreview template={dummyTemplate} formData={eventDetails} /></div>;
    default:
      return <p className="text-center text-destructive">Unknown template type. Cannot display invite.</p>;
  }
};

export default function InvitePage() {
  const params = useParams();
  const inviteId = params.inviteId as string;

  const [eventData, setEventData] = useState<EventDataFromFirestore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpCustomAnswer, setRsvpCustomAnswer] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!inviteId) {
      setLoading(false);
      setError("Invite ID is missing.");
      return;
    }

    const fetchEventDataAndTrackVisit = async () => {
      setLoading(true);
      setError(null);
      try {
        const docRef = doc(db, "invites", inviteId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as EventDataFromFirestore;
          
          const storageKey = `eventlink_visited_${inviteId}`;
          const hasVisitedBefore = localStorage.getItem(storageKey) === 'true';

          let currentVisitCount = data.visitCount || 0;

          if (!hasVisitedBefore) {
            // New visitor
            if (data.planMaxVisits !== null && currentVisitCount >= data.planMaxVisits) {
              setError("This invitation has reached its view limit and is no longer available.");
              setEventData(null); // Ensure invite doesn't render
              setLoading(false);
              return; // Stop processing
            }
            
            // If not over limit, or unlimited plan, count this new visit
            localStorage.setItem(storageKey, 'true');
            await updateDoc(docRef, {
              visitCount: increment(1)
            });
            currentVisitCount++; // Optimistically update for current view
          }
          
          setEventData({ ...data, visitCount: currentVisitCount });
          if (data?.eventDetails?.eventName) {
            document.title = `${data.eventDetails.eventName} - EventLink Invitation`;
          }

        } else {
          setError("Invite not found.");
        }
      } catch (e) {
        console.error("Error fetching event data or tracking visit:", e);
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDataAndTrackVisit();
  }, [inviteId]);

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventData?.eventDetails?.enableRsvp || !inviteId) return;

    setIsSubmittingRsvp(true);
    try {
      const responsesCollectionRef = collection(db, "invites", inviteId, "responses");
      await addDoc(responsesCollectionRef, {
        name: rsvpName,
        email: rsvpEmail,
        customAnswer: rsvpCustomAnswer || "",
        submittedAt: serverTimestamp(),
      });
      setRsvpSubmitted(true);
      toast({
        title: "RSVP Submitted!",
        description: "Thank you for your response.",
      });
    } catch (err) {
      console.error("Error submitting RSVP:", err);
      toast({
        title: "RSVP Submission Failed",
        description: "Could not submit your RSVP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading Invite...</p>
      </div>
    );
  }

  if (error || !eventData) { // !eventData check ensures that if limit is reached, normal content doesn't show
     return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 text-center">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-2">Access Denied</h1>
            <p className="text-muted-foreground max-w-md">
                {error || "This invitation could not be loaded. It may have reached its view limit or is no longer available."}
            </p>
             <Button variant="outline" asChild className="mt-6">
                <Link href="/">Go to Homepage</Link>
            </Button>
        </div>
    );
  }
  
  const templateId = eventData?.templateId as string;
  const eventDetails = eventData?.eventDetails as EventDetailsFormData;

   // This check is technically redundant due to the one above, but good for safety.
  if (!templateId || !eventDetails) {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h1 className="text-3xl font-bold text-primary mb-4">Error</h1>
            <p className="text-muted-foreground">Could not load event details. The data might be incomplete.</p>
        </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 md:p-8">
      {renderInviteTemplate(templateId, eventDetails, true)}

      {eventDetails.enableRsvp && (
        <Card className="w-full max-w-2xl mt-8 bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold font-headline text-primary">
              {rsvpSubmitted ? "Thank You!" : "RSVP Here"}
            </CardTitle>
            {!rsvpSubmitted && <CardDescription className="text-muted-foreground">Let us know if you can make it.</CardDescription>}
          </CardHeader>
          <CardContent>
            {rsvpSubmitted ? (
              <p className="text-center text-accent">Your response has been recorded.</p>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="rsvpName" className="text-muted-foreground">Your Name</Label>
                  <Input 
                    id="rsvpName" 
                    type="text" 
                    value={rsvpName} 
                    onChange={(e) => setRsvpName(e.target.value)} 
                    required 
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rsvpEmail" className="text-muted-foreground">Your Email</Label>
                  <Input 
                    id="rsvpEmail" 
                    type="email" 
                    value={rsvpEmail} 
                    onChange={(e) => setRsvpEmail(e.target.value)} 
                    required 
                    className="mt-1"
                  />
                </div>
                {eventDetails.customRsvpQuestion && (
                  <div>
                    <Label htmlFor="rsvpCustomAnswer" className="text-muted-foreground">{eventDetails.customRsvpQuestion}</Label>
                    <Textarea 
                      id="rsvpCustomAnswer" 
                      value={rsvpCustomAnswer} 
                      onChange={(e) => setRsvpCustomAnswer(e.target.value)} 
                      rows={3}
                      className="mt-1"
                      placeholder="Your answer (optional)"
                    />
                  </div>
                )}
                <Button type="submit" className="w-full bg-accent text-accent-foreground" disabled={isSubmittingRsvp}>
                  {isSubmittingRsvp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit RSVP
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      )}

      <footer className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by <a href="/" className="text-accent hover:underline">EventLink</a>
        </p>
      </footer>
    </div>
  );
}
    
