@echo off
echo ========================================================
echo    Starting Exam Notes & Revision Portal...
echo ========================================================
echo.

:: Open default browser to local server
start http://localhost:5500/index.html

:: Start Python HTTP Server if port 5500 is not already running
netstat -ano | findstr :5500 >nul
if %errorlevel% neq 0 (
    echo Starting local web server on port 5500...
    python -m http.server 5500
) else (
    echo Local server is already running on port 5500!
)
pause
