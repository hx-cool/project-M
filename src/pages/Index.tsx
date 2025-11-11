import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { MovieCarousel } from "@/components/MovieCarousel";

const trendingMovies = [
  { title: "Cyber Heist", year: "2025", genre: "Action", rating: 8.7 },
  { title: "Silent Echo", year: "2024", genre: "Thriller", rating: 8.4 },
  { title: "Quantum Shift", year: "2025", genre: "Sci-Fi", rating: 9.1 },
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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <MovieCarousel title="Trending Now" movies={trendingMovies} />
        <MovieCarousel title="New Releases" movies={newReleases} />
      </main>
    </div>
  );
};

export default Index;
