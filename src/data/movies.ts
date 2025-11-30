// Movie type definition
export interface Movie {
    title: string;
    year: string;
    genre: string | string[];
    rating: number;
    posterUrl?: string;
    quality?: "WEB-DL" | "HD" | "4K" | "BluRay" | "HDTC";
    duration?: string;
    synopsis?: string;
    cast?: string[];
    language?: string;
    audioType?: "Dual Audio" | "Hindi" | "English" | "Multi Audio";
    platform?: string;
    season?: string;
    releaseDate?: string;
    subtitle?: string;
    format?: string;
    screenshots?: string[];
    downloadLink?: string;
    isSeries?: boolean;
    // Series download links with quality options
    downloads?: {
        "480p"?: {
            episode?: string;
            batch?: string;
            batchSize?: string;
        };
        "720p"?: {
            episode?: string;
            batch?: string;
            batchSize?: string;
        };
        "1080p"?: {
            episode?: string;
            batch?: string;
            batchSize?: string;
        };
    };
    // Legacy fields (deprecated, use downloads instead)
    episodeDownloadLink?: string;
    batchDownloadLink?: string;
    batchSize?: string;
}

// Movie Data Collections
export const trendingMovies: Movie[] = [
    {
        title: "Night Runner",
        year: "2025",
        genre: ["Action", "Thriller"],
        rating: 8.5,
        quality: "WEB-DL",
        duration: "1h 57m",
        synopsis: "A former intelligence agent must race against time through the neon-lit streets of a dystopian city to prevent a catastrophic cyber attack.",
        cast: ["Tom Hardy", "Charlize Theron", "Idris Elba"],
        posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=750&fit=crop",
        downloadLink: "https://example.com/night-runner"
    },
    {
        title: "Cyber Heist",
        year: "2025",
        genre: ["Action", "Thriller", "Crime"],
        rating: 8.7,
        quality: "WEB-DL",
        duration: "2h 18m",
        synopsis: "A team of elite hackers must pull off the ultimate digital heist while staying one step ahead of international law enforcement.",
        cast: ["Ryan Gosling", "Ana de Armas", "Oscar Isaac"],
        posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        downloadLink: "https://vcloud.zip/u1iuv15gttwt5j1"
    },
    {
        title: "Silent Echo",
        year: "2024",
        genre: ["Thriller", "Mystery", "Drama"],
        rating: 8.4,
        quality: "HDTC",
        duration: "1h 38m",
        synopsis: "A sound engineer discovers mysterious audio recordings that lead her into a dangerous conspiracy involving government secrets.",
        cast: ["Emily Blunt", "Jake Gyllenhaal"],
        posterUrl: "https://images.unsplash.com/photo-1489599735734-79b4fc8a2ade?w=500&h=750&fit=crop",
        downloadLink: "https://example.com/silent-echo"
    },
    {
        title: "Quantum Shift",
        year: "2025",
        genre: ["Sci-Fi", "Action", "Adventure"],
        rating: 9.1,
        quality: "BluRay",
        duration: "2h 22m",
        synopsis: "When reality begins to fracture, a physicist must navigate parallel universes to prevent total collapse of the multiverse.",
        cast: ["Timothée Chalamet", "Zendaya", "Benedict Cumberbatch"],
        posterUrl: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=750&fit=crop",
        downloadLink: "https://example.com/quantum-shift"
    },
    { title: "Urban Legends", year: "2024", genre: "Horror", rating: 7.8, posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg" },
    { title: "Desert Storm", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://image.tmdb.org/t/p/w500/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg" },
    { title: "Lost Paradise", year: "2024", genre: "Drama", rating: 8.9, posterUrl: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg" },
];

export const newReleases: Movie[] = [
    { title: "Code Red", year: "2025", genre: "Thriller", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
    { title: "Midnight Drive", year: "2025", genre: "Crime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
    { title: "Shadow Protocol", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" },
    { title: "Neon Dreams", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" },
    { title: "Dark Waters", year: "2025", genre: "Mystery", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg" },
    { title: "Final Hour", year: "2025", genre: "Thriller", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg" },
];

export const topImdb: Movie[] = [
    { title: "The Eternal Knight", year: "2024", genre: "Action", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg" },
    { title: "Inception Redux", year: "2025", genre: "Sci-Fi", rating: 9.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg" },
    { title: "The Last Stand", year: "2024", genre: "Drama", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg" },
    { title: "Mystic Journey", year: "2025", genre: "Fantasy", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg" },
    { title: "Shadow Realm", year: "2024", genre: "Horror", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg" },
    { title: "Velocity", year: "2025", genre: "Action", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg" },
];

export const hindiMovies: Movie[] = [
    { title: "Pathaan Returns", year: "2025", genre: "Action", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BYmI3ZWY0OTYtZjk3Yy00NDVjLWJkMDctM2NjZjg0NjM2ODJkXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg" },
    { title: "Gadar 3", year: "2025", genre: "Drama", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjZmYWJmYTktNDM5OS00YzBhLWI4MWUtYTU0YTVmNjVhMzg0XkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg" },
    { title: "Stree 3", year: "2024", genre: "Horror", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjI5MTg1Njg0Ml5BMl5BanBnXkFtZTcwNzM2NjgyNQ@@._V1_SX300.jpg" },
    { title: "Tiger Zinda Hai 2", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjQ3NzQxNTQxNV5BMl5BanBnXkFtZTgwMDI0NjAyNDM@._V1_SX300.jpg" },
    { title: "Bhool Bhulaiyaa 4", year: "2024", genre: "Comedy", rating: 8.3, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzgxOGU2ZGItZTVkNy00ODM0LWFhNTAtZWMwNjAzYTk3MmJlXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg" },
    { title: "Jawan: The Return", year: "2025", genre: "Thriller", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BZjZkNThjNTMtOGU0Ni00ZmMzLWE1MWYtNzEyNTY3YjNhYjIyXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg" },
];

export const webSeries: Movie[] = [
    {
        title: "Mirzapur S3",
        year: "2025",
        genre: "Crime",
        rating: 9.0,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_SX300.jpg",
        isSeries: true,
        downloads: {
            "480p": {
                episode: "https://example.com/mirzapur-s3-480p-episodes",
                batch: "https://example.com/mirzapur-s3-480p-batch",
                batchSize: "2.1GB"
            },
            "720p": {
                episode: "https://example.com/mirzapur-s3-720p-episodes",
                batch: "https://example.com/mirzapur-s3-720p-batch",
                batchSize: "5.2GB"
            },
            "1080p": {
                episode: "https://example.com/mirzapur-s3-1080p-episodes",
                batch: "https://example.com/mirzapur-s3-1080p-batch",
                batchSize: "12.5GB"
            }
        }
    },
    {
        title: "The Family Man S3",
        year: "2024",
        genre: "Thriller",
        rating: 8.9,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BYjJmYzY2YmYtMDI5Zi00YzViLWIzZGItNzJhMmM1M2E2NzBjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg",
        isSeries: true,
        downloads: {
            "480p": {
                episode: "https://example.com/family-man-s3-480p-episodes",
                batch: "https://example.com/family-man-s3-480p-batch",
                batchSize: "1.8GB"
            },
            "720p": {
                episode: "https://example.com/family-man-s3-720p-episodes",
                batch: "https://example.com/family-man-s3-720p-batch",
                batchSize: "4.8GB"
            },
            "1080p": {
                episode: "https://example.com/family-man-s3-1080p-episodes",
                batch: "https://example.com/family-man-s3-1080p-batch",
                batchSize: "10.2GB"
            }
        }
    },
    {
        title: "Panchayat S4",
        year: "2025",
        genre: "Comedy",
        rating: 9.1,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BNjdiNzI0NjEtZmQ3MS00Y2JmLWJkNTMtMDI1M2Q5Y2Q5NTMxXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg",
        isSeries: true,
        downloads: {
            "480p": {
                episode: "https://example.com/panchayat-s4-480p-episodes",
                batch: "https://example.com/panchayat-s4-480p-batch",
                batchSize: "1.2GB"
            },
            "720p": {
                episode: "https://example.com/panchayat-s4-720p-episodes",
                batch: "https://example.com/panchayat-s4-720p-batch",
                batchSize: "3.5GB"
            },
            "1080p": {
                episode: "https://example.com/panchayat-s4-1080p-episodes",
                batch: "https://example.com/panchayat-s4-1080p-batch",
                batchSize: "8.1GB"
            }
        }
    },
    {
        title: "Sacred Games Returns",
        year: "2025",
        genre: "Drama",
        rating: 8.7,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BMzRjZWVmMzItNTdmYS00OWEzLTgyOGUtNThiNTU2ZThlYjY0XkEyXkFqcGdeQXVyMTIxMDk2NDE4._V1_SX300.jpg",
        isSeries: true,
        downloads: {
            "480p": {
                episode: "https://example.com/sacred-games-480p-episodes",
                batch: "https://example.com/sacred-games-480p-batch",
                batchSize: "2.5GB"
            },
            "720p": {
                episode: "https://example.com/sacred-games-720p-episodes",
                batch: "https://example.com/sacred-games-720p-batch",
                batchSize: "6.1GB"
            },
            "1080p": {
                episode: "https://example.com/sacred-games-1080p-episodes",
                batch: "https://example.com/sacred-games-1080p-batch",
                batchSize: "13.5GB"
            }
        }
    },
    {
        title: "Delhi Crime S3",
        year: "2024",
        genre: "Crime",
        rating: 8.8,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BYjJmYzY2YmYtMDI5Zi00YzViLWIzZGItNzJhMmM1M2E2NzBjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg",
        isSeries: true,
        downloads: {
            "480p": {
                episode: "https://example.com/delhi-crime-s3-480p-episodes",
                batch: "https://example.com/delhi-crime-s3-480p-batch",
                batchSize: "1.5GB"
            },
            "720p": {
                episode: "https://example.com/delhi-crime-s3-720p-episodes",
                batch: "https://example.com/delhi-crime-s3-720p-batch",
                batchSize: "4.2GB"
            },
            "1080p": {
                episode: "https://example.com/delhi-crime-s3-1080p-episodes",
                batch: "https://example.com/delhi-crime-s3-1080p-batch",
                batchSize: "9.8GB"
            }
        }
    },
    {
        title: "Asur S3",
        year: "2025",
        genre: "Thriller",
        rating: 8.6,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BNjdiNzI0NjEtZmQ3MS00Y2JmLWJkNTMtMDI1M2Q5Y2Q5NTMxXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg",
        isSeries: true,
        downloads: {
            "480p": {
                episode: "https://example.com/asur-s3-480p-episodes",
                batch: "https://example.com/asur-s3-480p-batch",
                batchSize: "2.0GB"
            },
            "720p": {
                episode: "https://example.com/asur-s3-720p-episodes",
                batch: "https://example.com/asur-s3-720p-batch",
                batchSize: "5.5GB"
            },
            "1080p": {
                episode: "https://example.com/asur-s3-1080p-episodes",
                batch: "https://example.com/asur-s3-1080p-batch",
                batchSize: "11.8GB"
            }
        }
    },
];

export const upcomingReleases: Movie[] = [
    { title: "Avatar 4", year: "2026", genre: "Sci-Fi", rating: 0, posterUrl: "https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtNjQ1Ni00MzUxLWI0NTMtMGY2MjNiNGNmNzVkXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" },
    { title: "The Batman II", year: "2026", genre: "Action", rating: 0, posterUrl: "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg" },
    { title: "Deadpool 4", year: "2025", genre: "Comedy", rating: 0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg" },
    { title: "Dune: Messiah", year: "2026", genre: "Sci-Fi", rating: 0, posterUrl: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" },
    { title: "Avengers: Secret Wars", year: "2027", genre: "Action", rating: 0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjQ3NTI2ODUxNV5BMl5BanBnXkFtZTgwNzI4NDI0OTE@._V1_SX300.jpg" },
    { title: "Spider-Man 5", year: "2025", genre: "Action", rating: 0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE3YmYtNWU2NmM2YzNjMjE2XkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg" },
];

export const actionMovies: Movie[] = [
    { title: "Fast X 2", year: "2025", genre: "Action", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "BluRay" },
    { title: "John Wick 5", year: "2025", genre: "Action", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "Mission Impossible 8", year: "2025", genre: "Action", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
    { title: "Transformers Rise", year: "2025", genre: "Action", rating: 7.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Mad Max Fury", year: "2025", genre: "Action", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "The Expendables 5", year: "2025", genre: "Action", rating: 7.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
];

export const horrorMovies: Movie[] = [
    { title: "The Conjuring 4", year: "2025", genre: "Horror", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Insidious 6", year: "2025", genre: "Horror", rating: 7.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "A Quiet Place 3", year: "2025", genre: "Horror", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
    { title: "Scream 7", year: "2025", genre: "Horror", rating: 7.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
    { title: "Evil Dead Rise 2", year: "2025", genre: "Horror", rating: 8.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "The Nun 3", year: "2025", genre: "Horror", rating: 7.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "HD" },
];

export const comedyMovies: Movie[] = [
    { title: "Hangover 4", year: "2025", genre: "Comedy", rating: 7.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Superbad 2", year: "2025", genre: "Comedy", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "Step Brothers 2", year: "2025", genre: "Comedy", rating: 8.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
    { title: "Anchorman 3", year: "2025", genre: "Comedy", rating: 7.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Zoolander 3", year: "2025", genre: "Comedy", rating: 7.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "Dumb and Dumber 3", year: "2025", genre: "Comedy", rating: 7.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
];

export const dramaMovies: Movie[] = [
    { title: "The Pursuit 2", year: "2025", genre: "Drama", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
    { title: "Forrest Gump 2", year: "2025", genre: "Drama", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "The Shawshank 2", year: "2025", genre: "Drama", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "HD" },
    { title: "Good Will Hunting 2", year: "2025", genre: "Drama", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "BluRay" },
    { title: "A Beautiful Mind 2", year: "2025", genre: "Drama", rating: 8.5, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "The Godfather 4", year: "2025", genre: "Drama", rating: 9.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BMWM5ZDcxMTYtNTEyNS00MDRkLWI3YTItNThmMGExMWY4XzRiXkEyXkFqcGdeQXVyNzg5MzIyOA@@._V1_SX300.jpg", quality: "HD" },
];

export const sciFiMovies: Movie[] = [
    { title: "Blade Runner 2099", year: "2025", genre: "Sci-Fi", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Matrix 5", year: "2025", genre: "Sci-Fi", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "Terminator 7", year: "2025", genre: "Sci-Fi", rating: 8.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "HD" },
    { title: "Alien Covenant 2", year: "2025", genre: "Sci-Fi", rating: 8.4, posterUrl: "https://m.media-amazon.com/images/M/MV5BMTg4NzEyNzQ5OF5BMl5BanBnXkFtZTYwNTY3NDg4._V1_SX300.jpg", quality: "BluRay" },
    { title: "Star Trek Beyond 2", year: "2025", genre: "Sci-Fi", rating: 8.1, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "Interstellar 2", year: "2025", genre: "Sci-Fi", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "HD" },
];

export const animeMovies: Movie[] = [
    { title: "Attack on Titan Final", year: "2025", genre: "Anime", rating: 9.2, posterUrl: "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMzkwOTY2NzI@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Demon Slayer Movie 3", year: "2025", genre: "Anime", rating: 8.9, posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "One Piece Film Red 2", year: "2025", genre: "Anime", rating: 8.7, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg", quality: "HD" },
    { title: "Spirited Away 2", year: "2025", genre: "Anime", rating: 9.0, posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg", quality: "BluRay" },
    { title: "Your Name 2", year: "2025", genre: "Anime", rating: 8.8, posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFkMTlkYWUtZWFhNy00M2FmLThiOTYtYTRiYjVlZWYxNmJkXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg", quality: "WEB-DL" },
    { title: "Akira Remastered", year: "2025", genre: "Anime", rating: 8.6, posterUrl: "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg", quality: "HD" },
];



// Helper function to generate additional movies
const generateMovies = (prefix: string, count: number): Movie[] =>
    Array.from({ length: count }, (_, i) => ({
        title: `${prefix} ${i + 1}`,
        year: "2025",
        genre: "Action",
        rating: 7.0 + Math.random() * 2,
        posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
        quality: (["BluRay", "WEB-DL", "HD"] as const)[i % 3]
    }));

export const extraMovies1 = generateMovies("Thriller Movie", 30);
export const extraMovies2 = generateMovies("Romance Movie", 30);
export const extraMovies3 = generateMovies("Adventure Movie", 30);
export const extraMovies4 = generateMovies("Fantasy Movie", 30);
export const extraMovies5 = generateMovies("Crime Movie", 30);
export const extraMovies6 = generateMovies("Mystery Movie", 30);

// Combine all movies into a single array
export const allMovies: Movie[] = [
    ...trendingMovies,
    ...newReleases,
    ...topImdb,
    ...hindiMovies,
    ...webSeries,
    ...upcomingReleases,
    ...actionMovies,
    ...horrorMovies,
    ...comedyMovies,
    ...dramaMovies,
    ...sciFiMovies,
    ...animeMovies,
    ...extraMovies1,
    ...extraMovies2,
    ...extraMovies3,
    ...extraMovies4,
    ...extraMovies5,
    ...extraMovies6,
];

// Utility function to generate movie ID from title
export const generateMovieId = (title: string): string => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// Get movie by ID
export const getMovieById = (id: string): Movie | undefined => {
    return allMovies.find(movie => generateMovieId(movie.title) === id);
};

// Get related movies based on genre
export const getRelatedMovies = (movie: Movie, count: number = 6): Movie[] => {
    const genres = Array.isArray(movie.genre) ? movie.genre : [movie.genre];

    return allMovies
        .filter(m => {
            if (m.title === movie.title) return false;

            const mGenres = Array.isArray(m.genre) ? m.genre : [m.genre];
            return genres.some(genre => mGenres.includes(genre));
        })
        .slice(0, count);
};
