# E-commerce Sales Chatbot

A comprehensive sales chatbot tailored for e-commerce platforms that enhances the shopping experience by enabling efficient search, exploration, and purchase processes.

## 🚀 Features

- **AI-Powered Chat Assistant**: Interactive chatbot that understands natural language queries for product search
- **Smart Product Search**: Advanced search capabilities with filtering by category, brand, price range
- **Responsive Design**: Compatible with desktop, tablet, and mobile devices
- **Real-time Chat Interface**: Instant responses with product recommendations
- **Product Grid View**: Browse all products with comprehensive filtering options
- **Session Management**: Persistent chat sessions with history tracking
- **Modern UI/UX**: Clean, intuitive interface built with React and Tailwind CSS

## 🛠️ Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **SQLAlchemy** - ORM for database operations
- **SQLite** - Database (easily configurable to other databases)
- **Flask-CORS** - Cross-origin resource sharing
- **Flask-JWT-Extended** - Authentication

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **UUID** - Session management

## 📋 Prerequisites

- **Python 3.8 or higher**
- **Node.js 16 or higher**
- **npm or yarn**

## 🌐 Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sales-bot)

### Option 2: Manual Deployment

1. **Prepare your repository**: Ensure your code is pushed to GitHub/GitLab/Bitbucket

2. **Deploy using PowerShell script**:
   ```powershell
   .\deploy.ps1
   ```

3. **Deploy to Vercel**:
   ```bash
   npx vercel login
   npx vercel --prod
   ```

4. **Set Environment Variables** in Vercel Dashboard:
   - `SECRET_KEY` - Your Flask secret key
   - `JWT_SECRET_KEY` - Your JWT secret key  
   - `VERCEL=1` - Indicates Vercel deployment

### Environment Variables
Copy `.env.example` to `.env` and update the values:
```bash
SECRET_KEY=your-production-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
VERCEL=1
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd sales-bot
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask application
python app.py
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend application will open in your browser at `http://localhost:3000`

## 📊 Database

The application uses SQLite database with pre-seeded sample data including:

- **100+ Product Entries** across multiple categories:
  - Electronics (laptops, smartphones, headphones, etc.)
  - Books (programming, business, self-help)
  - Clothing (shoes, jeans, hoodies)

- **Product Information**:
  - Name, description, price, category, brand
  - Stock quantity, ratings, product features
  - High-quality placeholder images

## 🔧 API Endpoints

### Products
- `GET /api/products` - Get all products with pagination
- `GET /api/products/search` - Search products with filters
- `GET /api/products/{id}` - Get specific product details
- `GET /api/products/categories` - Get all categories
- `GET /api/products/brands` - Get all brands

### Chat
- `POST /api/chat/message` - Send message to chatbot
- `GET /api/chat/history/{session_id}` - Get chat history
- `GET /api/chat/sessions` - Get all chat sessions
- `POST /api/chat/reset/{session_id}` - Reset chat session

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

## 💬 Chatbot Capabilities

The AI chatbot can handle various types of queries:

### Product Search
- "Show me laptops under $1500"
- "Find smartphones with good cameras"
- "I need running shoes"

### Price-based Queries
- "Books under $30"
- "Electronics above $500"
- "Cheapest headphones"

### Category Browsing
- "Show electronics"
- "Programming books"
- "Nike products"

### Interactive Features
- Product recommendations based on query
- Price range filtering
- Category and brand suggestions
- Quick action buttons for common searches

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
```

## 🎯 Usage Examples

### Basic Product Search
```
User: "Show me laptops"
Bot: I found 5 products matching 'laptops':
[Product cards displayed with MacBook Pro, Dell XPS, etc.]
```

### Price-filtered Search
```
User: "Find books under $25"
Bot: I found 8 products matching 'books' (under $25.0):
[Displays relevant books within price range]
```

### Getting Help
```
User: "Help"
Bot: I can help you with:
🔍 Product Search: Tell me what you're looking for
💰 Price Filtering: Specify your budget
📱 Categories: Browse by category
🏷️ Brands: Search by specific brands
```

## 🔄 Development Workflow

### Adding New Products
1. Use the `/backend/utils/seed_data.py` script
2. Add product objects to the `sample_products` list
3. Restart the backend server

### Extending Chatbot Capabilities
1. Edit `/backend/utils/chatbot_engine.py`
2. Add new patterns and handlers
3. Test with various user inputs

### UI Customization
1. Modify Tailwind classes in React components
2. Update `/frontend/tailwind.config.js` for theme changes
3. Add new components in `/frontend/src/components/`

## 🌟 Key Features Implemented

### ✅ Requirements Checklist

#### User Interface Requirements
- ✅ Responsive design for all device types
- ✅ Intuitive chatbot interface
- ✅ Conversation management with reset functionality
- ✅ Session tracking with timestamps
- ✅ Chat history storage and retrieval

#### Backend Requirements
- ✅ Python-based API server (Flask)
- ✅ Search query processing capabilities
- ✅ Product data retrieval system
- ✅ Mock database with 100+ product entries
- ✅ RESTful API endpoints

#### Code Quality Standards
- ✅ Clean, readable, and well-commented code
- ✅ Industry-standard best practices
- ✅ Modular and scalable architecture
- ✅ Robust error handling and fault tolerance
- ✅ Clear separation of concerns

## 🚧 Future Enhancements

- **AI Integration**: Advanced NLP for better query understanding
- **Recommendation Engine**: Personalized product suggestions
- **User Authentication**: Full user management system
- **Shopping Cart**: Complete e-commerce functionality
- **Payment Integration**: Checkout and payment processing
- **Analytics Dashboard**: User behavior insights
- **Voice Interface**: Voice-activated interactions
- **Multi-language Support**: Internationalization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the API documentation
- Review the code comments and inline documentation

---

**Note**: This is a demonstration project showcasing full-stack development capabilities for e-commerce chatbot implementation.
