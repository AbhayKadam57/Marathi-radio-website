import { useMusicPlayer } from "../../context/MusicPlayerContext";
import WaveformBar from "./WaveformBar";

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${mins}:${secs}`;
}

export default function MusicPlayerExpanded() {
  const {
    currentTrack,
    currentTime,
    duration,
    volume,
    isPlaying,
    play,
    pause,
    togglePlay,
    next,
    previous,
    seek,
    setVolume,
    toggleExpanded,
  } = useMusicPlayer();

  return (
    <div className="w-[min(720px,calc(100vw-24px))] rounded-[28px] border border-[#372a80]/60 bg-[#372a80]/90 p-3 shadow-[0_20px_46px_rgba(15,8,7,0.52)] backdrop-blur-xl">
      <div className="flex items-center justify-between text-[#f5e5d7]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleExpanded}
            className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#f5d6bc]/20 bg-[#2a1c19]/90 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] hover:bg-[#332521]"
            aria-label="Collapse player"
          >
            <img
              src="/disc.png"
              alt="Music disc"
              className="h-full w-full object-cover opacity-80"
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-full bg-[#120d0b]/20">
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 fill-[#f7efe8]"
                aria-hidden="true"
              >
                <path d="m7 14 5-5 5 5H7Z" />
              </svg>
            </span>
          </button>
          <span className="font-[Inter] text-xs uppercase tracking-[0.25em] text-[#f5d6bc]/80">
            Now playing
          </span>
        </div>

        <button
          type="button"
          className="rounded-full border border-[#f5d6bc]/20 bg-[#2a1c19]/85 px-3 py-1.5 font-[Inter] text-[10px] uppercase tracking-[0.22em] text-[#f5e5d7] transition hover:bg-[#332521]"
        >
          Youtube
        </button>
      </div>

      <div className="mt-3 flex flex-col gap-4 md:flex-row">
        <div className="w-full md:w-[30%]">
          <img
            src={currentTrack.artwork}
            alt={currentTrack.title}
            className="h-[180px] w-full rounded-[20px] object-cover shadow-[0_18px_32px_rgba(15,8,7,0.35)] md:h-[180px] md:w-[180px]"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div>
            <p className="marathi-title text-[1.9rem] leading-none text-[#f9efe8] md:text-[1rem]">
              {currentTrack.title}
            </p>
            <p className="mt-2 font-[Inter] text-xs tracking-[0.14em] text-[#f2d2b5]/80 uppercase">
              {currentTrack.artist}
            </p>
          </div>

          <div className="mt-4">
            <WaveformBar
              value={currentTime}
              max={duration || 0}
              onChange={seek}
            />
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={previous}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f5d6bc]/20 bg-[#2a1c19]/80 text-[#f3e2d3] transition hover:bg-[#332521]"
              aria-label="Previous track"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M6 5h2v14H6V5Zm11 1.5L10 12l7 5.5V6.5Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-[#372a80] text-[#fdf2ea] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-transform duration-200 hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6 fill-current"
                  aria-hidden="true"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-6 w-6 fill-current"
                  aria-hidden="true"
                >
                  <path d="M8 5.5v13l10-6.5-10-6.5Z" />
                </svg>
              )}
            </button>

            <button
              type="button"
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f5d6bc]/20 bg-[#2a1c19]/80 text-[#f3e2d3] transition hover:bg-[#332521]"
              aria-label="Next track"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-current"
                aria-hidden="true"
              >
                <path d="M16 5h2v14h-2V5ZM6 6.5 13 12l-7 5.5V6.5Z" />
              </svg>
            </button>
            <div className="mt-0 flex flex-col gap-3 rounded-full border border-[#372a80]/70 bg-[#372a80]/30 px-3 py-2 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="button"
                onClick={() => setVolume(volume > 0 ? 0 : 0.7)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#f5d6bc]/20 bg-[#2a1c19]/80 text-[#f3e2d3] transition hover:bg-[#332521]"
                aria-label={volume > 0 ? "Mute volume" : "Unmute volume"}
              >
                {volume > 0 ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4 9v6h4l5 4V5L8 9H4zm12.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z" />
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4 9v6h4l5 4V5L8 9H4zm15.7 1.3-1.4-1.4L16.6 10.6l-1.7-1.7-1.4 1.4 1.7 1.7-1.7 1.7 1.4 1.4 1.7-1.7 1.7 1.7 1.4-1.4-1.7-1.7z" />
                  </svg>
                )}
              </button>

              <span className="font-[Inter] text-[10px] uppercase tracking-[0.2em] text-[#f5d6bc]/80">
                Volume
              </span>
              <div className="relative w-full sm:max-w-[150px]">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={(event) => setVolume(event.target.value)}
                  className="music-range-sm"
                  style={{
                    background: `linear-gradient(to right, #f6d7b9 0%, #f6d7b9 ${volume * 100}%, rgba(255,255,255,0.18) ${volume * 100}%, rgba(255,255,255,0.18) 100%)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
