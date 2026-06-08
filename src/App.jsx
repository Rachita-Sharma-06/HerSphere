import { useState, useEffect } from "react";
import HerAlert from "./HerAlert";
import HerRoute from "./HerRoute";
import FemWell from "./FemWell";
import HerShield from "./HerShield";
import FemHealthChat from "./FemHealthChat";
import Profile from "./Profile";

const modules = [
  { id: "heralert", icon: "🚨", title: "HerAlert", subtitle: "SOS & Harassment Shield", desc: "Shake-triggered emergency SOS with GPS tracking and instant alerts to your trusted contacts.", color: "#FF4B6E", stats: "3 contacts saved", badge: "ACTIVE" },
  { id: "herroute", icon: "🗺️", title: "HerRoute", subtitle: "Safe Navigation", desc: "AI-powered routes built around your safety — not just speed. Community-rated streets, day & night.", color: "#7C3AED", stats: "12 safe routes nearby", badge: "LIVE" },
  { id: "hershield", icon: "🛡️", title: "HerShield", subtitle: "Deepfake Detector", desc: "Upload any image or video. Our AI instantly flags manipulated media and guides you to report it.", color: "#0EA5E9", stats: "0 threats detected", badge: "READY" },
  { id: "femchat", icon: "🤖", title: "FemHealth AI", subtitle: "Health Assistant", desc: "Your personal AI health companion — menstrual tracking, pregnancy support, menopause guidance.", color: "#F59E0B", stats: "Ask me anything", badge: "AI" },
  { id: "femhealth", icon: "🌸", title: "FemWell", subtitle: "Symptom Tracker", desc: "Track your cycle, symptoms, mood, and get personalised wellness insights every day.", color: "#EC4899", stats: "Next cycle: 12 days", badge: "NEW" },
  { id: "community", icon: "👩‍👩‍👧", title: "HerCircle", subtitle: "Community Board", desc: "A safe space to share experiences, ask questions, and support other women in your community.", color: "#10B981", stats: "248 women online", badge: "LIVE" },
];

const alerts = [
  { icon: "✅", text: "HerAlert is active and monitoring", time: "Now", color: "#10B981" },
  { icon: "📍", text: "Safe route to campus updated", time: "2m ago", color: "#7C3AED" },
  { icon: "🌸", text: "Health check-in reminder", time: "1h ago", color: "#F59E0B" },
];

const quickStats = [
  { label: "Safety Score", value: "94%", icon: "🛡️", color: "#10B981" },
  { label: "Days Tracked", value: "47", icon: "📅", color: "#7C3AED" },
  { label: "SOS Contacts", value: "3", icon: "👥", color: "#FF4B6E" },
  { label: "Community", value: "248", icon: "🌺", color: "#F59E0B" },
];

const navItems = [
  { icon: "🏠", label: "Home", screen: "home" },
  { icon: "🌸", label: "FemWell", screen: "femhealth" },
  { icon: "🤖", label: "FemHealth", screen: "femchat" },
  { icon: "🛡️", label: "SafeHer", screen: "hershield" },
  { icon: "👤", label: "Profile", screen: "profile" },
];

const FULL_SCREEN_IDS = ["heralert", "herroute", "femhealth", "hershield", "femchat", "profile"];

export default function App() {
  const [activeModule, setActiveModule] = useState(null);
  const [currentScreen, setCurrentScreen] = useState("home");
  const [sosActive, setSosActive] = useState(false);
  const [time, setTime] = useState(new Date());
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
    return () => clearInterval(timer);
  }, []);

  const handleSOS = () => {
    setSosActive(true);
    setTimeout(() => setSosActive(false), 3000);
  };

  const goHome = () => setCurrentScreen("home");

  // ── Screen Router ──
  if (currentScreen === "heralert")  return <HerAlert onBack={goHome} />;
  if (currentScreen === "herroute")  return <HerRoute onBack={goHome} />;
  if (currentScreen === "femhealth") return <FemWell onBack={goHome} />;
  if (currentScreen === "hershield") return <HerShield onBack={goHome} />;
  if (currentScreen === "femchat")   return <FemHealthChat onBack={goHome} />;
  if (currentScreen === "profile")   return <Profile onBack={goHome} />;

  // ── Home Screen ──
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", fontFamily: "'Georgia', serif", color: "#F0ECE8", overflowX: "hidden" }}>

      {/* Background glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 60% 40% at 20% 20%, rgba(255,75,110,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(124,58,237,0.08) 0%, transparent 60%)" }} />

      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "16px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #FF4B6E, #7C3AED)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🌺</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>HerSphere</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "monospace" }}>Women's Empowerment Platform</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
            <div style={{ fontSize: 11, color: "#10B981" }}>● All systems active</div>
          </div>
          {/* Profile avatar — tap to open profile */}
          <div
            onClick={() => setCurrentScreen("profile")}
            style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #FF4B6E44, #7C3AED44)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, cursor: "pointer" }}>
            👩🏽
          </div>
        </div>
      </header>

      <main style={{ position: "relative", zIndex: 1, padding: "28px 28px 80px", maxWidth: 900, margin: "0 auto" }}>

        {/* Greeting */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "monospace", marginBottom: 4 }}>{greeting}</div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>
            You are protected,<br />
            <span style={{ background: "linear-gradient(90deg, #FF4B6E, #7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>supported & heard.</span>
          </h1>
        </div>

        {/* Quick Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          {quickStats.map((stat) => (
            <div key={stat.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 16px" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, fontFamily: "monospace" }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* SOS Button */}
        <div
          style={{ background: sosActive ? "linear-gradient(135deg, #FF4B6E, #ff1a1a)" : "rgba(255,75,110,0.08)", border: `2px solid ${sosActive ? "#FF4B6E" : "rgba(255,75,110,0.3)"}`, borderRadius: 18, padding: "20px 24px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "all 0.3s" }}
          onClick={handleSOS}
        >
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: sosActive ? "#fff" : "#FF4B6E" }}>{sosActive ? "🚨 SOS ALERT SENT — Help is on the way!" : "🚨 EMERGENCY SOS"}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>{sosActive ? "Notifying your 3 trusted contacts..." : "Tap to alert your trusted contacts instantly"}</div>
          </div>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: sosActive ? "rgba(255,255,255,0.2)" : "#FF4B6E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 900, boxShadow: sosActive ? "none" : "0 0 20px rgba(255,75,110,0.5)" }}>
            {sosActive ? "✓" : "!"}
          </div>
        </div>

        {/* Module Cards */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginBottom: 16 }}>Your Modules</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
            {modules.map((mod) => (
              <div key={mod.id}
                onClick={() => FULL_SCREEN_IDS.includes(mod.id) ? setCurrentScreen(mod.id) : setActiveModule(activeModule === mod.id ? null : mod.id)}
                style={{ background: activeModule === mod.id ? `linear-gradient(135deg, ${mod.color}22, ${mod.color}11)` : "rgba(255,255,255,0.03)", border: `1px solid ${activeModule === mod.id ? mod.color + "66" : "rgba(255,255,255,0.07)"}`, borderRadius: 16, padding: "18px 20px", cursor: "pointer", transition: "all 0.25s", position: "relative" }}>
                <div style={{ position: "absolute", top: 14, right: 14, fontSize: 9, fontFamily: "monospace", color: mod.color, border: `1px solid ${mod.color}55`, borderRadius: 4, padding: "2px 6px" }}>{mod.badge}</div>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{mod.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{mod.title}</div>
                <div style={{ fontSize: 11, color: mod.color, marginBottom: 8, fontFamily: "monospace" }}>{mod.subtitle}</div>
                {activeModule === mod.id && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 10 }}>{mod.desc}</div>}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>{mod.stats}</div>
                  <div style={{ fontSize: 11, color: mod.color, background: mod.color + "15", padding: "3px 10px", borderRadius: 20 }}>{activeModule === mod.id ? "Close ↑" : "Open →"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div style={{ marginTop: 28 }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginBottom: 14 }}>Recent Activity</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alerts.map((alert, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: alert.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, flexShrink: 0 }}>{alert.icon}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{alert.text}</div></div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace", flexShrink: 0 }}>{alert.time}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "rgba(10,10,15,0.95)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-around", padding: "12px 0 20px", zIndex: 100 }}>
        {navItems.map((item) => {
          const isActive = item.screen === currentScreen;
          return (
            <div key={item.label} onClick={() => item.screen && setCurrentScreen(item.screen)}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", opacity: isActive ? 1 : 0.4 }}>
              <div style={{ fontSize: 20 }}>{item.icon}</div>
              <div style={{ fontSize: 10, fontFamily: "monospace", color: isActive ? "#FF4B6E" : "rgba(255,255,255,0.5)" }}>{item.label}</div>
              {isActive && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#FF4B6E" }} />}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
