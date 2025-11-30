import CategoryPage from "./CategoryPage";

const generateMovies = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Hindi Movie ${i + 11}`,
  year: "2025",
  genre: "Drama",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const hindiMovies = [
  { title: "Pathaan Returns", year: "2025", genre: "Action", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BYmI3ZWY0OTYtZjk3Yy00NDVjLWJkMDctM2NjZjg0NjM2ODJkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Gadar 3", year: "2025", genre: "Drama", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjZmYWJmYTktNDM5OS00YzBhLWI4MWUtYTU0YTVmNjVhMzg0XkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Stree 3", year: "2024", genre: "Horror", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjI5MTg1Njg0Ml5BMl5BanBnXkFtZTcwNzM2NjgyNQ@@._V1_SX300.jpg", quality: "HD" },
  { title: "Tiger Zinda Hai 2", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjQ3NzQxNTQxNV5BMl5BanBnXkFtZTgwMDI0NjAyNDM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Bhool Bhulaiyaa 4", year: "2024", genre: "Comedy", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzgxOGU2ZGItZTVkNy00ODM0LWFhNTAtZWMwNjAzYTk3MmJlXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Jawan: The Return", year: "2025", genre: "Thriller", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BZjZkNThjNTMtOGU0Ni00ZmMzLWE1MWYtNzEyNTY3YjNhYjIyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg", quality: "HD" },
  { title: "KGF Chapter 3", year: "2025", genre: "Action", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Pushpa 3", year: "2025", genre: "Action", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "RRR 2", year: "2025", genre: "Action", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
  { title: "Dangal 2", year: "2025", genre: "Drama", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  ...generateMovies(20)
];

const HindiMovies = () => {
  return (
    <CategoryPage
      categoryName="Hindi Movies"
      movies={hindiMovies}
      description="Experience the magic of Bollywood with our collection of Hindi cinema featuring drama, action, romance, and entertainment."
    />
  );
};

export default HindiMovies;