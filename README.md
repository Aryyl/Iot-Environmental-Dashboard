# FloodEye: Flood Relief Monitoring Dashboard

A modern, highly responsive Next.js web application for monitoring real-time telemetry from an ESP32 microcontroller and an array of environmental sensors. Designed specifically for flood relief, early warning, and disaster management.

## 🌊 Core Features

- **Real-Time Dashboard**: View live readings for Temperature, Humidity, Atmospheric Pressure, Altitude, and **Water Level**.
- **Interactive MapTiler Integration**: Live geospatial tracking of ESP32 sensor nodes with click-to-view telemetry popups.
- **Smart Early Warning Alerts**: Configurable thresholds that generate real-time visual alerts. Actively tracks **Rapid Water Rises** and **High Water Levels** to trigger emergencies.
- **Role-Based Access Control (RBAC)**: Secure gateway with distinct views:
  - **Resident / User View**: Read-only access to vital safety information and alerts.
  - **Administrator View**: Full control over simulation toggles, hardware settings, and critical thresholds.
- **Dynamic Charts**: Interactive time-series line charts (Recharts) for historical analysis (1h, 24h, 7d, 30d).
- **GSAP Scroll Landing Page**: A cinematic, high-performance scroll-driven Canvas sequence landing page featuring Lenis smooth scrolling and GPU-accelerated frame rendering.
- **Mobile-First Responsive Design**: 
  - Dynamic App-style **Bottom Navigation Bar** on mobile devices.
  - Responsive grids, scalable typography, and collapsible headers.
- **Live Simulation Mode**: Built-in mock data generator for testing the UI without hardware connected.
- **Persistent Local Authentication**: A fully functional Signup and Login system using `localStorage` to persist custom accounts and login sessions.

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

### 🔐 Authentication & Demo Accounts
You can register your own custom account on the **Sign Up** page. These credentials are saved securely in your browser's local storage and persist across refreshes. 

Alternatively, to quickly explore the application's Role-Based Access Control (RBAC), you can log in using one of the pre-configured mock accounts:

**Administrator Access** (Full control & diagnostics):
- Email: `admin@floodeye.com`
- Password: `admin`

**Resident Access** (Read-only monitoring):
- Email: `user@floodeye.com`
- Password: `user`

## ⚙️ Configuration & Scientific Thresholds

Administrators can navigate to the **Settings** page within the application to configure early warning thresholds based on meteorological science:
- **Atmospheric Pressure**: Drops below `1005 hPa` trigger storm warnings. Extreme drops trigger severe cyclone alerts.
- **Humidity & Temperature**: High thermal energy combined with >95% saturation triggers immediate heavy rainfall warnings.
- **Water Level**: Tracks physical river/drain rise in cm. Critical alerts trigger when water approaches the sensor face.

## 📡 Hardware Diagnostics (Admin Only)
Administrators have access to a dedicated **Device Details** page (`/dashboard/devices`). This secure hub provides:
- Live ESP32 connection status and RSSI signal strength.
- ThingSpeak Cloud synchronization status.
- A **Raw Telemetry Stream** terminal that visualizes the raw JSON payloads arriving from the hardware daemon.

## ⚡ Simulation Mode
If you don't have the ESP32 hardware set up yet, log in as an **Administrator** and click the **Lightning Bolt** icon in the top right of the dashboard navigation bar to toggle Simulation Mode. This will inject realistic mock data into the telemetry provider, allowing you to preview charts, alerts, and gauges exactly as they would behave in the real world.

## 🤝 Project Sponsorship & Team
This project was carried out under the Technology Innovation Hub (**TIH**) at **IIT Guwahati**.

**Mentors & Coordinators:**
- **Ashish Kumar Mahato** (Mentor)
- **Dr. Pratiksha Sharma** (Co-ordinator)

**Project Team:**
- **Aryyaman Bora** (Frontend and UI Design)
- **Moharnab Gogoi** (Backend and IoT)
- **Mayuree Khanikar** (Research and Documentation)
- **Indrani Gogoi** (Research and Documentation)
