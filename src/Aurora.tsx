import { useEffect, useRef } from 'react';

/** Grain gradient backdrop: two slow-drifting soft light fields over a vertical wash, with a fine film grain.
 *  Chosen from the 20-background picker (#17). Paused off-screen, 30fps, static when reduced motion is on. */

type Pal = { bg: string; bg2: string; a: string; c: string; soft: number; grain: number };
const LIGHT: Pal = { bg: '#f6f5fb', bg2: '#e9e8fb', a: '#6f8cff', c: '#ffc09a', soft: .38, grain: 20 };
const DARK: Pal = { bg: '#07070f', bg2: '#10112a', a: '#6f8cff', c: '#ffb58a', soft: .5, grain: 26 };

const rgba = (hex: string, a: number) => { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; };
const hash = (s: number) => { const x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };

export default function Aurora({ dark, className = '' }: { dark?: boolean; sun?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!; const g = c.getContext('2d'); if (!g) return;
    const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDark = () => dark ?? document.documentElement.dataset.theme === 'dark';
    let W = 0, H = 0, vis = true, raf = 0, last = 0, grainFor = -1;
    let noise: HTMLCanvasElement | null = null;
    const t0 = performance.now();
    const mkNoise = (alpha: number) => {
      const n = document.createElement('canvas'); n.width = n.height = 128; const x = n.getContext('2d')!;
      const d = x.createImageData(128, 128);
      for (let i = 0; i < d.data.length; i += 4) { const v = hash(i) * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = alpha; }
      x.putImageData(d, 0, 0); return n;
    };
    const blob = (x: number, y: number, r: number, col: string, a: number) => {
      const q = g.createRadialGradient(x, y, 0, x, y, r); q.addColorStop(0, rgba(col, a)); q.addColorStop(1, rgba(col, 0));
      g.fillStyle = q; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill();
    };
    const size = () => {
      const w = c.clientWidth, h = c.clientHeight, d = Math.min(devicePixelRatio || 1, 1.25);
      const pw = Math.round(w * d), ph = Math.round(h * d);
      if (pw !== c.width || ph !== c.height) { c.width = pw; c.height = ph; }
      W = c.width; H = c.height;
    };
    const draw = (now: number) => {
      const t = rm ? 2 : (now - t0) / 1000; const P = isDark() ? DARK : LIGHT;
      const q = g.createLinearGradient(0, 0, 0, H); q.addColorStop(0, P.bg); q.addColorStop(1, P.bg2);
      g.fillStyle = q; g.fillRect(0, 0, W, H);
      const m = Math.max(W, H);
      blob(W * (.5 + .3 * Math.sin(t * .2)), H * (.5 + .25 * Math.cos(t * .27)), m * .55, P.a, P.soft + .15);
      blob(W * (.5 - .3 * Math.cos(t * .23)), H * (.45 + .3 * Math.sin(t * .31)), m * .45, P.c, P.soft);
      if (grainFor !== P.grain) { noise = mkNoise(P.grain); grainFor = P.grain; }
      const pt = g.createPattern(noise!, 'repeat');
      if (pt) { g.save(); g.translate(-((t * 40) % 128), -((t * 23) % 128)); g.fillStyle = pt; g.fillRect(0, 0, W + 128, H + 128); g.restore(); }
    };
    const loop = (now: number) => { raf = requestAnimationFrame(loop); if (!vis || now - last < 33) return; last = now; draw(now); };
    const onResize = () => { size(); draw(performance.now()); };
    size(); draw(performance.now());
    if (!rm) raf = requestAnimationFrame(loop);
    addEventListener('resize', onResize);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { rootMargin: '120px' }); io.observe(c);
    const mo = new MutationObserver(() => draw(performance.now())); mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize); io.disconnect(); mo.disconnect(); };
  }, [dark]);
  return <canvas ref={ref} className={`aurora ${className}`} aria-hidden="true" />;
}
