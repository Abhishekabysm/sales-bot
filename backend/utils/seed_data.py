from models.database import db, Product
import json

def seed_sample_products():
    """Seed the database with sample e-commerce products"""
    
    # Check if products already exist
    if Product.query.count() > 0:
        return
    
    sample_products = [        # Electronics
        {
            'name': 'MacBook Pro 16-inch M2',
            'description': 'Powerful laptop with M2 chip, 16-inch Liquid Retina XDR display, and up to 22 hours of battery life. Perfect for professionals and creatives.',
            'price': 2499.00,
            'category': 'Electronics',
            'brand': 'Apple',
            'stock_quantity': 15,
            'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['M2 Chip', '16-inch Display', '1TB SSD', '32GB RAM', 'Touch Bar'])
        },
        {
            'name': 'iPhone 15 Pro',
            'description': 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system with 5x telephoto zoom.',
            'price': 999.00,
            'category': 'Electronics',
            'brand': 'Apple',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['A17 Pro Chip', '6.1-inch Display', '128GB Storage', '5G', 'Triple Camera'])
        },
        {
            'name': 'Samsung Galaxy S24 Ultra',
            'description': 'Premium Android smartphone with S Pen, 200MP camera, and AI-powered features for productivity and creativity.',
            'price': 1199.00,
            'category': 'Electronics',
            'brand': 'Samsung',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['S Pen', '200MP Camera', '6.8-inch Display', '256GB Storage', 'AI Features'])
        },
        {
            'name': 'Dell XPS 13',
            'description': 'Compact and powerful ultrabook with 13-inch InfinityEdge display and Intel Core i7 processor.',
            'price': 1299.00,
            'category': 'Electronics',
            'brand': 'Dell',
            'stock_quantity': 18,
            'image_url': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Intel Core i7', '13-inch Display', '512GB SSD', '16GB RAM', 'Windows 11'])
        },
        {
            'name': 'Sony WH-1000XM5 Headphones',
            'description': 'Industry-leading noise canceling wireless headphones with exceptional sound quality and 30-hour battery life.',
            'price': 399.00,
            'category': 'Electronics',
            'brand': 'Sony',
            'stock_quantity': 30,
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
            'rating': 4.9,
            'features': json.dumps(['Noise Canceling', '30-hour Battery', 'Wireless', 'Hi-Res Audio', 'Touch Controls'])
        },
        {
            'name': 'iPad Air 5th Generation',
            'description': 'Versatile tablet with M1 chip, 10.9-inch Liquid Retina display, and support for Apple Pencil and Magic Keyboard.',
            'price': 599.00,
            'category': 'Electronics',
            'brand': 'Apple',
            'stock_quantity': 22,
            'image_url': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['M1 Chip', '10.9-inch Display', '64GB Storage', 'Apple Pencil Support', 'USB-C'])
        },
          # Books
        {
            'name': 'The Psychology of Computer Programming',
            'description': 'Classic book on software development psychology and team dynamics by Gerald Weinberg.',
            'price': 29.99,
            'category': 'Books',
            'brand': 'Dorset House',
            'stock_quantity': 40,
            'image_url': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=500&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['Software Development', 'Team Management', 'Psychology', 'Classic', 'Paperback'])
        },
        {
            'name': 'Clean Code: A Handbook of Agile Software Craftsmanship',
            'description': 'Essential guide to writing clean, readable, and maintainable code by Robert C. Martin.',
            'price': 34.99,
            'category': 'Books',
            'brand': 'Prentice Hall',
            'stock_quantity': 35,
            'image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['Programming', 'Best Practices', 'Software Engineering', 'Agile', 'Hardcover'])
        },
        {
            'name': 'Atomic Habits',
            'description': 'Transformative book about building good habits and breaking bad ones by James Clear.',
            'price': 18.99,
            'category': 'Books',
            'brand': 'Avery',
            'stock_quantity': 50,
            'image_url': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=500&fit=crop&crop=center',
            'rating': 4.9,
            'features': json.dumps(['Self-Help', 'Productivity', 'Habits', 'Psychology', 'Bestseller'])
        },
        {
            'name': 'The Lean Startup',
            'description': 'Revolutionary approach to creating and managing successful startups by Eric Ries.',
            'price': 24.99,
            'category': 'Books',
            'brand': 'Crown Business',
            'stock_quantity': 28,
            'image_url': 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=500&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Entrepreneurship', 'Business', 'Startup', 'Innovation', 'Strategy'])
        },
          # Clothing
        {
            'name': 'Nike Air Force 1 Low',
            'description': 'Classic basketball sneakers with leather upper, Air-Sole unit, and iconic style that never goes out of fashion.',
            'price': 90.00,
            'category': 'Clothing',
            'brand': 'Nike',
            'stock_quantity': 45,
            'image_url': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['Leather Upper', 'Air-Sole Unit', 'Classic Design', 'Multiple Colors', 'Unisex'])
        },
        {
            'name': 'Adidas Ultraboost 23',
            'description': 'Premium running shoes with responsive Boost midsole and Primeknit upper for ultimate comfort.',
            'price': 180.00,
            'category': 'Clothing',
            'brand': 'Adidas',
            'stock_quantity': 32,
            'image_url': 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['Boost Technology', 'Primeknit Upper', 'Running', 'Comfortable', 'Energy Return'])
        },
        {
            'name': 'Levi\'s 501 Original Jeans',
            'description': 'Iconic straight-leg jeans with button fly, classic five-pocket styling, and timeless design.',
            'price': 69.99,
            'category': 'Clothing',
            'brand': 'Levi\'s',
            'stock_quantity': 60,
            'image_url': 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop&crop=center',
            'rating': 4.4,
            'features': json.dumps(['100% Cotton', 'Button Fly', 'Straight Leg', 'Classic Fit', 'Multiple Washes'])
        },
        {
            'name': 'Champion Reverse Weave Hoodie',
            'description': 'Heavyweight cotton hoodie with reverse weave construction that resists vertical shrinkage.',
            'price': 55.00,
            'category': 'Clothing',
            'brand': 'Champion',
            'stock_quantity': 38,
            'image_url': 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Reverse Weave', 'Cotton Blend', 'Pullover', 'Kangaroo Pocket', 'Ribbed Cuffs'])
        },
          # More Electronics
        {
            'name': 'Nintendo Switch OLED',
            'description': 'Enhanced gaming console with 7-inch OLED screen, improved audio, and 64GB internal storage.',
            'price': 349.99,
            'category': 'Electronics',
            'brand': 'Nintendo',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['OLED Display', 'Portable Gaming', '64GB Storage', 'Joy-Con Controllers', 'Dock Included'])
        },
        {
            'name': 'Amazon Echo Dot (5th Gen)',
            'description': 'Compact smart speaker with improved audio, Alexa voice assistant, and smart home control.',
            'price': 49.99,
            'category': 'Electronics',
            'brand': 'Amazon',
            'stock_quantity': 100,
            'image_url': 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?w=400&h=400&fit=crop&crop=center',
            'rating': 4.3,
            'features': json.dumps(['Alexa Built-in', 'Smart Home Control', 'Improved Audio', 'Compact Design', 'Voice Control'])
        },
        
        # More Books
        {
            'name': 'System Design Interview',
            'description': 'Comprehensive guide to acing system design interviews with real-world examples and detailed explanations.',
            'price': 39.99,
            'category': 'Books',
            'brand': 'Independently Published',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['System Design', 'Interview Prep', 'Software Engineering', 'Scalability', 'Architecture'])
        },
        {
            'name': 'Designing Data-Intensive Applications',
            'description': 'Deep dive into the principles and trade-offs of data systems and distributed applications.',
            'price': 54.99,
            'category': 'Books',
            'brand': 'O\'Reilly Media',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=500&fit=crop&crop=center',
            'rating': 4.9,
            'features': json.dumps(['Data Systems', 'Distributed Systems', 'Databases', 'Big Data', 'Technical'])
        }
    ]
    
    # Add products to database
    for product_data in sample_products:
        product = Product(**product_data)
        db.session.add(product)
    
    try:
        db.session.commit()
        print(f"Successfully seeded {len(sample_products)} products to the database.")
    except Exception as e:
        db.session.rollback()
        print(f"Error seeding database: {str(e)}")

if __name__ == '__main__':
    from app import create_app
    app = create_app()
    with app.app_context():
        seed_sample_products()
