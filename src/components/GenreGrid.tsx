import { Film } from "lucide-react";

interface Genre {
  name: string;
  count: number;
  gradient: string;
  link: string;
}

const genres: Genre[] = [
  { name: "Action", count: 1250, gradient: "from-pink/20 to-magenta/20", link: "/category/action" },
  { name: "Horror", count: 540, gradient: "from-gray-500/20 to-pink/20", link: "/category/horror" },
  { name: "Sci-Fi", count: 670, gradient: "from-pink/20 to-purple-500/20", link: "/category/sci-fi" },
  { name: "Comedy", count: 980, gradient: "from-magenta/20 to-pink-500/20", link: "/category/comedy" },
  { name: "Drama", count: 1100, gradient: "from-purple-500/20 to-magenta/20", link: "/category/drama" },
  { name: "Hindi", count: 850, gradient: "from-orange-500/20 to-pink/20", link: "/category/hindi" },
  { name: "Web Series", count: 420, gradient: "from-blue-500/20 to-magenta/20", link: "/category/web-series" },
  { name: "Thriller", count: 890, gradient: "from-magenta/20 to-luxury/20", link: "/category/action" },
];

export const GenreGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Browse by Genre</h2>
          <a href="/genres" className="text-sm font-medium text-pink transition-colors hover:text-pink/80">
            View All →
          </a>
        </div>

        {/* Genre Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {genres.map((genre) => (
            <a
              key={genre.name}
              href={genre.link}
              className="group relative overflow-hidden rounded-xl bg-surface-elevated p-6 shadow-cinema transition-all hover:scale-105 hover:shadow-lg"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${genre.gradient} opacity-50 transition-opacity group-hover:opacity-70`} />
              
              {/* Content */}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-surface/50 backdrop-blur-sm">
                  <Film className="h-6 w-6 text-pink" />
                </div>
                <h3 className="mb-1 text-lg font-semibold text-foreground">{genre.name}</h3>
                <p className="text-sm text-muted-foreground">{genre.count} movies</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
