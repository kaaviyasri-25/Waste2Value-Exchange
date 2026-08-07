import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Marketplace() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          "https://waste2value-backend.onrender.com/api/listings"
        );
        setListings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);
  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.location.toLowerCase().includes(search.toLowerCase())
);

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

      <div style={{ padding: "40px" }}>
        <h1 style={{ color: "#22c55e", marginBottom: "30px" }}>
          Waste Marketplace
        </h1>
        <input
  type="text"
  placeholder="Search by waste name or location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    background: "#1e293b",
    color: "white"
  }}
/>

        {loading ? (
          <p>Loading listings...</p>
        ) : listings.length === 0 ? (
          <p>No listings available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px"
            }}
          >
            {filteredListings.map((item) => (
              <div
                key={item._id}
                style={{
                  background: "#1e293b",
                  borderRadius: "16px",
                  padding: "20px",
                  border: "1px solid #334155"
                }}
              >
                <h3 style={{ color: "#22c55e", marginBottom: "10px" }}>
                  {item.title}
                </h3>

                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Quantity:</strong> {item.quantity} {item.unit}</p>
                <p><strong>Expected Price:</strong> ₹{item.expectedPrice}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Status:</strong> {item.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );


export default Marketplace;