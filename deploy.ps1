#!/usr/bin/env powershell

# Deployment script for Sales Bot on Vercel
Write-Host "🚀 Preparing Sales Bot for Vercel deployment..." -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "vercel.json")) {
    Write-Host "❌ Error: vercel.json not found. Please run this script from the project root." -ForegroundColor Red
    exit 1
}

# Install Vercel CLI if not present
Write-Host "📦 Checking Vercel CLI..." -ForegroundColor Yellow
try {
    vercel --version | Out-Null
    Write-Host "✅ Vercel CLI found" -ForegroundColor Green
} catch {
    Write-Host "📥 Installing Vercel CLI..." -ForegroundColor Yellow
    npm install -g vercel
}

# Build frontend locally to test
Write-Host "🔨 Testing frontend build..." -ForegroundColor Yellow
Set-Location "frontend"
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}
npm run build
Set-Location ".."

if (-not (Test-Path "frontend/build")) {
    Write-Host "❌ Frontend build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend build successful" -ForegroundColor Green

# Check Python requirements
Write-Host "🐍 Checking Python backend..." -ForegroundColor Yellow
if (Test-Path "requirements.txt") {
    Write-Host "✅ requirements.txt found" -ForegroundColor Green
} else {
    Write-Host "❌ requirements.txt not found in root!" -ForegroundColor Red
    exit 1
}

Write-Host "🎯 Ready for deployment!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: vercel login" -ForegroundColor White
Write-Host "2. Run: vercel --prod" -ForegroundColor White
Write-Host "3. Set environment variables in Vercel dashboard:" -ForegroundColor White
Write-Host "   - SECRET_KEY=your-secret-key" -ForegroundColor Gray
Write-Host "   - JWT_SECRET_KEY=your-jwt-secret" -ForegroundColor Gray
Write-Host "   - VERCEL=1" -ForegroundColor Gray
Write-Host ""
Write-Host "🌐 Your app will be available at: https://your-project.vercel.app" -ForegroundColor Green
