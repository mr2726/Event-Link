
'use client';

import type { Template } from '@/app/create/page';
import { Users, Coffee } from 'lucide-react';

interface MeetupInvitePreviewProps {
  template: Template;
}

const MeetupInvitePreview: React.FC<MeetupInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-amber-50 p-4 flex flex-col items-center justify-center border border-amber-300 rounded-t-lg overflow-hidden">
      <div className="text-center p-3 bg-white/70 rounded-lg shadow-md">
        <Users className="h-10 w-10 text-amber-600 mx-auto mb-2" />
        <h2 className="text-xl font-['Montserrat'] font-bold text-amber-700">Community Meetup!</h2>
        <p className="text-sm text-amber-600 my-2">
          Join us for a casual get-together.
        </p>
        <div className="flex items-center justify-center text-xs text-amber-500 mt-3">
          <Coffee className="h-4 w-4 mr-1"/>
          <span>Networking & Fun</span>
        </div>
        <p className="text-xs text-amber-500 mt-1">Every First Friday</p>
      </div>
      <div className="mt-4 w-full h-2 bg-amber-300 rounded-full"></div>
      <div className="mt-1 w-3/4 h-2 bg-amber-200 rounded-full"></div>
    </div>
  );
};

export default MeetupInvitePreview;
