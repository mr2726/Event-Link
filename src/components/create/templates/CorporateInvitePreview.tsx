
'use client';

import type { Template } from '@/app/create/page';
import { Briefcase, CalendarDays, MapPin } from 'lucide-react';

interface CorporateInvitePreviewProps {
  template: Template;
}

const CorporateInvitePreview: React.FC<CorporateInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-slate-800 p-4 flex flex-col justify-between border border-slate-700 rounded-t-lg overflow-hidden text-slate-100">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-['Space_Grotesk'] font-bold text-sky-400">
          Corporate Summit 2026
        </h2>
        <Briefcase className="h-6 w-6 text-sky-500" />
      </div>
      
      <div className="my-3">
        <p className="text-xs text-slate-300 uppercase tracking-wider mb-1">You are invited to the</p>
        <p className="text-md font-semibold text-slate-100">
          Annual Business Leaders Conference & Networking Event
        </p>
      </div>

      <div className="space-y-2 text-xs text-slate-300">
        <div className="flex items-center">
          <CalendarDays className="h-3 w-3 mr-1.5 text-sky-400 flex-shrink-0" />
          <span>October 15-17, 2026</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-3 w-3 mr-1.5 text-sky-400 flex-shrink-0" />
          <span>Metro Convention Center, Suite 4B</span>
        </div>
      </div>
      
      <div className="mt-auto border-t border-slate-600 pt-2">
        <p className="text-center text-xs text-sky-400 font-medium uppercase">
          Innovate. Connect. Grow.
        </p>
      </div>
    </div>
  );
};

export default CorporateInvitePreview;
