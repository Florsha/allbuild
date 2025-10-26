import { useState } from "react";
import { Head, useForm, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from 'sweetalert2';

export default function CategoryList({ categories }) {
  // Modal control
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Add category form
  const addForm = useForm({
    title: "",
    description: "",
    image: "",
    details: "",
  });

  // Edit category form
  const editForm = useForm({
    id: "",
    title: "",
    description: "",
    image: "",
    details: "",
  });

  // Open/close modals
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => {
    setIsAddModalOpen(false);
    addForm.reset();
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    editForm.setData({
      id: category.id,
      title: category.title,
      description: category.description,
      image: category.image || "",
      details: category.details || "",
    });
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => setIsEditModalOpen(false);

  // Submit add form
  // ✅ Add new category
  const handleAdd = (e) => {
    e.preventDefault();
    addForm.post(route("categories.store"), {
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

  // ✅ Update category
  const handleUpdate = (e) => {
    e.preventDefault();
    editForm.put(route("categories.update", editForm.data.id), {
      onSuccess: () => {
        closeEditModal();
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Category updated successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      },
      onError: () => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update category. Please try again.",
        });
      },
    });
  };

  // ✅ Delete category
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the category.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(route("categories.destroy", id), {
          onSuccess: () => {
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "Category deleted successfully.",
              timer: 2000,
              showConfirmButton: false,
            });
          },
          onError: () => {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete category.",
            });
          },
        });
      }
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Category List" />

      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Contractor Category List
          </h1>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add Category
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-blue-50 text-gray-700 uppercase">
              <tr>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Details</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.title}
                        className="w-20 h-20 rounded-lg object-cover border"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-100 border flex items-center justify-center text-gray-400">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {category.title}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {category.description}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {category.details}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => openEditModal(category)}
                      className="text-blue-600 hover:text-blue-800 font-semibold mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="text-red-600 hover:text-red-800 font-semibold"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
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
        {isAddModalOpen && (
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
                <textarea
                  placeholder="Description"
                  value={addForm.data.description}
                  onChange={(e) =>
                    addForm.setData("description", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={addForm.data.image}
                  onChange={(e) => addForm.setData("image", e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
                <textarea
                  placeholder="Details"
                  value={addForm.data.details}
                  onChange={(e) => addForm.setData("details", e.target.value)}
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

        {/* ------------------ EDIT MODAL ------------------ */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <form
              onSubmit={handleUpdate}
              className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Edit Category
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Title"
                  value={editForm.data.title}
                  onChange={(e) => editForm.setData("title", e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
                <textarea
                  placeholder="Description"
                  value={editForm.data.description}
                  onChange={(e) =>
                    editForm.setData("description", e.target.value)
                  }
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={editForm.data.image}
                  onChange={(e) => editForm.setData("image", e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
                <textarea
                  placeholder="Details"
                  value={editForm.data.details}
                  onChange={(e) => editForm.setData("details", e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editForm.processing}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  {editForm.processing ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </AuthenticatedLayout>
  );
}
