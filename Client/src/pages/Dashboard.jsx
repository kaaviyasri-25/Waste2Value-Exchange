import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [listings, setListings] = useState([]);
  const [offers, setOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // ==========================================
  // LOAD DATA
  // ==========================================
  useEffect(() => {
    try {
      const savedUser =
        JSON.parse(localStorage.getItem("currentUser")) || null;

      setCurrentUser(savedUser);

      const savedListings =
        JSON.parse(localStorage.getItem("listings")) || [];

      const savedOffers =
        JSON.parse(
          localStorage.getItem("waste2valueOffers")
        ) ||
        JSON.parse(localStorage.getItem("offers")) ||
        [];

      setListings(Array.isArray(savedListings) ? savedListings : []);
      setOffers(Array.isArray(savedOffers) ? savedOffers : []);
    } catch (error) {
      console.error("Dashboard loading error:", error);
    }
  }, []);

  // ==========================================
  // CURRENT USER
  // ==========================================
  const userName =
    currentUser?.name ||
    currentUser?.email?.split("@")[0] ||
    "User";

  // ==========================================
  // USER LISTINGS
  // ==========================================
  const userListings = listings.filter((listing) => {
    const sellerName = String(
      listing.seller || ""
    )
      .trim()
      .toLowerCase();

    const sellerEmail = String(
      listing.sellerEmail || ""
    )
      .trim()
      .toLowerCase();

    const currentName = String(
      currentUser?.name || ""
    )
      .trim()
      .toLowerCase();

    const currentEmail = String(
      currentUser?.email || ""
    )
      .trim()
      .toLowerCase();

    return (
      (sellerName &&
        currentName &&
        sellerName === currentName) ||
      (sellerEmail &&
        currentEmail &&
        sellerEmail === currentEmail)
    );
  });

  // ==========================================
  // USER RECEIVED OFFERS
  // ==========================================
  const receivedOffers = offers.filter((offer) => {
    const sellerName = String(
      offer.seller || ""
    )
      .trim()
      .toLowerCase();

    const sellerEmail = String(
      offer.sellerEmail || ""
    )
      .trim()
      .toLowerCase();

    const currentName = String(
      currentUser?.name || ""
    )
      .trim()
      .toLowerCase();

    const currentEmail = String(
      currentUser?.email || ""
    )
      .trim()
      .toLowerCase();

    return (
      (sellerName &&
        currentName &&
        sellerName === currentName) ||
      (sellerEmail &&
        currentEmail &&
        sellerEmail === currentEmail)
    );
  });

  // ==========================================
  // STATISTICS
  // ==========================================
  const totalListings = userListings.length;

  const totalOffers = receivedOffers.length;

  const pendingOffers = receivedOffers.filter(
    (offer) =>
      !offer.status ||
      offer.status === "Pending"
  ).length;

  const acceptedOffers = receivedOffers.filter(
    (offer) =>
      offer.status === "Accepted"
  ).length;

  const rejectedOffers = receivedOffers.filter(
    (offer) =>
      offer.status === "Rejected"
  ).length;

  const totalWeight = userListings.reduce(
    (total, listing) => {
      const quantity =
        Number(listing.quantity) || 0;

      return total + quantity;
    },
    0
  );

  const totalValue = userListings.reduce(
    (total, listing) => {
      const price =
        Number(listing.expectedPrice) || 0;

      return total + price;
    },
    0
  );

  // ==========================================
  // RECENT LISTINGS
  // ==========================================
  const recentListings =
    [...userListings].reverse().slice(0, 5);

  // ==========================================
  // RECENT OFFERS
  // ==========================================
  const recentOffers =
    [...receivedOffers].reverse().slice(0, 5);

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "35px 35px 60px",
        }}
      >
        {/* ==========================================
            HEADER
        ========================================== */}
        <div
          style={{
            marginBottom: "28px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#22c55e",
              fontSize: "36px",
              fontWeight: "bold",
            }}
          >
            📊 Dashboard
          </h1>

          <p
            style={{
              marginTop: "8px",
              marginBottom: 0,
              color: "#94a3b8",
              fontSize: "16px",
            }}
          >
            Welcome back, {userName}! Track your
            waste value activity and environmental
            impact.
          </p>
        </div>

        {/* ==========================================
            STAT CARDS
        ========================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(4, minmax(0, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {/* LISTINGS */}
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
              padding: "22px",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              📊
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "15px",
              }}
            >
              My Listings
            </div>

            <div
              style={{
                color: "#22c55e",
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "6px",
              }}
            >
              {totalListings}
            </div>
          </div>

          {/* OFFERS */}
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
              padding: "22px",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              💰
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "15px",
              }}
            >
              Total Offers
            </div>

            <div
              style={{
                color: "#22c55e",
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "6px",
              }}
            >
              {totalOffers}
            </div>
          </div>

          {/* WASTE */}
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
              padding: "22px",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              📦
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "15px",
              }}
            >
              Waste Listed
            </div>

            <div
              style={{
                color: "#22c55e",
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "6px",
              }}
            >
              {totalWeight} kg
            </div>
          </div>

          {/* VALUE */}
          <div
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
              padding: "22px",
              minWidth: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                marginBottom: "12px",
              }}
            >
              🌱
            </div>

            <div
              style={{
                color: "#94a3b8",
                fontSize: "15px",
              }}
            >
              Listed Value
            </div>

            <div
              style={{
                color: "#22c55e",
                fontSize: "28px",
                fontWeight: "bold",
                marginTop: "6px",
              }}
            >
              ₹{totalValue}
            </div>
          </div>
        </div>

        {/* ==========================================
            OFFER STATUS
        ========================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {/* PENDING */}
          <div
            style={{
              background: "#111827",
              border: "1px solid #334155",
              borderLeft:
                "4px solid #f59e0b",
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Pending Offers
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginTop: "5px",
                color: "#fbbf24",
              }}
            >
              {pendingOffers}
            </div>
          </div>

          {/* ACCEPTED */}
          <div
            style={{
              background: "#111827",
              border: "1px solid #334155",
              borderLeft:
                "4px solid #22c55e",
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Accepted Offers
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginTop: "5px",
                color: "#22c55e",
              }}
            >
              {acceptedOffers}
            </div>
          </div>

          {/* REJECTED */}
          <div
            style={{
              background: "#111827",
              border: "1px solid #334155",
              borderLeft:
                "4px solid #ef4444",
              borderRadius: "14px",
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Rejected Offers
            </div>

            <div
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                marginTop: "5px",
                color: "#ef4444",
              }}
            >
              {rejectedOffers}
            </div>
          </div>
        </div>

        {/* ==========================================
            TWO COLUMN SECTION
        ========================================== */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "25px",
            alignItems: "start",
          }}
        >
          {/* ========================================
              RECENT LISTINGS
          ======================================== */}
          <section
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <div
              style={{
                padding: "22px",
                borderBottom:
                  "1px solid #334155",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#22c55e",
                  fontSize: "22px",
                }}
              >
                📦 My Recent Listings
              </h2>

              <span
                style={{
                  background: "#14532d",
                  color: "#86efac",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {totalListings} Total
              </span>
            </div>

            {recentListings.length === 0 ? (
              <div
                style={{
                  padding: "45px 20px",
                  textAlign: "center",
                  color: "#94a3b8",
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                  }}
                >
                  📭
                </div>

                <p>
                  No waste listings yet.
                </p>
              </div>
            ) : (
              recentListings.map(
                (listing, index) => (
                  <div
                    key={
                      listing._id ||
                      listing.id ||
                      index
                    }
                    style={{
                      padding: "18px 22px",
                      borderBottom:
                        index !==
                        recentListings.length - 1
                          ? "1px solid #334155"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                        gap: "15px",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "17px",
                            color: "#f8fafc",
                          }}
                        >
                          {listing.title ||
                            listing.item ||
                            "Waste Material"}
                        </h3>

                        <p
                          style={{
                            margin:
                              "6px 0 0",
                            color: "#94a3b8",
                            fontSize: "14px",
                          }}
                        >
                          {listing.category ||
                            "Waste"}{" "}
                          •{" "}
                          {listing.quantity ||
                            0}{" "}
                          {listing.unit ||
                            "kg"}
                        </p>
                      </div>

                      <div
                        style={{
                          textAlign: "right",
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            color:
                              "#22c55e",
                            fontWeight:
                              "bold",
                          }}
                        >
                          ₹
                          {Number(
                            listing.expectedPrice
                          ) || 0}
                        </div>

                        <div
                          style={{
                            color:
                              "#86efac",
                            fontSize:
                              "12px",
                            marginTop:
                              "5px",
                          }}
                        >
                          {listing.status ||
                            "Available"}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </section>

          {/* ========================================
              RECENT OFFERS
          ======================================== */}
          <section
            style={{
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "18px",
              overflow: "hidden",
              minWidth: 0,
            }}
          >
            <div
              style={{
                padding: "22px",
                borderBottom:
                  "1px solid #334155",
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#22c55e",
                  fontSize: "22px",
                }}
              >
                💰 Recent Offers
              </h2>

              <span
                style={{
                  background: "#713f12",
                  color: "#fde68a",
                  padding: "6px 10px",
                  borderRadius: "999px",
                  fontSize: "12px",
                  whiteSpace: "nowrap",
                }}
              >
                {totalOffers} Offers
              </span>
            </div>

            {recentOffers.length === 0 ? (
              <div
                style={{
                  padding: "45px 20px",
                  textAlign: "center",
                  color: "#94a3b8",
                }}
              >
                <div
                  style={{
                    fontSize: "45px",
                  }}
                >
                  💰
                </div>

                <p>
                  No offers received yet.
                </p>
              </div>
            ) : (
              recentOffers.map(
                (offer, index) => {
                  const status =
                    offer.status ||
                    "Pending";

                  return (
                    <div
                      key={
                        offer.id ||
                        offer._id ||
                        index
                      }
                      style={{
                        padding:
                          "18px 22px",
                        borderBottom:
                          index !==
                          recentOffers.length -
                            1
                            ? "1px solid #334155"
                            : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent:
                            "space-between",
                          alignItems:
                            "flex-start",
                          gap: "15px",
                        }}
                      >
                        <div
                          style={{
                            minWidth: 0,
                          }}
                        >
                          <h3
                            style={{
                              margin: 0,
                              color:
                                "#f8fafc",
                              fontSize:
                                "17px",
                            }}
                          >
                            {offer.item ||
                              offer.itemName ||
                              "Waste Material"}
                          </h3>

                          <p
                            style={{
                              margin:
                                "6px 0 0",
                              color:
                                "#94a3b8",
                              fontSize:
                                "14px",
                            }}
                          >
                            {offer.category ||
                              "Waste"}{" "}
                            •{" "}
                            {offer.quantity ||
                              "N/A"}
                          </p>

                          <div
                            style={{
                              marginTop:
                                "7px",
                              color:
                                "#22c55e",
                              fontWeight:
                                "bold",
                            }}
                          >
                            ₹
                            {Number(
                              offer.offerPrice ??
                                offer.offerAmount
                            ) || 0}
                          </div>
                        </div>

                        <span
                          style={{
                            background:
                              status ===
                              "Accepted"
                                ? "#14532d"
                                : status ===
                                  "Rejected"
                                ? "#7f1d1d"
                                : "#713f12",
                            color:
                              status ===
                              "Accepted"
                                ? "#86efac"
                                : status ===
                                  "Rejected"
                                ? "#fca5a5"
                                : "#fde68a",
                            padding:
                              "6px 10px",
                            borderRadius:
                              "999px",
                            fontSize:
                              "12px",
                            fontWeight:
                              "bold",
                            whiteSpace:
                              "nowrap",
                          }}
                        >
                          {status}
                        </span>
                      </div>
                    </div>
                  );
                }
              )
            )}
          </section>
        </div>
      </main>
    </div>
  );
}