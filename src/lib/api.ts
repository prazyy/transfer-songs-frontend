const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://transfersoul-backend.onrender.com";

// Spotify URL validation pattern
const SPOTIFY_PLAYLIST_PATTERN =
  /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?.*)?$/;

export interface ConvertResponse {
  youtubeMusicLink?: string;
  error?: string;
  message?: string;
}

export async function convertSpotifyPlaylist(
  spotifyPlaylistLink: string
): Promise<ConvertResponse> {
  // Validate Spotify URL format
  if (!SPOTIFY_PLAYLIST_PATTERN.test(spotifyPlaylistLink)) {
    return {
      error:
        "Invalid Spotify playlist URL format. Please paste a valid Spotify playlist link.",
    };
  }

  try {
    const response = await fetch(`${API_URL}/api/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        spotifyPlaylistLink: spotifyPlaylistLink.trim(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.youtubeMusicLink) {
      return { youtubeMusicLink: data.youtubeMusicLink };
    } else {
      return {
        error: data.message || data.error || "Failed to convert playlist",
      };
    }
  } catch (error) {
    console.error("API Error:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to connect to conversion service",
    };
  }
}
