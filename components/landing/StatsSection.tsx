const stats = [
  { value: "5",    label: "Live Sensors",        sub: "Temperature · Humidity · Pressure · Altitude · Distance" },
  { value: "15s",  label: "Refresh Rate",         sub: "Configurable from 5s to 60s in Settings" },
  { value: "60",   label: "Data Points Stored",   sub: "Rolling history window for trend analysis" },
  { value: "100%", label: "Open Source",           sub: "MIT licensed — fork, extend, deploy" },
];

export function StatsSection() {
  return (
    <section id="sensors" className="bg-[#0c3d5e] py-20 px-6 relative overflow-hidden">

      {/* Subtle wave decoration */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden h-12">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,48 Q360,0 720,24 Q1080,48 1440,0 L1440,0 L0,0 Z" fill="#f8fbfe" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden h-12">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,0 Q360,48 720,24 Q1080,0 1440,48 L1440,48 L0,48 Z" fill="#f8fbfe" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-white mb-3">Numbers that matter</h2>
          <p className="text-[#aed9e0] text-sm">Designed for continuous, unattended IoT monitoring.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 text-center hover:bg-white/15 transition-colors"
            >
              <p className="text-5xl font-bold text-white mb-2">{s.value}</p>
              <p className="text-[#aed9e0] font-semibold text-sm mb-2">{s.label}</p>
              <p className="text-[#7aaabe] text-xs leading-relaxed">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
