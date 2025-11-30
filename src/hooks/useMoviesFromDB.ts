import { useState, useEffect } from 'react';
import { Movie } from '@/data/movies';

export const useMoviesFromDB = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3001/api/movies`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const formattedMovies = data.map((movie: any) => ({
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
