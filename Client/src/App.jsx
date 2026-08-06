import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />

      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
          fontFamily: "Arial"
        }}
      >
        <div>

          <h1
            style={{
              fontSize: "3rem",
              color: "#22c55e"
            }}
          >
            Waste2Value Exchange
          </h1>

          <p
            style={{
              fontSize: "1.2rem",
              maxWidth: "700px",
              margin: "20px auto"
            }}
          >
            AI-powered circular economy platform that transforms
            waste into valuable resources by connecting sellers,
            recyclers and industries.
          </p>

          <button
            style={{
              background: "#22c55e",
              border: "none",
              padding: "14px 30px",
              borderRadius: "12px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Explore Marketplace
          </button>

        </div>
      </div>
    </div>
  );
}

export default App;