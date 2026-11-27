import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Download, UserRound } from 'lucide-react';
import type { Copy, Lang } from './content';
import Hero from './Hero';

/* Hero as a 3D camera flight: the page scroll moves a camera through glass panels
   (identity, foundation, four projects, call to action). Only this first section is 3D. */

const base = import.meta.env.BASE_URL;
const img = (f: string) => `${base}images/${f}`;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const sm = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Pose = [number, number, number, number, number, number];
const CAM: Pose[] = [
  [0, 0, 0, 0, 0, 0],
  [-230, 30, -1650, 5, 0, 0],
  [900, -70, -3250, -12, 2, -3],
  [330, -570, -4950, 9, -3, 3],
  [-1000, 300, -6450, 14, 3, -4],
  [-140, 50, -8000, -6, -2, 2],
  [0, 0, -9600, 0, 0, 0],
];
const POS: [number, number, number, number][] = [
  [0, 0, -700, 0], [-260, 40, -2300, 10], [1250, -80, -3900, -22], [300, -620, -5600, 18], [-1150, 320, -7100, 24], [-120, 60, -8600, -8], [0, 0, -10200, 0],
];
const PROJ = ['roots', 'sdc', 'inspire', 'ycim'];
const TXT = {
  en: { found: ['Chapter I', 'Foundation', 'BSc Computer Science (Software Development), UTeM. Graduated March 2026.'], end: ['Open to the right team', 'Let’s build', 'Full-time software engineering roles, from design to production.'], contact: 'Get in touch' },
  ar: { found: ['الفصل الأول', 'الأساس', 'بكالوريوس علوم الحاسوب (تطوير البرمجيات) من UTeM، تخرجت في مارس 2026.'], end: ['متاح للفريق المناسب', 'لنبنِ معاً', 'وظائف مهندس برمجيات بدوام كامل، من التصميم إلى الإنتاج.'], contact: 'تواصل معي' },
};

export default function Hero3D({ t, lang, onProfile, onOpen }: { t: Copy; lang: Lang; onProfile: () => void; onOpen: (id: string) => void }) {
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => { const m = matchMedia('(prefers-reduced-motion: reduce)'); const f = () => setReduced(m.matches); m.addEventListener('change', f); return () => m.removeEventListener('change', f); }, []);
  const sec = useRef<HTMLElement>(null), world = useRef<HTMLDivElement>(null), fade = useRef<HTMLDivElement>(null), cue = useRef<HTMLDivElement>(null);
  const panels = useRef<(HTMLElement | null)[]>([]);
  const tx = TXT[lang] || TXT.en;
  const dots = useMemo(() => { let s = 7; const r = () => (s = (s * 16807) % 2147483647) / 2147483647; return Array.from({ length: 150 }, () => ({ x: (r() - 0.5) * 3600, y: (r() - 0.5) * 2400, z: -r() * 10600 + 300, o: 0.25 + r() * 0.7 })); }, []);
  const projects = PROJ.map(id => t.projects.find(p => p.id === id)!).filter(Boolean);

  useEffect(() => {
    if (reduced || !sec.current || !world.current) return;
    const el = sec.current, w = world.current;
    let target = 0, p = -1, raf = 0, mx = 0, my = 0, tmx = 0, tmy = 0, last = performance.now();
    const prog = () => { const r = el.getBoundingClientRect(); const span = r.height - innerHeight; return span > 0 ? clamp(-r.top / span) : 0; };
    const cam = (q: number) => { const f = clamp(Number.isFinite(q) ? q : 0) * (CAM.length - 1), i = clamp(Math.floor(f), 0, CAM.length - 2), u = sm(clamp(f - i)); return CAM[i].map((v, k) => lerp(v, CAM[i + 1][k], u)); };
    const draw = () => {
      const [x, y, z, yaw, pit, roll] = cam(p);
      w.style.transform = `rotateZ(${roll}deg) rotateX(${-pit - my * 4}deg) rotateY(${-yaw + mx * 6}deg) translate3d(${-x}px,${-y}px,${-z}px)`;
      POS.forEach(([sx, sy, sz, ry], i) => {
        const d = panels.current[i]; if (!d) return;
        const dist = Math.hypot(sx - x, sy - y, (sz - z) * 0.6);
        const f = clamp(1 - (dist - 700) / 650) * clamp((-(sz - z) - 120) / 380);
        d.style.opacity = f.toFixed(3); d.style.visibility = f < 0.01 ? 'hidden' : 'visible';
        d.style.transform = `translate3d(${sx}px,${sy}px,${sz}px) translate(-50%,-50%) rotateY(${ry}deg)`;
      });
      if (fade.current) fade.current.style.opacity = String(sm(clamp((p - 0.93) / 0.07)));
      if (cue.current) cue.current.style.opacity = p > 0.02 ? '0' : '1';
    };
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      if (p < 0) p = target;
      p += (target - p) * (1 - Math.exp(-dt * 6)); mx += (tmx - mx) * 0.06; my += (tmy - my) * 0.06;
      draw();
      raf = Math.abs(target - p) > 0.0003 || Math.abs(tmx - mx) > 0.002 || Math.abs(tmy - my) > 0.002 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { target = prog(); if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    const mv = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; tmx = e.clientX / innerWidth - 0.5; tmy = e.clientY / innerHeight - 0.5; kick(); };
    addEventListener('scroll', kick, { passive: true }); addEventListener('resize', kick); addEventListener('pointermove', mv, { passive: true });
    target = prog(); p = target; draw();
    return () => { removeEventListener('scroll', kick); removeEventListener('resize', kick); removeEventListener('pointermove', mv); cancelAnimationFrame(raf); };
  }, [reduced, lang]);

  if (reduced) return <Hero t={t} lang={lang} onProfile={onProfile} />;
  const setP = (i: number) => (e: HTMLElement | null) => { panels.current[i] = e; };
  return (
    <section ref={sec} id="top" className="h3" aria-label={t.name}>
      <h1 className="sr-only">{t.name}, {t.role}</h1>
      <div className="h3-stick">
        <div className="h3-world" ref={world}>
          {dots.map((d, i) => <i key={i} className="h3-dot" style={{ transform: `translate3d(${d.x}px,${d.y}px,${d.z}px)`, opacity: d.o }} />)}
          <article ref={setP(0)} className="h3-p h3-id"><div className="h3-glass">
            <img className="h3-av" src={img('alsenwi.jpg')} alt="" />
            <span className="h3-k"><i className="live-dot" />{t.kicker}</span>
            <p className="h3-name" aria-hidden="true">{t.name}</p>
            <p className="h3-role" aria-hidden="true">{t.role}</p>
            <a href="#career" className="now-chip"><span className="nc-dot" /><span>{t.nowLine}</span></a>
            <p className="h3-sub">{t.intro}</p>
          </div></article>
          <article ref={setP(1)} className="h3-p"><div className="h3-glass"><span className="h3-big" dir="ltr">I</span><span className="h3-k">{tx.found[0]}</span><h2 className="h3-h">{tx.found[1]}</h2><p className="h3-sub">{tx.found[2]}</p>
            <dl className="h3-facts">{t.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></div></article>
          {projects.map((pr, i) => (
            <article key={pr.id} ref={setP(i + 2)} className="h3-p"><button type="button" className="h3-glass h3-proj" onClick={() => onOpen(pr.id)} aria-label={pr.name}>
              <span className="h3-big" dir="ltr">{['II', 'III', 'IV', 'V'][i]}</span>
              <span className="h3-shot"><img src={img(pr.img)} alt="" /></span>
              <span className="h3-k" dir="ltr">{pr.kind} · {pr.year}</span>
              <span className="h3-h">{pr.name}</span>
              <span className="h3-sub">{pr.line}</span>
              <span className="h3-nums">{pr.nums.slice(0, 3).map(([n, l]) => <span key={n + l}><b dir="ltr">{n}</b></span>)}</span>
              <span className="h3-go">{pr.context}<ArrowUpRight size={14} /></span>
            </button></article>
          ))}
          <article ref={setP(6)} className="h3-p"><div className="h3-glass h3-end"><span className="h3-k">{tx.end[0]}</span><h2 className="h3-h">{tx.end[1]}</h2><p className="h3-sub">{tx.end[2]}</p>
            <div className="h3-cta"><button type="button" className="btn btn-ink" onClick={onProfile}><UserRound size={16} />{t.profileBtn}</button>
              <a href={`${base}Ahmed-Alsenwi-CV.pdf`} download="Ahmed-Alsenwi-Software-Engineering-CV.pdf" className="btn btn-line"><Download size={16} />{t.cvBtn}</a>
              <a href="#contact" className="btn btn-line">{tx.contact}</a></div></div></article>
        </div>
        <div className="h3-vig" /><div className="h3-fade" ref={fade} />
        <div className="h3-cue" ref={cue} aria-hidden="true"><span>{t.scrollCue}</span><ArrowDown size={14} /></div>
      </div>
    </section>
  );
}
