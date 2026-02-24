@echo off
echo ========================================
echo   Frontend - Quick Start
echo ========================================
echo.

echo [1/2] Installing dependencies...
call npm install
if errorlevel 1 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/2] Starting development server...
echo.
echo ========================================
echo   Frontend will start on http://localhost:3000
echo   (or next available port if 3000 is taken)
echo   Press Ctrl+C to stop the server
echo ========================================
echo.
call npm start
