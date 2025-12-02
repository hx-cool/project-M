const API_KEY = '1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const searchTMDB = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results || [];
};

export const getContentDetails = async (contentId: number, mediaType: string, seasonNumber?: number) => {
  if (mediaType === 'tv') {
    return getTVDetails(contentId, seasonNumber);
  } else {
    return getMovieDetails(contentId);
  }
};

export const getMovieDetails = async (movieId: number) => {
  const [movie, credits] = await Promise.all([
    fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`).then(r => r.json()),
    fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`).then(r => r.json())
  ]);
  
  return {
    title: movie.title,
    year: movie.release_date?.split('-')[0] || '',
    rating: movie.vote_average?.toFixed(1) || '',
    posterUrl: movie.poster_path ? `${IMG_URL}${movie.poster_path}` : '',
    synopsis: movie.overview || '',
    duration: movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : '',
    releaseDate: movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase() : '',
    genre: movie.genres?.map((g: any) => g.name).join(', ') || '',
    cast: credits.cast?.slice(0, 5).map((c: any) => c.name).join(', ') || '',
    isSeries: false,
  };
};

export const getTVDetails = async (tvId: number, seasonNumber: number = 1) => {
  const [tv, credits, seasonData] = await Promise.all([
    fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`).then(r => r.json()),
    fetch(`${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`).then(r => r.json()),
    fetch(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`).then(r => r.json())
  ]);
  
  return {
    title: tv.name,
    seriesBaseName: tv.name,
    year: seasonData.air_date?.split('-')[0] || tv.first_air_date?.split('-')[0] || '',
    rating: tv.vote_average?.toFixed(1) || '',
    posterUrl: seasonData.poster_path ? `${IMG_URL}${seasonData.poster_path}` : (tv.poster_path ? `${IMG_URL}${tv.poster_path}` : ''),
    synopsis: seasonData.overview || tv.overview || '',
    duration: tv.episode_run_time?.[0] ? `${tv.episode_run_time[0]}m` : '',
    releaseDate: seasonData.air_date ? new Date(seasonData.air_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase() : '',
    genre: tv.genres?.map((g: any) => g.name).join(', ') || '',
    cast: credits.cast?.slice(0, 5).map((c: any) => c.name).join(', ') || '',
    isSeries: true,
    seasonNumber: seasonNumber.toString(),
    seriesId: tv.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    episodesThisSeason: seasonData.episodes?.length?.toString() || '',
    totalSeasons: tv.number_of_seasons?.toString() || '',
    seriesStatus: tv.status === 'Ended' ? 'Completed' : tv.status === 'Returning Series' ? 'Ongoing' : tv.status || 'Ongoing',
    seriesType: tv.type || 'TV Show',
    episodeInfo: seasonData.episodes?.length ? `[S${seasonNumber.toString().padStart(2, '0')} Complete - ${seasonData.episodes.length} Episodes]` : `[S${seasonNumber.toString().padStart(2, '0')} - Ongoing]`,
  };
};

export const getTVSeasons = async (tvId: number) => {
  const tv = await fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`).then(r => r.json());
  return tv.seasons?.map((season: any) => ({
    seasonNumber: season.season_number,
    name: season.name,
    episodeCount: season.episode_count,
    airDate: season.air_date,
    posterPath: season.poster_path ? `${IMG_URL}${season.poster_path}` : null,
    overview: season.overview
  })) || [];
};
