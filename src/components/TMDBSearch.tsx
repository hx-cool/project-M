import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { searchTMDB, getMovieDetails } from "@/utils/tmdb";

interface TMDBSearchProps {
  onSelect: (data: any) => void;
}

export const TMDBSearch = ({ onSelect }: TMDBSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const movies = await searchTMDB(query);
    setResults(movies.slice(0, 5));
    setLoading(false);
  };

  const handleSelect = async (movie: any) => {
    setLoading(true);
    const details = await getMovieDetails(movie.id);
    onSelect(details);
    setResults([]);
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-lg">
      <Label className="text-white text-lg mb-2 block">🎬 TMDB Auto-Fill (Search Movie)</Label>
      <div className="flex gap-2 mb-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Type movie name and press Enter..."
          className="bg-gray-800 text-white border-gray-600"
        />
        <Button onClick={handleSearch} disabled={loading} className="bg-pink-600 hover:bg-pink-700">
          <Search className="w-4 h-4" />
        </Button>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {results.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleSelect(movie)}
              className="flex gap-3 p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer transition"
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{movie.title}</p>
                <p className="text-gray-400 text-xs">
                  {movie.release_date?.split('-')[0]} • ⭐ {movie.vote_average?.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
