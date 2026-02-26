# 👟 Sneaker Tracker App

Welcome to the **Sneaker Tracker App**! This is a cross-platform mobile application built for sneakerheads. It allows users to track the sneakers they wear each day, accumulate step counts/mileage on their shoes (to avoid adding mileage to rare kicks), and view daily leaderboards.

The app uses **React Native (Expo)** for the frontend, **Supabase** for the database, and a custom **Node + Express backend** to proxy live sneaker data from the web.

---

## ✨ Features

- **Sneaker Closet**: Search and add sneakers to your digital closet using live data from StockX/FlightClub via the `sneaks-api`.
- **Daily Worn Tracking**: "Check in" the shoe you are wearing today. (Camera verification coming soon!)
- **Mileage Tracking**: Integrates with Apple HealthKit / Google Fit to track the actual steps taken in specific shoes.
- **Leaderboards**: See the most worn shoes, separated into "All Kicks" and "Running Shoes".
- **Cross-Platform**: Works on iOS, Android, and the Web.

---

## 🛠 Tech Stack

### Frontend
- **Framework**: [React Native](https://reactnative.dev/) via [Expo](https://expo.dev/)
- **Navigation**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native)
- **Icons**: `@expo/vector-icons` (Ionicons)

### Database & Auth
- **BaaS**: [Supabase](https://supabase.com/) (PostgreSQL + RLS Policies)

### Backend (Sneaker Search API)
- **Framework**: Node.js + Express
- **API Wrapper**: [`sneaks-api`](https://www.npmjs.com/package/sneaks-api) (Scrapes live data from StockX, Stadium Goods, Flight Club)

---

## 🚀 Local Development Setup

Because this app relies on both a React Native frontend and a custom Node.js backend to bypass web scraper limitations, you will need to run two terminal processes.

### 1. Start the Backend API (Sneaker Search)

The backend handles live queries to the sneaker databases.

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Start the Express server
node index.js
```
*The backend should now be running on `http://localhost:3000`.*

### 2. Start the Expo Frontend

Open a **new** terminal tab or window.

```bash
# 1. Ensure you are in the root project directory (sneaker-app)
cd sneaker-app

# 2. Install dependencies
npm install

# 3. Start the Expo development server
npx expo start
```

From here, you can:
- Press `w` to open the app in a web browser.
- Press `i` to open in an iOS Simulator (if installed).
- Press `a` to open in an Android Emulator (if installed).
- Scan the QR code with the **Expo Go** app on your physical device.

---

## 📂 Project Structure

```text
sneaker-app/
├── app/                  # Expo Router file-based navigation screens
│   ├── (tabs)/           # The main tab navigator (Home, Closet, Leaderboard, Profile)
│   └── _layout.tsx       # Root layout configuration
├── backend/              # Node.js + Express backend for `sneaks-api`
│   └── index.js          # The Express API server
├── lib/                  # Helper functions and integrations
│   ├── sneakerdb.ts      # Fetch functions interacting with the custom backend
│   └── supabase.ts       # Supabase client initialization
├── supabase/             # Supabase migrations and schema definitions
├── tailwind.config.js    # NativeWind (Tailwind CSS) configuration
└── nativewind-env.d.ts   # Global TypeScript declarations for className props
```

---

## 🚧 Upcoming Features (WIP)

- **Camera Integration ("Sneaker Login")**: Users snap a photo of their shoe to verify what they are wearing, rather than manual entry.
- **Live Health Data Link**: Wiring up the mocked health data to actual Apple HealthKit and Google Fit APIs.
- **Auth Flow**: Connecting the Supabase instance to a proper Login / Signup screen.
