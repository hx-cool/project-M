import { Router } from 'express';
import prisma from '../../src/lib/db.js';

const router = Router();

// Add movie
router.post('/', async (req, res) => {
  try {
    console.log('Received movie data:', req.body);
    const { title, year, genre, rating, posterUrl, quality, customQuality, duration, synopsis, cast, language, customLanguage, subtitle, customSubtitle, audioType, customAudioType, releaseDate, movieOrigin, platform, isSeries, episodeInfo, seasonNumber, seriesId, episodesThisSeason, totalSeasons, seriesStatus, seriesType, codec, show4K, isEditorPick, screenshots, download360p, size360p, qualityDetail360p, download480p, size480pCustom, qualityDetail480p, download720p10bit, size720p10bit, qualityDetail720p10bit, download720p, size720pCustom, qualityDetail720p, download1080p, size1080pCustom, qualityDetail1080p, download1440p, size1440p, qualityDetail1440p, download2160p, size2160p, qualityDetail2160p, customDownloads, allDownloads } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }

    // Create unique slug
    let baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let slug = baseSlug;
    let counter = 1;
    
    // Check if slug exists and make it unique
    while (await prisma.movie.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    console.log('Creating movie with data:', {
      title,
      slug,
      year: year || null,
      rating: rating ? parseFloat(rating) : null
    });

    const movie = await prisma.movie.create({
      data: {
        title,
        slug,
        year: year || null,
        rating: rating ? parseFloat(rating) : null,
        posterUrl: posterUrl || null,
        quality: quality === 'custom' && customQuality ? customQuality : (quality || null),
        customQuality: quality === 'custom' ? customQuality : null,
        duration: duration || null,
        synopsis: synopsis || null,
        language: language === 'custom' && customLanguage ? customLanguage : (language || null),
        customLanguage: language === 'custom' ? customLanguage : null,
        subtitle: subtitle === 'custom' && customSubtitle ? customSubtitle : (subtitle || null),
        customSubtitle: subtitle === 'custom' ? customSubtitle : null,
        audioType: audioType === 'custom' && customAudioType ? customAudioType : (audioType || null),
        customAudioType: audioType === 'custom' ? customAudioType : null,
        releaseDate: releaseDate || null,
        movieOrigin: movieOrigin || null,
        platform: platform || null,
        isSeries: Boolean(isSeries),
        episodeInfo: episodeInfo || null,
        seasonNumber: seasonNumber ? parseInt(seasonNumber) : null,
        seriesId: seriesId || null,
        episodesThisSeason: episodesThisSeason ? parseInt(episodesThisSeason) : null,
        totalSeasons: totalSeasons ? parseInt(totalSeasons) : null,
        seriesStatus: seriesStatus || null,
        seriesType: seriesType || null,
        codec: codec || null,
        show4K: Boolean(show4K),
        isEditorPick: Boolean(isEditorPick),
        trending: Boolean(req.body.trending),
        featured: Boolean(req.body.featured),
        views: 0,
      },
    });
    console.log('Movie created successfully:', movie.id);

    // Auto-assign categories
    const categoriesToAdd: string[] = [];
    if (movieOrigin) categoriesToAdd.push(movieOrigin);
    if (platform && platform !== 'none') categoriesToAdd.push(platform);
    if (isSeries) {
      if (seriesType === 'Web Series') categoriesToAdd.push('Web Series');
      else if (seriesType === 'TV Show') categoriesToAdd.push('TV Show');
      else if (seriesType) categoriesToAdd.push(seriesType);
    } else {
      categoriesToAdd.push('Movies');
    }

    for (const categoryName of categoriesToAdd) {
      const catSlug = categoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      let category = await prisma.category.findUnique({ where: { slug: catSlug } });
      if (!category) {
        category = await prisma.category.create({ data: { name: categoryName, slug: catSlug } });
      }
      await prisma.movieCategory.create({
        data: { movieId: movie.id, categoryId: category.id },
      });
    }

    // Add genres
    if (genre) {
      try {
        const genreNames = genre.split(',').map((g: string) => g.trim()).filter(g => g);
        console.log('Adding genres:', genreNames);
        for (const genreName of genreNames) {
          let genreRecord = await prisma.genre.findUnique({ where: { name: genreName } });
          if (!genreRecord) {
            genreRecord = await prisma.genre.create({ data: { name: genreName } });
          }
          await prisma.movieGenre.create({
            data: { movieId: movie.id, genreId: genreRecord.id },
          });
        }
      } catch (genreError) {
        console.error('Genre creation error:', genreError);
      }
    }

    // Add cast
    if (cast) {
      const castNames = cast.split(',').map((c: string) => c.trim());
      for (const castName of castNames) {
        let castRecord = await prisma.castMember.findFirst({ where: { name: castName } });
        if (!castRecord) {
          castRecord = await prisma.castMember.create({ data: { name: castName } });
        }
        await prisma.movieCast.create({
          data: { movieId: movie.id, castId: castRecord.id },
        });
      }
    }

    // Add screenshots
    if (screenshots) {
      const screenshotUrls = screenshots.split(',').map((url: string) => url.trim()).filter((url: string) => url);
      for (let i = 0; i < screenshotUrls.length; i++) {
        await prisma.screenshot.create({
          data: { movieId: movie.id, url: screenshotUrls[i], displayOrder: i + 1 },
        });
      }
    }

    // Add download links
    if (allDownloads && Array.isArray(allDownloads)) {
      for (const dl of allDownloads) {
        if (dl.link || dl.batchLink) {
          await prisma.download.create({
            data: { 
              movieId: movie.id, 
              resolution: dl.name, 
              size: dl.size, 
              qualityDetail: dl.qualityDetail, 
              link: dl.link || null, 
              batchLink: dl.batchLink || null,
              batchSize: dl.batchSize || null,
              order: dl.order 
            },
          });
        }
      }
    } else {
      const downloads = [
        { link: download480p, resolution: '480p', size: size480pCustom, qualityDetail: qualityDetail480p, order: 0 },
        { link: download720p10bit, resolution: '720p 10Bit', size: size720p10bit, qualityDetail: qualityDetail720p10bit, order: 1 },
        { link: download720p, resolution: '720p', size: size720pCustom, qualityDetail: qualityDetail720p, order: 2 },
        { link: download1080p, resolution: '1080p', size: size1080pCustom, qualityDetail: qualityDetail1080p, order: 4 },
        { link: download1440p, resolution: '1440p', size: size1440p, qualityDetail: qualityDetail1440p, order: 6 },
        { link: download2160p, resolution: '2160p', size: size2160p, qualityDetail: qualityDetail2160p, order: 7 },
      ];

      for (const dl of downloads) {
        if (dl.link) {
          await prisma.download.create({
            data: { movieId: movie.id, resolution: dl.resolution, size: dl.size, qualityDetail: dl.qualityDetail, link: dl.link, order: dl.order },
          });
        }
      }

      if (customDownloads && Array.isArray(customDownloads)) {
        for (const custom of customDownloads) {
          if (custom.link) {
            await prisma.download.create({
              data: { movieId: movie.id, resolution: custom.name, size: custom.size, qualityDetail: custom.qualityDetail || custom.name, link: custom.link, order: custom.order !== undefined ? custom.order : 999 },
            });
          }
        }
      }
    }

    res.json({ success: true, movie });
  } catch (error) {
    console.error('Movie creation error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to add movie' });
  }
});

// Get all movies with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          genres: { include: { genre: true } },
          downloads: { orderBy: { order: 'asc' }, take: 3 },
        },
      }),
      prisma.movie.count()
    ]);

    res.json({
      movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Search movies
router.get('/search', async (req, res) => {
  try {
    const { q, genre, year, category } = req.query;
    
    const where: any = {};
    
    if (q && typeof q === 'string') {
      where.OR = [
        { title: { contains: q, mode: 'insensitive' } },
        { synopsis: { contains: q, mode: 'insensitive' } },
        { genres: { some: { genre: { name: { contains: q, mode: 'insensitive' } } } } },
      ];
    }
    
    if (genre && typeof genre === 'string') {
      where.genres = { some: { genre: { name: { equals: genre, mode: 'insensitive' } } } };
    }
    
    if (year && typeof year === 'string') {
      where.year = year;
    }

    if (category && typeof category === 'string') {
      where.categories = { some: { category: { slug: { equals: category, mode: 'insensitive' } } } };
    }

    const movies = await prisma.movie.findMany({
      where,
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        categories: { include: { category: true } },
        downloads: { orderBy: { order: 'asc' } },
        screenshots: { orderBy: { displayOrder: 'asc' } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search movies' });
  }
});

// Get ranked movies for homepage
router.get('/ranked', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        genres: { include: { genre: true } },
        downloads: { orderBy: { order: 'asc' } },
      },
    });

    const now = new Date();
    const max_views = Math.max(...movies.map(m => m.views), 1);

    const scored = movies.map(m => {
      const age_days = Math.floor((now.getTime() - new Date(m.createdAt).getTime()) / (24 * 60 * 60 * 1000));
      const recency_score = Math.max(0, 1 - age_days / 30);
      const popularity_score = m.views / max_views;
      const rating_score = (m.rating || 0) / 10;
      const editorial_score = m.isEditorPick ? 1 : 0;
      
      const score = 0.45 * recency_score + 0.25 * popularity_score + 0.12 * rating_score + 0.18 * editorial_score;
      return { ...m, score };
    });

    scored.sort((a, b) => b.score - a.score || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const hollywood = scored.filter(m => m.movieOrigin === 'Hollywood');
    const indian = scored.filter(m => ['Bollywood', 'South Indian'].includes(m.movieOrigin || ''));
    
    const selected = new Set<number>();
    const result: any[] = [];

    hollywood.slice(0, 10).forEach(m => { selected.add(m.id); result.push(m); });
    indian.slice(0, 10).forEach(m => { if (!selected.has(m.id)) { selected.add(m.id); result.push(m); } });

    for (const m of scored) {
      if (result.length >= 25) break;
      if (!selected.has(m.id)) { selected.add(m.id); result.push(m); }
    }

    const row1 = result.slice(0, 5);
    const row2 = result.slice(5, 10);
    const row3 = result.slice(10, 15);
    const row4 = result.slice(15, 20);
    const row5 = result.slice(20, 25);

    res.json({ row1, row2, row3, row4, row5 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to rank movies' });
  }
});

// Increment view count
router.post('/:slug/view', async (req, res) => {
  try {
    const movie = await prisma.movie.update({
      where: { slug: req.params.slug },
      data: { views: { increment: 1 } },
    });
    res.json({ success: true, views: movie.views });
  } catch (error) {
    res.status(500).json({ error: 'Failed to increment views' });
  }
});

// Get trending movies
router.get('/trending', async (req, res) => {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          { trending: true },
          { createdAt: { gte: sevenDaysAgo } }
        ]
      },
      include: {
        genres: { include: { genre: true } },
        downloads: { orderBy: { order: 'asc' } }
      },
      orderBy: [
        { trending: 'desc' },
        { createdAt: 'desc' }
      ],
      take: 20
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trending movies' });
  }
});

// Get top rated movies
router.get('/top-rated', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          { rating: { gte: 7.5 } },
          { featured: true }
        ]
      },
      include: {
        genres: { include: { genre: true } },
        downloads: { orderBy: { order: 'asc' } }
      },
      orderBy: [
        { featured: 'desc' },
        { rating: 'desc' }
      ],
      take: 20
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top rated movies' });
  }
});

// Get popular movies
router.get('/popular', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      where: {
        OR: [
          { views: { gte: 1000 } },
          { featured: true }
        ]
      },
      include: {
        genres: { include: { genre: true } },
        downloads: { orderBy: { order: 'asc' } }
      },
      orderBy: [
        { featured: 'desc' },
        { views: 'desc' },
        { rating: 'desc' }
      ],
      take: 20
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
});

// Get recent updates (5 latest movies/series)
router.get('/recent/updates', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        slug: true,
        title: true,
        year: true,
        quality: true,
        customQuality: true,
        language: true,
        customLanguage: true,
        downloads: {
          orderBy: { order: 'asc' },
          select: { resolution: true, size: true }
        }
      }
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recent updates' });
  }
});

// Get single movie by slug
router.get('/:slug', async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { slug: req.params.slug },
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        categories: { include: { category: true } },
        downloads: { orderBy: { order: 'asc' } },
        screenshots: { orderBy: { displayOrder: 'asc' } },
      },
    });
    
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

export default router;
