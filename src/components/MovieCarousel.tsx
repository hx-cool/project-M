import { ChevronLeft, ChevronRight } from "lucide-react";
import { MovieCard } from "./MovieCard";
import { useRef } from "react";

interface MovieCarouselProps {
  title: string;
  movies: Array<{
    title: string;
    year: string;
    genre: string | string[];
    rating: number;
    quality?: string;
    duration?: string;
    synopsis?: string;
    cast?: string[];
  }>;
}

export const MovieCarousel = ({ title, movies }: MovieCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">{title}</h2>
        <a href="/browse" className="text-sm font-medium text-pink transition-colors hover:text-pink/80">
          View All →
        </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface-elevated/80 text-foreground backdrop-blur-sm transition-colors hover:bg-pink hover:text-white md:flex"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-surface-elevated/80 text-foreground backdrop-blur-sm transition-colors hover:bg-pink hover:text-white md:flex"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Movies Grid */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide md:gap-6"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {movies.map((movie, index) => (
              <div key={index} className="w-48 flex-shrink-0 md:w-60">
                <MovieCard {...movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
