import CategoryPage from "./CategoryPage";

const amazonPrimeMovies = [
  { title: "The Boys Movie", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Jack Ryan Returns", year: "2025", genre: "Thriller", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Marvelous Mrs. Maisel Movie", year: "2025", genre: "Comedy", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Terminal List Movie", year: "2025", genre: "Action", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Rings of Power Movie", year: "2025", genre: "Fantasy", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "HD" },
  { title: "Citadel Movie", year: "2025", genre: "Action", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "BluRay" },
];

const AmazonPrimeMovies = () => {
  return (
    <CategoryPage
      categoryName="Amazon Prime Movies"
      movies={amazonPrimeMovies}
      description="Exclusive Amazon Prime Video originals and premium content available for streaming."
    />
  );
};

export default AmazonPrimeMovies;