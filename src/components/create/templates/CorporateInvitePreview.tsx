
'use client';

import type { Template } from '@/app/create/page';
import { Briefcase } from 'lucide-react';

interface CorporateInvitePreviewProps {
  template: Template;
}

const CorporateInvitePreview: React.FC<CorporateInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-slate-700 p-4 flex flex-col justify-between border border-slate-600 rounded-t-lg overflow-hidden text-white">
      <div>
        <div className="flex items-center mb-4">
          <Briefcase className="h-8 w-8 text-sky-400 mr-2" />
          <h2 className="text-xl font-['Space_Grotesk'] font-semibold">Corporate Summit 2026</h2>
        </div>
        <p className="text-xs text-slate-300 mb-1">You are invited to the</p>
        <p className="text-lg font-medium text-sky-300">Annual Business Leaders Conference</p>
      </div>
      <div className="mt-auto">
        <div className="border-t border-slate-500 pt-2 mt-3">
          <p className="text-xs text-slate-400">Date: October 15-17, 2026</p>
          <p className="text-xs text-slate-400">Location: Metro Convention Center</p>
        </div>
        <div className="mt-3 bg-sky-500 text-center text-white py-1 rounded-sm text-sm font-medium">
          Register Now
        </div>
      </div>
    </div>
  );
};

export default CorporateInvitePreview;
