import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from 'axios';

function AddWaste() {

  const [formData, setFormData] = useState({
    title:"",
    category:"",
    quantity:"",
    price:"",
    location:""
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
  e.preventDefault();

  const newListing = {
    title: formData.title,
    category: formData.category,
    quantity: formData.quantity,
    price: formData.price,
    location: formData.location
  };

  const existingListings = JSON.parse(localStorage.getItem('wasteListings')) || [];
  existingListings.push(newListing);
  localStorage.setItem('wasteListings', JSON.stringify(existingListings));

  alert('Waste listing added successfully!');

  setFormData({
    title: '',
    category: '',
    quantity: '',
    price: '',
    location: ''
  });
};

  return (
    <div
      style={{
        minHeight:"100vh",
        background:"#0f172a",
        color:"white",
        fontFamily:"Arial"
      }}
    >

      <Navbar />

      <div
        style={{
          padding:"40px",
          maxWidth:"600px",
          margin:"auto"
        }}
      >

        <h1
          style={{
            color:"#22c55e",
            marginBottom:"30px"
          }}
        >
          Add Waste Listing
        </h1>


        <form onSubmit={handleSubmit}>

          <input
            name="title"
            placeholder="Waste Name"
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            name="category"
            placeholder="Category (Plastic, Metal, E-Waste)"
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            name="quantity"
            placeholder="Quantity (Kg)"
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            name="price"
            placeholder="Expected Price"
            onChange={handleChange}
            style={inputStyle}
          />


          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
            style={inputStyle}
          />


          <button
            type="submit"
            style={{
              background:"#22c55e",
              border:"none",
              padding:"14px",
              width:"100%",
              borderRadius:"10px",
              fontWeight:"bold",
              cursor:"pointer"
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
  width:"100%",
  padding:"14px",
  marginBottom:"15px",
  borderRadius:"10px",
  border:"none",
  background:"#1e293b",
  color:"white"
};


export default AddWaste;