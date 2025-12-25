
import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  url: string;
  poster: string;
  title: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, poster, title, className = "" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 100);
  };

  return (
    <div className={`relative group overflow-hidden bg-neutral-100 aspect-video ${className}`}>
      {!isPlaying ? (
        <div className="absolute inset-0 z-10 cursor-pointer" onClick={handlePlay}>
          <img 
            src={poster} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
            loading="lazy"
          />
          {/* Subtle light overlay for the poster on white theme */}
          <div className="absolute inset-0 bg-white/10 group-hover:bg-black/20 transition-all duration-700"></div>
          
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100">
            <div className="w-16 h-16 border-[1.5px] border-white bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 text-white drop-shadow-lg">
            <p className="text-[9px] uppercase tracking-[0.3em] font-black opacity-90 mb-1">Click to play</p>
            <h3 className="text-xl font-black uppercase tracking-tighter">{title}</h3>
          </div>
        </div>
      ) : (
        <video 
          ref={videoRef}
          src={url} 
          controls 
          className="w-full h-full object-cover bg-black"
          autoPlay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
