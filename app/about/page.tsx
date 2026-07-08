"use client";

import { LandingNav } from "@/components/landing/LandingNav";
import { Users } from "lucide-react";
import Image from "next/image";

/* ── Glass card ────────────────────────────────────────────────── */
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

export default function AboutPage() {
  const team = [
    { name: "Aryyaman Bora", role: "Frontend and UI Design" },
    { name: "Moharnab Gogoi", role: "Backend and IoT" },
    { name: "Mayuree Khanikar", role: "Research and Documentation" },
    { name: "Indrani Gogoi", role: "Research and Documentation" },
  ];

  const mentors = [
    { name: "Ashish Kumar Mahato", role: "Mentor" },
    { name: "Dr. Pratiksha Sharma", role: "Co-ordinator" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-blue-500/30">
      <LandingNav />

      {/* Background vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* About the Project Section */}
        <section className="mb-24">
          <h1 className="font-sans text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-8">
            About the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Project</span>
          </h1>

          <GlassCard className="p-8 md:p-10">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-medium mb-6">
              We have done this project under TIH IIT Guwahati under the mentorship of Sir Ashish Kumar Mahato and Co-ordinator Dr. Pratiksha Sharma.
            </p>
            <div className="space-y-4 text-white/70 leading-relaxed text-base md:text-lg">
              <p>
                FloodEye was conceived as a rapid-response solution to mitigate the catastrophic impacts of sudden urban and rural flooding. By deploying a low-cost, highly reliable mesh of ESP32 ultrasonic sensor nodes across vulnerable waterways, we can detect rising water levels in real-time before they breach critical thresholds.
              </p>
              <p>
                The platform securely streams meteorological telemetry—including water depth, atmospheric pressure, and humidity—directly to a centralized dashboard. This allows early warning signals to be dispatched to local authorities and residents instantly, buying precious time for evacuation and disaster response. Our ultimate goal is to provide a scalable, open-source early warning infrastructure that protects lives and properties globally.
              </p>
            </div>
          </GlassCard>
        </section>

        {/* Mentor Details Section */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl border border-blue-400/30 bg-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-300" />
            </div>
            <h2 className="font-sans text-4xl font-bold text-white">Mentor Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mentors.map((mentor) => (
              <GlassCard key={mentor.name} className="p-6 flex flex-col items-center text-center hover:bg-white/15 transition-colors duration-300">
                <div className="w-28 h-28 rounded-full mb-5 bg-gradient-to-br from-indigo-700 to-indigo-900 border-2 border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
                  <svg className="w-14 h-14 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-white mb-1">{mentor.name}</h3>
                <p className="text-sm font-medium text-blue-300">{mentor.role}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Team Details Section */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl border border-blue-400/30 bg-blue-500/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-300" />
            </div>
            <h2 className="font-sans text-4xl font-bold text-white">Team Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <GlassCard key={member.name} className="p-6 flex flex-col items-center text-center hover:bg-white/15 transition-colors duration-300">
                <div className="w-24 h-24 rounded-full mb-5 bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
                  <svg className="w-12 h-12 text-white/20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-blue-300">{member.role}</p>
              </GlassCard>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
