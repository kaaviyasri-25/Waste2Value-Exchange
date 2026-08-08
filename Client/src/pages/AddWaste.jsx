import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

function AddWaste() {
const [formData, setFormData] = useState({
title: "",
category: "",
quantity: "",
price: "",
location: ""
});
const estimatePrice = (category, quantity) => {
  const rates = {
    Plastic: 18,
    Metal: 42,
    Paper: 10,
    "E-Waste": 65,
    Glass: 8,
    Organic: 5
  };

  const rate = rates[category] || 12;
  return rate * Number(quantity || 0);
};

const handleChange = (e) => {
  const { name, value } = e.target;

  const updatedData = {
    ...formData,
    [name]: value
  };

  if (name === "category" || name === "quantity") {
    updatedData.price = estimatePrice(
      name === "category" ? value : updatedData.category,
      name === "quantity" ? value : updatedData.quantity
    );
  }

  setFormData(updatedData);
};

const handleSubmit = async (e) => {
e.preventDefault();


try {
  await axios.post(
    "https://waste2value-backend.onrender.com/api/listings",
    {
      title: formData.title,
      category: formData.category,
      description: formData.title,
      quantity: Number(formData.quantity),
      unit: "kg",
      expectedPrice: Number(formData.price),
      location: formData.location,
      quality: "Medium",
      images: [],
      seller: "Guest User"
    }
  );

  alert("Waste listing added successfully!");

  setFormData({
    title: "",
    category: "",
    quantity: "",
    price: "",
    location: ""
  });
} catch (error) {
  console.error(error.response?.data || error.message);
  alert(JSON.stringify(error.response?.data || error.message));
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

```
  <div
    style={{
      padding: "40px",
      maxWidth: "600px",
      margin: "auto"
    }}
  >
    <h1
      style={{
        color: "#22c55e",
        marginBottom: "30px"
      }}
    >
      Add Waste Listing
    </h1>

    <form onSubmit={handleSubmit}>
      <input
        name="title"
        value={formData.title}
        placeholder="Waste Name"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="category"
        value={formData.category}
        placeholder="Category (Plastic, Metal, E-Waste)"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
        name="quantity"
        value={formData.quantity}
        placeholder="Quantity (Kg)"
        onChange={handleChange}
        style={inputStyle}
      />

      <input
  name="price"
  value={formData.price}
  placeholder="AI Estimated Price"
  readOnly
  style={inputStyle}
/>
<p style={{ color: "#22c55e", marginTop: "-8px", marginBottom: "16px" }}>
  AI Recommended Price: ₹{formData.price || 0}
</p>

      <input
        name="location"
        value={formData.location}
        placeholder="Location"
        onChange={handleChange}
        style={inputStyle}
      />

      <button
        type="submit"
        style={{
          background: "#22c55e",
          border: "none",
          padding: "14px",
          width: "100%",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Add Waste
      </button>
    </form>
  </div>
</div>


);
}

const inputStyle = {
width: "100%",
padding: "14px",
marginBottom: "15px",
borderRadius: "10px",
border: "none",
background: "#1e293b",
color: "white"
};

export default AddWaste;
