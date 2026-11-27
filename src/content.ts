// Every viewer-facing line lives here, in English and Arabic.
// Facts only: roles, dates, places, what was built. No sales copy.
export type Lang = 'en' | 'ar';
type L2 = { en: string; ar: string };
const b = (en: string, ar: string): L2 => ({ en, ar });

export const CONTACT = {
  wa: '60143646834',
  waShow: '+60 14-364 6834',
  mail: 'alsanwi2019@gmail.com',
  li: 'https://www.linkedin.com/in/alsenwi-ahmed-16381136a/',
  liShow: 'alsenwi-ahmed',
  gh: 'https://github.com/Alsenwia3med',
  ghShow: 'Alsenwia3med',
};
export const img = (p: string) => `${import.meta.env.BASE_URL}images/${p}`;

/* ------------------------------ roles ------------------------------ */
export type RoleId = 'roots' | 'sdc' | 'inspire';
type RoleSrc = { id: RoleId; org: string; logo?: string; href?: string; date: number; end?: number; when: L2; role: L2; place: L2; about: L2; pts: L2[]; stack: string[]; current?: boolean; tag?: L2 };
const ROLES: RoleSrc[] = [
  {
    id: 'roots', org: 'ROOTS-AI', logo: 'roots-sq.png', href: 'https://roots-ai.health/', date: 2026.3, current: true,
    when: b('Present', 'حالياً'),
    role: b('Software Engineer', 'مهندس برمجيات'),
    place: b('Health AI', 'ذكاء اصطناعي صحي'),
    about: b('ROOTS-AI is a health AI company that works with businesses. I am part of the product team, building the screens its customers use every day.',
      'ROOTS-AI شركة ذكاء اصطناعي صحي تعمل مع المؤسسات. أعمل ضمن فريق المنتج على بناء الشاشات التي يستخدمها عملاؤها يومياً.'),
    pts: [
      b('Dashboards for personal users, clinics and universities', 'لوحات تحكم للأفراد والعيادات والجامعات'),
      b('Homepage designs for the company’s official website', 'تصميمات الصفحة الرئيسية لموقع الشركة الرسمي'),
      b('Taking each feature from the written brief to a finished screen', 'تحويل كل ميزة من وصفها المكتوب إلى شاشة جاهزة'),
      b('Keeping the product’s look consistent as it grows', 'الحفاظ على هوية المنتج موحّدة مع توسّعه'),
    ],
    stack: [],
  },
  {
    id: 'sdc', org: 'Six Digit Club Sdn Bhd', logo: 'sdc-sq.png', href: 'https://sdc.cx/', date: 2025.79, end: 2026.2,
    when: b('Oct 2025 – Mar 2026', 'أكتوبر 2025 – مارس 2026'),
    role: b('Full-Stack Developer, Industrial Training', 'مطوّر واجهات كاملة، تدريب صناعي'),
    place: b('Fintech · Selangor', 'تقنية مالية · سيلانجور'),
    about: b('Six months on sdc.cx, a live fintech and investment-learning platform. Over 450 hours of production work across the user side and the admin side.',
      'ستة أشهر على منصة sdc.cx، منصة مالية وتعليمية للاستثمار تعمل مباشرة. أكثر من 450 ساعة عمل فعلي على جهة المستخدم وجهة الإدارة.'),
    pts: [
      b('Investor portal and admin panel, including capital requests and the termination flow', 'بوابة المستثمر ولوحة الإدارة، بما فيها طلبات رأس المال ومسار إنهاء الاستثمار'),
      b('Email automation dashboard on the Brevo API: batches, media, templates, 300+ contact lists', 'لوحة أتمتة البريد على Brevo API: دفعات ووسائط وقوالب لأكثر من 300 قائمة'),
      b('Referral tracking, e-learning access and payment gateway integration', 'تتبّع الإحالات وربط التعليم الإلكتروني ببوابات الدفع'),
      b('Auth middleware and session checks in PHP', 'طبقة المصادقة وفحص الجلسات بـ PHP'),
      b('Real-time React and Chart.js dashboard: 5 KPIs, refreshed every 30 seconds', 'لوحة React وChart.js لحظية: 5 مؤشرات تتحدث كل 30 ثانية'),
      b('Redesigned 60+ pages in Figma, then rebuilt the landing, 30/60-day and Early Bird pages', 'إعادة تصميم أكثر من 60 صفحة في Figma، ثم إعادة بناء صفحات الهبوط و30/60 يوم والـ Early Bird'),
    ],
    stack: ['React', 'PHP', 'MySQL', 'Brevo API', 'Chart.js', 'Figma'],
  },
  {
    id: 'inspire', org: 'Inspire-U', logo: 'inspire-sq.png', href: 'https://inspire-u.net/', date: 2025.6,
    when: b('Aug 2025 – Present', 'أغسطس 2025 – حالياً'),
    tag: b('Part-time', 'دوام جزئي'),
    role: b('UI/UX and Full-Stack Developer', 'مطوّر UI/UX وواجهات كاملة'),
    place: b('Edtech · Melaka', 'تعليم · ملقا'),
    about: b('Inspire-U handles university admission, visas, housing and arrival for international students coming to Malaysia. I built and maintain the platform behind it.',
      'Inspire-U تتولى القبول الجامعي والتأشيرة والسكن والاستقبال للطلاب الدوليين القادمين إلى ماليزيا. بنيت المنصة التي تدير ذلك وأتولى صيانتها.'),
    pts: [
      b('Platform architecture on PHP, MySQL and REST APIs', 'معمارية المنصة على PHP وMySQL وواجهات REST'),
      b('Rebuilt the student management system', 'إعادة بناء نظام إدارة الطلاب'),
      b('Automated about 70% of internal workflows', 'أتمتة نحو 70% من سير العمل الداخلي'),
      b('Bilingual public site with a registration and lead flow', 'موقع عام بلغتين مع مسار تسجيل واستقبال الطلبات'),
    ],
    stack: ['PHP', 'MySQL', 'REST APIs', 'Supabase', 'Figma'],
  },
];

/* ------------------------------ projects ------------------------------ */
type ProjSrc = { id: string; name: L2; img: string; logo?: boolean; href?: string; year: string; kind: L2; line: L2; did: L2[]; stack: string[]; context: L2 };
const PROJECTS: ProjSrc[] = [
  { id: 'roots', name: b('ROOTS-AI dashboards', 'لوحات ROOTS-AI'), img: 'roots.jpg', href: 'https://roots-ai.health/', year: '2026', kind: b('Health AI', 'ذكاء صحي'), context: b('At ROOTS-AI', 'في ROOTS-AI'),
    line: b('Product dashboards for personal users, clinics and universities.', 'لوحات المنتج للأفراد والعيادات والجامعات.'),
    did: [b('Dashboards for personal users and clinics', 'لوحات للأفراد والعيادات'), b('A new dashboard for the universities sector', 'لوحة جديدة لقطاع الجامعات'), b('Homepage designs for the official website', 'تصميمات الصفحة الرئيسية للموقع الرسمي')],
    stack: [] },
  { id: 'sdc', name: b('SDC investor platform', 'منصة SDC للمستثمرين'), img: 'sdc-card.jpg', href: 'https://sdc.cx/', year: '2025–26', kind: b('Fintech', 'تقنية مالية'), context: b('Industrial training', 'تدريب صناعي'),
    line: b('Investor portal, admin panel and email automation on a live platform.', 'بوابة مستثمرين ولوحة إدارة وأتمتة بريد على منصة حية.'),
    did: [b('Capital requests and termination flow, user and admin side', 'طلبات رأس المال ومسار الإنهاء من جهة المستخدم والإدارة'), b('Brevo email dashboard across 300+ lists', 'لوحة بريد Brevo لأكثر من 300 قائمة'), b('Live KPI dashboard with a 30-second refresh', 'لوحة مؤشرات لحظية تتحدث كل 30 ثانية')],
    stack: ['React', 'PHP', 'MySQL', 'Chart.js'] },
  { id: 'inspire', name: b('Inspire-U platform', 'منصة Inspire-U'), img: 'Inspire-U.png', href: 'https://inspire-u.net/', year: '2025', kind: b('Edtech', 'تعليم'), context: b('At Inspire-U', 'في Inspire-U'),
    line: b('Registration and student management for international students.', 'التسجيل وإدارة الطلاب الدوليين.'),
    did: [b('REST API backend in PHP and MySQL', 'خلفية REST بـ PHP وMySQL'), b('Student management system rebuilt', 'إعادة بناء نظام إدارة الطلاب'), b('About 70% of internal workflows automated', 'أتمتة نحو 70% من سير العمل')],
    stack: ['PHP', 'MySQL', 'REST'] },
  { id: 'ycim', name: b('YCIM portal', 'بوابة YCIM'), img: 'ycim.jpg', href: 'https://ycim.org/', year: '2026', kind: b('Community', 'مجتمع'), context: b('Designed and built', 'تصميم وتنفيذ'),
    line: b('Web portal for the Yemeni Community in Malaysia, launched August 2026.', 'بوابة الجالية اليمنية في ماليزيا، أُطلقت في أغسطس 2026.'),
    did: [b('Information architecture and visual design', 'هيكلة المحتوى والتصميم البصري'), b('Arabic and English layouts', 'تخطيط بالعربية والإنجليزية'), b('Custom CSS on top of WordPress and Elementor', 'CSS مخصص فوق WordPress وElementor')],
    stack: ['WordPress', 'Elementor', 'CSS'] },
  { id: 'safar', name: b('Safar Easy', 'سفر إيز'), img: 'safar.jpg', logo: true, href: 'https://paleturquoise-wasp-229356.hostingersite.com/', year: '2026', kind: b('Tourism', 'سياحة'), context: b('Redesign and admin', 'إعادة تصميم ولوحة إدارة'),
    line: b('Arabic-first redesign and a full admin dashboard for a Malaysia tourism company.', 'إعادة تصميم عربية ولوحة إدارة كاملة لشركة سياحة في ماليزيا.'),
    did: [b('Home, About and Services pages on a new design system', 'الصفحات الرئيسية ومن نحن والخدمات على نظام تصميم جديد'), b('Admin for apartments, cars, tour programs and student services', 'إدارة الشقق والسيارات والبرامج السياحية وخدمات الطلاب'), b('Admin and staff roles with per-section permissions', 'أدوار المدير والموظفين بصلاحيات لكل قسم')],
    stack: ['WordPress', 'Elementor', 'PHP', 'RTL'] },
  { id: 'astra', name: b('Astra Bot', 'Astra Bot'), img: 'astra.jpg', href: 'https://astra-bot.tech/', year: '2025', kind: b('Automation', 'أتمتة'), context: b('Personal project', 'مشروع شخصي'),
    line: b('Python trading automation with its own website.', 'أتمتة تداول ببايثون مع موقع خاص.'),
    did: [b('Automation logic in Python', 'منطق الأتمتة ببايثون'), b('Product website', 'موقع المنتج')],
    stack: ['Python', 'Web'] },
  { id: 'emart', name: b('E-Mart', 'E-Mart'), img: 'emart.jpg', year: '2024', kind: b('Mobile', 'جوال'), context: b('University project', 'مشروع جامعي'),
    line: b('Cross-platform shopping app with catalog and cart.', 'تطبيق تسوق متعدد المنصات بكتالوج وسلة.'),
    did: [b('Product catalog and cart flow', 'كتالوج المنتجات ومسار السلة'), b('State management in Flutter', 'إدارة الحالة في Flutter')],
    stack: ['Flutter', 'Dart'] },
];


/* ------------------------------ details: one plain sentence per bullet ------------------------------ */
const DET_ROLE: Record<string, L2[]> = {
  roots: [
    b('The Personal and Clinics dashboards follow the team’s own design. I used the same house style to build a new dashboard for the Universities sector.', 'لوحتا الأفراد والعيادات على تصميم الفريق. استخدمت الأسلوب نفسه لبناء لوحة جديدة لقطاع الجامعات.'),
    b('Several homepage design directions for the official website, prepared side by side so they can be reviewed and approved.', 'عدة اتجاهات لتصميم الصفحة الرئيسية للموقع الرسمي، مجهّزة جنباً إلى جنب لتتم مراجعتها واعتمادها.'),
    b('Requirement files come from the team. I turn each one into a working screen instead of leaving it as a document.', 'تصل ملفات المتطلبات من الفريق، وأحوّل كل ملف منها إلى شاشة تعمل بدل أن يبقى وثيقة.'),
    b('New dashboards reuse the existing house style, so the product still reads as one product as it grows.', 'اللوحات الجديدة تعيد استخدام الأسلوب الحالي، فيبقى المنتج يبدو واحداً مهما كبر.'),
  ],
  sdc: [
    b('Both sides of the platform: what the investor sees, and what the admin uses to handle the same request.', 'جهتا المنصة معاً: ما يراه المستثمر، وما يستخدمه المسؤول للتعامل مع الطلب نفسه.'),
    b('Sending batches, uploading media, managing templates and working with more than 300 contact lists from one dashboard, through Brevo’s API.', 'إرسال الدفعات ورفع الوسائط وإدارة القوالب والعمل على أكثر من 300 قائمة جهات اتصال من لوحة واحدة عبر Brevo API.'),
    b('Following who referred whom, giving members access to the e-learning content, and connecting the payment gateways.', 'تتبّع من أحال من، وإعطاء الأعضاء الوصول إلى المحتوى التعليمي، وربط بوابات الدفع.'),
    b('A PHP check (auth_check.php) that runs before protected pages and confirms the user and the session.', 'فحص PHP (auth_check.php) يعمل قبل الصفحات المحمية ويتأكد من المستخدم والجلسة.'),
    b('Five key numbers on one screen, drawn with Chart.js and refreshed on their own every 30 seconds.', 'خمسة أرقام رئيسية في شاشة واحدة، مرسومة بـ Chart.js وتتحدث تلقائياً كل 30 ثانية.'),
    b('Redesigned in Figma first, then rebuilt in code: the landing page, the 30/60-day pages and the Early Bird page.', 'أعدت تصميمها في Figma أولاً ثم بنيتها بالكود: صفحة الهبوط وصفحات 30/60 يوم وصفحة Early Bird.'),
  ],
  inspire: [
    b('How the system is organised: PHP for the logic, MySQL for the data, and REST APIs between the screens and the data.', 'كيف يُنظَّم النظام: PHP للمنطق وMySQL للبيانات وواجهات REST بين الشاشات والبيانات.'),
    b('Rebuilt the system staff use to follow each international student through admission, visa, housing and arrival.', 'أعدت بناء النظام الذي يتابع به الموظفون كل طالب دولي في القبول والتأشيرة والسكن والاستقبال.'),
    b('Replaced about 70% of the manual internal steps with automated flows.', 'استبدلت نحو 70% من الخطوات الداخلية اليدوية بمسارات آلية.'),
    b('A public site in two languages, with a registration form that feeds the lead flow.', 'موقع عام بلغتين، مع نموذج تسجيل يغذّي مسار استقبال الطلبات.'),
  ],
};

/* project write-ups: story, my role, headline numbers (all from my own project documents) */
const STORY: Record<string, { story: L2; role: L2; nums: [string, L2][] }> = {
  roots: {
    role: b('Frontend and UX engineer, product team', 'مهندس واجهات وتجربة مستخدم، فريق المنتج'),
    story: b('ROOTS-AI is a health AI company. On its product team I build the screens people actually use: the personal and clinic dashboards, a new dashboard for the universities sector in the same house style, and design directions for the official homepage. In October 2026 I also prepared the v1.21 website release package: every claim on the homepage and legal pages checked before and after, the rendered pages compared with the approved document word for word, then tested for accessibility and responsiveness. In November I sent the doctor a full status of the Personal dashboard, page by page, for sign-off.',
      'ROOTS-AI شركة ذكاء صحي. في فريق المنتج أبني الشاشات التي يستخدمها الناس فعلاً: لوحات الأفراد والعيادات، ولوحة جديدة لقطاع الجامعات بالأسلوب نفسه، واتجاهات تصميم للصفحة الرئيسية الرسمية. وفي أكتوبر 2026 جهّزت حزمة إصدار الموقع v1.21: كل ادعاء في الصفحة الرئيسية والصفحات القانونية راجعته قبل وبعد، وقارنت الصفحات المعروضة بالوثيقة المعتمدة كلمة بكلمة، ثم اختبرتها للوصول والاستجابة. وفي نوفمبر أرسلت للدكتورة حالة كاملة للوحة الأفراد، صفحة بصفحة، للاعتماد.'),
    nums: [['485', b('automated tests passing in the v1.21 release', 'اختباراً آلياً ناجحاً في إصدار v1.21')], ['12', b('sidebar pages built in the Personal dashboard', 'صفحة جانبية مبنية في لوحة الأفراد')], ['56', b('concept screens, one for each concept', 'شاشة مفاهيم، واحدة لكل مفهوم')], ['195', b('features from 20 health platforms reviewed in one report', 'ميزة من 20 منصة صحية في تقرير واحد')]],
  },
  sdc: {
    role: b('Full-stack developer, industrial training', 'مطوّر Full-Stack، تدريب صناعي'),
    story: b('A live fintech platform where I did my industrial training from October 2025 to March 2026. I built both sides of the capital request and termination flow (the investor submits, the admin handles), a Brevo email automation dashboard, and live KPI charts. The work ran on React, PHP and MySQL.',
      'منصة مالية حية أجريت فيها تدريبي الصناعي من أكتوبر 2025 إلى مارس 2026. بنيت جهتي مسار طلبات رأس المال والإنهاء (المستثمر يقدّم والمسؤول يعالج)، ولوحة أتمتة بريد على Brevo، ومخططات مؤشرات لحظية. والعمل على React وPHP وMySQL.'),
    nums: [['450+', b('hours on a live platform', 'ساعة على منصة حية')], ['300+', b('contact lists managed in one dashboard', 'قائمة جهات اتصال في لوحة واحدة')], ['30s', b('refresh cycle on the KPI dashboard', 'دورة تحديث لوحة المؤشرات')]],
  },
  inspire: {
    role: b('UI/UX and full-stack developer, part-time', 'مصمم UI/UX ومطوّر Full-Stack، دوام جزئي'),
    story: b('The registration and student management platform for international students. I wrote the PHP and MySQL REST API the screens depend on, rebuilt the student management system, and automated about 70% of the internal workflows, so staff follow each student from first contact to arrival in one place.',
      'منصة التسجيل وإدارة الطلاب الدوليين. كتبت واجهة REST بـ PHP وMySQL التي تعتمد عليها الشاشات، وأعدت بناء نظام إدارة الطلاب، وأتمتّ نحو 70% من سير العمل الداخلي، ليتابع الموظفون كل طالب من أول تواصل حتى الوصول في مكان واحد.'),
    nums: [['70%', b('of internal workflows automated', 'من سير العمل الداخلي تمت أتمتته')], ['1', b('system from first contact to arrival', 'نظام واحد من أول تواصل حتى الوصول')]],
  },
  ycim: {
    role: b('Designer and developer', 'مصمم ومطوّر'),
    story: b('The web portal of the Yemeni Community in Malaysia, launched in August 2026. I organised the content, designed the pages and built them on WordPress and Elementor with custom CSS, with Arabic and English layouts that each read naturally.',
      'البوابة الإلكترونية للجالية اليمنية في ماليزيا، أُطلقت في أغسطس 2026. نظّمت المحتوى وصممت الصفحات وبنيتها على WordPress وElementor بـ CSS مخصص، بتخطيطين عربي وإنجليزي يُقرأ كل منهما بشكل طبيعي.'),
    nums: [['2', b('languages, each with its own layout', 'لغتان، لكل منهما تخطيطها')], ['Aug 2026', b('launched and live', 'أُطلقت وهي تعمل')]],
  },
  safar: {
    role: b('Designer and developer', 'مصمم ومطوّر'),
    story: b('A tourism company in Malaysia that serves Arabic-speaking travellers. I redesigned the Home, About and Services pages on a new emerald-and-gold design system, laid out right-to-left, and built a full admin dashboard inside WordPress for apartments, cars, tour programs and student services, with admin and staff roles and per-section permissions.',
      'شركة سياحة في ماليزيا تخدم الزوار الناطقين بالعربية. أعدت تصميم صفحات الرئيسية ومن نحن والخدمات على نظام تصميم زمردي وذهبي بتخطيط من اليمين لليسار، وبنيت لوحة إدارة كاملة داخل WordPress للشقق والسيارات والبرامج السياحية وخدمات الطلاب، بأدوار مدير وموظفين وصلاحيات لكل قسم.'),
    nums: [['4', b('admin areas: apartments, cars, tours, student services', 'أقسام إدارة: الشقق والسيارات والجولات وخدمات الطلاب')], ['RTL', b('Arabic-first design system', 'نظام تصميم عربي أولاً')]],
  },
  astra: {
    role: b('Solo build', 'تنفيذ فردي'),
    story: b('A personal project: trading automation written in Python, and the website that presents it to visitors.', 'مشروع شخصي: أتمتة تداول مكتوبة ببايثون، والموقع الذي يعرّف الزوار بها.'),
    nums: [['1', b('person: design, logic and site', 'شخص واحد: التصميم والمنطق والموقع')]],
  },
  emart: {
    role: b('Student developer', 'مطوّر طالب'),
    story: b('A university project: a cross-platform shopping app in Flutter with a product catalog and a cart flow, where I handled how the app keeps track of what is on screen.', 'مشروع جامعي: تطبيق تسوق متعدد المنصات بـ Flutter بكتالوج منتجات ومسار سلة، وتولّيت فيه إدارة حالة ما يظهر على الشاشة.'),
    nums: [['2', b('platforms from one Flutter codebase', 'منصتان من قاعدة Flutter واحدة')]],
  },
};

const DET_PROJ: Record<string, L2[]> = {
  roots: [b('One for individual users and one for clinics, built to the team’s design.', 'واحدة للأفراد وواحدة للعيادات، على تصميم الفريق.'), b('Built in the same house style so it feels like part of the same product.', 'مبنية بالأسلوب نفسه لتبدو جزءاً من المنتج ذاته.'), b('Several design directions prepared for review.', 'عدة اتجاهات تصميم مجهّزة للمراجعة.')],
  sdc: [b('Screens for the investor to submit a request, and screens for the admin to handle it.', 'شاشات للمستثمر لتقديم الطلب وشاشات للمسؤول للتعامل معه.'), b('Batches, media and templates managed from one place.', 'الدفعات والوسائط والقوالب تُدار من مكان واحد.'), b('Five indicators drawn with Chart.js that refresh by themselves.', 'خمسة مؤشرات مرسومة بـ Chart.js وتتحدث وحدها.')],
  inspire: [b('The endpoints the screens call to read and write student data.', 'نقاط الاتصال التي تستدعيها الشاشات لقراءة بيانات الطلاب وكتابتها.'), b('Staff follow each student from first contact to arrival in one system.', 'يتابع الموظفون كل طالب من أول تواصل حتى الوصول في نظام واحد.'), b('Manual internal steps replaced by automated flows.', 'خطوات داخلية يدوية استُبدلت بمسارات آلية.')],
  ycim: [b('Organised the content for the community and designed the look of the pages.', 'نظّمت المحتوى للجالية وصممت مظهر الصفحات.'), b('Right-to-left and left-to-right layouts that each read naturally.', 'تخطيطان من اليمين لليسار ومن اليسار لليمين، كل منهما يُقرأ بشكل طبيعي.'), b('Elementor for the page structure, custom CSS for the finishing details.', 'Elementor لبنية الصفحات وCSS مخصص للتفاصيل النهائية.')],
  safar: [b('An emerald-and-gold design system with Cairo and Tajawal fonts, laid out right-to-left.', 'نظام تصميم بالزمردي والذهبي بخطي Cairo وTajawal، بتخطيط من اليمين لليسار.'), b('A full dashboard inside WordPress admin, with media, offers, blog posts and inquiries as well.', 'لوحة كاملة داخل إدارة WordPress، تشمل أيضاً الوسائط والعروض والمقالات والاستفسارات.'), b('Each staff member only sees and edits the sections they are given.', 'كل موظف يرى ويعدّل الأقسام الممنوحة له فقط.')],
  astra: [b('The trading automation itself, written in Python.', 'الأتمتة نفسها للتداول، مكتوبة ببايثون.'), b('A website that presents the bot to visitors.', 'موقع يعرّف الزوار بالبوت.')],
  emart: [b('Browsing products and adding them to a cart.', 'تصفّح المنتجات وإضافتها إلى السلة.'), b('How the app keeps track of what is on screen, handled in Flutter.', 'كيف يتتبع التطبيق ما يظهر على الشاشة، ويُدار في Flutter.')],
};

/* ------------------------------ skills ------------------------------ */
type SkillGroup = { key: 'fe' | 'be' | 'data' | 'ship'; t: L2; d: L2; items: [string, string[]][] };
const SKILLS: SkillGroup[] = [
  { key: 'fe', t: b('Frontend', 'الواجهات'), d: b('Interfaces for dashboards, portals and websites. React and Next.js on the ROOTS-AI product team, React with Chart.js for live dashboards at SDC, and Figma for the design work before it.', 'واجهات للوحات التحكم والبوابات والمواقع. React وNext.js مع فريق منتج ROOTS-AI، وReact مع Chart.js للوحات اللحظية في SDC، وFigma لمرحلة التصميم قبلها.'), items: [['React', ['ROOTS-AI', 'SDC']], ['Next.js', ['ROOTS-AI']], ['TypeScript', ['ROOTS-AI']], ['Tailwind CSS', ['ROOTS-AI', 'YCIM']], ['Framer Motion', ['ROOTS-AI']], ['Figma', ['SDC', 'Inspire-U']]] },
  { key: 'be', t: b('Backend', 'الخلفية'), d: b('PHP behind admin panels and student systems: REST APIs, authentication middleware, session checks and payment gateway integration.', 'PHP خلف لوحات الإدارة وأنظمة الطلاب: واجهات REST وطبقة مصادقة وفحص الجلسات وربط بوابات الدفع.'), items: [['PHP', ['Inspire-U', 'SDC']], ['REST APIs', ['Inspire-U', 'SDC']], ['Node.js', []], ['Python', ['Astra Bot']], ['Auth & payments', ['SDC']], ['Flask', []]] },
  { key: 'data', t: b('Data', 'البيانات'), d: b('MySQL behind the admin panels at SDC and Inspire-U, Supabase at Inspire-U, and Chart.js for live KPI views.', 'MySQL خلف لوحات الإدارة في SDC وInspire-U، وSupabase في Inspire-U، وChart.js لعرض المؤشرات اللحظية.'), items: [['MySQL', ['Inspire-U', 'SDC']], ['Supabase', ['Inspire-U']], ['PostgreSQL', []], ['Chart.js', ['SDC']]] },
  { key: 'ship', t: b('Mobile & tools', 'الجوال والأدوات'), d: b('A cross-platform shopping app in Flutter, WordPress and Elementor sites with custom CSS, and email automation on the Brevo API.', 'تطبيق تسوق متعدد المنصات بـ Flutter، ومواقع WordPress وElementor بـ CSS مخصص، وأتمتة البريد على Brevo API.'), items: [['Flutter / Dart', ['E-Mart']], ['Git / GitHub', []], ['WordPress', ['YCIM', 'Safar Easy']], ['Brevo API', ['SDC']], ['C++', []], ['VS Code', []]] },
];

/* ------------------------------ copy ------------------------------ */
const pick = (k: Lang) => (o: L2) => o[k];

function build(k: Lang) {
  const p = pick(k);
  const en = k === 'en';
  return {
    dir: (en ? 'ltr' : 'rtl') as 'ltr' | 'rtl',
    name: en ? 'Ahmed Al-Senwi' : 'أحمد الصنوي',
    nav: (en
      ? [['career', 'Experience'], ['projects', 'Projects'], ['build', 'Capabilities'], ['skills', 'Skills']]
      : [['career', 'الخبرة'], ['projects', 'المشاريع'], ['build', 'القدرات'], ['skills', 'المهارات']]) as [string, string][],
    contactBtn: en ? 'Contact' : 'تواصل',
    skip: en ? 'Skip to content' : 'انتقل إلى المحتوى',
    themeLight: en ? 'Light theme' : 'الوضع الفاتح',
    themeDark: en ? 'Dark theme' : 'الوضع الداكن',
    close: en ? 'Close' : 'إغلاق',

    // hero
    role: en ? 'Software Engineer' : 'مهندس برمجيات',
    kicker: en ? 'Kuala Lumpur, Malaysia' : 'كوالالمبور، ماليزيا',
    nowLine: en ? 'Software Engineer at ROOTS-AI' : 'مهندس برمجيات في ROOTS-AI',
    intro: en
      ? 'I studied Computer Science (Software Development) at UTeM and graduated in March 2026. Today I work on the product team at ROOTS-AI, a health AI company.'
      : 'درست علوم الحاسب (تطوير البرمجيات) في جامعة UTeM وتخرجت في مارس 2026. أعمل اليوم ضمن فريق المنتج في ROOTS-AI، شركة ذكاء اصطناعي صحي.',
    b2: en ? 'Interface, logic, data.' : 'واجهة، منطق، بيانات.',
    b2sub: en ? 'I work across all three, with most of my time on the interface.' : 'أعمل على الطبقات الثلاث، وأغلب وقتي في الواجهة.',
    layers: en ? ['Interface', 'Logic', 'Data'] : ['الواجهة', 'المنطق', 'البيانات'],
    layerNotes: en ? ['React · Next.js · Tailwind', 'PHP · Python · REST', 'MySQL · Supabase'] : ['React · Next.js · Tailwind', 'PHP · Python · REST', 'MySQL · Supabase'],
    certView: en ? 'View credential' : 'عرض الشهادة',
    prev: en ? 'Previous project' : 'المشروع السابق',
    next: en ? 'Next project' : 'المشروع التالي',
    cvBtn: en ? 'Download CV' : 'تحميل السيرة الذاتية',
    profileBtn: en ? 'Profile in 30 seconds' : 'الملف في 30 ثانية',
    careerBtn: en ? 'See career' : 'المسيرة المهنية',
    scrollCue: en ? 'Scroll' : 'مرّر',
    facts: (en
      ? [['Now', 'ROOTS-AI'], ['Degree', 'BSc CS, UTeM'], ['Graduated', 'March 2026'], ['Languages', 'Arabic, English']]
      : [['الآن', 'ROOTS-AI'], ['الشهادة', 'بكالوريوس علوم حاسب، UTeM'], ['التخرج', 'مارس 2026'], ['اللغات', 'العربية، الإنجليزية']]) as [string, string][],

    // stats
    stats: (en
      ? [['450', '+', 'hours on a live fintech platform'], ['70', '%', 'of internal workflows automated at Inspire-U'], ['60', '+', 'pages redesigned in Figma'], ['3', '', 'working languages']]
      : [['450', '+', 'ساعة على منصة مالية حية'], ['70', '%', 'من سير العمل تمت أتمتته في Inspire-U'], ['60', '+', 'صفحة أعيد تصميمها في Figma'], ['3', '', 'لغات عمل']]) as [string, string, string][],

    // now
    nowK: en ? 'Now' : 'الآن',
    nowH: (en ? ['Software Engineer at', 'ROOTS-AI'] : ['مهندس برمجيات في', 'ROOTS-AI']) as [string, string],
    nowVisit: en ? 'roots-ai.health' : 'roots-ai.health',
    nowWork: en ? 'What I work on' : 'على ماذا أعمل',

    // career map
    jK: en ? 'Experience and education' : 'الخبرة والتعليم',
    jH: (en ? ['Where I worked', 'and studied.'] : ['أين عملت', 'ودرست.']) as [string, string],
    jSub: en ? 'Work and study on one timeline, newest first. Open any entry for the details.' : 'العمل والدراسة في خط زمني واحد، من الأحدث إلى الأقدم. افتح أي بطاقة للتفاصيل.',
    xpWork: en ? 'Work' : 'عمل',
    xpEdu: en ? 'Education' : 'دراسة',
    xpRows: (en
      ? [['Based in', 'Kuala Lumpur, Malaysia'], ['Focus', 'Web apps, dashboards, UI design'], ['Sectors', 'Health AI, fintech, edtech'], ['Degree', 'BSc Computer Science, UTeM, 2026'], ['Languages', 'Arabic, English, Malay']]
      : [['المقر', 'كوالالمبور، ماليزيا'], ['التركيز', 'تطبيقات ويب ولوحات تحكم وتصميم واجهات'], ['القطاعات', 'ذكاء اصطناعي صحي، تقنية مالية، تعليم'], ['الدرجة', 'بكالوريوس علوم الحاسب، UTeM، 2026'], ['اللغات', 'العربية، الإنجليزية، الملايو']]) as [string, string][],
    open: en ? 'Details' : 'التفاصيل',
    visit: en ? 'Visit site' : 'زيارة الموقع',
    current: en ? 'Current' : 'حالياً',
    stackT: en ? 'Stack' : 'التقنيات',
    aboutK: en ? 'The project' : 'عن المشروع',
    roleK: en ? 'My role' : 'دوري',
    numK: en ? 'In numbers' : 'بالأرقام',
    whatIDid: en ? 'What I did' : 'ما قمت به',
    mapEdu: { when: en ? '2022 – Mar 2026' : '2022 – مارس 2026', t: en ? 'BSc Computer Science' : 'بكالوريوس علوم الحاسب', s: 'UTeM · FTMK' },
    mapGrad: { when: en ? 'Mar 2026' : 'مارس 2026', t: en ? 'Graduated' : 'التخرج', s: 'UTeM' },

    // projects
    prK: en ? 'Projects' : 'المشاريع',
    prH: (en ? ['Selected', 'work.'] : ['أعمال', 'مختارة.']) as [string, string],
    prSub: en ? 'Open any project to see what I did on it.' : 'افتح أي مشروع لترى دوري فيه.',
    live: en ? 'Live' : 'مباشر',

    // skills
    skK: en ? 'Skills' : 'المهارات',
    skH: (en ? ['Tools I use', 'every day.'] : ['أدوات أستخدمها', 'يومياً.']) as [string, string],
    usedAt: en ? 'Used at' : 'استُخدمت في',
    studyUse: en ? 'Coursework' : 'دراسي',

    // education
    edK: en ? 'Education' : 'التعليم',
    edH: (en ? ['Where I', 'studied.'] : ['أين', 'درست.']) as [string, string],
    uni: en ? 'Universiti Teknikal Malaysia Melaka (UTeM)' : 'جامعة ملقا التقنية الماليزية (UTeM)',
    degree: en ? 'Bachelor of Computer Science (Software Development)' : 'بكالوريوس علوم الحاسب (تطوير البرمجيات)',
    faculty: en ? 'Faculty of Information and Communication Technology (FTMK)' : 'كلية تقنية المعلومات والاتصالات (FTMK)',
    edWhen: en ? '2022 – 2026 · Graduated March 2026' : '2022 – 2026 · التخرج مارس 2026',
    edPlace: en ? 'Melaka, Malaysia · Taught in English' : 'ملقا، ماليزيا · الدراسة بالإنجليزية',
    edProjK: en ? 'Course projects' : 'مشاريع دراسية',
    edProj: en ? ['Smart Attendance System (C++, PHP, QR)', 'Student Performance Dashboard', 'Melaka Tourist Guide'] : ['نظام الحضور الذكي (C++ وPHP وQR)', 'لوحة أداء الطلاب', 'دليل ملقا السياحي'],
    certK: en ? 'Certifications' : 'الشهادات',
    certs: [
      ['Designing RESTful APIs', 'LinkedIn Learning', 'Sep 2026'],
      ['Introduction to Generative AI', 'Google', 'Sep 2026'],
      ['Career Skills in Software Development', 'LinkedIn Learning', 'Sep 2026'],
      ['Introduction to Dart', 'LinkedIn Learning', 'Jul 2025'],
      ['Associate Software Developer Workshop', 'IEEE', '2024'],
    ] as [string, string, string][],
    langK: en ? 'Languages' : 'اللغات',
    langs: (en ? [['Arabic', 'Native'], ['English', 'Professional'], ['Malay', 'Conversational'], ['German', 'A1']] : [['العربية', 'اللغة الأم'], ['الإنجليزية', 'مهنية'], ['الملايو', 'محادثة'], ['الألمانية', 'A1']]) as [string, string][],

    // contact
    ctK: en ? 'Contact' : 'تواصل',
    ctH: (en ? ['Reach me', 'directly.'] : ['تواصل معي', 'مباشرة.']) as [string, string],
    ctSub: en ? 'For roles, interviews or technical questions.' : 'للوظائف والمقابلات والأسئلة التقنية.',
    fHead: en ? 'Send a message' : 'أرسل رسالة',
    fName: en ? 'Your name' : 'اسمك',
    fMail: en ? 'Your email' : 'بريدك الإلكتروني',
    fMsg: en ? 'Message' : 'الرسالة',
    fSend: en ? 'Send message' : 'إرسال الرسالة',
    fWa: en ? 'WhatsApp' : 'واتساب',
    fNote: en ? 'Opens your email app with the message ready to send.' : 'يفتح تطبيق البريد لديك والرسالة جاهزة للإرسال.',
    fOk: en ? 'Opening your email app' : 'جارٍ فتح تطبيق البريد',
    fErr: en ? 'Please fill in every field' : 'يرجى تعبئة كل الحقول',
    fSubj: en ? 'Message from the portfolio' : 'رسالة من الموقع',
    copy: en ? 'Copy' : 'نسخ',
    copied: en ? 'Copied' : 'تم النسخ',
    ctClock: en ? 'Local time' : 'الوقت المحلي',
    loc: en ? 'Kuala Lumpur, Malaysia' : 'كوالالمبور، ماليزيا',

    // quick profile popup
    qpK: en ? 'Profile' : 'الملف',
    qpRows: (en
      ? [['Who', 'Ahmed Al-Senwi, software engineer in Kuala Lumpur'], ['Working at', 'ROOTS-AI, Software Engineer'], ['Studied', 'BSc Computer Science (Software Development), UTeM, 2022–2026'], ['Before', 'Six Digit Club (fintech), Inspire-U (edtech)'], ['Builds with', 'Next.js, React, TypeScript, PHP, MySQL'], ['Languages', 'Arabic, English, Malay']]
      : [['من', 'أحمد الصنوي، مهندس برمجيات في كوالالمبور'], ['يعمل في', 'ROOTS-AI، مهندس برمجيات'], ['درس', 'بكالوريوس علوم الحاسب (تطوير البرمجيات)، UTeM، 2022–2026'], ['قبلها', 'Six Digit Club (تقنية مالية)، Inspire-U (تعليم)'], ['يبني بـ', 'Next.js وReact وTypeScript وPHP وMySQL'], ['اللغات', 'العربية، الإنجليزية، الملايو']]) as [string, string][],

    rights: en ? 'Ahmed Al-Senwi' : 'أحمد الصنوي',
    logosK: en ? 'Worked and studied at' : 'عملت ودرست في',
    featured: en ? 'Featured' : 'مميز',
    footLine: en ? 'Software engineer · Kuala Lumpur' : 'مهندس برمجيات · كوالالمبور',
    top: en ? 'Back to top' : 'إلى الأعلى',
    chap: en ? 'Section' : 'القسم',
    reelHint: en ? 'Drag, swipe or use the arrows' : 'اسحب أو استخدم الأسهم لتصفّح الأعمال',
    marq: (en ? ['Software Engineer', 'ROOTS-AI', 'UTeM', 'Six Digit Club', 'Inspire-U', 'Kuala Lumpur'] : ['مهندس برمجيات', 'ROOTS-AI', 'UTeM', 'Six Digit Club', 'Inspire-U', 'كوالالمبور']) as string[],
    creditsK: en ? 'End credits' : 'شارة النهاية',
    credits: (en
      ? [['Role', 'Software Engineer'], ['Now', 'ROOTS-AI, Health AI'], ['Studied', 'UTeM, BSc Computer Science'], ['Based in', 'Kuala Lumpur, Malaysia'], ['Built with', 'React, Vite, Tailwind CSS']]
      : [['الدور', 'مهندس برمجيات'], ['الآن', 'ROOTS-AI، الذكاء الصحي'], ['الدراسة', 'UTeM، بكالوريوس علوم الحاسوب'], ['المقر', 'كوالالمبور، ماليزيا'], ['بُني بـ', 'React وVite وTailwind CSS']]) as [string, string][],
    end: en ? 'Fin.' : 'النهاية.',
    cur: en ? 'View' : 'عرض',

    roles: ROLES.map(r => ({ id: r.id, org: r.org, logo: r.logo, href: r.href, date: r.date, end: r.end, current: !!r.current, when: p(r.when), tag: r.tag ? p(r.tag) : '', role: p(r.role), place: p(r.place), about: p(r.about), pts: r.pts.map(p), ptd: (DET_ROLE[r.id] || []).map(p), stack: r.stack })),
    projects: PROJECTS.map(x => ({ id: x.id, name: p(x.name), img: x.img, logo: !!x.logo, href: x.href, year: x.year, kind: p(x.kind), line: p(x.line), did: x.did.map(p), didd: (DET_PROJ[x.id] || []).map(p), stack: x.id === 'roots' ? ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Figma'] : x.stack, story: p(STORY[x.id].story), role: p(STORY[x.id].role), nums: STORY[x.id].nums.map(([n, l]) => [n, p(l)] as [string, string]), context: p(x.context) })),
    skills: SKILLS.map(g => ({ key: g.key, t: p(g.t), d: p(g.d), items: g.items })),
    bdK: en ? 'Capabilities' : 'القدرات',
    bdH: (en ? ['Four kinds of work', 'I build.'] : ['أربعة أنواع من الأعمال', 'التي أبنيها.']) as [string, string],
    bdSub: en ? 'Each one comes from work I have already done. The project chips open the details.' : 'كل نوع مأخوذ من عمل أنجزته فعلاً. اضغط على المشروع لفتح تفاصيله.',
    bd: (en ? [
      ['dash', 'Dashboards and admin panels', 'Screens people keep open all day: KPI views, data tables, permissions, and the admin side that keeps a platform running.', '5', 'KPIs refreshed every 30 seconds', ['roots', 'sdc', 'safar']],
      ['plat', 'Platforms and portals', 'Whole products with a user side and an admin side: an investor portal, student management, registration and lead flows.', '450+', 'hours on a live fintech platform', ['sdc', 'inspire']],
      ['site', 'Websites and design systems', 'Arabic-first and bilingual websites, designed in Figma and built on one system so new pages stay consistent.', '60+', 'pages redesigned in Figma', ['roots', 'ycim', 'safar']],
      ['auto', 'Automation and integrations', 'Connecting a product to the tools around it: email platforms, payment gateways and internal workflows.', '70%', 'of internal workflows automated', ['inspire', 'sdc', 'astra']],
    ] : [
      ['dash', 'لوحات التحكم والإدارة', 'شاشات يبقيها الناس مفتوحة طوال اليوم: مؤشرات وجداول وصلاحيات وجهة الإدارة التي تُبقي المنصة تعمل.', '5', 'مؤشرات تتحدث كل 30 ثانية', ['roots', 'sdc', 'safar']],
      ['plat', 'المنصات والبوابات', 'منتجات كاملة بجهة مستخدم وجهة إدارة: بوابة مستثمرين وإدارة طلاب ومسارات تسجيل واستقبال طلبات.', '450+', 'ساعة على منصة مالية حية', ['sdc', 'inspire']],
      ['site', 'المواقع وأنظمة التصميم', 'مواقع بالعربية أولاً وبلغتين، مصممة في Figma ومبنية على نظام واحد حتى تبقى الصفحات الجديدة متسقة.', '60+', 'صفحة أعيد تصميمها في Figma', ['roots', 'ycim', 'safar']],
      ['auto', 'الأتمتة والتكامل', 'ربط المنتج بالأدوات حوله: منصات البريد وبوابات الدفع وسير العمل الداخلي.', '70%', 'من سير العمل تمت أتمتته', ['inspire', 'sdc', 'astra']],
    ]) as [string, string, string, string, string, string[]][],
  };
}

export const T = { en: build('en'), ar: build('ar') };
export type Copy = ReturnType<typeof build>;
export type Role = Copy['roles'][number];
export type Project = Copy['projects'][number];
