"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Droplets, ExternalLink, AlertTriangle, Activity, Shield, Clock } from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ force3D: true }); // Force GPU acceleration for all animations automatically
}

/* Light theme Glass component - Optimized: removed heavy shadow-xl which kills GPU performance on fade-ins */
function Glass({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white border border-slate-200 shadow-sm rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

export function ScrollVideoLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const cueRef       = useRef<HTMLDivElement>(null);
  const statsRef     = useRef<HTMLDivElement>(null);
  const featsRef     = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);

  // Initialize Lenis for smooth native scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => { lenis.raf(time * 1000); });
      lenis.destroy();
    };
  }, []);

  // Set up the GSAP ScrollTrigger timeline
  useGSAP(() => {
    // Initial states for sections that fade in later
    gsap.set([statsRef.current, featsRef.current, ctaRef.current], { 
      opacity: 0, 
      y: 50,
      pointerEvents: "none" // disable interaction when hidden
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5, // Reduced scrub delay for more immediate, less "floaty" response
      }
    });

    // 1. Fade out Hero & Cue
    tl.to(heroRef.current, { opacity: 0, y: -50, duration: 1, pointerEvents: "none" })
      .to(cueRef.current, { opacity: 0, duration: 0.5 }, "<");

    // 2. Fade in Stats
    tl.to(statsRef.current, { opacity: 1, y: 0, duration: 1, pointerEvents: "auto" })
      .to(statsRef.current, { opacity: 1, duration: 0.5 })
      .to(statsRef.current, { opacity: 0, y: -50, duration: 1, pointerEvents: "none" });

    // 3. Fade in Features
    tl.to(featsRef.current, { opacity: 1, y: 0, duration: 1, pointerEvents: "auto" })
      .to(featsRef.current, { opacity: 1, duration: 0.5 })
      .to(featsRef.current, { opacity: 0, y: -50, duration: 1, pointerEvents: "none" });

    // 4. Fade in CTA
    tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 1, pointerEvents: "auto" });

  }, { scope: containerRef });

  const sec = "absolute inset-0 z-10 flex flex-col items-center justify-center px-6";

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-slate-50" style={{ contain: "layout paint style" }}>

        {/* Waves — Beautiful light blue waves on a light background */}
        <svg className="absolute bottom-0 left-0 w-[200%] opacity-40 pointer-events-none"
             style={{ height: 220, animation: "wave-slow 18s linear infinite", transform: "translateZ(0)" }}
             viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 L1440,200 L0,200 Z" fill="#e0f2fe" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] opacity-50 pointer-events-none"
             style={{ height: 180, animation: "wave-mid 12s linear infinite", transform: "translateZ(0)" }}
             viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,100 C360,40 720,160 1080,100 C1260,70 1380,120 1440,100 L1440,200 L0,200 Z" fill="#bae6fd" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-[200%] opacity-60 pointer-events-none"
             style={{ height: 140, animation: "wave-fast 8s linear infinite", transform: "translateZ(0)" }}
             viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,20 1080,60 C1260,100 1380,30 1440,60 L1440,200 L0,200 Z" fill="#7dd3fc" />
        </svg>

        {/* ══ HERO ═══════════════════════════════════════ */}
        <div ref={heroRef} className={`${sec} text-center`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 text-blue-700 bg-blue-50 text-xs font-semibold mb-8 tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Flood Relief Monitoring System
          </div>
          <h1 className="font-sans text-6xl sm:text-7xl md:text-8xl lg:text-[6.5rem] font-bold text-slate-900 leading-[0.92] tracking-tight mb-6">
            Warn early.<br /><span className="text-blue-600">Save lives.</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-lg leading-relaxed mb-10">
            FloodEye deploys ESP32 sensor networks across flood-prone regions, delivering real-time water level readings and instant community alerts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="px-7 py-3.5 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm text-sm">
              Open Dashboard →
            </Link>
            <a href="https://github.com/Aryyl/Iot-Dashboard" target="_blank" rel="noreferrer"
               className="flex items-center justify-center gap-2 px-7 py-3.5 border border-slate-200 bg-white text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-colors text-sm shadow-sm">
              <ExternalLink className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div ref={cueRef} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-slate-400 pointer-events-none">
          <span className="text-xs tracking-widest uppercase font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>

        {/* ══ STATS ══════════════════════════════════════ */}
        <div ref={statsRef} className={sec}>
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-10">
            <h2 className="font-sans text-5xl md:text-6xl font-bold text-slate-900 text-center leading-tight">
              Real-time data.<br /><span className="text-blue-600">Real impact.</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                { value: "5+",   label: "Sensor Types", sub: "per node" },
                { value: "15s",  label: "Refresh Rate", sub: "live readings" },
                { value: "24/7", label: "Uptime",       sub: "continuous monitoring" },
                { value: "100%", label: "Open Source",  sub: "MIT licensed" },
              ].map((s) => (
                <Glass key={s.label} className="p-6 text-center">
                  <p className="font-sans text-4xl font-bold text-slate-900 mb-1">{s.value}</p>
                  <p className="text-sm font-semibold text-blue-600">{s.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
                </Glass>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {["Temperature", "Humidity", "Pressure", "Altitude", "Water Level"].map((s) => (
                <div key={s} className="px-4 py-2 border border-slate-200 bg-white shadow-sm rounded-full text-slate-600 text-xs font-medium">
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ FEATURES ═══════════════════════════════════ */}
        <div ref={featsRef} className={sec}>
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-8">
            <h2 className="font-sans text-5xl md:text-6xl font-bold text-slate-900 text-center leading-tight">
              Built for<br /><span className="text-blue-600">emergency response.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
              {[
                { icon: Activity,      title: "Live Monitoring", desc: "Water levels reported every 15 seconds from ultrasonic sensors across all deployed nodes." },
                { icon: AlertTriangle, title: "Instant Alerts",  desc: "Threshold-based notifications when water levels reach warning or critical zones." },
                { icon: Shield,        title: "Comfort Score",   desc: "0–100 environment score combining temperature, humidity, and pressure data." },
              ].map(({ icon: Icon, title, desc }) => (
                <Glass key={title} className="p-7 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-2xl border border-blue-100 bg-blue-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </Glass>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {[
                { icon: Clock,    title: "Historical Analytics",  desc: "Interactive time-series charts — filter by hour, day, week or month." },
                { icon: Droplets, title: "ThingSpeak Cloud Sync", desc: "Push data to ThingSpeak IoT cloud for remote logging and long-term storage." },
              ].map(({ icon: Icon, title, desc }) => (
                <Glass key={title} className="p-7 flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-2xl border border-blue-100 bg-blue-50 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-sans text-xl font-bold text-slate-900">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </Glass>
              ))}
            </div>
          </div>
        </div>

        {/* ══ CTA ════════════════════════════════════════ */}
        <div ref={ctaRef} className={`${sec} text-center`}>
          <div className="flex flex-col items-center gap-6">
            <div className="w-16 h-16 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center shadow-inner">
              <Droplets className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="font-sans text-5xl md:text-7xl font-bold text-slate-900 leading-tight">
              Start monitoring<br /><span className="text-blue-600">your community.</span>
            </h2>
            <p className="text-slate-600 text-base max-w-md leading-relaxed">
              Connect your ESP32, open the dashboard, and get real-time flood sensor data. No cloud account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <Link href="/dashboard" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-colors shadow-sm text-sm">
                Open Dashboard →
              </Link>
              <a href="https://github.com/Aryyl/Iot-Dashboard" target="_blank" rel="noreferrer"
                 className="flex items-center justify-center gap-2 px-8 py-4 border border-slate-200 bg-white text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-colors text-sm shadow-sm">
                <ExternalLink className="w-4 h-4" /> View on GitHub
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
