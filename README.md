# AquaSense: Flood Relief Monitoring Dashboard

A modern, highly responsive Next.js web application for monitoring real-time telemetry from an ESP32 microcontroller and an array of environmental sensors. Designed specifically for flood relief, early warning, and disaster management.

## 🌊 Core Features

- **Real-Time Dashboard**: View live readings for Temperature, Humidity, Atmospheric Pressure, Altitude, and **Water Level**.
- **Interactive MapTiler Integration**: Live geospatial tracking of ESP32 sensor nodes with click-to-view telemetry popups.
- **Smart Early Warning Alerts**: Configurable thresholds that generate real-time visual alerts. Actively tracks **Rapid Water Rises** and **High Water Levels** to trigger emergencies.
- **Role-Based Access Control (RBAC)**: Secure gateway with distinct views:
  - **Resident / User View**: Read-only access to vital safety information and alerts.
  - **Administrator View**: Full control over simulation toggles, hardware settings, and critical thresholds.
- **Dynamic Charts**: Interactive time-series line charts (Recharts) for historical analysis (1h, 24h, 7d, 30d).
- **GSAP Scroll Landing Page**: A cinematic, high-performance landing page featuring Lenis smooth scrolling and GPU-accelerated video/glassmorphism effects.
- **Mobile-First Responsive Design**: 
  - Dynamic App-style **Bottom Navigation Bar** on mobile devices.
  - Responsive grids, scalable typography, and collapsible headers.
- **Live Simulation Mode**: Built-in mock data generator for testing the UI without hardware connected.

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, custom Light Blue glassmorphism design system
- **Mapping**: MapLibre GL JS & React Map GL (via MapTiler API)
- **UI Components**: shadcn/ui, Lucide React (Icons)
- **Data Visualization**: Recharts
- **Animations**: GSAP (ScrollTrigger) & Framer Motion & Lenis

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v20 or higher) and npm/pnpm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd "IoT Based Water Leveled indicator"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your MapTiler API key (required for the map to render):
   ```env
   NEXT_PUBLIC_MAPTILER_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the cinematic landing page. Click **Login** to enter the dashboard.

## ⚙️ Configuration

Administrators can navigate to the **Settings** page within the application to configure:
- Critical Water Level Thresholds
- Emergency Alert Thresholds (Max Temp, Max Humidity, etc.)
- Data refresh intervals
- Cloud Sync API Keys (e.g., ThingSpeak integration)

## ⚡ Simulation Mode
If you don't have the ESP32 hardware set up yet, log in as an **Administrator** and click the **Lightning Bolt** icon in the top right of the dashboard navigation bar to toggle Simulation Mode. This will inject realistic mock data into the telemetry provider, allowing you to preview charts, alerts, and gauges exactly as they would behave in the real world.
