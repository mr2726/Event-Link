
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Briefcase, CalendarDays, MapPin, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';

interface CorporateInvitePreviewProps {
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

const CorporateInvitePreview: React.FC<CorporateInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "Corporate Summit 2026", 
    eventDate = "2026-03-10", 
    eventTime = "09:00", 
    eventLocation = "Metro Convention Center",
    eventDescription = "Annual Business Leaders Conference for innovative strategies and networking.",
    primaryColor = '#67e8f9', 
    fontStyle = 'Space Grotesk',
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM do, yyyy") : "Select Date";
  const displayTime = eventTime || "";

  const safeFontStyle = fontStyle || 'Space Grotesk';
  const iconColor = primaryColor || '#06b6d4';

  return (
    <div 
      className="w-full aspect-[3/4] bg-slate-800 p-4 flex flex-col justify-between border border-slate-700 rounded-t-lg overflow-hidden text-slate-100 text-xs"
      style={{ fontFamily: `'${safeFontStyle}', sans-serif` }}
    >
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-bold truncate max-w-[80%]" style={{ color: primaryColor || '#67e8f9' }} title={eventName}>
          {eventName}
        </h2>
        <Briefcase className="h-5 w-5" style={{ color: iconColor }} />
      </div>
      
      <div className="my-2">
        <p className="text-[10px] text-slate-300 uppercase tracking-wider mb-0.5">You are invited to the</p>
        <p className="text-sm font-semibold text-slate-100 truncate max-w-full line-clamp-2" title={eventDescription}>
          {eventDescription}
        </p>
      </div>

      <div className="space-y-1.5 text-[11px] text-slate-300">
        <div className="flex items-center">
          <CalendarDays className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: iconColor }} />
          <span>{displayDate} {displayTime && `at ${displayTime}`}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1.5 flex-shrink-0" style={{ color: iconColor }} />
          <span className="truncate max-w-[80%]" title={eventLocation}>{eventLocation}</span>
        </div>
        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="flex items-center text-[10px] gap-1 py-0.5 rounded hover:opacity-80"
             style={{ color: iconColor }}>
            <LinkIcon className="h-3 w-3" /> Main Event Link
          </a>
        )}
      </div>
      
      <div className="mt-auto border-t border-slate-600 pt-2 space-y-1.5">
        <div className="flex flex-wrap justify-center items-center gap-2 px-1">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={iconColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={iconColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={iconColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={iconColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={iconColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={iconColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={iconColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={iconColor} />
        </div>
        <p className="text-center text-[10px] font-medium uppercase" style={{ color: primaryColor || '#67e8f9' }}>
          Innovate. Connect. Grow.
        </p>
      </div>
    </div>
  );
};

export default CorporateInvitePreview;

    