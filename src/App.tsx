import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { SearchProvider } from "@/contexts/SearchContext";
import Index from "./pages/Index";
import MovieDetail from "./pages/MovieDetail";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import ActionMovies from "./pages/ActionMovies";
import HorrorMovies from "./pages/HorrorMovies";
import ComedyMovies from "./pages/ComedyMovies";
import SciFiMovies from "./pages/SciFiMovies";
import HindiMovies from "./pages/HindiMovies";
import WebSeries from "./pages/WebSeries";
import DramaMovies from "./pages/DramaMovies";
import AnimeMovies from "./pages/AnimeMovies";
import TrendingMovies from "./pages/TrendingMovies";
import KDramaMovies from "./pages/KDramaMovies";
import AmazonPrimeMovies from "./pages/AmazonPrimeMovies";
import NetflixMovies from "./pages/NetflixMovies";
import EnglishMovies from "./pages/EnglishMovies";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Genres from "./pages/Genres";
import ByYear from "./pages/ByYear";
import TopImdb from "./pages/TopImdb";
import Admin from "./pages/Admin";
import AdminCRUD from "./pages/AdminCRUD";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SearchProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/category/action" element={<ActionMovies />} />
              <Route path="/category/horror" element={<HorrorMovies />} />
              <Route path="/category/comedy" element={<ComedyMovies />} />
              <Route path="/category/sci-fi" element={<SciFiMovies />} />
              <Route path="/category/hindi" element={<HindiMovies />} />
              <Route path="/category/web-series" element={<WebSeries />} />
              <Route path="/category/drama" element={<DramaMovies />} />
              <Route path="/category/anime" element={<AnimeMovies />} />
              <Route path="/category/trending" element={<TrendingMovies />} />
              <Route path="/category/k-drama" element={<KDramaMovies />} />
              <Route path="/category/amazon-prime" element={<AmazonPrimeMovies />} />
              <Route path="/category/netflix" element={<NetflixMovies />} />
              <Route path="/category/english" element={<EnglishMovies />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/by-year" element={<ByYear />} />
              <Route path="/top-imdb" element={<TopImdb />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-crud" element={<AdminCRUD />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </SearchProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
