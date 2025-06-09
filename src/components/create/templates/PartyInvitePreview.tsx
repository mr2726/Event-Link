
'use client';

import type { Template } from '@/app/create/page';
import { Gift, Zap } from 'lucide-react';

interface PartyInvitePreviewProps {
  template: Template;
}

const PartyInvitePreview: React.FC<PartyInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-purple-600 p-4 flex flex-col items-center justify-center border border-purple-700 rounded-t-lg overflow-hidden text-white relative">
      {/* Background elements */}
      <Zap className="absolute top-5 left-5 h-8 w-8 text-yellow-300 opacity-70 transform rotate-[-15deg]" />
      <Gift className="absolute bottom-5 right-5 h-10 w-10 text-pink-300 opacity-70 transform rotate-[10deg]" />
       <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-yellow-200 rounded-full opacity-50"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-pink-200 rounded-full opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-sky-200 rounded-full opacity-50"></div>


      <div className="text-center z-10">
        <p className="text-sm font-['Space_Grotesk'] uppercase tracking-wider text-yellow-300">You're Invited!</p>
        <h2 className="text-4xl font-['Montserrat'] font-black my-2 text-white shadow-sm" style={{ WebkitTextStroke: '1px #fuchsia-400' }}>
          BIRTHDAY
        </h2>
        <h3 className="text-3xl font-['Montserrat'] font-extrabold text-white shadow-sm" style={{ WebkitTextStroke: '1px #fuchsia-400' }}>
          BASH!
        </h3>
        <p className="mt-3 text-xs bg-yellow-400 text-purple-700 font-semibold px-3 py-1 rounded-full inline-block">
          Mark Your Calendar!
        </p>
      </div>
    </div>
  );
};

export default PartyInvitePreview;
