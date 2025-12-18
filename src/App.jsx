// import React, { useState, useEffect } from 'react';
// import ChatWindow from './components/Chat/ChatWindow';
// import ChatHistory from './components/Chat/ChatHistory';
// import StatsCard from './components/Dashboard/StatsCard';
// import ActivityChart from './components/Dashboard/ActivityChart';
// import RecentActivity from './components/Dashboard/RecentActivity';
// import Button from './components/Common/Button';
// import { healthService, utils } from './services/api';
// import {
//   FiMenu,
//   FiX,
//   FiHome,
//   FiMessageSquare,
//   FiMessageCircle,
//   FiArchive
// } from 'react-icons/fi';

// function App() {
//   const [activeTab, setActiveTab] = useState('chat');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [backendHealth, setBackendHealth] = useState(null);
//   const [showHistory, setShowHistory] = useState(false);

//   useEffect(() => {
//     checkBackendHealth();
//     const interval = setInterval(checkBackendHealth, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const checkBackendHealth = async () => {
//     try {
//       const health = await healthService.checkBackend();
//       setBackendHealth(health);
//     } catch (error) {
//       setBackendHealth({ status: 'unhealthy', error: 'Connection failed' });
//     }
//   };

//   const tabs = [
//     { id: 'dashboard', label: 'Dashboard', icon: FiHome },
//     { id: 'chat', label: 'AI Chat', icon: FiMessageSquare },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return (
//           <div className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//               <StatsCard
//                 title="Total Page Visits"
//                 value="1,247"
//                 icon="eye"
//                 trend="+12%"
//                 color="primary"
//               />
//               <StatsCard
//                 title="Interactions"
//                 value="3,458"
//                 icon="activity"
//                 trend="+8%"
//                 color="secondary"
//               />
//               <StatsCard
//                 title="Chat Messages"
//                 value="156"
//                 icon="message"
//                 trend="+23%"
//                 color="accent"
//               />
//               <StatsCard
//                 title="Session Time"
//                 value="2h 34m"
//                 icon="clock"
//                 trend="+5%"
//                 color="success"
//               />
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//               <ActivityChart />
//               <RecentActivity />
//             </div>
//           </div>
//         );

//       case 'chat':
//         return (
//           <div className="h-[calc(100vh-180px)] flex flex-col">
//             {/* Chat Header Bar */}
//             <div className="flex items-center justify-between mb-4 px-1">
//               <div className="flex items-center gap-3">
//               </div>

//               <Button
//                 variant={showHistory ? "primary" : "outline"}
//                 size="medium"
//                 onClick={() => setShowHistory(!showHistory)}
//                 className="shadow-sm hover:shadow transition-shadow"
//               >
//                 <FiArchive className="w-4 h-4 mr-2" />
//                 Chat History
//               </Button>
//             </div>

//             {/* Main Chat Area */}
//             <div className="flex-1 flex gap-4 overflow-hidden">
//               {/* Chat Window */}
//               <div className={`transition-all duration-300 ${showHistory ? 'w-4/5' : 'w-full'}`}>
//                 <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full overflow-hidden">
//                   <ChatWindow showHistory={showHistory} />
//                 </div>
//               </div>

//               {/* History Sidebar */}
//               {showHistory && (
//                 <div className="w-1/5 flex flex-col">
//                   <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full overflow-hidden">
//                     <ChatHistory />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         );

//       default:
//         return (
//           <div className="h-[calc(100vh-180px)] flex items-center justify-center">
//             <div className="text-center">
//               <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
//                 <FiMessageCircle className="w-8 h-8 text-white" />
//               </div>
//               <h2 className="text-xl font-bold text-gray-800 mb-2">Page Not Found</h2>
//               <p className="text-gray-600 mb-4">Select a tab from the navigation menu</p>
//               <Button onClick={() => setActiveTab('chat')}>
//                 Go to AI Chat
//               </Button>
//             </div>
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       {/* Main Navigation Header */}
//       <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setSidebarOpen(!sidebarOpen)}
//                 className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
//               >
//                 {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
//               </button>

//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
//                   <FiMessageCircle className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
//                     SmartBrowse
//                   </h1>
//                   {/* <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Beta v1.0</span> */}
//                 </div>
//               </div>
//             </div>

//             <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
//                     activeTab === tab.id
//                       ? 'bg-white text-blue-600 shadow-sm'
//                       : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
//                   }`}
//                   onClick={() => setActiveTab(tab.id)}
//                 >
//                   <tab.icon className="w-4 h-4" />
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-6">
//         {renderContent()}
//       </main>

//       {/* Mobile Bottom Navigation */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
//         <div className="flex justify-around py-3">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               className={`flex flex-col items-center p-2 transition-colors ${
//                 activeTab === tab.id
//                   ? 'text-blue-600'
//                   : 'text-gray-500 hover:text-gray-700'
//               }`}
//               onClick={() => setActiveTab(tab.id)}
//             >
//               <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-blue-50' : ''}`}>
//                 <tab.icon className="w-5 h-5" />
//               </div>
//               <span className="text-xs mt-1 font-medium">{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {sidebarOpen && (
//         <div className="lg:hidden fixed inset-0 z-40">
//           <div
//             className="absolute inset-0 bg-black/20 backdrop-blur-sm"
//             onClick={() => setSidebarOpen(false)}
//           />
//           <div className="absolute left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl">
//             <div className="p-5 border-b border-gray-200">
//               <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="p-2 rounded-xl hover:bg-gray-100"
//                 >
//                   <FiX className="w-5 h-5" />
//                 </button>
//               </div>

//               <div className="space-y-1">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
//                       activeTab === tab.id
//                         ? 'bg-blue-50 text-blue-600 border border-blue-100'
//                         : 'text-gray-700 hover:bg-gray-100'
//                     }`}
//                     onClick={() => {
//                       setActiveTab(tab.id);
//                       setSidebarOpen(false);
//                     }}
//                   >
//                     <tab.icon className="w-5 h-5" />
//                     <span className="font-medium">{tab.label}</span>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;












import React, { useState, useEffect } from "react";
import ChatWindow from "./components/Chat/ChatWindow";
import ChatHistory from "./components/Chat/ChatHistory";
import StatsCard from "./components/Dashboard/StatsCard";
import ActivityChart from "./components/Dashboard/ActivityChart";
import RecentActivity from "./components/Dashboard/RecentActivity";
import Button from "./components/Common/Button";
import { healthService, utils, trackingService } from "./services/api";
import {
  FiMenu,
  FiX,
  FiHome,
  FiMessageSquare,
  FiMessageCircle,
  FiArchive,
  FiRefreshCw,
  FiActivity,
} from "react-icons/fi";

function App() {
  const [activeTab, setActiveTab] = useState("chat");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);

  useEffect(() => {
    if (activeTab === "dashboard") {
      console.log("📊 Dashboard tab activated");

      // Test the API directly
      fetch(
        "http://localhost:5000/api/track/summary/user_1765519329979_hw8enq84q"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("📊 Direct API test:", {
            success: data.success,
            page_visits: data.summary?.total_pages,
            interactions: data.summary?.total_interactions,
            date: data.summary?.date,
          });
        })
        .catch((err) => console.error("📊 Direct API error:", err));
    }
  }, [activeTab]);

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);

    // Load dashboard data when tab is active
    if (activeTab === "dashboard") {
      loadDashboardData();
    }

    return () => clearInterval(interval);
  }, [activeTab]);

  const checkBackendHealth = async () => {
    try {
      const health = await healthService.checkBackend();
      setBackendHealth(health);
    } catch (error) {
      setBackendHealth({ status: "unhealthy", error: "Connection failed" });
    }
  };

  const loadDashboardData = async () => {
    setLoadingDashboard(true);
    try {
      console.log("📊 Loading dashboard data...");
      const response = await trackingService.getDailySummary();

      if (response.success) {
        console.log("✅ Dashboard data loaded:", response.summary);
        setDashboardStats(response.summary);
      } else {
        console.error("❌ Failed to load dashboard data:", response.error);
      }
    } catch (error) {
      console.error("❌ Dashboard data error:", error);
    } finally {
      setLoadingDashboard(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: FiHome },
    { id: "chat", label: "AI Chat", icon: FiMessageSquare },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Analytics Dashboard
                </h1>
                <p className="text-gray-600">
                  Real-time browsing activity and insights
                </p>
              </div>

              <div className="flex items-center gap-3">
                {/* Backend Status */}
                <div
                  className={`px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 ${
                    backendHealth?.status === "healthy"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      backendHealth?.status === "healthy"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="font-medium">
                    {backendHealth?.status === "healthy"
                      ? "Backend Connected"
                      : "Backend Offline"}
                  </span>
                </div>

                {/* Debug Button - Shows current user ID */}
                <button
                  onClick={() => {
                    const userId = utils.getUserId();
                    alert(
                      `Current User ID: ${userId}\n\nCopy this ID to test the backend API directly.`
                    );
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-colors"
                >
                  Debug User ID
                </button>

                {/* Refresh Button */}
                <button
                  onClick={loadDashboardData}
                  disabled={loadingDashboard}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition-colors"
                >
                  <FiRefreshCw
                    className={`w-4 h-4 ${
                      loadingDashboard ? "animate-spin" : ""
                    }`}
                  />
                  {loadingDashboard ? "Refreshing..." : "Refresh"}
                </button>
              </div>
            </div>

            {/* Debug Info - Remove in production */}
            {dashboardStats && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2 text-blue-800 mb-1">
                  <FiActivity className="w-4 h-4" />
                  <span className="font-medium">Live Data Loaded</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-blue-600">Date: </span>
                    <span className="font-medium">
                      {dashboardStats.date || "Today"}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">User: </span>
                    <span className="font-medium">
                      {utils.getUserId().substring(0, 10)}...
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">Pages: </span>
                    <span className="font-medium">
                      {dashboardStats.total_pages || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-600">Interactions: </span>
                    <span className="font-medium">
                      {dashboardStats.total_interactions || 0}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Stats Cards Grid */}
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                type="page_visits"
                title="Page Visits"
                subtitle="Today's page views"
                icon="eye"
                color="primary"
                refreshTrigger={dashboardStats}
              />
              <StatsCard
                type="interactions"
                title="Interactions"
                subtitle="Clicks, scrolls, etc."
                icon="activity"
                color="secondary"
                refreshTrigger={dashboardStats}
              />
              <StatsCard
                type="avg_time"
                title="Avg. Time"
                subtitle="Per interaction"
                icon="clock"
                color="accent"
                refreshTrigger={dashboardStats}
              />
              <StatsCard
                type="active_days"
                title="Active Days"
                subtitle="This week"
                icon="calendar"
                color="success"
                refreshTrigger={dashboardStats}
              />
            </div> */}
            {/* Stats Cards Grid - SIMPLIFIED */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard type="page_visits" />
              <StatsCard type="interactions" />
              <StatsCard type="avg_time" />
              <StatsCard type="active_days" />
            </div>

            {/* Charts Section */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart refreshTrigger={dashboardStats} />
              <RecentActivity refreshTrigger={dashboardStats} />
            </div> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart refreshTrigger={dashboardStats} />
              <RecentActivity refreshTrigger={dashboardStats} />
            </div>
          </div>
        );

      case "chat":
        return (
          <div className="h-[calc(100vh-180px)] flex flex-col">
            {/* Chat Header Bar */}
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                    <FiMessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">AI Assistant</h3>
                    <p className="text-xs text-gray-500">
                      Ask anything about your browsing
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant={showHistory ? "primary" : "outline"}
                size="medium"
                onClick={() => setShowHistory(!showHistory)}
                className="shadow-sm hover:shadow transition-shadow"
              >
                <FiArchive className="w-4 h-4 mr-2" />
                {showHistory ? "Hide History" : "Show History"}
              </Button>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex gap-4 overflow-hidden">
              {/* Chat Window */}
              <div
                className={`transition-all duration-300 ${
                  showHistory ? "w-4/5" : "w-full"
                }`}
              >
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full overflow-hidden">
                  <ChatWindow showHistory={showHistory} />
                </div>
              </div>

              {/* History Sidebar */}
              {showHistory && (
                <div className="w-1/5 flex flex-col">
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-full overflow-hidden">
                    <ChatHistory />
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div className="h-[calc(100vh-180px)] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4">
                <FiMessageCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Page Not Found
              </h2>
              <p className="text-gray-600 mb-4">
                Select a tab from the navigation menu
              </p>
              <Button onClick={() => setActiveTab("chat")}>
                Go to AI Chat
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Main Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? (
                  <FiX className="w-5 h-5" />
                ) : (
                  <FiMenu className="w-5 h-5" />
                )}
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
                  <FiMessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    SmartBrowse
                  </h1>
                  <p className="text-xs text-gray-500">
                    AI-Powered Browser Analytics
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-1 bg-gray-100 p-1.5 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:bg-white/50 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-6">{renderContent()}</main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-col items-center p-2 transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "dashboard") {
                  loadDashboardData();
                }
              }}
            >
              <div
                className={`p-2 rounded-lg ${
                  activeTab === tab.id ? "bg-blue-50" : ""
                }`}
              >
                <tab.icon className="w-5 h-5" />
              </div>
              <span className="text-xs mt-1 font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-2xl">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800">Navigation</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                      if (tab.id === "dashboard") {
                        loadDashboardData();
                      }
                    }}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Backend Status in Sidebar */}
            <div className="p-5 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      backendHealth?.status === "healthy"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span>Backend: {backendHealth?.status || "Unknown"}</span>
                </div>
                <div className="text-xs text-gray-500">
                  User: {utils.getUserId().substring(0, 15)}...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
