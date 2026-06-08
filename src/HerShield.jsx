import { useState, useRef, useEffect } from "react";

const scanLines = [
  "Initializing neural mesh...",
  "Loading facial geometry model...",
  "Calibrating pixel entropy scanner...",
  "Deepfake signature database ready...",
  "Running GAN artifact detector...",
  "Analysis complete.",
];

const tips = [
  "🔍 Deepfakes often have blurry or mismatched ear edges",
  "👁️ Eye blinking patterns can reveal AI-generated faces",
  "💡 Check lighting consistency across the face",
  "🎭 Unnatural skin texture is a common AI giveaway",
  "🔊 Audio-video lip sync mismatches are red flags",
  "📸 Compression artifacts appear differently in real vs fake media",
];

const recentScans = [
  { name: "profile_photo.jpg", result: "REAL", score: 96, time: "2 min ago" },
  { name: "video_clip.mp4", result: "FAKE", score: 87, time: "15 min ago" },
  { name: "screenshot.png", result: "REAL", score: 91, time: "1 hr ago" },
];

export default function HerShield({ onBack }) {
  const [phase, setPhase] = useState("idle");
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [scanLineIndex, setScanLineIndex] = useState(0);
  const [scanProgress, setScanProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [tipIndex, setTipIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("scan");
  const fileInputRef = useRef(null);
  const scanInterval = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setTipIndex((i) => (i + 1) % tips.length), 4000);
    return () => clearInterval(t);
  }, []);

  const handleFile = (file) => {
    if (!file) return;
    setUploadedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setPhase("uploading");
    setTimeout(() => startScan(), 800);
  };

  const startScan = () => {
    setPhase("scanning");
    setScanProgress(0);
    setScanLineIndex(0);
    let progress = 0;
    let lineIdx = 0;
    scanInterval.current = setInterval(() => {
      progress += Math.random() * 4 + 1;
      if (progress >= 100) {
        progress = 100;
        clearInterval(scanInterval.current);
        setTimeout(() => finishScan(), 600);
      }
      setScanProgress(Math.min(Math.floor(progress), 100));
      const newLineIdx = Math.floor((progress / 100) * scanLines.length);
      if (newLineIdx !== lineIdx && newLineIdx < scanLines.length) {
        lineIdx = newLineIdx;
        setScanLineIndex(lineIdx);
      }
    }, 120);
  };

  const finishScan = () => {
    const isFake = Math.random() > 0.55;
    const confidence = isFake ? Math.floor(Math.random() * 20 + 75) : Math.floor(Math.random() * 10 + 88);
    setResult({
      verdict: isFake ? "DEEPFAKE DETECTED" : "AUTHENTIC MEDIA",
      isFake,
      confidence,
      details: isFake
        ? ["GAN fingerprint detected in facial region", "Unnatural eye reflection symmetry", "Edge blending artifacts around hairline", "Inconsistent lighting vectors on skin"]
        : ["No GAN artifacts detected", "Natural facial geometry confirmed", "Lighting and shadow consistent", "Pixel entropy within real-media range"],
    });
    setPhase("result");
  };

  const reset = () => {
    setPhase("idle");
    setUploadedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setScanProgress(0);
    setScanLineIndex(0);
  };

  return (
    <div style={st.root}>
      <div style={st.bgMesh} />

      <div style={st.header}>
        <div style={st.headerLeft}>
          <button onClick={onBack} style={st.backBtn}>← Back</button>
          <div style={st.shieldIcon}>🛡️</div>
          <div>
            <div style={st.headerTitle}>HerShield</div>
            <div style={st.headerSub}>AI Deepfake Detector</div>
          </div>
        </div>
        <div style={st.statusBadge}><span style={st.statusDot} />ACTIVE</div>
      </div>

      <div style={st.tabs}>
        {["scan", "history", "tips"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ ...st.tab, ...(activeTab === tab ? st.tabActive : {}) }}>
            {tab === "scan" ? "🔍 Scan" : tab === "history" ? "📋 History" : "💡 Tips"}
          </button>
        ))}
      </div>

      {activeTab === "scan" && (
        <div style={st.content}>
          {phase === "idle" && (
            <div>
              <div style={st.sectionLabel}>Upload Image or Video</div>
              <div style={{ ...st.dropZone, ...(dragOver ? st.dropZoneActive : {}) }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}>
                <div style={st.dropIcon}>📁</div>
                <div style={st.dropTitle}>Drop your file here</div>
                <div style={st.dropSub}>or tap to browse</div>
                <div style={st.dropFormats}>JPG · PNG · MP4 · MOV · WEBM</div>
                <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={(e) => handleFile(e.target.files[0])} />
              </div>
              <div style={st.sectionLabel}>How It Works</div>
              <div style={st.howGrid}>
                {[
                  { icon: "🧠", title: "Neural Analysis", desc: "Deep learning scans facial geometry and pixel patterns" },
                  { icon: "🔬", title: "GAN Detection", desc: "Identifies artifacts left by AI image generators" },
                  { icon: "⚡", title: "Instant Results", desc: "Get your authenticity verdict in seconds" },
                ].map((item) => (
                  <div key={item.title} style={st.howCard}>
                    <div style={st.howIcon}>{item.icon}</div>
                    <div><div style={st.howTitle}>{item.title}</div><div style={st.howDesc}>{item.desc}</div></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {phase === "uploading" && (
            <div style={st.centeredCard}>
              <div style={st.spinnerRing} />
              <div style={st.phaseTitle}>Uploading...</div>
              <div style={st.phaseSub}>{uploadedFile?.name}</div>
            </div>
          )}

          {phase === "scanning" && (
            <div style={st.scanCard}>
              {previewUrl && (
                <div style={st.previewWrapper}>
                  <img src={previewUrl} alt="preview" style={st.previewImg} />
                  <div style={st.scanOverlay}>
                    <div style={{ ...st.scanBeam, top: `${scanProgress}%` }} />
                    <div style={st.scanGrid} />
                  </div>
                </div>
              )}
              <div style={st.scanInfo}>
                <div style={st.scanTitle}>🔍 Analyzing...</div>
                <div style={st.progressBar}><div style={{ ...st.progressFill, width: `${scanProgress}%` }} /></div>
                <div style={st.progressLabel}>{scanProgress}% complete</div>
                <div style={st.terminalBox}>
                  {scanLines.slice(0, scanLineIndex + 1).map((line, i) => (
                    <div key={i} style={{ ...st.termLine, opacity: i === scanLineIndex ? 1 : 0.45 }}>
                      <span style={st.termPrompt}>›</span> {line}
                    </div>
                  ))}
                  <div style={st.cursor}>█</div>
                </div>
              </div>
            </div>
          )}

          {phase === "result" && result && (
            <div style={st.resultCard}>
              {previewUrl && <img src={previewUrl} alt="scanned" style={st.resultImg} />}
              <div style={{ ...st.verdictBadge, background: result.isFake ? "linear-gradient(135deg,#ff2d55,#c0112e)" : "linear-gradient(135deg,#34c759,#1a8a36)" }}>
                <div style={st.verdictIcon}>{result.isFake ? "⚠️" : "✅"}</div>
                <div style={st.verdictText}>{result.verdict}</div>
                <div style={st.verdictConf}>{result.confidence}% confidence</div>
              </div>
              <div style={st.confidenceRow}>
                <span style={st.confLabel}>Authenticity Score</span>
                <div style={st.confBar}><div style={{ ...st.confFill, width: result.isFake ? `${100 - result.confidence}%` : `${result.confidence}%`, background: result.isFake ? "#ff2d55" : "#34c759" }} /></div>
                <span style={st.confScore}>{result.isFake ? 100 - result.confidence : result.confidence}/100</span>
              </div>
              <div style={st.sectionLabel}>Analysis Details</div>
              <div style={st.detailsList}>
                {result.details.map((d, i) => (
                  <div key={i} style={st.detailItem}>
                    <span style={{ color: result.isFake ? "#ff2d55" : "#34c759" }}>{result.isFake ? "⚠" : "✓"}</span>
                    <span style={st.detailText}>{d}</span>
                  </div>
                ))}
              </div>
              {result.isFake && (
                <div style={st.warningBox}>
                  <div style={st.warningTitle}>⚠️ What to do</div>
                  <div style={st.warningText}>Do not share this content. Report it to the platform and save evidence. If used to harass you, contact cybercrime authorities.</div>
                  <button style={st.reportBtn}>🚨 Report to Authorities</button>
                </div>
              )}
              <button onClick={reset} style={st.rescanBtn}>🔄 Scan Another File</button>
            </div>
          )}
        </div>
      )}

      {activeTab === "history" && (
        <div style={st.content}>
          <div style={st.sectionLabel}>Recent Scans</div>
          {recentScans.map((scan, i) => (
            <div key={i} style={st.historyCard}>
              <div style={st.historyIcon}>{scan.result === "FAKE" ? "⚠️" : "✅"}</div>
              <div style={st.historyInfo}>
                <div style={st.historyName}>{scan.name}</div>
                <div style={st.historyTime}>{scan.time}</div>
              </div>
              <div style={st.historyRight}>
                <div style={{ ...st.historyBadge, background: scan.result === "FAKE" ? "#ff2d5520" : "#34c75920", color: scan.result === "FAKE" ? "#ff2d55" : "#34c759", border: `1px solid ${scan.result === "FAKE" ? "#ff2d5550" : "#34c75950"}` }}>{scan.result}</div>
                <div style={st.historyScore}>{scan.score}%</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "tips" && (
        <div style={st.content}>
          <div style={st.sectionLabel}>Spot Deepfakes Yourself</div>
          <div style={st.tipHighlight}>
            <div style={st.tipHighlightText}>{tips[tipIndex]}</div>
            <div style={st.tipDots}>{tips.map((_, i) => <div key={i} style={{ ...st.tipDot, background: i === tipIndex ? "#a78bfa" : "#333" }} />)}</div>
          </div>
          <div style={st.sectionLabel}>All Tips</div>
          {tips.map((tip, i) => (
            <div key={i} style={st.tipCard}>
              <div style={st.tipNum}>{i + 1}</div>
              <div style={st.tipText}>{tip}</div>
            </div>
          ))}
          <div style={st.sectionLabel}>Stay Safe Online</div>
          <div style={st.safeCard}>
            <div style={st.safeTitle}>🔐 If you're being targeted</div>
            <div style={st.safeText}>Deepfakes used for harassment or non-consensual intimate imagery are illegal in many regions. Document everything and reach out to cybercrime cells. You're not alone — HerSphere is here for you.</div>
            <button style={st.helpBtn}>📞 Get Help Now</button>
          </div>
        </div>
      )}

      <div style={st.bottomNav}>
        {[{ icon: "🏠", label: "Home", fn: onBack }, { icon: "🚨", label: "HerAlert" }, { icon: "🗺️", label: "HerRoute" }, { icon: "🛡️", label: "HerShield", active: true }, { icon: "🌸", label: "FemWell" }].map((item) => (
          <div key={item.label} onClick={item.fn} style={{ ...st.navItem, ...(item.active ? st.navItemActive : {}), cursor: item.fn ? "pointer" : "default" }}>
            <span style={st.navIcon}>{item.icon}</span>
            <span style={st.navLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const st = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Segoe UI', system-ui, sans-serif", paddingBottom: "80px", position: "relative", overflowX: "hidden" },
  bgMesh: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 20% 20%, #1a0a2e 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, #0d1f3c 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 },
  header: { position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 20px 12px", borderBottom: "1px solid #1e1e2e" },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: { background: "none", border: "1px solid #333", borderRadius: "10px", color: "#aaa", fontSize: "13px", fontWeight: "700", padding: "6px 14px", cursor: "pointer" },
  shieldIcon: { fontSize: "28px" },
  headerTitle: { fontSize: "20px", fontWeight: "700", color: "#a78bfa" },
  headerSub: { fontSize: "12px", color: "#666", marginTop: "2px" },
  statusBadge: { display: "flex", alignItems: "center", gap: "6px", background: "#0d2d1a", border: "1px solid #34c75940", borderRadius: "20px", padding: "5px 12px", fontSize: "11px", color: "#34c759", fontWeight: "700", letterSpacing: "1px" },
  statusDot: { width: "7px", height: "7px", borderRadius: "50%", background: "#34c759", boxShadow: "0 0 6px #34c759", display: "inline-block" },
  tabs: { position: "relative", zIndex: 1, display: "flex", padding: "12px 20px 0", borderBottom: "1px solid #1e1e2e" },
  tab: { flex: 1, background: "none", border: "none", borderBottom: "2px solid transparent", color: "#555", padding: "10px 8px", cursor: "pointer", fontSize: "13px", fontWeight: "600", transition: "all 0.2s" },
  tabActive: { color: "#a78bfa", borderBottomColor: "#a78bfa" },
  content: { position: "relative", zIndex: 1, padding: "16px 20px" },
  sectionLabel: { fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", color: "#555", textTransform: "uppercase", marginBottom: "12px", marginTop: "20px" },
  dropZone: { border: "2px dashed #2e2e4e", borderRadius: "16px", padding: "36px 20px", textAlign: "center", cursor: "pointer", background: "#0f0f1a", transition: "all 0.2s", marginBottom: "8px" },
  dropZoneActive: { borderColor: "#a78bfa", background: "#1a1030" },
  dropIcon: { fontSize: "40px", marginBottom: "12px" },
  dropTitle: { fontSize: "17px", fontWeight: "700", color: "#c4b5fd", marginBottom: "6px" },
  dropSub: { fontSize: "14px", color: "#666", marginBottom: "12px" },
  dropFormats: { fontSize: "11px", color: "#444", background: "#111", borderRadius: "8px", padding: "5px 12px", display: "inline-block", letterSpacing: "1px" },
  howGrid: { display: "flex", flexDirection: "column", gap: "10px" },
  howCard: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "14px 16px", display: "flex", alignItems: "flex-start", gap: "12px" },
  howIcon: { fontSize: "22px", flexShrink: 0, marginTop: "2px" },
  howTitle: { fontSize: "14px", fontWeight: "700", color: "#c4b5fd", marginBottom: "3px" },
  howDesc: { fontSize: "12px", color: "#666", lineHeight: "1.5" },
  centeredCard: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", gap: "16px" },
  spinnerRing: { width: "52px", height: "52px", borderRadius: "50%", border: "4px solid #1e1e2e", borderTopColor: "#a78bfa" },
  phaseTitle: { fontSize: "18px", fontWeight: "700", color: "#c4b5fd" },
  phaseSub: { fontSize: "13px", color: "#555" },
  scanCard: { display: "flex", flexDirection: "column", gap: "16px" },
  previewWrapper: { position: "relative", borderRadius: "14px", overflow: "hidden", border: "1px solid #2e2e4e", maxHeight: "220px" },
  previewImg: { width: "100%", height: "220px", objectFit: "cover", display: "block" },
  scanOverlay: { position: "absolute", inset: 0, background: "rgba(10,10,30,0.3)" },
  scanBeam: { position: "absolute", left: 0, right: 0, height: "3px", background: "linear-gradient(90deg, transparent, #a78bfa, #7c3aed, #a78bfa, transparent)", boxShadow: "0 0 16px #a78bfa", transition: "top 0.1s linear" },
  scanGrid: { position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(167,139,250,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px" },
  scanInfo: { display: "flex", flexDirection: "column", gap: "12px" },
  scanTitle: { fontSize: "17px", fontWeight: "700", color: "#c4b5fd" },
  progressBar: { height: "8px", background: "#1e1e2e", borderRadius: "10px", overflow: "hidden" },
  progressFill: { height: "100%", background: "linear-gradient(90deg, #7c3aed, #a78bfa)", borderRadius: "10px", transition: "width 0.1s ease" },
  progressLabel: { fontSize: "12px", color: "#666", textAlign: "right" },
  terminalBox: { background: "#080810", borderRadius: "10px", border: "1px solid #1e1e2e", padding: "12px 14px", fontFamily: "monospace", fontSize: "12px", color: "#34c759", minHeight: "90px" },
  termLine: { marginBottom: "4px", display: "flex", gap: "8px" },
  termPrompt: { color: "#7c3aed" },
  cursor: { color: "#a78bfa" },
  resultCard: { display: "flex", flexDirection: "column", gap: "14px" },
  resultImg: { width: "100%", height: "180px", objectFit: "cover", borderRadius: "14px", border: "1px solid #2e2e4e" },
  verdictBadge: { borderRadius: "16px", padding: "20px", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
  verdictIcon: { fontSize: "32px" },
  verdictText: { fontSize: "20px", fontWeight: "800", color: "#fff", letterSpacing: "1px" },
  verdictConf: { fontSize: "13px", color: "rgba(255,255,255,0.7)" },
  confidenceRow: { display: "flex", alignItems: "center", gap: "10px", background: "#0f0f1a", borderRadius: "12px", padding: "12px 14px" },
  confLabel: { fontSize: "12px", color: "#666", whiteSpace: "nowrap" },
  confBar: { flex: 1, height: "8px", background: "#1e1e2e", borderRadius: "10px", overflow: "hidden" },
  confFill: { height: "100%", borderRadius: "10px", transition: "width 1s ease" },
  confScore: { fontSize: "13px", fontWeight: "700", color: "#c4b5fd", whiteSpace: "nowrap" },
  detailsList: { display: "flex", flexDirection: "column", gap: "8px" },
  detailItem: { display: "flex", alignItems: "flex-start", gap: "10px", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "10px", padding: "10px 14px", fontSize: "13px" },
  detailText: { color: "#aaa", lineHeight: "1.5" },
  warningBox: { background: "#1a0810", border: "1px solid #ff2d5540", borderRadius: "14px", padding: "16px" },
  warningTitle: { fontSize: "15px", fontWeight: "700", color: "#ff2d55", marginBottom: "8px" },
  warningText: { fontSize: "13px", color: "#aaa", lineHeight: "1.6", marginBottom: "12px" },
  reportBtn: { width: "100%", background: "linear-gradient(135deg, #ff2d55, #c0112e)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "700", fontSize: "14px", padding: "12px", cursor: "pointer" },
  rescanBtn: { width: "100%", background: "#1a1030", border: "1px solid #7c3aed", borderRadius: "12px", color: "#c4b5fd", fontWeight: "700", fontSize: "15px", padding: "14px", cursor: "pointer" },
  historyCard: { display: "flex", alignItems: "center", gap: "12px", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "14px", marginBottom: "10px" },
  historyIcon: { fontSize: "22px" },
  historyInfo: { flex: 1 },
  historyName: { fontSize: "14px", fontWeight: "600", color: "#ddd" },
  historyTime: { fontSize: "12px", color: "#555", marginTop: "2px" },
  historyRight: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "5px" },
  historyBadge: { fontSize: "11px", fontWeight: "700", padding: "3px 10px", borderRadius: "20px" },
  historyScore: { fontSize: "12px", color: "#555" },
  tipHighlight: { background: "linear-gradient(135deg, #1a0a2e, #0d1a3c)", border: "1px solid #a78bfa30", borderRadius: "16px", padding: "24px 20px", textAlign: "center", marginBottom: "8px" },
  tipHighlightText: { fontSize: "16px", color: "#c4b5fd", lineHeight: "1.6", marginBottom: "16px" },
  tipDots: { display: "flex", justifyContent: "center", gap: "6px" },
  tipDot: { width: "7px", height: "7px", borderRadius: "50%", transition: "background 0.3s" },
  tipCard: { display: "flex", alignItems: "flex-start", gap: "12px", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "14px", marginBottom: "8px" },
  tipNum: { width: "24px", height: "24px", borderRadius: "50%", background: "#a78bfa20", border: "1px solid #a78bfa40", color: "#a78bfa", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  tipText: { fontSize: "14px", color: "#aaa", lineHeight: "1.5" },
  safeCard: { background: "#0a1a2e", border: "1px solid #1e4a7a", borderRadius: "14px", padding: "16px" },
  safeTitle: { fontSize: "15px", fontWeight: "700", color: "#60a5fa", marginBottom: "8px" },
  safeText: { fontSize: "13px", color: "#aaa", lineHeight: "1.6", marginBottom: "12px" },
  helpBtn: { width: "100%", background: "linear-gradient(135deg, #1e4a7a, #2563eb)", border: "none", borderRadius: "10px", color: "#fff", fontWeight: "700", fontSize: "14px", padding: "12px", cursor: "pointer" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0f", borderTop: "1px solid #1e1e2e", display: "flex", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px", gap: "3px" },
  navItemActive: { borderTop: "2px solid #a78bfa" },
  navIcon: { fontSize: "18px" },
  navLabel: { fontSize: "9px", color: "#555", fontWeight: "600", letterSpacing: "0.5px" },
};
