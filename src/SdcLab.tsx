import { useRef, useState, type MouseEvent as ME } from 'react';

type L = 'en' | 'ar';
type Layer = { id: string; name: [string, string]; tag: [string, string]; pts: [string, string][]; tech: string[]; stat: [string, [string, string]] };

const LAYERS: Layer[] = [
  { id: 'ux', name: ['Design & UX', 'التصميم وتجربة المستخدم'], tag: ['Figma · 60+ pages', 'Figma · أكثر من 60 صفحة'],
    pts: [['Redesigned 60+ pages in Figma with a consistent system.', 'إعادة تصميم أكثر من 60 صفحة في Figma بنظام موحّد.'], ['Dashboard layouts built for fast scanning of KPIs.', 'تخطيطات لوحة تُقرأ مؤشراتها بسرعة.']],
    tech: ['Figma', 'Design tokens', 'Prototyping'], stat: ['60+', ['pages redesigned', 'صفحة معاد تصميمها']] },
  { id: 'fe', name: ['Frontend', 'الواجهة الأمامية'], tag: ['React · Chart.js', 'React · Chart.js'],
    pts: [['Real-time monitoring dashboard with 5 KPIs refreshing every 30 seconds.', 'لوحة متابعة لحظية بـ 5 مؤشرات تتحدّث كل 30 ثانية.'], ['Production user-dashboard components.', 'مكوّنات لوحة المستخدم بمستوى إنتاجي.']],
    tech: ['React', 'Chart.js', 'JavaScript', 'Tailwind CSS'], stat: ['5 KPIs', ['live, 30s refresh', 'لحظي، تحديث كل 30 ث']] },
  { id: 'be', name: ['Backend & API', 'الخلفية وواجهات API'], tag: ['PHP · REST', 'PHP · REST'],
    pts: [['Authentication middleware (auth_check.php) protecting every route.', 'طبقة مصادقة (auth_check.php) تحمي كل المسارات.'], ['Referral tracking and payment gateway integrations.', 'تتبّع الإحالات وتكامل بوابات الدفع.']],
    tech: ['PHP', 'REST APIs', 'Auth middleware', 'Payments'], stat: ['REST', ['API-first backend', 'خلفية API أولًا']] },
  { id: 'db', name: ['Data', 'البيانات'], tag: ['MySQL', 'MySQL'],
    pts: [['Relational schema for users, referrals and transactions.', 'مخطط علائقي للمستخدمين والإحالات والمعاملات.'], ['Reporting queries feeding the live KPI cards.', 'استعلامات تقارير تغذّي بطاقات المؤشرات.']],
    tech: ['MySQL', 'SQL', 'Reporting queries'], stat: ['SQL', ['single source of truth', 'مصدر حقيقة واحد']] },
  { id: 'auto', name: ['Automation', 'الأتمتة'], tag: ['Brevo · 300+ lists', 'Brevo · 300+ قائمة'],
    pts: [['Email automation across 300+ lists through the Brevo API.', 'أتمتة البريد عبر 300+ قائمة بواسطة Brevo API.'], ['Triggered flows tied to dashboard events.', 'مسارات مُفعَّلة بأحداث من اللوحة.']],
    tech: ['Brevo APIs', 'Webhooks', 'Email flows'], stat: ['300+', ['lists automated', 'قائمة مؤتمتة']] },
  { id: 'ops', name: ['Delivery', 'التسليم والعمل'], tag: ['Git · Agile', 'Git · Agile'],
    pts: [['450+ hours of industrial training on a live fintech platform.', 'أكثر من 450 ساعة تدريب صناعي على منصة تقنية مالية حية.'], ['Sprints, code review and Git workflow with the team.', 'سبرنتات ومراجعة كود وسير عمل Git مع الفريق.']],
    tech: ['Git/GitHub', 'Agile/Scrum', 'Code review'], stat: ['450+', ['hours on the platform', 'ساعة على المنصة']] },
];
const COL_L = ['#6d44b8', '#a8841f', '#2563a8', '#178a5b', '#c0501e', '#555b66'];
const COL_D = ['#b794ff', '#e2b94f', '#5fa8ff', '#4fd6a0', '#ff9a6b', '#aab2c0'];

export default function SdcLab({ lang, dark }: { lang: L; dark: boolean }) {
  const [sel, setSel] = useState(1);
  const [hov, setHov] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);
  const COL = dark ? COL_D : COL_L;
  const ar = lang === 'ar', i = hov ?? sel, A = LAYERS[i], c = COL[i];
  const onMove = (e: ME) => {
    const r = box.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 14, y: ((e.clientY - r.top) / r.height - 0.5) * -10 });
  };
  const n = LAYERS.length;
  return (
    <div className="grid lg:grid-cols-5 gap-6 items-center">
      <div className="lg:col-span-3">
        <div ref={box} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })} dir="ltr"
          className="relative mx-auto select-none" style={{ height: 'min(104vw,500px)', perspective: 1100, marginTop: 56 }}>
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d', transform: `translateY(54px) rotateX(${58 + tilt.y}deg) rotateZ(${-38 + tilt.x}deg)`, transition: 'transform .25s ease-out' }}>
            {LAYERS.map((L, k) => {
              const active = k === i, z = (n - 1 - k) * 74 + (active ? 10 : 0);
              return (
                <button key={L.id} onMouseEnter={() => setHov(k)} onMouseLeave={() => setHov(null)} onFocus={() => setHov(k)} onBlur={() => setHov(null)} onClick={() => setSel(k)}
                  aria-label={L.name[0]} className="absolute left-1/2 top-1/2 rounded-2xl text-left"
                  style={{ width: '46%', aspectRatio: '1.7', marginLeft: '-23%', marginTop: '-14%', transform: `translateZ(${z}px)`, transition: 'transform .35s cubic-bezier(.2,.9,.25,1), box-shadow .35s',
                    background: active ? `linear-gradient(135deg,${COL[k]},${COL[k]}cc)` : dark ? `linear-gradient(135deg,${COL[k]}55,${COL[k]}22)` : `linear-gradient(135deg,${COL[k]}33,${COL[k]}14)`,
                    border: `1.5px solid ${COL[k]}`, boxShadow: active ? `0 30px 50px -10px ${COL[k]}88` : `0 14px 24px -14px ${COL[k]}66`,  }}>
                  <span className="absolute left-3 bottom-[22px] text-[12.5px] font-semibold tracking-wide" style={{ color: active ? (dark ? '#0b0b10' : '#fff') : dark ? '#f4eee0' : '#14120d' }}>{ar ? L.name[1] : L.name[0]}</span>
                  <span className="absolute left-3 bottom-[7px] text-[10px] opacity-80" style={{ color: active ? (dark ? '#0b0b10' : '#fff') : dark ? '#f4eee0' : '#14120d' }}>{ar ? L.tag[1] : L.tag[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="text-center text-[11.5px] sk-mut mt-2">{ar ? 'مرّر الماوس على أي طبقة لترى ما بُني فيها' : 'Hover a layer to see what was built in it'}</div>
      </div>

      <div className="lg:col-span-2 sk-card p-5" style={{ borderColor: c }}>
        <div className="flex items-center gap-2 text-[11px] tracking-[.18em] uppercase" style={{ color: c }}><span className="w-2 h-2 rounded-full" style={{ background: c }} />{ar ? A.tag[1] : A.tag[0]}</div>
        <h3 className="mt-2 text-[22px] font-semibold sk-ink">{ar ? A.name[1] : A.name[0]}</h3>
        <div className="mt-3 flex items-baseline gap-2"><span className="text-[30px] font-semibold" style={{ color: c }}>{A.stat[0]}</span><span className="text-[12px] sk-mut">{ar ? A.stat[1][1] : A.stat[1][0]}</span></div>
        <ul className="mt-3 flex flex-col gap-2 text-[13.5px] leading-relaxed sk-ink" style={{ opacity: .85 }}>
          {A.pts.map(([e, a]) => <li key={e} className="flex gap-2"><span style={{ color: c }}>▸</span><span>{ar ? a : e}</span></li>)}
        </ul>
        <div className="mt-4 flex flex-wrap gap-1.5">{A.tech.map(x => <span key={x} className="sk-chip" style={{ borderColor: c, color: c }}>{x}</span>)}</div>
        <a href="https://sdc.cx/" target="_blank" rel="noreferrer" className="sk-chip mt-4" style={{ borderColor: c, color: c }}>sdc.cx ↗ {ar ? 'الموقع الحي' : 'Live site'}</a>
      </div>
    </div>
  );
}
