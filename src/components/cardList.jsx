import { useEffect, useLayoutEffect, useRef } from "react";
import Card from "./card";
import { useCalendar } from "./calendar";

const CardList = ({ cards }) => {
  const { setSelectedDay, setSelectedMonth } = useCalendar();

  const section = useRef();
  useLayoutEffect(() => {
    const header = document.getElementById("calendar-header");
    const headerRect = header.getBoundingClientRect();
    section.current.style.paddingTop = `${headerRect.height + 24}px`;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Extract date and month from the data of the intersecting entry
            const { date, month } = entry.target.dataset;
            setSelectedDay(date);
            setSelectedMonth(month);
          }
        });
      },
      {
        threshold: 1.0,
      }
    );

    // Observe each card
    const cards = document.querySelectorAll("section.card");
    cards.forEach((card) => observer.observe(card));

    return () => {
      // Clean up
      cards.forEach((card) => observer.unobserve(card));
    };
  }, [setSelectedDay, setSelectedMonth]);
  return (
    <section id="card-list" ref={section}>
      {!!cards.length && cards.map((obj) => <Card obj={obj} key={obj.id} />)}
    </section>
  );
};

export default CardList;
