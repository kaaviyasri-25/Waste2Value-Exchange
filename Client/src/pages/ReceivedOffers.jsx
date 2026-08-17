import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function ReceivedOffers() {
  const [offers, setOffers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // =====================================================
  // LOAD CURRENT USER + RECEIVED OFFERS
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

      loadReceivedOffers(user);
    } catch (error) {
      console.error("User loading error:", error);

      setCurrentUser(null);
      setOffers([]);
    }
  }, []);

  // =====================================================
  // LOAD RECEIVED OFFERS
  // =====================================================
  const loadReceivedOffers = (user) => {
    const savedOffers =
      JSON.parse(
        localStorage.getItem("waste2valueOffers")
      ) || [];

    const userName = String(
      user?.name || ""
    )
      .trim()
      .toLowerCase();

    const userEmail = String(
      user?.email || ""
    )
      .trim()
      .toLowerCase();

    const received = savedOffers.filter(
      (offer) => {
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

        const sellerId = String(
          offer.sellerId || ""
        );

        const currentUserId = String(
          user?._id ||
            user?.id ||
            ""
        );

        return (
          (sellerName &&
            userName &&
            sellerName === userName) ||
          (sellerEmail &&
            userEmail &&
            sellerEmail === userEmail) ||
          (sellerId &&
            currentUserId &&
            sellerId === currentUserId)
        );
      }
    );

    setOffers(received);
  };

  // =====================================================
  // UPDATE OFFER STATUS
  // =====================================================
  const updateOfferStatus = (
    offerId,
    newStatus
  ) => {
    const savedOffers =
      JSON.parse(
        localStorage.getItem("waste2valueOffers")
      ) || [];

    const updatedOffers =
      savedOffers.map((offer) => {
        if (offer.id === offerId) {
          return {
            ...offer,
            status: newStatus,
          };
        }

        return offer;
      });

    localStorage.setItem(
      "waste2valueOffers",
      JSON.stringify(updatedOffers)
    );

    localStorage.setItem(
      "offers",
      JSON.stringify(updatedOffers)
    );

    if (currentUser) {
      loadReceivedOffers(currentUser);
    }

    alert(
      newStatus === "Accepted"
        ? "Offer accepted successfully! ✅"
        : "Offer rejected successfully! ❌"
    );
  };

  // =====================================================
  // ACCEPT OFFER
  // =====================================================
  const handleAccept = (offerId) => {
    const confirmAccept =
      window.confirm(
        "Are you sure you want to accept this offer?"
      );

    if (!confirmAccept) {
      return;
    }

    updateOfferStatus(
      offerId,
      "Accepted"
    );
  };

  // =====================================================
  // REJECT OFFER
  // =====================================================
  const handleReject = (offerId) => {
    const confirmReject =
      window.confirm(
        "Are you sure you want to reject this offer?"
      );

    if (!confirmReject) {
      return;
    }

    updateOfferStatus(
      offerId,
      "Rejected"
    );
  };

  // =====================================================
  // NOT LOGGED IN
  // =====================================================
  if (!currentUser) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        <Navbar />

        <div
          style={{
            marginLeft: "250px",
            width: "calc(100% - 250px)",
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "60px",
              }}
            >
              🔐
            </div>

            <h1
              style={{
                color: "#22c55e",
              }}
            >
              Received Offers
            </h1>

            <p
              style={{
                color: "#94a3b8",
              }}
            >
              Please login to view received
              offers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // STATS
  // =====================================================
  const pendingCount =
    offers.filter(
      (offer) =>
        !offer.status ||
        offer.status === "Pending"
    ).length;

  const acceptedCount =
    offers.filter(
      (offer) =>
        offer.status === "Accepted"
    ).length;

  const rejectedCount =
    offers.filter(
      (offer) =>
        offer.status === "Rejected"
    ).length;

  // =====================================================
  // PAGE
  // =====================================================
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily:
          "Arial, sans-serif",
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
          maxWidth: "none",
          padding:
            "35px 35px 60px",
          boxSizing: "border-box",
          minHeight: "100vh",
        }}
      >
        {/* =================================================
            HEADER
        ================================================= */}
        <section
          style={{
            background:
              "linear-gradient(135deg, #172554, #1e3a8a)",
            border:
              "1px solid #334155",
            borderRadius: "20px",
            padding:
              "28px 30px",
            marginBottom: "25px",
            boxSizing:
              "border-box",
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
                  fontSize:
                    "36px",
                  lineHeight:
                    "1.2",
                }}
              >
                📥 Received Offers
              </h1>

              <p
                style={{
                  color: "#cbd5e1",
                  margin:
                    "10px 0 0",
                  fontSize:
                    "16px",
                }}
              >
                Review and manage offers
                submitted by buyers.
              </p>
            </div>

            <div
              style={{
                width: "70px",
                height: "70px",
                borderRadius:
                  "18px",
                background:
                  "#14532d",
                border:
                  "1px solid #22c55e",
                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                fontSize:
                  "38px",
                flexShrink: 0,
              }}
            >
              📥
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
              "repeat(auto-fit, minmax(190px, 1fr))",
            gap: "16px",
            marginBottom:
              "25px",
          }}
        >
          {/* TOTAL */}
          <div
            style={{
              background:
                "#111827",
              border:
                "1px solid #334155",
              borderRadius:
                "16px",
              padding:
                "20px",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",
                fontSize:
                  "14px",
              }}
            >
              Total Offers
            </div>

            <div
              style={{
                fontSize:
                  "30px",
                fontWeight:
                  "bold",
                color:
                  "white",
                marginTop:
                  "8px",
              }}
            >
              {offers.length}
            </div>
          </div>

          {/* PENDING */}
          <div
            style={{
              background:
                "#111827",
              border:
                "1px solid #334155",
              borderLeft:
                "4px solid #f59e0b",
              borderRadius:
                "16px",
              padding:
                "20px",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",
                fontSize:
                  "14px",
              }}
            >
              Pending
            </div>

            <div
              style={{
                fontSize:
                  "30px",
                fontWeight:
                  "bold",
                color:
                  "white",
                marginTop:
                  "8px",
              }}
            >
              {pendingCount}
            </div>
          </div>

          {/* ACCEPTED */}
          <div
            style={{
              background:
                "#111827",
              border:
                "1px solid #334155",
              borderLeft:
                "4px solid #22c55e",
              borderRadius:
                "16px",
              padding:
                "20px",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",
                fontSize:
                  "14px",
              }}
            >
              Accepted
            </div>

            <div
              style={{
                fontSize:
                  "30px",
                fontWeight:
                  "bold",
                color:
                  "white",
                marginTop:
                  "8px",
              }}
            >
              {acceptedCount}
            </div>
          </div>

          {/* REJECTED */}
          <div
            style={{
              background:
                "#111827",
              border:
                "1px solid #334155",
              borderLeft:
                "4px solid #ef4444",
              borderRadius:
                "16px",
              padding:
                "20px",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                color:
                  "#94a3b8",
                fontSize:
                  "14px",
              }}
            >
              Rejected
            </div>

            <div
              style={{
                fontSize:
                  "30px",
                fontWeight:
                  "bold",
                color:
                  "white",
                marginTop:
                  "8px",
              }}
            >
              {rejectedCount}
            </div>
          </div>
        </div>

        {/* =================================================
            NO OFFERS
        ================================================= */}
        {offers.length === 0 ? (
          <div
            style={{
              background:
                "#111827",
              border:
                "1px solid #334155",
              borderRadius:
                "18px",
              padding:
                "70px 30px",
              textAlign:
                "center",
              minHeight:
                "260px",
              display: "flex",
              flexDirection:
                "column",
              justifyContent:
                "center",
              alignItems:
                "center",
              boxSizing:
                "border-box",
            }}
          >
            <div
              style={{
                fontSize:
                  "60px",
                marginBottom:
                  "10px",
              }}
            >
              📭
            </div>

            <h2
              style={{
                margin:
                  "5px 0 10px",
              }}
            >
              No Offers Received
            </h2>

            <p
              style={{
                color:
                  "#94a3b8",
                margin: 0,
              }}
            >
              Offers sent by buyers
              will appear here.
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
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              width: "100%",
            }}
          >
            {offers.map(
              (offer) => {
                const isPending =
                  !offer.status ||
                  offer.status ===
                    "Pending";

                const isAccepted =
                  offer.status ===
                  "Accepted";

                const isRejected =
                  offer.status ===
                  "Rejected";

                return (
                  <div
                    key={
                      offer.id
                    }
                    style={{
                      background:
                        "#1e293b",
                      border:
                        "1px solid #334155",
                      borderRadius:
                        "18px",
                      padding:
                        "22px",
                      boxShadow:
                        "0 8px 25px rgba(0,0,0,0.2)",
                      boxSizing:
                        "border-box",
                      minWidth: 0,
                    }}
                  >
                    {/* CARD HEADER */}
                    <div
                      style={{
                        display:
                          "flex",
                        justifyContent:
                          "space-between",
                        alignItems:
                          "flex-start",
                        gap:
                          "12px",
                        marginBottom:
                          "18px",
                      }}
                    >
                      <div
                        style={{
                          minWidth: 0,
                        }}
                      >
                        <h2
                          style={{
                            margin: 0,
                            color:
                              "#22c55e",
                            fontSize:
                              "21px",
                            wordBreak:
                              "break-word",
                          }}
                        >
                          {offer.item ||
                            offer.itemName ||
                            "Waste Material"}
                        </h2>

                        <p
                          style={{
                            color:
                              "#94a3b8",
                            margin:
                              "6px 0 0",
                            fontSize:
                              "13px",
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
                              ? "#7f1d1d"
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
                        {offer.status ||
                          "Pending"}
                      </span>
                    </div>

                    {/* BUYER DETAILS */}
                    <div
                      style={{
                        background:
                          "#0f172a",
                        border:
                          "1px solid #334155",
                        borderRadius:
                          "12px",
                        padding:
                          "14px",
                        marginBottom:
                          "15px",
                        boxSizing:
                          "border-box",
                      }}
                    >
                      <h3
                        style={{
                          margin:
                            "0 0 10px",
                          color:
                            "#e2e8f0",
                          fontSize:
                            "16px",
                        }}
                      >
                        👤 Buyer Details
                      </h3>

                      <p
                        style={{
                          margin:
                            "7px 0",
                        }}
                      >
                        <strong>
                          Name:
                        </strong>{" "}
                        {offer.buyer ||
                          "Unknown Buyer"}
                      </p>

                      <p
                        style={{
                          margin:
                            "7px 0",
                          wordBreak:
                            "break-word",
                        }}
                      >
                        <strong>
                          Email:
                        </strong>{" "}
                        {offer.buyerEmail ||
                          "Not provided"}
                      </p>

                      <p
                        style={{
                          margin:
                            "7px 0",
                        }}
                      >
                        <strong>
                          Phone:
                        </strong>{" "}
                        {offer.phone ||
                          "Not provided"}
                      </p>
                    </div>

                    {/* OFFER DETAILS */}
                    <div
                      style={{
                        marginBottom:
                          "15px",
                      }}
                    >
                      <p>
                        <strong>
                          Quantity:
                        </strong>{" "}
                        {offer.quantity ||
                          "Not specified"}
                      </p>

                      <p>
                        <strong>
                          Expected Price:
                        </strong>{" "}
                        ₹
                        {Number(
                          offer.expectedPrice
                        ) || 0}
                      </p>

                      <p>
                        <strong>
                          Buyer's Offer:
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
                          color:
                            "#94a3b8",
                          fontSize:
                            "13px",
                        }}
                      >
                        Offer Date:{" "}
                        {offer.date ||
                          "Recently"}
                      </p>
                    </div>

                    {/* ACCEPT / REJECT */}
                    {isPending && (
                      <div
                        style={{
                          display:
                            "flex",
                          gap:
                            "10px",
                          marginTop:
                            "18px",
                        }}
                      >
                        <button
                          onClick={() =>
                            handleAccept(
                              offer.id
                            )
                          }
                          style={{
                            flex: 1,
                            padding:
                              "12px",
                            background:
                              "#22c55e",
                            color:
                              "#052e16",
                            border:
                              "none",
                            borderRadius:
                              "10px",
                            fontWeight:
                              "bold",
                            cursor:
                              "pointer",
                          }}
                        >
                          ✅ Accept
                        </button>

                        <button
                          onClick={() =>
                            handleReject(
                              offer.id
                            )
                          }
                          style={{
                            flex: 1,
                            padding:
                              "12px",
                            background:
                              "#dc2626",
                            color:
                              "white",
                            border:
                              "none",
                            borderRadius:
                              "10px",
                            fontWeight:
                              "bold",
                            cursor:
                              "pointer",
                          }}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}

                    {/* ACCEPTED MESSAGE */}
                    {isAccepted && (
                      <div
                        style={{
                          background:
                            "#14532d",
                          color:
                            "#86efac",
                          padding:
                            "12px",
                          borderRadius:
                            "10px",
                          textAlign:
                            "center",
                          fontWeight:
                            "bold",
                          marginTop:
                            "15px",
                        }}
                      >
                        ✅ You accepted
                        this offer
                      </div>
                    )}

                    {/* REJECTED MESSAGE */}
                    {isRejected && (
                      <div
                        style={{
                          background:
                            "#450a0a",
                          color:
                            "#fca5a5",
                          padding:
                            "12px",
                          borderRadius:
                            "10px",
                          textAlign:
                            "center",
                          fontWeight:
                            "bold",
                          marginTop:
                            "15px",
                        }}
                      >
                        ❌ You rejected
                        this offer
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </main>
    </div>
  );
}