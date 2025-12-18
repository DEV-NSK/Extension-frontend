import { api } from './api';
import { getUserId } from './api';

export const dashboardService = {
  getDashboardData: async () => {
    try {
      const userId = getUserId();
      const response = await api.get(`/track/summary/${userId}`);
      
      console.log('Dashboard Service Response:', response.data);
      
      return {
        success: true,
        data: response.data.summary || {},
        raw: response.data
      };
    } catch (error) {
      console.error('Dashboard service error:', error);
      return {
        success: false,
        error: error.message,
        data: {
          total_pages: 0,
          total_interactions: 0,
          total_time_spent: 0,
          unique_domains: 0,
          recent_activities: [],
          daily_activity: [],
          date: new Date().toISOString().split('T')[0]
        }
      };
    }
  },
  
  getRealTimeStats: async () => {
    try {
      // Get today's summary
      const summary = await dashboardService.getDashboardData();
      
      if (!summary.success) {
        return summary;
      }
      
      // Calculate additional stats
      const data = summary.data;
      const today = new Date().toISOString().split('T')[0];
      
      // Calculate page visits for today
      const pageVisits = data.total_pages || 0;
      
      // Calculate interactions (clicks, scrolls, etc.)
      const interactions = data.total_interactions || 0;
      
      // Calculate average time (simplified)
      const avgTime = data.total_time_spent > 0 ? 
        Math.round(data.total_time_spent / (interactions || 1)) : 0;
      
      // Count active days (this week)
      const activeDays = data.daily_activity?.length || 1;
      
      return {
        success: true,
        stats: {
          page_visits: pageVisits,
          interactions: interactions,
          avg_time: avgTime,
          active_days: activeDays,
          unique_domains: data.unique_domains || 0,
          last_updated: new Date().toISOString()
        },
        summary: data
      };
    } catch (error) {
      console.error('Real-time stats error:', error);
      return {
        success: false,
        error: error.message,
        stats: {
          page_visits: 0,
          interactions: 0,
          avg_time: 0,
          active_days: 1,
          unique_domains: 0,
          last_updated: new Date().toISOString()
        }
      };
    }
  }
};