import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Add movie
router.post('/', async (req, res) => {
  try {
    console.log('Received movie data:', req.body);
    const { title, year, genre, rating, posterUrl, quality, customQuality, duration, synopsis, cast, language, customLanguage, subtitle, customSubtitle, audioType, customAudioType, releaseDate, movieOrigin, platform, isSeries, episodeInfo, codec, show4K, isEditorPick, screenshots, download360p, size360p, qualityDetail360p, download480p, size480pCustom, qualityDetail480p, download720p10bit, size720p10bit, qualityDetail720p10bit, download720p, size720pCustom, qualityDetail720p, download1080p, size1080pCustom, qualityDetail1080p, download1440p, size1440p, qualityDetail1440p, download2160p, size2160p, qualityDetail2160p, customDownloads } = req.body;

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
        codec: codec || null,
        show4K: Boolean(show4K),
        isEditorPick: Boolean(isEditorPick),
      },
    });
    console.log('Movie created successfully:', movie.id);

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
    const downloads = [
      { link: download360p, resolution: '360p', size: size360p, qualityDetail: qualityDetail360p },
      { link: download480p, resolution: '480p', size: size480pCustom, qualityDetail: qualityDetail480p },
      { link: download720p10bit, resolution: '720p 10Bit', size: size720p10bit, qualityDetail: qualityDetail720p10bit },
      { link: download720p, resolution: '720p', size: size720pCustom, qualityDetail: qualityDetail720p },
      { link: download1080p, resolution: '1080p', size: size1080pCustom, qualityDetail: qualityDetail1080p },
      { link: download1440p, resolution: '1440p', size: size1440p, qualityDetail: qualityDetail1440p },
      { link: download2160p, resolution: '2160p', size: size2160p, qualityDetail: qualityDetail2160p },
    ];

    for (const dl of downloads) {
      if (dl.link) {
        await prisma.download.create({
          data: { movieId: movie.id, resolution: dl.resolution, size: dl.size, qualityDetail: dl.qualityDetail, link: dl.link },
        });
      }
    }

    // Add custom downloads
    if (customDownloads && Array.isArray(customDownloads)) {
      for (const custom of customDownloads) {
        if (custom.link) {
          await prisma.download.create({
            data: { movieId: movie.id, resolution: custom.name, size: custom.size, qualityDetail: custom.qualityDetail || custom.name, link: custom.link },
          });
        }
      }
    }

    res.json({ success: true, movie });
  } catch (error) {
    console.error('Movie creation error:', error);
    res.status(500).json({ success: false, error: error.message || 'Failed to add movie' });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        downloads: true,
        screenshots: { orderBy: { displayOrder: 'asc' } },
      },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Search movies
router.get('/search', async (req, res) => {
  try {
    const { q, genre, year } = req.query;
    
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

    const movies = await prisma.movie.findMany({
      where,
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        downloads: true,
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
        downloads: true,
      },
    });

    const now = new Date();
    const ninety_days_ago = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    const max_views = Math.max(...movies.map(m => m.views), 1);

    const qualityMap: Record<string, number> = {
      'BluRay': 1.0, 'WEB-DL': 0.9, 'HDRip': 0.7,
      'PreDVDRip': 0.5, 'HDTC': 0.4, 'TELESYNC': 0.3, 'CAM': 0.2
    };

    const scored = movies.map(m => {
      const age_days = Math.floor((now.getTime() - new Date(m.createdAt).getTime()) / (24 * 60 * 60 * 1000));
      const recency_score = Math.max(0, 1 - age_days / 30);
      const popularity_score = m.views / max_views;
      const rating_score = (m.rating || 0) / 10;
      const editorial_score = m.isEditorPick ? 1 : 0;
      
      const score = 0.45 * recency_score + 0.25 * popularity_score + 
                    0.12 * rating_score + 0.18 * editorial_score;

      return { ...m, score };
    });

    scored.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      if (b.createdAt !== a.createdAt) return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (b.views !== a.views) return b.views - a.views;
      return a.id - b.id;
    });

    const hollywood = scored.filter(m => m.movieOrigin === 'Hollywood');
    const indian = scored.filter(m => ['Bollywood', 'South Indian'].includes(m.movieOrigin || ''));
    
    const selected = new Set<number>();
    const result: any[] = [];

    hollywood.slice(0, 8).forEach(m => { selected.add(m.id); result.push(m); });
    indian.slice(0, 8).forEach(m => { if (!selected.has(m.id)) { selected.add(m.id); result.push(m); } });

    for (const m of scored) {
      if (result.length >= 24) break;
      if (selected.has(m.id)) continue;
      
      const hollywoodCount = result.filter(r => r.movieOrigin === 'Hollywood').length;
      const indianCount = result.filter(r => ['Bollywood', 'South Indian'].includes(r.movieOrigin || '')).length;
      
      if (m.movieOrigin === 'Hollywood' && hollywoodCount >= 16) continue;
      if (['Bollywood', 'South Indian'].includes(m.movieOrigin || '') && indianCount >= 16) continue;
      
      selected.add(m.id);
      result.push(m);
    }

    const row1 = result.slice(0, 6);
    const remaining = result.slice(6);
    const row2_pool = remaining.filter(m => m.movieOrigin === 'Hollywood');
    const row3_pool = remaining.filter(m => ['Bollywood', 'South Indian'].includes(m.movieOrigin || ''));
    
    const row2 = row2_pool.slice(0, 6);
    const row3 = row3_pool.slice(0, 6);
    
    const used_in_rows = new Set([...row1, ...row2, ...row3].map(m => m.id));
    const row4 = remaining.filter(m => !used_in_rows.has(m.id)).slice(0, 6);

    res.json({ row1, row2, row3, row4 });
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

// Get single movie by slug
router.get('/:slug', async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { slug: req.params.slug },
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        downloads: true,
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
