export interface TrackData {
  name: string;
  artists: Artist[];
  album: Album;
  id: string;
  uri: string;
}

export interface Artist {
  name: string;
  id: string;
}

export interface Album {
  artists: Artist[];
  name: string;
  id: string;
}

export interface TrackButton {
  label: string;
  ariaLabel: string;
  callback: (track: TrackData) => void;
}

export interface NavButton {
  label: string;
  ariaLabel: string;
  id: string;
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  enabled: boolean;
}

export interface SearchResults {
  trackList: TrackData[] | null;
  total: number;
  next: string | null;
  previous: string | null;
}

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (value: React.SetStateAction<string>) => void;
  searchResults: SearchResults | null;
  setSearchResults: (value: React.SetStateAction<SearchResults | null>) => void;
  errorMessage: string | null;
  setErrorMessage: (value: React.SetStateAction<string | null>) => void;
  constructSearchParamsFromQuery: (query: string) => string;
  extractSearchParamsFromURL: (query: string) => string;
  searchSpotify: (
    searchTerm: string,
    accessToken: string | null
  ) => Promise<void>;
}

export interface PlaylistContextType {
  playlistTracks: TrackData[];
  setPlaylistTracks: (value: React.SetStateAction<TrackData[]>) => void;
  playlistName: string;
  hasTracklist: boolean;
  hasValidPlaylist: boolean;
  addTrack: (track: TrackData) => void;
  removeTrack: (track: TrackData) => void;
  setPlaylistName: (value: React.SetStateAction<string>) => void;
}

export interface UserContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
  user: User | null;
  setUser: (value: React.SetStateAction<User | null>) => void;
  accessToken: string | null;
  setAccessToken: (value: React.SetStateAction<string | null>) => void;
  expiresAt: number | null;
  setExpiresAt: (value: React.SetStateAction<number | null>) => void;
}

export interface SearchInitialValues {
  results: SearchResults | null;
  term: string;
  err: string | null;
}

export interface PlaylistInitialValues {
  tracks: TrackData[];
  name: string;
}

export interface UserInitialValues {
  isLoggedIn: boolean;
  accessToken: string | null;
  expiresAt: number | null;
  user: User | null;
}

export interface User {
  displayName: string;
  id: string;
}
