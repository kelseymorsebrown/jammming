export interface TrackData {
  name: string;
  type: string;
  artists: Artist[];
  album: Album;
  id: string;
  uri: string;
}

export interface Artist {
  name: string;
  type: string;
  id: string;
}

export interface Album {
  artists: Artist[];
  name: string;
  type: string;
  id: string;
}

export interface TrackButton {
  label: string;
  callback: (track: TrackData) => void;
}

export interface SearchContextType {
  searchTerm: string;
  searchResults: TrackData[] | null;
  errorMessage: string | null;
  setSearchTerm: (value: React.SetStateAction<string>) => void;
  searchSpotify: (searchTerm: string) => Promise<void>;
}

export interface PlaylistContextType {
  playlistTracks: TrackData[];
  playlistName: string;
  playlistURIs: string[] | null;
  hasTracklist: boolean;
  addTrack: (track: TrackData) => void;
  removeTrack: (track: TrackData) => void;
  setPlaylistName: (value: React.SetStateAction<string>) => void;
  setPlaylistURIs: (value: React.SetStateAction<string[]>) => void;
}

export interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
  displayName: string | null;
  setDisplayName: (value: React.SetStateAction<string | null>) => void;
  accessToken: string | null;
  setAccessToken: (value: React.SetStateAction<string | null>) => void;
  expiresAt: number | null;
  setExpiresAt: (value: React.SetStateAction<number | null>) => void;
}

export interface SearchInitialValues {
  results: TrackData[] | null;
  term: string;
  err: string | null;
}

export interface PlaylistInitialValues {
  tracks: TrackData[];
  name: string;
}

export interface UserInitialValues {
  isLoggedIn: boolean;
  displayName: string | null;
  accessToken: string | null;
  expiresAt: number | null;
}
