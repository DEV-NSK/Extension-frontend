import React, { useState, useEffect, useRef } from 'react';
import { chatService, utils } from '../../services/api';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    loadChatHistory();
    testConnection();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const testConnection = async () => {
    try {
      const result = await chatService.testConnection();
      setConnectionStatus(result.gemini_available ? 'connected' : 'api_key_missing');
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const loadChatHistory = async () => {
    try {
      const response = await chatService.getChatHistory(20);
      if (response.success && response.history) {
        setMessages(response.history);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(userMessage.message);
      
      const aiMessage = {
        id: response.message_id || Date.now() + 1,
        type: 'assistant',
        message: response.response,
        timestamp: response.timestamp || new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        message: 'Sorry, I encountered an error. Please check your backend connection and API key configuration.',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const getConnectionMessage = () => {
    switch(connectionStatus) {
      case 'connected':
        return 'AI Assistant is ready to chat!';
      case 'api_key_missing':
        return '⚠️ API key not configured. Please add Gemini API key to backend.';
      case 'disconnected':
        return '⚠️ Cannot connect to backend server.';
      default:
        return 'Checking connection...';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <FiMessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">AI Assistant</h2>
              <p className={`text-sm ${
                connectionStatus === 'connected' ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {getConnectionMessage()}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            User: {utils.truncateText(utils.getUserId(), 8)}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
              <FiMessageSquare className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Start a conversation
            </h3>
            <p className="text-gray-600 max-w-md mb-4">
              Ask me anything! I can help with information, suggestions, or just have a friendly chat.
            </p>
            {connectionStatus !== 'connected' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md">
                <p className="text-sm text-yellow-800">
                  <strong>Setup Required:</strong> To enable AI chat, you need to:
                </p>
                <ol className="text-sm text-yellow-800 mt-2 list-decimal list-inside space-y-1">
                  <li>Get a free API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
                  <li>Add it to the backend `.env` file: GEMINI_API_KEY=your_key_here</li>
                  <li>Restart the backend server</li>
                </ol>
              </div>
            )}
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id || msg.message_id}
              className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}
            >
              {msg.type === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <FiMessageSquare className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.type === 'user'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{msg.message}</p>
                <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
                  {utils.formatTime(msg.timestamp)}
                </div>
              </div>

              {msg.type === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <FiUser className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <FiMessageSquare className="w-4 h-4 text-white" />
            </div>
            <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                connectionStatus === 'connected' 
                  ? "Type your message here..." 
                  : "Configure API key first..."
              }
              disabled={loading || connectionStatus !== 'connected'}
              className="rounded-full"
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || loading || connectionStatus !== 'connected'}
            loading={loading}
            className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
          >
            <FiSend className="w-5 h-5" />
          </Button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          {connectionStatus === 'connected' 
            ? 'Press Enter to send • Shift+Enter for new line'
            : 'Please configure Gemini API key to enable chat'}
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;