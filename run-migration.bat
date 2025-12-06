@echo off
cd /d "%~dp0"
echo Running database migration...
npx prisma db push --skip-generate
echo.
echo Migration completed!
echo Now generating Prisma client...
npx prisma generate
echo.
echo All done! Please restart your backend server.
pause
