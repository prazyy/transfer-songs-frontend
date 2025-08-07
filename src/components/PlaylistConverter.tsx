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
    <div className="bg-slate-900/80 backdrop-blur-lg border border-slate-700/50 rounded-3xl p-6 sm:p-10 shadow-2xl hover:shadow-green-500/10 transition-all duration-300">
      {/* Platform Selection */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-white mb-8 text-center">
          Convert From
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          {/* Source Platform */}
          <div className="w-full sm:flex-1 sm:max-w-[220px]">
            <div
              className={`p-6 sm:p-8 rounded-2xl border-2 ${sourcePlatformData?.bgColor} text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group`}
            >
              <div className="text-4xl sm:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {sourcePlatformData?.icon}
              </div>
              <div className="text-white font-semibold text-xl sm:text-lg">
                {sourcePlatformData?.label}
              </div>
            </div>
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwapPlatforms}
            className="p-4 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 hover:bg-green-500/30 hover:text-green-300 transition-all duration-300 hover:scale-110 rotate-90 sm:rotate-0 group"
            disabled={state.isLoading}
            aria-label="Swap platforms"
          >
            <ArrowRight className="w-6 h-6 group-hover:rotate-180 transition-transform duration-300" />
          </button>

          {/* Target Platform */}
          <div className="w-full sm:flex-1 sm:max-w-[220px]">
            <div
              className={`p-6 sm:p-8 rounded-2xl border-2 ${targetPlatformData?.bgColor} text-center transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer group`}
            >
              <div className="text-4xl sm:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {targetPlatformData?.icon}
              </div>
              <div className="text-white font-semibold text-xl sm:text-lg">
                {targetPlatformData?.label}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="mb-8">
        <label
          htmlFor="playlist-url"
          className="block text-lg font-semibold text-slate-200 mb-4"
        >
          Paste your {sourcePlatformData?.label} playlist URL
        </label>
        <div className="relative group">
          <Music className="absolute left-5 top-1/2 transform -translate-y-1/2 text-slate-400 w-6 h-6 group-focus-within:text-green-400 transition-colors duration-300" />
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
            className="w-full pl-14 pr-6 py-5 bg-slate-800/60 border-2 border-slate-600/50 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 text-base sm:text-lg hover:border-slate-500/70"
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
