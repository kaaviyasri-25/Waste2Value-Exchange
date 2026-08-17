import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  // =========================
  // LOAD USER + PROFILE
  // =========================
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (!savedUser) {
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      const email = parsedUser.email || "";

      setUser(parsedUser);

      const profileKey = `userProfile_${email}`;

      const savedProfile =
        JSON.parse(localStorage.getItem(profileKey)) || {};

      setProfile({
        name:
          savedProfile.name ||
          parsedUser.name ||
          email.split("@")[0] ||
          "Waste2Value User",

        email: email,

        phone: savedProfile.phone || "",

        location: savedProfile.location || "",
      });
    } catch (error) {
      console.error("Profile loading error:", error);
      setUser(null);
    }
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setProfile((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================
  // SAVE PROFILE
  // =========================
  const handleSave = () => {
    if (!user) return;

    const profileKey = `userProfile_${user.email}`;

    localStorage.setItem(
      profileKey,
      JSON.stringify({
        name: profile.name,
        phone: profile.phone,
        location: profile.location,
      })
    );

    const updatedUser = {
      ...user,
      name: profile.name,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);
    setEditing(false);

    alert("Profile updated successfully! ✅");
  };

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!user) {
    return (
      <div style={pageStyle}>
        <Navbar />

        <main style={mainStyle}>
          <div style={loginMessageStyle}>
            <div style={{ fontSize: "55px" }}>👤</div>

            <h1 style={{ color: "#22c55e" }}>
              Profile
            </h1>

            <p style={{ color: "#94a3b8" }}>
              Please login to view your profile.
            </p>
          </div>
        </main>
      </div>
    );
  }

  // =========================
  // PROFILE INITIAL
  // =========================
  const firstLetter =
    profile.name?.charAt(0)?.toUpperCase() || "U";

  // =========================
  // ROLE
  // =========================
  const isSeller = user.role === "Seller";

  const roleText = isSeller ? "Seller" : "Buyer";

  const roleIcon = isSeller ? "🏪" : "🛒";

  const roleColor = isSeller
    ? "#86efac"
    : "#93c5fd";

  const roleBackground = isSeller
    ? "#14532d"
    : "#1e3a8a";

  const roleBorder = isSeller
    ? "#22c55e"
    : "#60a5fa";

  // =========================
  // PAGE
  // =========================
  return (
    <div style={pageStyle}>
      <Navbar />

      {/* =========================
          MAIN CONTENT
      ========================= */}
      <main style={mainStyle}>

        {/* =========================
            PROFILE HEADER
        ========================= */}
        <section
          style={{
            ...cardWidthStyle,
            background:
              "linear-gradient(135deg, #166534, #14532d)",
            border: "1px solid #22c55e",
            borderRadius: "20px",
            padding: "30px",
            display: "flex",
            alignItems: "center",
            gap: "22px",
            marginBottom: "25px",
            boxSizing: "border-box",
            flexWrap: "wrap",
          }}
        >
          {/* AVATAR */}
          <div
            style={{
              width: "80px",
              height: "80px",
              minWidth: "80px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#052e16",
              fontSize: "38px",
              fontWeight: "bold",
            }}
          >
            {firstLetter}
          </div>

          {/* USER DETAILS */}
          <div
            style={{
              minWidth: 0,
              flex: 1,
            }}
          >
            <h1
              style={{
                margin: "0 0 8px",
                fontSize: "32px",
                color: "white",
                wordBreak: "break-word",
              }}
            >
              {profile.name}
            </h1>

            <p
              style={{
                margin: 0,
                color: "#d1fae5",
                fontSize: "16px",
              }}
            >
              ♻️ Waste2Value Member
            </p>

            {/* ROLE BADGE */}
            <div
              style={{
                display: "inline-block",
                marginTop: "10px",
                padding: "7px 15px",
                borderRadius: "999px",
                background: roleBackground,
                border: `1px solid ${roleBorder}`,
                color: roleColor,
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {roleIcon} {roleText}
            </div>

            <p
              style={{
                margin: "10px 0 0",
                color: "#94a3b8",
                fontSize: "14px",
                wordBreak: "break-word",
              }}
            >
              {profile.email}
            </p>
          </div>
        </section>

        {/* =========================
            PERSONAL INFORMATION
        ========================= */}
        <section
          style={{
            ...cardWidthStyle,
            background: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "20px",
            padding: "28px",
            boxSizing: "border-box",
          }}
        >
          {/* SECTION HEADER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "15px",
              marginBottom: "25px",
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
                👤 Personal Information
              </h2>

              <p
                style={{
                  margin: "8px 0 0",
                  color: "#94a3b8",
                }}
              >
                Manage your Waste2Value account details.
              </p>
            </div>

            {!editing ? (
              <button
                type="button"
                onClick={() => setEditing(true)}
                style={editButtonStyle}
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSave}
                style={saveButtonStyle}
              >
                ✓ Save Changes
              </button>
            )}
          </div>

          {/* =========================
              FULL NAME
          ========================= */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              disabled={!editing}
              style={{
                ...inputStyle,
                opacity: editing ? 1 : 0.9,
              }}
            />
          </div>

          {/* =========================
              EMAIL
          ========================= */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>
              Email
            </label>

            <input
              type="email"
              value={profile.email}
              disabled
              style={{
                ...inputStyle,
                opacity: 0.7,
              }}
            />
          </div>

          {/* =========================
              ROLE
          ========================= */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>
              Account Role
            </label>

            <div
              style={{
                width: "100%",
                padding: "14px",
                boxSizing: "border-box",
                borderRadius: "10px",
                border: `1px solid ${roleBorder}`,
                background: roleBackground,
                color: roleColor,
                fontSize: "15px",
                fontWeight: "bold",
              }}
            >
              {roleIcon} {roleText}
            </div>
          </div>

          {/* =========================
              PHONE
          ========================= */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>
              Phone Number
            </label>

            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter phone number"
              style={{
                ...inputStyle,
                opacity: editing ? 1 : 0.9,
              }}
            />
          </div>

          {/* =========================
              LOCATION
          ========================= */}
          <div style={fieldWrapper}>
            <label style={labelStyle}>
              Location
            </label>

            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              disabled={!editing}
              placeholder="Enter your location"
              style={{
                ...inputStyle,
                opacity: editing ? 1 : 0.9,
              }}
            />
          </div>

          {/* =========================
              ROLE INFORMATION
          ========================= */}
          <div
            style={{
              marginTop: "10px",
              padding: "18px",
              borderRadius: "12px",
              background: "#0f172a",
              border: `1px solid ${roleBorder}`,
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                margin: "0 0 7px",
                color: "#94a3b8",
              }}
            >
              Account Type
            </p>

            <div
              style={{
                color: roleColor,
                fontWeight: "bold",
                fontSize: "17px",
              }}
            >
              {roleIcon} You are registered as a{" "}
              {roleText}
            </div>

            <p
              style={{
                margin: "8px 0 0",
                color: "#64748b",
                fontSize: "13px",
                lineHeight: "1.6",
              }}
            >
              {isSeller
                ? "You can add waste listings and receive offers from buyers."
                : "You can browse waste listings and send offers to sellers."}
            </p>
          </div>

          {/* =========================
              ACCOUNT STATUS
          ========================= */}
          <div
            style={{
              marginTop: "20px",
              padding: "18px",
              borderRadius: "12px",
              background: "#0f172a",
              border: "1px solid #334155",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                margin: "0 0 7px",
                color: "#94a3b8",
              }}
            >
              Account Status
            </p>

            <div
              style={{
                color: "#22c55e",
                fontWeight: "bold",
              }}
            >
              ● Active Member
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// =====================================================
// PAGE STYLE
// =====================================================

const pageStyle = {
  minHeight: "100vh",
  width: "100%",
  background: "#0f172a",
  color: "white",
  fontFamily: "Arial, sans-serif",
  boxSizing: "border-box",
};

// =====================================================
// MAIN CONTENT STYLE
// IMPORTANT: SIDEBAR WIDTH = 250px
// =====================================================

const mainStyle = {
  marginLeft: "250px",
  width: "calc(100% - 250px)",
  minHeight: "100vh",
  padding: "35px 35px 70px",
  boxSizing: "border-box",
};

// =====================================================
// CARD WIDTH
// =====================================================

const cardWidthStyle = {
  width: "100%",
  maxWidth: "900px",
  marginLeft: "auto",
  marginRight: "auto",
};

// =====================================================
// LOGIN MESSAGE
// =====================================================

const loginMessageStyle = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

// =====================================================
// FORM FIELD
// =====================================================

const fieldWrapper = {
  marginBottom: "20px",
};

// =====================================================
// LABEL
// =====================================================

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#94a3b8",
  fontSize: "15px",
};

// =====================================================
// INPUT
// =====================================================

const inputStyle = {
  width: "100%",
  padding: "14px",
  boxSizing: "border-box",
  borderRadius: "10px",
  border: "1px solid #475569",
  background: "#172033",
  color: "white",
  outline: "none",
  fontSize: "15px",
};

// =====================================================
// EDIT BUTTON
// =====================================================

const editButtonStyle = {
  border: "none",
  borderRadius: "10px",
  background: "#2563eb",
  color: "white",
  padding: "11px 18px",
  fontWeight: "bold",
  cursor: "pointer",
  whiteSpace: "nowrap",
};

// =====================================================
// SAVE BUTTON
// =====================================================

const saveButtonStyle = {
  border: "none",
  borderRadius: "10px",
  background: "#22c55e",
  color: "#052e16",
  padding: "11px 18px",
  fontWeight: "bold",
  cursor: "pointer",
  whiteSpace: "nowrap",
};