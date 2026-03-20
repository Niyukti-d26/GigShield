import { T, TRIGGERS } from '../data/constants';
import { PillTag } from '../components/shared';

export default function TriggerEngine() {
  return (
    <div className="page-section">
      <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>
        Composite Trigger Engine
      </h2>
      <p style={{ fontSize: 13, color: T.textSec, marginBottom: 24 }}>
        Multi-signal validation — triggers fire only when ALL conditions are met
      </p>

      <div className="two-col">
        {/* Active Triggers */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Active Triggers</h3>
            <PillTag color={T.red}>2 FIRING</PillTag>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {TRIGGERS.map((t, i) => (
              <div key={i} className="trigger-item">
                <span style={{ fontSize: 22, width: 32, textAlign: "center" }}>{t.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</p>
                  <p style={{ fontSize: 11, color: T.textMuted, marginTop: 3 }}>{t.cond}</p>
                </div>
                <span className={`trigger-status-badge ${t.status}`}>
                  {t.status === "active" ? "ACTIVE" : t.status === "monitoring" ? "WATCH" : "CLEAR"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Trigger Logic Builder */}
        <div className="card" style={{ padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700 }}>Trigger Logic Builder</h3>
            <PillTag color={T.blue}>CUSTOM</PillTag>
          </div>
          <div style={{
            background: T.bg, borderRadius: 12, padding: 20,
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: 12, border: `1px solid ${T.border}`, lineHeight: 2
          }}>
            <div style={{ color: T.textMuted }}>// Composite trigger conditions</div>
            <div>
              <span style={{ color: T.blue }}>IF</span> rainfall_mm_hr{" "}
              <span style={{ color: T.orange }}>&gt;</span>{" "}
              <span style={{ color: T.green }}>50</span>
            </div>
            <div>
              <span style={{ color: T.blue }}>AND</span> income_drop_pct{" "}
              <span style={{ color: T.orange }}>&gt;</span>{" "}
              <span style={{ color: T.green }}>30</span>
            </div>
            <div>
              <span style={{ color: T.blue }}>AND</span> worker_status{" "}
              <span style={{ color: T.orange }}>==</span>{" "}
              <span style={{ color: T.green }}>"active"</span>
            </div>
            <div>
              <span style={{ color: T.blue }}>AND</span> gps_in_zone{" "}
              <span style={{ color: T.orange }}>==</span>{" "}
              <span style={{ color: T.green }}>true</span>
            </div>
            <div>
              <span style={{ color: T.blue }}>AND</span> community_validation{" "}
              <span style={{ color: T.orange }}>&gt;</span>{" "}
              <span style={{ color: T.green }}>0.7</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <span style={{ color: T.blue }}>THEN</span>{" "}
              <span style={{ color: T.orange }}>trigger</span>(
              <span style={{ color: T.green }}>"MONSOON_LOCK"</span>)
            </div>
            <div>
              <span style={{ color: T.blue }}>PAYOUT</span>{" "}
              <span style={{ color: T.orange }}>min</span>(daily_avg *{" "}
              <span style={{ color: T.green }}>0.3</span>, plan_cap)
            </div>
            <div>
              <span style={{ color: T.blue }}>VIA</span>{" "}
              <span style={{ color: T.green }}>"UPI_INSTANT"</span>
            </div>
          </div>

          <div style={{ marginTop: 18 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Trigger Architecture</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { step: "1", label: "Data Ingestion", desc: "Weather API + Platform API + GPS signals", color: T.blue },
                { step: "2", label: "Signal Processing", desc: "Normalize, validate, aggregate multi-source data", color: T.orange },
                { step: "3", label: "Composite Evaluation", desc: "All AND conditions must be TRUE simultaneously", color: T.amber },
                { step: "4", label: "Fraud Check", desc: "ML model validates claim authenticity (>60% confidence)", color: T.red },
                { step: "5", label: "Payout Execution", desc: "UPI instant transfer within 90 seconds", color: T.green },
              ].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 14px", background: T.bg,
                  borderRadius: 10, border: `1px solid ${T.border}`
                }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    background: s.color + "15", color: s.color,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, flexShrink: 0
                  }}>{s.step}</div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600 }}>{s.label}</p>
                    <p style={{ fontSize: 11, color: T.textMuted }}>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
