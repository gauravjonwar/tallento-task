import React from "react";
import { FiBell, FiSearch, FiGrid } from "react-icons/fi";

export default function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "1rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "1rem",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      }}
    >
      {/* Left Section - Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>T</div>
        <div>
          <h1 style={{ fontWeight: "bold", fontSize: "1.25rem", margin: 0 }}>
            Tallento.ai
          </h1>
          <p style={{ fontSize: "0.75rem", color: "gray", margin: 0 }}>
            Where AI Meets Ambition
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <FiGrid size={18} />
          <span>Job Category</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <FiSearch size={18} />
          <span>Find Jobs</span>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
          }}
        >
          <FiBell size={18} />
          <span>Notifications</span>
          <span
            style={{
              position: "absolute",
              top: "-8px",
              right: "-12px",
              backgroundColor: "red",
              color: "white",
              fontSize: "0.75rem",
              padding: "2px 6px",
              borderRadius: "9999px",
            }}
          >
            29
          </span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <button
          style={{
            backgroundColor: "#ec4899",
            color: "white",
            border: "none",
            borderRadius: "9999px",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#db2777")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ec4899")}
        >
          + Post a Job
        </button>

        <img
          src="https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
          alt="user"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "2px solid #a855f7",
          }}
        />
      </div>
    </nav>
  );
}
