-- Add seriesStatus column to movies table
ALTER TABLE movies ADD COLUMN IF NOT EXISTS "seriesStatus" TEXT;
