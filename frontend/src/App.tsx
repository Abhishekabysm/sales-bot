import { useEffect, useState } from 'react';
import ChatInterface from './components/ChatInterface';
import ProductGrid from './components/ProductGrid';
import { Product } from './types';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'products'>('chat');
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    console.log('Selected product:', product);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading AI Sales Assistant...</h2>
          <p className="text-gray-500 mt-2">Preparing your personalized shopping experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Enhanced Header - Mobile Responsive */}
      <header className={`backdrop-blur-md border-b transition-colors duration-300 sticky top-0 z-40 ${
        isDarkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center py-2 sm:py-3">
            {/* Left section - Logo and Title */}
            <div className="flex items-center space-x-1 sm:space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-2 sm:mr-3 shadow-lg">
                  <span className="text-white text-lg sm:text-xl lg:text-2xl">🤖</span>
                </div>
                <div className="hidden xs:block">
                  <h1 className={`text-sm sm:text-lg lg:text-2xl font-bold transition-colors ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    <span className="sm:hidden">AI Shop</span>
                    <span className="hidden sm:inline">AI Shopping Assistant</span>
                  </h1>
                  <p className={`text-xs sm:text-sm hidden sm:block ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Your intelligent e-commerce companion
                  </p>
                </div>
              </div>
              
              {/* Status badges - Hidden on mobile */}
              <div className="hidden lg:flex space-x-2">
                <span className="px-2 py-1 text-xs bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full font-medium shadow-sm animate-pulse">
                  🟢 Online
                </span>
                <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full font-medium shadow-sm">
                  ⚡ AI-Powered
                </span>
                <span className="px-2 py-1 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-medium shadow-sm">
                  ✨ Smart Search
                </span>
              </div>
            </div>
            
            {/* Right section - Controls */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className={`p-2 sm:p-2.5 lg:p-3 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                }`}
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <span className="text-sm sm:text-base">{isDarkMode ? '☀️' : '🌙'}</span>
              </button>

              {/* Navigation Tabs - Mobile Responsive */}
              <nav className={`flex rounded-lg sm:rounded-xl p-0.5 sm:p-1 ${
                isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-2 sm:px-3 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 ${
                    activeTab === 'chat'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <span className="text-sm sm:text-base">💬</span>
                  <span className="hidden xs:inline sm:hidden lg:inline">Chat</span>
                  <span className="hidden sm:inline lg:hidden">Chat Assistant</span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`px-2 sm:px-3 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 ${
                    activeTab === 'products'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                  }`}
                >
                  <span className="text-sm sm:text-base">🛍️</span>
                  <span className="hidden xs:inline sm:hidden lg:inline">Shop</span>
                  <span className="hidden sm:inline lg:hidden">Browse Products</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile Responsive */}
      <main className="h-[calc(100vh-60px)] sm:h-[calc(100vh-70px)] lg:h-[calc(100vh-88px)]">
        <div className={`h-full transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800/50' : 'bg-white/70'
        } backdrop-blur-sm`}>
          {activeTab === 'chat' ? (
            <div className="h-full">
              <ChatInterface onProductSelect={handleProductSelect} isDarkMode={isDarkMode} />
            </div>
          ) : (
            <div className="h-full">
              <ProductGrid onProductSelect={handleProductSelect} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-300">
          <div className={`rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {selectedProduct.name}
                </h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className={`p-2 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <img
                    src={selectedProduct.image_url}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      {'⭐'.repeat(Math.floor(selectedProduct.rating))}
                      <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {selectedProduct.rating}/5
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedProduct.stock_quantity > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedProduct.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {selectedProduct.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                      ${selectedProduct.price?.toFixed(2)}
                    </p>
                    <p className={`text-lg mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      Brand: {selectedProduct.brand}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </h3>
                    <p className={`leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {selectedProduct.description}
                    </p>
                  </div>
                  
                  {selectedProduct.features && (
                    <div>
                      <h3 className={`text-xl font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Features
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {JSON.parse(selectedProduct.features).map((feature: string, index: number) => (
                          <div
                            key={index}
                            className={`px-3 py-2 rounded-lg text-sm ${
                              isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            ✓ {feature}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-4 pt-4">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
                      🛒 Add to Cart
                    </button>
                    <button className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}>
                      ❤️ Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
