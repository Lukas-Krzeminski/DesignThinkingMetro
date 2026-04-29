import { HeroSection } from "@/components/HeroSection";
import { PrototypeGallery } from "@/components/PrototypeGallery";
import Link from "next/link";
import { ArrowRight, Footprints, MapPin, Monitor, Accessibility } from "lucide-react";

const PILLARS = [
  {
    icon: Footprints,
    color: "#38ADEF",
    title: "Color-Coded Floor Paths",
    body: "Colored floor strips guide passengers from entry to platform without ever looking up, reducing cognitive load and transfer confusion.",
  },
  {
    icon: MapPin,
    color: "#CC0000",
    title: "Clearer Signage",
    body: "Redesigned overhead panels use larger typefaces, higher contrast, and bilingual labels so passengers identify their line in under two seconds.",
  },
  {
    icon: Accessibility,
    color: "#88CC00",
    title: "Accessibility-First Routing",
    body: "Step-free path indicators, tactile paving, and elevator locations are embedded into the wayfinding layer, not treated as afterthoughts.",
  },
  {
    icon: Monitor,
    color: "#9B0099",
    title: "Interactive Route Guidance",
    body: "Touchscreen route-planning kiosks let passengers generate a step-by-step journey from their current station, with printed or photo-saved receipts.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[#060d1a]">
      <HeroSection />

      {/* ── Explanation section ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
                The Prototype
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                What We&apos;re Testing
              </h2>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6">
                Our prototype tests whether passengers can navigate the metro faster
                and with less confusion by following{" "}
                <span className="text-white font-medium">color-coded floor paths</span>,{" "}
                <span className="text-white font-medium">clearer line labels</span>,{" "}
                <span className="text-white font-medium">accessibility indicators</span>,
                and{" "}
                <span className="text-white font-medium">interactive route-planning screens</span>.
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Focused on Avenida de América, a complex interchange station served
                by Lines 4, 6, 7, and 9, our redesign targets the moments of
                highest passenger confusion: transfers, accessibility needs, and
                unfamiliar visitors.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "4", label: "Metro lines at test station", color: "#994400" },
                { value: "3M+", label: "Daily Madrid Metro passengers", color: "#38ADEF" },
                { value: "5", label: "Redesigned touchpoints", color: "#F88B00" },
                { value: "100%", label: "Accessibility coverage goal", color: "#88CC00" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#0b1629] rounded-2xl p-5 border border-white/5 flex flex-col gap-2"
                >
                  <span className="text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500 leading-snug">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Four pillars ── */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PILLARS.map(({ icon: Icon, color, title, body }) => (
              <div
                key={title}
                className="bg-[#0b1629] rounded-2xl p-6 border border-white/5 flex flex-col gap-4 hover:border-white/10 transition-colors duration-300"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}22` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2 text-sm">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <PrototypeGallery />

      {/* ── Bottom CTA ── */}
      <section className="py-28 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-4">
            Interactive Demo
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
            Try the Route Machine
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Experience the redesigned interactive kiosk. Plan a journey from
            Avenida de América and receive a printed route slip.
          </p>
          <Link
            href="/machine"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-900 font-semibold text-base sm:text-lg hover:bg-slate-100 active:scale-95 transition-all duration-200 shadow-2xl shadow-white/10"
          >
            Test the Interactive Machine
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-slate-600 text-sm">
            MENG 1000 · Design Thinking Final Prototype
          </span>
          <span className="text-slate-700 text-sm">
            Lukas · Max · Mia · Sierra · Mo · Jed
          </span>
        </div>
      </footer>
    </main>
  );
}
