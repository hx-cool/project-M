import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  title: string;
  year: string;
  genre: string | string[];
  rating: number;
  posterUrl?: string;
  quality?: string;
  duration?: string;
  synopsis?: string;
  cast?: string[];
}

export const MovieCard = ({ 
  title, 
  year, 
  genre, 
  rating, 
  posterUrl,
  quality = "HD",
  duration,
  synopsis = "An incredible cinematic experience that will keep you on the edge of your seat from start to finish.",
  cast
}: MovieCardProps) => {
  const navigate = useNavigate();
  const genres = Array.isArray(genre) ? genre : [genre];
  
  // Generate URL-friendly ID from title
  const movieId = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  const handleCardClick = () => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#0B0B0B] to-[#1A1A1A] shadow-[0_4px_16px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_8px_24px_rgba(255,0,122,0.3)] hover:-translate-y-2 cursor-pointer"
    >
      {/* Poster Section - 70% of card */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
        {/* Poster Image Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-surface to-[#0B0B0B] transition-transform duration-500 group-hover:scale-103">
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-center text-base font-bold text-muted-foreground/60 line-clamp-4">
              {title}
            </span>
          </div>
        </div>

        {/* Quality Tag - Floating Top Right */}
        <div className="absolute top-3 right-3 bg-[#ff007a] px-3 py-1.5 rounded-lg shadow-lg z-10">
          <span className="text-xs font-bold text-white tracking-wider uppercase">{quality}</span>
        </div>

        {/* Rating Badge - Bottom Left */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg z-10">
          <Star className="h-4 w-4 fill-[#ff007a] text-[#ff007a]" />
          <span className="text-sm font-bold text-white">{rating}</span>
        </div>
      </div>

      {/* Content Section - 30% of card */}
      <div className="p-5 space-y-3">
        {/* Release Date */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {year}
        </p>

        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight line-clamp-2 group-hover:text-[#ff007a] transition-colors duration-300">
          {title}
        </h3>

        {/* Genre Badges */}
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 3).map((g, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold bg-[#ff007a]/10 text-[#ff007a] border border-[#ff007a]/30 rounded-full"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-300/80 leading-relaxed line-clamp-3">
          {synopsis}
        </p>

        {/* Duration */}
        {duration && (
          <p className="text-xs text-gray-500 font-medium">
            {duration}
          </p>
        )}
      </div>
    </div>
  );
};
