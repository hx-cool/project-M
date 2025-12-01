import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Download, Star, Clock, Eye, ChevronDown, Search, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { getMovieById, getRelatedMovies, generateMovieId, trendingMovies, Movie } from "@/data/movies";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { useSearch } from "@/contexts/SearchContext";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const { setSearchQuery } = useSearch();

  const [dbMovie, setDbMovie] = useState<Movie | null>(null);
  const [dbScreenshots, setDbScreenshots] = useState<string[]>([]);
  const [dbDownloads, setDbDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      setLoading(true);
      fetch(`http://${window.location.hostname}:3001/api/movies/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Movie not found');
          return res.json();
        })
        .then(foundMovie => {
          setDbMovie({
            title: foundMovie.title,
            year: foundMovie.year,
            genre: foundMovie.genres.map((g: any) => g.genre.name),
            rating: foundMovie.rating,
            posterUrl: foundMovie.posterUrl,
            quality: foundMovie.quality,
            duration: foundMovie.duration,
            synopsis: foundMovie.synopsis,
            cast: foundMovie.cast.map((c: any) => c.cast.name),
            language: foundMovie.language === 'custom' ? foundMovie.customLanguage : foundMovie.language,
            audioType: foundMovie.audioType === 'custom' ? foundMovie.customAudioType : foundMovie.audioType,
            downloadLink: foundMovie.downloads[0]?.link,
            releaseDate: foundMovie.releaseDate,
            isSeries: foundMovie.isSeries,
          });
          setDbScreenshots(foundMovie.screenshots?.map((s: any) => s.url) || []);
          setDbDownloads((foundMovie.downloads || []).sort((a: any, b: any) => (a.order || 999) - (b.order || 999)));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const movie = dbMovie || (id ? getMovieById(id) : null);

  const handleSearch = () => {
    (document.activeElement as HTMLElement)?.blur();
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery.trim());
      navigate('/');
    }
  };




  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink mx-auto mb-4"></div>
          <p className="text-white">Loading movie...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
          <button onClick={() => navigate('/')} className="text-pink">Back to Home</button>
        </div>
      </div>
    );
  }

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];



  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Category Section with Search */}
      <div className="bg-surface/30 backdrop-blur-sm py-3">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink to-magenta p-px">
                  <div className="h-full w-full rounded-2xl bg-white"></div>
                </div>
                <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
                <Input
                  type="search"
                  placeholder="Search for movies, web series, anime…"
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleSearch(); } }}
                  className="relative z-10 h-10 md:h-16 w-full rounded-2xl bg-transparent border-0 pl-6 pr-12 text-sm md:text-lg text-black placeholder:text-gray-400 focus:outline-none transition-all"
                />
              </div>
              <Button
                size="lg"
                onClick={handleSearch}
                className="hidden md:flex bg-gradient-to-r from-pink to-purple-600 text-white font-bold px-8 py-4 h-8 md:h-16 rounded-lg shadow-md"
              >
                Search
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <div className="flex justify-center mb-4">
              <Button className="bg-gradient-to-r from-pink to-magenta border border-pink/30 text-white font-medium px-5 py-2 rounded-xl shadow-[0_0_4px_rgba(255,0,128,0.15)] flex items-center gap-2 transition-all duration-300">
                <Send className="h-3.5 w-3.5" />
                Join Telegram
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-2.5 max-w-xs mx-auto">
              {[
                { name: 'Anime', link: '/category/anime' },
                { name: 'Trending', link: '/category/trending' },
                { name: 'K-Drama', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-2.5 py-1.5 bg-surface/20 border border-pink/30 text-white text-xs font-medium rounded-xl shadow-[0_0_3px_rgba(255,0,128,0.1)] hover:bg-surface/30 transition-all duration-300 text-center"
                >
                  {category.name}
                </a>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              {[
                { name: 'AMZN Prime', link: '/category/amazon-prime' },
                { name: 'Netflix', link: '/category/netflix' },
                { name: 'English', link: '/category/english' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-2.5 py-1.5 bg-surface/20 border border-pink/30 text-white text-xs font-medium rounded-xl shadow-[0_0_3px_rgba(255,0,128,0.1)] hover:bg-surface/30 transition-all duration-300 text-center"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:flex flex-wrap gap-3 justify-center max-w-6xl mx-auto">
            {[
              { name: 'Action', link: '/category/action' },
              { name: 'Horror', link: '/category/horror' },
              { name: 'Comedy', link: '/category/comedy' },
              { name: 'Sci-Fi', link: '/category/sci-fi' },
              { name: 'Drama', link: '/category/drama' },
              { name: 'Hindi', link: '/category/hindi' },
              { name: 'Web Series', link: '/category/web-series' },
              { name: 'Anime', link: '/category/anime' },
              { name: 'Trending', link: '/category/trending' },
              { name: 'K-Drama', link: '/category/k-drama' },
              { name: 'Netflix', link: '/category/netflix' },
              { name: 'English', link: '/category/english' }
            ].map((category) => (
              <a
                key={category.name}
                href={category.link}
                className="px-4 py-2 bg-surface/80 backdrop-blur-sm border border-border/50 text-foreground/90 text-sm font-medium rounded-full hover:bg-pink/10 hover:border-pink hover:text-pink hover:glow-pink transition-all duration-300 hover:scale-105 inline-block"
              >
                {category.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-2">
        <div className="relative w-full">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
          <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 pt-4">
        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Content - Left Column */}
          <div>
            {/* SEO Title */}
            <div className="mb-6">
              <h1 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                MoviesWala.is | 1080p | Download {movie.title} ({movie.year}) WEB-DL Dual Audio [Hindi-English] 480p [422MB] | 720p [1GB] | 1080p [2.6GB]
              </h1>
            </div>

            {/* SEO Description */}
            <div className="mt-6 bg-white/[0.03] rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink mb-4">Movie Specifications</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Download {movie.title} ({movie.year}) WEB-DL Full Movie (Hindi-English) 480p & 720p & 1080p Qualities. This is a Hollywood movie and Available in 480p in [422MB], 720p in [1GB] & 1080p in [2.6GB] in MKV Format. This is one of the best movie based on {genres.join(" and ")}. This Movie Is Now Available In Hindi Dubbed. This is WEB-DL Print with ORG Hindi + English Audio and English Subtitles.
              </p>
            </div>

            {/* Movie Info */}
            <div className="mt-6 bg-white/[0.03] rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink mb-4">Movie Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-[35%] text-gray-400">IMDb Rating:</span>
                  <span className="w-[65%] text-white">{movie.rating}/10</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Movie Name:</span>
                  <span className="w-[65%] text-white">{movie.title}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Release Year:</span>
                  <span className="w-[65%] text-white">{movie.year}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Runtime:</span>
                  <span className="w-[65%] text-white">{movie.duration || 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Genre:</span>
                  <span className="w-[65%] text-white">{genres.join(', ')}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Language:</span>
                  <span className="w-[65%] text-white">{movie.language || 'Hindi-English'} [{movie.audioType || 'Dual Audio'}]</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Subtitle:</span>
                  <span className="w-[65%] text-white">{dbMovie?.subtitle === 'none' ? 'N/A' : (dbMovie?.subtitle || 'English')}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Size:</span>
                  <span className="w-[65%] text-white">{dbDownloads.length > 0 ? dbDownloads.map(d => d.size).filter(Boolean).join(' || ') : '422MB || 1GB || 2.6GB'}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Quality:</span>
                  <span className="w-[65%] text-white">{dbDownloads.length > 0 ? dbDownloads.map(d => d.resolution).join(' || ') : '480p || 720p || 1080p'} - {movie.quality || 'WEB-DL'}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Format:</span>
                  <span className="w-[65%] text-white">MKV</span>
                </div>
              </div>
            </div>

            {/* Movie Synopsis */}
            <div className="mt-6 bg-white/[0.03] rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink mb-4 text-center">Movie Synopsis/Plot</h3>
              <div className="text-gray-400 text-sm leading-relaxed relative">
                <p className={synopsisExpanded ? '' : 'line-clamp-4 md:line-clamp-none'}>
                  {movie.synopsis || "A team of elite hackers must pull off the ultimate digital heist while staying one step ahead of international law enforcement."}
                </p>
                {!synopsisExpanded && (movie.synopsis || "A team of elite hackers must pull off the ultimate digital heist while staying one step ahead of international law enforcement.").length > 200 && (
                  <div className="md:hidden text-right mt-1">
                    <button onClick={() => setSynopsisExpanded(true)} className="text-pink font-medium">Show more</button>
                  </div>
                )}
                {synopsisExpanded && (
                  <div className="md:hidden text-right mt-1">
                    <button onClick={() => setSynopsisExpanded(false)} className="text-pink font-medium">Show less</button>
                  </div>
                )}
              </div>
            </div>

            {/* Screenshots */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-pink mb-4 text-center">Screenshots: (Must See Before Downloading)...</h3>
              {dbScreenshots.length > 0 || (movie.screenshots && movie.screenshots.length > 0) ? (
                <div className="space-y-4">
                  {(dbScreenshots.length > 0 ? dbScreenshots : movie.screenshots).slice(0, 5).map((screenshot, index) => (
                    <div key={index} className="w-full aspect-video">
                      <img
                        src={screenshot}
                        alt={`Movie Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/[0.03] rounded-xl p-8 text-center">
                  <p className="text-gray-400 text-lg">Screenshots not available</p>
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="my-6">
              <div className="relative w-full">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
                <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
              </div>
            </div>

            {/* Download Options */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-white mb-4 text-center">{(() => {
                const lang = movie.language || 'Hindi-English';
                const langs = lang.split(/[-,+]/).map(l => l.trim());
                const hasHindi = lang.includes("Hindi");
                const hasEnglish = lang.includes("English");
                if (hasHindi && langs.length === 1) return "** DOWNLOAD हिंदी ORG Audio (हिन्दी में) **";
                if (hasHindi && langs.length === 2) return `** DOWNLOAD हिंदी Dubbed ORG – ${langs.find(l => !l.includes("Hindi"))} (हिन्दी में) **`;
                if (hasEnglish && langs.length === 1) return "** DOWNLOAD English ORG Audio (English) **";
                if (hasEnglish && langs.length === 2) return `** DOWNLOAD ORG Dual Audio – English (${lang} में) **`;
                if (langs.length > 2) return `** DOWNLOAD ORG Multi Audio (${lang} में) **`;
                if (langs.length === 1) return `** DOWNLOAD ORG Original Audio (${lang} में) **`;
                return `** DOWNLOAD ORG Dual Audio (${lang} में) **`;
              })()}</h3>

              <div className="bg-white/[0.03] rounded-xl p-6 backdrop-blur-sm">
                {dbDownloads.length > 0 ? (
                  /* Database Downloads */
                  <div className="space-y-6">
                    {dbDownloads.sort((a: any, b: any) => (a.order || 999) - (b.order || 999)).map((download: any, idx: number) => (
                      <div key={idx} className="pb-6 last:pb-0">
                        <p className="text-white font-medium mb-3 text-center">
                          {movie.title} ({movie.year}) {download.resolution} [{download.size || 'N/A'}]
                        </p>
                        <a
                          href={download.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      </div>
                    ))}
                  </div>
                ) : movie.isSeries ? (
                  /* Series Download Options with Quality Tiers */
                  <div className="space-y-6">
                    {movie.downloads ? (
                      /* New quality-based downloads */
                      <>
                        {movie.downloads["480p"] && (
                          <div className="pb-6 last:pb-0">
                            <p className="text-white font-medium mb-3 text-center">
                              {movie.title} Hindi DD5.1 WEB-DL 480p H.264 [{movie.downloads["480p"].batchSize}]
                            </p>
                            <div className="flex gap-3 justify-center">
                              {movie.downloads["480p"].episode ? (
                                <a
                                  href={movie.downloads["480p"].episode}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                >
                                  Single Episode
                                </a>
                              ) : (
                                <button className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                                  Single Episode
                                </button>
                              )}

                              {movie.downloads["480p"].batch ? (
                                <a
                                  href={movie.downloads["480p"].batch}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                >
                                  Batch/Zip
                                </a>
                              ) : (
                                <button className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                                  Batch/Zip
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {movie.downloads["720p"] && (
                          <div className="pb-6 last:pb-0">
                            <p className="text-white font-medium mb-3 text-center">
                              {movie.title} Hindi DD5.1 WEB-DL 720p H.264 [{movie.downloads["720p"].batchSize}]
                            </p>
                            <div className="flex gap-3 justify-center">
                              {movie.downloads["720p"].episode ? (
                                <a
                                  href={movie.downloads["720p"].episode}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                >
                                  Single Episode
                                </a>
                              ) : (
                                <button className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                                  Single Episode
                                </button>
                              )}

                              {movie.downloads["720p"].batch ? (
                                <a
                                  href={movie.downloads["720p"].batch}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                >
                                  Batch/Zip
                                </a>
                              ) : (
                                <button className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                                  Batch/Zip
                                </button>
                              )}
                            </div>
                          </div>
                        )}

                        {movie.downloads["1080p"] && (
                          <div className="pb-6 last:pb-0">
                            <p className="text-white font-medium mb-3 text-center">
                              {movie.title} Hindi DD5.1 WEB-DL 1080p H.264 [{movie.downloads["1080p"].batchSize}]
                            </p>
                            <div className="flex gap-3 justify-center">
                              {movie.downloads["1080p"].episode ? (
                                <a
                                  href={movie.downloads["1080p"].episode}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                >
                                  Single Episode
                                </a>
                              ) : (
                                <button className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                                  Single Episode
                                </button>
                              )}

                              {movie.downloads["1080p"].batch ? (
                                <a
                                  href={movie.downloads["1080p"].batch}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                >
                                  Batch/Zip
                                </a>
                              ) : (
                                <button className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                                  Batch/Zip
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Fallback for legacy single-link format */
                      <div>
                        <p className="text-white font-medium mb-3 text-center">{movie.title} ({movie.year})</p>
                        <div className="flex gap-3 justify-center">
                          {movie.episodeDownloadLink ? (
                            <a
                              href={movie.episodeDownloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                            >
                              Single Episode
                            </a>
                          ) : (
                            <button className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                              Single Episode
                            </button>
                          )}

                          {movie.batchDownloadLink ? (
                            <a
                              href={movie.batchDownloadLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                            >
                              Batch/Zip {movie.batchSize ? `[${movie.batchSize}]` : ''}
                            </a>
                          ) : (
                            <button className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                              Batch/Zip {movie.batchSize ? `[${movie.batchSize}]` : ''}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Movie Download Options */
                  <div className="space-y-6">
                    <div className="pb-6">
                      <p className="text-white font-medium mb-3 text-center">{movie.title} ({movie.year}) (Hindi-English) 480p x264 [422MB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>

                    <div className="pb-6">
                      <p className="text-white font-medium mb-3 text-center">{movie.title} ({movie.year}) (Hindi-English) 720p 10Bit x265 [670MB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>

                    <div className="pb-6">
                      <p className="text-white font-medium mb-3 text-center">{movie.title} ({movie.year}) (Hindi-English) 720p x264 [1GB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>

                    <div className="pb-2">
                      <p className="text-white font-medium mb-3 text-center">{movie.title} ({movie.year}) (Hindi-English) 1080p x264 [2.6GB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="mt-6 bg-white/[0.03] rounded-[2.5rem] p-6 backdrop-blur-sm relative overflow-hidden">
              {/* Brightness Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-30 pointer-events-none" />

              <div className="relative z-10">
                <h3 className="text-lg md:text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  🔥 Why Choose MoviesWala.is?
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="bg-white/[0.03] rounded-3xl p-4 flex items-start gap-3 hover:bg-white/[0.08] transition-all duration-300">
                    <span className="text-green-400 text-lg md:text-xl mt-0.5">✅</span>
                    <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed">
                      <span className="text-white font-bold">Instant Access:</span> Direct G-Drive links for uninterrupted downloads.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] rounded-3xl p-4 flex items-start gap-3 hover:bg-white/[0.08] transition-all duration-300">
                    <span className="text-green-400 text-lg md:text-xl mt-0.5">✅</span>
                    <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed">
                      <span className="text-white font-bold">100% Secure:</span> Safe, Clean, Hassle-Free & Fully encrypted.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] rounded-3xl p-4 flex items-start gap-3 hover:bg-white/[0.08] transition-all duration-300">
                    <span className="text-green-400 text-lg md:text-xl mt-0.5">✅</span>
                    <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed">
                      <span className="text-white font-bold">Simple Steps:</span> Click the button, follow easy instructions, and start downloading in minutes!
                    </p>
                  </div>
                </div>

                <h3 className="text-lg md:text-2xl font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  🚀 Ready to Download?
                </h3>

                <div className="bg-white/[0.03] rounded-3xl p-4 flex items-start gap-3 hover:bg-white/[0.08] transition-all duration-300">
                  <span className="text-yellow-400 text-lg md:text-xl mt-0.5">👉</span>
                  <p className="text-gray-200 text-xs md:text-base font-medium leading-relaxed">
                    Your favorite blockbusters are just 3 clicks away!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Right Column - Desktop Only */}
          <div className="hidden lg:block">
            <div className="sticky top-20 self-start z-0">
              <h3 className="text-sm font-bold text-white mb-3 bg-dark p-3 rounded-t-lg">RECENT UPDATES</h3>
              <div className="space-y-2">
                {trendingMovies.slice(0, 5).map((recentMovie) => (
                  <a
                    key={generateMovieId(recentMovie.title)}
                    href={`/movie/${generateMovieId(recentMovie.title)}`}
                    className="block text-blue-400 hover:text-blue-300 text-[10px] leading-tight"
                  >
                    Download {recentMovie.title} ({recentMovie.year}) {recentMovie.quality || 'WEB-DL'} Dual Audio {'Hindi-English'} 480p [280MB] | 720p [1GB] | 1080p [2.7GB]
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default MovieDetail;