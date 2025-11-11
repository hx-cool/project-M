import { Search, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Movies", href: "/movies" },
  { name: "Series", href: "/series" },
  { name: "Genres", href: "/genres" },
  { name: "By Year", href: "/by-year" },
  { name: "Top IMDb", href: "/top-imdb" },
  { name: "New Releases", href: "/new-releases" },
];

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 border-b transition-all duration-300",
        isScrolled
          ? "border-foreground/10 bg-background/95 backdrop-blur-lg shadow-cinema"
          : "border-foreground/5 bg-background/80 backdrop-blur-md"
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4 gap-6">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-foreground">
            Movies<span className="text-cyan">Wala</span>
          </h1>
        </div>

        {/* Centered Navigation - Desktop */}
        <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-cyan whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop Search Bar */}
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
                className="h-10 w-64 rounded-full border-foreground/10 bg-surface pl-10 text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-2 focus:ring-cyan/50 focus:glow-cyan transition-all"
              />
            </div>
          </div>

          {/* Join Telegram Button - Desktop */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex h-10 px-4 border-cyan/50 text-cyan hover:bg-cyan/10 hover:text-cyan hover:border-cyan transition-all"
            asChild
          >
            <a href="https://t.me/movieswala" target="_blank" rel="noopener noreferrer">
              Join Telegram
            </a>
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-10 w-10 text-foreground/80 hover:text-cyan hover:bg-surface transition-colors"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Mobile Search Icon */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-surface hover:text-cyan lg:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchOpen && (
        <div className="border-t border-foreground/5 bg-surface p-4 lg:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              className="h-11 w-full rounded-full border-foreground/10 bg-surface-elevated pl-10 text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-2 focus:ring-cyan/50 focus:glow-cyan transition-all"
            />
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className="mt-4 flex flex-col gap-2 lg:hidden">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-cyan hover:bg-surface-elevated rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-cyan/50 text-cyan hover:bg-cyan/10 hover:text-cyan hover:border-cyan"
              asChild
            >
              <a href="https://t.me/movieswala" target="_blank" rel="noopener noreferrer">
                Join Telegram
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
