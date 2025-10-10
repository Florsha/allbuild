import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  WrenchScrewdriverIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

export default function ClientLayout({ header, children }) {
  const user = usePage().props.auth.user;
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <ApplicationLogo className="block h-9 w-auto text-yellow-600" />
                <span className="text-xl font-bold text-gray-800">AllBuild</span>
              </Link>
            </div>

            <div className="hidden sm:flex space-x-6">
              <NavLink href={route('services')} active={route().current('services')}>
                <WrenchScrewdriverIcon className="inline h-5 w-5 mr-1" />
                Services
              </NavLink>
              <NavLink href="/projects">
                <ClipboardDocumentListIcon className="inline h-5 w-5 mr-1" />
                Projects
              </NavLink>
            </div>

            <div className="hidden sm:flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <Link
                href={route('profile.edit')}
                className="flex items-center rounded-full bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 transition"
              >
                <UserCircleIcon className="h-5 w-5 mr-1" /> Profile
              </Link>
            </div>

            <div className="sm:hidden flex items-center">
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100"
              >
                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {open && (
          <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
            <div className="space-y-1 p-3">
              <ResponsiveNavLink href="/services">Services</ResponsiveNavLink>
              <ResponsiveNavLink href="/projects">Projects</ResponsiveNavLink>
            </div>
          </div>
        )}
      </nav>

      {header && (
        <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 shadow text-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-xl font-semibold">
            {header}
          </div>
        </header>
      )}

      <main className="p-4">{children}</main>
    </div>
  );
}
