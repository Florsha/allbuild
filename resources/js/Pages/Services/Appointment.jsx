import { useState, useRef ,useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import TimeSlotModal from "./TimeSlotModal";

export default function CalendarBooking({error, client_slot, manageAppointments, onAppointmentChange}) {
  console.log("manageAppointments", manageAppointments);
console.log("error", error);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Month");

  const timeSlotRef = useRef(null);

  // Get calendar data
  const { year, month, monthName, daysInMonth, firstDayOfWeek } = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    
    return { year, month, monthName, daysInMonth, firstDayOfWeek };
  }, [currentDate]);
 
  const handleSelectDate = (date) => {

     const slotsForDate = manageAppointments.filter(
      (item) => item.effective_date === date
    );
    
    setTimeout(() => {
      timeSlotRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    })

    setSelectedSlots(slotsForDate);
    setSelectedDate(date);
    setShowModal(true);

    // Later: open modal to show timeslots
  };

  // Navigate months
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const availableDates = useMemo(() => {
  return new Set(manageAppointments.map(a => a.effective_date));
}, [manageAppointments]);

const renderCalendarDays = () => {
  const days = [];
  const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - firstDayOfWeek + 1;
    const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;

    let fullDate = null;
    let isAvailable = false;
    let isPast = false;
    let isFullyBookedDay = false;
  
    if (isValidDay) {
      const monthNumber = String(month + 1).padStart(2, "0");
      const dayStr = String(dayNumber).padStart(2, "0");
      fullDate = `${year}-${monthNumber}-${dayStr}`;

      const now = new Date();

      const bookingCount = {};
        client_slot.forEach(b => {
          bookingCount[b.appointment_id] =
            (bookingCount[b.appointment_id] || 0) + 1;
        });
        
      // Get all slots for this date
      const slotsForDate = manageAppointments.filter(a => {
        return a.effective_date === fullDate;
      });

      // No slots = no color
      if (slotsForDate.length > 0) {
        const allFull = slotsForDate.every(slot => {
          console.log(slot);
          const booked = bookingCount[slot.id] || 0;
          const capacity = slot.slot ?? 1;
          return booked >= capacity;
        });

        if (allFull) {
          isFullyBookedDay = true;
        }
      }

      // Detect available / past (only if not full)
      if (!isFullyBookedDay && slotsForDate.length > 0) {
        const upcomingSlots = slotsForDate.filter(slot => {
          const slotDT = new Date(`${slot.effective_date}T${slot.time}`);
          return slotDT > now;
        });

        if (upcomingSlots.length > 0) {
          isAvailable = true;
        } else {
          isPast = true;
        }
      }

    }

    // Background logic  
 
    
    let bgColor = "bg-white";
    if (isFullyBookedDay) bgColor = "bg-gray-300";
    else if (isPast) bgColor = "bg-gray-300";
    else if (isAvailable) bgColor = "bg-[#81C784]";

        // clickable only for available
    const clickableClasses = isAvailable
      ? "cursor-pointer hover:brightness-110"
      : "cursor-default";

   days.push(
      <motion.div
        key={i}
        onClick={() => isAvailable && handleSelectDate(fullDate)}
        className={`border border-gray-200 p-1 sm:p-2 h-[60px] sm:h-[80px] md:h-[100px] text-xs sm:text-sm ${bgColor} ${clickableClasses}`}
        whileHover={isAvailable ? { scale: 1.03 } : {}}
      >
        {isValidDay && (
          <div className="text-sm font-semibold text-gray-700">{dayNumber}</div>
        )}
      </motion.div>
    );
  }
  return days;
};

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Book Calendar</h1>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{monthName}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          {["Month", "Week", "Day"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                view === v
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-300">
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
            (day) => (
              <div
                key={day}
                className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
              >
                {day}
              </div>
            )
          )}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {renderCalendarDays()}
        </div>
      </div>

        {/* <TimeSlotModal
          open={showModal}
          onClose={() => setShowModal(false)}
          slotsForDate={selectedSlots}
          selectedDate={selectedDate}
          slot_client={client_slot}
           onSelectSlot={(slot) => {
            setSelectedSlot(slot);
            onAppointmentChange(slot.id); // <-- send value UP to parent
          }}
        />
       {error && (
          <p className="text-red-500 text-sm mt-2 font-bold">{error}</p>
        )} */}

        {/* TIME SLOT SECTION */}
        {/* <div
          ref={timeSlotRef}
          className="mt-12 scroll-mt-24"
        >
          {selectedDate && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  Appointment Time Slots
                </h2>

                <p className="text-xs text-gray-500 mb-4">
                  Selected Date: <span className="font-medium">{selectedDate}</span>
                </p>

                <div className="grid gap-3">
                  {selectedSlots.map(slot => {
                    const bookedCount = client_slot.filter(
                      s => s.appointment_id === slot.id
                    ).length;

                    const remaining = slot.slot - bookedCount;
                    const available = remaining > 0;

                    return (
                      <label
                        key={slot.id}
                        className={`flex justify-between items-center p-3 rounded-lg border transition
                          ${available
                            ? "bg-green-50 border-green-300 hover:bg-green-100 cursor-pointer"
                            : "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        <div>
                          <p className="text-sm font-medium">{slot.time}</p>
                          <p className="text-[11px]">
                            Capacity: {bookedCount}/{slot.slot}
                          </p>
                        </div>

                        <input
                          type="radio"
                          name="slot"
                          disabled={!available}
                          checked={selectedSlot?.id === slot.id}
                          onChange={() => {
                            setSelectedSlot(slot);
                            onAppointmentChange(slot.id);
                          }}
                          className="accent-green-600"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 border rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Legend
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded bg-green-400" />
                      <span className="text-gray-700">Available Slot</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="w-4 h-4 rounded bg-gray-400" />
                      <span className="text-gray-600">Fully Booked / Disabled</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4 font-bold">{error}</p>
          )}
        </div> */}

        {/* TIME SLOT SECTION — GUIDED TIMELINE */}
        <div ref={timeSlotRef} className="mt-16 scroll-mt-24">
          {selectedDate && (
            <div className="max-w-4xl mx-auto">

              {/* Header */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Choose Your Appointment Time
                </h2>
                <p className="text-sm text-gray-500">
                  Available slots for <span className="font-medium">{selectedDate}</span>
                </p>
              </div>

              <div className="relative border-l-2 border-gray-200 pl-6 space-y-4">

                {selectedSlots.map(slot => {
                  const bookedCount = client_slot.filter(
                    s => s.appointment_id === slot.id
                  ).length;

                  const remaining = slot.slot - bookedCount;
                  const available = remaining > 0;

                  return (
                    <div
                      key={slot.id}
                      className={`relative group rounded-xl p-4 transition
                        ${available
                          ? "bg-white border shadow-sm hover:shadow-md cursor-pointer"
                          : "bg-gray-100 border text-gray-400 cursor-not-allowed"
                        }
                        ${selectedSlot?.id === slot.id
                          ? "ring-2 ring-green-500"
                          : ""
                        }`}
                      onClick={() => {
                        if (!available) return;
                        setSelectedSlot(slot);
                        onAppointmentChange(slot.id);
                      }}
                    >
                      {/* Timeline Dot */}
                      <span
                        className={`absolute -left-[38px] top-6 w-4 h-4 rounded-full
                          ${available ? "bg-green-500" : "bg-gray-400"}`}
                      />

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-sm">{slot.time}</p>
                          <p className="text-xs mt-1">
                            Capacity: {bookedCount}/{slot.slot}
                          </p>
                        </div>

                        <span
                          className={`text-xs font-medium px-3 py-1 rounded-full
                            ${available
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-500"
                            }`}
                        >
                          {available ? "Available" : "Fully Booked"}
                        </span>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* Legend */}
              <div className="mt-8 flex gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-green-500" />
                  Available
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gray-400" />
                  Fully Booked
                </div>
              </div>

            </div>
          )}

          {error && (
            <p className="text-red-500 text-sm mt-4 font-semibold text-center">
              {error}
            </p>
          )}
        </div>
    </div>
  );
  
}