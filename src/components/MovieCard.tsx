import { Download, Star, Play, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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
  quality,
  duration,
  synopsis,
  cast
}: MovieCardProps) => {
  const genres = Array.isArray(genre) ? genre : [genre];
  
  return (
    <div className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-background to-surface shadow-cinema transition-all duration-500 hover:scale-[1.02] hover:glow-pink hover:shadow-xl">
      {/* Poster Section */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-surface">
          <div className="flex h-full items-center justify-center p-4">
            <span className="text-center text-lg font-bold text-muted-foreground line-clamp-3">{title}</span>
          </div>
        </div>
        
        {/* Quality Tag */}
        {quality && (
          <div className="absolute top-3 right-3 bg-pink px-3 py-1 rounded-md shadow-lg">
            <span className="text-xs font-bold text-white tracking-wide">{quality}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Metadata Row */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-pink text-pink" />
            <span className="font-semibold text-pink">{rating}</span>
          </div>
          <span>•</span>
          <span>{year}</span>
          {duration && (
            <>
              <span>•</span>
              <span>{duration}</span>
            </>
          )}
        </div>

        {/* Genre Chips */}
        <div className="flex flex-wrap gap-2">
          {genres.slice(0, 3).map((g, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium border border-pink/30 text-pink/90 rounded-full transition-all hover:bg-pink/10 hover:border-pink/50"
            >
              {g}
            </span>
          ))}
        </div>

        {/* Synopsis */}
        {synopsis && (
          <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed">
            {synopsis}
          </p>
        )}

        {/* Cast */}
        {cast && cast.length > 0 && (
          <div className="text-xs">
            <span className="text-muted-foreground">Cast: </span>
            <span className="text-pink/80 italic">{cast.slice(0, 2).join(", ")}</span>
          </div>
        )}

        {/* More Info Link */}
        <button className="flex items-center gap-1 text-xs text-pink/70 hover:text-pink transition-colors group/info">
          <Info className="h-3 w-3" />
          <span className="font-medium">More Info</span>
        </button>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            className="flex-1 bg-pink text-white font-semibold hover:bg-pink/90 hover:glow-pink shadow-lg"
            size="sm"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button 
            variant="outline"
            className="flex-1 border-2 border-pink/50 bg-transparent text-pink hover:bg-pink/10 hover:border-pink font-semibold"
            size="sm"
          >
            <Play className="h-4 w-4" />
            Trailer
          </Button>
        </div>
      </div>
    </div>
  );
};
