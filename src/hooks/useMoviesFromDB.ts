import { useState, useEffect } from 'react';
import { Movie } from '@/data/movies';
import { API_URL } from '@/config/api';

export const useMoviesFromDB = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/movies?limit=100`)
      .then(res => res.json())
      .then(data => {
        const movieArray = data.movies || data;
        if (Array.isArray(movieArray)) {
          const formattedMovies = movieArray.map((movie: any) => ({
            title: movie.title,
            slug: movie.slug,
            year: movie.year,
            genre: movie.genres?.map((g: any) => g.genre.name) || [],
            rating: movie.rating,
            posterUrl: movie.posterUrl,
            quality: movie.quality,
            duration: movie.duration,
            synopsis: movie.synopsis,
            cast: movie.cast?.map((c: any) => c.cast.name) || [],
            language: movie.language,
            audioType: movie.audioType,
            downloadLink: movie.downloads?.[0]?.link,
            releaseDate: movie.releaseDate,
            fromDB: true,
          }));
          setMovies(formattedMovies);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch movies from DB:', err);
        setLoading(false);
      });
  }, []);

  return { movies, loading };
};
