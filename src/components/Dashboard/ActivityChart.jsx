
// // import React, { useState, useEffect } from 'react';
// // import { Line } from 'react-chartjs-2';
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   Filler,
// // } from 'chart.js';
// // import Card from '../Common/Card';
// // import { trackingService } from '../../services/api';
// // import '../../styles/global.css';

// // ChartJS.register(
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// //   Filler
// // );

// // const ActivityChart = () => {
// //   const [chartData, setChartData] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadActivityData();
// //   }, []);

// //   const loadActivityData = async () => {
// //     try {
// //       const response = await trackingService.getDailySummary();
      
// //       if (response.success && response.summary) {
// //         // Process weekly data from the backend
// //         const weeklyData = processWeeklyData(response.summary);
// //         setChartData(weeklyData);
// //       } else {
// //         // Fallback to default empty data structure
// //         setChartData(getDefaultChartData());
// //       }
// //     } catch (error) {
// //       console.error('Failed to load activity data:', error);
// //       setChartData(getDefaultChartData());
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const processWeeklyData = (summary) => {
// //     // Get last 7 days of activity
// //     const last7Days = getLast7Days();
    
// //     // Process page visits data
// //     const pageVisits = last7Days.map(day => {
// //       const dayData = summary.daily_activity?.find(d => 
// //         new Date(d.date).toDateString() === day.date.toDateString()
// //       );
// //       return dayData?.page_visits || 0;
// //     });

// //     // Process interactions data
// //     const interactions = last7Days.map(day => {
// //       const dayData = summary.daily_activity?.find(d => 
// //         new Date(d.date).toDateString() === day.date.toDateString()
// //       );
// //       return dayData?.interactions || 0;
// //     });

// //     return {
// //       labels: last7Days.map(day => day.label),
// //       datasets: [
// //         {
// //           label: 'Page Visits',
// //           data: pageVisits,
// //           borderColor: '#2563eb',
// //           backgroundColor: 'rgba(37, 99, 235, 0.1)',
// //           fill: true,
// //           tension: 0.4,
// //         },
// //         {
// //           label: 'Interactions',
// //           data: interactions,
// //           borderColor: '#7c3aed',
// //           backgroundColor: 'rgba(124, 58, 237, 0.1)',
// //           fill: true,
// //           tension: 0.4,
// //         },
// //       ],
// //     };
// //   };

// //   const getLast7Days = () => {
// //     const days = [];
// //     for (let i = 6; i >= 0; i--) {
// //       const date = new Date();
// //       date.setDate(date.getDate() - i);
// //       days.push({
// //         date,
// //         label: date.toLocaleDateString('en-US', { weekday: 'short' })
// //       });
// //     }
// //     return days;
// //   };

// //   const getDefaultChartData = () => {
// //     const last7Days = getLast7Days();
// //     return {
// //       labels: last7Days.map(day => day.label),
// //       datasets: [
// //         {
// //           label: 'Page Visits',
// //           data: [0, 0, 0, 0, 0, 0, 0],
// //           borderColor: '#2563eb',
// //           backgroundColor: 'rgba(37, 99, 235, 0.1)',
// //           fill: true,
// //           tension: 0.4,
// //         },
// //         {
// //           label: 'Interactions',
// //           data: [0, 0, 0, 0, 0, 0, 0],
// //           borderColor: '#7c3aed',
// //           backgroundColor: 'rgba(124, 58, 237, 0.1)',
// //           fill: true,
// //           tension: 0.4,
// //         },
// //       ],
// //     };
// //   };

// //   const options = {
// //     responsive: true,
// //     maintainAspectRatio: false,
// //     plugins: {
// //       legend: {
// //         position: 'top',
// //         labels: {
// //           color: 'var(--text-secondary)',
// //           padding: 20,
// //           usePointStyle: true,
// //         },
// //       },
// //       tooltip: {
// //         mode: 'index',
// //         intersect: false,
// //         backgroundColor: 'var(--bg-primary)',
// //         titleColor: 'var(--text-primary)',
// //         bodyColor: 'var(--text-primary)',
// //         borderColor: 'var(--border-color)',
// //         borderWidth: 1,
// //         callbacks: {
// //           label: (context) => {
// //             return `${context.dataset.label}: ${context.raw}`;
// //           }
// //         }
// //       },
// //     },
// //     scales: {
// //       x: {
// //         grid: {
// //           color: 'var(--border-color)',
// //         },
// //         ticks: {
// //           color: 'var(--text-secondary)',
// //         },
// //       },
// //       y: {
// //         grid: {
// //           color: 'var(--border-color)',
// //         },
// //         ticks: {
// //           color: 'var(--text-secondary)',
// //           callback: (value) => Number.isInteger(value) ? value : '',
// //         },
// //         beginAtZero: true,
// //       },
// //     },
// //   };

// //   if (loading) {
// //     return (
// //       <Card title="Weekly Activity" subtitle="Loading activity data..." className="h-full">
// //         <div className="h-64 flex items-center justify-center">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //         </div>
// //       </Card>
// //     );
// //   }

// //   return (
// //     <Card title="Weekly Activity" subtitle="Page visits and interactions over the last 7 days" className="h-full">
// //       <div className="h-64">
// //         {chartData ? (
// //           <Line data={chartData} options={options} />
// //         ) : (
// //           <div className="h-full flex items-center justify-center text-text-secondary">
// //             No activity data available
// //           </div>
// //         )}
// //       </div>
// //     </Card>
// //   );
// // };

// // export default ActivityChart;


























// import React, { useState, useEffect } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from 'chart.js';
// import Card from '../Common/Card';
// import { trackingService } from '../../services/api';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const ActivityChart = ({ refreshTrigger }) => {
//   const [chartData, setChartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d

//   useEffect(() => {
//     loadActivityData();
//   }, [timeRange, refreshTrigger]);

//   const loadActivityData = async () => {
//     setLoading(true);
//     try {
//       console.log('📊 [ActivityChart] Loading chart data...');
//       const response = await trackingService.getDailySummary();
      
//       if (response.success && response.summary) {
//         console.log('📊 [ActivityChart] Summary received:', response.summary);
//         const processedData = processChartData(response.summary, timeRange);
//         console.log('📊 [ActivityChart] Processed chart data:', processedData);
//         setChartData(processedData);
//       } else {
//         console.warn('📊 [ActivityChart] No summary data, using sample');
//         setChartData(generateSampleChartData());
//       }
//     } catch (error) {
//       console.error('📊 [ActivityChart] Failed to load activity data:', error);
//       setChartData(generateSampleChartData());
//     } finally {
//       setLoading(false);
//     }
//   };

//   const processChartData = (summary, range) => {
//     const days = range === '7d' ? 7 : 30;
//     const labels = getDateLabels(days);
    
//     console.log('📊 [ActivityChart] Processing chart data with summary:', {
//       daily_activity: summary.daily_activity,
//       total_pages: summary.total_pages,
//       total_interactions: summary.total_interactions
//     });
    
//     // Get real data from daily_activity if available
//     const dailyActivity = summary.daily_activity || [];
    
//     // Initialize arrays with zeros
//     const pageVisitsData = new Array(days).fill(0);
//     const interactionsData = new Array(days).fill(0);
    
//     // Fill chart data from daily_activity array
//     dailyActivity.forEach((day, index) => {
//       if (index < days) {
//         pageVisitsData[index] = day.page_visits || 0;
//         interactionsData[index] = day.interactions || 0;
//       }
//     });
    
//     // If all zeros (no historical data), show today's data on the last day
//     const hasHistoricalData = pageVisitsData.some(val => val > 0) || interactionsData.some(val => val > 0);
    
//     if (!hasHistoricalData) {
//       // Use today's totals for the last day
//       if (summary.total_pages > 0) {
//         pageVisitsData[days - 1] = summary.total_pages;
//       }
//       if (summary.total_interactions > 0) {
//         interactionsData[days - 1] = summary.total_interactions;
//       }
//     }
    
//     console.log('📊 [ActivityChart] Final chart data:', {
//       labels,
//       pageVisitsData,
//       interactionsData,
//       hasHistoricalData
//     });
    
//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Page Visits',
//           data: pageVisitsData,
//           borderColor: '#3b82f6', // Blue-500
//           backgroundColor: 'rgba(59, 130, 246, 0.1)',
//           borderWidth: 2,
//           fill: true,
//           tension: 0.3,
//           pointBackgroundColor: '#3b82f6',
//           pointBorderColor: '#ffffff',
//           pointBorderWidth: 2,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//         {
//           label: 'Interactions',
//           data: interactionsData,
//           borderColor: '#8b5cf6', // Violet-500
//           backgroundColor: 'rgba(139, 92, 246, 0.1)',
//           borderWidth: 2,
//           fill: true,
//           tension: 0.3,
//           pointBackgroundColor: '#8b5cf6',
//           pointBorderColor: '#ffffff',
//           pointBorderWidth: 2,
//           pointRadius: 4,
//           pointHoverRadius: 6,
//         },
//       ],
//     };
//   };

//   const getDateLabels = (days) => {
//     const labels = [];
//     const today = new Date();
    
//     for (let i = days - 1; i >= 0; i--) {
//       const date = new Date(today);
//       date.setDate(date.getDate() - i);
      
//       if (days === 7) {
//         // For 7-day view: Mon, Tue, Wed...
//         labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
//       } else {
//         // For 30-day view: Dec 1, Dec 2...
//         labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
//       }
//     }
//     return labels;
//   };

//   const generateSampleChartData = () => {
//     const days = timeRange === '7d' ? 7 : 30;
//     const labels = getDateLabels(days);
    
//     const generateData = () => {
//       const data = [];
//       for (let i = 0; i < days; i++) {
//         // Generate random but decreasing data
//         const value = Math.max(5, Math.floor(Math.random() * 50 * (days - i) / days));
//         data.push(value);
//       }
//       return data;
//     };
    
//     return {
//       labels,
//       datasets: [
//         {
//           label: 'Page Visits',
//           data: generateData(),
//           borderColor: '#3b82f6',
//           backgroundColor: 'rgba(59, 130, 246, 0.1)',
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4,
//         },
//         {
//           label: 'Interactions',
//           data: generateData(),
//           borderColor: '#8b5cf6',
//           backgroundColor: 'rgba(139, 92, 246, 0.1)',
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4,
//         },
//       ],
//     };
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: 'index',
//       intersect: false,
//     },
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: '#6b7280',
//           padding: 20,
//           usePointStyle: true,
//           font: {
//             size: 12,
//           },
//         },
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         backgroundColor: 'rgba(255, 255, 255, 0.95)',
//         titleColor: '#1f2937',
//         bodyColor: '#4b5563',
//         borderColor: '#e5e7eb',
//         borderWidth: 1,
//         padding: 12,
//         boxPadding: 4,
//         callbacks: {
//           label: (context) => {
//             return `${context.dataset.label}: ${context.raw}`;
//           }
//         }
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: '#f3f4f6',
//         },
//         ticks: {
//           color: '#6b7280',
//           font: {
//             size: 11,
//           },
//         },
//       },
//       y: {
//         grid: {
//           color: '#f3f4f6',
//         },
//         ticks: {
//           color: '#6b7280',
//           callback: (value) => Number.isInteger(value) ? value : '',
//           font: {
//             size: 11,
//           },
//         },
//         beginAtZero: true,
//         suggestedMax: (context) => {
//           const maxValue = Math.max(...context.chart.data.datasets.flatMap(d => d.data));
//           return Math.ceil(maxValue * 1.2); // Add 20% padding
//         }
//       },
//     },
//   };

//   return (
//     <Card 
//       title="Activity Overview" 
//       subtitle="Page visits and interactions over time"
//       className="h-full"
//       headerAction={
//         <div className="flex items-center gap-2">
//           <div className="flex space-x-1">
//             <button
//               onClick={() => setTimeRange('7d')}
//               className={`px-3 py-1 text-sm rounded-lg ${timeRange === '7d' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               7D
//             </button>
//             <button
//               onClick={() => setTimeRange('30d')}
//               className={`px-3 py-1 text-sm rounded-lg ${timeRange === '30d' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
//             >
//               30D
//             </button>
//           </div>
//           <button
//             onClick={loadActivityData}
//             disabled={loading}
//             className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//             title="Refresh chart"
//           >
//             <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//             </svg>
//           </button>
//         </div>
//       }
//     >
//       <div className="h-64">
//         {loading ? (
//           <div className="h-full flex flex-col items-center justify-center">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
//             <p className="text-sm text-gray-500">Loading chart data...</p>
//           </div>
//         ) : chartData ? (
//           <>
//             <Line data={chartData} options={options} />
//             <div className="mt-2 text-xs text-gray-500 text-center">
//               {chartData.datasets[0].data.every(val => val === 0) && chartData.datasets[1].data.every(val => val === 0) 
//                 ? "No historical data available. Showing sample data."
//                 : `Showing ${timeRange === '7d' ? '7-day' : '30-day'} activity history`
//               }
//             </div>
//           </>
//         ) : (
//           <div className="h-full flex flex-col items-center justify-center text-gray-500">
//             <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//               </svg>
//             </div>
//             <p>No activity data available</p>
//             <button 
//               onClick={loadActivityData}
//               className="mt-2 text-sm text-blue-600 hover:text-blue-800"
//             >
//               Try loading again
//             </button>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default ActivityChart;























import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import Card from '../Common/Card';
import { trackingService } from '../../services/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ActivityChart = ({ refreshTrigger }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    loadActivityData();
  }, [timeRange, refreshTrigger]);

  const loadActivityData = async () => {
    setLoading(true);
    try {
      console.log('📊 [ActivityChart] Loading chart data...');
      const response = await trackingService.getDailySummary();
      
      if (response.success && response.summary) {
        console.log('📊 [ActivityChart] Summary received:', {
          daily_activity: response.summary.daily_activity,
          total_pages: response.summary.total_pages,
          page_visits: response.summary.page_visits,
          total_interactions: response.summary.total_interactions,
          interactions: response.summary.interactions
        });
        
        const processedData = processChartData(response.summary, timeRange);
        console.log('📊 [ActivityChart] Processed chart data:', {
          labels: processedData.labels,
          pageVisitsData: processedData.datasets[0].data,
          interactionsData: processedData.datasets[1].data,
          hasRealData: processedData.hasRealData
        });
        
        setChartData(processedData);
        setHasData(processedData.hasRealData);
      } else {
        console.warn('📊 [ActivityChart] No summary data, using sample');
        const sampleData = generateSampleChartData();
        setChartData(sampleData);
        setHasData(false);
      }
    } catch (error) {
      console.error('📊 [ActivityChart] Failed to load activity data:', error);
      const sampleData = generateSampleChartData();
      setChartData(sampleData);
      setHasData(false);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (summary, range) => {
    const days = range === '7d' ? 7 : 30;
    const labels = getDateLabels(days);
    
    console.log('📊 [ActivityChart] Processing chart data with summary:', {
      daily_activity: summary.daily_activity,
      total_pages: summary.total_pages,
      total_interactions: summary.total_interactions
    });
    
    // Get daily activity data or initialize empty
    const dailyActivity = summary.daily_activity || [];
    let hasRealData = false;
    
    // Initialize arrays with zeros
    const pageVisitsData = new Array(days).fill(0);
    const interactionsData = new Array(days).fill(0);
    
    // If we have daily activity data, use it
    if (dailyActivity.length > 0) {
      console.log(`📊 [ActivityChart] Found ${dailyActivity.length} days of historical data`);
      
      // Fill chart data from daily_activity array
      dailyActivity.forEach((day, index) => {
        if (index < days) {
          const pageVisits = day.page_visits || 0;
          const interactions = day.interactions || 0;
          
          pageVisitsData[index] = pageVisits;
          interactionsData[index] = interactions;
          
          if (pageVisits > 0 || interactions > 0) {
            hasRealData = true;
          }
        }
      });
    }
    
    // If no historical data but we have today's totals, add them to today
    if (!hasRealData && (summary.total_pages > 0 || summary.total_interactions > 0)) {
      console.log('📊 [ActivityChart] Using today\'s totals for chart');
      
      // Add today's data to the last position (most recent day)
      pageVisitsData[days - 1] = summary.total_pages || summary.page_visits || 0;
      interactionsData[days - 1] = summary.total_interactions || summary.interactions || 0;
      
      if (pageVisitsData[days - 1] > 0 || interactionsData[days - 1] > 0) {
        hasRealData = true;
      }
    }
    
    console.log('📊 [ActivityChart] Final chart data:', {
      labels,
      pageVisitsData,
      interactionsData,
      hasRealData
    });
    
    return {
      labels,
      datasets: [
        {
          label: 'Page Visits',
          data: pageVisitsData,
          borderColor: '#3b82f6', // Blue-500
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#3b82f6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: hasRealData ? 4 : 0,
          pointHoverRadius: hasRealData ? 6 : 0,
        },
        {
          label: 'Interactions',
          data: interactionsData,
          borderColor: '#8b5cf6', // Violet-500
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.3,
          pointBackgroundColor: '#8b5cf6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: hasRealData ? 4 : 0,
          pointHoverRadius: hasRealData ? 6 : 0,
        },
      ],
      hasRealData
    };
  };

  const getDateLabels = (days) => {
    const labels = [];
    const today = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      if (days === 7) {
        // For 7-day view: Mon, Tue, Wed...
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      } else {
        // For 30-day view: Dec 1, Dec 2...
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
    }
    return labels;
  };

  const generateSampleChartData = () => {
    const days = timeRange === '7d' ? 7 : 30;
    const labels = getDateLabels(days);
    
    const generateData = () => {
      const data = [];
      for (let i = 0; i < days; i++) {
        // Generate random but decreasing data
        const value = Math.max(5, Math.floor(Math.random() * 50 * (days - i) / days));
        data.push(value);
      }
      return data;
    };
    
    return {
      labels,
      datasets: [
        {
          label: 'Page Visits',
          data: generateData(),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
        {
          label: 'Interactions',
          data: generateData(),
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
      hasRealData: false
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#6b7280',
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        boxPadding: 4,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: ${context.raw}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
        },
        ticks: {
          color: '#6b7280',
          callback: (value) => Number.isInteger(value) ? value : '',
          font: {
            size: 11,
          },
        },
        beginAtZero: true,
        suggestedMax: (context) => {
          const values = context.chart.data.datasets.flatMap(d => d.data);
          const maxValue = Math.max(...values);
          return maxValue > 0 ? Math.ceil(maxValue * 1.2) : 10;
        }
      },
    },
  };

  return (
    <Card 
      title="Activity Overview" 
      subtitle="Page visits and interactions over time"
      className="h-full"
      headerAction={
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === '7d' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-sm rounded-lg ${timeRange === '30d' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              30D
            </button>
          </div>
          <button
            onClick={loadActivityData}
            disabled={loading}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Refresh chart"
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      }
    >
      <div className="h-64">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
            <p className="text-sm text-gray-500">Loading chart data...</p>
          </div>
        ) : chartData ? (
          <>
            <Line data={chartData} options={options} />
            <div className="mt-2 text-xs text-gray-500 text-center">
              {!hasData 
                ? "No historical data available. Start browsing to see real data here."
                : `Showing ${timeRange === '7d' ? '7-day' : '30-day'} activity history`
              }
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p>No activity data available</p>
            <button 
              onClick={loadActivityData}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              Try loading again
            </button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ActivityChart;