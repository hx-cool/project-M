import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Sci-Fi Movie ${i + 12}`,
  year: "2025",
  genre: "Sci-Fi",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const sciFiMovies = [
  { title: "Blade Runner 2099", year: "2025", genre: "Sci-Fi", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Matrix 5", year: "2025", genre: "Sci-Fi", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Terminator 7", year: "2025", genre: "Sci-Fi", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Alien Covenant 2", year: "2025", genre: "Sci-Fi", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
  { title: "Star Trek Beyond 2", year: "2025", genre: "Sci-Fi", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Interstellar 2", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "HD" },
  { title: "Quantum Shift", year: "2025", genre: "Sci-Fi", rating: 9.1, posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", quality: "BluRay" },
  { title: "Neon Dreams", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Inception Redux", year: "2025", genre: "Sci-Fi", rating: 9.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Avatar 4", year: "2026", genre: "Sci-Fi", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtNjQ1Ni00MzUxLWI0NTMtMGY2MjNiNGNmNzVkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Dune: Messiah", year: "2026", genre: "Sci-Fi", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  ...generateMovies(20)
];

const SciFiMovies = () => {
  return (
    <CategoryPage
      categoryName="Sci-Fi Movies"
      movies={sciFiMovies}
      description="Explore futuristic worlds, advanced technology, and mind-bending concepts that push the boundaries of imagination."
    />
  );
};

export default SciFiMovies;