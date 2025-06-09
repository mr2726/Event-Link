
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Gift, Zap, Music, Pizza, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';

interface PartyInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData;
}

const SocialLink: React.FC<{href?: string; icon: React.ElementType; title: string; color?: string}> = ({ href, icon: Icon, title, color }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} className="hover:opacity-75 transition-opacity" style={{color: color || 'inherit'}}>
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
};

const PartyInvitePreview: React.FC<PartyInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "Leo's Birthday Bash", 
    eventDate = "2025-09-05", 
    eventTime = "20:00", 
    eventLocation = "The Usual Spot!",
    eventDescription = "Get ready for an unforgettable night!", // Added default
    primaryColor = '#DB2777', 
    fontStyle = 'Montserrat',
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink
  } = formData || {};
  
  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMM d") : "Date";
  const displayTime = eventTime || "Time";

  const safeFontStyle = fontStyle || 'Montserrat';
  const safePrimaryColor = primaryColor || '#DB2777';
  const yellowAccent = '#FDE047'; // Maintained for high contrast on dark party theme

  return (
    <div 
      className="w-full aspect-[3/4] p-3 flex flex-col items-center justify-between border-2 rounded-t-lg overflow-hidden text-white relative shadow-xl text-xs"
      style={{ 
        background: `linear-gradient(to br, ${safePrimaryColor}, ${safePrimaryColor === '#DB2777' ? '#7E22CE' : '#9333EA'})`,
        borderColor: yellowAccent,
        fontFamily: `'${safeFontStyle}', sans-serif`
      }}
    >
      <Zap className="absolute top-2 left-2 h-5 w-5 opacity-80 transform rotate-[-15deg]" style={{ color: yellowAccent }}/>
      <Gift className="absolute bottom-2 right-2 h-6 w-6 opacity-80 transform rotate-[10deg]" style={{ color: yellowAccent }}/>
      <Music className="absolute top-1/3 left-3 h-4 w-4 opacity-60 transform rotate-[5deg]" style={{ color: `${yellowAccent}CC` }} />
      <Pizza className="absolute bottom-1/3 right-3 h-4 w-4 opacity-60 transform rotate-[-5deg]" style={{ color: `${yellowAccent}CC` }} />

      <div className="text-center z-10 bg-black/30 p-2.5 rounded-md backdrop-blur-sm w-full max-w-[90%]">
        <p className="text-[10px] uppercase tracking-wider animate-pulse" style={{ fontFamily: "'Space Grotesk', sans-serif", color: yellowAccent }}>
          You're Invited!
        </p>
        <h2 
            className="text-2xl font-black my-0.5 truncate max-w-full" 
            style={{ color: 'white', textShadow: `1px 1px ${safePrimaryColor === '#DB2777' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.3)'}` }}
            title={eventName}
        >
          {eventName?.split(' ')[0] || "PARTY"}
        </h2>
        <h3 
            className="text-xl font-extrabold truncate max-w-full" 
            style={{ color: yellowAccent, textShadow: `1px 1px rgba(0,0,0,0.5)`}}
            title={eventName?.substring(eventName.indexOf(" ") + 1) || "TIME!"}
        >
          {eventName?.includes(" ") ? eventName.substring(eventName.indexOf(" ") + 1) : "TIME!"}
        </h3>
        <p 
            className="mt-1.5 text-[10px] font-semibold px-2 py-0.5 rounded-full inline-block shadow-md"
            style={{ backgroundColor: yellowAccent, color: safePrimaryColor }}
        >
          {displayDate} - {displayTime}
        </p>
        <p className="text-[9px] mt-1 text-yellow-100 line-clamp-2 max-w-full" title={eventDescription}>
            {eventDescription}
        </p>
        {optionalLink && (
            <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
               className="text-[9px] mt-1 flex items-center justify-center gap-1 py-0.5 rounded hover:opacity-80 w-full"
               style={{ color: yellowAccent }}>
              <LinkIcon className="h-2.5 w-2.5" /> Main Party Link
            </a>
        )}
      </div>
      
      <div className="mt-auto z-10 w-full text-center space-y-1.5">
         <p className="text-[10px]" style={{ color: `${yellowAccent}E6` }}>
            At: <span className="font-semibold truncate max-w-[150px] inline-block align-bottom" title={eventLocation}>{eventLocation}</span>
         </p>
         <div className="flex flex-wrap justify-center items-center gap-1.5 px-1">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={yellowAccent} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={yellowAccent} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={yellowAccent} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={yellowAccent} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={yellowAccent} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={yellowAccent} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={yellowAccent} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={yellowAccent} />
        </div>
      </div>
    </div>
  );
};

export default PartyInvitePreview;

    