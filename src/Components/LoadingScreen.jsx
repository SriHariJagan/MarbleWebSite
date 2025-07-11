// Components/LoadingScreen/LoadingScreen.jsx
import React from "react";
import { RingLoader } from "react-spinners";

const LoadingScreen = () => {
  const containerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    backgroundColor: "var(--primary-bg)",
    color: "var(--primary-text)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 9999,
    padding: "1rem",
  };

  return (
    <div style={containerStyle}>
      <RingLoader color="#0fddf7" size={120} />
    </div>
  );
};

export default LoadingScreen;
