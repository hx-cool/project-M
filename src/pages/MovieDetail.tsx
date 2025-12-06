import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Share2, Download, Star, Clock, Eye, ChevronDown, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { getMovieById, getRelatedMovies, generateMovieId, trendingMovies, Movie } from "@/data/movies";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { useSearch } from "@/contexts/SearchContext";
import { API_URL } from "@/config/api";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setSearchQuery } = useSearch();

  const [dbMovie, setDbMovie] = useState<Movie | null>(null);
  const [dbScreenshots, setDbScreenshots] = useState<string[]>([]);
  const [dbDownloads, setDbDownloads] = useState<any[]>([]);
  const [recentUpdates, setRecentUpdates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [synopsisExpanded, setSynopsisExpanded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id) {
      setLoading(true);
      fetch(`${API_URL}/api/movies/${id}`)
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
            codec: foundMovie.codec,
            duration: foundMovie.duration,
            synopsis: foundMovie.synopsis,
            cast: foundMovie.cast.map((c: any) => c.cast.name),
            language: foundMovie.language === 'custom' ? foundMovie.customLanguage : foundMovie.language,
            audioType: foundMovie.audioType === 'custom' ? foundMovie.customAudioType : foundMovie.audioType,
            subtitle: foundMovie.subtitle === 'custom' ? foundMovie.customSubtitle : foundMovie.subtitle,
            downloadLink: foundMovie.downloads[0]?.link,
            releaseDate: foundMovie.releaseDate,
            isSeries: foundMovie.isSeries,
            episodeInfo: foundMovie.episodeInfo,
            seasonNumber: foundMovie.seasonNumber,
            episodesThisSeason: foundMovie.episodesThisSeason,
            totalSeasons: foundMovie.totalSeasons,
            seriesStatus: foundMovie.seriesStatus,
            seriesType: foundMovie.seriesType,
            movieOrigin: foundMovie.movieOrigin,
          });
          setDbScreenshots(foundMovie.screenshots?.map((s: any) => s.url) || []);
          setDbDownloads((foundMovie.downloads || []).sort((a: any, b: any) => (a.order || 999) - (b.order || 999)));
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }

    // Fetch recent updates
    fetch(`${API_URL}/api/movies/recent/updates`)
      .then(res => res.json())
      .then(data => setRecentUpdates(data))
      .catch(err => console.error('Failed to fetch recent updates:', err));
  }, [id]);

  const movie = dbMovie || (id ? getMovieById(id) : null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    navigate('/');
  };




  if (!movie && !loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Movie Not Found</h1>
          <button onClick={() => navigate('/')} className="text-pink">Back to Home</button>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];



  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <HeroSection />

      {/* Content */}
      <div className="flex-1 max-w-7xl mx-auto px-4 pt-4 w-full">
        {/* Two Column Layout for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          {/* Main Content - Left Column */}
          <div>
            {/* SEO Title */}
            <div className="mb-6">
              <h1 className="text-lg md:text-3xl font-bold text-white leading-relaxed">
                MoviesWala.is | {dbDownloads.length > 0 ? dbDownloads[0].resolution : '1080p'} | Download {movie.title} {movie.isSeries && movie.seasonNumber ? `Season ${movie.seasonNumber}` : ''} ({movie.year}) {movie.quality || 'WEB-DL'} {movie.audioType || 'Dual Audio'} [{movie.language || 'Hindi-English'}] {dbDownloads.length > 0 ? dbDownloads.slice(0, 3).map(d => `${d.resolution} [${d.size}]`).join(' | ') : 'No downloads available'}
              </h1>
            </div>

            {/* SEO Description */}
            <div className="mt-6 bg-white/[0.03] rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-pink mb-4">{movie.isSeries ? 'Series Specifications' : 'Movie Specifications'}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {movie.isSeries ? (
                  <>Download {movie.title} {movie.seasonNumber ? `[Season ${movie.seasonNumber}]` : ''} ({movie.year}) {movie.quality || 'WEB-DL'} Complete Episodes ({movie.language || 'Hindi-English'}) {dbDownloads.length > 0 ? dbDownloads.map((d, i, arr) => <><span className="text-cyan-400 font-bold">{d.resolution}</span>{i < arr.length - 1 ? (i === arr.length - 2 ? ' & ' : ', ') : ''}</>) : <><span className="text-cyan-400 font-bold">480p</span> & <span className="text-cyan-400 font-bold">720p</span> & <span className="text-cyan-400 font-bold">1080p</span></>} Qualities. This is a {movie.movieOrigin || 'Hollywood'} {movie.seriesType?.toLowerCase() || 'web series'} with {movie.episodesThisSeason || 'N/A'} episodes per season. Available in both Single Episodes and Complete Season Pack formats {dbDownloads.length > 0 ? dbDownloads.map((d, i, arr) => <>{d.resolution} in <span className="text-white font-bold">[{d.size}]</span>{i < arr.length - 1 ? ', ' : ''}</>) : <>480p in <span className="text-white font-bold">[150MB/E]</span>, 720p in <span className="text-white font-bold">[350MB/E]</span> & 1080p in <span className="text-white font-bold">[22.5GB]</span></>} in MKV Format. This is one of the best series based on <span className="text-yellow-400 font-bold">{genres.join(" and ")}</span>. This Series Is Now Available In <span className="text-white font-bold">{movie.language || 'Hindi-English'}</span>. This is {movie.quality || 'WEB-DL'} Print with <span className="font-bold" style={{color: '#f2070f'}}>{movie.audioType || 'Dual Audio'}{movie.subtitle && movie.subtitle !== 'none' ? ` and ${movie.subtitle} Subtitles` : ''}</span>.</>
                ) : (
                  <>Download {movie.title} ({movie.year}) {movie.quality || 'WEB-DL'} Full Movie ({movie.language || 'Hindi-English'}) {dbDownloads.length > 0 ? (() => { const qualities = dbDownloads.map(d => d.resolution); if (qualities.length > 1) { return <>{qualities.slice(0, -1).map((q, i) => <><span className="text-cyan-400 font-bold" key={i}>{q}</span>{i < qualities.length - 2 ? ', ' : ''}</>)} & <span className="text-cyan-400 font-bold">{qualities[qualities.length - 1]}</span></>; } else if (qualities.length === 1) { return <span className="text-cyan-400 font-bold">{qualities[0]}</span>; } else { return <><span className="text-cyan-400 font-bold">480p</span>, <span className="text-cyan-400 font-bold">720p</span> & <span className="text-cyan-400 font-bold">1080p</span></>; } })() : <><span className="text-cyan-400 font-bold">480p</span>, <span className="text-cyan-400 font-bold">720p</span> & <span className="text-cyan-400 font-bold">1080p</span></>} Qualities. This is a {movie.movieOrigin || 'Hollywood'} movie and Available {dbDownloads.length > 0 ? dbDownloads.map((d, i, arr) => <>{d.resolution} in <span className="text-white font-bold" key={i}>[{d.size}]</span>{i < arr.length - 1 ? ', ' : ''}</>) : <>in 480p in <span className="text-white font-bold">[422MB]</span>, 720p in <span className="text-white font-bold">[1GB]</span> & 1080p in <span className="text-white font-bold">[2.6GB]</span></>} in MKV Format. This is one of the best movie based on <span className="text-yellow-400 font-bold">{genres.join(" and ")}</span>. This Movie Is Now Available In <span className="text-white font-bold">{movie.language || 'Hindi Dubbed'}</span>. This is {movie.quality || 'WEB-DL'} Print with <span className="font-bold" style={{color: '#f2070f'}}>{movie.audioType || 'ORG Hindi + English Audio'}{movie.subtitle && movie.subtitle !== 'none' ? ` and ${movie.subtitle} Subtitles` : ''}</span>.</>
                )}
              </p>
            </div>

            {/* Movie Info */}
            <div className="mt-6 bg-white/[0.03] rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-pink mb-4">{movie.isSeries ? 'Series Info' : 'Movie Info'}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="w-[35%] font-bold" style={{color: '#00ff1c'}}>👉 IMDb Rating:</span>
                  <span className="w-[65%] font-bold" style={{color: '#00ff1c'}}>{movie.rating}/10</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">{movie.isSeries ? 'Series Name:' : 'Movie Name:'}</span>
                  <span className="w-[65%] text-white">{movie.title}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">{movie.isSeries ? 'First Air Date:' : 'Release Year:'}</span>
                  <span className="w-[65%] text-white">{movie.year}</span>
                </div>
                {movie.isSeries ? (
                  <>
                    <div className="flex">
                      <span className="w-[35%] text-gray-400">Season:</span>
                      <span className="w-[65%] text-white">Season {movie.seasonNumber || 'N/A'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-[35%] text-gray-400">Episodes:</span>
                      <span className="w-[65%] text-white">{movie.episodesThisSeason || 'N/A'} Episodes</span>
                    </div>
                    <div className="flex">
                      <span className="w-[35%] text-gray-400">Status:</span>
                      <span className="w-[65%] text-white">{movie.seriesStatus || 'N/A'}</span>
                    </div>
                    <div className="flex">
                      <span className="w-[35%] text-gray-400">Total Seasons:</span>
                      <span className="w-[65%] text-white">{movie.totalSeasons || 'N/A'}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <span className="w-[35%] text-gray-400">Runtime:</span>
                    <span className="w-[65%] text-white">{movie.duration || 'N/A'}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Genre:</span>
                  <span className="w-[65%] text-white">{genres.join(', ')}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Language:</span>
                  <span className="w-[65%]"><span className="font-bold" style={{color: '#f2070f'}}>{movie.language || 'Hindi-English'}</span> <span className="text-white font-bold">[{movie.audioType || 'Dual Audio'}]</span></span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Subtitle:</span>
                  <span className="w-[65%] text-white">{movie.subtitle === 'none' ? 'N/A' : (movie.subtitle || 'English')}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Size:</span>
                  <span className="w-[65%] text-white">{dbDownloads.length > 0 ? dbDownloads.map(d => d.size).filter(Boolean).join(' || ') : 'N/A'}</span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Quality:</span>
                  <span className="w-[65%]">
                    <span className="text-white">{dbDownloads.length > 0 ? dbDownloads.map(d => d.resolution).join(' || ') : 'N/A'} - </span>
                    <span className="font-bold" style={{color: '#f2070f'}}>{movie.quality || 'WEB-DL'}</span>
                  </span>
                </div>
                <div className="flex">
                  <span className="w-[35%] text-gray-400">Format:</span>
                  <span className="w-[65%] text-white">MKV</span>
                </div>
              </div>
            </div>

            {/* Movie Synopsis */}
            <div className="mt-6 bg-white/[0.03] rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-pink mb-4 text-center">{movie.isSeries ? 'Series Synopsis' : 'Movie Synopsis'}</h3>
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
              <h3 className="text-xl font-bold text-pink mb-4 text-center">{movie.isSeries ? 'Series Screenshots:' : 'Screenshots:'} <span className="text-white">(Must See Before Downloading)</span>...</h3>
              {dbScreenshots.length > 0 || (movie.screenshots && movie.screenshots.length > 0) ? (
                <div className="space-y-4">
                  {(dbScreenshots.length > 0 ? dbScreenshots : movie.screenshots).slice(0, 5).map((screenshot, index) => (
                    <div key={index} className="w-full aspect-video md:h-82">
                      <img
                        src={screenshot}
                        alt={`Movie Screenshot ${index + 1}`}
                        loading="lazy"
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
                const audioType = movie.audioType || 'Dual Audio';
                const hasHindi = lang.includes("Hindi");
                const hasEnglish = lang.includes("English");
                
                // Dynamic header based on audio type and language
                if (audioType === "Dual Audio") {
                  if (hasHindi && hasEnglish) return `** DOWNLOAD ORG Dual Audio (${lang} में) **`;
                  return `** DOWNLOAD ORG Dual Audio (${lang} में) **`;
                }
                if (audioType === "Multi Audio") {
                  return `DOWNLOAD ORG Multi Audio (${lang} में)`;
                }
                if (audioType === "Hindi") {
                  return "DOWNLOAD हिंदी ORG Audio (हिन्दी में)";
                }
                if (audioType === "English") {
                  return "DOWNLOAD English ORG Audio (English)";
                }
                // Custom audio type or fallback
                if (hasHindi && !hasEnglish) return "DOWNLOAD हिंदी ORG Audio (हिन्दी में)";
                if (hasEnglish && !hasHindi) return "DOWNLOAD English ORG Audio (English)";
                return `** DOWNLOAD ORG ${audioType} (${lang} में) **`;
              })()}</h3>

              <div className="bg-white/[0.03] rounded-xl p-6 backdrop-blur-sm border border-white/20">
                {dbDownloads.length > 0 ? (
                  /* Database Downloads */
                  <div className="space-y-0">
                    {dbDownloads.sort((a: any, b: any) => (a.order || 999) - (b.order || 999)).map((download: any, idx: number) => (
                      <div key={idx} className="pb-6 last:pb-0">
                        <p className="text-white font-medium mb-3 text-center">
                          {movie.title} ({movie.year}) ({movie.language || 'Hindi-English'}) {download.qualityDetail || download.resolution} [{download.size || 'N/A'}]
                        </p>
                        {movie.isSeries ? (
                          <div className="flex gap-3 justify-center">
                            {download.link && (
                              <a
                                href={download.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 max-w-xs bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                              >
                                Single Episode
                              </a>
                            )}
                            {download.batchLink && (
                              <a
                                href={download.batchLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 max-w-xs bg-gradient-to-r from-magenta to-pink text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                              >
                                Batch/Zip [{download.batchSize || download.size}]
                              </a>
                            )}
                          </div>
                        ) : (
                          <a
                            href={download.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                          >
                            Download Now
                          </a>
                        )}
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
                            {(movie.downloads["480p"].episode || movie.downloads["480p"].batch) && (
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
                                ) : null}

                                {movie.downloads["480p"].batch ? (
                                  <a
                                    href={movie.downloads["480p"].batch}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                  >
                                    Batch/Zip
                                  </a>
                                ) : null}
                              </div>
                            )}
                          </div>
                        )}

                        {movie.downloads["720p"] && (
                          <div className="pb-6 last:pb-0">
                            <p className="text-white font-medium mb-3 text-center">
                              {movie.title} Hindi DD5.1 WEB-DL 720p H.264 [{movie.downloads["720p"].batchSize}]
                            </p>
                            {(movie.downloads["720p"].episode || movie.downloads["720p"].batch) && (
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
                                ) : null}

                                {movie.downloads["720p"].batch ? (
                                  <a
                                    href={movie.downloads["720p"].batch}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                  >
                                    Batch/Zip
                                  </a>
                                ) : null}
                              </div>
                            )}
                          </div>
                        )}

                        {movie.downloads["1080p"] && (
                          <div className="pb-6 last:pb-0">
                            <p className="text-white font-medium mb-3 text-center">
                              {movie.title} Hindi DD5.1 WEB-DL 1080p H.264 [{movie.downloads["1080p"].batchSize}]
                            </p>
                            {(movie.downloads["1080p"].episode || movie.downloads["1080p"].batch) && (
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
                                ) : null}

                                {movie.downloads["1080p"].batch ? (
                                  <a
                                    href={movie.downloads["1080p"].batch}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                                  >
                                    Batch/Zip
                                  </a>
                                ) : null}
                              </div>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Fallback for legacy single-link format */
                      <div>
                        <p className="text-white font-medium mb-3 text-center">{movie.title} ({movie.year})</p>
                        {(movie.episodeDownloadLink || movie.batchDownloadLink) && (
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
                            ) : null}

                            {movie.batchDownloadLink ? (
                              <a
                                href={movie.batchDownloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 max-w-xs bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                              >
                                Batch/Zip {movie.batchSize ? `[${movie.batchSize}]` : ''}
                              </a>
                            ) : null}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  /* Movie Download Options */
                  <div className="space-y-0">
                    <div className="pb-6 last:pb-0">
                      <p className="text-white font-medium mb-1 text-center">{movie.title} ({movie.year}) ({movie.language || 'Hindi-English'}) 480p {movie.codec || 'x264'} [422MB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>

                    <div className="pb-6 last:pb-0">
                      <p className="text-white font-medium mb-1 text-center">{movie.title} ({movie.year}) ({movie.language || 'Hindi-English'}) 720p 10Bit {movie.codec || 'x265'} [670MB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>

                    <div className="pb-6 last:pb-0">
                      <p className="text-white font-medium mb-1 text-center">{movie.title} ({movie.year}) ({movie.language || 'Hindi-English'}) 720p {movie.codec || 'x264'} [1GB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>

                    <div className="pb-6 last:pb-0">
                      <p className="text-white font-medium mb-1 text-center">{movie.title} ({movie.year}) ({movie.language || 'Hindi-English'}) 1080p {movie.codec || 'x264'} [2.6GB]</p>
                      {movie.downloadLink ? (
                        <a
                          href={movie.downloadLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80 text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <button className="w-2/3 md:w-1/2 mx-auto block bg-gradient-to-r from-pink to-magenta text-white font-bold py-3 md:py-4 text-sm md:text-base rounded-lg hover:opacity-90 transition-all opacity-80">
                          Download Now
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="mt-6 bg-white/[0.03] rounded-[2.5rem] p-6 backdrop-blur-sm relative overflow-hidden border border-white/20">
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
                      <span className="text-white font-bold">Instant Access:</span> Direct links for uninterrupted downloads.
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
                {recentUpdates.length > 0 ? (
                  recentUpdates.map((recentMovie) => {
                    const quality = recentMovie.quality === 'custom' ? recentMovie.customQuality : recentMovie.quality;
                    const language = recentMovie.language === 'custom' ? recentMovie.customLanguage : recentMovie.language;
                    const downloadSizes = recentMovie.downloads?.map((d: any) => `${d.resolution} [${d.size}]`).join(' | ') || '480p [280MB] | 720p [1GB] | 1080p [2.7GB]';
                    
                    return (
                      <a
                        key={recentMovie.slug}
                        href={`/movie/${recentMovie.slug}`}
                        className="block text-blue-400 hover:text-blue-300 text-[10px] leading-tight"
                      >
                        Download {recentMovie.title} ({recentMovie.year}) {quality || 'WEB-DL'} Dual Audio {language || 'Hindi-English'} {downloadSizes}
                      </a>
                    );
                  })
                ) : (
                  trendingMovies.slice(0, 5).map((recentMovie) => (
                    <a
                      key={generateMovieId(recentMovie.title)}
                      href={`/movie/${generateMovieId(recentMovie.title)}`}
                      className="block text-blue-400 hover:text-blue-300 text-[10px] leading-tight"
                    >
                      Download {recentMovie.title} ({recentMovie.year}) {recentMovie.quality || 'WEB-DL'} Dual Audio {'Hindi-English'} 480p [280MB] | 720p [1GB] | 1080p [2.7GB]
                    </a>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default MovieDetail;