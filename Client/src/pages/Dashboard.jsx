import React from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      <Navbar />

      <div
        style={{
          padding: "40px"
        }}
      >

        <h1
          style={{
            color:"#22c55e",
            fontSize:"2.5rem"
          }}
        >
          Waste2Value Dashboard
        </h1>


        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"20px",
            marginTop:"30px"
          }}
        >

          <div style={cardStyle}>
            <h2>120</h2>
            <p>Total Waste Listings</p>
          </div>


          <div style={cardStyle}>
            <h2>450 Kg</h2>
            <p>Waste Recycled</p>
          </div>


          <div style={cardStyle}>
            <h2>650 Kg</h2>
            <p>CO₂ Saved</p>
          </div>

        </div>

      </div>

    </div>
  );
}


const cardStyle = {
  background:"#1e293b",
  padding:"25px",
  borderRadius:"15px",
  textAlign:"center"
};


export default Dashboard;