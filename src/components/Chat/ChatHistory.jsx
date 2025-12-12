import React, { useState, useEffect } from "react";
import { chatService, utils } from "../../services/api";
import Card from "../Common/Card";
import Button from "../Common/Button";
import LoadingSpinner from "../Common/LoadingSpinner";
import { FiMessageSquare, FiClock, FiTrash2 } from "react-icons/fi";
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
    if (window.confirm("Are you sure you want to clear all chat history?")) {
      localStorage.removeItem("extension_user_id");
      localStorage.removeItem("current_session_id");
      setHistory([]);
      window.location.reload();
    }
  };

  const displayedHistory = expanded ? history : history.slice(0, 5);

  return (
    <Card title="Chat History" className="h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-text-secondary">
          <FiMessageSquare />
          <span className="text-sm">
            {history.length} message{history.length !== 1 ? "s" : ""}
          </span>
        </div>
        <Button
          variant="ghost"
          size="small"
          onClick={clearHistory}
          className="text-red-500 hover:text-red-600"
        >
          <FiTrash2 className="w-4 h-4" />
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : history.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-3">
            <FiMessageSquare className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-text-secondary">No chat history yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedHistory.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border border-border-color ${
                msg.type === "user"
                  ? "bg-primary bg-opacity-5"
                  : "bg-bg-secondary"
              }`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.type === "user"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                >
                  {msg.type === "user" ? "U" : "AI"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary line-clamp-2">
                    {msg.message}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <FiClock className="w-3 h-3 text-text-muted" />
                    <span className="text-xs text-text-muted">
                      {utils.formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {history.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border-color">
          <Button
            variant="outline"
            size="small"
            fullWidth
            onClick={() => setExpanded(!expanded)}
          >
            {expanded
              ? "Show Less"
              : `Show ${history.length - 5} more messages`}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ChatHistory;
