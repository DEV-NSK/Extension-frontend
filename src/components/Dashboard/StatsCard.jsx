
// // // import React, { useEffect, useState } from 'react';
// // // import Card from '../Common/Card';
// // // import { FiActivity, FiEye, FiMessageCircle, FiClock, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
// // // import { trackingService } from '../../services/api';
// // // import '../../styles/global.css';

// // // const StatsCard = ({ type, color = 'primary' }) => {
// // //   const [data, setData] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     loadStatsData();
// // //   }, [type]);

// // //   const loadStatsData = async () => {
// // //     setLoading(true);
// // //     try {
// // //       const response = await trackingService.getDailySummary();
// // //       if (response.success && response.summary) {
// // //         setData(processStatsData(response.summary, type));
// // //       } else {
// // //         setData(getDefaultStats(type));
// // //       }
// // //     } catch (error) {
// // //       console.error('Failed to load stats:', error);
// // //       setData(getDefaultStats(type));
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const processStatsData = (summary, cardType) => {
// // //     const today = new Date().toISOString().split('T')[0];
// // //     const yesterday = new Date();
// // //     yesterday.setDate(yesterday.getDate() - 1);
// // //     const yesterdayStr = yesterday.toISOString().split('T')[0];

// // //     switch (cardType) {
// // //       case 'page_visits':
// // //         const todayVisits = summary.daily_activity?.find(d => d.date === today)?.page_visits || 0;
// // //         const yesterdayVisits = summary.daily_activity?.find(d => d.date === yesterdayStr)?.page_visits || 0;
// // //         return {
// // //           title: 'Page Visits',
// // //           value: todayVisits.toLocaleString(),
// // //           icon: 'eye',
// // //           subtitle: `Today's visits`,
// // //           trend: calculateTrend(todayVisits, yesterdayVisits),
// // //           color: 'primary'
// // //         };

// // //       case 'interactions':
// // //         const todayInteractions = summary.daily_activity?.find(d => d.date === today)?.interactions || 0;
// // //         const yesterdayInteractions = summary.daily_activity?.find(d => d.date === yesterdayStr)?.interactions || 0;
// // //         return {
// // //           title: 'Interactions',
// // //           value: todayInteractions.toLocaleString(),
// // //           icon: 'activity',
// // //           subtitle: 'Clicks, searches, etc.',
// // //           trend: calculateTrend(todayInteractions, yesterdayInteractions),
// // //           color: 'secondary'
// // //         };

// // //       case 'avg_time':
// // //         const totalTime = summary.total_time_spent || 0;
// // //         const totalVisits = summary.total_page_visits || 1;
// // //         const avgTime = Math.round(totalTime / totalVisits);
// // //         return {
// // //           title: 'Avg. Time',
// // //           value: `${avgTime}s`,
// // //           icon: 'clock',
// // //           subtitle: 'Per page visit',
// // //           trend: '+5%',
// // //           color: 'accent'
// // //         };

// // //       case 'active_days':
// // //         const activeDays = summary.daily_activity?.filter(d => d.page_visits > 0).length || 0;
// // //         return {
// // //           title: 'Active Days',
// // //           value: activeDays.toString(),
// // //           icon: 'calendar',
// // //           subtitle: 'This week',
// // //           trend: '+2',
// // //           color: 'success'
// // //         };

// // //       default:
// // //         return getDefaultStats(cardType);
// // //     }
// // //   };

// // //   const calculateTrend = (current, previous) => {
// // //     if (previous === 0) return current > 0 ? '+100%' : '0%';
// // //     const change = ((current - previous) / previous) * 100;
// // //     return `${change >= 0 ? '+' : ''}${Math.round(change)}%`;
// // //   };

// // //   const getDefaultStats = (type) => {
// // //     const defaults = {
// // //       page_visits: { title: 'Page Visits', value: '0', icon: 'eye', subtitle: 'Loading...', trend: '0%' },
// // //       interactions: { title: 'Interactions', value: '0', icon: 'activity', subtitle: 'Loading...', trend: '0%' },
// // //       avg_time: { title: 'Avg. Time', value: '0s', icon: 'clock', subtitle: 'Loading...', trend: '0%' },
// // //       active_days: { title: 'Active Days', value: '0', icon: 'calendar', subtitle: 'Loading...', trend: '0' },
// // //     };
// // //     return defaults[type] || defaults.page_visits;
// // //   };

// // //   const colors = {
// // //     primary: 'from-primary to-primary-dark',
// // //     secondary: 'from-secondary to-purple-600',
// // //     accent: 'from-accent to-cyan-600',
// // //     success: 'from-green-500 to-green-600',
// // //   };

// // //   const icons = {
// // //     activity: FiActivity,
// // //     eye: FiEye,
// // //     message: FiMessageCircle,
// // //     clock: FiClock,
// // //     calendar: FiClock, // Using clock as calendar for now
// // //   };

// // //   const IconComponent = data?.icon ? icons[data.icon] || FiActivity : FiActivity;

// // //   if (loading) {
// // //     return (
// // //       <Card padding={true} hover={true} className="h-full">
// // //         <div className="animate-pulse">
// // //           <div className="flex items-start justify-between">
// // //             <div className="space-y-2 flex-1">
// // //               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
// // //               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
// // //               <div className="h-3 bg-gray-200 rounded w-1/2"></div>
// // //             </div>
// // //             <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
// // //           </div>
// // //         </div>
// // //       </Card>
// // //     );
// // //   }

// // //   return (
// // //     <Card padding={true} hover={true} className="h-full">
// // //       <div className="flex items-start justify-between">
// // //         <div>
// // //           <p className="text-sm text-text-secondary mb-1">{data?.title}</p>
// // //           <h3 className="text-2xl font-bold text-text-primary">{data?.value}</h3>
// // //           {data?.subtitle && <p className="text-xs text-text-muted mt-1">{data.subtitle}</p>}
// // //         </div>
// // //         <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colors[data?.color || color]} flex items-center justify-center`}>
// // //           <IconComponent className="w-6 h-6 text-white" />
// // //         </div>
// // //       </div>
      
// // //       {data?.trend && (
// // //         <div className="flex items-center gap-1 mt-4">
// // //           {data.trend.includes('+') ? (
// // //             <FiTrendingUp className="w-4 h-4 text-green-600" />
// // //           ) : (
// // //             <FiTrendingDown className="w-4 h-4 text-red-600" />
// // //           )}
// // //           <span className={`text-sm font-medium ${data.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
// // //             {data.trend}
// // //           </span>
// // //           <span className="text-xs text-text-muted">from yesterday</span>
// // //         </div>
// // //       )}
// // //     </Card>
// // //   );
// // // };

// // // export default StatsCard;






















// // import React, { useEffect, useState } from 'react';
// // import Card from '../Common/Card';
// // import { 
// //   FiActivity, 
// //   FiEye, 
// //   FiClock, 
// //   FiCalendar,
// //   FiRefreshCw
// // } from 'react-icons/fi';

// // const StatsCard = ({ 
// //   type, 
// //   title, 
// //   subtitle, 
// //   icon, 
// //   color = 'primary'
// // }) => {
// //   const [stats, setStats] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     loadStats();
// //   }, [type]);

// //   const loadStats = async () => {
// //     try {
// //       setLoading(true);
// //       setError(null);
      
// //       console.log(`📊 [StatsCard] Loading ${type} stats...`);
      
// //       // Direct API call to debug
// //       const userId = 'user_1765519329979_hw8enq84q';
// //       const response = await fetch(`http://localhost:5000/api/track/summary/${userId}`);
// //       const data = await response.json();
      
// //       console.log(`📊 [StatsCard] API Response for ${type}:`, data);
      
// //       if (data.success && data.summary) {
// //         const summary = data.summary;
// //         console.log(`📊 [StatsCard] Summary data:`, {
// //           total_pages: summary.total_pages,
// //           total_interactions: summary.total_interactions,
// //           active_days: summary.active_days,
// //           avg_time_per_interaction: summary.avg_time_per_interaction
// //         });
        
// //         const statsData = getStatsFromSummary(summary, type);
// //         console.log(`📊 [StatsCard] Computed stats for ${type}:`, statsData);
// //         setStats(statsData);
// //       } else {
// //         setError('Failed to load data from API');
// //         setStats(getDefaultStats(type));
// //       }
// //     } catch (err) {
// //       console.error(`❌ [StatsCard] Error loading ${type} stats:`, err);
// //       setError(err.message);
// //       setStats(getDefaultStats(type));
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatsFromSummary = (summary, cardType) => {
// //     console.log(`📊 [getStatsFromSummary] Processing ${cardType} with summary:`, summary);
    
// //     switch (cardType) {
// //       case 'page_visits':
// //         const pageVisits = summary.total_pages || 0;
// //         console.log(`📊 [getStatsFromSummary] page_visits: ${pageVisits} (from total_pages: ${summary.total_pages})`);
// //         return {
// //           title: 'Page Visits',
// //           value: pageVisits.toString(),
// //           icon: 'eye',
// //           subtitle: "Today's page views",
// //           trend: pageVisits > 0 ? 'Active' : 'No visits',
// //           color: 'primary'
// //         };

// //       case 'interactions':
// //         const interactions = summary.total_interactions || 0;
// //         console.log(`📊 [getStatsFromSummary] interactions: ${interactions} (from total_interactions: ${summary.total_interactions})`);
// //         return {
// //           title: 'Interactions',
// //           value: interactions.toString(),
// //           icon: 'activity',
// //           subtitle: 'Clicks, scrolls, etc.',
// //           trend: interactions > 0 ? 'Active' : 'No activity',
// //           color: 'secondary'
// //         };

// //       case 'avg_time':
// //         const avgTime = summary.avg_time_per_interaction || 0;
// //         const avgTimeDisplay = avgTime > 0 ? `${Math.round(avgTime)}s` : 'N/A';
// //         console.log(`📊 [getStatsFromSummary] avg_time: ${avgTimeDisplay} (from avg_time_per_interaction: ${summary.avg_time_per_interaction})`);
// //         return {
// //           title: 'Avg. Time',
// //           value: avgTimeDisplay,
// //           icon: 'clock',
// //           subtitle: 'Per interaction',
// //           trend: avgTime > 0 ? 'Active' : 'N/A',
// //           color: 'accent'
// //         };

// //       case 'active_days':
// //         const activeDays = summary.active_days || 1;
// //         console.log(`📊 [getStatsFromSummary] active_days: ${activeDays} (from active_days: ${summary.active_days})`);
// //         return {
// //           title: 'Active Days',
// //           value: activeDays.toString(),
// //           icon: 'calendar',
// //           subtitle: 'This week',
// //           trend: activeDays > 1 ? 'This week' : 'Today',
// //           color: 'success'
// //         };

// //       default:
// //         return getDefaultStats(cardType);
// //     }
// //   };

// //   const getDefaultStats = (type) => {
// //     const defaults = {
// //       page_visits: { 
// //         title: 'Page Visits', 
// //         value: '0', 
// //         icon: 'eye', 
// //         subtitle: 'Today', 
// //         trend: '--' 
// //       },
// //       interactions: { 
// //         title: 'Interactions', 
// //         value: '0', 
// //         icon: 'activity', 
// //         subtitle: 'Today', 
// //         trend: '--' 
// //       },
// //       avg_time: { 
// //         title: 'Avg. Time', 
// //         value: '0s', 
// //         icon: 'clock', 
// //         subtitle: 'Per interaction', 
// //         trend: '--' 
// //       },
// //       active_days: { 
// //         title: 'Active Days', 
// //         value: '1', 
// //         icon: 'calendar', 
// //         subtitle: 'This week', 
// //         trend: '--' 
// //       },
// //     };
// //     return defaults[type] || defaults.page_visits;
// //   };

// //   const colors = {
// //     primary: 'from-blue-500 to-blue-600',
// //     secondary: 'from-purple-500 to-purple-600',
// //     accent: 'from-cyan-500 to-cyan-600',
// //     success: 'from-green-500 to-green-600',
// //   };

// //   const icons = {
// //     activity: FiActivity,
// //     eye: FiEye,
// //     clock: FiClock,
// //     calendar: FiCalendar,
// //   };

// //   if (loading && !stats) {
// //     return (
// //       <Card className="h-full">
// //         <div className="animate-pulse">
// //           <div className="flex items-start justify-between">
// //             <div className="space-y-2 flex-1">
// //               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
// //               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
// //               <div className="h-3 bg-gray-200 rounded w-1/2"></div>
// //             </div>
// //             <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
// //           </div>
// //         </div>
// //       </Card>
// //     );
// //   }

// //   const IconComponent = icons[stats?.icon] || FiActivity;
// //   const gradientClass = colors[stats?.color] || colors.primary;

// //   console.log(`📊 [StatsCard Render] ${type}:`, {
// //     stats,
// //     value: stats?.value,
// //     title: stats?.title
// //   });

// //   return (
// //     <Card className="h-full">
// //       <div className="flex items-start justify-between">
// //         <div className="flex-1 min-w-0">
// //           <p className="text-sm text-gray-500 mb-1 truncate">{stats?.title || 'Loading...'}</p>
// //           <h3 className="text-2xl font-bold text-gray-800 truncate">{stats?.value || '0'}</h3>
// //           {stats?.subtitle && (
// //             <p className="text-xs text-gray-600 mt-1 truncate">{stats.subtitle}</p>
// //           )}
// //         </div>
// //         <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-sm flex-shrink-0 ml-3`}>
// //           <IconComponent className="w-6 h-6 text-white" />
// //         </div>
// //       </div>
      
// //       <div className="flex items-center justify-between mt-4">
// //         <div className="flex items-center gap-1">
// //           <span className={`text-xs px-2 py-1 rounded-full ${
// //             stats?.trend === 'Active' || stats?.trend === 'Today' || stats?.trend === 'This week'
// //               ? 'bg-blue-100 text-blue-600' 
// //               : 'bg-gray-100 text-gray-600'
// //           }`}>
// //             {stats?.trend || '--'}
// //           </span>
// //         </div>
// //         <button 
// //           onClick={loadStats}
// //           className="text-gray-400 hover:text-blue-600 transition-colors"
// //           title="Refresh"
// //         >
// //           <FiRefreshCw className="w-4 h-4" />
// //         </button>
// //       </div>
      
// //       {error && (
// //         <p className="text-xs text-red-500 mt-2 truncate">Error: {error}</p>
// //       )}
// //     </Card>
// //   );
// // };

// // export default StatsCard;
















// import React, { useEffect, useState } from 'react';
// import Card from '../Common/Card';
// import { 
//   FiActivity, 
//   FiEye, 
//   FiClock, 
//   FiCalendar,
//   FiRefreshCw
// } from 'react-icons/fi';
// import { trackingService } from '../../services/api';

// const StatsCard = ({ type }) => {
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     loadStats();
//   }, [type]);

//   const loadStats = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       console.log(`📊 [StatsCard] Loading ${type} stats...`);
      
//       const response = await trackingService.getDailySummary();
      
//       console.log(`📊 [StatsCard] API Response for ${type}:`, {
//         success: response.success,
//         summary: response.summary,
//         user_id: response.user_id
//       });
      
//       if (response.success && response.summary) {
//         const summary = response.summary;
//         console.log(`📊 [StatsCard] Summary data for ${type}:`, {
//           total_pages: summary.total_pages,
//           page_visits: summary.page_visits,
//           total_interactions: summary.total_interactions,
//           interactions: summary.interactions,
//           active_days: summary.active_days,
//           avg_time_per_interaction: summary.avg_time_per_interaction
//         });
        
//         const statsData = getStatsFromSummary(summary, type);
//         console.log(`📊 [StatsCard] Computed stats for ${type}:`, statsData);
//         setStats(statsData);
//       } else {
//         setError(response.error || 'Failed to load data from API');
//         setStats(getDefaultStats(type));
//       }
//     } catch (err) {
//       console.error(`❌ [StatsCard] Error loading ${type} stats:`, err);
//       setError(err.message);
//       setStats(getDefaultStats(type));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatsFromSummary = (summary, cardType) => {
//     console.log(`📊 [getStatsFromSummary] Processing ${cardType} with summary:`, summary);
    
//     switch (cardType) {
//       case 'page_visits':
//         // Use both fields to ensure we get the data
//         const pageVisits = summary.total_pages || summary.page_visits || 0;
//         console.log(`📊 [getStatsFromSummary] page_visits calculated: ${pageVisits} (from total_pages: ${summary.total_pages}, page_visits: ${summary.page_visits})`);
//         return {
//           title: 'Page Visits',
//           value: pageVisits.toString(),
//           icon: 'eye',
//           subtitle: "Pages visited today",
//           trend: pageVisits > 0 ? `+${pageVisits} today` : 'No visits yet',
//           color: 'primary'
//         };

//       case 'interactions':
//         // Use both fields to ensure we get the data
//         const interactions = summary.total_interactions || summary.interactions || 0;
//         console.log(`📊 [getStatsFromSummary] interactions calculated: ${interactions} (from total_interactions: ${summary.total_interactions}, interactions: ${summary.interactions})`);
//         return {
//           title: 'Interactions',
//           value: interactions.toString(),
//           icon: 'activity',
//           subtitle: 'Clicks, scrolls, etc.',
//           trend: interactions > 0 ? `+${interactions} today` : 'No activity yet',
//           color: 'secondary'
//         };

//       case 'avg_time':
//         const avgTime = summary.avg_time_per_interaction || 0;
//         const avgTimeDisplay = avgTime > 0 ? `${Math.round(avgTime)}s` : '0s';
//         console.log(`📊 [getStatsFromSummary] avg_time calculated: ${avgTimeDisplay} (from avg_time_per_interaction: ${summary.avg_time_per_interaction})`);
//         const timeTrend = avgTime > 0 ? 
//           (avgTime > 60 ? 'High engagement' : 'Normal engagement') : 
//           'No data';
//         return {
//           title: 'Avg. Time',
//           value: avgTimeDisplay,
//           icon: 'clock',
//           subtitle: 'Per interaction',
//           trend: timeTrend,
//           color: 'accent'
//         };

//       case 'active_days':
//         const activeDays = summary.active_days || 1;
//         console.log(`📊 [getStatsFromSummary] active_days: ${activeDays} (from active_days: ${summary.active_days})`);
//         const dayTrend = activeDays > 3 ? 
//           'Very active week' : 
//           activeDays > 1 ? 'Active week' : 'Today only';
//         return {
//           title: 'Active Days',
//           value: activeDays.toString(),
//           icon: 'calendar',
//           subtitle: 'Last 7 days',
//           trend: dayTrend,
//           color: 'success'
//         };

//       default:
//         return getDefaultStats(cardType);
//     }
//   };

//   const getDefaultStats = (type) => {
//     const defaults = {
//       page_visits: { 
//         title: 'Page Visits', 
//         value: '0', 
//         icon: 'eye', 
//         subtitle: 'Pages visited today', 
//         trend: 'No data' 
//       },
//       interactions: { 
//         title: 'Interactions', 
//         value: '0', 
//         icon: 'activity', 
//         subtitle: 'Clicks, scrolls, etc.', 
//         trend: 'No data' 
//       },
//       avg_time: { 
//         title: 'Avg. Time', 
//         value: '0s', 
//         icon: 'clock', 
//         subtitle: 'Per interaction', 
//         trend: 'No data' 
//       },
//       active_days: { 
//         title: 'Active Days', 
//         value: '1', 
//         icon: 'calendar', 
//         subtitle: 'Last 7 days', 
//         trend: 'No data' 
//       },
//     };
//     return defaults[type] || defaults.page_visits;
//   };

//   const colors = {
//     primary: 'from-blue-500 to-blue-600',
//     secondary: 'from-purple-500 to-purple-600',
//     accent: 'from-cyan-500 to-cyan-600',
//     success: 'from-green-500 to-green-600',
//   };

//   const icons = {
//     activity: FiActivity,
//     eye: FiEye,
//     clock: FiClock,
//     calendar: FiCalendar,
//   };

//   if (loading && !stats) {
//     return (
//       <Card className="h-full">
//         <div className="animate-pulse">
//           <div className="flex items-start justify-between">
//             <div className="space-y-2 flex-1">
//               <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//               <div className="h-8 bg-gray-200 rounded w-3/4"></div>
//               <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//             </div>
//             <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
//           </div>
//         </div>
//       </Card>
//     );
//   }

//   const IconComponent = icons[stats?.icon] || FiActivity;
//   const gradientClass = colors[stats?.color] || colors.primary;

//   console.log(`📊 [StatsCard Render] ${type}:`, {
//     stats,
//     value: stats?.value,
//     title: stats?.title,
//     loading,
//     error
//   });

//   return (
//     <Card className="h-full">
//       <div className="flex items-start justify-between">
//         <div className="flex-1 min-w-0">
//           <p className="text-sm text-gray-500 mb-1 truncate">{stats?.title || 'Loading...'}</p>
//           <h3 className="text-2xl font-bold text-gray-800 truncate">{stats?.value || '0'}</h3>
//           {stats?.subtitle && (
//             <p className="text-xs text-gray-600 mt-1 truncate">{stats.subtitle}</p>
//           )}
//         </div>
//         <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-sm flex-shrink-0 ml-3`}>
//           <IconComponent className="w-6 h-6 text-white" />
//         </div>
//       </div>
      
//       <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center gap-1">
//           <span className={`text-xs px-2 py-1 rounded-full ${
//             stats?.trend?.includes('today') || stats?.trend?.includes('active') || stats?.trend?.includes('week')
//               ? 'bg-blue-100 text-blue-600' 
//               : stats?.trend === 'No data'
//               ? 'bg-gray-100 text-gray-600'
//               : 'bg-green-100 text-green-600'
//           }`}>
//             {stats?.trend || 'No data'}
//           </span>
//         </div>
//         <button 
//           onClick={loadStats}
//           className="text-gray-400 hover:text-blue-600 transition-colors"
//           title="Refresh"
//         >
//           <FiRefreshCw className="w-4 h-4" />
//         </button>
//       </div>
      
//       {error && (
//         <div className="mt-2 text-xs">
//           <p className="text-red-500 truncate">Error: {error}</p>
//           <button 
//             onClick={loadStats}
//             className="text-blue-500 hover:text-blue-700 mt-1"
//           >
//             Retry
//           </button>
//         </div>
//       )}
//     </Card>
//   );
// };

// export default StatsCard;



















import React, { useEffect, useState } from 'react';
import Card from '../Common/Card';
import { 
  FiActivity, 
  FiEye, 
  FiClock, 
  FiCalendar,
  FiRefreshCw,
  FiInfo
} from 'react-icons/fi';
import { trackingService, utils } from '../../services/api';

const StatsCard = ({ type }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStats();
  }, [type]);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`📊 [StatsCard] Loading ${type} stats...`);
      
      const response = await trackingService.getDailySummary();
      
      console.log(`📊 [StatsCard] API Response for ${type}:`, {
        success: response.success,
        summary: response.summary,
        debug_info: response.debug_info
      });
      
      if (response.success && response.summary) {
        const summary = response.summary;
        console.log(`📊 [StatsCard] Summary data for ${type}:`, {
          date: summary.date,
          is_today: summary.is_today,
          total_pages: summary.total_pages,
          page_visits: summary.page_visits,
          total_interactions: summary.total_interactions,
          interactions: summary.interactions,
          active_days: summary.active_days,
          avg_time_per_interaction: summary.avg_time_per_interaction,
          recent_activities_count: summary.recent_activities?.length || 0
        });
        
        const statsData = getStatsFromSummary(summary, type);
        console.log(`📊 [StatsCard] Computed stats for ${type}:`, statsData);
        setStats(statsData);
      } else {
        setError(response.error || 'Failed to load data from API');
        setStats(getDefaultStats(type));
      }
    } catch (err) {
      console.error(`❌ [StatsCard] Error loading ${type} stats:`, err);
      setError(err.message);
      setStats(getDefaultStats(type));
    } finally {
      setLoading(false);
    }
  };

  const getStatsFromSummary = (summary, cardType) => {
    console.log(`📊 [getStatsFromSummary] Processing ${cardType} with summary:`, {
      date: summary.date,
      is_today: summary.is_today,
      total_pages: summary.total_pages,
      page_visits: summary.page_visits,
      total_interactions: summary.total_interactions,
      interactions: summary.interactions
    });
    
    // Determine date label
    const isToday = summary.is_today === true;
    const dateLabel = utils.formatDateRelative(summary.date);
    const subtitleDate = isToday ? "today" : dateLabel.toLowerCase();
    
    switch (cardType) {
      case 'page_visits':
        // Use both fields to ensure we get the data
        const pageVisits = summary.total_pages || summary.page_visits || 0;
        console.log(`📊 [getStatsFromSummary] page_visits calculated: ${pageVisits} (from total_pages: ${summary.total_pages}, page_visits: ${summary.page_visits})`);
        return {
          title: 'Page Visits',
          value: pageVisits.toString(),
          icon: 'eye',
          subtitle: `Pages visited ${subtitleDate}`,
          trend: pageVisits > 0 ? `+${pageVisits} ${subtitleDate}` : `No visits ${subtitleDate}`,
          color: 'primary',
          isToday: isToday,
          date: summary.date
        };

      case 'interactions':
        // Use both fields to ensure we get the data
        const interactions = summary.total_interactions || summary.interactions || 0;
        console.log(`📊 [getStatsFromSummary] interactions calculated: ${interactions} (from total_interactions: ${summary.total_interactions}, interactions: ${summary.interactions})`);
        return {
          title: 'Interactions',
          value: interactions.toString(),
          icon: 'activity',
          subtitle: `Clicks, scrolls, etc. ${subtitleDate}`,
          trend: interactions > 0 ? `+${interactions} ${subtitleDate}` : `No activity ${subtitleDate}`,
          color: 'secondary',
          isToday: isToday,
          date: summary.date
        };

      case 'avg_time':
        const avgTime = summary.avg_time_per_interaction || 0;
        const avgTimeDisplay = avgTime > 0 ? `${Math.round(avgTime)}s` : '0s';
        console.log(`📊 [getStatsFromSummary] avg_time calculated: ${avgTimeDisplay} (from avg_time_per_interaction: ${summary.avg_time_per_interaction})`);
        const timeTrend = avgTime > 0 ? 
          (avgTime > 60 ? 'High engagement' : 'Normal engagement') : 
          'No data';
        return {
          title: 'Avg. Time',
          value: avgTimeDisplay,
          icon: 'clock',
          subtitle: `Per interaction ${subtitleDate}`,
          trend: timeTrend,
          color: 'accent',
          isToday: isToday,
          date: summary.date
        };

      case 'active_days':
        const activeDays = summary.active_days || 1;
        console.log(`📊 [getStatsFromSummary] active_days: ${activeDays} (from active_days: ${summary.active_days})`);
        const dayTrend = activeDays > 3 ? 
          'Very active week' : 
          activeDays > 1 ? 'Active week' : 'Started recently';
        return {
          title: 'Active Days',
          value: activeDays.toString(),
          icon: 'calendar',
          subtitle: 'Last 7 days',
          trend: dayTrend,
          color: 'success',
          isToday: isToday,
          date: summary.date
        };

      default:
        return getDefaultStats(cardType);
    }
  };

  const getDefaultStats = (type) => {
    const defaults = {
      page_visits: { 
        title: 'Page Visits', 
        value: '0', 
        icon: 'eye', 
        subtitle: 'Pages visited today', 
        trend: 'No data',
        isToday: true,
        date: new Date().toISOString().split('T')[0]
      },
      interactions: { 
        title: 'Interactions', 
        value: '0', 
        icon: 'activity', 
        subtitle: 'Clicks, scrolls, etc.', 
        trend: 'No data',
        isToday: true,
        date: new Date().toISOString().split('T')[0]
      },
      avg_time: { 
        title: 'Avg. Time', 
        value: '0s', 
        icon: 'clock', 
        subtitle: 'Per interaction', 
        trend: 'No data',
        isToday: true,
        date: new Date().toISOString().split('T')[0]
      },
      active_days: { 
        title: 'Active Days', 
        value: '1', 
        icon: 'calendar', 
        subtitle: 'Last 7 days', 
        trend: 'No data',
        isToday: true,
        date: new Date().toISOString().split('T')[0]
      },
    };
    return defaults[type] || defaults.page_visits;
  };

  const colors = {
    primary: 'from-blue-500 to-blue-600',
    secondary: 'from-purple-500 to-purple-600',
    accent: 'from-cyan-500 to-cyan-600',
    success: 'from-green-500 to-green-600',
  };

  const icons = {
    activity: FiActivity,
    eye: FiEye,
    clock: FiClock,
    calendar: FiCalendar,
  };

  if (loading && !stats) {
    return (
      <Card className="h-full">
        <div className="animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </Card>
    );
  }

  const IconComponent = icons[stats?.icon] || FiActivity;
  const gradientClass = colors[stats?.color] || colors.primary;

  console.log(`📊 [StatsCard Render] ${type}:`, {
    stats,
    value: stats?.value,
    title: stats?.title,
    isToday: stats?.isToday,
    loading,
    error
  });

  return (
    <Card className="h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-500 mb-1 truncate">{stats?.title || 'Loading...'}</p>
          <h3 className="text-2xl font-bold text-gray-800 truncate">{stats?.value || '0'}</h3>
          {stats?.subtitle && (
            <p className="text-xs text-gray-600 mt-1 truncate">{stats.subtitle}</p>
          )}
          
          {/* Show historical data indicator */}
          {stats && !stats.isToday && (
            <div className="flex items-center gap-1 mt-1">
              <FiInfo className="w-3 h-3 text-amber-500" />
              <span className="text-xs text-amber-600">
                Showing {utils.formatDateRelative(stats.date)} data
              </span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center shadow-sm flex-shrink-0 ml-3`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1">
          <span className={`text-xs px-2 py-1 rounded-full ${
            stats?.trend?.includes('today') || stats?.trend?.includes('active') || stats?.trend?.includes('week') || stats?.trend?.includes('yesterday')
              ? 'bg-blue-100 text-blue-600' 
              : stats?.trend === 'No data' || stats?.trend?.includes('No visits') || stats?.trend?.includes('No activity')
              ? 'bg-gray-100 text-gray-600'
              : 'bg-green-100 text-green-600'
          }`}>
            {stats?.trend || 'No data'}
          </span>
        </div>
        <button 
          onClick={loadStats}
          disabled={loading}
          className="text-gray-400 hover:text-blue-600 transition-colors disabled:opacity-50"
          title="Refresh"
        >
          <FiRefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {error && (
        <div className="mt-2 text-xs">
          <p className="text-red-500 truncate">Error: {error}</p>
          <button 
            onClick={loadStats}
            className="text-blue-500 hover:text-blue-700 mt-1 text-xs"
          >
            Retry
          </button>
        </div>
      )}
      
      {/* Debug info (only in development) */}
      {import.meta.env.DEV && stats && (
        <div className="mt-2 text-xs text-gray-400">
          <p>Date: {stats.date}</p>
          <p>Is Today: {stats.isToday ? 'Yes' : 'No'}</p>
        </div>
      )}
    </Card>
  );
};

export default StatsCard;