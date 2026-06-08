import { useState, useEffect } from "react";

const CYCLE_PHASES = [
  { name: "Menstrual", days: "Day 1–5", color: "#ff6b8a", icon: "🔴", desc: "Period phase — rest and warmth help" },
  { name: "Follicular", days: "Day 6–13", color: "#f59e0b", icon: "🌱", desc: "Energy rising — great time to plan" },
  { name: "Ovulation", days: "Day 14–16", color: "#34c759", icon: "✨", desc: "Peak energy — you're glowing!" },
  { name: "Luteal", days: "Day 17–28", color: "#a78bfa", icon: "🌙", desc: "Wind down — self-care mode on" },
];

const SYMPTOMS = [
  { id: "cramps", label: "Cramps", icon: "😣" },
  { id: "headache", label: "Headache", icon: "🤕" },
  { id: "bloating", label: "Bloating", icon: "😮‍💨" },
  { id: "fatigue", label: "Fatigue", icon: "😴" },
  { id: "mood", label: "Mood Swings", icon: "😤" },
  { id: "acne", label: "Acne", icon: "😟" },
  { id: "backpain", label: "Back Pain", icon: "😰" },
  { id: "nausea", label: "Nausea", icon: "🤢" },
  { id: "tender", label: "Tenderness", icon: "💔" },
  { id: "spotting", label: "Spotting", icon: "🩸" },
];

const MOODS = [
  { id: "great", label: "Great", icon: "😄" },
  { id: "good", label: "Good", icon: "🙂" },
  { id: "okay", label: "Okay", icon: "😐" },
  { id: "low", label: "Low", icon: "😔" },
  { id: "anxious", label: "Anxious", icon: "😰" },
  { id: "irritable", label: "Irritable", icon: "😤" },
];

const FLOWS = ["None", "Spotting", "Light", "Medium", "Heavy"];

const INSIGHTS = [
  { icon: "💧", title: "Stay Hydrated", desc: "You're in your luteal phase — drink at least 8 glasses today to reduce bloating." },
  { icon: "🧘", title: "Gentle Movement", desc: "Yoga or a short walk can ease cramp severity by up to 40%." },
  { icon: "🍫", title: "Magnesium Boost", desc: "Dark chocolate and nuts are rich in magnesium — great for mood swings." },
  { icon: "🌙", title: "Prioritize Sleep", desc: "Your body needs extra rest right now. Aim for 8+ hours tonight." },
];

const CALENDAR_DAYS = Array.from({ length: 28 }, (_, i) => ({
  day: i + 1,
  phase: i < 5 ? 0 : i < 13 ? 1 : i < 16 ? 2 : 3,
  hasLog: [1, 2, 3, 7, 14, 15, 20, 21].includes(i + 1),
}));

export default function FemWell({ onBack }) {
  const [activeTab, setActiveTab] = useState("today");
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [flowLevel, setFlowLevel] = useState(2);
  const [painLevel, setPainLevel] = useState(3);
  const [currentDay, setCurrentDay] = useState(21);
  const [saved, setSaved] = useState(false);
  const [insightIdx, setInsightIdx] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const t = setInterval(() => setInsightIdx((i) => (i + 1) % INSIGHTS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const currentPhase = CYCLE_PHASES[CALENDAR_DAYS[currentDay - 1]?.phase ?? 3];
  const toggleSymptom = (id) => setSelectedSymptoms((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div style={s.root}>
      <div style={s.bgGlow} />

      <div style={s.header}>
        <div style={s.headerLeft}>
          <button onClick={onBack} style={s.backBtn}>← Back</button>
          <div style={s.headerEmoji}>🌸</div>
          <div>
            <div style={s.headerTitle}>FemWell</div>
            <div style={s.headerSub}>Your Wellness Companion</div>
          </div>
        </div>
        <div style={{ ...s.phasePill, background: currentPhase.color + "22", border: `1px solid ${currentPhase.color}44`, color: currentPhase.color }}>
          {currentPhase.icon} Day {currentDay}
        </div>
      </div>

      <div style={{ ...s.phaseBanner, background: `linear-gradient(135deg,${currentPhase.color}18,${currentPhase.color}08)`, borderColor: currentPhase.color + "30" }}>
        <div style={s.phaseLeft}>
          <div style={{ ...s.phaseIcon, color: currentPhase.color }}>{currentPhase.icon}</div>
          <div>
            <div style={{ ...s.phaseName, color: currentPhase.color }}>{currentPhase.name} Phase</div>
            <div style={s.phaseDays}>{currentPhase.days}</div>
            <div style={s.phaseDesc}>{currentPhase.desc}</div>
          </div>
        </div>
        <div style={s.cycleRing}>
          <svg width="56" height="56" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="22" fill="none" stroke="#1e1e2e" strokeWidth="5" />
            <circle cx="28" cy="28" r="22" fill="none" stroke={currentPhase.color} strokeWidth="5" strokeDasharray={`${(currentDay / 28) * 138} 138`} strokeLinecap="round" transform="rotate(-90 28 28)" />
          </svg>
          <div style={{ ...s.ringLabel, color: currentPhase.color }}>{Math.round((currentDay / 28) * 100)}%</div>
        </div>
      </div>

      <div style={s.tabs}>
        {[{ id: "today", label: "📋 Today" }, { id: "calendar", label: "📅 Cycle" }, { id: "insights", label: "💡 Insights" }].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ ...s.tab, ...(activeTab === tab.id ? s.tabActive : {}) }}>{tab.label}</button>
        ))}
      </div>

      {activeTab === "today" && (
        <div style={s.content}>
          <div style={s.card}>
            <div style={s.cardTitle}>🩸 Flow Level</div>
            <div style={s.flowRow}>
              {FLOWS.map((f, i) => (
                <button key={f} onClick={() => setFlowLevel(i)} style={{ ...s.flowBtn, background: flowLevel === i ? "#ff6b8a22" : "#0f0f1a", border: `1px solid ${flowLevel === i ? "#ff6b8a" : "#1e1e2e"}`, color: flowLevel === i ? "#ff6b8a" : "#555" }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={s.card}>
            <div style={s.cardTitle}>😣 Pain Level <span style={s.painNum}>{painLevel}/10</span></div>
            <input type="range" min="0" max="10" value={painLevel} onChange={(e) => setPainLevel(Number(e.target.value))} style={s.slider} />
            <div style={s.sliderLabels}><span>No pain</span><span>Unbearable</span></div>
          </div>
          <div style={s.card}>
            <div style={s.cardTitle}>💭 Mood Today</div>
            <div style={s.moodGrid}>
              {MOODS.map((m) => (
                <button key={m.id} onClick={() => setSelectedMood(m.id)} style={{ ...s.moodBtn, background: selectedMood === m.id ? "#a78bfa22" : "#0f0f1a", border: `1px solid ${selectedMood === m.id ? "#a78bfa" : "#1e1e2e"}` }}>
                  <div style={s.moodIcon}>{m.icon}</div>
                  <div style={{ ...s.moodLabel, color: selectedMood === m.id ? "#c4b5fd" : "#666" }}>{m.label}</div>
                </button>
              ))}
            </div>
          </div>
          <div style={s.card}>
            <div style={s.cardTitle}>🩺 Symptoms</div>
            <div style={s.symptomGrid}>
              {SYMPTOMS.map((sym) => {
                const active = selectedSymptoms.includes(sym.id);
                return (
                  <button key={sym.id} onClick={() => toggleSymptom(sym.id)} style={{ ...s.symptomBtn, background: active ? "#ff6b8a18" : "#0f0f1a", border: `1px solid ${active ? "#ff6b8a" : "#1e1e2e"}` }}>
                    <span style={s.symptomIcon}>{sym.icon}</span>
                    <span style={{ ...s.symptomLabel, color: active ? "#ff6b8a" : "#666" }}>{sym.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div style={s.card}>
            <div style={s.cardTitle}>📝 Notes</div>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How are you feeling today?" style={s.textarea} />
          </div>
          <button onClick={handleSave} style={{ ...s.saveBtn, background: saved ? "linear-gradient(135deg,#34c759,#1a8a36)" : "linear-gradient(135deg,#ff6b8a,#c0112e)" }}>
            {saved ? "✅ Saved!" : "💾 Save Today's Log"}
          </button>
        </div>
      )}

      {activeTab === "calendar" && (
        <div style={s.content}>
          <div style={s.sectionLabel}>28-Day Cycle View</div>
          <div style={s.calendarGrid}>
            {CALENDAR_DAYS.map(({ day, phase, hasLog }) => {
              const ph = CYCLE_PHASES[phase];
              const isToday = day === currentDay;
              return (
                <button key={day} onClick={() => setCurrentDay(day)} style={{ ...s.calDay, background: isToday ? ph.color : hasLog ? ph.color + "18" : "#0f0f1a", border: `1px solid ${isToday ? ph.color : ph.color + "30"}`, color: isToday ? "#fff" : ph.color }}>
                  {day}
                  {hasLog && !isToday && <div style={{ ...s.calDot, background: ph.color }} />}
                </button>
              );
            })}
          </div>
          <div style={s.sectionLabel}>Phase Legend</div>
          {CYCLE_PHASES.map((ph) => (
            <div key={ph.name} style={{ ...s.legendCard, borderColor: ph.color + "30" }}>
              <div style={{ ...s.legendDot, background: ph.color }} />
              <div><div style={{ ...s.legendName, color: ph.color }}>{ph.icon} {ph.name}</div><div style={s.legendDays}>{ph.days} · {ph.desc}</div></div>
            </div>
          ))}
          <div style={s.predCard}>
            <div style={s.predTitle}>🔮 Next Period Prediction</div>
            <div style={s.predDate}>April 8 – April 13</div>
            <div style={s.predSub}>Based on your 28-day cycle history</div>
          </div>
        </div>
      )}

      {activeTab === "insights" && (
        <div style={s.content}>
          <div style={s.insightHighlight}>
            <div style={s.insightIcon}>{INSIGHTS[insightIdx].icon}</div>
            <div style={s.insightTitle}>{INSIGHTS[insightIdx].title}</div>
            <div style={s.insightDesc}>{INSIGHTS[insightIdx].desc}</div>
            <div style={s.insightDots}>{INSIGHTS.map((_, i) => <div key={i} style={{ ...s.insightDot, background: i === insightIdx ? "#ff6b8a" : "#333" }} />)}</div>
          </div>
          <div style={s.sectionLabel}>This Month</div>
          <div style={s.statsGrid}>
            {[{ label: "Logs Saved", value: "14", icon: "📋" }, { label: "Avg Pain", value: "3.2", icon: "😣" }, { label: "Top Symptom", value: "Cramps", icon: "🩺" }, { label: "Mood Trend", value: "Good", icon: "😊" }].map((stat) => (
              <div key={stat.label} style={s.statCard}>
                <div style={s.statIcon}>{stat.icon}</div>
                <div style={s.statValue}>{stat.value}</div>
                <div style={s.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={s.sectionLabel}>Wellness Tips</div>
          {INSIGHTS.map((ins, i) => (
            <div key={i} style={s.insightCard}>
              <div style={s.insightCardIcon}>{ins.icon}</div>
              <div><div style={s.insightCardTitle}>{ins.title}</div><div style={s.insightCardDesc}>{ins.desc}</div></div>
            </div>
          ))}
          <div style={s.doctorCard}>
            <div style={s.doctorTitle}>👩‍⚕️ When to See a Doctor</div>
            {["Pain level consistently above 7", "Periods lasting more than 7 days", "Severe mood changes affecting daily life", "Unusual spotting between periods"].map((item, i) => (
              <div key={i} style={s.doctorItem}><span style={s.doctorDot}>•</span><span style={s.doctorText}>{item}</span></div>
            ))}
          </div>
        </div>
      )}

      <div style={s.bottomNav}>
        {[{ icon: "🏠", label: "Home", fn: onBack }, { icon: "🚨", label: "HerAlert" }, { icon: "🗺️", label: "HerRoute" }, { icon: "🛡️", label: "HerShield" }, { icon: "🌸", label: "FemWell", active: true }].map((item) => (
          <div key={item.label} onClick={item.fn} style={{ ...s.navItem, ...(item.active ? s.navActive : {}), cursor: item.fn ? "pointer" : "default" }}>
            <span style={s.navIcon}>{item.icon}</span>
            <span style={s.navLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Segoe UI',system-ui,sans-serif", paddingBottom: "80px", position: "relative", overflowX: "hidden" },
  bgGlow: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 30% 10%,#2d0a18 0%,transparent 55%),radial-gradient(ellipse at 70% 90%,#1a0a2e 0%,transparent 55%)", pointerEvents: "none", zIndex: 0 },
  header: { position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px", borderBottom: "1px solid #1e1e2e" },
  headerLeft: { display: "flex", alignItems: "center", gap: "12px" },
  backBtn: { background: "none", border: "1px solid #333", borderRadius: "10px", color: "#aaa", fontSize: "13px", fontWeight: "700", padding: "6px 14px", cursor: "pointer" },
  headerEmoji: { fontSize: "28px" },
  headerTitle: { fontSize: "20px", fontWeight: "700", color: "#ff6b8a" },
  headerSub: { fontSize: "12px", color: "#666", marginTop: "2px" },
  phasePill: { padding: "6px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" },
  phaseBanner: { position: "relative", zIndex: 1, margin: "12px 16px", border: "1px solid", borderRadius: "16px", padding: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  phaseLeft: { display: "flex", gap: "12px", alignItems: "flex-start" },
  phaseIcon: { fontSize: "26px", marginTop: "2px" },
  phaseName: { fontSize: "15px", fontWeight: "800", marginBottom: "2px" },
  phaseDays: { fontSize: "11px", color: "#666", marginBottom: "4px" },
  phaseDesc: { fontSize: "12px", color: "#999", lineHeight: "1.4", maxWidth: "180px" },
  cycleRing: { position: "relative", flexShrink: 0 },
  ringLabel: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800" },
  tabs: { position: "relative", zIndex: 1, display: "flex", padding: "0 16px", borderBottom: "1px solid #1e1e2e" },
  tab: { flex: 1, background: "none", border: "none", borderBottom: "2px solid transparent", color: "#555", padding: "12px 8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s" },
  tabActive: { color: "#ff6b8a", borderBottomColor: "#ff6b8a" },
  content: { position: "relative", zIndex: 1, padding: "16px" },
  sectionLabel: { fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", color: "#555", textTransform: "uppercase", marginBottom: "10px", marginTop: "18px" },
  card: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "16px", marginBottom: "12px" },
  cardTitle: { fontSize: "14px", fontWeight: "700", color: "#ddd", marginBottom: "12px" },
  flowRow: { display: "flex", gap: "6px", flexWrap: "wrap" },
  flowBtn: { flex: 1, minWidth: "60px", padding: "8px 4px", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "all 0.2s" },
  slider: { width: "100%", accentColor: "#ff6b8a", margin: "8px 0" },
  sliderLabels: { display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#555" },
  painNum: { color: "#ff6b8a", marginLeft: "8px" },
  moodGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "8px" },
  moodBtn: { padding: "10px 6px", borderRadius: "12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", transition: "all 0.2s" },
  moodIcon: { fontSize: "20px" },
  moodLabel: { fontSize: "11px", fontWeight: "600" },
  symptomGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "8px" },
  symptomBtn: { padding: "10px 12px", borderRadius: "10px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.2s" },
  symptomIcon: { fontSize: "16px" },
  symptomLabel: { fontSize: "13px", fontWeight: "600" },
  textarea: { width: "100%", background: "#080810", border: "1px solid #1e1e2e", borderRadius: "10px", color: "#ddd", fontSize: "14px", padding: "12px", minHeight: "80px", resize: "none", fontFamily: "inherit", boxSizing: "border-box", outline: "none" },
  saveBtn: { width: "100%", border: "none", borderRadius: "14px", color: "#fff", fontWeight: "800", fontSize: "15px", padding: "16px", cursor: "pointer", transition: "all 0.3s", marginTop: "4px" },
  calendarGrid: { display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: "6px", marginBottom: "8px" },
  calDay: { aspectRatio: "1", borderRadius: "10px", cursor: "pointer", fontSize: "12px", fontWeight: "700", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", transition: "all 0.2s" },
  calDot: { width: "4px", height: "4px", borderRadius: "50%", position: "absolute", bottom: "4px" },
  legendCard: { display: "flex", alignItems: "center", gap: "12px", background: "#0f0f1a", border: "1px solid", borderRadius: "12px", padding: "12px 14px", marginBottom: "8px" },
  legendDot: { width: "12px", height: "12px", borderRadius: "50%", flexShrink: 0 },
  legendName: { fontSize: "14px", fontWeight: "700", marginBottom: "2px" },
  legendDays: { fontSize: "12px", color: "#666" },
  predCard: { background: "linear-gradient(135deg,#1a0a2e,#2d0a18)", border: "1px solid #ff6b8a30", borderRadius: "14px", padding: "18px", textAlign: "center", marginTop: "16px" },
  predTitle: { fontSize: "13px", color: "#999", marginBottom: "8px" },
  predDate: { fontSize: "22px", fontWeight: "800", color: "#ff6b8a", marginBottom: "4px" },
  predSub: { fontSize: "12px", color: "#555" },
  insightHighlight: { background: "linear-gradient(135deg,#2d0a18,#1a0a2e)", border: "1px solid #ff6b8a30", borderRadius: "16px", padding: "24px 20px", textAlign: "center", marginBottom: "8px" },
  insightIcon: { fontSize: "36px", marginBottom: "10px" },
  insightTitle: { fontSize: "17px", fontWeight: "800", color: "#ff6b8a", marginBottom: "8px" },
  insightDesc: { fontSize: "14px", color: "#aaa", lineHeight: "1.6", marginBottom: "16px" },
  insightDots: { display: "flex", justifyContent: "center", gap: "6px" },
  insightDot: { width: "7px", height: "7px", borderRadius: "50%", transition: "background 0.3s" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px", marginBottom: "8px" },
  statCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "16px", textAlign: "center" },
  statIcon: { fontSize: "22px", marginBottom: "6px" },
  statValue: { fontSize: "20px", fontWeight: "800", color: "#ff6b8a", marginBottom: "3px" },
  statLabel: { fontSize: "11px", color: "#555" },
  insightCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "14px", display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "8px" },
  insightCardIcon: { fontSize: "24px", flexShrink: 0 },
  insightCardTitle: { fontSize: "14px", fontWeight: "700", color: "#ddd", marginBottom: "4px" },
  insightCardDesc: { fontSize: "12px", color: "#666", lineHeight: "1.5" },
  doctorCard: { background: "#0a1a2e", border: "1px solid #1e4a7a", borderRadius: "14px", padding: "16px", marginTop: "4px" },
  doctorTitle: { fontSize: "15px", fontWeight: "700", color: "#60a5fa", marginBottom: "12px" },
  doctorItem: { display: "flex", gap: "8px", marginBottom: "8px" },
  doctorDot: { color: "#60a5fa", flexShrink: 0 },
  doctorText: { fontSize: "13px", color: "#aaa", lineHeight: "1.5" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0f", borderTop: "1px solid #1e1e2e", display: "flex", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px", gap: "3px" },
  navActive: { borderTop: "2px solid #ff6b8a" },
  navIcon: { fontSize: "18px" },
  navLabel: { fontSize: "9px", color: "#555", fontWeight: "600", letterSpacing: "0.5px" },
};
