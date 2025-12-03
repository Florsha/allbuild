import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import {
  HomeIcon,
  RectangleGroupIcon,
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { VideoIcon } from 'lucide-react';

export default function AdminLayout({ header, children }) {
  const user = usePage().props.auth.user;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
        <div className="px-6 py-5 border-b bg-yellow-400">
          <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink href={route('dashboard')} className="flex items-center space-x-2">
            <HomeIcon className="w-5 h-5" />
            <span>Dashboard</span>
          </NavLink> <br />
          <NavLink href={route('categoryList')} className="flex items-center space-x-2">
            <RectangleGroupIcon className="w-5 h-5" />
            <span>Category</span>
          </NavLink> <br />
          <NavLink href={route('admin.subcateg')} className="flex items-center space-x-2">
            <RectangleGroupIcon className="w-5 h-5" />
            <span>Sub Category</span>
          </NavLink> <br />
          <NavLink href={route('manage.appointment')} className="flex items-center space-x-2">
            <CalendarDaysIcon className="w-5 h-5" />
            <span>Manage Appointment</span>
          </NavLink>
          <br />
          <NavLink href='#' className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5" />
            <span>Client Booked Appointment</span>
          </NavLink>
          <NavLink href={route('manage.video')} className="flex items-center space-x-2">
            <VideoIcon className="w-5 h-5" />
            <span> Manage Video Testimonials</span>
          </NavLink> <br />
        </nav>
        <div className="p-4 border-t">
          <Link
            href={route('logout')}
            method="post"
            as="button"
            className="flex items-center text-red-600 hover:bg-red-100 rounded-lg px-4 py-2 w-full"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {header || 'Category'}
          </h2>
          <div className="flex items-center space-x-3">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&background=FACC15&color=000`}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm text-gray-700">{user.name}</span>
          </div>
        </header>
        <main className="p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
