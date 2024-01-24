import "./loading.css";
const LoadingSpinner = () => {
  return (
    <div id="loader">
      <svg
        style={{
          margin: "auto",
          display: "block",
          shapeRendering: "auto",
          animationPlayState: "running",
          animationDelay: "0s",
        }}
        width="200px"
        height="200px"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <path
          d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50"
          fill="#d62252"
          stroke="none"
          style={{
            animationPlayState: "running",
            animationDelay: "0s",
          }}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            keyTimes="0;1"
            values="0 50 51;360 50 51"
            style={{
              animationPlayState: "running",
              animationDelay: "0s",
            }}
          ></animateTransform>
        </path>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
