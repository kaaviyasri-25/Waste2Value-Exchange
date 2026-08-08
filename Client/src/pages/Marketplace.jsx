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
  <div style={{ background: "#0f172a", color: "white", minHeight: "100vh", padding: "40px" }}>
    <Navbar />
    <h1>Marketplace Test</h1>
    <p>Listings: {listings.length}</p>
  </div>
);
}

export default Marketplace;
