import CategoryPage from "./CategoryPage";

const topImdbMovies = [
  { title: "The Shawshank Redemption", year: "1994", genre: "Drama", rating: 9.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Godfather", year: "1972", genre: "Crime", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Dark Knight", year: "2008", genre: "Action", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Godfather Part II", year: "1974", genre: "Crime", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "12 Angry Men", year: "1957", genre: "Drama", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Schindler's List", year: "1993", genre: "Biography", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Lord of the Rings: The Return of the King", year: "2003", genre: "Adventure", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWI5MTktXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Pulp Fiction", year: "1994", genre: "Crime", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: "2001", genre: "Adventure", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Good, the Bad and the Ugly", year: "1966", genre: "Western", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BOTQ5NDI3MTI4MF5BMl5BanBnXkFtZTgwNDQ4ODE5MDE@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Forrest Gump", year: "1994", genre: "Drama", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Fight Club", year: "1999", genre: "Drama", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BMmEzNTkxYjQtZTc0MC00YTVjLTg5ZTEtZWMwOWVlYzY0NWIwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Lord of the Rings: The Two Towers", year: "2002", genre: "Adventure", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGE5MzIyNTAtNWFlMC00NDA2LWJiMjItMjc4Yjg1OWM5NzhhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Inception", year: "2010", genre: "Action", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Empire Strikes Back", year: "1980", genre: "Adventure", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Matrix", year: "1999", genre: "Action", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Goodfellas", year: "1990", genre: "Biography", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "One Flew Over the Cuckoo's Nest", year: "1975", genre: "Drama", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BZjA0OWVhOTAtYWQxNi00YzNhLWI4ZjYtNjFjZTEyYjJlNDVlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Se7en", year: "1995", genre: "Crime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BOTUwODM5MTctZjczMi00OTk4LTg3NWUtNmVhMTAzNTNjYjcyXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Seven Samurai", year: "1954", genre: "Adventure", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BOWQ4NzQxNDEtNWU2MS00MzEyLTk0Y2EtMWE5MGZhZDRlNGY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
  { title: "It's a Wonderful Life", year: "1946", genre: "Drama", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BZjc4NDZhZWMtNGEzYS00ZWU2LThlM2ItNTA0YzQ0OTExMTE2XkEyXkFqcGdeQXVyNjUwMzI2NzU@._V1_SX300.jpg", quality: "BluRay" },
  { title: "The Silence of the Lambs", year: "1991", genre: "Crime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
  { title: "Saving Private Ryan", year: "1998", genre: "Drama", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BZjhkMDM4MWItZTVjOC00ZDRhLThmYTAtM2I5NzBmNmNlMzI1XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg", quality: "BluRay" },
  { title: "City of God", year: "2002", genre: "Crime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjA4ODQ3ODkzNV5BMl5BanBnXkFtZTYwOTc4NDI3._V1_SX300.jpg", quality: "BluRay" },
  { title: "Interstellar", year: "2014", genre: "Adventure", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg", quality: "BluRay" }
];

const TopImdb = () => {
  return (
    <CategoryPage
      categoryName="Top IMDb Movies"
      movies={topImdbMovies}
    />
  );
};

export default TopImdb;