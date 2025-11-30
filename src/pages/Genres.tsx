import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Film } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";

const genres = [
  { name: "Action", count: 1250, link: "/category/action" },
  { name: "Horror", count: 540, link: "/category/horror" },
  { name: "Comedy", count: 980, link: "/category/comedy" },
  { name: "Sci-Fi", count: 670, link: "/category/sci-fi" },
  { name: "Drama", count: 1100, link: "/category/drama" },
  { name: "Hindi", count: 850, link: "/category/hindi" },
  { name: "Web Series", count: 420, link: "/category/web-series" },
  { name: "Anime", count: 320, link: "/category/anime" },
  { name: "Trending", count: 180, link: "/category/trending" },
  { name: "K-Drama", count: 240, link: "/category/k-drama" },
  { name: "Netflix", count: 380, link: "/category/netflix" },
  { name: "English", count: 920, link: "/category/english" }
];

const Genres = () => {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch();

  const handleSearch = () => {
    (document.activeElement as HTMLElement)?.blur();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery.trim());
      navigate('/');
    }
  };



  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Section with Search */}
      <div className="bg-surface/30 backdrop-blur-sm py-2">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink to-magenta p-px">
                  <div className="h-full w-full rounded-2xl bg-white"></div>
                </div>
                <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="search"
                  placeholder="Search for movies, web series, anime…"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleSearch(); } }}
                  className="relative z-10 h-10 md:h-16 w-full rounded-2xl bg-transparent border-0 pl-6 pr-12 text-sm md:text-lg text-black placeholder:text-gray-400 focus:outline-none transition-all"
                />
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                className="hidden md:flex bg-gradient-to-r from-pink to-purple-600 text-white font-bold px-8 py-4 h-8 md:h-16 rounded-lg shadow-md"
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full py-1">
        <div className="relative w-full">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
          <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
        </div>
      </div>

      <div className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Browse by Genres
          </h1>
        </div>
      </div>

      <main className="py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {genres.map((genre) => (
              <a
                key={genre.name}
                href={genre.link}
                className="group relative overflow-hidden rounded-xl bg-surface/50 p-6 shadow-lg transition-all hover:scale-105 hover:shadow-xl border border-pink/20 hover:border-pink/50"
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-pink/20 backdrop-blur-sm">
                    <Film className="h-6 w-6 text-pink" />
                  </div>
                  <h3 className="mb-1 text-lg font-semibold text-white">{genre.name}</h3>
                  <p className="text-sm text-muted-foreground">{genre.count} movies</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default Genres;