import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Drama Movie ${i + 10}`,
  year: "2025",
  genre: "Drama",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const dramaMovies = [
  { title: "The Pursuit 2", year: "2025", genre: "Drama", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
  { title: "Forrest Gump 2", year: "2025", genre: "Drama", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Shawshank 2", year: "2025", genre: "Drama", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "HD" },
  { title: "Good Will Hunting 2", year: "2025", genre: "Drama", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "A Beautiful Mind 2", year: "2025", genre: "Drama", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Godfather 4", year: "2025", genre: "Drama", rating: 9.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
  { title: "Lost Paradise", year: "2024", genre: "Drama", rating: 8.9, posterUrl: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg", quality: "BluRay" },
  { title: "The Last Stand", year: "2024", genre: "Drama", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Gadar 3", year: "2025", genre: "Drama", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjZmYWJmYTktNDM5OS00YzBhLWI4MWUtYTU0YTVmNjVhMzg0XkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "HD" },
  ...generateMovies(20)
];

const DramaMovies = () => {
  return (
    <CategoryPage
      categoryName="Drama Movies"
      movies={dramaMovies}
      description="Emotionally powerful stories that explore the human condition with compelling characters and meaningful narratives."
    />
  );
};

export default DramaMovies;