import React, { useState, useEffect } from 'react'
import RequestForm from './components/RequestForm'
import RequestList from './components/RequestList'
import { ToastContainer } from 'react-toastify'
import { fetchRequests, updateRequestStatus } from './api'

function App() {
  const [activeTab, setActiveTab] = useState('new');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

const loadRequests = async (status = '') => {
  setLoading(true);
  const data = await fetchRequests(status); 
  setRequests(data);
  setLoading(false);
};


  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="min-h-screen bg-slate-50">

      
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <h1 className="text-lg font-semibold text-slate-800">Request Tracker</h1>
        </header>

        <main className="max-w-3xl mx-auto px-6 py-8">

          <div className="flex gap-6 border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab('new')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'new'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              New Request
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`pb-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === 'list'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              All Requests
              {requests.length > 0 && (
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold rounded-full px-2 py-0.5">
                  {requests.length}
                </span>
              )}
            </button>
          </div>

          
          {activeTab === 'new' && (
            <div>
              <div className="mb-6">
                <h2 className="text-base font-semibold text-slate-800">Submit a request</h2>
              </div>
              <RequestForm refreshRequests={loadRequests} />
            </div>
          )}

          
          {activeTab === 'list' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-slate-800">All Requests</h2>
                  <p className="text-sm text-slate-500 mt-1">Review and update submitted requests.</p>
                </div>
                <button
                  onClick={loadRequests}
                  className="text-sm text-slate-500 hover:text-slate-700 underline underline-offset-2"
                >
                  Refresh
                </button>
              </div>

              {loading ? (
                <p className="text-sm text-slate-400 text-center py-12">Loading…</p>
              ) : (
                <RequestList
                  requests={requests}
                  updateRequestStatus={updateRequestStatus}
                  refreshRequests={loadRequests}
                />
              )}
            </div>
          )}

        </main>
      </div>
    </>
  );
}

export default App;