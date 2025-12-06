import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { searchTMDB, getContentDetails, getTVSeasons } from "@/utils/tmdb";

interface TMDBSearchProps {
  onSelect: (data: any) => void;
}

export const TMDBSearch = ({ onSelect }: TMDBSearchProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTV, setSelectedTV] = useState<any>(null);
  const [seasons, setSeasons] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      console.log('Searching TMDB for:', query);
      const movies = await searchTMDB(query);
      console.log('TMDB search results:', movies);
      setResults(movies.slice(0, 5));
    } catch (error) {
      console.error('TMDB search error:', error);
      alert('TMDB search failed. Check console for details.');
    }
    setLoading(false);
  };

  const handleSelect = async (item: any) => {
    if (item.media_type === 'tv') {
      setLoading(true);
      const tvSeasons = await getTVSeasons(item.id);
      setSelectedTV(item);
      setSeasons(tvSeasons.filter(s => s.seasonNumber > 0)); // Remove specials
      setResults([]);
      setLoading(false);
    } else {
      setLoading(true);
      const details = await getContentDetails(item.id, item.media_type);
      onSelect(details);
      setResults([]);
      setQuery("");
      setLoading(false);
    }
  };

  const handleSeasonSelect = async (seasonNumber: number) => {
    setLoading(true);
    const details = await getContentDetails(selectedTV.id, 'tv', seasonNumber);
    onSelect(details);
    setSelectedTV(null);
    setSeasons([]);
    setQuery("");
    setLoading(false);
  };

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-lg">
      <Label className="text-white text-lg mb-2 block">🎬 TMDB Auto-Fill (Search Movies & TV Shows)</Label>
      {selectedTV && <p className="text-purple-300 text-sm mb-2">Select a season for "{selectedTV.name}" to auto-fill season-specific data</p>}
      <div className="flex gap-2 mb-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Type movie or TV show name and press Enter..."
          className="bg-gray-800 text-white border-gray-600"
        />
        <Button onClick={handleSearch} disabled={loading} className="bg-pink-600 hover:bg-pink-700">
          {loading ? 'Searching...' : <Search className="w-4 h-4" />}
        </Button>
        <Button 
          onClick={() => {
            console.log('Testing TMDB API...');
            fetch('https://api.themoviedb.org/3/search/multi?api_key=1cf50e6248dc270629e802686245c2c8&query=avengers')
              .then(r => {
                console.log('Response status:', r.status, r.statusText);
                return r.json();
              })
              .then(d => {
                console.log('Direct API test success:', d);
                if (d.results && d.results.length > 0) {
                  alert(`API works! Found ${d.results.length} results for Avengers`);
                } else {
                  alert('API works but no results found');
                }
              })
              .catch(e => {
                console.error('Direct API test failed:', e);
                alert('API test failed: ' + e.message);
              });
          }}
          variant="outline"
          className="text-xs px-2"
        >
          Test API
        </Button>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="flex gap-3 p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer transition"
            >
              {item.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-12 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <p className="text-white font-medium text-sm">{item.title || item.name}</p>
                <p className="text-gray-400 text-xs">
                  {(item.release_date || item.first_air_date)?.split('-')[0]} • ⭐ {item.vote_average?.toFixed(1)} • {item.media_type === 'tv' ? '📺 TV' : '🎬 Movie'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTV && seasons.length > 0 && (
        <div className="mt-4 p-3 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <p className="text-purple-300 text-sm mb-3">📺 Select Season for "{selectedTV.name}":</p>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {seasons.map((season) => (
              <div
                key={season.seasonNumber}
                onClick={() => handleSeasonSelect(season.seasonNumber)}
                className="flex gap-2 p-2 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer transition text-xs"
              >
                {season.posterPath && (
                  <img
                    src={season.posterPath}
                    alt={season.name}
                    className="w-8 h-12 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <p className="text-white font-medium">{season.name}</p>
                  <p className="text-gray-400">{season.episodeCount} episodes</p>
                  <p className="text-gray-500">{season.airDate?.split('-')[0]}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSelectedTV(null); setSeasons([]); }}
            className="mt-2 text-gray-400 text-xs hover:text-white"
          >
            ← Back to search
          </button>
        </div>
      )}
    </div>
  );
};
