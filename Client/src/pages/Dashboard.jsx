import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API = "https://waste2value-backend.onrender.com/api/listings";

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(API);
        setListings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const totalListings = listings.length;

  const totalEstimatedValue = useMemo(
    () =>
      listings.reduce(
        (sum, item) => sum + Number(item.expectedPrice || 0),
        0
      ),
    [listings]
  );

  const categoryStats = useMemo(() => {
    const stats = {};
    listings.forEach((item) => {
      const key = item.category || "Others";
      stats[key] = (stats[key] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  }, [listings]);

  const recentListings = [...listings]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        fontFamily: "Arial"
      }}
    >
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1 style={{ color: "#22c55e", marginBottom: "24px" }}>
          Dashboard
        </h1>

        {loading ? (
          <p>Loading dashboard...</p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "20px",
                marginBottom: "30px"
              }}
            >
              <div
                style={{
                  background: "#1e293b",
                  padding: "22px",
                  borderRadius: "16px",
                  border: "1px solid #334155"
                }}
              >
                <p style={{ color: "#94a3b8", marginBottom: "8px" }}>
                  Total Listings
                </p>
                <h2 style={{ color: "#22c55e" }}>{totalListings}</h2>
              </div>

              <div
                style={{
                  background: "#1e293b",
                  padding: "22px",
                  borderRadius: "16px",
                  border: "1px solid #334155"
                }}
              >
                <p style={{ color: "#94a3b8", marginBottom: "8px" }}>
                  Estimated Value
                </p>
                <h2 style={{ color: "#22c55e" }}>
                  ₹{totalEstimatedValue.toLocaleString()}
                </h2>
              </div>

              <div
                style={{
                  background: "#1e293b",
                  padding: "22px",
                  borderRadius: "16px",
                  border: "1px solid #334155"
                }}
              >
                <p style={{ color: "#94a3b8", marginBottom: "8px" }}>
                  Categories
                </p>
                <h2 style={{ color: "#22c55e" }}>{categoryStats.length}</h2>
              </div>

              <div
                style={{
                  background: "#1e293b",
                  padding: "22px",
                  borderRadius: "16px",
                  border: "1px solid #334155"
                }}
              >
                <p style={{ color: "#94a3b8", marginBottom: "8px" }}>
                  Active Status
                </p>
                <h2 style={{ color: "#22c55e" }}>Available</h2>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}
            >
              <div
                style={{
                  background: "#1e293b",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #334155"
                }}
              >
                <h3 style={{ color: "#22c55e", marginBottom: "16px" }}>
                  Category Distribution
                </h3>

                {categoryStats.length === 0 ? (
                  <p>No category data available.</p>
                ) : (
                  categoryStats.map(([category, count]) => (
                    <div key={category} style={{ marginBottom: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: "6px"
                        }}
                      >
                        <span>{category}</span>
                        <span>{count}</span>
                      </div>

                      <div
                        style={{
                          height: "10px",
                          background: "#334155",
                          borderRadius: "999px"
                        }}
                      >
                        <div
                          style={{
                            width: `${(count / totalListings) * 100}%`,
                            height: "100%",
                            background: "#22c55e",
                            borderRadius: "999px"
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div
                style={{
                  background: "#1e293b",
                  padding: "24px",
                  borderRadius: "16px",
                  border: "1px solid #334155"
                }}
              >
                <h3 style={{ color: "#22c55e", marginBottom: "16px" }}>
                  Recent Listings
                </h3>

                {recentListings.length === 0 ? (
                  <p>No listings available.</p>
                ) : (
                  recentListings.map((item) => (
                    <div
                      key={item._id}
                      style={{
                        padding: "14px 0",
                        borderBottom: "1px solid #334155"
                      }}
                    >
                      <strong>{item.title}</strong>
                      <div style={{ color: "#94a3b8", fontSize: "14px" }}>
                        {item.category} • {item.quantity} {item.unit} • ₹
                        {item.expectedPrice}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;