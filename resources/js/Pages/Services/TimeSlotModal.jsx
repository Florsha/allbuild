import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function TimeSlotModal({ open, onClose, slotsForDate, selectedDate, onSelectSlot }) {
  if (!open) return null;
    const modalRef = useRef(null);

    // Scroll and focus when modal opens
    useEffect(() => {
        if (open && modalRef.current) {
        modalRef.current.focus();
        modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [open, selectedDate]);


    
  const isAvailable = slot => slot.slot < 50; // you can change logic here

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        ref={modalRef}
        tabIndex={-1} 
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Appointment Time Slot
        </h2>

        <p className="text-gray-600 text-sm mb-4">
          Selected Date:
          <span className="font-semibold"> {selectedDate}</span>
        </p>

        {/* Legend */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#27D3F5] rounded"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span className="text-sm">Not Available</span>
          </div>
        </div>

        {/* Slot List */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-1">

          {slotsForDate.map(slot => {
            const available = isAvailable(slot);
            return (
              <label
                key={slot.id}
                className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer 
                ${available ? "bg-blue-50 border-blue-300" : "bg-red-100 border-red-300 opacity-70"}`}
              >
                <div>
                  <p className="font-semibold">{slot.time}</p>
                  <p className="text-xs text-gray-500">Slot #{slot.slot}</p>
                </div>

                <input
                  type="radio"
                  name="slot"
                  disabled={!available}
                  onChange={() => onSelectSlot(slot)}
                />
              </label>
            );
          })}

        </div>

        {/* Confirm Button */}
        <button
          onClick={onClose}
          className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Confirm
        </button>
      </motion.div>
    </div>
  );
}
