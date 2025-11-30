import { Search, Moon, Sun, Film, Heart, Download, Menu, X, Send } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearch } from "@/contexts/SearchContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Series", href: "/series" },
  { name: "Genres", href: "/genres" },
  { name: "By Year", href: "/by-year" },
  { name: "Top IMDb", href: "/top-imdb" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const { theme, setTheme } = useTheme();
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (localSearchQuery.trim()) {
      setSearchQuery(localSearchQuery.trim());
      navigate('/');
    }
  };





  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && searchQuery) {
        handleClearSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      setIsMobileMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClearSearch = useCallback(() => {
    setLocalSearchQuery("");
    clearSearch();
  }, [clearSearch]);

  return (
    <>
      <header
        className={cn(
          "border-b transition-all duration-300 h-16 md:h-20 md:sticky md:top-0 z-[9999] relative",
          isScrolled
            ? "border-foreground/10 bg-background/95 backdrop-blur-lg shadow-cinema"
            : "border-foreground/5 bg-background/80 backdrop-blur-md"
        )}
      >
        <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-4 gap-6">
          {/* Mobile Menu Button */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-surface hover:text-pink md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Premium Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 md:justify-start justify-center md:flex-1-0 flex-1">
            <div className="relative">
              <Film className="h-8 w-8 text-luxury animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 bg-luxury/30 rounded-full blur-md animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-pink via-magenta to-luxury bg-clip-text text-transparent">
              Movies<span className="text-pink">Wala</span>
            </h1>
          </div>

          {/* Centered Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground/80 transition-colors hover:text-pink hover:glow-pink whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search */}
            <div className="hidden md:block relative">
              <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink" />
                  <Input
                    type="search"
                    placeholder="Search movies, series..."
                    value={localSearchQuery}
                    onChange={(e) => setLocalSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleSearch(); } }}
                    className="h-10 w-80 rounded-full bg-surface/50 backdrop-blur-sm pl-10 pr-4 border-border focus:border-pink focus:ring-2 focus:ring-pink/50 focus:glow-pink transition-all"
                  />
                </div>

              </div>
            </div>


            {/* Telegram */}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex h-10 px-4 border-pink/50 text-pink hover:bg-pink/10 hover:border-pink hover:glow-pink transition-all gap-2"
              asChild
            >
              <a href="https://t.me/movieswala" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Telegram
              </a>
            </Button>



            {/* Mobile Search Icon */}
            <button
              className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-surface hover:text-pink md:hidden"
              onClick={() => {
                const searchInput = document.querySelector('input[placeholder*="Search movies"]') as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus();
                  searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>




      </header>

      {/* Mobile Navigation Menu - Portal */}
      {isMobileMenuOpen && createPortal(
        <div className="fixed inset-0 md:hidden" style={{ zIndex: 999999 }} onClick={() => setIsMobileMenuOpen(false)}>
          <div className="fixed top-16 left-0 right-0 bg-background border-t border-foreground/5 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <nav className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-base font-medium text-foreground/80 transition-colors hover:text-pink hover:bg-surface-elevated rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
