
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
import StreamInvitePreview from '@/components/create/templates/StreamInvitePreview'; // Import new template
import type { EventDetailsFormData } from '@/components/create/CustomizeDetailsStep';
import type { Template } from '@/app/create/page'; 
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

interface EventDataFromFirestore {
  templateId: string;
  eventDetails: EventDetailsFormData;
  planId: string;
  planName: string;
  planMaxVisits: number | null;
  visitCount: number;
  // other fields like createdAt, eventId
}


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
          const hasVisitedBefore = typeof window !== "undefined" ? localStorage.getItem(storageKey) === 'true' : false;

          let currentVisitCount = data.visitCount || 0;

          if (!hasVisitedBefore) {
            if (data.planMaxVisits !== null && currentVisitCount >= data.planMaxVisits) {
              setError("This invitation has reached its view limit and is no longer available.");
              setEventData(null); 
              setLoading(false);
              return; 
            }
            
            if (typeof window !== "undefined") localStorage.setItem(storageKey, 'true');
            await updateDoc(docRef, {
              visitCount: increment(1)
            });
            currentVisitCount++; 
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

  const handleRsvpSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
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
  
  const renderInviteTemplate = (
      templateId: string, 
      eventDetails: EventDetailsFormData
    ) => {
    const dummyTemplate: Template = { 
        id: templateId, 
        name: 'Custom Event', 
        previewImageUrl: eventDetails.primaryColor || 'https://placehold.co/600x800.png', // Less relevant now
        description: 'Event invite',
        aiHint: 'event'
    };
  
    const rsvpProps = {
      rsvpName, setRsvpName,
      rsvpEmail, setRsvpEmail,
      rsvpCustomAnswer, setRsvpCustomAnswer,
      isSubmittingRsvp,
      rsvpSubmitted,
      handleRsvpSubmit,
    };

    const containerClasses = "w-full max-w-2xl mx-auto shadow-2xl rounded-lg overflow-hidden";
  
    switch (templateId) {
      case 'wedding':
        return <div className={containerClasses}><WeddingInvitePreview template={dummyTemplate} formData={eventDetails} {...rsvpProps} isPublicInvitePage={true} /></div>;
      case 'corporate':
        return <div className={containerClasses}><CorporateInvitePreview template={dummyTemplate} formData={eventDetails} {...rsvpProps} isPublicInvitePage={true} /></div>;
      case 'meetup':
        return <div className={containerClasses}><MeetupInvitePreview template={dummyTemplate} formData={eventDetails} {...rsvpProps} isPublicInvitePage={true} /></div>;
      case 'party':
        return <div className={containerClasses}><PartyInvitePreview template={dummyTemplate} formData={eventDetails} {...rsvpProps} isPublicInvitePage={true} /></div>;
      case 'conference':
        return <div className={containerClasses}><ConferenceInvitePreview template={dummyTemplate} formData={eventDetails} {...rsvpProps} isPublicInvitePage={true} /></div>;
      case 'stream': // Add case for new template
        return <div className={containerClasses}><StreamInvitePreview template={dummyTemplate} formData={eventDetails} {...rsvpProps} isPublicInvitePage={true} /></div>;
      default:
        return <p className="text-center text-destructive">Unknown template type. Cannot display invite.</p>;
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

  if (error || !eventData) { 
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
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-start p-4 md:p-8">
      {renderInviteTemplate(templateId, eventDetails)}

      <footer className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by <a href="/" className="text-accent hover:underline">EventLink</a>
        </p>
      </footer>
    </div>
  );
}
