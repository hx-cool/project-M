import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";
import { TelegramBanner } from "@/components/TelegramBanner";
import { GenreGrid } from "@/components/GenreGrid";

const trendingMovies = [
  { 
    title: "Cyber Heist", 
    year: "2025", 
    genre: ["Action", "Thriller", "Crime"], 
    rating: 8.7,
    quality: "WEB-DL",
    duration: "2h 18m",
    synopsis: "A team of elite hackers must pull off the ultimate digital heist while staying one step ahead of international law enforcement.",
    cast: ["Ryan Gosling", "Ana de Armas", "Oscar Isaac"]
  },
  { 
    title: "Silent Echo", 
    year: "2024", 
    genre: ["Thriller", "Mystery", "Drama"], 
    rating: 8.4,
    quality: "HDTC",
    duration: "1h 58m",
    synopsis: "A sound engineer discovers mysterious audio recordings that lead her into a dangerous conspiracy.",
    cast: ["Emily Blunt", "Jake Gyllenhaal"]
  },
  { 
    title: "Quantum Shift", 
    year: "2025", 
    genre: ["Sci-Fi", "Action", "Adventure"], 
    rating: 9.1,
    quality: "BluRay",
    duration: "2h 35m",
    synopsis: "When reality begins to fracture, a physicist must navigate parallel universes to prevent total collapse.",
    cast: ["Timothée Chalamet", "Zendaya", "Benedict Cumberbatch"]
  },
  { title: "Urban Legends", year: "2024", genre: "Horror", rating: 7.8 },
  { title: "Desert Storm", year: "2025", genre: "Action", rating: 8.5 },
  { title: "Lost Paradise", year: "2024", genre: "Drama", rating: 8.9 },
];

const newReleases = [
  { title: "Code Red", year: "2025", genre: "Thriller", rating: 8.2 },
  { title: "Midnight Drive", year: "2025", genre: "Crime", rating: 8.6 },
  { title: "Shadow Protocol", year: "2025", genre: "Action", rating: 8.8 },
  { title: "Neon Dreams", year: "2025", genre: "Sci-Fi", rating: 9.0 },
  { title: "Dark Waters", year: "2025", genre: "Mystery", rating: 8.3 },
  { title: "Final Hour", year: "2025", genre: "Thriller", rating: 8.7 },
];

const topImdb = [
  { title: "The Eternal Knight", year: "2024", genre: "Action", rating: 9.2 },
  { title: "Inception Redux", year: "2025", genre: "Sci-Fi", rating: 9.1 },
  { title: "The Last Stand", year: "2024", genre: "Drama", rating: 9.0 },
  { title: "Mystic Journey", year: "2025", genre: "Fantasy", rating: 8.9 },
  { title: "Shadow Realm", year: "2024", genre: "Horror", rating: 8.8 },
  { title: "Velocity", year: "2025", genre: "Action", rating: 8.8 },
];

const hindiMovies = [
  { title: "Pathaan Returns", year: "2025", genre: "Action", rating: 8.6 },
  { title: "Gadar 3", year: "2025", genre: "Drama", rating: 8.4 },
  { title: "Stree 3", year: "2024", genre: "Horror", rating: 8.7 },
  { title: "Tiger Zinda Hai 2", year: "2025", genre: "Action", rating: 8.5 },
  { title: "Bhool Bhulaiyaa 4", year: "2024", genre: "Comedy", rating: 8.3 },
  { title: "Jawan: The Return", year: "2025", genre: "Thriller", rating: 8.8 },
];

const featuredCollections = [
  { title: "Marvel Cinematic Phase 6", year: "2025", genre: "Collection", rating: 9.0 },
  { title: "DC Universe Reborn", year: "2025", genre: "Collection", rating: 8.7 },
  { title: "Fast & Furious Legacy", year: "2024", genre: "Collection", rating: 8.5 },
  { title: "Mission Impossible Series", year: "2024", genre: "Collection", rating: 8.9 },
  { title: "James Bond Classics", year: "2024", genre: "Collection", rating: 9.1 },
  { title: "Star Wars Anthology", year: "2025", genre: "Collection", rating: 8.8 },
];

const webSeries = [
  { title: "Mirzapur S3", year: "2025", genre: "Crime", rating: 9.0 },
  { title: "The Family Man S3", year: "2024", genre: "Thriller", rating: 8.9 },
  { title: "Panchayat S4", year: "2025", genre: "Comedy", rating: 9.1 },
  { title: "Sacred Games Returns", year: "2025", genre: "Drama", rating: 8.7 },
  { title: "Delhi Crime S3", year: "2024", genre: "Crime", rating: 8.8 },
  { title: "Asur S3", year: "2025", genre: "Thriller", rating: 8.6 },
];

const upcomingReleases = [
  { title: "Avatar 4", year: "2026", genre: "Sci-Fi", rating: 0 },
  { title: "The Batman II", year: "2026", genre: "Action", rating: 0 },
  { title: "Deadpool 4", year: "2025", genre: "Comedy", rating: 0 },
  { title: "Dune: Messiah", year: "2026", genre: "Sci-Fi", rating: 0 },
  { title: "Avengers: Secret Wars", year: "2027", genre: "Action", rating: 0 },
  { title: "Spider-Man 5", year: "2025", genre: "Action", rating: 0 },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MovieCarousel title="Trending Now" movies={trendingMovies} />
        <MovieCarousel title="New Releases" movies={newReleases} />
        <MovieCarousel title="Top IMDb Rated" movies={topImdb} />
        <TelegramBanner />
        <MovieCarousel title="Popular in Hindi" movies={hindiMovies} />
        <MovieCarousel title="Featured Collections" movies={featuredCollections} />
        <GenreGrid />
        <MovieCarousel title="Web Series" movies={webSeries} />
        <MovieCarousel title="Upcoming Releases" movies={upcomingReleases} />
      </main>
    </div>
  );
};

export default Index;
