
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Mic, Users, Wifi, CalendarClock, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ConferenceInvitePreviewProps {
  template: Template;
  formData: EventDetailsFormData;
}

const ConferenceInvitePreview: React.FC<ConferenceInvitePreviewProps> = ({ template, formData }) => {
  const { eventName, eventDate, eventTime, eventLocation, primaryColor, fontStyle } = formData;

  const displayDate = eventDate ? format(parseISO(eventDate), "MMM dd") : "Date";
  const displayTime = eventTime ? ` - ${eventTime}` : "";
  const year = eventDate ? format(parseISO(eventDate), "yyyy") : "Year";

  const safeFontStyle = fontStyle || 'Space Grotesk';
  const safePrimaryColor = primaryColor || '#39FF14'; // Default to neon green

  return (
    <div 
      className="w-full aspect-[3/4] bg-gray-900 p-4 flex flex-col justify-between border border-gray-700 rounded-t-lg overflow-hidden text-gray-100"
      style={{ fontFamily: `'${safeFontStyle}', sans-serif` }}
    >
      <header className="flex justify-between items-center">
        <div className="p-1 rounded-sm" style={{ backgroundColor: `${safePrimaryColor}1A`/*10% opacity*/ }}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" style={{ color: safePrimaryColor }}>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
            </svg>
        </div>
        <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: safePrimaryColor }}>Innovate. Connect. Inspire.</p>
      </header>
      
      <main className="my-3 text-center">
        <h2 
          className="text-2xl font-bold text-white mt-1 leading-tight truncate max-w-full" 
          style={{ fontFamily: `'${safeFontStyle}', sans-serif` }}
          title={eventName}
        >
          {eventName || `TechForward ${year}`}
        </h2>
        <p className="text-sm text-gray-400 mt-1 truncate max-w-full" title={formData.eventDescription?.substring(0,40)}>
          {formData.eventDescription?.substring(0,40) || "The Future of Digital Transformation"}
           {formData.eventDescription && formData.eventDescription.length > 40 ? "..." : ""}
        </p>
      </main>

      <footer className="mt-auto space-y-2">
        <div className="flex items-center text-xs text-gray-400">
          <Mic className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" style={{ color: safePrimaryColor }}/>
          <span>Keynotes & Panels</span>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <Users className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" style={{ color: safePrimaryColor }}/>
          <span>Workshops & Networking</span>
        </div>
         <div className="flex items-center text-xs text-gray-400">
          <Wifi className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" style={{ color: safePrimaryColor }}/>
          <span>Hybrid Event: Online & Onsite</span>
        </div>
        <div className="border-t border-gray-700 pt-1.5 mt-1.5">
          <p className="text-sm font-semibold" style={{ color: safePrimaryColor }}>{displayDate}{displayTime}, {year}</p>
          <p className="text-xs text-gray-500 truncate max-w-full" title={eventLocation}>{eventLocation || "Silicon Valley & Virtual"}</p>
        </div>
      </footer>
    </div>
  );
};

export default ConferenceInvitePreview;
