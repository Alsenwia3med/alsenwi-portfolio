import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, UserRound, Route, Download, GraduationCap } from 'lucide-react';
const BASE = import.meta.env.BASE_URL + 'images/';
function FactMark({ i }: { i: number }) {
  if (i === 0) return <span className="hf-i"><img src={BASE + 'utem-sq.png'} alt="" /></span>;
  if (i === 1) return <span className="hf-i hf-grad"><GraduationCap size={20} strokeWidth={1.7} /></span>;
  return (
    <span className="hf-i hf-tr">
      <svg viewBox="0 0 32 32" aria-hidden="true"><rect x="1" y="1" width="30" height="30" rx="7" fill="#4285f4" /><text x="9" y="15" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">文</text><rect x="14" y="14" width="15" height="15" rx="4" fill="#fff" /><text x="21.5" y="26" textAnchor="middle" fontSize="12" fontWeight="800" fill="#4285f4">A</text></svg>
    </span>
  );
}
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


const DECK = [
  { img: 'roots.jpg', n: 'ROOTS-AI', k: ['Health AI', 'ذكاء صحي'], l: ['Product dashboards for a health AI company.', 'لوحات منتج لشركة ذكاء اصطناعي صحي.'] },
  { img: 'ycim.jpg', n: 'YCIM', k: ['Community', 'مجتمع'], l: ['Arabic and English portal for the Yemeni community.', 'بوابة بالعربية والإنجليزية للجالية اليمنية.'] },
  { img: 'Inspire-U.png', n: 'Inspire-U', k: ['Edtech', 'تعليم'], l: ['Student platform with about 70% of workflows automated.', 'منصة طلاب مع أتمتة نحو 70% من سير العمل.'] },
  { img: 'sdc-card.jpg', n: 'SDC', k: ['Fintech', 'تقنية مالية'], l: ['Investor platform, 450+ hours on a live product.', 'منصة مستثمرين، أكثر من 450 ساعة على منتج حي.'] },
];
/* Coverflow: position f (0..3) brings one project to the centre. Scroll drives f; the static hero auto-plays it. */
const smooth = (x: number) => x * x * (3 - 2 * x);
export function setDeck(root: HTMLElement, f: number) {
  const n = DECK.length, base = Math.floor(clamp(f, 0, n - 1 - 1e-6)), g = base + smooth(clamp(f - base));
  root.querySelectorAll<HTMLElement>('.dk-card').forEach((c, i) => { const d = i - g; c.style.setProperty('--d', d.toFixed(3)); c.style.setProperty('--ad', Math.min(1, Math.abs(d)).toFixed(3)); c.style.zIndex = String(10 - Math.round(Math.abs(d) * 2)); });
  root.querySelectorAll<HTMLElement>('.dk-c').forEach((c, i) => { c.style.setProperty('--ad', Math.abs(i - g).toFixed(3)); });
  root.style.setProperty('--pg', clamp(g / (n - 1)).toFixed(3));
  const no = root.querySelector('.dk-no'); if (no) no.textContent = '0' + (Math.round(g) + 1);
}
export function Deck({ lang, auto }: { lang: Lang; auto?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const a = lang === 'ar' ? 1 : 0;
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.dataset.f = '0'; setDeck(el, 0);
    if (!auto) return;
    let k = 0; const id = setInterval(() => { k = (k + 1) % DECK.length; setDeck(el, k); }, 3000);
    return () => clearInterval(id);
  }, [auto]);
  return (
    <div className={`iso dk-wrap${auto ? ' dk-auto' : ''}`} aria-hidden="true" ref={ref}>
      <div className="iso-shadow" />
      <div className="dk-stack">
        <div className="dk-hud" dir="ltr"><span>REEL</span><b className="dk-no">01</b><span>/ 0{DECK.length}</span></div>
        <div className="dk-prog"><i /></div>
        {DECK.map((d, i) => (
          <figure key={d.n} className="dk-card" style={{ ['--i' as any]: i }}>
            <img src={BASE + d.img} alt="" loading="eager" />
            <figcaption><b>{d.n}</b><span>{d.k[a]}</span></figcaption>
          </figure>
        ))}
      </div>
      <div className="dk-cap">{DECK.map(d => <span key={d.n} className="dk-c"><b>{d.n}</b><em>{d.l[a]}</em></span>)}</div>
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
    const deckEl = el.querySelector<HTMLElement>('.dk-wrap');
    const paint = (p: number, load: number) => {
      if (deckEl) setDeck(deckEl, clamp((p - 0.04) / 0.8) * (DECK.length - 1));
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
    let tx = 0, ty = 0, sx = 0, sy = 0, pr: number | null = null;
    const pm = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; tx = e.clientX / innerWidth * 2 - 1; ty = e.clientY / innerHeight * 2 - 1; if (pr === null) pr = requestAnimationFrame(pl); };
    const pl = () => { sx += (tx - sx) * 0.08; sy += (ty - sy) * 0.08; stage.style.setProperty('--tx', sx.toFixed(3)); stage.style.setProperty('--ty', sy.toFixed(3)); pr = Math.abs(tx - sx) + Math.abs(ty - sy) > 0.002 ? requestAnimationFrame(pl) : null; };
    addEventListener('pointermove', pm, { passive: true });
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', kick);
    kick();
    return () => { removeEventListener('pointermove', pm); if (pr !== null) cancelAnimationFrame(pr); removeEventListener('scroll', kick); removeEventListener('resize', kick); if (raf !== null) cancelAnimationFrame(raf); };
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
      <div className="h-avail"><span className="ha-pill"><i className="hf-dot" />{t.avail}</span><span className="ha-line">{t.motto}</span></div>
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
          <div className="hs-art" style={{ ['--p' as any]: 1, ['--load' as any]: 1 }}><Deck lang={lang} auto /></div>
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
            <div className="band" data-a="0" data-b="0.46" data-first="1">{ident}</div>
            <div className="band band-settle" data-a="0.54" data-b="1" data-last="1">
              <p className="settle-name">{t.name}<em>{t.role}</em></p>
              {settle}
            </div>
          </div>
          <div className="stage-art"><Deck lang={lang} /></div>
        </div>
        <div className="cue" aria-hidden="true"><span>{t.scrollCue}</span><ArrowDown size={14} /></div>
      </div>
    </section>
  );
}
