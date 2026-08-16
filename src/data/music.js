export const fallbackMusicTracks = [
  {
    id: 1,
    title: "दिल दीवाना",
    artist: "Lata Mangeshkar",
    duration: 318,
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    artwork:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "तू ही जान",
    artist: "Kishore Kumar",
    duration: 286,
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    artwork:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "रिमझिम",
    artist: "Asha Bhosle",
    duration: 362,
    audio:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    artwork:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
  },
];

export const musicTracks = fallbackMusicTracks;

const YOUTUBE_TRACK_CACHE_KEY = "marathi-radio-youtube-cache";
const YOUTUBE_TRACK_CACHE_TTL = 1000 * 60 * 60 * 24;

function readCachedYouTubeTracks() {
  if (typeof localStorage === "undefined") {
    return null;
  }

  try {
    const cached = localStorage.getItem(YOUTUBE_TRACK_CACHE_KEY);
    if (!cached) {
      return null;
    }

    const parsed = JSON.parse(cached);
    if (!parsed || !Array.isArray(parsed.tracks)) {
      return null;
    }

    const now = Date.now();
    if (now - parsed.savedAt > YOUTUBE_TRACK_CACHE_TTL) {
      localStorage.removeItem(YOUTUBE_TRACK_CACHE_KEY);
      return null;
    }

    return parsed.tracks;
  } catch (error) {
    return null;
  }
}

function writeCachedYouTubeTracks(tracks) {
  if (typeof localStorage === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      YOUTUBE_TRACK_CACHE_KEY,
      JSON.stringify({
        savedAt: Date.now(),
        tracks,
      })
    );
  } catch (error) {
    // Ignore storage errors
  }
}

const excludedWords = [
  "jukebox",
  "collection",
  "album",
  "medley",
  "nonstop",
  "non-stop",
  "mix",
  "compilation",
  "playlist",
  "full album",
];

function containsExcludedWord(title = "") {
  const normalizedTitle = title.toLowerCase();
  return excludedWords.some((word) => normalizedTitle.includes(word.toLowerCase()));
}

function parseDurationToSeconds(durationValue) {
  if (typeof durationValue === "number" && Number.isFinite(durationValue)) {
    return Math.max(0, Math.floor(durationValue));
  }

  if (typeof durationValue !== "string") {
    return 0;
  }

  const trimmed = durationValue.trim();

  if (!trimmed) {
    return 0;
  }

  if (/^\d+$/.test(trimmed)) {
    return Math.max(0, Number(trimmed));
  }

  if (/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) {
    const parts = trimmed.split(":").map(Number);
    if (parts.length === 2) {
      return parts[0] * 60 + parts[1];
    }

    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }

  const isoMatch = trimmed.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/i);
  if (isoMatch) {
    const [, hours = "0", minutes = "0", seconds = "0"] = isoMatch;
    return (
      Number(hours) * 3600 +
      Number(minutes) * 60 +
      Number(seconds)
    );
  }

  return 0;
}

export function getYouTubeEmbedUrl(videoId, autoplay = true) {
  if (!videoId) {
    return "";
  }

  const params = new URLSearchParams({
    autoplay: autoplay ? "1" : "0",
    controls: "0",
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    origin: window.location.origin,
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}

export async function fetchYouTubeMusicTracks() {
  const cachedTracks = readCachedYouTubeTracks();
  if (cachedTracks && cachedTracks.length > 0) {
    return cachedTracks;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return fallbackMusicTracks;
  }

  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/youtube-search?q=${encodeURIComponent(
        "old Marathi 70s single songs"
      )}`,
      {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    );

    if (!response.ok) {
      return fallbackMusicTracks;
    }

    const data = await response.json();

    if (!Array.isArray(data.items) || data.items.length === 0) {
      return fallbackMusicTracks;
    }

    const filteredItems = data.items.filter((item) => {
      const title = item?.snippet?.title || "";
      return !containsExcludedWord(title);
    });

    if (filteredItems.length === 0) {
      return fallbackMusicTracks;
    }

    const durationLimitSeconds = 8 * 60;

    const videoIds = filteredItems
      .map((item) => item?.id?.videoId)
      .filter(Boolean);

    let durationMap = {};

    if (videoIds.length > 0) {
      const durationResponse = await fetch(
        `${supabaseUrl}/functions/v1/youtube-search-durations?id=${encodeURIComponent(videoIds.join(","))}`,
        {
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
          },
        }
      );

      if (durationResponse.ok) {
        const durationData = await durationResponse.json();
        durationMap = Object.fromEntries(
          (durationData.items || []).map((video) => [
            video?.id,
            parseDurationToSeconds(video?.contentDetails?.duration),
          ])
        );
      }
    }

    const songs = filteredItems
      .map((item, index) => {
        const videoId = item?.id?.videoId;
        const fallbackTrack = fallbackMusicTracks[index % fallbackMusicTracks.length];
        const title = item?.snippet?.title || fallbackTrack.title;
        const artist = item?.snippet?.channelTitle || fallbackTrack.artist;
        const artwork =
          item?.snippet?.thumbnails?.high?.url ||
          item?.snippet?.thumbnails?.medium?.url ||
          item?.snippet?.thumbnails?.default?.url ||
          fallbackTrack.artwork;

        const songDuration = durationMap[videoId] || parseDurationToSeconds(fallbackTrack.duration) || 210;

        return {
          id: videoId || fallbackTrack.id,
          videoId,
          title: title.replace(/\s*\([^)]*\)/g, "").trim() || fallbackTrack.title,
          artist,
          duration: songDuration,
          audio: getYouTubeEmbedUrl(videoId, false),
          artwork,
        };
      })
      .filter((track) => track.duration <= durationLimitSeconds);

    if (songs.length === 0) {
      return fallbackMusicTracks;
    }

    writeCachedYouTubeTracks(songs);
    return songs;
  } catch (error) {
    const cachedFallback = readCachedYouTubeTracks();
    if (cachedFallback && cachedFallback.length > 0) {
      return cachedFallback;
    }

    return fallbackMusicTracks;
  }
}
