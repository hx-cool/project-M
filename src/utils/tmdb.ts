const API_KEY = '1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const searchTMDB = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  const data = await response.json();
  return data.results || [];
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
  };
};
