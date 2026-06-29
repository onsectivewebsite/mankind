"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_SLIDES } from "@/lib/img";
import { Photo } from "./Photo";

const INTERVAL = 4500;

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = HERO_SLIDES.length;
  const touchX = useRef<number | null>(null);

  const go = (i: number) => setIndex((i + count) % count);
  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  useEffect(() => {
    if (paused) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => window.clearInterval(t);
  }, [paused, count]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-lift)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Mankind Healthcare highlights"
    >
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
            aria-hidden={i !== index}
          >
            <Photo id={slide.id} alt={`${slide.label} — ${slide.caption}`} priority={i === 0} width={1100} className="h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-16">
              <span className="chip mb-2 w-fit bg-gold text-[color:var(--color-on-gold)]">{slide.label}</span>
              <p className="font-display text-lg font-bold text-white drop-shadow">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {/* arrows */}
      <button onClick={prev} aria-label="Previous slide" className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition hover:bg-white">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} aria-label="Next slide" className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition hover:bg-white">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Go to slide ${i + 1}: ${s.label}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-white" : "w-2 bg-white/55 hover:bg-white/80"}`}
          />
        ))}
      </div>
    </div>
  );
}
