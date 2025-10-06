// import { useState } from "react";
// import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
// import { Head } from "@inertiajs/react";
// import {
//   HomeIcon,
//   UserGroupIcon,
//   ClipboardDocumentListIcon,
//   WrenchScrewdriverIcon,
//   ChartBarIcon,
//   Cog6ToothIcon,
//   BellIcon,
//   ArrowLeftOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// export default function Dashboard() {
//   const [active, setActive] = useState("dashboard");

//   const navItems = [
//     { key: "dashboard", label: "Dashboard", icon: <HomeIcon className="w-6 h-6" /> },
//     { key: "users", label: "Users", icon: <UserGroupIcon className="w-6 h-6" /> },
//     { key: "projects", label: "Projects", icon: <ClipboardDocumentListIcon className="w-6 h-6" /> },
//     { key: "services", label: "Services", icon: <WrenchScrewdriverIcon className="w-6 h-6" /> },
//     { key: "reports", label: "Reports", icon: <ChartBarIcon className="w-6 h-6" /> },
//     { key: "settings", label: "Settings", icon: <Cog6ToothIcon className="w-6 h-6" /> },
//   ];

//   return (
//     <AuthenticatedLayout>
//       <Head title="Admin Dashboard" />

//       <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
//         {/* Sidebar */}
//         <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
//           <div className="px-6 py-5 border-b dark:border-gray-700 bg-yellow-400">
//             <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
//           </div>
//           <nav className="flex-1 px-4 py-6 space-y-2">
//             {navItems.map((item) => (
//               <button
//                 key={item.key}
//                 onClick={() => setActive(item.key)}
//                 className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition ${
//                   active === item.key
//                     ? "bg-yellow-400 text-gray-900 font-semibold"
//                     : "text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
//                 }`}
//               >
//                 {item.icon}
//                 <span className="ml-3">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//           <div className="p-4 border-t dark:border-gray-700">
//             <button className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 dark:hover:bg-red-800 rounded-lg">
//               <ArrowLeftOnRectangleIcon className="w-6 h-6" />
//               <span className="ml-3">Logout</span>
//             </button>
//           </div>
//         </aside>

//         {/* Main content */}
//         <div className="flex-1 flex flex-col">
//           {/* Top Navbar */}
//           <header className="flex items-center justify-between bg-white dark:bg-gray-800 shadow px-6 py-4">
//             <h2 className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
//               {active}
//             </h2>
//             <div className="flex items-center space-x-4">
//               <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900">
//                 <BellIcon className="w-6 h-6" />
//                 <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
//               </button>
//               <div className="flex items-center space-x-2">
//                 <img
//                   src="https://ui-avatars.com/api/?name=Admin&background=FACC15&color=000"
//                   alt="Admin"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <span className="text-sm text-gray-800 dark:text-white">Admin</span>
//               </div>
//             </div>
//           </header>

//           {/* Dashboard content */}
//           <main className="flex-1 p-8 overflow-y-auto">
//             {/* Dashboard Widgets */}
//             {active === "dashboard" && (
//               <>
//                 {/* Stats Cards */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//                   <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
//                     <p className="text-gray-500 dark:text-gray-400">Total Users</p>
//                     <h3 className="text-3xl font-bold text-gray-800 dark:text-white">245</h3>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
//                     <p className="text-gray-500 dark:text-gray-400">Projects</p>
//                     <h3 className="text-3xl font-bold text-gray-800 dark:text-white">38</h3>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
//                     <p className="text-gray-500 dark:text-gray-400">Active Services</p>
//                     <h3 className="text-3xl font-bold text-gray-800 dark:text-white">12</h3>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 border-l-4 border-yellow-400">
//                     <p className="text-gray-500 dark:text-gray-400">Reports Generated</p>
//                     <h3 className="text-3xl font-bold text-gray-800 dark:text-white">54</h3>
//                   </div>
//                 </div>

//                 {/* Analytics Section */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                   <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 h-64 flex items-center justify-center">
//                     <p className="text-gray-500">📊 Chart Placeholder</p>
//                   </div>
//                   <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6 h-64 flex items-center justify-center">
//                     <p className="text-gray-500">📈 Reports/Activity Placeholder</p>
//                   </div>
//                 </div>
//               </>
//             )}

//             {active === "users" && (
//               <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                 <p className="text-gray-500">Users Management Module</p>
//               </div>
//             )}

//             {active === "projects" && (
//               <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                 <p className="text-gray-500">Projects Module</p>
//               </div>
//             )}

//             {active === "services" && (
//               <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                 <p className="text-gray-500">Services Module</p>
//               </div>
//             )}

//             {active === "reports" && (
//               <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                 <p className="text-gray-500">Reports Module</p>
//               </div>
//             )}

//             {active === "settings" && (
//               <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-6">
//                 <p className="text-gray-500">Settings Module</p>
//               </div>
//             )}
//           </main>
//         </div>
//       </div>
//     </AuthenticatedLayout>
//   );
// }


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
