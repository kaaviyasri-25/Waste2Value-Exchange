import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =====================================================
  // LOGIN
  // =====================================================
  const handleLogin = () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }

    if (!password) {
      alert("Please enter your password.");
      return;
    }

    if (!role) {
      alert("Please select your account type.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      try {
        const users =
          JSON.parse(
            localStorage.getItem("waste2valueUsers")
          ) || [];

        const foundUser = users.find(
          (user) =>
            String(user.email || "")
              .toLowerCase()
              .trim() === email.toLowerCase().trim() &&
            user.password === password &&
            user.role === role
        );

        if (!foundUser) {
          setLoading(false);

          alert(
            `Invalid ${role} email or password.`
          );

          return;
        }

        const loggedInUser = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
        };

        localStorage.setItem(
          "currentUser",
          JSON.stringify(loggedInUser)
        );

        setLoading(false);

        alert(
          `${foundUser.role} login successful! 🎉`
        );

        navigate("/");
      } catch (error) {
        console.error("Login error:", error);

        setLoading(false);

        alert(
          "Something went wrong. Please try again."
        );
      }
    }, 700);
  };

  // =====================================================
  // ENTER KEY LOGIN
  // =====================================================
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  // =====================================================
  // PAGE
  // =====================================================
  return (
    <div
      className="w2v-login-page"
      style={pageStyle}
    >
      {/* =================================================
          BACKGROUND GLOW
      ================================================= */}

      <div
        style={{
          ...glowStyle,
          top: "-120px",
          left: "-120px",
        }}
      />

      <div
        style={{
          ...glowStyle,
          bottom: "-150px",
          right: "-120px",
          background:
            "rgba(34,197,94,0.12)",
        }}
      />

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="w2v-login-main"
        style={mainContainer}
      >
        {/* =================================================
            LEFT BRANDING SECTION
        ================================================= */}

        <div
          className="w2v-brand"
          style={brandSection}
        >
          {/* LOGO */}

          <div style={logoBox}>
            ♻️
          </div>

          {/* BRAND NAME */}

          <h1 style={brandTitle}>
            Waste
            <span style={{ color: "#22c55e" }}>
              2
            </span>
            Value
          </h1>

          <p style={brandSubtitle}>
            Circular Marketplace
          </p>

          <div style={brandLine} />

          {/* =================================================
              LOGIN IMAGE
              Image must be inside:
              public/assets/Login.png
          ================================================= */}

          <img
  src="/assets/Login.png"
  alt="Waste2Value Recycling"
  style={{
    display: "block",
    width: "100%",
    maxWidth: "430px",
    height: "250px",
    objectFit: "cover",
    borderRadius: "20px",
    marginBottom: "25px",
    border: "1px solid #334155",
    boxShadow: "0 20px 45px rgba(0,0,0,0.3)",
  }}
/>

          {/* HEADING */}

          <h2 style={brandHeading}>
            Turn Waste Into
            <br />
            <span style={{ color: "#22c55e" }}>
              Value.
            </span>
          </h2>

          <p style={brandDescription}>
            Connect with buyers and sellers,
            exchange recyclable materials,
            and build a cleaner circular
            economy.
          </p>

          {/* =================================================
              FEATURES
          ================================================= */}

          <div style={featuresContainer}>
            <Feature
              icon="♻️"
              title="Recycle"
              text="Give waste a second life."
            />

            <Feature
              icon="💰"
              title="Earn"
              text="Turn recyclable waste into value."
            />

            <Feature
              icon="🌱"
              title="Impact"
              text="Build a greener future."
            />
          </div>
        </div>

        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div
          className="w2v-login-card"
          style={loginCard}
        >
          {/* CARD HEADER */}

          <div
            style={{
              marginBottom: "28px",
            }}
          >
            <div
              className="w2v-mobile-logo"
              style={mobileLogo}
            >
              ♻️
            </div>

            <h2 style={loginTitle}>
              Welcome Back 👋
            </h2>

            <p style={loginSubtitle}>
              Login to continue to your
              Waste2Value account.
            </p>
          </div>

          {/* =================================================
              ROLE SELECTION
          ================================================= */}

          <label style={labelStyle}>
            Login as
          </label>

          <div
            className="w2v-role-grid"
            style={roleGrid}
          >
            {/* BUYER */}

            <button
              type="button"
              onClick={() => setRole("Buyer")}
              style={{
                ...roleCard,
                ...(role === "Buyer"
                  ? selectedBuyerStyle
                  : {}),
              }}
            >
              <div style={roleIcon}>
                🛒
              </div>

              <div>
                <div style={roleTitle}>
                  Buyer
                </div>

                <div style={roleDescription}>
                  Find & buy waste
                </div>
              </div>

              {role === "Buyer" && (
                <div style={checkCircle}>
                  ✓
                </div>
              )}
            </button>

            {/* SELLER */}

            <button
              type="button"
              onClick={() => setRole("Seller")}
              style={{
                ...roleCard,
                ...(role === "Seller"
                  ? selectedSellerStyle
                  : {}),
              }}
            >
              <div style={roleIcon}>
                ♻️
              </div>

              <div>
                <div style={roleTitle}>
                  Seller
                </div>

                <div style={roleDescription}>
                  List & sell waste
                </div>
              </div>

              {role === "Seller" && (
                <div style={checkCircle}>
                  ✓
                </div>
              )}
            </button>
          </div>

          {/* =================================================
              ROLE MESSAGE
          ================================================= */}

          <div style={roleMessage}>
            <span
              style={{
                fontSize: "18px",
              }}
            >
              {role === "Buyer"
                ? "🛒"
                : "♻️"}
            </span>

            <div>
              <strong
                style={{
                  color: "#e2e8f0",
                }}
              >
                {role} Account
              </strong>

              <p
                style={{
                  margin: "3px 0 0",
                  color: "#94a3b8",
                  fontSize: "12px",
                  lineHeight: "1.5",
                }}
              >
                {role === "Buyer"
                  ? "Browse listings and send offers to sellers."
                  : "Add waste listings and receive offers from buyers."}
              </p>
            </div>
          </div>

          {/* =================================================
              EMAIL
          ================================================= */}

          <div style={inputGroup}>
            <label style={labelStyle}>
              Email Address
            </label>

            <div style={inputWrapper}>
              <span style={inputIcon}>
                ✉️
              </span>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                onKeyDown={handleKeyDown}
                style={inputStyle}
                autoComplete="email"
              />
            </div>
          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div style={inputGroup}>
            <label style={labelStyle}>
              Password
            </label>

            <div style={inputWrapper}>
              <span style={inputIcon}>
                🔒
              </span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                onKeyDown={handleKeyDown}
                style={inputStyle}
                autoComplete="current-password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                style={passwordButton}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁️"}
              </button>
            </div>
          </div>

          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            style={{
              ...loginButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading ? (
              <>
                <span style={spinner} />
                Signing in...
              </>
            ) : (
              <>
                Login as {role}

                <span
                  style={{
                    fontSize: "20px",
                  }}
                >
                  →
                </span>
              </>
            )}
          </button>

          {/* =================================================
              REGISTER
          ================================================= */}

          <div style={registerSection}>
            <span
              style={{
                color: "#64748b",
              }}
            >
              Don't have an account?
            </span>

            <Link
              to="/register"
              style={registerLink}
            >
              Create Account
            </Link>
          </div>

          {/* =================================================
              SECURITY
          ================================================= */}

          <div style={securityMessage}>
            🔐 Your account information is
            stored securely.
          </div>
        </div>
      </div>

      {/* =================================================
          FOOTER
      ================================================= */}

      <div style={footer}>
        ♻️ Waste2Value Exchange

        <span
          style={{
            margin: "0 8px",
          }}
        >
          •
        </span>

        Building a circular future
      </div>
    </div>
  );
}

// =====================================================
// FEATURE COMPONENT
// =====================================================

function Feature({
  icon,
  title,
  text,
}) {
  return (
    <div style={featureItem}>
      <div style={featureIcon}>
        {icon}
      </div>

      <div>
        <div style={featureTitle}>
          {title}
        </div>

        <div style={featureText}>
          {text}
        </div>
      </div>
    </div>
  );
}

// =====================================================
// PAGE STYLE
// =====================================================

const pageStyle = {
  minHeight: "100vh",
  width: "100%",
  background:
    "radial-gradient(circle at top left, #172554 0%, #0f172a 40%, #020617 100%)",
  color: "white",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  boxSizing: "border-box",
  position: "relative",
  overflowX: "hidden",
  overflowY: "auto",
};

// =====================================================
// GLOW
// =====================================================

const glowStyle = {
  position: "absolute",
  width: "350px",
  height: "350px",
  borderRadius: "50%",
  background:
    "rgba(59,130,246,0.10)",
  filter: "blur(80px)",
  pointerEvents: "none",
};

// =====================================================
// MAIN CONTAINER
// =====================================================

const mainContainer = {
  width: "100%",
  maxWidth: "1050px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "50px",
  alignItems: "center",
  position: "relative",
  zIndex: 1,
};

// =====================================================
// BRAND SECTION
// =====================================================

const brandSection = {
  padding: "20px",
};

// =====================================================
// LOGO
// =====================================================

const logoBox = {
  width: "70px",
  height: "70px",
  borderRadius: "20px",
  background:
    "linear-gradient(135deg, #22c55e, #16a34a)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "38px",
  boxShadow:
    "0 12px 30px rgba(34,197,94,0.25)",
  marginBottom: "18px",
};

// =====================================================
// BRAND TITLE
// =====================================================

const brandTitle = {
  margin: 0,
  fontSize: "34px",
  fontWeight: "800",
  letterSpacing: "-1px",
};

// =====================================================
// BRAND SUBTITLE
// =====================================================

const brandSubtitle = {
  margin: "5px 0 25px",
  color: "#64748b",
  fontSize: "14px",
};

// =====================================================
// BRAND LINE
// =====================================================

const brandLine = {
  width: "60px",
  height: "4px",
  background: "#22c55e",
  borderRadius: "10px",
  marginBottom: "25px",
};

// =====================================================
// LOGIN IMAGE
// =====================================================

const loginImageStyle = {
  display: "block",
  width: "100%",
  maxWidth: "430px",
  height: "250px",
  objectFit: "cover",
  borderRadius: "20px",
  marginBottom: "25px",
  border: "1px solid #334155",
  boxShadow:
    "0 20px 45px rgba(0,0,0,0.3)",
};

// =====================================================
// BRAND HEADING
// =====================================================

const brandHeading = {
  margin: 0,
  fontSize: "44px",
  lineHeight: "1.1",
  letterSpacing: "-1.5px",
};

// =====================================================
// BRAND DESCRIPTION
// =====================================================

const brandDescription = {
  color: "#94a3b8",
  lineHeight: "1.7",
  maxWidth: "470px",
  marginTop: "20px",
  fontSize: "15px",
};

// =====================================================
// FEATURES
// =====================================================

const featuresContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  marginTop: "30px",
};

const featureItem = {
  display: "flex",
  alignItems: "center",
  gap: "13px",
};

const featureIcon = {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  background: "#172033",
  border: "1px solid #334155",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "19px",
};

const featureTitle = {
  fontWeight: "bold",
  fontSize: "14px",
};

const featureText = {
  color: "#64748b",
  fontSize: "12px",
  marginTop: "3px",
};

// =====================================================
// LOGIN CARD
// =====================================================

const loginCard = {
  width: "100%",
  background:
    "rgba(30,41,59,0.92)",
  border:
    "1px solid rgba(71,85,105,0.8)",
  borderRadius: "24px",
  padding: "34px",
  boxSizing: "border-box",
  boxShadow:
    "0 25px 70px rgba(0,0,0,0.35)",
  backdropFilter: "blur(15px)",
};

// =====================================================
// MOBILE LOGO
// =====================================================

const mobileLogo = {
  display: "none",
};

// =====================================================
// LOGIN TITLE
// =====================================================

const loginTitle = {
  margin: 0,
  fontSize: "30px",
  fontWeight: "800",
};

// =====================================================
// LOGIN SUBTITLE
// =====================================================

const loginSubtitle = {
  margin: "8px 0 0",
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.5",
};

// =====================================================
// LABEL
// =====================================================

const labelStyle = {
  display: "block",
  marginBottom: "9px",
  color: "#cbd5e1",
  fontSize: "13px",
  fontWeight: "bold",
};

// =====================================================
// ROLE GRID
// =====================================================

const roleGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "10px",
  marginBottom: "12px",
};

// =====================================================
// ROLE CARD
// =====================================================

const roleCard = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  textAlign: "left",
  padding: "13px",
  borderRadius: "13px",
  border: "1px solid #334155",
  background: "#111827",
  color: "white",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

// =====================================================
// SELECTED BUYER
// =====================================================

const selectedBuyerStyle = {
  border: "1px solid #3b82f6",
  background:
    "rgba(30,58,138,0.35)",
  boxShadow:
    "0 0 0 2px rgba(59,130,246,0.10)",
};

// =====================================================
// SELECTED SELLER
// =====================================================

const selectedSellerStyle = {
  border: "1px solid #22c55e",
  background:
    "rgba(20,83,45,0.35)",
  boxShadow:
    "0 0 0 2px rgba(34,197,94,0.10)",
};

// =====================================================
// ROLE ICON
// =====================================================

const roleIcon = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: "#172033",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "17px",
  flexShrink: 0,
};

// =====================================================
// ROLE TITLE
// =====================================================

const roleTitle = {
  fontWeight: "bold",
  fontSize: "13px",
};

// =====================================================
// ROLE DESCRIPTION
// =====================================================

const roleDescription = {
  color: "#64748b",
  fontSize: "10px",
  marginTop: "3px",
};

// =====================================================
// CHECK CIRCLE
// =====================================================

const checkCircle = {
  position: "absolute",
  top: "7px",
  right: "7px",
  width: "18px",
  height: "18px",
  borderRadius: "50%",
  background: "#22c55e",
  color: "#052e16",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: "bold",
};

// =====================================================
// ROLE MESSAGE
// =====================================================

const roleMessage = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  background: "#0f172a",
  border: "1px solid #334155",
  borderRadius: "11px",
  padding: "11px",
  marginBottom: "20px",
};

// =====================================================
// INPUT GROUP
// =====================================================

const inputGroup = {
  marginBottom: "18px",
};

// =====================================================
// INPUT WRAPPER
// =====================================================

const inputWrapper = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

// =====================================================
// INPUT ICON
// =====================================================

const inputIcon = {
  position: "absolute",
  left: "14px",
  fontSize: "16px",
  zIndex: 1,
};

// =====================================================
// INPUT
// =====================================================

const inputStyle = {
  width: "100%",
  height: "50px",
  padding: "0 45px 0 43px",
  boxSizing: "border-box",
  borderRadius: "11px",
  border: "1px solid #475569",
  background: "#0f172a",
  color: "white",
  outline: "none",
  fontSize: "14px",
};

// =====================================================
// PASSWORD BUTTON
// =====================================================

const passwordButton = {
  position: "absolute",
  right: "8px",
  width: "36px",
  height: "36px",
  border: "none",
  background: "transparent",
  color: "white",
  cursor: "pointer",
  fontSize: "16px",
};

// =====================================================
// LOGIN BUTTON
// =====================================================

const loginButton = {
  width: "100%",
  minHeight: "52px",
  marginTop: "5px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg, #22c55e, #16a34a)",
  color: "#052e16",
  fontWeight: "800",
  fontSize: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  boxShadow:
    "0 10px 25px rgba(34,197,94,0.18)",
};

// =====================================================
// SPINNER
// =====================================================

const spinner = {
  width: "17px",
  height: "17px",
  borderRadius: "50%",
  border:
    "2px solid rgba(5,46,22,0.3)",
  borderTop:
    "2px solid #052e16",
  display: "inline-block",
  animation:
    "w2v-spin 0.8s linear infinite",
};

// =====================================================
// REGISTER
// =====================================================

const registerSection = {
  textAlign: "center",
  marginTop: "23px",
  fontSize: "13px",
};

const registerLink = {
  color: "#22c55e",
  textDecoration: "none",
  fontWeight: "bold",
  marginLeft: "5px",
};

// =====================================================
// SECURITY
// =====================================================

const securityMessage = {
  textAlign: "center",
  marginTop: "18px",
  paddingTop: "15px",
  borderTop: "1px solid #334155",
  color: "#64748b",
  fontSize: "11px",
};

// =====================================================
// FOOTER
// =====================================================

const footer = {
  position: "relative",
  zIndex: 1,
  marginTop: "25px",
  color: "#475569",
  fontSize: "11px",
  textAlign: "center",
};

// =====================================================
// RESPONSIVE CSS
// =====================================================

const responsiveStyle = `
@keyframes w2v-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.w2v-login-page input::placeholder {
  color: #64748b;
}

.w2v-login-page input:focus {
  border-color: #22c55e !important;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.10);
}

.w2v-login-page button:hover:not(:disabled) {
  transform: translateY(-1px);
}

.w2v-login-page a:hover {
  text-decoration: underline !important;
}

@media (max-width: 850px) {
  .w2v-login-main {
    grid-template-columns: 1fr !important;
    max-width: 520px !important;
    gap: 20px !important;
  }

  .w2v-brand {
    display: none !important;
  }

  .w2v-login-card {
    width: 100% !important;
  }

  .w2v-mobile-logo {
    display: flex !important;
    width: 55px;
    height: 55px;
    border-radius: 16px;
    background: linear-gradient(
      135deg,
      #22c55e,
      #16a34a
    );
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin-bottom: 18px;
  }
}

@media (max-width: 500px) {
  .w2v-login-page {
    padding: 15px !important;
    justify-content: flex-start !important;
    padding-top: 25px !important;
  }

  .w2v-login-card {
    padding: 25px !important;
    border-radius: 18px !important;
  }

  .w2v-role-grid {
    grid-template-columns: 1fr !important;
  }

  .w2v-login-page h2 {
    font-size: 26px !important;
  }

  .w2v-login-page {
    font-size: 14px;
  }
}
`;

// =====================================================
// INJECT CSS ONCE
// =====================================================

if (
  typeof document !== "undefined" &&
  !document.head.querySelector(
    "[data-w2v-login-style]"
  )
) {
  const styleElement =
    document.createElement("style");

  styleElement.setAttribute(
    "data-w2v-login-style",
    "true"
  );

  styleElement.innerHTML =
    responsiveStyle;

  document.head.appendChild(
    styleElement
  );
}