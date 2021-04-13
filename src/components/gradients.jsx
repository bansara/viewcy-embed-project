import React from "react";

const Gradients = () => {
  return (
    <div className="gradients">
      <div className="color-splash pink" id="top"></div>
      <div className="color-splash pink" id="far-left"></div>
      <div className="color-splash purple" id="left"></div>
      <div className="color-splash purple" id="bottom"></div>
    </div>
  );
};

export default React.memo(Gradients);
