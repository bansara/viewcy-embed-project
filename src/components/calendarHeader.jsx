import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";

// import { useCalendar } from "./calendar";

import {
  structureDataByMonth,
  getEventsByMonth,
  getUniqueEventDays,
} from "./calendarFunctions";

const CalendarHeader = ({ data }) => {
  const [structuredData, setStructuredData] = useState();
  const [selectedMonthEvents, setSelectedMonthEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  function handleDateSelected(day) {
    setSelectedDate(day);
  }

  useEffect(() => {
    if (data.length) {
      const structured = structureDataByMonth(data);
      setStructuredData(structured);
      setSelectedMonth(Object.keys(structured)[0]);
    }
  }, [data, setSelectedMonth]);
  useEffect(() => {
    if (structuredData) {
      const monthlyEvents = getEventsByMonth(selectedMonth, structuredData);
      const uniqueEventDays = getUniqueEventDays(monthlyEvents);
      setSelectedMonthEvents(uniqueEventDays);
    }
  }, [selectedMonth, structuredData]);

  useEffect(() => {
    if (selectedDate) {
      const card = document.getElementById(selectedDate.id);
      const header = document.getElementById("calendar-header");

      if (card && header) {
        const cardRect = card.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();

        // Calculate the top position to scroll to
        const topPositionToScroll =
          cardRect.top + window.pageYOffset - headerRect.height - 24;

        // Scroll to the calculated position
        window.scroll({
          top: topPositionToScroll,
          behavior: "smooth",
        });
      }
    }
  }, [selectedDate]);

  return (
    <nav id="calendar-header">
      <div id="back">
        <button
          className="nav-button"
          aria-label="back"
          onClick={() => window.history.back()}
        >
          <IoIosArrowBack fontSize={"18px"} />
        </button>
      </div>
      <div className="scroll-container">
        {!!structuredData &&
          Object.keys(structuredData).map((month) => (
            <button
              className={`nav-button ${
                month === selectedMonth ? "selected-button" : ""
              }`}
              onClick={(e) => setSelectedMonth(month)}
              key={month}
            >
              {month}
            </button>
          ))}
      </div>
      <div className="scroll-container">
        {!!selectedMonthEvents.length &&
          selectedMonthEvents.map((day) => (
            <button
              className={`nav-button ${
                selectedDate?.date === day.date &&
                selectedMonth === selectedDate?.month
                  ? "selected-button"
                  : ""
              }`}
              key={day.date}
              onClick={() => handleDateSelected(day)}
            >
              {day.dayOfWeek} {day.date}
            </button>
          ))}
      </div>
      <div className="days"></div>
    </nav>
  );
};
export default CalendarHeader;
