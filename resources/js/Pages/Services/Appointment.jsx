import { useState } from "react";

export default function Appointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [service, setService] = useState("");
  const [note, setNote] = useState("");

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Appointment Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h3 className="text-2xl font-bold text-gray-900">Set Appointment</h3>

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        {/* Time Slots */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Time
          </label>
          <div className="grid grid-cols-3 gap-3">
            {availableTimes.map((t) => (
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

        {/* Service / Doctor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Service
          </label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          >
            <option value="">-- Choose Service --</option>
            <option value="Consultation">Consultation</option>
            <option value="Repair">Repair</option>
            <option value="Inspection">Inspection</option>
          </select>
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (optional)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => alert("Appointment booked")}
          className="w-full bg-yellow-400 text-gray-900 font-semibold py-3 rounded-lg hover:bg-yellow-500 transition"
        >
          Book Appointment
        </button>
      </div>

      {/* Right: Live Preview */}
      <div className="bg-gray-50 rounded-2xl shadow-inner p-6 space-y-4">
        <h4 className="text-lg font-bold text-gray-800">Your Appointment</h4>
        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Date:</span>{" "}
            {date || "No date selected"}
          </p>
          <p>
            <span className="font-medium">Time:</span>{" "}
            {time || "No time selected"}
          </p>
          <p>
            <span className="font-medium">Service:</span>{" "}
            {service || "No service selected"}
          </p>
          <p>
            <span className="font-medium">Note:</span>{" "}
            {note || "No notes added"}
          </p>
        </div>

        {/* Illustrative graphic */}
        <div className="flex items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            alt="Appointment illustration"
            className="w-40 opacity-70"
          />
        </div>
      </div>
    </div>
  );
}
