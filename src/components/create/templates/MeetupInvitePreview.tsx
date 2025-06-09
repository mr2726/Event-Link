
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Users, Coffee, MessageCircle, MapPin, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';

interface MeetupInvitePreviewProps {
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

const MeetupInvitePreview: React.FC<MeetupInvitePreviewProps> = ({ template, formData }) => {
  const { 
    eventName = "Local Coders Meetup!", 
    eventDate = "2025-08-20", 
    eventTime = "18:30", 
    eventLocation = "The Tech Hub, Downtown",
    eventDescription = "Join us for tech talks, networking, and free pizza!",
    primaryColor = '#f59e0b', 
    fontStyle = 'Space Grotesk',
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMM d, yyyy") : "Select Date";
  const displayTime = eventTime || "Set Time";
  
  const safeFontStyle = fontStyle || 'Space Grotesk';
  const textColor = primaryColor || '#b45309';
  const iconColor = primaryColor || '#d97706';

  return (
    <div 
      className="w-full aspect-[3/4] bg-amber-100 p-3 flex flex-col items-center justify-between border-2 border-dashed rounded-t-lg overflow-hidden text-xs"
      style={{ borderColor: primaryColor || '#f59e0b', fontFamily: `'${safeFontStyle}', sans-serif` }}
    >
      <div className="text-center p-2.5 bg-white/80 rounded-lg shadow-lg w-full max-w-[95%]">
        <Users className="h-6 w-6 mx-auto mb-1" style={{ color: iconColor }} />
        <h2 
          className="text-base font-bold truncate max-w-full"
          style={{ color: textColor }}
          title={eventName}
        >
          {eventName}
        </h2>
        <p className="text-[10px] my-1 px-1 truncate max-w-full line-clamp-2" style={{ color: textColor }} title={eventDescription}>
          {eventDescription}
        </p>
        
        <div className="flex items-center justify-center text-[10px] mt-1.5 space-x-1.5" style={{ color: iconColor }}>
          <div className="flex items-center">
            <Coffee className="h-2.5 w-2.5 mr-0.5"/>
            <span>Refreshments</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-2.5 w-2.5 mr-0.5"/>
            <span>Great Talks</span>
          </div>
        </div>
         <p 
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full inline-block mt-1.5"
            style={{ backgroundColor: `${primaryColor}33`, color: textColor }}
        >
          {displayDate} @ {displayTime}
        </p>
        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="text-[9px] mt-1.5 flex items-center justify-center gap-1 py-0.5 rounded hover:opacity-80 w-full"
             style={{ color: textColor }}>
            <LinkIcon className="h-2.5 w-2.5" /> Event Link
          </a>
        )}
      </div>
      
      <div className="mt-auto w-full text-center space-y-1.5">
        <p className="text-[10px] truncate max-w-full" style={{ color: textColor }} title={eventLocation}>
            <MapPin className="inline h-3 w-3 mr-0.5" /> {eventLocation}
        </p>
        <div className="flex flex-wrap justify-center items-center gap-1.5 px-1">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={iconColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={iconColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={iconColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={iconColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={iconColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={iconColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={iconColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={iconColor} />
        </div>
      </div>
    </div>
  );
};

export default MeetupInvitePreview;

    