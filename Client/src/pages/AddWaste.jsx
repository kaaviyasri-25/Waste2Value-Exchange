import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function AddWaste() {
  const navigate = useNavigate();

  // =========================
  // FORM STATES
  // =========================
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Plastic");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [expectedPrice, setExpectedPrice] = useState("");
  const [location, setLocation] = useState("");

  // =========================
  // PHOTO STATES
  // =========================
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  // =========================
  // LOADING
  // =========================
  const [loading, setLoading] = useState(false);

  // =========================
  // PHOTO CHANGE
  // =========================
  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setPhoto(null);
      setPhotoPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5 MB.");
      return;
    }

    setPhoto(file);

    const previewUrl = URL.createObjectURL(file);
    setPhotoPreview(previewUrl);

    // =========================
    // AI WASTE DETECTION
    // =========================
    const fileName = file.name.toLowerCase();

    if (
      fileName.includes("plastic") ||
      fileName.includes("bottle") ||
      fileName.includes("poly")
    ) {
      setCategory("Plastic");
    } else if (
      fileName.includes("metal") ||
      fileName.includes("iron") ||
      fileName.includes("steel") ||
      fileName.includes("aluminium")
    ) {
      setCategory("Metal");
    } else if (
      fileName.includes("paper") ||
      fileName.includes("cardboard") ||
      fileName.includes("newspaper")
    ) {
      setCategory("Paper");
    } else if (
      fileName.includes("glass") ||
      fileName.includes("jar")
    ) {
      setCategory("Glass");
    } else if (
      fileName.includes("electronic") ||
      fileName.includes("laptop") ||
      fileName.includes("phone") ||
      fileName.includes("mobile") ||
      fileName.includes("computer")
    ) {
      setCategory("E-Waste");
    } else if (
      fileName.includes("food") ||
      fileName.includes("organic") ||
      fileName.includes("vegetable")
    ) {
      setCategory("Organic");
    }
  };

  // =========================
  // CONVERT IMAGE TO BASE64
  // =========================
  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = () => {
        reject(new Error("Unable to read image"));
      };

      reader.readAsDataURL(file);
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter waste name.");
      return;
    }

    if (!category) {
      alert("Please select category.");
      return;
    }

    if (!quantity || Number(quantity) <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!expectedPrice || Number(expectedPrice) <= 0) {
      alert("Please enter a valid expected price.");
      return;
    }

    if (!location.trim()) {
      alert("Please enter location.");
      return;
    }

    try {
      setLoading(true);

      // =========================
      // CURRENT USER
      // =========================
      const currentUser =
        JSON.parse(localStorage.getItem("currentUser")) || {};

      // =========================
      // IMAGE
      // =========================
      let imageData = "";

      if (photo) {
        imageData = await convertImageToBase64(photo);
      }

      // =========================
      // SELLER NAME
      // =========================
      const sellerName =
        currentUser.name ||
        currentUser.email?.split("@")[0] ||
        "Waste2Value User";

      // =========================
      // LISTING
      // =========================
      const listing = {
        title: title.trim(),

        description: title.trim(),

        category: category,

        quantity: Number(quantity),

        unit: unit,

        expectedPrice: Number(expectedPrice),

        location: location.trim(),

        quality: "Medium",

        seller: sellerName,

        sellerEmail: currentUser.email || "",

        sellerId:
          currentUser._id ||
          currentUser.id ||
          "",

        status: "Available",

        images: imageData ? [imageData] : [],
      };

      console.log("Sending listing:", listing);

      // =========================
      // BACKEND
      // =========================
      const response = await axios.post(
        "https://waste2value-backend.onrender.com/api/listings",
        listing,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Listing created:", response.data);

      alert("Waste listing created successfully! ♻️");

      // =========================
      // RESET
      // =========================
      setTitle("");
      setCategory("Plastic");
      setQuantity("");
      setUnit("kg");
      setExpectedPrice("");
      setLocation("");
      setPhoto(null);
      setPhotoPreview("");

      // =========================
      // GO MARKETPLACE
      // =========================
      navigate("/marketplace");
    } catch (error) {
      console.error("Add Waste Error:", error);

      console.error(
        "Backend response:",
        error.response?.data
      );

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error;

      if (backendMessage) {
        alert(
          "Unable to create listing.\n\n" +
            backendMessage
        );
      } else if (error.response) {
        alert(
          "Backend error: " +
            error.response.status
        );
      } else {
        alert(
          "Unable to connect to backend. Please check if the backend is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // REMOVE PHOTO
  // =========================
  const removePhoto = () => {
    setPhoto(null);
    setPhotoPreview("");
  };

  // =========================
  // UI
  // =========================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        boxSizing: "border-box",
      }}
    >
      <Navbar />

      {/* =========================================
          CONTENT AREA
          Sidebar width = 250px
      ========================================= */}
      <main
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
          padding: "35px 40px 70px",
          boxSizing: "border-box",
        }}
      >
        {/* =========================================
            INNER CONTENT
        ========================================= */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          {/* =========================================
              HERO
          ========================================= */}
          <div
            style={{
              background:
                "linear-gradient(135deg, #166534, #14532d)",
              border: "1px solid #22c55e",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "25px",
              boxSizing: "border-box",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  fontSize: "42px",
                }}
              >
                ♻️
              </div>

              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "34px",
                    color: "#ecfdf5",
                  }}
                >
                  Add Waste
                </h1>

                <p
                  style={{
                    color: "#d1fae5",
                    margin:
                      "7px 0 0",
                    fontSize: "16px",
                  }}
                >
                  Turn your recyclable waste into value.
                </p>
              </div>
            </div>
          </div>

          {/* =========================================
              FORM
          ========================================= */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "20px",
              padding: "30px",
              boxSizing: "border-box",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.18)",
            }}
          >
            {/* WASTE NAME */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>
                Waste Name *
              </label>

              <input
                type="text"
                placeholder="Example: Plastic Bottles"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* CATEGORY */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>
                Category *
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                style={inputStyle}
              >
                <option value="Plastic">
                  Plastic
                </option>

                <option value="Metal">
                  Metal
                </option>

                <option value="Paper">
                  Paper
                </option>

                <option value="E-Waste">
                  E-Waste
                </option>

                <option value="Glass">
                  Glass
                </option>

                <option value="Organic">
                  Organic
                </option>
              </select>
            </div>

            {/* QUANTITY + UNIT */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "2fr 1fr",
                gap: "15px",
              }}
            >
              <div style={fieldWrapper}>
                <label style={labelStyle}>
                  Quantity *
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Example: 50"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                  style={inputStyle}
                />
              </div>

              <div style={fieldWrapper}>
                <label style={labelStyle}>
                  Unit
                </label>

                <select
                  value={unit}
                  onChange={(e) =>
                    setUnit(e.target.value)
                  }
                  style={inputStyle}
                >
                  <option value="kg">
                    kg
                  </option>

                  <option value="ton">
                    ton
                  </option>

                  <option value="pieces">
                    pieces
                  </option>
                </select>
              </div>
            </div>

            {/* EXPECTED PRICE */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>
                Expected Price (₹) *
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Example: 2500"
                value={expectedPrice}
                onChange={(e) =>
                  setExpectedPrice(
                    e.target.value
                  )
                }
                style={inputStyle}
              />
            </div>

            {/* LOCATION */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>
                Location *
              </label>

              <input
                type="text"
                placeholder="Example: Karur"
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                style={inputStyle}
              />
            </div>

            {/* PHOTO UPLOAD */}
            <div style={fieldWrapper}>
              <label style={labelStyle}>
                📷 Waste Photo
              </label>

              <div
                style={{
                  border:
                    "2px dashed #475569",
                  borderRadius: "14px",
                  padding: "20px",
                  background: "#0f172a",
                  textAlign: "center",
                }}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{
                    width: "100%",
                    padding: "12px",
                    boxSizing:
                      "border-box",
                    borderRadius: "10px",
                    border:
                      "1px solid #475569",
                    background:
                      "#1e293b",
                    color: "white",
                    cursor: "pointer",
                  }}
                />

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: "13px",
                    marginBottom: 0,
                  }}
                >
                  Upload a clear photo of
                  your recyclable waste
                </p>

                <p
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    marginBottom: 0,
                  }}
                >
                  Maximum size: 5 MB
                </p>
              </div>

              {/* PHOTO PREVIEW */}
              {photoPreview && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "15px",
                    background:
                      "#0f172a",
                    border:
                      "1px solid #334155",
                    borderRadius: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems:
                        "center",
                      marginBottom:
                        "10px",
                    }}
                  >
                    <p
                      style={{
                        color:
                          "#22c55e",
                        fontWeight:
                          "bold",
                        margin: 0,
                      }}
                    >
                      📷 Photo Preview
                    </p>

                    <button
                      type="button"
                      onClick={removePhoto}
                      style={{
                        background:
                          "#ef4444",
                        color: "white",
                        border: "none",
                        borderRadius:
                          "8px",
                        padding:
                          "7px 12px",
                        cursor:
                          "pointer",
                        fontWeight:
                          "bold",
                      }}
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <img
                    src={photoPreview}
                    alt="Waste Preview"
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                      borderRadius:
                        "10px",
                      display: "block",
                    }}
                  />

                  <p
                    style={{
                      color:
                        "#94a3b8",
                      fontSize:
                        "13px",
                      marginBottom: 0,
                      wordBreak:
                        "break-word",
                    }}
                  >
                    📄 {photo?.name}
                  </p>

                  {/* AI DETECTION */}
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "15px",
                      borderRadius:
                        "12px",
                      background:
                        "#052e16",
                      border:
                        "1px solid #22c55e",
                    }}
                  >
                    <div
                      style={{
                        color:
                          "#22c55e",
                        fontWeight:
                          "bold",
                        fontSize:
                          "16px",
                      }}
                    >
                      🤖 AI Waste Detection
                    </div>

                    <p
                      style={{
                        margin:
                          "8px 0 0",
                        color:
                          "#d1fae5",
                      }}
                    >
                      Detected Category:{" "}
                      <strong>
                        {category}
                      </strong>
                    </p>

                    <p
                      style={{
                        margin:
                          "5px 0 0",
                        color:
                          "#94a3b8",
                        fontSize:
                          "13px",
                      }}
                    >
                      ✓ Category
                      automatically
                      detected
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "10px",
                border: "none",
                borderRadius: "10px",
                background: loading
                  ? "#166534"
                  : "#22c55e",
                color: "#052e16",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Creating Listing..."
                : "♻️ Create Waste Listing"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

// =========================
// STYLES
// =========================

const fieldWrapper = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#cbd5e1",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "14px",
  boxSizing: "border-box",
  borderRadius: "10px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  outline: "none",
  fontSize: "15px",
};