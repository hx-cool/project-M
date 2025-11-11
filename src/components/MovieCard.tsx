import { Download, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  title: string;
  year: string;
  genre: string;
  rating: number;
  posterUrl?: string;
}

export const MovieCard = ({ title, year, genre, rating }: MovieCardProps) => {
  return (
    <div className="group relative aspect-[2/3] w-full overflow-hidden rounded-xl bg-surface shadow-cinema transition-cinema hover:scale-105 hover:shadow-xl">
      {/* Placeholder Poster */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-elevated to-surface">
        <div className="flex h-full items-center justify-center">
          <span className="text-center text-lg font-bold text-muted-foreground">{title}</span>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-4 translate-y-4 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
        {/* Genre Badge */}
        <Badge className="mb-2 border-pink/50 bg-pink/20 text-pink">
          {genre}
        </Badge>

        {/* Title */}
        <h3 className="mb-1 line-clamp-2 text-base font-semibold text-foreground">
          {title}
        </h3>

        {/* Metadata */}
        <div className="mb-3 flex items-center gap-3 text-xs text-muted-foreground">
          <span>{year}</span>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-pink text-pink" />
            <span>{rating}</span>
          </div>
        </div>

        {/* Download Button */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-pink text-white shadow-lg transition-cinema hover:scale-110 hover:glow-pink">
          <Download className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};
