import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSearch } from "@/contexts/SearchContext";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export const HeroSection = ({ onSearch }: HeroSectionProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchInputRef, setSearchInputRef] = useState<HTMLInputElement | null>(null);
  const { setSearchQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    (document.activeElement as HTMLElement)?.blur();
    if (localSearchQuery.trim()) {
      if (onSearch) {
        onSearch(localSearchQuery.trim());
      } else {
        // Navigate to search page with query parameter
        navigate(`/search?s=${localSearchQuery.trim().replace(/\s+/g, '+')}`);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          searchInputRef?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [searchInputRef]);

  return (
    <>
      {/* Category Section with Search */}
      <div className="bg-gradient-to-br from-[#000000] to-[#0d0d0d] py-6">
        <div className="container mx-auto px-4">
          {/* White Search Bar */}
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-md bg-gradient-to-r from-pink to-magenta p-px">
                <div className="h-full w-full rounded-md bg-gray-100"></div>
              </div>
              <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 z-10" />
              <Input
                ref={setSearchInputRef}
                type="search"
                placeholder="Search for movies, web series, anime…"
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { (e.target as HTMLElement).blur(); handleSearch(); } }}
                className="relative z-10 h-10 md:h-12 w-full rounded-md bg-transparent border-0 pl-6 pr-12 text-sm md:text-lg text-black placeholder:text-gray-400 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Mobile Category Section */}
          <div className="md:hidden">
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {[
                { name: 'HOLLYWOOD', link: '/category/hollywood' },
                { name: 'BOLLYWOOD', link: '/category/bollywood' },
                { name: 'SOUTH INDIAN', link: '/category/south-indian' },
                { name: 'NETFLIX', link: '/category/netflix' },
                { name: 'AMZN PRIME', link: '/category/amazon-prime' },
                { name: 'DISNEY+', link: '/category/disney' },
                { name: 'JIOHOTSTAR', link: '/category/jiohotstar' },
                { name: 'TRENDING', link: '/category/trending' },
                { name: 'WEB SERIES', link: '/category/web-series' },
                { name: 'ANIME', link: '/category/anime' },
                { name: 'K-DRAMA', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className="px-4 py-2.5 bg-gradient-to-r from-[#E50914] to-[#B20710] text-white text-[10px] font-bold uppercase rounded-lg transition-all duration-300 text-center whitespace-nowrap"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Category Buttons */}
          <div className="hidden md:block max-w-6xl mx-auto mt-2">
            {/* Row 1 */}
            <div className="flex flex-wrap gap-3 justify-center mb-3">
              {[
                { name: 'HOLLYWOOD', link: '/category/hollywood' },
                { name: 'BOLLYWOOD', link: '/category/bollywood' },
                { name: 'SOUTH INDIAN', link: '/category/south-indian' },
                { name: 'HORROR', link: '/category/horror' },
                { name: 'ANIME', link: '/category/anime' },
                { name: 'TRENDING', link: '/category/trending' },
                { name: 'WEB SERIES', link: '/category/web-series' },
                { name: 'K-DRAMA', link: '/category/k-drama' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className={`px-5 py-2.5 bg-gradient-to-r from-[#E50914] to-[#B20710] text-white text-xs font-bold uppercase rounded-xl hover:scale-x-105 hover:shadow-[0_8px_20px_rgba(229,9,20,0.5)] transition-all duration-300 inline-block whitespace-nowrap ${location.pathname === category.link ? 'shadow-[0_8px_20px_rgba(229,9,20,0.6)]' : ''}`}
                >
                  {category.name}
                </a>
              ))}
            </div>
            {/* Row 2 */}
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                { name: 'NETFLIX', link: '/category/netflix' },
                { name: 'AMAZON PRIME', link: '/category/amazon-prime' },
                { name: 'DISNEY+', link: '/category/disney' },
                { name: 'JIOHOTSTAR', link: '/category/jiohotstar' }
              ].map((category) => (
                <a
                  key={category.name}
                  href={category.link}
                  className={`px-5 py-2.5 bg-gradient-to-r from-[#E50914] to-[#B20710] text-white text-xs font-bold uppercase rounded-xl hover:scale-x-105 hover:shadow-[0_8px_20px_rgba(229,9,20,0.5)] transition-all duration-300 inline-block whitespace-nowrap ${location.pathname === category.link ? 'shadow-[0_8px_20px_rgba(229,9,20,0.6)]' : ''}`}
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Divider */}
      <div className="w-full py-1">
        <div className="relative w-full">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent opacity-80"></div>
          <div className="absolute inset-0 w-full h-0.5 bg-gradient-to-r from-transparent via-pink to-transparent blur-sm opacity-60"></div>
        </div>
      </div>
    </>
  );
};