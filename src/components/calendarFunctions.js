export function structureDataByMonth(data) {
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
  let structuredData = {};

  data.forEach((item) => {
    if (item.events && item.events.length > 0) {
      const eventDate = new Date(item.events[0].starts_at);
      const monthName = months[eventDate.getMonth()];

      if (!structuredData[monthName]) {
        structuredData[monthName] = [];
      }

      structuredData[monthName].push(item);
    }
  });

  return structuredData;
}

export function getEventsByMonth(monthKey, structuredData) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let eventsForMonth = [];

  if (structuredData[monthKey]) {
    structuredData[monthKey].forEach((item) => {
      if (item.events && item.events.length > 0) {
        const eventDate = new Date(item.events[0].starts_at);
        const day = eventDate.getDate();
        const dayOfWeek = daysOfWeek[eventDate.getDay()];

        eventsForMonth.push({
          date: day,
          dayOfWeek: dayOfWeek,
          id: item.id,
          month: monthKey,
        });
      }
    });
  }

  return eventsForMonth;
}

export function getUniqueEventDays(events) {
  let uniqueDays = [];

  events.forEach((event) => {
    if (!isDayInArray(event, uniqueDays)) {
      uniqueDays.push({
        date: event.date,
        dayOfWeek: event.dayOfWeek,
        id: event.id,
        month: event.month,
      });
    }
  });

  function isDayInArray(event, array) {
    return array.some((item) => item.date === event.date);
  }

  return uniqueDays;
}

function hexToRgb(hex) {
  // Remove the "#" if it's present
  hex = hex.replace(/^#/, "");

  // Parse the hex string into RGB components
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r, g, b];
}

function calculateLuminance([r, g, b]) {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function isLightMode(hex1, hex2) {
  const luminance1 = calculateLuminance(hexToRgb(hex1));
  const luminance2 = calculateLuminance(hexToRgb(hex2));

  return luminance1 > luminance2;
}

export function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
/**
 * scrolling code for CaledarHeader - works, but buggy
 */
// useEffect(() => {
//   const handleScroll = () => {
//     const header = document.getElementById("calendar-header");
//     const headerHeight = header ? header.offsetHeight : 0;
//     const cards = document.querySelectorAll(".card");
//     cards.forEach((card) => {
//       const rect = card.getBoundingClientRect();

//       const isVisible =
//         rect.top >= headerHeight &&
//         rect.bottom <= headerHeight + rect.height * 2 + 24;

//       if (isVisible) {
//         const { month } = card.dataset;
//         // This card is fully visible below the header - update the state accordingly
//         const id = +card.id;
//         const monthlyEvents = getEventsByMonth(month, structuredData);
//         const eventDateObj = monthlyEvents.find((obj) => obj.id === id);
//         console.log(eventDateObj);
//         if (eventDateObj) {
//           setSelectedDate(eventDateObj);
//           setSelectedMonth(month);
//         }
//       }
//     });
//   };
//   const debouncedScrollHandler = debounce(handleScroll, 100);

//   window.addEventListener("scroll", debouncedScrollHandler);

//   return () => {
//     window.removeEventListener("scroll", debouncedScrollHandler);
//   };
// }, [selectedMonth, structuredData]);
