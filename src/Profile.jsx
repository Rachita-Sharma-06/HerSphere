import { useState } from "react";

const BADGES = [
  { icon: "🛡️", label: "Safety First", desc: "Set up 3 SOS contacts" },
  { icon: "🌸", label: "Wellness Warrior", desc: "Logged 7 days in a row" },
  { icon: "🗺️", label: "Safe Explorer", desc: "Used HerRoute 5 times" },
  { icon: "🤖", label: "AI Ally", desc: "Asked FemHealth AI 10 questions" },
  { icon: "🌺", label: "HerSphere OG", desc: "Early adopter member" },
];

const STATS = [
  { icon: "📅", label: "Days Tracked", value: "47" },
  { icon: "🚨", label: "SOS Contacts", value: "3" },
  { icon: "🗺️", label: "Safe Routes", value: "12" },
  { icon: "🛡️", label: "Scans Done", value: "4" },
  { icon: "💬", label: "AI Chats", value: "18" },
  { icon: "🌸", label: "Logs Saved", value: "31" },
];

const SETTINGS = [
  { icon: "🔔", label: "Notifications", desc: "Alerts and reminders", toggle: true, on: true },
  { icon: "📍", label: "Location Access", desc: "Required for HerAlert & HerRoute", toggle: true, on: true },
  { icon: "🔒", label: "Privacy Mode", desc: "Hide app content in recent apps", toggle: true, on: false },
  { icon: "🌙", label: "Dark Mode", desc: "Always on for HerSphere", toggle: false },
  { icon: "📤", label: "Export My Data", desc: "Download all your health logs", toggle: false },
  { icon: "🗑️", label: "Clear All Data", desc: "Permanently delete everything", toggle: false, danger: true },
];

export default function Profile({ onBack }) {
  const [name, setName] = useState("Rachita");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState("Rachita");
  const [toggles, setToggles] = useState({ 0: true, 1: true, 2: false });
  const [activeTab, setActiveTab] = useState("profile");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleSaveName = () => {
    setName(tempName);
    setEditingName(false);
  };

  const flipToggle = (i) => {
    setToggles((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <div style={s.root}>
      <div style={s.bgGlow} />

      {/* Header */}
      <div style={s.header}>
        <button onClick={onBack} style={s.backBtn}>← Back</button>
        <div style={s.headerTitle}>My Profile</div>
        <div style={{ width: "60px" }} />
      </div>

      {/* Avatar + Name */}
      <div style={s.heroCard}>
        <div style={s.avatarCircle}>👩🏽</div>
        <div style={s.heroRight}>
          {editingName ? (
            <div style={s.editRow}>
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                style={s.nameInput}
                autoFocus
              />
              <button onClick={handleSaveName} style={s.saveNameBtn}>✓</button>
              <button onClick={() => setEditingName(false)} style={s.cancelBtn}>✕</button>
            </div>
          ) : (
            <div style={s.nameRow}>
              <div style={s.heroName}>{name}</div>
              <button onClick={() => { setTempName(name); setEditingName(true); }} style={s.editBtn}>✏️</button>
            </div>
          )}
          <div style={s.heroTag}>🌺 HerSphere Member</div>
          <div style={s.heroJoined}>Joined March 2026</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={s.tabs}>
        {[
          { id: "profile", label: "👤 Profile" },
          { id: "stats", label: "📊 Stats" },
          { id: "badges", label: "🏅 Badges" },
          { id: "settings", label: "⚙️ Settings" },
        ].map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ ...s.tab, ...(activeTab === tab.id ? s.tabActive : {}) }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── PROFILE TAB ── */}
      {activeTab === "profile" && (
        <div style={s.content}>
          <div style={s.sectionLabel}>Personal Info</div>
          <div style={s.infoCard}>
            {[
              { label: "Name", value: name, icon: "👩" },
              { label: "App Version", value: "HerSphere v1.0", icon: "📱" },
              { label: "Member Since", value: "March 2026", icon: "📅" },
              { label: "Safety Score", value: "94 / 100", icon: "🛡️" },
            ].map((item) => (
              <div key={item.label} style={s.infoRow}>
                <span style={s.infoIcon}>{item.icon}</span>
                <div style={s.infoText}>
                  <div style={s.infoLabel}>{item.label}</div>
                  <div style={s.infoValue}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={s.sectionLabel}>Emergency Contacts</div>
          <div style={s.contactsCard}>
            {[
              { name: "Maa", phone: "+91 98765 43210", relation: "Mother" },
              { name: "Priya", phone: "+91 91234 56789", relation: "Best Friend" },
              { name: "Papa", phone: "+91 99887 76655", relation: "Father" },
            ].map((c, i) => (
              <div key={i} style={s.contactRow}>
                <div style={s.contactAvatar}>{c.name[0]}</div>
                <div style={s.contactInfo}>
                  <div style={s.contactName}>{c.name}</div>
                  <div style={s.contactSub}>{c.relation} · {c.phone}</div>
                </div>
                <div style={s.contactBadge}>SOS</div>
              </div>
            ))}
          </div>

          <div style={s.sectionLabel}>About HerSphere</div>
          <div style={s.aboutCard}>
            <div style={s.aboutTitle}>🌺 HerSphere v1.0</div>
            <div style={s.aboutText}>Built for the SHE INNOVATES competition by WISE — Women in Science and Engineering. HerSphere exists because every woman deserves to feel safe, supported, and heard.</div>
            <div style={s.aboutTags}>
              <span style={s.tag}>React</span>
              <span style={s.tag}>Claude AI</span>
              <span style={s.tag}>GPS</span>
              <span style={s.tag}>PWA</span>
            </div>
          </div>
        </div>
      )}

      {/* ── STATS TAB ── */}
      {activeTab === "stats" && (
        <div style={s.content}>
          <div style={s.sectionLabel}>Your Activity</div>
          <div style={s.statsGrid}>
            {STATS.map((stat) => (
              <div key={stat.label} style={s.statCard}>
                <div style={s.statIcon}>{stat.icon}</div>
                <div style={s.statValue}>{stat.value}</div>
                <div style={s.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div style={s.sectionLabel}>Safety Score Breakdown</div>
          <div style={s.scoreCard}>
            <div style={s.scoreTop}>
              <div style={s.scoreBig}>94</div>
              <div style={s.scoreLabel}>Safety Score</div>
            </div>
            {[
              { label: "SOS Contacts Set Up", pct: 100, color: "#34c759" },
              { label: "Route Safety Usage", pct: 85, color: "#f59e0b" },
              { label: "Profile Completion", pct: 90, color: "#a78bfa" },
              { label: "Health Logs", pct: 78, color: "#ff6b8a" },
            ].map((item) => (
              <div key={item.label} style={s.scoreRow}>
                <div style={s.scoreRowLabel}>{item.label}</div>
                <div style={s.scoreBar}>
                  <div style={{ ...s.scoreFill, width: `${item.pct}%`, background: item.color }} />
                </div>
                <div style={{ ...s.scorePct, color: item.color }}>{item.pct}%</div>
              </div>
            ))}
          </div>

          <div style={s.sectionLabel}>Weekly Usage</div>
          <div style={s.weekCard}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
              const heights = [60, 80, 45, 90, 70, 40, 85];
              return (
                <div key={day} style={s.barCol}>
                  <div style={{ ...s.bar, height: `${heights[i]}%`, background: i === 6 ? "#FF4B6E" : "#2e1e3e" }} />
                  <div style={s.barLabel}>{day}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── BADGES TAB ── */}
      {activeTab === "badges" && (
        <div style={s.content}>
          <div style={s.sectionLabel}>Achievements Unlocked</div>
          <div style={s.badgeGrid}>
            {BADGES.map((badge, i) => (
              <div key={i} style={s.badgeCard}>
                <div style={s.badgeIcon}>{badge.icon}</div>
                <div style={s.badgeName}>{badge.label}</div>
                <div style={s.badgeDesc}>{badge.desc}</div>
              </div>
            ))}
          </div>

          <div style={s.sectionLabel}>Coming Soon</div>
          {[
            { icon: "🤝", label: "Community Champion", desc: "Help 10 women in HerCircle" },
            { icon: "🏃", label: "Safe Traveller", desc: "Use HerRoute 20 times" },
            { icon: "💪", label: "Health Hero", desc: "Log symptoms for 30 days" },
          ].map((badge, i) => (
            <div key={i} style={{ ...s.lockedCard }}>
              <div style={s.lockedIcon}>{badge.icon}</div>
              <div>
                <div style={s.lockedName}>{badge.label}</div>
                <div style={s.lockedDesc}>{badge.desc}</div>
              </div>
              <div style={s.lockEmoji}>🔒</div>
            </div>
          ))}
        </div>
      )}

      {/* ── SETTINGS TAB ── */}
      {activeTab === "settings" && (
        <div style={s.content}>
          <div style={s.sectionLabel}>App Settings</div>
          {SETTINGS.map((setting, i) => (
            <div key={i} style={{ ...s.settingRow, borderColor: setting.danger ? "#ff2d5520" : "#1e1e2e" }}>
              <div style={s.settingLeft}>
                <div style={s.settingIcon}>{setting.icon}</div>
                <div>
                  <div style={{ ...s.settingLabel, color: setting.danger ? "#ff2d55" : "#ddd" }}>{setting.label}</div>
                  <div style={s.settingDesc}>{setting.desc}</div>
                </div>
              </div>
              {setting.toggle ? (
                <div onClick={() => flipToggle(i)} style={{ ...s.toggle, background: toggles[i] ? "#34c759" : "#333" }}>
                  <div style={{ ...s.toggleKnob, left: toggles[i] ? "20px" : "2px" }} />
                </div>
              ) : (
                <button
                  onClick={() => setting.danger && setShowClearConfirm(true)}
                  style={{ ...s.settingBtn, color: setting.danger ? "#ff2d55" : "#666", borderColor: setting.danger ? "#ff2d5540" : "#333" }}>
                  {setting.danger ? "Clear" : "→"}
                </button>
              )}
            </div>
          ))}

          {showClearConfirm && (
            <div style={s.confirmBox}>
              <div style={s.confirmTitle}>⚠️ Are you sure?</div>
              <div style={s.confirmText}>This will permanently delete all your health logs, contacts, and settings. This cannot be undone.</div>
              <div style={s.confirmBtns}>
                <button onClick={() => setShowClearConfirm(false)} style={s.confirmCancel}>Cancel</button>
                <button onClick={() => setShowClearConfirm(false)} style={s.confirmDelete}>Yes, Delete Everything</button>
              </div>
            </div>
          )}

          <div style={s.sectionLabel}>Account</div>
          <div style={s.logoutBtn}>
            <span>🚪</span> Sign Out
          </div>

          <div style={s.versionText}>HerSphere v1.0 · Built with ❤️ for SHE INNOVATES</div>
        </div>
      )}

      {/* Bottom Nav */}
      <div style={s.bottomNav}>
        {[
          { icon: "🏠", label: "Home", fn: onBack },
          { icon: "🚨", label: "HerAlert" },
          { icon: "🗺️", label: "HerRoute" },
          { icon: "🛡️", label: "HerShield" },
          { icon: "👤", label: "Profile", active: true },
        ].map((item) => (
          <div key={item.label} onClick={item.fn}
            style={{ ...s.navItem, ...(item.active ? s.navActive : {}), cursor: item.fn ? "pointer" : "default" }}>
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
  bgGlow: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 40% 0%,#1a102e 0%,transparent 55%),radial-gradient(ellipse at 80% 90%,#0a1a2e 0%,transparent 55%)", pointerEvents: "none", zIndex: 0 },
  header: { position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px", borderBottom: "1px solid #1e1e2e" },
  backBtn: { background: "none", border: "1px solid #333", borderRadius: "10px", color: "#aaa", fontSize: "13px", fontWeight: "700", padding: "6px 14px", cursor: "pointer" },
  headerTitle: { fontSize: "18px", fontWeight: "700", color: "#fff" },
  heroCard: { position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "16px", padding: "20px", background: "linear-gradient(135deg,#1a0a2e,#0a1a2e)", borderBottom: "1px solid #1e1e2e" },
  avatarCircle: { width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg,#FF4B6E44,#7C3AED44)", border: "2px solid #FF4B6E66", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", flexShrink: 0 },
  heroRight: { flex: 1 },
  nameRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" },
  heroName: { fontSize: "22px", fontWeight: "800", color: "#fff" },
  editBtn: { background: "none", border: "none", cursor: "pointer", fontSize: "16px" },
  editRow: { display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" },
  nameInput: { background: "#1e1e2e", border: "1px solid #FF4B6E", borderRadius: "8px", color: "#fff", fontSize: "16px", fontWeight: "700", padding: "4px 10px", outline: "none", width: "140px" },
  saveNameBtn: { background: "#34c759", border: "none", borderRadius: "8px", color: "#fff", fontWeight: "700", padding: "5px 10px", cursor: "pointer" },
  cancelBtn: { background: "#333", border: "none", borderRadius: "8px", color: "#aaa", fontWeight: "700", padding: "5px 10px", cursor: "pointer" },
  heroTag: { fontSize: "12px", color: "#FF4B6E", fontWeight: "600", marginBottom: "3px" },
  heroJoined: { fontSize: "11px", color: "#555" },
  tabs: { position: "relative", zIndex: 1, display: "flex", borderBottom: "1px solid #1e1e2e", overflowX: "auto", scrollbarWidth: "none" },
  tab: { flex: 1, background: "none", border: "none", borderBottom: "2px solid transparent", color: "#555", padding: "11px 6px", cursor: "pointer", fontSize: "12px", fontWeight: "600", whiteSpace: "nowrap", transition: "all 0.2s" },
  tabActive: { color: "#FF4B6E", borderBottomColor: "#FF4B6E" },
  content: { position: "relative", zIndex: 1, padding: "16px" },
  sectionLabel: { fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", color: "#555", textTransform: "uppercase", marginBottom: "10px", marginTop: "18px" },
  infoCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", overflow: "hidden" },
  infoRow: { display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderBottom: "1px solid #1e1e2e" },
  infoIcon: { fontSize: "20px", flexShrink: 0 },
  infoText: {},
  infoLabel: { fontSize: "11px", color: "#555", marginBottom: "2px" },
  infoValue: { fontSize: "14px", fontWeight: "600", color: "#ddd" },
  contactsCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", overflow: "hidden" },
  contactRow: { display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderBottom: "1px solid #1e1e2e" },
  contactAvatar: { width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg,#FF4B6E33,#7C3AED33)", border: "1px solid #FF4B6E44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "700", color: "#FF4B6E", flexShrink: 0 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: "14px", fontWeight: "700", color: "#ddd", marginBottom: "2px" },
  contactSub: { fontSize: "11px", color: "#555" },
  contactBadge: { background: "#FF4B6E22", border: "1px solid #FF4B6E44", borderRadius: "8px", color: "#FF4B6E", fontSize: "10px", fontWeight: "700", padding: "3px 8px", letterSpacing: "1px" },
  aboutCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "16px" },
  aboutTitle: { fontSize: "15px", fontWeight: "700", color: "#FF4B6E", marginBottom: "8px" },
  aboutText: { fontSize: "13px", color: "#888", lineHeight: "1.6", marginBottom: "12px" },
  aboutTags: { display: "flex", gap: "8px", flexWrap: "wrap" },
  tag: { background: "#1e1e2e", border: "1px solid #333", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", color: "#aaa", fontWeight: "600" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "10px", marginBottom: "8px" },
  statCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "16px", textAlign: "center" },
  statIcon: { fontSize: "22px", marginBottom: "6px" },
  statValue: { fontSize: "22px", fontWeight: "800", color: "#FF4B6E", marginBottom: "3px" },
  statLabel: { fontSize: "10px", color: "#555" },
  scoreCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "16px", marginBottom: "8px" },
  scoreTop: { textAlign: "center", marginBottom: "16px" },
  scoreBig: { fontSize: "48px", fontWeight: "900", color: "#34c759" },
  scoreLabel: { fontSize: "12px", color: "#555" },
  scoreRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  scoreRowLabel: { fontSize: "12px", color: "#888", width: "160px", flexShrink: 0 },
  scoreBar: { flex: 1, height: "6px", background: "#1e1e2e", borderRadius: "10px", overflow: "hidden" },
  scoreFill: { height: "100%", borderRadius: "10px", transition: "width 1s ease" },
  scorePct: { fontSize: "11px", fontWeight: "700", width: "35px", textAlign: "right", flexShrink: 0 },
  weekCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "14px", padding: "16px", display: "flex", alignItems: "flex-end", gap: "8px", height: "120px" },
  barCol: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: "6px" },
  bar: { width: "100%", borderRadius: "6px 6px 0 0", transition: "height 0.5s ease", minHeight: "8px" },
  barLabel: { fontSize: "9px", color: "#555", fontWeight: "600" },
  badgeGrid: { display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "10px", marginBottom: "8px" },
  badgeCard: { background: "linear-gradient(135deg,#1a0a2e,#0a1a2e)", border: "1px solid #FF4B6E30", borderRadius: "14px", padding: "16px", textAlign: "center" },
  badgeIcon: { fontSize: "32px", marginBottom: "8px" },
  badgeName: { fontSize: "13px", fontWeight: "700", color: "#FF4B6E", marginBottom: "4px" },
  badgeDesc: { fontSize: "11px", color: "#666" },
  lockedCard: { display: "flex", alignItems: "center", gap: "12px", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "14px", marginBottom: "8px", opacity: 0.5 },
  lockedIcon: { fontSize: "24px", flexShrink: 0 },
  lockedName: { fontSize: "13px", fontWeight: "700", color: "#ddd", marginBottom: "2px" },
  lockedDesc: { fontSize: "11px", color: "#555" },
  lockEmoji: { fontSize: "16px", marginLeft: "auto" },
  settingRow: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0f0f1a", border: "1px solid", borderRadius: "12px", padding: "14px 16px", marginBottom: "8px" },
  settingLeft: { display: "flex", alignItems: "center", gap: "12px" },
  settingIcon: { fontSize: "20px", flexShrink: 0 },
  settingLabel: { fontSize: "14px", fontWeight: "600", marginBottom: "2px" },
  settingDesc: { fontSize: "11px", color: "#555" },
  toggle: { width: "44px", height: "24px", borderRadius: "12px", position: "relative", cursor: "pointer", transition: "background 0.3s", flexShrink: 0 },
  toggleKnob: { position: "absolute", top: "2px", width: "20px", height: "20px", borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" },
  settingBtn: { background: "none", border: "1px solid", borderRadius: "8px", padding: "5px 12px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  confirmBox: { background: "#1a0810", border: "1px solid #ff2d5540", borderRadius: "14px", padding: "18px", marginBottom: "8px" },
  confirmTitle: { fontSize: "15px", fontWeight: "700", color: "#ff2d55", marginBottom: "8px" },
  confirmText: { fontSize: "13px", color: "#aaa", lineHeight: "1.6", marginBottom: "14px" },
  confirmBtns: { display: "flex", gap: "10px" },
  confirmCancel: { flex: 1, background: "#1e1e2e", border: "none", borderRadius: "10px", color: "#aaa", fontWeight: "700", padding: "12px", cursor: "pointer" },
  confirmDelete: { flex: 1, background: "linear-gradient(135deg,#ff2d55,#c0112e)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "700", padding: "12px", cursor: "pointer" },
  logoutBtn: { background: "#0f0f1a", border: "1px solid #333", borderRadius: "12px", padding: "14px 16px", color: "#aaa", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
  versionText: { textAlign: "center", fontSize: "11px", color: "#333", padding: "8px" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0f", borderTop: "1px solid #1e1e2e", display: "flex", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px", gap: "3px" },
  navActive: { borderTop: "2px solid #FF4B6E" },
  navIcon: { fontSize: "18px" },
  navLabel: { fontSize: "9px", color: "#555", fontWeight: "600", letterSpacing: "0.5px" },
};
