
// import React, { useState, useEffect } from "react";
// import { trackingService, utils } from "../../services/api";
// import Card from "../Common/Card";
// import LoadingSpinner from "../Common/LoadingSpinner";
// import { FiGlobe, FiMousePointer, FiSearch, FiFileText, FiRefreshCw } from "react-icons/fi";
// import "../../styles/global.css";

// const RecentActivity = () => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadRecentActivities();
//   }, []);

//   const loadRecentActivities = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const response = await trackingService.getDailySummary();
//       if (response.success) {
//         // Get recent activities from summary, fallback to empty array
//         const recentActivities = response.summary?.recent_activities || [];
//         setActivities(recentActivities.slice(0, 10)); // Show only last 10 activities
//       } else {
//         setError("Failed to load activities");
//         setActivities([]);
//       }
//     } catch (error) {
//       console.error("Failed to load activities:", error);
//       setError("Network error. Please check your connection.");
//       setActivities([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getActivityIcon = (type) => {
//     switch (type?.toLowerCase()) {
//       case "page_visit":
//       case "page_view":
//         return <FiGlobe className="w-4 h-4 text-primary" />;
//       case "click":
//       case "interaction":
//         return <FiMousePointer className="w-4 h-4 text-secondary" />;
//       case "search":
//         return <FiSearch className="w-4 h-4 text-accent" />;
//       default:
//         return <FiFileText className="w-4 h-4 text-text-muted" />;
//     }
//   };

//   const getActivityColor = (type) => {
//     switch (type?.toLowerCase()) {
//       case "page_visit":
//       case "page_view":
//         return "bg-primary bg-opacity-10 text-primary";
//       case "click":
//       case "interaction":
//         return "bg-secondary bg-opacity-10 text-secondary";
//       case "search":
//         return "bg-accent bg-opacity-10 text-accent";
//       default:
//         return "bg-text-muted bg-opacity-10 text-text-muted";
//     }
//   };

//   const formatActivityType = (type) => {
//     if (!type) return "UNKNOWN";
//     return type
//       .split('_')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(' ');
//   };

//   return (
//     <Card
//       title="Recent Activities"
//       subtitle="Your latest browser interactions"
//       className="h-full"
//       headerAction={
//         <button
//           onClick={loadRecentActivities}
//           disabled={loading}
//           className="p-1 hover:bg-bg-secondary rounded transition-colors"
//           title="Refresh activities"
//         >
//           <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
//         </button>
//       }
//     >
//       {loading ? (
//         <div className="flex items-center justify-center py-8">
//           <LoadingSpinner />
//         </div>
//       ) : error ? (
//         <div className="text-center py-8">
//           <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
//             <FiFileText className="w-6 h-6 text-red-500" />
//           </div>
//           <p className="text-red-600 font-medium">Error Loading Activities</p>
//           <p className="text-sm text-text-muted mt-1 mb-3">{error}</p>
//           <button
//             onClick={loadRecentActivities}
//             className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       ) : activities.length === 0 ? (
//         <div className="text-center py-8">
//           <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-3">
//             <FiMousePointer className="w-6 h-6 text-text-muted" />
//           </div>
//           <p className="text-text-secondary">No recent activities</p>
//           <p className="text-sm text-text-muted mt-1">
//             Start browsing to see activity here
//           </p>
//         </div>
//       ) : (
//         <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
//           {activities.map((activity, index) => (
//             <div
//               key={index}
//               className="flex items-center gap-3 p-3 rounded-lg border border-border-color hover:bg-bg-secondary transition-colors group"
//             >
//               <div
//                 className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(
//                   activity.activity_type
//                 )}`}
//               >
//                 {getActivityIcon(activity.activity_type)}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-text-primary">
//                     {formatActivityType(activity.activity_type)}
//                   </p>
//                   <span className="text-xs text-text-muted flex-shrink-0 ml-2">
//                     {utils.formatTime(activity.timestamp)}
//                   </span>
//                 </div>
//                 {activity.url && (
//                   <p className="text-xs text-text-secondary truncate mt-1" title={activity.url}>
//                     {utils.truncateText(activity.url, 50)}
//                   </p>
//                 )}
//                 {activity.page_title && (
//                   <p className="text-xs text-text-muted truncate mt-1" title={activity.page_title}>
//                     {utils.truncateText(activity.page_title, 60)}
//                   </p>
//                 )}
//                 {activity.element_details && Object.keys(activity.element_details).length > 0 && (
//                   <p className="text-xs text-text-muted truncate mt-1">
//                     {JSON.stringify(activity.element_details)}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </Card>
//   );
// };

// export default RecentActivity;

























import React, { useState, useEffect } from "react";
import { trackingService, utils } from "../../services/api";
import Card from "../Common/Card";
import LoadingSpinner from "../Common/LoadingSpinner";
import { FiGlobe, FiMousePointer, FiSearch, FiFileText, FiRefreshCw, FiNavigation } from "react-icons/fi";
import "../../styles/global.css";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    loadRecentActivities();
  }, []);

  const loadRecentActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await trackingService.getDailySummary();
      if (response.success) {
        // Get recent activities from summary, fallback to empty array
        const recentActivities = response.summary?.recent_activities || [];
        console.log('📊 [RecentActivity] Loaded activities:', {
          count: recentActivities.length,
          activities: recentActivities.slice(0, 3) // Log first 3 for debugging
        });
        
        setActivities(recentActivities.slice(0, 10)); // Show only last 10 activities
        setHasData(recentActivities.length > 0);
      } else {
        setError("Failed to load activities");
        setActivities([]);
        setHasData(false);
      }
    } catch (error) {
      console.error("Failed to load activities:", error);
      setError("Network error. Please check your connection.");
      setActivities([]);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    if (!type) return <FiFileText className="w-4 h-4 text-gray-500" />;
    
    switch (type.toLowerCase()) {
      case 'page_visit':
      case 'page_view':
      case 'navigation':
        return <FiGlobe className="w-4 h-4 text-blue-500" />;
      case 'click':
      case 'interaction':
      case 'mouseover':
        return <FiMousePointer className="w-4 h-4 text-purple-500" />;
      case 'search':
        return <FiSearch className="w-4 h-4 text-green-500" />;
      case 'scroll':
        return <FiNavigation className="w-4 h-4 text-orange-500 transform rotate-90" />;
      case 'form_input':
      case 'keypress':
      case 'copy':
      case 'paste':
        return <FiFileText className="w-4 h-4 text-cyan-500" />;
      default:
        return <FiFileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getActivityColor = (type) => {
    if (!type) return "bg-gray-100 text-gray-600";
    
    switch (type.toLowerCase()) {
      case 'page_visit':
      case 'page_view':
      case 'navigation':
        return "bg-blue-50 text-blue-600";
      case 'click':
      case 'interaction':
      case 'mouseover':
        return "bg-purple-50 text-purple-600";
      case 'search':
        return "bg-green-50 text-green-600";
      case 'scroll':
        return "bg-orange-50 text-orange-600";
      case 'form_input':
      case 'keypress':
      case 'copy':
      case 'paste':
        return "bg-cyan-50 text-cyan-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const formatActivityType = (type) => {
    if (!type) return "UNKNOWN";
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <Card
      title="Recent Activities"
      subtitle="Your latest browser interactions"
      className="h-full"
      headerAction={
        <button
          onClick={loadRecentActivities}
          disabled={loading}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          title="Refresh activities"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      }
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3">
            <FiFileText className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-red-600 font-medium">Error Loading Activities</p>
          <p className="text-sm text-gray-500 mt-1 mb-3">{error}</p>
          <button
            onClick={loadRecentActivities}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : !hasData ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
            <FiMousePointer className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-700 font-medium">No recent activities</p>
          <p className="text-sm text-gray-500 mt-1">
            Start browsing to see your activity here
          </p>
          <div className="mt-4 text-xs text-gray-400 space-y-1">
            <p>• Visit some websites</p>
            <p>• Click on links and buttons</p>
            <p>• Scroll through pages</p>
            <p>• Refresh to see your activity</p>
          </div>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${getActivityColor(
                  activity.activity_type
                )}`}
              >
                {getActivityIcon(activity.activity_type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {formatActivityType(activity.activity_type)}
                    </p>
                    {activity.page_title && (
                      <p className="text-xs text-gray-600 truncate mt-0.5" title={activity.page_title}>
                        {utils.truncateText(activity.page_title, 60)}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {utils.formatTime(activity.timestamp)}
                  </span>
                </div>
                
                {activity.url && (
                  <p className="text-xs text-gray-500 truncate mt-1" title={activity.url}>
                    {utils.truncateText(activity.url, 70)}
                  </p>
                )}
                
                {activity.element_details && Object.keys(activity.element_details).length > 0 && (
                  <div className="mt-1 text-xs text-gray-400 bg-gray-50 p-1.5 rounded">
                    <span className="font-medium">Details:</span> 
                    <span className="ml-1">
                      {Object.entries(activity.element_details)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {activities.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No activities recorded yet
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;