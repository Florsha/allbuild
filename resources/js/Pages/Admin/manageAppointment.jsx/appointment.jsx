import { useState } from "react";
import { Head,useForm,usePage, router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from 'sweetalert2';

export default function Appointment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { flash, appointments } = usePage().props;

    const addForm = useForm({
          date: "",
          timeslots: [
              { time: "", slot: "" },
          ],
    });

    const closeAddModal = () => {
        setIsModalOpen(false);
        addForm.reset();
    };

    const addNewSlot = () => {
      addForm.setData("timeslots", [
        ...addForm.data.timeslots,
        { time: "", slot: "" },
      ])
    }

    const updateSlot = (index, key, value) => {
      const updatedSlots = [...addForm.data.timeslots];
      updatedSlots[index][key] = value;
      addForm.setData("timeslots", updatedSlots);
    }

    const removeSlot = (index) => {
      const updatedSlots = addForm.data.timeslots.filter((_, i) => i !== index);
      addForm.setData("timeslots", updatedSlots);
    }

    const handleAdd = (e) =>{
      e.preventDefault();
      console.log("appointment form", addForm);
      addForm.post(route('appointment.store'), {
        onSuccess: () => {
          closeAddModal();
           Swal.fire({
            icon: "success",
            title: "Appointment Schedule Added!",
            text: "Your new Appointment Schedule has been successfully created.",
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
    }

  return (
    <AuthenticatedLayout>
      <Head title="Appointment List" />

      <div className="max-w-full mx-auto py-10 px-6"> {/* made full width */}
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Manage Appointment Slots
          </h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-5 py-3 rounded-xl shadow-lg transition-all duration-200"
          >
            + Add Timeslot
          </button>
        </div>

        {/* Timeslot Table Card */}
        <div className="bg-white shadow-xl rounded-2xl overflow-x-auto"> {/* make table horizontally scrollable */}
          <table className="min-w-full divide-y divide-gray-200 table-auto">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Slot
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Available Slot
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-700">{item.effective_date}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.time}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.slot}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">0</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.user?.name ?? "No User"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="mt-6 flex justify-center">
            <div className="flex flex-wrap gap-2">
              {appointments.links.map((link, index) => (
                <button
                  key={index}
                  disabled={!link.url}
                  onClick={() => link.url && router.get(link.url, { preserveScroll: true })}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    link.active
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              ))}
            </div>
        </div>
      </div>

{/* Modal */}
{isModalOpen && (
  <form onSubmit={handleAdd}>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 animate-fadeIn p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800 p-6">Create Timeslot</h2>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 space-y-4">
          {/* Effective Date */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Effective Date</label>
            <input
              type="date"
              value={addForm.data.date}
              onChange={(e) => addForm.setData("date", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full border-gray-300 rounded-xl shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2 text-gray-700"
            />
          </div>

          {/* Time Slots */}
          <h3 className="text-lg font-semibold mt-4 mb-2">Time Slots</h3>
          <div className="space-y-4">
            {addForm.data.timeslots.map((slot, index) => (
              <div key={index} className="p-3 border rounded-xl">
                <label className="block text-gray-700 font-medium mb-1">Time</label>
                <input
                  type="time"
                  value={slot.time}
                  onChange={(e) => updateSlot(index, "time", e.target.value)}
                  className="w-full border-gray-300 rounded-xl mb-2 px-4 py-2"
                />

                <label className="block text-gray-700 font-medium mb-1">Slot</label>
                <input
                  type="number"
                  min={0}
                  value={slot.slot}
                  onChange={(e) => updateSlot(index, "slot", e.target.value)}
                  className="w-full border-gray-300 rounded-xl px-4 py-2"
                />

                {addForm.data.timeslots.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSlot(index)}
                    className="text-red-500 text-sm mt-2"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addNewSlot}
              className="w-full bg-green-600 text-white py-2 rounded-xl"
            >
              + Add Another Time Slot
            </button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={closeAddModal}
            className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 font-medium transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={addForm.processing}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all"
          >
            {addForm.processing ? "Saving..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  </form>
)}

      </div>

      {/* Optional animations */}
      <style>{`
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
        .animate-slideUp { animation: slideUp 0.3s ease-out; }
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes slideUp { from {transform:translateY(20px); opacity:0} to {transform:translateY(0); opacity:1} }
      `}</style>
    </AuthenticatedLayout>
  );
}
