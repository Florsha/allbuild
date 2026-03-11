import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function RequestTracker({ requests = [], search = '', statusFilter = '' }) {
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [filterStatus, setFilterStatus] = useState(statusFilter || '');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('admin.tracker'), {
      search: searchTerm,
      status: filterStatus,
    });
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      accepted: '✅',
      in_progress: '🔄',
      completed: '✔️',
      rejected: '❌',
      cancelled: '⛔',
      approved: '✅',
      ongoing: '🔄',
    };
    return icons[status] || '•';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      cancelled: 'bg-gray-100 text-gray-800',
      approved: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const statuses = [
    'pending',
    'accepted',
    'approved',
    'in_progress',
    'ongoing',
    'completed',
    'rejected',
    'cancelled',
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reference Number
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by reference number..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="">All Statuses</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Reference #
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Latest Update
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Request Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-mono font-semibold text-blue-600">
                        {request.reference_number}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {request.service?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {request.subcategory?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          request.latest_tracking?.status || request.status
                        )}`}
                      >
                        {getStatusIcon(
                          request.latest_tracking?.status || request.status
                        )}
                        {request.latest_tracking?.status ||
                          request.status.charAt(0).toUpperCase() +
                            request.status.slice(1).replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {request.latest_tracking
                        ? formatDate(request.latest_tracking.created_at)
                        : 'No updates'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDate(request.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={route('admin.tracker.detail', { reference_number: request.reference_number })}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium"
                      >
                        View Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-900">No Requests Found</h3>
            <p className="text-gray-600 mt-2">
              {search || statusFilter
                ? 'Try adjusting your search or filter criteria'
                : 'No client requests yet'}
            </p>
          </div>
        )}
      </div>

      {/* Pagination Info */}
      {requests.length > 0 && (
        <div className="text-center text-sm text-gray-600 bg-white p-4 rounded-lg">
          Showing {requests.length} request
          {requests.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

RequestTracker.layout = (page) => <AdminLayout>{page}</AdminLayout>;
