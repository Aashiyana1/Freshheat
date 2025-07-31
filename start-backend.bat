@echo off
echo Starting Fresheat Backend Server...
echo.
echo Make sure you have Node.js installed and MongoDB running
echo.
cd backend
echo Installing dependencies...
npm install
echo.
echo Starting server...
node test-server.js
pause 