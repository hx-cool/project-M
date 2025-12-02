import { Search, Film, Menu, X, Send, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearch } from "@/contexts/SearchContext";

const navLinks = [
  { name: "HOME", href: "/" },
  { 
    name: "📹 Featured", 
    href: "/featured",
    dropdown: [
      { name: "Trending", href: "/category/trending" },
      { name: "Top IMDb", href: "/top-imdb" },
      { name: "Web Series", href: "/category/web-series" },
      { name: "Anime", href: "/category/anime" },
    ]
  },
  { 
    name: "🌐 Genre", 
    href: "/genres",
    dropdown: [
      { name: "Action", href: "/category/action" },
      { name: "Horror", href: "/category/horror" },
      { name: "Comedy", href: "/category/comedy" },
      { name: "Sci-Fi", href: "/category/sci-fi" },
      { name: "Drama", href: "/category/drama" },
      { name: "Anime", href: "/category/anime" },
      { name: "K-Drama", href: "/category/k-drama" },
    ]
  },
  { 
    name: "By Year", 
    href: "/by-year",
    dropdown: [
      { name: "2024", href: "/year/2024" },
      { name: "2023", href: "/year/2023" },
      { name: "2022", href: "/year/2022" },
      { name: "2021", href: "/year/2021" },
      { name: "2020", href: "/year/2020" },
    ]
  },
  { 
    name: "By Platform", 
    href: "/platforms",
    dropdown: [
      { name: "Netflix", href: "/category/netflix" },
      { name: "Amazon Prime", href: "/category/amazon-prime" },
      { name: "Disney+", href: "/category/disney" },
      { name: "Jiohotstar", href: "/category/jiohotstar" },
    ]
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdown(null);
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  return (
    <>
      <header
        className={cn(
          "border-b border-white/20 transition-all duration-300 h-16 md:h-20 md:sticky md:top-0 z-[9999] relative bg-gradient-to-r from-black via-[#0d0000] to-[#1a0000]",
          isScrolled
            ? "backdrop-blur-lg shadow-cinema"
            : "backdrop-blur-md"
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
          <a href="/" className="flex-shrink-0 flex items-center gap-3 md:flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
            <div className="relative">
              <Film className="h-8 w-8 text-luxury animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute inset-0 bg-luxury/30 rounded-full blur-md animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-pink via-magenta to-luxury bg-clip-text text-transparent">
              Movies<span className="text-pink">Wala</span>
            </h1>
          </a>

          {/* Centered Navigation - Desktop */}
          <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center mx-auto">
            {navLinks.map((link) => (
              <div 
                key={link.name} 
                className="relative"
                onMouseEnter={() => link.dropdown && setOpenDropdown(link.name)}
                onMouseLeave={() => link.dropdown && setOpenDropdown(null)}
              >
                {link.dropdown ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenDropdown(openDropdown === link.name ? null : link.name);
                    }}
                    className="text-base font-medium text-foreground/80 whitespace-nowrap flex items-center gap-1 py-2"
                  >
                    {link.name}
                    <ChevronDown className={cn("h-4 w-4 transition-transform", openDropdown === link.name && "rotate-180")} />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    className="text-base font-medium text-foreground/80 whitespace-nowrap py-2 block"
                  >
                    {link.name}
                  </a>
                )}
                
                {link.dropdown && openDropdown === link.name && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-[10000]"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="w-48 bg-black border border-pink/30 rounded shadow-2xl py-2">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-white hover:text-pink hover:bg-pink/20 transition-colors"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pink z-10" />
              <Input
                type="search"
                placeholder="Search movies, series..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleSearch(); } }}
                className="h-10 w-56 rounded-md bg-surface/50 backdrop-blur-sm pl-10 pr-4 border-border focus:border-pink focus:ring-2 focus:ring-pink/50 focus:glow-pink transition-all"
              />
            </div>

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
          <div className="fixed top-16 left-0 right-0 bg-background border-t border-foreground/5 shadow-lg max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <nav className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <a
                    href={link.href}
                    className="px-4 py-2 text-base font-medium text-foreground/80 transition-colors hover:text-pink hover:bg-surface-elevated rounded-lg flex items-center justify-between"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                  {link.dropdown && (
                    <div className="ml-4 mt-1 flex flex-col gap-1">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="px-4 py-1.5 text-sm text-foreground/60 hover:text-pink hover:bg-surface-elevated rounded-lg"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
