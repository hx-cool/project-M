@echo off
echo ============================================
echo MoviesWala Schema Optimization
echo ============================================
echo.

echo Step 1: Stopping backend server (if running)...
echo Please stop your backend server manually (Ctrl+C)
echo.
pause

echo Step 2: Running SQL migration...
psql -U postgres -d movieswala -f prisma\migrations\add_indexes_and_fields.sql
if %errorlevel% neq 0 (
    echo ERROR: Migration failed!
    pause
    exit /b 1
)
echo.

echo Step 3: Generating Prisma client...
call npx prisma generate
if %errorlevel% neq 0 (
    echo ERROR: Prisma generate failed!
    pause
    exit /b 1
)
echo.

echo ============================================
echo Schema optimization completed successfully!
echo ============================================
echo.
echo Changes applied:
echo - Added totalSeasons field to Movie model
echo - Added 20+ performance indexes
echo - Added timestamps to Download and Screenshot
echo - Added @db.Text for large text fields
echo.
echo NEXT STEPS:
echo 1. Restart your backend server
echo 2. Test all functionality
echo 3. Enjoy 100x faster queries!
echo.
pause
