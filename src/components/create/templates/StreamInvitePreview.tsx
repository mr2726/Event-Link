
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Radio, CalendarDays, Clock, Twitch, Youtube, Twitter, Linkedin, Send, Video, Link as LinkIcon, Users, Loader2, CheckCircle } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface StreamInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData;
  // RSVP Props
  rsvpName?: string;
  setRsvpName?: (value: string) => void;
  rsvpEmail?: string;
  setRsvpEmail?: (value: string) => void;
  rsvpCustomAnswer?: string;
  setRsvpCustomAnswer?: (value: string) => void;
  isSubmittingRsvp?: boolean;
  rsvpSubmitted?: boolean;
  handleRsvpSubmit?: (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => void;
  isPublicInvitePage?: boolean;
}

const SocialLink: React.FC<{href?: string; icon: React.ElementType; title: string; color?: string}> = ({ href, icon: Icon, title, color }) => {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} className="hover:opacity-75 transition-opacity" style={{color: color || 'inherit'}}>
      <Icon className="h-5 w-5" />
    </a>
  );
};

const StreamInvitePreview: React.FC<StreamInvitePreviewProps> = ({ 
  template, 
  formData,
  rsvpName, setRsvpName,
  rsvpEmail, setRsvpEmail,
  rsvpCustomAnswer, setRsvpCustomAnswer,
  isSubmittingRsvp, rsvpSubmitted,
  handleRsvpSubmit,
  isPublicInvitePage = false
}) => {
  const { 
    eventName = "Live Coding Masterclass: Next.js & AI", 
    eventDate = "2025-10-15", 
    eventTime = "17:00", 
    eventLocation = "Online - YouTube Live & Zoom Q&A", // Can be channel name or platform
    eventDescription = "Join me for a deep dive into building modern web apps with Next.js and integrating AI features. We'll cover server components, Genkit, and more!",
    primaryColor = '#8B5CF6', // A nice violet/purple often associated with tech/gaming
    fontStyle = 'Space Grotesk', // Modern, clean sans-serif
    optionalLink, // This will be the main "Watch Live" link
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = 'What topic are you most interested in?',
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "EEEE, MMMM do") : "Set Date";
  const displayTime = eventTime ? `${eventTime} (Your Timezone)` : "Set Time";

  const safeFontStyle = fontStyle || 'Space Grotesk';
  const safePrimaryColor = primaryColor || '#8B5CF6';
  const textColor = '#E5E7EB'; // Light gray for text on dark background
  const mutedTextColor = '#9CA3AF'; // Darker gray
  const backgroundColor = '#111827'; // Gray 900 (very dark)
  const cardColor = '#1F2937'; // Gray 800

  const rsvpFormVisible = isPublicInvitePage && enableRsvp;

  return (
    <div 
      className="w-full min-h-[800px] md:min-h-[750px] p-6 md:p-8 flex flex-col justify-between border-2 rounded-lg overflow-y-auto shadow-2xl"
      style={{ 
          fontFamily: `'${safeFontStyle}', sans-serif`,
          backgroundColor: backgroundColor,
          borderColor: safePrimaryColor,
          color: textColor,
        }}
    >
      <header className="mb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3" style={{ backgroundColor: `${safePrimaryColor}33`, color: safePrimaryColor}}>
            <Radio className="h-4 w-4 animate-pulse" /> LIVE STREAM / MASTERCLASS
        </div>
        <h1 
          className="text-3xl md:text-4xl font-bold leading-tight break-words" 
          style={{ color: textColor }}
          title={eventName}
        >
          {eventName}
        </h1>
      </header>
      
      <main className="flex-grow space-y-5">
        <div className="p-4 rounded-lg" style={{backgroundColor: cardColor}}>
            <div className="flex items-center mb-2">
                <CalendarDays className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: safePrimaryColor }} />
                <span className="text-base font-medium">{displayDate}</span>
            </div>
            <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 flex-shrink-0" style={{ color: safePrimaryColor }} />
                <span className="text-base font-medium">{displayTime}</span>
            </div>
        </div>
        
        <p className="text-sm md:text-base leading-relaxed" style={{color: mutedTextColor}} title={eventDescription}>
          {eventDescription}
        </p>
        
        {eventLocation && (
             <p className="text-xs text-center font-medium uppercase tracking-wider" style={{color: safePrimaryColor}} title={eventLocation}>
                Platform: {eventLocation}
            </p>
        )}


        {optionalLink && (
          <div className="text-center mt-6">
            <a 
                href={optionalLink} target="_blank" rel="noopener noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-transform hover:scale-105"
                style={{ backgroundColor: safePrimaryColor, color: backgroundColor === '#111827' ? '#FFFFFF' : '#111827' }}
            >
              <Video className="h-6 w-6" /> Watch Live / Join Session
            </a>
          </div>
        )}
      </main>

      {rsvpFormVisible && !rsvpSubmitted && (
        <form onSubmit={handleRsvpSubmit} className="w-full mt-8 space-y-4 p-4 rounded-lg" style={{backgroundColor: cardColor}}>
            <h3 className="text-xl font-semibold text-center mb-4" style={{color: safePrimaryColor}}>Register to Get Updates</h3>
             <div>
                <Label htmlFor="rsvpNameStream" className="text-xs font-medium" style={{color: mutedTextColor}}>Your Name</Label>
                <Input 
                id="rsvpNameStream" type="text" value={rsvpName} 
                onChange={(e) => setRsvpName && setRsvpName(e.target.value)} required 
                className="mt-1 !text-sm !bg-gray-700 !border-gray-600 !text-white placeholder:!text-gray-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': safePrimaryColor} as React.CSSProperties}
                />
            </div>
            <div>
                <Label htmlFor="rsvpEmailStream" className="text-xs font-medium" style={{color: mutedTextColor}}>Your Email</Label>
                <Input 
                id="rsvpEmailStream" type="email" value={rsvpEmail} 
                onChange={(e) => setRsvpEmail && setRsvpEmail(e.target.value)} required 
                className="mt-1 !text-sm !bg-gray-700 !border-gray-600 !text-white placeholder:!text-gray-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': safePrimaryColor} as React.CSSProperties}
                />
            </div>
            {customRsvpQuestion && (
            <div>
                <Label htmlFor="rsvpCustomStream" className="text-xs font-medium" style={{color: mutedTextColor}}>{customRsvpQuestion}</Label>
                <Textarea 
                id="rsvpCustomStream" value={rsvpCustomAnswer} 
                onChange={(e) => setRsvpCustomAnswer && setRsvpCustomAnswer(e.target.value)} rows={2}
                className="mt-1 !text-sm !bg-gray-700 !border-gray-600 !text-white placeholder:!text-gray-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': safePrimaryColor} as React.CSSProperties}
                placeholder="Your answer (optional)"
                />
            </div>
            )}
            <Button 
            type="submit" className="w-full !text-base !font-semibold" disabled={isSubmittingRsvp} 
            style={{backgroundColor: safePrimaryColor, color: backgroundColor === '#111827' ? '#FFFFFF' : '#111827'}}
            onClick={handleRsvpSubmit}
            >
            {isSubmittingRsvp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register
            </Button>
        </form>
      )}
      {rsvpFormVisible && rsvpSubmitted && (
         <div className="w-full mt-8 p-6 rounded-lg text-center" style={{backgroundColor: cardColor}}>
            <CheckCircle className="h-10 w-10 mx-auto mb-3" style={{color: safePrimaryColor}} />
            <h3 className="text-xl font-semibold" style={{color: textColor}}>Successfully Registered!</h3>
            <p className="text-sm" style={{color: mutedTextColor}}>We'll keep you updated. See you at the event!</p>
        </div>
      )}
      {!isPublicInvitePage && enableRsvp && (
        <div className="mt-6 text-center text-xs p-2 rounded-md" style={{ backgroundColor: `${safePrimaryColor}2A`, color: safePrimaryColor }}>
          <Users className="inline h-3.5 w-3.5 mr-1.5" />
          Stream registration form will be active. {customRsvpQuestion ? `(Q: "${customRsvpQuestion.substring(0,20)}...")` : ""}
        </div>
      )}
      
      <footer className="mt-auto pt-6 border-t" style={{borderColor: `${safePrimaryColor}50`}}>
        <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-3 mb-3">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={safePrimaryColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={safePrimaryColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={safePrimaryColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube Channel" color={safePrimaryColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={safePrimaryColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={safePrimaryColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet (e.g. for Q&A)" color={safePrimaryColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom (e.g. for Q&A)" color={safePrimaryColor} />
        </div>
        <p className="text-center text-xs font-medium" style={{ color: mutedTextColor }}>
          Connect with us: #{eventName.replace(/[^a-zA-Z0-9]/g, '') || 'OnlineEvent'}
        </p>
      </footer>
    </div>
  );
};

export default StreamInvitePreview;
