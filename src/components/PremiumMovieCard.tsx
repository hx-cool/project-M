import { Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumMovieCardProps {
  title: string;
  year: string;
  quality: "WEB-DL" | "HD" | "4K" | "BluRay" | "HDTC";
  audio: "Hindi" | "English" | "Dual Audio";
  resolution: "360p" | "480p" | "720p" | "1080p" | "4K";
  posterUrl?: string;
  onDownload?: () => void;
  onWatchTrailer?: () => void;
}

export const PremiumMovieCard = ({
  title,
  year,
  quality,
  audio,
  resolution,
  posterUrl,
  onDownload,
  onWatchTrailer
}: PremiumMovieCardProps) => {
  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b0b0b] to-[#1a1a1a] shadow-lg transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,0,122,0.3)] hover:-translate-y-1">
      
      {/* Poster Section - 70% */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
        {/* Poster Image or Placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-surface-elevated to-muted transition-transform duration-500 group-hover:scale-103">
          {posterUrl ? (
            <img 
              src={posterUrl} 
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <span className="text-center text-lg font-bold text-muted-foreground/60 line-clamp-3">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* Quality Tag - Top Right */}
        <div className="absolute top-3 right-3 bg-pink px-3 py-1.5 rounded-full shadow-lg z-10">
          <span className="text-xs font-bold text-white tracking-wider uppercase">
            {quality}
          </span>
        </div>
      </div>

      {/* Content Section - 30% */}
      <div className="p-6 space-y-3 text-center">
        {/* Main Title */}
        <h3 className="text-lg font-bold text-white leading-tight line-clamp-2">
          Download {title}
        </h3>

        {/* Year */}
        <p className="text-muted-foreground font-medium">
          ({year})
        </p>

        {/* Audio */}
        <p className="text-sm text-muted-foreground/80">
          Audio: {audio}
        </p>

        {/* Quality */}
        <p className="text-sm text-muted-foreground/80">
          Quality: {resolution}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 space-y-2">
          <Button
            onClick={onDownload}
            className="w-full bg-pink hover:bg-pink/90 text-white font-bold py-2.5 rounded-lg transition-all duration-300 hover:glow-pink hover:shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          
          <Button
            onClick={onWatchTrailer}
            variant="outline"
            className="w-full border-2 border-pink/50 bg-transparent text-pink hover:bg-pink/10 hover:border-pink font-semibold py-2.5 rounded-lg transition-all duration-300 hover:glow-pink"
          >
            <Play className="h-4 w-4 mr-2" />
            Watch Trailer
          </Button>
        </div>
      </div>
    </div>
  );
};