import React from "react";

const Footer = () => {
  return (
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
  );
};

export default React.memo(Footer);
