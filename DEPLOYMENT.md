# 🚀 SongTransfer Frontend Deployment Guide

## Quick Deploy to Vercel

### 1. **Push to GitHub**
```bash
git add .
git commit -m "feat: complete playlist converter frontend"
git push origin main
```

### 2. **Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://transfersoul-backend.onrender.com`
5. Click "Deploy"

### 3. **Environment Variables**

For **Production** (Vercel):
```env
NEXT_PUBLIC_API_URL=https://transfersoul-backend.onrender.com
```

For **Local Development**:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🔧 Backend Integration

Your frontend is now configured to work with your backend at:
- **Production**: `https://transfersoul-backend.onrender.com/api/convert`
- **Local**: `http://localhost:8000/api/convert`

### API Request Format:
```json
{
  "platform": "spotify" | "youtube",
  "playlistUrl": "https://example.com/playlist"
}
```

### API Response Format:
```json
{
  "status": "success",
  "convertedPlaylistUrl": "https://converted-playlist-url"
}
```

## 🧪 Testing

### Test with Local Backend:
1. Start your backend: `npm start` (in backend directory)
2. Update `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8000`
3. Start frontend: `npm run dev`
4. Test conversion at `http://localhost:3000`

### Test with Production Backend:
1. Update `.env.local`: `NEXT_PUBLIC_API_URL=https://transfersoul-backend.onrender.com`
2. Start frontend: `npm run dev`
3. Test conversion at `http://localhost:3000`

## 📱 Features Ready

✅ **Spotify to YouTube Music conversion**  
✅ **YouTube Music to Spotify conversion**  
✅ **Mobile responsive design**  
✅ **Copy to clipboard functionality**  
✅ **Error handling and loading states**  
✅ **Production-ready build**  
✅ **Dark theme with modern UI**  

## 🎯 Next Steps

1. **Deploy to Vercel** using the steps above
2. **Test with real playlists** from both platforms
3. **Share your app** with friends and get feedback
4. **Monitor performance** through Vercel analytics

Your playlist converter is now ready for the world! 🎵✨
