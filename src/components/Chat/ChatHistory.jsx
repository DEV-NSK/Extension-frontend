// import React, { useState, useEffect } from "react";
// import { chatService, utils } from "../../services/api";
// import Card from "../Common/Card";
// import Button from "../Common/Button";
// import LoadingSpinner from "../Common/LoadingSpinner";
// import { FiMessageSquare, FiClock, FiTrash2 } from "react-icons/fi";
// import "../../styles/global.css";

// const ChatHistory = () => {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     loadHistory();
//   }, []);

//   const loadHistory = async () => {
//     setLoading(true);
//     try {
//       const response = await chatService.getChatHistory(50);
//       if (response.success) {
//         setHistory(response.history);
//       }
//     } catch (error) {
//       console.error("Failed to load history:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearHistory = () => {
//     if (window.confirm("Are you sure you want to clear all chat history?")) {
//       localStorage.removeItem("extension_user_id");
//       localStorage.removeItem("current_session_id");
//       setHistory([]);
//       window.location.reload();
//     }
//   };

//   const displayedHistory = expanded ? history : history.slice(0, 5);

//   return (
//     <Card title="Chat History" className="h-full">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2 text-text-secondary">
//           <FiMessageSquare />
//           <span className="text-sm">
//             {history.length} message{history.length !== 1 ? "s" : ""}
//           </span>
//         </div>
//         <Button
//           variant="ghost"
//           size="small"
//           onClick={clearHistory}
//           className="text-red-500 hover:text-red-600"
//         >
//           <FiTrash2 className="w-4 h-4" />
//         </Button>
//       </div>

//       {loading ? (
//         <div className="flex items-center justify-center py-8">
//           <LoadingSpinner />
//         </div>
//       ) : history.length === 0 ? (
//         <div className="text-center py-8">
//           <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-3">
//             <FiMessageSquare className="w-6 h-6 text-text-muted" />
//           </div>
//           <p className="text-text-secondary">No chat history yet</p>
//         </div>
//       ) : (
//         <div className="space-y-3">
//           {displayedHistory.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-3 rounded-lg border border-border-color ${
//                 msg.type === "user"
//                   ? "bg-primary bg-opacity-5"
//                   : "bg-bg-secondary"
//               }`}
//             >
//               <div className="flex items-start gap-2">
//                 <div
//                   className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     msg.type === "user"
//                       ? "bg-primary text-white"
//                       : "bg-secondary text-white"
//                   }`}
//                 >
//                   {msg.type === "user" ? "U" : "AI"}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-text-primary line-clamp-2">
//                     {msg.message}
//                   </p>
//                   <div className="flex items-center gap-2 mt-1">
//                     <FiClock className="w-3 h-3 text-text-muted" />
//                     <span className="text-xs text-text-muted">
//                       {utils.formatTime(msg.timestamp)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {history.length > 5 && (
//         <div className="mt-4 pt-4 border-t border-border-color">
//           <Button
//             variant="outline"
//             size="small"
//             fullWidth
//             onClick={() => setExpanded(!expanded)}
//           >
//             {expanded
//               ? "Show Less"
//               : `Show ${history.length - 5} more messages`}
//           </Button>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default ChatHistory;
















import React, { useState, useEffect } from "react";
import { chatService, utils } from "../../services/api";
import Card from "../Common/Card";
import Button from "../Common/Button";
import LoadingSpinner from "../Common/LoadingSpinner";
import { FiMessageSquare, FiClock, FiTrash2, FiChevronDown, FiChevronUp, FiArchive } from "react-icons/fi";
import "../../styles/global.css";

const ChatHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const response = await chatService.getChatHistory(50);
      if (response.success) {
        setHistory(response.history);
      }
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear all chat history? This action cannot be undone.")) {
      localStorage.removeItem("extension_user_id");
      localStorage.removeItem("current_session_id");
      setHistory([]);
      window.location.reload();
    }
  };

  const displayedHistory = expanded ? history : history.slice(0, 5);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Group messages by date
  const groupedHistory = displayedHistory.reduce((groups, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  return (
    <div className="h-full flex flex-col font-sans">
      {/* History Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-white to-gray-50">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center shadow-sm">
              <FiArchive className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 text-lg">Chat History</h2>
              <p className="text-sm text-gray-600">
                {history.length} conversation{history.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={clearHistory}
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg"
            title="Clear all history"
          >
            <FiTrash2 className="w-4.5 h-4.5" />
          </Button>
        </div>
      </div>

      {/* History Content with Custom Scroll */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto custom-scrollbar p-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center mb-4">
                <LoadingSpinner size="medium" />
              </div>
              <p className="text-gray-600 font-medium">Loading history...</p>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 flex items-center justify-center mb-5">
                <FiMessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No History Yet</h3>
              <p className="text-gray-600 max-w-xs leading-relaxed">
                Your chat conversations will appear here once you start messaging.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedHistory).map(([date, messages]) => (
                <div key={date} className="space-y-3">
                  <div className="sticky top-0 z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full">
                      <span className="text-xs font-medium text-gray-700">{date}</span>
                      <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">
                        {messages.length}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {messages.map((msg, index) => (
                      <div
                        key={index}
                        className={`group p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${
                          msg.type === "user"
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100"
                            : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              msg.type === "user"
                                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                                : "bg-gradient-to-r from-gray-600 to-gray-700 text-white"
                            }`}
                          >
                            {msg.type === "user" ? "U" : "AI"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1.5">
                              <span className={`text-xs font-semibold ${
                                msg.type === "user" ? "text-blue-700" : "text-gray-700"
                              }`}>
                                {msg.type === "user" ? "You" : "AI Assistant"}
                              </span>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <FiClock className="w-3 h-3" />
                                <span>{utils.formatTime(msg.timestamp)}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-800 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                              {msg.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Load More Button */}
      {history.length > 5 && (
        <div className="p-5 border-t border-gray-100 bg-white">
          <Button
            variant="outline"
            size="medium"
            fullWidth
            onClick={() => setExpanded(!expanded)}
            className="border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          >
            <div className="flex items-center justify-center gap-2">
              {expanded ? (
                <>
                  <FiChevronUp className="w-4 h-4" />
                  Show Less
                </>
              ) : (
                <>
                  <FiChevronDown className="w-4 h-4" />
                  Show {history.length - 5} More Messages
                </>
              )}
            </div>
          </Button>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ChatHistory;