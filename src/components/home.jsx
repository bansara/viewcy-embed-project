import { useState, useRef, useLayoutEffect } from "react";
import "./home.css";
import { isValidHexCode, removePrefix, isValidUsername } from "../utils/isHex";
import PopUp from "./popup";
import Gradients from "./gradients";
import Footer from "./footer";

const Home = () => {
  const [organization, setOrganization] = useState("");
  const [organizationErr, setOrganizationErr] = useState("");
  const [bg, setBg] = useState("ffffff");
  const [bgErr, setBgErr] = useState("");
  const [text, setText] = useState("000000");
  const [textErr, setTextErr] = useState("");
  const [button, setButton] = useState("D60B52");
  const [buttonErr, setButtonErr] = useState("");
  const [link, setLink] = useState("");
  const [showing, setShowing] = useState(false);

  const bgInput = useRef();
  const textInput = useRef();
  const buttonInput = useRef();
  const orgInput = useRef();

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--bg", "white");
    document.documentElement.style.setProperty("--text", "black");
    document.documentElement.style.setProperty("--button", "rgb(196, 44, 84)");
    orgInput.current.focus();
    console.log("layout effect");
  }, []);

  function validate(isCalendar) {
    let valid = 0;

    let bgColor = removePrefix(bg);
    let textColor = removePrefix(text);
    let buttonColor = removePrefix(button);

    if (isValidUsername(organization)) {
      valid++;
      setOrganizationErr("");
      orgInput.current.classList.remove("input-error");
    } else {
      setOrganizationErr("Please enter a vaild username");
      orgInput.current.classList.add("input-error");
    }
    if (isValidHexCode(bgColor)) {
      valid++;
      bgInput.current.classList.remove("input-error");
      setBgErr("");
    } else {
      bgInput.current.classList.add("input-error");
      setBgErr("Please enter a valid hex code.");
    }
    if (isValidHexCode(textColor)) {
      valid++;
      textInput.current.classList.remove("input-error");
      setTextErr("");
    } else {
      textInput.current.classList.add("input-error");
      setTextErr("Please enter a valid hex code.");
    }
    if (isValidHexCode(buttonColor)) {
      valid++;
      buttonInput.current.classList.remove("input-error");
      setButtonErr("");
    } else {
      buttonInput.current.classList.add("input-error");
      setButtonErr("Please enter a valid hex code.");
    }

    if (valid === 4) {
      if (isCalendar) {
        setLink(
          `https://viewcyembed.com/calendar/${organization}?bg=${bgColor}&text=${textColor}&button=${buttonColor}`
        );
      } else {
        setLink(
          `https://viewcyembed.com/${organization}/${bgColor}/${textColor}/${buttonColor}`
        );
      }
      setShowing(true);
    }
  }

  return (
    <main className="home">
      {showing && <PopUp link={link} setShowing={setShowing} />}
      <h1 className="site-title">Viewcy Embed Project</h1>
      <p className="gray" id="site-description">
        A free tool for creating a custom event listing page for your Viewcy
        organization in 60 seconds.
      </p>
      <label htmlFor="organization">
        Your Viewcy organization username
        <p className="error">{organizationErr}</p>
      </label>
      <input
        type="text"
        name="organization"
        value={organization}
        placeholder="@"
        onChange={(e) => setOrganization(e.target.value)}
        ref={orgInput}
      />
      <label htmlFor="bg">
        Background color (hex code)
        <span className="gray label-line">
          Need help?{" "}
          <a
            href="https://www.google.com/search?q=color+picker"
            target="_blank"
            rel="noreferrer noopener"
          >
            Go here.
          </a>
        </span>
        <p className="error">{bgErr}</p>
      </label>
      <input
        type="text"
        name="bg"
        value={bg}
        placeholder="#"
        onChange={(e) => setBg(e.target.value)}
        ref={bgInput}
      />
      <label htmlFor="text">
        Text color (hex code)
        <p className="error">
          {textErr}
          {!!textErr.length && googleHexLink()}
        </p>
      </label>
      <input
        type="text"
        name="text"
        value={text}
        placeholder="#"
        onChange={(e) => setText(e.target.value)}
        ref={textInput}
      />
      <label htmlFor="button">
        Button color (hex code)
        <span className="gray label-line">
          Choose a dark color suitable for white text.
        </span>
        <p className="error">
          {buttonErr}
          {!!buttonErr.length && googleHexLink()}
        </p>
      </label>
      <input
        type="text"
        name="button"
        value={button}
        placeholder="#"
        onChange={(e) => setButton(e.target.value)}
        ref={buttonInput}
      />
      <button className="generate" onClick={() => validate(false)}>
        Generate List page
      </button>
      <button className="calendar-button" onClick={() => validate(true)}>
        Generate Calendar page
      </button>
      <Footer />
      <Gradients />
    </main>
  );
};

export default Home;

function googleHexLink() {
  return (
    <span>
      {"  "}
      <a
        href="https://www.google.com/search?q=color+picker"
        target="_blank"
        rel="noreferrer noopener"
        className="error"
      >
        Go here for help.
      </a>
    </span>
  );
}
