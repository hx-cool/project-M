import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Download, Play, Calendar, Clock, Shield } from "lucide-react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { MovieCarousel } from "@/components/MovieCarousel";

// Mock data - in a real app, this would come from an API or database
const movieDatabase: Record<string, any> = {
  "cyber-heist": {
    title: "Cyber Heist",
    year: "2025",
    genre: ["Action", "Thriller", "Crime"],
    rating: 8.7,
    quality: "WEB-DL",
    duration: "2h 18m",
    synopsis: "A team of elite hackers must pull off the ultimate digital heist while staying one step ahead of international law enforcement. As they penetrate the most secure financial networks in the world, they discover a conspiracy that goes far deeper than they ever imagined. With time running out and enemies closing in from all sides, the team must decide how far they're willing to go for the truth.",
    cast: [
      "Ryan Gosling as Jack Morrison",
      "Ana de Armas as Sofia Chen",
      "Oscar Isaac as Marcus Wade",
      "Tessa Thompson as Agent Davis",
      "Idris Elba as Victor Kane",
      "John Boyega as Dev Patel"
    ],
    director: "Christopher Nolan",
    releaseDate: "March 15, 2025",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
    ]
  },
  "silent-echo": {
    title: "Silent Echo",
    year: "2024",
    genre: ["Thriller", "Mystery", "Drama"],
    rating: 8.4,
    quality: "HDTC",
    duration: "1h 58m",
    synopsis: "A sound engineer discovers mysterious audio recordings that lead her into a dangerous conspiracy involving corporate espionage and hidden technologies. As she digs deeper into the source of these enigmatic sounds, she realizes that some secrets are meant to stay buried.",
    cast: [
      "Emily Blunt as Sarah Collins",
      "Jake Gyllenhaal as Dr. James Hart",
      "Michael Shannon as Detective Moore",
      "Rebecca Ferguson as Rachel Stone"
    ],
    director: "Denis Villeneuve",
    releaseDate: "November 8, 2024",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80"
    ]
  },
  "quantum-shift": {
    title: "Quantum Shift",
    year: "2025",
    genre: ["Sci-Fi", "Action", "Adventure"],
    rating: 9.1,
    quality: "BluRay",
    duration: "2h 35m",
    synopsis: "When reality begins to fracture, a physicist must navigate parallel universes to prevent total collapse. Armed with groundbreaking technology and an unwavering determination, she races against time through dimensions where the laws of physics are rewritten, encountering alternate versions of herself and facing impossible choices that will determine the fate of all existence.",
    cast: [
      "Timothée Chalamet as Dr. Adrian Cole",
      "Zendaya as Maya Winters",
      "Benedict Cumberbatch as Professor Sterling",
      "Florence Pugh as Dr. Emma Ross",
      "Oscar Isaac as Agent Cross",
      "Lupita Nyong'o as Commander Kane"
    ],
    director: "James Cameron",
    releaseDate: "June 22, 2025",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    screenshots: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
      "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?w=800&q=80",
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80"
    ]
  }
};

const relatedMovies = [
  { title: "Code Red", year: "2025", genre: ["Thriller", "Action"], rating: 8.2 },
  { title: "Midnight Drive", year: "2025", genre: ["Crime", "Drama"], rating: 8.6 },
  { title: "Shadow Protocol", year: "2025", genre: ["Action", "Spy"], rating: 8.8 },
  { title: "Neon Dreams", year: "2025", genre: ["Sci-Fi", "Thriller"], rating: 9.0 },
];

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const movie = id ? movieDatabase[id] : null;

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Movie Not Found</h1>
          <Button onClick={() => navigate("/")} variant="hero">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-16">
        {/* Hero Section with Backdrop */}
        <div className="relative h-[60vh] overflow-hidden">
          {/* Backdrop Image with Gradient Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.screenshots[0]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60" />
          
          {/* Content */}
          <div className="container relative mx-auto px-4 h-full flex items-end pb-12">
            <div className="max-w-3xl">
              {/* Back Button */}
              <Button 
                onClick={() => navigate("/")}
                variant="ghost"
                className="mb-6 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              {/* Quality Badge */}
              {movie.quality && (
                <div className="inline-block mb-4 bg-pink px-4 py-1.5 rounded-md shadow-lg glow-pink">
                  <span className="text-sm font-bold text-white tracking-wide">{movie.quality}</span>
                </div>
              )}

              {/* Title */}
              <h1 className="text-5xl font-bold text-foreground mb-4 leading-tight">
                {movie.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-lg text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-pink text-pink" />
                  <span className="font-bold text-pink">{movie.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{movie.year}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{movie.duration}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>PG-13</span>
                </div>
              </div>

              {/* Genre Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((g: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-1.5 text-sm font-medium border border-pink/40 text-pink/90 rounded-full bg-pink/5"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="bg-pink text-white font-bold hover:bg-pink/90 hover:glow-pink shadow-lg">
                  <Download className="h-5 w-5" />
                  Download Movie
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-pink/50 bg-transparent text-pink hover:bg-pink/10 hover:border-pink font-semibold"
                >
                  <Play className="h-5 w-5" />
                  Watch Trailer
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-12">
              {/* Synopsis */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 bg-pink rounded-full glow-pink" />
                  Synopsis
                </h2>
                <p className="text-lg text-muted-foreground/90 leading-relaxed">
                  {movie.synopsis}
                </p>
              </section>

              {/* Trailer */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 bg-pink rounded-full glow-pink" />
                  Official Trailer
                </h2>
                <div className="aspect-video rounded-xl overflow-hidden shadow-cinema border border-border glow-pink">
                  <iframe
                    className="w-full h-full"
                    src={movie.trailerUrl}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </section>

              {/* Screenshots */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-1 w-8 bg-pink rounded-full glow-pink" />
                  Screenshots
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {movie.screenshots.map((screenshot: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-video rounded-lg overflow-hidden shadow-cinema border border-border hover:scale-105 hover:glow-pink transition-all duration-300 cursor-pointer"
                    >
                      <img
                        src={screenshot}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar Info */}
            <div className="space-y-8">
              {/* Cast */}
              <section className="bg-surface rounded-xl p-6 shadow-cinema border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-1 w-6 bg-pink rounded-full glow-pink" />
                  Cast
                </h2>
                <ul className="space-y-3">
                  {movie.cast.map((member: string, index: number) => (
                    <li key={index} className="text-muted-foreground/90 hover:text-pink transition-colors">
                      {member}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Additional Info */}
              <section className="bg-surface rounded-xl p-6 shadow-cinema border border-border/50">
                <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <div className="h-1 w-6 bg-pink rounded-full glow-pink" />
                  Details
                </h2>
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Director</dt>
                    <dd className="text-foreground font-medium">{movie.director}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Release Date</dt>
                    <dd className="text-foreground font-medium">{movie.releaseDate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Quality</dt>
                    <dd className="text-pink font-bold">{movie.quality}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Duration</dt>
                    <dd className="text-foreground font-medium">{movie.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground mb-1">Rating</dt>
                    <dd className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-pink text-pink" />
                      <span className="text-pink font-bold">{movie.rating}/10</span>
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>

          {/* Related Movies */}
          <div className="mt-16">
            <MovieCarousel title="You May Also Like" movies={relatedMovies} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MovieDetail;
