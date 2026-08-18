import { Routes, Route } from "react-router-dom";

import Home from "../pages/home";
import Marketplace from "../pages/Marketplace";
import AddWaste from "../pages/AddWaste";
import Profile from "../pages/profile";
import MyOffers from "../pages/MyOffers";
import ReceivedOffers from "../pages/ReceivedOffers";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Wishlist from "../pages/Wishlist";

export default function AppRoutes() {
  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={<Home />}
      />

      {/* MARKETPLACE */}
      <Route
        path="/marketplace"
        element={<Marketplace />}
      />

      {/* ADD WASTE */}
      <Route
        path="/add-waste"
        element={<AddWaste />}
      />

      {/* DASHBOARD */}
      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      {/* MY OFFERS */}
      <Route
        path="/my-offers"
        element={<MyOffers />}
      />

      {/* RECEIVED OFFERS */}
      <Route
        path="/received-offers"
        element={<ReceivedOffers />}
      />

      {/* PROFILE */}
      <Route
        path="/profile"
        element={<Profile />}
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={<Login />}
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={<Register />}
      />

      {/* WISHLIST */}
      <Route
        path="/wishlist"
        element={<Wishlist />}
      />
    </Routes>
  );
}