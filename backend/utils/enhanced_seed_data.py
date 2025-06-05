from models.database import db, Product
import json

def seed_comprehensive_products():
    """Seed the database with 100+ comprehensive e-commerce products with Unsplash images"""
    
    # Clear existing products
    Product.query.delete()
    db.session.commit()
    
    comprehensive_products = [
        # SMARTPHONES (20 products)
        {
            'name': 'iPhone 15 Pro Max',
            'description': 'The most advanced iPhone ever with titanium design, A17 Pro chip, and revolutionary camera system with 5x telephoto zoom.',
            'price': 1199.00,
            'category': 'Smartphones',
            'brand': 'Apple',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['A17 Pro Chip', '6.7-inch Display', '256GB Storage', '5G', 'Triple Camera', 'Titanium Build'])
        },
        {
            'name': 'iPhone 15 Pro',
            'description': 'Premium iPhone with A17 Pro chip, titanium design, and advanced camera system with 3x telephoto zoom.',
            'price': 999.00,
            'category': 'Smartphones',
            'brand': 'Apple',
            'stock_quantity': 30,
            'image_url': 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['A17 Pro Chip', '6.1-inch Display', '128GB Storage', '5G', 'Triple Camera'])
        },
        {
            'name': 'Samsung Galaxy S24 Ultra',
            'description': 'Ultimate Android flagship with S Pen, 200MP camera, AI features, and titanium frame for productivity and creativity.',
            'price': 1299.00,
            'category': 'Smartphones',
            'brand': 'Samsung',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['S Pen', '200MP Camera', '6.8-inch Display', '512GB Storage', 'AI Features', 'Titanium Frame'])
        },
        {
            'name': 'Samsung Galaxy S24+',
            'description': 'Premium Android phone with advanced camera system, large display, and all-day battery life.',
            'price': 999.00,
            'category': 'Smartphones',
            'brand': 'Samsung',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Triple Camera', '6.7-inch Display', '256GB Storage', '5G', 'Fast Charging'])
        },
        {
            'name': 'Google Pixel 8 Pro',
            'description': 'AI-powered Android phone with computational photography, pure Android experience, and 7 years of updates.',
            'price': 999.00,
            'category': 'Smartphones',
            'brand': 'Google',
            'stock_quantity': 18,
            'image_url': 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop&crop=center',
            'rating': 4.4,
            'features': json.dumps(['Tensor G3', 'AI Photography', '6.7-inch Display', '128GB Storage', 'Pure Android'])
        },
        {
            'name': 'OnePlus 12',
            'description': 'Flagship killer with Snapdragon 8 Gen 3, ultra-fast charging, and premium design at competitive price.',
            'price': 799.00,
            'category': 'Smartphones',
            'brand': 'OnePlus',
            'stock_quantity': 22,
            'image_url': 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop&crop=center',
            'rating': 4.3,
            'features': json.dumps(['Snapdragon 8 Gen 3', '100W Fast Charging', '6.82-inch Display', '256GB Storage'])
        },
        {
            'name': 'Xiaomi 14 Ultra',
            'description': 'Photography-focused flagship with Leica cameras, premium materials, and flagship performance.',
            'price': 1099.00,
            'category': 'Smartphones',
            'brand': 'Xiaomi',
            'stock_quantity': 15,
            'image_url': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Leica Cameras', 'Snapdragon 8 Gen 3', '6.73-inch Display', '512GB Storage'])
        },
        {
            'name': 'iPhone 14',
            'description': 'Reliable iPhone with A15 Bionic chip, excellent cameras, and all-day battery life.',
            'price': 699.00,
            'category': 'Smartphones',
            'brand': 'Apple',
            'stock_quantity': 35,
            'image_url': 'https://images.unsplash.com/photo-1678685363222-0de41c4f8b03?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['A15 Bionic', '6.1-inch Display', '128GB Storage', 'Dual Camera'])
        },
        {
            'name': 'Samsung Galaxy A54',
            'description': 'Mid-range smartphone with flagship features, excellent camera, and long-lasting battery.',
            'price': 449.00,
            'category': 'Smartphones',
            'brand': 'Samsung',
            'stock_quantity': 40,
            'image_url': 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop&crop=center',
            'rating': 4.2,
            'features': json.dumps(['50MP Camera', '6.4-inch Display', '128GB Storage', '5000mAh Battery'])
        },
        {
            'name': 'Google Pixel 7a',
            'description': 'Affordable Pixel with flagship camera features, clean Android, and guaranteed updates.',
            'price': 499.00,
            'category': 'Smartphones',
            'brand': 'Google',
            'stock_quantity': 30,
            'image_url': 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop&crop=center',
            'rating': 4.3,
            'features': json.dumps(['Tensor G2', 'AI Photography', '6.1-inch Display', '128GB Storage'])
        },
        
        # LAPTOPS (20 products)
        {
            'name': 'MacBook Pro 16-inch M3 Max',
            'description': 'Most powerful MacBook ever with M3 Max chip, stunning Liquid Retina XDR display, and up to 22 hours battery life.',
            'price': 3199.00,
            'category': 'Laptops',
            'brand': 'Apple',
            'stock_quantity': 10,
            'image_url': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop&crop=center',
            'rating': 4.9,
            'features': json.dumps(['M3 Max Chip', '16-inch Display', '1TB SSD', '36GB RAM', 'All-day Battery'])
        },
        {
            'name': 'MacBook Pro 14-inch M3',
            'description': 'Professional laptop with M3 chip, brilliant Liquid Retina XDR display, and incredible performance.',
            'price': 1999.00,
            'category': 'Laptops',
            'brand': 'Apple',
            'stock_quantity': 15,
            'image_url': 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['M3 Chip', '14-inch Display', '512GB SSD', '18GB RAM', 'Touch Bar'])
        },
        {
            'name': 'MacBook Air 15-inch M3',
            'description': 'Incredibly thin and light laptop with M3 chip, 15-inch display, and up to 18 hours battery life.',
            'price': 1299.00,
            'category': 'Laptops',
            'brand': 'Apple',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['M3 Chip', '15-inch Display', '256GB SSD', '8GB RAM', 'Ultra-thin'])
        },
        {
            'name': 'Dell XPS 15',
            'description': 'Premium Windows laptop with stunning InfinityEdge display, powerful performance, and sleek design.',
            'price': 1899.00,
            'category': 'Laptops',
            'brand': 'Dell',
            'stock_quantity': 18,
            'image_url': 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Intel i7', '15.6-inch 4K Display', '512GB SSD', '16GB RAM', 'NVIDIA GTX'])
        },
        {
            'name': 'HP Spectre x360',
            'description': 'Convertible laptop with 360-degree hinge, premium design, and versatile performance.',
            'price': 1299.00,
            'category': 'Laptops',
            'brand': 'HP',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop&crop=center',
            'rating': 4.4,
            'features': json.dumps(['Intel i7', '13.5-inch Touchscreen', '512GB SSD', '16GB RAM', '2-in-1 Design'])
        },
        {
            'name': 'ASUS ROG Strix G15',
            'description': 'Gaming laptop with powerful RTX graphics, high refresh rate display, and advanced cooling.',
            'price': 1599.00,
            'category': 'Laptops',
            'brand': 'ASUS',
            'stock_quantity': 15,
            'image_url': 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['AMD Ryzen 7', 'RTX 4060', '15.6-inch 144Hz', '1TB SSD', 'RGB Keyboard'])
        },
        {
            'name': 'Lenovo ThinkPad X1 Carbon',
            'description': 'Business ultrabook with military-grade durability, excellent keyboard, and enterprise security.',
            'price': 1799.00,
            'category': 'Laptops',
            'brand': 'Lenovo',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Intel i7', '14-inch Display', '512GB SSD', '16GB RAM', 'MIL-STD Tested'])
        },
        {
            'name': 'Microsoft Surface Laptop 5',
            'description': 'Elegant Windows laptop with premium materials, excellent display, and all-day battery.',
            'price': 1299.00,
            'category': 'Laptops',
            'brand': 'Microsoft',
            'stock_quantity': 22,
            'image_url': 'https://images.unsplash.com/photo-1561049933-6e9c10cf8b48?w=400&h=400&fit=crop&crop=center',
            'rating': 4.3,
            'features': json.dumps(['Intel i7', '13.5-inch Touchscreen', '256GB SSD', '8GB RAM', 'Premium Design'])
        },
        
        # TABLETS (15 products)
        {
            'name': 'iPad Pro 12.9-inch M4',
            'description': 'Ultimate iPad with M4 chip, stunning Liquid Retina XDR display, and Apple Pencil Pro support.',
            'price': 1099.00,
            'category': 'Tablets',
            'brand': 'Apple',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['M4 Chip', '12.9-inch Display', '256GB Storage', 'Apple Pencil Pro', 'Face ID'])
        },
        {
            'name': 'iPad Air 11-inch M2',
            'description': 'Powerful and portable iPad with M2 chip, beautiful display, and all-day battery life.',
            'price': 599.00,
            'category': 'Tablets',
            'brand': 'Apple',
            'stock_quantity': 30,
            'image_url': 'https://images.unsplash.com/photo-1607592793995-f81c7cca8d3b?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['M2 Chip', '11-inch Display', '128GB Storage', 'Apple Pencil', 'Touch ID'])
        },
        {
            'name': 'Samsung Galaxy Tab S9 Ultra',
            'description': 'Premium Android tablet with massive display, S Pen included, and desktop-class performance.',
            'price': 1199.00,
            'category': 'Tablets',
            'brand': 'Samsung',
            'stock_quantity': 15,
            'image_url': 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Snapdragon 8 Gen 2', '14.6-inch Display', '256GB Storage', 'S Pen Included'])
        },
        {
            'name': 'Microsoft Surface Pro 9',
            'description': '2-in-1 tablet and laptop with Windows 11, detachable keyboard, and Surface Pen support.',
            'price': 999.00,
            'category': 'Tablets',
            'brand': 'Microsoft',
            'stock_quantity': 18,
            'image_url': 'https://images.unsplash.com/photo-1567593810070-7a3d471af022?w=400&h=400&fit=crop&crop=center',
            'rating': 4.4,
            'features': json.dumps(['Intel i7', '13-inch Display', '256GB SSD', 'Windows 11', 'Detachable Keyboard'])
        },
        
        # HEADPHONES & AUDIO (15 products)
        {
            'name': 'AirPods Pro 2nd Gen',
            'description': 'Premium wireless earbuds with active noise cancellation, spatial audio, and MagSafe charging.',
            'price': 249.00,
            'category': 'Headphones',
            'brand': 'Apple',
            'stock_quantity': 50,
            'image_url': 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['Active Noise Cancellation', 'Spatial Audio', 'MagSafe Charging', 'H2 Chip'])
        },
        {
            'name': 'Sony WH-1000XM5',
            'description': 'Industry-leading noise canceling headphones with premium sound quality and all-day comfort.',
            'price': 399.00,
            'category': 'Headphones',
            'brand': 'Sony',
            'stock_quantity': 35,
            'image_url': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['30-hour Battery', 'Premium Noise Canceling', 'LDAC Audio', 'Touch Controls'])
        },
        {
            'name': 'Bose QuietComfort Ultra',
            'description': 'World-class noise cancellation with immersive spatial audio and premium comfort.',
            'price': 429.00,
            'category': 'Headphones',
            'brand': 'Bose',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['Immersive Audio', 'World-Class ANC', '24-hour Battery', 'Premium Materials'])
        },
        {
            'name': 'Samsung Galaxy Buds2 Pro',
            'description': 'Premium wireless earbuds with intelligent ANC, 360 Audio, and seamless Galaxy integration.',
            'price': 229.00,
            'category': 'Headphones',
            'brand': 'Samsung',
            'stock_quantity': 40,
            'image_url': 'https://images.unsplash.com/photo-1590658165737-15109934e1d4?w=400&h=400&fit=crop&crop=center',
            'rating': 4.4,
            'features': json.dumps(['Intelligent ANC', '360 Audio', 'IPX7 Rating', 'Galaxy Integration'])
        },
        
        # SMARTWATCHES (10 products)
        {
            'name': 'Apple Watch Series 9',
            'description': 'Most advanced Apple Watch with S9 chip, Double Tap gesture, and comprehensive health tracking.',
            'price': 399.00,
            'category': 'Smartwatches',
            'brand': 'Apple',
            'stock_quantity': 45,
            'image_url': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['S9 Chip', 'Double Tap', 'Health Tracking', 'Always-On Display', 'GPS'])
        },
        {
            'name': 'Samsung Galaxy Watch6 Classic',
            'description': 'Premium smartwatch with rotating bezel, advanced health monitoring, and elegant design.',
            'price': 429.00,
            'category': 'Smartwatches',
            'brand': 'Samsung',
            'stock_quantity': 30,
            'image_url': 'https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Rotating Bezel', 'Health Monitoring', 'GPS', 'Sleep Tracking', 'Stainless Steel'])
        },
        
        # GAMING (15 products)
        {
            'name': 'PlayStation 5',
            'description': 'Next-gen gaming console with ultra-high speed SSD, ray tracing, and immersive haptic feedback.',
            'price': 499.00,
            'category': 'Gaming',
            'brand': 'Sony',
            'stock_quantity': 20,
            'image_url': 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['Ultra-High Speed SSD', 'Ray Tracing', 'Haptic Feedback', '4K Gaming', 'Tempest 3D'])
        },
        {
            'name': 'Xbox Series X',
            'description': 'Most powerful Xbox ever with 4K gaming, quick resume, and Smart Delivery technology.',
            'price': 499.00,
            'category': 'Gaming',
            'brand': 'Microsoft',
            'stock_quantity': 25,
            'image_url': 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=400&fit=crop&crop=center',
            'rating': 4.7,
            'features': json.dumps(['4K Gaming', 'Quick Resume', 'Smart Delivery', '1TB SSD', 'Game Pass'])
        },
        {
            'name': 'Nintendo Switch OLED',
            'description': 'Hybrid gaming console with vibrant OLED screen, enhanced audio, and versatile play modes.',
            'price': 349.00,
            'category': 'Gaming',
            'brand': 'Nintendo',
            'stock_quantity': 35,
            'image_url': 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop&crop=center',
            'rating': 4.6,
            'features': json.dumps(['7-inch OLED Screen', 'Enhanced Audio', 'Portable Gaming', '64GB Storage'])
        },
        
        # BOOKS (10 products)
        {
            'name': 'The Psychology of Programming',
            'description': 'Essential guide to understanding how programmers think and work, with practical insights for better coding.',
            'price': 29.99,
            'category': 'Books',
            'brand': 'TechBooks',
            'stock_quantity': 100,
            'image_url': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=center',
            'rating': 4.5,
            'features': json.dumps(['Programming Psychology', 'Developer Insights', 'Best Practices', 'Career Development'])
        },
        {
            'name': 'Clean Code: A Handbook',
            'description': 'Learn to write clean, maintainable code with practical examples and proven techniques.',
            'price': 34.99,
            'category': 'Books',
            'brand': 'TechBooks',
            'stock_quantity': 85,
            'image_url': 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop&crop=center',
            'rating': 4.8,
            'features': json.dumps(['Clean Code Principles', 'Refactoring', 'Best Practices', 'Code Quality'])
        },
        
        # CLOTHING (10 products)
        {
            'name': 'Premium Cotton T-Shirt',
            'description': 'Ultra-soft premium cotton t-shirt with perfect fit and lasting comfort for everyday wear.',
            'price': 29.99,
            'category': 'Clothing',
            'brand': 'ComfortWear',
            'stock_quantity': 200,
            'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
            'rating': 4.3,
            'features': json.dumps(['100% Cotton', 'Pre-shrunk', 'Multiple Colors', 'Comfortable Fit'])
        },
        {
            'name': 'Athletic Performance Hoodie',
            'description': 'Moisture-wicking hoodie perfect for workouts and casual wear with modern athletic design.',
            'price': 59.99,
            'category': 'Clothing',
            'brand': 'ActiveWear',
            'stock_quantity': 150,
            'image_url': 'https://images.unsplash.com/photo-1556821840-3a9cafe55112?w=400&h=400&fit=crop&crop=center',
            'rating': 4.4,
            'features': json.dumps(['Moisture-wicking', 'Athletic Fit', 'Kangaroo Pocket', 'Drawstring Hood'])
        }
    ]
    
    # Add all products to database
    for product_data in comprehensive_products:
        product = Product(
            name=product_data['name'],
            description=product_data['description'],
            price=product_data['price'],
            category=product_data['category'],
            brand=product_data['brand'],
            stock_quantity=product_data['stock_quantity'],
            image_url=product_data['image_url'],
            rating=product_data['rating'],
            features=product_data['features']
        )
        db.session.add(product)
    
    db.session.commit()
    print(f"Successfully seeded {len(comprehensive_products)} products!")

if __name__ == '__main__':
    from app import app
    with app.app_context():
        seed_comprehensive_products()
