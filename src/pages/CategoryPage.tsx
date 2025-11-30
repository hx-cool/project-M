import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { BackToTop } from "@/components/BackToTop";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";

interface Movie {
  title: string;
  year: string;
  genre: string | string[];
  rating: number;
  quality?: string;
  duration?: string;
  synopsis?: string;
  cast?: string[];
  posterUrl: string;
}

interface CategoryPageProps {
  categoryName: string;
  movies: Movie[];
  description?: string;
}

const CategoryPage = ({ categoryName, movies, description }: CategoryPageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch();

  const handleGlobalSearch = () => {
    (document.activeElement as HTMLElement)?.blur();
    if (searchTerm.trim()) {
      setSearchQuery(searchTerm.trim());
      navigate('/');
    }
  };
  
  const moviesPerPage = 24;
  
  const sortedMovies = [...movies].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "year":
        return parseInt(b.year) - parseInt(a.year);
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
  
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const startIndex = (currentPage - 1) * moviesPerPage;
  const currentMovies = movies.slice(startIndex, startIndex + moviesPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Section with Search */}
      <div className="bg-surface/30 backdrop-blur-sm py-2">
        <div className="container mx-auto px-4">
          {/* White Search Bar */}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleGlobalSearch(); } }}
                  className="relative z-10 h-10 md:h-16 w-full rounded-2xl bg-transparent border-0 pl-6 pr-12 text-sm md:text-lg text-black placeholder:text-gray-400 focus:outline-none transition-all"
                />
              </div>
              <Button
                size="lg"
                onClick={handleGlobalSearch}
                className="hidden md:flex bg-gradient-to-r from-pink to-purple-600 text-white font-bold px-8 py-4 h-8 md:h-16 rounded-lg shadow-md"
              >
                Search
              </Button>
            </div>
          </div>
          
          {/* Mobile Category Section */}
          <div className="md:hidden">
            {/* Join Telegram Button */}
            <div className="flex justify-center mb-4">
              <Button className="bg-gradient-to-r from-pink to-magenta border border-pink/30 text-white font-medium px-5 py-2 rounded-xl shadow-[0_0_4px_rgba(255,0,128,0.15)] flex items-center gap-2 transition-all duration-300">
                <Send className="h-3.5 w-3.5" />
                Join Telegram
              </Button>
            </div>
            
            {/* First Row */}
            <div className="grid grid-cols-3 gap-2 mb-2.5 max-w-xs mx-auto">
              {[
                { name: 'Anime', link: '/category/anime' },
                { name: 'Trending', link: '/category/trending' },
                { name: 'K-Drama', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-2.5 py-1.5 bg-surface/20 border border-pink/30 text-white text-xs font-medium rounded-xl shadow-[0_0_3px_rgba(255,0,128,0.1)] hover:bg-surface/30 transition-all duration-300 text-center"
                >
                  {category.name}
                </a>
              ))}
            </div>
            
            {/* Second Row */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {[
                { name: 'AMZN Prime', link: '/category/amazon-prime' },
                { name: 'Netflix', link: '/category/netflix' },
                { name: 'English', link: '/category/english' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-2.5 py-1.5 bg-surface/20 border border-pink/30 text-white text-xs font-medium rounded-xl shadow-[0_0_3px_rgba(255,0,128,0.1)] hover:bg-surface/30 transition-all duration-300 text-center"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Desktop Category Buttons */}
          <div className="hidden md:flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
            {[
              { name: 'Action', link: '/category/action' },
              { name: 'Horror', link: '/category/horror' },
              { name: 'Comedy', link: '/category/comedy' },
              { name: 'Sci-Fi', link: '/category/sci-fi' },
              { name: 'Drama', link: '/category/drama' },
              { name: 'Hindi', link: '/category/hindi' },
              { name: 'Web Series', link: '/category/web-series' },
              { name: 'Anime', link: '/category/anime' },
              { name: 'Trending', link: '/category/trending' },
              { name: 'K-Drama', link: '/category/k-drama' },
              { name: 'Netflix', link: '/category/netflix' },
              { name: 'English', link: '/category/english' }
            ].map((category) => (
              <a
                key={category.name}
                href={category.link}
                className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border/50 text-foreground/90 text-sm font-medium rounded-full hover:bg-pink/10 hover:border-pink hover:text-pink hover:glow-pink transition-all duration-300 hover:scale-105 inline-block"
              >
                {category.name}
              </a>
            ))}
          </div>
          

        </div>
      </div>
      
      {/* Gradient Divider */}
      <div className="w-full py-1">
        <div className="relative w-full">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
          <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
        </div>
      </div>

      {/* Category Header */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Movies Grid */}
      <main className="py-4">
        <div className="container mx-auto px-4">
          {currentMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {currentMovies.map((movie, index) => (
                <div
                  key={index}
                  className="opacity-0 translate-y-8 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                >
                  <MovieCard
                    title={movie.title}
                    year={movie.year}
                    genre={movie.genre}
                    rating={movie.rating}
                    quality={movie.quality}
                    duration={movie.duration}
                    synopsis={movie.synopsis}
                    cast={movie.cast}
                    posterUrl={movie.posterUrl}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No movies found matching your search.</p>
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 px-4">
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="px-3 h-9 text-sm font-medium bg-surface text-foreground/80 border border-pink/30 rounded-lg hover:border-pink hover:glow-pink transition-all"
                >
                  &lt; Previous
                </button>
              )}
              {/* Always show page 1 */}
              <button
                onClick={() => handlePageChange(1)}
                className={`w-9 h-9 text-sm font-medium rounded-lg transition-all ${
                  currentPage === 1
                    ? 'bg-gradient-to-r from-pink to-magenta text-white border-2 border-white glow-neon'
                    : 'bg-surface text-foreground/80 border border-pink/30 hover:border-pink hover:glow-pink'
                }`}
              >
                1
              </button>
              
              {/* Show ellipsis if current page > 3 */}
              {currentPage > 3 && (
                <span className="text-foreground/60 text-sm">...</span>
              )}
              
              {/* Show previous page if not 1 or 2 */}
              {currentPage > 2 && (
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="w-9 h-9 text-sm font-medium rounded-lg transition-all bg-surface text-foreground/80 border border-pink/30 hover:border-pink hover:glow-pink"
                >
                  {currentPage - 1}
                </button>
              )}
              
              {/* Show current page if not page 1 */}
              {currentPage > 1 && (
                <button
                  onClick={() => handlePageChange(currentPage)}
                  className="w-9 h-9 text-sm font-medium rounded-lg transition-all bg-gradient-to-r from-pink to-magenta text-white border-2 border-white glow-neon"
                >
                  {currentPage}
                </button>
              )}
              
              {/* Show next page if not last */}
              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="w-9 h-9 text-sm font-medium rounded-lg transition-all bg-surface text-foreground/80 border border-pink/30 hover:border-pink hover:glow-pink"
                >
                  {currentPage + 1}
                </button>
              )}
              
              {/* Show ellipsis if not near end */}
              {currentPage < totalPages - 2 && (
                <span className="text-foreground/60 text-sm">...</span>
              )}
              {currentPage < totalPages && (
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="px-3 h-9 text-sm font-medium bg-surface text-foreground/80 border border-pink/30 rounded-lg hover:border-pink hover:glow-pink transition-all"
                >
                  Next &gt;
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default CategoryPage;