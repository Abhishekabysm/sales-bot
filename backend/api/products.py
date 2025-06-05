from flask import Blueprint, request, jsonify
from models.database import db, Product
from sqlalchemy import or_, and_
import json

products_bp = Blueprint('products', __name__)

@products_bp.route('/', methods=['GET'])
def get_all_products():
    """Get all products with pagination"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        category = request.args.get('category', '')
        
        query = Product.query
        
        if category:
            query = query.filter(Product.category.ilike(f'%{category}%'))
        
        products = query.paginate(
            page=page, 
            per_page=per_page, 
            error_out=False
        )
        
        return jsonify({
            'products': [product.to_dict() for product in products.items],
            'total': products.total,
            'pages': products.pages,
            'current_page': page,
            'per_page': per_page
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/search', methods=['GET'])
def search_products():
    """Search products by query"""
    try:
        query = request.args.get('q', '').strip()
        category = request.args.get('category', '')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        brand = request.args.get('brand', '')
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        if not query:
            return jsonify({'error': 'Search query is required'}), 400
        
        # Build search query
        search_query = Product.query
        
        # Text search in name, description, and features
        search_terms = or_(
            Product.name.ilike(f'%{query}%'),
            Product.description.ilike(f'%{query}%'),
            Product.features.ilike(f'%{query}%'),
            Product.brand.ilike(f'%{query}%')
        )
        search_query = search_query.filter(search_terms)
        
        # Apply filters
        if category:
            search_query = search_query.filter(Product.category.ilike(f'%{category}%'))
        
        if brand:
            search_query = search_query.filter(Product.brand.ilike(f'%{brand}%'))
        
        if min_price is not None:
            search_query = search_query.filter(Product.price >= min_price)
        
        if max_price is not None:
            search_query = search_query.filter(Product.price <= max_price)
        
        # Execute paginated query
        products = search_query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        return jsonify({
            'products': [product.to_dict() for product in products.items],
            'total': products.total,
            'pages': products.pages,
            'current_page': page,
            'per_page': per_page,
            'query': query
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Get specific product by ID"""
    try:
        product = Product.query.get_or_404(product_id)
        return jsonify(product.to_dict())
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all unique product categories"""
    try:
        categories = db.session.query(Product.category).distinct().all()
        category_list = [cat[0] for cat in categories if cat[0]]
        return jsonify({'categories': category_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@products_bp.route('/brands', methods=['GET'])
def get_brands():
    """Get all unique product brands"""
    try:
        brands = db.session.query(Product.brand).distinct().all()
        brand_list = [brand[0] for brand in brands if brand[0]]
        return jsonify({'brands': brand_list})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
