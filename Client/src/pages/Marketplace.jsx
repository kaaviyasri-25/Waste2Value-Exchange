import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Marketplace() {
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [selectedSeller, setSelectedSeller] = useState(null);
  const [offerItem, setOfferItem] = useState(null);

  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [wishlist, setWishlist] = useState([]);

  // =====================================================
  // LOAD CURRENT USER
  // =====================================================
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);

        setCurrentUser(parsedUser);
        setIsLoggedIn(true);

        if (parsedUser.name) {
          setBuyerName(parsedUser.name);
        } else if (parsedUser.email) {
          setBuyerName(parsedUser.email.split("@")[0]);
        }
      } catch (error) {
        console.error("Current user error:", error);
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } else {
      setCurrentUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  // =====================================================
  // FETCH LISTINGS
  // =====================================================
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(
          "https://waste2value-backend.onrender.com/api/listings"
        );

        setListings(
          Array.isArray(response.data) ? response.data : []
        );
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // =====================================================
  // LOAD WISHLIST
  // =====================================================
  useEffect(() => {
    const savedWishlist = localStorage.getItem(
      "waste2valueWishlist"
    );

    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Wishlist loading error:", error);
        setWishlist([]);
      }
    }
  }, []);

  // =====================================================
  // SAVE WISHLIST
  // =====================================================
  useEffect(() => {
    localStorage.setItem(
      "waste2valueWishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // =====================================================
  // FILTER + SEARCH + SORT
  // =====================================================
  const filteredListings = useMemo(() => {
    let data = listings.filter((item) => {
      const title = String(item.title || "").toLowerCase();
      const location = String(item.location || "").toLowerCase();
      const searchText = search.toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        location.includes(searchText);

      const matchesCategory =
        category === "All" ||
        item.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "priceLow") {
      data.sort(
        (a, b) =>
          (Number(a.expectedPrice) || 0) -
          (Number(b.expectedPrice) || 0)
      );
    }

    if (sortBy === "priceHigh") {
      data.sort(
        (a, b) =>
          (Number(b.expectedPrice) || 0) -
          (Number(a.expectedPrice) || 0)
      );
    }

    return data;
  }, [listings, search, category, sortBy]);

  // =====================================================
  // STATS
  // =====================================================
  const totalListings = filteredListings.length;

  const totalQuantity = filteredListings.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  const wishlistCount = wishlist.length;

  // =====================================================
  // SELLER NAME
  // =====================================================
  const getSellerName = (item) => {
    if (item.seller) {
      return item.seller;
    }

    if (item.category === "Plastic") {
      return "Green Recyclers Pvt Ltd";
    }

    if (item.category === "Metal") {
      return "Karur Metal Traders";
    }

    if (item.category === "Paper") {
      return "Eco Paper Recycling";
    }

    if (item.category === "E-Waste") {
      return "TechRecycle Solutions";
    }

    if (item.category === "Glass") {
      return "Green Glass Recyclers";
    }

    return "Eco Waste Solutions";
  };

  // =====================================================
  // CATEGORY STYLE
  // =====================================================
  const getCategoryBackground = (itemCategory) => {
    if (itemCategory === "Plastic") {
      return "#2563eb";
    }

    if (itemCategory === "Metal") {
      return "#d97706";
    }

    if (itemCategory === "Paper") {
      return "#16a34a";
    }

    if (itemCategory === "E-Waste") {
      return "#9333ea";
    }

    if (itemCategory === "Glass") {
      return "#0891b2";
    }

    if (itemCategory === "Organic") {
      return "#65a30d";
    }

    return "#64748b";
  };

  // =====================================================
  // CONTACT SELLER
  // =====================================================
  const handleContactSeller = (item) => {
    if (!isLoggedIn) {
      alert("Please login first to contact the seller.");
      navigate("/login");
      return;
    }

    setSelectedSeller({
      name: getSellerName(item),
      phone: "+91 98765 43210",
      email: "seller@waste2value.com",
      location: item.location || "Not specified",
      item: item.title || "Waste Material",
    });
  };

  // =====================================================
  // OPEN OFFER
  // =====================================================
  const handleOpenOffer = (item) => {
    if (!isLoggedIn) {
      alert("Please login first to send an offer.");
      navigate("/login");
      return;
    }

    setOfferItem(item);

    if (currentUser?.name) {
      setBuyerName(currentUser.name);
    } else if (currentUser?.email) {
      setBuyerName(currentUser.email.split("@")[0]);
    }
  };

  // =====================================================
  // SUBMIT OFFER
  // =====================================================
  const handleSubmitOffer = () => {
    if (!isLoggedIn || !currentUser) {
      alert("Please login first to send an offer.");
      navigate("/login");
      return;
    }

    if (
      !buyerName.trim() ||
      !buyerPhone.trim() ||
      !offerPrice
    ) {
      alert("Please fill all offer details.");
      return;
    }

    if (Number(offerPrice) <= 0) {
      alert("Please enter a valid offer price.");
      return;
    }

    const existingOffers =
      JSON.parse(
        localStorage.getItem("waste2valueOffers")
      ) || [];

    const newOffer = {
      id: Date.now(),

      itemId: offerItem?._id || "",

      item: offerItem?.title || "Waste Material",

      itemName:
        offerItem?.title || "Waste Material",

      category: offerItem?.category || "",

      quantity: `${offerItem?.quantity || 0} ${
        offerItem?.unit || "kg"
      }`,

      seller: getSellerName(offerItem),

      sellerEmail: offerItem?.sellerEmail || "",

      sellerId: offerItem?.sellerId || "",

      buyer: buyerName,

      buyerEmail: currentUser.email || "",

      phone: buyerPhone,

      offerPrice: Number(offerPrice),

      offerAmount: Number(offerPrice),

      expectedPrice:
        Number(offerItem?.expectedPrice) || 0,

      status: "Pending",

      date: new Date().toLocaleDateString(),
    };

    const updatedOffers = [
      ...existingOffers,
      newOffer,
    ];

    localStorage.setItem(
      "waste2valueOffers",
      JSON.stringify(updatedOffers)
    );

    localStorage.setItem(
      "offers",
      JSON.stringify(updatedOffers)
    );

    alert("Offer sent successfully! 💰");

    setOfferItem(null);
    setBuyerPhone("");
    setOfferPrice("");

    if (currentUser?.name) {
      setBuyerName(currentUser.name);
    }
  };

  // =====================================================
  // STYLES
  // =====================================================

  const cardStyle = {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "18px",
    boxSizing: "border-box",
  };

  const cardLabel = {
    color: "#94a3b8",
    fontSize: "14px",
  };

  const cardValue = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#22c55e",
  };

  // =====================================================
  // RETURN
  // =====================================================
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Navbar />

      {/* =================================================
          MAIN CONTENT
      ================================================= */}
      <main
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
          padding: "32px 35px 70px",
          boxSizing: "border-box",
          overflowX: "hidden",
        }}
      >
        {/* =================================================
            HERO
        ================================================= */}
        <section
          style={{
            width: "100%",
            background:
              "linear-gradient(135deg, #14532d, #166534)",
            borderRadius: "20px",
            padding: "35px",
            marginBottom: "25px",
            border: "1px solid #22c55e",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 1,
                minWidth: "250px",
              }}
            >
              <h1
                style={{
                  fontSize: "42px",
                  margin: "0 0 10px",
                  color: "#ecfdf5",
                  lineHeight: "1.2",
                }}
              >
                Turn Waste into Wealth ♻️
              </h1>

              <p
                style={{
                  fontSize: "18px",
                  color: "#d1fae5",
                  margin: "0 0 20px",
                  maxWidth: "700px",
                  lineHeight: "1.6",
                }}
              >
                AI-powered circular economy platform
                connecting waste sellers, recyclers
                and industries.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={() =>
                    document
                      .getElementById("listings-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                  style={{
                    background: "#22c55e",
                    color: "#052e16",
                    border: "none",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  Explore Listings
                </button>

                <button
                  onClick={() => navigate("/add-waste")}
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "1px solid #86efac",
                    padding: "12px 18px",
                    borderRadius: "10px",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  + Add Waste
                </button>
              </div>
            </div>

            <div
              style={{
                fontSize: "90px",
                flexShrink: 0,
              }}
            >
              ♻️
            </div>
          </div>
        </section>

        {/* =================================================
            STATS
        ================================================= */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "25px",
          }}
        >
          <div style={cardStyle}>
            <div style={cardLabel}>
              Total Listings
            </div>

            <div style={cardValue}>
              {totalListings}
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardLabel}>
              Total Quantity
            </div>

            <div style={cardValue}>
              {totalQuantity} kg
            </div>
          </div>

          <div style={cardStyle}>
            <div style={cardLabel}>
              Wishlist
            </div>

            <div style={cardValue}>
              ❤️ {wishlistCount}
            </div>
          </div>
        </div>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}
        <section
          id="listings-section"
          style={{
            marginBottom: "25px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              width: "100%",
            }}
          >
            <input
              type="text"
              placeholder="🔍 Search waste name or location"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              style={{
                flex: 1,
                minWidth: "240px",
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#1e293b",
                color: "white",
                outline: "none",
                fontSize: "15px",
                boxSizing: "border-box",
              }}
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              style={{
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#1e293b",
                color: "white",
                outline: "none",
              }}
            >
              <option value="All">
                All Categories
              </option>

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

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              style={{
                padding: "13px",
                borderRadius: "10px",
                border: "1px solid #334155",
                background: "#1e293b",
                color: "white",
                outline: "none",
              }}
            >
              <option value="default">
                Sort
              </option>

              <option value="priceLow">
                Price: Low → High
              </option>

              <option value="priceHigh">
                Price: High → Low
              </option>
            </select>
          </div>
        </section>

        {/* =================================================
            LISTINGS
        ================================================= */}
        {loading ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px",
              color: "#94a3b8",
            }}
          >
            <div
              style={{
                fontSize: "45px",
              }}
            >
              ♻️
            </div>

            <p>
              Loading marketplace...
            </p>
          </div>
        ) : filteredListings.length === 0 ? (
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "16px",
              padding: "50px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "55px",
              }}
            >
              📦
            </div>

            <h2>
              No listings found
            </h2>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Try changing your search or
              category.
            </p>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              boxSizing: "border-box",
            }}
          >
            {filteredListings.map((item) => {
              const isWishlisted =
                wishlist.some(
                  (wish) =>
                    wish._id === item._id
                );

              const expectedPrice =
                Number(item.expectedPrice) || 0;

              const quantity =
                Number(item.quantity) || 0;

              const aiPrice = Math.round(
                expectedPrice * 0.95
              );

              const carbonSavings = Math.max(
                2,
                Math.round(quantity * 1.5)
              );

              return (
                <div
                  key={item._id}
                  style={{
                    background: "#1e293b",
                    border: "1px solid #334155",
                    borderRadius: "16px",
                    padding: "20px",
                    boxShadow:
                      "0 8px 20px rgba(0,0,0,0.15)",
                    boxSizing: "border-box",
                    minWidth: 0,
                  }}
                >
                  {/* CARD HEADER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent:
                        "space-between",
                      alignItems: "flex-start",
                      gap: "10px",
                    }}
                  >
                    <h3
                      style={{
                        color: "#22c55e",
                        margin: "0",
                        fontSize: "20px",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.title}
                    </h3>

                    <button
                      onClick={() => {
                        setWishlist((previous) => {
                          const exists =
                            previous.some(
                              (wish) =>
                                wish._id ===
                                item._id
                            );

                          if (exists) {
                            return previous.filter(
                              (wish) =>
                                wish._id !==
                                item._id
                            );
                          }

                          return [
                            ...previous,
                            item,
                          ];
                        });
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        fontSize: "24px",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      {isWishlisted
                        ? "❤️"
                        : "🤍"}
                    </button>
                  </div>

                  {/* CATEGORY */}
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      background:
                        getCategoryBackground(
                          item.category
                        ),
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {item.category}
                  </span>

                  {/* DETAILS */}
                  <div
                    style={{
                      marginTop: "15px",
                    }}
                  >
                    <p>
                      <strong>
                        Quantity:
                      </strong>{" "}
                      {item.quantity}{" "}
                      {item.unit}
                    </p>

                    <p>
                      <strong>
                        Expected Price:
                      </strong>{" "}
                      <span
                        style={{
                          color: "#22c55e",
                          fontWeight: "bold",
                        }}
                      >
                        ₹{expectedPrice}
                      </span>
                    </p>

                    <p>
                      <strong>
                        Location:
                      </strong>{" "}
                      {item.location ||
                        "Not specified"}
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}
                      <span
                        style={{
                          color: "#22c55e",
                        }}
                      >
                        {item.status ||
                          "Available"}
                      </span>
                    </p>
                  </div>

                  {/* SELLER */}
                  <div
                    style={{
                      background: "#0f172a",
                      border:
                        "1px solid #334155",
                      borderRadius: "12px",
                      padding: "12px",
                      marginTop: "15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        gap: "8px",
                      }}
                    >
                      <strong>
                        {getSellerName(item)}
                      </strong>

                      <span
                        style={{
                          color: "#86efac",
                          fontSize: "12px",
                        }}
                      >
                        ✔ Verified
                      </span>
                    </div>

                    <div
                      style={{
                        color: "#fbbf24",
                        marginTop: "7px",
                      }}
                    >
                      ⭐ 4.8 / 5
                    </div>

                    <div
                      style={{
                        color: "#60a5fa",
                        marginTop: "5px",
                      }}
                    >
                      🤖 AI Trust Score: 94%
                    </div>
                  </div>

                  {/* AI INFO */}
                  <div
                    style={{
                      marginTop: "15px",
                      padding: "12px",
                      background: "#0f172a",
                      borderRadius: "10px",
                    }}
                  >
                    <p
                      style={{
                        margin: "0 0 7px",
                        color: "#22c55e",
                      }}
                    >
                      ♻️ Carbon Savings: ~
                      {carbonSavings} kg CO₂
                    </p>

                    <p
                      style={{
                        margin: 0,
                        color: "#60a5fa",
                      }}
                    >
                      🤖 AI Price Estimate: ₹
                      {aiPrice}
                    </p>
                  </div>

                  {/* DEAL */}
                  {expectedPrice < 100 ? (
                    <p
                      style={{
                        color: "#22c55e",
                        fontWeight: "bold",
                      }}
                    >
                      🟢 Good Deal
                    </p>
                  ) : expectedPrice < 1000 ? (
                    <p
                      style={{
                        color: "#facc15",
                        fontWeight: "bold",
                      }}
                    >
                      🟡 Fair Price
                    </p>
                  ) : (
                    <p
                      style={{
                        color: "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      🔴 Premium Price
                    </p>
                  )}

                  {/* CONTACT SELLER */}
                  <button
                    onClick={() =>
                      handleContactSeller(item)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "none",
                      borderRadius: "10px",
                      background: "#2563eb",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    📞 Contact Seller
                  </button>

                  {/* OFFER - BUYER ONLY */}
                  {currentUser?.role === "Buyer" && (
                    <button
                      onClick={() =>
                        handleOpenOffer(item)
                      }
                      style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "10px",
                        border:
                          "1px solid #22c55e",
                        borderRadius: "10px",
                        background: "transparent",
                        color: "#22c55e",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      💰 Send Offer
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* =====================================================
          SELLER MODAL
      ===================================================== */}
      {selectedSeller && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "16px",
              width: "380px",
              maxWidth: "100%",
              border:
                "1px solid #334155",
              boxSizing: "border-box",
            }}
          >
            <h2
              style={{
                color: "#22c55e",
                marginTop: 0,
              }}
            >
              👤 Seller Details
            </h2>

            <p>
              <strong>Seller:</strong>{" "}
              {selectedSeller.name}
            </p>

            <p>
              <strong>Item:</strong>{" "}
              {selectedSeller.item}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {selectedSeller.location}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {selectedSeller.phone}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {selectedSeller.email}
            </p>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/919876543210?text=Hi, I am interested in ${encodeURIComponent(
                    selectedSeller.item
                  )}`,
                  "_blank"
                )
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                background: "#22c55e",
                color: "#052e16",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              💬 Chat on WhatsApp
            </button>

            <button
              onClick={() =>
                setSelectedSeller(null)
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "10px",
                background: "#334155",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          OFFER MODAL
      ===================================================== */}
      {offerItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "20px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "16px",
              width: "400px",
              maxWidth: "100%",
              border:
                "1px solid #334155",
              boxSizing: "border-box",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h2
              style={{
                color: "#22c55e",
                marginTop: 0,
              }}
            >
              💰 Send Offer
            </h2>

            <div
              style={{
                background: "#0f172a",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px",
              }}
            >
              <strong>
                {offerItem.title}
              </strong>

              <p
                style={{
                  color: "#94a3b8",
                  margin: "7px 0 0",
                }}
              >
                {offerItem.category}
                {" • "}
                {offerItem.quantity}{" "}
                {offerItem.unit}
              </p>

              <p
                style={{
                  color: "#22c55e",
                  margin: "7px 0 0",
                }}
              >
                Expected Price: ₹
                {offerItem.expectedPrice}
              </p>
            </div>

            {/* BUYER NAME */}
            <label
              style={{
                display: "block",
                color: "#cbd5e1",
                marginBottom: "6px",
              }}
            >
              Your Name
            </label>

            <input
              type="text"
              placeholder="Your Name"
              value={buyerName}
              onChange={(e) =>
                setBuyerName(e.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #334155",
                background: "#0f172a",
                color: "white",
                outline: "none",
              }}
            />

            {/* PHONE */}
            <label
              style={{
                display: "block",
                color: "#cbd5e1",
                marginTop: "12px",
                marginBottom: "6px",
              }}
            >
              Phone Number
            </label>

            <input
              type="tel"
              placeholder="Phone Number"
              value={buyerPhone}
              onChange={(e) =>
                setBuyerPhone(e.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #334155",
                background: "#0f172a",
                color: "white",
                outline: "none",
              }}
            />

            {/* OFFER PRICE */}
            <label
              style={{
                display: "block",
                color: "#cbd5e1",
                marginTop: "12px",
                marginBottom: "6px",
              }}
            >
              Offer Price (₹)
            </label>

            <input
              type="number"
              min="1"
              placeholder="Enter your offer"
              value={offerPrice}
              onChange={(e) =>
                setOfferPrice(e.target.value)
              }
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #334155",
                background: "#0f172a",
                color: "white",
                outline: "none",
              }}
            />

            {/* SUBMIT */}
            <button
              onClick={handleSubmitOffer}
              style={{
                width: "100%",
                padding: "13px",
                marginTop: "18px",
                background: "#22c55e",
                color: "#052e16",
                border: "none",
                borderRadius: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              💰 Submit Offer
            </button>

            {/* CANCEL */}
            <button
              onClick={() => {
                setOfferItem(null);
                setBuyerPhone("");
                setOfferPrice("");

                if (currentUser?.name) {
                  setBuyerName(
                    currentUser.name
                  );
                }
              }}
              style={{
                width: "100%",
                padding: "13px",
                marginTop: "10px",
                background: "#334155",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}