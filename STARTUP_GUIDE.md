# 🚀 Pe Startup Guide

Welcome to **Pe: The Presence Engine for Humane Healthcare**! This guide will help you get the application running in minutes.

---

## ✅ Prerequisites Check

Before starting, ensure you have:

- [x] **Node.js 18+** installed ([Download here](https://nodejs.org/))
- [x] **npm** (comes with Node.js)
- [x] Modern web browser (Chrome, Firefox, Safari, Edge)

Check your Node.js version:
```bash
node --version
# Should show v18.0.0 or higher
```

---

## 🎯 Quick Start (3 Steps)

### Step 1: Install Dependencies

Both frontend and backend dependencies are already installed! ✅

To reinstall if needed:
```bash
# Frontend
npm install

# Backend
cd server
npm install
cd ..
```

### Step 2: Start the Development Servers

**Option A: Start Both Servers (Recommended)**

Open two terminal windows:

**Terminal 1 - Frontend (React):**
```bash
npm run dev
```
This will start the React app on **http://localhost:3000**

**Terminal 2 - Backend (Node.js):**
```bash
cd server
npm run dev
```
This will start the API server on **http://localhost:5000**

**Option B: Frontend Only (MVP Demo)**

For the MVP demo, you can run just the frontend since mock data is included:
```bash
npm run dev
```

### Step 3: Open Your Browser

Navigate to:
```
http://localhost:3000
```

You should see the **Pe Dashboard** with:
- Welcome message for Dr. Martinez
- Stats on time saved, care loops, and engagement
- Urgent care loops
- Today's sessions
- AI-drafted notes ready for review

---

## 🗺️ Exploring the Application

### Navigation

Use the **sidebar** to explore all features:

1. **Dashboard** 📊
   - Overview of daily activities
   - Urgent care loops
   - Session summaries
   - Quick stats

2. **PeNote** 📝
   - AI-drafted clinical notes in SOAP format
   - Emotional cue detection
   - Session transcripts
   - Empathic insights

3. **PeLoop** 🔄
   - Care continuity tracker
   - Filter by priority (urgent, high, medium, low)
   - Due date monitoring
   - Patient-centered view

4. **Patients** 👥
   - Patient overview
   - Risk level tracking
   - Engagement scores
   - Care loop summary

5. **Metrics** 📈
   - Impact dashboard
   - Time savings analytics
   - Care loop performance
   - Patient engagement trends
   - Empathy score tracking

### Demo Accounts

Currently using mock data for:
- **Clinician:** Dr. Lisa Martinez (Licensed Clinical Psychologist)
- **Patients:** 4 behavioral health patients with various risk levels
- **Sessions:** 2 completed telehealth therapy sessions
- **Care Loops:** 7 open care loops with different priorities

---

## 🛠️ Development Commands

### Frontend Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend Commands

```bash
cd server

# Start dev server with auto-reload
npm run dev

# Start production server
npm start
```

---

## 🧪 Testing Key Features

### Test PeNote (Empathic Documentation)

1. Go to **Dashboard**
2. Click on any "AI-Drafted Notes Ready" card
3. Review the SOAP note
4. Check **Emotional Cues** sidebar (anxiety, sadness, hope, etc.)
5. Read **Empathic Insights** suggestions
6. Click **"Show Transcript"** to see session dialogue
7. Try **Edit Mode** to modify the note

### Test PeLoop (Care Continuity)

1. Go to **PeLoop** page
2. View **Urgent / Overdue** care loops (red/orange badges)
3. Use **filters** to sort by priority or status
4. Click **expand** (down arrow) on any loop to see details
5. Test **Complete** or **Snooze** actions
6. Check **days until due** calculations

### Test Patient Management

1. Go to **Patients** page
2. View patient cards with risk levels
3. Check **engagement scores** (with trend icons)
4. Click on a patient card to select it
5. Review **urgent care loops** for high-risk patients
6. Use **search** to filter by name or diagnosis

### Test Metrics Dashboard

1. Go to **Metrics** page
2. Review **key impact metrics** (time saved, burnout reduction)
3. Explore **interactive charts**:
   - Documentation time (before/after bar chart)
   - Care loops performance
   - Patient engagement trend line
   - Emotional cue distribution (pie chart)
4. Check **ROI Summary** at the bottom

---

## 🎨 Design System

Pe uses a carefully crafted design system optimized for healthcare:

### Colors

- **Primary Blue** (#0ea5e9): Trust, clarity, professionalism
- **Empathy Purple** (#d946ef): Compassion, emotional intelligence
- **Calm Green** (#22c55e): Safety, healing, success
- **Warning Orange** (#f59e0b): Attention, urgency (without alarm)

### Typography

- **Font:** Inter (clean, professional, accessible)
- **Hierarchy:** Bold headings, medium body, light captions

### Components

- **Cards:** Rounded corners, soft shadows, hover effects
- **Badges:** Color-coded by context (success, warning, info, empathy)
- **Animations:** Smooth fade-ins, slide-ups, gentle pulses

---

## 🐛 Troubleshooting

### Port Already in Use

If you see "Port 3000 is already in use":
```bash
# Kill the process using port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or change the port in vite.config.js
```

### Dependencies Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Browser Not Opening Automatically

Manually navigate to:
```
http://localhost:3000
```

### Backend API Errors

Check that the backend is running:
```bash
cd server
npm run dev
```

Health check endpoint:
```
http://localhost:5000/health
```

---

## 📱 Browser Compatibility

Pe is tested and optimized for:

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 🔐 Security Note

**Current MVP uses mock data** and is for demonstration purposes only.

For production deployment with real patient data:
- [ ] Complete HIPAA compliance audit
- [ ] Implement authentication (OAuth 2.0 / SAML)
- [ ] Set up encrypted database
- [ ] Configure audit logging
- [ ] Execute Business Associate Agreement (BAA)
- [ ] Perform penetration testing

---

## 📞 Need Help?

- **Documentation:** See `README.md` for full details
- **Issues:** Report bugs via GitHub Issues
- **Questions:** Contact hello@pe-health.com *(placeholder)*

---

## 🎉 You're All Set!

Explore the application, experience the empathy-first design, and imagine the impact Pe can have on healthcare. Remember:

> **Design is the moat. Presence is the mission.** 🌱

---

**Happy building!**  
— The Pe Team

