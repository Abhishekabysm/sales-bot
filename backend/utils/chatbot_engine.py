from models.database import Product
from sqlalchemy import or_, and_
import re
import json
from difflib import SequenceMatcher

class ChatbotEngine:
    """
    Enhanced AI chatbot engine for processing e-commerce queries with advanced NLP
    """
    
    def __init__(self):
        # Enhanced greeting patterns
        self.greeting_patterns = [
            r'\b(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy|sup)\b',
            r'\b(how\s*are\s*you|what\'s\s*up|how\s*do\s*you\s*do)\b'
        ]
        
        # Enhanced search patterns with intent recognition
        self.search_patterns = [
            r'\b(search|find|look\s*for|show\s*me|i\s*want|need|looking\s*for|browsing|shopping\s*for)\b',
            r'\b(recommend|suggest|advice|help\s*me\s*choose)\b',
            r'\b(compare|difference|which\s*is\s*better)\b'
        ]
        
        # Product categories with synonyms and keywords
        self.category_mapping = {
            'electronics': ['electronics', 'electronic', 'tech', 'technology', 'gadget', 'gadgets', 'device', 'devices'],
            'smartphones': ['phone', 'phones', 'smartphone', 'smartphones', 'mobile', 'mobiles', 'cell', 'cellular', 'iphone', 'android'],
            'laptops': ['laptop', 'laptops', 'notebook', 'notebooks', 'computer', 'computers', 'pc', 'macbook'],
            'tablets': ['tablet', 'tablets', 'ipad', 'ipads'],
            'headphones': ['headphones', 'headphone', 'earphones', 'earphone', 'earbuds', 'earbud', 'headset', 'headsets', 'audio'],
            'smartwatches': ['watch', 'watches', 'smartwatch', 'smartwatches', 'wearable', 'wearables', 'fitness', 'tracker'],
            'gaming': ['gaming', 'game', 'games', 'console', 'consoles', 'xbox', 'playstation', 'nintendo', 'controller'],
            'cameras': ['camera', 'cameras', 'photography', 'photo', 'photos', 'dslr', 'mirrorless'],
            'books': ['book', 'books', 'novel', 'novels', 'literature', 'reading', 'ebook', 'ebooks'],
            'clothing': ['clothing', 'clothes', 'apparel', 'fashion', 'wear'],
            'shoes': ['shoes', 'shoe', 'footwear', 'sneakers', 'sneaker', 'boots', 'sandals'],
            'accessories': ['accessories', 'accessory', 'jewelry', 'jewellery', 'bag', 'bags', 'wallet', 'wallets'],
            'home': ['home', 'furniture', 'decor', 'decoration', 'kitchen', 'bedroom', 'living'],
            'sports': ['sports', 'sport', 'fitness', 'exercise', 'workout', 'athletic', 'outdoor'],
            'beauty': ['beauty', 'cosmetics', 'makeup', 'skincare', 'perfume', 'fragrance']
        }
        
        # Brand mapping for better recognition
        self.brand_mapping = {
            'apple': ['apple', 'iphone', 'ipad', 'macbook', 'mac', 'imac'],
            'samsung': ['samsung', 'galaxy'],
            'sony': ['sony', 'playstation', 'ps4', 'ps5'],
            'microsoft': ['microsoft', 'xbox', 'surface'],
            'google': ['google', 'pixel', 'nest'],
            'amazon': ['amazon', 'kindle', 'echo', 'alexa'],
            'nike': ['nike', 'air', 'jordan'],
            'adidas': ['adidas'],
            'dell': ['dell', 'alienware'],
            'hp': ['hp', 'hewlett', 'packard'],
            'lenovo': ['lenovo', 'thinkpad'],
            'lg': ['lg'],
            'canon': ['canon'],
            'nikon': ['nikon']
        }
        
        # Price keywords
        self.price_patterns = {
            'cheap': r'\b(cheap|affordable|budget|inexpensive|low\s*cost|economical)\b',
            'expensive': r'\b(expensive|premium|high\s*end|luxury|top\s*tier|flagship)\b',
            'under': r'\b(under|below|less\s*than|cheaper\s*than|maximum)\s*\$?(\d+)\b',
            'over': r'\b(above|over|more\s*than|expensive\s*than|minimum)\s*\$?(\d+)\b',
            'between': r'\b(between)\s*\$?(\d+)\s*(?:and|to|\-)\s*\$?(\d+)\b'
        }
        
        # Intent patterns
        self.intent_patterns = {
            'comparison': r'\b(compare|vs|versus|which\s*is\s*better|difference|between)\b',
            'recommendation': r'\b(recommend|suggest|best|top|good|advice|help\s*me\s*choose)\b',
            'availability': r'\b(available|in\s*stock|stock|inventory)\b',
            'features': r'\b(features|specs|specifications|details|about)\b'        }
        
        self.help_patterns = [
            r'\b(help|assist|support|guide)\b',
            r'\b(how\s*to|what\s*can\s*you\s*do|capabilities)\b'
        ]
    
    def process_message(self, message):
        """
        Process user message with enhanced AI capabilities and return appropriate response
        """
        message_lower = message.lower().strip()
        
        # Check for greetings
        if self._matches_pattern(message_lower, self.greeting_patterns):
            return self._handle_greeting()
        
        # Check for help requests
        if self._matches_pattern(message_lower, self.help_patterns):
            return self._handle_help()
        
        # Extract entities first to better identify the message type
        entities = self._extract_entities(message_lower)
        
        # Detect intent using extracted entities
        intent = self._detect_intent(message_lower)
        
        # Check for direct product queries - when categories or price info exists
        if (entities['categories'] or 
            entities['price_min'] is not None or 
            entities['price_max'] is not None):
            return self._handle_product_search(message, intent)
        
        # Check for product search with explicit search terms
        if self._matches_pattern(message_lower, self.search_patterns) or intent in ['search', 'recommendation', 'comparison']:
            return self._handle_product_search(message, intent)
        
        # Handle specific intents
        if intent == 'availability':
            return self._handle_availability_check(message)
        
        if intent == 'features':
            return self._handle_feature_inquiry(message)
        
        # Default response with intelligent suggestions
        return self._handle_default(message)
    
    def _detect_intent(self, message):
        """Detect user intent from message"""
        for intent, pattern in self.intent_patterns.items():
            if re.search(pattern, message, re.IGNORECASE):
                return intent
        
        # Check for category mentions
        for category, keywords in self.category_mapping.items():
            for keyword in keywords:
                if keyword in message:
                    return 'search'
        
        return 'general'
    
    def _extract_entities(self, message):
        """Extract entities like categories, brands, price ranges from message"""
        entities = {
            'categories': [],
            'brands': [],
            'price_min': None,
            'price_max': None,
            'keywords': [],
            'intent': self._detect_intent(message)
        }
        
        message_lower = message.lower()
        
        # Improved compound categories: prioritize as a single filter
        compound_categories = {
            'gaming laptops': {'category': 'laptops', 'keyword': 'gaming'},
            'smart watches': {'category': 'smartwatches', 'keyword': 'smart'},
            'wireless headphones': {'category': 'headphones', 'keyword': 'wireless'},
            'smartphone accessories': {'category': 'accessories', 'keyword': 'smartphone'},
            # Add more compound categories as needed
        }
        found_compound = False
        for compound, mapping in compound_categories.items():
            if compound in message_lower:
                entities['categories'].append(mapping['category'])
                entities['keywords'].append(mapping['keyword'])
                found_compound = True
        
        # Only extract individual categories if no compound found
        if not found_compound:
            for category, keywords in self.category_mapping.items():
                for keyword in keywords:
                    if keyword in message_lower:
                        entities['categories'].append(category)
        
        # Extract brands
        for brand, keywords in self.brand_mapping.items():
            for keyword in keywords:
                if keyword in message_lower:
                    entities['brands'].append(brand)
        
        # Extract price ranges
        under_match = re.search(self.price_patterns['under'], message_lower)
        if under_match:
            entities['price_max'] = float(under_match.group(2))
        
        over_match = re.search(self.price_patterns['over'], message_lower)
        if over_match:
            entities['price_min'] = float(over_match.group(2))
        
        between_match = re.search(self.price_patterns['between'], message_lower)
        if between_match:
            entities['price_min'] = float(between_match.group(2))
            entities['price_max'] = float(between_match.group(3))
        
        # Check for price qualifiers
        if re.search(self.price_patterns['cheap'], message_lower):
            entities['price_max'] = 200  # Default cheap threshold
        
        if re.search(self.price_patterns['expensive'], message_lower):
            entities['price_min'] = 500  # Default expensive threshold
        
        # Extract other keywords
        stop_words = {
            'i', 'want', 'need', 'find', 'search', 'for', 'show', 'me', 'under', 'above', 
            'below', 'over', 'than', 'less', 'more', 'the', 'a', 'an', 'and', 'or', 'with',
            'good', 'best', 'nice', 'great', 'awesome', 'cool', 'cheap', 'expensive', 'can',
            'you', 'help', 'please', 'looking', 'some', 'any', 'is', 'are', 'have', 'has'
        }
        
        # Clean message for keyword extraction
        clean_message = re.sub(r'\b(under|below|above|over|between|less\s+than|more\s+than|cheaper\s+than|expensive\s+than)\s*\$?\d+(?:\s*(?:and|to|\-)\s*\$?\d+)?\b', '', message_lower)
        clean_message = re.sub(r'\$\d+', '', clean_message)
        
        words = re.findall(r'\b[a-zA-Z]+\b', clean_message)
        # Don't add duplicate keywords
        for word in words:
            if word not in stop_words and len(word) > 2 and word not in entities['keywords']:
                entities['keywords'].append(word)
        
        # Remove duplicates
        entities['categories'] = list(set(entities['categories']))
        entities['brands'] = list(set(entities['brands']))
        entities['keywords'] = list(set(entities['keywords']))
        
        return entities

    def _matches_pattern(self, text, patterns):
        """Check if text matches any of the given patterns"""
        for pattern in patterns:
            if re.search(pattern, text, re.IGNORECASE):
                return True
        return False
    
    def _handle_greeting(self):
        """Handle greeting messages"""
        return {
            'response': "Hello! Welcome to our e-commerce store! 👋 I'm here to help you find the perfect products. You can ask me to search for items like 'laptops', 'books', 'smartphones', or describe what you're looking for. How can I assist you today?",
            'type': 'greeting'
        }
    
    def _handle_help(self):
        """Handle help requests"""
        return {
            'response': """I can help you with:
            
🔍 **Product Search**: Tell me what you're looking for
   - "Show me laptops under $1000"
   - "Find smartphones"
   - "I need running shoes"

💰 **Price Filtering**: Specify your budget
   - "Books under $20"
   - "Electronics above $500"

📱 **Categories**: Browse by category
   - Electronics, Books, Clothing, etc.

🏷️ **Brands**: Search by specific brands

Just describe what you need and I'll help you find it!""",
            'type': 'help'        }
    
    def _handle_product_search(self, message, intent='search'):
        """Handle product search queries with enhanced AI and fallback logic"""
        try:
            entities = self._extract_entities(message)
            # Remove category names and synonyms from keywords to avoid redundant filtering
            category_synonyms = set()
            for cat in entities['categories']:
                category_synonyms.update(self.category_mapping.get(cat, []))
            entities['keywords'] = [kw for kw in entities['keywords'] if kw not in entities['categories'] and kw not in category_synonyms]
            from sqlalchemy import or_, and_
            query = Product.query
            print(f"[DEBUG] Entities: {entities}")

            def run_query(category_filters=None, brand_filters=None, keyword_filters=None, price_min=None, price_max=None, limit=10, keyword_and=False):
                q = Product.query
                if category_filters:
                    q = q.filter(and_(*category_filters))
                if brand_filters:
                    q = q.filter(or_(*brand_filters))
                if keyword_filters:
                    if keyword_and:
                        # All keywords must match somewhere (AND)
                        for kf in keyword_filters:
                            q = q.filter(or_(*kf))
                    else:
                        # Any keyword match (OR)
                        q = q.filter(or_(*[item for sublist in keyword_filters for item in sublist]))
                if price_min:
                    q = q.filter(Product.price >= price_min)
                if price_max:
                    q = q.filter(Product.price <= price_max)
                q = q.order_by(Product.rating.desc(), Product.price.asc())
                print(f"[DEBUG] SQL: {str(q)}")
                return q.limit(limit).all()

            # Build filters
            category_filters = [Product.category.ilike(f'%{cat}%') for cat in entities['categories']] if entities['categories'] else None
            brand_filters = [Product.brand.ilike(f'%{brand}%') for brand in entities['brands']] if entities['brands'] else None
            # For better NLU: build keyword_filters as a list of lists (for AND logic)
            keyword_filters = []
            for keyword in entities['keywords']:
                keyword_filters.append([
                    Product.name.ilike(f'%{keyword}%'),
                    Product.description.ilike(f'%{keyword}%'),
                    Product.category.ilike(f'%{keyword}%'),
                    Product.brand.ilike(f'%{keyword}%')
                ])
            keyword_filters = keyword_filters if keyword_filters else None
            price_min = entities['price_min']
            price_max = entities['price_max']
            limit = 5 if intent == 'recommendation' else 10

            # 1. Try strict: category + brand + ALL keywords (AND) + price
            products = run_query(category_filters, brand_filters, keyword_filters, price_min, price_max, limit, keyword_and=True)
            print(f"[DEBUG] Products found (strict AND): {len(products)}")
            if not products:
                # 2. Try: category + price only
                products = run_query(category_filters, None, None, price_min, price_max, limit)
                print(f"[DEBUG] Products found (category+price): {len(products)}")
            if not products and category_filters:
                # 3. Try: category only
                products = run_query(category_filters, None, None, None, None, limit)
                print(f"[DEBUG] Products found (category only): {len(products)}")
            # Always try keywords only if there are keywords, even if no category
            if not products and keyword_filters:
                # Try ALL keywords (AND)
                products = run_query(None, None, keyword_filters, price_min, price_max, limit, keyword_and=True)
                print(f"[DEBUG] Products found (keywords only AND): {len(products)}")
            if not products and keyword_filters:
                # Try ANY keyword (OR)
                products = run_query(None, None, keyword_filters, price_min, price_max, limit, keyword_and=False)
                print(f"[DEBUG] Products found (keywords only OR): {len(products)}")
            if not products:
                # Fallback: show popular products (no filters)
                products = Product.query.order_by(Product.rating.desc(), Product.price.asc()).limit(limit).all()
                print(f"[DEBUG] Products found (popular fallback): {len(products)}")
                if not products:
                    return self._handle_no_results(entities, message)
                else:
                    response = "I couldn't find an exact match, but here are some of our most popular products:"
                    product_list = [product.to_dict() for product in products]
                    return {
                        'response': response,
                        'type': 'product_search',
                        'products': product_list,
                        'intent': intent,
                        'entities': entities
                    }
            # If we found products in any step
            product_list = [product.to_dict() for product in products]
            response = self._generate_response_text(entities, products, intent)
            return {
                'response': response,
                'type': 'product_search',
                'products': product_list,
                'intent': intent,
                'entities': entities
            }
        except Exception as e:
            print(f"[DEBUG] Exception: {e}")
            return {
                'response': "I'm having trouble processing your search request. Please try rephrasing your query or ask for help to see what I can do.",
                'type': 'error'
            }
    
        
    def _generate_response_text(self, entities, products, intent):
        """Generate contextual response text based on search results"""
        count = len(products)
        
        if intent == 'recommendation':
            response = f"Based on your preferences, I recommend these {count} products:"
        elif intent == 'comparison':
            response = f"Here are {count} products you can compare:"
        else:
            response = f"I found {count} products"
        
        # Add context about search criteria
        criteria = []
        if entities['categories']:
            criteria.append(f"in {', '.join(entities['categories'])}")
        if entities['brands']:
            criteria.append(f"from {', '.join(entities['brands'])}")
        if entities['price_min'] and entities['price_max']:
            criteria.append(f"between ${entities['price_min']:.0f}-${entities['price_max']:.0f}")
        elif entities['price_min']:
            criteria.append(f"above ${entities['price_min']:.0f}")
        elif entities['price_max']:
            criteria.append(f"under ${entities['price_max']:.0f}")
        
        if criteria:
            response += f" {' '.join(criteria)}"
        
        response += ":"
        
        # Add smart suggestions
        if intent == 'recommendation':
            response += f"\n\n💡 Top pick: **{products[0].name}** (⭐ {products[0].rating}/5) - ${products[0].price:.2f}"
        
        return response
    
    def _handle_no_results(self, entities, original_message):
        """Handle cases where no products are found with smart suggestions"""
        suggestions = []
        
        # Suggest alternative categories
        if entities['categories']:
            suggestions.append("Try searching in different categories like 'electronics', 'books', or 'clothing'")
        
        # Suggest price adjustments
        if entities['price_max']:
            suggestions.append(f"Consider increasing your budget above ${entities['price_max']:.0f}")
        elif entities['price_min']:
            suggestions.append(f"Try looking for products under ${entities['price_min']:.0f}")
        
        # Suggest popular categories
        if not entities['categories'] and not entities['brands']:
            suggestions.append("Try searching for popular categories like 'smartphones', 'laptops', or 'headphones'")
        
        suggestion_text = " You can also " + ", or ".join(suggestions) if suggestions else ""
        
        return {
            'response': f"Sorry, I couldn't find any products matching your criteria.{suggestion_text}. Would you like me to show you our popular products instead?",
            'type': 'no_results',
            'suggestions': suggestions,
            'entities': entities
        }
    
    def _handle_availability_check(self, message):
        """Handle stock availability inquiries"""
        entities = self._extract_entities(message)
        # This would typically check specific product availability
        return {
            'response': "I can help you check product availability! Please specify which product you're interested in, and I'll let you know if it's in stock.",
            'type': 'availability'
        }
    
    def _handle_feature_inquiry(self, message):
        """Handle feature and specification inquiries"""
        entities = self._extract_entities(message)
        return {
            'response': "I'd be happy to help you learn about product features! Please tell me which specific product you're interested in, and I'll provide detailed specifications.",
            'type': 'features'        }
    
    def _handle_greeting(self):
        """Handle greeting messages with personality"""
        return {
            'response': "Hello! Welcome to our premium e-commerce store! 👋✨ I'm your AI shopping assistant, and I'm here to help you discover amazing products. Whether you're looking for the latest smartphones, powerful laptops, stylish clothing, or anything else, just tell me what you need! How can I help you find the perfect product today?",
            'type': 'greeting'
        }
    
    def _handle_help(self):
        """Handle help requests with comprehensive guidance"""
        return {
            'response': """🤖 **Your AI Shopping Assistant Capabilities:**

🔍 **Smart Product Search**
   • "Show me gaming laptops under $1500"
   • "Find wireless headphones"
   • "I need a smartphone with good camera"

💰 **Price Intelligence**
   • "Cheap smartphones" (budget-friendly options)
   • "Premium headphones" (high-end products)
   • "Between $200 and $500"

🏷️ **Brand & Category Search**
   • "Apple products"
   • "Samsung phones vs iPhone"
   • "Gaming accessories"

🎯 **Smart Recommendations**
   • "Recommend a good laptop for programming"
   • "Best phones for photography"
   • "Top-rated books"

📊 **Product Comparison**
   • "Compare iPhone vs Samsung"
   • "Which laptop is better for gaming?"

Just describe what you're looking for in natural language, and I'll find the perfect products for you! 🛍️""",
            'type': 'help'
        }
    
    def _handle_default(self, message):
        """Handle unrecognized messages with intelligent suggestions"""
        entities = self._extract_entities(message)
        
        # Generate smart suggestions based on detected entities
        suggestions = []
        if entities['keywords']:
            suggestions.append(f"search for {', '.join(entities['keywords'][:3])}")
        
        # Add popular categories
        popular_categories = ['smartphones', 'laptops', 'headphones', 'books', 'gaming']
        suggestions.extend([f"browse {cat}" for cat in popular_categories[:3]])
        
        suggestion_text = f"You could try: {', '.join(suggestions[:4])}" if suggestions else "You can ask me to search for products, browse categories, or get recommendations!"
        
        return {
            'response': f"I'd love to help you find what you're looking for! {suggestion_text}. Try being more specific about what product you need, or type 'help' to see all my capabilities! 🛍️",
            'type': 'default',
            'suggestions': suggestions
        }
