export default function BottomNav({ activePage, onNavigate }) {
  const tabs = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "realtime",  icon: "🌦️", label: "Live" },
    { id: "claims",    icon: "⚡", label: "Claims" },
    { id: "plans",     icon: "🎯", label: "Plans" },
    { id: "admin",     icon: "⚙️", label: "Admin" },
  ];

  return (
    <div className="bottom-nav">
      <div className="bottom-nav-inner">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`bottom-nav-tab ${activePage === tab.id ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            {tab.label}
            {activePage === tab.id && <div className="tab-indicator" />}
          </button>
        ))}
      </div>
    </div>
  );
}
