
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { format, parseISO } from 'date-fns';

interface WeddingInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData; // Made formData optional
}

const WeddingInvitePreview: React.FC<WeddingInvitePreviewProps> = ({ template, formData }) => {
  // Provide default values if formData or its properties are undefined
  const { 
    eventName = "Sophia & Liam", 
    eventDate = "2025-07-15", // Default date string
    eventTime = "14:00", 
    eventLocation = "The Grand Hall, New York",
    primaryColor = '#B45309', // Default from original design
    fontStyle = 'Playfair Display' 
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM do, yyyy") : "Select a Date";
  const displayTime = eventTime || "Set Time";
  
  const safeFontStyle = fontStyle || 'Playfair Display';

  return (
    <div 
      className="w-full aspect-[3/4] bg-rose-50 p-4 flex flex-col items-center justify-center border border-rose-200 rounded-t-lg overflow-hidden relative"
      style={{ fontFamily: `'${safeFontStyle}', serif` }}
    >
      <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 opacity-50" style={{borderColor: primaryColor || '#D1A6A0'}}></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 opacity-50" style={{borderColor: primaryColor || '#D1A6A0'}}></div>
      
      <div className="text-center">
        <p className="text-xs" style={{ fontFamily: "'Parisienne', cursive", color: primaryColor || '#B45309' }}>
          Together with their families
        </p>
        <h2 
          className="text-2xl my-1 truncate max-w-[90%]" 
          style={{ fontFamily: `'${safeFontStyle}', serif`, color: primaryColor ? primaryColor : '#832729' }}
          title={eventName}
        >
          {eventName}
        </h2>
        <p className="text-xs mt-1" style={{ fontFamily: "'Parisienne', cursive", color: primaryColor || '#B45309' }}>
          request the honor of your presence
        </p>
        <p className="text-xs mt-3 tracking-wider" style={{color: primaryColor || '#9A3412'}}>
          AT THEIR WEDDING CELEBRATION
        </p>
        
        <div className="mt-4 border-t pt-2 w-3/4 mx-auto" style={{borderColor: primaryColor || '#FECACA'}}>
          <p className="text-xs font-semibold" style={{color: primaryColor || '#9A3412'}}>{displayDate.toUpperCase()}</p>
          <p className="text-xs" style={{color: primaryColor || '#B45309'}}>AT {displayTime}</p>
          <p className="text-xs mt-1 truncate max-w-[90%]" style={{color: primaryColor || '#B45309'}} title={eventLocation}>
            {eventLocation}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitePreview;
