"use client";

import { useState } from "react";
import { Music, ArrowRight, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { Platform, ConvertState } from "@/types";
import { convertPlaylist } from "@/lib/api";
import Button from "./Button";
import CopyButton from "./CopyButton";
import Alert from "./Alert";

const platforms = [
  {
    value: "spotify" as Platform,
    label: "Spotify",
    icon: "🎵",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10 border-green-500/20",
  },
  {
    value: "youtube" as Platform,
    label: "YouTube Music",
    icon: "🎶",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-500/10 border-red-500/20",
  },
];

export default function PlaylistConverter() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [sourcePlatform, setSourcePlatform] = useState<Platform>("spotify");
  const [targetPlatform, setTargetPlatform] = useState<Platform>("youtube");
  const [state, setState] = useState<ConvertState>({
    isLoading: false,
    error: null,
    result: null,
  });

  const handleSwapPlatforms = () => {
    const temp = sourcePlatform;
    setSourcePlatform(targetPlatform);
    setTargetPlatform(temp);
  };

  const handleConvert = async () => {
    if (!playlistUrl.trim()) {
      toast.error("Please enter a playlist URL");
      return;
    }

    setState({ isLoading: true, error: null, result: null });

    try {
      const result = await convertPlaylist({
        sourcePlatform,
        targetPlatform,
        playlistUrl: playlistUrl.trim(),
      });

      if (result.status === "success") {
        setState({ isLoading: false, error: null, result });
        toast.success("Playlist converted successfully!");
      } else {
        setState({
          isLoading: false,
          error: result.message || "Conversion failed",
          result: null,
        });
        toast.error(result.message || "Conversion failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setState({ isLoading: false, error: errorMessage, result: null });
      toast.error(errorMessage);
    }
  };

  const sourcePlatformData = platforms.find((p) => p.value === sourcePlatform);
  const targetPlatformData = platforms.find((p) => p.value === targetPlatform);

  return (
    <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-4 sm:p-8 shadow-2xl animate-fade-in">
      {/* Platform Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-white mb-6 text-center">
          Convert From
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          {/* Source Platform */}
          <div className="w-full sm:flex-1 sm:max-w-[200px]">
            <div
              className={`p-4 sm:p-6 rounded-xl border-2 ${sourcePlatformData?.bgColor} text-center transition-all duration-200 hover:scale-105`}
            >
              <div className="text-3xl sm:text-2xl mb-2">
                {sourcePlatformData?.icon}
              </div>
              <div className="text-white font-medium text-lg sm:text-base">
                {sourcePlatformData?.label}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapPlatforms}
            className="p-3 rounded-full bg-primary-500/20 border border-primary-500/30 text-primary-400 hover:bg-primary-500/30 transition-all duration-200 hover:scale-110 rotate-90 sm:rotate-0"
            disabled={state.isLoading}
            aria-label="Swap platforms"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Target Platform */}
          <div className="w-full sm:flex-1 sm:max-w-[200px]">
            <div
              className={`p-4 sm:p-6 rounded-xl border-2 ${targetPlatformData?.bgColor} text-center transition-all duration-200 hover:scale-105`}
            >
              <div className="text-3xl sm:text-2xl mb-2">
                {targetPlatformData?.icon}
              </div>
              <div className="text-white font-medium text-lg sm:text-base">
                {targetPlatformData?.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="mb-6">
        <label
          htmlFor="playlist-url"
          className="block text-sm font-medium text-dark-300 mb-3"
        >
          Paste your {sourcePlatformData?.label} playlist URL
        </label>
        <div className="relative">
          <Music className="absolute left-4 top-1/2 transform -translate-y-1/2 text-dark-400 w-5 h-5" />
          <input
            id="playlist-url"
            type="url"
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            placeholder={`https://${
              sourcePlatform === "spotify"
                ? "open.spotify.com"
                : "music.youtube.com"
            }/playlist/...`}
            className="w-full pl-12 pr-4 py-4 bg-dark-700/50 border border-dark-600 rounded-xl text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
            disabled={state.isLoading}
          />
        </div>
      </div>

      {/* Convert Button */}
      <Button
        onClick={handleConvert}
        disabled={state.isLoading || !playlistUrl.trim()}
        isLoading={state.isLoading}
        className="w-full"
        size="lg"
      >
        {state.isLoading ? (
          "Converting Playlist..."
        ) : (
          <>
            <ArrowRight className="w-5 h-5" />
            Convert Playlist
          </>
        )}
      </Button>

      {/* Error Display */}
      {state.error && (
        <Alert
          variant="error"
          title="Conversion Failed"
          className="mt-6"
          onClose={() => setState((prev) => ({ ...prev, error: null }))}
        >
          {state.error}
        </Alert>
      )}

      {/* Success Result */}
      {state.result?.status === "success" &&
        state.result.convertedPlaylistUrl && (
          <div className="mt-6 p-6 bg-primary-500/10 border border-primary-500/20 rounded-xl">
            <div className="flex items-center gap-2 text-primary-400 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Conversion Successful!</span>
            </div>
            <p className="text-dark-300 mb-4">
              Your playlist has been converted to {targetPlatformData?.label}.
              Click the button below to copy the link:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={state.result.convertedPlaylistUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-dark-700/50 border border-dark-600 rounded-lg text-white text-sm break-all"
              />
              <CopyButton
                text={state.result.convertedPlaylistUrl}
                size="md"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        )}
    </div>
  );
}
