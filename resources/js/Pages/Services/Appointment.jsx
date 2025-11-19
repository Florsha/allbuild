import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

export default function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  const availableTimes = [
    "07:00 AM",
    "09:00 AM",
    "11:00 AM",
    "02:00 PM",
    "04:00 PM",
    "06:00 PM"
  ];

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time.");
      return;
    }
    setIsBooked(true);
    console.log({ selectedDate, selectedTime, notes });
    setTimeout(() => setIsBooked(false), 2000);
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-8 md:p-12 rounded-3xl shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT */}
      <div className="space-y-8">
        <SectionCard icon={<CalendarDaysIcon className="w-6 h-6 text-amber-600" />} title="Select Date">
          <input
            type="date"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </SectionCard>

        <SectionCard icon={<ClockIcon className="w-6 h-6 text-amber-600" />} title="Select Time">
          <select
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500"
            value={selectedTime || ""}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="">Choose time</option>
            {availableTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </SectionCard>

        <SectionCard icon={<ClipboardDocumentListIcon className="w-6 h-6 text-amber-600" />} title="Notes (Optional)">
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500"
            placeholder="Enter additional details..."
          />
        </SectionCard>
      </div>

      {/* RIGHT SUMMARY */}
      <motion.div
        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200 flex flex-col justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-3">Booking Summary</h3>
          <div className="space-y-3 text-gray-700">
            <SummaryItem label="Date" value={selectedDate || "Not selected"} />
            <SummaryItem label="Time" value={selectedTime || "Not selected"} />
            {notes && <SummaryItem label="Notes" value={notes} />}
          </div>
        </div>

        <motion.button
          onClick={handleBooking}
          whileTap={{ scale: 0.97 }}
          className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all text-white ${
            isBooked ? "bg-green-600" : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {isBooked ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircleIcon className="w-5 h-5" /> Booked Successfully
            </span>
          ) : (
            "Confirm Booking"
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function SectionCard({ icon, title, children }) {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200 hover:shadow-lg"
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-center gap-3">{icon}<h4 className="text-lg font-semibold text-gray-900">{title}</h4></div>
      {children}
    </motion.div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}






// import { useState } from "react";
// import { motion } from "framer-motion";
// import {
//   CalendarDaysIcon,
//   ClockIcon,
//   ClipboardDocumentListIcon,
//   CheckCircleIcon,
// } from "@heroicons/react/24/outline";

// export default function Appointment() {
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [notes, setNotes] = useState("");
//   const [isBooked, setIsBooked] = useState(false);

//   const times = ["07:00 AM", "09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

//   const handleBooking = () => {
//     if (!date || !time) {
//       alert("Please select a date and time before scheduling.");
//       return;
//     }
//     setIsBooked(true);
//     setTimeout(() => setIsBooked(false), 2000);
//   };

//   return (
//     <motion.div
//       className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 p-8 md:p-12 rounded-3xl shadow-inner"
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//     >
//       {/* LEFT COLUMN */}
//       <div className="space-y-8">
//         {/* Date Picker */}
//         <SectionCard
//           icon={<CalendarDaysIcon className="w-6 h-6 text-amber-600" />}
//           title="Select Work Date"
//         >
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800"
//           />
//         </SectionCard>

//         {/* Time Picker */}
//         <SectionCard
//           icon={<ClockIcon className="w-6 h-6 text-amber-600" />}
//           title="Select Work Time"
//         >
//           <div className="grid grid-cols-2 gap-3">
//             {times.map((t) => (
//               <motion.button
//                 key={t}
//                 onClick={() => setTime(t)}
//                 whileTap={{ scale: 0.97 }}
//                 className={`py-3 text-sm font-medium rounded-lg border transition-all ${
//                   time === t
//                     ? "bg-amber-600 text-white border-amber-700 shadow-md"
//                     : "bg-white border-gray-300 text-gray-700 hover:border-amber-400 hover:text-amber-600"
//                 }`}
//               >
//                 {t}
//               </motion.button>
//             ))}
//           </div>
//         </SectionCard>

//         {/* Notes */}
//         <SectionCard
//           icon={<ClipboardDocumentListIcon className="w-6 h-6 text-amber-600" />}
//           title="Additional Details (Optional)"
//         >
//           <textarea
//             rows="3"
//             value={notes}
//             onChange={(e) => setNotes(e.target.value)}
//             placeholder="Add work details, site info, or requirements..."
//             className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-amber-500 focus:outline-none text-gray-800"
//           ></textarea>
//         </SectionCard>
//       </div>

//       {/* RIGHT COLUMN – Summary */}
//       <motion.div
//         className="bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-200"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.3 }}
//       >
//         <div>
//           <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-3">
//             Schedule Summary
//           </h3>
//           <div className="space-y-3 text-gray-700">
//             <SummaryItem label="Work Date" value={date || "Not selected"} />
//             <SummaryItem label="Time Slot" value={time || "Not selected"} />
//             {notes && <SummaryItem label="Details" value={notes} />}
//           </div>
//         </div>

//         <motion.button
//           onClick={handleBooking}
//           whileTap={{ scale: 0.98 }}
//           className={`w-full mt-8 py-3 rounded-xl font-semibold transition-all ${
//             isBooked
//               ? "bg-green-600 text-white shadow-lg"
//               : "bg-amber-600 hover:bg-amber-700 text-white shadow-md"
//           }`}
//         >
//           {isBooked ? (
//             <span className="flex items-center justify-center gap-2">
//               <CheckCircleIcon className="w-5 h-5" />
//               Appointment Confirmed
//             </span>
//           ) : (
//             "Confirm Appointment"
//           )}
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// }

// /* Reusable Card Component */
// function SectionCard({ icon, title, children }) {
//   return (
//     <motion.div
//       className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-gray-200 hover:shadow-lg transition"
//       whileHover={{ scale: 1.01 }}
//     >
//       <div className="flex items-center gap-3">
//         {icon}
//         <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
//       </div>
//       {children}
//     </motion.div>
//   );
// }

// /* Reusable Summary Row */
// function SummaryItem({ label, value }) {
//   return (
//     <div className="flex justify-between text-sm">
//       <span className="font-medium text-gray-600">{label}:</span>
//       <span className="text-gray-900">{value}</span>
//     </div>
//   );
// }
