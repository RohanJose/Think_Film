import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../constants.tsx';
import Footer from '../components/Footer.tsx';

interface SectionControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  dark?: boolean;
}

const VideoControls: React.FC<SectionControlsProps> = ({
  isPlaying,
  isMuted,
  onTogglePlay,
  onToggleMute,
  dark = true,
}) => (
  <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-[80] flex items-center space-x-3">
    <button
      onClick={onTogglePlay}
      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all group backdrop-blur-md ${
        dark
          ? 'border-white/20 bg-black/30 hover:bg-white hover:border-white'
          : 'border-black/10 bg-white/30 hover:bg-black hover:border-black'
      }`}
    >
      {isPlaying ? (
        <svg
          className={`w-4 h-4 ${
            dark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        <svg
          className={`w-4 h-4 ml-1 ${
            dark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>
    <button
      onClick={onToggleMute}
      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all group relative backdrop-blur-md ${
        dark
          ? 'border-white/20 bg-black/30 hover:bg-white hover:border-white'
          : 'border-black/10 bg-white/30 hover:bg-black hover:border-black'
      }`}
    >
      <svg
        className={`w-4 h-4 ${
          dark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'
        }`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
      {isMuted && (
        <div
          className={`absolute w-[1px] h-6 rotate-45 pointer-events-none ${
            dark ? 'bg-white group-hover:bg-black' : 'bg-black group-hover:bg-white'
          }`}
        ></div>
      )}
    </button>
  </div>
);

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const playPromises = useRef<Record<number, Promise<void> | null>>({});

  const handleVideoPlayback = async (index: number, shouldPlay: boolean) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (shouldPlay && isPlaying) {
      if (video.paused) {
        try {
          const promise = video.play();
          if (promise !== undefined) {
            playPromises.current[index] = promise;
            await promise;
          }
        } catch (error: any) {
          if (error.name === 'NotAllowedError') {
            video.muted = true;
            setIsMuted(true);
            video.play().catch(() => {});
          }
        } finally {
          playPromises.current[index] = null;
        }
      }
    } else {
      if (!video.paused) {
        const pendingPromise = playPromises.current[index];
        if (pendingPromise) {
          try {
            await pendingPromise;
          } catch (e) {}
        }
        video.pause();
      }
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((_, i) => {
      handleVideoPlayback(i, i === activeIndex);
    });
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollPos = containerRef.current.scrollTop;
        const index = Math.round(scrollPos / window.innerHeight);
        if (index !== activeIndex) {
          setActiveIndex(index);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const scrollTo = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  const sections = [
    {
      id: 'hero',
      type: 'hero',
      title: 'THINK FILMS',
      subtitle: 'MEDIA PRODUCTION HOUSE',
      bg: 'white',
    },
    {
      id: 'automotive',
      type: 'video',
      title: 'AUTOMOTIVE',
      subtitle: 'PRECISION IN MOTION',
      src: 'automative1.webm',
      link: '/automotive',
      btnText: 'EXPLORE AUTOMOTIVE',
    },
    {
      id: 'corporate',
      type: 'video',
      title: 'CORPORATE',
      subtitle: 'EDITORIAL LEADERSHIP',
      src: 'coperate1.webm',
      link: '/corporate',
      btnText: 'EXPLORE CORPORATE',
    },
    {
      id: 'concerts',
      type: 'video',
      title: 'CONCERTS',
      subtitle: 'LIVE ENERGY',
      src: 'concert1.webm',
      link: '/concerts',
      btnText: 'EXPLORE CONCERTS',
    },
  ];

  return (
    <main className="relative h-screen w-full bg-white">
      {/* Side Navigation Dots - Hidden on Mobile */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col space-y-6">
        {[...sections, { id: 'philosophy' }, { id: 'cta' }, { id: 'footer' }].map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className="group relative flex items-center justify-center w-6 h-6"
          >
            <div
              className={`transition-all duration-700 rounded-full border ${
                activeIndex === i
                  ? activeIndex === 0 || activeIndex >= 4
                    ? 'w-4 h-4 bg-black border-black ring-8 ring-black/5'
                    : 'w-4 h-4 bg-white border-white ring-8 ring-white/10'
                  : activeIndex === 0 || activeIndex >= 4
                  ? 'w-1.5 h-1.5 bg-black/20 border-black/5 hover:bg-black'
                  : 'w-1.5 h-1.5 bg-white/40 border-white/5 hover:bg-white'
              }`}
            ></div>
          </button>
        ))}
      </div>

      <div ref={containerRef} className="snap-container hide-scrollbar h-full w-full overflow-y-auto">
        {/* Section 0: Refined Hero */}
        <section className="snap-section flex flex-col items-center justify-center bg-white relative">
          <div
            className={`relative z-10 text-center px-6 transition-all duration-[1200ms] transform ${
              activeIndex === 0
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-6 opacity-0 scale-95'
            }`}
          >
            {/* Logo container - focal point - Larger on mobile */}
            <div className="flex justify-center mb-0.5">
              <img
                src="/colored-logo.png"
                alt="Think Films"
                className="h-40 md:h-44 lg:h-52 w-auto select-none transition-transform duration-700 hover:scale-105"  
              />
            </div>

            {/* Subtitle - tightly coupled to logo */}
            <p className="text-[10px] md:text-[11px] uppercase tracking-[1em] font-black text-black/40">
              {sections[0].subtitle}
            </p>

            <div className="mt-12 md:mt-16 w-12 h-[1px] bg-black/5 mx-auto"></div>
          </div>

          {/* Minimal Signatures - Persistent position */}
          <div className="absolute bottom-10 left-8 md:left-12 flex flex-col items-start overflow-hidden">
             <p className={`text-[9px] font-black uppercase tracking-[0.5em] text-black/10 transition-all duration-1000 ${activeIndex === 0 ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                Think Differently.
             </p>
             <div className="w-8 h-[1.5px] bg-black/5 mt-2"></div>
          </div>
          
          <div className="absolute bottom-10 right-8 md:right-12 hidden md:block overflow-hidden">
             <p className={`text-[9px] font-black uppercase tracking-[0.4em] text-black/10 transition-all duration-1000 ${activeIndex === 0 ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                Premium Studio / 2025
             </p>
          </div>
        </section>

        {/* Video Sections 1-3 */}
        {sections.slice(1).map((section, idx) => {
          const i = idx + 1;
          return (
            <section
              key={section.id}
              className="snap-section flex items-end justify-center bg-black pb-24 md:pb-32"
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                muted={isMuted}
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 video-breath"
              >
                <source src={(section as any).src} type="video/webm" />
              </video>

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 video-cinematic-overlay pointer-events-none"></div>

              <div
                className={`relative z-10 text-center px-6 transition-all duration-[1200ms] transform ${
                  activeIndex === i
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-20 opacity-0 scale-95'
                }`}
              >
                <div className="mb-6 overflow-hidden">
                  <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-black text-white/80 mb-4 animate-pulse drop-shadow-md">
                    {(section as any).subtitle}
                  </p>
                </div>
                <h2 className="text-4xl md:text-[8.5rem] font-black uppercase tracking-tighter text-white mb-10 md:mb-14 select-none leading-[0.8] drop-shadow-2xl">
                  {section.title}
                </h2>
                <div className="flex justify-center items-center">
                  <Link
                    to={(section as any).link}
                    className="action-btn-video min-w-[260px] md:min-w-[300px] hover:scale-105 transition-transform active:scale-95 shadow-2xl"
                  >
                    {(section as any).btnText}
                  </Link>
                </div>
              </div>

              <VideoControls
                isPlaying={isPlaying}
                isMuted={isMuted}
                onTogglePlay={togglePlay}
                onToggleMute={toggleMute}
                dark={true}
              />
            </section>
          );
        })}

        {/* Philosophy & Brands */}
        <section className="snap-section flex flex-col items-center justify-center bg-white px-6 md:px-8">
          <div
            className={`max-w-4xl text-center transition-all duration-1000 transform ${
              activeIndex === 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-8">
              The Future of Storytelling
            </p>
            <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-12 md:mb-16 text-black">
              Think Films is a professional media production house. We define the visual
              standards of tomorrow.
            </h3>

            {/* Brands Grid - Larger logos on mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100 mb-12 md:mb-16 overflow-hidden rounded-sm">
              {BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="bg-white flex items-center justify-center p-10 md:p-12 grayscale opacity-40 hover:opacity-100 transition-all duration-700 h-24 md:h-auto"
                >
                  <img src={brand.logo} alt={brand.name} className="max-h-8 md:max-h-10 w-auto object-contain" />
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity text-black"
            >
              The Philosophy
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="snap-section flex flex-col items-center justify-center bg-white px-8">
          <div
            className={`w-full text-center transition-all duration-1000 transform ${
              activeIndex === 5 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 text-black">
              Think <br /> Differently.
            </h2>
            <div className="flex justify-center items-center">
              <Link to="/contact" className="action-btn min-w-[260px] md:min-w-[280px]">
                INITIATE COMMISSION
              </Link>
            </div>
          </div>
        </section>

        {/* Footer Snap Section */}
        <section className="snap-section bg-white overflow-y-auto hide-scrollbar flex flex-col">
          <div className="flex-grow flex flex-col items-center justify-center px-8 border-b border-neutral-100">
            <p className="text-[9px] uppercase tracking-[0.8em] font-black text-neutral-300 mb-12">
              Global Production Network
            </p>
            <div className="flex space-x-12 md:space-x-48">
              {['India', 'UAE'].map((region) => (
                <div key={region} className="text-center">
                  <p className="text-base md:text-xl font-black uppercase tracking-tighter">
                    {region}
                  </p>
                  <p className="text-[8px] text-neutral-400 uppercase tracking-widest mt-2">
                    Active Hub
                  </p>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Home;