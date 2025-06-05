import React, { useCallback, useEffect, useState } from 'react';
import { productApi } from '../services/api';
import { Product, ProductSearchParams } from '../types';
import ProductCard from './ProductCard';

// Custom hook for window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface ProductGridProps {
  searchParams?: ProductSearchParams;
  onProductSelect?: (product: Product) => void;
  isDarkMode?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ searchParams, onProductSelect, isDarkMode = false }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<ProductSearchParams>({
    page: 1,
    per_page: 12,
    ...searchParams,
  });
  
  const { width } = useWindowSize();
  const isMobile = width < 1024;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = filters.q 
        ? await productApi.search(filters)
        : await productApi.getAll(filters);
      
      setProducts(response.products);
      setTotalPages(response.pages);
      setCurrentPage(response.current_page);
    } catch (err) {
      setError('Failed to fetch products. Please try again.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchCategories = useCallback(async () => {
    try {
      const categoryList = await productApi.getCategories();
      setCategories(categoryList);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      const brandList = await productApi.getBrands();
      setBrands(brandList);
    } catch (err) {
      console.error('Error fetching brands:', err);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, [fetchProducts, fetchCategories, fetchBrands]);

  const handleFilterChange = (newFilters: Partial<ProductSearchParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1, // Reset to first page when filters change
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const clearFilters = () => {
    setFilters({
      page: 1,
      per_page: 12,
    });
  };

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Desktop: Left Sidebar Filters, Mobile: Top Collapsible Filters */}
      {isMobile ? (
        /* Mobile Filters - Collapsible Top Section */
        <div className="w-full flex flex-col h-full">
          {/* Filter Toggle Button - Mobile */}
          <div className="flex-shrink-0 p-2 sm:p-4">
            <button
              onClick={toggleFilters}
              className={`w-full flex items-center justify-between p-3 rounded-lg shadow-sm border transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
                  : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                </svg>
                <span className="font-medium">Filters</span>
              </div>
              <svg 
                className={`w-5 h-5 transform transition-transform duration-200 ${isFiltersVisible ? 'rotate-180' : ''}`} 
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Mobile Filters Content */}
          {isFiltersVisible && (
            <div className={`mx-2 sm:mx-4 mb-4 rounded-lg shadow-sm border p-3 sm:p-4 transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Search Input */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Search
                  </label>
                  <input
                    type="text"
                    value={filters.q || ''}
                    onChange={(e) => handleFilterChange({ q: e.target.value })}
                    placeholder="Search products..."
                    className={`w-full border rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Category
                  </label>
                  <select
                    value={filters.category || ''}
                    onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
                    className={`w-full border rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Brand Filter */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Brand
                  </label>
                  <select
                    value={filters.brand || ''}
                    onChange={(e) => handleFilterChange({ brand: e.target.value || undefined })}
                    className={`w-full border rounded-md px-2 sm:px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-1 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Price Range
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      value={filters.min_price || ''}
                      onChange={(e) => handleFilterChange({ min_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="Min"
                      className={`w-full border rounded-md px-1 sm:px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                    <input
                      type="number"
                      value={filters.max_price || ''}
                      onChange={(e) => handleFilterChange({ max_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                      placeholder="Max"
                      className={`w-full border rounded-md px-1 sm:px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters Button */}
              <div className="mt-3 sm:mt-4">
                <button
                  onClick={clearFilters}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-md transition-colors duration-300 ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}

          {/* Mobile Products Section */}
          <div className="flex-1 overflow-y-auto custom-scrollbar mobile-scroll no-overscroll px-2 sm:px-4 pb-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-center py-12 px-4">
                <div className={`mb-4 text-sm sm:text-base ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{error}</div>
                <button
                  onClick={fetchProducts}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm sm:text-base"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={onProductSelect}
                      isDarkMode={isDarkMode}
                    />
                  ))}
                </div>

                {/* No Products Message */}
                {products.length === 0 && (
                  <div className="text-center py-12 px-4">
                    <div className={`mb-4 text-sm sm:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No products found matching your criteria.
                    </div>
                    <button
                      onClick={clearFilters}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors text-sm sm:text-base"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 sm:mt-8">
                    <div className="flex space-x-1 sm:space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 sm:px-3 py-2 border rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sm:hidden">‹</span>
                        <span className="hidden sm:inline">Previous</span>
                      </button>
                      
                      {Array.from({ length: Math.min(width < 640 ? 3 : 5, totalPages) }, (_, i) => {
                        const pageNum = currentPage <= 2 
                          ? i + 1 
                          : currentPage + i - 1;
                        
                        if (pageNum > totalPages) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-2 sm:px-3 py-2 border rounded-md transition-colors duration-300 text-xs sm:text-sm ${
                              currentPage === pageNum
                                ? 'bg-blue-500 border-blue-500 text-white'
                                : isDarkMode
                                  ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
                                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 sm:px-3 py-2 border rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm ${
                          isDarkMode 
                            ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        <span className="sm:hidden">›</span>
                        <span className="hidden sm:inline">Next</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        /* Desktop Layout - Left Sidebar */
        <>
          {/* Desktop Left Sidebar Filters */}
          {isFiltersVisible && (
            <div className={`w-80 flex-shrink-0 border-r transition-colors duration-300 ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className={`h-full overflow-y-auto custom-scrollbar p-6 ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Filters</h3>
                  <button
                    onClick={toggleFilters}
                    className={`p-2 rounded-md transition-colors ${
                      isDarkMode 
                        ? 'hover:bg-gray-700 text-gray-400 hover:text-white' 
                        : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Search Input */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Search
                    </label>
                    <input
                      type="text"
                      value={filters.q || ''}
                      onChange={(e) => handleFilterChange({ q: e.target.value })}
                      placeholder="Search products..."
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Category
                    </label>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => handleFilterChange({ category: e.target.value || undefined })}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Brand
                    </label>
                    <select
                      value={filters.brand || ''}
                      onChange={(e) => handleFilterChange({ brand: e.target.value || undefined })}
                      className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    >
                      <option value="">All Brands</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      Price Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="number"
                        value={filters.min_price || ''}
                        onChange={(e) => handleFilterChange({ min_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                        placeholder="Min Price"
                        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                      <input
                        type="number"
                        value={filters.max_price || ''}
                        onChange={(e) => handleFilterChange({ max_price: e.target.value ? parseFloat(e.target.value) : undefined })}
                        placeholder="Max Price"
                        className={`w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <button
                    onClick={clearFilters}
                    className={`w-full px-4 py-2 text-sm rounded-md transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Filter Toggle Button for Desktop */}
            {!isFiltersVisible && (
              <div className="p-4 border-b border-gray-200">
                <button
                  onClick={toggleFilters}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                    isDarkMode 
                      ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700' 
                      : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-300'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  <span>Show Filters</span>
                </button>
              </div>
            )}

            {/* Desktop Products Section */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <div className={`mb-4 text-base ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>{error}</div>
                  <button
                    onClick={fetchProducts}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  {/* Products Grid - Desktop */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 mb-8">
                    {products.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onProductClick={onProductSelect}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </div>

                  {/* No Products Message */}
                  {products.length === 0 && (
                    <div className="text-center py-12">
                      <div className={`mb-4 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        No products found matching your criteria.
                      </div>
                      <button
                        onClick={clearFilters}
                        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  )}

                  {/* Pagination - Desktop */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 border rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                              : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          Previous
                        </button>
                        
                        {Array.from({ length: Math.min(7, totalPages) }, (_, i) => {
                          const pageNum = currentPage <= 3 
                            ? i + 1 
                            : currentPage + i - 3;
                          
                          if (pageNum > totalPages) return null;
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-4 py-2 border rounded-md transition-colors duration-300 ${
                                currentPage === pageNum
                                  ? 'bg-blue-500 border-blue-500 text-white'
                                  : isDarkMode
                                    ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700'
                                    : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 border rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                            isDarkMode 
                              ? 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-700' 
                              : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductGrid;
export { };

