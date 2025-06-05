import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { chatApi } from '../services/api';
import { ChatResponse, Product } from '../types';
import ProductCard from './ProductCard';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  products?: Product[];
  type?: string;
}

interface ChatInterfaceProps {
  onProductSelect?: (product: Product) => void;
  isDarkMode?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onProductSelect, isDarkMode = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => localStorage.getItem('chatSessionId') || uuidv4());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('chatSessionId', sessionId);
    // Add enhanced welcome message
    setMessages([
      {
        id: uuidv4(),
        text: "🎉 **Welcome to your AI Shopping Assistant!** 🛍️\n\nI'm here to help you discover amazing products tailored to your needs! Here's how I can assist you:\n\n💡 **Try asking me:**\n• \"Show me gaming laptops under $1500\"\n• \"Find wireless headphones with good battery life\"\n• \"I need a smartphone with great camera\"\n• \"Compare iPhone vs Samsung phones\"\n\n🎯 **I'm smart at understanding:**\n• Natural language searches\n• Price ranges and budgets\n• Brand preferences\n• Category browsing\n\nWhat can I help you find today? ✨",
        isUser: false,
        timestamp: new Date(),
        type: 'greeting'
      }
    ]);
  }, [sessionId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response: ChatResponse = await chatApi.sendMessage(inputMessage, sessionId);
      
      const botMessage: ChatMessage = {
        id: uuidv4(),
        text: response.response,
        isUser: false,
        timestamp: new Date(),
        products: response.products,
        type: response.type,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        text: "I'm sorry, I'm having trouble processing your request right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
        type: 'error',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = async () => {
    try {
      await chatApi.resetSession(sessionId);
      setMessages([
        {
          id: uuidv4(),
          text: "Chat has been reset. How can I help you today?",
          isUser: false,
          timestamp: new Date(),
          type: 'system'
        }
      ]);
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden no-overscroll transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Enhanced Chat Header - Mobile Optimized */}
      <div className={`border-b p-2 sm:p-3 flex justify-between items-center transition-colors duration-300 flex-shrink-0 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-lg sm:text-xl">🤖</span>
          </div>
          <div className="min-w-0 flex-1">
            <h2 className={`text-base sm:text-xl font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Shopping Assistant
            </h2>
            <p className={`text-xs sm:text-sm hidden sm:block ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Intelligent product search and recommendations
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              Online
            </span>
          </div>
          <button
            onClick={handleResetChat}
            className={`px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 ${
              isDarkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <span className="sm:hidden">🔄</span>
            <span className="hidden sm:inline">🔄 Reset Chat</span>
          </button>
        </div>
      </div>

      {/* Enhanced Messages Container - Mobile Optimized */}
      <div className="flex-1 overflow-y-auto custom-scrollbar mobile-scroll no-overscroll p-2 sm:p-3 space-y-2 sm:space-y-3 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl`}>
              {!message.isUser && (
                <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm">🤖</span>
                  </div>
                  <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    AI Assistant
                  </span>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              )}
              
              <div
                className={`relative ${
                  message.isUser
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl rounded-br-md ml-4 sm:ml-8'
                    : isDarkMode 
                      ? 'bg-gray-800 text-gray-100 rounded-2xl rounded-bl-md border border-gray-700' 
                      : 'bg-white text-gray-900 rounded-2xl rounded-bl-md border border-gray-200 shadow-lg'
                } p-3 sm:p-4 transition-all duration-300 hover:shadow-xl`}
              >
                <div className="text-xs sm:text-sm whitespace-pre-wrap leading-relaxed">
                  {message.text.split('**').map((part, index) => (
                    index % 2 === 0 ? (
                      <span key={index}>{part}</span>
                    ) : (
                      <strong key={index} className={message.isUser ? 'text-blue-100' : isDarkMode ? 'text-blue-400' : 'text-blue-600'}>
                        {part}
                      </strong>
                    )
                  ))}
                </div>
                
                {message.isUser && (
                  <div className="flex justify-end mt-2">
                    <span className="text-xs text-blue-100">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                )}
                
                {/* Enhanced Product Cards - Mobile Optimized */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                    <div className={`flex items-center space-x-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <span className="text-base sm:text-lg">🛍️</span>
                      <span className="text-xs sm:text-sm font-semibold">
                        Found {message.products.length} products:
                      </span>
                    </div>
                    <div className="grid gap-2 sm:gap-3">
                      {message.products.slice(0, 3).map((product) => (
                        <div key={product.id} className="transform hover:scale-102 transition-transform duration-200">
                          <ProductCard 
                            product={product} 
                            onProductClick={onProductSelect}
                            isDarkMode={isDarkMode}
                          />
                        </div>
                      ))}
                      {message.products.length > 3 && (
                        <div className={`text-center p-2 sm:p-3 rounded-lg ${
                          isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-600'
                        }`}>
                          <span className="text-xs sm:text-sm font-medium">
                            ✨ ...and {message.products.length - 3} more amazing products
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Enhanced Loading indicator - Mobile Optimized */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-full max-w-[85%] sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
              <div className="flex items-center space-x-1 sm:space-x-2 mb-1 sm:mb-2">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm">🤖</span>
                </div>
                <span className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  AI Assistant
                </span>
              </div>
              <div className={`rounded-2xl rounded-bl-md p-3 sm:p-4 transition-colors duration-300 ${
                isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200 shadow-lg'
              }`}>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                  <span className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    AI is thinking...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Enhanced Input Area - Mobile Optimized */}
      <div className={`border-t p-2 sm:p-3 transition-colors duration-300 flex-shrink-0 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="space-y-2 sm:space-y-4">
          <div className="flex space-x-2 sm:space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about products... 🛍️"
              className={`flex-1 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDarkMode 
                  ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              disabled={isLoading}
            />            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white transition-colors duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 ${
                !inputMessage.trim() || isLoading
                  ? 'cursor-not-allowed opacity-50' 
                  : 'cursor-pointer'
              }`}
            >
              <span className="flex items-center justify-center space-x-1 sm:space-x-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="hidden sm:inline text-sm">Sending...</span>
                  </>
                ) : (
                  <>
                    <svg 
                      className="h-4 w-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span className="hidden sm:inline text-sm">Send</span>
                  </>
                )}
              </span>
            </button>
          </div>
          
          {/* Enhanced Quick Action Buttons - Mobile Optimized */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            <span className={`text-xs font-medium mb-1 w-full ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              💡 Quick suggestions:
            </span>
            {[
              { text: 'Gaming laptops under $1500', emoji: '🎮', shortText: 'Gaming laptops' },
              { text: 'Find smartphones', emoji: '📱', shortText: 'Smartphones' },
              { text: 'Show me books about programming', emoji: '📚', shortText: 'Programming books' },
              { text: 'Wireless headphones', emoji: '🎧', shortText: 'Headphones' },
              { text: 'Help', emoji: '❓', shortText: 'Help' }
            ].map((suggestion) => (
              <button
                key={suggestion.text}
                onClick={() => setInputMessage(suggestion.text)}
                className={`text-xs font-medium px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                }`}
              >
                <span className="flex items-center space-x-1">
                  <span>{suggestion.emoji}</span>
                  <span className="hidden sm:inline">{suggestion.text}</span>
                  <span className="sm:hidden">{suggestion.shortText}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
