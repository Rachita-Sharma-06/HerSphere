import { useState, useEffect } from "react";

const contacts = [
  { name: "Mom", phone: "+91 98765 43210", avatar: "👩" },
  { name: "Best Friend", phone: "+91 91234 56789", avatar: "👧" },
  { name: "Sister", phone: "+91 99876 54321", avatar: "👩🏽" },
];

export default function HerAlert({ onBack }) {
  const [sosActive, setSosActive] = useState(false);
  const [recording, setRecording] = useState(false);
  const [location, setLocation] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [alertSent, setAlertSent] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude.toFixed(4),
        lng: pos.coords.longitude.toFixed(4),
      });
    });
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setAlertSent(true);
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const triggerSOS = () => {
    setSosActive(true);
    setRecording(true);
    setCountdown(3);
  };

  const cancelSOS = () => {
    setSosActive(false);
    setRecording(false);
    setCountdown(null);
    setAlertSent(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0F", fontFamily: "'Georgia', serif", color: "#F0ECE8", paddingBottom: 80 }}>

      <header style={{ background: "rgba(10,10,15,0.95)", borderBottom: "1px solid rgba(255,75,110,0.2)", padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px", color: "#fff", cursor: "pointer", fontSize: 14 }}>← Back</button>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#FF4B6E" }}>🚨 HerAlert</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>SOS & HARASSMENT SHIELD</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
          <span style={{ fontSize: 11, color: "#10B981", fontFamily: "monospace" }}>ACTIVE</span>
        </div>
      </header>

      <div style={{ padding: "24px", maxWidth: 500, margin: "0 auto" }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            onClick={!sosActive ? triggerSOS : cancelSOS}
            style={{
              width: 180, height: 180, borderRadius: "50%",
              background: sosActive ? "linear-gradient(135deg, #FF4B6E, #ff0000)" : "linear-gradient(135deg, #FF4B6E44, #FF4B6E22)",
              border: `4px solid ${sosActive ? "#FF4B6E" : "rgba(255,75,110,0.4)"}`,
              margin: "0 auto 20px",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              boxShadow: sosActive ? "0 0 60px rgba(255,75,110,0.8)" : "0 0 30px rgba(255,75,110,0.2)",
              transition: "all 0.3s",
            }}
          >
            {countdown !== null ? (
              <div style={{ fontSize: 60, fontWeight: 900, color: "#fff", fontFamily: "monospace" }}>{countdown}</div>
            ) : alertSent ? (
              <>
                <div style={{ fontSize: 36 }}>✅</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 4 }}>SENT!</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: 36 }}>🚨</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: sosActive ? "#fff" : "#FF4B6E", marginTop: 4 }}>
                  {sosActive ? "CANCEL" : "SOS"}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", marginTop: 4, fontFamily: "monospace" }}>TAP TO TRIGGER</div>
              </>
            )}
          </div>
          <div style={{ fontSize: 13, color: sosActive ? "#FF4B6E" : "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
            {alertSent ? "✅ Alert sent to all contacts!" : countdown !== null ? `⚡ Sending in ${countdown}...` : sosActive ? "🔴 Recording..." : "📳 Tap or shake to trigger"}
          </div>
        </div>

        <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 16, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 24 }}>📍</div>
          <div>
            <div style={{ fontSize: 12, color: "#10B981", fontFamily: "monospace", marginBottom: 2 }}>LIVE LOCATION</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>{location ? `${location.lat}, ${location.lng}` : "Getting your location..."}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Shared with contacts when SOS triggers</div>
          </div>
        </div>

        <div style={{ background: recording ? "rgba(255,75,110,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${recording ? "rgba(255,75,110,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: "14px 18px", marginBottom: 24, display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ fontSize: 24 }}>{recording ? "🔴" : "🎙️"}</div>
          <div>
            <div style={{ fontSize: 12, color: recording ? "#FF4B6E" : "rgba(255,255,255,0.4)", fontFamily: "monospace", marginBottom: 2 }}>{recording ? "RECORDING AUDIO..." : "AUDIO RECORDING"}</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{recording ? "Evidence is being captured" : "Auto-starts when SOS triggers"}</div>
          </div>
        </div>

        <div style={{ fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontFamily: "monospace", marginBottom: 14 }}>Trusted Contacts</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {contacts.map((contact, i) => (
            <div key={i} style={{ background: alertSent ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${alertSent ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.07)"}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 14, transition: "all 0.3s" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,75,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{contact.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>{contact.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{contact.phone}</div>
              </div>
              <div style={{ fontSize: 11, fontFamily: "monospace", color: alertSent ? "#10B981" : "rgba(255,255,255,0.3)", background: alertSent ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)", padding: "4px 10px", borderRadius: 20 }}>
                {alertSent ? "✅ Notified" : "On standby"}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, border: "1px dashed rgba(255,75,110,0.3)", borderRadius: 12, padding: "14px", textAlign: "center", cursor: "pointer", color: "rgba(255,75,110,0.6)", fontSize: 13 }}>
          + Add Trusted Contact
        </div>

      </div>
    </div>
  );
}