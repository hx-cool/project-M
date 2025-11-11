import { Download, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroBanner from "@/assets/hero-banner.jpg";

export const HeroSection = () => {
  return (
    <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
      {/* Background Image with Overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${heroBanner})`,
        }}
      >
        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Accent Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink/10 via-transparent to-magenta/10" />
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
        <div className="max-w-2xl space-y-6">
          {/* Badge */}
          <Badge className="border-magenta bg-magenta/20 text-magenta hover:bg-magenta/30">
            Featured Release
          </Badge>

          {/* Title */}
          <h1 className="text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Night Runner
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>2025</span>
            <span>•</span>
            <span>117 min</span>
            <span>•</span>
            <span>Action Thriller</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-pink text-pink" />
              <span className="text-lg font-bold text-foreground">8.5</span>
              <span className="text-sm text-muted-foreground">/ 10</span>
            </div>
            <span className="text-sm text-muted-foreground">(2.3K downloads)</span>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-foreground/80">
            A former intelligence agent must race against time through the neon-lit streets of a dystopian city to prevent a catastrophic cyber attack. High-octane action meets gripping suspense.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="gap-2">
              <Download className="h-5 w-5" />
              Download Now
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <Play className="h-5 w-5" />
              Watch Trailer
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
