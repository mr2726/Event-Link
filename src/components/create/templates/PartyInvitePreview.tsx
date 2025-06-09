
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Gift, Zap, Music, Pizza } from 'lucide-react'; // Removed CalendarClock
import { format, parseISO } from 'date-fns';

interface PartyInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData; // Made formData optional
}

const PartyInvitePreview: React.FC<PartyInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "Leo's Birthday Bash", 
    eventDate = "2025-09-05", 
    eventTime = "20:00", 
    eventLocation = "The Usual Spot!",
    primaryColor = '#DB2777', // Default from original design
    fontStyle = 'Montserrat' 
  } = formData || {};
  
  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMM d") : "Date";
  const displayTime = eventTime || "Time";

  const safeFontStyle = fontStyle || 'Montserrat';
  const safePrimaryColor = primaryColor || '#DB2777';

  const getSecondaryColor = (hexcolor: string) => {
    const r = parseInt(hexcolor.slice(1, 3), 16);
    const g = parseInt(hexcolor.slice(3, 5), 16);
    const b = parseInt(hexcolor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 125 ? '#333333' : '#FFFFFF';
  };

  const accentTextColor = getSecondaryColor(safePrimaryColor);
  const yellowAccent = '#FDE047';

  return (
    <div 
      className="w-full aspect-[3/4] p-4 flex flex-col items-center justify-center border-2 rounded-t-lg overflow-hidden text-white relative shadow-xl"
      style={{ 
        background: `linear-gradient(to br, ${safePrimaryColor}, ${safePrimaryColor === '#DB2777' ? '#7E22CE' : '#9333EA'})`,
        borderColor: yellowAccent,
        fontFamily: `'${safeFontStyle}', sans-serif`
      }}
    >
      <Zap className="absolute top-3 left-3 h-6 w-6 opacity-80 transform rotate-[-15deg]" style={{ color: yellowAccent }}/>
      <Gift className="absolute bottom-3 right-3 h-7 w-7 opacity-80 transform rotate-[10deg]" style={{ color: yellowAccent }}/>
      <Music className="absolute top-1/3 left-5 h-5 w-5 opacity-60 transform rotate-[5deg]" style={{ color: `${yellowAccent}CC` }} />
      <Pizza className="absolute bottom-1/3 right-5 h-5 w-5 opacity-60 transform rotate-[-5deg]" style={{ color: `${yellowAccent}CC` }} />

      <div className="text-center z-10 bg-black/30 p-3 rounded-md backdrop-blur-sm">
        <p className="text-sm uppercase tracking-wider animate-pulse" style={{ fontFamily: "'Space Grotesk', sans-serif", color: yellowAccent }}>
          You're Invited!
        </p>
        <h2 
            className="text-3xl font-black my-1 truncate max-w-[200px]" 
            style={{ 
                color: 'white', 
                textShadow: `2px 2px ${safePrimaryColor}`
            }}
            title={eventName}
        >
          {eventName?.split(' ')[0] || "PARTY"}
        </h2>
        <h3 
            className="text-2xl font-extrabold truncate max-w-[200px]" 
            style={{ 
                color: yellowAccent,
                textShadow: `1px 1px ${accentTextColor === '#FFFFFF' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.3)'}`
            }}
            title={eventName?.substring(eventName.indexOf(" ") + 1) || "TIME!"}
        >
          {eventName?.includes(" ") ? eventName.substring(eventName.indexOf(" ") + 1) : "TIME!"}
        </h3>
        <p 
            className="mt-2.5 text-xs font-semibold px-2.5 py-1 rounded-full inline-block shadow-md"
            style={{ backgroundColor: yellowAccent, color: safePrimaryColor }}
        >
          {displayDate} - {displayTime}
        </p>
      </div>
      <p className="z-10 mt-3 text-center text-xs" style={{ color: `${yellowAccent}E6` }}>
        At: <span className="font-semibold truncate max-w-[150px] inline-block align-bottom" title={eventLocation}>{eventLocation}</span>
      </p>
    </div>
  );
};

export default PartyInvitePreview;
