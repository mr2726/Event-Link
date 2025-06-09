
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Briefcase, CalendarDays, MapPin } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface CorporateInvitePreviewProps {
  template: Template;
  formData: EventDetailsFormData;
}

const CorporateInvitePreview: React.FC<CorporateInvitePreviewProps> = ({ template, formData }) => {
  const { eventName, eventDate, eventTime, eventLocation, primaryColor, fontStyle } = formData;

  const displayDate = eventDate ? format(parseISO(eventDate), "MMMM do, yyyy") : "Select Date";
  const displayTime = eventTime || "";

  const safeFontStyle = fontStyle || 'Space Grotesk';

  return (
    <div 
      className="w-full aspect-[3/4] bg-slate-800 p-4 flex flex-col justify-between border border-slate-700 rounded-t-lg overflow-hidden text-slate-100"
      style={{ fontFamily: `'${safeFontStyle}', sans-serif` }}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold truncate max-w-[80%]" style={{ color: primaryColor || '#67e8f9' }} title={eventName}>
          {eventName || "Corporate Summit 2026"}
        </h2>
        <Briefcase className="h-6 w-6" style={{ color: primaryColor || '#06b6d4' }} />
      </div>
      
      <div className="my-3">
        <p className="text-xs text-slate-300 uppercase tracking-wider mb-1">You are invited to the</p>
        <p className="text-md font-semibold text-slate-100 truncate max-w-full" title={formData.eventDescription?.substring(0,50)}>
          {formData.eventDescription?.substring(0,50) || "Annual Business Leaders Conference"}
           {formData.eventDescription && formData.eventDescription.length > 50 ? "..." : ""}
        </p>
      </div>

      <div className="space-y-2 text-xs text-slate-300">
        <div className="flex items-center">
          <CalendarDays className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: primaryColor || '#67e8f9' }} />
          <span>{displayDate} {displayTime && `at ${displayTime}`}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: primaryColor || '#67e8f9' }} />
          <span className="truncate max-w-[80%]" title={eventLocation}>{eventLocation || "Metro Convention Center"}</span>
        </div>
      </div>
      
      <div className="mt-auto border-t border-slate-600 pt-2">
        <p className="text-center text-xs font-medium uppercase" style={{ color: primaryColor || '#67e8f9' }}>
          Innovate. Connect. Grow.
        </p>
      </div>
    </div>
  );
};

export default CorporateInvitePreview;
