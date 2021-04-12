import { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./home.css";
import { isValidHexCode, removePrefix, isValidUsername } from "../utils/isHex";
import PopUp from "./popup";

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
  }, []);

  useEffect(() => {
    if (isValidUsername(organization)) {
      orgInput.current.classList.remove("input-error");
      setOrganizationErr("");
    }
  }, [organization]);
  useEffect(() => {
    if (isValidHexCode(bg)) {
      bgInput.current.classList.remove("input-error");
      setBgErr("");
    }
  }, [bg]);
  useEffect(() => {
    if (isValidHexCode(text)) {
      textInput.current.classList.remove("input-error");
      setTextErr("");
    }
  }, [text]);
  useEffect(() => {
    if (isValidHexCode(button)) {
      buttonInput.current.classList.remove("input-error");
      setButtonErr("");
    }
  }, [button]);

  function validate() {
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
      setLink(
        `https://viewcyembed.com/${organization}/${bgColor}/${textColor}/${buttonColor}`
      );
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
      <button className="generate" onClick={validate}>
        Generate page
      </button>
      <div className="info">
        <p className="bold">Looking for more options?</p>
        <ul>
          <li>Custom Font</li>
          <li>Separate sections for categories or tags</li>
          <li>Custom header with your logo</li>
        </ul>
        <p>With Viewcy's open platform, anything is possible</p>
        <p>
          <a href="https://jalopytheatre.netlify.app">See this example</a> of a
          custom integration.
        </p>
        <p>
          To connect with a verified Viewcy expert, to start your custom
          integration project, contact{" "}
          <a href="mailto:ehren@viewcy.com">ehren@viewcy.com</a>.
        </p>
      </div>
      <div className="color-splash pink" id="top"></div>
      <div className="color-splash pink" id="far-left"></div>
      <div className="color-splash purple" id="left"></div>
      <div className="color-splash purple" id="bottom"></div>
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
