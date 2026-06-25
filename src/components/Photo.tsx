"use client";

import { useEffect, useRef, useState } from "react";
import { unsplash } from "@/lib/img";

/**
 * Responsive photo with a shimmering tinted placeholder until the image
 * decodes. Uses a plain <img> (lazy + async) so any remote host works
 * without next.config domain setup. The container must define its own size
 * (e.g. aspect ratio) so layout is reserved and there is no CLS.
 */
export function Photo({
  id,
  src,
  alt,
  className = "",
  width = 1000,
  priority = false,
  overlay = false,
}: {
  id?: string;
  src?: string;
  alt: string;
  className?: string;
  width?: number;
  priority?: boolean;
  overlay?: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const url = src ?? (id ? unsplash(id, width) : "");

  // Cover the SSR/cache race: if the image finished loading before hydration
  // attached the onLoad handler, img.complete is already true.
  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-muted ${className}`}>
      {!loaded ? (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary-soft to-coral-soft" />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={url}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0"
        }`}
      />
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
      ) : null}
    </div>
  );
}
