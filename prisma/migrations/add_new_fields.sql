-- Add new columns to existing movies table
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "contentType" TEXT DEFAULT 'movie';
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "trending" BOOLEAN DEFAULT false;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "featured" BOOLEAN DEFAULT false;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "metaTitle" TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "metaDescription" TEXT;
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "keywords" TEXT;

-- Update existing data based on isSeries flag
UPDATE movies SET "contentType" = 'series' WHERE "isSeries" = true;

-- Update existing data based on movieOrigin
UPDATE movies SET "contentType" = 'anime' WHERE "movieOrigin" = 'Anime';

-- Set trending flag for recent high-rated content
UPDATE movies SET "trending" = true 
WHERE rating >= 8.0 
AND "createdAt" >= NOW() - INTERVAL '30 days'
LIMIT 20;
