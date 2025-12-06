import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Edit, Trash2, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAdminData } from "../hooks/useAdminData";

interface ContentListProps {
  onEditMovie?: (movieId: number) => void;
}

const ContentList = ({ onEditMovie }: ContentListProps) => {
  const { movies, loading, fetchMovies, deleteMovie, toggleTrending, toggleFeatured } = useAdminData();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOrigin, setFilterOrigin] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    fetchMovies();
  }, []);

  const editMovie = (movie: any) => {
    if (onEditMovie) {
      onEditMovie(movie.id);
    } else {
      localStorage.setItem('editMovieId', movie.id.toString());
      window.location.href = '/admin';
    }
  };

  const filteredMovies = movies
    .filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(movie => filterOrigin === 'All' || movie.movieOrigin === filterOrigin)
    .filter(movie => filterType === 'All' || (filterType === 'Web Series' && movie.isSeries) || (filterType === 'Trending' && movie.trending) || (filterType === 'Popular' && movie.featured))
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
  const paginatedMovies = filteredMovies.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white">All Movies ({filteredMovies.length})</CardTitle>
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
          <div className="space-y-2">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-gray-400 text-sm">Origin:</span>
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
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-gray-400 text-sm">Type:</span>
              {['All', 'Web Series', 'Trending', 'Popular'].map(type => (
                <Button
                  key={type}
                  size="sm"
                  variant={filterType === type ? "default" : "outline"}
                  onClick={() => setFilterType(type)}
                  className={filterType === type ? "bg-blue-600 hover:bg-blue-700" : "border-gray-600 text-gray-300 hover:bg-gray-700"}
                >
                  {type === 'Web Series' ? '📺 Web Series' : type === 'Trending' ? '🔥 Trending' : type === 'Popular' ? '⭐ Popular' : type}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 items-center">
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
          {paginatedMovies.map((movie) => (
            <div key={movie.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                {movie.posterUrl && (
                  <img 
                    src={movie.posterUrl} 
                    alt={movie.title} 
                    loading="lazy" 
                    className="w-12 h-16 object-cover rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
                <div>
                  <h3 className="text-white font-semibold">{movie.title}</h3>
                  <p className="text-gray-400 text-sm">
                    {movie.year} • Rating: {movie.rating || 'N/A'} • {movie.genres?.map(g => g.genre.name).join(', ')}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Downloads: {movie.downloads?.length || 0} • Added: {new Date(movie.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => toggleTrending(movie.id, movie.trending || false)}
                  className={movie.trending ? "border-orange-600 bg-orange-600/20 text-orange-400 hover:bg-orange-600 hover:text-white" : "border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"}
                  title={movie.trending ? "Remove from Trending" : "Add to Trending"}
                >
                  🔥
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => toggleFeatured(movie.id, movie.featured || false)}
                  className={movie.featured ? "border-yellow-600 bg-yellow-600/20 text-yellow-400 hover:bg-yellow-600 hover:text-white" : "border-gray-600 text-gray-400 hover:bg-gray-700 hover:text-white"}
                  title={movie.featured ? "Remove from Popular" : "Add to Popular"}
                >
                  ⭐
                </Button>
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
          ))}
          {movies.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-400">
              No movies found. Add your first movie!
            </div>
          )}
          {loading && (
            <div className="text-center py-8 text-gray-400">
              Loading movies...
            </div>
          )}
        </div>

        {totalPages > 1 && (
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
                Page {currentPage} of {totalPages} ({filteredMovies.length} total)
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
        )}
      </CardContent>
    </Card>
  );
};

export default ContentList;