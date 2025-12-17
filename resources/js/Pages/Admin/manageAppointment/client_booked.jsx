import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,useForm,usePage, router } from "@inertiajs/react";
import { useState, useMemo } from "react";
import Swal from 'sweetalert2';

export default function ClientBooked() {
    const {clientBooked } = usePage().props;
    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);

    const openModal = (item) => {
      setSelectedClient(item);
      setShowModal(true);
    };

    const closeModal = () => {
      setShowModal(false);
      setSelectedClient(null);
    };

    const confirmStatusUpdate = (status) => {
      Swal.fire({
        title: "Update Status?",
        text: `Do you want to mark this client as "${status}"?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, update",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#9ca3af",
        width: 380, // small pop modal
      }).then((result) => {
        if (result.isConfirmed) {
          router.put(
            route("admin.clientBooked.updateStatus", selectedClient.id),
            { status },
            {
              preserveScroll: true,
              onSuccess: () => {
                Swal.fire({
                  icon: "success",
                  title: "Updated",
                  text: `Client status set to ${status}`,
                  timer: 1500,
                  showConfirmButton: false,
                });
                closeModal();
              },
            }
          );
        }
      });
    };

    const filteredData = useMemo(() => {
      if(!search) return clientBooked.data;

      const keyword = search.toLowerCase();

      return clientBooked.data.filter((item) => {
        return (
          item.reference_number?.toLowerCase().includes(keyword) ||
          item.client_assign?.client?.name?.toLowerCase().includes(keyword) ||
          item.services_offer?.title?.toLowerCase().includes(keyword) ||
          item.sub_category?.title?.toLowerCase().includes(keyword) ||
          item.status?.toLowerCase().includes(keyword)
        )
      })
    }, [search, clientBooked.data]);
      return (
        <AuthenticatedLayout>
          <Head title="Client Request List" />

              <div className="max-w-full mx-auto py-10 px-6"> {/* made full width */}
                
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">
                  Client Booked Appointments
                </h2>

                <input
                  type="text"
                  placeholder="Search reference, name, service..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
              </div>

                {/* Timeslot Table Card */}
                <div className="bg-white shadow-xl rounded-2xl overflow-x-auto"> {/* make table horizontally scrollable */}
                  <table className="min-w-full divide-y divide-gray-200 table-auto">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Reference Number
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Full Name
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Services
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Slot Booked
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          status
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredData.length > 0 ? (
                        filteredData.map((item) =>(
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-700">{item.reference_number}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.client_assign.client.name}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.services_offer.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.sub_category.title}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{item.status}</td>
                          <td className="px-6 py-4 text-sm text-gray-700">{new Date(
                            `${item.client_assign.appointment.effective_date} ${item.client_assign.appointment.time}`
                              ).toLocaleString("en-PH", {
                                month: "long",
                                day: "2-digit",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              })}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-700">     
                            <button 
                                onClick={() => openModal(item)}
                                className="text-blue-600 hover:text-blue-800 font-semibold mr-3">
                                View More
                            </button>
                          </td>
                        </tr>
                      ))

                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-6 text-gray-500">
                            No records found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  {/* Pagination */}
                    <div className="flex justify-between items-center px-6 py-4 border-t">
                      <p className="text-sm text-gray-600">
                        Page {clientBooked.current_page} of {clientBooked.last_page}
                      </p>

                      <div className="flex space-x-1">
                        {clientBooked.links.map((link, index) => (
                          <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => router.visit(link.url)}
                            className={`px-3 py-1 text-sm rounded-md ${
                              link.active
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            } ${!link.url && "opacity-50 cursor-not-allowed"}`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                          />
                        ))}
                      </div>
                    </div>
              </div>

              {/* Modal */}


              {/* Edit Modal */}

        </div>
          
        {showModal && selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6">
            <div className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden flex flex-col">

              {/* HEADER */}
              <div className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div>
                  <h3 className="text-xl font-semibold">Client Booking Details</h3>
                  <p className="text-sm text-blue-100">Reference #{selectedClient.reference_number}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white/80 hover:text-white text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* BODY */}
              <div className="p-8 max-h-[70vh] overflow-y-auto space-y-8">

                {/* TOP SUMMARY */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase">Client Name</p>
                    <p className="font-semibold text-gray-800">{selectedClient.client_assign?.client?.name}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase">Service</p>
                    <p className="font-semibold text-gray-800">{selectedClient.services_offer?.title}</p>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase">Status</p>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold
                      ${selectedClient.status === "accepted" ? "bg-green-100 text-green-700" : ""}
                      ${selectedClient.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${selectedClient.status === "cancelled" ? "bg-red-100 text-red-700" : ""}
                    `}>
                      {selectedClient.status}
                    </span>
                  </div>
                </div>

                {/* DETAILS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                  {/* CLIENT INFO */}
                  <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-700 mb-4">👤 Client Information</h4>
                    <div className="space-y-3 text-sm">
                      <p><span className="font-medium">Full Name:</span> {selectedClient.client_assign?.client?.name}</p>
                      <p><span className="font-medium">Reference No:</span> {selectedClient.reference_number}</p>
                    </div>
                  </div>

                  {/* SERVICE INFO */}
                  <div className="bg-white border rounded-2xl p-6 shadow-sm">
                    <h4 className="font-semibold text-gray-700 mb-4">🛠 Service Details</h4>
                    <div className="space-y-3 text-sm">
                      <p><span className="font-medium">Service:</span> {selectedClient.services_offer?.title}</p>
                      <p><span className="font-medium">Category:</span> {selectedClient.sub_category?.title}</p>
                    </div>
                  </div>
                </div>

                {/* APPOINTMENT CARD */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-semibold text-indigo-700 mb-4">📅 Appointment Schedule</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <p>
                      <span className="font-medium">Date & Time:</span><br />
                      {new Date(`${selectedClient.client_assign?.appointment?.effective_date} ${selectedClient.client_assign?.appointment?.time}`)
                        .toLocaleString("en-PH", {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                    </p>
                    <p>
                      <span className="font-medium">Assigned Staff:</span><br />
                      {selectedClient.client_assign?.appointment?.user?.name ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="px-8 py-5 border-t bg-gray-50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                  <button
                    onClick={closeModal}
                    className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 w-full sm:w-auto"
                  >
                    Close
                  </button>

                  {/* STATUS ACTIONS */}
                  <div className="flex w-full sm:w-auto flex-wrap gap-3">
                    <button
                      onClick={() => confirmStatusUpdate("accepted")}
                      className="px-6 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium flex-1 sm:flex-none"
                    >
                      Accepted
                    </button>

                    <button
                      onClick={() => confirmStatusUpdate("approved")}
                      className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium flex-1 sm:flex-none"
                    >
                      Approved
                    </button>

                    <button
                      onClick={() => confirmStatusUpdate("completed")}
                      className="px-6 py-2 rounded-lg bg-yellow-600 hover:bg-yellow-700 text-white font-medium flex-1 sm:flex-none"
                    >
                      Completed
                    </button>

                    <button
                      onClick={() => confirmStatusUpdate("rejected")}
                      className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex-1 sm:flex-none"
                    >
                      Rejected
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
        
       </AuthenticatedLayout>
      );
}   