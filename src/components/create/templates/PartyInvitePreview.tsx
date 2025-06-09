
'use client';

import type { Template } from '@/app/create/page';
import { Gift, Zap, Music, Pizza } from 'lucide-react';

interface PartyInvitePreviewProps {
  template: Template;
}

const PartyInvitePreview: React.FC<PartyInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-gradient-to-br from-purple-600 to-pink-500 p-4 flex flex-col items-center justify-center border-2 border-yellow-300 rounded-t-lg overflow-hidden text-white relative shadow-xl">
      <Zap className="absolute top-3 left-3 h-6 w-6 text-yellow-300 opacity-80 transform rotate-[-15deg]" />
      <Gift className="absolute bottom-3 right-3 h-7 w-7 text-yellow-300 opacity-80 transform rotate-[10deg]" />
      <Music className="absolute top-1/3 left-5 h-5 w-5 text-pink-200 opacity-60 transform rotate-[5deg]" />
      <Pizza className="absolute bottom-1/3 right-5 h-5 w-5 text-orange-200 opacity-60 transform rotate-[-5deg]" />

      <div className="text-center z-10 bg-black/20 p-3 rounded-md">
        <p className="text-sm font-['Space_Grotesk'] uppercase tracking-wider text-yellow-300 animate-pulse">
          You're Invited!
        </p>
        <h2 className="text-3xl font-['Montserrat',_sans-serif] font-black my-1 text-white" style={{ textShadow: '2px 2px #D946EF' }}>
          ALEX'S
        </h2>
        <h3 className="text-2xl font-['Montserrat',_sans-serif] font-extrabold text-yellow-300" style={{ textShadow: '1px 1px #86198F' }}>
          BIRTHDAY BASH!
        </h3>
        <p className="mt-2.5 text-xs bg-yellow-400 text-purple-700 font-semibold px-2.5 py-1 rounded-full inline-block shadow-md">
          Sat, July 15th - 8 PM
        </p>
      </div>
      <p className="z-10 mt-3 text-center text-xs text-purple-100">
        Join us for fun, games, and cake!
      </p>
    </div>
  );
};

export default PartyInvitePreview;
