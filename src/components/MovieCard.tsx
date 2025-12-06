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
      className="cursor-pointer relative w-full h-[380px] sm:h-[480px] overflow-hidden rounded-2xl bg-gradient-to-br from-[#000000] to-[#0d0d0d] shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col"
    >
      {/* Poster Section */}
      <div className="relative h-[270px] sm:h-[340px] overflow-hidden flex-shrink-0 p-2 sm:p-4">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover brightness-120 rounded-xl"
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
      <div className="px-2 sm:px-3 pt-1 sm:pt-0 pb-0 sm:pb-3">
        {/* Release Date */}
        <div className="text-center text-white/60 text-[10px] sm:text-[11px] font-medium mb-2">
          {(releaseDate || "NOVEMBER 18, 2025").toUpperCase()}
        </div>

        {/* Movie Details as Paragraph */}
        <div className="text-white text-[10px] sm:text-[11px] font-semibold leading-[1.7] sm:leading-[1.8] text-left">
          Download {title} ({year}) {audioType} {'{'}{language}{'}'} 480p [{fileSizes["480p"]}] | 720p [{fileSizes["720p"]}] | 1080p [{fileSizes["1080p"]}] {quality}
        </div>
      </div>
    </div>
  );
};
