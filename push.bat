@echo off
cd /d "%~dp0"

REM Edit URL below, then run this file
set GITHUB_URL=https://github.com/NACADMIC/togetherchina.git

echo === GitHub Push ===
echo.

if not exist .git (
    echo Initializing git...
    git init
)

git add .
git commit -m "Initial"
REM Continue even if commit had nothing new (already committed)

git remote remove origin 2>nul
git remote add origin %GITHUB_URL%
git branch -M main
git push -u origin main

:end
echo.
pause
