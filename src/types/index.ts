export type Platform = 'spotify' | 'youtube';

export interface ConvertRequest {
  sourcePlatform: Platform;
  targetPlatform: Platform;
  playlistUrl: string;
}

export interface ConvertResponse {
  status: 'success' | 'error';
  convertedPlaylistUrl?: string;
  message?: string;
}

export interface ConvertState {
  isLoading: boolean;
  error: string | null;
  result: ConvertResponse | null;
}

export interface PlatformOption {
  value: Platform;
  label: string;
  icon: string;
  color: string;
}
