import CategoryPage from "./CategoryPage";

const generateSeries = (count: number) => Array.from({ length: count }, (_, i) => ({
  title: `Web Series ${i + 11}`,
  year: "2025",
  genre: "Drama",
  rating: 7.0 + Math.random() * 2,
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  quality: ["BluRay", "WEB-DL", "HD"][i % 3] as "BluRay" | "WEB-DL" | "HD"
}));

const webSeries = [
  { title: "Mirzapur S3", year: "2025", genre: "Crime", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "The Family Man S3", year: "2024", genre: "Thriller", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjJmYzY2YmYtMDI5Zi00YzViLWIzZGItNzJhMmM1M2E2NzBjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "HD" },
  { title: "Panchayat S4", year: "2025", genre: "Comedy", rating: 9.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjdiNzI0NjEtZmQ3MS00Y2JmLWJkNTMtMDI1M2Q5Y2Q5NTMxXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "BluRay" },
  { title: "Sacred Games Returns", year: "2025", genre: "Drama", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Delhi Crime S3", year: "2024", genre: "Crime", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjJmYzY2YmYtMDI5Zi00YzViLWIzZGItNzJhMmM1M2E2NzBjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "HD" },
  { title: "Asur S3", year: "2025", genre: "Thriller", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjdiNzI0NjEtZmQ3MS00Y2JmLWJkNTMtMDI1M2Q5Y2Q5NTMxXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg", quality: "BluRay" },
  { title: "Scam 2003", year: "2024", genre: "Drama", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
  { title: "Rocket Boys S2", year: "2024", genre: "Biography", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
  { title: "Mumbai Diaries S2", year: "2024", genre: "Drama", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
  { title: "Arya S3", year: "2025", genre: "Action", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
  ...generateSeries(20)
];

const WebSeries = () => {
  return (
    <CategoryPage
      categoryName="Web Series"
      movies={webSeries}
      description="Binge-worthy series with compelling storylines, complex characters, and episodes that will keep you hooked."
    />
  );
};

export default WebSeries;