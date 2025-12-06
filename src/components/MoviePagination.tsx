interface MoviePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const MoviePagination = ({ currentPage, totalPages, onPageChange }: MoviePaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8 px-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 h-9 text-sm font-medium bg-surface text-foreground/80 border border-pink/30 rounded-lg hover:border-pink hover:glow-pink transition-all"
        >
          &lt; Previous
        </button>
      )}
      
      <button
        onClick={() => onPageChange(1)}
        className={`w-9 h-9 text-sm font-medium rounded-lg transition-all ${
          currentPage === 1
            ? 'bg-gradient-to-r from-pink to-magenta text-white border-2 border-white glow-neon'
            : 'bg-surface text-foreground/80 border border-pink/30 hover:border-pink hover:glow-pink'
        }`}
      >
        1
      </button>
      
      {currentPage > 3 && (
        <span className="text-foreground/60 text-sm">...</span>
      )}
      
      {currentPage > 2 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="w-9 h-9 text-sm font-medium rounded-lg transition-all bg-surface text-foreground/80 border border-pink/30 hover:border-pink hover:glow-pink"
        >
          {currentPage - 1}
        </button>
      )}
      
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage)}
          className="w-9 h-9 text-sm font-medium rounded-lg transition-all bg-gradient-to-r from-pink to-magenta text-white border-2 border-white glow-neon"
        >
          {currentPage}
        </button>
      )}
      
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="w-9 h-9 text-sm font-medium rounded-lg transition-all bg-surface text-foreground/80 border border-pink/30 hover:border-pink hover:glow-pink"
        >
          {currentPage + 1}
        </button>
      )}
      
      {currentPage < totalPages - 2 && (
        <span className="text-foreground/60 text-sm">...</span>
      )}
      
      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 h-9 text-sm font-medium bg-surface text-foreground/80 border border-pink/30 rounded-lg hover:border-pink hover:glow-pink transition-all"
        >
          Next &gt;
        </button>
      )}
    </div>
  );
};
