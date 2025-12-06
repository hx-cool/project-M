import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { MovieCard } from "@/components/MovieCard";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { allMovies } from "@/data/movies";
import { useMovieSearch } from "@/hooks/useMovieSearch";
import { useMoviesFromDB } from "@/hooks/useMoviesFromDB";

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("s") || "";

    const { movies: dbMovies } = useMoviesFromDB();
    const combinedMovies = [...dbMovies, ...allMovies];
    const { filteredMovies, resultsCount, isSearching } = useMovieSearch(combinedMovies, query);

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <HeroSection />

            <main className="flex-1">
                {/* Search Results Header */}
                {isSearching && (
                    <>
                        <div className="py-2">
                            <div className="max-w-7xl mx-auto px-8">
                                <h1 className="text-sm md:text-base font-semibold flex items-center gap-2">
                                    <span className="text-white uppercase">( {resultsCount}      ) results for </span>
                                    <span className="text-green-500 uppercase">"{query.replace(/\+/g, ' ')}"
                                    </span>
                                </h1>
                            </div>
                        </div>
                        <div className="py-2">

                        {/* Results Grid */}
                        {filteredMovies.length > 0 ? (
                            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-4 md:gap-6">
                                    {filteredMovies.map((movie, index) => (
                                        <div
                                            key={index}
                                            className="w-full max-w-xs opacity-0 translate-y-8 animate-fade-in-up"
                                            style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                                        >
                                            <MovieCard {...movie} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="min-h-[50vh] flex items-center justify-center">
                                <div className="max-w-2xl mx-auto text-center px-4">
                                    <p className="text-gray-400 text-lg mb-8">We couldn't find "{query.replace(/\+/g, ' ')}"</p>
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
                        )}
                        </div>
                    </>
                )}
            </main>

            <Footer />
            <BackToTop />
        </div>
    );
};

export default SearchResults;
