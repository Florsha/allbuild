import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import TimeSlotModal from "./TimeSlotModal";

export default function CalendarBooking({manageAppointments}) {
  console.log("manageAppointments", manageAppointments);

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("Month");

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
    
    setSelectedSlots(slotsForDate);
    setSelectedDate(date);
    setShowModal(true);
    console.log("Selected slotsForDate:", slotsForDate);

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

    if (isValidDay) {
      const monthNumber = String(month + 1).padStart(2, "0");
      const dayStr = String(dayNumber).padStart(2, "0");
      fullDate = `${year}-${monthNumber}-${dayStr}`;

      const now = new Date();

      // Get all slots for this date
      const slotsForDate = manageAppointments.filter(a => {
        return a.effective_date === fullDate;
      });

      // No slots = no color
      if (slotsForDate.length > 0) {
        const upcomingSlots = slotsForDate.filter(slot => {
          const slotDT = new Date(`${slot.effective_date}T${slot.time}`);
          return slotDT > now;
        });

        if (upcomingSlots.length > 0) {
          // At least 1 future time = available
          isAvailable = true;
        } else {
          // All times are past = past
          isPast = true;
        }
      }
    }

    // Background logic  
 
    
    let bgColor = "bg-white";
    if (isPast) bgColor = "bg-red-300";
    if (isAvailable) bgColor = "bg-[#FBDC62]";

        // clickable only for available
    const clickableClasses = isAvailable
      ? "cursor-pointer hover:brightness-110"
      : "cursor-default";

   days.push(
      <motion.div
        key={i}
        onClick={() => isAvailable && handleSelectDate(fullDate)}
        className={`min-h-32 border border-gray-200 p-2 ${bgColor} ${clickableClasses}`}
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

        <TimeSlotModal
          open={showModal}
          onClose={() => setShowModal(false)}
          slotsForDate={selectedSlots}
          selectedDate={selectedDate}
          onSelectSlot={(slot) => setSelectedSlot(slot)}
        />

    </div>
  );
  
}