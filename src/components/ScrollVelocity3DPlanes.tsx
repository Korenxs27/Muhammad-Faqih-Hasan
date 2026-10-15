'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Heart, Smile, ZoomIn } from 'lucide-react';
import FoldText from '@/components/FoldText';
import Particles from './Particles';

export interface GalleryItem {
  id: string;
  index: string;
  title: string;
  subtitle: { ID: string; EN: string };
  description: { ID: string; EN: string };
  image: string;
}

interface ScrollTriggeredGalleryProps {
  onModalChange?: (isOpen: boolean) => void;
  lang?: 'ID' | 'EN';
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'Open Recruitment',
    index: '01',
    title: 'OPEN RECRUITMENT',
    subtitle: {
      ID: 'Open Recruitment BEM LP3I Jakarta Selatan',
      EN: 'Open Recruitment BEM LP3I South Jakarta'
    },
    description: {
      ID: 'Open recruitment website untuk BEM LP3I Jakarta Selatan dengan desain modern dan interaktif.',
      EN: 'Open recruitment website design for BEM LP3I South Jakarta featuring a modern and interactive layout.'
    },
    image: './images/OPEN.png',
  },
  {
    id: 'Donor Darah',
    index: '02',
    title: 'DONOR DARAH',
    subtitle: {
      ID: 'CAMPAIGN DONOR DARAH',
      EN: 'BLOOD DONATION CAMPAIGN'
    },
    description: {
      ID: 'Donor darah design campaign untuk meningkatkan kesadaran masyarakat akan pentingnya donor darah.',
      EN: 'Blood donation campaign design aimed at raising public awareness about the importance of donating blood.'
    },
    image: './images/donor darah.png',
  },
  {
    id: 'Qurban',
    index: '03',
    title: 'QURBAN',
    subtitle: {
      ID: 'CAMPAIGN QURBAN',
      EN: 'QURBAN CAMPAIGN'
    },
    description: {
      ID: 'Campaign qurban design untuk meningkatkan partisipasi masyarakat dalam kegiatan qurban.',
      EN: 'Qurban campaign visual design created to increase community participation during Eid al-Adha.'
    },
    image: './images/qurban.png',
  },
  {
    id: 'Volunteer',
    index: '04',
    title: 'VOLUNTEER',
    subtitle: {
      ID: 'VOLUNTEER BEM LP3I',
      EN: 'BEM LP3I VOLUNTEER'
    },
    description: {
      ID: 'Volunteer design untuk BEM LP3I Jakarta Selatan dengan tujuan meningkatkan partisipasi mahasiswa dalam kegiatan sosial.',
      EN: 'Volunteer recruitment design for BEM LP3I South Jakarta aiming to boost student engagement in social activities.'
    },
    image: './images/volunteer.png',
  },
  {
    id: 'Bazar',
    index: '05',
    title: 'BAZAR',
    subtitle: {
      ID: 'BAZAR BEM LP3I',
      EN: 'BEM LP3I BAZAAR'
    },
    description: {
      ID: 'Bazar design untuk BEM LP3I Jakarta Selatan dengan tujuan meningkatkan partisipasi mahasiswa dalam kegiatan bazar.',
      EN: 'Event bazaar graphic design crafted to promote student entrepreneurial events at BEM LP3I South Jakarta.'
    },
    image: './images/bazar.png',
  },
  {
    id: 'Kartini',
    index: '06',
    title: 'KARTINI',
    subtitle: {
      ID: 'KARTINI DESIGN',
      EN: 'KARTINI DAY DESIGN'
    },
    description: {
      ID: 'Kartini design untuk memperingati hari Kartini dengan desain yang modern dan interaktif.',
      EN: 'Commemorative poster design for Kartini Day styled with a sleek and modern visual approach.'
    },
    image: './images/Kartini.png',
  },
];

const EMOTE_OPTIONS = ['🔥', '🚀', '❤️', '👏', '😍'];

interface EngagementData {
  likes: number;
  isLiked: boolean;
  emotes: { [key: string]: number };
  userEmotes: { [key: string]: boolean };
}

const cardVariants: Variants = {
  offscreen: {
    y: 180,
    opacity: 0,
    rotateX: -15,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      bounce: 0.35,
      duration: 0.9,
    },
  },
};

// UI TEXT DICTIONARY UNTUK MODAL & SECTION
const UI_TEXT = {
  ID: {
    sectionTag: 'Desain',
    sectionTitle: 'Desain Saya',
    zoomLabel: 'Klik untuk perbesar',
    prevBtn: 'PREV',
    nextBtn: 'NEXT',
    closeBtn: 'TUTUP',
    likesTag: 'Suka'
  },
  EN: {
    sectionTag: 'Design',
    sectionTitle: 'My Design',
    zoomLabel: 'Click to enlarge',
    prevBtn: 'PREV',
    nextBtn: 'NEXT',
    closeBtn: 'CLOSE',
    likesTag: 'Likes'
  }
};

export default function ScrollTriggeredGallery({ onModalChange, lang = 'ID' }: ScrollTriggeredGalleryProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activePickerId, setActivePickerId] = useState<string | null>(null);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  const tUI = UI_TEXT[lang];

  const [engagement, setEngagement] = useState<{ [key: string]: EngagementData }>({
    'Open Recruitment': { likes: 24, isLiked: false, emotes: { '🔥': 12, '🚀': 8 }, userEmotes: {} },
    'Donor Darah': { likes: 18, isLiked: false, emotes: { '❤️': 15, '👏': 6 }, userEmotes: {} },
    'Qurban': { likes: 31, isLiked: false, emotes: { '🔥': 20, '🚀': 10 }, userEmotes: {} },
    'Volunteer': { likes: 45, isLiked: false, emotes: { '🔥': 30, '😍': 14 }, userEmotes: {} },
    'Bazar': { likes: 12, isLiked: false, emotes: { '👏': 5 }, userEmotes: {} },
    'Kartini': { likes: 9, isLiked: false, emotes: { '❤️': 7 }, userEmotes: {} },
  });

  const selectedItem = GALLERY_ITEMS.find((item) => item.id === selectedId);

  useEffect(() => {
    const isOpen = Boolean(selectedId || zoomedImage);
    
    if (onModalChange) {
      onModalChange(isOpen);
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [selectedId, zoomedImage, onModalChange]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setEngagement((prev) => {
      const current = prev[id] || { likes: 0, isLiked: false, emotes: {}, userEmotes: {} };
      return {
        ...prev,
        [id]: {
          ...current,
          likes: current.isLiked ? current.likes - 1 : current.likes + 1,
          isLiked: !current.isLiked,
        },
      };
    });
  };

  const handleEmoteClick = (e: React.MouseEvent, id: string, emote: string) => {
    e.stopPropagation();
    setEngagement((prev) => {
      const current = prev[id] || { likes: 0, isLiked: false, emotes: {}, userEmotes: {} };
      const hasEmoted = current.userEmotes[emote];
      const count = current.emotes[emote] || 0;

      return {
        ...prev,
        [id]: {
          ...current,
          emotes: {
            ...current.emotes,
            [emote]: hasEmoted ? Math.max(0, count - 1) : count + 1,
          },
          userEmotes: {
            ...current.userEmotes,
            [emote]: !hasEmoted,
          },
        },
      };
    });
  };

  return (
    <div className="relative w-full bg-[#050505] text-[#f5f5f5] py-20 px-6 sm:px-12 font-sans overflow-hidden">
      
      {/* BACKGROUND PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={180}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* KONTEN GALERI */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto text-left mb-16 flex flex-col items-start gap-2">
          <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            {tUI.sectionTag}
          </span>
          <FoldText
            key={`${tUI.sectionTitle}-${lang}`}
            text={tUI.sectionTitle}
            splitBy="char"
            hinge="top"
            trigger="scroll"
            perspective={700}
            creaseShading={0.3}
            fontSize={48}
            fontWeight={900}
            color="#FFFFFF"
          />
        </div>

        <div className="max-w-md mx-auto flex flex-col gap-24 pb-20">
          {GALLERY_ITEMS.map((item, index) => {
            const stats = engagement[item.id] || { likes: 0, isLiked: false, emotes: {}, userEmotes: {} };

            return (
              <motion.div
                key={item.id}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ amount: 0.4, once: false }}
                onClick={() => setSelectedId(item.id)}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  setActivePickerId(null);
                }}
                className="relative cursor-pointer group flex flex-col items-center"
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.04, rotate: index % 2 === 0 ? -2 : 2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full h-[420px] sm:h-[480px] relative overflow-hidden bg-zinc-900 border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] [transform-origin:50%_100%]"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 font-mono text-xs font-bold text-zinc-400 tracking-widest">
                    {item.index}
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                    <button
                      onClick={(e) => handleLike(e, item.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono border backdrop-blur-md transition-all ${
                        stats.isLiked
                          ? 'bg-red-500/20 border-red-500/50 text-red-400'
                          : 'bg-black/60 border-zinc-700/60 text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      <Heart size={13} className={stats.isLiked ? 'fill-red-500 text-red-500' : ''} />
                      <span>{stats.likes}</span>
                    </button>

                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePickerId(activePickerId === item.id ? null : item.id);
                        }}
                        className="p-1.5 rounded-full bg-black/60 border border-zinc-700/60 text-zinc-300 hover:text-white hover:border-zinc-500 backdrop-blur-md transition-all"
                      >
                        <Smile size={14} />
                      </button>

                      <AnimatePresence>
                        {activePickerId === item.id && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-8 bg-zinc-900/95 border border-zinc-700 rounded-full p-1.5 flex items-center gap-1 z-30 shadow-2xl backdrop-blur-md"
                          >
                            {EMOTE_OPTIONS.map((emote) => (
                              <button
                                key={emote}
                                onClick={(e) => handleEmoteClick(e, item.id, emote)}
                                className="w-7 h-7 flex items-center justify-center rounded-full text-sm hover:scale-125 transition-transform"
                              >
                                {emote}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col items-start space-y-2">
                    <h3 className="text-2xl font-black tracking-tight text-white uppercase">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] text-zinc-400 tracking-wider uppercase">
                      {item.subtitle[lang]}
                    </p>
                  </div>
                </motion.div>

                <AnimatePresence>
                  {hoveredIdx === index && !selectedId && (
                    <motion.div
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.25 }}
                      className="hidden lg:flex absolute left-full top-1/2 -translate-y-1/2 ml-6 items-center gap-4 pointer-events-none z-30 max-w-xs"
                    >
                      <div className="w-12 h-[1px] bg-white/80 flex-shrink-0" />
                      <div className="flex flex-col items-start space-y-1">
                        <span className="font-mono text-[10px] text-zinc-400 tracking-widest uppercase">
                          {item.index} / {item.subtitle[lang]}
                        </span>
                        <h4 className="text-sm font-bold text-white tracking-wider uppercase">
                          {item.title}
                        </h4>
                        <p className="text-xs text-zinc-300 font-normal leading-relaxed text-left">
                          {item.description[lang]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MODAL FULLSCREEN DETAIL */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[99999] bg-[#050505] text-white flex flex-col justify-between p-4 sm:p-8 h-screen overflow-hidden select-none"
          >
            <div className="max-w-7xl w-full mx-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center my-auto pb-4">
              
              {/* KOLOM KIRI: GAMBAR */}
              <div 
                onClick={() => setZoomedImage(selectedItem.image)}
                className="md:col-span-6 flex items-center justify-center h-full max-h-[50vh] sm:max-h-[58vh] w-full relative group cursor-zoom-in"
              >
                <div className="relative p-2 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center max-h-full">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="max-h-[48vh] sm:max-h-[55vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 text-white font-mono text-xs">
                    <ZoomIn size={18} /> {tUI.zoomLabel}
                  </div>
                </div>
              </div>

              {/* KOLOM KANAN: DETAIL & THUMBNAIL DI BAWAH NAVIGASI */}
              <div className="md:col-span-6 flex flex-col justify-center items-start space-y-4 text-left">
                
                <span className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
                  {selectedItem.index} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
                </span>

                <div className="space-y-1">
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase">
                    {selectedItem.title}
                  </h2>
                  <p className="font-mono text-xs text-[#1DB954] tracking-wider uppercase font-semibold">
                    {selectedItem.subtitle[lang]}
                  </p>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-md pt-1">
                    {selectedItem.description[lang]}
                  </p>
                </div>

                {/* ENGAGEMENT */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={(e) => handleLike(e, selectedItem.id)}
                    className={`px-3 py-1.5 rounded-lg border text-xs font-mono flex items-center gap-2 transition-all ${
                      engagement[selectedItem.id]?.isLiked
                        ? 'bg-red-500/20 border-red-500/50 text-red-400'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    }`}
                  >
                    <Heart size={14} className={engagement[selectedItem.id]?.isLiked ? 'fill-red-500 text-red-500' : ''} />
                    <span>{engagement[selectedItem.id]?.likes || 0} {tUI.likesTag}</span>
                  </button>

                  <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                    {EMOTE_OPTIONS.map((emote) => (
                      <button
                        key={emote}
                        onClick={(e) => handleEmoteClick(e, selectedItem.id, emote)}
                        className={`px-2 py-0.5 rounded text-xs hover:scale-125 transition-transform ${
                          engagement[selectedItem.id]?.userEmotes[emote] ? 'bg-zinc-800' : ''
                        }`}
                      >
                        {emote} {engagement[selectedItem.id]?.emotes[emote] || 0}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TOMBOL PREV / NEXT / CLOSE */}
                <div className="flex items-center gap-6 pt-1 text-xs font-mono font-bold tracking-widest uppercase">
                  <button
                    onClick={() => {
                      const cur = GALLERY_ITEMS.findIndex((i) => i.id === selectedId);
                      const prev = cur > 0 ? cur - 1 : GALLERY_ITEMS.length - 1;
                      setSelectedId(GALLERY_ITEMS[prev].id);
                    }}
                    className="text-white hover:text-zinc-400 underline underline-offset-8 transition-colors"
                  >
                    {tUI.prevBtn}
                  </button>

                  <button
                    onClick={() => {
                      const cur = GALLERY_ITEMS.findIndex((i) => i.id === selectedId);
                      const next = cur < GALLERY_ITEMS.length - 1 ? cur + 1 : 0;
                      setSelectedId(GALLERY_ITEMS[next].id);
                    }}
                    className="text-white hover:text-zinc-400 underline underline-offset-8 transition-colors"
                  >
                    {tUI.nextBtn}
                  </button>

                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-zinc-400 hover:text-red-500 underline underline-offset-8 transition-colors"
                  >
                    {tUI.closeBtn}
                  </button>
                </div>

                {/* STRIP THUMBNAIL */}
                <div className="pt-3 w-full border-t border-zinc-900/80 mt-2">
                  <div className="flex items-center gap-2.5 overflow-x-auto py-1">
                    {GALLERY_ITEMS.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`relative shrink-0 w-12 h-14 sm:w-14 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedId === item.id 
                            ? 'border-[#1DB954] scale-105 opacity-100 shadow-lg' 
                            : 'border-transparent opacity-40 hover:opacity-80'
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover pointer-events-none" 
                        />
                      </button>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX ZOOM FULLSCREEN */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 cursor-zoom-out"
          >
            <img
              src={zoomedImage}
              alt="Zoomed View"
              className="max-w-full max-h-[88vh] object-contain rounded-lg shadow-2xl pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}