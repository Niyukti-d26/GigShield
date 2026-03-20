import { useState, useEffect } from "react";

// Real zones: flood-prone (🌊) + normal (📍) per city
const CITY_ZONES = {
  Bengaluru: [
    { name:"Bellandur", flood:true }, { name:"Varthur", flood:true }, { name:"Mahadevapura", flood:true },
    { name:"HSR Layout", flood:true }, { name:"Koramangala", flood:true }, { name:"Electronic City", flood:true },
    { name:"Indiranagar", flood:false }, { name:"Whitefield", flood:false }, { name:"Jayanagar", flood:false },
    { name:"Marathahalli", flood:false }, { name:"Rajajinagar", flood:false }, { name:"BTM Layout", flood:false },
  ],
  Mumbai: [
    { name:"Kurla", flood:true }, { name:"Sion", flood:true }, { name:"Dharavi", flood:true },
    { name:"Wadala", flood:true }, { name:"Chembur", flood:true }, { name:"Govandi", flood:true },
    { name:"Bandra", flood:false }, { name:"Andheri West", flood:false }, { name:"Borivali", flood:false },
    { name:"Dadar", flood:false }, { name:"Malad", flood:false }, { name:"Thane", flood:false },
  ],
  Chennai: [
    { name:"Velachery", flood:true }, { name:"Tambaram", flood:true }, { name:"Pallikaranai", flood:true },
    { name:"Perungudi", flood:true }, { name:"Adyar", flood:true }, { name:"Thiruvanmiyur", flood:true },
    { name:"Anna Nagar", flood:false }, { name:"T.Nagar", flood:false }, { name:"Mylapore", flood:false },
    { name:"Porur", flood:false }, { name:"Nungambakkam", flood:false }, { name:"Chromepet", flood:false },
  ],
  Delhi: [
    { name:"Yamuna Khadar", flood:true }, { name:"Burari", flood:true }, { name:"Mustafabad", flood:true },
    { name:"Gokulpuri", flood:true }, { name:"Usmanpur", flood:true }, { name:"Bhalaswa", flood:true },
    { name:"Lajpat Nagar", flood:false }, { name:"Dwarka", flood:false }, { name:"Rohini", flood:false },
    { name:"Saket", flood:false }, { name:"Karol Bagh", flood:false }, { name:"Janakpuri", flood:false },
  ],
  Hyderabad: [
    { name:"Malkajgiri", flood:true }, { name:"Saroornagar", flood:true }, { name:"Nagole", flood:true },
    { name:"LB Nagar", flood:true }, { name:"Uppal", flood:true }, { name:"Moosarambagh", flood:true },
    { name:"Banjara Hills", flood:false }, { name:"Jubilee Hills", flood:false }, { name:"Madhapur", flood:false },
    { name:"Gachibowli", flood:false }, { name:"Kukatpally", flood:false }, { name:"Secunderabad", flood:false },
  ],
  Pune: [
    { name:"Hadapsar", flood:true }, { name:"Kondhwa", flood:true }, { name:"Wanowrie", flood:true },
    { name:"Bibwewadi", flood:true }, { name:"Katraj", flood:true }, { name:"Ambegaon", flood:true },
    { name:"Koregaon Park", flood:false }, { name:"Viman Nagar", flood:false }, { name:"Kothrud", flood:false },
    { name:"Baner", flood:false }, { name:"Aundh", flood:false }, { name:"Wakad", flood:false },
  ],
  Kolkata: [
    { name:"Tiljala", flood:true }, { name:"Topsia", flood:true }, { name:"Tangra", flood:true },
    { name:"Kasba", flood:true }, { name:"Behala", flood:true }, { name:"Garden Reach", flood:true },
    { name:"Salt Lake", flood:false }, { name:"New Town", flood:false }, { name:"Park Street", flood:false },
    { name:"Ballygunge", flood:false }, { name:"Jadavpur", flood:false }, { name:"Dum Dum", flood:false },
  ],
};
const CITIES = Object.keys(CITY_ZONES);

const PLANS = [
  { id:"starter",  name:"Starter",  price:50,  cap:1000, dailyPayout:200, days:2, color:"#6C8EFF", lightColor:"#EEF1FF", tag:null },
  { id:"standard", name:"Standard", price:80,  cap:1500, dailyPayout:300, days:3, color:"#FF6B35", lightColor:"#FFF0EB", tag:"Most Popular" },
  { id:"pro",      name:"Pro",      price:120, cap:2500, dailyPayout:400, days:4, color:"#1DB954", lightColor:"#E8F8EE", tag:"Best Value" },
];

const DEFAULT_USER = {
  name:"Ravi Kumar", platform:"Swiggy", city:"Bengaluru", zone:"Bellandur",
  avgIncome:950, plan:"standard", trustScore:82,
  weeklyCapUsed:300, earningsProtected:800, payoutDaysUsed:1,
};

const ADMIN_DATA = { totalUsers:12847, activeToday:4391, activeClaims:238, paidThisWeek:184200, fraudAlerts:7, avgTrustScore:74 };

const RECENT_CLAIMS = [
  { user:"Ravi K.",   zone:"Bellandur",     trigger:"Heavy Rain",     amount:300, status:"paid",    aiScore:94, plan:"Standard", city:"Bengaluru", date:"20-Mar-2026" },
  { user:"Priya S.",  zone:"Velachery",     trigger:"Extreme Heat",   amount:250, status:"paid",    aiScore:87, plan:"Starter",  city:"Chennai",   date:"20-Mar-2026" },
  { user:"Arjun M.",  zone:"Malkajgiri",    trigger:"Platform Outage",amount:400, status:"review",  aiScore:61, plan:"Pro",      city:"Hyderabad", date:"19-Mar-2026" },
  { user:"Divya R.",  zone:"Kurla",         trigger:"Zone Curfew",    amount:300, status:"paid",    aiScore:91, plan:"Standard", city:"Mumbai",    date:"19-Mar-2026" },
  { user:"Karan T.",  zone:"Yamuna Khadar", trigger:"Heavy Rain",     amount:200, status:"flagged", aiScore:38, plan:"Starter",  city:"Delhi",     date:"18-Mar-2026" },
  { user:"Meena V.",  zone:"Hadapsar",      trigger:"Heavy Rain",     amount:300, status:"paid",    aiScore:89, plan:"Standard", city:"Pune",      date:"18-Mar-2026" },
  { user:"Sanjay B.", zone:"Tiljala",       trigger:"Flood Alert",    amount:400, status:"paid",    aiScore:96, plan:"Pro",      city:"Kolkata",   date:"17-Mar-2026" },
];

const TRIGGER_EVENT = {
  icon:"🌧️", title:"Heavy Rain Detected", zone:"Bellandur, Bengaluru",
  lossDetected:300, confidence:94,
  triggers:["Rainfall > 42 mm/hr (IMD confirmed)", "Order volume ↓ 68% in zone", "Active GPS in zone verified"],
  color:"#3B82F6", lightColor:"#EFF6FF",
};

const G = {
  orange:"#FF6B35", orangeLight:"#FFF0EB", orangeDark:"#E85A24",
  bg:"#F7F7F5", white:"#FFFFFF",
  text:"#1A1A1A", textSecondary:"#6B6B6B", textMuted:"#A0A0A0",
  border:"#EBEBEB", borderDark:"#D4D4D4",
  green:"#1DB954", greenLight:"#E8F8EE",
  blue:"#3B82F6", blueLight:"#EFF6FF",
  red:"#EF4444", redLight:"#FEF2F2",
  amber:"#F59E0B", amberLight:"#FFFBEB",
  shadow:"0 2px 12px rgba(0,0,0,0.07)",
  shadowMd:"0 4px 24px rgba(0,0,0,0.10)",
  shadowLg:"0 8px 40px rgba(0,0,0,0.14)",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:${G.bg};color:${G.text};-webkit-font-smoothing:antialiased}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  @keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes spin{to{transform:rotate(360deg)}}
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.9)}}
  @keyframes glow{0%,100%{box-shadow:0 0 0 0 rgba(255,107,53,.5)}60%{box-shadow:0 0 0 12px rgba(255,107,53,0)}}
  @keyframes popIn{0%{transform:scale(.7);opacity:0}80%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  .fade-up{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both}
  .fade-in{animation:fadeIn .3s ease both}
  .slide-up{animation:slideUp .4s cubic-bezier(.22,1,.36,1) both}
  .pop-in{animation:popIn .35s cubic-bezier(.22,1,.36,1) both}
  .card{background:${G.white};border-radius:16px;box-shadow:${G.shadow};border:1px solid ${G.border};transition:box-shadow .2s,transform .2s}
  .card:hover{box-shadow:${G.shadowMd}}
  .btn-primary{display:inline-flex;align-items:center;justify-content:center;gap:8px;background:${G.orange};color:white;border:none;border-radius:12px;padding:14px 24px;font-family:'Plus Jakarta Sans',sans-serif;font-size:15px;font-weight:700;cursor:pointer;width:100%;transition:background .15s,transform .1s,box-shadow .15s;box-shadow:0 4px 14px rgba(255,107,53,.35)}
  .btn-primary:hover{background:${G.orangeDark};transform:translateY(-1px);box-shadow:0 6px 20px rgba(255,107,53,.4)}
  .btn-primary:active{transform:translateY(0)}
  .btn-primary:disabled{opacity:.45;cursor:not-allowed;transform:none}
  .btn-ghost{background:${G.bg};color:${G.textSecondary};border:1px solid ${G.border};border-radius:10px;padding:10px 18px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:background .15s,border-color .15s}
  .btn-ghost:hover{background:${G.white};border-color:${G.borderDark}}
  .input{width:100%;background:${G.white};border:1.5px solid ${G.border};border-radius:12px;padding:13px 16px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;color:${G.text};outline:none;transition:border-color .15s,box-shadow .15s;appearance:none}
  .input:focus{border-color:${G.orange};box-shadow:0 0 0 3px rgba(255,107,53,.12)}
  .input::placeholder{color:${G.textMuted}}
  .input:disabled{background:#F5F5F5;color:${G.textMuted};cursor:not-allowed}
  .label{font-size:12px;font-weight:600;color:${G.textSecondary};letter-spacing:.04em;text-transform:uppercase;display:block;margin-bottom:6px}
  .pill{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:.02em}
  .nav-tab{display:flex;align-items:center;justify-content:center;flex-direction:column;gap:4px;padding:10px 0;flex:1;cursor:pointer;font-size:10px;font-weight:600;color:${G.textMuted};border:none;background:none;font-family:'Plus Jakarta Sans',sans-serif;transition:color .15s;letter-spacing:.02em;position:relative}
  .nav-tab.active{color:${G.orange}}
  .plan-card{border:2px solid ${G.border};border-radius:16px;padding:20px;cursor:pointer;transition:border-color .15s,box-shadow .15s,transform .15s;background:white;position:relative}
  .plan-card:hover{transform:translateY(-2px);box-shadow:${G.shadowMd}}
  .plan-card.selected{border-color:${G.orange};box-shadow:0 0 0 4px rgba(255,107,53,.12)}
  .overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:100;display:flex;align-items:flex-end;justify-content:center;animation:fadeIn .2s ease}
  .sheet{background:white;border-radius:24px 24px 0 0;width:100%;max-width:480px;padding:0 0 32px;box-shadow:${G.shadowLg};animation:slideUp .35s cubic-bezier(.22,1,.36,1);max-height:90vh;overflow-y:auto}
  .sheet-handle{width:40px;height:4px;background:${G.border};border-radius:2px;margin:12px auto 20px}
  .stat-card{background:${G.white};border:1px solid ${G.border};border-radius:14px;padding:16px;transition:transform .2s,box-shadow .2s}
  .stat-card:hover{transform:translateY(-2px);box-shadow:${G.shadowMd}}
  .risk-pulse{width:10px;height:10px;border-radius:50%;display:inline-block;animation:pulse 1.6s ease infinite}
  .scroll-container{overflow-y:auto;-webkit-overflow-scrolling:touch}
  .scroll-container::-webkit-scrollbar{display:none}
  select.input{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B6B6B' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px}
  .export-btn{display:inline-flex;align-items:center;gap:7px;background:${G.green};color:white;border:none;border-radius:10px;padding:10px 16px;font-family:'Plus Jakarta Sans',sans-serif;font-size:13px;font-weight:700;cursor:pointer;transition:background .15s,transform .1s;box-shadow:0 3px 12px rgba(29,185,84,.3);white-space:nowrap}
  .export-btn:hover{background:#17a349;transform:translateY(-1px)}
  .export-btn:disabled{opacity:.6;cursor:not-allowed;transform:none}
  .trigger-fab{position:fixed;bottom:86px;right:20px;z-index:50;background:${G.orange};color:white;border:none;border-radius:50%;width:60px;height:60px;font-size:24px;cursor:pointer;box-shadow:0 4px 20px rgba(255,107,53,.55);display:flex;align-items:center;justify-content:center;animation:glow 2s ease infinite;transition:transform .15s;font-family:'Plus Jakarta Sans',sans-serif}
  .trigger-fab:hover{transform:scale(1.12)}
  .trigger-fab-tip{position:fixed;bottom:154px;right:14px;z-index:50;background:${G.text};color:white;font-size:11px;font-weight:600;padding:6px 12px;border-radius:20px;white-space:nowrap;font-family:'Plus Jakarta Sans',sans-serif;box-shadow:${G.shadowMd};animation:popIn .4s cubic-bezier(.22,1,.36,1)}
  .toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:${G.text};color:white;font-size:13px;font-weight:600;padding:10px 22px;border-radius:30px;z-index:300;box-shadow:${G.shadowLg};white-space:nowrap;animation:slideUp .3s ease;font-family:'Plus Jakarta Sans',sans-serif}
  .zone-option-flood{color:#B45309;font-weight:600}
`;

// ── Excel Export via CDN SheetJS ──
function loadSheetJS() {
  return new Promise(resolve => {
    if (window.XLSX) { resolve(window.XLSX); return; }
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => resolve(window.XLSX);
    document.head.appendChild(s);
  });
}

async function exportAdminExcel(user) {
  const XLSX = await loadSheetJS();
  const wb = XLSX.utils.book_new();
  const plan = PLANS.find(p => p.id === user.plan);

  const ws1 = XLSX.utils.aoa_to_sheet([
    ["GigShield — Admin Dashboard Report"],
    ["Generated on", new Date().toLocaleString("en-IN")],
    [],["PLATFORM OVERVIEW"],["Metric","Value"],
    ["Total Registered Users", ADMIN_DATA.totalUsers],
    ["Active Today", ADMIN_DATA.activeToday],
    ["Active Claims", ADMIN_DATA.activeClaims],
    ["Total Paid This Week (₹)", ADMIN_DATA.paidThisWeek],
    ["Fraud Alerts", ADMIN_DATA.fraudAlerts],
    ["Avg Trust Score (/100)", ADMIN_DATA.avgTrustScore],
    [],["PLAN DISTRIBUTION"],["Plan","Users","% Share"],
    ["Starter",3842,30],["Standard",6424,50],["Pro",2581,20],
    ["TOTAL",12847,"100%"],
  ]);
  ws1["!cols"] = [{wch:34},{wch:22},{wch:14}];
  XLSX.utils.book_append_sheet(wb, ws1, "Summary");

  const ws2 = XLSX.utils.aoa_to_sheet([
    ["#","Worker","City","Zone","Trigger","Amount (₹)","Status","AI Score (%)","Plan","Date"],
    ...RECENT_CLAIMS.map((c,i) => [i+1,c.user,c.city,c.zone,c.trigger,c.amount,c.status.toUpperCase(),c.aiScore,c.plan,c.date]),
  ]);
  ws2["!cols"] = [{wch:4},{wch:14},{wch:12},{wch:22},{wch:20},{wch:13},{wch:10},{wch:14},{wch:12},{wch:14}];
  XLSX.utils.book_append_sheet(wb, ws2, "Claims");

  const ws3 = XLSX.utils.aoa_to_sheet([
    ["GigShield — Worker Profile"],[],["Field","Value"],
    ["Name",user.name],["Platform",user.platform],["City",user.city],["Zone",user.zone],
    ["Avg Daily Income (₹)",user.avgIncome],["Active Plan",plan?.name],
    ["Weekly Premium (₹)",plan?.price],["Weekly Cap (₹)",plan?.cap],
    ["Trust Score (/100)",user.trustScore],["Earnings Protected (₹)",user.earningsProtected],
    ["Weekly Cap Used (₹)",user.weeklyCapUsed],["Payout Days Used",user.payoutDaysUsed],
  ]);
  ws3["!cols"] = [{wch:34},{wch:24}];
  XLSX.utils.book_append_sheet(wb, ws3, "Worker Profile");

  const allZones = Object.entries(CITY_ZONES).flatMap(([city,zones]) =>
    zones.map(z => [city, z.name, z.flood ? "Flood-Prone" : "Normal", z.flood ? "Yes" : "No", z.flood ? "Heavy Rain / Flood" : "Heat / Platform"])
  );
  const ws4 = XLSX.utils.aoa_to_sheet([
    ["City","Zone","Risk Type","Flood Prone","Primary Trigger"],...allZones
  ]);
  ws4["!cols"] = [{wch:14},{wch:26},{wch:14},{wch:12},{wch:26}];
  XLSX.utils.book_append_sheet(wb, ws4, "Zone Risk Map");

  XLSX.writeFile(wb, "GigShield_AdminReport.xlsx");
}

// ── Micro-components ──
function Spinner({ color="white", size=16 }) {
  return <span style={{ width:size, height:size, border:`2px solid ${color}40`, borderTopColor:color, borderRadius:"50%", animation:"spin .7s linear infinite", display:"inline-block", flexShrink:0 }} />;
}
function TrustBadge({ score }) {
  const color = score>=80 ? G.green : score>=60 ? G.amber : G.red;
  const label = score>=80 ? "Trusted" : score>=60 ? "Building" : "New";
  return <span className="pill" style={{ background:color+"18", color }}><span style={{ width:6,height:6,borderRadius:"50%",background:color,display:"inline-block" }} />{label}</span>;
}
function ProgressBar({ value, max, color=G.orange, height=8 }) {
  const pct = Math.min(100, Math.round((value/max)*100));
  return (
    <div style={{ height, background:G.border, borderRadius:height/2, overflow:"hidden" }}>
      <div style={{ height:"100%", borderRadius:height/2, background:color, width:`${pct}%`, transition:"width .8s cubic-bezier(.4,0,.2,1)" }} />
    </div>
  );
}
function SectionHeader({ title, right }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
      <h3 style={{ fontSize:16, fontWeight:700 }}>{title}</h3>
      {right}
    </div>
  );
}

// ── ONBOARDING ──
function OnboardingScreen({ onComplete }) {
  const [step, setStep]   = useState(0);
  const [form, setForm]   = useState({ name:"", platform:"", city:"", zone:"", avgIncome:"" });
  const [plan, setPlan]   = useState("standard");
  const [loading, setLoading] = useState(false);

  const platforms = ["Swiggy","Zomato","Amazon","Flipkart","Zepto","Blinkit","Dunzo","Porter"];
  const zones     = form.city ? CITY_ZONES[form.city] || [] : [];
  const isValid   = form.name && form.platform && form.city && form.zone && form.avgIncome;
  const selectedZone = zones.find(z => z.name === form.zone);

  const setCity = city => setForm(f => ({ ...f, city, zone:"" }));
  const next = () => {
    if (step === 0) { setStep(1); return; }
    setLoading(true);
    setTimeout(() => onComplete({ ...form, plan, avgIncome: Number(form.avgIncome) }), 1200);
  };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, display:"flex", flexDirection:"column" }}>
      <div style={{ background:`linear-gradient(135deg,${G.orange} 0%,#FF8C5A 100%)`, padding:"48px 24px 32px", color:"white" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
          <div style={{ width:42, height:42, borderRadius:12, background:"rgba(255,255,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🛡️</div>
          <div>
            <div style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.02em" }}>GigShield</div>
            <div style={{ fontSize:11, opacity:.85 }}>AI Income Protection · India's Gig Workers</div>
          </div>
        </div>
        <h1 style={{ fontSize:26, fontWeight:800, lineHeight:1.25, letterSpacing:"-0.02em", marginBottom:8 }}>Your income,<br/>automatically protected</h1>
        <p style={{ fontSize:13, opacity:.85, marginBottom:20 }}>Parametric payouts in 90 seconds. No paperwork.</p>
        <div style={{ display:"flex", gap:6 }}>
          {["Your Details","Choose Plan"].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:i<=step?"white":"rgba(255,255,255,.3)", color:i<=step?G.orange:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700 }}>
                {i < step ? "✓" : i+1}
              </div>
              <span style={{ fontSize:12, opacity:i<=step?1:.65, fontWeight:600 }}>{s}</span>
              {i < 1 && <div style={{ width:20, height:1, background:"rgba(255,255,255,.4)" }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex:1, padding:"24px 20px 40px" }} className="scroll-container">
        {step === 0 ? (
          <div className="fade-up card" style={{ padding:"24px 20px" }}>
            <h2 style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Tell us about yourself</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label className="label">Full name</label>
                <input className="input" placeholder="e.g. Ravi Kumar" value={form.name} onChange={e => setForm({...form, name:e.target.value})} />
              </div>
              <div>
                <label className="label">Delivery platform</label>
                <select className="input" value={form.platform} onChange={e => setForm({...form, platform:e.target.value})}>
                  <option value="">Select platform</option>
                  {platforms.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label className="label">City</label>
                  <select className="input" value={form.city} onChange={e => setCity(e.target.value)}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">Zone</label>
                  <select className="input" value={form.zone} onChange={e => setForm({...form, zone:e.target.value})} disabled={!form.city}>
                    <option value="">{form.city ? "Select zone" : "Pick city first"}</option>
                    {zones.length > 0 && <>
                      <optgroup label="🌊 Flood-Prone Zones">
                        {zones.filter(z=>z.flood).map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                      </optgroup>
                      <optgroup label="📍 Normal Zones">
                        {zones.filter(z=>!z.flood).map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                      </optgroup>
                    </>}
                  </select>
                </div>
              </div>
              {form.zone && (
                <div className="fade-in" style={{
                  background: selectedZone?.flood ? "#FFF3E0" : G.greenLight,
                  border: `1px solid ${selectedZone?.flood ? "#FFD580" : G.green+"40"}`,
                  borderRadius:10, padding:"10px 14px", display:"flex", gap:8, alignItems:"center"
                }}>
                  <span style={{ fontSize:16 }}>{selectedZone?.flood ? "🌊" : "✅"}</span>
                  <span style={{ fontSize:12, color: selectedZone?.flood ? "#7A4800" : "#145A28", fontWeight:500, lineHeight:1.5 }}>
                    {selectedZone?.flood
                      ? `${form.zone} is flood-prone — full parametric rain & flood coverage active`
                      : `${form.zone} is a normal zone — heat, platform outage & traffic coverage active`}
                  </span>
                </div>
              )}
              <div>
                <label className="label">Avg daily income (₹)</label>
                <input className="input" type="number" placeholder="e.g. 950" value={form.avgIncome} onChange={e => setForm({...form, avgIncome:e.target.value})} />
              </div>
            </div>
            <div style={{ marginTop:24 }}>
              <button className="btn-primary" onClick={next} disabled={!isValid} style={{ opacity:isValid?1:.45 }}>
                Continue to Plan Selection →
              </button>
            </div>
          </div>
        ) : (
          <div className="fade-up">
            <h2 style={{ fontSize:18, fontWeight:700, marginBottom:4 }}>Choose your plan</h2>
            <p style={{ fontSize:13, color:G.textSecondary, marginBottom:20 }}>Weekly premium · cancel anytime · payout within 90 sec</p>
            <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:24 }}>
              {PLANS.map(p => (
                <div key={p.id} className={`plan-card${plan===p.id?" selected":""}`}
                  onClick={() => setPlan(p.id)}
                  style={{ borderColor:plan===p.id?p.color:G.border, boxShadow:plan===p.id?`0 0 0 4px ${p.color}18`:"none" }}>
                  {p.tag && <div style={{ position:"absolute", top:-1, right:16, background:p.color, color:"white", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:"0 0 8px 8px" }}>{p.tag}</div>}
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <div style={{ width:10, height:10, borderRadius:"50%", border:`2.5px solid ${p.color}`, background:plan===p.id?p.color:"white" }} />
                        <span style={{ fontSize:16, fontWeight:700 }}>{p.name}</span>
                      </div>
                      <p style={{ fontSize:12, color:G.textSecondary, paddingLeft:18, lineHeight:1.6 }}>
                        ₹{p.dailyPayout}/day · {p.days} payout days/week<br/>Weekly cap: <strong>₹{p.cap.toLocaleString()}</strong>
                      </p>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:22, fontWeight:800, color:p.color }}>₹{p.price}</div>
                      <div style={{ fontSize:11, color:G.textMuted }}>/week</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-primary" onClick={next} disabled={loading}>
              {loading ? <><Spinner/> Activating your shield…</> : "Activate GigShield 🛡️"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── DASHBOARD ──
function DashboardScreen({ user, onChangePlan }) {
  const plan = PLANS.find(p => p.id === user.plan) || PLANS[1];
  const weekPct = Math.round((user.weeklyCapUsed / plan.cap) * 100);
  const zoneObj = (CITY_ZONES[user.city] || []).find(z => z.name === user.zone);
  const isFlood = zoneObj?.flood ?? true;

  const payouts = [
    { icon:"🌧️", event:"Heavy Rain — Bellandur", date:"Mar 18", amount:300, color:G.blue },
    { icon:"🌡️", event:"Heat Wave — BTM Layout",  date:"Mar 15", amount:250, color:G.red },
    { icon:"💻", event:"Platform Outage — Swiggy", date:"Mar 10", amount:200, color:"#7C3AED" },
  ];

  return (
    <div style={{ background:G.bg, minHeight:"100%" }} className="scroll-container">
      <div style={{ background:"white", padding:"20px 20px 16px", borderBottom:`1px solid ${G.border}`, position:"sticky", top:0, zIndex:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:12, color:G.textSecondary, fontWeight:500 }}>Good evening 👋</p>
            <h2 style={{ fontSize:20, fontWeight:800, letterSpacing:"-0.02em" }}>{user.name}</h2>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <TrustBadge score={user.trustScore} />
            <div style={{ width:40, height:40, borderRadius:"50%", background:plan.lightColor, color:plan.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:700 }}>{user.name[0]}</div>
          </div>
        </div>
      </div>

      <div style={{ padding:"16px 20px 110px", display:"flex", flexDirection:"column", gap:16 }}>
        {/* Plan hero */}
        <div className="fade-up" style={{ background:`linear-gradient(135deg,${plan.color} 0%,${plan.color}CC 100%)`, borderRadius:20, padding:20, color:"white", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:-20, right:-20, width:120, height:120, borderRadius:"50%", background:"rgba(255,255,255,.08)" }} />
          <div style={{ position:"absolute", bottom:-30, left:-10, width:100, height:100, borderRadius:"50%", background:"rgba(255,255,255,.05)" }} />
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                <span style={{ fontSize:11, fontWeight:700, opacity:.85, letterSpacing:".06em" }}>ACTIVE PLAN</span>
                <span style={{ background:"rgba(255,255,255,.2)", padding:"2px 8px", borderRadius:20, fontSize:10, fontWeight:700 }}>✓ LIVE</span>
              </div>
              <div style={{ fontSize:28, fontWeight:800, letterSpacing:"-0.02em" }}>{plan.name}</div>
              <div style={{ fontSize:13, opacity:.85, marginTop:4 }}>₹{plan.dailyPayout}/day · {plan.days} days/week</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11, opacity:.8, marginBottom:2 }}>Weekly premium</div>
              <div style={{ fontSize:22, fontWeight:800 }}>₹{plan.price}</div>
              <button onClick={onChangePlan} style={{ marginTop:8, padding:"6px 12px", fontSize:11, background:"rgba(255,255,255,.15)", color:"white", border:"1px solid rgba(255,255,255,.3)", borderRadius:8, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                Change plan
              </button>
            </div>
          </div>
          <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid rgba(255,255,255,.2)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, opacity:.85 }}>Weekly cap used</span>
              <span style={{ fontSize:12, fontWeight:700 }}>₹{user.weeklyCapUsed} / ₹{plan.cap}</span>
            </div>
            <div style={{ height:6, background:"rgba(255,255,255,.25)", borderRadius:3, overflow:"hidden" }}>
              <div style={{ height:"100%", width:`${weekPct}%`, background:"white", borderRadius:3, transition:"width 1s ease" }} />
            </div>
            <p style={{ fontSize:11, opacity:.75, marginTop:6 }}>{plan.days - user.payoutDaysUsed} payout days remaining this week</p>
          </div>
        </div>

        {/* Stats */}
        <div className="fade-up" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div className="stat-card">
            <p style={{ fontSize:11, color:G.textMuted, fontWeight:600, marginBottom:8, letterSpacing:".04em" }}>EARNINGS PROTECTED</p>
            <p style={{ fontSize:24, fontWeight:800, color:G.green }}>₹{user.earningsProtected.toLocaleString()}</p>
            <p style={{ fontSize:11, color:G.textMuted, marginTop:3 }}>this week</p>
          </div>
          <div className="stat-card">
            <p style={{ fontSize:11, color:G.textMuted, fontWeight:600, marginBottom:8, letterSpacing:".04em" }}>TRUST SCORE</p>
            <p style={{ fontSize:24, fontWeight:800, color:G.orange }}>{user.trustScore}<span style={{ fontSize:13, color:G.textMuted }}>/100</span></p>
            <div style={{ height:6, background:G.border, borderRadius:3, overflow:"hidden", marginTop:8 }}>
              <div style={{ height:"100%", width:`${user.trustScore}%`, borderRadius:3, background:`linear-gradient(90deg,${G.orange},#FFB347)`, transition:"width 1s ease" }} />
            </div>
          </div>
        </div>

        {/* Zone badge */}
        <div className="fade-up card" style={{ padding:"14px 16px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:22 }}>{isFlood ? "🌊" : "📍"}</span>
            <div>
              <p style={{ fontSize:13, fontWeight:700 }}>{user.zone}, {user.city}</p>
              <p style={{ fontSize:12, color:G.textSecondary }}>{isFlood ? "Flood-prone zone — rain & flood triggers active" : "Normal zone — heat & platform triggers active"}</p>
            </div>
            <span className="pill" style={{ background:isFlood?G.redLight:G.amberLight, color:isFlood?G.red:G.amber, marginLeft:"auto", flexShrink:0 }}>
              {isFlood ? "⚠ Flood Risk" : "◉ Normal"}
            </span>
          </div>
        </div>

        {/* All-clear + tip */}
        <div className="fade-up card" style={{ padding:"20px 16px", textAlign:"center" }}>
          <span style={{ fontSize:44 }}>✅</span>
          <p style={{ fontSize:15, fontWeight:700, marginTop:12, marginBottom:6 }}>All clear right now</p>
          <p style={{ fontSize:13, color:G.textSecondary, marginBottom:14 }}>No disruptions detected · coverage is active</p>
          <div style={{ background:G.orangeLight, borderRadius:10, padding:"10px 14px", display:"inline-flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:18 }}>⚡</span>
            <span style={{ fontSize:12, color:G.orangeDark, fontWeight:600 }}>Tap the orange button to simulate a disruption</span>
          </div>
        </div>

        {/* Recent payouts */}
        <div className="fade-up">
          <SectionHeader title="Recent Payouts" right={
            <span className="pill" style={{ background:G.greenLight, color:G.green }}>₹{user.earningsProtected.toLocaleString()} total</span>
          } />
          <div className="card" style={{ overflow:"hidden" }}>
            {payouts.map((p,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:i<payouts.length-1?`1px solid ${G.border}`:"none" }}>
                <div style={{ width:38, height:38, borderRadius:10, background:p.color+"15", fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{p.icon}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:600 }}>{p.event}</p>
                  <p style={{ fontSize:11, color:G.textMuted }}>{p.date} · Auto-paid</p>
                </div>
                <p style={{ fontSize:14, fontWeight:700, color:G.green }}>+₹{p.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="fade-up">
          <SectionHeader title="How payouts work" />
          <div className="card" style={{ padding:16 }}>
            {[
              { icon:"🌧️", label:"Disruption detected",   sub:`Rain${isFlood?", flood":""}, heat or outage in your zone` },
              { icon:"📊", label:"Income drop verified",   sub:"AI confirms loss > 30% in real-time" },
              { icon:"✅", label:"One-tap confirmation",   sub:"You confirm in the app" },
              { icon:"💸", label:"Payout in 90 seconds",   sub:"Direct to your UPI account" },
            ].map((s,i,a) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 0", borderBottom:i<a.length-1?`1px solid ${G.border}`:"none" }}>
                <div style={{ width:38, height:38, borderRadius:10, background:G.bg, fontSize:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{s.icon}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:600 }}>{s.label}</p>
                  <p style={{ fontSize:11, color:G.textSecondary }}>{s.sub}</p>
                </div>
                <div style={{ marginLeft:"auto", fontSize:11, color:G.textMuted, fontWeight:700, width:22, height:22, borderRadius:"50%", background:G.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TRIGGER BOTTOM SHEET ──
function TriggerSheet({ event, onConfirm, onDismiss }) {
  const [state, setState] = useState("idle");

  const confirm = () => {
    setState("confirming");
    setTimeout(() => { setState("success"); setTimeout(onConfirm, 2000); }, 1500);
  };

  return (
    <div className="overlay" onClick={state==="idle" ? onDismiss : undefined}>
      <div className="sheet" onClick={e => e.stopPropagation()}>
        <div className="sheet-handle" />
        {state === "success" ? (
          <div style={{ padding:"0 24px 8px", textAlign:"center" }} className="fade-up">
            <div style={{ fontSize:64, marginBottom:12 }}>🎉</div>
            <h3 style={{ fontSize:22, fontWeight:800, marginBottom:8 }}>Payout Initiated!</h3>
            <p style={{ fontSize:14, color:G.textSecondary, marginBottom:16 }}>₹{event.lossDetected} reaching your UPI in 90 seconds</p>
            <div style={{ background:G.greenLight, borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontSize:20 }}>✅</span>
              <div style={{ textAlign:"left" }}>
                <p style={{ fontSize:13, fontWeight:700, color:G.green }}>Income protected</p>
                <p style={{ fontSize:11, color:G.textSecondary }}>Transaction ID: GS-{Date.now().toString().slice(-6)}</p>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ padding:"0 20px 8px" }}>
            <div style={{ background:event.lightColor, borderRadius:14, padding:"14px 16px", marginBottom:18, display:"flex", gap:12, alignItems:"center" }}>
              <div style={{ width:50, height:50, borderRadius:14, background:event.color+"20", fontSize:26, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{event.icon}</div>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:2 }}>
                  <span className="risk-pulse" style={{ background:event.color }} />
                  <span style={{ fontSize:11, fontWeight:700, color:event.color, letterSpacing:".05em" }}>DISRUPTION DETECTED</span>
                </div>
                <p style={{ fontSize:16, fontWeight:700 }}>{event.title}</p>
                <p style={{ fontSize:12, color:G.textSecondary }}>{event.zone}</p>
              </div>
            </div>

            <p style={{ fontSize:11, color:G.textMuted, fontWeight:700, marginBottom:8, letterSpacing:".05em" }}>TRIGGER VALIDATION</p>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
              {event.triggers.map((t,i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", borderRadius:10, background:G.greenLight, border:`1px solid ${G.green}20` }}>
                  <span style={{ color:G.green, fontWeight:700 }}>✓</span>
                  <span style={{ fontSize:13 }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", background:G.bg, borderRadius:12, marginBottom:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:18 }}>🤖</span>
                <div>
                  <p style={{ fontSize:12, fontWeight:600 }}>AI confidence score</p>
                  <p style={{ fontSize:11, color:G.textSecondary }}>Fraud check passed</p>
                </div>
              </div>
              <span style={{ fontSize:20, fontWeight:800, color:G.green }}>{event.confidence}%</span>
            </div>

            <div style={{ background:`linear-gradient(135deg,${G.orange},#FF8C5A)`, borderRadius:14, padding:"16px 18px", marginBottom:20, color:"white", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <p style={{ fontSize:12, opacity:.85, marginBottom:2 }}>Income protected</p>
                <p style={{ fontSize:30, fontWeight:800 }}>₹{event.lossDetected}</p>
                <p style={{ fontSize:11, opacity:.8 }}>Within your plan cap · 1 payout day used</p>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:40 }}>💸</div>
                <p style={{ fontSize:10, opacity:.8, marginTop:4 }}>To UPI</p>
              </div>
            </div>

            {state === "confirming" ? (
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, padding:16, background:G.orangeLight, borderRadius:12, color:G.orange, fontWeight:600, fontSize:14 }}>
                <Spinner color={G.orange} /> Processing your payout…
              </div>
            ) : (
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn-ghost" onClick={onDismiss} style={{ width:"auto", padding:"13px 18px" }}>Not now</button>
                <button className="btn-primary" onClick={confirm} style={{ flex:1 }}>
                  Confirm & Get ₹{event.lossDetected} →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── PLANS SCREEN ──
function PlansScreen({ currentPlan, onSelect }) {
  const [selected, setSelected] = useState(currentPlan);
  return (
    <div style={{ background:G.bg, minHeight:"100%", padding:"20px 20px 110px" }} className="scroll-container">
      <h2 style={{ fontSize:22, fontWeight:800, marginBottom:4 }}>Weekly Plans</h2>
      <p style={{ fontSize:13, color:G.textSecondary, marginBottom:24 }}>Partial income protection · automated payouts · cancel anytime</p>
      <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:24 }}>
        {PLANS.map(p => (
          <div key={p.id} className={`plan-card${selected===p.id?" selected":""}`}
            onClick={() => setSelected(p.id)}
            style={{ borderColor:selected===p.id?p.color:G.border, boxShadow:selected===p.id?`0 0 0 4px ${p.color}14`:"none" }}>
            {p.tag && <div style={{ position:"absolute", top:-1, right:16, background:p.color, color:"white", fontSize:10, fontWeight:700, padding:"3px 10px", borderRadius:"0 0 8px 8px" }}>{p.tag}</div>}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:12, height:12, borderRadius:"50%", border:`3px solid ${p.color}`, background:selected===p.id?p.color:"white" }} />
                <span style={{ fontSize:18, fontWeight:800 }}>{p.name}</span>
              </div>
              <div style={{ textAlign:"right" }}>
                <span style={{ fontSize:24, fontWeight:800, color:p.color }}>₹{p.price}</span>
                <span style={{ fontSize:12, color:G.textMuted }}>/week</span>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[{label:"Daily payout",value:`₹${p.dailyPayout}`},{label:"Weekly cap",value:`₹${p.cap.toLocaleString()}`},{label:"Payout days",value:`${p.days}/week`}].map((item,i) => (
                <div key={i} style={{ background:selected===p.id?p.lightColor:G.bg, borderRadius:10, padding:10, border:`1px solid ${selected===p.id?p.color+"30":G.border}` }}>
                  <p style={{ fontSize:10, color:G.textMuted, fontWeight:600, marginBottom:3 }}>{item.label}</p>
                  <p style={{ fontSize:14, fontWeight:700, color:selected===p.id?p.color:G.text }}>{item.value}</p>
                </div>
              ))}
            </div>
            {selected===p.id && (
              <div style={{ marginTop:12, padding:"8px 12px", background:p.lightColor, borderRadius:8, fontSize:12, color:p.color, fontWeight:600 }}>
                {p.id==="starter" ? "Best for part-time gig workers" : p.id==="standard" ? "Recommended — covers most disruptions" : "Full coverage for power earners"}
              </div>
            )}
          </div>
        ))}
      </div>
      <button className="btn-primary" onClick={() => onSelect(selected)}>
        Switch to {PLANS.find(p=>p.id===selected)?.name} Plan →
      </button>
      <p style={{ fontSize:11, color:G.textMuted, textAlign:"center", marginTop:10 }}>Changes take effect next Monday · No cancellation fee</p>
    </div>
  );
}

// ── ADMIN SCREEN ──
function AdminScreen({ user }) {
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(null), 3500); };

  const handleExport = async () => {
    setExporting(true);
    try { await exportAdminExcel(user); showToast("✅ GigShield_AdminReport.xlsx downloaded!"); }
    catch { showToast("❌ Export failed — check console"); }
    finally { setExporting(false); }
  };

  const statusStyle = { paid:[G.green,G.greenLight], review:[G.amber,G.amberLight], flagged:[G.red,G.redLight] };
  const stats = [
    { label:"Total Users",    value:ADMIN_DATA.totalUsers.toLocaleString(), icon:"👥", color:G.blue },
    { label:"Active Today",   value:ADMIN_DATA.activeToday.toLocaleString(), icon:"✅", color:G.green },
    { label:"Active Claims",  value:ADMIN_DATA.activeClaims, icon:"📋", color:G.orange },
    { label:"Paid This Week", value:`₹${(ADMIN_DATA.paidThisWeek/1000).toFixed(0)}K`, icon:"💸", color:G.green },
    { label:"Fraud Alerts",   value:ADMIN_DATA.fraudAlerts, icon:"🚨", color:G.red },
    { label:"Avg Trust",      value:`${ADMIN_DATA.avgTrustScore}/100`, icon:"⭐", color:G.amber },
  ];

  return (
    <div style={{ background:G.bg, minHeight:"100%", padding:"20px 20px 110px" }} className="scroll-container">
      {toast && <div className="toast">{toast}</div>}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:10, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:G.orange, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>⚙️</div>
          <div>
            <h2 style={{ fontSize:18, fontWeight:800 }}>Admin Console</h2>
            <p style={{ fontSize:11, color:G.textSecondary }}>GigShield · Operations Dashboard</p>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span className="risk-pulse" style={{ background:G.green }} />
            <span style={{ fontSize:11, color:G.green, fontWeight:600 }}>Live</span>
          </div>
          <button className="export-btn" onClick={handleExport} disabled={exporting}>
            {exporting ? <><Spinner size={14}/> Exporting…</> : <>📊 Export Excel</>}
          </button>
        </div>
      </div>

      <div style={{ background:G.greenLight, border:`1px solid ${G.green}30`, borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ fontSize:16 }}>📁</span>
        <p style={{ fontSize:12, color:"#0a5c2a", lineHeight:1.5 }}>
          Exports a <strong>4-sheet Excel</strong>: Summary · Claims · Worker Profile · Zone Risk Map (flood-prone + normal zones)
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
        {stats.map((s,i) => (
          <div key={i} className="stat-card" style={{ padding:"12px 14px" }}>
            <p style={{ fontSize:18, marginBottom:6 }}>{s.icon}</p>
            <p style={{ fontSize:18, fontWeight:800, color:s.color }}>{s.value}</p>
            <p style={{ fontSize:10, color:G.textMuted, fontWeight:600, marginTop:2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      <div style={{ background:G.redLight, border:`1px solid ${G.red}30`, borderRadius:12, padding:"12px 14px", marginBottom:20, display:"flex", gap:10, alignItems:"center" }}>
        <span style={{ fontSize:20 }}>🚨</span>
        <div>
          <p style={{ fontSize:13, fontWeight:700, color:G.red }}>{ADMIN_DATA.fraudAlerts} fraud alerts require review</p>
          <p style={{ fontSize:11, color:G.textSecondary }}>GPS spoofing · Trust score &lt;40 · Duplicate claim attempt</p>
        </div>
      </div>

      <SectionHeader title="Recent Claims" right={
        <span className="pill" style={{ background:G.orangeLight, color:G.orange }}>{RECENT_CLAIMS.length} records</span>
      } />
      <div className="card" style={{ overflow:"hidden", marginBottom:20 }}>
        {RECENT_CLAIMS.map((c,i) => {
          const [color,bg] = statusStyle[c.status] || [G.textMuted,G.bg];
          return (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:i<RECENT_CLAIMS.length-1?`1px solid ${G.border}`:"none" }}>
              <div style={{ width:34, height:34, borderRadius:10, background:G.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.textSecondary, flexShrink:0 }}>
                {c.user.split(" ").map(w=>w[0]).join("")}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:600 }}>{c.user} <span style={{ fontSize:11, color:G.textSecondary, fontWeight:400 }}>· {c.zone}</span></p>
                <p style={{ fontSize:11, color:G.textSecondary }}>{c.trigger} · {c.city}</p>
              </div>
              <div style={{ textAlign:"right", marginRight:8 }}>
                <p style={{ fontSize:13, fontWeight:700 }}>₹{c.amount}</p>
                <span className="pill" style={{ background:bg, color, fontSize:10 }}>{c.status}</span>
              </div>
              <div style={{ textAlign:"center", minWidth:36 }}>
                <p style={{ fontSize:13, fontWeight:700, color:c.aiScore>=80?G.green:c.aiScore>=60?G.amber:G.red }}>{c.aiScore}%</p>
                <p style={{ fontSize:9, color:G.textMuted, fontWeight:600 }}>AI</p>
              </div>
            </div>
          );
        })}
      </div>

      <SectionHeader title="Plan distribution" />
      <div className="card" style={{ padding:16 }}>
        {[{plan:"Starter",count:3842,pct:30,idx:0},{plan:"Standard",count:6424,pct:50,idx:1},{plan:"Pro",count:2581,pct:20,idx:2}].map((d,i) => {
          const p = PLANS[d.idx];
          return (
            <div key={i} style={{ marginBottom:i<2?14:0 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontSize:13, fontWeight:600, color:p.color }}>{d.plan}</span>
                <span style={{ fontSize:12, color:G.textSecondary }}>{d.count.toLocaleString()} · {d.pct}%</span>
              </div>
              <ProgressBar value={d.pct} max={100} color={p.color} height={6} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── BOTTOM NAV ──
function BottomNav({ active, onChange }) {
  const tabs = [
    { id:"dashboard", icon:"🏠", label:"Home" },
    { id:"plans",     icon:"📋", label:"Plans" },
    { id:"admin",     icon:"⚙️", label:"Admin" },
  ];
  return (
    <div style={{ display:"flex", background:G.white, borderTop:`1px solid ${G.border}`, position:"sticky", bottom:0, zIndex:20, boxShadow:"0 -4px 20px rgba(0,0,0,0.06)" }}>
      {tabs.map(tab => (
        <button key={tab.id} className={`nav-tab${active===tab.id?" active":""}`} onClick={() => onChange(tab.id)}>
          <span style={{ fontSize:20, lineHeight:1 }}>{tab.icon}</span>
          {tab.label}
          {active===tab.id && <div style={{ position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)", width:24, height:3, background:G.orange, borderRadius:"2px 2px 0 0" }} />}
        </button>
      ))}
    </div>
  );
}

// ── ROOT APP ──
export default function App() {
  const [appState,    setAppState]    = useState("onboarding");
  const [activeTab,   setActiveTab]   = useState("dashboard");
  const [user,        setUser]        = useState(DEFAULT_USER);
  const [showTrigger, setShowTrigger] = useState(false);
  const [showTip,     setShowTip]     = useState(false);

  useEffect(() => {
    if (appState !== "app") return;
    const show = setTimeout(() => setShowTip(true), 600);
    const hide = setTimeout(() => setShowTip(false), 5800);
    return () => { clearTimeout(show); clearTimeout(hide); };
  }, [appState]);

  const handleOnboardComplete = (data) => {
    setUser(u => ({ ...u, ...data }));
    setAppState("app");
  };

  const handlePayoutConfirm = () => {
    setUser(u => ({
      ...u,
      weeklyCapUsed:     u.weeklyCapUsed + TRIGGER_EVENT.lossDetected,
      earningsProtected: u.earningsProtected + TRIGGER_EVENT.lossDetected,
      payoutDaysUsed:    u.payoutDaysUsed + 1,
      trustScore:        Math.min(100, u.trustScore + 2),
    }));
    setShowTrigger(false);
    setActiveTab("dashboard");
  };

  const handlePlanChange = (planId) => {
    setUser(u => ({ ...u, plan:planId }));
    setActiveTab("dashboard");
  };

  const fireTrigger = () => {
    setShowTip(false);
    setShowTrigger(true);
    setActiveTab("dashboard");
  };

  if (appState === "onboarding") {
    return <><style>{css}</style><OnboardingScreen onComplete={handleOnboardComplete} /></>;
  }

  const showFab = (activeTab==="dashboard" || activeTab==="plans") && !showTrigger;

  return (
    <>
      <style>{css}</style>
      <div style={{ maxWidth:480, margin:"0 auto", minHeight:"100vh", display:"flex", flexDirection:"column", background:G.white, position:"relative", boxShadow:"0 0 60px rgba(0,0,0,0.1)" }}>
        <div style={{ flex:1, overflow:"hidden", display:"flex", flexDirection:"column" }}>
          <div style={{ flex:1, overflow:"auto" }}>
            {activeTab==="dashboard" && <DashboardScreen user={user} onChangePlan={() => setActiveTab("plans")} />}
            {activeTab==="plans"     && <PlansScreen currentPlan={user.plan} onSelect={handlePlanChange} />}
            {activeTab==="admin"     && <AdminScreen user={user} />}
          </div>
        </div>

        <BottomNav active={activeTab} onChange={setActiveTab} />

        {showFab && (
          <>
            {showTip && <div className="trigger-fab-tip">⚡ Tap to simulate a disruption</div>}
            <button className="trigger-fab" onClick={fireTrigger} title="Simulate disruption event">⚡</button>
          </>
        )}

        {showTrigger && (
          <TriggerSheet event={TRIGGER_EVENT} onConfirm={handlePayoutConfirm} onDismiss={() => setShowTrigger(false)} />
        )}
      </div>
    </>
  );
}
