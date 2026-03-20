// City → Flood-prone zones map
export const CITY_ZONES = {
  Bengaluru: ["Bellandur","Varthur","Mahadevapura","HSR Layout","Koramangala","Bommanahalli","Electronic City","Agara Lake"],
  Mumbai:    ["Kurla","Sion","Dharavi","Wadala","Chembur","Govandi","Mankhurd","Andheri"],
  Chennai:   ["Velachery","Tambaram","Mudichur","Pallikaranai","Perungudi","Sholinganallur","Adyar","T.Nagar"],
  Delhi:     ["Yamuna Khadar","Burari","Mustafabad","Gokulpuri","Usmanpur","Babarpur","Bhalaswa","Trilokpuri"],
  Hyderabad: ["Malkajgiri","Saroornagar","Nagole","LB Nagar","Uppal","Amberpet","Saidabad","Moosarambagh"],
  Pune:      ["Hadapsar","Kondhwa","Wanowrie","Bibwewadi","Katraj","Dhayari","Ambegaon","Undri"],
  Kolkata:   ["Tiljala","Topsia","Tangra","Kasba","Santoshpur","Behala","Garden Reach","Metiabruz"],
};
export const CITIES = Object.keys(CITY_ZONES);

// Plans
export const PLANS = [
  { id:"starter",  name:"Starter",  price:50,  cap:1000, dailyPayout:200, days:2, color:"#6C8EFF", light:"#EEF1FF", tag:null },
  { id:"standard", name:"Standard", price:100, cap:1500, dailyPayout:300, days:3, color:"#FF6B35", light:"#FFF0EB", tag:"Most Popular" },
  { id:"pro",      name:"Pro",      price:200, cap:2500, dailyPayout:400, days:4, color:"#1DB954", light:"#E8F8EE", tag:"Best Value" },
];

// Default user
export const DEFAULT_USER = {
  name:"Ravi Kumar", platform:"Swiggy", city:"Bengaluru", zone:"Bellandur",
  avgIncome:950, plan:"standard", trustScore:82,
  weeklyCapUsed:900, earningsProtected:3400, payoutDaysUsed:1,
};

// Admin data
export const ADMIN_DATA = {
  totalUsers:12847, activeToday:4391, activeClaims:238,
  paidThisWeek:184200, fraudAlerts:7, avgTrustScore:74,
};

// Recent claims
export const RECENT_CLAIMS = [
  { user:"Ravi K.",   zone:"Bellandur",     trigger:"Monsoon Lock",     amount:300, status:"paid",    aiScore:94, plan:"Standard", city:"Bengaluru", date:"20 Mar" },
  { user:"Priya S.",  zone:"Velachery",     trigger:"Heat Halt",        amount:250, status:"paid",    aiScore:87, plan:"Starter",  city:"Chennai",   date:"20 Mar" },
  { user:"Arjun M.",  zone:"Malkajgiri",    trigger:"Platform Crash",   amount:400, status:"review",  aiScore:61, plan:"Pro",      city:"Hyderabad", date:"19 Mar" },
  { user:"Divya R.",  zone:"Kurla",         trigger:"Zone Freeze",      amount:300, status:"paid",    aiScore:91, plan:"Standard", city:"Mumbai",    date:"19 Mar" },
  { user:"Karan T.",  zone:"Yamuna Khadar", trigger:"Monsoon Lock",     amount:200, status:"flagged", aiScore:38, plan:"Starter",  city:"Delhi",     date:"18 Mar" },
  { user:"Meena V.",  zone:"Hadapsar",      trigger:"Monsoon Lock",     amount:300, status:"paid",    aiScore:89, plan:"Standard", city:"Pune",      date:"18 Mar" },
  { user:"Sanjay B.", zone:"Tiljala",       trigger:"Flood Barrier",    amount:400, status:"paid",    aiScore:96, plan:"Pro",      city:"Kolkata",   date:"17 Mar" },
];

// Trigger event for simulation
export const TRIGGER_EVENT = {
  icon:"🌧️", title:"Heavy Rain Detected", zone:"Bellandur, Bengaluru",
  lossDetected:300, confidence:94,
  triggers:[
    "Rainfall > 42 mm/hr (IMD confirmed)",
    "Order volume down 68% in zone",
    "Active GPS in zone verified",
  ],
};

// Design tokens
export const T = {
  orange:"#FF6B35", orangeLight:"#FFF0EB", orangeDark:"#E85A24",
  bg:"#F7F7F5", white:"#FFFFFF",
  text:"#1A1A1A", textSec:"#6B6B6B", textMuted:"#A0A0A0",
  border:"#EBEBEB", borderDark:"#D4D4D4",
  green:"#1DB954", greenLight:"#E8F8EE",
  blue:"#3B82F6", blueLight:"#EFF6FF",
  red:"#EF4444", redLight:"#FEF2F2",
  amber:"#F59E0B", amberLight:"#FFFBEB",
  shadow:"0 2px 12px rgba(0,0,0,0.07)",
  shadowMd:"0 4px 24px rgba(0,0,0,0.10)",
  shadowLg:"0 8px 40px rgba(0,0,0,0.14)",
};

// Payout history
export const PAYOUTS = [
  { icon:"🌧️", event:"Monsoon Lock",   date:"Mar 18 · Auto-paid",  amount:300, type:"rain" },
  { icon:"🌡️", event:"Heat Halt",      date:"Mar 15 · Auto-paid",  amount:250, type:"heat" },
  { icon:"🌧️", event:"Monsoon Lock",   date:"Mar 12 · Confirmed",  amount:300, type:"rain" },
  { icon:"💻", event:"Platform Crash",  date:"Mar 10 · Auto-paid",  amount:200, type:"crash" },
  { icon:"🚧", event:"Zone Freeze",    date:"Mar 7 · Confirmed",   amount:350, type:"zone" },
];

// Weather data
export const WEATHER_DATA = [
  { icon:"🌧️", label:"RAINFALL",    value:82, unit:"mm/hr",  status:"danger",  statusText:"DANGER" },
  { icon:"🌡️", label:"TEMPERATURE", value:38, unit:"°C",     status:"warn",    statusText:"WARNING" },
  { icon:"💨", label:"AQI",         value:156, unit:"PM2.5",  status:"warn",    statusText:"MODERATE" },
  { icon:"🚗", label:"TRAFFIC",     value:8.2, unit:"index",  status:"danger",  statusText:"HEAVY" },
  { icon:"💨", label:"WIND SPEED",  value:34, unit:"km/hr",   status:"warn",    statusText:"MODERATE" },
  { icon:"📡", label:"PLATFORM",    value:"UP", unit:"99.1%", status:"safe",    statusText:"NORMAL" },
];

// Zone data
export const ZONES = [
  { name:"T.Nagar",    risk:"high",   workers:14, disruption:"Monsoon Lock" },
  { name:"Vadapalani", risk:"high",   workers:9,  disruption:"Flood Barrier" },
  { name:"Anna Nagar", risk:"medium", workers:11, disruption:"Heat Halt" },
  { name:"OMR",        risk:"low",    workers:22, disruption:"None" },
];

// Triggers
export const TRIGGERS = [
  { icon:"🌧️", name:"Monsoon Lock",   cond:"Rain >50mm/hr AND income drop >30%",        status:"active" },
  { icon:"🌡️", name:"Heat Halt",      cond:"Temp >42°C AND heat index >50°C",            status:"monitoring" },
  { icon:"🚧", name:"Zone Freeze",    cond:"Traffic index >7 AND civic alert",            status:"clear" },
  { icon:"💻", name:"Platform Crash", cond:"Platform down >30min AND >5 users affected",  status:"clear" },
  { icon:"🌊", name:"Flood Barrier",  cond:"Water level >2m AND road closure alert",      status:"active" },
];

// ML Models
export const ML_MODELS = [
  { icon:"🧠", name:"Income Predictor",    type:"LSTM Neural Network",   accuracy:"94.2%", latency:"12ms",  color:"blue" },
  { icon:"🔍", name:"Fraud Detector",      type:"XGBoost Ensemble",      accuracy:"97.8%", latency:"8ms",   color:"purple" },
  { icon:"🌦️", name:"Weather Risk Engine", type:"Random Forest + ARIMA", accuracy:"91.5%", latency:"15ms",  color:"green" },
  { icon:"📊", name:"Trust Scorer",        type:"Gradient Boosted Trees", accuracy:"89.3%", latency:"6ms",  color:"orange" },
];

// Anomalies
export const ANOMALIES = [
  { worker:"Karan T.", reason:"GPS spoofing detected — location mismatch", score:92, level:"high" },
  { worker:"Fake ID #8821", reason:"Duplicate claim from same device ID",  score:87, level:"high" },
  { worker:"Ajay P.",  reason:"Unusual claim frequency — 5 in 2 days",     score:64, level:"med" },
  { worker:"Sunita D.", reason:"Trust score dropped below threshold",      score:41, level:"low" },
];
