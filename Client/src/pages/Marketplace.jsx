import React from "react";
import Navbar from "../components/Navbar";

function Marketplace() {
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
  <div style={{ padding: "40px" }}>
    <h1 style={{ color: "#22c55e" }}>Marketplace Working</h1>
    <p>If you can see this page, Navbar and routing are both working.</p>
  </div>
</div>


);
}

export default Marketplace;
