import { useState } from "react";

const safeRoutes = [
  {
    id: 1,
    name: "College Road Route",
    from: "Home",
    to: "College",
    time: "12 min",
    distance: "2.4 km",
    safetyScore: 94,
    lighting: "Well Lit",
    crowd: "Busy",
    incidents: 0,
    tags: ["CCTV", "Busy Street", "Well Lit"],
    color: "#10B981",
    status: "SAFEST",
  },
  {
    id: 2,
    name: "Market Street Route",
    from: "Home",
    to: "College",
    time: "9 min",
    distance: "1.8 km",
    safetyScore: 71,
    lighting: "Partial",
    crowd: "Moderate",
    incidents: 2,
    tags: ["Shortcut", "Partial Light"],
    color: "#F59E0B",
    status: "MODERATE",
  },
  {
    id: 3,
    name: "Back Lane Route",
    from: "Home",
    to: "College",
    time: "7 min",
    distance: "1.5 km",
    safetyScore: 42,
    lighting: "Poor",
    crowd: "Empty",
    incidents: 5,
    tags: ["Dark", "Isolated", "Avoid at Night"],
    color: "#FF4B6E",
    status: "UNSAFE",
  },
];

const recentReports = [
  { icon: "💡", text: "Street light broken near Metro Station", time: "2h ago", color: "#F59E0B" },
  { icon: "⚠️", text: "Harassment reported on Back Lane", time: "5h ago", color: "#FF4B6E" },
  { icon: "✅", text: "New CCTV installed on College Road", time: "1d ago", color: "#10B981" },
  { icon: "👥", text: "Safe walk group active tonight 8PM", time: "3h ago", color: "#7C3AED" },
];

export default function HerRoute({ onBack }) {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [activeTime, setActiveTime] = useState("now");
  const [reportSent, setReportSent] = useState(false);

  const handleReport = () => {
    setReportSent(true);
    setTimeout(() => setReportSent(false), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", fontFamily: "'Georgia', serif", color: "#F0ECE8", paddingBottom: 80 }}>

      {/* Header */}
      <header style={{ background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(124,58,237,0.2)", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", color: "#fff", cursor: "pointer", fontSize: 14 }}>← Back</button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#7C3AED" }}>🗺️ HerRoute</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>SAFE NAVIGATION</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ fontSize: 11, color: "#10B981", fontFamily: "monospace" }}>LIVE</span>
        </div>
      </header>

      <div style={{ padding: "24px", maxWidth: 500, margin: "0 auto" }}>

        {/* Search Bar */}
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 18 }}>📍</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", marginBottom: 2 }}>FROM</div>
            <div style={{ fontSize: 14, color: "#fff" }}>My Current Location</div>
          </div>
        </div>

        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 18 }}>🎯</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace", marginBottom: 2 }}>TO</div>
            <div style={{ fontSize: 14, color: "#7C3AED" }}>College Campus</div>
          </div>
        </div>

        {/* Time Toggle */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {["now", "evening", "night"].map((time) => (
            <button
              key={time}
              onClick={() => setActiveTime(time)}
              style={{
                flex: 1, padding: "8px", borderRadius: 10, cursor: "pointer",
                border: `1px solid ${activeTime === time ? "#7C3AED" : "rgba(255,255,255,0.1)"}`,
                background: activeTime === time ? "rgba(124,58,237,0.2)" : "rgba(255,255,255,0.03)",
                color: activeTime === time ? "#7C3AED" : "rgba(255,255,255,0.5)",
                fontSize: 12, fontFamily: "monospace",
                textTransform: "uppercase", letterSpacing: "1px",
              }}
            >
              {time === "now" ? "☀️ Now" : time === "evening" ? "🌆 Evening" : "🌙 Night"}
            </button>
          ))}
        </div>

        {/* Safety Warning for Night */}
        {activeTime === "night" && (
          <div style={{ background: "rgba(255,75,110,0.1)", border: "1px solid rgba(255,75,110,0.3)", borderRadius: 12, padding: "12px 16px", marginBottom: 16, fontSize: 12, color: "#FF4B6E" }}>
            ⚠️ Night mode active — only well-lit routes with CCTV coverage recommended
          </div>
        )}

        {/* Routes */}
        <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginBottom: 14 }}>
          Available Routes
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {safeRoutes.map((route) => (
            <div
              key={route.id}
              onClick={() => setSelectedRoute(selectedRoute === route.id ? null : route.id)}
              style={{
                background: selectedRoute === route.id ? `rgba(${route.color === "#10B981" ? "16,185,129" : route.color === "#F59E0B" ? "245,158,11" : "255,75,110"},0.08)` : "rgba(255,255,255,0.03)",
                border: `1px solid ${selectedRoute === route.id ? route.color + "55" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 16, padding: "16px 18px",
                cursor: "pointer", transition: "all 0.25s",
              }}
            >
              {/* Route Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{route.name}</div>
                <div style={{ fontSize: 10, fontFamily: "monospace", color: route.color, border: `1px solid ${route.color}55`, borderRadius: 4, padding: "2px 8px" }}>
                  {route.status}
                </div>
              </div>

              {/* Safety Score Bar */}
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>SAFETY SCORE</span>
                  <span style={{ fontSize: 11, color: route.color, fontFamily: "monospace", fontWeight: 700 }}>{route.safetyScore}%</span>
                </div>
                <div style={{ height: 6, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${route.safetyScore}%`, background: route.color, borderRadius: 3, transition: "width 0.5s" }} />
                </div>
              </div>

              {/* Stats Row */}
              <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>⏱️ {route.time}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>📏 {route.distance}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>💡 {route.lighting}</div>
                <div style={{ fontSize: 12, color: route.incidents > 0 ? "#FF4B6E" : "#10B981" }}>
                  ⚠️ {route.incidents} incidents
                </div>
              </div>

              {/* Tags */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {route.tags.map((tag, i) => (
                  <span key={i} style={{ fontSize: 10, color: route.color, background: route.color + "15", padding: "3px 8px", borderRadius: 20, fontFamily: "monospace" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Expanded */}
              {selectedRoute === route.id && (
                <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  <button style={{
                    width: "100%", padding: "12px",
                    background: `linear-gradient(135deg, ${route.color}, ${route.color}88)`,
                    border: "none", borderRadius: 10,
                    color: "#fff", fontSize: 14, fontWeight: 700,
                    cursor: "pointer",
                  }}>
                    🗺️ Start This Route
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Report Incident */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px", marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>📢 Report an Incident</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Help keep other women safe by reporting unsafe areas</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["🔦 Poor Lighting", "😟 Felt Unsafe", "🚨 Harassment"].map((type, i) => (
              <button
                key={i}
                onClick={handleReport}
                style={{
                  flex: 1, padding: "8px 4px",
                  background: reportSent ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${reportSent ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 8, color: reportSent ? "#10B981" : "rgba(255,255,255,0.6)",
                  fontSize: 10, cursor: "pointer", fontFamily: "monospace",
                  transition: "all 0.3s",
                }}
              >
                {reportSent ? "✅ Sent!" : type}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Community Reports */}
        <div>
          <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginBottom: 14 }}>
            Community Reports
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {recentReports.map((report, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: "50%", background: report.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{report.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)" }}>{report.text}</div>
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", flexShrink: 0 }}>{report.time}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}