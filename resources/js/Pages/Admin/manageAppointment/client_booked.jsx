import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,useForm,usePage, router } from "@inertiajs/react";
import { useState, useMemo } from "react";
import Swal from 'sweetalert2';

export default function ClientBooked() {
  const {clientBooked } = usePage().props;
  const [search, setSearch] = useState("");
    console.log("clientBooked", clientBooked);

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



       </AuthenticatedLayout>
      );
}   