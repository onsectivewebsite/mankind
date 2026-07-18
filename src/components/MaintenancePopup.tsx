"use client";

import { useEffect, useRef, useState } from "react";
import { X, Wrench, AlertTriangle } from "lucide-react";

const SEEN_KEY = "mk-maintenance-seen";

export function MaintenancePopup() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  const dismiss = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
  };

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    if (seen) return;
    const t = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(t);
  }, []);

  // body scroll lock + focus + Esc
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    // sits above the offer flyer (z-1000) so the notice is seen first
    <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        aria-label="Dismiss maintenance notice"
        onClick={dismiss}
        className="animate-backdrop absolute inset-0 bg-ink/60 backdrop-blur-sm"
      />

      {/* card */}
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="maintenance-title"
        aria-describedby="maintenance-body"
        className="animate-pop relative w-full max-w-md overflow-hidden rounded-3xl bg-surface shadow-[var(--shadow-lift)]"
      >
        <button
          ref={closeRef}
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 text-ink shadow-sm backdrop-blur transition-colors hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* amber banner */}
        <div className="flex flex-col items-center gap-3 bg-gradient-to-br from-amber-400 to-amber-500 px-6 pb-6 pt-8 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/25 text-white ring-4 ring-white/20">
            <Wrench className="h-8 w-8" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/25 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            <AlertTriangle className="h-3.5 w-3.5" /> Notice
          </span>
        </div>

        {/* content */}
        <div className="px-7 py-6 text-center">
          <h2 id="maintenance-title" className="font-display text-2xl font-bold text-ink">
            We&apos;re under maintenance
          </h2>
          <p id="maintenance-body" className="mt-2 text-sm leading-relaxed text-ink-2">
            This website is currently under maintenance. Some features may be unavailable
            or may not work as expected. Thanks for your patience — feel free to keep browsing.
          </p>

          <button onClick={dismiss} className="btn btn-primary mt-6 w-full">
            Got it, continue
          </button>
        </div>
      </div>
    </div>
  );
}
