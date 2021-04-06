import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { isValidHexCode } from "../utils/isHex";

import Card from "./card";

const List = () => {
  const [data, setData] = useState([]);
  const { username, bg, text, button } = useParams();

  useEffect(() => {
    const apiURL = `https://www.viewcy.com/api/o/${username}/courses`;

    async function getApiData() {
      const { data } = await axios.get(apiURL);

      setData(data.data);
    }

    if (bg !== undefined && isValidHexCode(bg)) {
      let r = parseInt(bg.slice(0, 2), 16);
      let g = parseInt(bg.slice(2, 4), 16);
      let b = parseInt(bg.slice(4), 16);

      console.log(r, g, b);

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
      {!!data.length && data.map((obj) => <Card obj={obj} key={obj.id} />)}
    </main>
  );
};

export default List;
