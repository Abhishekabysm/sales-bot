from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config.config import Config
from models.database import db
from api.products import products_bp
from api.chat import chat_bp
from api.auth import auth_bp
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    
    # Configure CORS based on environment
    if os.environ.get('VERCEL'):
        CORS(app, origins="*", supports_credentials=True)
    else:
        CORS(app, origins=app.config['CORS_ORIGINS'], supports_credentials=True)
    
    jwt = JWTManager(app)
    
    # Register blueprints
    app.register_blueprint(products_bp, url_prefix='/api/products')
    app.register_blueprint(chat_bp, url_prefix='/api/chat')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # Create tables and seed data
    with app.app_context():
        db.create_all()
        # Load sample data if database is empty
        from utils.seed_data import seed_sample_products
        try:
            seed_sample_products()
        except Exception as e:
            print(f"Warning: Could not seed data: {e}")
    
    @app.route('/')
    def index():
        return jsonify({
            'message': 'E-commerce Sales Chatbot API',
            'version': '1.0.0',
            'status': 'running'
        })
    
    @app.route('/health')
    def health_check():
        return jsonify({'status': 'healthy'})
    
    @app.route('/api')
    def api_root():
        return jsonify({
            'message': 'E-commerce Sales Chatbot API',
            'version': '1.0.0',
            'endpoints': {
                'products': '/api/products',
                'chat': '/api/chat',
                'auth': '/api/auth'
            }
        })
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
