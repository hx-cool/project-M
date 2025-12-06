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
   { name: "Trending", href: "/featured/trending" },
   { name: "Netflix", href: "/platform/netflix" },
 
{ name: "Top Rated", href: "/featured/top-rated" },
  { name: "Amazon Prime ", href: "/platform/prime" },

{ name: "Popular", href: "/featured/popular" },
{ name: "Disney+ ", href: "/platform/disney+" },

{ name: "Upcoming", href: "/featured/upcoming" },
{ name: "Jiohotstar", href: "/platform/jiocinema" },
    ]
  },
  { 
    name: "🌐 Genre", 
    href: "/genres",
    dropdown: [
{ name: "Action", href: "/category/action" },
{ name: "Adventure", href: "/category/adventure" },
{ name: "Animation", href: "/category/animation" },
{ name: "Comedy", href: "/category/comedy" },
{ name: "Crime", href: "/category/crime" },
{ name: "Documentary", href: "/category/documentary" },
{ name: "Drama", href: "/category/drama" },
{ name: "Family", href: "/category/family" },
{ name: "Fantasy", href: "/category/fantasy" },
{ name: "History", href: "/category/history" },
{ name: "Horror", href: "/category/horror" },
{ name: "Music", href: "/category/music" },
{ name: "Mystery", href: "/category/mystery" },
{ name: "Reality", href: "/category/reality" },
{ name: "Romance", href: "/category/romance" },
{ name: "Science Fiction", href: "/category/science-fiction" },
{ name: "Soap", href: "/category/soap" },
{ name: "Talk", href: "/category/talk" },
{ name: "Thriller", href: "/category/thriller" },
{ name: "War", href: "/category/war" },
{ name: "Western", href: "/category/western" }
    ]
  },
  { 
    name: "By Year", 
    href: "/by-year",
    dropdown: [
      { name: "2025", href: "/year/2025" },
{ name: "2024", href: "/year/2024" },
{ name: "2023", href: "/year/2023" },
{ name: "2022", href: "/year/2022" },
{ name: "2021", href: "/year/2021" },
{ name: "2020", href: "/year/2020" },
{ name: "2019", href: "/year/2019" },
{ name: "2018", href: "/year/2018" },
{ name: "2017", href: "/year/2017" },
{ name: "2016", href: "/year/2016" },
{ name: "2015", href: "/year/2015" },
{ name: "2014", href: "/year/2014" },
{ name: "2013", href: "/year/2013" },
{ name: "2012", href: "/year/2012" },
{ name: "2011", href: "/year/2011" },
{ name: "2010", href: "/year/2010" },
{ name: "2009", href: "/year/2009" },
{ name: "2008", href: "/year/2008" },
{ name: "2007", href: "/year/2007" },
{ name: "2006", href: "/year/2006" },
{ name: "2005", href: "/year/2005" },
{ name: "2004", href: "/year/2004" },
{ name: "2003", href: "/year/2003" },
{ name: "2002", href: "/year/2002" },
{ name: "2001", href: "/year/2001" },
{ name: "2000", href: "/year/2000" }
    ]
  },
  { 
    name: "By Quality", 
    href: "/by-quality",
    dropdown: [
     { name: "480p", href: "/quality/480p" },
{ name: "720p", href: "/quality/720p" },
{ name: "1080p", href: "/quality/1080p" },
{ name: "60FPS", href: "/quality/60fps" },
{ name: "2160p 4K", href: "/quality/4k" }

    ]
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const { searchQuery, setSearchQuery, clearSearch } = useSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (localSearchQuery.trim()) {
      navigate(`/search?s=${localSearchQuery.trim().replace(/\s+/g, '+')}`);
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
          <a href="/" className="flex-shrink-0 flex items-center gap-2 md:flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-auto md:translate-x-0">
            <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-pink via-magenta to-red-600 rounded-lg shadow-lg">
              <Film className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <h1 className="text-xl md:text-2xl font-black tracking-tight">
                <span className="bg-gradient-to-r from-pink via-magenta to-red-500 bg-clip-text text-transparent">Movies</span><span className="text-white">Wala</span>
              </h1>
              <span className="text-[8px] md:text-[9px] text-gray-400 font-medium tracking-wider uppercase">Download Hub</span>
            </div>
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
                    className="absolute top-full left-0 pt-2 z-[10000]"
                    onMouseEnter={() => setOpenDropdown(link.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <div className="w-96 bg-black border border-pink/30 rounded shadow-2xl py-2">
                      <div className="grid grid-cols-2 gap-x-2">
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
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>




      </header>

      {/* Mobile Search Slider */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 z-[10000] md:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsMobileSearchOpen(false)} />
          <div className="absolute top-0 right-0 h-16 w-full bg-gradient-to-br from-[#000000] to-[#0d0d0d] px-4 shadow-2xl animate-in slide-in-from-right duration-300 flex items-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface/50 text-white hover:bg-pink/20 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-pink z-10" />
                <Input
                  type="search"
                  placeholder="Search movies, series, anime..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter') { 
                      (e.target as HTMLElement).blur(); 
                      handleSearch(); 
                      setIsMobileSearchOpen(false);
                    }
                  }}
                  className="h-12 w-full rounded-lg bg-surface/50 backdrop-blur-sm pl-11 pr-4 border-pink/30 focus:border-pink focus:ring-2 focus:ring-pink/50 text-white"
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-foreground/5 shadow-lg">
          <nav className="p-4 flex flex-col gap-1 max-h-[60vh] overflow-y-auto">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.dropdown ? (
                  <>
                    <button
                      onClick={() => setMobileOpenDropdown(mobileOpenDropdown === link.name ? null : link.name)}
                      className="w-full px-4 py-2 text-base font-medium text-foreground/80 transition-colors hover:text-pink hover:bg-surface-elevated rounded-lg flex items-center justify-between"
                    >
                      {link.name}
                      <ChevronDown className={cn("h-4 w-4 transition-transform", mobileOpenDropdown === link.name && "rotate-180")} />
                    </button>
                    {mobileOpenDropdown === link.name && (
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
                  </>
                ) : (
                  <a
                    href={link.href}
                    className="px-4 py-2 text-base font-medium text-foreground/80 transition-colors hover:text-pink hover:bg-surface-elevated rounded-lg flex items-center justify-between"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
