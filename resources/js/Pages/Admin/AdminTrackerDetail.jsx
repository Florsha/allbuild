import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminTrackerDetail({ trackingData = null, reference_number = '' }) {
  const [searchReference, setSearchReference] = useState(reference_number || '');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchReference.trim()) {
      router.get(route('admin.tracker.detail'), { reference_number: searchReference });
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      accepted: '✅',
      in_progress: '🔄',
      completed: '✔️',
      rejected: '❌',
      cancelled: '⛔',
    };
    return icons[status] || '•';
  };

  const getStatusBgColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100',
      accepted: 'bg-blue-100',
      in_progress: 'bg-purple-100',
      completed: 'bg-green-100',
      rejected: 'bg-red-100',
      cancelled: 'bg-gray-100',
    };
    return colors[status] || 'bg-gray-100';
  };

  const getStatusTextColor = (status) => {
    const colors = {
      pending: 'text-yellow-700',
      accepted: 'text-blue-700',
      in_progress: 'text-purple-700',
      completed: 'text-green-700',
      rejected: 'text-red-700',
      cancelled: 'text-gray-700',
    };
    return colors[status] || 'text-gray-700';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Box */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            value={searchReference}
            onChange={(e) => setSearchReference(e.target.value)}
            type="text"
            placeholder="Enter reference number (e.g., REF-03ef3c4e1f)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          />
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results */}
      {trackingData ? (
        <div className="space-y-6">
          {/* Request Details Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Reference Number
                </h2>
                <p className="text-2xl font-bold text-blue-600 font-mono mt-2">
                  {trackingData.reference_number}
                </p>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Request Date
                </h2>
                <p className="text-lg font-semibold text-gray-900 mt-2">
                  {formatDate(trackingData.client_request?.created_at)}
                </p>
              </div>

              {trackingData.client && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Client Name
                  </h2>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {trackingData.client.name}
                  </p>
                </div>
              )}

              {trackingData.client && (
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Client Email
                  </h2>
                  <p className="text-lg font-semibold text-gray-900 mt-2">
                    {trackingData.client.email}
                  </p>
                </div>
              )}

            </div>

            {trackingData.client_request?.project_description && (
              <div className="pt-6 border-t">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Project Description
                </h2>
                <p className="text-gray-700">
                  {trackingData.client_request.project_description}
                </p>
              </div>
            )}

            {trackingData.client_request?.file_attachment && (
              <div className="pt-6 border-t">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  File Attachment
                </h2>
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5m0 0l-3 1.5m3-1.5l3-1.5m9 5l-9 5-9-5m9 5l3-1.5m-3 1.5l-3-1.5"
                    />
                  </svg>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-800 break-all">
                      {trackingData.client_request.file_attachment.split('/').pop()}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Blueprint / Photo
                    </p>
                  </div>
                  <a
                    href={`${window.location.origin}/storage/${trackingData.client_request.file_attachment}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium text-sm whitespace-nowrap"
                  >
                    Download
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Status Timeline */}
          {trackingData.trackings && trackingData.trackings.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Status History</h2>

              <div className="space-y-4">
                {trackingData.trackings.map((tracking, index) => (
                  <div
                    key={tracking.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border-l-4 ${getStatusBgColor(
                      tracking.status
                    )} border-l-${
                      tracking.status === 'completed'
                        ? 'green'
                        : tracking.status === 'accepted'
                        ? 'blue'
                        : tracking.status === 'pending'
                        ? 'yellow'
                        : 'gray'
                    }-400`}
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 text-2xl pt-1">
                      {getStatusIcon(tracking.status)}
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3
                          className={`text-lg font-semibold capitalize ${getStatusTextColor(
                            tracking.status
                          )}`}
                        >
                          {tracking.status.replace('_', ' ')}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {formatDate(tracking.created_at)}
                        </span>
                      </div>

                      {tracking.remarks && (
                        <p className="text-gray-700 mb-2">{tracking.remarks}</p>
                      )}

                      {tracking.updated_at !== tracking.created_at && (
                        <div className="text-xs text-gray-500">
                          Last updated: {formatTime(tracking.updated_at)}
                        </div>
                      )}
                    </div>

                    {/* Step Number */}
                    <div className="flex-shrink-0 text-2xl font-bold text-gray-400">
                      #{index + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="text-5xl mb-4">📭</div>
              <h3 className="text-lg font-semibold text-gray-900">No Status Updates Yet</h3>
              <p className="text-gray-600 mt-2">
                Your request is being processed. Check back soon for updates.
              </p>
            </div>
          )}
        </div>
      ) : reference_number ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="text-5xl mb-4">❌</div>
          <h3 className="text-lg font-semibold text-gray-900">Request Not Found</h3>
          <p className="text-gray-600 mt-2">
            No request found with reference number: <span className="font-mono font-bold">{reference_number}</span>
          </p>
          <p className="text-gray-500 mt-4">Please check the reference number and try again.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900">Search for a Request</h3>
          <p className="text-gray-600 mt-2">
            Enter a reference number above to view the tracking details.
          </p>
        </div>
      )}
    </div>
  );
}

AdminTrackerDetail.layout = (page) => <AdminLayout>{page}</AdminLayout>;
