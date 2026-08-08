import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Marketplace() {
const [listings, setListings] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const [category, setCategory] = useState("All");

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

```
fetchListings();
```

}, []);

const filteredListings = listings.filter((item) => {
const matchesSearch =
item.title.toLowerCase().includes(search.toLowerCase()) ||
item.location.toLowerCase().includes(search.toLowerCase());

```
const matchesCategory =
  category === "All" || item.category === category;

return matchesSearch && matchesCategory;
```

});
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this listing?"
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://waste2value-backend.onrender.com/api/listings/${id}`
    );

    setListings((prev) => prev.filter((item) => item._id !== id));

    alert("Listing deleted successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to delete listing");
  }
};
const handleEdit = async (item) => {
  const newPrice = prompt(
    "Enter new expected price:",
    item.expectedPrice
  );

  if (newPrice === null) return;

  try {
    const res = await axios.put(
      `https://waste2value-backend.onrender.com/api/listings/${item._id}`,
      {
        expectedPrice: Number(newPrice)
      }
    );

    setListings((prev) =>
      prev.map((listing) =>
        listing._id === item._id ? res.data : listing
      )
    );

    alert("Listing updated successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to update listing");
  }
};

return (
<div
style={{
minHeight: "100vh",
background: "#0f172a",
color: "white",
fontFamily: "Arial"
}}
> <Navbar />


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

    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      style={{
        width: "100%",
        padding: "12px",
        marginBottom: "20px",
        borderRadius: "10px",
        border: "none",
        background: "#1e293b",
        color: "white"
      }}
    >
      <option value="All">All Categories</option>
      <option value="Plastic">Plastic</option>
      <option value="Metal">Metal</option>
      <option value="Paper">Paper</option>
      <option value="E-Waste">E-Waste</option>
      <option value="Glass">Glass</option>
      <option value="Organic">Organic</option>
    </select>

    {loading ? (
      <p>Loading listings...</p>
    ) : filteredListings.length === 0 ? (
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
            <p>
              <strong>Quantity:</strong> {item.quantity} {item.unit}
            </p>
            <p>
              <strong>Expected Price:</strong> ₹{item.expectedPrice}
            </p>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Status:</strong> {item.status}</p>
            <button
  onClick={() => handleDelete(item._id)}
  style={{
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
  
>
  Delete Listing
</button>
<button
  onClick={() => handleEdit(item)}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
  Edit Listing
</button>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


);
}

export default Marketplace;
