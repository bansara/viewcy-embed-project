import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { isValidHexCode } from "../utils/isHex";
import CardList from "./cardList";
import { isLightMode } from "./calendarFunctions";

import "./calendar.css";
import CalendarHeader from "./calendarHeader";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const CalendarContext = React.createContext();

export function useCalendar() {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}

const Calendar = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  const value = {
    selectedDay,
    setSelectedDay,
    selectedMonth,
    setSelectedMonth,
  };

  const { username } = useParams();

  const query = useQuery();
  const bg = query.get("bg");
  const text = query.get("text"); // Replace 'paramName' with your parameter name
  const button = query.get("button"); // Replace 'paramName' with your parameter name

  useEffect(() => {
    const apiURL = `https://www.viewcy.com/api/o/${username.toLowerCase()}/courses`;

    async function getApiData() {
      axios
        .get(apiURL)
        .then(({ data }) => {
          setData(data.data);
        })
        .catch(() => setIsLoaded(true));
    }

    if (bg !== undefined && isValidHexCode(bg)) {
      let r = parseInt(bg.slice(0, 2), 16);
      let g = parseInt(bg.slice(2, 4), 16);
      let b = parseInt(bg.slice(4), 16);

      document.documentElement.style.setProperty(
        "--bg",
        `rgba(${r},${g},${b},1)`
      );
      document.documentElement.style.setProperty(
        "--transBg",
        `rgba(${r},${g},${b},0)`
      );
    }

    if (text !== undefined && isValidHexCode(text)) {
      document.documentElement.style.setProperty(
        "--text",
        `#${text.toLowerCase()}`
      );
    }

    if (button !== undefined && isValidHexCode(button)) {
      document.documentElement.style.setProperty(
        "--button",
        `#${button.toLowerCase()}`
      );
      document.documentElement.style.setProperty(
        "--buttonHover",
        `#${button.toLowerCase()}aa`
      );
    }

    if (bg !== undefined && text !== undefined) {
      document.documentElement.style.setProperty(
        "--buttonShade",
        isLightMode(bg, text) ? "rgba(0,0,0,.1)" : "rgba(255,255,255,.1)"
      );
    }

    getApiData();
  }, [username, bg, text, button]);

  return (
    <CalendarContext.Provider value={value}>
      {!!data.length && <CalendarHeader data={data} />}
      {!!data.length && <CardList cards={data} />}
    </CalendarContext.Provider>
  );
};

export default Calendar;
