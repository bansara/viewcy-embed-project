import {
  formatDate,
  formatParagraph,
  cleanHTML,
  getEventMonth,
  getEventDate,
} from "../utils/formatText";
import "./card.css";

const Card = ({ obj }) => {
  return (
    <section
      className="card"
      id={obj.id}
      data-month={getEventMonth(obj.events[0])}
      data-date={getEventDate(obj.events[0])}
    >
      <a href={obj.url} target="_blank" rel="noopener noreferrer">
        <img src={obj.featured_image} alt="" />
      </a>
      <div className="info">
        <a href={obj.url} target="_blank" rel="noopener noreferrer">
          <h1>{obj.name}</h1>
        </a>
        {!!obj.events.length && formatDate(obj)}
        <div className="details">
          <div className="title-description">
            {!!obj.description.length && (
              <p className="description">
                {formatParagraph(cleanHTML(obj.description))}
                <a className="read-more" href={obj.url}>
                  Read More
                </a>
              </p>
            )}
          </div>
          <div className="date-tickets">
            <a
              href={obj.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button-link"
            >
              <button className="tickets">Get Tickets</button>
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
