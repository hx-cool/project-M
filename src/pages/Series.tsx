import CategoryPage from "./CategoryPage";

const generateSeries = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Series ${i + 1}`,
  year: "2025",
  genre: ["Drama", "Crime", "Thriller", "Comedy", "Action"][i % 5],
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const allSeries = [
  { title: "Mirzapur S3", year: "2025", genre: "Crime", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Family Man S3", year: "2024", genre: "Thriller", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjJmYzY2YmYtMDI5Zi00YzViLWIzZGItNzJhMmM1M2E2NzBjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "HD" },
  { title: "Stranger Things Movie", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Money Heist Movie", year: "2025", genre: "Crime", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "The Boys Movie", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  ...generateSeries(50)
];

const Series = () => {
  return (
    <CategoryPage
      categoryName="All Series"
      movies={allSeries}
    />
  );
};

export default Series;