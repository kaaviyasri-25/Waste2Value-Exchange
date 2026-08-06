import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Marketplace from "../pages/Marketplace";
import AddWaste from "../pages/AddWaste";
import Login from '../pages/Login';

import App from "../App";
import Dashboard from "../pages/Dashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/add-waste" element={<AddWaste />} />
        <Route path="/login" element={<Login />} />


      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;