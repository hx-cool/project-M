import { useState, useEffect } from 'react';
import { API_URL } from '@/config/api';
import { Movie, Genre, Stats } from '../types';

export const useAdminData = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/admin/movies`);
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/genres`);
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/api/admin/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const deleteMovie = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/movies/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Movie deleted successfully!');
        fetchMovies();
      } else {
        alert('Failed to delete movie');
      }
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  };

  const toggleTrending = async (id: number, currentValue: boolean) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trending: !currentValue }),
      });
      if (response.ok) {
        fetchMovies();
      }
    } catch (error) {
      console.error('Failed to toggle trending:', error);
    }
  };

  const toggleFeatured = async (id: number, currentValue: boolean) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !currentValue }),
      });
      if (response.ok) {
        fetchMovies();
      }
    } catch (error) {
      console.error('Failed to toggle featured:', error);
    }
  };

  const addGenre = async (name: string) => {
    if (!name.trim()) return;
    try {
      const response = await fetch(`${API_URL}/api/admin/genres`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        fetchGenres();
        alert('Genre added successfully!');
      }
    } catch (error) {
      console.error('Failed to add genre:', error);
    }
  };

  const updateGenre = async (id: number, name: string) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/genres/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        fetchGenres();
        alert('Genre updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update genre:', error);
    }
  };

  const deleteGenre = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/genres/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchGenres();
        alert('Genre deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete genre:', error);
    }
  };

  return {
    movies,
    genres,
    stats,
    loading,
    fetchMovies,
    fetchGenres,
    fetchStats,
    deleteMovie,
    toggleTrending,
    toggleFeatured,
    addGenre,
    updateGenre,
    deleteGenre,
  };
};