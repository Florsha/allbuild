import { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Appointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthenticatedLayout>
      <Head title="Appointment List" />

      <div className="max-w-5xl mx-auto py-10 px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Appointment Slots
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition-all duration-200"
          >
            + Add Timeslot
          </button>
        </div>

        {/* Timeslot Table Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Start Time
                </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Slot
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Static example rows */}
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">1</td>
                <td className="px-6 py-4 text-sm text-gray-700">08:00 AM</td>
                <td className="px-6 py-4 text-sm text-gray-700">3</td>
                <td className="px-6 py-4 text-sm text-gray-700">Admin</td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700 font-medium">2</td>
                <td className="px-6 py-4 text-sm text-gray-700">10:00 AM</td>
                <td className="px-6 py-4 text-sm text-gray-700">5</td>
                <td className="px-6 py-4 text-sm text-gray-700">Dr. Maria</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-slideUp">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Timeslot</h2>

              {/* Start Time Input */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Start Time</label>
                <input
                  type="time"
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-700"
                />
                <label className="block text-gray-700 font-medium mb-2">Slot</label>
                 <input
                  type="number"
                  className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-700"
                />
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Optional animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes slideUp { from {transform:translateY(20px); opacity:0} to {transform:translateY(0); opacity:1} }
      `}</style>
    </AuthenticatedLayout>
  );
}
