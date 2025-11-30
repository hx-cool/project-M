import CategoryPage from "./CategoryPage";

const generateMovies = (prefix: string, count: number) => Array.from({ length: count }, (_, i) => ({
  title: `${prefix} ${i + 10}`,
  year: "2025",
  genre: "Horror",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const horrorMovies = [
  { title: "The Conjuring 4", year: "2025", genre: "Horror", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Insidious 6", year: "2025", genre: "Horror", rating: 7.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "A Quiet Place 3", year: "2025", genre: "Horror", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Scream 7", year: "2025", genre: "Horror", rating: 7.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
  { title: "Evil Dead Rise 2", year: "2025", genre: "Horror", rating: 8.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Nun 3", year: "2025", genre: "Horror", rating: 7.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "HD" },
  { title: "Urban Legends", year: "2024", genre: "Horror", rating: 7.8, posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg", quality: "BluRay" },
  { title: "Shadow Realm", year: "2024", genre: "Horror", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Stree 3", year: "2024", genre: "Horror", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjI5MTg1Njg0Ml5BMl5BanBnXkFtZTcwNzM2NjgyNQ@@._V1_SX300.jpg", quality: "HD" },
  ...generateMovies("Horror Movie", 20)
];

const HorrorMovies = () => {
  return (
    <CategoryPage
      categoryName="Horror Movies"
      movies={horrorMovies}
      description="Spine-chilling tales, supernatural encounters, and terrifying experiences that will keep you on the edge of your seat."
    />
  );
};

export default HorrorMovies;