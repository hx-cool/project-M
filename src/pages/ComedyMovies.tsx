import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Comedy Movie ${i + 9}`,
  year: "2025",
  genre: "Comedy",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const comedyMovies = [
  { title: "Hangover 4", year: "2025", genre: "Comedy", rating: 7.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Superbad 2", year: "2025", genre: "Comedy", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Step Brothers 2", year: "2025", genre: "Comedy", rating: 8.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
  { title: "Anchorman 3", year: "2025", genre: "Comedy", rating: 7.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Zoolander 3", year: "2025", genre: "Comedy", rating: 7.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Dumb and Dumber 3", year: "2025", genre: "Comedy", rating: 7.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Deadpool 4", year: "2025", genre: "Comedy", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Bhool Bhulaiyaa 4", year: "2024", genre: "Comedy", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzgxOGU2ZGItZTVkNy00ODM0LWFhNTAtZWMwNjAzYTk3MmJlXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "WEB-DL" },
  ...generateMovies(20)
];

const ComedyMovies = () => {
  return (
    <CategoryPage
      categoryName="Comedy Movies"
      movies={comedyMovies}
      description="Laugh-out-loud moments, witty dialogues, and hilarious situations that will brighten your day."
    />
  );
};

export default ComedyMovies;