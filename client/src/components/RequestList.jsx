import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateRequestStatus, deleteRequest } from "../api";

const STATUS_OPTIONS = ["New", "In Review", "Resolved", "Rejected"];

const getStatusStyles = (status) => {
  switch (status) {
    case "New":       return "bg-blue-100 text-blue-700 border-blue-200";
    case "In Review": return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "Resolved":  return "bg-green-100 text-green-700 border-green-200";
    case "Rejected":  return "bg-red-100 text-red-700 border-red-200";
    default:          return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getPriorityStyles = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":   return "bg-red-100 text-red-700";
    case "medium": return "bg-yellow-100 text-yellow-700";
    case "low":    return "bg-green-100 text-green-700";
    default:       return "bg-gray-100 text-gray-700";
  }
};

function RequestList({ requests, updateRequestStatus, refreshRequests }) {
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleFilterChange = async (status) => {
    setSelectedStatus(status);
    if (refreshRequests) await refreshRequests(status);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      setUpdatingId(taskId);
      const response = await updateRequestStatus(taskId, newStatus);
      if (response) {
        toast.success("Status updated successfully");
        if (refreshRequests) await refreshRequests(selectedStatus);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteConfirm = async (requestId) => {
    try {
      setDeletingId(requestId);
      const response = await deleteRequest(requestId);
      if (response) {
        toast.success("Request deleted successfully");
        if (refreshRequests) await refreshRequests(selectedStatus);
      } else {
        toast.error("Failed to delete request");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-5">

      {/* Filter bar — always visible */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <label className="text-sm font-medium text-slate-700">Filter by Status</label>
        <select
          value={selectedStatus}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
        >
          <option value="">All Requests</option>
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        {selectedStatus && (
          <button
            onClick={() => handleFilterChange("")}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Empty state — shown below the filter, not instead of it */}
      {!requests?.length ? (
        <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">
          {selectedStatus
            ? `No "${selectedStatus}" requests found.`
            : "No requests found."}
        </div>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg text-slate-900">{request.username}</h3>
                <p className="text-sm text-slate-500">{request.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(request.status)}`}>
                  {request.status}
                </span>
                <button
                  onClick={() => setConfirmDeleteId(request.id)}
                  disabled={deletingId === request.id}
                  title="Delete request"
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Delete confirmation */}
            {confirmDeleteId === request.id && (
              <div className="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-700 flex-1">Delete this request? This cannot be undone.</p>
                <button
                  onClick={() => handleDeleteConfirm(request.id)}
                  disabled={deletingId === request.id}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  {deletingId === request.id ? "Deleting…" : "Delete"}
                </button>
                <button
                  onClick={() => setConfirmDeleteId(null)}
                  disabled={deletingId === request.id}
                  className="px-3 py-1.5 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Content */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Product / Company</p>
                <p className="text-slate-800">{request.product_company}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Request Type</p>
                <p className="text-slate-800">{request.request_type}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">Priority</p>
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyles(request.priority)}`}>
                  {request.priority}
                </span>
              </div>
            </div>

            {/* Message */}
            <div className="mt-5">
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">Message</p>
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700">
                {request.message}
              </div>
            </div>

            {/* Status update */}
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Update Status</label>
              <select
                value={request.status}
                disabled={updatingId === request.id}
                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              {updatingId === request.id && (
                <span className="text-sm text-indigo-600">Updating…</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default RequestList;
