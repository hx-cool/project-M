import { Search, HelpCircle, Info } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-foreground/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Movies<span className="text-cyan">Wala</span>
          </h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <a href="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-cyan">
              Home
            </a>
            <a href="/browse" className="text-sm font-medium text-foreground/80 transition-colors hover:text-cyan">
              Browse
            </a>
            <a href="/about" className="text-sm font-medium text-foreground/80 transition-colors hover:text-cyan">
              About
            </a>
          </nav>
        </div>

        {/* Desktop Search & Icons */}
        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search movies..."
                className="h-11 w-80 rounded-lg border-foreground/10 bg-surface pl-10 text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan"
              />
            </div>
          </div>
          
          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-surface hover:text-cyan md:flex">
            <HelpCircle className="h-5 w-5" />
          </button>
          
          <button className="hidden h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-surface hover:text-cyan md:flex">
            <Info className="h-5 w-5" />
          </button>

          {/* Mobile Search Icon */}
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground/80 transition-colors hover:bg-surface hover:text-cyan md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Mobile Search Dropdown */}
      {isSearchOpen && (
        <div className="border-t border-foreground/5 bg-surface p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search movies..."
              className="h-11 w-full rounded-lg border-foreground/10 bg-surface-elevated pl-10 text-foreground placeholder:text-muted-foreground focus:border-cyan focus:ring-1 focus:ring-cyan"
            />
          </div>
        </div>
      )}
    </header>
  );
};
