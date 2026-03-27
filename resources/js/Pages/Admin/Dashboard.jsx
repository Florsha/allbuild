import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
  return (
    <AuthenticatedLayout header="Dashboard">
      <Head title="Dashboard" />

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
          <p className="text-gray-500 dark:text-gray-400">Total Users</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">245</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
          <p className="text-gray-500 dark:text-gray-400">Projects</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">38</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
          <p className="text-gray-500 dark:text-gray-400">Active Services</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">12</h3>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
          <p className="text-gray-500 dark:text-gray-400">Reports Generated</p>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">54</h3>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 h-64 flex items-center justify-center">
          <p className="text-gray-500">📊 Chart Placeholder</p>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 h-64 flex items-center justify-center">
          <p className="text-gray-500">📈 Reports/Activity Placeholder</p>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
