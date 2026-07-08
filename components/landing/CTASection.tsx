import Link from "next/link";

export function CTASection() {
  return (
    <section id="about" className="bg-[#f8fbfe] py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">

        {/* Ocean illustration dots */}
        <div className="flex justify-center gap-2 mb-10">
          {[40, 24, 16].map((size, i) => (
            <div
              key={i}
              className="rounded-full bg-[#d6eaf8] border border-[#aed9e0]"
              style={{ width: size, height: size }}
            />
          ))}
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-[#0c3d5e] mb-5 leading-tight">
          Ready to start<br />
          <span className="text-[#2e86c1]">monitoring?</span>
        </h2>
        <p className="text-[#4a6a7a] text-base mb-10 max-w-lg mx-auto leading-relaxed">
          Connect your ESP32, open the dashboard, and see your environment come alive. No account needed — runs entirely on your local network.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-[#0c3d5e] text-white font-bold rounded-full hover:bg-[#1a5f8a] transition-all shadow-lg shadow-[#0c3d5e]/25 hover:shadow-xl hover:-translate-y-0.5 text-sm"
          >
            Open Dashboard →
          </Link>
          <a
            href="/REQUIREMENTS.md"
            className="px-8 py-4 border-2 border-[#0c3d5e]/20 text-[#0c3d5e] font-bold rounded-full hover:border-[#0c3d5e]/50 hover:bg-[#e8f4f8] transition-all text-sm"
          >
            View Requirements
          </a>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="bg-[#0c3d5e] text-[#aed9e0] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">A</div>
          <span className="font-semibold text-white text-sm">AquaSense IoT Dashboard</span>
        </div>
        <p className="text-xs text-[#7aaabe] text-center">
          Built with Next.js, React, TypeScript, Tailwind CSS & Recharts. Open source under MIT.
        </p>
        <a
          href="https://github.com/Aryyl/Iot-Dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#aed9e0] hover:text-white transition-colors"
        >
          github.com/Aryyl/Iot-Dashboard
        </a>
      </div>
    </footer>
  );
}
