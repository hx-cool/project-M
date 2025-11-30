# Database Setup Guide

## Step 1: Install PostgreSQL

### Windows:
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer, set password for `postgres` user
3. Default port: 5432

## Step 2: Create Database

Open PostgreSQL command line (psql) or pgAdmin:

```sql
CREATE DATABASE movieswala;
```

## Step 3: Update .env File

Edit `.env` file with your PostgreSQL credentials:

```
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/movieswala?schema=public"
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

## Step 4: Generate Prisma Client & Create Tables

Run these commands:

```bash
npm run db:generate
npm run db:push
```

## Step 5: Open Prisma Studio (Database GUI)

```bash
npm run db:studio
```

This opens http://localhost:5555 where you can:
- Add movies manually
- View all data
- Edit records
- Test queries

## Quick Commands:

- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:migrate` - Create migration files
- `npm run db:studio` - Open database GUI

## Next Steps:

After setup, you can:
1. Add movies through Prisma Studio
2. Create API endpoints to manage content
3. Migrate existing data from movies.ts to database
