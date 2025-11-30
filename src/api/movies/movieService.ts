import prisma from '@/lib/db';
import { Prisma } from '@prisma/client';

export class MovieService {
  // Get all movies with pagination and filters
  async getMovies(params: {
    page?: number;
    limit?: number;
    genre?: string;
    category?: string;
    platform?: string;
    year?: number;
    search?: string;
    featured?: boolean;
    trending?: boolean;
  }) {
    const { page = 1, limit = 24, genre, category, platform, year, search, featured, trending } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.MovieWhereInput = {
      status: 'PUBLISHED',
      ...(genre && { genres: { some: { slug: genre } } }),
      ...(category && { categories: { some: { slug: category } } }),
      ...(platform && { platforms: { some: { slug: platform } } }),
      ...(year && { year }),
      ...(featured !== undefined && { featured }),
      ...(trending !== undefined && { trending }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { synopsis: { contains: search, mode: 'insensitive' } },
          { cast: { has: search } },
        ],
      }),
    };

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        skip,
        take: limit,
        include: {
          genres: true,
          categories: true,
          platforms: true,
          downloadLinks: {
            include: {
              servers: { where: { active: true } },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.movie.count({ where }),
    ]);

    return {
      movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Get single movie by slug
  async getMovieBySlug(slug: string) {
    const movie = await prisma.movie.findUnique({
      where: { slug },
      include: {
        genres: true,
        categories: true,
        platforms: true,
        downloadLinks: {
          include: {
            servers: { where: { active: true } },
          },
        },
      },
    });

    if (movie) {
      // Increment view count
      await prisma.movie.update({
        where: { id: movie.id },
        data: { viewCount: { increment: 1 } },
      });
    }

    return movie;
  }

  // Create new movie
  async createMovie(data: {
    title: string;
    year: number;
    releaseDate: Date;
    duration: number;
    language: string;
    audioType: string;
    synopsis: string;
    posterUrl?: string;
    bannerUrl?: string;
    trailerUrl?: string;
    rating?: number;
    imdbRating?: number;
    cast?: string[];
    director?: string;
    producer?: string;
    writer?: string;
    genreIds?: string[];
    categoryIds?: string[];
    platformIds?: string[];
    featured?: boolean;
    trending?: boolean;
  }) {
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    return await prisma.movie.create({
      data: {
        ...data,
        slug,
        genres: data.genreIds ? { connect: data.genreIds.map(id => ({ id })) } : undefined,
        categories: data.categoryIds ? { connect: data.categoryIds.map(id => ({ id })) } : undefined,
        platforms: data.platformIds ? { connect: data.platformIds.map(id => ({ id })) } : undefined,
      },
      include: {
        genres: true,
        categories: true,
        platforms: true,
      },
    });
  }

  // Update movie
  async updateMovie(id: string, data: Partial<{
    title: string;
    year: number;
    duration: number;
    synopsis: string;
    posterUrl: string;
    rating: number;
    featured: boolean;
    trending: boolean;
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  }>) {
    return await prisma.movie.update({
      where: { id },
      data,
      include: {
        genres: true,
        categories: true,
        platforms: true,
      },
    });
  }

  // Delete movie
  async deleteMovie(id: string) {
    return await prisma.movie.delete({ where: { id } });
  }

  // Add download link
  async addDownloadLink(movieId: string, data: {
    quality: string;
    fileSize: string;
    resolution: string;
    servers: Array<{ name: string; url: string; type: string }>;
  }) {
    return await prisma.download.create({
      data: {
        movieId,
        quality: data.quality as any,
        fileSize: data.fileSize,
        resolution: data.resolution,
        servers: {
          create: data.servers,
        },
      },
      include: {
        servers: true,
      },
    });
  }

  // Increment download count
  async incrementDownloadCount(movieId: string) {
    return await prisma.movie.update({
      where: { id: movieId },
      data: { downloadCount: { increment: 1 } },
    });
  }

  // Get trending movies
  async getTrendingMovies(limit = 10) {
    return await prisma.movie.findMany({
      where: { trending: true, status: 'PUBLISHED' },
      take: limit,
      include: {
        genres: true,
        categories: true,
      },
      orderBy: { viewCount: 'desc' },
    });
  }

  // Get featured movies
  async getFeaturedMovies(limit = 10) {
    return await prisma.movie.findMany({
      where: { featured: true, status: 'PUBLISHED' },
      take: limit,
      include: {
        genres: true,
        categories: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const movieService = new MovieService();
