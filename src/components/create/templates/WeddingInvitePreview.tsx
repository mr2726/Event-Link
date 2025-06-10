
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { format, parseISO } from 'date-fns';
import { Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon, Users, Heart, Loader2 } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface WeddingInvitePreviewProps {
  template: Template;
  formData?: EventDetailsFormData;
  // RSVP Props for public invite page
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
    <a href={href} target="_blank" rel="noopener noreferrer" title={title} 
       className="hover:opacity-75 transition-opacity" 
       style={{color: color || 'inherit'}}>
      <Icon className="h-4 w-4" />
    </a>
  );
};

const WeddingInvitePreview: React.FC<WeddingInvitePreviewProps> = ({ 
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
    eventName = "Sophia & Liam", 
    eventDate = "2025-07-15",
    eventTime = "14:00", 
    eventLocation = "The Grand Hall, New York",
    eventDescription = "Join us as we celebrate our special day. Your presence would mean the world to us as we embark on this new journey together.",
    primaryColor = '#B45309', 
    fontStyle = 'Playfair Display',
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = '',
  } = formData || {};

  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM do, yyyy") : "Select a Date";
  const displayTime = eventTime || "Set Time";
  
  const safeFontStyle = fontStyle || 'Playfair Display';
  // Use a slightly desaturated version of primaryColor for text if primaryColor is very bright, or a contrasting color.
  // This is a simplified approach. For full contrast, a color math library would be better.
  const textColor = primaryColor; 
  const accentColor = primaryColor === '#B45309' ? '#A16207' : primaryColor; // A fallback accent if needed

  const rsvpFormVisible = isPublicInvitePage && enableRsvp;

  return (
    <div 
      className="w-full min-h-[800px] md:min-h-[750px] bg-rose-50 p-6 flex flex-col items-center justify-between border-2 rounded-lg overflow-y-auto"
      style={{ fontFamily: `'${safeFontStyle}', serif`, borderColor: primaryColor || '#FECACA' }}
    >
      <div className="w-full text-center space-y-3">
        <div className="relative py-4">
            <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 opacity-60" style={{borderColor: accentColor}}></div>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 opacity-60" style={{borderColor: accentColor}}></div>
            <Heart className="h-8 w-8 mx-auto mb-3" style={{color: accentColor}}/>
            <p className="text-sm" style={{ fontFamily: "'Parisienne', cursive", color: textColor }}>
            Together with their families
            </p>
            <h2 
            className="text-3xl md:text-4xl my-2 font-semibold leading-tight" 
            style={{ color: textColor }}
            title={eventName}
            >
            {eventName}
            </h2>
            <p className="text-sm mt-1" style={{ fontFamily: "'Parisienne', cursive", color: textColor }}>
            request the honor of your presence
            </p>
        </div>
        
        <p className="text-xs mt-4 tracking-wider uppercase font-medium" style={{color: textColor}}>
          AT THEIR WEDDING CELEBRATION
        </p>
        
        <div className="mt-4 border-t-2 pt-4 w-4/5 mx-auto" style={{borderColor: `${primaryColor}50`}}>
          <p className="text-base font-semibold" style={{color: textColor}}>{displayDate.toUpperCase()}</p>
          <p className="text-sm" style={{color: textColor}}>AT {displayTime}</p>
          <p className="text-sm mt-1.5" style={{color: textColor}} title={eventLocation}>
            {eventLocation}
          </p>
        </div>

        {eventDescription && (
          <p className="text-xs mt-3 px-4 text-gray-700 max-w-md mx-auto leading-relaxed" style={{color: textColor ? `${textColor}B3` : '#713f12'}}>
            {eventDescription}
          </p>
        )}

        {optionalLink && (
          <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
             className="text-xs mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition-opacity hover:opacity-80"
             style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
            <LinkIcon className="h-3 w-3" /> View Our Wedding Website
          </a>
        )}
      </div>
      
      {rsvpFormVisible && !rsvpSubmitted && (
        <form onSubmit={handleRsvpSubmit} className="w-full max-w-sm mt-6 space-y-4 p-4 bg-white/50 rounded-md shadow-inner">
            <h3 className="text-lg font-semibold text-center mb-3" style={{color: textColor, fontFamily: "'Parisienne', cursive"}}>Kindly RSVP</h3>
          <div>
            <Label htmlFor="rsvpNamePublic" className="text-xs font-medium" style={{color: textColor ? `${textColor}CC` : '#713f12'}}>Full Name</Label>
            <Input 
              id="rsvpNamePublic" 
              type="text" 
              value={rsvpName} 
              onChange={(e) => setRsvpName && setRsvpName(e.target.value)} 
              required 
              className="mt-1 !text-sm bg-white/70 border-gray-300 focus:border-primary focus:ring-primary"
              style={{borderColor: `${primaryColor}80`, '--ring': primaryColor} as React.CSSProperties}
            />
          </div>
          <div>
            <Label htmlFor="rsvpEmailPublic" className="text-xs font-medium" style={{color: textColor ? `${textColor}CC` : '#713f12'}}>Email Address</Label>
            <Input 
              id="rsvpEmailPublic" 
              type="email" 
              value={rsvpEmail} 
              onChange={(e) => setRsvpEmail && setRsvpEmail(e.target.value)} 
              required 
              className="mt-1 !text-sm bg-white/70 border-gray-300 focus:border-primary focus:ring-primary"
              style={{borderColor: `${primaryColor}80`, '--ring': primaryColor} as React.CSSProperties}
            />
          </div>
          {customRsvpQuestion && (
            <div>
              <Label htmlFor="rsvpCustomAnswerPublic" className="text-xs font-medium" style={{color: textColor ? `${textColor}CC` : '#713f12'}}>{customRsvpQuestion}</Label>
              <Textarea 
                id="rsvpCustomAnswerPublic" 
                value={rsvpCustomAnswer} 
                onChange={(e) => setRsvpCustomAnswer && setRsvpCustomAnswer(e.target.value)} 
                rows={2}
                className="mt-1 !text-sm bg-white/70 border-gray-300 focus:border-primary focus:ring-primary"
                style={{borderColor: `${primaryColor}80`, '--ring': primaryColor} as React.CSSProperties}
                placeholder="Your answer (optional)"
              />
            </div>
          )}
          <Button 
            type="submit" 
            className="w-full !text-sm" 
            disabled={isSubmittingRsvp}
            style={{backgroundColor: accentColor, color: 'white'}}
            onClick={handleRsvpSubmit}
          >
            {isSubmittingRsvp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send RSVP
          </Button>
        </form>
      )}
      {rsvpFormVisible && rsvpSubmitted && (
         <div className="w-full max-w-sm mt-6 p-6 bg-white/70 rounded-md shadow text-center">
            <Heart className="h-8 w-8 mx-auto mb-2" style={{color: accentColor}} />
            <h3 className="text-lg font-semibold" style={{color: textColor}}>Thank You!</h3>
            <p className="text-sm" style={{color: textColor ? `${textColor}B3` : '#713f12'}}>Your RSVP has been received.</p>
        </div>
      )}
      {!isPublicInvitePage && enableRsvp && (
         <div className="mt-4 text-center text-xs p-2 rounded-md" style={{ backgroundColor: `${accentColor}1A`, color: accentColor }}>
          <Users className="inline h-3.5 w-3.5 mr-1.5" />
          RSVP will be active on the public invite page. {customRsvpQuestion ? `(Q: "${customRsvpQuestion.substring(0,25)}${customRsvpQuestion.length > 25 ? '...' : ''}")` : ""}
        </div>
      )}
      
      <div className="mt-auto pt-4 flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
        <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={accentColor} />
        <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={accentColor} />
        <SocialLink href={telegramLink} icon={Send} title="Telegram" color={accentColor} />
        <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={accentColor} />
        <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={accentColor} />
        <SocialLink href={zoomLink} icon={Video} title="Zoom" color={accentColor} />
        <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={accentColor} />
        <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={accentColor} />
      </div>
    </div>
  );
};

export default WeddingInvitePreview;
    
