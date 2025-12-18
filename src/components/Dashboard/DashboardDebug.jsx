import React, { useState, useEffect } from 'react';
import { trackingService, utils } from '../../services/api';

const DashboardDebug = () => {
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await trackingService.getDailySummary();
      setApiResponse(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">Dashboard Debug</h3>
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Refresh Data'}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-700 mb-2">Current User Info:</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <p><strong>User ID:</strong> {utils.getUserId()}</p>
            <p><strong>Session ID:</strong> {utils.getSessionId()}</p>
            <p><strong>API Base URL:</strong> {utils.getApiBaseUrl()}</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-medium text-red-700 mb-1">Error:</h4>
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {apiResponse && (
          <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-96">
            <h4 className="font-medium text-gray-700 mb-2">API Response:</h4>
            <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-auto">
              {JSON.stringify(apiResponse, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardDebug;