import { useMusicPlayer } from "../../context/MusicPlayerContext";

function formatTitle(title) {
  return title || "दिल दीवाना";
}

export default function MusicPlayerCollapsed() {
  const { currentTrack, isPlaying, volume, setVolume, togglePlay, next, toggleExpanded } = useMusicPlayer();

  const handleVolumeToggle = () => {
    if (volume > 0) {
      setVolume(0);
      return;
    }

    setVolume(0.7);
  };

  return (
    <div className="flex w-full items-center gap-1.5 rounded-full border border-[#372a80]/60 bg-[#372a80]/80 px-2 py-1.5 shadow-[0_16px_40px_rgba(15,8,7,0.42)] backdrop-blur-xl sm:gap-2 sm:px-3 sm:py-2">
      <button
        type="button"
        aria-label={isPlaying ? "Pause" : "Play"}
        onClick={togglePlay}
        className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#f5d6bc]/15 bg-[#1a1513] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-200 hover:scale-105 active:scale-95 sm:h-10 sm:w-10"
      >
        <img
          src="/disc.png"
          alt="Music disc"
          className={`h-full w-full object-cover transition-transform duration-700 ease-linear ${
            isPlaying ? "animate-[spin_4s_linear_infinite]" : "animate-none"
          }`}
        />

        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#120d0b]/20">
          {isPlaying ? (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-[#f7efe8]" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="ml-0.5 h-3.5 w-3.5 fill-[#f7efe8]" aria-hidden="true">
              <path d="M8 5.5v13l10-6.5-10-6.5Z" />
            </svg>
          )}
        </span>
      </button>

      <div className="min-w-0 flex-1 text-left">
        <p className="marathi-title truncate text-[11px] leading-none text-[#f9efe8] sm:text-sm">
          {formatTitle(currentTrack.title)}
        </p>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-[#f5d6bc]/10 bg-[#2a1c19]/80 px-1.5 py-1 sm:gap-2 sm:px-2">
        <button
          type="button"
          aria-label={volume > 0 ? "Mute volume" : "Unmute volume"}
          onClick={handleVolumeToggle}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#f3e2d3] transition hover:bg-[#332521]"
        >
          {volume === 0 ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M16.5 12c0-1.2-.4-2.3-1.2-3.2L14 10.2A4.2 4.2 0 0 1 16.5 12Zm-3.8-7.5L9 7H5v10h4l3.7 2.5v-2.1L10.5 17H6V7h4.5l2.2-1.5v-1Zm4.1 15.1L3.5 4.4l1.4-1.4 14.3 14.3-1.4 1.4Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
              <path d="M5 9h4l5-4v14l-5-4H5V9Zm11 3a4 4 0 0 0-2.5-3.7v7.4A4 4 0 0 0 16 12Zm0-9.2v2.2A7.1 7.1 0 0 1 21 12a7.1 7.1 0 0 1-5 6.9v2.2A9.3 9.3 0 0 0 23 12 9.3 9.3 0 0 0 16 2.8Z" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(event) => setVolume(event.target.value)}
          aria-label="Volume"
          className="h-1.5 w-14 accent-[#f5d6bc] sm:w-20"
        />
      </div>

      <button
        type="button"
        aria-label="Next track"
        onClick={next}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f5d6bc]/15 bg-[#2a1c19]/90 text-[#f3e2d3] transition hover:bg-[#332521] sm:h-8 sm:w-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="M6 5h2v14H6V5Zm10.5 2.5L12 12l4.5 4.5V7.5Zm-2.4 4.5-2.1 1.5V9l2.1 1.5Z" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Expand player"
        onClick={toggleExpanded}
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f5d6bc]/15 bg-[#2a1c19]/90 text-[#f3e2d3] transition hover:bg-[#332521] sm:h-8 sm:w-8"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
          <path d="m7 10 5 5 5-5h-10Z" />
        </svg>
      </button>
    </div>
  );
}
