
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Briefcase, CalendarDays, MapPin, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon, Users, Loader2 } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CorporateInvitePreviewProps {
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

const CorporateInvitePreview: React.FC<CorporateInvitePreviewProps> = ({ 
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
    eventName = "Corporate Summit 2026", 
    eventDate = "2026-03-10", 
    eventTime = "09:00", 
    eventLocation = "Metro Convention Center, Business District",
    eventDescription = "Annual Business Leaders Conference focusing on innovative strategies, networking opportunities, and future market trends. Join industry experts and peers.",
    primaryColor = '#0EA5E9', // A professional blue
    fontStyle = 'Montserrat', // A clean sans-serif
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = '',
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM do, yyyy") : "Select Date";
  const displayTime = eventTime || "";

  const safeFontStyle = fontStyle || 'Montserrat';
  const textColor = '#FFFFFF'; // White text generally works well on dark/colored backgrounds
  const mutedTextColor = '#E2E8F0'; // Lighter gray for less emphasis
  const iconColor = primaryColor || '#38BDF8'; // Brighter shade of blue for icons
  const backgroundColor = '#1E293B'; // Slate 800
  const cardColor = '#334155'; // Slate 700

  const rsvpFormVisible = isPublicInvitePage && enableRsvp;

  return (
    <div 
      className="w-full min-h-[800px] md:min-h-[750px] p-6 flex flex-col justify-between border rounded-lg overflow-y-auto"
      style={{ 
        fontFamily: `'${safeFontStyle}', sans-serif`,
        backgroundColor: backgroundColor,
        borderColor: primaryColor || '#3B82F6',
        color: textColor,
      }}
    >
      <header className="flex justify-between items-center mb-6">
        <div style={{color: primaryColor}}>
            <Briefcase className="h-8 w-8" />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-right" style={{ color: textColor }} title={eventName}>
          {eventName}
        </h1>
      </header>
      
      <main className="flex-grow space-y-4">
        <p className="text-sm uppercase tracking-wider font-medium" style={{ color: primaryColor }}>
          You Are Invited
        </p>
        <p className="text-lg md:text-xl leading-relaxed" style={{ color: mutedTextColor }} title={eventDescription}>
          {eventDescription}
        </p>

        <div className="mt-4 space-y-2 text-sm" style={{color: mutedTextColor}}>
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-2.5 flex-shrink-0" style={{ color: iconColor }} />
            <span>{displayDate} {displayTime && `at ${displayTime}`}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2.5 flex-shrink-0" style={{ color: iconColor }} />
            <span className="truncate max-w-[80%]" title={eventLocation}>{eventLocation}</span>
          </div>
          {optionalLink && (
            <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
               className="flex items-center gap-2 py-1 rounded transition-opacity hover:opacity-80"
               style={{ color: iconColor }}>
              <LinkIcon className="h-4 w-4" /> Main Event Portal
            </a>
          )}
        </div>
      </main>
      
      {rsvpFormVisible && !rsvpSubmitted && (
        <form onSubmit={handleRsvpSubmit} className="w-full mt-6 space-y-4 p-4 rounded-md" style={{backgroundColor: cardColor}}>
            <h3 className="text-lg font-semibold text-center mb-3" style={{color: primaryColor}}>Register Your Attendance</h3>
            <div>
                <Label htmlFor="rsvpNameCorp" className="text-xs font-medium" style={{color: mutedTextColor}}>Full Name</Label>
                <Input 
                id="rsvpNameCorp" type="text" value={rsvpName} 
                onChange={(e) => setRsvpName && setRsvpName(e.target.value)} required 
                className="mt-1 !text-sm !bg-slate-600 !border-slate-500 !text-white placeholder:!text-slate-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': primaryColor} as React.CSSProperties}
                />
            </div>
            <div>
                <Label htmlFor="rsvpEmailCorp" className="text-xs font-medium" style={{color: mutedTextColor}}>Email Address</Label>
                <Input 
                id="rsvpEmailCorp" type="email" value={rsvpEmail} 
                onChange={(e) => setRsvpEmail && setRsvpEmail(e.target.value)} required 
                className="mt-1 !text-sm !bg-slate-600 !border-slate-500 !text-white placeholder:!text-slate-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': primaryColor} as React.CSSProperties}
                />
            </div>
            {customRsvpQuestion && (
            <div>
                <Label htmlFor="rsvpCustomCorp" className="text-xs font-medium" style={{color: mutedTextColor}}>{customRsvpQuestion}</Label>
                <Textarea 
                id="rsvpCustomCorp" value={rsvpCustomAnswer} 
                onChange={(e) => setRsvpCustomAnswer && setRsvpCustomAnswer(e.target.value)} rows={2}
                className="mt-1 !text-sm !bg-slate-600 !border-slate-500 !text-white placeholder:!text-slate-400 focus:!border-primary focus:!ring-primary"
                style={{'--ring': primaryColor} as React.CSSProperties}
                placeholder="Your answer (optional)"
                />
            </div>
            )}
            <Button 
            type="submit" className="w-full !text-sm !text-white" disabled={isSubmittingRsvp} 
            style={{backgroundColor: primaryColor}}
            onClick={handleRsvpSubmit}
            >
            {isSubmittingRsvp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Registration
            </Button>
        </form>
      )}
      {rsvpFormVisible && rsvpSubmitted && (
         <div className="w-full mt-6 p-6 rounded-md text-center" style={{backgroundColor: cardColor}}>
            <Users className="h-8 w-8 mx-auto mb-2" style={{color: primaryColor}} />
            <h3 className="text-lg font-semibold" style={{color: textColor}}>Registration Confirmed!</h3>
            <p className="text-sm" style={{color: mutedTextColor}}>Thank you. We look forward to seeing you.</p>
        </div>
      )}
      {!isPublicInvitePage && enableRsvp && (
        <div className="mt-4 text-center text-xs p-2 rounded-md" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
          <Users className="inline h-3.5 w-3.5 mr-1.5" />
          Registration form will be active. {customRsvpQuestion ? `(Q: "${customRsvpQuestion.substring(0,20)}...")` : ""}
        </div>
      )}

      <footer className="mt-8 border-t pt-4" style={{borderColor: `${primaryColor}50`}}>
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-3">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={iconColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={iconColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={iconColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={iconColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={iconColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={iconColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={iconColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={iconColor} />
        </div>
        <p className="text-center text-xs font-medium uppercase tracking-wider" style={{ color: primaryColor }}>
          Innovate. Connect. Grow.
        </p>
      </footer>
    </div>
  );
};

export default CorporateInvitePreview;
    
