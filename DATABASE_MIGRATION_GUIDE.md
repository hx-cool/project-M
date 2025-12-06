# Database Migration Guide

## New Fields Added to Movies Table

### Fields Added:
1. **contentType** (String, default: "movie") - Categorizes content as movie, series, anime, or documentary
2. **trending** (Boolean, default: false) - Marks trending content
3. **featured** (Boolean, default: false) - Marks featured content
4. **metaTitle** (String, optional) - SEO meta title
5. **metaDescription** (String, optional) - SEO meta description
6. **keywords** (String, optional) - SEO keywords

## Migration Steps

### Option 1: Using Prisma Migrate (Recommended)

```bash
# Navigate to project directory
cd MoviesWala

# Generate migration
npx prisma migrate dev --name add_content_fields

# Apply migration
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### Option 2: Manual SQL Migration

```bash
# Connect to your PostgreSQL database
psql -U your_username -d your_database_name

# Run the migration SQL
\i prisma/migrations/add_new_fields.sql

# Or copy-paste the SQL commands directly
```

### Option 3: Using Database GUI (pgAdmin, DBeaver, etc.)

1. Open your database management tool
2. Connect to your database
3. Open the SQL query editor
4. Copy and paste the contents of `prisma/migrations/add_new_fields.sql`
5. Execute the query

## Verify Migration

After migration, verify the new fields exist:

```sql
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'movies' 
AND column_name IN ('contentType', 'trending', 'featured', 'metaTitle', 'metaDescription', 'keywords');
```

## Update Prisma Client

After migration, regenerate Prisma Client:

```bash
npx prisma generate
```

## Restart Backend Server

```bash
# Stop the current server (Ctrl+C)
# Restart it
npm run dev
# or
node server.js
```

## Testing

1. Check if existing movies still load correctly
2. Try adding a new movie with the new fields
3. Verify trending and featured filters work
4. Test content type filtering

## Rollback (If Needed)

If you need to rollback:

```sql
ALTER TABLE movies DROP COLUMN IF EXISTS "contentType";
ALTER TABLE movies DROP COLUMN IF EXISTS "trending";
ALTER TABLE movies DROP COLUMN IF EXISTS "featured";
ALTER TABLE movies DROP COLUMN IF EXISTS "metaTitle";
ALTER TABLE movies DROP COLUMN IF EXISTS "metaDescription";
ALTER TABLE movies DROP COLUMN IF EXISTS "keywords";
```

## Notes

- All new fields are optional or have default values, so existing data won't break
- The migration automatically sets `contentType` based on existing `isSeries` and `movieOrigin` fields
- Trending flag is automatically set for recent high-rated content (rating >= 8.0, added in last 30 days)
