import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { BackToTop } from "@/components/BackToTop";
import { Pagination } from "@/components/Pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  platform?: string;
  isSeries?: boolean;
  episodeInfo?: string;
  releaseDate?: string;
  language?: string;
  audioType?: string;
  show4K?: boolean;
  slug?: string;
}

interface CategoryPageProps {
  categoryName: string;
  movies: Movie[];
  description?: string;
}

const CategoryPage = ({ categoryName, movies: propMovies, description }: CategoryPageProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [movies, setMovies] = useState<Movie[]>(propMovies || []);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery } = useSearch();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const catLower = categoryName.toLowerCase();
        let url = `http://${window.location.hostname}:3001/api/movies`;
        
        // For genre-based categories, use search endpoint
        if (catLower.includes('action')) url = `http://${window.location.hostname}:3001/api/movies/search?genre=Action`;
        else if (catLower.includes('horror')) url = `http://${window.location.hostname}:3001/api/movies/search?genre=Horror`;
        else if (catLower.includes('comedy')) url = `http://${window.location.hostname}:3001/api/movies/search?genre=Comedy`;
        else if (catLower.includes('sci-fi')) url = `http://${window.location.hostname}:3001/api/movies/search?genre=Sci-Fi`;
        else if (catLower.includes('drama')) url = `http://${window.location.hostname}:3001/api/movies/search?genre=Drama`;

        console.log('Fetching from:', url);
        const response = await fetch(url);
        const data = await response.json();
        console.log('Fetched data:', data.length, 'movies');
        
        // Apply additional filters for non-genre categories
        let filtered = data;
        if (catLower.includes('hindi')) filtered = data.filter((m: any) => m.movieOrigin === 'Bollywood');
        else if (catLower.includes('bollywood')) filtered = data.filter((m: any) => m.movieOrigin === 'Bollywood');
        else if (catLower.includes('english')) filtered = data.filter((m: any) => m.movieOrigin === 'Hollywood');
        else if (catLower.includes('hollywood')) filtered = data.filter((m: any) => m.movieOrigin === 'Hollywood');
        else if (catLower.includes('south indian')) filtered = data.filter((m: any) => m.movieOrigin === 'South Indian');
        else if (catLower.includes('anime')) filtered = data.filter((m: any) => m.movieOrigin === 'Anime');
        else if (catLower.includes('k-drama') || catLower.includes('korean')) filtered = data.filter((m: any) => m.movieOrigin === 'Korean');
        else if (catLower.includes('netflix')) filtered = data.filter((m: any) => m.platform === 'Netflix');
        else if (catLower.includes('amazon') || catLower.includes('prime')) filtered = data.filter((m: any) => m.platform === 'Amazon Prime');
        else if (catLower.includes('disney')) filtered = data.filter((m: any) => m.platform === 'Disney');
        else if (catLower.includes('jiohotstar')) filtered = data.filter((m: any) => m.platform === 'Jiohotstar');
        else if (catLower.includes('web series') || catLower.includes('series')) filtered = data.filter((m: any) => m.isSeries === true);
        else if (catLower.includes('trending')) filtered = data.filter((m: any) => m.trending === true);
        
        console.log('Filtered to:', filtered.length, 'movies');
        
        const formattedMovies = filtered.map((movie: any) => ({
          title: movie.title,
          year: movie.year || '2025',
          genre: movie.genres?.map((g: any) => g.genre.name).join(', ') || 'N/A',
          rating: movie.rating || 0,
          quality: movie.quality || 'HD',
          posterUrl: movie.posterUrl || '',
          duration: movie.duration,
          synopsis: movie.synopsis,
          cast: movie.cast?.map((c: any) => c.cast.name) || [],
          platform: movie.platform,
          isSeries: movie.isSeries,
          episodeInfo: movie.episodeInfo,
          releaseDate: movie.releaseDate,
          language: movie.language,
          audioType: movie.audioType,
          show4K: movie.show4K,
          slug: movie.slug
        }));
        
        console.log('Setting movies:', formattedMovies.length);
        setMovies(formattedMovies);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setMovies(propMovies || []);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [categoryName, propMovies]);

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
      <div className="bg-[#0F0F0F] py-6">
        <div className="container mx-auto px-4">
          {/* White Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-pink to-magenta p-px">
                  <div className="h-full w-full rounded-md bg-gray-100"></div>
                </div>
                <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="search"
                  placeholder="Search for movies, web series, anime…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleGlobalSearch(); } }}
                  className="relative z-10 h-10 md:h-12 w-full rounded-md bg-transparent border-0 pl-6 pr-12 text-sm md:text-lg text-black placeholder:text-gray-400 focus:outline-none transition-all"
                />
              </div>
              <Button
                size="lg"
                onClick={handleGlobalSearch}
                className="hidden md:flex bg-gradient-to-r from-pink to-purple-600 text-white font-bold px-8 py-4 h-8 md:h-12 rounded-md shadow-md"
              >
                Search
              </Button>
            </div>
          </div>
          
          {/* Mobile Category Section */}
          <div className="md:hidden">
            {/* Buttons */}
            <div className="flex justify-center gap-2 mb-4">
              <Button className="bg-[#0088cc] hover:bg-[#0077b3] text-white font-medium px-4 py-2.5 rounded-lg text-[10px] flex items-center gap-1.5 transition-all duration-300">
                <Send className="h-3 w-3" />
                Join Telegram
              </Button>
              <Button className="bg-[#df9917] hover:bg-[#c88815] text-white font-medium px-4 py-2.5 rounded-lg text-[10px] flex items-center gap-1.5 transition-all duration-300">
                <Download className="h-3 w-3" />
                How to Download
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {[
                { name: 'HOLLYWOOD', link: '/category/hollywood' },
                { name: 'BOLLYWOOD', link: '/category/bollywood' },
                { name: 'SOUTH INDIAN', link: '/category/south-indian' },
                { name: 'NETFLIX', link: '/category/netflix' },
                { name: 'AMZN Prime', link: '/category/amazon-prime' },
                { name: 'DISNEY', link: '/category/disney' },
                { name: 'JIOHOTSTAR', link: '/category/jiohotstar' },
                { name: 'TRENDING', link: '/category/trending' },
                { name: 'WEB SERIES', link: '/category/web-series' },
                { name: 'ANIME', link: '/category/anime' },
                { name: 'K-DRAMA', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-4 py-2.5 bg-gradient-to-r from-pink to-purple-600 text-white text-[10px] font-bold uppercase rounded-lg transition-all duration-300 text-center whitespace-nowrap"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
          
          {/* Desktop Category Buttons */}
          <div className="hidden md:block max-w-6xl mx-auto mt-2">
            {/* Buttons */}
            <div className="flex justify-center gap-3 mb-4">
              <Button className="bg-[#0088cc] hover:bg-[#0077b3] text-white font-medium px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300">
                <Send className="h-4 w-4" />
                Join Telegram
              </Button>
              <Button className="bg-[#df9917] hover:bg-[#c88815] text-white font-medium px-6 py-2.5 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-300">
                <Download className="h-4 w-4" />
                How to Download
              </Button>
            </div>
            {/* Row 1 */}
            <div className="flex flex-wrap gap-3 justify-center mb-3">
              {[
                { name: 'HOLLYWOOD', link: '/category/hollywood' },
                { name: 'BOLLYWOOD', link: '/category/bollywood' },
                { name: 'SOUTH INDIAN', link: '/category/south-indian' },
                { name: 'HORROR', link: '/category/horror' },
                { name: 'ANIME', link: '/category/anime' },
                { name: 'TRENDING', link: '/category/trending' },
                { name: 'WEB SERIES', link: '/category/web-series' },
                { name: 'K-DRAMA', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className={`px-5 py-2.5 bg-gradient-to-r from-pink to-purple-600 text-white text-xs font-bold uppercase rounded-xl hover:scale-x-105 hover:shadow-[0_8px_20px_rgba(255,20,147,0.5)] transition-all duration-300 inline-block whitespace-nowrap ${location.pathname === category.link ? 'shadow-[0_8px_20px_rgba(255,20,147,0.6)]' : ''}`}
                >
                  {category.name}
                </a>
              ))}
            </div>
            {/* Row 2 */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: 'NETFLIX', link: '/category/netflix' },
                { name: 'AMZN Prime', link: '/category/amazon-prime' },
                { name: 'DISNEY', link: '/category/disney' },
                { name: 'JIOHOTSTAR', link: '/category/jiohotstar' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className={`px-5 py-2.5 bg-gradient-to-r from-pink to-purple-600 text-white text-xs font-bold uppercase rounded-xl hover:scale-x-105 hover:shadow-[0_8px_20px_rgba(255,20,147,0.5)] transition-all duration-300 inline-block whitespace-nowrap ${location.pathname === category.link ? 'shadow-[0_8px_20px_rgba(255,20,147,0.6)]' : ''}`}
                >
                  {category.name}
                </a>
              ))}
            </div>
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
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {categoryName}
          </h1>
        </div>
      </div>

      {/* Movies Grid */}
      <main className="py-4">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Loading movies...</p>
            </div>
          ) : currentMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4 md:gap-6">
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
                    platform={movie.platform}
                    isSeries={movie.isSeries}
                    episodeInfo={movie.episodeInfo}
                    releaseDate={movie.releaseDate}
                    language={movie.language}
                    audioType={movie.audioType}
                    show4K={movie.show4K}
                    slug={movie.slug}
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