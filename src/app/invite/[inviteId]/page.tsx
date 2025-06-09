
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import WeddingInvitePreview from '@/components/create/templates/WeddingInvitePreview';
import CorporateInvitePreview from '@/components/create/templates/CorporateInvitePreview';
import MeetupInvitePreview from '@/components/create/templates/MeetupInvitePreview';
import PartyInvitePreview from '@/components/create/templates/PartyInvitePreview';
import ConferenceInvitePreview from '@/components/create/templates/ConferenceInvitePreview';
import type { EventDetailsFormData } from '@/components/create/CustomizeDetailsStep';
import type { Template } from '@/app/create/page'; // Re-using template type for structure

interface InvitePageProps {
  params: {
    inviteId: string;
  };
}

// Helper function to get full template details (mocked for now, as templates array isn't global)
// In a real app, you might fetch this from a 'templates' collection or have it statically defined
const getTemplateDetailsById = (templateId: string): Partial<Template> => {
    // This is a simplified version. Ideally, the full template object or its relevant parts
    // (like previewImageUrl if needed for meta tags, or specific aiHint) would be fetched
    // or reconstructed. For rendering, templateId and eventDetails are primary.
    return { id: templateId, name: `Template ${templateId}` , previewImageUrl: '', description: '', aiHint: '' };
}


export async function generateMetadata({ params }: InvitePageProps): Promise<Metadata> {
  const { inviteId } = params;
  const docRef = doc(db, 'invites', inviteId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      title: 'Invite Not Found',
    };
  }
  const eventData = docSnap.data();
  const eventName = eventData?.eventDetails?.eventName || 'Event Invitation';
  
  return {
    title: `${eventName} - EventLink Invitation`,
    description: `You're invited to ${eventName}. View the details here.`,
    // openGraph: {
    //   title: `${eventName} - EventLink Invitation`,
    //   description: `You're invited to ${eventName}.`,
    //   images: [eventData?.selectedTemplate?.previewImageUrl || 'https://eventlink.to/default-og-image.png'],
    // },
  };
}


const renderInviteTemplate = (templateId: string, eventDetails: EventDetailsFormData) => {
  const dummyTemplate: Template = { 
      id: templateId, 
      name: 'Custom Event', 
      previewImageUrl: 'https://placehold.co/600x800.png', // Not used directly in these previews
      description: 'Event invite',
      aiHint: 'event'
  };

  // We wrap the preview in a div to control its max-width for a better "page" feel
  // The previews themselves are designed to be aspect-[3/4] and might need adjustment for full page
  // For now, we'll let them expand but cap width.
  const containerClasses = "w-full max-w-2xl mx-auto shadow-2xl rounded-lg overflow-hidden";

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


export default async function InvitePage({ params }: InvitePageProps) {
  const { inviteId } = params;

  if (!inviteId) {
    notFound();
  }

  const docRef = doc(db, "invites", inviteId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound();
  }

  const eventData = docSnap.data();
  const templateId = eventData?.templateId as string;
  const eventDetails = eventData?.eventDetails as EventDetailsFormData;

  if (!templateId || !eventDetails) {
    // This case should ideally be caught by notFound earlier if docSnap.exists() is false
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-primary mb-4">Error</h1>
            <p className="text-muted-foreground">Could not load event details. The data might be incomplete.</p>
        </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 md:p-8">
       {/* 
        A simple container for the invite.
        The preview components are designed for aspect-[3/4].
        We might need dedicated "display" components for a true full-page invite feel.
        For now, centering the preview component.
      */}
      {renderInviteTemplate(templateId, eventDetails)}

      <footer className="mt-12 text-center">
        <p className="text-sm text-muted-foreground">
          Powered by <a href="/" className="text-accent hover:underline">EventLink</a>
        </p>
      </footer>
    </div>
  );
}
