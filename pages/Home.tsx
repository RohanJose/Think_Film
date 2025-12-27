
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
        <svg className={`w-4 h-4 ${dark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        <svg className={`w-4 h-4 ml-1 ${dark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} fill="currentColor" viewBox="0 0 24 24">
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
      <svg className={`w-4 h-4 ${dark ? 'text-white group-hover:text-black' : 'text-black group-hover:text-white'}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
      </svg>
      {isMuted && (
        <div className={`absolute w-[1px] h-6 rotate-45 pointer-events-none ${dark ? 'bg-white group-hover:bg-black' : 'bg-black group-hover:bg-white'}`}></div>
      )}
    </button>
  </div>
);

const YouTubeEmbed: React.FC<{ videoId: string; active: boolean; shouldPlay: boolean; index: number }> = ({ videoId, active, shouldPlay, index }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlayingLocally, setIsPlayingLocally] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current && active) {
      const command = (shouldPlay && isPlayingLocally) ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
    }
  }, [shouldPlay, active, isPlayingLocally]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
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

  const togglePlayLocal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlayingLocally(!isPlayingLocally);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black group rounded-xl shadow-2xl">
      {/* 
          MASKING WRAPPER:
          Aggressively hide the YouTube logo and title bar by scaling the iframe.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden scale-[1.25] -top-[12%] -left-[12%] w-[124%] h-[124%]">
        {active ? (
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=${shouldPlay ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
            title={`Archive Video ${index + 1}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
          />
        )}
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-95"></div>

      {/* CUSTOM UI OVERLAYS */}
      <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end">
        <div className="flex flex-col space-y-8 w-full">
          {/* Dual Circular Controls (Play & Audio next to each other) */}
          <div className="flex items-center space-x-3 pointer-events-auto">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlayLocal} 
              className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white active:scale-90 transition-all hover:bg-white hover:text-black shadow-2xl"
            >
              {isPlayingLocally ? (
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              ) : (
                <svg className="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              )}
            </button>
            
            {/* Audio Toggle Button (Circular style matching Play button) */}
            <button 
              onClick={toggleMute} 
              className={`w-12 h-12 rounded-full backdrop-blur-2xl border flex items-center justify-center transition-all active:scale-90 shadow-2xl ${
                !isMuted 
                  ? 'bg-blue-600 border-blue-400 text-white' 
                  : 'bg-black/60 border-white/10 text-white hover:bg-white hover:text-black'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                {isMuted ? (
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z" />
                ) : (
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                )}
              </svg>
            </button>
          </div>

          {/* Typography Overlay */}
          <div className="text-white text-left pointer-events-none">
            <p className="text-[10px] font-black uppercase tracking-[0.6em] mb-1 opacity-100">Archive / 0{index + 1}</p>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Shorts</h3>
          </div>
        </div>
      </div>
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
        if (pendingPromise) { try { await pendingPromise; } catch (e) {} }
        video.pause();
      }
    }
  };

  useEffect(() => {
    videoRefs.current.forEach((_, i) => handleVideoPlayback(i, i === activeIndex));
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
          if (index !== -1) setActiveIndex(index);
        }
      });
    }, { root: containerRef.current, threshold: 0.5 });
    sectionRefs.current.forEach((section) => { if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  const scrollTo = (index: number) => {
    containerRef.current?.scrollTo({ top: index * window.innerHeight, behavior: 'smooth' });
  };

  const videoSections = [
    { id: 'automotive', title: 'AUTOMOTIVE', subtitle: 'PRECISION IN MOTION', src: 'automative1.webm', link: '/automotive', btnText: 'EXPLORE AUTOMOTIVE' },
    { id: 'corporate', title: 'CORPORATE', subtitle: 'EDITORIAL LEADERSHIP', src: 'coperate1.webm', link: '/corporate', btnText: 'EXPLORE CORPORATE' },
    { id: 'concerts', title: 'CONCERTS', subtitle: 'LIVE ENERGY', src: 'concert1.webm', link: '/concerts', btnText: 'EXPLORE CONCERTS' },
  ];

  const showcaseVideos = ['Jdk7xznnWhg', 'XFRclyarPMg', 'QOxAQP8Pskc', 's0ztwLgwSTQ', 'dPznKuQftNc', 'u9CzZL7WNsk'];

  const nextSlide = () => {
    const itemsPerPage = window.innerWidth < 768 ? 1 : 3;
    setCarouselIndex(prev => (prev < showcaseVideos.length - itemsPerPage ? prev + 1 : 0));
  };

  const prevSlide = () => {
    const itemsPerPage = window.innerWidth < 768 ? 1 : 3;
    setCarouselIndex(prev => (prev > 0 ? prev - 1 : showcaseVideos.length - itemsPerPage));
  };

  return (
    <main className="relative h-screen w-full bg-white">
      {/* Side Navigation Dots */}
      <div className={`fixed right-8 md:right-12 top-1/2 -translate-y-1/2 z-[150] hidden md:flex flex-col space-y-4 transition-all duration-700 ${activeIndex === 5 ? 'opacity-0 scale-90' : 'opacity-100'}`}>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <button key={i} onClick={() => scrollTo(i)} className="group relative flex items-center justify-center w-10 h-10 active:scale-90">
            <div className={`transition-all duration-700 rounded-full border-2 ${activeIndex === i ? (activeIndex === 0 || activeIndex >= 4 ? 'w-3 h-3 bg-black border-black' : 'w-3 h-3 bg-white border-white') : (activeIndex === 0 || activeIndex >= 4 ? 'w-1.5 h-1.5 bg-black/20' : 'w-1.5 h-1.5 bg-white/40')}`}></div>
          </button>
        ))}
      </div>

      <div ref={containerRef} className="snap-container hide-scrollbar h-full w-full overflow-y-auto">
        {/* 0. HERO */}
        <section ref={(el) => { sectionRefs.current[0] = el; }} className="snap-section flex flex-col items-center justify-center bg-white">
          <div className={`text-center transition-all duration-[1500ms] ${activeIndex === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <img src="/colored-logo.png" alt="Think Films" className="h-[45vh] sm:h-[60vh] mx-auto object-contain mb-8" />
            <p className="text-[10px] uppercase tracking-[1em] font-black text-black/40">MEDIA PRODUCTION HOUSE</p>
          </div>
        </section>

        {/* 1, 2, 3. VIDEOS */}
        {videoSections.map((section, idx) => {
          const i = idx + 1;
          return (
            <section key={section.id} ref={(el) => { sectionRefs.current[i] = el; }} className="snap-section flex items-end justify-center bg-black pb-24 md:pb-32">
              <video ref={(el) => { videoRefs.current[i] = el; }} muted={isMuted} loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover video-breath">
                <source src={section.src} type="video/webm" />
              </video>
              <div className="absolute inset-0 video-cinematic-overlay pointer-events-none"></div>
              <div className={`relative z-10 text-center transition-all duration-[1500ms] ${activeIndex === i ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <p className="text-[10px] uppercase tracking-[0.6em] font-black text-white/80 mb-6">{section.subtitle}</p>
                <h2 className="text-4xl md:text-[8rem] font-black uppercase tracking-tighter text-white mb-10 leading-none">{section.title}</h2>
                <Link to={section.link} className="action-btn-video min-w-[260px] md:min-w-[300px]">{section.btnText}</Link>
              </div>
              <VideoControls isPlaying={isPlaying} isMuted={isMuted} onTogglePlay={togglePlay} onToggleMute={toggleMute} />
            </section>
          );
        })}

        {/* 4. PHILOSOPHY & BRANDS */}
        <section ref={(el) => { sectionRefs.current[4] = el; }} className="snap-section flex flex-col items-center justify-start pt-24 md:pt-40 bg-white px-6 md:px-8">
          <div className={`max-w-6xl w-full text-center transition-all duration-[1500ms] ${activeIndex === 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mb-4">Core Identity</p>
            <h3 className="text-lg md:text-3xl font-black uppercase tracking-tighter leading-tight mb-8 text-black">We define the visual standards of tomorrow.</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100 mb-8">
              {BRANDS.slice(0, 8).map((brand, i) => (
                <div key={i} className="bg-white flex items-center justify-center p-8 grayscale opacity-40 hover:opacity-100 transition-all duration-700 aspect-[16/9] md:h-40">
                  <img src={brand.logo} alt={brand.name} className="max-h-8 md:max-h-10 w-auto object-contain" />
                </div>
              ))}
            </div>
            <Link to="/about" className="text-[11px] font-bold uppercase tracking-[0.2em] border-b border-black pb-1 hover:opacity-50 text-black">Learn More</Link>
          </div>
        </section>

        {/* 5. ARCHIVE */}
        <section ref={(el) => { sectionRefs.current[5] = el; }} className="snap-section flex flex-col bg-white overflow-hidden relative">
          <div className="absolute top-24 md:top-32 left-8 md:left-12 z-0">
            <div className={`transition-all duration-1000 ${activeIndex === 5 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h4 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter text-black/5 mix-blend-multiply pointer-events-none select-none">Archive.</h4>
            </div>
          </div>
          
          <div className="relative w-full h-full flex items-center justify-center px-4 md:px-8 max-w-[1600px] mx-auto z-10 pt-16">
            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-[100]">
               <button onClick={prevSlide} className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-black/5 flex items-center justify-center bg-white/80 backdrop-blur-xl shadow-2xl active:scale-90 transition-all hover:bg-black hover:text-white group">
                 <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
               </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-[100]">
               <button onClick={nextSlide} className="w-12 h-12 md:w-20 md:h-20 rounded-full border border-black/5 flex items-center justify-center bg-white/80 backdrop-blur-xl shadow-2xl active:scale-90 transition-all hover:bg-black hover:text-white group">
                 <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
               </button>
            </div>

            <div className={`w-full overflow-hidden transition-all duration-[1500ms] ${activeIndex === 5 ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
              <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transform: `translateX(-${carouselIndex * (100 / (window.innerWidth < 768 ? 1 : 3))}%)` }}
              >
                {showcaseVideos.map((id, idx) => (
                  <div key={id} className="w-full md:w-1/3 flex-shrink-0 px-4 md:px-8">
                    <div className="relative aspect-[9/16] group overflow-hidden bg-black rounded-xl transition-all duration-700 hover:scale-[1.02] shadow-2xl border border-neutral-100">
                      <YouTubeEmbed videoId={id} active={activeIndex === 5} shouldPlay={(window.innerWidth < 768 ? idx === carouselIndex : true) && activeIndex === 5} index={idx} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 6. GLOBAL NETWORK */}
        <section ref={(el) => { sectionRefs.current[6] = el; }} className="snap-section flex flex-col items-center justify-center bg-white px-8">
          <div className={`w-full max-w-7xl text-center transition-all duration-[1500ms] ${activeIndex === 6 ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <p className="text-[10px] uppercase tracking-[0.8em] font-black text-neutral-300 mb-8">Global Reach</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-40">
              <h4 className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-black">India</h4>
              <div className="hidden md:block w-px h-24 bg-neutral-100"></div>
              <h4 className="text-5xl md:text-[8rem] font-black uppercase tracking-tighter text-black">UAE</h4>
            </div>
            <Link to="/contact" className="action-btn min-w-[260px] md:min-w-[320px] mt-12">Initiate Commission</Link>
          </div>
        </section>

        {/* 7. FOOTER */}
        <section ref={(el) => { sectionRefs.current[7] = el; }} className="snap-section bg-white flex flex-col overflow-y-auto hide-scrollbar">
          <div className="flex-grow flex flex-col items-center justify-center py-20 px-8">
            <h2 className="text-5xl md:text-[10rem] font-black uppercase tracking-tighter leading-none text-black text-center">Think <br /> Differently.</h2>
          </div>
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Home;
