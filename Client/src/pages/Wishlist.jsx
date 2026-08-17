import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // =====================================================
  // LOAD USER + WISHLIST
  // =====================================================
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      setCurrentUser(null);
      setWishlist([]);
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);

      loadWishlist(user);
    } catch (error) {
      console.error("User loading error:", error);
      setCurrentUser(null);
      setWishlist([]);
    }
  }, []);

  // =====================================================
  // LOAD WISHLIST
  // =====================================================
  const loadWishlist = (user) => {
    const userEmail = String(user?.email || "")
      .trim()
      .toLowerCase();

    const userName = String(user?.name || "")
      .trim()
      .toLowerCase();

    const allWishlist =
      JSON.parse(
        localStorage.getItem("waste2valueWishlist")
      ) || [];

    const userWishlist = allWishlist.filter((item) => {
      const itemEmail = String(item.userEmail || "")
        .trim()
        .toLowerCase();

      const itemName = String(item.userName || "")
        .trim()
        .toLowerCase();

      return (
        (itemEmail && userEmail && itemEmail === userEmail) ||
        (itemName && userName && itemName === userName)
      );
    });

    setWishlist(userWishlist);
  };

  // =====================================================
  // REMOVE FROM WISHLIST
  // =====================================================
  const removeFromWishlist = (itemId) => {
    const confirmRemove = window.confirm(
      "Remove this item from your wishlist?"
    );

    if (!confirmRemove) {
      return;
    }

    const allWishlist =
      JSON.parse(
        localStorage.getItem("waste2valueWishlist")
      ) || [];

    const updatedWishlist = allWishlist.filter(
      (item) => item.id !== itemId
    );

    localStorage.setItem(
      "waste2valueWishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(
      wishlist.filter((item) => item.id !== itemId)
    );

    alert("Removed from wishlist.");
  };

  // =====================================================
  // NOT LOGGED IN
  // =====================================================
  if (!currentUser) {
    return (
      <div style={pageStyle}>
        <Navbar />

        <main style={contentStyle}>
          <div style={loginCardStyle}>
            <div style={{ fontSize: "60px" }}>
              🔐
            </div>

            <h1
              style={{
                color: "#22c55e",
                marginBottom: "10px",
              }}
            >
              Wishlist
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "16px",
              }}
            >
              Please login to view your wishlist.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================
  return (
    <div style={pageStyle}>
      <Navbar />

      <main style={contentStyle}>
        {/* =================================================
            HEADER
        ================================================= */}
        <div style={headerStyle}>
          <div>
            <h1 style={headerTitleStyle}>
              ❤️ Wishlist
            </h1>

            <p style={headerSubtitleStyle}>
              Your saved waste listings.
            </p>
          </div>

          <div style={headerIconStyle}>
            ❤️
          </div>
        </div>

        {/* =================================================
            COUNT
        ================================================= */}
        <div style={countCardStyle}>
          <div>
            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Saved Items
            </p>

            <h2
              style={{
                margin: "6px 0 0",
                color: "#22c55e",
                fontSize: "30px",
              }}
            >
              {wishlist.length}
            </h2>
          </div>

          <div
            style={{
              fontSize: "32px",
            }}
          >
            💚
          </div>
        </div>

        {/* =================================================
            EMPTY WISHLIST
        ================================================= */}
        {wishlist.length === 0 ? (
          <div style={emptyCardStyle}>
            <div
              style={{
                fontSize: "65px",
                marginBottom: "15px",
              }}
            >
              💜
            </div>

            <h2
              style={{
                margin: "0 0 10px",
                fontSize: "24px",
              }}
            >
              No Wishlist Items
            </h2>

            <p
              style={{
                margin: 0,
                color: "#94a3b8",
                fontSize: "16px",
              }}
            >
              Go to Marketplace and add listings
              to your wishlist.
            </p>
          </div>
        ) : (
          /* =================================================
             WISHLIST GRID
          ================================================= */
          <div style={gridStyle}>
            {wishlist.map((item) => {
              const image =
                item.image ||
                item.imageUrl ||
                item.images?.[0] ||
                "";

              return (
                <div
                  key={item.id}
                  style={cardStyle}
                >
                  {/* IMAGE */}
                  {image ? (
                    <img
                      src={image}
                      alt={
                        item.title ||
                        "Waste listing"
                      }
                      style={imageStyle}
                    />
                  ) : (
                    <div style={imagePlaceholderStyle}>
                      ♻️
                    </div>
                  )}

                  {/* CONTENT */}
                  <div
                    style={{
                      padding: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "flex-start",
                        gap: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <div>
                        <h2
                          style={{
                            margin: 0,
                            color: "#22c55e",
                            fontSize: "20px",
                          }}
                        >
                          {item.title ||
                            item.item ||
                            item.itemName ||
                            "Waste Material"}
                        </h2>

                        <p
                          style={{
                            margin:
                              "6px 0 0",
                            color: "#94a3b8",
                            fontSize: "14px",
                          }}
                        >
                          {item.category ||
                            "Waste"}
                        </p>
                      </div>

                      <span
                        style={{
                          background:
                            "#14532d",
                          color:
                            "#86efac",
                          border:
                            "1px solid #22c55e",
                          padding:
                            "5px 9px",
                          borderRadius:
                            "999px",
                          fontSize:
                            "11px",
                          fontWeight:
                            "bold",
                          whiteSpace:
                            "nowrap",
                        }}
                      >
                        Saved
                      </span>
                    </div>

                    {/* DETAILS */}
                    <div
                      style={{
                        background:
                          "#0f172a",
                        border:
                          "1px solid #334155",
                        borderRadius:
                          "10px",
                        padding:
                          "13px",
                        marginTop:
                          "15px",
                      }}
                    >
                      <p
                        style={{
                          margin:
                            "5px 0",
                          color:
                            "#cbd5e1",
                        }}
                      >
                        <strong>
                          Quantity:
                        </strong>{" "}
                        {item.quantity ||
                          "Not specified"}{" "}
                        {item.unit || ""}
                      </p>

                      <p
                        style={{
                          margin:
                            "5px 0",
                          color:
                            "#cbd5e1",
                        }}
                      >
                        <strong>
                          Price:
                        </strong>{" "}
                        <span
                          style={{
                            color:
                              "#22c55e",
                            fontWeight:
                              "bold",
                          }}
                        >
                          ₹
                          {Number(
                            item.expectedPrice ||
                              item.price ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </p>

                      <p
                        style={{
                          margin:
                            "5px 0",
                          color:
                            "#cbd5e1",
                        }}
                      >
                        <strong>
                          Location:
                        </strong>{" "}
                        {item.location ||
                          "Not specified"}
                      </p>
                    </div>

                    {/* SELLER */}
                    <p
                      style={{
                        margin:
                          "14px 0",
                        color:
                          "#94a3b8",
                        fontSize:
                          "13px",
                      }}
                    >
                      👤 Seller:{" "}
                      <span
                        style={{
                          color:
                            "#e2e8f0",
                        }}
                      >
                        {item.seller ||
                          "Unknown Seller"}
                      </span>
                    </p>

                    {/* REMOVE BUTTON */}
                    <button
                      onClick={() =>
                        removeFromWishlist(
                          item.id
                        )
                      }
                      style={{
                        width: "100%",
                        padding:
                          "12px",
                        border: "none",
                        borderRadius:
                          "10px",
                        background:
                          "#7f1d1d",
                        color:
                          "#fecaca",
                        fontWeight:
                          "bold",
                        cursor:
                          "pointer",
                      }}
                    >
                      💔 Remove from Wishlist
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

// =====================================================
// PAGE STYLE
// =====================================================

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  fontFamily: "Arial, sans-serif",
  boxSizing: "border-box",
};

// =====================================================
// IMPORTANT:
// Navbar is approximately 250px wide.
// Content starts AFTER the sidebar.
// =====================================================

const contentStyle = {
  marginLeft: "250px",
  width: "calc(100% - 250px)",
  minHeight: "100vh",
  padding: "35px 40px 70px",
  boxSizing: "border-box",
};

// =====================================================
// HEADER
// =====================================================

const headerStyle = {
  width: "100%",
  boxSizing: "border-box",
  background:
    "linear-gradient(135deg, #166534, #14532d)",
  border: "1px solid #22c55e",
  borderRadius: "20px",
  padding: "30px",
  marginBottom: "25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
};

const headerTitleStyle = {
  margin: 0,
  color: "#ecfdf5",
  fontSize: "36px",
};

const headerSubtitleStyle = {
  margin: "8px 0 0",
  color: "#d1fae5",
  fontSize: "16px",
};

const headerIconStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "18px",
  background: "#14532d",
  border: "1px solid #22c55e",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  flexShrink: 0,
};

// =====================================================
// COUNT CARD
// =====================================================

const countCardStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "16px",
  padding: "20px 24px",
  marginBottom: "25px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

// =====================================================
// EMPTY CARD
// =====================================================

const emptyCardStyle = {
  width: "100%",
  minHeight: "280px",
  boxSizing: "border-box",
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "40px 25px",
};

// =====================================================
// GRID
// =====================================================

const gridStyle = {
  width: "100%",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "22px",
};

// =====================================================
// CARD
// =====================================================

const cardStyle = {
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "18px",
  overflow: "hidden",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.2)",
};

// =====================================================
// IMAGE
// =====================================================

const imageStyle = {
  width: "100%",
  height: "210px",
  objectFit: "cover",
  display: "block",
};

const imagePlaceholderStyle = {
  width: "100%",
  height: "210px",
  background: "#172033",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "65px",
};

// =====================================================
// LOGIN CARD
// =====================================================

const loginCardStyle = {
  width: "100%",
  minHeight: "300px",
  background: "#1e293b",
  border: "1px solid #334155",
  borderRadius: "18px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "40px",
  boxSizing: "border-box",
};