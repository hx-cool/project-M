import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  title: string;
  slug?: string;
  year: string;
  genre: string | string[];
  rating?: number;
  posterUrl?: string;
  quality?: "WEB-DL" | "HD" | "4K" | "BluRay" | "HDTC";
  duration?: string;
  synopsis?: string;
  cast?: string[];
  language?: string;
  audioType?: "Dual Audio" | "Hindi" | "English" | "Multi Audio";
  platform?: string;
  season?: string;
  releaseDate?: string;
  size480p?: string;
  size720p?: string;
  size1080p?: string;
  fromDB?: boolean;
}

export const MovieCard = ({
  title,
  slug,
  year,
  genre,
  rating,
  posterUrl,
  quality = "HD",
  duration,
  synopsis,
  cast,
  language = "Hindi-English",
  audioType = "Dual Audio",
  platform,
  season,
  releaseDate = "NOVEMBER 18, 2025",
  size480p = "520MB",
  size720p = "1GB",
  size1080p = "2.1GB",
  fromDB = false
}: MovieCardProps) => {
  const navigate = useNavigate();
  const genres = Array.isArray(genre) ? genre : [genre];

  // Use slug if available, otherwise generate from title
  const movieId = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleCardClick = () => {
    window.history.replaceState({}, '', '/');
    navigate(`/movie/${movieId}`);
  };





  const fileSizes = {
    "480p": size480p,
    "720p": size720p,
    "1080p": size1080p
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer relative w-full max-w-[200px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#000000] to-[#0d0d0d] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
    >
      {/* Poster Section */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-t-2xl">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-surface via-surface-elevated to-muted">
            <span className="text-center text-sm font-bold text-muted-foreground/60 p-4">
              {title}
            </span>
          </div>
        )}
        
        {/* Database Badge */}
        {fromDB && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-[8px] font-bold px-2 py-1 rounded-full">
            DB
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3">
        {/* Release Date */}
        <div className="text-center text-white/60 text-[10px] font-medium mb-2">
          {(releaseDate || "NOVEMBER 18, 2025").toUpperCase()}
        </div>

        {/* Movie Details */}
        <div className="text-white text-xs font-bold leading-[1.4] text-left">
          Download {title} ({year}) {quality} {audioType} {'{'}{language}{'}'} 480p [{fileSizes["480p"]}] | 720p [{fileSizes["720p"]}] | 1080p [{fileSizes["1080p"]}]
        </div>
      </div>
    </div>
  );
};
