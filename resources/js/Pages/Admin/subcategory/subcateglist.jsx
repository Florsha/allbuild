import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from 'sweetalert2';

 const AddListModal = () => setIsAddListOpen(true);

export default function Subcateglist() {

      const [IsAddListOpen, setIsAddListOpen] = useState(false);

    return (
        <AuthenticatedLayout>
            <Head title="Category List" />

            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Category List</h1>
                    <button 
                    onClick={AddListModal}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition">
                        + Add Category list
                    </button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-blue-50 text-gray-700 uppercase">
                            <tr>
                                <th className="px-6 py-3">Title</th>
                                <th className="px-6 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-6 py-3 font-medium text-gray-800">
                                    sample
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <button className="text-blue-600 hover:text-blue-800 font-semibold mr-3">
                                        Edit
                                    </button>
                                    <button className="text-red-600 hover:text-red-800 font-semibold">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}