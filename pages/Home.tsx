
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
  <div className="absolute top-28 md:top-auto md:bottom-10 left-6 md:left-12 z-[120] flex items-center space-x-4">
    <button
      onClick={onTogglePlay}
      className={`w-12 h-12 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all group backdrop-blur-md active:scale-90 ${
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
      className={`w-12 h-12 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all group relative backdrop-blur-md active:scale-90 ${
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

const YouTubeEmbed: React.FC<{ videoId: string; active: boolean; shouldPlay: boolean }> = ({ videoId, active, shouldPlay }) => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && active) {
      const command = shouldPlay ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
    }
  }, [shouldPlay, active]);

  const toggleMute = () => {
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    
    if (iframeRef.current) {
      const command = newMuteState ? 'mute' : 'unMute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black group rounded-lg shadow-2xl">
      {active ? (
        <div className="absolute inset-0">
          <iframe
            ref={iframeRef}
            className="absolute inset-x-0 top-[-10%] h-[120%] w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${shouldPlay ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
            title="Shorts player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>
      ) : (
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
          style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
        />
      )}
      
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-black/60 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-black/40 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-0 z-20 transition-colors duration-700 bg-black/20 group-hover:bg-transparent pointer-events-none"></div>

      {active && shouldPlay && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleMute();
          }}
          className="absolute bottom-6 right-6 z-[40] flex items-center space-x-3 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 transition-all hover:bg-white hover:border-white group/mute active:scale-95"
          title={isMuted ? "Unmute" : "Mute"}
        >
          <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${isMuted ? 'text-white group-hover/mute:text-black' : 'text-white group-hover/mute:text-black'}`}>
            {isMuted ? 'Audio Off' : 'Audio On'}
          </span>
          <svg
            className={`w-3.5 h-3.5 transition-colors ${isMuted ? 'text-white group-hover/mute:text-black' : 'text-white group-hover/mute:text-black'}`}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            {isMuted ? (
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            ) : (
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
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

  const showcaseVideos = [
    'Jdk7xznnWhg', 
    'XFRclyarPMg',
    'QOxAQP8Pskc',  
    's0ztwLgwSTQ', 
    'dPznKuQftNc', 
    'u9CzZL7WNsk'
  ];

  const nextSlide = () => {
    const itemsPerPage = window.innerWidth < 768 ? 1 : 3;
    if (carouselIndex < showcaseVideos.length - itemsPerPage) {
      setCarouselIndex(prev => prev + 1);
    } else {
      setCarouselIndex(0);
    }
  };

  const prevSlide = () => {
    if (carouselIndex > 0) {
      setCarouselIndex(prev => prev - 1);
    } else {
      const itemsPerPage = window.innerWidth < 768 ? 1 : 3;
      setCarouselIndex(showcaseVideos.length - itemsPerPage);
    }
  };

  return (
    <main className="relative h-screen w-full bg-white">
      {/* Side Navigation Dots */}
      <div className={`fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-[150] hidden md:flex flex-col space-y-4 transition-all duration-700 ${activeIndex === 5 ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              scrollTo(i);
            }}
            className="group relative flex items-center justify-center w-10 h-10 transition-transform active:scale-90"
            aria-label={`Go to section ${i + 1}`}
          >
            <div
              className={`transition-all duration-700 rounded-full border-2 ${
                activeIndex === i
                  ? (activeIndex === 0 || activeIndex >= 4)
                    ? 'w-3 h-3 bg-black border-black ring-4 ring-black/10'
                    : 'w-3 h-3 bg-white border-white ring-4 ring-white/20'
                  : (activeIndex === 0 || activeIndex >= 4)
                  ? 'w-1.5 h-1.5 bg-black/20 border-transparent group-hover:bg-black/80'
                  : 'w-1.5 h-1.5 bg-white/40 border-transparent group-hover:bg-white'
              }`}
            ></div>
            <span className={`absolute right-12 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap ${(activeIndex === 0 || activeIndex >= 4) ? 'text-black' : 'text-white'}`}>
              0{i + 1}
            </span>
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
            className={`relative z-10 text-center px-4 transition-all duration-[1500ms] transform ${
              activeIndex === 0
                ? 'translate-y-0 opacity-100 scale-100'
                : 'translate-y-10 opacity-0 scale-95'
            }`}
          >
            <div className="flex justify-center mb-8 md:mb-12">
              <img
                src="/colored-logo.png"
                alt="Think Films"
                className="h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[70vh] w-auto max-w-[90vw] select-none transition-transform duration-1000 object-contain"  
              />
            </div>
            <p className="text-[10px] sm:text-[12px] md:text-[14px] uppercase tracking-[1em] sm:tracking-[1.5em] font-black text-black/40">
              MEDIA PRODUCTION HOUSE
            </p>
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
          className="snap-section flex flex-col items-center justify-center bg-white px-6 md:px-8 py-12"
        >
          <div
            className={`max-w-6xl w-full text-center transition-all duration-[1500ms] transform h-full flex flex-col justify-center ${
              activeIndex === 4 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-6">
              The Future of Storytelling
            </p>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-8 md:mb-12 text-black">
              Think Films is a professional media production house. We define the visual
              standards of tomorrow.
            </h3>
            
            {/* Improved Brand Scroll for Mobile */}
            <div className="flex md:grid md:grid-cols-4 lg:grid-cols-5 gap-px bg-neutral-100 border border-neutral-100 mb-8 md:mb-12 overflow-x-auto md:overflow-hidden hide-scrollbar snap-x snap-mandatory">
              {BRANDS.map((brand, i) => (
                <div
                  key={i}
                  className="bg-white flex-shrink-0 w-[60vw] sm:w-[30vw] md:w-auto flex items-center justify-center p-8 md:p-8 grayscale opacity-40 hover:opacity-100 transition-all duration-700 aspect-[16/9] sm:aspect-auto sm:h-24 md:h-32 snap-center"
                >
                  <img src={brand.logo} alt={brand.name} className="max-h-8 md:max-h-8 w-auto object-contain" />
                </div>
              ))}
            </div>
            
            <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 transition-opacity text-black inline-block mx-auto">
              The Philosophy
            </Link>
          </div>
        </section>

        {/* 5. FEATURED WORKS */}
        <section 
          ref={(el) => { sectionRefs.current[5] = el; }}
          className="snap-section flex flex-col justify-center bg-white overflow-hidden relative"
        >
          <div className="w-full px-8 md:px-12 mb-8">
            <div className={`transition-all duration-1000 ${activeIndex === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-neutral-300 mb-4">Vertical Showcase</p>
              <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Motion Gallery.</h4>
            </div>
          </div>
          
          <div className="relative w-full px-4 md:px-8 max-w-[1600px] mx-auto">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 md:left-2 z-[60]">
               <button onClick={prevSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center bg-white/90 backdrop-blur-md hover:bg-black hover:text-white transition-all duration-500 group shadow-xl active:scale-90">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
               </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 md:right-2 z-[60]">
               <button onClick={nextSlide} className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-black/10 flex items-center justify-center bg-white/90 backdrop-blur-md hover:bg-black hover:text-white transition-all duration-500 group shadow-xl active:scale-90">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>

            <div className={`w-full overflow-hidden transition-all duration-[1500ms] ${activeIndex === 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
              <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transform: `translateX(-${carouselIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%)` }}
              >
                {showcaseVideos.map((id, idx) => {
                  const isMobile = window.innerWidth < 768;
                  const itemsPerPage = isMobile ? 1 : 3;
                  
                  // On Desktop: Play all together when section is active.
                  // On Mobile: Play only the centered/visible one.
                  const isVisible = idx >= carouselIndex && idx < carouselIndex + itemsPerPage;
                  const shouldPlay = (isMobile ? isVisible : true) && activeIndex === 5;
                  
                  return (
                    <div key={id} className="w-full md:w-1/3 flex-shrink-0 px-4 md:px-8">
                      <div className="relative aspect-[9/16] group overflow-hidden bg-black rounded-lg scale-[0.98] transition-transform duration-700 hover:scale-[1.01]">
                        <YouTubeEmbed videoId={id} active={activeIndex === 5} shouldPlay={shouldPlay} />
                        <div className="absolute bottom-6 left-6 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                          <span className="text-[9px] font-black text-white uppercase tracking-[0.4em]">Archive / 0{idx + 1}</span>
                          <h5 className="text-lg text-white font-black uppercase tracking-tighter mt-1">Short Film</h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* Global controls hidden on mobile for Gallery as requested */}
          <div className="hidden md:block">
            <VideoControls isPlaying={isPlaying} isMuted={isMuted} onTogglePlay={togglePlay} onToggleMute={toggleMute} dark={activeIndex === 5} />
          </div>
        </section>

        {/* 6. GLOBAL PRODUCTION NETWORK */}
        <section 
          ref={(el) => { sectionRefs.current[6] = el; }}
          className="snap-section flex flex-col items-center justify-center bg-white px-8"
        >
          <div className={`w-full max-w-7xl text-center transition-all duration-[1500ms] transform ${activeIndex === 6 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-[10px] uppercase tracking-[0.8em] font-black text-neutral-300 mb-16">Global Presence</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-40">
              <h4 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter text-black">India</h4>
              <div className="hidden md:block w-px h-24 bg-neutral-100"></div>
              <h4 className="text-6xl md:text-[8rem] font-black uppercase tracking-tighter text-black">UAE</h4>
            </div>
            <div className="mt-24">
              <Link to="/contact" className="action-btn min-w-[260px] md:min-w-[320px]">Initiate commission</Link>
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA & FOOTER */}
        <section 
          ref={(el) => { sectionRefs.current[7] = el; }}
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
