export interface TrackData {
  name: string;
  type: string;
  artists: Artist[];
  album: Album;
  id: string;
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