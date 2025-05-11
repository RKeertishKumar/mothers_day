@echo off
echo Clearing cache and restarting the development server...
echo.

echo Step 1: Stopping any running development servers...
taskkill /f /im node.exe >nul 2>&1
echo.

echo Step 2: Clearing Vite cache...
if exist "node_modules\.vite" (
  rmdir /s /q "node_modules\.vite"
  echo Vite cache cleared successfully.
) else (
  echo No Vite cache found.
)
echo.

echo Step 3: Clearing npm cache...
call npm cache clean --force
echo.

echo Step 4: Starting development server...
start cmd /k "npm run dev"
echo.

echo Step 5: Opening clear-cache.html in browser...
timeout /t 3 >nul
start "" "http://localhost:5173/src/clear-cache.html"
echo.

echo Done! Please follow the instructions in the browser to clear localStorage.
echo After clearing localStorage, refresh the main page to see the updated quiz questions.
echo.

pause
