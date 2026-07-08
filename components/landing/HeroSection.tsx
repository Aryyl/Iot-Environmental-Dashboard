import Link from "next/link";
import { ExternalLink, Zap } from "lucide-react";

/* ------------------------------------------------------------------
   Left Water Valley Cliff — SVG illustration
   Layered coastal rock faces descending into deep blue water
-------------------------------------------------------------------*/
function LeftCliff() {
  return (
    <svg
      viewBox="0 0 420 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Sky mist gradient behind cliff */}
      <defs>
        <linearGradient id="skyL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f4f8" />
          <stop offset="100%" stopColor="#aed9e0" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="rockL1" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#c9dde8" />
          <stop offset="40%" stopColor="#8ab5cc" />
          <stop offset="100%" stopColor="#0c3d5e" />
        </linearGradient>
        <linearGradient id="rockL2" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#ddeaf0" />
          <stop offset="50%" stopColor="#a2c8d8" />
          <stop offset="100%" stopColor="#1a5f8a" />
        </linearGradient>
        <linearGradient id="rockL3" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor="#eef5f8" />
          <stop offset="60%" stopColor="#c0dce8" />
          <stop offset="100%" stopColor="#2e86c1" />
        </linearGradient>
        <linearGradient id="waterL" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a5f8a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0c3d5e" />
        </linearGradient>
        <linearGradient id="foamL" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d6eaf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#aed9e0" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Background sky mist */}
      <rect width="420" height="700" fill="url(#skyL)" />

      {/* Farthest cliff — back layer, lightest */}
      <path d="M0,0 L180,0 L220,60 L200,150 L240,220 L180,320 L200,420 L140,520 L100,700 L0,700 Z" fill="url(#rockL3)" opacity="0.5" />

      {/* Mid cliff — medium layer */}
      <path d="M0,0 L130,0 L170,80 L150,180 L190,260 L130,360 L160,460 L90,560 L60,700 L0,700 Z" fill="url(#rockL2)" opacity="0.75" />

      {/* Foreground cliff — darkest, most defined */}
      <path d="M0,0 L80,0 L120,100 L90,200 L130,290 L70,400 L100,490 L40,600 L0,700 L0,0 Z" fill="url(#rockL1)" />

      {/* Rock texture lines on foreground cliff */}
      <path d="M20,80 Q55,90 80,75" stroke="#7ba8be" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <path d="M10,160 Q60,175 90,155" stroke="#7ba8be" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
      <path d="M15,240 Q55,258 88,240" stroke="#6699b0" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M5,330 Q45,345 78,328" stroke="#6699b0" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <path d="M10,420 Q50,435 82,418" stroke="#5580a0" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <path d="M0,510 Q35,525 65,508" stroke="#4a7090" strokeWidth="1" strokeOpacity="0.3" fill="none" />

      {/* Cliff overhang shadows */}
      <path d="M90,200 Q110,210 130,190 L120,200 Q100,215 75,205 Z" fill="#0c3d5e" opacity="0.25" />
      <path d="M60,400 Q82,412 100,393 L92,402 Q72,418 50,408 Z" fill="#0c3d5e" opacity="0.2" />

      {/* Water at cliff base */}
      <path d="M0,610 Q25,595 50,610 Q80,628 110,612 Q145,595 180,615 Q210,632 240,616 L240,700 L0,700 Z" fill="url(#waterL)" />
      <path d="M0,625 Q30,612 60,626 Q95,642 130,625 Q165,610 200,628 L200,636 Q165,620 130,637 Q95,654 60,638 Q30,624 0,637 Z" fill="url(#foamL)" />
      <path d="M0,645 Q40,630 75,646 Q115,665 155,646 Q190,630 220,648 L220,656 Q190,640 155,658 Q115,677 75,658 Q40,642 0,657 Z" fill="url(#foamL)" opacity="0.5" />

      {/* Mist rising from water */}
      <ellipse cx="100" cy="590" rx="90" ry="30" fill="#d6eaf8" opacity="0.25" />
      <ellipse cx="60" cy="570" rx="60" ry="20" fill="#e8f4f8" opacity="0.2" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Right Water Valley Cliff — mirrored
-------------------------------------------------------------------*/
function RightCliff() {
  return (
    <svg
      viewBox="0 0 420 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ transform: "scaleX(-1)" }}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="skyR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f4f8" />
          <stop offset="100%" stopColor="#aed9e0" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="rockR1" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#b8d4e4" />
          <stop offset="40%" stopColor="#7aaabe" />
          <stop offset="100%" stopColor="#0a3550" />
        </linearGradient>
        <linearGradient id="rockR2" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="#cce0ea" />
          <stop offset="50%" stopColor="#90bcd0" />
          <stop offset="100%" stopColor="#165578" />
        </linearGradient>
        <linearGradient id="rockR3" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" stopColor="#e8f2f8" />
          <stop offset="60%" stopColor="#b5d5e4" />
          <stop offset="100%" stopColor="#2678b0" />
        </linearGradient>
        <linearGradient id="waterR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#165578" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0a3550" />
        </linearGradient>
        <linearGradient id="foamR" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#c8e4f0" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a0d2dc" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <rect width="420" height="700" fill="url(#skyR)" />
      <path d="M0,0 L180,0 L220,60 L200,150 L240,220 L180,320 L200,420 L140,520 L100,700 L0,700 Z" fill="url(#rockR3)" opacity="0.5" />
      <path d="M0,0 L130,0 L170,80 L150,180 L190,260 L130,360 L160,460 L90,560 L60,700 L0,700 Z" fill="url(#rockR2)" opacity="0.75" />
      <path d="M0,0 L80,0 L120,100 L90,200 L130,290 L70,400 L100,490 L40,600 L0,700 L0,0 Z" fill="url(#rockR1)" />
      <path d="M20,80 Q55,90 80,75" stroke="#6a98b0" strokeWidth="1.5" strokeOpacity="0.5" fill="none" />
      <path d="M10,160 Q60,175 90,155" stroke="#6a98b0" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
      <path d="M15,240 Q55,258 88,240" stroke="#5888a0" strokeWidth="1" strokeOpacity="0.4" fill="none" />
      <path d="M5,330 Q45,345 78,328" stroke="#5888a0" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <path d="M10,420 Q50,435 82,418" stroke="#487890" strokeWidth="1" strokeOpacity="0.35" fill="none" />
      <path d="M0,510 Q35,525 65,508" stroke="#3d6880" strokeWidth="1" strokeOpacity="0.3" fill="none" />
      <path d="M90,200 Q110,210 130,190 L120,200 Q100,215 75,205 Z" fill="#0a3550" opacity="0.25" />
      <path d="M60,400 Q82,412 100,393 L92,402 Q72,418 50,408 Z" fill="#0a3550" opacity="0.2" />
      <path d="M0,610 Q25,595 50,610 Q80,628 110,612 Q145,595 180,615 Q210,632 240,616 L240,700 L0,700 Z" fill="url(#waterR)" />
      <path d="M0,625 Q30,612 60,626 Q95,642 130,625 Q165,610 200,628 L200,636 Q165,620 130,637 Q95,654 60,638 Q30,624 0,637 Z" fill="url(#foamR)" />
      <path d="M0,645 Q40,630 75,646 Q115,665 155,646 Q190,630 220,648 L220,656 Q190,640 155,658 Q115,677 75,658 Q40,642 0,657 Z" fill="url(#foamR)" opacity="0.5" />
      <ellipse cx="100" cy="590" rx="90" ry="30" fill="#c8e4f0" opacity="0.25" />
      <ellipse cx="60" cy="570" rx="60" ry="20" fill="#daeef8" opacity="0.2" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   Hero Section
-------------------------------------------------------------------*/
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-16">

      {/* Ocean gradient background behind illustrations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f0f8ff] to-[#d6eaf8]" />

      {/* Center mist glow */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
        <div className="w-full h-3/4 bg-gradient-to-t from-[#aed9e0]/30 via-[#d6eaf8]/20 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Left Cliff */}
      <div className="absolute left-0 bottom-0 w-[32vw] max-w-[480px] h-[85vh] pointer-events-none">
        <LeftCliff />
      </div>

      {/* Right Cliff */}
      <div className="absolute right-0 bottom-0 w-[32vw] max-w-[480px] h-[85vh] pointer-events-none">
        <RightCliff />
      </div>

      {/* Ocean floor waves at bottom */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-28">
          <defs>
            <linearGradient id="wave1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a5f8a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0c3d5e" />
            </linearGradient>
          </defs>
          <path d="M0,60 Q180,20 360,60 Q540,100 720,60 Q900,20 1080,60 Q1260,100 1440,60 L1440,120 L0,120 Z" fill="url(#wave1)" />
          <path d="M0,80 Q180,50 360,80 Q540,110 720,80 Q900,50 1080,80 Q1260,110 1440,80 L1440,120 L0,120 Z" fill="#0c3d5e" opacity="0.8" />
          {/* Foam highlights */}
          <path d="M0,62 Q180,22 360,62 Q540,102 720,62 Q900,22 1080,62 Q1260,102 1440,62 L1440,68 Q1260,108 1080,68 Q900,28 720,68 Q540,108 360,68 Q180,28 0,68 Z" fill="#d6eaf8" opacity="0.35" />
        </svg>
      </div>

      {/* Main Content — center column */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl mx-auto">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d6eaf8] border border-[#aed9e0] text-[#0c3d5e] text-xs font-semibold mb-8">
          <Zap className="w-3 h-3" />
          Live: Real-time ESP32 sensor telemetry
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-[#0c3d5e] leading-tight tracking-tight mb-6">
          Monitor your world,{" "}
          <span className="relative">
            <span className="text-[#1a5f8a]">one sensor</span>
            <svg className="absolute -bottom-1 left-0 right-0 w-full" height="6" viewBox="0 0 200 6">
              <path d="M0,5 Q50,1 100,5 Q150,9 200,5" stroke="#aed9e0" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            </svg>
          </span>{" "}
          at a time.
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-[#4a6a7a] leading-relaxed mb-10 max-w-lg">
          AquaSense connects your ESP32 to a beautiful real-time dashboard. Track temperature, humidity, pressure, altitude, and distance — all live, all at a glance.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-7 py-3.5 bg-[#0c3d5e] text-white font-semibold rounded-full hover:bg-[#1a5f8a] transition-all shadow-lg shadow-[#0c3d5e]/25 hover:shadow-xl hover:shadow-[#0c3d5e]/35 hover:-translate-y-0.5"
          >
            Open Dashboard →
          </Link>
          <a
            href="https://github.com/Aryyl/Iot-Dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-7 py-3.5 border-2 border-[#0c3d5e]/20 text-[#0c3d5e] font-semibold rounded-full hover:border-[#0c3d5e]/50 hover:bg-[#f0f8ff] transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        {/* Trusted by / sensor chips */}
        <div className="mt-12">
          <p className="text-xs font-semibold text-[#7aaabe] uppercase tracking-widest mb-4">Compatible sensors</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {["DHT22", "BMP280", "HC-SR04", "BME680", "ESP32"].map((sensor) => (
              <span
                key={sensor}
                className="px-4 py-1.5 bg-white/80 border border-[#aed9e0] rounded-full text-xs font-semibold text-[#0c3d5e] shadow-sm"
              >
                {sensor}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
