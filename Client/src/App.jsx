import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import AddWaste from "./pages/AddWaste";
import Wishlist from "./pages/Wishlist";
import MyOffers from "./pages/MyOffers";
import ReceivedOffers from "./pages/ReceivedOffers";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0f172a",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* SIDEBAR */}
      <Navbar />

      {/* =========================
          CONTENT AREA
      ========================= */}
      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",

          boxSizing: "border-box",

          background: "#0f172a",

          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/add-waste"
            element={<AddWaste />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/my-offers"
            element={<MyOffers />}
          />

          <Route
            path="/received-offers"
            element={<ReceivedOffers />}
          />
        </Routes>
      </div>
    </div>
  );
}