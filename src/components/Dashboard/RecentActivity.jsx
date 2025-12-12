import React, { useState, useEffect } from "react";
import { trackingService, utils } from "../../services/api";
import Card from "../Common/Card";
import LoadingSpinner from "../Common/LoadingSpinner";
import { FiGlobe, FiMousePointer, FiSearch, FiFileText } from "react-icons/fi";
import "../../styles/global.css";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecentActivities();
  }, []);

  const loadRecentActivities = async () => {
    setLoading(true);
    try {
      const response = await trackingService.getDailySummary();
      if (response.success) {
        setActivities(response.summary.recent_activities || []);
      }
    } catch (error) {
      console.error("Failed to load activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "page_visit":
        return <FiGlobe className="w-4 h-4 text-primary" />;
      case "click":
        return <FiMousePointer className="w-4 h-4 text-secondary" />;
      case "search":
        return <FiSearch className="w-4 h-4 text-accent" />;
      default:
        return <FiFileText className="w-4 h-4 text-text-muted" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "page_visit":
        return "bg-primary bg-opacity-10 text-primary";
      case "click":
        return "bg-secondary bg-opacity-10 text-secondary";
      case "search":
        return "bg-accent bg-opacity-10 text-accent";
      default:
        return "bg-text-muted bg-opacity-10 text-text-muted";
    }
  };

  return (
    <Card
      title="Recent Activities"
      subtitle="Your latest browser interactions"
      className="h-full"
    >
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : activities.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center mx-auto mb-3">
            <FiMousePointer className="w-6 h-6 text-text-muted" />
          </div>
          <p className="text-text-secondary">No recent activities</p>
          <p className="text-sm text-text-muted mt-1">
            Start browsing to see activity here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg border border-border-color hover:bg-bg-secondary transition-colors"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(
                  activity.activity_type
                )}`}
              >
                {getActivityIcon(activity.activity_type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-text-primary">
                    {activity.activity_type.replace("_", " ").toUpperCase()}
                  </p>
                  <span className="text-xs text-text-muted">
                    {utils.formatTime(activity.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-text-secondary truncate mt-1">
                  {activity.url || "Unknown URL"}
                </p>
                {activity.page_title && (
                  <p className="text-xs text-text-muted truncate">
                    {activity.page_title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentActivity;
