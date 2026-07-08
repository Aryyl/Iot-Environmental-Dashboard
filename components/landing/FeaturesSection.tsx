import { Thermometer, Droplets, Wind, Mountain, Ruler, Zap, Bell, BarChart3, Wifi, Shield } from "lucide-react";

const features = [
  {
    icon: Thermometer,
    title: "Live Temperature",
    desc: "Real-time temperature readings with trend indicators and configurable high-heat alerts.",
    color: "bg-[#fce8e0] text-[#c0392b]",
  },
  {
    icon: Droplets,
    title: "Humidity Monitoring",
    desc: "Track ambient humidity levels and receive alerts when moisture exceeds safe thresholds.",
    color: "bg-[#d6eaf8] text-[#1a5f8a]",
  },
  {
    icon: Wind,
    title: "Atmospheric Pressure",
    desc: "Monitor barometric pressure changes to anticipate weather shifts and anomalies.",
    color: "bg-[#e8f5e9] text-[#27ae60]",
  },
  {
    icon: Mountain,
    title: "Altitude Tracking",
    desc: "Precise altitude estimation from atmospheric pressure data for elevation-aware deployments.",
    color: "bg-[#f3e5f5] text-[#8e44ad]",
  },
  {
    icon: Ruler,
    title: "Distance Measurement",
    desc: "Ultrasonic proximity sensing with object-too-close alerts for safety-critical environments.",
    color: "bg-[#fff8e1] text-[#d68910]",
  },
  {
    icon: BarChart3,
    title: "Historical Analytics",
    desc: "Interactive time-series charts across all sensors — filter by hour, day, week, or month.",
    color: "bg-[#e8f4f8] text-[#0c3d5e]",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    desc: "Configurable threshold-based notifications for temperature, humidity, pressure, and distance.",
    color: "bg-[#fce8e0] text-[#c0392b]",
  },
  {
    icon: Wifi,
    title: "ThingSpeak Integration",
    desc: "Push sensor data to the ThingSpeak cloud for remote logging, export, and long-term storage.",
    color: "bg-[#d6eaf8] text-[#1a5f8a]",
  },
  {
    icon: Shield,
    title: "Comfort Score",
    desc: "Proprietary 0–100 comfort index blending temperature and humidity for a quick environment health check.",
    color: "bg-[#e8f5e9] text-[#27ae60]",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-[#f8fbfe] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d6eaf8] border border-[#aed9e0] text-[#0c3d5e] text-xs font-semibold mb-4">
            <Zap className="w-3 h-3" />
            Everything in one place
          </div>
          <h2 className="text-4xl font-bold text-[#0c3d5e] mb-4">Built for real hardware. Ready now.</h2>
          <p className="text-[#4a6a7a] text-base max-w-xl mx-auto">
            FloodEye gives you a production-ready dashboard the moment you plug in your ESP32. No configuration overhead — just real data.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-6 shadow-sm border border-[#e8f4f8] hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-4 ${f.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-[#0c3d5e] mb-2">{f.title}</h3>
                <p className="text-sm text-[#4a6a7a] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
