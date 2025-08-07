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
        className={`${inter.variable} font-sans bg-dark-gradient min-h-screen antialiased`}
      >
        <div className="relative min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] pointer-events-none" />

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
