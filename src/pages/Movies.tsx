import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Movie ${i + 1}`,
  year: "2025",
  genre: ["Action", "Drama", "Comedy", "Thriller", "Sci-Fi"][i % 5],
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const allMovies = [
  { title: "Fast X 2", year: "2025", genre: "Action", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "John Wick 5", year: "2025", genre: "Action", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Conjuring 4", year: "2025", genre: "Horror", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Hangover 4", year: "2025", genre: "Comedy", rating: 7.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Blade Runner 2099", year: "2025", genre: "Sci-Fi", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  ...generateMovies(50)
];

const Movies = () => {
  return (
    <CategoryPage
      categoryName="All Movies"
      movies={allMovies}
    />
  );
};

export default Movies;