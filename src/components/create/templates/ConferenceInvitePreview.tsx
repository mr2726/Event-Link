
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Mic, Users, Wifi, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon, Loader2, CalendarCheck2 } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface ConferenceInvitePreviewProps {
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
      <Icon className="h-4 w-4" />
    </a>
  );
};

const ConferenceInvitePreview: React.FC<ConferenceInvitePreviewProps> = ({ 
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
    eventName = "TechForward Summit 2025", 
    eventDate = "2025-11-05", 
    eventTime = "10:00", 
    eventLocation = "Silicon Valley Convention Center & Virtual Platform",
    eventDescription = "Join global leaders and innovators at TechForward Summit to explore the future of Digital Transformation, AI, and Sustainable Technology. Engage in keynotes, workshops, and networking.",
    primaryColor = '#39FF14', // Neon Green for techy feel
    fontStyle = 'Space Grotesk', // Modern, geometric sans-serif
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = '',
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM dd") : "Date";
  const displayTime = eventTime ? `from ${eventTime}` : "";
  const year = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "yyyy") : "Year";

  const safeFontStyle = fontStyle || 'Space Grotesk';
  const safePrimaryColor = primaryColor || '#39FF14';
  const textColor = '#F8FAFC'; // Off-white for readability on dark background
  const mutedTextColor = '#94A3B8'; // Lighter gray
  const backgroundColor = '#0F172A'; // Slate 900 (dark blue/gray)
  const cardColor = '#1E293B'; // Slate 800

  const rsvpFormVisible = isPublicInvitePage && enableRsvp;

  return (
    <div 
      className="w-full min-h-[800px] md:min-h-[750px] p-6 flex flex-col justify-between border rounded-lg overflow-y-auto"
      style={{ 
          fontFamily: `'${safeFontStyle}', sans-serif`,
          backgroundColor: backgroundColor,
          borderColor: safePrimaryColor,
          color: textColor,
        }}
    >
      <header className="flex justify-between items-start mb-6">
        <div className="p-1.5 rounded-md" style={{ backgroundColor: `${safePrimaryColor}20` }}>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" style={{ color: safePrimaryColor }}>
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
            </svg>
        </div>
        <p className="text-xs uppercase tracking-wider font-semibold text-right" style={{ color: safePrimaryColor }}>Innovate. Connect. Inspire.</p>
      </header>
      
      <main className="flex-grow space-y-3">
        <h1 
          className="text-2xl md:text-3xl font-bold leading-tight" 
          style={{ color: textColor }}
          title={eventName}
        >
          {eventName}
        </h1>
        <p className="text-sm md:text-base leading-relaxed" style={{color: mutedTextColor}} title={eventDescription}>
          {eventDescription}
        </p>
        <div className="mt-3 text-lg font-semibold" style={{color: safePrimaryColor}}>
            {displayDate}, {year} {displayTime}
        </div>
        <p className="text-sm" style={{color: mutedTextColor}} title={eventLocation}>
            {eventLocation}
        </p>

        <div className="mt-4 space-y-1.5 text-xs" style={{color: mutedTextColor}}>
            <div className="flex items-center"><Mic className="h-3.5 w-3.5 mr-2 flex-shrink-0" style={{ color: safePrimaryColor }}/>Keynotes & Expert Panels</div>
            <div className="flex items-center"><Users className="h-3.5 w-3.5 mr-2 flex-shrink-0" style={{ color: safePrimaryColor }}/>Interactive Workshops & Networking</div>
            <div className="flex items-center"><Wifi className="h-3.5 w-3.5 mr-2 flex-shrink-0" style={{ color: safePrimaryColor }}/>Hybrid Event: Join In-Person or Virtually</div>
        </div>

        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="mt-3 text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-opacity hover:opacity-80"
             style={{ backgroundColor: `${safePrimaryColor}2A`, color: safePrimaryColor }}>
            <LinkIcon className="h-3.5 w-3.5" /> Full Agenda & Details
          </a>
        )}
      </main>

      {rsvpFormVisible && !rsvpSubmitted && (
        <form onSubmit={handleRsvpSubmit} className="w-full mt-6 space-y-3 p-4 rounded-md" style={{backgroundColor: cardColor}}>
            <h3 className="text-lg font-semibold text-center mb-3" style={{color: safePrimaryColor}}>Secure Your Spot</h3>
             <div>
                <Label htmlFor="rsvpNameConf" className="text-xs font-medium" style={{color: mutedTextColor}}>Full Name</Label>
                <Input 
                id="rsvpNameConf" type="text" value={rsvpName} 
                onChange={(e) => setRsvpName && setRsvpName(e.target.value)} required 
                className="mt-1 !text-sm !bg-slate-700 !border-slate-600 !text-white placeholder:!text-slate-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': safePrimaryColor} as React.CSSProperties}
                />
            </div>
            <div>
                <Label htmlFor="rsvpEmailConf" className="text-xs font-medium" style={{color: mutedTextColor}}>Business Email</Label>
                <Input 
                id="rsvpEmailConf" type="email" value={rsvpEmail} 
                onChange={(e) => setRsvpEmail && setRsvpEmail(e.target.value)} required 
                className="mt-1 !text-sm !bg-slate-700 !border-slate-600 !text-white placeholder:!text-slate-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': safePrimaryColor} as React.CSSProperties}
                />
            </div>
            {customRsvpQuestion && (
            <div>
                <Label htmlFor="rsvpCustomConf" className="text-xs font-medium" style={{color: mutedTextColor}}>{customRsvpQuestion}</Label>
                <Textarea 
                id="rsvpCustomConf" value={rsvpCustomAnswer} 
                onChange={(e) => setRsvpCustomAnswer && setRsvpCustomAnswer(e.target.value)} rows={2}
                className="mt-1 !text-sm !bg-slate-700 !border-slate-600 !text-white placeholder:!text-slate-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': safePrimaryColor} as React.CSSProperties}
                placeholder="Your answer (optional)"
                />
            </div>
            )}
            <Button 
            type="submit" className="w-full !text-sm !font-semibold" disabled={isSubmittingRsvp} 
            style={{backgroundColor: safePrimaryColor, color: backgroundColor}}
            onClick={handleRsvpSubmit}
            >
            {isSubmittingRsvp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register Now
            </Button>
        </form>
      )}
      {rsvpFormVisible && rsvpSubmitted && (
         <div className="w-full mt-6 p-6 rounded-md text-center" style={{backgroundColor: cardColor}}>
            <CalendarCheck2 className="h-8 w-8 mx-auto mb-2" style={{color: safePrimaryColor}} />
            <h3 className="text-lg font-semibold" style={{color: textColor}}>Registration Complete!</h3>
            <p className="text-sm" style={{color: mutedTextColor}}>We've sent a confirmation to your email.</p>
        </div>
      )}
      {!isPublicInvitePage && enableRsvp && (
        <div className="mt-4 text-center text-xs p-2 rounded-md" style={{ backgroundColor: `${safePrimaryColor}1A`, color: safePrimaryColor }}>
          <Users className="inline h-3.5 w-3.5 mr-1.5" />
          Conference registration form will be active. {customRsvpQuestion ? `(Q: "${customRsvpQuestion.substring(0,20)}...")` : ""}
        </div>
      )}
      

      <footer className="mt-auto border-t pt-4" style={{borderColor: `${safePrimaryColor}40`}}>
        <div className="flex flex-wrap justify-center items-center gap-x-3.5 gap-y-2 mb-2">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={safePrimaryColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={safePrimaryColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={safePrimaryColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={safePrimaryColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={safePrimaryColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={safePrimaryColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={safePrimaryColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={safePrimaryColor} />
        </div>
        <p className="text-center text-[10px] font-medium uppercase tracking-wider" style={{ color: mutedTextColor }}>
          #TechForward{year}
        </p>
      </footer>
    </div>
  );
};

export default ConferenceInvitePreview;
    
