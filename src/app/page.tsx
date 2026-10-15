'use client';

import Navbar, { MY_PLAYLIST_ID } from "@/components/Navbar"; 
import Lanyard from "@/components/Lanyard";
import FoldText from '@/components/FoldText'; 
import TechText from '@/components/TechText';
import { useEffect, useState, useRef, Fragment } from 'react';
import { 
  ChevronDown, 
  ArrowRight, 
  Mail, 
  ExternalLink, 
  Code2, 
  X, 
  Minimize2
} from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue, AnimatePresence } from 'framer-motion';
import ScrollTriggeredGallery from '@/components/ScrollVelocity3DPlanes';
import OptionWheel from '@/components/OptionWheel';
import Particles from '@/components/Particles';

function SpotifyDiscIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm5.521 17.341c-.217.357-.684.469-1.04.252-2.856-1.745-6.453-2.14-10.686-1.173-.404.093-.81-.162-.903-.566-.093-.404.162-.81.566-.903 4.636-1.06 8.599-.611 11.811 1.352.357.218.469.684.252 1.04zm1.472-3.272c-.273.444-.856.587-1.3.314-3.268-2.008-8.25-2.593-12.115-1.42-.497.151-1.025-.131-1.176-.628-.152-.497.131-1.025.628-1.176 4.414-1.34 9.897-.689 13.649 1.61.444.273.587.856.314 1.3zm.128-3.411c-3.918-2.327-10.378-2.541-14.133-1.401-.607.184-1.25-.162-1.434-.769-.184-.607.162-1.25.769-1.434 4.312-1.309 11.441-1.055 15.94 1.616.546.324.726 1.031.402 1.577-.324.545-1.031.725-1.544.411z" />
    </svg>
  );
}

// KAMUS DUAL BAHASA (INDONESIA & ENGLISH)
const TRANSLATIONS = {
  ID: {
    heroBio: "Halo! Saya Faqih, seorang UI/UX Designer & Frontend Developer yang berfokus pada perancangan antarmuka digital yang intuitif, estetis, dan responsif.",
    btnDesign: "Desain Saya",
    btnProjects: "Proyek Saya",
    aboutTitle: "Tentang Saya",
    aboutStatement: "Halo, saya Muhammad Faqih Hasan, mahasiswa aktif dan UI/UX Designer yang berfokus pada desain kreatif, pengalaman pengguna, serta pengembangan web modern. Saat ini, saya juga berkontribusi di BPH Politeknik LP3I Jakarta Kampus Pasar Minggu.",
    projectsSection: "Proyek",
    projectsTitle: "Proyek Saya",
    footerHeading: "Tertarik Bekerja Sama?",
    footerSubheading: "Silakan kirimkan pesan Anda untuk menjalin kerja sama.",
    footerEmailBtn: "Hubungi Lewat Email",
    projects: [
      {
        id: "01",
        title: "Desa Wisata Tugu Selatan",
        category: "Next.js & Headless WordPress",
        desc: "Platform pariwisata terintegrasi dengan pemetaan lokasi dinamis, peta interaktif, serta manajemen destinasi berbasis headless CMS.",
        techStack: ["Next.js", "WordPress", "Tailwind CSS", "REST API"],
        image: "./images/tuguselatan.png",
        link: "https://desawisatatuguselatan.com",
      },
      {
        id: "02",
        title: "Website BEM LP3I Jakarta",
        category: "Frontend Development & Motion",
        desc: "Portal resmi organisasi kampus dengan fitur galeri foto horizontal scroll interaktif, pengumuman event, dan tata letak responsif.",
        techStack: ["React", "Next.js", "Framer Motion", "Tailwind"],
        image: "./images/bem.png",
        link: "https://bemlp3ijaksel.com",
      },
      {
        id: "03",
        title: "Desa Wisata Bojongrangkas",
        category: "Interactive WebGIS & Next.js",
        desc: "Pengembangan sitemap dan antarmuka peta interaktif desa wisata Bojong Rangkas terintegrasi API.",
        techStack: ["Next.js", "REST API", "Tailwind CSS", "WordPress"],
        image: "./images/bojongrangkas.png",
        link: "https://desawisatabojongrangkas.com",
      },
      {
        id: "04",
        title: "HYPECORE Streetwear Brand",
        category: "Branding & E-Commerce",
        desc: "Pengembangan konsep identitas visual brand luxury streetwear dan landing page e-commerce berestetika modern.",
        techStack: ["WordPress", "Elementor"],
        image: "./images/hypecore.png",
        link: "https://hypecore.biznityhub.com",
      }
    ]
  },
  EN: {
    heroBio: "Hello! I am Faqih, a UI/UX Designer & Frontend Developer focused on crafting intuitive, aesthetic, and responsive digital interfaces.",
    btnDesign: "My Designs",
    btnProjects: "My Projects",
    aboutTitle: "About Me",
    aboutStatement: "Hello, I am Muhammad Faqih Hasan, an active student and UI/UX Designer focusing on creative design, user experience, and modern web development. Currently, I also contribute at BPH Politeknik LP3I Jakarta Pasar Minggu Campus.",
    projectsSection: "Projects",
    projectsTitle: "My Projects",
    footerHeading: "Interested in Collaborating?",
    footerSubheading: "Feel free to send a message to start working together.",
    footerEmailBtn: "Contact via Email",
    projects: [
      {
        id: "01",
        title: "Tugu Selatan Tourism Village",
        category: "Next.js & Headless WordPress",
        desc: "An integrated tourism platform featuring dynamic location mapping, interactive maps, and headless CMS-based destination management.",
        techStack: ["Next.js", "WordPress", "Tailwind CSS", "REST API"],
        image: "./images/tuguselatan.png",
        link: "https://desawisatatuguselatan.com",
      },
      {
        id: "02",
        title: "BEM LP3I Jakarta Website",
        category: "Frontend Development & Motion",
        desc: "Official campus student board portal featuring an interactive horizontal scroll photo gallery, event announcements, and responsive layout.",
        techStack: ["React", "Next.js", "Framer Motion", "Tailwind"],
        image: "./images/bem.png",
        link: "https://bemlp3ijaksel.com",
      },
      {
        id: "03",
        title: "Bojongrangkas Tourism Village",
        category: "Interactive WebGIS & Next.js",
        desc: "Sitemap development and interactive map interface for Bojong Rangkas tourism village integrated with API.",
        techStack: ["Next.js", "REST API", "Tailwind CSS", "WordPress"],
        image: "./images/bojongrangkas.png",
        link: "https://desawisatabojongrangkas.com",
      },
      {
        id: "04",
        title: "HYPECORE Streetwear Brand",
        category: "Branding & E-Commerce",
        desc: "Visual identity concept development for a luxury streetwear brand along with a modern aesthetic e-commerce landing page.",
        techStack: ["WordPress", "Elementor"],
        image: "./images/hypecore.png",
        link: "https://hypecore.biznityhub.com",
      }
    ]
  }
};

const START_OPACITY = 0.2;
const SPREAD = 0.8;
const WORD_DURATION = 0.2;

interface WordProgressRange {
  start: number;
  end: number;
}

function getWordProgressRange(index: number, count: number): WordProgressRange {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;
  return {
    start,
    end: Math.min(1, start + WORD_DURATION),
  };
}

function getWordOpacity(
  progress: number,
  { start, end }: WordProgressRange,
  startOpacity = START_OPACITY
): number {
  if (progress <= start) return startOpacity;
  if (progress >= end) return 1;

  const wordProgress = (progress - start) / (end - start);
  return startOpacity + (1 - startOpacity) * wordProgress;
}

function Word({
  children,
  progress,
  index,
  count,
  reducedMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
  reducedMotion: boolean;
}) {
  const range = getWordProgressRange(index, count);
  const opacity = useTransform(progress, (latest) =>
    getWordOpacity(latest, range)
  );

  return (
    <motion.span
      aria-hidden="true"
      style={reducedMotion ? undefined : { opacity }}
      className="inline-block text-white"
    >
      {children}
    </motion.span>
  );
}

function TextScrollWordRevealAbout({ statement }: { statement: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = statement.split(" ");

  return (
    <div ref={sectionRef} className="w-full">
      <p 
        aria-label={statement} 
        className="text-lg sm:text-2xl lg:text-3xl font-medium text-justify text-white leading-relaxed tracking-tight flex flex-wrap gap-x-[0.35em] gap-y-1.5"
      >
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <Word
              progress={scrollYProgress}
              index={index}
              count={words.length}
              reducedMotion={Boolean(reducedMotion)}
            >
              {word}
            </Word>
          </Fragment>
        ))}
      </p>
    </div>
  );
}

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState(0);

  // STATE BAHASA GLOBAL ('ID' | 'EN')
  const [lang, setLang] = useState<'ID' | 'EN'>('ID');

  // STATE DETEKSI MODAL GALERI AKTIF (UNTUK SEMBUNYIKAN NAVBAR)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // UKURAN FONT OPTION WHEEL DIBUAT DINAMIS UNTUK SCREEN HP
  const [wheelFontSize, setWheelFontSize] = useState(2.2);

  // STATE PLAYER SPOTIFY
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [hasStartedPlaying, setHasStartedPlaying] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);

  // DATA TEKS TERJEMAHAN AKTIF
  const t = TRANSLATIONS[lang];
  const projectsData = t.projects;
  const projectTitles = projectsData.map((p) => p.title);
  const currentProj = projectsData[selectedProjectIdx] || projectsData[0];

  const handleOpenMusic = () => {
    setIsMusicModalOpen(true);
    setHasStartedPlaying(true);
    setIsMinimized(false);
  };

  // KUNCI SCROLL HALAMAN UTAMA SAAT MODAL SPOTIFY TERBUKA
  useEffect(() => {
    if (isMusicModalOpen) {
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
  }, [isMusicModalOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setWheelFontSize(1.25);
      } else if (window.innerWidth < 1024) {
        setWheelFontSize(1.6);
      } else {
        setWheelFontSize(2.2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollIndicator(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  const handleScrollDown = () => {
    window.scrollBy({ top: 600, behavior: 'smooth' });
    setShowScrollIndicator(false);
  };

  return (
    <main className="relative w-full bg-[#050505] text-white min-h-screen">
      
      {/* GLOBAL PARTICLES BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* FLOATING NAVBAR DENGAN FITUR TOGGLE BAHASA */}
      <div className="relative z-20">
        <Navbar 
          onOpenMusicModal={handleOpenMusic} 
          isGalleryOpen={isGalleryOpen} 
          lang={lang}
          onLanguageChange={(newLang) => setLang(newLang)}
        />
      </div>

      {/* 1. HERO SECTION */}
      <section ref={heroRef} id="home" className="relative z-10 w-full min-h-screen flex flex-col justify-between pt-24 pb-12 px-6 md:px-16 lg:px-24">
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col-reverse lg:grid lg:grid-cols-12 items-center gap-10 lg:gap-12 my-auto">
          
          {/* TEKS HERO (KOLOM KIRI) */}
          <div className="w-full lg:col-span-7 flex flex-col items-start justify-center space-y-2 sm:space-y-3 lg:space-y-4 text-left">
            
            <div className="w-full h-[65px] sm:h-[100px] md:h-[120px] lg:h-[145px] relative -ml-2 sm:-ml-4">
              <TechText
                text="MUHAMMAD FAQIH HASAN"
                fontWeight={600}
                fontSize={90}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                fontFamily=""
                color="#ffffff"
                accentColor="#ffffff"
                letterSpacing={-0.03}
                reach={200}
                softness={0.7}
                strokeWidth={1.5}
                speed={1}
                lineStyle="dashed"
                selection
                labels
                draggable
                sweep
              />
            </div>

            <p className="text-xs sm:text-base text-zinc-400 max-w-xl font-medium leading-relaxed pt-1">
              {t.heroBio}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a 
                href="#design" 
                className="px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group"
              >
                {t.btnDesign}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-xl border border-zinc-700 text-white hover:bg-zinc-900 font-semibold text-xs sm:text-sm transition-all"
              >
                {t.btnProjects}
              </a>
            </div>
          </div>

          {/* LANYARD CONTAINER */}
          <div className="w-full lg:col-span-5 h-[220px] sm:h-[320px] lg:h-[550px] flex items-center justify-center relative pb-8 sm:pb-12 lg:pb-0 mb-4 lg:mb-0">
            <Lanyard position={[0, 10, 20]} gravity={[0, -40, 0]} />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={handleScrollDown}
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer transition-all duration-500 ${
            showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="p-2 rounded-full bg-white/10 border border-white/20 text-white animate-bounce shadow-sm hover:bg-white/20 transition-all">
            <ChevronDown size={18} />
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className="relative z-10 w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 border-t border-zinc-800/80 bg-[#080808]/80 backdrop-blur-sm">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-start gap-8 z-10">
          <FoldText
            key={t.aboutTitle}
            text={t.aboutTitle}
            splitBy="char"
            hinge="top"
            trigger="scroll"
            perspective={700}
            creaseShading={0.3}
            fontSize={42}
            fontWeight={800}
            color="#FFFFFF"
          />

          <TextScrollWordRevealAbout statement={t.aboutStatement} />
        </div>
      </section>

      {/* 3. INTERACTIVE GALLERY SECTION */}
<section id="design" className="relative z-10 w-full border-t border-zinc-800/80 bg-black">
  <ScrollTriggeredGallery 
    onModalChange={(isOpen) => setIsGalleryOpen(isOpen)} 
    lang={lang} 
  />
</section>

      {/* 4. OPTION WHEEL PROJECT SHOWCASE SECTION */}
      <section id="projects" className="relative z-10 w-full py-16 lg:py-24 px-6 md:px-16 lg:px-24 bg-[#050505]/90 border-t border-zinc-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 lg:gap-10">
          
          <div className="flex flex-col items-start space-y-1">
            <span className="text-xs font-mono tracking-widest text-[#1DB954] uppercase">{t.projectsSection}</span>
            <FoldText
              key={t.projectsTitle}
              text={t.projectsTitle}
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px] lg:h-[520px]">
            
            {/* OPTION WHEEL (KOLOM KIRI) */}
            <div className="lg:col-span-6 h-[180px] sm:h-[240px] lg:h-full relative overflow-hidden flex items-center">
              <OptionWheel 
                key={lang}
                items={projectTitles}
                defaultSelected={selectedProjectIdx}
                textColor="#52525b"
                activeColor="#ffffff"
                side="left"
                fontSize={wheelFontSize}
                spacing={1.3}
                curve={1.1}
                tilt={6}
                blur={2}
                fade={0.3}
                smoothing={180}
                inset={10}
                loop={true}
                draggable={true}
                onChange={(index) => setSelectedProjectIdx(index)}
              />
            </div>

            {/* GAMBAR & DETAIL PROYEK (KOLOM KANAN) */}
            <div className="lg:col-span-6 h-full flex flex-col justify-center relative">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={`${currentProj.id}-${lang}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col justify-between gap-4 sm:gap-6"
                >
                  <div className="relative w-full aspect-[1896/898] max-h-[280px] sm:max-h-[300px] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 shadow-2xl group">
                    <img 
                      src={currentProj.image} 
                      alt={currentProj.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full text-xs font-mono text-white border border-white/20">
                      PROJ-{currentProj.id}
                    </div>
                  </div>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[#1DB954] font-semibold tracking-wider uppercase">
                        {currentProj.category}
                      </span>
                      <a 
                        href={currentProj.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/10 hover:bg-[#1DB954] hover:text-black transition-colors"
                        title="Kunjungi Website"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>

                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {currentProj.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                        <Code2 size={14} /> Stack:
                      </div>
                      {currentProj.techStack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px] font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FOOTER / CONTACT */}
      <footer id="contact" className="relative z-10 w-full py-16 px-6 border-t border-zinc-800/80 bg-black/90 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white">{t.footerHeading}</h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            {t.footerSubheading}
          </p>
          <a 
            href="mailto:faqihhasan217@gmail.com" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-semibold transition-all shadow-md"
          >
            <Mail size={16} /> {t.footerEmailBtn}
          </a>
          <p className="text-xs text-zinc-500 pt-8">
            © {new Date().getFullYear()} Muhammad Faqih Hasan.
          </p>
        </div>
      </footer>

      {/* BACKDROP OVERLAY SAAT MODAL FULLSCREEN DIBUKA */}
      {isMusicModalOpen && (
        <div 
          onClick={() => setIsMusicModalOpen(false)} 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in" 
        />
      )}

      {/* FLOATING ICON SPOTIFY VECTOR GLOWING BERPUTAR */}
      {hasStartedPlaying && isMinimized && !isMusicModalOpen && (
        <div 
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-2.5 rounded-full bg-neutral-900/90 border border-[#1DB954]/40 shadow-[0_0_20px_rgba(29,185,84,0.3)] backdrop-blur-2xl cursor-pointer hover:scale-105 transition-all group animate-in fade-in slide-in-from-bottom-5"
          title="Klik untuk membuka kembali player Spotify"
        >
          <div className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#1DB954] bg-[#1DB954]/10 p-1.5 border border-[#1DB954]/30 shadow-inner">
            <SpotifyDiscIcon className="w-full h-full animate-spin" />
          </div>

          <div className="flex flex-col pr-2">
            <span className="text-xs font-bold text-white leading-tight">Spotify Active</span>
            <span className="text-[10px] text-[#1DB954] font-mono tracking-wider font-semibold">PLAYING...</span>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              setHasStartedPlaying(false);
            }}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors mr-1"
            title="Tutup Player"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* MASTER IFRAME CONTAINER */}
      {hasStartedPlaying && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-in-out ${
            isMinimized ? 'opacity-0 pointer-events-none -bottom-96' : ''
          } ${
            isMusicModalOpen
              ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md'
              : 'bottom-6 right-6 w-[350px] sm:w-[380px]'
          }`}
        >
          <div className="relative w-full rounded-2xl bg-[#121212]/95 border border-white/10 p-3.5 shadow-2xl backdrop-blur-2xl text-white flex flex-col gap-2.5">
            
            <div className="flex items-center justify-between pb-1 px-1 border-b border-white/10">
              <div className="flex items-center gap-2 text-[#1DB954]">
                <SpotifyDiscIcon className="w-4 h-4" />
                <span className="text-[11px] font-bold tracking-wider text-white font-mono uppercase">
                  {isMusicModalOpen ? "FAQIH'S SPOTIFY PLAYLIST" : "NOW PLAYING"}
                </span>
              </div>

              <div className="flex items-center gap-1">
                {!isMusicModalOpen && (
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                    title="Minimize ke Ikon Spotify Berputar"
                  >
                    <Minimize2 size={13} />
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMusicModalOpen(false);
                    if (!isMusicModalOpen) setHasStartedPlaying(false);
                  }}
                  className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            <div 
              className={`w-full overflow-hidden rounded-xl border border-white/5 transition-all duration-300 ${
                isMusicModalOpen ? 'h-[380px]' : 'h-[152px]'
              }`}
            >
              <iframe
                src={`https://open.spotify.com/embed/playlist/${MY_PLAYLIST_ID}?utm_source=generator&theme=0`}
                width="100%"
                height={isMusicModalOpen ? "380" : "152"}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                scrolling="no"
                style={{
                  borderRadius: '12px',
                  width: '100%',
                  height: isMusicModalOpen ? '380px' : '152px',
                  border: '0',
                  overflow: 'hidden'
                }}
              ></iframe>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}