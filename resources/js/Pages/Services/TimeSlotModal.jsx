import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function TimeSlotModal({ open, onClose, slotsForDate, selectedDate, slot_client, onSelectSlot }) {

  const modalRef = useRef(null);

  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
      modalRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [open, selectedDate]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold text-gray-800 mb-2">Appointment Time Slot</h2>
            <p className="text-gray-600 text-sm mb-4">
              Selected Date: <span className="font-semibold">{selectedDate}</span>
            </p>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {slotsForDate.map(slot => {

                // Count booked clients for this slot.id
                const bookedCount = slot_client.filter(
                  s => s.appointment_id === slot.id
                ).length;
                
                // Available capacity
                const remaining = slot.slot - bookedCount;

                const available = remaining > 0;

                return (
                  <label
                    key={slot.id}
                    className={`flex justify-between items-center p-3 rounded-xl border cursor-pointer
                      ${available
                        ? "bg-blue-50 border-blue-300"
                        : "bg-red-100 border-red-300 opacity-70 cursor-not-allowed"
                      }`}
                  >
                    <div>
                      <p className="font-semibold">{slot.time}</p>
                      <p className="text-xs text-gray-500">
                        Capacity: {bookedCount}/{slot.slot}
                      </p>
                    </div>

                    <input
                      type="radio"
                      name="slot"
                      disabled={!available}
                      onChange={() => available && onSelectSlot(slot)}
                    />
                  </label>
                );
              })}
            </div>

            <button
              onClick={onClose}
              className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-colors"
            >
              Confirm
            </button>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
