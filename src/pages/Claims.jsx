import { T } from '../data/constants';
import { PillTag } from '../components/shared';

export default function Claims({ onToast }) {
  return (
    <div className="page-section">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>
        Smart Claims — Zero Friction
      </h2>
      <p style={{ fontSize: 13, color: T.textSec, marginBottom: 24 }}>
        Parametric payout triggered automatically. One tap to confirm.
      </p>

      {/* Stepper */}
      <div className="claim-stepper">
        {[
          { label: "Detection", status: "done" },
          { label: "Validation", status: "done" },
          { label: "Confirmation", status: "active" },
          { label: "Payout", status: "" },
        ].map((s, i) => (
          <div key={i} className={`claim-step ${s.status}`}>
            <div className={`step-circle ${s.status}`}>
              {s.status === "done" ? "✓" : i + 1}
            </div>
            <p style={{ fontSize: 11, color: s.status === "active" ? T.orange : T.textMuted, fontWeight: 600 }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="two-col">
        {/* Confirmation modal */}
        <div className="card" style={{ padding: 24, border: `1px solid ${T.orange}30` }}>
          <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>Monsoon Lock Payout Ready</h3>
          <p style={{ fontSize: 13, color: T.textMuted, marginBottom: 16 }}>
            All conditions verified. Tap to receive instant UPI payout.
          </p>

          <div style={{
            textAlign: "center", padding: 22,
            background: T.bg, borderRadius: 14,
            border: `1px solid ${T.border}`, marginBottom: 18
          }}>
            <p style={{ fontSize: 11, color: T.textMuted, fontWeight: 600, letterSpacing: ".04em" }}>
              PAYOUT AMOUNT
            </p>
            <p style={{ fontSize: 48, fontWeight: 800, color: T.green, lineHeight: 1.1 }}>₹300</p>
            <p style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>
              30% of ₹1000 daily loss · within cap
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
            {[
              { label: "Trigger", value: "MONSOON_LOCK", color: T.text },
              { label: "Rainfall", value: "82mm/hr", color: T.red },
              { label: "Income Drop", value: "68% (>30% threshold)", color: T.red },
              { label: "Trust Score", value: "82 — HIGH", color: T.green },
              { label: "Weekly Used", value: "₹900 / ₹1500 cap", color: T.amber },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", fontSize: 13,
                padding: "10px 14px", background: T.bg, borderRadius: 10,
                border: `1px solid ${T.border}`
              }}>
                <span style={{ color: T.textMuted }}>{item.label}</span>
                <span style={{ fontWeight: 600, color: item.color }}>{item.value}</span>
              </div>
            ))}
          </div>

          <button className="btn-primary" style={{
            background: `linear-gradient(135deg, ${T.green}, #00A844)`,
            boxShadow: `0 4px 14px rgba(29,185,84,.35)`, fontSize: 15
          }} onClick={() => onToast && onToast("Payout confirmed! ₹300 sent to UPI")}>
            CONFIRM & RECEIVE ₹300 VIA UPI
          </button>
          <button className="btn-ghost" style={{ marginTop: 8, width: "100%" }}
            onClick={() => onToast && onToast("Claim skipped — you can claim later within 24 hours")}>
            Skip for now
          </button>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Claims History */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>All Claims History</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { icon: "🌧️", event: "Monsoon Lock", date: "Mar 20 · Pending", tag: "PENDING", tagColor: T.amber, amount: null },
                { icon: "🌧️", event: "Monsoon Lock", date: "Mar 18 · Auto-paid", tag: null, tagColor: null, amount: "₹300" },
                { icon: "🌡️", event: "Heat Halt", date: "Mar 15 · Auto-paid", tag: null, tagColor: null, amount: "₹250" },
                { icon: "💻", event: "Platform Crash", date: "Mar 10 · Auto-paid", tag: null, tagColor: null, amount: "₹200" },
              ].map((item, i) => (
                <div key={i} className="payout-item">
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: T.blueLight, display: "flex",
                    alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0
                  }}>{item.icon}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 13 }}>{item.event}</p>
                    <p style={{ fontSize: 11, color: T.textMuted }}>{item.date}</p>
                  </div>
                  {item.tag ? (
                    <PillTag color={item.tagColor}>{item.tag}</PillTag>
                  ) : (
                    <p style={{ fontWeight: 700, fontSize: 14, color: T.green }}>{item.amount}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* UPI */}
          <div className="card" style={{ padding: 20 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 14 }}>UPI Payment Setup</h3>
            <label className="label">UPI ID</label>
            <input className="input" defaultValue="ravi.kumar@ybl" placeholder="yourname@upi" />
            <div style={{
              marginTop: 12, padding: "12px 14px",
              background: T.greenLight, borderRadius: 10,
              border: `1px solid ${T.green}20`,
              fontSize: 12, color: T.green, fontWeight: 600
            }}>
              UPI verified · Payouts typically arrive in &lt;60 seconds
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
