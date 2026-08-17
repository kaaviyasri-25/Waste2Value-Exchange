import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
  const navigate = useNavigate();

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
      {/* SIDEBAR */}
      <Navbar />

      {/* ================= MAIN AREA ================= */}
      <main
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minHeight: "100vh",
          boxSizing: "border-box",
          padding: "35px 40px 70px",
        }}
      >
        {/* ================= HERO ================= */}
        <section
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            textAlign: "center",
            padding: "20px 10px 35px",
            boxSizing: "border-box",
          }}
        >
          {/* ICON */}
          <div
            style={{
              fontSize: "58px",
              lineHeight: "1",
              marginBottom: "15px",
            }}
          >
            ♻️
          </div>

          {/* TITLE */}
          <h1
            style={{
              margin: "0",
              fontSize: "46px",
              fontWeight: "800",
              color: "#22c55e",
              lineHeight: "1.15",
            }}
          >
            Waste2Value Exchange
          </h1>

          {/* DESCRIPTION */}
          <p
            style={{
              maxWidth: "850px",
              margin: "22px auto 0",
              color: "#cbd5e1",
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Turn waste into value through a smart recycling
            marketplace. Connect buyers and sellers, reduce waste,
            and build a greener future.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px",
              flexWrap: "wrap",
              marginTop: "28px",
            }}
          >
            <button
              onClick={() => navigate("/marketplace")}
              style={{
                padding: "14px 26px",
                borderRadius: "10px",
                border: "none",
                background: "#22c55e",
                color: "#052e16",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Explore Marketplace
            </button>

            <button
              onClick={() => navigate("/add-waste")}
              style={{
                padding: "14px 26px",
                borderRadius: "10px",
                border: "1px solid #475569",
                background: "#1e293b",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Sell Waste
            </button>
          </div>
        </section>

        {/* ================= FEATURE CARDS ================= */}
        <section
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns:
              "repeat(3, minmax(0, 1fr))",
            gap: "20px",
            boxSizing: "border-box",
          }}
        >
          <FeatureCard
            icon="♻️"
            title="Recycle"
            text="Give recyclable materials a second life."
          />

          <FeatureCard
            icon="💰"
            title="Earn"
            text="Turn your recyclable waste into value."
          />

          <FeatureCard
            icon="🌱"
            title="Go Green"
            text="Contribute to a cleaner and greener planet."
          />
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "35px auto 0",
            background: "#111827",
            border: "1px solid #334155",
            borderRadius: "18px",
            padding: "30px",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              color: "#22c55e",
              margin: "0 0 28px",
              fontSize: "28px",
            }}
          >
            How Waste2Value Works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, minmax(0, 1fr))",
              gap: "22px",
            }}
          >
            <Step
              number="01"
              title="List Waste"
              text="Sellers add recyclable waste with quantity and expected price."
            />

            <Step
              number="02"
              title="Find Materials"
              text="Buyers explore available recyclable materials in the marketplace."
            />

            <Step
              number="03"
              title="Send Offer"
              text="Buyers can send an offer directly to the seller."
            />

            <Step
              number="04"
              title="Complete Deal"
              text="Seller reviews the offer and accepts or rejects it."
            />
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section
          style={{
            width: "100%",
            maxWidth: "1100px",
            margin: "35px auto 0",
            background:
              "linear-gradient(135deg, #14532d, #166534)",
            border: "1px solid #22c55e",
            borderRadius: "18px",
            padding: "32px",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              margin: "0 0 10px",
              fontSize: "28px",
            }}
          >
            Ready to turn waste into wealth? ♻️
          </h2>

          <p
            style={{
              color: "#d1fae5",
              margin: "0 0 22px",
            }}
          >
            Join the circular economy and make an impact.
          </p>

          <button
            onClick={() => navigate("/marketplace")}
            style={{
              padding: "13px 25px",
              borderRadius: "10px",
              border: "none",
              background: "#22c55e",
              color: "#052e16",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Start Exploring
          </button>
        </section>
      </main>
    </div>
  );
}


/* =====================================================
   FEATURE CARD
===================================================== */

function FeatureCard({ icon, title, text }) {
  return (
    <div
      style={{
        width: "100%",
        minWidth: 0,
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "18px",
        padding: "28px 20px",
        textAlign: "center",
        minHeight: "175px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontSize: "40px",
          lineHeight: "1",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin: "0 0 12px",
          color: "#22c55e",
          fontSize: "23px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#94a3b8",
          lineHeight: "1.6",
          fontSize: "15px",
        }}
      >
        {text}
      </p>
    </div>
  );
}


/* =====================================================
   STEP
===================================================== */

function Step({ number, title, text }) {
  return (
    <div
      style={{
        minWidth: 0,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          margin: "0 auto 14px",
          borderRadius: "50%",
          background: "#14532d",
          border: "1px solid #22c55e",
          color: "#22c55e",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        {number}
      </div>

      <h3
        style={{
          margin: "0 0 8px",
          color: "white",
          fontSize: "17px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#94a3b8",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {text}
      </p>
    </div>
  );
}