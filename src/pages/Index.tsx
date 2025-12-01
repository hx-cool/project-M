import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MovieCard } from "@/components/MovieCard";
import { TelegramBanner } from "@/components/TelegramBanner";
import { BackToTop } from "@/components/BackToTop";
import { Pagination } from "@/components/Pagination";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Send, Tv, TrendingUp, Heart, Play, Monitor, Globe, X } from "lucide-react";
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

const featuredCollections = [
  { title: "Marvel Cinematic Phase 6", year: "2025", genre: "Collection", rating: 9.0 },
  { title: "DC Universe Reborn", year: "2025", genre: "Collection", rating: 8.7 },
  { title: "Fast & Furious Legacy", year: "2024", genre: "Collection", rating: 8.5 },
  { title: "Mission Impossible Series", year: "2024", genre: "Collection", rating: 8.9 },
  { title: "James Bond Classics", year: "2024", genre: "Collection", rating: 9.1 },
  { title: "Star Wars Anthology", year: "2025", genre: "Collection", rating: 8.8 },
];

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
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const { searchQuery, setSearchQuery, clearSearch, isSearchActive } = useSearch();
  const { movies: dbMovies, loading: dbLoading } = useMoviesFromDB();

  // Combine database movies with existing movies
  const combinedMovies = [...dbMovies, ...allMovies];

  const moviesPerPage = isMobile ? 22 : 24; // 4 rows × 6 columns for desktop

  // Use the search hook
  const { filteredMovies, resultsCount, hasResults, isSearching } = useMovieSearch(combinedMovies, searchQuery);

  const totalPages = Math.ceil(combinedMovies.length / moviesPerPage);

  const handleMobileSearch = () => {
    (document.activeElement as HTMLElement)?.blur();
    setSearchQuery(localSearchQuery);
  };

  const handleMobileKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleMobileSearch();
    }
  };



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

  const handleClearMobileSearch = () => {
    setLocalSearchQuery("");
    clearSearch();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Section with Search */}
      <div className="bg-[#191919] py-6">
        <div className="max-w-7xl mx-auto px-4">
          {/* White Search Bar */}
          <div className="max-w-4xl mx-auto mb-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-pink to-magenta p-px">
                  <div className="h-full w-full rounded-md bg-gray-200"></div>
                </div>
                <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="search"
                  placeholder="Search for movies, web series, anime…"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleMobileSearch(); } }}
                  className="relative z-10 h-10 md:h-12 w-full rounded-md bg-transparent border-0 pl-6 pr-6 text-sm md:text-lg text-black placeholder:text-gray-400 focus:outline-none transition-all"
                />
              </div>
              <Button
                onClick={handleMobileSearch}
                size="lg"
                className="hidden md:flex bg-gradient-to-r from-pink to-purple-600 text-white font-bold px-8 py-4 h-8 md:h-12 rounded-md shadow-md"
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
          <div className="hidden md:block max-w-6xl mx-auto mt-2">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-4 justify-center mb-4">
              <a href="/category/netflix" className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-bold rounded-lg border-2 border-white/30 hover:scale-105 transition-all duration-200 inline-block">Netflix</a>
              <a href="/category/amazon-prime" className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold rounded-lg border-2 border-white/30 hover:scale-105 transition-all duration-200 inline-block">Amazon Prime</a>
              <a href="/category/disney" className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-bold rounded-lg border-2 border-white/30 hover:scale-105 transition-all duration-200 inline-block">Disney</a>
              <a href="/category/jiohotstar" className="px-6 py-2.5 bg-gradient-to-r from-blue-700 to-indigo-700 text-white text-sm font-bold rounded-lg border-2 border-white/30 hover:scale-105 transition-all duration-200 inline-block">Jiohotstar</a>
            </div>
            {/* Row 2 */}
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { name: 'Trending', link: '/category/trending' },
                { name: 'Hollywood', link: '/category/hollywood' },
                { name: 'Bollywood', link: '/category/bollywood' },
                { name: 'South Indian', link: '/category/south-indian' },
                { name: 'Web Series', link: '/category/web-series' },
                { name: 'Anime', link: '/category/anime' },
                { name: 'K-Drama', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-600 text-white text-sm font-bold rounded-lg border-2 border-white/30 hover:scale-105 transition-all duration-200 inline-block"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="w-full py-2">
        <div className="relative w-full">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
          <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
        </div>
      </div>

      <main>
        {!isSearching && <HeroSection />}

        {/* 0 Results Page */}
        {isSearching && resultsCount === 0 && (
          <div className="py-8">
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-8">0 Search Results</h2>
              
              <div className="min-h-[50vh] flex items-center justify-center">
                <div className="max-w-2xl mx-auto text-center">
                  <p className="text-gray-400 text-lg mb-8">We couldn't find what you're looking for</p>
              
                  <div className="bg-white/[0.03] rounded-2xl p-8 backdrop-blur-sm">
                    <h3 className="text-2xl font-bold text-pink mb-4">Request a Movie</h3>
                    <p className="text-gray-300 mb-6">Can't find your movie? Let us know and we'll add it!</p>
                    <Button className="bg-gradient-to-r from-pink to-magenta text-white font-bold px-8 py-3 rounded-lg">
                      <Send className="mr-2 h-5 w-5" />
                      Request on Telegram
                    </Button>
                  </div>
                </div>
              </div>
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

          {/* Pagination */}
          {!isSearching && (
            <div className="max-w-7xl mx-auto px-8 mt-8">
              <div className="flex justify-center items-center gap-2">
                {currentPage > 1 && (
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 text-sm font-medium bg-surface/80 text-foreground border border-pink/30 rounded-lg hover:border-pink hover:bg-pink/10 transition-all"
                  >
                    ← Previous
                  </button>
                )}

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handlePageChange(1)}
                    className={`w-10 h-10 text-sm font-medium rounded-lg transition-all ${currentPage === 1
                      ? 'bg-gradient-to-r from-pink to-magenta text-white shadow-lg'
                      : 'bg-surface/80 text-foreground/80 border border-pink/30 hover:border-pink'
                      }`}
                  >
                    1
                  </button>

                  {currentPage > 3 && <span className="text-foreground/40 px-2">...</span>}

                  {currentPage > 2 && currentPage !== 1 && (
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      className="w-10 h-10 text-sm font-medium rounded-lg bg-surface/80 text-foreground/80 border border-pink/30 hover:border-pink transition-all"
                    >
                      {currentPage - 1}
                    </button>
                  )}

                  {currentPage > 1 && (
                    <button
                      className="w-10 h-10 text-sm font-medium rounded-lg bg-gradient-to-r from-pink to-magenta text-white shadow-lg"
                    >
                      {currentPage}
                    </button>
                  )}

                  {currentPage < totalPages && (
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      className="w-10 h-10 text-sm font-medium rounded-lg bg-surface/80 text-foreground/80 border border-pink/30 hover:border-pink transition-all"
                    >
                      {currentPage + 1}
                    </button>
                  )}

                  {currentPage < totalPages - 2 && <span className="text-foreground/40 px-2">...</span>}
                </div>

                {currentPage < totalPages && (
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 text-sm font-medium bg-surface/80 text-foreground border border-pink/30 rounded-lg hover:border-pink hover:bg-pink/10 transition-all"
                  >
                    Next →
                  </button>
                )}
              </div>
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

        {/* Back to Top Button */}
        <BackToTop />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
