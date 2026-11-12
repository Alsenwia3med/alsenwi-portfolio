import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import SkillsLab from './SkillsLab';
import { ArrowUpRight, Mail, Linkedin, Github, MessageCircle, Globe, LayoutDashboard, Building2, Server, MapPin, Clock, QrCode, Sparkles, ChevronRight, Sun, Moon, GraduationCap, Briefcase, Award, Languages as LangIcon } from 'lucide-react';

type L = 'en' | 'ar';
const WA = '60143646834';
const WA_SHOW = '+60 14-364 6834';
const MAIL = 'alsanwi2019@gmail.com';
const LI = 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/';
const GH = 'https://github.com/Alsenwia3med';
const img = (p: string) => `${import.meta.env.BASE_URL}images/${p}`;


const fav = (d: string) => `https://www.google.com/s2/favicons?domain=${d}&sz=128`;
function Logo({ src, name, size = 40 }: { src?: string; name: string; size?: number }) {
  const [bad, setBad] = useState(!src);
  return (
    <span className="xlogo shrink-0" style={{ width: size, height: size }}>
      {!bad && src ? <img src={src} alt={name} onError={() => setBad(true)} loading="lazy" /> : <b>{name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase() || '•'}</b>}
    </span>
  );
}
const EXP_META: [string | undefined, string | undefined][] = [
  [img('roots-logo.png'), 'https://roots-ai.health/'],
  [img('six digit club.png'), 'https://sdc.cx/'],
  [img('inspire-logo.png'), 'https://inspire-u.net/'],
  [undefined, undefined],
];
const EDU_META: [string, string] = [img('utem.png'), 'https://www.utem.edu.my/'];
const CERT_META: [string | undefined, string | undefined][] = [
  [fav('linkedin.com'), 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/details/certifications/'],
  [fav('linkedin.com'), 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/details/certifications/'],
  [fav('google.com'), 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/details/certifications/'],
  [fav('dart.dev'), 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/details/certifications/'],
  [fav('linkedin.com'), 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/details/certifications/'],
  [fav('linkedin.com'), 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/details/certifications/'],
  [fav('ieee.org'), 'https://www.ieee.org/'],
];
function Wrap({ href, children, className }: { href?: string; children: any; className?: string; k?: string }) {
  return href ? <a href={href} target="_blank" rel="noreferrer" className={className}>{children}</a> : <div className={className}>{children}</div>;
}

const T = {
  en: {
    nav: ['Services', 'Work', 'About', 'Contact'],
    cta: 'Start a project',
    eyebrow: 'Software Engineer · Full-stack · UI/UX · Malaysia',
    h1a: 'Software systems',
    h1b: 'that make companies run — and look — like leaders.',
    sub: 'I\'m a software engineer: I turn any idea into a working system — frontend, backend and data. Companies bring me into their teams, and I build complete business systems end to end.',
    see: 'See the work',
    chips: ['Arabic · English · Bahasa', 'Malaysia · Gulf · Worldwide', 'RTL-first design'],
    sTitle: 'Systems I build',
    services: [
      ['Business systems', 'Registration, bookings, CRM and workflow automation — the core of what I engineer.', Building2],
      ['Dashboards & analytics', 'Real-time control panels on live data: sales, finance and operations.', LayoutDashboard],
      ['APIs & integrations', 'REST backends, authentication, payments and third-party integrations.', Server],
      ['Product interfaces', 'Fast, bilingual front ends that sit on top of the system — design to launch.', Globe],
    ],
   wTitle: 'Selected work',
    work: [
      ['Inspire U', 'Education platform', 'Student registration platform with bilingual site and lead flow.', 'Inspire-U.png', 'https://inspire-u.net/'],
      ['Roots AI', 'Health AI · B2B', 'Frontend engineer on a B2B Health AI platform: Next.js, Tailwind, Motion.', 'roots.jpg', 'https://roots-ai.health/'],
      ['SDC Dashboard', 'Fintech analytics', 'Real-time monitoring dashboard built during an industrial training internship.', 'sdc-card.jpg', 'https://sdc.cx/'],
      ['Astra Bot', 'Automation', 'Python-based trading automation with its own web presence.', 'astra.jpg', 'https://astra-bot.tech/'],
      ['YCIM', 'Community portal', 'WordPress/Elementor portal for the Yemeni Community in Malaysia.', 'ycim.jpg', 'https://ycim.org/'],
      ['Safar Easy', 'Tourism', 'Arabic/RTL luxury redesign for a Malaysia tourism company.', 'logo:safar.jpg', 'https://paleturquoise-wasp-229356.hostingersite.com/'],
      ['E-Mart Mobile App', 'Mobile e-commerce', 'Flutter/Dart cross-platform app with product catalog and cart.', 'emart.jpg', ''],
      ['Melaka Tourist Guide', 'Travel', 'Interactive guide with maps and local insights.', 'melaka.jpeg', ''],
    ],
    pTitle: 'How we work',
    process: [['Discover', 'A short call: goals, audience, timeline.'], ['Design', 'You see the look first — approve before any build.'], ['Build & launch', 'Clean code, fast load, handover and support.']],
    aTitle: 'About',
    jTitle: 'Experience & education',
    exp: [
      ['Software Engineer (Frontend)', 'Roots AI', 'Present', ['Software engineer on a B2B Health AI platform: frontend, dashboards and integrations', 'Build the product frontend in Next.js, Tailwind CSS and Motion with a shared design system', 'Design UI/UX flows and interactive dashboards for health data and AI-agent reports', 'Integrate APIs and AI services into the product and shape its front-end architecture']],
      ['Full-Stack Developer Intern', 'Six Digit Club Sdn Bhd · Selangor', 'Oct 2025 — Mar 2026', ['450+ hours on the live sdc.cx fintech platform', 'Email-automation dashboard on the Brevo API: batches, media, templates, 300+ lists', 'Investment dashboard: investor portal and admin panel with capital requests and termination flow', 'Redesigned landing, 30/60-day and Early Bird pages and their payment-gateway pages', 'Referral tracking plus e-learning and payment integration', 'React/Chart.js real-time dashboard (5 KPIs, 30s refresh) · Figma redesign of 60+ pages']],
      ['UI/UX & Full-Stack Developer', 'Inspire-U Edtech · Melaka', 'Aug 2025 — Present', ['Platform architecture with PHP/MySQL REST APIs', 'Automated about 70% of internal workflows', 'Modernised the student management system']],
      ['Freelance Web Developer', 'Self-employed · Remote', 'Aug 2024 — Jun 2025', ['Landing pages and automation for local businesses and startups', 'Third-party API integrations, SEO and performance tuning']],
    ],
    edu: ['Bachelor of Computer Science (Software Development)', 'Universiti Teknikal Malaysia Melaka (UTeM) · FTMK', '2022 — 2026 · Graduated March 2026', ['Focus: full-stack development, software engineering', 'Projects: Smart Attendance System (C++/PHP, QR), Student Performance Dashboard, Melaka Tourist Guide']],
    certTitle: 'Certifications', certs: ['Designing RESTful APIs · LinkedIn · Sep 2026', 'Introduction to Career Skills in Software Development · LinkedIn · Sep 2026', 'Introduction to Generative AI · Google · Sep 2026', 'Introduction to Dart · LinkedIn · Jul 2025', 'How to Learn Faster · LinkedIn · Jul 2025', 'Productivity Tips: Finding Your Productive Mindset · LinkedIn · Jul 2025', 'IEEE Associate Software Developer Workshop (2024)'],
    langTitle: 'Languages', langs: [['Arabic', 'Native'], ['English', 'Professional working'], ['Bahasa Malaysia', 'Conversational'], ['German', 'Elementary (A1)']],
    skTitle: 'Skills',
    skillGroups: [['Frontend', ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Figma UI/UX']], ['Backend & data', ['PHP', 'Python', 'Node.js', 'MySQL', 'REST APIs', 'Supabase']], ['Mobile', ['Flutter', 'Dart', 'C++']], ['Tools & process', ['Git/GitHub', 'WordPress/Elementor', 'Brevo APIs', 'Chart.js', 'CI/CD', 'Agile/Scrum']]],

    about: 'Computer Science graduate (UTeM, 2026) with hands-on work across fintech, education and tourism. I pair a designer’s eye with full-stack engineering, so what looks premium also performs.',
    skills: ['React', 'Next.js', 'Tailwind', 'PHP', 'Python', 'SQL', 'Node.js', 'Figma', 'REST APIs', 'WordPress'],
    cTitle: 'Let’s talk about your project',
    cSub: 'Message me on WhatsApp — I reply fast.',
    name: 'Your name', msg: 'Tell me briefly what you need', send: 'Send on WhatsApp',
    rights: 'Ahmed Al-Senwi · Malaysia',
  },
  ar: {
    nav: ['الخدمات', 'أعمالي', 'نبذة', 'تواصل'],
    cta: 'ابدأ مشروعك',
    eyebrow: 'مهندس برمجيات · واجهات كاملة · UI/UX · ماليزيا',
    h1a: 'أنظمة برمجية',
    h1b: 'تجعل شركتك تعمل — وتبدو — كالكبار.',
    sub: 'أنا مهندس برمجيات: أحوّل أي فكرة إلى نظام يعمل — واجهات وخلفية وبيانات. تستعين بي الشركات داخل فرقها، وأبني أنظمة أعمال متكاملة من الصفر.',
    see: 'شاهد الأعمال',
    chips: ['عربي · English · Bahasa', 'ماليزيا · الخليج · العالم', 'تصميم يبدأ من RTL'],
    sTitle: 'الأنظمة التي أبنيها',
    services: [
      ['أنظمة أعمال', 'تسجيل وحجوزات وCRM وأتمتة سير العمل — جوهر ما أهندسه.', Building2],
      ['لوحات تحكم وتحليلات', 'لوحات لحظية على بيانات حية: مبيعات ومالية وعمليات.', LayoutDashboard],
      ['واجهات API وتكاملات', 'خلفيات REST ومصادقة ومدفوعات وتكامل مع خدمات خارجية.', Server],
      ['واجهات المنتج', 'واجهات سريعة بلغتين فوق النظام — من التصميم حتى الإطلاق.', Globe],
    ],
   wTitle: 'أعمال مختارة',
    work: [
      ['Inspire U', 'منصة تعليمية', 'منصة تسجيل طلاب بموقع ثنائي اللغة ومسار استقبال العملاء.', 'Inspire-U.png', 'https://inspire-u.net/'],
      ['Roots AI', 'ذكاء صحي · B2B', 'مهندس واجهات أمامية في منصة ذكاء اصطناعي صحي للمؤسسات: Next.js وTailwind وMotion.', 'roots.jpg', 'https://roots-ai.health/'],
      ['SDC Dashboard', 'تقنية مالية', 'لوحة متابعة لحظية بُنيت خلال تدريب صناعي.', 'sdc-card.jpg', 'https://sdc.cx/'],
      ['Astra Bot', 'أتمتة', 'أتمتة تداول بلغة بايثون مع حضور ويب خاص.', 'astra.jpg', 'https://astra-bot.tech/'],
      ['YCIM', 'بوابة مجتمع', 'بوابة ووردبريس/إلمنتور للجالية اليمنية في ماليزيا.', 'ycim.jpg', 'https://ycim.org/'],
      ['سفر إيز', 'سياحة', 'إعادة تصميم عربية فاخرة لشركة سياحة في ماليزيا.', 'logo:safar.jpg', 'https://paleturquoise-wasp-229356.hostingersite.com/'],
      ['E-Mart تطبيق جوال', 'تجارة إلكترونية', 'تطبيق Flutter/Dart متعدد المنصات بكتالوج منتجات وسلة.', 'emart.jpg', ''],
      ['دليل ملقا السياحي', 'سفر', 'دليل تفاعلي بخرائط ومعلومات محلية.', 'melaka.jpeg', ''],
    ],
    pTitle: 'طريقة العمل',
    process: [['الاستكشاف', 'مكالمة قصيرة: الهدف والجمهور والموعد.'], ['التصميم', 'ترى الشكل أولاً — وتعتمد قبل أي بناء.'], ['البناء والإطلاق', 'كود نظيف وسرعة تحميل وتسليم ودعم.']],
    aTitle: 'نبذة',
    jTitle: 'الخبرة والتعليم',
    exp: [
      ['مهندس برمجيات (الواجهات الأمامية)', 'Roots AI', 'الآن', ['مهندس برمجيات في منصة ذكاء اصطناعي صحي للمؤسسات: واجهات ولوحات تحكم وتكاملات', 'أبني واجهة المنتج بـ Next.js وTailwind وMotion مع نظام تصميم موحّد', 'أصمّم تجربة المستخدم ولوحات تفاعلية لبيانات الصحة وتقارير وكلاء الذكاء الاصطناعي', 'أربط واجهات API وخدمات الذكاء الاصطناعي بالمنتج وأرسم معمارية الواجهة']],
      ['متدرب مطوّر واجهات كاملة', 'Six Digit Club Sdn Bhd · سيلانجور', 'أكتوبر 2025 — مارس 2026', ['أكثر من 450 ساعة على منصة sdc.cx التقنية المالية الحية', 'لوحة أتمتة البريد عبر Brevo API: دفعات ووسائط وقوالب لأكثر من 300 قائمة', 'لوحة الاستثمار: بوابة للمستثمر ولوحة إدارة بطلبات رأس المال ومسار الإنهاء', 'إعادة تصميم صفحات الهبوط و30/60 يوم والـ Early Bird وصفحات بوابات الدفع', 'تتبّع الإحالات وربط التعلّم الإلكتروني بالدفع', 'لوحة React/Chart.js لحظية (5 مؤشرات، كل 30 ثانية) · إعادة تصميم 60+ صفحة في Figma']],
      ['مطوّر UI/UX وواجهات كاملة', 'Inspire-U Edtech · ملقا', 'أغسطس 2025 — الآن', ['هندسة المنصة بـ PHP/MySQL وواجهات REST', 'أتمتة نحو 70% من سير العمل الداخلي', 'تحديث نظام إدارة الطلاب']],
      ['مطوّر ويب مستقل', 'عمل حر · عن بعد', 'أغسطس 2024 — يونيو 2025', ['صفحات هبوط وأتمتة للشركات المحلية والناشئة', 'تكاملات API خارجية وتحسين SEO والأداء']],
    ],
    edu: ['بكالوريوس علوم الحاسب (تطوير البرمجيات)', 'جامعة ملقا التقنية الماليزية (UTeM) · FTMK', '2022 — 2026 · التخرج مارس 2026', ['التركيز: تطوير الواجهات الكاملة وهندسة البرمجيات', 'مشاريع: نظام الحضور الذكي (C++/PHP وQR)، لوحة أداء الطلاب، دليل ملقا السياحي']],
    certTitle: 'الشهادات', certs: ['Designing RESTful APIs · LinkedIn · Sep 2026', 'Introduction to Career Skills in Software Development · LinkedIn · Sep 2026', 'Introduction to Generative AI · Google · Sep 2026', 'Introduction to Dart · LinkedIn · Jul 2025', 'How to Learn Faster · LinkedIn · Jul 2025', 'Productivity Tips: Finding Your Productive Mindset · LinkedIn · Jul 2025', 'IEEE Associate Software Developer Workshop (2024)'],
    langTitle: 'اللغات', langs: [['العربية', 'اللغة الأم'], ['الإنجليزية', 'مهني عملي'], ['الملايو', 'محادثة'], ['الألمانية', 'مبتدئ (A1)']],
    skTitle: 'المهارات',
    skillGroups: [['الواجهات', ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Figma UI/UX']], ['الخلفية والبيانات', ['PHP', 'Python', 'Node.js', 'MySQL', 'REST APIs', 'Supabase']], ['الجوال', ['Flutter', 'Dart', 'C++']], ['الأدوات والمنهجية', ['Git/GitHub', 'WordPress/Elementor', 'Brevo APIs', 'Chart.js', 'CI/CD', 'Agile/Scrum']]],

    about: 'خريج علوم حاسب (UTeM، 2026) بخبرة عملية في التقنية المالية والتعليم والسياحة. أجمع عين المصمم مع هندسة الواجهات الكاملة، فما يبدو فاخراً يعمل بكفاءة.',
    skills: ['React', 'Next.js', 'Tailwind', 'PHP', 'Python', 'SQL', 'Node.js', 'Figma', 'REST APIs', 'WordPress'],
    cTitle: 'لنتحدث عن مشروعك',
    cSub: 'راسلني على واتساب — أرد بسرعة.',
    name: 'اسمك', msg: 'اكتب باختصار ما تحتاجه', send: 'أرسل عبر واتساب',
    rights: 'أحمد الصنوي · ماليزيا',
  },
};

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } };

const CT = {
  en: {
    title: 'Get in touch', sub: 'Hiring, a project or a quick question — pick a topic and send. It reaches me directly on WhatsApp.',
    loc: 'Kuala Lumpur, Malaysia', locSub: 'Based in Malaysia · open to remote and on-site roles', mail: 'Send by email',
    name: 'Your name', msg: 'Your message', send: 'Send on WhatsApp',
    typeT: 'Topic', types: ['Interview request', 'Job opportunity', 'Project enquiry', 'Collaboration', 'General question'],
    head: 'New message from your portfolio', f: ['Name', 'Topic', 'Message'], dash: 'Not specified',
  },
  ar: {
    title: 'تواصل معي', sub: 'توظيف أو مشروع أو سؤال سريع — اختر الموضوع وأرسل. تصلني مباشرة على واتساب.',
    loc: 'كوالالمبور، ماليزيا', locSub: 'أقيم في ماليزيا · متاح للعمل عن بعد أو حضورياً', mail: 'أرسل بالبريد',
    name: 'اسمك', msg: 'رسالتك', send: 'أرسل عبر واتساب',
    typeT: 'الموضوع', types: ['طلب مقابلة', 'فرصة عمل', 'استفسار عن مشروع', 'تعاون', 'سؤال عام'],
    head: 'رسالة جديدة من البورتفوليو', f: ['الاسم', 'الموضوع', 'الرسالة'], dash: 'غير محدد',
  },
};
function Chips({ items, v, set }: { items: string[]; v: number | null; set: (i: number | null) => void }) {
  return <div className="flex flex-wrap gap-1.5">{items.map((x, i) => (
    <button type="button" key={x} onClick={() => set(v === i ? null : i)} className="cchip" data-on={v === i}>{x}</button>
  ))}</div>;
}

export default function App() {
  const [lang, setLang] = useState<L>(() => (localStorage.getItem('lang') as L) || (navigator.language.startsWith('ar') ? 'ar' : 'en'));
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (localStorage.getItem('theme') as any) || 'dark');
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [ty, setTy] = useState<number | null>(null);
  const t = T[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('theme', theme); } catch {}
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', theme === 'dark' ? '#07070a' : '#f6f2ea');
  }, [theme]);
  const c = CT[lang];
  const brief = [`*${c.head}*`, `• ${c.f[0]}: ${name || c.dash}`, `• ${c.f[1]}: ${ty !== null ? c.types[ty] : c.dash}`, `• ${c.f[2]}: ${msg || c.dash}`].join('\n');
  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(brief)}`;
  const mailto = `mailto:${MAIL}?subject=${encodeURIComponent(`${ty !== null ? c.types[ty] : c.head}${name ? ' — ' + name : ''}`)}&body=${encodeURIComponent(brief.replace(/\*/g, ''))}`;
  const ids = ['services', 'work', 'about', 'contact'];

  return (
    <div className="relative overflow-x-clip">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#07070a]/70 border-b border-white/5">
        <div className="wrap h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-wide text-[15px]"><span className="flex items-center gap-2.5"><img src={img('alsenwi.jpg')} alt="Ahmed Al-Senwi" className="w-8 h-8 rounded-full object-cover object-top" style={{ boxShadow: '0 0 0 1.5px var(--gold), 0 0 14px rgba(226,185,79,.35)' }} /><span className="text-[13.5px] font-medium">{lang === 'ar' ? 'أحمد الصنوي' : 'Ahmed Al-Senwi'}</span></span></a>
          <nav className="hidden md:flex gap-7 text-[13px] text-white/60">
            {t.nav.map((n, i) => <a key={n} href={`#${ids[i]}`} className="hover:text-white transition">{n}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="chip hover:text-white" aria-label="language">{lang === 'en' ? 'عربي' : 'EN'}</button>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="chip hover:text-white !px-2.5" aria-label="theme">{theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}</button>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-gold !py-1.5 !px-4 !text-[13.5px] hidden sm:inline-flex">{t.cta}</a>
          </div>
        </div>
      </header>

      <section id="top" className="relative pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="glow drift bg-[#d4b25c] w-72 h-72 -top-10 start-[8%]" />
        <div className="glow bg-[#3b2a7a] w-80 h-80 top-20 end-[2%]" />
        <div className="wrap relative">
          <motion.div {...fade} className="max-w-[720px]">
            <span className="eyebrow">{t.eyebrow}</span>
            <h1 className="mt-4 text-[34px] sm:text-[46px] leading-[1.12] font-semibold tracking-tight">
              {t.h1a} <span className="gold">{t.h1b}</span>
            </h1>
            <p className="mt-5 text-white/60 max-w-[560px] text-[15.5px]">{t.sub}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={wa} target="_blank" rel="noreferrer" className="btn btn-gold"><MessageCircle size={15} />{t.cta}</a>
              <a href="#work" className="btn btn-line">{t.see}<ChevronRight size={14} className="rtl:rotate-180" /></a>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">{t.chips.map(c => <span key={c} className="chip"><Sparkles size={11} className="text-[color:var(--gold)]" />{c}</span>)}</div>
          </motion.div>
        </div>
      </section>

      <div className="hair" />

      <section id="services" className="py-14 scroll-mt-14">
        <div className="wrap">
          <motion.h2 {...fade} className="text-[22px] font-semibold mb-6">{t.sTitle}</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {t.services.map(([h, d, Icon]: any, i: number) => (
              <motion.div key={h} {...fade} transition={{ ...fade.transition, delay: i * 0.07 }} className="card p-5">
                <Icon size={19} className="text-[color:var(--gold)]" />
                <h3 className="mt-3.5 font-medium text-[15px]">{h}</h3>
                <p className="mt-1.5 text-[13px] text-white/55 leading-relaxed">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="py-14 scroll-mt-14">
        <div className="wrap">
          <motion.h2 {...fade} className="text-[22px] font-semibold mb-6">{t.wTitle}</motion.h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            {t.work.map(([h, k, d, im, href]: string[], i: number) => {
              const Wrap: any = href ? 'a' : 'div';
              return (
                <motion.div key={h} {...fade} transition={{ ...fade.transition, delay: (i % 3) * 0.07 }}>
                  <Wrap {...(href ? { href, target: '_blank', rel: 'noreferrer' } : {})} className="card block overflow-hidden group">
                    <div className="h-28 sm:h-40 relative overflow-hidden bg-gradient-to-br from-[#1b1710] via-[#0d0d12] to-[#141026]">
                      {im ? <img src={img(im.replace('logo:', ''))} alt={h} loading="lazy" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} className={im.startsWith('logo:') ? 'absolute inset-0 z-10 w-full h-full object-contain bg-white p-2 group-hover:scale-[1.04] transition duration-700' : 'absolute inset-0 z-10 w-full h-full object-cover object-top group-hover:scale-[1.05] transition duration-700'} />
                        : null}
                      <div className="absolute inset-0 grid place-items-center text-[24px] font-semibold gold tracking-wide z-0 pointer-events-none">{h}</div>
                      {href && <span className="absolute z-20 top-2 end-2 text-[10px] tracking-wider font-semibold px-2 py-0.5 rounded-full bg-black/55 text-white backdrop-blur flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />LIVE</span>}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between"><span className="eyebrow !text-[10px]">{k}</span>{href && <ArrowUpRight size={14} className="text-white/40 group-hover:text-[color:var(--gold)] transition rtl:-scale-x-100" />}</div>
                      <h3 className="mt-1.5 font-medium text-[15px]">{h}</h3>
                      <p className="mt-1 text-[13.5px] text-white/50 leading-relaxed">{d}</p>
                    </div>
                  </Wrap>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

            <section id="process" className="py-10 scroll-mt-14">
        <div className="wrap">
          <motion.h2 {...fade} className="text-[22px] font-semibold mb-6">{t.pTitle}</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {t.process.map(([h, d], i) => (
              <motion.div key={h} {...fade} transition={{ ...fade.transition, delay: i * 0.08 }} className="card p-5">
                <div className="gold text-[26px] font-semibold leading-none">0{i + 1}</div>
                <h3 className="mt-3 font-medium text-[15px]">{h}</h3>
                <p className="mt-1 text-[13px] text-white/55">{d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      <section id="about" className="py-14 scroll-mt-14">
        <div className="wrap">
          <motion.h2 {...fade} className="text-[22px] font-semibold mb-2">{t.aTitle}</motion.h2>
          <motion.p {...fade} className="text-[14.5px] text-white/60 max-w-[680px] mb-6">{t.about}</motion.p>
          <div className="grid lg:grid-cols-5 gap-4">
            <motion.div {...fade} className="card p-5 lg:col-span-3 flex flex-col">
              <div className="flex items-center gap-2 eyebrow"><Briefcase size={13} />{t.jTitle}</div>
              <div className="mt-4 flex-1 flex flex-col justify-between gap-6 border-s border-white/10 ps-5">
                {t.exp.map(([r, c, d, pts]: any, i: number) => (
                  <div key={r} className="relative xrow">
                    <span className="absolute -start-[25px] top-3 w-2 h-2 rounded-full bg-[color:var(--gold)]" />
                    <Wrap href={EXP_META[i][1]} className="xhead">
                      <Logo src={EXP_META[i][0]} name={c} />
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline justify-between gap-x-3"><h3 className="font-medium text-[15.5px]">{r}</h3><span className="text-[12.5px] text-white/40">{d}</span></span>
                        <span className="block text-[13.5px] text-[color:var(--gold)]">{c}{EXP_META[i][1] && <ArrowUpRight size={11} className="inline ms-1 -mt-0.5" />}</span>
                      </span>
                    </Wrap>
                    <div className="xbody"><ul className="text-[13.5px] text-white/55 leading-relaxed list-disc ps-4 pt-1.5">{pts.map((x: string) => <li key={x}>{x}</li>)}</ul></div>
                  </div>
                ))}
              </div>
            </motion.div>
            <div className="lg:col-span-2 flex flex-col gap-3.5">
              <motion.div {...fade} className="card p-5">
                <div className="flex items-center gap-2 eyebrow"><GraduationCap size={14} />{lang === 'ar' ? 'التعليم' : 'Education'}</div>
                <div className="xrow mt-3">
                  <Wrap href={EDU_META[1]} className="xhead">
                    <Logo src={EDU_META[0]} name="UTeM" size={44} />
                    <span className="min-w-0 flex-1"><h3 className="font-medium text-[15.5px]">{t.edu[0]}</h3><span className="block text-[13.5px] text-[color:var(--gold)]">{t.edu[1]}<ArrowUpRight size={11} className="inline ms-1 -mt-0.5" /></span><span className="block text-[12.5px] text-white/40">{t.edu[2]}</span></span>
                  </Wrap>
                  <div className="xbody"><ul className="text-[13.5px] text-white/55 leading-relaxed list-disc ps-4 pt-1.5">{(t.edu[3] as string[]).map(x => <li key={x}>{x}</li>)}</ul></div>
                </div>
              </motion.div>
              <motion.div {...fade} className="card p-5">
                <div className="flex items-center gap-2 eyebrow"><Award size={14} />{t.certTitle}</div>
                <div className="mt-2.5 flex flex-col gap-1.5">{t.certs.map((x, i) => (
                  <div key={x}><Wrap href={CERT_META[i][1]} className="xhead xcert">
                    <Logo src={CERT_META[i][0]} name={x} size={30} />
                    <span className="flex-1 text-[13.5px] text-white/70">{x}{CERT_META[i][1] && <ArrowUpRight size={11} className="inline ms-1 -mt-0.5 opacity-60" />}</span>
                  </Wrap></div>
                ))}</div>
              </motion.div>
              <motion.div {...fade} className="card p-5">
                <div className="flex items-center gap-2 eyebrow"><LangIcon size={14} />{t.langTitle}</div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">{t.langs.map(([n, l]: string[]) => <span key={n} className="chip">{n} · {l}</span>)}</div>
              </motion.div>
            </div>
          </div>
          <motion.div {...fade} className="skwrap p-5 sm:p-7 mt-5">
            <div className="flex items-end justify-between flex-wrap gap-2"><div><div className="text-[11px] tracking-[.24em] uppercase font-semibold sk-gold">{t.skTitle}</div><h3 className="mt-1 text-[20px] sm:text-[24px] font-semibold sk-ink">{lang === 'ar' ? 'من الفكرة إلى نظام يعمل' : 'From idea to a working system'}</h3></div><div className="text-[12px] sk-mut">{lang === 'ar' ? 'واجهات · خلفية · جوال · أدوات' : 'Frontend · Backend · Mobile · Tooling'}</div></div>
            <SkillsLab lang={lang} dark={theme === 'dark'} />
          </motion.div>
        </div>
      </section>
      <div className="hair" />

      <section id="contact" className="py-16 scroll-mt-14 relative">
        <div className="glow bg-[#d4b25c] w-64 h-64 bottom-0 end-[10%] opacity-20" />
        <div className="wrap relative grid lg:grid-cols-5 gap-8 items-start">
          <motion.div {...fade} className="lg:col-span-2 flex flex-col gap-5">
            <div>
              <h2 className="text-[28px] font-semibold leading-tight">{c.title}</h2>
              <p className="mt-2 text-white/60 text-[14.5px]">{c.sub}</p>
            </div>
            <div className="flex flex-col gap-1.5 text-[14.5px]">
              <span className="flex items-center gap-2 font-medium"><MapPin size={16} className="text-[color:var(--gold)]" />{c.loc}</span>
              <span className="text-[13px] text-white/55 ps-6">{c.locSub}</span>
            </div>
            <div className="flex flex-col gap-2.5 text-[14px]">
              <a className="flex items-center gap-3 text-white/75 hover:text-white" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"><MessageCircle size={16} className="text-[color:var(--gold)]" /><span dir="ltr">{WA_SHOW}</span></a>
              <a className="flex items-center gap-3 text-white/75 hover:text-white" href={`mailto:${MAIL}`}><Mail size={16} className="text-[color:var(--gold)]" />{MAIL}</a>
              <a className="flex items-center gap-3 text-white/75 hover:text-white" href={LI} target="_blank" rel="noreferrer"><Linkedin size={16} className="text-[color:var(--gold)]" />LinkedIn</a>
              <a className="flex items-center gap-3 text-white/75 hover:text-white" href={GH} target="_blank" rel="noreferrer"><Github size={16} className="text-[color:var(--gold)]" />GitHub</a>
            </div>
          </motion.div>
          <motion.form {...fade} onSubmit={e => { e.preventDefault(); window.open(wa, '_blank'); }} className="card p-5 sm:p-6 flex flex-col gap-4 lg:col-span-3">
            <div><div className="eyebrow mb-2">{c.typeT}</div><Chips items={c.types} v={ty} set={setTy} /></div>
            <input required value={name} onChange={e => setName(e.target.value)} placeholder={c.name} />
            <textarea required rows={5} value={msg} onChange={e => setMsg(e.target.value)} placeholder={c.msg} />
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button className="btn btn-gold justify-center flex-1"><MessageCircle size={15} />{c.send}</button>
              <a href={mailto} className="btn justify-center flex-1" style={{ border: '1px solid var(--line)' }}><Mail size={15} />{c.mail}</a>
            </div>
          </motion.form>
        </div>
      </section>

      <footer className="border-t border-white/5 py-6 text-center text-[12px] text-white/35">© {new Date().getFullYear()} {t.rights}</footer>
    </div>
  );
}
