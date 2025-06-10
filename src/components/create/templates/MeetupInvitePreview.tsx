
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Users, Coffee, MessageCircle, MapPin, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon, Loader2 } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MeetupInvitePreviewProps {
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

const MeetupInvitePreview: React.FC<MeetupInvitePreviewProps> = ({ 
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
    eventName = "Local Coders Meetup!", 
    eventDate = "2025-08-20", 
    eventTime = "18:30", 
    eventLocation = "The Tech Hub, Downtown Coworking Space",
    eventDescription = "Join us for an evening of insightful tech talks, networking with fellow developers, and enjoying free pizza and refreshments!",
    primaryColor = '#F59E0B', // Amber
    fontStyle = 'Montserrat', // Friendly sans-serif
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = '',
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM d, yyyy") : "Select Date";
  const displayTime = eventTime || "Set Time";
  
  const safeFontStyle = fontStyle || 'Montserrat';
  const mainTextColor = primaryColor === '#F59E0B' ? '#78350F' : primaryColor; // Darker amber for text
  const iconColor = primaryColor || '#D97706';
  const backgroundColor = '#FFFBEB'; // Amber 50
  const cardBackgroundColor = '#FFFFFF';

  const rsvpFormVisible = isPublicInvitePage && enableRsvp;

  return (
    <div 
      className="w-full min-h-[800px] md:min-h-[750px] p-5 flex flex-col justify-between border-2 border-dashed rounded-lg overflow-y-auto"
      style={{ 
        borderColor: primaryColor || '#FBBF24', 
        fontFamily: `'${safeFontStyle}', sans-serif`,
        backgroundColor: backgroundColor,
        color: mainTextColor
      }}
    >
      <header className="text-center mb-6 p-4 bg-white rounded-xl shadow-lg w-full">
        <Users className="h-10 w-10 mx-auto mb-2" style={{ color: iconColor }} />
        <h1 
          className="text-2xl md:text-3xl font-bold"
          style={{ color: mainTextColor }}
          title={eventName}
        >
          {eventName}
        </h1>
        <p 
            className="text-sm mt-2.5 px-3 py-1 rounded-full inline-block font-semibold"
            style={{ backgroundColor: `${primaryColor}20`, color: mainTextColor }}
        >
          {displayDate} @ {displayTime}
        </p>
      </header>
      
      <main className="flex-grow space-y-3 text-center">
        <p className="text-sm md:text-base leading-relaxed px-2" title={eventDescription}>
          {eventDescription}
        </p>

        <div className="flex items-center justify-center text-xs mt-3 space-x-4" style={{ color: iconColor }}>
          <div className="flex items-center">
            <Coffee className="h-4 w-4 mr-1"/>
            <span>Refreshments Provided</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-4 w-4 mr-1"/>
            <span>Great Conversations</span>
          </div>
        </div>
        
        <p className="text-sm font-medium mt-3 truncate max-w-full" style={{ color: mainTextColor }} title={eventLocation}>
            <MapPin className="inline h-4 w-4 mr-1.5" style={{color: iconColor}} /> {eventLocation}
        </p>

        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="text-xs mt-3 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-opacity hover:opacity-80"
             style={{ backgroundColor: `${iconColor}2A`, color: iconColor }}>
            <LinkIcon className="h-3.5 w-3.5" /> Join Online / More Info
          </a>
        )}
      </main>
       
      {rsvpFormVisible && !rsvpSubmitted && (
        <form onSubmit={handleRsvpSubmit} className="w-full max-w-md mx-auto mt-6 space-y-3 p-4 rounded-lg shadow-md" style={{backgroundColor: cardBackgroundColor}}>
            <h3 className="text-lg font-semibold text-center mb-3" style={{color: mainTextColor}}>Let Us Know You're Coming!</h3>
            <div>
                <Label htmlFor="rsvpNameMeetup" className="text-xs font-medium" style={{color: `${mainTextColor}CC`}}>Your Name</Label>
                <Input 
                    id="rsvpNameMeetup" type="text" value={rsvpName} 
                    onChange={(e) => setRsvpName && setRsvpName(e.target.value)} required 
                    className="mt-1 !text-sm !bg-amber-50 !border-amber-300 placeholder:!text-amber-600 focus:!border-primary focus:!ring-primary"
                    style={{'--ring': primaryColor} as React.CSSProperties}
                />
            </div>
            <div>
                <Label htmlFor="rsvpEmailMeetup" className="text-xs font-medium" style={{color: `${mainTextColor}CC`}}>Your Email</Label>
                <Input 
                    id="rsvpEmailMeetup" type="email" value={rsvpEmail} 
                    onChange={(e) => setRsvpEmail && setRsvpEmail(e.target.value)} required 
                    className="mt-1 !text-sm !bg-amber-50 !border-amber-300 placeholder:!text-amber-600 focus:!border-primary focus:!ring-primary"
                    style={{'--ring': primaryColor} as React.CSSProperties}
                />
            </div>
            {customRsvpQuestion && (
            <div>
                <Label htmlFor="rsvpCustomMeetup" className="text-xs font-medium" style={{color: `${mainTextColor}CC`}}>{customRsvpQuestion}</Label>
                <Textarea 
                    id="rsvpCustomMeetup" value={rsvpCustomAnswer} 
                    onChange={(e) => setRsvpCustomAnswer && setRsvpCustomAnswer(e.target.value)} rows={2}
                    className="mt-1 !text-sm !bg-amber-50 !border-amber-300 placeholder:!text-amber-600 focus:!border-primary focus:!ring-primary"
                    style={{'--ring': primaryColor} as React.CSSProperties}
                    placeholder="Your answer (optional)"
                />
            </div>
            )}
            <Button 
                type="submit" className="w-full !text-sm !text-white" disabled={isSubmittingRsvp} 
                style={{backgroundColor: iconColor}}
                onClick={handleRsvpSubmit}
            >
                {isSubmittingRsvp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Count Me In!
            </Button>
        </form>
      )}
      {rsvpFormVisible && rsvpSubmitted && (
         <div className="w-full max-w-md mx-auto mt-6 p-6 rounded-lg shadow-md text-center" style={{backgroundColor: cardBackgroundColor}}>
            <Users className="h-8 w-8 mx-auto mb-2" style={{color: iconColor}} />
            <h3 className="text-lg font-semibold" style={{color: mainTextColor}}>Awesome!</h3>
            <p className="text-sm" style={{color: `${mainTextColor}B3`}}>We've got your RSVP. See you there!</p>
        </div>
      )}
      {!isPublicInvitePage && enableRsvp && (
        <div className="mt-4 text-center text-xs p-2 rounded-md" style={{ backgroundColor: `${iconColor}1A`, color: mainTextColor }}>
          <Users className="inline h-3.5 w-3.5 mr-1.5" />
          RSVP form will appear here. {customRsvpQuestion ? `(Q: "${customRsvpQuestion.substring(0,20)}...")` : ""}
        </div>
      )}

      <footer className="mt-auto pt-5 w-full text-center space-y-2">
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1.5">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={iconColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={iconColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={iconColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={iconColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={iconColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={iconColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={iconColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={iconColor} />
        </div>
        <p className="text-xs font-medium" style={{color: `${mainTextColor}A0`}}>Connect | Share | Learn</p>
      </footer>
    </div>
  );
};

export default MeetupInvitePreview;
    
