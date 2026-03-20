import { useState } from 'react';
import { T } from '../data/constants';
import { Spinner } from './shared';

export default function TriggerSheet({ event, onConfirm, onDismiss }) {
  const [state, setState] = useState("idle");

  const confirm = () => {
    setState("confirming");
    setTimeout(() => { setState("success"); setTimeout(onConfirm, 2000); }, 1500);
  };

  return (
    <div className="overlay" onClick={state === "idle" ? onDismiss : undefined}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />

        {state === "success" ? (
          <div style={{ padding: "0 28px 8px", textAlign: "center" }} className="fade-up">
            <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Payout Initiated!</h3>
            <p style={{ fontSize: 14, color: T.textSec, marginBottom: 16 }}>
              ₹{event.lossDetected} reaching your UPI in 90 seconds
            </p>
            <div style={{
              background: T.greenLight, borderRadius: 12, padding: "14px 18px",
              display: "flex", alignItems: "center", gap: 10
            }}>
              <span style={{ fontSize: 20 }}>✅</span>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: T.green }}>Income protected</p>
                <p style={{ fontSize: 12, color: T.textSec }}>
                  Transaction ID: GS-{Date.now().toString().slice(-6)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding: "0 24px 8px" }}>
            {/* Event header */}
            <div style={{
              background: T.blueLight, borderRadius: 14, padding: "16px 18px",
              marginBottom: 20, display: "flex", gap: 14, alignItems: "center"
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: T.blue + "20", fontSize: 26,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
              }}>{event.icon}</div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span className="risk-pulse" style={{ background: T.blue }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.blue, letterSpacing: ".05em" }}>
                    DISRUPTION DETECTED
                  </span>
                </div>
                <p style={{ fontSize: 17, fontWeight: 700 }}>{event.title}</p>
                <p style={{ fontSize: 12, color: T.textSec }}>{event.zone}</p>
              </div>
            </div>

            {/* Trigger validations */}
            <p style={{
              fontSize: 11, color: T.textMuted, fontWeight: 700,
              marginBottom: 8, letterSpacing: ".04em"
            }}>COMPOSITE TRIGGER VALIDATION</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
              {event.triggers.map((t, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                  borderRadius: 10, background: T.greenLight, border: `1px solid ${T.green}20`
                }}>
                  <span style={{ color: T.green, fontWeight: 700 }}>✓</span>
                  <span style={{ fontSize: 13 }}>{t}</span>
                </div>
              ))}
            </div>

            {/* AI confidence */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 16px", background: T.bg, borderRadius: 12, marginBottom: 18
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>🤖</span>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>AI confidence score</p>
                  <p style={{ fontSize: 11, color: T.textSec }}>Fraud check passed</p>
                </div>
              </div>
              <span style={{ fontSize: 22, fontWeight: 800, color: T.green }}>
                {event.confidence}%
              </span>
            </div>

            {/* Payout amount */}
            <div style={{
              background: `linear-gradient(135deg, ${T.orange}, #FF8C5A)`,
              borderRadius: 16, padding: "18px 20px", marginBottom: 22,
              color: "white", display: "flex", justifyContent: "space-between", alignItems: "center"
            }}>
              <div>
                <p style={{ fontSize: 12, opacity: .85, marginBottom: 3 }}>Income loss detected</p>
                <p style={{ fontSize: 32, fontWeight: 800 }}>₹{event.lossDetected}</p>
                <p style={{ fontSize: 11, opacity: .8 }}>Within your plan cap</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 40 }}>💸</div>
                <p style={{ fontSize: 10, opacity: .8, marginTop: 4 }}>To UPI</p>
              </div>
            </div>

            {/* Actions */}
            {state === "confirming" ? (
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: 10, padding: 16, background: T.orangeLight,
                borderRadius: 12, color: T.orange, fontWeight: 600, fontSize: 14
              }}>
                <Spinner color={T.orange} /> Processing your payout...
              </div>
            ) : (
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-ghost" onClick={onDismiss} style={{ width: "auto", padding: "13px 18px" }}>
                  Not now
                </button>
                <button className="btn-primary" onClick={confirm} style={{ flex: 1 }}>
                  Confirm & Get ₹{event.lossDetected}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
