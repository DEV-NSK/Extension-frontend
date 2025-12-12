import React, { useState, useEffect } from 'react';
import ChatWindow from './components/Chat/ChatWindow';
import ChatHistory from './components/Chat/ChatHistory';
import StatsCard from './components/Dashboard/StatsCard';
import ActivityChart from './components/Dashboard/ActivityChart';
import RecentActivity from './components/Dashboard/RecentActivity';
import Button from './components/Common/Button';
import { healthService, utils } from './services/api';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiMessageSquare, 
  FiActivity, 
  FiSettings,
  FiMessageCircle
} from 'react-icons/fi';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [backendHealth, setBackendHealth] = useState(null);

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkBackendHealth = async () => {
    try {
      const health = await healthService.checkBackend();
      setBackendHealth(health);
    } catch (error) {
      setBackendHealth({ status: 'unhealthy', error: 'Connection failed' });
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: FiHome },
    { id: 'chat', label: 'AI Chat', icon: FiMessageSquare },
    { id: 'activity', label: 'Activity', icon: FiActivity },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatsCard
                title="Total Page Visits"
                value="1,247"
                icon="eye"
                trend="+12%"
                color="primary"
              />
              <StatsCard
                title="Interactions"
                value="3,458"
                icon="activity"
                trend="+8%"
                color="secondary"
              />
              <StatsCard
                title="Chat Messages"
                value="156"
                icon="message"
                trend="+23%"
                color="accent"
              />
              <StatsCard
                title="Session Time"
                value="2h 34m"
                icon="clock"
                trend="+5%"
                color="success"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityChart />
              <RecentActivity />
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
            <div className="lg:col-span-2">
              <div className="h-full rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <ChatWindow />
              </div>
            </div>
            <div>
              <ChatHistory />
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Activity Analytics</h2>
              <p className="text-gray-600">Detailed activity analytics coming soon...</p>
            </div>
            <RecentActivity />
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">User Information</h3>
                  <p className="text-sm text-gray-600">
                    User ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{utils.getUserId()}</code>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Session ID: <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{utils.getSessionId()}</code>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Backend Status</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${backendHealth?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`} />
                    <span className="text-sm text-gray-600">
                      {backendHealth?.status === 'healthy' ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  {backendHealth?.database && (
                    <p className="text-sm text-gray-600 mt-1">
                      Database: {backendHealth.database}
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Data Management</h3>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Reset All Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {sidebarOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
              
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <FiMessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-800">SmartBrowse</h1>
                <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">Beta</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-600 text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${backendHealth?.status === 'healthy' ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-gray-600 hidden sm:inline">
                  {backendHealth?.status === 'healthy' ? 'Connected' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around py-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex flex-col items-center p-2 ${
                activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-gray-200 shadow-xl">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-800">Navigation</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSidebarOpen(false);
                    }}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;