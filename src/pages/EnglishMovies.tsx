import CategoryPage from "./CategoryPage";

const englishMovies = [
  { title: "Fast X 2", year: "2025", genre: "Action", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "John Wick 5", year: "2025", genre: "Action", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Batman II", year: "2026", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg", quality: "HD" },
  { title: "Avengers: Secret Wars", year: "2027", genre: "Action", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjQ3NTI2ODUxNV5BMl5BanBnXkFtZTgwNzI4NDI0OTE@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Interstellar 2", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Deadpool 4", year: "2025", genre: "Comedy", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg", quality: "HD" },
];

const EnglishMovies = () => {
  return (
    <CategoryPage
      categoryName="English Movies"
      movies={englishMovies}
      description="Hollywood blockbusters and English-language films from around the world featuring top-tier entertainment."
    />
  );
};

export default EnglishMovies;