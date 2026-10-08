'use client';

import Navbar from "@/components/Navbar"; 
import Lanyard from "@/components/Lanyard";
import FoldText from '@/components/FoldText'; 
import { useEffect, useState, useRef, Fragment } from 'react';
import { ChevronDown, ArrowRight, Mail, ExternalLink, Code2 } from 'lucide-react';
import DriftWall from '@/components/DriftWall';
import CardSwap, { Card } from '@/components/CardSwap';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProfileCard from '@/components/ProfileCard';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// --- KOMPONEN TEXT SCROLL WORD REVEAL UNTUK ABOUT ---
const ABOUT_STATEMENT = 
  "Halo! Saya Muhammad Faqih Hasan, seorang mahasiswa aktif sekaligus penggiat UI/UX dan desain kreatif yang saat ini turut berkontribusi di Badan Pengurus Harian (BPH) Politeknik LP3I Jakarta Pasar Minggu, berfokus pada perancangan pengalaman digital yang intuitif dan pengembangan web modern.";

const START_OPACITY = 0.15;
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
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}

function TextScrollWordRevealAbout() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.4"],
  });

  const words = ABOUT_STATEMENT.split(" ");

  return (
    <div ref={sectionRef} className="w-full">
      <p 
        aria-label={ABOUT_STATEMENT} 
        className="text-lg sm:text-2xl lg:text-3xl font-medium text-justify text-zinc-900 leading-relaxed tracking-tight flex flex-wrap gap-x-[0.35em] gap-y-1.5"
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
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);

  const driftItems = [
    { image: 'https://picsum.photos/id/1015/600/400', title: 'Peaks', href: 'https://example.com/one' },
    { image: 'https://picsum.photos/id/1025/600/400', title: 'Pup', href: 'https://example.com/two' },
    { image: 'https://picsum.photos/id/1039/600/400', title: 'Falls', href: 'https://example.com/three' },
  ];

  const projects = [
    {
      id: "01",
      title: "Desa Wisata Tugu Selatan",
      category: "Next.js & Headless WordPress",
      desc: "Platform pariwisata terintegrasi dengan pemetaan lokasi dinamis, peta interaktif, serta manajemen destinasi berbasis headless CMS.",
      techStack: ["Next.js", "WordPress", "Tailwind CSS", "GSAP"],
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
      link: "https://desawisatatuguselatan.com",
    },
    {
      id: "02",
      title: "Website BEM LP3I Jakarta",
      category: "Frontend Development & Motion",
      desc: "Portal resmi organisasi kampus dengan fitur galeri foto horizontal scroll interaktif, pengumuman event, dan tata letak responsif.",
      techStack: ["React", "Next.js", "Framer Motion", "Tailwind"],
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      link: "https://bemlp3ijakarta.com",
    },
    {
      id: "03",
      title: "HYPECORE Streetwear Brand",
      category: "Branding & E-Commerce",
      desc: "Pengembangan konsep identitas visual brand luxury streetwear dan landing page e-commerce berestetika modern.",
      techStack: ["UI/UX Design", "Figma", "Next.js", "Three.js"],
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
      link: "https://hypecore-concept.com",
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollIndicator(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  useEffect(() => {
    const section = pinnedSectionRef.current;
    if (!section) return;

    const totalProjects = projects.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${totalProjects * 60}%`,
        pin: true,
        pinSpacing: true,
        scrub: 0.2,
        onUpdate: (self) => {
          const idx = Math.min(
            Math.floor(self.progress * totalProjects),
            totalProjects - 1
          );
          setActiveProjectIdx(idx);
        }
      });
    }, pinnedSectionRef);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert();
  }, [projects.length]);

  const handleScrollDown = () => {
    window.scrollBy({ top: 600, behavior: 'smooth' });
    setShowScrollIndicator(false);
  };

  const currentProj = projects[activeProjectIdx] || projects[0];

  return (
    <main className="relative w-full bg-[#E5E5E5] text-[#18181B] overflow-hidden">
      
      {/* Navbar Floating */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative w-full min-h-screen flex flex-col justify-between pt-16 pb-12 px-6 md:px-16 lg:px-24">
        <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col-reverse lg:grid lg:grid-cols-12 items-center gap-6 lg:gap-12 my-auto">
          
          <div className="w-full lg:col-span-7 flex flex-col items-start justify-center space-y-4 lg:space-y-6 text-left mt-2 sm:mt-6 lg:mt-0">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1]">
              MUHAMMAD FAQIH HASAN
            </h1>

            <p className="text-xs sm:text-base text-zinc-600 max-w-xl font-medium leading-relaxed">
              Halo! Saya Faqih, seorang UI/UX Designer & Frontend Developer yang berfokus pada perancangan antarmuka digital yang intuitif, estetis, dan responsif.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a 
                href="#projects" 
                className="px-6 py-3 rounded-xl bg-[#2D3748] hover:bg-[#1A202C] text-white font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 group"
              >
                Download CV
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 rounded-xl border-2 border-[#2D3748] text-[#2D3748] hover:bg-[#2D3748] hover:text-white font-semibold text-xs sm:text-sm transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>

          <div className="w-full lg:col-span-5 h-[260px] sm:h-[400px] lg:h-[600px] flex items-center justify-center relative -mt-16 sm:-mt-24 lg:mt-0">
            <Lanyard position={[0, 2, 20]} gravity={[0, -40, 0]} />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={handleScrollDown}
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer transition-all duration-500 ${
            showScrollIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="p-2 rounded-full bg-zinc-900/10 border border-zinc-900/20 text-zinc-800 animate-bounce shadow-sm hover:bg-zinc-900/20 transition-all">
            <ChevronDown size={18} />
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION (MENGGUNAKAN FOLD TEXT BERDURASI SCROLL & WORD REVEAL) */}
      <section className="w-full py-24 md:py-32 px-6 md:px-16 lg:px-24 border-t border-zinc-300 bg-[#E0E0E0]">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-start gap-8 z-10">
          <FoldText
            text="About Me"
            splitBy="char"
            hinge="top"
            trigger="scroll"
            perspective={700}
            creaseShading={0.3}
            fontSize={42}
            fontWeight={800}
            color="#18181B"
          />

          <TextScrollWordRevealAbout />
        </div>
      </section>

      {/* 3. DRIFTWALL SECTION */}
      <section className="w-full py-20 md:py-28 border-t border-zinc-300 bg-[#E5E5E5]">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 mb-8 md:mb-12">
          <div className="flex flex-col items-start space-y-2">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Visual Showcase</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900">MY DESIGN</h2>
          </div>
        </div>

        <div className="w-full flex justify-center items-center relative px-4" style={{ height: '480px' }}>
          <DriftWall
            items={driftItems}
            columns={3}
            tileWidth={200}
            tileHeight={130}
            gap={16}
            tilt={10}
            turn={0}
            perspective={1200}
            depth={100}
            speed={35}
            direction="up"
            variance={0.3}
            parallax={0.5}
            lift={40}
            fade={0.5}
            dim={0.4}
            overlayColor="#060010"
            radius={14}
            roll={0}
            pauseOnHover={false}
            grayscale={false}
          />
        </div>
      </section>

      {/* 4. PINNED SCROLL SECTION */}
      <div ref={pinnedSectionRef} id="projects" className="w-full min-h-screen flex items-center border-t border-zinc-300 bg-[#E0E0E0] py-12 md:py-0">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="w-full lg:col-span-6 flex flex-col items-start space-y-4 md:space-y-6">
              <div className="flex flex-col items-start space-y-1 md:space-y-2">
                <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">Selected Works</span>
                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight">MY PROJECT</h2>
              </div>

              <div key={currentProj.id} className="space-y-3 md:space-y-4 transition-all duration-500 ease-out w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-300/80 text-zinc-800 text-xs font-mono border border-zinc-400/50">
                  <span>PROJ-{currentProj.id}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                  <span>{currentProj.category}</span>
                </div>

                <h3 className="text-xl md:text-3xl font-bold text-zinc-900 tracking-tight">
                  {currentProj.title}
                </h3>

                <p className="text-xs md:text-base text-zinc-600 leading-relaxed font-normal">
                  {currentProj.desc}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-1.5 md:gap-2">
                  <div className="flex items-center gap-1 text-xs text-zinc-500 font-semibold mr-1">
                    <Code2 size={14} /> Stack:
                  </div>
                  {currentProj.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-xl bg-white/50 backdrop-blur-sm border border-white/80 text-zinc-800 text-[11px] md:text-xs font-semibold shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-2 md:pt-4">
                  <a
                    href={currentProj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2D3748] hover:bg-[#1A202C] text-white text-xs md:text-sm font-semibold shadow-md transition-all group"
                  >
                    Kunjungi Website
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:col-span-6 mt-4 lg:mt-0">
              <CardSwap 
                cardDistance={16} 
                verticalDistance={12} 
                activeIndex={activeProjectIdx}
              >
                {projects.map((proj) => (
                  <Card key={proj.id} href={proj.link}>
                    <div className="relative w-full h-full overflow-hidden">
                      <img 
                        src={proj.image} 
                        alt={proj.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-80" />
                      
                      <div className="absolute top-3 left-3 bg-zinc-900/90 px-3 py-1 rounded-full text-[11px] font-mono text-zinc-200 border border-zinc-700/60 shadow-lg">
                        {proj.id}
                      </div>

                      <div className="absolute bottom-3 right-3 bg-zinc-900/90 p-2 rounded-full text-white border border-zinc-700/60 shadow-lg group-hover:bg-indigo-600 transition-colors">
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>

          </div>
        </div>
      </div>

      {/* PROFILE CARD */}
      <section className="w-full py-16 px-6 flex justify-center items-center border-t border-zinc-300 bg-[#E5E5E5]">
        <ProfileCard
          name="Muhammad Faqih Hasan"
          title="UI/UX & Frontend"
          handle="faqih_hsn"
          status="Available"
          contactText="Contact Me"
          avatarUrl="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
          showUserInfo={true}
          enableTilt={true}
          enableMobileTilt={false}
          onContactClick={() => window.location.href = "mailto:faqih@example.com"}
          behindGlowColor="rgba(125, 190, 255, 0.67)"
          behindGlowEnabled
          innerGradient="linear-gradient(145deg,#2D3748 0%,#1A202C 100%)"
        />
      </section>

      {/* 5. FOOTER / CONTACT */}
      <footer id="contact" className="relative z-20 w-full py-16 px-6 border-t border-zinc-300 bg-[#D4D4D8] text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900">Tertarik Bekerja Sama?</h2>
          <p className="text-xs sm:text-sm text-zinc-600">
            Silakan kirimkan pesan untuk diskusi proyek UI/UX design maupun pengembangan website.
          </p>
          <a 
            href="mailto:faqih@example.com" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2D3748] hover:bg-[#1A202C] text-white text-xs sm:text-sm font-semibold transition-all shadow-md"
          >
            <Mail size={16} /> Hubungi Lewat Email
          </a>
          <p className="text-xs text-zinc-500 pt-8">
            © {new Date().getFullYear()} Muhammad Faqih Hasan. All rights reserved.
          </p>
        </div>
      </footer>

    </main>
  );
}