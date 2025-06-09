
'use client';

import type { Template } from '@/app/create/page';
import { Users, Coffee, MessageCircle } from 'lucide-react';

interface MeetupInvitePreviewProps {
  template: Template;
}

const MeetupInvitePreview: React.FC<MeetupInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-amber-100 p-4 flex flex-col items-center justify-center border-2 border-dashed border-amber-400 rounded-t-lg overflow-hidden">
      <div className="text-center p-3 bg-white/80 rounded-lg shadow-lg w-full max-w-[90%]">
        <Users className="h-8 w-8 text-amber-600 mx-auto mb-1" />
        <h2 className="text-lg font-['Space_Grotesk'] font-bold text-amber-700">
          Local Coders Meetup!
        </h2>
        <p className="text-xs text-amber-600 my-1.5 px-1">
          Join us for an evening of tech talks, networking, and free pizza!
        </p>
        
        <div className="flex items-center justify-center text-xs text-amber-500 mt-2 space-x-2">
          <div className="flex items-center">
            <Coffee className="h-3 w-3 mr-0.5"/>
            <span>Free Coffee</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-0.5"/>
            <span>Great Talks</span>
          </div>
        </div>
         <p className="text-[10px] text-amber-700 mt-2 font-semibold bg-amber-200 px-2 py-0.5 rounded-full inline-block">
          Every First Thursday @ 7 PM
        </p>
      </div>
      
      <div className="mt-3 w-full text-center">
        <p className="text-xs text-amber-700">The Tech Hub, Downtown</p>
      </div>
    </div>
  );
};

export default MeetupInvitePreview;
