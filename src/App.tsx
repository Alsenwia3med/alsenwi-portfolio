import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Mail, Linkedin, Github, MessageCircle, Globe, LayoutDashboard, Building2, QrCode, Sparkles, ChevronRight } from 'lucide-react';

type L = 'en' | 'ar';
const WA = '601162206173';
const MAIL = 'alsanwi2019@gmail.com';
const LI = 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/';
const GH = 'https://github.com/Alsenwia3med';
const img = (p: string) => `${import.meta.env.BASE_URL}images/${p}`;

const T = {
  en: {
    nav: ['Services', 'Work', 'Process', 'Contact'],
    cta: 'Start a project',
    eyebrow: 'Full-stack developer · UI/UX designer · Malaysia',
    h1a: 'Websites and systems',
    h1b: 'that make companies look — and run — like leaders.',
    sub: 'I design and build luxury websites, dashboards and business systems for Arab and Malaysian companies. One person accountable from design to launch.',
    see: 'See the work',
    chips: ['Arabic · English · Bahasa', 'Malaysia · Gulf · Worldwide', 'RTL-first design'],
    sTitle: 'What I build',
    services: [
      ['Luxury websites', 'Fast, bilingual (Arabic/English) sites that turn visitors into enquiries.', Globe],
      ['Dashboards', 'Live control panels for sales, finance and operations — on phone and desktop.', LayoutDashboard],
      ['Company systems', 'Registration, bookings, CRM and workflow automation built around how you work.', Building2],
      ['QR menus & e-commerce', 'Menus, ordering and online stores that are simple to manage.', QrCode],
    ],
    wTitle: 'Selected work',
    work: [
      ['Inspire U', 'Education platform', 'Student registration platform with bilingual site and lead flow.', 'Inspire-U.png', 'https://inspire-u.net/'],
      ['SDC Dashboard', 'Fintech analytics', 'Real-time monitoring dashboard built during an industrial training internship.', 'SDC%20Dashboard.png', 'https://sdc.cx/'],
      ['Astra Bot', 'Automation', 'Python-based trading automation with its own web presence.', 'astra.png', 'https://astra-bot.tech/'],
      ['YCIM', 'Community portal', 'WordPress/Elementor portal for the Yemeni Community in Malaysia.', '', 'https://ycim.org/'],
      ['Safar Easy', 'Tourism', 'Arabic/RTL luxury redesign for a Malaysia tourism company.', '', ''],
      ['Melaka Tourist Guide', 'Travel', 'Interactive guide with maps and local insights.', 'melaka.jpeg', ''],
    ],
    pTitle: 'How we work',
    process: [['Discover', 'A short call: goals, audience, timeline.'], ['Design', 'You see the look first — approve before any build.'], ['Build & launch', 'Clean code, fast load, handover and support.']],
    aTitle: 'About',
    about: 'Computer Science graduate (UTeM, 2026) with hands-on work across fintech, education and tourism. I pair a designer’s eye with full-stack engineering, so what looks premium also performs.',
    skills: ['React', 'Next.js', 'Tailwind', 'PHP', 'Python', 'SQL', 'Node.js', 'Figma', 'REST APIs', 'WordPress'],
    cTitle: 'Let’s talk about your project',
    cSub: 'Message me on WhatsApp — I reply fast.',
    name: 'Your name', msg: 'Tell me briefly what you need', send: 'Send on WhatsApp',
    rights: 'Ahmed Al-Senwi · Malaysia',
  },
  ar: {
    nav: ['الخدمات', 'أعمالي', 'طريقة العمل', 'تواصل'],
    cta: 'ابدأ مشروعك',
    eyebrow: 'مطوّر ومصمم واجهات · ماليزيا',
    h1a: 'مواقع وأنظمة',
    h1b: 'تجعل شركتك تبدو — وتعمل — كالكبار.',
    sub: 'أصمّم وأبني مواقع فخمة ولوحات تحكم وأنظمة أعمال للشركات العربية والماليزية. مسؤول واحد من التصميم حتى الإطلاق.',
    see: 'شاهد الأعمال',
    chips: ['عربي · English · Bahasa', 'ماليزيا · الخليج · العالم', 'تصميم يبدأ من RTL'],
    sTitle: 'ماذا أبني',
    services: [
      ['مواقع فاخرة', 'مواقع سريعة بلغتين (عربي/إنجليزي) تحوّل الزائر إلى استفسار.', Globe],
      ['لوحات تحكم', 'لوحات حيّة للمبيعات والمالية والعمليات — على الجوال والكمبيوتر.', LayoutDashboard],
      ['أنظمة شركات', 'تسجيل وحجوزات وCRM وأتمتة مبنية على طريقة عملك.', Building2],
      ['منيو QR ومتاجر', 'قوائم وطلبات ومتاجر إلكترونية سهلة الإدارة.', QrCode],
    ],
    wTitle: 'أعمال مختارة',
    work: [
      ['Inspire U', 'منصة تعليمية', 'منصة تسجيل طلاب بموقع ثنائي اللغة ومسار استقبال العملاء.', 'Inspire-U.png', 'https://inspire-u.net/'],
      ['SDC Dashboard', 'تقنية مالية', 'لوحة متابعة لحظية بُنيت خلال تدريب صناعي.', 'SDC%20Dashboard.png', 'https://sdc.cx/'],
      ['Astra Bot', 'أتمتة', 'أتمتة تداول بلغة بايثون مع حضور ويب خاص.', 'astra.png', 'https://astra-bot.tech/'],
      ['YCIM', 'بوابة مجتمع', 'بوابة ووردبريس/إلمنتور للجالية اليمنية في ماليزيا.', '', 'https://ycim.org/'],
      ['سفر إيز', 'سياحة', 'إعادة تصميم عربية فاخرة لشركة سياحة في ماليزيا.', '', ''],
      ['دليل ملقا السياحي', 'سفر', 'دليل تفاعلي بخرائط ومعلومات محلية.', 'melaka.jpeg', ''],
    ],
    pTitle: 'طريقة العمل',
    process: [['الاستكشاف', 'مكالمة قصيرة: الهدف والجمهور والموعد.'], ['التصميم', 'ترى الشكل أولاً — وتعتمد قبل أي بناء.'], ['البناء والإطلاق', 'كود نظيف وسرعة تحميل وتسليم ودعم.']],
    aTitle: 'نبذة',
    about: 'خريج علوم حاسب (UTeM، 2026) بخبرة عملية في التقنية المالية والتعليم والسياحة. أجمع عين المصمم مع هندسة الواجهات الكاملة، فما يبدو فاخراً يعمل بكفاءة.',
    skills: ['React', 'Next.js', 'Tailwind', 'PHP', 'Python', 'SQL', 'Node.js', 'Figma', 'REST APIs', 'WordPress'],
    cTitle: 'لنتحدث عن مشروعك',
    cSub: 'راسلني على واتساب — أرد بسرعة.',
    name: 'اسمك', msg: 'اكتب باختصار ما تحتاجه', send: 'أرسل عبر واتساب',
    rights: 'أحمد الصنوي · ماليزيا',
  },
};

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } };

export default function App() {
  const [lang, setLang] = useState<L>(() => (localStorage.getItem('lang') as L) || (navigator.language.startsWith('ar') ? 'ar' : 'en'));
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const t = T[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);
  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(`${name ? name + ' — ' : ''}${msg || (lang === 'ar' ? 'مرحباً أحمد، أرغب بمناقشة مشروع.' : 'Hi Ahmed, I would like to discuss a project.')}`)}`;
  const ids = ['services', 'work', 'process', 'contact'];

  return (
    <div className="relative overflow-x-clip">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#07070a]/70 border-b border-white/5">
        <div className="wrap h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold tracking-wide text-[15px]"><span className="gold">MR</span><span className="text-white/40 mx-2">/</span><span className="text-white/80 text-[13px]">{lang === 'ar' ? 'أحمد الصنوي' : 'Ahmed Al-Senwi'}</span></a>
          <nav className="hidden md:flex gap-7 text-[13px] text-white/60">
            {t.nav.map((n, i) => <a key={n} href={`#${ids[i]}`} className="hover:text-white transition">{n}</a>)}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} className="chip hover:text-white" aria-label="language">{lang === 'en' ? 'عربي' : 'EN'}</button>
            <a href={wa} target="_blank" rel="noreferrer" className="btn btn-gold !py-1.5 !px-4 !text-[12.5px] hidden sm:inline-flex">{t.cta}</a>
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
                    <div className="h-24 sm:h-32 relative overflow-hidden bg-gradient-to-br from-[#1b1710] via-[#0d0d12] to-[#141026]">
                      {im ? <img src={img(im)} alt={h} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.04] transition duration-500" />
                        : <div className="h-full grid place-items-center text-[26px] font-semibold gold tracking-wide">{h}</div>}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between"><span className="eyebrow !text-[10px]">{k}</span>{href && <ArrowUpRight size={14} className="text-white/40 group-hover:text-[color:var(--gold)] transition rtl:-scale-x-100" />}</div>
                      <h3 className="mt-1.5 font-medium text-[15px]">{h}</h3>
                      <p className="mt-1 text-[12.5px] text-white/50 leading-relaxed">{d}</p>
                    </div>
                  </Wrap>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="py-14 scroll-mt-14">
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
          <motion.div {...fade} className="card p-5 mt-3.5 md:flex gap-8 items-start">
            <div className="md:w-1/2"><h3 className="eyebrow">{t.aTitle}</h3><p className="mt-2 text-[13.5px] text-white/60">{t.about}</p></div>
            <div className="md:w-1/2 mt-4 md:mt-0 flex flex-wrap gap-1.5">{t.skills.map(s => <span key={s} className="chip">{s}</span>)}</div>
          </motion.div>
        </div>
      </section>

      <div className="hair" />

      <section id="contact" className="py-16 scroll-mt-14 relative">
        <div className="glow bg-[#d4b25c] w-64 h-64 bottom-0 end-[10%] opacity-20" />
        <div className="wrap relative grid md:grid-cols-2 gap-10 items-start">
          <motion.div {...fade}>
            <h2 className="text-[26px] font-semibold leading-tight">{t.cTitle}</h2>
            <p className="mt-2 text-white/55 text-[14px]">{t.cSub}</p>
            <div className="mt-6 flex flex-col gap-2.5 text-[13.5px]">
              <a className="flex items-center gap-3 text-white/70 hover:text-white" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer"><MessageCircle size={16} className="text-[color:var(--gold)]" />+60 11-6220 6173</a>
              <a className="flex items-center gap-3 text-white/70 hover:text-white" href={`mailto:${MAIL}`}><Mail size={16} className="text-[color:var(--gold)]" />{MAIL}</a>
              <a className="flex items-center gap-3 text-white/70 hover:text-white" href={LI} target="_blank" rel="noreferrer"><Linkedin size={16} className="text-[color:var(--gold)]" />LinkedIn</a>
              <a className="flex items-center gap-3 text-white/70 hover:text-white" href={GH} target="_blank" rel="noreferrer"><Github size={16} className="text-[color:var(--gold)]" />GitHub</a>
            </div>
          </motion.div>
          <motion.form {...fade} onSubmit={e => { e.preventDefault(); window.open(wa, '_blank'); }} className="card p-5 flex flex-col gap-3">
            <input value={name} onChange={e => setName(e.target.value)} placeholder={t.name} />
            <textarea rows={4} value={msg} onChange={e => setMsg(e.target.value)} placeholder={t.msg} />
            <button className="btn btn-gold justify-center"><MessageCircle size={15} />{t.send}</button>
          </motion.form>
        </div>
      </section>

      <footer className="border-t border-white/5 py-6 text-center text-[12px] text-white/35">© {new Date().getFullYear()} {t.rights}</footer>
    </div>
  );
}
