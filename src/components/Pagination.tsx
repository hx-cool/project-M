import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Pagination = () => {
  return (
    <div className="flex justify-center items-center py-12 px-4">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <Button
          variant="outline"
          className="h-10 px-4 bg-surface border-border text-muted-foreground hover:bg-pink hover:text-white hover:border-pink transition-all duration-300 rounded-lg"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>

        {/* Page Numbers */}
        {[1, 2, 3, 4, 5].map((page, index) => (
          <Button
            key={page}
            variant={index === 0 ? "default" : "outline"}
            className={
              index === 0
                ? "h-10 w-10 bg-pink text-white hover:bg-magenta border-0 rounded-lg font-bold glow-pink"
                : "h-10 w-10 bg-surface border-border text-foreground hover:bg-pink hover:text-white hover:border-pink transition-all duration-300 rounded-lg"
            }
          >
            {page}
          </Button>
        ))}

        {/* Dots */}
        <span className="px-2 text-muted-foreground">...</span>

        {/* Last Pages */}
        {[15, 16].map((page) => (
          <Button
            key={page}
            variant="outline"
            className="h-10 w-10 bg-surface border-border text-foreground hover:bg-pink hover:text-white hover:border-pink transition-all duration-300 rounded-lg"
          >
            {page}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          variant="outline"
          className="h-10 px-4 bg-surface border-border text-muted-foreground hover:bg-pink hover:text-white hover:border-pink transition-all duration-300 rounded-lg"
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};