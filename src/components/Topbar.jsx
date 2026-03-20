import { T } from '../data/constants';

export default function Topbar({ pageTitle, onNotify, onFileClaim }) {
  return (
    <div className="topbar">
      <div className="page-title">{pageTitle}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div className="status-pill">
          <div className="pulse-dot" />
          Systems Operational
        </div>
        <div className="notif-btn" onClick={onNotify} title="Notifications">
          🔔
          <div style={{
            position: "absolute", top: 5, right: 5,
            width: 8, height: 8, background: T.red,
            borderRadius: "50%", border: "1.5px solid white"
          }} />
        </div>
        <button className="btn-primary" style={{ width: "auto", padding: "8px 18px", fontSize: 12 }} onClick={onFileClaim}>
          File Claim ⚡
        </button>
      </div>
    </div>
  );
}
