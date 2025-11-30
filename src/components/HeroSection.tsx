import { Download, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const heroMovies = [
  {
    title: "Night Runner",
    year: "2025",
    duration: "117 min",
    genre: "Action Thriller",
    rating: 8.5,
    downloads: "2.3K",
    description: "A former intelligence agent must race against time through the neon-lit streets of a dystopian city to prevent a catastrophic cyber attack.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop"
  },
  {
    title: "Quantum Shift",
    year: "2025",
    duration: "142 min",
    genre: "Sci-Fi Adventure",
    rating: 9.1,
    downloads: "4.7K",
    description: "When reality begins to fracture, a physicist must navigate parallel universes to prevent total collapse of the multiverse.",
    image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=1920&h=1080&fit=crop"
  },
  {
    title: "Silent Echo",
    year: "2024",
    duration: "98 min",
    genre: "Mystery Thriller",
    rating: 8.4,
    downloads: "3.1K",
    description: "A sound engineer discovers mysterious audio recordings that lead her into a dangerous conspiracy involving government secrets.",
    image: "https://images.unsplash.com/photo-1489599735734-79b4fc8a2ade?w=1920&h=1080&fit=crop"
  }
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [currentMovie, setCurrentMovie] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentMovie((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentMovie((prev) => (prev + 1) % heroMovies.length);
    }
    if (isRightSwipe) {
      setCurrentMovie((prev) => (prev - 1 + heroMovies.length) % heroMovies.length);
    }
  };

  const movie = heroMovies[currentMovie];

  return (
    <section 
      className="relative h-[35vh] md:h-[70vh] min-h-[280px] md:min-h-[500px] w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image with Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 bg-gray-900"
        style={{ 
          backgroundImage: `url(${movie.image})`,
          filter: 'brightness(1.1) saturate(1.1)',
          transform: 'scale(1.05)'
        }}
      >
        {/* Bottom to Top Dark Gradient for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        
        {/* Accent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink/10 via-transparent to-magenta/10" />
        
        {/* Film Grain Overlay */}
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")', backgroundSize: '256px 256px' }} />
      </div>

      {/* Content */}
      <div 
        className="container relative mx-auto flex h-full items-end px-4 pb-6 md:pb-12 cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => {
          setIsPaused(true);
          navigate(`/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`);
        }}
      >
        <div className="max-w-2xl space-y-1.5 md:space-y-4">
          {/* Featured Release Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-pink/50 bg-gradient-to-r from-pink/20 to-purple-600/20 backdrop-blur-sm">
            <span className="text-xs font-medium text-white">Featured Release</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white" style={{ textShadow: '0 0 8px rgba(255, 0, 127, 0.3)' }}>
            {movie.title}
          </h1>

          {/* Rating and Metadata */}
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <Star className="h-3 w-3 fill-pink text-pink" />
              <span className="font-bold">{movie.rating}</span>
              <span>•</span>
              <span>{movie.year}</span>
              <span>•</span>
              <span>{movie.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/80">
              <span>{movie.genre}</span>
              <span>•</span>
              <span>{movie.downloads} downloads</span>
            </div>
          </div>

          {/* Download Button */}
          <div className="pt-2">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                window.open(`/movie/${movie.title.toLowerCase().replace(/\s+/g, '-')}`, '_blank');
              }}
              className="gap-2 bg-gradient-to-r from-pink to-purple-600 text-white font-medium px-4 py-1.5 md:px-8 md:py-3 rounded-full transition-all duration-300 hover:translate-y-[-1px] text-xs md:text-base w-auto shadow-sm hover:shadow-md" 
              style={{ boxShadow: '0 0 8px rgba(255, 0, 127, 0.3)' }}
            >
              <Download className="h-3 w-3 md:h-4 md:w-4" />
              Download Now
            </Button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 md:bottom-6 left-1/2 transform -translate-x-1/2 md:left-auto md:right-6 md:transform-none flex gap-1.5">
        {heroMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentMovie(index)}
            className={`h-1.5 w-4 md:h-2 md:w-8 rounded-full transition-all duration-300 ${
              index === currentMovie 
                ? 'bg-gradient-to-r from-pink to-purple-600' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Bottom Fade Transition */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent opacity-60"></div>
    </section>
  );
};
