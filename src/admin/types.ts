export interface Movie {
  id: number;
  title: string;
  year?: string;
  rating?: number;
  posterUrl?: string;
  quality?: string;
  movieOrigin?: string;
  createdAt: string;
  trending?: boolean;
  featured?: boolean;
  isSeries?: boolean;
  seasonNumber?: number;
  episodesThisSeason?: number;
  seriesStatus?: string;
  seriesType?: string;
  episodeInfo?: string;
  seriesId?: string;
  totalSeasons?: number;
  platform?: string;
  language?: string;
  audioType?: string;
  subtitle?: string;
  duration?: string;
  synopsis?: string;
  cast?: string;
  screenshots?: string;
  codec?: string;
  show4K?: boolean;
  isEditorPick?: boolean;
  releaseDate?: string;
  genres: Array<{ genre: { name: string } }>;
  downloads: Array<{ 
    id: string;
    resolution: string; 
    size?: string; 
    link?: string;
    batchLink?: string;
    batchSize?: string;
    qualityDetail?: string;
    order: number;
  }>;
}

export interface Genre {
  id: number;
  name: string;
  _count: { movies: number };
}

export interface Stats {
  movieCount: number;
  genreCount: number;
  totalDownloads?: number;
  monthlyMovies?: number;
  recentMovies: Array<{
    id: number;
    title: string;
    createdAt: string;
  }>;
}

export interface FormData {
  title: string;
  year: string;
  posterUrl: string;
  platform: string;
  isSeries: boolean;
  episodeInfo: string;
  seriesBaseName: string;
  seasonNumber: string;
  seriesId: string;
  episodesThisSeason: string;
  totalSeasons: string;
  seriesStatus: string;
  seriesType: string;
  quality: string;
  customQuality: string;
  audioType: string;
  customAudioType: string;
  language: string;
  customLanguage: string;
  subtitle: string;
  customSubtitle: string;
  releaseDate: string;
  movieOrigin: string;
  show4K: boolean;
  isEditorPick: boolean;
  trending: boolean;
  featured: boolean;
  genre: string;
  rating: string;
  duration: string;
  synopsis: string;
  cast: string;
  screenshots: string;
  codec: string;
  allDownloads: Array<{
    id: string;
    name: string;
    link: string;
    size: string;
    qualityDetail: string;
    batchLink?: string;
    batchSize?: string;
    order: number;
    isCustom: boolean;
  }>;
}