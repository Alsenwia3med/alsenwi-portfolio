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
  { n: 'Tailwind CSS', g: 0, lv: 94, use: [U.roots, U.ycim, U.portfolio], en: 'Design-system styling, responsive and RTL-first UI.', ar: 'تصميم نظام ألوان واستجابة ودعم RTL.' },
  { n: 'JavaScript', g: 0, lv: 90, use: [U.sdc, U.insp, U.ycim], en: 'ES2024+, async flows, DOM and browser APIs.', ar: 'جافاسكربت حديثة وتدفقات غير متزامنة.' },
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
const COL_L = ['#a8841f', '#2563a8', '#178a5b', '#6d44b8'];
const COL_D = ['#e2b94f', '#5fa8ff', '#4fd6a0', '#b794ff'];
const PAL = {
  light: { ink: '#14120d', on: '#fff', track: '#e9e2d0', line: '#e5dcc4', body: '#3a362b' },
  dark: { ink: '#f4eee0', on: '#0b0b10', track: 'rgba(255,255,255,.12)', line: 'rgba(226,185,79,.22)', body: 'rgba(244,238,224,.8)' },
};

export default function SkillsLab({ lang, dark }: { lang: L; dark: boolean }) {
  const COL = dark ? COL_D : COL_L;
  const P = dark ? PAL.dark : PAL.light;
  const wrap = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState<number>(0);
  const [hov, setHov] = useState<number | null>(null);
  const [filter, setFilter] = useState<number | null>(null);
  const rot = useRef({ x: -0.25, y: 0, vx: 0.0016, vy: 0, drag: false, lx: 0, ly: 0 });
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const pts = useMemo(() => SK.map((_, i) => {
    const k = SK.length, y = 1 - (i / (k - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
    return [Math.cos(th) * r, y, Math.sin(th) * r] as const;
  }), []);
  const hold = useRef(false);
  hold.current = hov !== null;

  useEffect(() => {
    let raf = 0;
    const R = () => (wrap.current ? Math.min(wrap.current.clientWidth * 0.4, (wrap.current.clientHeight - 120) / 2) : 150);
    const tick = () => {
      const s = rot.current;
      if (!s.drag && !hold.current) { s.y += s.vx; s.x += (-0.25 - s.x) * 0.01; }
      const cy = Math.cos(s.y), sy = Math.sin(s.y), cx = Math.cos(s.x), sx = Math.sin(s.x), r = R();
      pts.forEach((p, i) => {
        const el = nodes.current[i]; if (!el) return;
        const x1 = p[0] * cy + p[2] * sy, z1 = -p[0] * sy + p[2] * cy;
        const y2 = p[1] * cx - z1 * sx, z2 = p[1] * sx + z1 * cx;
        const sc = 0.5 + (z2 + 1) * 0.27, dim = filter !== null && SK[i].g !== filter;
        el.style.transform = `translate3d(${x1 * r}px,${y2 * r}px,${z2 * 60}px) translate(-50%,-50%) scale(${sc})`;
        el.style.opacity = String(dim ? 0.1 : 0.32 + (z2 + 1) * 0.34);
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
        <div className="flex flex-wrap gap-2 mb-3">
          <button className="sk-chip" style={filter === null ? { borderColor: P.ink, background: P.ink, color: P.on } : {}} onPointerEnter={() => setFilter(null)} onClick={() => setFilter(null)}>{lang === 'ar' ? 'الكل' : 'All'}</button>
          {gl.map((g, i) => <button key={g} className="sk-chip" style={filter === i ? { borderColor: COL[i], background: COL[i], color: P.on } : {}} onPointerEnter={() => setFilter(i)} onClick={() => setFilter(i)}><span style={{ background: filter === i ? P.on : COL[i] }} className="w-1.5 h-1.5 rounded-full" />{g}</button>)}
        </div>
        <div ref={wrap} className="relative mx-auto select-none touch-none" style={{ height: 'min(108vw,540px)', marginTop: 22, marginBottom: 22, perspective: 900, cursor: 'grab' }} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} dir="ltr">
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute left-1/2 top-1/2 w-[70%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle,rgba(226,185,79,.14),transparent 68%)', border: '1px dashed rgba(168,132,31,.25)' }} />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-[11px] tracking-[.3em] sk-mut">SOFTWARE</div><div className="text-[14px] font-semibold tracking-[.22em]" style={{ color: COL[0] }}>ENGINEER</div>
            </div>
            {SK.map((k, i) => (
              <button key={k.n} ref={el => { nodes.current[i] = el; }} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(i)} onBlur={() => setHov(null)} onClick={() => setSel(i)}
                className="absolute left-1/2 top-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium"
                style={{ border: `2px solid ${act === i ? P.ink : COL[k.g]}`, background: COL[k.g], color: P.on, boxShadow: act === i ? `0 10px 28px ${COL[k.g]}77` : `0 4px 12px ${COL[k.g]}44`, willChange: 'transform' }}>{k.n}</button>
            ))}
          </div>
        </div>
        <div className="text-center text-[11.5px] sk-mut mt-4 pb-1">{sw}</div>
      </div>

      <div className="lg:col-span-2 sk-card p-5" style={{ borderColor: COL[s.g] }}>
        <div className="flex items-center gap-2 text-[11px] tracking-[.18em] uppercase" style={{ color: COL[s.g] }}><span className="w-2 h-2 rounded-full" style={{ background: COL[s.g] }} />{gl[s.g]}</div>
        <h3 className="mt-2 text-[24px] font-semibold" style={{ color: P.ink }}>{s.n}</h3>
        <div className="mt-3 flex items-center gap-3 text-[11.5px] sk-mut"><span>{lang === 'ar' ? 'الإتقان' : 'Proficiency'}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: P.track }}><div className="h-full rounded-full transition-all duration-500" style={{ width: s.lv + '%', background: COL[s.g] }} /></div><span>{s.lv}%</span></div>
        <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: P.body }}>{lang === 'ar' ? s.ar : s.en}</p>
        <div className="mt-4 text-[11px] tracking-[.14em] uppercase sk-mut">{lang === 'ar' ? 'استُخدمت في' : 'Used in'}</div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {s.use.length ? s.use.map(([n, h]) => <a key={n} href={h} target={h.startsWith('#') ? undefined : '_blank'} rel="noreferrer" className="sk-chip" style={{ borderColor: COL[s.g], color: COL[s.g] }}>{n} ↗</a>) : <span className="sk-chip">{lang === 'ar' ? 'مشاريع وتعلم' : 'Projects & coursework'}</span>}
        </div>
      </div>
      <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4" style={{ borderTop: `1px solid ${P.line}` }}>
        {gl.map((g, gi) => (
          <div key={g}>
            <div className="flex items-center gap-2 text-[12px] font-semibold tracking-wide mb-2" style={{ color: COL[gi] }}><span className="w-2 h-2 rounded-full" style={{ background: COL[gi] }} />{g}</div>
            <div className="flex flex-col gap-1.5">
              {SK.map((k, i) => k.g === gi && (
                <button key={k.n} onClick={() => setSel(i)} onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} className="text-start group">
                  <div className="flex justify-between text-[12.5px]" style={{ color: act === i ? COL[gi] : P.ink, fontWeight: act === i ? 600 : 500 }}><span>{k.n}</span><span className="sk-mut">{k.lv}%</span></div>
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: P.track }}><div className="h-full rounded-full" style={{ width: k.lv + '%', background: `linear-gradient(90deg,${COL[gi]}99,${COL[gi]})` }} /></div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
