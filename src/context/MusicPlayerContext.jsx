import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  fallbackMusicTracks,
  fetchYouTubeMusicTracks,
  getYouTubeEmbedUrl,
} from "../data/music";

const MusicPlayerContext = createContext(null);

function isValidYouTubeVideoId(value) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{11}$/.test(value.trim());
}

export function MusicPlayerProvider({ children }) {
  const iframeRef = useRef(null);
  const [tracks, setTracks] = useState(fallbackMusicTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(210);
  const [volume, setVolumeState] = useState(0.7);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchYouTubeMusicTracks().then((youtubeTracks) => {
      if (isMounted) {
        setTracks(
          youtubeTracks.map((track, index) => ({
            ...track,
            duration: track.duration || 210 + (index % 3) * 20,
          }))
        );
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const currentTrack = tracks[currentTrackIndex] ?? tracks[0];
  const hasValidVideo = isValidYouTubeVideoId(currentTrack?.videoId);

  useEffect(() => {
    if (!iframeRef.current || !hasValidVideo) {
      return;
    }

    const iframeUrl = getYouTubeEmbedUrl(currentTrack.videoId, isPlaying);
    iframeRef.current.src = iframeUrl;
  }, [currentTrack.videoId, hasValidVideo, isPlaying]);

  useEffect(() => {
    const safeDuration = Number(currentTrack.duration) || 210;
    setDuration(safeDuration);
    setCurrentTime(0);
  }, [currentTrackIndex, currentTrack.duration]);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = window.setInterval(() => {
      setCurrentTime((prev) => {
        const next = prev + 1;

        if (next >= duration) {
          setCurrentTrackIndex((trackIndex) => (trackIndex + 1) % tracks.length);
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isPlaying, duration, tracks.length]);

  const play = () => {
    if (!hasValidVideo) {
      setIsPlaying(true);
      return;
    }

    setIsPlaying(true);
    if (iframeRef.current) {
      iframeRef.current.src = getYouTubeEmbedUrl(currentTrack.videoId, true);
    }
  };

  const pause = () => {
    setIsPlaying(false);
    if (iframeRef.current && hasValidVideo) {
      iframeRef.current.src = getYouTubeEmbedUrl(currentTrack.videoId, false);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      pause();
      return;
    }

    play();
  };

  const next = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
  };

  const previous = () => {
    if (currentTime > 5) {
      setCurrentTime(0);
      return;
    }

    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const seek = (value) => {
    setCurrentTime(Number(value));
  };

  const setVolume = (value) => {
    const nextValue = Math.min(1, Math.max(0, Number(value)));
    setVolumeState(nextValue);
  };

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      tracks,
      currentTrack,
      currentTrackIndex,
      isPlaying,
      currentTime,
      duration,
      volume,
      isExpanded,
      iframeRef,
      play,
      pause,
      togglePlay,
      next,
      previous,
      seek,
      setVolume,
      toggleExpanded,
    }),
    [tracks, currentTrack, currentTrackIndex, isPlaying, currentTime, duration, volume, isExpanded]
  );

  return (
    <MusicPlayerContext.Provider value={value}>
      {children}
      <iframe
        ref={iframeRef}
        title={currentTrack?.title || "Music player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen={false}
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);

  if (!context) {
    throw new Error("useMusicPlayer must be used inside MusicPlayerProvider");
  }

  return context;
}
