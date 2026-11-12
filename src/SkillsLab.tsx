import { useEffect, useMemo, useRef, useState, type PointerEvent as PE } from 'react';

type L = 'en' | 'ar';
type Sk = { n: string; g: 0 | 1 | 2 | 3; lv: number; use: [string, string][]; en: string; ar: string };

const U = {
  insp: ['Inspire U', 'https://inspire-u.net/'] as [string, string],
  sdc: ['SDC', 'https://sdc.cx/'] as [string, string],
  roots: ['Roots AI', 'https://roots-ai.health/'] as [string, string],
  astra: ['Astra Bot', 'https://astra-bot.tech/'] as [string, string],
  ycim: ['YCIM', 'https://ycim.org/'] as [string, string],
  portfolio: ['Portfolio', '#top'] as [string, string],
};

const SK: Sk[] = [
  { n: 'React', g: 0, lv: 92, use: [U.roots, U.sdc, U.portfolio], en: 'Component architecture, state, performance, real-time dashboards.', ar: 'بنية المكوّنات والحالة والأداء ولوحات لحظية.' },
  { n: 'Next.js', g: 0, lv: 88, use: [U.roots], en: 'App Router, SSR/SSG, SEO-ready marketing sites.', ar: 'App Router وتوليد الصفحات وSEO.' },
  { n: 'Tailwind CSS', g: 0, lv: 94, use: [U.roots, U.portfolio], en: 'Design-system styling, responsive and RTL-first UI.', ar: 'تصميم نظام ألوان واستجابة ودعم RTL.' },
  { n: 'JavaScript', g: 0, lv: 90, use: [U.sdc, U.insp], en: 'ES2024+, async flows, DOM and browser APIs.', ar: 'جافاسكربت حديثة وتدفقات غير متزامنة.' },
  { n: 'Motion', g: 0, lv: 80, use: [U.roots, U.portfolio], en: 'Scroll reveals, count-ups, cinematic micro-interactions.', ar: 'حركات الظهور والعدّادات والتفاعلات الدقيقة.' },
  { n: 'Figma UI/UX', g: 0, lv: 88, use: [U.sdc, U.insp], en: 'Redesigned 60+ pages, design tokens, handoff.', ar: 'إعادة تصميم 60+ صفحة وتسليم للمطورين.' },
  { n: 'PHP', g: 1, lv: 90, use: [U.insp, U.sdc], en: 'REST APIs, auth middleware, payments, referral logic.', ar: 'واجهات REST وطبقة المصادقة والدفع والإحالات.' },
  { n: 'Python', g: 1, lv: 82, use: [U.astra], en: 'Automation, bots, data scripts, Flask services.', ar: 'أتمتة وبوتات وسكربتات بيانات وFlask.' },
  { n: 'Node.js', g: 1, lv: 80, use: [U.roots, U.portfolio], en: 'API routes, tooling, serverless functions.', ar: 'مسارات API وأدوات ودوال serverless.' },
  { n: 'MySQL', g: 1, lv: 86, use: [U.insp, U.sdc], en: 'Schema design, indexing, reporting queries.', ar: 'تصميم الجداول والفهارس واستعلامات التقارير.' },
  { n: 'Supabase', g: 1, lv: 84, use: [U.insp], en: 'Postgres, RLS, edge functions, realtime.', ar: 'Postgres وRLS ودوال Edge ولحظي.' },
  { n: 'REST APIs', g: 1, lv: 90, use: [U.insp, U.sdc], en: 'Design, versioning and third-party integrations (Brevo, payments).', ar: 'تصميم وتكاملات خارجية (Brevo والدفع).' },
  { n: 'Flutter', g: 2, lv: 72, use: [], en: 'E-Mart cross-platform app: catalog, cart, state.', ar: 'تطبيق E-Mart: كتالوج وسلة وحالة.' },
  { n: 'Dart', g: 2, lv: 70, use: [], en: 'Typed UI logic for Flutter apps.', ar: 'منطق واجهات Flutter.' },
  { n: 'C++', g: 2, lv: 68, use: [], en: 'Smart Attendance System (QR) coursework project.', ar: 'نظام الحضور الذكي (QR) ضمن الدراسة.' },
  { n: 'Git/GitHub', g: 3, lv: 90, use: [U.roots, U.sdc], en: 'Branching, PR review, GitHub Pages deploys.', ar: 'الفروع والمراجعة ونشر GitHub Pages.' },
  { n: 'WordPress / Elementor', g: 3, lv: 90, use: [U.ycim, U.insp], en: 'Custom CSS, Elementor data editing, bilingual sites.', ar: 'CSS مخصص وإلمنتور ومواقع ثنائية اللغة.' },
  { n: 'Brevo APIs', g: 3, lv: 78, use: [U.sdc], en: 'Email automation across 300+ lists.', ar: 'أتمتة بريد عبر 300+ قائمة.' },
  { n: 'Chart.js', g: 3, lv: 82, use: [U.sdc], en: '5-KPI real-time dashboard, 30s refresh.', ar: 'لوحة 5 مؤشرات بتحديث كل 30 ثانية.' },
  { n: 'CI/CD', g: 3, lv: 74, use: [U.roots], en: 'Automated builds, preview deploys, checks.', ar: 'بناء آلي ونشر معاينة وفحوصات.' },
  { n: 'Agile/Scrum', g: 3, lv: 80, use: [U.sdc], en: 'Sprints, estimation, code review rituals.', ar: 'سبرنتات وتقدير ومراجعة كود.' },
];

const GL: Record<L, string[]> = {
  en: ['Frontend', 'Backend & data', 'Mobile', 'Tools & process'],
  ar: ['الواجهات', 'الخلفية والبيانات', 'الجوال', 'الأدوات والمنهجية'],
};
const COL = ['#d4b25c', '#6fb7ff', '#7ee0b0', '#c59bff'];

export default function SkillsLab({ lang }: { lang: L }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<number>(0);
  const [hov, setHov] = useState<number | null>(null);
  const [filter, setFilter] = useState<number | null>(null);
  const rot = useRef({ x: -0.25, y: 0, vx: 0.0035, vy: 0, drag: false, lx: 0, ly: 0 });
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const pts = useMemo(() => SK.map((_, i) => {
    const k = SK.length, y = 1 - (i / (k - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
    return [Math.cos(th) * r, y, Math.sin(th) * r] as const;
  }), []);
  const hold = useRef(false);
  hold.current = hov !== null;

  useEffect(() => {
    let raf = 0;
    const R = () => (wrap.current ? Math.min(wrap.current.clientWidth, 560) * 0.38 : 150);
    const tick = () => {
      const s = rot.current;
      if (!s.drag && !hold.current) { s.y += s.vx; s.x += (-0.25 - s.x) * 0.01; }
      const cy = Math.cos(s.y), sy = Math.sin(s.y), cx = Math.cos(s.x), sx = Math.sin(s.x), r = R();
      pts.forEach((p, i) => {
        const el = nodes.current[i]; if (!el) return;
        const x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy;
        const y2 = p[1] * cx - z1 * sx, z2 = p[1] * sx + z1 * cx;
        const sc = 0.62 + (z2 + 1) * 0.28, dim = filter !== null && SK[i].g !== filter;
        el.style.transform = `translate3d(${x1 * r}px,${y2 * r}px,${z2 * 60}px) translate(-50%,-50%) scale(${sc})`;
        el.style.opacity = String(dim ? 0.12 : 0.35 + (z2 + 1) * 0.32);
        el.style.zIndex = String(Math.round((z2 + 1) * 50) + (i === sel ? 100 : 0));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pts, sel, filter]);

  const down = (e: PE) => { const s = rot.current; s.drag = true; s.lx = e.clientX; s.ly = e.clientY; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); };
  const move = (e: PE) => { const s = rot.current; if (!s.drag) return; s.y += (e.clientX - s.lx) * 0.008; s.x = Math.max(-1.1, Math.min(1.1, s.x + (e.clientY - s.ly) * 0.008)); s.lx = e.clientX; s.ly = e.clientY; };
  const up = () => { rot.current.drag = false; };

  const act = hov ?? sel, s = SK[act];
  const gl = GL[lang];
  const sw = lang === 'ar' ? 'مرّر الماوس على أي مهارة لتعرف أين استخدمتها · اسحب للتدوير' : 'Hover a skill to see where it was used · drag to rotate';

  return (
    <div className="mt-3 grid lg:grid-cols-5 gap-4 items-center">
      <div className="lg:col-span-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          <button className="chip" style={filter === null ? { borderColor: 'var(--gold)', color: 'var(--gold)' } : {}} onClick={() => setFilter(null)}>{lang === 'ar' ? 'الكل' : 'All'}</button>
          {gl.map((g, i) => <button key={g} className="chip" style={filter === i ? { borderColor: COL[i], color: COL[i] } : {}} onClick={() => setFilter(filter === i ? null : i)}><span style={{ background: COL[i] }} className="w-1.5 h-1.5 rounded-full" />{g}</button>)}
        </div>
        <div ref={wrap} className="relative mx-auto select-none touch-none" style={{ height: 'min(78vw,420px)', perspective: 900, cursor: 'grab' }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} dir="ltr">
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute left-1/2 top-1/2 w-[62%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(212,178,92,.14),transparent 68%)' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-[11px] tracking-[.28em] text-white/40">SOFTWARE</div><div className="text-[13px] gold tracking-[.2em]">ENGINEER</div>
            </div>
            {SK.map((k, i) => (
              <button key={k.n} ref={el => { nodes.current[i] = el; }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(i)} onBlur={() => setHov(null)} onClick={() => setSel(i)}
                className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[12px] backdrop-blur-sm"
                style={{ border: `1px solid ${COL[k.g]}66`, background: `${COL[k.g]}1f`, color: act === i ? '#fff' : 'var(--tx)', boxShadow: act === i ? `0 0 0 1px ${COL[k.g]}, 0 0 24px ${COL[k.g]}66` : 'none', willChange: 'transform' }}>{k.n}</button>
            ))}
          </div>
        </div>
        <div className="text-center text-[11.5px] text-white/40 -mt-1">{sw}</div>
      </div>

      <div className="lg:col-span-2 card p-5" style={{ borderColor: `${COL[s.g]}55` }}>
        <div className="flex items-center gap-2 text-[11px] tracking-[.18em] uppercase" style={{ color: COL[s.g] }}><span className="w-2 h-2 rounded-full" style={{ background: COL[s.g] }} />{gl[s.g]}</div>
        <h3 className="mt-2 text-[22px] font-semibold">{s.n}</h3>
        <div className="mt-3 flex items-center gap-3 text-[11.5px] text-white/50"><span>{lang === 'ar' ? 'الإتقان' : 'Proficiency'}</span>
          <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"><div className="h-full rounded-full transition-all duration-500" style={{ width: s.lv + '%', background: COL[s.g] }} /></div><span>{s.lv}%</span></div>
        <p className="mt-3 text-[13px] text-white/65 leading-relaxed">{lang === 'ar' ? s.ar : s.en}</p>
        <div className="mt-4 text-[11px] tracking-[.14em] uppercase text-white/40">{lang === 'ar' ? 'استُخدمت في' : 'Used in'}</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.use.length ? s.use.map(([n, h]) => <a key={n} href={h} target={h.startsWith('#') ? undefined : '_blank'} rel="noreferrer" className="chip hover:text-white" style={{ borderColor: `${COL[s.g]}66` }}>{n} ↗</a>) : <span className="chip">{lang === 'ar' ? 'مشاريع وتعلم' : 'Projects & coursework'}</span>}
        </div>
      </div>
    </div>
  );
}
