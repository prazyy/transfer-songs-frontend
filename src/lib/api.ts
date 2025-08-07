import { ConvertRequest, ConvertResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Mock data for development
const MOCK_RESPONSES: Record<string, ConvertResponse> = {
  "spotify-to-youtube": {
    status: "success",
    convertedPlaylistUrl:
      "https://music.youtube.com/playlist?list=PLrAl6rYgs4IvGFBDEaVGFXt6k2GiOFuCC",
  },
  "youtube-to-spotify": {
    status: "success",
    convertedPlaylistUrl:
      "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
};

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// URL validation patterns
const URL_PATTERNS = {
  spotify: /^https:\/\/open\.spotify\.com\/playlist\/[a-zA-Z0-9]+(\?.*)?$/,
  youtube:
    /^https:\/\/music\.youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+(&.*)?$/,
};

export async function convertPlaylist(
  request: ConvertRequest
): Promise<ConvertResponse> {
  // Validate URL format
  const urlPattern = URL_PATTERNS[request.sourcePlatform];
  if (!urlPattern.test(request.playlistUrl)) {
    return {
      status: "error",
      message: `Invalid ${
        request.sourcePlatform === "spotify" ? "Spotify" : "YouTube Music"
      } playlist URL format`,
    };
  }

  // Simulate API delay
  await delay(2000 + Math.random() * 1000);

  // For development, use mock responses
  if (process.env.NODE_ENV === "development") {
    const mockKey = `${request.sourcePlatform}-to-${request.targetPlatform}`;

    // Simulate occasional errors for testing
    if (Math.random() < 0.1) {
      return {
        status: "error",
        message:
          "Playlist not found or is private. Please make sure the playlist is public.",
      };
    }

    return (
      MOCK_RESPONSES[mockKey] || {
        status: "error",
        message: "Conversion not supported for this platform combination",
      }
    );
  }

  // Production API call
  try {
    // Transform request to match backend format
    const backendRequest = {
      platform: request.targetPlatform, // The platform we want to convert TO
      playlistUrl: request.playlistUrl,
    };

    const response = await fetch(`${API_URL}/api/convert`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ConvertResponse = await response.json();
    return data;
  } catch (error) {
    console.error("API Error:", error);
    return {
      status: "error",
      message:
        error instanceof Error ? error.message : "Failed to convert playlist",
    };
  }
}

// Utility function to detect platform from URL
export function detectPlatformFromUrl(
  url: string
): "spotify" | "youtube" | null {
  if (URL_PATTERNS.spotify.test(url)) {
    return "spotify";
  }
  if (URL_PATTERNS.youtube.test(url)) {
    return "youtube";
  }
  return null;
}

// Utility function to validate playlist URL
export function validatePlaylistUrl(
  url: string,
  platform: "spotify" | "youtube"
): boolean {
  return URL_PATTERNS[platform].test(url);
}
