import CategoryPage from "./CategoryPage";

const kDramaMovies = [
  { title: "Squid Game Movie", year: "2025", genre: "K-Drama", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Parasite 2", year: "2025", genre: "K-Drama", rating: 9.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Train to Busan 3", year: "2025", genre: "K-Drama", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "HD" },
  { title: "Kingdom Movie", year: "2025", genre: "K-Drama", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Oldboy Remake", year: "2025", genre: "K-Drama", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Handmaiden 2", year: "2025", genre: "K-Drama", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "HD" },
];

const KDramaMovies = () => {
  return (
    <CategoryPage
      categoryName="K-Drama Movies"
      movies={kDramaMovies}
      description="Experience the emotional depth and storytelling excellence of Korean cinema and drama films."
    />
  );
};

export default KDramaMovies;