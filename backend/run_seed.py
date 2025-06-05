#!/usr/bin/env python3
"""
Script to seed the database with enhanced products
"""
from app import create_app
from utils.enhanced_seed_data import seed_comprehensive_products

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        print("Starting database seeding with comprehensive products...")
        seed_comprehensive_products()
        print("Database seeding completed successfully!")
