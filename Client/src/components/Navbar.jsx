import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        background: "#020617",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000
      }}
    >

      {/* Logo */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#22c55e",
          fontSize: "1.5rem",
          fontWeight: "bold"
        }}
      >
        ♻️ Waste2Value
      </Link>


      {/* Menu */}
      <div
        style={{
          display: "flex",
          gap: "25px"
        }}
      >

        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>


        <Link
          to="/marketplace"
          style={linkStyle}
        >
          Marketplace
        </Link>


        <Link
          to="/add-waste"
          style={linkStyle}
        >
          Add Waste
        </Link>


        <Link
          to="/dashboard"
          style={linkStyle}
        >
          Dashboard
        </Link>


        <Link
          to="/login"
          style={buttonStyle}
        >
          Login
        </Link>

      </div>

    </nav>
  );
}


const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1rem"
};


const buttonStyle = {
  background: "#22c55e",
  color: "#020617",
  padding: "8px 18px",
  borderRadius: "20px",
  textDecoration: "none",
  fontWeight: "bold"
};


export default Navbar;