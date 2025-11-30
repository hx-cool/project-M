import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Action Movie ${i + 13}`,
  year: "2025",
  genre: "Action",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const actionMovies = [
  { title: "Fast X 2", year: "2025", genre: "Action", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "John Wick 5", year: "2025", genre: "Action", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Mission Impossible 8", year: "2025", genre: "Action", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Transformers Rise", year: "2025", genre: "Action", rating: 7.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Mad Max Fury", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Expendables 5", year: "2025", genre: "Action", rating: 7.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
  { title: "Cyber Heist", year: "2025", genre: "Action", rating: 8.7, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", quality: "WEB-DL" },
  { title: "Desert Storm", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg", quality: "BluRay" },
  { title: "Shadow Protocol", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Eternal Knight", year: "2024", genre: "Action", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Velocity", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "HD" },
  { title: "Tiger Zinda Hai 2", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjQ3NzQxNTQxNV5BMl5BanBnXkFtZTgwMDI0NjAyNDM@._V1_SX300.jpg", quality: "WEB-DL" },
  ...generateMovies(20)
];

const ActionMovies = () => {
  return (
    <CategoryPage
      categoryName="Action Movies"
      movies={actionMovies}
      description="High-octane thrills, explosive sequences, and adrenaline-pumping adventures await you in our action-packed collection."
    />
  );
};

export default ActionMovies;