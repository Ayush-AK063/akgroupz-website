"use client";

import { useEffect, useRef } from "react";

type Dot = { ox: number; oy: number; x: number; y: number; vx: number; vy: number };
type Ripple = { x: number; y: number; r: number; life: number };

/**
 * Interactive canvas of dots. Dots are pushed away from the cursor and spring
 * back; clicking sends a shock-wave ripple through the field. The animation
 * loop sleeps once everything has settled, so an idle hero costs nothing while
 * the page scrolls.
 */
export function DotField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 28;
    const RADIUS = 150;

    let dots: Dot[] = [];
    let ripples: Ripple[] = [];
    let w = 0;
    let h = 0;
    let rect = canvas.getBoundingClientRect();
    const pointer = { cx: -9999, cy: -9999, inside: false };
    let raf = 0;
    let running = false;
    let visible = true;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const offX = (w % GAP) / 2;
      const offY = (h % GAP) / 2;
      for (let x = offX; x <= w; x += GAP)
        for (let y = offY; y <= h; y += GAP) dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 });
      draw(-9999, -9999, false);
    };

    const draw = (mx: number, my: number, active: boolean) => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const disp = Math.min(Math.hypot(d.x - d.ox, d.y - d.oy) / 18, 1);
        const near = active ? Math.max(0, 1 - Math.hypot(d.x - mx, d.y - my) / (RADIUS * 1.6)) : 0;
        const e = Math.max(disp, near);
        const a = 0.13 + e * 0.75;
        const size = 1 + Math.max(disp, near * 0.6) * 1.6;
        // violet -> warm as dots get excited
        const r = Math.round(139 + 116 * disp);
        const g = Math.round(108 + 73 * disp);
        const b = Math.round(255 - 184 * disp);
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        if (size < 1.3) ctx.fillRect(d.x - size, d.y - size, size * 2, size * 2);
        else {
          ctx.beginPath();
          ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      rect = canvas.getBoundingClientRect();
      const mx = pointer.cx - rect.left;
      const my = pointer.cy - rect.top;
      const active = pointer.inside && my >= 0 && my <= rect.height;

      ripples = ripples.filter((r) => r.life > 0);
      for (const r of ripples) {
        r.r += 9;
        r.life -= 0.016;
      }

      let energy = 0;
      for (const d of dots) {
        if (active) {
          const dx = d.x - mx;
          const dy = d.y - my;
          const dist = Math.hypot(dx, dy);
          if (dist < RADIUS && dist > 0.01) {
            const f = (1 - dist / RADIUS) * 2.2;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        for (const r of ripples) {
          const rdx = d.ox - r.x;
          const rdy = d.oy - r.y;
          const rd = Math.hypot(rdx, rdy);
          const band = Math.abs(rd - r.r);
          if (band < 30 && rd > 0) {
            const f = (1 - band / 30) * 3 * r.life;
            d.vx += (rdx / rd) * f;
            d.vy += (rdy / rd) * f;
          }
        }
        d.vx += (d.ox - d.x) * 0.06;
        d.vy += (d.oy - d.y) * 0.06;
        d.vx *= 0.82;
        d.vy *= 0.82;
        d.x += d.vx;
        d.y += d.vy;
        energy += Math.abs(d.vx) + Math.abs(d.vy);
      }

      draw(mx, my, active);

      // Sleep once settled; pointer activity wakes the loop again.
      if (energy < 0.5 && ripples.length === 0) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running || !visible || reduced) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.inside = true;
      wake();
    };
    const onLeave = () => {
      pointer.inside = false;
      wake();
    };
    const onDown = (e: PointerEvent) => {
      if (!visible) return;
      const r = canvas.getBoundingClientRect();
      const y = e.clientY - r.top;
      if (y < 0 || y > r.height) return;
      if ((e.target as HTMLElement).closest("a,button,input,textarea")) return;
      ripples.push({ x: e.clientX - r.left, y, r: 0, life: 1 });
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) {
        cancelAnimationFrame(raf);
        running = false;
      }
    });

    build();
    io.observe(canvas);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none ${className}`} />;
}
