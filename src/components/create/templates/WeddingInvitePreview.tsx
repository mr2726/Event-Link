
'use client';

import type { Template } from '@/app/create/page';

interface WeddingInvitePreviewProps {
  template: Template;
}

const WeddingInvitePreview: React.FC<WeddingInvitePreviewProps> = ({ template }) => {
  return (
    <div className="w-full aspect-[3/4] bg-rose-50 p-4 flex flex-col items-center justify-center border border-rose-200 rounded-t-lg overflow-hidden relative">
      {/* Decorative corner elements */}
      <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-rose-300 opacity-50"></div>
      <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-rose-300 opacity-50"></div>
      
      <div className="text-center">
        <p className="text-xs text-rose-600" style={{ fontFamily: "'Parisienne', cursive" }}>
          Together with their families
        </p>
        <h2 className="text-2xl text-rose-800 my-1" style={{ fontFamily: "'Playfair Display', serif" }}>
          Sophia & Liam
        </h2>
        <p className="text-xs text-rose-600 mt-1" style={{ fontFamily: "'Parisienne', cursive" }}>
          request the honor of your presence
        </p>
        <p className="text-xs text-rose-700 mt-3 tracking-wider">
          AT THEIR WEDDING CELEBRATION
        </p>
        
        <div className="mt-4 border-t border-rose-300 pt-2 w-3/4 mx-auto">
          <p className="text-xs text-rose-700 font-semibold">SATURDAY, THE TWENTY-FOURTH OF JUNE</p>
          <p className="text-xs text-rose-600">TWO THOUSAND TWENTY-SIX</p>
          <p className="text-xs text-rose-600 mt-1">THE GRAND HALL, NEW YORK</p>
        </div>
      </div>
    </div>
  );
};

export default WeddingInvitePreview;
