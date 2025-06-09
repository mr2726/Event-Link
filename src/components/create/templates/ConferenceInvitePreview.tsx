
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Mic, Users, Wifi, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';

interface ConferenceInvitePreviewProps {
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

const ConferenceInvitePreview: React.FC<ConferenceInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "TechForward Summit", 
    eventDate = "2025-11-05", 
    eventTime = "10:00", 
    eventLocation = "Silicon Valley & Virtual",
    eventDescription = "The Future of Digital Transformation and AI.",
    primaryColor = '#39FF14', 
    fontStyle = 'Space Grotesk',
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = '',
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMM dd") : "Date";
  const displayTime = eventTime ? ` - ${eventTime}` : "";
  const year = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "yyyy") : "Year";

  const safeFontStyle = fontStyle || 'Space Grotesk';
  const safePrimaryColor = primaryColor || '#39FF14';
  const iconColor = safePrimaryColor;

  return (
    <div 
      className="w-full aspect-[3/4] bg-gray-900 p-3 flex flex-col justify-between border border-gray-700 rounded-t-lg overflow-hidden text-gray-100 text-xs"
      style={{ fontFamily: `'${safeFontStyle}', sans-serif` }}
    >
      <header className="flex justify-between items-center">
        <div className="p-0.5 rounded-sm" style={{ backgroundColor: `${safePrimaryColor}1A` }}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" style={{ color: safePrimaryColor }}>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
            </svg>
        </div>
        <p className="text-[10px] uppercase tracking-wider font-semibold" style={{ color: safePrimaryColor }}>Innovate. Connect. Inspire.</p>
      </header>
      
      <main className="my-2 text-center">
        <h2 
          className="text-xl font-bold text-white mt-0.5 leading-tight truncate max-w-full" 
          style={{ fontFamily: `'${safeFontStyle}', sans-serif` }}
          title={eventName}
        >
          {eventName}
        </h2>
        <p className="text-[11px] text-gray-400 mt-0.5 truncate max-w-full line-clamp-2" title={eventDescription}>
          {eventDescription}
        </p>
      </main>

      <footer className="mt-auto space-y-1.5">
        <div className="flex items-center text-[10px] text-gray-300">
          <Mic className="h-3 w-3 mr-1 flex-shrink-0" style={{ color: iconColor }}/>
          <span>Keynotes &amp; Panels</span>
        </div>
        <div className="flex items-center text-[10px] text-gray-300">
          <Users className="h-3 w-3 mr-1 flex-shrink-0" style={{ color: iconColor }}/>
          <span>Workshops &amp; Networking</span>
        </div>
         <div className="flex items-center text-[10px] text-gray-300">
          <Wifi className="h-3 w-3 mr-1 flex-shrink-0" style={{ color: iconColor }}/>
          <span>Hybrid Event: Online &amp; Onsite</span>
        </div>

        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="flex items-center text-[10px] gap-1 py-0.5 rounded hover:opacity-80"
             style={{ color: iconColor }}>
            <LinkIcon className="h-3 w-3" /> Conference Link
          </a>
        )}
        {enableRsvp && (
          <div className="text-[10px] p-1 rounded text-center" style={{ backgroundColor: `${iconColor}20`, color: iconColor }}>
            <Users className="inline h-3 w-3 mr-1" />
            Registration / RSVP Open {customRsvpQuestion ? ` (Q: "${customRsvpQuestion.substring(0,10)}...")` : ""}
          </div>
        )}

        <div className="border-t border-gray-700 pt-1 mt-1 space-y-0.5">
            <div className="flex flex-wrap justify-center items-center gap-1.5 px-1 mb-1">
                <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={iconColor} />
                <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={iconColor} />
                <SocialLink href={telegramLink} icon={Send} title="Telegram" color={iconColor} />
                <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={iconColor} />
                <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={iconColor} />
                <SocialLink href={zoomLink} icon={Video} title="Zoom" color={iconColor} />
                <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={iconColor} />
                <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={iconColor} />
            </div>
          <p className="text-sm font-semibold text-center" style={{ color: safePrimaryColor }}>{displayDate}{displayTime}, {year}</p>
          <p className="text-[10px] text-gray-500 truncate max-w-full text-center" title={eventLocation}>{eventLocation}</p>
        </div>
      </footer>
    </div>
  );
};

export default ConferenceInvitePreview;
    