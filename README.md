# SongTransfer Frontend

A modern, sleek playlist converter web application that allows users to convert playlists between Spotify and YouTube Music instantly. Built with Next.js, TypeScript, and Tailwind CSS with a dark, Gen-Z-styled aesthetic.

## ✨ Features

- 🎵 **Instant Conversion**: Convert playlists between Spotify and YouTube Music
- 🚫 **No Login Required**: Just paste a playlist URL and convert
- 📱 **Mobile Responsive**: Perfect experience on desktop and mobile
- 🌙 **Dark Theme**: Modern dark UI with Spotify/Netflix-like aesthetics
- ⚡ **Fast & Smooth**: Built with Next.js 14 and optimized for performance
- 🎨 **Modern UI**: Clean, minimal design with smooth animations
- 📋 **Copy to Clipboard**: Easy sharing of converted playlist URLs
- 🔄 **Real-time Feedback**: Loading states, error handling, and success notifications

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd songtransfer-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your backend API URL:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api-url.com
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── PlaylistConverter.tsx
│   ├── Button.tsx
│   ├── CopyButton.tsx
│   ├── Alert.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorBoundary.tsx
├── lib/               # Utilities and API
│   ├── api.ts         # API service
│   └── utils.ts       # Helper functions
└── types/             # TypeScript types
    └── index.ts
```

## 🎨 Design System

The application uses a carefully crafted design system with:

- **Colors**: Dark theme with green accents (Spotify-inspired)
- **Typography**: Inter font family for modern readability
- **Spacing**: Consistent spacing scale using Tailwind
- **Animations**: Smooth transitions and micro-interactions
- **Responsive**: Mobile-first design approach

## 🌐 API Integration

The frontend communicates with the backend API using the following endpoints:

### Convert Playlist

```typescript
POST /convert
{
  "sourcePlatform": "spotify" | "youtube",
  "targetPlatform": "youtube" | "spotify",
  "playlistUrl": "https://..."
}
```

**Response:**

```typescript
{
  "status": "success" | "error",
  "convertedPlaylistUrl"?: "https://...",
  "message"?: "Error message"
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL
4. Deploy!

### Manual Deployment

```bash
npm run build
npm start
```

## 🔧 Configuration

### Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL (required)
- `NODE_ENV`: Environment mode (development/production)

### Vercel Configuration

The project includes a `vercel.json` file with optimized settings for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🎵 About

SongTransfer makes it easy to move your music between platforms. Whether you're switching from Spotify to YouTube Music or vice versa, we've got you covered with a simple, fast, and beautiful interface.
