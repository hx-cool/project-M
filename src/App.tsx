import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import BollywoodMovies from "./pages/BollywoodMovies";
import HollywoodMovies from "./pages/HollywoodMovies";
import SouthIndianMovies from "./pages/SouthIndianMovies";
import DisneyMovies from "./pages/DisneyMovies";
import JiohotstarMovies from "./pages/JiohotstarMovies";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Genres from "./pages/Genres";
import ByYear from "./pages/ByYear";
import TopImdb from "./pages/TopImdb";
import Admin from "./pages/Admin";

import AdminPanel from "./admin/AdminPanel";

import CategoryPage from "./pages/CategoryPage";
import ContactUs from "./pages/ContactUs";
import RequestUs from "./pages/RequestUs";
import AboutUs from "./pages/AboutUs";
import DMCA from "./pages/DMCA";

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
              <Route path="/category/bollywood" element={<BollywoodMovies />} />
              <Route path="/category/hollywood" element={<HollywoodMovies />} />
              <Route path="/category/south-indian" element={<SouthIndianMovies />} />
              <Route path="/category/disney" element={<DisneyMovies />} />
              <Route path="/category/jiohotstar" element={<JiohotstarMovies />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/series" element={<Series />} />
              <Route path="/genres" element={<Genres />} />
              <Route path="/by-year" element={<ByYear />} />
              <Route path="/top-imdb" element={<TopImdb />} />
              <Route path="/admin" element={<Admin />} />

              <Route path="/admin-panel" element={<AdminPanel />} />

              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/request-us" element={<RequestUs />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/dmca" element={<DMCA />} />
              
              {/* Dynamic Genre Routes */}
              <Route path="/category/adventure" element={<CategoryPage categoryName="Adventure Movies" movies={[]} />} />
              <Route path="/category/animation" element={<CategoryPage categoryName="Animation Movies" movies={[]} />} />
              <Route path="/category/crime" element={<CategoryPage categoryName="Crime Movies" movies={[]} />} />
              <Route path="/category/documentary" element={<CategoryPage categoryName="Documentary" movies={[]} />} />
              <Route path="/category/family" element={<CategoryPage categoryName="Family Movies" movies={[]} />} />
              <Route path="/category/fantasy" element={<CategoryPage categoryName="Fantasy Movies" movies={[]} />} />
              <Route path="/category/history" element={<CategoryPage categoryName="History Movies" movies={[]} />} />
              <Route path="/category/music" element={<CategoryPage categoryName="Music Movies" movies={[]} />} />
              <Route path="/category/mystery" element={<CategoryPage categoryName="Mystery Movies" movies={[]} />} />
              <Route path="/category/reality" element={<CategoryPage categoryName="Reality Shows" movies={[]} />} />
              <Route path="/category/romance" element={<CategoryPage categoryName="Romance Movies" movies={[]} />} />
              <Route path="/category/science-fiction" element={<CategoryPage categoryName="Science Fiction Movies" movies={[]} />} />
              <Route path="/category/soap" element={<CategoryPage categoryName="Soap Opera" movies={[]} />} />
              <Route path="/category/talk" element={<CategoryPage categoryName="Talk Shows" movies={[]} />} />
              <Route path="/category/thriller" element={<CategoryPage categoryName="Thriller Movies" movies={[]} />} />
              <Route path="/category/war" element={<CategoryPage categoryName="War Movies" movies={[]} />} />
              <Route path="/category/western" element={<CategoryPage categoryName="Western Movies" movies={[]} />} />
              
              {/* Year Routes */}
              <Route path="/year/:year" element={<CategoryPage categoryName="" movies={[]} />} />
              
              {/* Quality Routes */}
              <Route path="/quality/:quality" element={<CategoryPage categoryName="" movies={[]} />} />
              
              {/* Featured Redirects */}
              <Route path="/featured/trending" element={<Navigate to="/category/trending" replace />} />
              <Route path="/featured/top-rated" element={<TopImdb />} />
              <Route path="/featured/popular" element={<CategoryPage categoryName="Popular Movies" movies={[]} />} />
              <Route path="/featured/new-release" element={<Navigate to="/?sort=latest" replace />} />
              <Route path="/featured/upcoming" element={<CategoryPage categoryName="Upcoming Movies" movies={[]} />} />
              
              {/* Platform Redirects */}
              <Route path="/platform/netflix" element={<Navigate to="/category/netflix" replace />} />
              <Route path="/platform/prime" element={<Navigate to="/category/amazon-prime" replace />} />
              <Route path="/platform/disney+" element={<Navigate to="/category/disney" replace />} />
              <Route path="/platform/jiocinema" element={<Navigate to="/category/jiohotstar" replace />} />
              
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
