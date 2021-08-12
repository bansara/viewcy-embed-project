import "./card.css";

const Card = ({ obj }) => {
  function cleanHTML(string) {
    return string.replace(/<[^>]+>/g, " ").replace("&nbsp;", " ");
  }

  function formatDate(obj) {
    if (!obj.events.length) return null;
    const startDate = new Date(obj.events[0].starts_at);
    const date = startDate.toDateString();
    const startTime = startDate.getHours();
    const startMinutes = obj.events[0].starts_at.split("T")[1].slice(2, 5);

    const endDate = new Date(obj.events[0].ends_at);
    const endTime = endDate.getHours();
    const endMinutes = obj.events[0].ends_at.split("T")[1].slice(2, 5);

    const timeString = `${startTime % 12}${startMinutes}${
      startTime < 12 ? "AM" : "PM"
    } - ${endTime % 12}${endMinutes}${endTime < 12 ? "AM" : "PM"}`;

    return (
      <p className="date">
        <span>{`${date.slice(0, 3)}, ${date.slice(3)} `}</span>
        <span>{`${timeString}`}</span>
      </p>
    );
  }

  return (
    <section className="card">
      <a href={obj.url}>
        <img src={obj.featured_image} alt="" />
      </a>
      <div className="info">
        <a href={obj.url}>
          <h1>{obj.name}</h1>
        </a>
        <div className="details">
          <div className="title-description">
            {!!obj.description.length && (
              <p className="description">{cleanHTML(obj.description)}</p>
            )}
          </div>
          <div className="date-tickets">
            {!!obj.events.length && formatDate(obj)}
            <a href={obj.url} className="button-link">
              <button className="tickets">Tickets</button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;

/**
 * {
    "id": 3684,
    "uuid": "ukulele_iii__an_8_we",
    "category_id": 359,
    "object": "course",
    "name": "Ukulele III - An 8 Week Class with Doug Skinner on Zoom",
    "featured_image": "https://viewcy-heroku-production.s3.amazonaws.com/courses/featured_images/000/003/684/thumb/UKULELEIII.jpg?1616794303",
    "description": "<div><strong>Mondays at 6:00pm Dates: 4/5, 4/12, 4/19, 4/26, 5/3, 5/10, 5/17, 5/24 Make up: TBD</strong><br><br>Uke 3 goes beyond Uke 2, developing a greater repertory of chords, voicings, and strumming techniques, as well as more challenging chord solos<br>*For financial aid and payment plans contact Lynette at Lynette@jalopytheatre.org</div>",
    "url": "http://www.viewcy.com/e/ukulele_iii__an_8_we",
    "events": [
        {
            "object": "event",
            "uuid": "6e71eb2b-f29c-44f2-90b8-37de454a89b0",
            "name": "Ukulele III - An 8 Week Class with Doug Skinner on Zoom",
            "starts_at": "2021-04-05T22:00:00.000Z",
            "ends_at": "2021-04-05T23:00:00.000Z",
            "book_url": "http://www.viewcy.com/register/5718/2021-04-05"
        }
    ],
    "tickets": [
        {
            "object": "ticket",
            "uuid": "28e5ffd6-7b61-432d-861d-515d57251c96",
            "name": "Registration",
            "price": "255.0",
            "currency": "usd"
        }
    ],
    "tags": [
        {
            "object": "tag",
            "id": 1,
            "name": "ukulele"
        }
    ]
}
 */
