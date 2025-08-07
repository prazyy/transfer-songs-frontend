import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SongTransfer - Convert Playlists Between Spotify & YouTube Music",
  description:
    "Convert your playlists between Spotify and YouTube Music instantly. No login required - just paste your playlist link and convert!",
  keywords: [
    "playlist converter",
    "spotify",
    "youtube music",
    "music transfer",
    "playlist migration",
  ],
  authors: [{ name: "SongTransfer" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#22c55e",
  openGraph: {
    title: "SongTransfer - Convert Playlists Between Spotify & YouTube Music",
    description:
      "Convert your playlists between Spotify and YouTube Music instantly. No login required!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SongTransfer - Convert Playlists Between Spotify & YouTube Music",
    description:
      "Convert your playlists between Spotify and YouTube Music instantly. No login required!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans min-h-screen antialiased bg-slate-950 text-slate-100`}
      >
        <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)] pointer-events-none" />

          {/* Animated background dots */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse delay-500"></div>
          </div>

          {/* Main content */}
          <main className="relative z-10">{children}</main>

          {/* Toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#1e293b",
                color: "#f8fafc",
                border: "1px solid #475569",
                borderRadius: "12px",
              },
              success: {
                iconTheme: {
                  primary: "#22c55e",
                  secondary: "#ffffff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#ffffff",
                },
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}
