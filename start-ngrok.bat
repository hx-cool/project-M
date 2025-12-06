@echo off
echo Starting ngrok tunnel on port 3001...
echo.
echo Copy the HTTPS URL from below and update .env file
echo Example: VITE_API_URL=https://abc123.ngrok.io
echo.
ngrok http 3001
