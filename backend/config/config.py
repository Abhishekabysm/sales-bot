import os
from datetime import timedelta

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Use in-memory SQLite for serverless (Vercel)
    if os.environ.get('VERCEL'):
        SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    else:
        SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///ecommerce_chatbot.db'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-string'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # CORS settings - Allow all origins for production, specific for development
    if os.environ.get('VERCEL'):
        CORS_ORIGINS = ["*"]
    else:
        CORS_ORIGINS = ["http://localhost:3000", "http://127.0.0.1:3000"]
