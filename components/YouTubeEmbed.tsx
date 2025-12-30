
import React, { useEffect, useRef, useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  active: boolean;
  shouldPlay: boolean;
  index: number;
  isHero?: boolean;
  isMuted?: boolean;
  title?: string;
  aspectRatio?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  active, 
  shouldPlay, 
  index, 
  isHero = false, 
  isMuted: externalMute = true,
  title: customTitle,
  aspectRatio = "aspect-[9/16]"
}) => {
  const [localMute, setLocalMute] = useState(true);
  const [isPlayingLocally, setIsPlayingLocally] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const effectiveMute = isHero ? externalMute : localMute;

  const postCommand = (func: string, args: any = '') => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  useEffect(() => {
    if (active && isReady) {
      const timer = setTimeout(() => {
        if (shouldPlay && isPlayingLocally) {
          postCommand('playVideo');
        } else {
          postCommand('pauseVideo');
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [shouldPlay, active, isPlayingLocally, isReady]);

  useEffect(() => {
    if (active && isReady) {
      if (effectiveMute) {
        postCommand('mute');
      } else {
        postCommand('unMute');
        postCommand('setVolume', [100]);
        postCommand('playVideo');
      }
    }
  }, [effectiveMute, active, isReady]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-black group shadow-2xl ${isHero ? '' : 'rounded-xl'}`}>
      <div className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${isHero ? 'video-breath' : 'scale-[1.25] -top-[12%] -left-[12%] w-[124%] h-[124%]'}`}>
        {active ? (
          <div className={isHero ? "absolute top-1/2 left-1/2 w-[300vw] h-[300vh] md:w-[150vw] md:h-[150vh] -translate-x-1/2 -translate-y-1/2" : "absolute inset-0 w-full h-full"}>
            <iframe
              ref={iframeRef}
              tabIndex={-1}
              onLoad={() => {
                setIsReady(true);
                postCommand('playVideo');
              }}
              className="absolute inset-0 w-full h-full object-cover"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&enablejsapi=1&playsinline=1&origin=${window.location.origin}`}
              title={customTitle || (isHero ? `Hero Video` : `Archive Video ${index + 1}`)}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)` }}
          />
        )}
      </div>

      <div className={`absolute inset-0 z-10 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none ${isHero ? 'video-cinematic-overlay opacity-90' : 'opacity-95'}`}></div>

      {!isHero && (
        <div className="absolute inset-0 z-20 p-6 md:p-10 flex flex-col justify-end">
          <div className="flex flex-col space-y-8 w-full">
            <div className="flex items-center space-x-3 pointer-events-auto">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsPlayingLocally(!isPlayingLocally);
                }} 
                className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white active:scale-95 transition-all hover:bg-white hover:text-black shadow-2xl"
              >
                {isPlayingLocally ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                ) : (
                  <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                )}
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setLocalMute(!localMute);
                }} 
                className={`w-14 h-14 rounded-full backdrop-blur-2xl border flex items-center justify-center transition-all active:scale-95 shadow-2xl ${!localMute ? 'bg-blue-600 border-blue-400 text-white' : 'bg-black/60 border-white/10 text-white hover:bg-white hover:text-black'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {!localMute ? (
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  ) : (
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z" />
                  )}
                </svg>
              </button>
            </div>
            <div className="text-white text-left pointer-events-none">
              <p className="text-[10px] font-black uppercase tracking-[0.6em] mb-1 opacity-100">Showcase / 0{index + 1}</p>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">{customTitle || 'Cinematic'}</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeEmbed;
