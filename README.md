# GigShield — AI-Powered Income Protection for India's Gig Workers

> When it rains in Bellandur, delivery riders don't earn. GigShield fixes that.

---

## The Problem We're Solving

India's gig economy employs over 15 million workers — delivery riders on Swiggy and Zomato, cab drivers on Uber and Ola, and hyperlocal agents on Zepto, Blinkit, and Dunzo. Unlike salaried employees, these workers have absolutely no income safety net.

When it pours during monsoon season, when a heat wave makes it unsafe to ride, when a platform goes down for maintenance, or when a zone gets locked due to waterlogging — they simply stop earning. There's no sick leave, no insurance claim they can file, and no employer to fall back on.

**The numbers paint a clear picture:**
- 68% of gig workers report significant income loss during monsoon months
- Workers lose 6 to 10 earning days per month due to factors entirely outside their control
- Less than 3% have any form of income protection whatsoever

Traditional insurance doesn't work here — it's too slow, too expensive, and designed for annual claims, not daily disruptions.

---

## What GigShield Does

GigShield is a **parametric micro-insurance platform** built specifically for gig workers. It monitors real-world conditions in real time and automatically pays workers when verified disruptions hit their zone — no paperwork, no waiting, no manual claims.

Here's how a typical payout works:

1. **A disruption hits** — heavy rain starts in Bellandur, Bengaluru. IMD confirms 42mm/hr rainfall.
2. **AI detects the impact** — order volume in the zone drops 68%. The worker's GPS confirms they're in the affected area.
3. **Composite triggers validate** — rainfall threshold crossed AND income drop exceeds 30% AND worker was active in zone AND community peers confirm the disruption. All conditions must be true simultaneously.
4. **The worker taps once to confirm** — a bottom sheet shows the payout amount, AI confidence score, and trigger details.
5. **Money hits their UPI in 90 seconds** — no forms, no waiting period, no questions asked.

The key innovation is **composite triggers** — payouts don't fire on a single signal. Multiple independent data sources must agree before any money moves, which keeps fraud near zero while making legitimate payouts instant.

---

## What's Inside the App

### For Workers

- **Onboarding** — pick your city, zone (flood-prone zones are clearly marked), platform, and plan in under a minute
- **Dashboard** — see your active plan, earnings protected this week, trust score, zone risk status, and recent payouts at a glance
- **Plan Selection** — three weekly plans (Starter at Rs.50/week, Standard at Rs.80/week, Pro at Rs.120/week) with a clear breakdown of daily payout, weekly cap, and payout days
- **Disruption Simulation** — tap the orange FAB button to see the full trigger-to-payout flow in action, complete with AI confidence scoring and UPI payout confirmation

### For Operators

- **Admin Console** — platform-wide stats including total users, active claims, fraud alerts, and average trust scores
- **Claims Table** — every recent claim with worker name, zone, trigger type, payout amount, status, and AI confidence score
- **Excel Export** — one-click download of a 4-sheet report covering platform summary, all claims, worker profile, and a complete zone risk map across all 7 cities

---

## Zone Coverage

We mapped **84 real zones across 7 major Indian cities**, split into flood-prone and normal categories based on actual geographic and historical flooding data:

| City | Flood-Prone Zones | Normal Zones |
|------|------------------|-------------|
| **Bengaluru** | Bellandur, Varthur, Mahadevapura, HSR Layout, Koramangala, Electronic City | Indiranagar, Whitefield, Jayanagar, Marathahalli, Rajajinagar, BTM Layout |
| **Mumbai** | Kurla, Sion, Dharavi, Wadala, Chembur, Govandi | Bandra, Andheri West, Borivali, Dadar, Malad, Thane |
| **Chennai** | Velachery, Tambaram, Pallikaranai, Perungudi, Adyar, Thiruvanmiyur | Anna Nagar, T.Nagar, Mylapore, Porur, Nungambakkam, Chromepet |
| **Delhi** | Yamuna Khadar, Burari, Mustafabad, Gokulpuri, Usmanpur, Bhalaswa | Lajpat Nagar, Dwarka, Rohini, Saket, Karol Bagh, Janakpuri |
| **Hyderabad** | Malkajgiri, Saroornagar, Nagole, LB Nagar, Uppal, Moosarambagh | Banjara Hills, Jubilee Hills, Madhapur, Gachibowli, Kukatpally, Secunderabad |
| **Pune** | Hadapsar, Kondhwa, Wanowrie, Bibwewadi, Katraj, Ambegaon | Koregaon Park, Viman Nagar, Kothrud, Baner, Aundh, Wakad |
| **Kolkata** | Tiljala, Topsia, Tangra, Kasba, Behala, Garden Reach | Salt Lake, New Town, Park Street, Ballygunge, Jadavpur, Dum Dum |

Flood-prone zones get rain and flood triggers. Normal zones are covered for heat waves, platform outages, and traffic disruptions.

---

## Pricing Model

| Plan | Weekly Premium | Daily Payout | Weekly Cap | Max Payout Days |
|------|---------------|-------------|-----------|----------------|
| Starter | Rs.50 | Rs.200 | Rs.1,000 | 2 per week |
| Standard | Rs.80 | Rs.300 | Rs.1,500 | 3 per week |
| Pro | Rs.120 | Rs.400 | Rs.2,500 | 4 per week |

Workers pay a small weekly premium and receive automatic payouts whenever a verified disruption hits their zone. They can switch plans or cancel anytime with no fees.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite 6 |
| Styling | CSS-in-JS (inline styles + injected stylesheet) |
| Charts | SVG-based inline visualisations |
| Data Export | SheetJS (xlsx) loaded via CDN |
| Typography | Plus Jakarta Sans (Google Fonts) |
| Architecture | Single-file React app (App.jsx) |

**Planned integrations:** OpenWeatherMap API, IMD rainfall data, CPCB AQI sensors, HERE Traffic API, Razorpay UPI for real payouts.

---

## Running Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser. Fill in the onboarding form, pick a zone (try a flood-prone one), and tap the orange lightning button on the dashboard to see the full payout flow.

---

## Project Structure

```
src/
  App.jsx          — entire application (data, components, screens, routing)
  main.jsx         — React DOM entry point
  index.css        — base reset (minimal, most styles are in App.jsx)
```

Everything lives in a single `App.jsx` file — data constants, design tokens, CSS string, utility functions, Excel export logic, micro-components, all four screens (Onboarding, Dashboard, Plans, Admin), the trigger bottom sheet, bottom navigation, and the root App component.

---

## What Makes This Hackathon-Ready

- **Solves a real problem** — 15M+ gig workers in India with zero income protection
- **Novel approach** — parametric insurance with composite triggers is a genuine fintech innovation
- **Working prototype** — full onboarding-to-payout flow, not just mockups
- **AI/ML integration** — fraud detection, trust scoring, income prediction, confidence scoring
- **Real geographic data** — 84 actual zones across 7 cities with accurate flood-prone classification
- **Financial inclusion** — targets underserved daily-wage workers, not the already-insured middle class
- **Instant value** — 90-second UPI payouts vs weeks-long traditional insurance claims

---

## Future Implementation

### Phase 1 — Live Data Integration (Weeks 1-4)

Right now, the app runs on mock data. The first thing we'd build in production is real-time data pipelines:

- **Weather API (OpenWeatherMap + IMD)** — pull live rainfall, temperature, and flood alerts per zone every 5 minutes. Triggers would fire automatically when rainfall exceeds zone-specific thresholds (e.g., 35mm/hr for Bellandur, 50mm/hr for Indiranagar based on drainage capacity).
- **Traffic and Road Conditions (HERE API + Google Roads)** — detect waterlogging, road closures, and traffic jams that prevent deliveries. This is especially critical for normal (non-flood) zones where disruptions are traffic-based.
- **Platform API Integration** — connect directly with Swiggy, Zomato, Zepto, and Blinkit APIs to verify real-time order volume, rider availability, and platform outage status. This replaces the simulated "order volume drop" in our current triggers.
- **Air Quality (CPCB Sensors)** — AQI readings above 350 would activate health-hazard triggers, especially relevant for Delhi and Kolkata during winter months.

### Phase 2 — Real Payments and Identity (Weeks 5-8)

- **UPI Disbursement via Razorpay/PayU** — replace the simulated payout with actual UPI transfers. We'd use Razorpay's Route API for instant splits, keeping disbursement under 90 seconds end-to-end.
- **Aadhaar eKYC** — lightweight identity verification during onboarding using Aadhaar-based eKYC. This satisfies IRDAI regulatory requirements and prevents duplicate accounts.
- **UPI Autopay for Premiums** — weekly premium collection via UPI autopay mandates, so workers don't need to remember to pay each week.
- **Payout History and Tax Statements** — downloadable transaction history and annual tax summaries for workers who need to file ITR.

### Phase 3 — ML Models in Production (Weeks 9-12)

The AI confidence score currently shown in the app (94%) is simulated. Here's what the real ML pipeline would look like:

- **Income Prediction Model** — trained on historical delivery data to predict expected daily earnings per worker per zone. Uses features like day of week, time of day, weather forecast, and platform demand patterns.
- **Fraud Detection Model** — anomaly detection on GPS traces, claim frequency, and peer network behaviour. Workers with unusually high claim rates relative to their zone peers get flagged for manual review.
- **Dynamic Trust Scoring** — trust scores would be updated in real-time based on claim legitimacy, peer validation participation, GPS consistency, and platform activity logs. High-trust workers get faster payouts with less friction.
- **Zone Risk Prediction** — a time-series model that predicts disruption probability 6-12 hours ahead using weather forecasts, historical patterns, and satellite imagery. This enables proactive alerts like "Rain expected in your zone at 4pm — consider completing deliveries early."

### Phase 4 — Mobile App and Scale (Weeks 13-20)

- **React Native App** — a lightweight mobile app with offline-first architecture, since many gig workers are in areas with poor connectivity. Push notifications for disruption alerts and payout confirmations.
- **Regional Languages** — full UI translation into Hindi, Tamil, Kannada, Telugu, Bengali, and Marathi. Not just translated labels, but culturally adapted onboarding flows and plan descriptions.
- **Community Shield** — peer validation system where workers in the same zone can confirm or dispute disruptions. This adds a human layer to the composite trigger and increases trust scores for participants.
- **City Expansion** — extend beyond 7 cities to cover Ahmedabad, Jaipur, Lucknow, Kochi, Chandigarh, and other Tier-2 cities with growing gig economies.

### Phase 5 — Partnerships and Compliance (Months 6-12)

- **Platform Partnerships** — direct integration with Swiggy, Zomato, Uber, Ola, Dunzo, and Porter for automatic rider enrollment and verified income data.
- **IRDAI Sandbox** — apply for the Insurance Regulatory Authority's sandbox program to operate as a licensed parametric insurance product.
- **Reinsurance Tie-ups** — partner with reinsurers (Swiss Re, Munich Re) who already have parametric insurance expertise to share the risk pool.
- **On-Chain Audit Trail** — every trigger event, validation step, and payout gets logged to an immutable audit trail for regulatory transparency and dispute resolution.
- **Employer-Sponsored Plans** — allow platforms like Swiggy to sponsor GigShield coverage for their top riders as a retention tool, similar to how companies offer health insurance to employees.

---

## License

MIT

---

*Built to protect the people who deliver through the storm.*
