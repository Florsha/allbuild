import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head,useForm,usePage, router } from "@inertiajs/react";
import Swal from 'sweetalert2';

export default function ClientBooked() {

      return (
        <AuthenticatedLayout>
          <Head title="Client Request List" />

              <div className="max-w-full mx-auto py-10 px-6"> {/* made full width */}
                
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
                            project description
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
                      
                        <tr className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700"></td>
                          <td className="px-6 py-4 text-sm text-gray-700">     
                            <button 
                                className="text-blue-600 hover:text-blue-800 font-semibold mr-3">
                                View More
                            </button>
                          </td>
                        </tr>
                    </tbody>
                  </table>
                  {/* Pagination */}
              </div>

              {/* Modal */}


              {/* Edit Modal */}


        </div>



       </AuthenticatedLayout>
      );
}   