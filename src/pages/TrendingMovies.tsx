import CategoryPage from "./CategoryPage";

const trendingMovies = [
  { title: "Cyber Heist", year: "2025", genre: "Action", rating: 8.7, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", quality: "WEB-DL" },
  { title: "Quantum Shift", year: "2025", genre: "Sci-Fi", rating: 9.1, posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", quality: "BluRay" },
  { title: "Silent Echo", year: "2024", genre: "Thriller", rating: 8.4, posterUrl: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", quality: "HDTC" },
  { title: "The Eternal Knight", year: "2024", genre: "Action", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Neon Dreams", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Shadow Protocol", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
];

const TrendingMovies = () => {
  return (
    <CategoryPage
      categoryName="Trending Movies"
      movies={trendingMovies}
      description="The hottest movies everyone is talking about right now. Stay updated with the latest trending content."
    />
  );
};

export default TrendingMovies;