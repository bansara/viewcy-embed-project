import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { isValidHexCode } from "../utils/isHex";

import LoadingSpinner from "./loading";
import LegacyCardList from "./legacyCardList";

const List = () => {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { username, bg, text, button } = useParams();
  useEffect(() => {
    const apiURL = `https://www.viewcy.com/api/o/${username.toLowerCase()}/courses`;

    async function getApiData() {
      axios
        .get(apiURL)
        .then(({ data }) => {
          setData(data.data);
          setIsLoaded(true);
          // console.log(data);
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
    }

    getApiData();
  }, [username, bg, text, button]);

  return (
    <main>
      {isLoaded ? (
        <div>
          {!!data.length && <LegacyCardList cards={data} />}
          {!data.length && isLoaded && (
            <div>
              <h1>There are no events to display at this time.</h1>
              <Link to="/" style={{ color: "black" }}>
                Back to home
              </Link>
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </main>
  );
};

export default List;
