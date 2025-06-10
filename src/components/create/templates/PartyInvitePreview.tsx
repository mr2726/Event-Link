
'use client';

import type { Template } from '@/app/create/page';
import type { EventDetailsFormData } from '../CustomizeDetailsStep';
import { Gift, Zap, Music, Pizza, Twitter, Linkedin, Send, Video, Twitch, Youtube, Link as LinkIcon, Users, Loader2, CheckCircle } from 'lucide-react';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { format, parseISO } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface PartyInvitePreviewProps {
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

const PartyInvitePreview: React.FC<PartyInvitePreviewProps> = ({ 
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
    eventName = "Leo's Epic Birthday Bash!", 
    eventDate = "2025-09-05", 
    eventTime = "20:00", 
    eventLocation = "The Usual Spot - You know where!",
    eventDescription = "Get ready for an unforgettable night of music, fun, and celebration! Don't miss out on the party of the year.", 
    primaryColor = '#DB2777', // Pink
    fontStyle = 'Montserrat', // Fun, bold sans-serif
    optionalLink,
    twitterLink, linkedinLink, telegramLink, whatsappLink, googleMeetLink, zoomLink, twitchLink, youtubeLink,
    enableRsvp = false, 
    customRsvpQuestion = '',
  } = formData || {};
  
  const displayDate = eventDate && !isNaN(Date.parse(eventDate)) ? format(parseISO(eventDate), "MMMM d") : "Date";
  const displayTime = eventTime || "Time";

  const safeFontStyle = fontStyle || 'Montserrat';
  const safePrimaryColor = primaryColor || '#DB2777';
  const accentColor = '#FDE047'; // Yellow accent for contrast and fun

  const rsvpFormVisible = isPublicInvitePage && enableRsvp;

  return (
    <div 
      className="w-full min-h-[800px] md:min-h-[750px] p-5 flex flex-col items-center justify-between border-4 rounded-xl overflow-y-auto relative shadow-2xl text-white"
      style={{ 
        background: `linear-gradient(135deg, ${safePrimaryColor}, ${primaryColor === '#DB2777' ? '#7E22CE' : '#A855F7'})`, // Purple gradient
        borderColor: accentColor,
        fontFamily: `'${safeFontStyle}', sans-serif`,
      }}
    >
      <Zap className="absolute top-4 left-4 h-7 w-7 opacity-70 transform -rotate-[20deg]" style={{ color: accentColor }}/>
      <Gift className="absolute bottom-4 right-4 h-8 w-8 opacity-70 transform rotate-[15deg]" style={{ color: accentColor }}/>
      <Music className="absolute top-1/4 left-8 h-5 w-5 opacity-50 transform rotate-[10deg]" style={{ color: `${accentColor}B3` }} />
      <Pizza className="absolute bottom-1/3 right-8 h-5 w-5 opacity-50 transform -rotate-[10deg]" style={{ color: `${accentColor}B3` }} />

      <header className="text-center z-10 mt-4 mb-6">
        <p className="text-base uppercase tracking-widest font-semibold animate-pulse" style={{ fontFamily: "'Space Grotesk', sans-serif", color: accentColor }}>
          🎉 You're Invited! 🎉
        </p>
        <h1 
            className="text-4xl md:text-5xl font-black my-2 break-words" 
            style={{ color: 'white', textShadow: `2px 2px 3px rgba(0,0,0,0.4)` }}
            title={eventName}
        >
          {eventName}
        </h1>
        <p 
            className="mt-3 text-lg font-bold px-4 py-1.5 rounded-full inline-block shadow-lg"
            style={{ backgroundColor: accentColor, color: safePrimaryColor }}
        >
          {displayDate} - {displayTime}
        </p>
      </header>
      
      <main className="flex-grow text-center z-10 space-y-3 px-2">
        <p className="text-sm md:text-base leading-relaxed max-w-md mx-auto" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.3)'}} title={eventDescription}>
            {eventDescription}
        </p>
         <p className="text-base font-semibold" style={{ color: accentColor }}>
            At: <span className="font-bold" title={eventLocation}>{eventLocation}</span>
         </p>
        {optionalLink && (
            <a href={optionalLink} target="_blank" rel="noopener noreferrer" 
               className="text-sm mt-2 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg font-semibold transition-transform hover:scale-105"
               style={{ backgroundColor: accentColor, color: safePrimaryColor, boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              <LinkIcon className="h-4 w-4" /> Party Info / Map
            </a>
        )}
      </main>
       
      {rsvpFormVisible && !rsvpSubmitted && (
        <form onSubmit={handleRsvpSubmit} className="w-full max-w-sm mx-auto mt-6 space-y-3 p-4 rounded-lg z-10" style={{backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)'}}>
            <h3 className="text-xl font-bold text-center mb-3" style={{color: accentColor}}>Are You In?</h3>
            <div>
                <Label htmlFor="rsvpNameParty" className="text-xs font-medium" style={{color: `${accentColor}E6`}}>Your Awesome Name</Label>
                <Input 
                    id="rsvpNameParty" type="text" value={rsvpName} 
                    onChange={(e) => setRsvpName && setRsvpName(e.target.value)} required 
                    className="mt-1 !text-sm !bg-white/20 !border-white/30 !text-white placeholder:!text-gray-300 focus:!border-accent focus:!ring-accent"
                    style={{'--ring': accentColor} as React.CSSProperties}
                />
            </div>
            <div>
                <Label htmlFor="rsvpEmailParty" className="text-xs font-medium" style={{color: `${accentColor}E6`}}>Your Email for Updates</Label>
                <Input 
                    id="rsvpEmailParty" type="email" value={rsvpEmail} 
                    onChange={(e) => setRsvpEmail && setRsvpEmail(e.target.value)} required 
                    className="mt-1 !text-sm !bg-white/20 !border-white/30 !text-white placeholder:!text-gray-300 focus:!border-accent focus:!ring-accent"
                    style={{'--ring': accentColor} as React.CSSProperties}
                />
            </div>
            {customRsvpQuestion && (
            <div>
                <Label htmlFor="rsvpCustomParty" className="text-xs font-medium" style={{color: `${accentColor}E6`}}>{customRsvpQuestion}</Label>
                <Textarea 
                    id="rsvpCustomParty" value={rsvpCustomAnswer} 
                    onChange={(e) => setRsvpCustomAnswer && setRsvpCustomAnswer(e.target.value)} rows={2}
                    className="mt-1 !text-sm !bg-white/20 !border-white/30 !text-white placeholder:!text-gray-300 focus:!border-accent focus:!ring-accent"
                    style={{'--ring': accentColor} as React.CSSProperties}
                    placeholder="Your answer (optional)"
                />
            </div>
            )}
            <Button 
                type="submit" className="w-full !text-base !font-bold" 
                disabled={isSubmittingRsvp} 
                style={{backgroundColor: accentColor, color: safePrimaryColor, textShadow: '1px 1px rgba(0,0,0,0.1)'}}
                onClick={handleRsvpSubmit}
            >
                {isSubmittingRsvp && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                LET'S GO!
            </Button>
        </form>
      )}
      {rsvpFormVisible && rsvpSubmitted && (
         <div className="w-full max-w-sm mx-auto mt-6 p-6 rounded-lg z-10 text-center" style={{backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(5px)'}}>
            <CheckCircle className="h-10 w-10 mx-auto mb-2" style={{color: accentColor}} />
            <h3 className="text-xl font-bold" style={{color: 'white'}}>You're All Set!</h3>
            <p className="text-sm" style={{color: `${accentColor}E6`}}>Can't wait to party with you!</p>
        </div>
      )}
      {!isPublicInvitePage && enableRsvp && (
        <div className="mt-4 text-center text-xs p-2 rounded-md z-10" style={{ backgroundColor: 'rgba(0,0,0,0.2)', color: accentColor }}>
          <Users className="inline h-3.5 w-3.5 mr-1.5" />
          Party RSVP form will show here! {customRsvpQuestion ? `(Q: "${customRsvpQuestion.substring(0,15)}...")` : ""}
        </div>
      )}

      <footer className="mt-auto pt-5 z-10 w-full text-center space-y-2">
         <div className="flex flex-wrap justify-center items-center gap-x-3.5 gap-y-2">
            <SocialLink href={twitterLink} icon={Twitter} title="Twitter" color={accentColor} />
            <SocialLink href={linkedinLink} icon={Linkedin} title="LinkedIn" color={accentColor} />
            <SocialLink href={telegramLink} icon={Send} title="Telegram" color={accentColor} />
            <SocialLink href={whatsappLink} icon={WhatsappIcon} title="WhatsApp" color={accentColor} />
            <SocialLink href={googleMeetLink} icon={Video} title="Google Meet" color={accentColor} />
            <SocialLink href={zoomLink} icon={Video} title="Zoom" color={accentColor} />
            <SocialLink href={twitchLink} icon={Twitch} title="Twitch" color={accentColor} />
            <SocialLink href={youtubeLink} icon={Youtube} title="YouTube" color={accentColor} />
        </div>
        <p className="text-xs font-semibold tracking-wider" style={{color: `${accentColor}B3`}}>#PartyTime</p>
      </footer>
    </div>
  );
};

export default PartyInvitePreview;
    
