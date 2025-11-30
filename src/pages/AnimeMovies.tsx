import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Anime Movie ${i + 7}`,
  year: "2025",
  genre: "Anime",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const animeMovies = [
  { title: "Attack on Titan Final", year: "2025", genre: "Anime", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Demon Slayer Movie 3", year: "2025", genre: "Anime", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "One Piece Film Red 2", year: "2025", genre: "Anime", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "HD" },
  { title: "Spirited Away 2", year: "2025", genre: "Anime", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Your Name 2", year: "2025", genre: "Anime", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Akira Remastered", year: "2025", genre: "Anime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "HD" },
  ...generateMovies(25)
];

const AnimeMovies = () => {
  return (
    <CategoryPage
      categoryName="Anime Movies"
      movies={animeMovies}
      description="Immerse yourself in the captivating world of Japanese animation with stunning visuals and compelling stories."
    />
  );
};

export default AnimeMovies;