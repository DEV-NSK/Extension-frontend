// // import React, { useState, useEffect, useRef } from 'react';
// // import { chatService, utils } from '../../services/api';
// // import Button from '../Common/Button';
// // import Input from '../Common/Input';
// // import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

// // const ChatWindow = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const [isTyping, setIsTyping] = useState(false);
// //   const [connectionStatus, setConnectionStatus] = useState('checking');
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => {
// //     loadChatHistory();
// //     testConnection();
// //   }, []);

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages]);

// //   const testConnection = async () => {
// //     try {
// //       const result = await chatService.testConnection();
// //       setConnectionStatus(result.gemini_available ? 'connected' : 'api_key_missing');
// //     } catch (error) {
// //       setConnectionStatus('disconnected');
// //     }
// //   };

// //   const loadChatHistory = async () => {
// //     try {
// //       const response = await chatService.getChatHistory(20);
// //       if (response.success && response.history) {
// //         setMessages(response.history);
// //       }
// //     } catch (error) {
// //       console.error('Failed to load chat history:', error);
// //     }
// //   };

// //   const scrollToBottom = () => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   const handleSend = async (e) => {
// //     e.preventDefault();
// //     if (!input.trim() || loading) return;

// //     const userMessage = {
// //       id: Date.now(),
// //       type: 'user',
// //       message: input.trim(),
// //       timestamp: new Date().toISOString(),
// //     };

// //     setMessages(prev => [...prev, userMessage]);
// //     setInput('');
// //     setLoading(true);
// //     setIsTyping(true);

// //     try {
// //       const response = await chatService.sendMessage(userMessage.message);
      
// //       const aiMessage = {
// //         id: response.message_id || Date.now() + 1,
// //         type: 'assistant',
// //         message: response.response,
// //         timestamp: response.timestamp || new Date().toISOString(),
// //       };
// //       setMessages(prev => [...prev, aiMessage]);
// //     } catch (error) {
// //       console.error('Chat error:', error);
// //       const errorMessage = {
// //         id: Date.now() + 1,
// //         type: 'assistant',
// //         message: 'Sorry, I encountered an error. Please check your backend connection and API key configuration.',
// //         timestamp: new Date().toISOString(),
// //       };
// //       setMessages(prev => [...prev, errorMessage]);
// //     } finally {
// //       setLoading(false);
// //       setIsTyping(false);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === 'Enter' && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSend(e);
// //     }
// //   };

// //   const getConnectionMessage = () => {
// //     switch(connectionStatus) {
// //       case 'connected':
// //         return 'AI Assistant is ready to chat!';
// //       case 'api_key_missing':
// //         return '⚠️ API key not configured. Please add Gemini API key to backend.';
// //       case 'disconnected':
// //         return '⚠️ Cannot connect to backend server.';
// //       default:
// //         return 'Checking connection...';
// //     }
// //   };

// //   return (
// //     <div className="flex flex-col h-full bg-white">
// //       {/* Chat Header */}
// //       <div className="p-4 border-b border-gray-200">
// //         <div className="flex items-center justify-between">
// //           <div className="flex items-center gap-3">
// //             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
// //               <FiMessageSquare className="w-5 h-5 text-white" />
// //             </div>
// //             <div>
// //               <h2 className="font-semibold text-gray-800">AI Assistant</h2>
// //               <p className={`text-sm ${
// //                 connectionStatus === 'connected' ? 'text-green-600' : 'text-yellow-600'
// //               }`}>
// //                 {getConnectionMessage()}
// //               </p>
// //             </div>
// //           </div>
// //           <div className="text-xs text-gray-500">
// //             User: {utils.truncateText(utils.getUserId(), 8)}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Messages Container */}
// //       <div className="flex-1 overflow-y-auto p-4 space-y-4">
// //         {messages.length === 0 ? (
// //           <div className="flex flex-col items-center justify-center h-full text-center p-8">
// //             <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
// //               <FiMessageSquare className="w-8 h-8 text-white" />
// //             </div>
// //             <h3 className="text-lg font-semibold text-gray-800 mb-2">
// //               Start a conversation
// //             </h3>
// //             <p className="text-gray-600 max-w-md mb-4">
// //               Ask me anything! I can help with information, suggestions, or just have a friendly chat.
// //             </p>
// //             {connectionStatus !== 'connected' && (
// //               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-md">
// //                 <p className="text-sm text-yellow-800">
// //                   <strong>Setup Required:</strong> To enable AI chat, you need to:
// //                 </p>
// //                 <ol className="text-sm text-yellow-800 mt-2 list-decimal list-inside space-y-1">
// //                   <li>Get a free API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a></li>
// //                   <li>Add it to the backend `.env` file: GEMINI_API_KEY=your_key_here</li>
// //                   <li>Restart the backend server</li>
// //                 </ol>
// //               </div>
// //             )}
// //           </div>
// //         ) : (
// //           messages.map((msg) => (
// //             <div
// //               key={msg.id || msg.message_id}
// //               className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}
// //             >
// //               {msg.type === 'assistant' && (
// //                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
// //                   <FiMessageSquare className="w-4 h-4 text-white" />
// //                 </div>
// //               )}
              
// //               <div
// //                 className={`max-w-[80%] rounded-2xl px-4 py-3 ${
// //                   msg.type === 'user'
// //                     ? 'bg-blue-600 text-white rounded-tr-none'
// //                     : 'bg-gray-100 text-gray-800 rounded-tl-none'
// //                 }`}
// //               >
// //                 <p className="whitespace-pre-wrap break-words">{msg.message}</p>
// //                 <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-blue-200' : 'text-gray-500'}`}>
// //                   {utils.formatTime(msg.timestamp)}
// //                 </div>
// //               </div>

// //               {msg.type === 'user' && (
// //                 <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
// //                   <FiUser className="w-4 h-4 text-white" />
// //                 </div>
// //               )}
// //             </div>
// //           ))
// //         )}

// //         {/* Typing Indicator */}
// //         {isTyping && (
// //           <div className="flex gap-3">
// //             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
// //               <FiMessageSquare className="w-4 h-4 text-white" />
// //             </div>
// //             <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-none px-4 py-3">
// //               <div className="flex gap-1">
// //                 <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
// //                 <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
// //                 <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }} />
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         <div ref={messagesEndRef} />
// //       </div>

// //       {/* Input Area */}
// //       <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
// //         <div className="flex gap-2">
// //           <div className="flex-1">
// //             <Input
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyPress={handleKeyPress}
// //               placeholder={
// //                 connectionStatus === 'connected' 
// //                   ? "Type your message here..." 
// //                   : "Configure API key first..."
// //               }
// //               disabled={loading || connectionStatus !== 'connected'}
// //               className="rounded-full"
// //             />
// //           </div>
// //           <Button
// //             type="submit"
// //             disabled={!input.trim() || loading || connectionStatus !== 'connected'}
// //             loading={loading}
// //             className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
// //           >
// //             <FiSend className="w-5 h-5" />
// //           </Button>
// //         </div>
// //         <div className="text-xs text-gray-500 mt-2 text-center">
// //           {connectionStatus === 'connected' 
// //             ? 'Press Enter to send • Shift+Enter for new line'
// //             : 'Please configure Gemini API key to enable chat'}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default ChatWindow;











// import React, { useState, useEffect, useRef } from 'react';
// import { chatService, utils } from '../../services/api';
// import Button from '../Common/Button';
// import Input from '../Common/Input';
// import { FiSend, FiUser, FiMessageSquare, FiZap } from 'react-icons/fi';

// const ChatWindow = ({ showHistory }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('checking');
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     loadChatHistory();
//     testConnection();
//   }, []);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const testConnection = async () => {
//     try {
//       const result = await chatService.testConnection();
//       setConnectionStatus(result.gemini_available ? 'connected' : 'api_key_missing');
//     } catch (error) {
//       setConnectionStatus('disconnected');
//     }
//   };

//   const loadChatHistory = async () => {
//     try {
//       const response = await chatService.getChatHistory(20);
//       if (response.success && response.history) {
//         setMessages(response.history);
//       }
//     } catch (error) {
//       console.error('Failed to load chat history:', error);
//     }
//   };

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleSend = async (e) => {
//     e.preventDefault();
//     if (!input.trim() || loading) return;

//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       message: input.trim(),
//       timestamp: new Date().toISOString(),
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setLoading(true);
//     setIsTyping(true);

//     try {
//       const response = await chatService.sendMessage(userMessage.message);
      
//       const aiMessage = {
//         id: response.message_id || Date.now() + 1,
//         type: 'assistant',
//         message: response.response,
//         timestamp: response.timestamp || new Date().toISOString(),
//       };
//       setMessages(prev => [...prev, aiMessage]);
//     } catch (error) {
//       console.error('Chat error:', error);
//       const errorMessage = {
//         id: Date.now() + 1,
//         type: 'assistant',
//         message: 'Sorry, I encountered an error. Please check your backend connection and API key configuration.',
//         timestamp: new Date().toISOString(),
//       };
//       setMessages(prev => [...prev, errorMessage]);
//     } finally {
//       setLoading(false);
//       setIsTyping(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend(e);
//     }
//   };

//   const getConnectionMessage = () => {
//     switch(connectionStatus) {
//       case 'connected':
//         return 'Ready to chat • AI Assistant Online';
//       case 'api_key_missing':
//         return '⚠️ API key required • Setup needed';
//       case 'disconnected':
//         return '⚠️ Backend disconnected • Check server';
//       default:
//         return 'Establishing connection...';
//     }
//   };

//   const getStatusColor = () => {
//     switch(connectionStatus) {
//       case 'connected':
//         return 'text-emerald-600';
//       case 'api_key_missing':
//       case 'disconnected':
//         return 'text-amber-600';
//       default:
//         return 'text-gray-600';
//     }
//   };

//   return (
//     <div className="flex flex-col h-full font-sans">
//       {/* Enhanced Chat Header */}
//       <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-md">
//                 <FiMessageSquare className="w-6 h-6 text-white" />
//               </div>
//               {connectionStatus === 'connected' && (
//                 <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white"></div>
//               )}
//             </div>
//             <div>
//               <h2 className="font-bold text-gray-900 text-lg">AI Assistant</h2>
//               <p className={`text-sm font-medium ${getStatusColor()}`}>
//                 {getConnectionMessage()}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
//               <div className="w-2 h-2 rounded-full bg-blue-500"></div>
//               <span className="text-xs font-medium text-gray-700">
//                 User: {utils.truncateText(utils.getUserId(), 10)}
//               </span>
//             </div>
//             {connectionStatus === 'connected' && (
//               <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100">
//                 <FiZap className="w-3.5 h-3.5 text-emerald-600" />
//                 <span className="text-xs font-medium text-emerald-700">Live</span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Messages Container with Custom Scroll */}
//       <div className="flex-1 overflow-hidden">
//         <div className="h-full overflow-y-auto custom-scrollbar p-5">
//           {messages.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-center px-4">
//               <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center mb-6">
//                 <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
//                   <FiMessageSquare className="w-8 h-8 text-white" />
//                 </div>
//               </div>
//               <h3 className="text-2xl font-bold text-gray-900 mb-3">
//                 Start a Conversation
//               </h3>
//               <p className="text-gray-600 max-w-md mb-6 leading-relaxed">
//                 I'm your AI assistant ready to help with questions, tasks, or just have a friendly chat. 
//                 Ask me anything!
//               </p>
              
//               {connectionStatus !== 'connected' && (
//                 <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 max-w-md">
//                   <div className="flex items-start gap-3">
//                     <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
//                       <span className="text-amber-600 font-bold">!</span>
//                     </div>
//                     <div className="text-left">
//                       <h4 className="font-semibold text-amber-800 mb-2">Setup Required</h4>
//                       <p className="text-sm text-amber-700 mb-3">
//                         To enable AI chat functionality, follow these steps:
//                       </p>
//                       <ol className="text-sm text-amber-700 space-y-2">
//                         <li className="flex items-start gap-2">
//                           <span className="font-medium">1.</span>
//                           <span>Get a free API key from <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google AI Studio</a></span>
//                         </li>
//                         <li className="flex items-start gap-2">
//                           <span className="font-medium">2.</span>
//                           <span>Add it to backend `.env` file: <code className="bg-amber-100 px-2 py-1 rounded text-xs font-mono">GEMINI_API_KEY=your_key_here</code></span>
//                         </li>
//                         <li className="flex items-start gap-2">
//                           <span className="font-medium">3.</span>
//                           <span>Restart the backend server</span>
//                         </li>
//                       </ol>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {connectionStatus === 'connected' && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mt-4">
//                   {[
//                     "What can you help me with?",
//                     "Explain quantum computing",
//                     "Write a Python function",
//                     "Tell me a fun fact"
//                   ].map((suggestion, index) => (
//                     <button
//                       key={index}
//                       onClick={() => setInput(suggestion)}
//                       className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
//                     >
//                       "{suggestion}"
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="space-y-5">
//               {messages.map((msg) => (
//                 <div
//                   key={msg.id || msg.message_id}
//                   className={`flex gap-4 ${msg.type === 'user' ? 'justify-end' : ''}`}
//                 >
//                   {msg.type === 'assistant' && (
//                     <div className="flex-shrink-0">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
//                         <FiMessageSquare className="w-5 h-5 text-white" />
//                       </div>
//                     </div>
//                   )}
                  
//                   <div className={`max-w-[75%] ${showHistory ? 'max-w-[70%]' : 'max-w-[80%]'}`}>
//                     <div
//                       className={`rounded-2xl px-5 py-4 shadow-sm ${
//                         msg.type === 'user'
//                           ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-br-none'
//                           : 'bg-gray-50 text-gray-800 rounded-bl-none border border-gray-100'
//                       }`}
//                     >
//                       <p className="whitespace-pre-wrap break-words leading-relaxed">
//                         {msg.message}
//                       </p>
//                       <div className={`text-xs mt-3 flex items-center gap-1.5 ${
//                         msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
//                       }`}>
//                         <span className="opacity-80">{utils.formatTime(msg.timestamp)}</span>
//                         {msg.type === 'user' && (
//                           <>
//                             <span className="opacity-50">•</span>
//                             <span className="opacity-80">You</span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {msg.type === 'user' && (
//                     <div className="flex-shrink-0">
//                       <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-sm">
//                         <FiUser className="w-5 h-5 text-white" />
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* Typing Indicator */}
//           {isTyping && (
//             <div className="flex gap-4">
//               <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
//                 <FiMessageSquare className="w-5 h-5 text-white" />
//               </div>
//               <div className="bg-gray-50 text-gray-800 rounded-2xl rounded-bl-none px-5 py-4 border border-gray-100">
//                 <div className="flex items-center gap-2">
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
//                   <span className="text-sm text-gray-600 ml-2">AI is thinking...</span>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div ref={messagesEndRef} className="h-4" />
//         </div>
//       </div>

//       {/* Input Area */}
//       <form onSubmit={handleSend} className="p-5 border-t border-gray-100 bg-white">
//         <div className="flex gap-3">
//           <div className="flex-1">
//             <Input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder={
//                 connectionStatus === 'connected' 
//                   ? "Type your message here..." 
//                   : "Setup API key to start chatting..."
//               }
//               disabled={loading || connectionStatus !== 'connected'}
//               className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 py-3.5"
//               multiline
//               rows={1}
//             />
//           </div>
//           <Button
//             type="submit"
//             disabled={!input.trim() || loading || connectionStatus !== 'connected'}
//             loading={loading}
//             className="rounded-xl w-14 h-14 p-0 flex items-center justify-center shadow-sm hover:shadow transition-all"
//           >
//             <FiSend className="w-5 h-5" />
//           </Button>
//         </div>
//         <div className="flex items-center justify-between mt-3">
//           <div className="text-xs text-gray-500">
//             {connectionStatus === 'connected' 
//               ? 'Press Enter to send • Shift+Enter for new line'
//               : 'API configuration required'}
//           </div>
//           {input.length > 0 && (
//             <div className="text-xs text-gray-500">
//               {input.length} characters
//             </div>
//           )}
//         </div>
//       </form>

//       {/* Custom Scrollbar Styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 6px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: transparent;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(156, 163, 175, 0.1);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(156, 163, 175, 0.2);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ChatWindow;



















import React, { useState, useEffect, useRef } from 'react';
import { chatService, utils } from '../../services/api';
import Button from '../Common/Button';
import Input from '../Common/Input';
import { FiSend, FiUser, FiMessageSquare, FiZap } from 'react-icons/fi';

const ChatWindow = ({ showHistory }) => {
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
        return 'Ready to chat';
      case 'api_key_missing':
        return 'API key required';
      case 'disconnected':
        return 'Backend disconnected';
      default:
        return 'Connecting...';
    }
  };

  const getStatusColor = () => {
    switch(connectionStatus) {
      case 'connected':
        return 'text-emerald-600';
      case 'api_key_missing':
      case 'disconnected':
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex flex-col h-full font-sans antialiased">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white">
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                <FiMessageSquare className="w-4 h-4 text-white" />
              </div>
              {connectionStatus === 'connected' && (
                <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-1 ring-white"></div>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">AI Assistant</h2>
              <p className={`text-xs font-medium ${getStatusColor()} flex items-center gap-1`}>
                <span className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                {getConnectionMessage()}
              </p>
            </div>
          </div> */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-gray-50 rounded border border-gray-200">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">
                {utils.truncateText(utils.getUserId(), 8)}
              </span>
            </div>
            {connectionStatus === 'connected' && (
              <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 rounded border border-emerald-100">
                <FiZap className="w-3 h-3 text-emerald-600" />
                <span className="text-xs font-medium text-emerald-700">Live</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden bg-white">
        <div className="h-full overflow-y-auto custom-scrollbar px-4 py-3">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                    <FiMessageSquare className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                Start a Conversation
              </h3>
              <p className="text-xs text-gray-600 max-w-xs mb-6">
                I'm your AI assistant ready to help.
              </p>
              
              {connectionStatus !== 'connected' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 max-w-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded bg-amber-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-amber-600 font-bold text-xs">!</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-amber-900 mb-1 text-xs">Setup Required</h4>
                      <ol className="text-xs text-amber-800 space-y-1">
                        <li>1. Get API key from Google AI Studio</li>
                        <li>2. Add to backend `.env` file</li>
                        <li>3. Restart server</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {connectionStatus === 'connected' && (
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs mt-4">
                  {[
                    "What can you help me with?",
                    "Explain quantum computing",
                    "Write a Python function",
                    "Tell me a fun fact"
                  ].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors text-left"
                    >
                      "{suggestion}"
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id || msg.message_id}
                  className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : ''}`}
                >
                  {msg.type === 'assistant' && (
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                        <FiMessageSquare className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`max-w-[75%] ${showHistory ? 'max-w-[70%]' : 'max-w-[80%]'}`}>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white'
                          : 'bg-gray-50 text-gray-800 border border-gray-100'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words text-sm">
                        {msg.message}
                      </p>
                      <div className={`text-xs mt-1.5 flex items-center gap-1 ${
                        msg.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span>{utils.formatTime(msg.timestamp)}</span>
                      </div>
                    </div>
                  </div>

                  {msg.type === 'user' && (
                    <div className="flex-shrink-0">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                        <FiUser className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-500 flex items-center justify-center">
                <FiMessageSquare className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-gray-50 text-gray-800 rounded-lg px-3 py-2 border border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white">
        <form onSubmit={handleSend} className="space-y-2">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  connectionStatus === 'connected' 
                    ? "Type your message..." 
                    : "Setup API key to start..."
                }
                disabled={loading || connectionStatus !== 'connected'}
                className="rounded-lg border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 py-2 px-3 text-sm bg-white placeholder-gray-400"
                multiline
                rows={1}
              />
            </div>
            <Button
              type="submit"
              disabled={!input.trim() || loading || connectionStatus !== 'connected'}
              loading={loading}
              className="rounded-lg w-10 h-10 p-0 flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 disabled:opacity-50"
            >
              <FiSend className="w-4 h-4 text-white" />
            </Button>
          </div>
          <div className="text-xs text-gray-500">
            {connectionStatus === 'connected' 
              ? 'Press Enter to send'
              : 'API configuration required'}
          </div>
        </form>
      </div>

      {/* Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(243, 244, 246, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.15);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.25);
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;