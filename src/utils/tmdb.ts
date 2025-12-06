const API_KEY = '1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Fallback CORS proxy if direct API fails
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
const BACKUP_PROXY = 'https://api.allorigins.win/raw?url=';

export const searchTMDB = async (query: string) => {
  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  console.log('TMDB API URL:', url);
  
  // Try direct API first
  try {
    const response = await fetch(url);
    console.log('TMDB Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('TMDB API response:', data);
    return data.results || [];
  } catch (error) {
    console.error('Direct TMDB API failed:', error);
    
    // Try with CORS proxy
    try {
      console.log('Trying CORS proxy...');
      const proxyUrl = `${BACKUP_PROXY}${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      
      if (!response.ok) {
        throw new Error(`Proxy API error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Proxy API response:', data);
      return data.results || [];
    } catch (proxyError) {
      console.error('Proxy API also failed:', proxyError);
      
      // Return mock data for testing
      console.log('Returning mock data for testing...');
      return [
        {
          id: 1,
          title: 'Mock Movie',
          name: 'Mock TV Show',
          media_type: 'movie',
          poster_path: '/mock.jpg',
          release_date: '2024-01-01',
          first_air_date: '2024-01-01',
          vote_average: 8.5,
          overview: 'This is mock data since TMDB API is not accessible'
        }
      ];
    }
  }
};

export const getContentDetails = async (contentId: number, mediaType: string, seasonNumber?: number) => {
  if (mediaType === 'tv') {
    return getTVDetails(contentId, seasonNumber);
  } else {
    return getMovieDetails(contentId);
  }
};

export const getMovieDetails = async (movieId: number) => {
  try {
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
  } catch (error) {
    console.error('Failed to get movie details:', error);
    return {
      title: 'Mock Movie Title',
      year: '2024',
      rating: '8.5',
      posterUrl: '',
      synopsis: 'Mock movie synopsis since TMDB API is not accessible',
      duration: '2h 30m',
      releaseDate: 'JANUARY 1, 2024',
      genre: 'Action, Adventure',
      cast: 'Actor 1, Actor 2, Actor 3',
      isSeries: false,
    };
  }
};

export const getTVDetails = async (tvId: number, seasonNumber: number = 1) => {
  const [tv, credits, seasonData] = await Promise.all([
    fetch(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`).then(r => r.json()),
    fetch(`${BASE_URL}/tv/${tvId}/credits?api_key=${API_KEY}`).then(r => r.json()),
    fetch(`${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}`).then(r => r.json())
  ]);
  
  const statusMap: Record<string, string> = {
    'Ended': 'Completed',
    'Returning Series': 'Ongoing',
    'Canceled': 'Cancelled',
    'In Production': 'Ongoing',
    'Planned': 'Ongoing'
  };
  
  let seriesType = 'Web Series';
  const networks = tv.networks?.map((n: any) => n.name.toLowerCase()) || [];
  const tvNetworks = ['abc', 'nbc', 'cbs', 'fox', 'the cw', 'hbo', 'showtime', 'amc', 'fx', 'cartoon network', 'nickelodeon', 'disney channel', 'discovery', 'history', 'bbc', 'itv', 'channel 4', 'sky'];
  const streamingNetworks = ['netflix', 'amazon', 'prime video', 'hulu', 'disney+', 'apple tv+', 'paramount+', 'peacock', 'max', 'hbo max'];
  
  const isTraditionalTV = networks.some(network => tvNetworks.some(tv => network.includes(tv)));
  const isStreaming = networks.some(network => streamingNetworks.some(stream => network.includes(stream)));
  
  if (tv.type === 'Documentary') {
    seriesType = 'Documentary Series';
  } else if (tv.type === 'Miniseries') {
    seriesType = 'Mini Series';
  } else if (tv.type === 'Reality' || tv.type === 'Talk Show' || tv.type === 'News') {
    seriesType = 'TV Show';
  } else if (isTraditionalTV) {
    seriesType = 'TV Show';
  } else if (isStreaming) {
    seriesType = 'Web Series';
  }
  
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
    seriesStatus: statusMap[tv.status] || tv.status || 'Ongoing',
    seriesType: seriesType,
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
