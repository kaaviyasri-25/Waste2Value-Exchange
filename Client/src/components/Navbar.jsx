import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    navigate("/login");
  };

  const links = [
    {
      name: "Home",
      path: "/",
      icon: "🏠",
    },

    {
      name: "Marketplace",
      path: "/marketplace",
      icon: "🛒",
    },

    ...(user?.role === "Seller"
      ? [
          {
            name: "Add Waste",
            path: "/add-waste",
            icon: "♻️",
          },
          {
            name: "Received Offers",
            path: "/received-offers",
            icon: "💰",
          },
        ]
      : []),

    ...(user?.role === "Buyer"
      ? [
          {
            name: "My Offers",
            path: "/my-offers",
            icon: "💰",
          },
        ]
      : []),

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊",
    },

    {
      name: "Profile",
      path: "/profile",
      icon: "👤",
    },

    {
      name: "Wishlist",
      path: "/wishlist",
      icon: "💗",
    },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100vh",
        background: "#020617",
        borderRight: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        zIndex: 9999,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          height: "90px",
          padding: "20px 18px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "#22c55e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "23px",
            boxShadow: "0 0 20px rgba(34,197,94,0.25)",
            flexShrink: 0,
          }}
        >
          ♻️
        </div>

        <div>
          <div
            style={{
              color: "#22c55e",
              fontSize: "18px",
              fontWeight: "800",
              lineHeight: "1.2",
            }}
          >
            Waste2Value
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: "11px",
              marginTop: "4px",
            }}
          >
            Circular Marketplace
          </div>
        </div>
      </div>

      {/* USER CARD */}
      {user && (
        <div
          style={{
            margin: "18px 14px 15px",
            padding: "14px",
            borderRadius: "14px",
            background: "#111827",
            border: "1px solid #263449",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              border: "1px solid #3b82f6",
              background: "#172554",
              color: "#93c5fd",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            {user.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div
            style={{
              minWidth: 0,
            }}
          >
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.name}
            </div>

            <div
              style={{
                color:
                  user.role === "Seller"
                    ? "#22c55e"
                    : "#60a5fa",
                fontSize: "12px",
                marginTop: "4px",
                fontWeight: "bold",
              }}
            >
              {user.role === "Seller"
                ? "♻️ Seller"
                : "🛒 Buyer"}
            </div>
          </div>
        </div>
      )}

      {/* MENU TITLE */}
      <div
        style={{
          padding: "0 20px",
          marginBottom: "8px",
          color: "#64748b",
          fontSize: "10px",
          fontWeight: "800",
          letterSpacing: "1px",
          flexShrink: 0,
        }}
      >
        MAIN MENU
      </div>

      {/* LINKS */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "0 12px",
          boxSizing: "border-box",
        }}
      >
        {links.map((link) => {
          const active =
            location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                width: "100%",
                boxSizing: "border-box",
                padding: "13px 16px",
                marginBottom: "5px",
                borderRadius: "10px",
                textDecoration: "none",

                color: active
                  ? "#ffffff"
                  : "#94a3b8",

                background: active
                  ? "#14532d"
                  : "transparent",

                border: active
                  ? "1px solid #22c55e"
                  : "1px solid transparent",

                fontSize: "14px",
                fontWeight: active
                  ? "700"
                  : "500",

                transition:
                  "all 0.2s ease",
              }}
            >
              <span
                style={{
                  width: "20px",
                  textAlign: "center",
                  fontSize: "17px",
                }}
              >
                {link.icon}
              </span>

              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* BOTTOM */}
      <div
        style={{
          padding: "14px",
          borderTop: "1px solid #1e293b",
          flexShrink: 0,
        }}
      >
        {user ? (
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #991b1b",
              background: "#450a0a",
              color: "#fecaca",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🚪 Logout
          </button>
        ) : (
          <Link
            to="/login"
            style={{
              display: "block",
              textAlign: "center",
              padding: "12px",
              borderRadius: "10px",
              background: "#22c55e",
              color: "#052e16",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        )}

        <div
          style={{
            textAlign: "center",
            color: "#475569",
            fontSize: "10px",
            marginTop: "10px",
          }}
        >
          Waste2Value Exchange
        </div>
      </div>
    </aside>
  );
}