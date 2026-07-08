import { LandingNav } from "@/components/landing/LandingNav";
import { ScrollVideoLanding } from "@/components/landing/ScrollVideoLanding";

export const metadata = {
  title: "FloodEye — Flood Relief Monitoring",
  description: "Real-time flood monitoring and early warning powered by ESP32 sensor networks.",
};

export default function Home() {
  return (
    <div className="bg-white">
      <LandingNav />
      <ScrollVideoLanding />
    </div>
  );
}
