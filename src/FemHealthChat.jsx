import { useState, useRef, useEffect } from "react";

const QUICK_QUESTIONS = [
  { icon: "🩸", text: "Why are my periods irregular?" },
  { icon: "🤰", text: "Early signs of pregnancy?" },
  { icon: "😴", text: "Why am I so tired before my period?" },
  { icon: "💊", text: "How does birth control affect hormones?" },
  { icon: "🌡️", text: "What is PCOS and its symptoms?" },
  { icon: "🧘", text: "Natural remedies for cramp relief?" },
];

const TOPICS = [
  { icon: "🌸", label: "Cycle" },
  { icon: "🤰", label: "Pregnancy" },
  { icon: "🌿", label: "Menopause" },
  { icon: "💊", label: "Contraception" },
  { icon: "🧠", label: "Mental Health" },
  { icon: "🍎", label: "Nutrition" },
];

const SYSTEM_PROMPT = `You are FemHealth AI, a warm, knowledgeable, and empathetic women's health assistant inside the HerSphere app — a women's safety and wellness platform. You specialize in:
- Menstrual health, cycle tracking, and irregularities
- Pregnancy, fertility, and reproductive health
- Menopause and perimenopause
- Hormonal health (PCOS, endometriosis, thyroid)
- Contraception and family planning
- Mental health as it relates to hormonal cycles
- Nutrition and lifestyle for women's wellness

Guidelines:
- Be warm, supportive, and non-judgmental
- Give clear, actionable, evidence-based information
- Always recommend consulting a doctor for diagnosis or treatment
- Keep responses concise but thorough — use bullet points when listing multiple items
- Never diagnose — educate and empower
- Use simple language, avoid heavy jargon
- Add a relevant emoji at the start of key points to make responses scannable`;

export default function FemHealthChat({ onBack }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm FemHealth AI 🌸 — your personal women's health companion. I'm here to answer your questions about your cycle, hormones, pregnancy, menopause, and more.\n\nWhat's on your mind today?",
      id: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTopic, setActiveTopic] = useState(null);
  const [showQuick, setShowQuick] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || loading) return;
    setInput("");
    setShowQuick(false);
    const userMsg = { role: "user", content: userText, id: Date.now() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.[0]?.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply, id: Date.now() }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ I'm having trouble connecting right now. Please check your internet and try again.", id: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => {
    setMessages([{ role: "assistant", content: "Hi! I'm FemHealth AI 🌸 — your personal women's health companion. I'm here to answer your questions about your cycle, hormones, pregnancy, menopause, and more.\n\nWhat's on your mind today?", id: Date.now() }]);
    setShowQuick(true);
    setActiveTopic(null);
  };

  const formatMessage = (text) => text.split("\n").map((line, i, arr) => (
    <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
  ));

  return (
    <div style={s.root}>
      <div style={s.bgGlow} />

      <div style={s.header}>
        <div style={s.headerLeft}>
          <button onClick={onBack} style={s.backBtn}>← Back</button>
          <div style={s.avatarRing}>
            <div style={s.avatar}>🤖</div>
            <div style={s.onlineDot} />
          </div>
          <div>
            <div style={s.headerTitle}>FemHealth AI</div>
            <div style={s.headerStatus}>● Online · Always here for you</div>
          </div>
        </div>
        <button onClick={clearChat} style={s.clearBtn}>🗑️</button>
      </div>

      <div style={s.topicRow}>
        {TOPICS.map((t) => (
          <button key={t.label}
            onClick={() => { setActiveTopic(t.label); sendMessage(`Tell me about ${t.label.toLowerCase()} health`); }}
            style={{ ...s.topicPill, background: activeTopic === t.label ? "#f59e0b22" : "#0f0f1a", border: `1px solid ${activeTopic === t.label ? "#f59e0b" : "#1e1e2e"}`, color: activeTopic === t.label ? "#f59e0b" : "#666" }}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div style={s.chatArea}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ ...s.msgRow, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && <div style={s.botAvatar}>🌸</div>}
            <div style={{ ...s.bubble, ...(msg.role === "user" ? s.userBubble : s.botBubble) }}>
              <div style={{ ...s.bubbleText, color: msg.role === "user" ? "#fff" : "#ddd" }}>{formatMessage(msg.content)}</div>
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ ...s.msgRow, justifyContent: "flex-start" }}>
            <div style={s.botAvatar}>🌸</div>
            <div style={{ ...s.bubble, ...s.botBubble }}>
              <div style={s.typingDots}>
                <span style={{ ...s.dot, animationDelay: "0ms" }} />
                <span style={{ ...s.dot, animationDelay: "200ms" }} />
                <span style={{ ...s.dot, animationDelay: "400ms" }} />
              </div>
            </div>
          </div>
        )}

        {showQuick && messages.length === 1 && (
          <div style={s.quickSection}>
            <div style={s.quickLabel}>💬 Common questions</div>
            <div style={s.quickGrid}>
              {QUICK_QUESTIONS.map((q, i) => (
                <button key={i} onClick={() => sendMessage(q.text)} style={s.quickCard}>
                  <span style={s.quickIcon}>{q.icon}</span>
                  <span style={s.quickText}>{q.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={s.disclaimer}>🩺 For informational purposes only — not medical advice. Always consult your doctor.</div>

      <div style={s.inputBar}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about your health..."
          style={s.input}
          rows={1}
          disabled={loading}
        />
        <button onClick={() => sendMessage()} disabled={!input.trim() || loading} style={{ ...s.sendBtn, opacity: !input.trim() || loading ? 0.4 : 1 }}>➤</button>
      </div>

      <div style={s.bottomNav}>
        {[{ icon: "🏠", label: "Home", fn: onBack }, { icon: "🚨", label: "HerAlert" }, { icon: "🗺️", label: "HerRoute" }, { icon: "🛡️", label: "HerShield" }, { icon: "🌸", label: "FemWell" }].map((item) => (
          <div key={item.label} onClick={item.fn} style={{ ...s.navItem, cursor: item.fn ? "pointer" : "default" }}>
            <span style={s.navIcon}>{item.icon}</span>
            <span style={s.navLabel}>{item.label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", background: "#0a0a0f", color: "#e8e8f0", fontFamily: "'Segoe UI',system-ui,sans-serif", display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" },
  bgGlow: { position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 0%,#2d1a0a 0%,transparent 50%),radial-gradient(ellipse at 80% 100%,#1a0a2e 0%,transparent 50%)", pointerEvents: "none", zIndex: 0 },
  header: { position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #1e1e2e", background: "rgba(10,10,15,0.95)" },
  headerLeft: { display: "flex", alignItems: "center", gap: "10px" },
  backBtn: { background: "none", border: "1px solid #333", borderRadius: "10px", color: "#aaa", fontSize: "13px", fontWeight: "700", padding: "6px 14px", cursor: "pointer" },
  avatarRing: { position: "relative" },
  avatar: { width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b22,#ff6b8a22)", border: "2px solid #f59e0b44", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" },
  onlineDot: { position: "absolute", bottom: "1px", right: "1px", width: "9px", height: "9px", borderRadius: "50%", background: "#34c759", border: "2px solid #0a0a0f" },
  headerTitle: { fontSize: "16px", fontWeight: "700", color: "#f59e0b" },
  headerStatus: { fontSize: "11px", color: "#34c759", marginTop: "1px" },
  clearBtn: { background: "none", border: "1px solid #1e1e2e", borderRadius: "8px", color: "#555", fontSize: "14px", padding: "6px 10px", cursor: "pointer" },
  topicRow: { position: "relative", zIndex: 10, display: "flex", gap: "8px", overflowX: "auto", padding: "10px 16px", borderBottom: "1px solid #1e1e2e", scrollbarWidth: "none" },
  topicPill: { flexShrink: 0, borderRadius: "20px", padding: "6px 14px", cursor: "pointer", fontSize: "12px", fontWeight: "600", transition: "all 0.2s", whiteSpace: "nowrap" },
  chatArea: { flex: 1, overflowY: "auto", padding: "16px 16px 8px", display: "flex", flexDirection: "column", gap: "12px", paddingBottom: "160px", position: "relative", zIndex: 1 },
  msgRow: { display: "flex", alignItems: "flex-end", gap: "8px", animation: "fadeIn 0.25s ease" },
  botAvatar: { width: "28px", height: "28px", borderRadius: "50%", background: "#f59e0b18", border: "1px solid #f59e0b30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 },
  bubble: { maxWidth: "78%", borderRadius: "18px", padding: "12px 16px", lineHeight: "1.6" },
  botBubble: { background: "#0f0f1a", border: "1px solid #1e1e2e", borderBottomLeftRadius: "4px" },
  userBubble: { background: "linear-gradient(135deg,#f59e0b,#e07b00)", borderBottomRightRadius: "4px" },
  bubbleText: { fontSize: "14px" },
  typingDots: { display: "flex", gap: "5px", alignItems: "center", padding: "2px 0" },
  dot: { width: "7px", height: "7px", borderRadius: "50%", background: "#f59e0b", display: "inline-block", animation: "bounce 1.2s ease-in-out infinite" },
  quickSection: { display: "flex", flexDirection: "column", gap: "10px", marginTop: "8px" },
  quickLabel: { fontSize: "12px", color: "#555", fontWeight: "600", paddingLeft: "36px" },
  quickGrid: { display: "flex", flexDirection: "column", gap: "8px", paddingLeft: "36px" },
  quickCard: { display: "flex", alignItems: "center", gap: "10px", background: "#0f0f1a", border: "1px solid #1e1e2e", borderRadius: "12px", padding: "12px 14px", cursor: "pointer", textAlign: "left", transition: "border-color 0.2s" },
  quickIcon: { fontSize: "16px", flexShrink: 0 },
  quickText: { fontSize: "13px", color: "#aaa" },
  disclaimer: { position: "fixed", bottom: "130px", left: 0, right: 0, textAlign: "center", fontSize: "10px", color: "#333", padding: "4px 16px", zIndex: 10 },
  inputBar: { position: "fixed", bottom: "68px", left: 0, right: 0, padding: "10px 16px", background: "rgba(10,10,15,0.98)", borderTop: "1px solid #1e1e2e", display: "flex", gap: "10px", alignItems: "flex-end", zIndex: 10 },
  input: { flex: 1, background: "#0f0f1a", border: "1px solid #2e2e4e", borderRadius: "14px", color: "#ddd", fontSize: "14px", padding: "12px 16px", resize: "none", fontFamily: "inherit", outline: "none", lineHeight: "1.5", maxHeight: "100px" },
  sendBtn: { width: "44px", height: "44px", borderRadius: "50%", background: "linear-gradient(135deg,#f59e0b,#e07b00)", border: "none", color: "#fff", fontSize: "16px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "opacity 0.2s" },
  bottomNav: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#0a0a0f", borderTop: "1px solid #1e1e2e", display: "flex", zIndex: 100 },
  navItem: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "10px 4px", gap: "3px" },
  navIcon: { fontSize: "18px" },
  navLabel: { fontSize: "9px", color: "#555", fontWeight: "600", letterSpacing: "0.5px" },
};
