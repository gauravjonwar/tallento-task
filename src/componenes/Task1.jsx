import { FiSearch, FiBell, FiGrid } from "react-icons/fi";

export default function Task1() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "white",
        textAlign: "center",
        padding: "2rem",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        gap: "50px",
        alignItems: "center",
        margin: 0,
      }}
    >
      {/* Navbar Section */}
      <nav
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "rgba(15, 23, 42, 0.6)",
          color: "white",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          marginBottom: "2rem",
        }}
      >
        {/* Left Section - Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>T</div>
          <div>
            <h1 style={{ fontWeight: "bold", fontSize: "1.25rem", margin: 0 }}>
              Tallento.ai
            </h1>
            <p style={{ fontSize: "0.75rem", color: "#cbd5e1", margin: 0 }}>
              Where AI Meets Ambition
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
            <FiGrid size={18} />
            <span>Job Category</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              cursor: "pointer",
            }}
          >
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
      <div
        style={{
          //   flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Find Your
        </h1>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#ec4899",
            marginBottom: "3rem",
          }}
        >
          Dream Job Now
        </h2>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "white",
            borderRadius: "9999px",
            padding: "0.5rem",
            maxWidth: "500px",
            margin: "0 auto 2rem auto",
          }}
        >
          <FiSearch color="gray" style={{ marginLeft: "0.5rem" }} />
          <input
            type="text"
            placeholder="Search jobs, skills or companies"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "0.5rem",
              fontSize: "1rem",
              color: "#333",
              borderRadius: "9999px",
            }}
          />
          <button
            style={{
              backgroundColor: "#ec4899",
              color: "white",
              border: "none",
              borderRadius: "9999px",
              padding: "0.5rem 1.5rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Find Jobs
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "3rem",
            flexWrap: "wrap",
          }}
        >
          {["Social Science Teacher", "Math Faculty", "Physics JEE Expert"].map(
            (tag) => (
              <span
                key={tag}
                style={{
                  background: "#1f2937",
                  padding: "0.5rem 1rem",
                  borderRadius: "9999px",
                  fontSize: "0.875rem",
                  cursor: "pointer",
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "1.5rem",
          textAlign: "center",
          width: "100%",
          maxWidth: "1000px",
        }}
      >
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              fontSize: "1.1rem",
            }}
          >
            Top 1% candidates, 3x faster hiring
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#cbd5e1",
              lineHeight: "1.5",
            }}
          >
            Empowering education, coaching, and tech sectors to hire verified
            talent faster.
          </p>
        </div>
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              fontSize: "1.1rem",
            }}
          >
            Streamlined hiring with AI screening
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#cbd5e1",
              lineHeight: "1.5",
            }}
          >
            AI-powered screening and instant interview scheduling.
          </p>
        </div>
        <div style={{ padding: "1rem" }}>
          <h3
            style={{
              fontWeight: "bold",
              marginBottom: "1rem",
              fontSize: "1.1rem",
            }}
          >
            Advanced filtering & instant scheduling
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#cbd5e1",
              lineHeight: "1.5",
            }}
          >
            Find jobs that match your skills and goals with 24/7 alerts.
          </p>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "3rem",
          flexWrap: "wrap",
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>7500+</h2>
          <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
            Jobs Available
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>5500+</h2>
          <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>
            Companies Hiring
          </p>
        </div>
        <div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>1M+</h2>
          <p style={{ fontSize: "0.875rem", color: "#cbd5e1" }}>Candidates</p>
        </div>
      </div>
    </section>
  );
}
