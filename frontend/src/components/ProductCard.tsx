import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  isDarkMode?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onProductClick, isDarkMode = false }) => {
  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">★</span>
      );
    }

    return stars;
  };  return (
    <div
      className={`rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border transform hover:scale-105 ${
        isDarkMode 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
          : 'bg-white border-gray-200 hover:shadow-xl'
      }`}
      onClick={handleClick}
    >
      <div className="p-3 sm:p-4">
        {/* Product Image - Mobile Responsive */}
        <div className={`w-full h-36 sm:h-40 lg:h-48 rounded-lg mb-3 sm:mb-4 flex items-center justify-center overflow-hidden ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.classList.remove('hidden');
              }}
            />
          ) : null}
          
          <div className={`text-center ${product.image_url ? 'hidden' : ''} ${
            isDarkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <div className="text-2xl sm:text-3xl lg:text-4xl mb-1 sm:mb-2">📦</div>
            <div className="text-xs sm:text-sm">No Image</div>
          </div>
        </div>

        {/* Product Info - Mobile Responsive */}
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className={`font-semibold text-sm sm:text-base lg:text-lg line-clamp-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {product.name}
          </h3>
          
          <p className={`text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {product.description}
          </p>

          {/* Price and Rating - Mobile Responsive */}
          <div className="flex items-center justify-between">
            <span className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-500">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center space-x-0.5 sm:space-x-1">
              <div className="flex text-xs sm:text-sm">
                {renderStars(product.rating)}
              </div>
              <span className={`text-xs sm:text-sm ml-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                ({product.rating})
              </span>
            </div>
          </div>

          {/* Category and Brand - Mobile Responsive */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className={`px-2 py-1 rounded-full text-xs ${
              isDarkMode 
                ? 'bg-blue-900 text-blue-300' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {product.category}
            </span>
            {product.brand && (
              <span className={`truncate max-w-20 sm:max-w-24 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {product.brand}
              </span>
            )}
          </div>

          {/* Stock Status - Mobile Responsive */}
          {product.stock_quantity !== undefined && (
            <div className="text-xs sm:text-sm">
              {product.stock_quantity > 0 ? (
                <span className="text-green-600">
                  ✓ <span className="hidden sm:inline">In Stock </span>
                  <span className="sm:hidden">Stock </span>
                  ({product.stock_quantity})
                </span>
              ) : (
                <span className="text-red-600">
                  ✗ Out of Stock
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
