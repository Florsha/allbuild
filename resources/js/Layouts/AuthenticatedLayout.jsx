// import ApplicationLogo from '@/Components/ApplicationLogo';
// import Dropdown from '@/Components/Dropdown';
// import NavLink from '@/Components/NavLink';
// import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
// import { Link, usePage } from '@inertiajs/react';
// import { useState } from 'react';
// import {
//     Bars3Icon,
//     XMarkIcon,
//     HomeIcon,
//     ClipboardDocumentListIcon,
//     PhoneIcon,
//     UserCircleIcon,
//     WrenchScrewdriverIcon,
// } from '@heroicons/react/24/outline';

// export default function AuthenticatedLayout({ header, children }) {
//     const user = usePage().props.auth.user;
//     const [open, setOpen] = useState(false);

//     return (
//         <div className="min-h-screen bg-gray-50">
//             {/* Navbar */}
//             <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md">
//                 <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//                     <div className="flex h-16 justify-between items-center">
//                         {/* Logo + Brand */}
//                         <div className="flex items-center">
//                             <Link href="/" className="flex items-center space-x-2">
//                                 <ApplicationLogo className="block h-9 w-auto text-yellow-600" />
//                                 <span className="text-xl font-bold text-gray-800">AllBuild</span>
//                             </Link>
//                         </div>

//                         {/* Desktop Links */}
//                         <div className="hidden sm:flex space-x-6">
//                             {/* <NavLink href={route('dashboard')} active={route().current('dashboard')}>
//                                 <HomeIcon className="inline h-5 w-5 mr-1" />
//                                 Dashboard
//                             </NavLink> */}
//                             <NavLink href={route('services')} active={route().current('services')}>
//                                 <WrenchScrewdriverIcon className="inline h-5 w-5 mr-1" />
//                                 Services
//                             </NavLink>
//                             <NavLink href="/projects">
//                                 <ClipboardDocumentListIcon className="inline h-5 w-5 mr-1" />
//                                 Projects
//                             </NavLink>
//                             <NavLink href="/sample">
//                                 {/* <PhoneIcon className="inline h-5 w-5 mr-1" /> */}
//                                 sample
//                             </NavLink>
//                         </div>

//                         {/* User Profile */}
//                         <div className="hidden sm:flex items-center space-x-4">
//                             <span className="text-sm font-medium text-gray-700">{user?.name}</span>
//                             <Link
//                                 href={route('profile.edit')}
//                                 className="flex items-center rounded-full bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 transition"
//                             >
//                                 <UserCircleIcon className="h-5 w-5 mr-1" /> Profile
//                             </Link>
//                         </div>

//                         {/* Mobile Hamburger */}
//                         <div className="sm:hidden flex items-center">
//                             <button
//                                 onClick={() => setOpen(!open)}
//                                 className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100"
//                             >
//                                 {open ? (
//                                     <XMarkIcon className="h-6 w-6" />
//                                 ) : (
//                                     <Bars3Icon className="h-6 w-6" />
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 {open && (
//                     <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
//                         <div className="space-y-1 p-3">
//                             <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')}>
//                                 Dashboard
//                             </ResponsiveNavLink>
//                             <ResponsiveNavLink href="/services">Services</ResponsiveNavLink>
//                             <ResponsiveNavLink href="/projects">Projects</ResponsiveNavLink>
//                             <ResponsiveNavLink href="/contact">Contact</ResponsiveNavLink>
//                         </div>
//                         <div className="border-t border-gray-200 px-4 py-3">
//                             <div className="text-base font-medium text-gray-800">{user?.name}</div>
//                             <div className="text-sm font-medium text-gray-500">{user?.email}</div>
//                             <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
//                             <ResponsiveNavLink method="post" href={route('logout')} as="button">
//                                 Log Out
//                             </ResponsiveNavLink>
//                         </div>
//                     </div>
//                 )}
//             </nav>

//             {/* Page Header */}
//             {header && (
//                 <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 shadow text-white">
//                     <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-xl font-semibold">
//                         {header}
//                     </div>
//                 </header>
//             )}

//             {/* Page Content */}
//             <main className="p-4">{children}</main>
//         </div>
//     );
// }

import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
    HomeIcon,
    RectangleGroupIcon,
    UserCircleIcon,
    WrenchScrewdriverIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(false);
    console.log("user data", user?.role === 1 );
    return (
        <div className="min-h-screen bg-gray-50">
            {/* ADMIN LAYOUT */}
            {parseInt(user?.role) === 1 ? (
                <div className="flex h-screen">
                    {/* Sidebar */}
                    <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex flex-col">
                        <div className="px-6 py-5 border-b bg-yellow-400">
                            <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                        </div>
                       <nav className="flex-1 px-4 py-6 space-y-2">
                            <NavLink href={route("dashboard")} className="flex items-center space-x-2">
                                <HomeIcon className="w-5 h-5" />
                                <span>Dashboard</span>
                            </NavLink> <br />
                           <NavLink href={route("categoryList")} className="flex items-center space-x-2">
                                <RectangleGroupIcon className="w-5 h-5" />
                                <span>Category</span>
                            </NavLink> <br />
                           {/*  <NavLink href="/projects" className="flex items-center space-x-2">
                                <WrenchScrewdriverIcon className="w-5 h-5" />
                                <span>Projects</span>
                            </NavLink> <br />
                            <NavLink href="/reports" className="flex items-center space-x-2">
                                <ChartBarIcon className="w-5 h-5" />
                                <span>Reports</span>
                            </NavLink> <br />
                            <NavLink href="/settings" className="flex items-center space-x-2">
                                <Cog6ToothIcon className="w-5 h-5" />
                                <span>Settings</span>
                            </NavLink> */}

                        </nav>
                        <div className="p-4 border-t">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="flex items-center text-red-600 hover:bg-red-100 rounded-lg px-4 py-2 w-full"
                            >
                                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                                Logout
                            </Link>
                        </div>
                    </aside>

                    {/* Main Admin Content */}
                    <div className="flex-1 flex flex-col">
                        {/* Admin Topbar */}
                        <header className="flex justify-between items-center bg-white shadow px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-800">
                                {header || "Admin Dashboard"}
                            </h2>
                            <div className="flex items-center space-x-3">
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin&background=FACC15&color=000"
                                    className="w-8 h-8 rounded-full"
                                />
                                <span className="text-sm text-gray-700">{user?.name}</span>
                            </div>
                        </header>

                        {/* Page Content */}
                        <main className="p-6 overflow-y-auto">{children}</main>
                    </div>
                </div>
            ) : (
                /* CLIENT LAYOUT */
                <div>
                    {/* Navbar */}
                    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-md">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 justify-between items-center">
                                {/* Logo + Brand */}
                                <div className="flex items-center">
                                    <Link href="/" className="flex items-center space-x-2">
                                        <ApplicationLogo className="block h-9 w-auto text-yellow-600" />
                                        <span className="text-xl font-bold text-gray-800">AllBuild</span>
                                    </Link>
                                </div>

                                {/* Desktop Links */}
                                <div className="hidden sm:flex space-x-6">
                                    <NavLink href={route("services")} active={route().current("services")}>
                                        <WrenchScrewdriverIcon className="inline h-5 w-5 mr-1" />
                                        Services
                                    </NavLink>
                                    <NavLink href="/projects">
                                        <ClipboardDocumentListIcon className="inline h-5 w-5 mr-1" />
                                        Projects
                                    </NavLink>
                                    <NavLink href="/sample">Sample</NavLink>
                                </div>

                                {/* User Profile */}
                                <div className="hidden sm:flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                                    <Link
                                        href={route("profile.edit")}
                                        className="flex items-center rounded-full bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600 transition"
                                    >
                                        <UserCircleIcon className="h-5 w-5 mr-1" /> Profile
                                    </Link>
                                </div>

                                {/* Mobile Hamburger */}
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

                        {/* Mobile Menu */}
                        {open && (
                            <div className="sm:hidden bg-white border-t border-gray-200 shadow-md">
                                <div className="space-y-1 p-3">
                                    <ResponsiveNavLink href="/services">Services</ResponsiveNavLink>
                                    <ResponsiveNavLink href="/projects">Projects</ResponsiveNavLink>
                                    <ResponsiveNavLink href="/contact">Contact</ResponsiveNavLink>
                                </div>
                                <div className="border-t border-gray-200 px-4 py-3">
                                    <div className="text-base font-medium text-gray-800">{user?.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                    <ResponsiveNavLink href={route("profile.edit")}>Profile</ResponsiveNavLink>
                                    <ResponsiveNavLink method="post" href={route("logout")} as="button">
                                        Log Out
                                    </ResponsiveNavLink>
                                </div>
                            </div>
                        )}
                    </nav>

                    {/* Page Header */}
                    {header && (
                        <header className="bg-gradient-to-r from-yellow-500 to-yellow-600 shadow text-white">
                            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 text-xl font-semibold">
                                {header}
                            </div>
                        </header>
                    )}

                    {/* Page Content */}
                    <main className="p-4">{children}</main>
                </div>
            )}
        </div>
    );
}
