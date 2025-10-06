import { useState } from "react";
import { Head } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function CategoryList() {
  const [services, setServices] = useState([
    {
      title: "Renovation",
      description:
        "Give your space a fresh new look. From kitchens to offices, we bring modern upgrades to life.",
      image:
        "https://cdn.prod.website-files.com/642c021ff5e1407cd1335eaf/64492986462df701b91ad74d_House%20Renovation%20Feature.jpg",
      details:
        "Our renovation service covers small adjustments to major overhauls. Ideal for refreshing spaces while keeping existing structures.",
    },
    {
      title: "New Construction",
      description:
        "We manage entire construction projects from foundation to finishing, with quality you can trust.",
      image:
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details:
        "From planning to completion, our new construction service ensures high standards, durable structures, and modern designs.",
    },
    {
      title: "Repair & Maintenance",
      description:
        "Reliable and efficient repair solutions for houses, apartments, and commercial buildings.",
      image: "https://www.unitedintoman.com/wp-content/uploads/2022/10/4-1.jpg",
      details:
        "Quick, reliable repairs and ongoing maintenance to keep your property in top shape.",
    },
    {
      title: "Other Services",
      description:
        "Specialized solutions tailored to your unique needs, including design, landscaping, and custom projects.",
      image:
        "https://images.unsplash.com/photo-1600585154084-4e5fe7c1c7e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details:
        "Our other services include interior design consultation, landscaping, painting, electrical work, plumbing, and customized construction requests.",
    },
  ]);

  // Delete a category (for demo only)
  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setServices(services.filter((_, i) => i !== index));
    }
  };

  // Update a category (demo logic only)
  const handleUpdate = (index) => {
    const updatedTitle = prompt(
      "Enter new title:",
      services[index].title
    );
    if (updatedTitle !== null && updatedTitle.trim() !== "") {
      const updated = [...services];
      updated[index].title = updatedTitle;
      setServices(updated);
    }
  };

  // Add new category (demo logic)
  const handleAdd = () => {
    const title = prompt("Enter category title:");
    const description = prompt("Enter category description:");
    if (title && description) {
      const newCategory = {
        title,
        description,
        image: "https://via.placeholder.com/150",
        details: "Newly added category.",
      };
      setServices([...services, newCategory]);
    }
  };

  return (
    <AuthenticatedLayout>
      <Head title="Category List" />

      <div className="p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Contractor Category List
          </h1>
          {/* ✅ Suggested placement for Add Button: top-right corner */}
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            + Add Category
          </button>
        </div>

        {/* Table Section */}
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
              {services.map((service, index) => (
                <tr
                  key={index}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                  </td>
                  <td className="px-6 py-3 font-medium text-gray-800">
                    {service.title}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {service.description}
                  </td>
                  <td className="px-6 py-3 text-gray-600">
                    {service.details}
                  </td>
                  <td className="px-6 py-3 text-center">
                    <button
                      onClick={() => handleUpdate(index)}
                      className="text-blue-600 hover:text-blue-800 font-semibold mr-3"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
              {services.length === 0 && (
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
      </div>
    </AuthenticatedLayout>
  );
}
