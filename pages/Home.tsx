import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../constants.tsx';
import Footer from '../components/Footer.tsx';

/* ---------------- VIDEO CONTROLS ---------------- */

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
  <div className="absolute bottom-8 left-6 md:left-12 z-[120] flex items-center gap-4">
    <button
      onClick={onTogglePlay}
      className={`w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md active:scale-90 transition ${
        dark
          ? 'border-white/20 bg-black/30 hover:bg-white'
          : 'border-black/10 bg-white/40 hover:bg-black'
      }`}
    >
      {isPlaying ? (
        <svg className={`w-4 h-4 ${dark ? 'text-white group-hover:text-black' : 'text-black'}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
        </svg>
      ) : (
        <svg className={`w-4 h-4 ml-1 ${dark ? 'text-white' : 'text-black'}`} viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
    </button>

    <button
      onClick={onToggleMute}
      className={`w-11 h-11 rounded-full border flex items-center justify-center backdrop-blur-md relative active:scale-90 transition ${
        dark
          ? 'border-white/20 bg-black/30 hover:bg-white'
          : 'border-black/10 bg-white/40 hover:bg-black'
      }`}
    >
      <svg className={`w-4 h-4 ${dark ? 'text-white' : 'text-black'}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 9v6h4l5 5V4L7 9H3z" />
      </svg>
      {isMuted && <span className="absolute w-[1px] h-6 rotate-45 bg-white" />}
    </button>
  </div>
);

/* ---------------- YOUTUBE EMBED ---------------- */

const YouTubeEmbed: React.FC<{ videoId: string; active: boolean; shouldPlay: boolean }> = ({
  videoId,
  active,
  shouldPlay,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!iframeRef.current || !active) return;
    iframeRef.current.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: shouldPlay ? 'playVideo' : 'pauseVideo',
        args: '',
      }),
      '*'
    );
  }, [shouldPlay, active]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: 'command',
        func: isMuted ? 'unMute' : 'mute',
        args: '',
      }),
      '*'
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-black rounded-lg">
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=${shouldPlay ? 1 : 0}&mute=1&controls=0&loop=1&playlist=${videoId}&enablejsapi=1&playsinline=1`}
        allow="autoplay; encrypted-media"
      />

      {/* Overlay (no pointer blocking) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none z-10" />

      {/* AUDIO CONTROL — FIXED VISIBILITY */}
      {active && (
        <button
          onClick={toggleMute}
          className="absolute bottom-4 right-4 z-[90] px-4 py-2 rounded-full bg-black/50 border border-white/20 backdrop-blur-md hover:bg-white hover:text-black transition"
        >
          <span className="text-[9px] font-bold tracking-widest uppercase">
            {isMuted ? 'Audio Off' : 'Audio On'}
          </span>
        </button>
      )}
    </div>
  );
};

/* ---------------- HOME ---------------- */

const Home: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = sectionRefs.current.indexOf(e.target as HTMLElement);
            if (i !== -1) setActiveIndex(i);
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionRefs.current.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const showcaseVideos = ['Jdk7xznnWhg', 'XFRclyarPMg', 'QOxAQP8Pskc'];

  return (
    <main className="h-screen w-full">
      <div ref={containerRef} className="snap-container h-full overflow-y-auto">

        {/* BRANDS — MOBILE DENSITY FIX */}
        <section
          ref={(el) => (sectionRefs.current[4] = el)}
          className="snap-section bg-white pt-24 px-4 md:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-neutral-100 border border-neutral-100">
            {BRANDS.slice(0, 8).map((brand, i) => (
              <div
                key={i}
                className="bg-white flex items-center justify-center p-4 md:p-8 grayscale opacity-40 hover:opacity-100 transition aspect-[4/3]"
              >
                <img src={brand.logo} alt={brand.name} className="max-h-12 md:max-h-10" />
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE — CONTROLS FIXED */}
        <section
          ref={(el) => (sectionRefs.current[5] = el)}
          className="snap-section bg-white pt-24 px-4"
        >
          <div className="flex gap-6 overflow-hidden">
            {showcaseVideos.map((id) => (
              <div key={id} className="w-full md:w-1/3 flex-shrink-0">
                <div className="aspect-[9/16]">
                  <YouTubeEmbed videoId={id} active={activeIndex === 5} shouldPlay />
                </div>
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
};

export default Home;
