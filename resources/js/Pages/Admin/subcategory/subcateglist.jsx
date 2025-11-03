import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from 'sweetalert2';

export default function Subcateglist({ Subcategories }) {
    const [IsAddListOpen, setIsAddListOpen] = useState(false);
    const AddListModal = () => setIsAddListOpen(true);

      // Add category form
    const addForm = useForm({
        title: ""
    });
    const closeAddModal = () => {
        setIsAddListOpen(false);
        addForm.reset();
    };

      const handleAdd = (e) => {
        e.preventDefault();
        addForm.post(route("categoryList.store"), {
          onSuccess: () => {
            closeAddModal();
            Swal.fire({
              icon: "success",
              title: "Category Added!",
              text: "Your new category has been successfully created.",
              timer: 2000,
              showConfirmButton: false,
            });
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to add category. Please check your input.",
            });
          },
        });
      };

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
                            {Subcategories.map((subcateg) =>(

                            <tr
                                key={subcateg.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-3 font-medium text-gray-800">
                                    {subcateg.title}
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
                            ))}

                          {Subcategories.length === 0 && (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500 italic"
                                >
                                    No categories available.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* ------------------ ADD MODAL ------------------ */}
            {IsAddListOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <form
                onSubmit={handleAdd}
                className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
                >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Add New Category
                </h2>

                <div className="space-y-3">
                    <input
                    type="text"
                    placeholder="Title"
                    value={addForm.data.title}
                    onChange={(e) => addForm.setData("title", e.target.value)}
                    className="w-full border rounded-lg p-2"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                    type="button"
                    onClick={closeAddModal}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                    Cancel
                    </button>
                    <button
                    type="submit"
                    disabled={addForm.processing}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
                    >
                    {addForm.processing ? "Saving..." : "Add"}
                    </button>
                </div>
                </form>
            </div>
            )}

            </div>
        </AuthenticatedLayout>
    );
}