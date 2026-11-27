import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, UserRound, Route, Download, Briefcase, GraduationCap, CalendarCheck, Languages } from 'lucide-react';
const FI = [Briefcase, GraduationCap, CalendarCheck, Languages];
import type { Copy, Lang } from './content';
import Aurora from './Aurora';

/* ------------------------------------------------------------------
   Hero: an isometric system of three glass plates (Interface / Logic /
   Data). On desktop the scroll pulls the layers apart while the copy
   moves through three beats; phones, portrait tablets and reduced
   motion get a compact, fully composed static hero. Everything moves
   with transform + opacity, driven by one lerped value that rests.
------------------------------------------------------------------- */

export const GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
  '(prefers-reduced-motion: reduce)',
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => 1 - Math.pow(1 - clamp(t), 3);

function Words({ text }: { text: string }) {
  const w = text.split(' ');
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="words">
        {w.map((x, i) => <span key={i}><span className="wd" style={{ ['--th' as any]: (i / w.length) * 0.45 }}>{x}</span>{i < w.length - 1 ? ' ' : ''}</span>)}
      </span>
    </>
  );
}

/* The three plates. Pure markup, animated by CSS. */
export function Plates({ labels, notes }: { labels: string[]; notes: string[] }) {
  return (
    <div className="iso" aria-hidden="true">
      <div className="iso-shadow" />
      <div className="iso-stack">
        <div className="plate p-data" style={{ ['--i' as any]: 0 }}>
          <div className="pl-tag"><b>{labels[2]}</b><span>{notes[2]}</span></div>
          <div className="db">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="db-row" style={{ ['--r' as any]: i }}><i /><i /><i /><i /></div>
            ))}
          </div>
          <svg className="db-ico" viewBox="0 0 40 40"><ellipse cx="20" cy="9" rx="13" ry="5" /><path d="M7 9v20c0 3 6 5 13 5s13-2 13-5V9M7 19c0 3 6 5 13 5s13-2 13-5" /></svg>
        </div>
        <div className="plate p-logic" style={{ ['--i' as any]: 1 }}>
          <div className="pl-tag"><b>{labels[1]}</b><span>{notes[1]}</span></div>
          <svg className="graph" viewBox="0 0 300 300">
            <g className="edges">
              <path id="e1" d="M60 80 C120 80 120 150 150 150" />
              <path id="e2" d="M60 220 C120 220 120 150 150 150" />
              <path id="e3" d="M150 150 C190 150 190 90 240 90" />
              <path id="e4" d="M150 150 C190 150 190 210 240 210" />
              <path d="M240 90 V210" />
            </g>
            <g className="nodes">
              <circle cx="60" cy="80" r="9" /><circle cx="60" cy="220" r="9" />
              <rect x="132" y="132" width="36" height="36" rx="10" />
              <circle cx="240" cy="90" r="9" /><circle cx="240" cy="210" r="9" />
            </g>
            <circle className="pulse" r="4.5"><animateMotion dur="3.2s" repeatCount="indefinite"><mpath href="#e1" /></animateMotion></circle>
            <circle className="pulse p2" r="4.5"><animateMotion dur="3.2s" begin="-1.6s" repeatCount="indefinite"><mpath href="#e4" /></animateMotion></circle>
          </svg>
        </div>
        <div className="plate p-ui" style={{ ['--i' as any]: 2 }}>
          <div className="pl-tag"><b>{labels[0]}</b><span>{notes[0]}</span></div>
          <div className="ui">
            <div className="ui-top"><i /><i /><i /><span /></div>
            <div className="ui-body">
              <div className="ui-side"><i /><i /><i /><i /></div>
              <div className="ui-main">
                <div className="ui-kpis"><div><b /><i /></div><div><b /><i /></div><div><b /><i /></div></div>
                <div className="ui-chart">{[0.45, 0.7, 0.52, 0.86, 0.64, 0.95, 0.74].map((h, i) => <i key={i} style={{ ['--h' as any]: h, ['--d' as any]: i }} className={i === 5 ? 'hi' : ''} />)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ t, lang, onProfile }: { t: Copy; lang: Lang; onProfile: () => void }) {
  const sec = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<'scrub' | 'static'>(() => (GATES.some(q => matchMedia(q).matches) ? 'static' : 'scrub'));

  useEffect(() => {
    const mqls = GATES.map(q => matchMedia(q));
    const apply = () => setMode(mqls.some(m => m.matches) ? 'static' : 'scrub');
    mqls.forEach(m => m.addEventListener('change', apply));
    apply();
    return () => mqls.forEach(m => m.removeEventListener('change', apply));
  }, []);

  useEffect(() => {
    if (mode !== 'scrub' || !sec.current) return;
    const el = sec.current;
    const stage = el.querySelector<HTMLElement>('.stage')!;
    const bands = Array.from(el.querySelectorAll<HTMLElement>('.band')).map(b => ({ el: b, a: +b.dataset.a!, b: +b.dataset.b!, first: b.dataset.first === '1', last: b.dataset.last === '1', op: -1, k: -1 }));
    let target = 0, shown = -1, raf: number | null = null, last = performance.now(), lastP = -1;
    const t0 = performance.now();
    const progress = () => { const r = el.getBoundingClientRect(); const span = r.height - innerHeight; return span > 0 ? clamp(-r.top / span) : 0; };
    const paint = (p: number, load: number) => {
      if (Math.abs(p - lastP) > 0.0005 || load < 1) { stage.style.setProperty('--p', p.toFixed(4)); stage.style.setProperty('--load', load.toFixed(3)); lastP = p; }
      bands.forEach(B => {
        const len = B.b - B.a, r = Math.min(0.05, len * 0.28);
        const op = Math.round(Math.min(B.first ? 1 : clamp((p - B.a) / r), B.last ? 1 : clamp((B.b - p) / r)) * 1000) / 1000;
        let k = clamp((p - B.a) / (len * 0.5));
        if (B.first) k = Math.max(k, load);
        if (Math.abs(op - B.op) > 0.004) { B.el.style.opacity = String(op); B.el.style.visibility = op <= 0 ? 'hidden' : 'visible'; B.op = op; }
        if (Math.abs(k - B.k) > 0.006 || (k === 1 && B.k !== 1)) { B.el.style.setProperty('--k', k.toFixed(3)); B.k = k; }
      });
    };
    const tick = (now: number) => {
      const dt = Math.min(64, now - last) / 1000; last = now;
      const load = ease((now - t0) / 1100);
      const prev = shown < 0 ? target : shown;
      shown = prev + (target - prev) * (1 - Math.exp(-dt * 8));
      if (Math.abs(target - shown) < 0.0004) shown = target;
      paint(shown, load);
      raf = shown !== target || load < 1 ? requestAnimationFrame(tick) : null;
    };
    const kick = () => { target = progress(); if (raf === null) { last = performance.now(); raf = requestAnimationFrame(tick); } };
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    kick();
    return () => { removeEventListener('scroll', kick); removeEventListener('resize', kick); if (raf !== null) cancelAnimationFrame(raf); };
  }, [mode, lang]);

  const ident = (
    <>
      <span className="eyebrow"><i className="live-dot" />{t.kicker}</span>
      <p className="h-title" aria-hidden="true"><span className="h-a"><Words text={t.name} /></span><span className="h-b"><Words text={t.role} /></span></p>
      <a href="#career" className="now-chip"><span className="nc-dot" /><span>{t.nowLine}</span><ArrowRight size={15} className="rtl:-scale-x-100" /></a>
    </>
  );
  const settle = (
    <>
      <p className="h-sub">{t.intro}</p>
      <dl className="h-facts">{t.facts.map(([k, v], i) => { const I = FI[i]; return <div key={k} className={i === 0 ? 'hf-now' : ''} style={{ ['--i' as any]: i }}><span className="hf-i"><I size={15} strokeWidth={1.8} /></span><span className="hf-t"><dt>{k}{i === 0 && <i className="hf-dot" />}</dt><dd>{v}</dd></span></div>; })}</dl>
      <div className="h-cta">
        <button type="button" className="btn btn-ink" onClick={onProfile}><UserRound size={16} />{t.profileBtn}</button>
        <a href={`${import.meta.env.BASE_URL}Ahmed-Alsenwi-CV.pdf`} download="Ahmed-Alsenwi-Software-Engineering-CV.pdf" className="btn btn-line"><Download size={16} />{t.cvBtn}</a>
        <a href="#career" className="btn btn-line"><Route size={16} />{t.careerBtn}</a>
      </div>
    </>
  );
  const h1 = <h1 className="sr-only">{t.name}, {t.role}</h1>;

  if (mode === 'static') {
    return (
      <section ref={sec} id="top" className="hero hero-static">
        {h1}<Aurora />
        <div className="wrap hs">
          <div className="hs-copy is-static">{ident}{settle}</div>
          <div className="hs-art" style={{ ['--p' as any]: 1, ['--load' as any]: 1 }}><Plates labels={t.layers} notes={t.layerNotes} /></div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sec} id="top" className="hero hero-scrub">
      {h1}
      <div className="stage">
        <Aurora />
        <div className="wrap stage-in">
          <div className="stage-copy">
            <div className="band" data-a="0" data-b="0.32" data-first="1">{ident}</div>
            <div className="band" data-a="0.38" data-b="0.64">
              <p className="b-line"><Words text={t.b2} /></p>
              <p className="b-sub">{t.b2sub}</p>
              <ul className="b-layers">{t.layers.map((l, i) => <li key={l} style={{ ['--i' as any]: i }}><b>{l}</b><span>{t.layerNotes[i]}</span></li>)}</ul>
            </div>
            <div className="band band-settle" data-a="0.7" data-b="1" data-last="1">
              <p className="settle-name">{t.name}<em>{t.role}</em></p>
              {settle}
            </div>
          </div>
          <div className="stage-art"><Plates labels={t.layers} notes={t.layerNotes} /></div>
        </div>
        <div className="cue" aria-hidden="true"><span>{t.scrollCue}</span><ArrowDown size={14} /></div>
      </div>
    </section>
  );
}
