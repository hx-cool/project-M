import CategoryPage from "./CategoryPage";

const netflixMovies = [
  { title: "Stranger Things Movie", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Money Heist Movie", year: "2025", genre: "Crime", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "The Witcher Movie", year: "2025", genre: "Fantasy", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Ozark Movie", year: "2025", genre: "Crime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Dark Movie", year: "2025", genre: "Sci-Fi", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "HD" },
  { title: "Narcos Movie", year: "2025", genre: "Crime", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "BluRay" },
];

const NetflixMovies = () => {
  return (
    <CategoryPage
      categoryName="Netflix Movies"
      movies={netflixMovies}
      description="Netflix originals and exclusive content featuring award-winning series and blockbuster films."
    />
  );
};

export default NetflixMovies;