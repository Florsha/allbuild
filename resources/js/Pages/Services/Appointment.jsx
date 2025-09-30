import { useState } from "react";
import { CalendarDaysIcon, ClockIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

export default function Appointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const times = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT COLUMN – Date & Time & Notes */}
      <div className="space-y-8">
        {/* Date Picker */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <CalendarDaysIcon className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-semibold text-gray-900">
              Choose Date
            </h4>
          </div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        {/* Time Picker */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <ClockIcon className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-semibold text-gray-900">
              Select Time
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {times.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className={`py-2 text-sm rounded-lg border transition ${
                  time === t
                    ? "bg-yellow-400 border-yellow-500 text-gray-900"
                    : "bg-gray-50 border-gray-300 hover:bg-yellow-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Notes (Optional) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
          <div className="flex items-center gap-3">
            <PencilSquareIcon className="w-6 h-6 text-yellow-400" />
            <h4 className="text-xl font-semibold text-gray-900">
              Notes (Optional)
            </h4>
          </div>
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any notes for your appointment..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          ></textarea>
        </div>
      </div>

      {/* RIGHT COLUMN – Summary / Illustration */}
      <div className="bg-gray-50 rounded-2xl shadow-inner p-8 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Your Appointment
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {date || "No date selected"}
            </p>
            <p>
              <span className="font-medium">Time:</span>{" "}
              {time || "No time selected"}
            </p>
            {notes && (
              <p>
                <span className="font-medium">Notes:</span> {notes}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center mt-8">
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Illustration"
            className="w-40 opacity-70"
          /> */}
        </div>

        {/* <button
          onClick={() => alert("Appointment booked!")}
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition mt-6"
        >
          Book Appointment
        </button> */}
      </div>
    </div>
  );
}
