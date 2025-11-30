import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get movie by ID for editing
router.get('/movies/:id', async (req, res) => {
  try {
    const movie = await prisma.movie.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        downloads: true,
        screenshots: { orderBy: { displayOrder: 'asc' } },
      },
    });
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
});

// Get all movies
router.get('/movies', async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        genres: { include: { genre: true } },
        cast: { include: { cast: true } },
        downloads: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

// Update movie
router.put('/movies/:id', async (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const { title, year, genre, rating, posterUrl, quality, customQuality, duration, synopsis, cast, language, customLanguage, subtitle, customSubtitle, audioType, customAudioType, releaseDate, movieOrigin, platform, isSeries, episodeInfo, codec, show4K, isEditorPick, screenshots, download360p, size360p, qualityDetail360p, download480p, size480pCustom, qualityDetail480p, download720p10bit, size720p10bit, qualityDetail720p10bit, download720p, size720pCustom, qualityDetail720p, download1080p, size1080pCustom, qualityDetail1080p, download1440p, size1440p, qualityDetail1440p, download2160p, size2160p, qualityDetail2160p, customDownloads } = req.body;

    const movie = await prisma.movie.update({
      where: { id: movieId },
      data: {
        title,
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

    await prisma.movieGenre.deleteMany({ where: { movieId } });
    await prisma.movieCast.deleteMany({ where: { movieId } });
    await prisma.screenshot.deleteMany({ where: { movieId } });
    await prisma.download.deleteMany({ where: { movieId } });

    if (genre) {
      const genreNames = genre.split(',').map((g: string) => g.trim()).filter(g => g);
      for (const genreName of genreNames) {
        let genreRecord = await prisma.genre.findUnique({ where: { name: genreName } });
        if (!genreRecord) genreRecord = await prisma.genre.create({ data: { name: genreName } });
        await prisma.movieGenre.create({ data: { movieId, genreId: genreRecord.id } });
      }
    }

    if (cast) {
      const castNames = cast.split(',').map((c: string) => c.trim());
      for (const castName of castNames) {
        let castRecord = await prisma.castMember.findFirst({ where: { name: castName } });
        if (!castRecord) castRecord = await prisma.castMember.create({ data: { name: castName } });
        await prisma.movieCast.create({ data: { movieId, castId: castRecord.id } });
      }
    }

    if (screenshots) {
      const screenshotUrls = screenshots.split(',').map((url: string) => url.trim()).filter((url: string) => url);
      for (let i = 0; i < screenshotUrls.length; i++) {
        await prisma.screenshot.create({ data: { movieId, url: screenshotUrls[i], displayOrder: i + 1 } });
      }
    }

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
      if (dl.link) await prisma.download.create({ data: { movieId, resolution: dl.resolution, size: dl.size, qualityDetail: dl.qualityDetail, link: dl.link } });
    }
    if (customDownloads && Array.isArray(customDownloads)) {
      for (const custom of customDownloads) {
        if (custom.link) await prisma.download.create({ data: { movieId, resolution: custom.name, size: custom.size, qualityDetail: custom.qualityDetail || custom.name, link: custom.link } });
      }
    }

    res.json({ success: true, movie });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update movie' });
  }
});

// Delete movie
router.delete('/movies/:id', async (req, res) => {
  try {
    await prisma.movie.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete movie' });
  }
});

// Get stats
router.get('/stats', async (req, res) => {
  try {
    const movieCount = await prisma.movie.count();
    const genreCount = await prisma.genre.count();
    const totalDownloads = await prisma.download.count();
    
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthlyMovies = await prisma.movie.count({
      where: { createdAt: { gte: firstDayOfMonth } }
    });
    
    const recentMovies = await prisma.movie.findMany({
      select: { id: true, title: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    res.json({ movieCount, genreCount, totalDownloads, monthlyMovies, recentMovies });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get all genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await prisma.genre.findMany({
      include: { _count: { select: { movies: true } } },
      orderBy: { name: 'asc' },
    });
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

// Add genre
router.post('/genres', async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await prisma.genre.create({ data: { name } });
    res.json({ success: true, genre });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add genre' });
  }
});

// Update genre
router.put('/genres/:id', async (req, res) => {
  try {
    const { name } = req.body;
    const genre = await prisma.genre.update({
      where: { id: parseInt(req.params.id) },
      data: { name },
    });
    res.json({ success: true, genre });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update genre' });
  }
});

// Delete genre
router.delete('/genres/:id', async (req, res) => {
  try {
    await prisma.genre.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete genre' });
  }
});

export default router;
