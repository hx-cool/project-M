import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MovieCard } from "@/components/MovieCard";
import { TelegramBanner } from "@/components/TelegramBanner";
import { BackToTop } from "@/components/BackToTop";
import { MoviePagination } from "@/components/MoviePagination";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Tv, TrendingUp, Heart, Play, Monitor, Globe, X } from "lucide-react";
import { NoResultsFound } from "@/components/NoResultsFound";
import { useState, useEffect } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useMoviesFromDB } from "@/hooks/useMoviesFromDB";
import {
  allMovies,
  trendingMovies,
  newReleases,
  topImdb,
  hindiMovies,
  webSeries,
  upcomingReleases,
  actionMovies,
  horrorMovies,
  comedyMovies,
  dramaMovies,
  sciFiMovies
} from "@/data/movies";

const MovieSection = ({ title, movies }: { title: string; movies: any[] }) => {
  // Limit to two rows (10 cards for 5 columns)
  const extendedMovies = [...movies, ...movies].slice(0, 10);

  return (
    <section className="py-16">
      {/* Section Header */}
      <div className="w-full px-4 mb-12">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink to-transparent mx-auto rounded-full glow-pink"></div>
        </div>
      </div>

      {/* Movie Grid - Full Width */}
      <div className="w-full px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {extendedMovies.map((movie, index) => (
            <div
              key={index}
              className="w-full max-w-xs opacity-0 translate-y-8 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'forwards' }}
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
              />
            </div>
          ))}

          {/* See More Text Card */}
          <div className="w-full max-w-xs flex items-center justify-center">
            <div className="text-center py-8">
              <p className="text-pink font-bold text-lg hover:text-magenta transition-colors cursor-pointer">
                See More
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Gradient Divider */}
      <div className="w-full px-4 mt-20 mb-8">
        <div className="relative">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-pink/30 to-transparent"></div>
          <div className="absolute inset-0 w-full h-px bg-gradient-to-r from-transparent via-magenta/20 to-transparent blur-sm"></div>
        </div>
      </div>
    </section>
  );
};

const LoadMoreSection = ({ onLoadMore, isLoading }: { onLoadMore: () => void; isLoading: boolean }) => {
  return (
    <div className="py-16 text-center">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="bg-gradient-to-r from-pink to-magenta hover:from-magenta hover:to-luxury text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 hover:glow-pink hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Loading...' : 'Load More Movies'}
      </button>
    </div>
  );
};

const Index = () => {
  const [showMoreSections, setShowMoreSections] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const { searchQuery, setSearchQuery, clearSearch, isSearchActive } = useSearch();
  const { movies: dbMovies, loading: dbLoading } = useMoviesFromDB();

  // Combine database movies with existing movies
  const combinedMovies = [...dbMovies, ...allMovies];

  const moviesPerPage = 20;

  // Use the search hook
  const { filteredMovies, resultsCount, hasResults, isSearching } = useMovieSearch(combinedMovies, searchQuery);

  const totalPages = Math.ceil(combinedMovies.length / moviesPerPage);





  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);



  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowMoreSections(true);
      setIsLoading(false);
    }, 1000);
  };

  const getCurrentPageMovies = () => {
    // If searching, return filtered results
    if (isSearching) {
      return filteredMovies;
    }

    // Paginate for both mobile and desktop
    const startIndex = (currentPage - 1) * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    return combinedMovies.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };



  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <HeroSection />

      <main className="flex-1">
        {/* 0 Results Page */}
        {isSearching && resultsCount === 0 && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-8">0 Search Results</h2>
              
              <NoResultsFound />
            </div>
          </div>
        )}

        {/* Continuous Movie Grid */}
        {isSearching && resultsCount > 0 && (
          <div className="py-8">
            {/* Search Results Header */}
            <div className="max-w-7xl mx-auto px-4 mb-5" data-search-results>
              <h2 className="text-xl md:text-2xl font-bold text-white">
                {resultsCount} Search Results
              </h2>
            </div>

            {/* Movie Grid */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4 md:gap-6">
                {getCurrentPageMovies().map((movie, index) => (
                  <div
                    key={index}
                    className="w-full max-w-xs opacity-0 translate-y-8 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <MovieCard
                      title={movie.title}
                      slug={movie.slug}
                      year={movie.year}
                      genre={movie.genre}
                      rating={movie.rating}
                      quality={movie.quality}
                      duration={movie.duration}
                      synopsis={movie.synopsis}
                      cast={movie.cast}
                      posterUrl={movie.posterUrl}
                      releaseDate={movie.releaseDate}
                      language={movie.language}
                      audioType={movie.audioType}
                      size480p={movie.size480p}
                      size720p={movie.size720p}
                      size1080p={movie.size1080p}
                      fromDB={movie.fromDB}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Normal Homepage Grid */}
        {!isSearching && (
          <div className="py-4">
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4 md:gap-6">
                {getCurrentPageMovies().map((movie, index) => (
                  <div
                    key={index}
                    className="w-full max-w-xs opacity-0 translate-y-8 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                  >
                    <MovieCard
                      title={movie.title}
                      slug={movie.slug}
                      year={movie.year}
                      genre={movie.genre}
                      rating={movie.rating}
                      quality={movie.quality}
                      duration={movie.duration}
                      synopsis={movie.synopsis}
                      cast={movie.cast}
                      posterUrl={movie.posterUrl}
                      releaseDate={movie.releaseDate}
                      language={movie.language}
                      audioType={movie.audioType}
                      size480p={movie.size480p}
                      size720p={movie.size720p}
                      size1080p={movie.size1080p}
                      fromDB={movie.fromDB}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

          {!isSearching && (
            <div className="max-w-7xl mx-auto px-8">
              <MoviePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

        {/* Additional Sections (shown after Load More) */}
        {showMoreSections && (
          <>
            {/* Telegram Banner */}
            <div className="py-20">
              <TelegramBanner />
            </div>

            <MovieSection title="Dual Audio Movies" movies={hindiMovies} />
            <MovieSection title="Web Series" movies={webSeries} />
            <MovieSection title="Upcoming Releases" movies={upcomingReleases} />

            {/* Pagination */}
            <Pagination />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
};

export default Index;
