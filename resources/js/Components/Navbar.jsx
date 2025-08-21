// resources/js/Components/Navbar.jsx
import React from "react";
import { Link } from "@inertiajs/react";

export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
            <h1 className="text-lg font-bold">My App</h1>
            <ul className="flex gap-6">
                <li>
                    <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                </li>
                <li>
                    <Link href="/contractor" className="hover:text-gray-300">Contractor</Link>
                </li>
                <li>
                    <Link href="/clients" className="hover:text-gray-300">Clients</Link>
                </li>
            </ul>
        </nav>
    );
}
