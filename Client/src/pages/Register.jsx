import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleRegister = () => {
    if (
      !name.trim() ||
      !email.trim() ||
      !role ||
      !password ||
      !confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const existingUsers =
      JSON.parse(
        localStorage.getItem("waste2valueUsers")
      ) || [];

    const alreadyExists = existingUsers.some(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("Account already exists with this email");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: role,
      password: password,
    };

    localStorage.setItem(
      "waste2valueUsers",
      JSON.stringify([
        ...existingUsers,
        newUser,
      ])
    );

    alert(
      `Account created successfully! 🎉\n\nRole: ${role}`
    );

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #14532d 0%, #0f172a 38%, #020617 100%)",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 20px",
        boxSizing: "border-box",
        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          minHeight: "650px",
          display: "grid",
          gridTemplateColumns:
            "0.9fr 1.1fr",
          background: "rgba(15, 23, 42, 0.94)",
          border: "1px solid #334155",
          borderRadius: "28px",
          overflow: "hidden",
          boxShadow:
            "0 25px 70px rgba(0,0,0,0.45)",
        }}
      >
        {/* =================================================
            LEFT BRANDING PANEL
        ================================================= */}

        <div
          style={{
            padding: "45px",
            background:
              "linear-gradient(145deg, #166534, #14532d 45%, #052e16)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative circles */}

          <div
            style={{
              position: "absolute",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              border: "1px solid rgba(134,239,172,0.15)",
              top: "-80px",
              right: "-80px",
            }}
          />

          <div
            style={{
              position: "absolute",
              width: "160px",
              height: "160px",
              borderRadius: "50%",
              border: "1px solid rgba(134,239,172,0.12)",
              bottom: "-60px",
              left: "-60px",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background:
                  "rgba(255,255,255,0.12)",
                border:
                  "1px solid rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "38px",
                marginBottom: "25px",
              }}
            >
              ♻️
            </div>

            <h1
              style={{
                fontSize: "40px",
                lineHeight: "1.1",
                margin: "0 0 15px",
                color: "white",
              }}
            >
              Waste2Value
            </h1>

            <p
              style={{
                color: "#d1fae5",
                fontSize: "17px",
                lineHeight: "1.6",
                margin: 0,
                maxWidth: "360px",
              }}
            >
              Give waste a second life.
              Connect with buyers and
              sellers through a smarter
              recycling marketplace.
            </p>

            <div
              style={{
                marginTop: "35px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <Feature
                icon="♻️"
                text="Smart waste marketplace"
              />

              <Feature
                icon="🤝"
                text="Connect buyers and sellers"
              />

              <Feature
                icon="🌱"
                text="Build a greener future"
              />
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT REGISTER PANEL
        ================================================= */}

        <div
          style={{
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "430px",
            }}
          >
            {/* HEADER */}

            <div
              style={{
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "7px 12px",
                  borderRadius: "999px",
                  background: "#052e16",
                  border:
                    "1px solid #166534",
                  color: "#86efac",
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                🌱 JOIN WASTE2VALUE
              </div>

              <h2
                style={{
                  margin: 0,
                  fontSize: "30px",
                  color: "white",
                }}
              >
                Create your account
              </h2>

              <p
                style={{
                  color: "#94a3b8",
                  margin:
                    "8px 0 0",
                  fontSize: "14px",
                }}
              >
                Start your journey towards
                sustainable recycling.
              </p>
            </div>

            {/* NAME */}

            <label style={labelStyle}>
              Full Name
            </label>

            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>
                👤
              </span>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={inputWithIconStyle}
              />
            </div>

            {/* EMAIL */}

            <label style={labelStyle}>
              Email Address
            </label>

            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>
                ✉️
              </span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                style={inputWithIconStyle}
              />
            </div>

            {/* ROLE */}

            <label style={labelStyle}>
              Account Type
            </label>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <RoleCard
                selected={role === "Buyer"}
                icon="🛒"
                title="Buyer"
                description="Buy waste"
                onClick={() =>
                  setRole("Buyer")
                }
              />

              <RoleCard
                selected={role === "Seller"}
                icon="♻️"
                title="Seller"
                description="Sell waste"
                onClick={() =>
                  setRole("Seller")
                }
              />
            </div>

            {/* PASSWORD */}

            <label style={labelStyle}>
              Password
            </label>

            <div style={inputWrapperStyle}>
              <span style={inputIconStyle}>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                style={passwordInputStyle}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={eyeButtonStyle}
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>
            </div>

            {/* CONFIRM PASSWORD */}

            <label style={labelStyle}>
              Confirm Password
            </label>

            <div
              style={{
                ...inputWrapperStyle,
                marginBottom: "22px",
              }}
            >
              <span style={inputIconStyle}>
                🔐
              </span>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                style={passwordInputStyle}
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                style={eyeButtonStyle}
              >
                {showConfirmPassword
                  ? "🙈"
                  : "👁️"}
              </button>
            </div>

            {/* CREATE ACCOUNT */}

            <button
              type="button"
              onClick={handleRegister}
              style={{
                width: "100%",
                padding: "15px",
                border: "none",
                borderRadius: "12px",
                background:
                  "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#052e16",
                fontWeight: "800",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow:
                  "0 10px 25px rgba(34,197,94,0.2)",
              }}
            >
              Create Account →
            </button>

            {/* LOGIN */}

            <div
              style={{
                textAlign: "center",
                marginTop: "24px",
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#4ade80",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Login
              </Link>
            </div>

            {/* FOOTER */}

            <p
              style={{
                textAlign: "center",
                color: "#475569",
                fontSize: "11px",
                marginTop: "22px",
              }}
            >
              ♻️ Waste2Value Exchange
              {" • "}
              Sustainable. Smart. Connected.
            </p>
          </div>
        </div>
      </div>

      {/* RESPONSIVE */}

      <style>
        {`
          @media (max-width: 800px) {
            .register-main-card {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
  );
}

/* =====================================================
   FEATURE COMPONENT
===================================================== */

function Feature({ icon, text }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#dcfce7",
        fontSize: "14px",
      }}
    >
      <div
        style={{
          width: "34px",
          height: "34px",
          borderRadius: "10px",
          background:
            "rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      {text}
    </div>
  );
}

/* =====================================================
   ROLE CARD
===================================================== */

function RoleCard({
  selected,
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "13px 10px",
        borderRadius: "12px",
        border: selected
          ? "1px solid #22c55e"
          : "1px solid #334155",
        background: selected
          ? "#052e16"
          : "#0f172a",
        color: "white",
        cursor: "pointer",
        textAlign: "left",
        transition: "0.2s",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          marginBottom: "5px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontWeight: "bold",
          color: selected
            ? "#86efac"
            : "#e2e8f0",
          fontSize: "14px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          color: "#64748b",
          fontSize: "11px",
          marginTop: "3px",
        }}
      >
        {description}
      </div>
    </button>
  );
}

/* =====================================================
   STYLES
===================================================== */

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#cbd5e1",
  fontSize: "13px",
  fontWeight: "700",
};

const inputWrapperStyle = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "50px",
  marginBottom: "18px",
  boxSizing: "border-box",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  overflow: "hidden",
};

const inputIconStyle = {
  width: "45px",
  minWidth: "45px",
  textAlign: "center",
  fontSize: "16px",
};

const inputWithIconStyle = {
  flex: 1,
  height: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  fontSize: "14px",
  padding: "0 12px 0 0",
  minWidth: 0,
};

const passwordInputStyle = {
  flex: 1,
  height: "100%",
  border: "none",
  outline: "none",
  background: "transparent",
  color: "white",
  fontSize: "14px",
  padding: "0 5px 0 0",
  minWidth: 0,
};

const eyeButtonStyle = {
  width: "45px",
  minWidth: "45px",
  height: "100%",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "16px",
};