'use client';

import { useEffect, useRef, useState } from 'react';

type HlsClass = {
  new (): { 
    loadSource(src: string): void; 
    attachMedia(video: HTMLVideoElement): void;
    destroy(): void;
  };
  isSupported(): boolean;
};

type ArtInstance = { 
  switchUrl: (url: string) => void; 
  destroy?: () => void;
  video?: HTMLVideoElement;
};

interface VideoPlayerProps {
  videoUrl?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  volume?: number;
  theme?: string;
  showControls?: boolean;
  isJoin?: boolean;
  onJoinClick?: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
  className = '',
  autoPlay = false,
  muted = false,
  volume = 0.7,
  theme = '#0f1214',
  showControls = true,
  isJoin = false,
  onJoinClick,
}) => {
  const [ready, setReady] = useState(false);
  const playerRef = useRef<HTMLDivElement | null>(null);
  const artInstanceRef = useRef<ArtInstance | null>(null);
  
  // Debug logs
  console.log('VideoPlayer props:', { isJoin, onJoinClick, videoUrl });
  console.log('VideoPlayer state:', { ready });

  useEffect(() => {
    let destroyed = false;
    
    // Disable PIP mode globally
    if ('pictureInPictureEnabled' in document) {
      Object.defineProperty(document, 'pictureInPictureEnabled', {
        get: () => false,
        configurable: true
      });
    }
    
    async function setup() {
      try {
        const ArtMod = (await import("artplayer")) as unknown as { default: new (options: any) => ArtInstance };
        const HlsMod = (await import("hls.js")) as unknown as { default: HlsClass };
        const Artplayer = ArtMod.default;
        const Hls = HlsMod.default;

        if (!playerRef.current || destroyed) return;

        const art = new Artplayer({
          container: playerRef.current,
          url: videoUrl,
          autoplay: autoPlay,
          volume: volume,
          muted: muted,
          theme: theme,
          fullscreen: true,
          fullscreenWeb: false,
          pip: false,
          autoMini: false,
          lock: true,
          lang: "vi",
          disableContextMenu: true,
          controls: [
            {
              position: 'right',
              index: 20,
              html: '',
              click: () => {},
            },
          ],
          customType: {
            m3u8: function (video: HTMLVideoElement, url: string) {
              if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
              } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = url;
              } else {
                console.warn("HLS not supported in this browser");
              }
            },
          },
        } as unknown as Record<string, unknown>);

        // If src ends with .m3u8, hint ArtPlayer
        if (videoUrl.endsWith(".m3u8")) {
          art.switchUrl(videoUrl);
        }

        artInstanceRef.current = art;
        setReady(true);
        console.log('ArtPlayer setup successful, ready set to true');
        
        // Prevent PIP mode
        const video = art.video;
        if (video) {
          video.addEventListener('enterpictureinpicture', (e: Event) => {
            e.preventDefault();
            if (document.pictureInPictureElement) {
              document.exitPictureInPicture();
            }
          });
        }
      } catch (e) {
        console.error('ArtPlayer setup error:', e);
        // Fallback: set ready to true even if there's an error
        setReady(true);
        console.log('Fallback: ready set to true due to error');
      }
    }
    setup();
    
    // Fallback: set ready to true after a timeout if setup fails
    const timeoutId = setTimeout(() => {
      console.log('Timeout fallback: setting ready to true');
      setReady(true);
    }, 3000);
    
    return () => {
      destroyed = true;
      clearTimeout(timeoutId);
      artInstanceRef.current?.destroy?.();
    };
  }, [videoUrl, autoPlay, muted, volume, theme]);

  return (
    <div className={`relative overflow-hidden bg-black ${className}`}>
      <div className="aspect-video" ref={playerRef} />
      
      {/* Loading overlay */}
      {!ready && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="rounded-lg bg-black/60 px-3 py-2 text-sm text-white">
            Đang khởi tạo player…
          </div>
        </div>
      )}
      
      {/* Join overlay */}
      {isJoin && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <button
            onClick={onJoinClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            VÀO PHÒNG LIVE
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer; 