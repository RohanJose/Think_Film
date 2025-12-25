
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
  <div className="absolute top-28 right-6 md:top-auto md:bottom-10 md:right-10 z-[80] flex items-center space-x-3">
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
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
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
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const scrollTo = (index: number) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  const videoSections = [
    {
      id: 'automotive',
      title: 'AUTOMOTIVE',
      subtitle: 'PRECISION IN MOTION',
      src: 'automative1.webm',
      poster: '/thumbnail.webp',
      link: '/automotive',
      btnText: 'EXPLORE AUTOMOTIVE',
    },
    {
      id: 'corporate',
      title: 'CORPORATE',
      subtitle: 'EDITORIAL LEADERSHIP',
      src: 'coperate1.webm',
      poster: '/thumbnail.webp',
      link: '/corporate',
      btnText: 'EXPLORE CORPORATE',
    },
    {
      id: 'concerts',
      title: 'CONCERTS',
      subtitle: 'LIVE ENERGY',
      src: 'concert1.webm',
      poster: '/thumbnail.webp',
      link: '/concerts',
      btnText: 'EXPLORE CONCERTS',
    },
  ];

  return (
    <main className="relative h-screen w-full bg-white">
      {/* Side Navigation Dots */}
      <div className="fixed left-6 md:left-12 top-1/2 -translate-y-1/2 z-[90] hidden md:flex flex-col space-y-6">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
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
        {/* 0. HERO SECTION */}
        <section 
          ref={(el) => { sectionRefs.current[0] = el; }}
          className="snap-section flex flex-col items-center justify-center bg-white relative"
        >
          <div
            className={`relative z-10 text-center px-6 transition-all duration-[1500ms] transform ${
              activeIndex === 0
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-10 opacity-0 scale-95'
            }`}
          >
            <div className="flex justify-center mb-2">
              <img
                src="/colored-logo.png"
                alt="Think Films"
                className="h-32 md:h-48 lg:h-56 w-auto select-none"  
              />
            </div>
            <p className="text-[10px] md:text-[11px] uppercase tracking-[1em] font-black text-black/40">
              MEDIA PRODUCTION HOUSE
            </p>
          </div>
          <div className="absolute bottom-10 left-8 md:left-12 flex flex-col items-start">
             <p className={`text-[9px] font-black uppercase tracking-[0.5em] text-black/10 transition-opacity duration-1000 ${activeIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                Think Differently.
             </p>
             <div className="w-8 h-[1.5px] bg-black/5 mt-2"></div>
          </div>
        </section>

        {/* 1, 2, 3. VIDEO SECTIONS */}
        {videoSections.map((section, idx) => {
          const i = idx + 1;
          return (
            <section
              key={section.id}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="snap-section flex items-end justify-center bg-black pb-24 md:pb-32"
            >
              <video
                ref={(el) => { videoRefs.current[i] = el; }}
                muted={isMuted}
                loop
                playsInline
                poster={section.poster}
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 video-breath"
              >
                <source src={section.src} type="video/webm" />
              </video>
              <div className="absolute inset-0 video-cinematic-overlay pointer-events-none"></div>
              <div
                className={`relative z-10 text-center px-6 transition-all duration-[1500ms] transform ${
                  activeIndex === i
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-20 opacity-0 scale-95'
                }`}
              >
                <p className="text-[10px] md:text-xs uppercase tracking-[0.6em] font-black text-white/80 mb-6 drop-shadow-md">
                  {section.subtitle}
                </p>
                <h2 className="text-4xl md:text-[8.5rem] font-black uppercase tracking-tighter text-white mb-10 md:mb-14 select-none leading-[0.8] drop-shadow-2xl">
                  {section.title}
                </h2>
                <div className="flex justify-center items-center">
                  <Link to={section.link} className="action-btn-video min-w-[260px] md:min-w-[300px]">
                    {section.btnText}
                  </Link>
                </div>
              </div>
              <VideoControls isPlaying={isPlaying} isMuted={isMuted} onTogglePlay={togglePlay} onToggleMute={toggleMute} />
            </section>
          );
        })}

        {/* 4. PHILOSOPHY & BRANDS */}
        <section 
          ref={(el) => { sectionRefs.current[4] = el; }}
          className="snap-section flex flex-col items-center justify-center bg-white px-6 md:px-8"
        >
          <div
            className={`max-w-4xl text-center transition-all duration-[1500ms] transform ${
              activeIndex === 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-8">
              The Future of Storytelling
            </p>
            <h3 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-16 text-black">
              Think Films is a professional media production house. We define the visual
              standards of tomorrow.
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100 mb-12 overflow-hidden rounded-sm">
              {BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="bg-white flex items-center justify-center p-10 md:p-14 grayscale opacity-40 hover:opacity-100 transition-all duration-700 h-28 md:h-36"
                >
                  <img src={brand.logo} alt={brand.name} className="max-h-8 md:max-h-12 w-auto object-contain" />
                </div>
              ))}
            </div>
            <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity text-black">
              The Philosophy
            </Link>
          </div>
        </section>

        {/* 5. GLOBAL PRODUCTION NETWORK - MINIMALIST VERSION */}
        <section 
          ref={(el) => { sectionRefs.current[5] = el; }}
          className="snap-section flex flex-col items-center justify-center bg-white px-8"
        >
          <div
            className={`w-full max-w-7xl text-center transition-all duration-[1500ms] transform ${
              activeIndex === 5 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.8em] font-black text-neutral-300 mb-16">
              Global Presence
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-40">
              <h4 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter hover:scale-105 transition-transform duration-700 cursor-default">India</h4>
              <div className="hidden md:block w-px h-24 bg-neutral-100"></div>
              <h4 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter hover:scale-105 transition-transform duration-700 cursor-default">UAE</h4>
            </div>
            <div className="mt-24">
              <Link to="/contact" className="action-btn min-w-[260px] md:min-w-[320px]">
                Initiate commission
              </Link>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA & FOOTER INTEGRATION */}
        <section 
          ref={(el) => { sectionRefs.current[6] = el; }}
          className="snap-section bg-white flex flex-col overflow-y-auto hide-scrollbar"
        >
          <div className="flex-grow flex flex-col items-center justify-center py-24 md:py-32 px-8">
            <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] text-black text-center">
              Think <br /> Differently.
            </h2>
          </div>
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Home;
