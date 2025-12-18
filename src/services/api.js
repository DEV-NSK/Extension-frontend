// // import axios from "axios";

// // // Get API base URL from environment or use default
// // const API_BASE_URL =
// //   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// // console.log("API Base URL:", API_BASE_URL);

// // // Create axios instance
// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// //   timeout: 30000, // 30 second timeout for Render free tier
// // });

// // // Request interceptor for logging
// // api.interceptors.request.use(
// //   (config) => {
// //     console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
// //     return config;
// //   },
// //   (error) => {
// //     console.error("API Request Error:", error);
// //     return Promise.reject(error);
// //   }
// // );

// // // Response interceptor for error handling
// // api.interceptors.response.use(
// //   (response) => {
// //     console.log(`API Response: ${response.status} ${response.config.url}`);
// //     return response;
// //   },
// //   (error) => {
// //     console.error("API Response Error:", {
// //       message: error.message,
// //       url: error.config?.url,
// //       status: error.response?.status,
// //       data: error.response?.data,
// //     });

// //     // Handle specific errors
// //     if (error.code === "ECONNABORTED") {
// //       error.message =
// //         "Request timeout. The server is taking too long to respond.";
// //     } else if (!error.response) {
// //       error.message = "Network error. Please check your internet connection.";
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // // Generate unique user ID for extension
// // const getUserId = () => {
// //   let userId = localStorage.getItem("extension_user_id");
// //   if (!userId) {
// //     userId =
// //       "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
// //     localStorage.setItem("extension_user_id", userId);
// //   }
// //   return userId;
// // };

// // const getSessionId = () => {
// //   const today = new Date().toISOString().split("T")[0];
// //   let sessionId = localStorage.getItem("current_session_id");
// //   const lastSessionDate = localStorage.getItem("last_session_date");

// //   // Create new session if it's a new day or no session exists
// //   if (!sessionId || lastSessionDate !== today) {
// //     sessionId = "session_" + Date.now();
// //     localStorage.setItem("current_session_id", sessionId);
// //     localStorage.setItem("last_session_date", today);
// //   }

// //   return sessionId;
// // };

// // // Chat API calls
// // export const chatService = {
// //   sendMessage: async (message) => {
// //     const payload = {
// //       message,
// //       user_id: getUserId(),
// //       session_id: getSessionId(),
// //     };

// //     try {
// //       const response = await api.post("/chat/send", payload);
// //       return response.data;
// //     } catch (error) {
// //       console.error("Chat error:", error);

// //       // Return fallback response for offline mode
// //       return {
// //         success: false,
// //         response:
// //           "I'm having trouble connecting to the AI service. Please check your internet connection and try again.",
// //         message_id: "error_" + Date.now(),
// //         timestamp: new Date().toISOString(),
// //         offline: true,
// //       };
// //     }
// //   },

// //   getChatHistory: async (limit = 50) => {
// //     try {
// //       const response = await api.get(
// //         `/chat/history/${getUserId()}?limit=${limit}`
// //       );
// //       return response.data;
// //     } catch (error) {
// //       console.error("Chat history error:", error);
// //       return {
// //         success: false,
// //         history: [],
// //         error: error.message,
// //       };
// //     }
// //   },

// //   testConnection: async () => {
// //     try {
// //       const response = await api.get("/chat/test");
// //       return response.data;
// //     } catch (error) {
// //       console.error("Connection test error:", error);
// //       return {
// //         success: false,
// //         error: "Cannot connect to backend server",
// //       };
// //     }
// //   },
// // };

// // // Tracking API calls
// // export const trackingService = {
// //   trackActivity: async (activityData) => {
// //     const payload = {
// //       ...activityData,
// //       user_id: getUserId(),
// //       session_id: getSessionId(),
// //       timestamp: new Date().toISOString(),
// //     };

// //     try {
// //       const response = await api.post("/track/activity", payload);
// //       return response.data;
// //     } catch (error) {
// //       console.error("Tracking error:", error);
// //       return { success: false, error: error.message };
// //     }
// //   },

// //   // getDailySummary: async () => {
// //   //   try {
// //   //     const response = await api.get(`/track/summary/${getUserId()}`);
// //   //     return response.data;
// //   //   } catch (error) {
// //   //     console.error('Summary error:', error);
// //   //     return { success: false, summary: {}, error: error.message };
// //   //   }
// //   // },
// //   // In services/api.js, update the getDailySummary function:
// //   getDailySummary: async () => {
// //     try {
// //       const userId = getUserId();
// //       console.log("📊 Fetching summary for user:", userId);

// //       const response = await api.get(`/track/summary/${userId}`);

// //       // Log detailed response
// //       console.log("📊 Summary API Response:", {
// //         success: response.data.success,
// //         summary: response.data.summary,
// //         debug: response.data.debug_info,
// //         user_id: response.data.user_id,
// //       });

// //       // Log specific stats
// //       if (response.data.success && response.data.summary) {
// //         const summary = response.data.summary;
// //         console.log("📊 Stats extracted:", {
// //           page_visits: summary.total_pages || summary.page_visits || 0,
// //           interactions: summary.total_interactions || summary.interactions || 0,
// //           active_days: summary.active_days || 1,
// //           unique_domains: summary.unique_domains || 0,
// //         });
// //       }

// //       return response.data;
// //     } catch (error) {
// //       console.error("❌ Summary API Error:", {
// //         message: error.message,
// //         url: error.config?.url,
// //         status: error.response?.status,
// //       });

// //       // Return fallback data
// //       return {
// //         success: false,
// //         summary: {
// //           total_pages: 0,
// //           page_visits: 0,
// //           total_interactions: 0,
// //           interactions: 0,
// //           total_time_spent: 0,
// //           avg_time_per_interaction: 0,
// //           unique_domains: 0,
// //           active_days: 1,
// //           recent_activities: [],
// //           daily_activity: [],
// //           date: new Date().toISOString().split("T")[0],
// //         },
// //         error: error.message,
// //         user_id: getUserId(),
// //       };
// //     }
// //   },

// //   trackPageVisit: (url, pageTitle) => {
// //     return trackingService.trackActivity({
// //       activity_type: "page_visit",
// //       url,
// //       page_title: pageTitle,
// //       duration_seconds: 0,
// //     });
// //   },

// //   trackInteraction: (type, elementDetails = {}, url = "", pageTitle = "") => {
// //     return trackingService.trackActivity({
// //       activity_type: type,
// //       url,
// //       page_title: pageTitle,
// //       element_details: elementDetails,
// //       duration_seconds: 0,
// //     });
// //   },
// // };

// // // Health check
// // export const healthService = {
// //   checkBackend: async () => {
// //     try {
// //       const response = await api.get("/health");
// //       return response.data;
// //     } catch (error) {
// //       console.error("Health check failed:", error);
// //       return {
// //         status: "unhealthy",
// //         error: "Cannot connect to backend",
// //         gemini_ai: "unknown",
// //         message:
// //           "Backend server is not responding. Please check if the service is running.",
// //       };
// //     }
// //   },
// // };

// // // Export utilities
// // export const utils = {
// //   getUserId,
// //   getSessionId,
// //   truncateText: (text, maxLength = 50) => {
// //     if (!text) return "";
// //     if (text.length <= maxLength) return text;
// //     return text.substring(0, maxLength) + "...";
// //   },
// //   formatTime: (timestamp) => {
// //     if (!timestamp) return "Just now";
// //     try {
// //       const date = new Date(timestamp);
// //       if (isNaN(date.getTime())) return "Invalid time";

// //       const now = new Date();
// //       const diffMs = now - date;
// //       const diffMins = Math.floor(diffMs / 60000);

// //       if (diffMins < 1) return "Just now";
// //       if (diffMins < 60) return `${diffMins}m ago`;

// //       return date.toLocaleTimeString([], {
// //         hour: "2-digit",
// //         minute: "2-digit",
// //         hour12: true,
// //       });
// //     } catch (error) {
// //       console.error("Time format error:", error);
// //       return "Invalid time";
// //     }
// //   },
// //   formatDate: (timestamp) => {
// //     if (!timestamp) return "";
// //     try {
// //       const date = new Date(timestamp);
// //       if (isNaN(date.getTime())) return "Invalid date";
// //       return date.toLocaleDateString();
// //     } catch (error) {
// //       return "Invalid date";
// //     }
// //   },
// //   getApiBaseUrl: () => API_BASE_URL,
// // };

// // export default api;
























// import axios from "axios";

// // Get API base URL from environment or use default
// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// console.log("API Base URL:", API_BASE_URL);

// // Create axios instance
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 30000, // 30 second timeout for Render free tier
// });

// // Request interceptor for logging
// api.interceptors.request.use(
//   (config) => {
//     console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error("API Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => {
//     console.log(`API Response: ${response.status} ${response.config.url}`);
//     return response;
//   },
//   (error) => {
//     console.error("API Response Error:", {
//       message: error.message,
//       url: error.config?.url,
//       status: error.response?.status,
//       data: error.response?.data,
//     });

//     // Handle specific errors
//     if (error.code === "ECONNABORTED") {
//       error.message =
//         "Request timeout. The server is taking too long to respond.";
//     } else if (!error.response) {
//       error.message = "Network error. Please check your internet connection.";
//     }

//     return Promise.reject(error);
//   }
// );

// // Generate unique user ID for extension
// const getUserId = () => {
//   let userId = localStorage.getItem("extension_user_id");
//   if (!userId) {
//     userId =
//       "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
//     localStorage.setItem("extension_user_id", userId);
//   }
//   return userId;
// };

// const getSessionId = () => {
//   const today = new Date().toISOString().split("T")[0];
//   let sessionId = localStorage.getItem("current_session_id");
//   const lastSessionDate = localStorage.getItem("last_session_date");

//   // Create new session if it's a new day or no session exists
//   if (!sessionId || lastSessionDate !== today) {
//     sessionId = "session_" + Date.now();
//     localStorage.setItem("current_session_id", sessionId);
//     localStorage.setItem("last_session_date", today);
//   }

//   return sessionId;
// };

// // Chat API calls
// export const chatService = {
//   sendMessage: async (message) => {
//     const payload = {
//       message,
//       user_id: getUserId(),
//       session_id: getSessionId(),
//     };

//     try {
//       const response = await api.post("/chat/send", payload);
//       return response.data;
//     } catch (error) {
//       console.error("Chat error:", error);

//       // Return fallback response for offline mode
//       return {
//         success: false,
//         response:
//           "I'm having trouble connecting to the AI service. Please check your internet connection and try again.",
//         message_id: "error_" + Date.now(),
//         timestamp: new Date().toISOString(),
//         offline: true,
//       };
//     }
//   },

//   getChatHistory: async (limit = 50) => {
//     try {
//       const response = await api.get(
//         `/chat/history/${getUserId()}?limit=${limit}`
//       );
//       return response.data;
//     } catch (error) {
//       console.error("Chat history error:", error);
//       return {
//         success: false,
//         history: [],
//         error: error.message,
//       };
//     }
//   },

//   testConnection: async () => {
//     try {
//       const response = await api.get("/chat/test");
//       return response.data;
//     } catch (error) {
//       console.error("Connection test error:", error);
//       return {
//         success: false,
//         error: "Cannot connect to backend server",
//       };
//     }
//   },
// };

// // Tracking API calls
// export const trackingService = {
//   trackActivity: async (activityData) => {
//     const payload = {
//       ...activityData,
//       user_id: getUserId(),
//       session_id: getSessionId(),
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       const response = await api.post("/track/activity", payload);
//       return response.data;
//     } catch (error) {
//       console.error("Tracking error:", error);
//       return { success: false, error: error.message };
//     }
//   },

//   getDailySummary: async () => {
//     try {
//       const userId = getUserId();
//       console.log("📊 [API] Fetching summary for user:", userId);

//       const response = await api.get(`/track/summary/${userId}`);
      
//       // Transform backend response to match frontend expectations
//       if (response.data.success && response.data.summary) {
//         const summary = response.data.summary;
        
//         // Ensure all required fields exist with proper values
//         const transformedSummary = {
//           // Page visits - use whichever field has data
//           total_pages: summary.total_pages || summary.page_visits || 0,
//           page_visits: summary.page_visits || summary.total_pages || 0,
          
//           // Interactions
//           total_interactions: summary.total_interactions || summary.interactions || 0,
//           interactions: summary.interactions || summary.total_interactions || 0,
          
//           // Time metrics
//           total_time_spent: summary.total_time_spent || 0,
//           avg_time_per_interaction: summary.avg_time_per_interaction || 0,
          
//           // Other metrics
//           unique_domains: summary.unique_domains || 0,
//           active_days: summary.active_days || 1,
          
//           // Activity data
//           recent_activities: summary.recent_activities || [],
//           daily_activity: summary.daily_activity || [],
          
//           // Date
//           date: summary.date || new Date().toISOString().split('T')[0],
          
//           // Additional data from backend
//           domains_visited: summary.domains_visited || {},
//           activity_breakdown: summary.activity_breakdown || {},
//           daily_session: summary.daily_session || null
//         };
        
//         console.log("📊 [API] Transformed summary:", {
//           page_visits: transformedSummary.total_pages,
//           interactions: transformedSummary.total_interactions,
//           unique_domains: transformedSummary.unique_domains,
//           active_days: transformedSummary.active_days
//         });
        
//         return {
//           success: true,
//           summary: transformedSummary,
//           user_id: response.data.user_id,
//           timestamp: response.data.timestamp,
//           debug_info: response.data.debug_info
//         };
//       }
      
//       // If no summary data, return empty structure
//       return {
//         success: response.data.success || false,
//         summary: {
//           total_pages: 0,
//           page_visits: 0,
//           total_interactions: 0,
//           interactions: 0,
//           total_time_spent: 0,
//           avg_time_per_interaction: 0,
//           unique_domains: 0,
//           active_days: 1,
//           recent_activities: [],
//           daily_activity: [],
//           date: new Date().toISOString().split('T')[0]
//         },
//         user_id: userId,
//         error: response.data.error || "No summary data"
//       };
      
//     } catch (error) {
//       console.error("❌ [API] Summary API Error:", {
//         message: error.message,
//         url: error.config?.url,
//         status: error.response?.status,
//       });

//       // Return fallback data
//       return {
//         success: false,
//         summary: {
//           total_pages: 0,
//           page_visits: 0,
//           total_interactions: 0,
//           interactions: 0,
//           total_time_spent: 0,
//           avg_time_per_interaction: 0,
//           unique_domains: 0,
//           active_days: 1,
//           recent_activities: [],
//           daily_activity: [],
//           date: new Date().toISOString().split('T')[0],
//         },
//         error: error.message,
//         user_id: getUserId(),
//       };
//     }
//   },

//   trackPageVisit: (url, pageTitle) => {
//     return trackingService.trackActivity({
//       activity_type: "page_visit",
//       url,
//       page_title: pageTitle,
//       duration_seconds: 0,
//     });
//   },

//   trackInteraction: (type, elementDetails = {}, url = "", pageTitle = "") => {
//     return trackingService.trackActivity({
//       activity_type: type,
//       url,
//       page_title: pageTitle,
//       element_details: elementDetails,
//       duration_seconds: 0,
//     });
//   },
// };

// // Health check
// export const healthService = {
//   checkBackend: async () => {
//     try {
//       const response = await api.get("/health");
//       return response.data;
//     } catch (error) {
//       console.error("Health check failed:", error);
//       return {
//         status: "unhealthy",
//         error: "Cannot connect to backend",
//         gemini_ai: "unknown",
//         message:
//           "Backend server is not responding. Please check if the service is running.",
//       };
//     }
//   },
// };

// // Export utilities
// export const utils = {
//   getUserId,
//   getSessionId,
//   truncateText: (text, maxLength = 50) => {
//     if (!text) return "";
//     if (text.length <= maxLength) return text;
//     return text.substring(0, maxLength) + "...";
//   },
//   formatTime: (timestamp) => {
//     if (!timestamp) return "Just now";
//     try {
//       const date = new Date(timestamp);
//       if (isNaN(date.getTime())) return "Invalid time";

//       const now = new Date();
//       const diffMs = now - date;
//       const diffMins = Math.floor(diffMs / 60000);

//       if (diffMins < 1) return "Just now";
//       if (diffMins < 60) return `${diffMins}m ago`;

//       return date.toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     } catch (error) {
//       console.error("Time format error:", error);
//       return "Invalid time";
//     }
//   },
//   formatDate: (timestamp) => {
//     if (!timestamp) return "";
//     try {
//       const date = new Date(timestamp);
//       if (isNaN(date.getTime())) return "Invalid date";
//       return date.toLocaleDateString();
//     } catch (error) {
//       return "Invalid date";
//     }
//   },
//   getApiBaseUrl: () => API_BASE_URL,
// };

// export default api;


















import axios from "axios";

// Get API base URL from environment or use default
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

console.log("API Base URL:", API_BASE_URL);

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000, // 30 second timeout for Render free tier
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error("API Response Error:", {
      message: error.message,
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
    });

    // Handle specific errors
    if (error.code === "ECONNABORTED") {
      error.message =
        "Request timeout. The server is taking too long to respond.";
    } else if (!error.response) {
      error.message = "Network error. Please check your internet connection.";
    }

    return Promise.reject(error);
  }
);

// Generate unique user ID for extension
const getUserId = () => {
  let userId = localStorage.getItem("extension_user_id");
  if (!userId) {
    userId =
      "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("extension_user_id", userId);
  }
  return userId;
};

const getSessionId = () => {
  const today = new Date().toISOString().split("T")[0];
  let sessionId = localStorage.getItem("current_session_id");
  const lastSessionDate = localStorage.getItem("last_session_date");

  // Create new session if it's a new day or no session exists
  if (!sessionId || lastSessionDate !== today) {
    sessionId = "session_" + Date.now();
    localStorage.setItem("current_session_id", sessionId);
    localStorage.setItem("last_session_date", today);
  }

  return sessionId;
};

// Chat API calls
export const chatService = {
  sendMessage: async (message) => {
    const payload = {
      message,
      user_id: getUserId(),
      session_id: getSessionId(),
    };

    try {
      const response = await api.post("/chat/send", payload);
      return response.data;
    } catch (error) {
      console.error("Chat error:", error);

      // Return fallback response for offline mode
      return {
        success: false,
        response:
          "I'm having trouble connecting to the AI service. Please check your internet connection and try again.",
        message_id: "error_" + Date.now(),
        timestamp: new Date().toISOString(),
        offline: true,
      };
    }
  },

  getChatHistory: async (limit = 50) => {
    try {
      const response = await api.get(
        `/chat/history/${getUserId()}?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      console.error("Chat history error:", error);
      return {
        success: false,
        history: [],
        error: error.message,
      };
    }
  },

  testConnection: async () => {
    try {
      const response = await api.get("/chat/test");
      return response.data;
    } catch (error) {
      console.error("Connection test error:", error);
      return {
        success: false,
        error: "Cannot connect to backend server",
      };
    }
  },
};

// Tracking API calls
export const trackingService = {
  trackActivity: async (activityData) => {
    const payload = {
      ...activityData,
      user_id: getUserId(),
      session_id: getSessionId(),
      timestamp: new Date().toISOString(),
    };

    try {
      const response = await api.post("/track/activity", payload);
      return response.data;
    } catch (error) {
      console.error("Tracking error:", error);
      return { success: false, error: error.message };
    }
  },

  getDailySummary: async () => {
    try {
      const userId = getUserId();
      console.log("📊 [API] Fetching summary for user:", userId);

      const response = await api.get(`/track/summary/${userId}`);
      
      console.log("📊 [API] Raw API Response:", {
        success: response.data.success,
        summary: response.data.summary,
        debug_info: response.data.debug_info
      });
      
      // Transform backend response to match frontend expectations
      if (response.data.success && response.data.summary) {
        const summary = response.data.summary;
        const isTodayData = summary.is_today !== false;
        
        // Log what we received
        console.log("📊 [API] Received summary:", {
          date: summary.date,
          is_today: summary.is_today,
          page_visits: summary.page_visits,
          total_pages: summary.total_pages,
          interactions: summary.interactions,
          total_interactions: summary.total_interactions,
          daily_activity: summary.daily_activity?.length || 0,
          recent_activities: summary.recent_activities?.length || 0
        });
        
        // Ensure all required fields exist with proper values
        const transformedSummary = {
          // Page visits - use whichever field has data
          total_pages: summary.total_pages || summary.page_visits || 0,
          page_visits: summary.page_visits || summary.total_pages || 0,
          
          // Interactions
          total_interactions: summary.total_interactions || summary.interactions || 0,
          interactions: summary.interactions || summary.total_interactions || 0,
          
          // Time metrics
          total_time_spent: summary.total_time_spent || 0,
          avg_time_per_interaction: summary.avg_time_per_interaction || 0,
          
          // Other metrics
          unique_domains: summary.unique_domains || 0,
          active_days: summary.active_days || 1,
          
          // Activity data
          recent_activities: summary.recent_activities || [],
          daily_activity: summary.daily_activity || [],
          
          // Date
          date: summary.date || new Date().toISOString().split('T')[0],
          is_today: isTodayData,
          
          // Additional data from backend
          domains_visited: summary.domains_visited || {},
          activity_breakdown: summary.activity_breakdown || {},
          daily_session: summary.daily_session || null,
          
          // Backend metadata
          _raw_summary: summary
        };
        
        console.log("📊 [API] Transformed summary:", {
          date: transformedSummary.date,
          is_today: transformedSummary.is_today,
          page_visits: transformedSummary.total_pages,
          interactions: transformedSummary.total_interactions,
          unique_domains: transformedSummary.unique_domains,
          active_days: transformedSummary.active_days,
          recent_activities_count: transformedSummary.recent_activities.length,
          daily_activity_count: transformedSummary.daily_activity.length
        });
        
        return {
          success: true,
          summary: transformedSummary,
          user_id: response.data.user_id,
          timestamp: response.data.timestamp,
          debug_info: response.data.debug_info
        };
      }
      
      // If no summary data, return empty structure
      console.warn("📊 [API] No summary data returned from backend");
      return {
        success: response.data.success || false,
        summary: {
          total_pages: 0,
          page_visits: 0,
          total_interactions: 0,
          interactions: 0,
          total_time_spent: 0,
          avg_time_per_interaction: 0,
          unique_domains: 0,
          active_days: 1,
          recent_activities: [],
          daily_activity: [],
          date: new Date().toISOString().split('T')[0],
          is_today: true
        },
        user_id: userId,
        error: response.data.error || "No summary data"
      };
      
    } catch (error) {
      console.error("❌ [API] Summary API Error:", {
        message: error.message,
        url: error.config?.url,
        status: error.response?.status,
      });

      // Return fallback data
      return {
        success: false,
        summary: {
          total_pages: 0,
          page_visits: 0,
          total_interactions: 0,
          interactions: 0,
          total_time_spent: 0,
          avg_time_per_interaction: 0,
          unique_domains: 0,
          active_days: 1,
          recent_activities: [],
          daily_activity: [],
          date: new Date().toISOString().split('T')[0],
          is_today: true
        },
        error: error.message,
        user_id: getUserId(),
      };
    }
  },

  trackPageVisit: (url, pageTitle) => {
    return trackingService.trackActivity({
      activity_type: "page_visit",
      url,
      page_title: pageTitle,
      duration_seconds: 0,
    });
  },

  trackInteraction: (type, elementDetails = {}, url = "", pageTitle = "") => {
    return trackingService.trackActivity({
      activity_type: type,
      url,
      page_title: pageTitle,
      element_details: elementDetails,
      duration_seconds: 0,
    });
  },
};

// Health check
export const healthService = {
  checkBackend: async () => {
    try {
      const response = await api.get("/health");
      return response.data;
    } catch (error) {
      console.error("Health check failed:", error);
      return {
        status: "unhealthy",
        error: "Cannot connect to backend",
        gemini_ai: "unknown",
        message:
          "Backend server is not responding. Please check if the service is running.",
      };
    }
  },
};

// Export utilities
export const utils = {
  getUserId,
  getSessionId,
  truncateText: (text, maxLength = 50) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  },
  formatTime: (timestamp) => {
    if (!timestamp) return "Just now";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Invalid time";

      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;

      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Time format error:", error);
      return "Invalid time";
    }
  },
  formatDate: (timestamp) => {
    if (!timestamp) return "";
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return "Invalid date";
      return date.toLocaleDateString();
    } catch (error) {
      return "Invalid date";
    }
  },
  formatDateRelative: (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";
      
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (date.toDateString() === today.toDateString()) {
        return "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (error) {
      return "Invalid date";
    }
  },
  getApiBaseUrl: () => API_BASE_URL,
};

export default api;