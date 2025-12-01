import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, Film, Users, Tag, FolderOpen, BarChart3, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Movie {
  id: number;
  title: string;
  year?: string;
  rating?: number;
  posterUrl?: string;
  quality?: string;
  movieOrigin?: string;
  createdAt: string;
  genres: Array<{ genre: { name: string } }>;
  cast: Array<{ cast: { name: string } }>;
  downloads: Array<{ resolution: string; size?: string; link?: string }>;
}

interface Genre {
  id: number;
  name: string;
  _count: { movies: number };
}

interface Stats {
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

const AdminCRUD = () => {
  const [activeTab, setActiveTab] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('tab') || 'dashboard';
  });
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [newGenre, setNewGenre] = useState('');
  const [editingGenre, setEditingGenre] = useState<Genre | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    if (activeTab === 'dashboard') fetchStats();
    if (activeTab === 'movies') fetchMovies();
    if (activeTab === 'genres') fetchGenres();
    
    // Clear URL params after loading
    if (window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [activeTab]);

  // Auto-refresh movies when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && activeTab === 'movies') {
        fetchMovies();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/stats`);
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/movies`);
      const data = await response.json();
      console.log('Fetched movies:', data.length);
      setMovies(data);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/genres`);
      const data = await response.json();
      setGenres(data);
    } catch (error) {
      console.error('Failed to fetch genres:', error);
    }
  };



  const editMovie = (movie: Movie) => {
    localStorage.setItem('editMovieId', movie.id.toString());
    window.location.href = '/admin';
  };

  const deleteMovie = async (id: number) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/movies/${id}`, {
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

  const addGenre = async () => {
    if (!newGenre.trim()) return;
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/genres`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newGenre }),
      });
      if (response.ok) {
        setNewGenre('');
        fetchGenres();
        alert('Genre added successfully!');
      }
    } catch (error) {
      console.error('Failed to add genre:', error);
    }
  };

  const updateGenre = async (id: number, name: string) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/genres/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        setEditingGenre(null);
        fetchGenres();
        alert('Genre updated successfully!');
      }
    } catch (error) {
      console.error('Failed to update genre:', error);
    }
  };

  const deleteGenre = async (id: number) => {
    try {
      const response = await fetch(`http://${window.location.hostname}:3001/api/admin/genres/${id}`, {
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



  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Admin Panel - Complete CRUD Operations</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="dashboard" className="text-white data-[state=active]:bg-pink-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="movies" className="text-white data-[state=active]:bg-pink-600">
              <Film className="w-4 h-4 mr-2" />
              Movies ({movies.length})
            </TabsTrigger>
            <TabsTrigger value="genres" className="text-white data-[state=active]:bg-pink-600">
              <Tag className="w-4 h-4 mr-2" />
              Genres ({genres.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {stats && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">Total Movies</CardTitle>
                      <Film className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.movieCount}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">Genres</CardTitle>
                      <Tag className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.genreCount}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">Total Downloads</CardTitle>
                      <Users className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.totalDownloads || 0}</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white">This Month</CardTitle>
                      <FolderOpen className="h-4 w-4 text-pink-500" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{stats.monthlyMovies || 0}</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Movies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {stats.recentMovies.map((movie) => (
                        <div key={movie.id} className="flex justify-between items-center p-3 bg-gray-800 rounded">
                          <span className="font-medium text-white">{movie.title}</span>
                          <span className="text-sm text-gray-400">
                            {new Date(movie.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          <TabsContent value="movies">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">All Movies ({movies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).filter(m => filterOrigin === 'All' || m.movieOrigin === filterOrigin).length})</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    onClick={fetchMovies} 
                    variant="outline"
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    Refresh
                  </Button>
                  <Button 
                    onClick={() => window.location.href = '/admin'} 
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Movie
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search movies by title..."
                      className="bg-gray-800 text-white border-gray-700 pl-10"
                    />
                  </div>
                  <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-gray-400 text-sm">Filter:</span>
                    {['All', 'Hollywood', 'Bollywood', 'South Indian', 'Korean', 'Anime'].map(origin => (
                      <Button
                        key={origin}
                        size="sm"
                        variant={filterOrigin === origin ? "default" : "outline"}
                        onClick={() => setFilterOrigin(origin)}
                        className={filterOrigin === origin ? "bg-pink-600 hover:bg-pink-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
                      >
                        {origin}
                      </Button>
                    ))}
                    <div className="ml-auto flex gap-2 items-center">
                      <span className="text-gray-400 text-sm">Sort:</span>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px] bg-gray-800 text-white border-gray-700">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="title-asc">Title A-Z</SelectItem>
                          <SelectItem value="title-desc">Title Z-A</SelectItem>
                          <SelectItem value="rating-high">Rating High-Low</SelectItem>
                          <SelectItem value="rating-low">Rating Low-High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="grid gap-4">
                  {(() => {
                    const filtered = movies
                      .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
                      .filter(movie => filterOrigin === 'All' || movie.movieOrigin === filterOrigin)
                      .sort((a, b) => {
                        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                        if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                        if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
                        if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
                        if (sortBy === 'rating-high') return (b.rating || 0) - (a.rating || 0);
                        if (sortBy === 'rating-low') return (a.rating || 0) - (b.rating || 0);
                        return 0;
                      });
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    return filtered.slice(startIndex, endIndex).map((movie) => (
                      <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        {movie.posterUrl && (
                          <img src={movie.posterUrl} alt={movie.title} className="w-12 h-16 object-cover rounded" />
                        )}
                        <div>
                          <h3 className="text-white font-semibold">{movie.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {movie.year} • Rating: {movie.rating || 'N/A'} • {movie.genres.map(g => g.genre.name).join(', ')}
                          </p>
                          <p className="text-gray-500 text-xs">
                            Downloads: {movie.downloads.length} • Added: {new Date(movie.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editMovie(movie)} className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-900 border-gray-700">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">Delete Movie</AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete "{movie.title}"? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="bg-gray-800 text-white border-gray-600">Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => deleteMovie(movie.id)} className="bg-red-600 hover:bg-red-700">
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      </div>
                    ));
                  })()}
                  {movies.length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      No movies found. Add your first movie!
                    </div>
                  )}
                </div>
                {(() => {
                  const filtered = movies
                    .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
                    .filter(movie => filterOrigin === 'All' || movie.movieOrigin === filterOrigin);
                  const totalPages = Math.ceil(filtered.length / itemsPerPage);
                  if (totalPages <= 1) return null;
                  return (
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">Show:</span>
                        <Select value={itemsPerPage.toString()} onValueChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1); }}>
                          <SelectTrigger className="w-[100px] bg-gray-800 text-white border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-400">per page</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">
                          Page {currentPage} of {totalPages} ({filtered.length} total)
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                          className="border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                          className="border-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="genres">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Manage Genres</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <Input
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    placeholder="Add new genre"
                    className="bg-gray-800 text-white border-gray-700"
                    onKeyPress={(e) => e.key === 'Enter' && addGenre()}
                  />
                  <Button onClick={addGenre} className="bg-pink-600 hover:bg-pink-700">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="grid gap-2">
                  {genres.map((genre) => (
                    <div key={genre.id} className="flex items-center justify-between p-3 bg-gray-800 rounded">
                      {editingGenre?.id === genre.id ? (
                        <div className="flex gap-2 flex-1">
                          <Input
                            defaultValue={genre.name}
                            className="bg-gray-700 text-white border-gray-600"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                updateGenre(genre.id, (e.target as HTMLInputElement).value);
                              }
                            }}
                          />
                          <Button size="sm" onClick={() => setEditingGenre(null)} variant="outline" className="border-gray-600 text-white">
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div>
                            <span className="text-white">{genre.name}</span>
                            <span className="text-gray-400 text-sm ml-2">({genre._count.movies} movies)</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => setEditingGenre(genre)} className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-gray-900 border-gray-700">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-white">Delete Genre</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-400">
                                    Delete "{genre.name}"? This will remove it from {genre._count.movies} movies.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-gray-800 text-white border-gray-600">Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteGenre(genre.id)} className="bg-red-600 hover:bg-red-700">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>


        </Tabs>
      </div>
    </div>
  );
};

export default AdminCRUD;