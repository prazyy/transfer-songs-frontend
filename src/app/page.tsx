import PlaylistConverter from "@/components/PlaylistConverter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-20 px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent mb-6 animate-pulse">
              SongTransfer
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Convert your playlists between Spotify and YouTube Music
              instantly.
              <span className="text-green-400 font-semibold block mt-2">
                No login required!
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-2xl">
          <PlaylistConverter />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 px-4 sm:px-6 py-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-slate-400 text-sm sm:text-base">
            Made with <span className="text-red-500 animate-pulse">❤️</span> for
            music lovers. Convert playlists seamlessly between platforms.
          </p>
        </div>
      </footer>
    </div>
  );
}
