
'use client';

import type { Template } from '@/app/create/page';
import { Mic, BarChart2 } from 'lucide-react';

interface ConferenceInvitePreviewProps {
  template: Template;
}

const ConferenceInvitePreview: React.FC<ConferenceInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-gray-800 p-4 flex flex-col justify-between border border-gray-700 rounded-t-lg overflow-hidden text-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-teal-400 uppercase tracking-wider font-semibold">Innovate. Connect. Inspire.</p>
          <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mt-1">TechForward 2026</h2>
        </div>
        <Mic className="h-7 w-7 text-teal-300" />
      </div>
      
      <div className="my-4">
        <p className="text-sm text-gray-300">Join industry leaders and visionaries at the premier technology conference of the year.</p>
      </div>

      <div className="mt-auto">
        <div className="flex items-center text-xs text-gray-400 mb-2">
          <BarChart2 className="h-4 w-4 mr-2 text-teal-400"/>
          <span>Keynotes, Workshops, Networking</span>
        </div>
        <div className="border-t border-gray-600 pt-2">
          <p className="text-sm font-semibold text-teal-300">November 10-12, 2026</p>
          <p className="text-xs text-gray-400">Virtual & In-Person</p>
        </div>
      </div>
    </div>
  );
};

export default ConferenceInvitePreview;
