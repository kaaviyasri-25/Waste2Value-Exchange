import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyOffers() {
  const [offers, setOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // =====================================================
  // LOAD CURRENT USER + MY OFFERS
  // =====================================================
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      setCurrentUser(null);
      setOffers([]);
      return;
    }

    try {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);

      loadMyOffers(user);
    } catch (error) {
      console.error("User loading error:", error);
      setCurrentUser(null);
      setOffers([]);
    }
  }, []);

  // =====================================================
  // LOAD OFFERS SENT BY CURRENT USER
  // =====================================================
  const loadMyOffers = (user) => {
    const savedOffers =
      JSON.parse(
        localStorage.getItem("waste2valueOffers")
      ) || [];

    const userName = String(user?.name || "")
      .trim()
      .toLowerCase();

    const userEmail = String(user?.email || "")
      .trim()
      .toLowerCase();

    const myOffers = savedOffers.filter((offer) => {
      const buyerName = String(offer.buyer || "")
        .trim()
        .toLowerCase();

      const buyerEmail = String(
        offer.buyerEmail || ""
      )
        .trim()
        .toLowerCase();

      return (
        (buyerName &&
          userName &&
          buyerName === userName) ||
        (buyerEmail &&
          userEmail &&
          buyerEmail === userEmail)
      );
    });

    setOffers(myOffers);
  };

  // =====================================================
  // UPDATE WHEN STORAGE CHANGES
  // =====================================================
  useEffect(() => {
    const handleStorage = () => {
      const savedUser =
        localStorage.getItem("currentUser");

      if (!savedUser) return;

      try {
        const user = JSON.parse(savedUser);
        loadMyOffers(user);
      } catch (error) {
        console.error(error);
      }
    };

    window.addEventListener(
      "storage",
      handleStorage
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorage
      );
    };
  }, []);

  // =====================================================
  // COUNTS
  // =====================================================
  const pendingOffers = offers.filter(
    (offer) =>
      !offer.status ||
      offer.status === "Pending"
  );

  const acceptedOffers = offers.filter(
    (offer) =>
      offer.status === "Accepted"
  );

  const rejectedOffers = offers.filter(
    (offer) =>
      offer.status === "Rejected"
  );

  // =====================================================
  // NOT LOGGED IN
  // =====================================================
  if (!currentUser) {
    return (
      <div style={pageStyle}>
        <Navbar />

        <main style={contentStyle}>
          <div style={emptyLoginStyle}>
            <div
              style={{
                fontSize: "60px",
                marginBottom: "15px",
              }}
            >
              🔐
            </div>

            <h1
              style={{
                color: "#22c55e",
                marginBottom: "10px",
              }}
            >
              My Offers
            </h1>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Please login to view your offers.
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
            HERO
        ================================================= */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #166534, #14532d)",
            border:
              "1px solid #22c55e",
            borderRadius: "20px",
            padding: "32px",
            marginBottom: "25px",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: "white",
                  fontSize: "36px",
                  lineHeight: "1.2",
                }}
              >
                💰 My Offers
              </h1>

              <p
                style={{
                  margin:
                    "10px 0 0",
                  color: "#d1fae5",
                  fontSize: "16px",
                }}
              >
                View offers you have sent to
                sellers.
              </p>

              <p
                style={{
                  margin:
                    "10px 0 0",
                  color: "#bbf7d0",
                  fontSize: "14px",
                }}
              >
                Logged in as:{" "}
                <strong>
                  {currentUser.name ||
                    currentUser.email}
                </strong>
              </p>
            </div>

            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "18px",
                background: "#14532d",
                border:
                  "1px solid #22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
                flexShrink: 0,
              }}
            >
              💰
            </div>
          </div>
        </section>

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "16px",
            marginBottom: "25px",
          }}
        >

          {/* TOTAL */}
          <SummaryCard
            icon="📊"
            title="Total Offers"
            value={offers.length}
            border="#3b82f6"
          />

          {/* PENDING */}
          <SummaryCard
            icon="⏳"
            title="Pending"
            value={pendingOffers.length}
            border="#f59e0b"
          />

          {/* ACCEPTED */}
          <SummaryCard
            icon="✅"
            title="Accepted"
            value={acceptedOffers.length}
            border="#22c55e"
          />

          {/* REJECTED */}
          <SummaryCard
            icon="❌"
            title="Rejected"
            value={rejectedOffers.length}
            border="#ef4444"
          />
        </section>

        {/* =================================================
            OFFERS SECTION
        ================================================= */}
        <section
          style={{
            background: "#1e293b",
            border:
              "1px solid #334155",
            borderRadius: "20px",
            padding: "25px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {/* SECTION HEADER */}
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: "15px",
              marginBottom: "22px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  color: "#22c55e",
                  fontSize: "25px",
                }}
              >
                💰 Offers Sent
              </h2>

              <p
                style={{
                  margin:
                    "7px 0 0",
                  color: "#94a3b8",
                }}
              >
                Track the offers you have
                submitted.
              </p>
            </div>

            <div
              style={{
                background:
                  "#14532d",
                color:
                  "#86efac",
                padding:
                  "7px 14px",
                borderRadius:
                  "999px",
                fontSize: "13px",
                fontWeight:
                  "bold",
              }}
            >
              {offers.length}{" "}
              {offers.length === 1
                ? "Offer"
                : "Offers"}
            </div>
          </div>

          {/* =================================================
              NO OFFERS
          ================================================= */}
          {offers.length === 0 ? (
            <div
              style={{
                minHeight: "280px",
                display: "flex",
                flexDirection:
                  "column",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                textAlign: "center",
                background:
                  "#172033",
                border:
                  "1px solid #334155",
                borderRadius:
                  "16px",
                padding: "30px",
                boxSizing:
                  "border-box",
              }}
            >
              <div
                style={{
                  fontSize: "58px",
                  marginBottom: "15px",
                }}
              >
                📭
              </div>

              <h2
                style={{
                  margin:
                    "0 0 10px",
                  color: "white",
                }}
              >
                No Offers Yet
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#94a3b8",
                  fontSize: "15px",
                }}
              >
                Go to Marketplace and send
                an offer to a seller.
              </p>
            </div>
          ) : (
            /* =================================================
               OFFERS GRID
            ================================================= */
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "18px",
              }}
            >
              {offers.map((offer) => {

                const status =
                  offer.status ||
                  "Pending";

                const isPending =
                  status === "Pending";

                const isAccepted =
                  status === "Accepted";

                const isRejected =
                  status === "Rejected";

                return (
                  <div
                    key={
                      offer.id ||
                      offer._id ||
                      Math.random()
                    }
                    style={{
                      background:
                        "#172033",
                      border:
                        "1px solid #334155",
                      borderRadius:
                        "16px",
                      padding: "20px",
                      boxSizing:
                        "border-box",
                    }}
                  >

                    {/* CARD HEADER */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                        gap: "10px",
                        marginBottom:
                          "18px",
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
                              "white",
                            fontSize:
                              "20px",
                            wordBreak:
                              "break-word",
                          }}
                        >
                          {offer.item ||
                            offer.itemName ||
                            offer.title ||
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
                            "Waste"}
                        </p>
                      </div>

                      {/* STATUS */}
                      <span
                        style={{
                          background:
                            isAccepted
                              ? "#14532d"
                              : isRejected
                              ? "#450a0a"
                              : "#713f12",
                          color:
                            isAccepted
                              ? "#86efac"
                              : isRejected
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
                          flexShrink: 0,
                        }}
                      >
                        {status}
                      </span>
                    </div>

                    {/* SELLER */}
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
                        marginBottom:
                          "15px",
                      }}
                    >
                      <p
                        style={{
                          margin:
                            "0 0 7px",
                          color:
                            "#94a3b8",
                          fontSize:
                            "13px",
                        }}
                      >
                        Seller
                      </p>

                      <p
                        style={{
                          margin: 0,
                          color:
                            "white",
                          fontWeight:
                            "bold",
                        }}
                      >
                        🏪{" "}
                        {offer.seller ||
                          "Unknown Seller"}
                      </p>

                      {offer.sellerEmail && (
                        <p
                          style={{
                            margin:
                              "6px 0 0",
                            color:
                              "#64748b",
                            fontSize:
                              "12px",
                            wordBreak:
                              "break-word",
                          }}
                        >
                          {offer.sellerEmail}
                        </p>
                      )}
                    </div>

                    {/* OFFER DETAILS */}
                    <div
                      style={{
                        marginBottom:
                          "15px",
                      }}
                    >
                      <p
                        style={{
                          margin:
                            "8px 0",
                          color:
                            "#cbd5e1",
                        }}
                      >
                        <strong>
                          Quantity:
                        </strong>{" "}
                        {offer.quantity ||
                          "Not specified"}
                      </p>

                      <p
                        style={{
                          margin:
                            "8px 0",
                          color:
                            "#cbd5e1",
                        }}
                      >
                        <strong>
                          Expected Price:
                        </strong>{" "}
                        ₹
                        {Number(
                          offer.expectedPrice
                        ) || 0}
                      </p>

                      <p
                        style={{
                          margin:
                            "8px 0",
                          color:
                            "#cbd5e1",
                        }}
                      >
                        <strong>
                          Your Offer:
                        </strong>{" "}
                        <span
                          style={{
                            color:
                              "#22c55e",
                            fontSize:
                              "20px",
                            fontWeight:
                              "bold",
                          }}
                        >
                          ₹
                          {Number(
                            offer.offerPrice ??
                              offer.offerAmount
                          ) || 0}
                        </span>
                      </p>

                      <p
                        style={{
                          margin:
                            "8px 0 0",
                          color:
                            "#64748b",
                          fontSize:
                            "13px",
                        }}
                      >
                        📅{" "}
                        {offer.date ||
                          "Recently"}
                      </p>
                    </div>

                    {/* STATUS MESSAGE */}
                    {isPending && (
                      <div
                        style={{
                          background:
                            "#422006",
                          color:
                            "#fde68a",
                          border:
                            "1px solid #92400e",
                          padding:
                            "11px",
                          borderRadius:
                            "9px",
                          textAlign:
                            "center",
                          fontWeight:
                            "bold",
                          fontSize:
                            "13px",
                        }}
                      >
                        ⏳ Waiting for
                        seller response
                      </div>
                    )}

                    {isAccepted && (
                      <div
                        style={{
                          background:
                            "#14532d",
                          color:
                            "#86efac",
                          border:
                            "1px solid #22c55e",
                          padding:
                            "11px",
                          borderRadius:
                            "9px",
                          textAlign:
                            "center",
                          fontWeight:
                            "bold",
                          fontSize:
                            "13px",
                        }}
                      >
                        ✅ Seller accepted
                        your offer
                      </div>
                    )}

                    {isRejected && (
                      <div
                        style={{
                          background:
                            "#450a0a",
                          color:
                            "#fca5a5",
                          border:
                            "1px solid #ef4444",
                          padding:
                            "11px",
                          borderRadius:
                            "9px",
                          textAlign:
                            "center",
                          fontWeight:
                            "bold",
                          fontSize:
                            "13px",
                        }}
                      >
                        ❌ Seller rejected
                        your offer
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

// =====================================================
// SUMMARY CARD
// =====================================================

function SummaryCard({
  icon,
  title,
  value,
  border,
}) {
  return (
    <div
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderLeft:
          `4px solid ${border}`,
        borderRadius: "15px",
        padding: "20px",
        boxSizing: "border-box",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            minWidth: 0,
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            {title}
          </p>

          <div
            style={{
              marginTop: "7px",
              color: "white",
              fontSize: "28px",
              fontWeight: "bold",
            }}
          >
            {value}
          </div>
        </div>

        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "10px",
            background: "#172033",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// MAIN PAGE STYLE
// =====================================================

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  fontFamily: "Arial, sans-serif",
  width: "100%",
  boxSizing: "border-box",
};

// =====================================================
// IMPORTANT OVERLAP FIX
// =====================================================

const contentStyle = {
  marginLeft: "250px",
  width: "calc(100% - 250px)",
  maxWidth: "none",
  minHeight: "100vh",
  padding: "35px 40px 70px",
  boxSizing: "border-box",
};

const emptyLoginStyle = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};