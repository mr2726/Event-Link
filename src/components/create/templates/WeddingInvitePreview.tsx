
'use client';

import type { Template } from '@/app/create/page';

interface WeddingInvitePreviewProps {
  template: Template; // Pass template data if needed for dynamic text, though previews are mostly static style
}

const WeddingInvitePreview: React.FC<WeddingInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-rose-50 p-4 flex flex-col items-center justify-center border border-rose-200 rounded-t-lg overflow-hidden">
      <div className="text-center">
        <p className="font-serif text-sm text-rose-700">Together with their families</p>
        <h2 className="text-2xl font-['Playfair_Display'] text-rose-800 my-2">Jane & John</h2>
        <p className="font-serif text-sm text-rose-700">request the pleasure of your company</p>
        <p className="font-serif text-xs text-rose-600 mt-3">SATURDAY, JUNE 24, 2026</p>
        <div className="mt-4 border-t border-rose-300 pt-2 w-3/4 mx-auto">
          <p className="font-serif text-xs text-rose-700">The Grand Hall</p>
        </div>
      </div>
      {/* Decorative elements */}
      <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-rose-300 opacity-50"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-rose-300 opacity-50"></div>
    </div>
  );
};

export default WeddingInvitePreview;
