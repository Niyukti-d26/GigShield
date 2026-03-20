import { useState } from 'react';
import { T, CITY_ZONES, CITIES, PLANS } from '../data/constants';
import { Spinner } from '../components/shared';

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", platform: "", city: "", zone: "", avgIncome: "" });
  const [plan, setPlan] = useState("standard");
  const [loading, setLoading] = useState(false);

  const platforms = ["Swiggy", "Zomato", "Amazon", "Flipkart", "Zepto", "Blinkit", "Dunzo"];
  const zones = form.city ? CITY_ZONES[form.city] || [] : [];
  const isValid = form.name && form.platform && form.city && form.zone && form.avgIncome;

  const next = () => {
    if (step === 0) { setStep(1); return; }
    setLoading(true);
    setTimeout(() => onComplete({ ...form, plan, avgIncome: Number(form.avgIncome) }), 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.bg, display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${T.orange} 0%, #FF8C5A 100%)`,
        padding: "48px 28px 36px", color: "white"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "rgba(255,255,255,.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22
          }}>🛡</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>GigShield</div>
            <div style={{ fontSize: 12, opacity: .85 }}>Income Protection for Gig Workers</div>
          </div>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: 10 }}>
          Your income,<br />automatically protected
        </h1>
        <div style={{ display: "flex", gap: 8, marginTop: 22 }}>
          {["Your Details", "Choose Plan"].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: "50%",
                background: i <= step ? "white" : "rgba(255,255,255,.3)",
                color: i <= step ? T.orange : "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700
              }}>{i < step ? "✓" : i + 1}</div>
              <span style={{ fontSize: 12, opacity: i <= step ? 1 : .6, fontWeight: 600 }}>{s}</span>
              {i < 1 && <div style={{ width: 24, height: 1, background: "rgba(255,255,255,.4)" }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "24px 24px 40px", maxWidth: 600, margin: "0 auto", width: "100%" }}>
        {step === 0 ? (
          <div className="fade-up card" style={{ padding: "28px 24px" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Tell us about yourself</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div>
                <label className="label">Full name</label>
                <input className="input" placeholder="e.g. Ravi Kumar" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className="label">Delivery platform</label>
                <select className="input" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                  <option value="">Select platform</option>
                  {platforms.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label className="label">City</label>
                  <select className="input" value={form.city} onChange={e => setForm({ ...form, city: e.target.value, zone: "" })}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Zone</label>
                  <select className="input" value={form.zone} onChange={e => setForm({ ...form, zone: e.target.value })} disabled={!form.city}>
                    <option value="">{form.city ? "Select zone" : "Pick city first"}</option>
                    {zones.map(z => <option key={z}>{z}</option>)}
                  </select>
                </div>
              </div>
              {form.zone && (
                <div className="fade-in" style={{
                  background: "#FFF3E0", border: "1px solid #FFD580",
                  borderRadius: 10, padding: "10px 14px",
                  display: "flex", gap: 8, alignItems: "center"
                }}>
                  <span style={{ fontSize: 16 }}>🌊</span>
                  <span style={{ fontSize: 12, color: "#7A4800", fontWeight: 500 }}>
                    {form.zone} is flood-prone — full parametric coverage active
                  </span>
                </div>
              )}
              <div>
                <label className="label">Avg daily income (₹)</label>
                <input className="input" type="number" placeholder="e.g. 950" value={form.avgIncome} onChange={e => setForm({ ...form, avgIncome: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              <button className="btn-primary" onClick={next} disabled={!isValid}>
                Continue to Plan Selection →
              </button>
            </div>
          </div>
        ) : (
          <div className="fade-up">
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Choose your plan</h2>
            <p style={{ fontSize: 13, color: T.textSec, marginBottom: 24 }}>
              Weekly premium · cancel anytime · payout within 90 sec
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
              {PLANS.map(p => (
                <div key={p.id}
                  className={`plan-card${plan === p.id ? " selected" : ""}`}
                  onClick={() => setPlan(p.id)}
                  style={{
                    borderColor: plan === p.id ? p.color : T.border,
                    boxShadow: plan === p.id ? `0 0 0 4px ${p.color}18` : "none"
                  }}>
                  {p.tag && (
                    <div style={{
                      position: "absolute", top: -1, right: 16,
                      background: p.color, color: "white",
                      fontSize: 10, fontWeight: 700, padding: "3px 10px",
                      borderRadius: "0 0 8px 8px"
                    }}>{p.tag}</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <div style={{
                          width: 12, height: 12, borderRadius: "50%",
                          border: `3px solid ${p.color}`,
                          background: plan === p.id ? p.color : "white"
                        }} />
                        <span style={{ fontSize: 17, fontWeight: 700 }}>{p.name}</span>
                      </div>
                      <p style={{ fontSize: 12, color: T.textSec, paddingLeft: 20, lineHeight: 1.6 }}>
                        ₹{p.dailyPayout}/day · {p.days} days/week<br />
                        Weekly cap: <strong>₹{p.cap.toLocaleString()}</strong>
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 24, fontWeight: 800, color: p.color }}>₹{p.price}</div>
                      <div style={{ fontSize: 11, color: T.textMuted }}>/week</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={next} disabled={loading}>
              {loading ? <><Spinner /> Activating your shield...</> : "Activate GigShield 🛡"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
