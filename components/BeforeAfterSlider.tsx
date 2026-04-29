"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  beforeSrc: string;
  afterSrc: string;
  title: string;
  caption: string;
  featured?: boolean;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  title,
  caption,
  featured = false,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const update = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const updateSlider = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      setIsDragging(true);
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      updateSlider(e.clientX);
    },
    [updateSlider]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    },
    [isDragging, updateSlider]
  );

  const handlePointerUp = useCallback(() => setIsDragging(false), []);

  return (
    <div className="flex flex-col gap-3">
      {/* Title */}
      <div className="flex items-center justify-between px-1">
        <h3 className={`font-semibold text-white ${featured ? "text-xl" : "text-base"}`}>
          {title}
        </h3>
        <span className="text-xs text-slate-500 uppercase tracking-wider">Drag to compare</span>
      </div>

      {/* Slider container */}
      <div
        ref={containerRef}
        className={`relative overflow-hidden rounded-2xl select-none cursor-ew-resize border border-white/10 ${
          isDragging ? "cursor-grabbing" : "cursor-ew-resize"
        }`}
        style={{ aspectRatio: featured ? "16/9" : "4/3" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* BEFORE image - full size, bottom layer */}
        <img
          src={beforeSrc}
          alt="Before"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* AFTER image - clipped by slider position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPos}%` }}
        >
          <img
            src={afterSrc}
            alt="After"
            className="absolute top-0 left-0 h-full object-cover object-left"
            style={{
              width: containerWidth > 0 ? `${containerWidth}px` : "100%",
            }}
            draggable={false}
          />
        </div>

        {/* BEFORE label */}
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-slate-300 border border-white/10">
            Before
          </span>
        </div>

        {/* AFTER label */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-xs font-medium text-white border border-white/20">
            After
          </span>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 pointer-events-none z-20"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
        />

        {/* Drag handle */}
        <div
          className="slider-handle z-30 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <ChevronLeft className="w-3 h-3 text-slate-700" />
          <ChevronRight className="w-3 h-3 text-slate-700" />
        </div>
      </div>

      {/* Caption */}
      <p className="text-sm text-slate-500 px-1">{caption}</p>
    </div>
  );
}
