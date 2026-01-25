import NavLink from '@/Components/NavLink';
import { useState } from "react";
import { Link, usePage } from '@inertiajs/react';
import {
  HomeIcon,
  RectangleGroupIcon,
  ArrowLeftOnRectangleIcon,
  CalendarDaysIcon,
  UserIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import { VideoIcon } from 'lucide-react';

export default function AdminLayout({ header, children }) {
  const user = usePage().props.auth.user;

  const routeName = route().current(); // gets current route name

    const headers = {
      dashboard: "Dashboard",
      categoryList: "Category",
      "admin.subcateg": "Sub Category",
      "manage.appointment": "Manage Appointment",
      "appointment.clientBooked": "Client Requests",
      "admin.tracker": "Request Tracker",
    };

    const computedHeader = headers[routeName] ?? header;

    const [appointmentDropdownOpen, setAppointmentDropdownOpen] = useState(false);
    const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

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
           {/* Manage Appointment Dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setAppointmentDropdownOpen(!appointmentDropdownOpen)}
              className="flex items-center space-x-2 w-full text-left"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span>Manage Appointment</span>
            </button>

            {appointmentDropdownOpen && (
              <div className="ml-6 mt-2 flex flex-col space-y-1">
                {/* Upcoming Appointments */}
                <NavLink href={route('manage.appointment', { type: 'upcoming'})} className="flex items-center space-x-2">
                  <CalendarDaysIcon className="w-4 h-4 text-gray-600" />
                  <span>Upcoming Appointments</span>
                </NavLink>

                {/* Past Appointments */}
                <NavLink href={route('manage.appointment', { type: 'past' })} className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-gray-600" />
                  <span>Past Appointments</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* Client requets */}
          <div>
            <button
              type="button"
              onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
              className="flex items-center space-x-2 w-full text-left"
            >
              <CalendarDaysIcon className="w-5 h-5" />
              <span>Client Requests</span>
            </button>

            {clientDropdownOpen && (
              <div className="ml-6 mt-2 flex flex-col space-y-1">
                <NavLink href={route('appointment.clientBooked', { type: 'pending' })} className="flex items-center space-x-2">
                  <ClockIcon className="w-4 h-4 text-gray-600" />
                  <span>Pending Requests</span>
                </NavLink>

                <NavLink href={route('appointment.clientBooked', { type: ['accepted','completed','rejected','approved','ongoing'] })} className="flex items-center space-x-2">
                  <CheckCircleIcon className="w-4 h-4 text-gray-600" />
                  <span>Request Status</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* <NavLink href={route('appointment.clientBooked')} className="flex items-center space-x-2">
            <UserIcon className="w-5 h-5" />
            <span>Client Requests</span>
          </NavLink> */}
          <NavLink href={route('admin.tracker')} className="flex items-center space-x-2">
            <MapPinIcon className="w-5 h-5" />
            <span>Request Tracker</span>
          </NavLink> <br />
          <NavLink href={route('video-testimonials.index')} className="flex items-center space-x-2">
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
            {computedHeader}
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
