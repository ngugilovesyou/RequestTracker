import React, { useState } from "react";
import { toast } from "react-toastify";

const STATUS_OPTIONS = [
  "New",
  "In Review",
  "Resolved",
  "Rejected",
];

const getStatusStyles = (status) => {
  switch (status) {
    case "New":
      return "bg-blue-100 text-blue-700 border-blue-200";

    case "In Review":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";

    case "Resolved":
      return "bg-green-100 text-green-700 border-green-200";

    case "Rejected":
      return "bg-red-100 text-red-700 border-red-200";

    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getPriorityStyles = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-700";

    case "medium":
      return "bg-yellow-100 text-yellow-700";

    case "low":
      return "bg-green-100 text-green-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

function RequestList({
  requests,
  updateRequestStatus,
  refreshRequests,
}) {
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = async (
    taskId,
    newStatus
  ) => {
    try {
      setUpdatingId(taskId);

      const response = await updateRequestStatus(
        taskId,
        newStatus
      );

      if (response) {
        toast.success("Status updated successfully");

        if (refreshRequests) {
          await refreshRequests();
        }
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

  const handleFilterChange = async (status) => {
  setSelectedStatus(status);

  if (refreshRequests) {
    await refreshRequests(status);
  }
};

  if (!requests?.length) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">
        No requests found.
      </div>
    );
  }

  return (
  <div className="space-y-5">
    {/* Filter */}
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <label className="text-sm font-medium text-slate-700">
        Filter by Status
      </label>

      <select
        value={selectedStatus}
        onChange={(e) =>
          handleFilterChange(e.target.value)
        }
        className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
      >
        <option value="">
          All Requests
        </option>

        {STATUS_OPTIONS.map((status) => (
          <option
            key={status}
            value={status}
          >
            {status}
          </option>
        ))}
      </select>
       {selectedStatus && (
    <button
      onClick={() => handleFilterChange('')}
      className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
    >
      Clear Filter
    </button>
  )}
    </div>

    {!requests?.length ? (
      <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-slate-500 shadow-sm">
        No requests found.
      </div>
    ) : (
      requests.map((request) => (
        <div
          key={request.id}
          className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 hover:shadow-md transition"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div>
              <h3 className="font-semibold text-lg text-slate-900">
                {request.username}
              </h3>

              <p className="text-sm text-slate-500">
                {request.email}
              </p>
            </div>

            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyles(
                request.status
              )}`}
            >
              {request.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Product / Company
              </p>

              <p className="text-slate-800">
                {request.product_company}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Request Type
              </p>

              <p className="text-slate-800">
                {request.request_type}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                Priority
              </p>

              <span
                className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getPriorityStyles(
                  request.priority
                )}`}
              >
                {request.priority}
              </span>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">
              Message
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-slate-700">
              {request.message}
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-medium text-slate-700">
              Update Status
            </label>

            <select
              value={request.status}
              disabled={updatingId === request.id}
              onChange={(e) =>
                handleStatusChange(
                  request.id,
                  e.target.value
                )
              }
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none"
            >
              {STATUS_OPTIONS.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              ))}
            </select>

            {updatingId === request.id && (
              <span className="text-sm text-indigo-600">
                Updating...
              </span>
            )}
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default RequestList;