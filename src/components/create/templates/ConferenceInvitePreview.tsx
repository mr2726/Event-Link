
'use client';

import type { Template } from '@/app/create/page';
import { Mic, BarChart2, Wifi, Users } from 'lucide-react';

interface ConferenceInvitePreviewProps {
  template: Template;
}

const ConferenceInvitePreview: React.FC<ConferenceInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-gray-900 p-4 flex flex-col justify-between border border-gray-700 rounded-t-lg overflow-hidden text-gray-100">
      <header className="flex justify-between items-center">
        <div className="bg-neon-green/10 p-1 rounded-sm">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
            </svg>
        </div>
        <p className="text-xs text-accent uppercase tracking-wider font-semibold">Innovate. Connect. Inspire.</p>
      </header>
      
      <main className="my-3 text-center">
        <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mt-1 leading-tight">
          TechForward 2026
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          The Future of Digital Transformation
        </p>
      </main>

      <footer className="mt-auto space-y-2">
        <div className="flex items-center text-xs text-gray-400">
          <Mic className="h-3.5 w-3.5 mr-1.5 text-accent flex-shrink-0"/>
          <span>Keynotes from Industry Leaders</span>
        </div>
        <div className="flex items-center text-xs text-gray-400">
          <Users className="h-3.5 w-3.5 mr-1.5 text-accent flex-shrink-0"/>
          <span>Interactive Workshops & Panels</span>
        </div>
         <div className="flex items-center text-xs text-gray-400">
          <Wifi className="h-3.5 w-3.5 mr-1.5 text-accent flex-shrink-0"/>
          <span>Global Networking Opportunities</span>
        </div>
        <div className="border-t border-gray-700 pt-1.5 mt-1.5">
          <p className="text-sm font-semibold text-accent">November 10-12, 2026</p>
          <p className="text-xs text-gray-500">Online & Onsite | Silicon Valley</p>
        </div>
      </footer>
    </div>
  );
};

export default ConferenceInvitePreview;
