# Vercel Deployment Guide

This project contains both a React frontend and Flask backend that will be deployed together on Vercel.

## Project Structure
- `/frontend` - React TypeScript application
- `/backend` - Flask Python API
- `/api` - Vercel serverless functions entry point

## Deployment Steps

### 1. Prepare for Deployment
Make sure all your code is committed to a Git repository (GitHub, GitLab, or Bitbucket).

### 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your Git repository
4. Vercel will automatically detect the configuration from `vercel.json`

### 3. Environment Variables
In your Vercel dashboard, add these environment variables:
- `SECRET_KEY` - A secure random string for Flask sessions
- `JWT_SECRET_KEY` - A secure random string for JWT tokens
- `VERCEL=1` - Indicates running on Vercel platform

### 4. Deploy
Click "Deploy" and Vercel will:
- Build your React frontend
- Set up Python serverless functions for the backend
- Configure routing between frontend and backend

## API Routes
- Frontend routes: `/*` (served from React build)
- Backend API routes: `/api/*` (handled by Python serverless functions)

## Development vs Production
- **Development**: Frontend runs on port 3000, backend on port 5000
- **Production**: Both served from the same domain via Vercel routing

## Database
The configuration uses in-memory SQLite for simplicity on Vercel. For production, consider:
- Vercel Postgres
- PlanetScale
- Supabase
- Any other managed database service

## Troubleshooting
1. Check Vercel function logs in the dashboard
2. Ensure all Python dependencies are in `/requirements.txt`
3. Verify CORS settings allow your domain
4. Check that API calls use relative URLs in production
