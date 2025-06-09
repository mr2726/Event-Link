
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Users, Coffee, MessageCircle, MapPin } from 'lucide-react'; // Removed CalendarClock as it wasn't used
import { format, parseISO } from 'date-fns';

interface MeetupInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData; // Made formData optional
}

const MeetupInvitePreview: React.FC<MeetupInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "Local Coders Meetup!", 
    eventDate = "2025-08-20", 
    eventTime = "18:30", 
    eventLocation = "The Tech Hub, Downtown",
    eventDescription = "Join us for tech talks, networking, and free pizza!",
    primaryColor = '#f59e0b', // Default from original design
    fontStyle = 'Space Grotesk' 
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMM d, yyyy") : "Select Date";
  const displayTime = eventTime || "Set Time";
  
  const safeFontStyle = fontStyle || 'Space Grotesk';

  return (
    <div 
      className="w-full aspect-[3/4] bg-amber-100 p-4 flex flex-col items-center justify-center border-2 border-dashed rounded-t-lg overflow-hidden"
      style={{ borderColor: primaryColor || '#f59e0b', fontFamily: `'${safeFontStyle}', sans-serif` }}
    >
      <div className="text-center p-3 bg-white/80 rounded-lg shadow-lg w-full max-w-[90%]">
        <Users className="h-8 w-8 mx-auto mb-1" style={{ color: primaryColor || '#d97706' }} />
        <h2 
          className="text-lg font-bold truncate max-w-full"
          style={{ color: primaryColor || '#b45309' }}
          title={eventName}
        >
          {eventName}
        </h2>
        <p className="text-xs my-1.5 px-1 truncate max-w-full" style={{ color: primaryColor || '#d97706' }} title={eventDescription?.substring(0,60)}>
          {eventDescription?.substring(0,60) || "Join us for tech talks & networking!"}
           {eventDescription && eventDescription.length > 60 ? "..." : ""}
        </p>
        
        <div className="flex items-center justify-center text-xs mt-2 space-x-2" style={{ color: primaryColor || '#ea580c' }}>
          <div className="flex items-center">
            <Coffee className="h-3 w-3 mr-0.5"/>
            <span>Refreshments</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-0.5"/>
            <span>Great Talks</span>
          </div>
        </div>
         <p 
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block mt-2"
            style={{ backgroundColor: `${primaryColor}33` /* 20% opacity */, color: primaryColor || '#92400e' }}
        >
          {displayDate} @ {displayTime}
        </p>
      </div>
      
      <div className="mt-3 w-full text-center">
        <p className="text-xs truncate max-w-full" style={{ color: primaryColor || '#b45309' }} title={eventLocation}>
            <MapPin className="inline h-3 w-3 mr-0.5" /> {eventLocation}
        </p>
      </div>
    </div>
  );
};

export default MeetupInvitePreview;
