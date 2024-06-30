export interface TrackData {
  name: string;
  artists: Artist[];
  album: Album;
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