import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { MovieCard } from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { allMovies } from "@/data/movies";
import { useMovieSearch } from "@/hooks/useMovieSearch";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    const [sortBy, setSortBy] = useState<"relevance" | "year" | "rating" | "title">("relevance");
    const [filterGenre, setFilterGenre] = useState<string>("all");
    const [filterYear, setFilterYear] = useState<string>("all");
    const [showFilters, setShowFilters] = useState(false);

    const { filteredMovies, resultsCount, isSearching } = useMovieSearch(allMovies, query);

    // Get unique genres and years for filters
    const genres = Array.from(new Set(allMovies.flatMap(m => Array.isArray(m.genre) ? m.genre : [m.genre])));
    const years = Array.from(new Set(allMovies.map(m => m.year))).sort((a, b) => b.localeCompare(a));

    // Apply additional filters and sorting
    const processedMovies = filteredMovies
        .filter(movie => {
            if (filterGenre !== "all") {
                const movieGenres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];
                if (!movieGenres.includes(filterGenre)) return false;
            }
            if (filterYear !== "all" && movie.year !== filterYear) return false;
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "year":
                    return b.year.localeCompare(a.year);
                case "rating":
                    return b.rating - a.rating;
                case "title":
                    return a.title.localeCompare(b.title);
                default:
                    return 0; // relevance (keep search order)
            }
        });

    const handleClearFilters = () => {
        setSortBy("relevance");
        setFilterGenre("all");
        setFilterYear("all");
    };

    const hasActiveFilters = sortBy !== "relevance" || filterGenre !== "all" || filterYear !== "all";

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* Search Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Search className="h-6 w-6 text-pink" />
                        <h1 className="text-2xl md:text-3xl font-bold">
                            {isSearching ? (
                                <>Search Results for "{query}"</>
                            ) : (
                                <>Search Movies & Series</>
                            )}
                        </h1>
                    </div>

                    {isSearching && (
                        <p className="text-gray-400 text-sm">
                            Found {processedMovies.length} {processedMovies.length === 1 ? 'result' : 'results'}
                            {resultsCount !== processedMovies.length && ` (${resultsCount} total, ${processedMovies.length} after filters)`}
                        </p>
                    )}
                </div>

                {/* Filters Bar */}
                {isSearching && resultsCount > 0 && (
                    <div className="mb-6 bg-white/[0.03] rounded-xl p-4 md:p-6">
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <SlidersHorizontal className="h-5 w-5 text-pink" />
                                <h2 className="text-lg font-semibold">Filters & Sort</h2>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="md:hidden"
                                >
                                    <Filter className="h-4 w-4 mr-2" />
                                    {showFilters ? 'Hide' : 'Show'} Filters
                                </Button>

                                {hasActiveFilters && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleClearFilters}
                                        className="border-pink/50 text-pink hover:bg-pink/10"
                                    >
                                        <X className="h-4 w-4 mr-2" />
                                        Clear Filters
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${showFilters ? 'block' : 'hidden md:grid'}`}>
                            {/* Sort By */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-pink focus:ring-2 focus:ring-pink/50 outline-none"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="year">Year (Newest First)</option>
                                    <option value="rating">Rating (Highest First)</option>
                                    <option value="title">Title (A-Z)</option>
                                </select>
                            </div>

                            {/* Filter by Genre */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Genre</label>
                                <select
                                    value={filterGenre}
                                    onChange={(e) => setFilterGenre(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-pink focus:ring-2 focus:ring-pink/50 outline-none"
                                >
                                    <option value="all">All Genres</option>
                                    {genres.map(genre => (
                                        <option key={genre} value={genre}>{genre}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Filter by Year */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Year</label>
                                <select
                                    value={filterYear}
                                    onChange={(e) => setFilterYear(e.target.value)}
                                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-2 text-white focus:border-pink focus:ring-2 focus:ring-pink/50 outline-none"
                                >
                                    <option value="all">All Years</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results */}
                {!isSearching ? (
                    <div className="text-center py-20">
                        <Search className="h-20 w-20 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-400 mb-2">Start Searching</h2>
                        <p className="text-gray-500">Enter a movie or series name in the search bar above</p>
                    </div>
                ) : processedMovies.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="bg-white/[0.03] rounded-xl p-8 max-w-md mx-auto">
                            <X className="h-16 w-16 text-pink mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2">No Results Found</h2>
                            <p className="text-gray-400 mb-6">
                                We couldn't find any movies or series matching "{query}"
                                {hasActiveFilters && " with the selected filters"}
                            </p>
                            {hasActiveFilters && (
                                <Button
                                    onClick={handleClearFilters}
                                    className="bg-gradient-to-r from-pink to-magenta hover:opacity-90"
                                >
                                    Clear Filters
                                </Button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {processedMovies.map((movie) => (
                            <MovieCard key={movie.title} {...movie} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
            <BackToTop />
        </div>
    );
};

export default SearchResults;
