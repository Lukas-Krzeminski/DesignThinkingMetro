import { BeforeAfterSlider } from "./BeforeAfterSlider";

const SLIDES = [
  {
    beforeSrc: "/images/before-1.jpg",
    afterSrc: "/images/after-1.jpg",
    title: "Platform Guidance",
    caption:
      "Color-coded floor markings guide passengers directly to their platform, replacing ambiguous signage with clear, physical navigation cues.",
  },
  {
    beforeSrc: "/images/before-2.jpg",
    afterSrc: "/images/after-2.jpg",
    title: "Transfer Hallway",
    caption:
      "Line-specific colored strips on corridor floors eliminate confusion at multi-line interchange points.",
  },
  {
    beforeSrc: "/images/before-3.jpg",
    afterSrc: "/images/after-3.jpg",
    title: "Digital Signage",
    caption:
      "Redesigned digital panels with higher contrast, clearer typography, and bilingual labels improve readability at a glance.",
  },
  {
    beforeSrc: "/images/before-4.jpg",
    afterSrc: "/images/after-4.jpg",
    title: "Corridor Navigation",
    caption:
      "Overhead signage combined with floor paths creates a dual-channel wayfinding system that works for all passenger types.",
  },
  {
    beforeSrc: "/images/before-5.jpg",
    afterSrc: "/images/after-5.jpg",
    title: "Accessibility Route",
    caption:
      "Tactile paving, step-free path indicators, and elevator locations are now visually integrated into the station environment.",
  },
];

export function PrototypeGallery() {
  return (
    <section id="gallery" className="bg-[#060d1a] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs uppercase tracking-widest text-slate-500 mb-3">
            Before & After
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
            Prototype Gallery
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Drag each slider to compare the existing Madrid Metro experience
            against our redesigned wayfinding prototype.
          </p>
        </div>

        {/* Featured first slider - full width */}
        <div className="mb-8">
          <div className="bg-[#0b1629] rounded-3xl p-6 sm:p-8 border border-white/5">
            <BeforeAfterSlider
              beforeSrc={SLIDES[0].beforeSrc}
              afterSrc={SLIDES[0].afterSrc}
              title={SLIDES[0].title}
              caption={SLIDES[0].caption}
              featured
            />
          </div>
        </div>

        {/* Remaining four in 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SLIDES.slice(1).map((slide) => (
            <div
              key={slide.title}
              className="bg-[#0b1629] rounded-3xl p-6 border border-white/5"
            >
              <BeforeAfterSlider
                beforeSrc={slide.beforeSrc}
                afterSrc={slide.afterSrc}
                title={slide.title}
                caption={slide.caption}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
