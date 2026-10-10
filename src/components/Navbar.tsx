'use client';

import { useState } from 'react';
import Link from 'next/link';

function SpotifyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.684.469-1.04.252-2.856-1.745-6.453-2.14-10.686-1.173-.404.093-.81-.162-.903-.566-.093-.404.162-.81.566-.903 4.636-1.06 8.599-.611 11.811 1.352.357.218.469.684.252 1.04zm1.472-3.272c-.273.444-.856.587-1.3.314-3.268-2.008-8.25-2.593-12.115-1.42-.497.151-1.025-.131-1.176-.628-.152-.497.131-1.025.628-1.176 4.414-1.34 9.897-.689 13.649 1.61.444.273.587.856.314 1.3zm.128-3.411c-3.918-2.327-10.378-2.541-14.133-1.401-.607.184-1.25-.162-1.434-.769-.184-.607.162-1.25.769-1.434 4.312-1.309 11.441-1.055 15.94 1.616.546.324.726 1.031.402 1.577-.324.545-1.031.725-1.544.411z" />
    </svg>
  );
}

export const MY_PLAYLIST_ID = "3v6lpzQWgsT5ydXJnriB69";

interface NavbarProps {
  onOpenMusicModal: () => void;
}

export default function Navbar({ onOpenMusicModal }: NavbarProps) {
  const [activeTab, setActiveTab] = useState('Home');
  const navItems = ['Home', 'About', 'Design', 'Projects'];

  return (
    <header className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4">
      <nav className="flex items-center justify-between gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-2xl max-w-full overflow-hidden">
        
        {/* Menu Navigasi dengan scroll horizontal otomatis jika layar sangat kecil */}
        <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto no-scrollbar scroll-smooth px-1">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveTab(item)}
                className={`relative px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium transition-all duration-300 rounded-full whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        {/* Tombol Spotify */}
        <button
          onClick={onOpenMusicModal}
          className="p-2 sm:p-2.5 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] hover:bg-[#1DB954] hover:text-black transition-all duration-300 flex items-center justify-center shadow-lg shrink-0"
          title="Dengarkan Spotify Playlist Faqih"
        >
          <SpotifyIcon size={16} />
        </button>
      </nav>
    </header>
  );
}