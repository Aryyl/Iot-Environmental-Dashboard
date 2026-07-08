"use client";

import { useEffect, useRef } from "react";

const FRAME_COUNT = 200;

function getFramePath(index: number): string {
  const padded = String(index + 1).padStart(3, "0");
  return `/landing/ezgif-frame-${padded}.jpg`;
}

export function CanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Optimization: 'copy' avoids alpha blending with previous frames, which is faster
    ctx.globalCompositeOperation = "copy";

    let drawMetrics = { sx: 0, sy: 0, sw: 0, sh: 0 };
    let isMetricsCalculated = false;

    function calculateMetrics(img: HTMLImageElement) {
      if (!canvas || img.naturalWidth === 0) return;
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      canvas.width = cw;
      canvas.height = ch;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const scale = Math.max(cw / iw, ch / ih);
      drawMetrics = {
        sw: iw * scale,
        sh: ih * scale,
        sx: (cw - iw * scale) / 2,
        sy: (ch - ih * scale) / 2,
      };
      isMetricsCalculated = true;
    }

    /* ── Canvas sizing ──────────────────────────────────────── */
    function resize() {
      const img = imagesRef.current[0];
      if (img && img.complete) {
        calculateMetrics(img);
      } else {
        // Fallback size if image hasn't loaded yet
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      }
      render(currentFrameRef.current);
    }

    function render(frameIdx: number) {
      if (!canvas || !ctx) return;
      const img = imagesRef.current[frameIdx];
      if (!img?.complete || img.naturalWidth === 0) return;

      if (!isMetricsCalculated) {
        calculateMetrics(img);
      }

      // We don't need clearRect because cover-fit draws over the entire canvas
      ctx.drawImage(
        img,
        drawMetrics.sx,
        drawMetrics.sy,
        drawMetrics.sw,
        drawMetrics.sh
      );
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });

    /* ── Preload all frames ─────────────────────────────────── */
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);

      if (i === 0) {
        img.onload = () => {
          calculateMetrics(img);
          render(0);
        };
      }
      images.push(img);
    }
    imagesRef.current = images;

    /* ── Scroll → frame mapping ─────────────────────────────── */
    // Lenis updates window.scrollY on every RAF tick via window.scrollTo,
    // so a passive scroll listener is reliable and avoids GSAP plugin conflicts.
    function onScroll() {
      const scrollTop = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const frameIdx = Math.min(
        FRAME_COUNT - 1,
        Math.round(progress * (FRAME_COUNT - 1))
      );

      if (frameIdx !== currentFrameRef.current) {
        currentFrameRef.current = frameIdx;
        // Schedule render on next animation frame to avoid duplicate draws
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => render(frameIdx));
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}
