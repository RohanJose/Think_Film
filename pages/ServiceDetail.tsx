import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { VIDEO_DATA } from '../constants.tsx';
import VideoPlayer from '../components/VideoPlayer.tsx';
import InstagramEmbed from '../components/InstagramEmbed.tsx';

interface ServiceDetailProps {
  category: 'Automotive' | 'Corporate' | 'Concerts';
  title: string;
  subtitle: string;
  description: string;
}

const INSTAGRAM_REELS: Record<ServiceDetailProps['category'], string[]> = {
  Automotive: [
    'https://www.instagram.com/p/DJY7ZfWz4r1/',
    'https://www.instagram.com/p/DLUfOuWSAyw/',
    'https://www.instagram.com/p/C4LXqB5Baor/',
  ],
  Corporate: [
    'https://www.instagram.com/p/C4CS2PaywMz/',
    'https://www.instagram.com/p/DG5Jw97yGqV/',
    'https://www.instagram.com/p/DG7cLCMyKFj/',
  ],
  Concerts: [
    'https://www.instagram.com/p/DQCZMBVkkea/',
    'https://www.instagram.com/p/DP8Jv2fgJ8R/',
    'https://www.instagram.com/p/DOEBrM1gJEi/',
  ],
};

const ServiceDetail: React.FC<ServiceDetailProps> = ({
  category,
  title,
  subtitle,
  description,
}) => {
  const filteredVideos = VIDEO_DATA.filter(v => v.category === category);
  const instagramReels = INSTAGRAM_REELS[category];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [category]);

  return (
    <main className="bg-white min-h-screen text-black">

      {/* 01. HERO SECTION */}
      <section className="relative h-[80vh] md:h-screen w-full flex flex-col items-center justify-center bg-white overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <p className="text-[10px] md:text-xs uppercase tracking-[1em] font-black text-neutral-400 mb-10">
            {subtitle}
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-[9rem] lg:text-[10rem] xl:text-[11rem] font-black uppercase tracking-tighter leading-[0.92] text-black select-none break-words text-center max-w-[95vw]">
            {title}
          </h1>

          <div className="mt-12 max-w-2xl">
            <p className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.35em] leading-[2.5] text-neutral-600 max-w-xl mx-auto">
              {description}
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-4">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-neutral-300">
            Scroll to Explore
          </span>
          <div className="w-[1px] h-12 bg-neutral-300"></div>
        </div>
      </section>

      {/* 02. MANIFESTO & CAPABILITIES */}
      <section className="py-24 md:py-48 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          <div className="lg:col-span-5 space-y-12">
            <h2 className="text-[10px] uppercase tracking-[0.6em] font-black text-neutral-300">
              Section / 01
            </h2>
            <p className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.95]">
              Cinematic <br /> Standards for <br /> {category} Brands.
            </p>
            <div className="w-16 h-1.5 bg-black"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-neutral-500 text-sm md:text-base leading-[2.2] tracking-widest uppercase font-medium mb-12">
              Our approach to {category.toLowerCase()} storytelling is clinical yet visceral.
              We bridge the gap between technical precision and emotional resonance.
              For {category === 'Automotive'
                ? 'luxury vehicle'
                : category === 'Corporate'
                ? 'enterprise'
                : 'global artists'} brands,
              the image is not just a recording—it&apos;s a statement of authority.
              <br /><br />
              Utilizing a bespoke color pipeline and specialized tracking equipment,
              we ensure every frame carries the weight of a premium feature film.
            </p>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-neutral-100">
              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6">
                  Equipment
                </h4>
                <ul className="text-[9px] text-neutral-400 space-y-4 uppercase tracking-[0.25em] font-bold">
                  <li>— Arri Alexa 35 Pipeline</li>
                  <li>— Bolt Cinebot Motion</li>
                  <li>— Russian Arm Tracking</li>
                  <li>— Custom Lens Arrays</li>
                </ul>
              </div>

              <div>
                <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-6">
                  Output
                </h4>
                <ul className="text-[9px] text-neutral-400 space-y-4 uppercase tracking-[0.25em] font-bold">
                  <li>— Dolby Vision HDR</li>
                  <li>— DCP Cinema Master</li>
                  <li>— Social Optimized Cuts</li>
                  <li>— TVC Standards</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. SOCIAL NARRATIVE */}
      <section className="py-24 md:py-32 bg-white text-black px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] text-neutral-400 mb-4">
                Content Vertical
              </p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                Social Narrative
              </h2>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mt-6 md:mt-0">
              Short-Form Impact
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            {instagramReels.map((url, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-0 shadow-none transition-transform duration-700 hover:-translate-y-2"
              >
                <InstagramEmbed url={url} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="flex items-center justify-center space-x-6">
              <span className="w-12 h-[1px] bg-black/10" />
              <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-neutral-400">
                Optimized for Instagram / TikTok / Shorts
              </p>
              <span className="w-12 h-[1px] bg-black/10" />
            </div>
          </div>
        </div>
      </section>

      {/* 05. MAIN FILM GRID (Archive) */}
      <section className="py-24 px-6 md:px-12 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-neutral-100 pb-12">
            <div>
              <h3 className="text-[10px] uppercase tracking-[0.6em] font-black text-neutral-300 mb-4">
                Selected Works
              </h3>
              <h2 className="text-5xl md:text-[6rem] font-black uppercase tracking-tighter leading-none">
                The Archive.
              </h2>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-neutral-400 mt-4 md:mt-0">
              Filtered / {category}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            {filteredVideos.map(video => (
              <div key={video.id}>
                <div className="relative mb-6 border border-neutral-100 p-2 bg-white shadow-sm transition-transform duration-500 hover:scale-[1.03]">
                  <VideoPlayer
                    url={video.videoUrl}
                    poster={video.thumbnail}
                    title={video.title}
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-[10px] font-black text-neutral-200">
                      00{video.id}
                    </span>
                    <h5 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">
                      {video.title}
                    </h5>
                  </div>
                  <p className="text-xs text-neutral-400 uppercase tracking-[0.25em] font-bold leading-loose max-w-md">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06. CALL TO ACTION */}
      <section className="py-24 md:py-32 bg-black text-white flex flex-col items-center text-center px-6">
        <span className="text-[10px] uppercase tracking-[0.8em] font-black text-white/30 mb-12">
          New Briefs
        </span>
        <h3 className="text-6xl md:text-[12rem] font-black uppercase tracking-tighter mb-24 leading-[0.8]">
          Elevate Your <br /> Image.
        </h3>
        <Link
          to="/contact"
          className="action-btn-video min-w-[300px] md:min-w-[340px]"
        >
          Initiate Commission
        </Link>
      </section>

    </main>
  );
};

export default ServiceDetail;
