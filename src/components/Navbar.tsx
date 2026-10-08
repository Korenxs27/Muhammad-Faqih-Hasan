'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react'; // Menggunakan ikon dari Lucide

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = ['Home', 'About', 'Projects'];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      {/* Container Kapsul Utama */}
      <nav className="flex items-center justify-between gap-2 p-2 rounded-full bg-neutral-900/60 backdrop-blur-md border border-white/10 shadow-2xl">
        
        {/* Menu Navigasi (Home, Projects, About) */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeTab === item;
            return (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setActiveTab(item)}
                className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
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

        {/* Tombol Tema (Dark/Light Mode Toggle di Kanan) */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2.5 rounded-full bg-neutral-800/50 border border-white/10 text-white hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center"
          aria-label="Toggle Theme"
        >
          {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
        </button>

      </nav>
    </header>
  );
}