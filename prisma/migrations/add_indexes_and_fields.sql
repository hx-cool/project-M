-- ============================================
-- MOVIESWALA SCHEMA OPTIMIZATION MIGRATION
-- Add indexes, totalSeasons field, and timestamps
-- ============================================

-- Add totalSeasons field to movies
ALTER TABLE "movies" ADD COLUMN IF NOT EXISTS "totalSeasons" INTEGER;

-- Add timestamps to downloads and screenshots
ALTER TABLE "downloads" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE "screenshots" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- Add indexes to movies table
CREATE INDEX IF NOT EXISTS "movies_slug_idx" ON "movies"("slug");
CREATE INDEX IF NOT EXISTS "movies_isSeries_idx" ON "movies"("isSeries");
CREATE INDEX IF NOT EXISTS "movies_seriesId_idx" ON "movies"("seriesId");
CREATE INDEX IF NOT EXISTS "movies_movieOrigin_idx" ON "movies"("movieOrigin");
CREATE INDEX IF NOT EXISTS "movies_platform_idx" ON "movies"("platform");
CREATE INDEX IF NOT EXISTS "movies_trending_idx" ON "movies"("trending");
CREATE INDEX IF NOT EXISTS "movies_featured_idx" ON "movies"("featured");
CREATE INDEX IF NOT EXISTS "movies_isEditorPick_idx" ON "movies"("isEditorPick");
CREATE INDEX IF NOT EXISTS "movies_createdAt_idx" ON "movies"("createdAt" DESC);
CREATE INDEX IF NOT EXISTS "movies_views_idx" ON "movies"("views" DESC);
CREATE INDEX IF NOT EXISTS "movies_rating_idx" ON "movies"("rating" DESC);

-- Add indexes to genres table
CREATE INDEX IF NOT EXISTS "genres_name_idx" ON "genres"("name");

-- Add indexes to movie_genres table
CREATE INDEX IF NOT EXISTS "movie_genres_genreId_idx" ON "movie_genres"("genreId");

-- Add indexes to cast_members table
CREATE INDEX IF NOT EXISTS "cast_members_name_idx" ON "cast_members"("name");

-- Add indexes to movie_cast table
CREATE INDEX IF NOT EXISTS "movie_cast_castId_idx" ON "movie_cast"("castId");

-- Add indexes to downloads table
CREATE INDEX IF NOT EXISTS "downloads_movieId_idx" ON "downloads"("movieId");
CREATE INDEX IF NOT EXISTS "downloads_order_idx" ON "downloads"("order");

-- Add indexes to screenshots table
CREATE INDEX IF NOT EXISTS "screenshots_movieId_idx" ON "screenshots"("movieId");
CREATE INDEX IF NOT EXISTS "screenshots_displayOrder_idx" ON "screenshots"("displayOrder");

-- Add indexes to categories table
CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories"("slug");

-- Add indexes to movie_categories table
CREATE INDEX IF NOT EXISTS "movie_categories_categoryId_idx" ON "movie_categories"("categoryId");

-- Verify indexes created
SELECT 
    tablename, 
    indexname, 
    indexdef 
FROM 
    pg_indexes 
WHERE 
    schemaname = 'public' 
    AND tablename IN ('movies', 'genres', 'movie_genres', 'cast_members', 'movie_cast', 'downloads', 'screenshots', 'categories', 'movie_categories')
ORDER BY 
    tablename, indexname;
