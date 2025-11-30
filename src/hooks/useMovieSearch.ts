import { useMemo } from 'react';
import { Movie } from '@/data/movies';

export const useMovieSearch = (movies: Movie[], searchQuery: string) => {
    const filteredMovies = useMemo(() => {
        if (!searchQuery.trim()) {
            return movies;
        }

        const query = searchQuery.toLowerCase().trim();

        return movies.filter((movie) => {
            // Search in title
            if (movie.title.toLowerCase().includes(query)) {
                return true;
            }

            // Search in genre (handle both string and array)
            const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
            if (genres.some((g) => g.toLowerCase().includes(query))) {
                return true;
            }

            // Search in year (exact or partial match)
            if (movie.year.includes(query) || query.includes(movie.year)) {
                return true;
            }

            // Search in cast
            if (movie.cast && movie.cast.some((actor) => actor.toLowerCase().includes(query))) {
                return true;
            }

            // Search in synopsis
            if (movie.synopsis && movie.synopsis.toLowerCase().includes(query)) {
                return true;
            }

            // Search in language
            if (movie.language && movie.language.toLowerCase().includes(query)) {
                return true;
            }

            // Search in audio type
            if (movie.audioType && movie.audioType.toLowerCase().includes(query)) {
                return true;
            }

            // Search in platform
            if (movie.platform && movie.platform.toLowerCase().includes(query)) {
                return true;
            }

            // Search in common category names
            const categoryMatches = [
                { keywords: ['anime', 'animation'], check: () => genres.some(g => g.toLowerCase().includes('anime') || g.toLowerCase().includes('animation')) },
                { keywords: ['trending', 'popular'], check: () => movie.rating >= 8.5 },
                { keywords: ['k-drama', 'kdrama', 'korean'], check: () => movie.language?.toLowerCase().includes('korean') || movie.title.toLowerCase().includes('korean') },
                { keywords: ['netflix'], check: () => movie.platform?.toLowerCase().includes('netflix') },
                { keywords: ['amazon', 'prime', 'amzn'], check: () => movie.platform?.toLowerCase().includes('amazon') || movie.platform?.toLowerCase().includes('prime') },
                { keywords: ['english'], check: () => movie.language?.toLowerCase().includes('english') || movie.audioType?.toLowerCase().includes('english') },
                { keywords: ['hindi', 'bollywood'], check: () => movie.language?.toLowerCase().includes('hindi') || movie.audioType?.toLowerCase().includes('hindi') },
                { keywords: ['web series', 'webseries', 'series', 'tv show'], check: () => movie.isSeries === true },
            ];

            for (const category of categoryMatches) {
                if (category.keywords.some(keyword => query.includes(keyword)) && category.check()) {
                    return true;
                }
            }

            return false;
        });
    }, [movies, searchQuery]);

    return {
        filteredMovies,
        resultsCount: filteredMovies.length,
        hasResults: filteredMovies.length > 0,
        isSearching: searchQuery.trim().length > 0,
    };
};
