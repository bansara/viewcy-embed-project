import { Link } from "react-router-dom";
import { HiOutlineLink } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

import "./popup.css";

const PopUp = ({ link, setShowing }) => {
  const relativeLink = link.split(".com")[1];

  function copyLink() {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link copied to clipboard"));
  }

  return (
    <div className="overlay" onClick={() => setShowing(false)}>
      <section className="popup" onClick={(e) => e.stopPropagation()}>
        <IoMdClose
          className="close"
          size="1.5rem"
          onClick={() => setShowing(false)}
        />
        <h2>Voila!</h2>
        <div className="link" onClick={copyLink}>
          <input type="text" readOnly value={link} />
          <span>
            <HiOutlineLink size="0.75rem" style={{ marginRight: "0.5rem" }} />
            Copy link
          </span>
        </div>
        <Link to={relativeLink}>
          <button className="visit" onClick={() => setShowing(false)}>
            Visit page
          </button>
        </Link>
      </section>
      <Toaster />
    </div>
  );
};

export default PopUp;
