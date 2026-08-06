import React from "react";
import Navbar from "../components/Navbar";

function Marketplace() {

  const wastes = [
    {
      name:"Plastic Bottles",
      category:"Plastic",
      price:"₹25/kg",
      quantity:"100 Kg"
    },
    {
      name:"Electronic Waste",
      category:"E-Waste",
      price:"₹150/kg",
      quantity:"50 Kg"
    },
    {
      name:"Metal Scrap",
      category:"Metal",
      price:"₹80/kg",
      quantity:"200 Kg"
    }
  ];


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

      <div style={{padding:"40px"}}>

        <h1
          style={{
            color:"#22c55e",
            fontSize:"2.5rem"
          }}
        >
          Waste Marketplace
        </h1>


        <p>
          Discover recyclable materials and connect with buyers.
        </p>


        <div
          style={{
            display:"grid",
            gridTemplateColumns:"repeat(3,1fr)",
            gap:"25px",
            marginTop:"30px"
          }}
        >

        {wastes.map((item,index)=>(

          <div
            key={index}
            style={{
              background:"#1e293b",
              padding:"25px",
              borderRadius:"15px"
            }}
          >

            <h2>{item.name}</h2>

            <p>
              Category: {item.category}
            </p>

            <p>
              Quantity: {item.quantity}
            </p>

            <h3
              style={{
                color:"#22c55e"
              }}
            >
              {item.price}
            </h3>


            <button
              style={{
                background:"#22c55e",
                border:"none",
                padding:"10px 20px",
                borderRadius:"10px",
                cursor:"pointer"
              }}
            >
              View Details
            </button>


          </div>

        ))}

        </div>

      </div>

    </div>
  );
}

export default Marketplace;