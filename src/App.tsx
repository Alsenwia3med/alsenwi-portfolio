import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Send, ArrowLeft, ArrowRight, Download,
  ArrowUpRight, Mail, Linkedin, Github, MessageCircle, MapPin, X, Sun, Moon, Copy as CopyIco, Check,
  LayoutDashboard, Building2, GraduationCap, PanelsTopLeft, Monitor, Server, Database, Wrench, Award, Languages, BookOpen, ArrowUp, Route, LayoutGrid, Layers, Webhook, ShieldCheck, Timer, Workflow, Briefcase, Share2, PenTool, Users, FileText, Palette, Gauge, Sparkles, ScanLine, CodeXml,
} from 'lucide-react';
import Hero from './Hero';
import Aurora from './Aurora';
import { LOGOS, ISSUERS, BRANDS } from './logos';
import { CONTACT, T, img, type Lang, type Role, type Project, type Copy } from './content';

type Theme = 'light' | 'dark';
type Modal = { kind: 'role'; id: string } | { kind: 'project'; id: string } | { kind: 'profile' } | { kind: 'edu' } | null;

function useReveal(dep: unknown) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-rv]:not(.in)'));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      el.classList.add('in'); io.unobserve(el);
      setTimeout(() => el.classList.add('settled'), 1600);
    }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function Counter({ to, suf }: { to: number; suf: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const step = (n: number) => { const k = Math.min(1, (n - t0) / 1600); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))) + suf; if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, suf]);
  return <span ref={ref}>{to + suf}</span>;
}

function Mark({ src, name, size = 48 }: { src?: string; name: string; size?: number }) {
  const [bad, setBad] = useState(!src);
  return <span className="mark" style={{ width: size, height: size }}>{!bad && src ? <img src={img(src)} alt="" onError={() => setBad(true)} loading="lazy" /> : <b>{name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()}</b>}</span>;
}
type IC = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'teal' | 'indigo' | 'graphite' | 'red' | 'yellow' | 'linkedin';
const Ico = ({ children, a = 'bob', d = 0, c = 'blue', sm }: { children: ReactNode; a?: 'bob' | 'tilt' | 'pulse' | 'spin'; d?: number; c?: IC; sm?: boolean }) => (
  <span className={`ai ai-${c} ico-${a}${sm ? ' ai-sm' : ''}`} style={{ ['--d' as any]: d }} aria-hidden="true">{children}</span>
);
const SkillIco = ({ n, c }: { n: string; c: IC }) => {
  const l = LOGOS[n];
  if (l) return <span className={`ai ai-sm ai-logo${l.inv ? ' inv' : ''}`} aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16"><path d={l.p} fill={l.inv ? 'currentColor' : l.c} /></svg></span>;
  const G = n.startsWith('REST') ? Webhook : n === 'VS Code' ? CodeXml : ShieldCheck;
  return <span className={`ai ai-sm ai-${c}`} aria-hidden="true"><G size={15} /></span>;
};
const BUL: [RegExp, typeof Mail, string][] = [
  [/email|بريد/i, Mail, 'blue'], [/referral|الإحالات/i, Share2, 'pink'], [/auth|payment|مصادقة|الدفع/i, ShieldCheck, 'green'], [/figma|design system|designs|تصميم/i, PenTool, 'orange'],
  [/\bAPIs?\b|REST|تكامل/, Webhook, 'teal'], [/automat|أتمت/i, Workflow, 'indigo'], [/dashboard|لوح/i, LayoutDashboard, 'blue'], [/student|طلاب|portal|بوابة/i, Users, 'purple'],
  [/platform|architecture|معمارية|منصة/i, Layers, 'indigo'], [/brief|feature|ميزة/i, FileText, 'orange'], [/consistent|look|هوية/i, Palette, 'pink'], [/seo|speed|سرعة/i, Gauge, 'red'],
  [/attendance|الحضور/i, ScanLine, 'teal'], [/tourist|guide|السياحي/i, MapPin, 'red'], [/homepage|landing|page|صفح/i, PanelsTopLeft, 'purple'],
];
const Bi = ({ text }: { text: string }) => { const f = BUL.find(([r]) => r.test(text)); const I = f?.[1] ?? Sparkles; return <span className={`bi bi-${f?.[2] ?? 'blue'}`} aria-hidden="true"><I size={15} strokeWidth={2.1} /></span>; };
const BrandIco = ({ k }: { k: keyof typeof BRANDS }) => {
  const b = BRANDS[k]; const light = ['#ffffff', '#fff'].includes(b.bg.toLowerCase());
  return <span className={`ai ai-brand ab-${k}`} aria-hidden="true"><svg viewBox="0 0 24 24">{k === 'linkedin' ? <><rect width="24" height="24" rx="4.6" fill="#0A66C2" /><path d={b.p} fill="#fff" transform="translate(3.6 3.6) scale(.7)" /></> : <path d={b.p} fill={k === 'github' ? 'currentColor' : light ? b.fg : b.bg} />}</svg></span>;
};
const Decor = ({ v }: { v: 'a' | 'b' | 'c' | 'd' }) => (
  <div className={`decor decor-${v}`} aria-hidden="true"><i className="dc-ring" /><i className="dc-orb" /><i className="dc-plus" /><i className="dc-dia" /><i className="dc-dots" /><i className="dc-line" /></div>
);
const Clock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => { const id = setInterval(() => setNow(new Date()), 15000); return () => clearInterval(id); }, []);
  const tm = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Kuala_Lumpur' }).format(now);
  return <span dir="ltr">{tm}</span>;
};

const STORY_EN: [string, string, string][] = [
  ['I', 'Foundation', 'BSc Computer Science at UTeM. Graduated March 2026, with the habits of an engineer and the eye of a designer.'],
  ['II', 'Craft', 'Interfaces designed and engineered end to end. React, Next.js, Tailwind, PHP, Python and SQL, shipped as one system.'],
  ['III', 'Systems', 'Fintech at Six Digit Club: an investor portal, referral tracking, payments and email automation on a live platform.'],
  ['IV', 'Impact', 'Health AI at ROOTS-AI: dashboards for individuals, clinics and universities, held to a release-grade standard.'],
  ['V', 'Now', 'Building what comes next from Kuala Lumpur. Open to the right team.'],
];
const STORY_AR: [string, string, string][] = [
  ['I', 'الأساس', 'بكالوريوس علوم الحاسوب من UTeM، تخرجت في مارس 2026 بعقلية مهندس وعين مصمم.'],
  ['II', 'الحرفة', 'واجهات تُصمَّم وتُبنى من الفكرة إلى الإطلاق: React وNext.js وTailwind وPHP وPython وSQL كنظام واحد.'],
  ['III', 'الأنظمة', 'تقنية مالية في Six Digit Club: بوابة مستثمرين وتتبع الإحالات والدفع وأتمتة البريد على منصة حية.'],
  ['IV', 'الأثر', 'ذكاء صحي في ROOTS-AI: لوحات للأفراد والعيادات والجامعات بمعيار جاهزية الإصدار.'],
  ['V', 'الآن', 'أبني ما هو قادم من كوالالمبور. متاح للفريق المناسب.'],
];
function Story({ lang }: { lang: string }) {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const rows = lang === 'ar' ? STORY_AR : STORY_EN;
  useEffect(() => {
    const el = ref.current!; let raf = 0;
    const run = () => { raf = 0; const r = el.getBoundingClientRect(); const span = r.height - innerHeight; const p = Math.min(1, Math.max(0, -r.top / span)); el.style.setProperty('--sp', p.toFixed(4)); setI(Math.min(rows.length - 1, Math.floor(p * rows.length))); };
    const on = () => { if (!raf) raf = requestAnimationFrame(run); };
    addEventListener('scroll', on, { passive: true }); addEventListener('resize', on); run();
    return () => { removeEventListener('scroll', on); removeEventListener('resize', on); cancelAnimationFrame(raf); };
  }, [rows.length]);
  return (
    <section ref={ref} id="story" className="story" aria-label={lang === 'ar' ? 'القصة' : 'The story'} style={{ ['--n' as any]: rows.length }}>
      <div className="st-stick">
        <Aurora dark className="st-bg" />
        <div className="st-vig" />
        <div className="st-top"><span>{lang === 'ar' ? 'فيلم قصير' : 'The film'}</span><span dir="ltr">0{i + 1} / 0{rows.length}</span></div>
        <div className="st-scenes">
          {rows.map(([n, h, b], k) => (
            <article key={n} className={`st-sc${k === i ? ' on' : k < i ? ' past' : ''}`} aria-hidden={k !== i}>
              <span className="st-num" dir="ltr">{n}</span>
              <h2 className="st-h">{lang === 'ar' ? <span style={{ ['--j' as any]: 0 }}>{h}</span> : h.split('').map((c, j) => <span key={j} style={{ ['--j' as any]: j }}>{c}</span>)}</h2>
              <p className="st-p">{b}</p>
            </article>
          ))}
        </div>
        <div className="st-bar"><i style={{ transform: `scaleX(${(i + 1) / rows.length})` }} /></div>
      </div>
    </section>
  );
}
function Intro({ lang }: { lang: string }) {
  const [ph, setPh] = useState<'on' | 'out' | 'off'>(() => (matchMedia('(prefers-reduced-motion: reduce)').matches || /nointro/.test(location.search) ? 'off' : 'on'));
  useEffect(() => {
    if (ph === 'off') return;
    document.documentElement.classList.add('intro-lock');
    const a = setTimeout(() => setPh('out'), 3000), b = setTimeout(() => setPh('off'), 4100);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  useEffect(() => { if (ph === 'off') document.documentElement.classList.remove('intro-lock'); }, [ph]);
  if (ph === 'off') return null;
  const name = 'Ahmed Al-Senwi';
  return (
    <div className={`intro ${ph}`} onClick={() => setPh('out')} role="presentation">
      <div className="in-l" /><div className="in-r" />
      <div className="in-c">
        <svg className="in-mark" viewBox="0 0 80 80" aria-hidden="true"><circle cx="40" cy="40" r="37" /><path d="M24 56 40 22l16 34M30 46h20" /></svg>
        <div className="in-name" dir="ltr" aria-label={name}>{name.split('').map((c, j) => <span key={j} style={{ ['--j' as any]: j }}>{c === ' ' ? '\u00a0' : c}</span>)}</div>
        <div className="in-sub">{lang === 'ar' ? 'مهندس برمجيات · كوالالمبور' : 'Software Engineer · Kuala Lumpur'}</div>
        <div className="in-line"><i /></div>
      </div>
    </div>
  );
}
const SKC: IC[] = ['blue', 'green', 'orange', 'purple'];

const Wd = ({ s, o = 0 }: { s: string; o?: number }) => <>{s.split(' ').map((w, i) => <span className="rw" key={i}><span style={{ ['--w' as any]: i + o }}>{w}</span>{' '}</span>)}</>;
const H2 = ({ p, id, xl }: { p: [string, string]; id: string; xl?: boolean }) => <h2 id={id} className={`h2${xl ? ' h2-xl' : ''}`}><Wd s={p[0]} /> <em><Wd s={p[1]} o={p[0].split(' ').length} /></em></h2>;
const SecHead = ({ k, n, p, id, sub, chap }: { k: string; n: number; p: [string, string]; id: string; sub?: string; chap: string }) => (
  <div className="sec-head" data-rv data-n={`0${n}`}>
    <div className="sh-top"><span className="eyebrow">{k}</span><span className="sh-n" dir="ltr">{chap} 0{n}<i>/</i>05</span></div>
    <H2 p={p} id={id} />
    {sub && <p className="lede">{sub}</p>}
  </div>
);

const Curtain = ({ name, role }: { name: string; role: string }) => {
  const [st, setSt] = useState<'in' | 'out' | 'gone'>(() => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 'gone' : 'in'));
  useEffect(() => { if (st === 'gone') return; const a = setTimeout(() => setSt('out'), 1500), b = setTimeout(() => setSt('gone'), 2600); return () => { clearTimeout(a); clearTimeout(b); }; }, []);
  if (st === 'gone') return null;
  return <div className={`curtain ${st}`} aria-hidden="true"><i className="cu-t" /><i className="cu-b" /><div className="cu-c"><span>{role}</span><b>{name}</b><em /></div></div>;
};



const Reel = ({ t, onOpen }: { t: Copy; onOpen: (id: string) => void }) => {
  const sec = useRef<HTMLElement>(null), trk = useRef<HTMLDivElement>(null), bar = useRef<HTMLSpanElement>(null), cnt = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const s = sec.current!, tr = trk.current!; const slides = Array.from(tr.children) as HTMLElement[];
    const img = (sl: HTMLElement) => sl.querySelector('img') as HTMLElement;
    const mq = matchMedia('(min-width:1px)'), rm = matchMedia('(prefers-reduced-motion: reduce)');
    let on = false, raf = 0, max = 0, rtl = false, vis = true, idx = -1;
    const measure = () => { rtl = getComputedStyle(document.documentElement).direction === 'rtl'; max = Math.max(0, tr.scrollWidth - tr.parentElement!.clientWidth); s.style.setProperty('--reel-h', `${Math.round(max * (innerWidth < 700 ? .9 : 1.05) + innerHeight)}px`); };
    const frame = () => {
      raf = requestAnimationFrame(frame); if (!vis) return;
      const r = s.getBoundingClientRect(), span = s.offsetHeight - innerHeight, p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
      tr.style.transform = `translate3d(${(document.documentElement.dir === 'rtl' ? 1 : -1) * max * p}px,0,0)`;
      if (bar.current) bar.current.style.transform = `scaleX(${p.toFixed(4)})`;
      const vw = innerWidth;
      slides.forEach(sl => { const b = sl.getBoundingClientRect(); const o = (b.left + b.width / 2 - vw / 2) / vw; img(sl).style.transform = `translate3d(${(o * -2.5).toFixed(2)}%,0,0) scale(1)`; });
      const i = Math.round(p * (slides.length - 1));
      if (i !== idx) { idx = i; if (cnt.current) cnt.current.textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`; slides.forEach((sl, j) => sl.classList.toggle('is-on', j === i)); }
    };
    const setup = () => {
      const should = mq.matches && !rm.matches;
      if (should && !on) { on = true; s.classList.add('is-pinned'); measure(); raf = requestAnimationFrame(frame); }
      else if (!should && on) { on = false; cancelAnimationFrame(raf); s.classList.remove('is-pinned'); s.style.removeProperty('--reel-h'); tr.style.transform = ''; slides.forEach(sl => { img(sl).style.transform = ''; sl.classList.remove('is-on'); }); idx = -1; }
      else if (on) measure();
    };
    setup(); addEventListener('resize', setup); mq.addEventListener('change', setup);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { rootMargin: '200px' }); io.observe(s);
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', setup); mq.removeEventListener('change', setup); io.disconnect(); };
  }, [t.dir]);
  const n = t.projects.length;
  return (
    <section ref={sec} id="projects" className="projects reel" aria-labelledby="pr-h">
      <div className="reel-stick">
        <Aurora dark sun={false} />
        <div className="wrap reel-head" data-rv>
          <div><span className="eyebrow">{t.prK}</span><H2 p={t.prH} id="pr-h" /></div>
          <span className="reel-count" dir="ltr"><span ref={cnt}>01 / {String(n).padStart(2, '0')}</span></span>
        </div>
        <div className="reel-view">
          <div className="reel-track" ref={trk}>
            {t.projects.map((p, i) => (
              <button key={p.id} type="button" className="reel-slide" onClick={() => onOpen(p.id)} aria-haspopup="dialog">
                <span className="rs-img"><span className={`rs-in${p.logo ? ' is-logo' : ''}`} style={{ ['--im' as any]: `url(${img(p.img)})` }}><img src={img(p.img)} alt="" loading="lazy" /></span>{i === 0 && <em className="badge rs-badge"><i />{t.featured}</em>}</span>
                <span className="rs-cap">
                  <span className="rs-meta" dir="ltr"><span>No. {String(i + 1).padStart(2, '0')}</span><span>{p.kind}</span><span>{p.year}</span>{p.href && <span className="pc-live"><i />{t.live}</span>}</span>
                  <b>{p.name}</b>
                  <span className="rs-line">{p.line}</span>
                  <span className="rs-go">{p.context}<ArrowUpRight size={14} className="rtl:-scale-x-100" /></span>
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="wrap reel-foot"><span className="reel-bar"><span ref={bar} /></span><span className="reel-hint">{t.reelHint}</span></div>
      </div>
    </section>
  );
};

const q = (k: string) => { try { return new URLSearchParams(location.search).get(k); } catch { return null; } };
const initLang = (): Lang => { const v = q('lang'); if (v === 'ar' || v === 'en') return v; try { return (localStorage.getItem('lang') as Lang) || (navigator.language.startsWith('ar') ? 'ar' : 'en'); } catch { return 'en'; } };
const initTheme = (): Theme => { const v = q('theme'); if (v === 'dark' || v === 'light') return v; try { const s = localStorage.getItem('theme'); if (s === 'dark' || s === 'light') return s; } catch {} return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; };

const TLC: [string, string][] = [['#6f8cff', '#2f3cff'], ['#ffb547', '#ff8200'], ['#c892ff', '#8b3fe6'], ['#5fe3d8', '#0ea5b7']];
const MAP0 = 2022.5, MAP1 = 2027.0, NOW = 2026.9;
const pos = (y: number) => ((y - MAP0) / (MAP1 - MAP0)) * 100;

export default function App() {
  const [lang, setLang] = useState<Lang>(initLang);
  const [theme, setTheme] = useState<Theme>(initTheme);
  const [modal, setModal] = useState<Modal>(null);
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [isl, setIsl] = useState<{ k: number; icon: ReactNode; text: string; out?: boolean } | null>(null);
  const islT = useRef<number[]>([]);
  const sheet = useRef<HTMLDivElement>(null);
  const gy = useRef<number | null>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const t = T[lang];

  useEffect(() => { document.documentElement.lang = lang; document.documentElement.dir = t.dir; try { localStorage.setItem('lang', lang); } catch {} }, [lang, t.dir]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'dark' ? '#0b0b0d' : '#f6f6f3');
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const d = e.data; if (!d || typeof d !== 'object') return;
      if (d.type === 'set-lang' && (d.lang === 'en' || d.lang === 'ar')) setLang(d.lang);
      if (d.type === 'set-theme' && (d.theme === 'light' || d.theme === 'dark')) setTheme(d.theme);
    };
    const vis = () => document.body.classList.toggle('paused', document.hidden);
    const sc = () => {
      setScrolled(scrollY > 24);
      const max = document.documentElement.scrollHeight - innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
      let cur = '';
      for (const id of ['career', 'projects', 'build', 'skills', 'contact']) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top < innerHeight * 0.4) cur = id; }
      setActive(cur);
    };
    const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
    let lastTilt: HTMLElement | null = null;
    const TILT = '.pcard,.pfeat,.skc,.role-card,.ed-main';
    const spot = (e: PointerEvent) => {
      const tg = e.target as HTMLElement;
      const el = tg?.closest?.('.lux') as HTMLElement | null;
      if (el) { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', `${e.clientX - r.left}px`); el.style.setProperty('--my', `${e.clientY - r.top}px`); }
      if (!fine) return;
      const tl = tg?.closest?.(TILT) as HTMLElement | null;
      if (lastTilt && lastTilt !== tl) { lastTilt.style.removeProperty('--rx'); lastTilt.style.removeProperty('--ry'); }
      lastTilt = tl;
      if (tl) { const r = tl.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5; tl.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`); tl.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`); }
    };
    const tap = (e: PointerEvent) => {
      const el = (e.target as HTMLElement)?.closest?.('.btn,.pcard,.pfeat,.role-card,.mrow-btn,.ed-main,.dk,.ctl a,.icon-btn,.sw,.seg button') as HTMLElement | null;
      if (!el) return;
      try { navigator.vibrate?.(7); } catch {}
      if (el.classList.contains('btn')) {
        const r = el.getBoundingClientRect(); const s = document.createElement('span'); s.className = 'rpl';
        const d = Math.max(r.width, r.height) * 2; s.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX - r.left - d / 2}px;top:${e.clientY - r.top - d / 2}px`;
        el.appendChild(s); setTimeout(() => s.remove(), 700);
      }
    };
    addEventListener('pointerdown', tap, { passive: true });
    // magnetic buttons (fine pointers only)
    let mag: HTMLElement | null = null;
    const magMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const el = (e.target as HTMLElement).closest?.('.btn') as HTMLElement | null;
      if (mag && mag !== el) { mag.style.translate = ''; mag = null; }
      if (!el) return; mag = el; const r = el.getBoundingClientRect();
      el.style.translate = `${Math.max(-7, Math.min(7, (e.clientX - r.left - r.width / 2) * .16))}px 0`;
    };
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) addEventListener('pointermove', magMove, { passive: true });
    addEventListener('message', onMsg); document.addEventListener('visibilitychange', vis); addEventListener('scroll', sc, { passive: true }); sc();
    return () => { removeEventListener('message', onMsg); document.removeEventListener('visibilitychange', vis); removeEventListener('scroll', sc); removeEventListener('pointerdown', tap); removeEventListener('pointermove', magMove); };
  }, []);
  useEffect(() => {
    const root = document.documentElement; let raf = 0;
    const sc = () => { raf = 0; const h = root.scrollHeight - innerHeight; root.style.setProperty('--sprog', String(h > 0 ? scrollY / h : 0)); };
    const on = () => { if (!raf) raf = requestAnimationFrame(sc); };
    const mv = (e: PointerEvent) => { root.style.setProperty('--mx', e.clientX + 'px'); root.style.setProperty('--my', e.clientY + 'px'); };
    const scr = () => root.classList.toggle('scrolled', scrollY > 30);
    const MS = '.btn,.cf-send,.cf-wa,.cf-topics button,.ct-icons>a,.ct-icons>button,.top-nav a,.ctl a,.rc-more,.nav-cta';
    let mt: HTMLElement | null = null, tx = 0, ty = 0, cx = 0, cy = 0, mr = 0;
    const mloop = () => { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; if (mt) mt.style.translate = `${cx.toFixed(2)}px ${cy.toFixed(2)}px`; if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) mr = requestAnimationFrame(mloop); else { mr = 0; if (!tx && !ty && mt) { mt.style.translate = ''; mt = null; } } };
    const mm = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; const el = (e.target as HTMLElement)?.closest?.(MS) as HTMLElement | null; if (el !== mt && mt) { mt.style.translate = ''; cx = cy = tx = ty = 0; } if (!el) { tx = ty = 0; if (mt && !mr) mr = requestAnimationFrame(mloop); return; } mt = el; const r = el.getBoundingClientRect(); tx = (e.clientX - (r.left + r.width / 2)) * 0.28; ty = (e.clientY - (r.top + r.height / 2)) * 0.34; if (!mr) mr = requestAnimationFrame(mloop); };
    addEventListener('scroll', on, { passive: true }); addEventListener('scroll', scr, { passive: true }); addEventListener('pointermove', mv, { passive: true }); addEventListener('pointermove', mm, { passive: true }); sc(); scr();
    return () => { removeEventListener('scroll', on); removeEventListener('scroll', scr); removeEventListener('pointermove', mv); removeEventListener('pointermove', mm); cancelAnimationFrame(mr); };
  }, []);
  useEffect(() => { try { if (parent !== window) parent.postMessage({ type: 'state', lang, theme }, '*'); } catch {} }, [lang, theme]);
  useEffect(() => {
    const d = dlg.current; if (!d) return;
    if (modal && !d.open) { d.showModal(); document.documentElement.classList.add('modal-open'); }
    if (!modal && d.open) { d.close(); }
    if (!modal) document.documentElement.classList.remove('modal-open');
  }, [modal]);
  const say = (icon: ReactNode, text: string) => {
    islT.current.forEach(clearTimeout); const k = Date.now();
    setIsl({ k, icon, text });
    islT.current = [window.setTimeout(() => setIsl(v => v && { ...v, out: true }), 1900), window.setTimeout(() => setIsl(null), 2300)];
  };
  const toggleTheme = () => { const n: Theme = theme === 'dark' ? 'light' : 'dark'; setTheme(n); say(n === 'dark' ? <Moon size={14} /> : <Sun size={14} />, n === 'dark' ? t.themeDark : t.themeLight); };
  const pickLang = (l: Lang) => { if (l === lang) return; setLang(l); say(<Languages size={14} />, l === 'ar' ? 'العربية' : 'English'); };
  const gDown = (e: React.PointerEvent<HTMLDivElement>) => { gy.current = e.clientY; e.currentTarget.setPointerCapture(e.pointerId); if (sheet.current) sheet.current.style.transition = 'none'; };
  const gMove = (e: React.PointerEvent<HTMLDivElement>) => { if (gy.current === null || !sheet.current) return; sheet.current.style.transform = `translateY(${Math.max(0, e.clientY - gy.current)}px)`; };
  const gUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (gy.current === null || !sheet.current) return; const dy = e.clientY - gy.current; gy.current = null;
    const el = sheet.current; el.style.transition = 'transform .4s var(--ease)';
    if (dy > 90) { setModal(null); setTimeout(() => { el.style.transform = ''; el.style.transition = ''; }, 60); } else { el.style.transform = ''; setTimeout(() => { el.style.transition = ''; }, 420); }
  };

  useReveal(lang);

  const waPlain = `https://wa.me/${CONTACT.wa}`;
  const [topic, setTopic] = useState(0);
  const sendVia = (how: 'mail' | 'wa', f: HTMLFormElement) => {
    const n = (f.elements.namedItem('n') as HTMLInputElement).value.trim(), m = (f.elements.namedItem('m') as HTMLTextAreaElement).value.trim();
    if (!n || !m) { say(<ShieldCheck size={14} />, t.fErr); (f.querySelector(n ? 'textarea' : 'input[name=n]') as HTMLElement | null)?.focus(); return; }
    const subj = t.fTopics[topic], text = `${t.fHi},\n${m}\n\n— ${n}`;
    say(<Send size={14} />, t.fOk);
    if (how === 'mail') location.href = `mailto:${CONTACT.mail}?subject=${encodeURIComponent(`${subj} · ${n}`)}&body=${encodeURIComponent(text)}`;
    else window.open(`https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(`[${subj}] ${text}`)}`, '_blank', 'noopener');
  };
  const copyMail = async () => { try { await navigator.clipboard.writeText(CONTACT.mail); setCopied(true); say(<Check size={14} />, t.copied); setTimeout(() => setCopied(false), 1800); } catch {} };
  const xp = [
    ...t.roles.map(r => ({ key: r.id, kind: 'work' as const, now: r.current, tag: r.tag, year: Math.floor(r.date), logo: r.logo, org: r.org, role: r.role, when: r.when, place: r.place, pts: r.pts, nums: r.x.nums.slice(0, 3), open: () => setModal({ kind: 'role', id: r.id }) })),
    { key: 'edu', kind: 'edu' as const, now: false, tag: '', year: 2022, logo: 'utem-sq.png', org: 'UTeM', role: t.degree, when: t.edWhen, place: t.edPlace, pts: t.edProj, open: () => setModal({ kind: 'edu' }) },
  ];

  const RoleBody = ({ r }: { r: Role }) => (
    <>
      <div className="md-head">
        <Mark src={r.logo} name={r.org} size={56} />
        <div><span className="md-k">{r.current ? <em className="badge"><i />{t.current}</em> : r.when}</span><h2 id="md-title">{r.role}</h2><p className="md-org">{r.org} · {r.place}</p></div>
      </div>
      <dl className="rb-facts">{r.x.facts.map(([k, v], i) => <div key={k} style={{ ['--i' as any]: i }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <p className="md-about">{r.about}</p>
      <div className={`md-nums n${Math.min(r.x.nums.length, 3)}`}>{r.x.nums.map(([n, l], i) => <div key={l} style={{ ['--i' as any]: i }}><b dir="ltr">{n}</b><span>{l}</span></div>)}</div>
      <h3 className="md-sub">{t.whatIDid}</h3>
      <div className="rb-tbl" role="table">
        <div className="rb-th" role="row"><span role="columnheader">{t.tblA}</span><span role="columnheader">{t.tblB}</span><span role="columnheader">{t.tblC}</span></div>
        {r.x.table.map(([a, b2, c], i) => <div className="rb-tr" role="row" key={a} style={{ ['--i' as any]: i }}><b role="cell"><Bi text={a + ' ' + b2} />{a}</b><span role="cell">{b2}</span><em role="cell">{c}</em></div>)}
      </div>
      {r.stack.length > 0 && <><h3 className="md-sub">{t.stackT}</h3><ul className="chips">{r.stack.map(s => <li key={s}>{s}</li>)}</ul></>}
      {r.href && <a className="btn btn-ink md-cta" href={r.href} target="_blank" rel="noreferrer">{t.visit}<ArrowUpRight size={16} className="rtl:-scale-x-100" /></a>}
    </>
  );
  const ProjectBody = ({ p }: { p: Project }) => (
    <>
      <div className={`md-img${p.logo ? ' is-logo' : ''}`} style={{ ['--im' as any]: `url(${img(p.img)})` }}><img src={img(p.img)} alt="" /></div>
      <span className="md-k">{p.kind} · <bdi dir="ltr">{p.year}</bdi> · {p.context}</span>
      <h2 id="md-title">{p.name}</h2>
      <p className="md-role"><i />{t.roleK}<b>{p.role}</b></p>
      <h3 className="md-sub">{t.aboutK}</h3>
      <p className="md-story">{p.story}</p>
      {p.nums.length > 0 && <div className={`md-nums n${p.nums.length}`}>{p.nums.map(([n, l], i) => <div key={n + l} style={{ ['--i' as any]: i }}><b dir="ltr">{n}</b><span>{l}</span></div>)}</div>}
      <h3 className="md-sub">{t.whatIDid}</h3>
      <ul className="md-list">{p.did.map((x, i) => <li key={x} style={{ ['--i' as any]: i }}><Bi text={x} /><span className="md-t"><b>{x}</b>{p.didd[i] && <em>{p.didd[i]}</em>}</span></li>)}</ul>
      {p.stack.length > 0 && <><h3 className="md-sub">{t.stackT}</h3><ul className="chips">{p.stack.map(s => <li key={s}>{s}</li>)}</ul></>}
      {p.href && <a className="btn btn-ink md-cta" href={p.href} target="_blank" rel="noreferrer">{t.visit}<ArrowUpRight size={16} className="rtl:-scale-x-100" /></a>}
    </>
  );
  const EduBody = () => (
    <>
      <div className="md-head">
        <Mark src="utem-sq.png" name="UTeM" size={56} />
        <div><span className="md-k">{t.edWhen}</span><h2 id="md-title">{t.degree}</h2><p className="md-org">{t.uni}</p></div>
      </div>
      <p className="md-about">{t.faculty}. {t.edPlace}.</p>
      <h3 className="md-sub">{t.edProjK}</h3>
      <ul className="md-list">{t.edProj.map((x, i) => <li key={x} style={{ ['--i' as any]: i }}><Bi text={x} />{x}</li>)}</ul>
      <a className="btn btn-ink md-cta" href="https://www.utem.edu.my/" target="_blank" rel="noreferrer">utem.edu.my<ArrowUpRight size={16} className="rtl:-scale-x-100" /></a>
    </>
  );
  const ProfileBody = () => (
    <>
      <div className="md-head">
        <img className="md-avatar" src={img('alsenwi.jpg')} alt="" />
        <div><span className="md-k">{t.qpK}</span><h2 id="md-title">{t.name}</h2><p className="md-org">{t.role} · {t.loc}</p></div>
      </div>
      <dl className="qp">{t.qpRows.map(([k, v], i) => <div key={k} style={{ ['--i' as any]: i }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <div className="qp-links">
        <a href={`mailto:${CONTACT.mail}`} className="btn btn-ink"><Mail size={16} />{CONTACT.mail}</a>
        <a href={`${import.meta.env.BASE_URL}Ahmed-Alsenwi-CV.pdf`} download="Ahmed-Alsenwi-Software-Engineering-CV.pdf" className="btn btn-line"><Download size={16} />{t.cvBtn}</a>
        <a href={CONTACT.li} target="_blank" rel="noreferrer" className="btn btn-line" aria-label="LinkedIn"><Linkedin size={16} /></a>
        <a href={CONTACT.gh} target="_blank" rel="noreferrer" className="btn btn-line" aria-label="GitHub"><Github size={16} /></a>
      </div>
    </>
  );

  const modalBody = () => {
    if (!modal) return null;
    if (modal.kind === 'role') { const r = t.roles.find(x => x.id === modal.id); return r ? <RoleBody r={r} /> : null; }
    if (modal.kind === 'project') { const p = t.projects.find(x => x.id === modal.id); return p ? <ProjectBody p={p} /> : null; }
    if (modal.kind === 'edu') return <EduBody />;
    return <ProfileBody />;
  };

  return (
    <>
      <Curtain name={t.name} role={t.role} />
      <a href="#main" className="skip">{t.skip}</a>
      <div className="env" aria-hidden="true"><div className="env-a" /><div className="env-b" /><div className="env-dots" /></div>

      <nav className="rail" aria-label="Chapters">{[...t.nav, ['contact', t.contactBtn] as [string, string]].map(([id, label], i) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-label={label}><span>{label}</span><i>{String(i + 1).padStart(2, '0')}</i></a>)}</nav>
      <Intro lang={lang} />
      <div className="sprog" aria-hidden="true"><i /></div>
      <header className={`top${scrolled ? ' is-scrolled' : ''}`}>
        <div className="top-in">
          <a href="#top" className="brand"><img src={img('alsenwi.jpg')} alt="" width={30} height={30} /><span>{t.name}</span></a>
          <nav aria-label="Primary" className="top-nav">{t.nav.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={active === id ? 'true' : undefined}>{label}</a>)}</nav>
          <div className="top-act">
            <button type="button" role="switch" aria-checked={theme === 'dark'} className="sw" onClick={toggleTheme} aria-label={theme === 'dark' ? t.themeLight : t.themeDark} title={theme === 'dark' ? t.themeLight : t.themeDark}>
              <Sun size={13} className="sw-s" /><Moon size={13} className="sw-m" /><i />
            </button>
            <div className="seg" role="group" aria-label="Language">
              <button type="button" aria-pressed={lang === 'en'} onClick={() => pickLang('en')}>EN</button>
              <button type="button" aria-pressed={lang === 'ar'} onClick={() => pickLang('ar')} lang="ar">ع</button>
              <span className="seg-k" aria-hidden="true" />
            </div>
            <a href="#contact" className="btn btn-ink btn-sm top-cta">{t.contactBtn}</a>
          </div>
          <span className="top-bar" aria-hidden="true"><span ref={bar} /></span>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <Hero key={lang} t={t} lang={lang} onProfile={() => setModal({ kind: 'profile' })} />

        <section className="stats" aria-label="Numbers">
          <div className="wrap stats-in" data-rv>
            {t.stats.map(([n, s, l], i) => <div key={l} className="stat" style={{ ['--i' as any]: i }}>{[<Ico a="pulse" c="green" sm><Timer size={14} /></Ico>, <Ico a="bob" c="orange" sm><Workflow size={14} /></Ico>, <SkillIco n="Figma" c="pink" />, <Ico a="tilt" c="indigo" sm><Briefcase size={14} /></Ico>][i]}<span className="stat-n" dir="ltr"><Counter to={+n} suf={s} /></span><span className="stat-l">{l}</span></div>)}
          </div>
        </section>

        <div className="marq" aria-hidden="true" dir="ltr"><div className="marq-in">{[0, 1, 2, 3].flatMap(r => t.marq.map((x, i) => <span key={r + '-' + i} className={i % 2 ? 'o' : ''}>{x}<i /></span>))}</div></div>

        {/* EXPERIENCE + EDUCATION */}
        <section id="career" className="sec xp" aria-labelledby="career-h">
          <div className="wrap">
            <SecHead chap={t.chap} k={t.jK} n={1} p={t.jH} id="career-h" sub={t.jSub} />
            <div className="xp-grid">
              <aside className="xp-side" data-rv>
                <div className="xs-top"><img className="xs-av" src={img('alsenwi.jpg')} alt="" /><div><b>{t.name}</b><span>{t.role}</span></div></div>
                <dl>{t.xpRows.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
                <a href={`${import.meta.env.BASE_URL}Ahmed-Alsenwi-CV.pdf`} download="Ahmed-Alsenwi-Software-Engineering-CV.pdf" className="btn btn-sm xs-cv"><Download size={15} />{t.cvBtn}</a>
                <button type="button" className="btn btn-sm" onClick={() => setModal({ kind: 'profile' })}>{t.qpK}<ArrowUpRight size={15} className="rtl:-scale-x-100" /></button>
              </aside>
              <ol className="xp-list" data-rv>
                {xp.map((e, i) => (
                  <li key={e.key} className={`xp-item xp-${e.kind}`} style={{ ['--i' as any]: i }}>
                    <span className="xp-year" dir="ltr">{e.year}</span>
                    <span className="xp-node"><Mark src={e.logo} name={e.org} size={44} /></span>
                    <button type="button" className="xp-card" data-cur={t.open} onClick={e.open} aria-haspopup="dialog">
                      <span className="xp-tag">{e.kind === 'edu' ? t.xpEdu : t.xpWork}{e.now && <><i className="live-dot" />{t.current}</>}{e.tag && <>{' · '}{e.tag}</>}</span>
                      <b className="xp-org">{e.org}</b>
                      <span className="xp-role">{e.role}</span>
                      <span className="xp-meta"><time>{e.when}</time><i aria-hidden="true" />{e.place}</span>
                      {(e as any).nums ? <span className="xp-nums">{((e as any).nums as [string, string][]).map(([n, l]) => <span key={l}><b dir="ltr">{n}</b>{l}</span>)}</span> : <span className="xp-pts">{e.pts.slice(0, 3).map(x => <span key={x}><Bi text={x} />{x}</span>)}</span>}
                      <span className="rc-more">{t.open}<ArrowUpRight size={14} className="rtl:-scale-x-100" /></span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>
            <div className="cred" data-rv>
              <div className="ed-cert lux">
                <span className="ed-k"><Ico a="pulse" c="orange"><Award size={18} /></Ico>{t.certK}</span>
                <ul>{t.certs.map(([n, by, d]) => { const l = ISSUERS[by]; return <li key={n}><a href={`${CONTACT.li}details/certifications/`} target="_blank" rel="noreferrer" className="cert-a" aria-label={`${t.certView}: ${n}`}>{l ? <span className="ai ai-logo" aria-hidden="true"><svg viewBox="0 0 24 24"><path d={l.p} fill={l.c} /></svg></span> : <BrandIco k="linkedin" />}<b>{n}</b><span className="by">{by}</span><time>{d}</time><i className="cert-go"><Linkedin size={12} />{t.certView}<ArrowUpRight size={12} className="rtl:-scale-x-100" /></i></a></li>; })}</ul>
              </div>
              <div className="ed-lang lux">
                <span className="ed-k"><Ico a="bob" d={2} c="teal"><Languages size={18} /></Ico>{t.langK}</span>
                <ul>{t.langs.map(([n, l], i) => <li key={n} style={{ ['--lv' as any]: [1, .86, .6, .2][i], ['--i' as any]: i }}><span className={`ai ai-sm ai-${(['green', 'blue', 'orange', 'red'] as IC[])[i]}`} aria-hidden="true"><i>{['AR', 'EN', 'MS', 'DE'][i]}</i></span><b>{n}</b><span className="lv-t">{l}</span><i className="lv-bar" aria-hidden="true" /></li>)}</ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS: film reel */}
        <Reel t={t} onOpen={id => setModal({ kind: 'project', id })} />

        {/* SKILLS */}
        {/* CAPABILITIES */}
        <section id="build" className="sec build" aria-labelledby="bd-h">
          <div className="wrap">
            <SecHead chap={t.chap} k={t.bdK} n={3} p={t.bdH} id="bd-h" sub={t.bdSub} />
            <div className="bd-grid" data-rv>
              {t.bd.map(([id, title, desc, num, lab, ps], i) => {
                const I = ({ dash: LayoutDashboard, plat: Layers, site: PanelsTopLeft, auto: Workflow } as Record<string, typeof Mail>)[id];
                return (
                  <article key={id} className={`bd-card bd-${id}`} style={{ ['--i' as any]: i }}>
                    <span className="bd-ghost" aria-hidden="true" dir="ltr">0{i + 1}</span>
                    <span className="bd-ic"><I size={26} strokeWidth={1.7} /></span>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                    <div className="bd-stat"><b dir="ltr">{num}</b><span>{lab}</span></div>
                    <div className="bd-chips">{ps.map(pid => { const pr = t.projects.find(x => x.id === pid); return pr ? <button key={pid} type="button" onClick={() => setModal({ kind: 'project', id: pid })}>{pr.name}<ArrowUpRight size={12} className="rtl:-scale-x-100" /></button> : null; })}</div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="skills" className="sec skills" aria-labelledby="sk-h">
          <div className="wrap">
            <SecHead chap={t.chap} k={t.skK} n={4} p={t.skH} id="sk-h" />
            <div className="skg" data-rv>
              {t.skills.map((g, gi) => {
                const I = [Monitor, Server, Database, Wrench][gi];
                return (
                  <article key={g.key} className={`skc lux sk-${g.key}`} style={{ ['--i' as any]: gi }}>
                    <header><Ico a={(['bob', 'pulse', 'tilt', 'tilt'] as const)[gi]} d={gi} c={SKC[gi]}><I size={20} /></Ico><h3>{g.t}</h3><span className="skc-n">{g.items.length}</span></header>
                    <p className="skc-d">{g.d}</p>
                    <ul>{g.items.map(([n, use]) => (
                      <li key={n}><SkillIco n={n} c={SKC[gi]} /><span className="sk-t"><b>{n}</b><span>{use.length ? use.join(' · ') : t.studyUse}</span></span></li>
                    ))}</ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sec contact" aria-labelledby="ct-h">
          <div className="wrap ct" data-rv>
            <Aurora dark sun={false} />
            <div className="ct-copy">
              <span className="eyebrow" style={{ color: '#a6a6b0' }}>{t.ctK} · 05</span>
              <H2 p={t.ctH} id="ct-h" xl />
              <p className="lede">{t.ctSub}</p>
              <div className="ct-clock"><i className="ck-dot" /><b className="ck-t"><Clock /></b><span className="ck-l"><em>{t.ctClock}</em>{t.loc} · UTC+8</span></div>
            </div>
            <div className="ct-side">
              <form className="ct-form" noValidate onSubmit={e => e.preventDefault()}>
                <span className="cf-k">{t.fHead}</span>
                <div className="fld"><input id="cf-n" name="n" type="text" autoComplete="name" placeholder=" " required /><label htmlFor="cf-n">{t.fName}</label></div>
                <div className="cf-topics" role="radiogroup" aria-label={t.fMail}>{t.fTopics.map((x, i) => <button key={x} type="button" role="radio" aria-checked={topic === i} className={topic === i ? 'on' : ''} onClick={() => setTopic(i)}>{x}</button>)}</div>
                <div className="fld"><textarea id="cf-m" name="m" rows={3} placeholder=" " required /><label htmlFor="cf-m">{t.fMsg}</label></div>
                <div className="cf-act">
                  <button type="button" className="cf-send" onClick={e => sendVia('mail', e.currentTarget.form!)}><Mail size={16} />{t.fViaMail}</button>
                  <button type="button" className="cf-wa" onClick={e => sendVia('wa', e.currentTarget.form!)}><BrandIco k="whatsapp" />{t.fWa}</button>
                </div>
                <p className="cf-note">{t.fNote}</p>
              </form>
              <div className="ct-icons" role="list">
                <a role="listitem" href={`mailto:${CONTACT.mail}`} data-l="Email" aria-label="Email"><BrandIco k="mail" /></a>
                <a role="listitem" href={CONTACT.li} target="_blank" rel="noreferrer" data-l="LinkedIn" aria-label="LinkedIn"><BrandIco k="linkedin" /></a>
                <a role="listitem" href={CONTACT.gh} target="_blank" rel="noreferrer" data-l="GitHub" aria-label="GitHub"><BrandIco k="github" /></a>
                <a role="listitem" href={waPlain} target="_blank" rel="noreferrer" data-l="WhatsApp" aria-label="WhatsApp"><BrandIco k="whatsapp" /></a>
                <button role="listitem" type="button" onClick={copyMail} data-l={copied ? t.copied : CONTACT.mail} aria-label={t.copy}><span className="ai">{copied ? <Check size={18} /> : <CopyIco size={18} />}</span></button>
              </div>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{copied ? t.copied : ''}</p>
        </section>
      </main>

      <footer className="foot">
        <section className="credits" aria-label={t.creditsK} data-rv>
          <div className="wrap"><span className="eyebrow">{t.creditsK}</span>
            <dl>{t.credits.map(([k, v], i) => <div key={k} style={{ ['--i' as any]: i }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <p className="the-end">{t.end}</p></div>
        </section>
        <div className="wrap foot-mark" aria-hidden="true">{t.name}</div>
        <div className="wrap foot-in">
          <span>© {new Date().getFullYear()} {t.rights} · {t.footLine}</span>
          <a href="#top" className="foot-top"><ArrowUp size={15} />{t.top}</a>
          <div className="foot-soc">
            <a href={CONTACT.li} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href={CONTACT.gh} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
            <a href={`mailto:${CONTACT.mail}`} aria-label="Email"><Mail size={18} /></a>
          </div>
        </div>
      </footer>

      {isl && <div className={`island${isl.out ? ' out' : ''}`} key={isl.k} role="status" aria-live="polite"><span className="isl-i">{isl.icon}</span><span>{isl.text}</span></div>}

      <dialog ref={dlg} className="md" aria-labelledby="md-title" onCancel={e => { e.preventDefault(); setModal(null); }} onClick={e => { if (e.target === dlg.current) setModal(null); }}>
        <div className="md-in" ref={sheet} key={modal ? JSON.stringify(modal) + lang : 'x'}>
          <div className="md-grab" onPointerDown={gDown} onPointerMove={gMove} onPointerUp={gUp} onPointerCancel={gUp} aria-hidden="true"><i /></div>
          <button type="button" className="icon-btn md-x" onClick={() => setModal(null)} aria-label={t.close}><X size={18} /></button>
          {modalBody()}
        </div>
      </dialog>
    </>
  );
}
