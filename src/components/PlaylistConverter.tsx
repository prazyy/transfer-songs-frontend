"use client";

import { useState } from "react";
import {
  Music,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import { convertSpotifyPlaylist, ConvertResponse } from "@/lib/api";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

interface ConvertState {
  isLoading: boolean;
  error: string | null;
  result: ConvertResponse | null;
}

export default function PlaylistConverter() {
  const [spotifyUrl, setSpotifyUrl] = useState("");
  const [state, setState] = useState<ConvertState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleConvert = async () => {
    if (!spotifyUrl.trim()) {
      toast.error("Please enter a Spotify playlist URL");
      return;
    }

    setState({ isLoading: true, error: null, result: null });

    try {
      const result = await convertSpotifyPlaylist(spotifyUrl);

      if (result.youtubeMusicLink) {
        setState({ isLoading: false, error: null, result });
        toast.success("Playlist converted successfully!");
      } else {
        setState({
          isLoading: false,
          error: result.error || "Conversion failed",
          result: null,
        });
        toast.error(result.error || "Conversion failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setState({ isLoading: false, error: errorMessage, result: null });
      toast.error(errorMessage);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const openInNewTab = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Spotify to YouTube Music
        </h2>
        <p className="text-slate-300 text-lg">
          Convert your Spotify playlists to YouTube Music instantly
        </p>
      </div>

      {/* Platform Visual */}
      <div className="flex items-center justify-center gap-6 mb-8">
        {/* Spotify */}
        <div className="p-6 rounded-2xl border-2 bg-green-500/10 border-green-500/20 text-center">
          <div className="text-4xl mb-3">🎵</div>
          <div className="text-white font-semibold text-lg">Spotify</div>
        </div>

        {/* Arrow */}
        <div className="p-4 rounded-full bg-green-500/20 border border-green-500/30 text-green-400">
          <ArrowRight className="w-6 h-6" />
        </div>

        {/* YouTube Music */}
        <div className="p-6 rounded-2xl border-2 bg-red-500/10 border-red-500/20 text-center">
          <div className="text-4xl mb-3">🎶</div>
          <div className="text-white font-semibold text-lg">YouTube Music</div>
        </div>
      </div>

      {/* URL Input */}
      <div className="mb-8">
        <label
          htmlFor="spotify-url"
          className="block text-lg font-semibold text-slate-200 mb-4"
        >
          Paste your Spotify playlist URL
        </label>
        <div className="relative group">
          <Music className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-green-400 transition-colors duration-300" />
          <input
            id="spotify-url"
            type="url"
            value={spotifyUrl}
            onChange={(e) => setSpotifyUrl(e.target.value)}
            placeholder="https://open.spotify.com/playlist/..."
            className="w-full pl-14 pr-6 py-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-base sm:text-lg hover:border-slate-500/70"
            disabled={state.isLoading}
          />
        </div>
      </div>

      {/* Convert Button */}
      <Button
        onClick={handleConvert}
        disabled={state.isLoading || !spotifyUrl.trim()}
        isLoading={state.isLoading}
        className="w-full"
        size="lg"
      >
        {state.isLoading ? (
          <>
            <LoadingSpinner size="sm" className="mr-2" />
            Converting to YouTube Music...
          </>
        ) : (
          <>
            <ArrowRight className="w-5 h-5" />
            Convert to YouTube Music
          </>
        )}
      </Button>

      {/* Error Display */}
      {state.error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
            <span className="font-semibold">Conversion Failed</span>
          </div>
          <p className="text-slate-300">{state.error}</p>
        </div>
      )}

      {/* Success Result */}
      {state.result?.youtubeMusicLink && (
        <div className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-2xl">
          <div className="flex items-center gap-3 text-green-400 mb-4">
            <CheckCircle className="w-6 h-6" />
            <span className="font-semibold text-lg">
              Conversion Successful!
            </span>
          </div>
          <p className="text-slate-300 mb-6 text-base">
            Your Spotify playlist has been converted to YouTube Music. Use the
            buttons below to copy the link or open it directly:
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={state.result.youtubeMusicLink}
              readOnly
              className="flex-1 px-5 py-4 bg-slate-800/60 border border-slate-600/50 rounded-xl text-white text-base break-all focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(state.result!.youtubeMusicLink!)}
                className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
              <button
                onClick={() => openInNewTab(state.result!.youtubeMusicLink!)}
                className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors duration-200 flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
