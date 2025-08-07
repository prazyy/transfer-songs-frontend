import PlaylistConverter from "@/components/PlaylistConverter";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative z-20 px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-4 animate-slide-up">
              SongTransfer
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl text-dark-300 max-w-2xl mx-auto animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Convert your playlists between Spotify and YouTube Music
              instantly.
              <span className="text-primary-400 font-medium">
                {" "}
                No login required!
              </span>
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-4 sm:py-8">
        <div
          className="w-full max-w-2xl animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          <PlaylistConverter />
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 px-4 sm:px-6 py-6 sm:py-8 border-t border-dark-700">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-dark-400 text-xs sm:text-sm">
            Made with ❤️ for music lovers. Convert playlists seamlessly between
            platforms.
          </p>
        </div>
      </footer>
    </div>
  );
}
