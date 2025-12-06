import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MovieCard } from "@/components/MovieCard";
import { BackToTop } from "@/components/BackToTop";
import { MoviePagination } from "@/components/MoviePagination";
import { HeroSection } from "@/components/HeroSection";
import { NoResultsFound } from "@/components/NoResultsFound";
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";
import { API_URL } from "@/config/api";

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
  const { year, quality } = useParams<{ year?: string; quality?: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const [sortBy, setSortBy] = useState("latest");
  const [movies, setMovies] = useState<Movie[]>(propMovies || []);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { setSearchQuery } = useSearch();
  
  const displayName = year ? `${year} Movies` : quality ? `${quality.toUpperCase()} Quality Movies` : categoryName;
  
  const getCategoryLabel = () => {
    if (year) return `Category: ${year}`;
    if (quality) return `Category: ${quality.toUpperCase()}`;
    return `Category: ${categoryName.replace(' Movies', '').replace(' Shows', '')}`;
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const catLower = (year || quality || categoryName).toLowerCase();
        let url = `${API_URL}/api/movies`;
        
        // Handle year filter
        if (year) {
          url = `${API_URL}/api/movies/search?year=${year}`;
        }
        // Handle quality filter
        else if (quality) {
          url = `${API_URL}/api/movies/search?quality=${quality}`;
        }
        // For genre-based categories, use search endpoint
        else if (catLower.includes('action')) url = `${API_URL}/api/movies/search?genre=Action`;
        else if (catLower.includes('horror')) url = `${API_URL}/api/movies/search?genre=Horror`;
        else if (catLower.includes('comedy')) url = `${API_URL}/api/movies/search?genre=Comedy`;
        else if (catLower.includes('sci-fi') || catLower.includes('science')) url = `${API_URL}/api/movies/search?genre=Science Fiction`;
        else if (catLower.includes('drama')) url = `${API_URL}/api/movies/search?genre=Drama`;
        else if (catLower.includes('adventure')) url = `${API_URL}/api/movies/search?genre=Adventure`;
        else if (catLower.includes('animation')) url = `${API_URL}/api/movies/search?genre=Animation`;
        else if (catLower.includes('crime')) url = `${API_URL}/api/movies/search?genre=Crime`;
        else if (catLower.includes('documentary')) url = `${API_URL}/api/movies/search?genre=Documentary`;
        else if (catLower.includes('family')) url = `${API_URL}/api/movies/search?genre=Family`;
        else if (catLower.includes('fantasy')) url = `${API_URL}/api/movies/search?genre=Fantasy`;
        else if (catLower.includes('history')) url = `${API_URL}/api/movies/search?genre=History`;
        else if (catLower.includes('music')) url = `${API_URL}/api/movies/search?genre=Music`;
        else if (catLower.includes('mystery')) url = `${API_URL}/api/movies/search?genre=Mystery`;
        else if (catLower.includes('reality')) url = `${API_URL}/api/movies/search?genre=Reality`;
        else if (catLower.includes('romance')) url = `${API_URL}/api/movies/search?genre=Romance`;
        else if (catLower.includes('soap')) url = `${API_URL}/api/movies/search?genre=Soap`;
        else if (catLower.includes('talk')) url = `${API_URL}/api/movies/search?genre=Talk`;
        else if (catLower.includes('thriller')) url = `${API_URL}/api/movies/search?genre=Thriller`;
        else if (catLower.includes('war')) url = `${API_URL}/api/movies/search?genre=War`;
        else if (catLower.includes('western')) url = `${API_URL}/api/movies/search?genre=Western`;

        console.log('Fetching from:', url);
        const response = await fetch(url);
        const result = await response.json();
        const data = result.movies || result;
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
  }, [categoryName, propMovies, year, quality]);

  const handleGlobalSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/');
  };
  
  const moviesPerPage = 20;
  
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
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      
      <HeroSection />

      {/* Category Header */}
      <div className="py-2">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-sm md:text-base font-semibold flex items-center gap-2">
            <span className="text-white">📁</span>
            <span className="text-white uppercase">Category:</span>
            <span className="text-green-500 uppercase">{getCategoryLabel().replace('Category: ', '')}</span>
          </h1>
        </div>
      </div>

      {/* Movies Grid */}
      <main className="flex-1 py-2">
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
            <NoResultsFound />
          )}
          
          <MoviePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default CategoryPage;