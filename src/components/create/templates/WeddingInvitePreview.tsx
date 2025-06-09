
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { format, parseISO } from 'date-fns';
import { Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';

interface WeddingInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData;
}

const SocialLink: React.FC<{href?: string; icon: React.ElementType; title: string; color?: string}> = ({ href, icon: Icon, title, color }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} className="hover:opacity-75 transition-opacity" style={{color: color || 'inherit'}}>
      <Icon className="h-4 w-4" />
    </a>
  );
};

const WeddingInvitePreview: React.FC<WeddingInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "Sophia & Liam", 
    eventDate = "2025-07-15",
    eventTime = "14:00", 
    eventLocation = "The Grand Hall, New York",
    eventDescription = "Join us as we celebrate our special day.", // Added default
    primaryColor = '#B45309', 
    fontStyle = 'Playfair Display',
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM do, yyyy") : "Select a Date";
  const displayTime = eventTime || "Set Time";
  
  const safeFontStyle = fontStyle || 'Playfair Display';
  const linkColor = primaryColor === '#B45309' ? '#832729' : primaryColor; // ensure links are visible

  return (
    <div 
      className="w-full aspect-[3/4] bg-rose-50 p-4 flex flex-col items-center justify-center border border-rose-200 rounded-t-lg overflow-hidden relative text-sm"
      style={{ fontFamily: `'${safeFontStyle}', serif` }}
    >
      <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 opacity-50" style={{borderColor: primaryColor || '#D1A6A0'}}></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 opacity-50" style={{borderColor: primaryColor || '#D1A6A0'}}></div>
      
      <div className="text-center">
        <p className="text-xs" style={{ fontFamily: "'Parisienne', cursive", color: primaryColor || '#B45309' }}>
          Together with their families
        </p>
        <h2 
          className="text-2xl my-1 truncate max-w-[90%] mx-auto" 
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
        
        <div className="mt-3 border-t pt-2 w-3/4 mx-auto" style={{borderColor: primaryColor || '#FECACA'}}>
          <p className="text-xs font-semibold" style={{color: primaryColor || '#9A3412'}}>{displayDate.toUpperCase()}</p>
          <p className="text-xs" style={{color: primaryColor || '#B45309'}}>AT {displayTime}</p>
          <p className="text-xs mt-1 truncate max-w-[90%] mx-auto" style={{color: primaryColor || '#B45309'}} title={eventLocation}>
            {eventLocation}
          </p>
        </div>

        {eventDescription && (
          <p className="text-[10px] mt-2 px-2 text-gray-700 max-w-[85%] mx-auto line-clamp-2" style={{color: primaryColor ? primaryColor : '#713f12'}}>
            {eventDescription}
          </p>
        )}

        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="text-[10px] mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded hover:opacity-80"
             style={{ backgroundColor: `${primaryColor}20`, color: linkColor }}>
            <LinkIcon className="h-2.5 w-2.5" /> Event Link
          </a>
        )}
      </div>
      
      <div className="mt-auto pt-2 flex flex-wrap justify-center items-center gap-2 px-2">
        <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={linkColor} />
        <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={linkColor} />
        <SocialLink href={telegramLink} icon={Send} title="Telegram" color={linkColor} />
        <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={linkColor} />
        <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={linkColor} />
        <SocialLink href={zoomLink} icon={Video} title="Zoom" color={linkColor} />
        <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={linkColor} />
        <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={linkColor} />
      </div>
    </div>
  );
};

export default WeddingInvitePreview;

    