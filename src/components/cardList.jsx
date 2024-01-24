import { useLayoutEffect, useRef } from "react";
import Card from "./card";

const CardList = ({ cards }) => {
  const section = useRef();
  useLayoutEffect(() => {
    const header = document.getElementById("calendar-header");
    if (header) {
      const headerRect = header.getBoundingClientRect();
      section.current.style.paddingTop = `${headerRect.height + 24}px`;
    }
  }, []);
  return (
    <section id="card-list" ref={section}>
      {!!cards.length && cards.map((obj) => <Card obj={obj} key={obj.id} />)}
    </section>
  );
};

export default CardList;
