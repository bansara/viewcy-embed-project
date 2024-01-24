import { FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
/**
 *
 * @param {*} string a viewcy api description string with html
 * @returns the string without the html tags
 */
export function cleanHTML(string) {
  return string.replace(/<[^>]+>/g, " ").replace(/&[a-zA-Z0-9]+;/g, " ");
}
/**
 *
 * @param {*} obj - a viewcy api event object
 * @returns a date string eg Friday, Jan 19, 2024
 */
function formatDayMonthYear(obj) {
  if (!obj.events.length) return null;
  const date = new Date(obj.events[0].starts_at);
  // Array of day names and month names
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the day name, month name, date, and year
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  // Construct and return the formatted string
  return `${dayName}, ${monthName} ${day}, ${year}`;
}

/**
 *
 * @param {*} obj a viewcy api event object
 * @returns an html paragraph to display event date and time
 */
export function formatDate(obj) {
  if (!obj.events.length) return null;
  const date = new Date(obj.events[0].starts_at);

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format minutes to always be two digits
  const minutesFormatted = `${minutes}`.padStart(2, "0");

  // Extract time zone abbreviation
  const timeZoneString = date
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")[2];

  // Construct formatted time
  const timeString = `${hours}:${minutesFormatted}${ampm} ${timeZoneString}`;

  return (
    <p className="date">
      <span>
        <FaRegCalendarAlt fontSize={"20px"} />
        {formatDayMonthYear(obj)}
      </span>
      <span>
        <FaRegClock fontSize={"20px"} />
        {`${timeString}`}
      </span>
    </p>
  );
}

export function formatParagraph(paragraph) {
  // The base length accounts for the "Read More" text and any necessary spaces and HTML characters
  const baseLength = "... ".length;
  const maxChars = window.innerWidth < 1024 ? 120 : 140;
  // Start with a full paragraph, then reduce word by word until it fits
  let words = paragraph.split(" ");
  let truncatedParagraph = paragraph;
  while (truncatedParagraph.length + baseLength > maxChars) {
    words.pop();
    truncatedParagraph = words.join(" ");
  }

  return `${truncatedParagraph}... `;
}

export function getEventMonth(eventObj) {
  const date = new Date(eventObj.starts_at);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months[date.getMonth()];
}

export function getEventDate(eventObj) {
  const date = new Date(eventObj.starts_at);
  return date.getDate();
}
