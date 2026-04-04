/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Globe, 
  ArrowRight, 
  Mail, 
  Linkedin, 
  Github, 
  Instagram,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  MapPin,
  Phone,
  Code2,
  Terminal,
  Cpu,
  Layers,
  GraduationCap,
  Briefcase,
  Sun,
  Moon,
  User,
  Layout,
  MessageSquare,
  Award
} from 'lucide-react';

// --- Types & Content ---

type Language = 'en' | 'ar';

interface Content {
  nav: {
    hero: string;
    about: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
  };
  hero: {
    name: string;
    role: string;
    summary: string;
    cta: string;
    hireMe: string;
  };
  about: {
    title: string;
    bio: string;
    skillsTitle: string;
    skills: string[];
  };
  experience: {
    title: string;
    items: {
      role: string;
      company: string;
      location: string;
      country: string;
      period: string;
      desc: string;
      image: string;
      achievements: string[];
    }[];
  };
  education: {
    title: string;
    items: {
      degree: string;
      school: string;
      location: string;
      country: string;
      period: string;
      details: string[];
      image: string;
      link?: string;
    }[];
  };
  certifications: {
    title: string;
    items: string[];
  };
  languages: {
    title: string;
    items: {
      name: string;
      level: string;
    }[];
  };
  projects: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      fintech: string;
      edtech: string;
      mobile: string;
      travel: string;
    };
    items: {
      title: string;
      category: string;
      desc: string;
      link?: string;
      image: string;
      tags: string[];
    }[];
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    location: string;
  };
}

const resolvePublicPath = (path: string) => {
  if (path.startsWith('/')) {
    return `${import.meta.env.BASE_URL}${path.slice(1)}`;
  }
  return path;
};

const translations: Record<Language, Content> = {
  en: {
    nav: { hero: 'Home', about: 'About', experience: 'Experience', projects: 'Portfolio', education: 'Education', contact: 'Contact' },
    hero: {
      name: 'Ahmed Abdulkareem Al-Senwi',
      role: 'Software Developer',
      summary: 'I am a dedicated Software Developer with a passion for building high-performance web and mobile applications. I focus on creating impactful digital solutions with timeless design and robust architecture.',
      cta: 'View Portfolio',
      hireMe: 'Hire Me'
    },
    about: {
      title: 'The Developer',
      bio: 'I am a passionate software developer dedicated to building high-performance applications that solve real-world problems. My expertise spans across the full stack, from crafting intuitive UI/UX in Figma to architecting robust backends in Python and Node.js. I thrive on creating digital solutions that are both functional and visually stunning.',
      skillsTitle: 'Technical Arsenal',
      skills: ['Python', 'JavaScript', 'PHP', 'React', 'MySQL', 'Flutter', 'Dart', 'C++', 'REST APIs', 'Node.js', 'Figma UI/UX', 'Chart.js', 'Brevo APIs', 'Git/GitHub', 'Agile/Scrum', 'CI/CD']
    },
    experience: {
      title: 'Professional Journey',
      items: [
        { 
          role: 'Full-Stack Developer Intern', 
          company: 'Six Digit Club Sdn Bhd', 
          location: 'Batu Caves, Selangor',
          country: 'Malaysia',
          period: 'Oct 2025 — Mar 2026', 
          desc: 'Completed 450+ hours of intensive development focused on fintech and automation.',
          image: '/images/six%20digit%20club.png',
          achievements: [
            'Python trading bots APIs (65% win rate)',
            'React/Chart.js real-time dashboard (5 KPIs, 30s refresh)',
            'Brevo email automation (300+ lists, 40% efficiency gain)',
            'Figma UI/UX redesign (60+ pages, 50% page speed boost)'
          ]
        },
        { 
          role: 'UI/UX & Full-Stack Developer', 
          company: 'Inspire-U Edtech', 
          location: 'Melaka',
          country: 'Malaysia',
          period: 'Aug 2025 — Present', 
          desc: 'Leading the technical evolution of a modern educational platform.',
          image: '/images/inspire-logo.png',
          achievements: [
            'Full platform architecture (PHP/MySQL REST APIs)',
            'Automated 70% of internal workflows',
            'Modernized student management system'
          ]
        },
        { 
          role: 'Freelance Web Developer', 
          company: 'Self-Employed', 
          location: 'Remote',
          country: 'Global',
          period: 'Aug 2024 — Jun 2025', 
          desc: 'Delivered custom web solutions for local businesses and startups.',
          image: '/images/free.png',
          achievements: [
            'Specialized in modern landing pages and automation',
            'Integrated complex third-party APIs',
            'Optimized SEO and performance for client sites'
          ]
        }
      ]
    },
    education: {
      title: 'Academic Foundation',
      items: [
        { 
          degree: 'Bachelor of Computer Science (Software Development)', 
          school: 'Universiti Teknikal Malaysia Melaka (UTeM)', 
          location: 'Melaka',
          country: 'Malaysia',
          period: '2022 — 2026 (Graduation: March 2026)',
          image: '/images/utem.png',
          link: 'https://ftmk.utem.edu.my/web/index.php/academics/undergraduate/bachelor-of-computer-science-software-development/',
          details: [
            'Focus: Full-Stack Development, Software Engineering',
            'Key Projects: Smart Attendance System (C++/PHP QR codes)',
            'Student Performance Dashboard & Melaka Tourist Guide'
          ]
        }
      ]
    },
    certifications: {
      title: 'Certifications',
      items: [
        'IEEE Associate Software Developer Workshop (2024)',
        'LinkedIn Learning: Time Management (2018)',
        'Introduction to Dart',
        'Basics of Software Testing'
      ]
    },
    languages: {
      title: 'Languages',
      items: [
        { name: 'Arabic', level: 'Native' },
        { name: 'English', level: 'Fluent' },
        { name: 'Bahasa Malaysia', level: 'Conversational' },
        { name: 'German', level: 'Basic (A2)' }
      ]
    },
    projects: {
      title: 'Featured Projects',
      subtitle: 'A collection of my most impactful works, blending technical precision with creative design.',
      filters: {
        all: 'All',
        fintech: 'Fintech',
        edtech: 'Edtech',
        mobile: 'Mobile',
        travel: 'Travel'
      },
      items: [
        { title: 'Astra Bot', category: 'Fintech / Automation', desc: 'A sophisticated Python-based trading bot for automated financial strategies.', link: 'https://astra-bot.tech/', image: '/images/astra.png', tags: ['Python', 'Automation', 'Trading'] },
        { title: 'SDC Dashboard', category: 'Fintech / Analytics', desc: 'A real-time financial monitoring dashboard built with React and Chart.js.', link: 'https://sdc.cx/', image: '/images/SDC%20Dashboard.png', tags: ['React', 'Chart.js', 'Real-time'] },
        { title: 'Inspire-U', category: 'Edtech / Platform', desc: 'A full-scale educational platform managing student workflows and content.', link: 'https://inspire-u.net/', image: '/images/Inspire-U.png', tags: ['Web', 'Education', 'Management'] },
        { title: 'Melaka Tourist Guide', category: 'Travel / Web', desc: 'Interactive guide for Melaka attractions featuring maps and local insights.', image: '/images/melaka.jpeg', tags: ['Maps', 'Tourism', 'Interactive'] },
        { title: 'Scooter Rent App', category: 'Mobile / Booking', desc: 'A Flutter-based mobile application for seamless scooter rental management.', image: '/images/scooter.jpg', tags: ['Flutter', 'Mobile', 'Booking'] },
        { title: 'Campus Marketplace', category: 'Mobile / E-commerce', desc: 'Student-to-student marketplace for buying and selling campus essentials.', image: '/images/marketplace.png', tags: ['Mobile', 'E-commerce', 'Social'] },
        { title: 'Smart Attendance System', category: 'Automation / Web', desc: 'Advanced QR-based attendance tracking system using C++ and PHP.', image: '/images/smart.jpg', tags: ['C++', 'PHP', 'QR Code'] },
        { title: 'Flutter Recipe App', category: 'Mobile / Lifestyle', desc: 'Cross-platform mobile application for discovering and managing culinary recipes.', image: '/images/flutter-recipe-app.jpg', tags: ['Flutter', 'Mobile', 'Lifestyle'] }
      ]
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'I am currently available for new opportunities and collaborations.',
      email: 'alsanwi2019@gmail.com',
      phone: '+60 14-364-6834',
      location: 'Seri Kembangan, Selangor, Malaysia'
    }
  },
  ar: {
    nav: { hero: 'الرئيسية', about: 'عني', experience: 'الخبرة', projects: 'أعمالي', education: 'التعليم', contact: 'اتصل بي' },
    hero: {
      name: 'أحمد عبدالكريم الصنوي',
      role: 'مطور برمجيات | Software Developer',
      summary: 'أنا مطور برمجيات شغوف ببناء تطبيقات ويب وجوال عالية الأداء. أركز على ابتكار حلول رقمية مؤثرة تجمع بين التصميم الخالد والهندسة البرمجية القوية.',
      cta: 'عرض الأعمال',
      hireMe: 'وظفني'
    },
    about: {
      title: 'المطور',
      bio: 'أنا مطور برمجيات شغوف، مكرس لبناء تطبيقات عالية الأداء تحل مشاكل العالم الحقيقي. تمتد خبرتي عبر الواجهات الكاملة، من صياغة واجهات المستخدم البديهية في فيجما إلى هندسة خلفيات قوية في بايثون ونود جيه إس. أسعى دائماً لابتكار حلول رقمية تجمع بين الكفاءة والجمال البصري.',
      skillsTitle: 'الترسانة التقنية',
      skills: ['بايثون', 'جاوا سكريبت', 'PHP', 'ريأكت', 'MySQL', 'فلاتر', 'دارت', 'C++', 'REST APIs', 'نود جيه إس', 'فيجما UI/UX', 'Chart.js', 'Brevo APIs', 'جيت/جيت هاب', 'أجايل/سكروم', 'CI/CD']
    },
    experience: {
      title: 'المسيرة المهنية',
      items: [
        { 
          role: 'متدرب مطور واجهات كاملة', 
          company: 'Six Digit Club Sdn Bhd', 
          location: 'باتو كيفس، سيلانجور',
          country: 'ماليزيا',
          period: 'أكتوبر ٢٠٢٥ — مارس ٢٠٢٦', 
          desc: 'أكملت أكثر من ٤٥٠ ساعة من التطوير المكثف الذي ركز على التكنولوجيا المالية والأتمتة.',
          image: '/images/six%20digit%20club.png',
          achievements: [
            'بوتات تداول بايثون (معدل فوز ٦٥٪)',
            'لوحة تحكم React/Chart.js (٥ مؤشرات أداء، تحديث كل ٣٠ ثانية)',
            'أتمتة بريد بريفو (أكثر من ٣٠٠ قائمة، زيادة كفاءة ٤٠٪)',
            'إعادة تصميم Figma UI/UX (أكثر من ٦٠ صفحة، زيادة سرعة ٥٠٪)'
          ]
        },
        { 
          role: 'مطور UI/UX وواجهات كاملة', 
          company: 'Inspire-U Edtech', 
          location: 'ملقا',
          country: 'ماليزيا',
          period: 'أغسطس ٢٠٢٥ — الآن', 
          desc: 'قيادة التطور التقني لمنصة تعليمية حديثة.',
          image: '/images/inspire-logo.png',
          achievements: [
            'هندسة المنصة الكاملة (PHP/MySQL REST APIs)',
            'أتمتة ٧٠٪ من سير العمل الداخلي',
            'تحديث نظام إدارة الطلاب'
          ]
        },
        { 
          role: 'مطور ويب مستقل', 
          company: 'عمل حر', 
          location: 'عن بعد',
          country: 'عالمي',
          period: 'أغسطس ٢٠٢٤ — يونيو ٢٠٢٥', 
          desc: 'تقديم حلول ويب مخصصة للشركات المحلية والناشئة.',
          image: '/images/free.png',
          achievements: [
            'متخصص في صفحات الهبوط الحديثة والأتمتة',
            'دمج واجهات برمجة تطبيقات خارجية معقدة',
            'تحسين محركات البحث والأداء لمواقع العملاء'
          ]
        }
      ]
    },
    education: {
      title: 'الأساس الأكاديمي',
      items: [
        { 
          degree: 'بكالوريوس علوم الحاسب (تطوير البرمجيات)', 
          school: 'جامعة ملقا التقنية الماليزية (UTeM)', 
          location: 'ملقا',
          country: 'ماليزيا',
          period: '٢٠٢٢ — ٢٠٢٦ (التخرج: مارس ٢٠٢٦)',
          image: '/images/utem.png',
          link: 'https://ftmk.utem.edu.my/web/index.php/academics/undergraduate/bachelor-of-computer-science-software-development/',
          details: [
            'التركيز: تطوير الواجهات الكاملة، هندسة البرمجيات',
            'المشاريع الرئيسية: نظام الحضور الذكي (C++/PHP QR codes)',
            'لوحة تحكم أداء الطلاب ودليل ملقا السياحي'
          ]
        }
      ]
    },
    certifications: {
      title: 'الشهادات',
      items: [
        'ورشة عمل مطور برمجيات مشارك من IEEE (٢٠٢٤)',
        'LinkedIn Learning: إدارة الوقت (٢٠١٨)',
        'مقدمة في لغة دارت',
        'أساسيات اختبار البرمجيات'
      ]
    },
    languages: {
      title: 'اللغات',
      items: [
        { name: 'العربية', level: 'اللغة الأم' },
        { name: 'الإنجليزية', level: 'طلاقة' },
        { name: 'لغة الملايو', level: 'محادثة' },
        { name: 'الألمانية', level: 'أساسي (A2)' }
      ]
    },
    projects: {
      title: 'أعمال مختارة',
      subtitle: 'مجموعة من أبرز أعمالي، تجمع بين الدقة التقنية والتصميم الإبداعي.',
      filters: {
        all: 'الكل',
        fintech: 'تكنولوجيا مالية',
        edtech: 'تكنولوجيا تعليمية',
        mobile: 'جوال',
        travel: 'سفر'
      },
      items: [
        { title: 'أسترا بوت', category: 'تكنولوجيا مالية / أتمتة', desc: 'بوت تداول متطور يعتمد على بايثون للاستراتيجيات المالية الآلية.', link: 'https://astra-bot.tech/', image: '/images/astra.png', tags: ['بايثون', 'أتمتة', 'تداول'] },
        { title: 'لوحة SDC', category: 'تكنولوجيا مالية / تحليلات', desc: 'لوحة مراقبة مالية في الوقت الفعلي مبنية باستخدام ريأكت و Chart.js.', link: 'https://sdc.cx/', image: '/images/SDC%20Dashboard.png', tags: ['ريأكت', 'تحليلات', 'وقت حقيقي'] },
        { title: 'Inspire-U', category: 'تكنولوجيا تعليمية / منصة', desc: 'منصة تعليمية واسعة النطاق تدير سير عمل الطلاب والمحتوى.', link: 'https://inspire-u.net/', image: '/images/Inspire-U.png', tags: ['ويب', 'تعليم', 'إدارة'] },
        { title: 'دليل ملقا السياحي', category: 'سفر / ويب', desc: 'دليل تفاعلي لمعالم ملقا يتميز بالخرائط والرؤى المحلية.', image: '/images/melaka.jpeg', tags: ['خرائط', 'سياحة', 'تفاعلي'] },
        { title: 'تطبيق تأجير سكوتر', category: 'جوال / حجز', desc: 'تطبيق جوال يعتمد على فلاتر لإدارة تأجير السكوتر بسلاسة.', image: '/images/scooter.jpg', tags: ['فلاتر', 'جوال', 'حجز'] },
        { title: 'سوق الحرم الجامعي', category: 'جوال / تجارة إلكترونية', desc: 'سوق من طالب لطالب لبيع وشراء أساسيات الحرم الجامعي.', image: '/images/marketplace.png', tags: ['جوال', 'تجارة إلكترونية', 'اجتماعي'] },
        { title: 'نظام الحضور الذكي', category: 'أتمتة / ويب', desc: 'نظام متطور لتتبع الحضور يعتمد على رموز QR باستخدام C++ و PHP.', image: '/images/smart.jpg', tags: ['C++', 'PHP', 'رمز QR'] },
        { title: 'تطبيق وصفات فلاتر', category: 'جوال / نمط حياة', desc: 'تطبيق جوال متعدد المنصات لاكتشاف وإدارة وصفات الطهي.', image: '/images/flutter-recipe-app.jpg', tags: ['فلاتر', 'جوال', 'نمط حياة'] }
      ]
    },
    contact: {
      title: 'تواصل معي',
      subtitle: 'أنا متاح حالياً للفرص الجديدة والتعاون.',
      email: 'alsanwi2019@gmail.com',
      phone: '+60 14-364-6834',
      location: 'سيري كيمبانغان، سيلانجور، ماليزيا'
    }
  }
};

// --- Components ---

function ProjectCard({ project, isRtl }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const imageSrc = resolvePublicPath(project.image);

  const CardWrapper = project.link ? motion.a : motion.div;
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    : {};

  return (
    <CardWrapper
      {...wrapperProps}
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group relative glass-card rounded-[2rem] overflow-hidden border border-white/5 hover:border-accent-gold/40 transition-all duration-500 magic-glow"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img 
          style={{ y, scale: 1.05 }}
          src={imageSrc} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.1]"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${project.title}/800/600`;
          }}
        />
        
        {/* Overlay with glass effect on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[4px]">
          {project.link && (
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-accent-gold text-black rounded-full shadow-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2"
            >
              {isRtl ? 'عرض المشروع' : 'View Project'}
              <ExternalLink size={14} />
            </motion.div>
          )}
        </div>

        {/* Category Badge - Always visible */}
        <div className={`absolute top-4 ${isRtl ? 'left-4' : 'right-4'} px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[8px] uppercase tracking-widest text-accent-gold font-bold z-20`}>
          {project.category}
        </div>
      </div>

      <div className="p-6 md:p-8 relative z-10 bg-gradient-to-b from-transparent to-bg/50">
        <h4 className="text-xl md:text-2xl font-arabic mb-3 group-hover:text-accent-gold transition-colors duration-300">
          {project.title}
        </h4>
        <p className="text-xs md:text-sm text-text-muted leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors duration-300 font-light mb-6">
          {project.desc}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag: string, i: number) => (
            <span key={i} className="text-[9px] uppercase tracking-tighter text-text-dim font-medium px-2 py-0.5 rounded border border-white/5 bg-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </CardWrapper>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const filteredProjects = t.projects.items.filter(project => {
    if (activeFilter === 'all') return true;
    
    const cat = project.category.toLowerCase();
    const filterMap: Record<string, string[]> = {
      fintech: ['fintech', 'تكنولوجيا مالية'],
      edtech: ['edtech', 'تكنولوجيا تعليمية'],
      mobile: ['mobile', 'جوال'],
      travel: ['travel', 'سفر']
    };

    return filterMap[activeFilter]?.some(keyword => cat.includes(keyword));
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(currentProgress);

      const sections = ['hero', 'about', 'projects', 'experience', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= -100 && rect.top <= window.innerHeight / 2) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ar' : 'en');

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    
    if (!name.trim() || !message.trim()) {
      alert(lang === 'en' ? 'Please fill in your name and message' : 'يرجى ملء الاسم والرسالة');
      return;
    }

    // WhatsApp number - replace with actual number
    const phoneNumber = '+60143646834'; // The phone number from contact info
    
    // Construct WhatsApp message
    const whatsappMessage = `*New Contact Form Message*\n\n*Name:* ${name}\n*Email:* ${email}\n*Message:* ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.location.href = whatsappUrl;
    
    // Reset form
    setContactForm({ name: '', email: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`min-h-screen transition-all duration-700 selection:bg-accent-blue/30 ${isRtl ? 'rtl' : 'ltr'}`}>
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[100] pointer-events-none">
        <motion.div 
          className="h-full bg-gradient-to-r from-accent-blue via-accent-green to-accent-blue"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        {/* Dark Theme Enhanced Background */}
        {theme === 'dark' && (
          <>
            <motion.div 
              animate={{ 
                backgroundColor: activeSection === 'experience' ? 'rgba(139, 92, 246, 0.15)' : 
                                 activeSection === 'projects' ? 'rgba(59, 130, 246, 0.15)' : 
                                 'rgba(59, 130, 246, 0.1)',
                scale: activeSection === 'hero' ? 1.2 : 1
              }}
              className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] blur-[150px] rounded-full animate-glow transition-all duration-1000" 
            />
            <motion.div 
              animate={{ 
                backgroundColor: activeSection === 'experience' ? 'rgba(236, 72, 153, 0.15)' : 
                                 activeSection === 'projects' ? 'rgba(16, 185, 129, 0.15)' : 
                                 'rgba(16, 185, 129, 0.1)',
                scale: activeSection === 'about' ? 1.3 : 1
              }}
              className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] blur-[150px] rounded-full animate-glow transition-colors duration-1000" 
              style={{ animationDelay: '2s' }} 
            />
            
            {/* Additional Dark Theme Elements */}
            <motion.div 
              animate={{ 
                backgroundColor: 'rgba(212, 175, 55, 0.08)',
                rotate: [0, 360]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[30%] right-[20%] w-[25%] h-[25%] blur-[100px] rounded-full" 
            />
            <motion.div 
              animate={{ 
                backgroundColor: 'rgba(59, 130, 246, 0.06)',
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[40%] left-[15%] w-[30%] h-[30%] blur-[120px] rounded-full" 
            />
          </>
        )}

        {/* Light Theme Background */}
        {theme === 'light' && (
          <>
            <motion.div 
              animate={{ 
                backgroundColor: activeSection === 'experience' ? 'rgba(139, 92, 246, 0.05)' : 
                                 activeSection === 'projects' ? 'rgba(59, 130, 246, 0.05)' : 
                                 'rgba(59, 130, 246, 0.03)'
              }}
              className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full animate-glow transition-colors duration-1000" 
            />
            <motion.div 
              animate={{ 
                backgroundColor: activeSection === 'experience' ? 'rgba(236, 72, 153, 0.05)' : 
                                 activeSection === 'projects' ? 'rgba(16, 185, 129, 0.05)' : 
                                 'rgba(16, 185, 129, 0.03)'
              }}
              className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full animate-glow transition-colors duration-1000" 
              style={{ animationDelay: '2s' }} 
            />
          </>
        )}
        
        {/* Magic Floating Shapes - Enhanced for Dark Theme */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            scale: theme === 'dark' ? [1, 1.1, 1] : [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-[20%] right-[15%] w-24 h-24 border ${
            theme === 'dark' ? 'border-accent-gold/20 bg-accent-gold/5' : 'border-white/5'
          } rounded-full backdrop-blur-sm`}
        />
        <motion.div 
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -15, 0],
            scale: theme === 'dark' ? [1, 1.2, 1] : [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-[30%] left-[10%] w-32 h-32 border ${
            theme === 'dark' ? 'border-accent-blue/20 bg-accent-blue/5' : 'border-white/5'
          } rounded-2xl backdrop-blur-sm`}
        />

        {/* Dark Theme Stars */}
        {theme === 'dark' && (
          <>
            <div className="absolute top-[15%] left-[25%] w-1 h-1 bg-accent-gold rounded-full animate-pulse" />
            <div className="absolute top-[35%] right-[30%] w-1 h-1 bg-accent-blue rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[25%] left-[35%] w-1 h-1 bg-accent-green rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            <div className="absolute top-[45%] left-[60%] w-1 h-1 bg-accent-gold rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-[45%] right-[25%] w-1 h-1 bg-accent-blue rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
          </>
        )}
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-md py-4 border-b border-border' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-lg font-mono font-bold tracking-tighter flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-accent-blue/10">
              <img src={resolvePublicPath('/images/alsenwi.jpg')} alt="Alsenwi" className="w-full h-full object-cover" />
            </div>
            <span className="hidden sm:block uppercase tracking-[0.2em] text-xs font-bold">AL-SANWI<span className="text-accent-blue">.</span>DEV</span>
          </motion.div>

          <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            {Object.entries(t.nav).map(([key, value]) => (
              <motion.a 
                key={key} 
                href={`#${key}`} 
                whileHover={{ scale: 1.05, letterSpacing: '0.3em' }}
                className="text-[10px] uppercase tracking-[0.25em] font-medium text-text-muted hover:text-accent-blue transition-all duration-300 relative group"
              >
                {value}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-blue transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
            <motion.button 
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 text-text-muted hover:text-accent-gold transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>
            <motion.button 
              onClick={toggleLang}
              whileHover={{ scale: 1.05, borderColor: 'rgba(59,130,246,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest border border-white/10 px-4 py-2 rounded-full hover:border-accent-blue/50 transition-all"
            >
              <Globe size={12} className="text-accent-blue" />
              <span>{lang === 'en' ? 'Arabic' : 'English'}</span>
            </motion.button>
          </div>

          <button className="md:hidden text-text-muted" onClick={() => setIsMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu / Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
            />
            <motion.div 
              initial={{ x: isRtl ? -320 : 320 }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? -320 : 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 bottom-0 ${isRtl ? 'left-0' : 'right-0'} w-[300px] bg-bg border-l border-border z-[100] flex flex-col shadow-2xl`}
            >
              {/* Sidebar Header */}
              <div className="p-8 flex flex-col gap-6 border-b border-border">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-blue to-accent-green rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-accent-blue/20">
                      AS
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold tracking-widest uppercase">Al-Sanwi</span>
                      <span className="text-[10px] text-text-dim uppercase tracking-tighter">Software Developer</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)} 
                    className="p-2 rounded-full hover:bg-card-bg text-text-muted hover:text-text transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Sidebar Navigation */}
              <div className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
                {Object.entries(t.nav).map(([key, value], idx) => {
                  const Icon = {
                    hero: User,
                    about: User,
                    experience: Briefcase,
                    projects: Layout,
                    education: GraduationCap,
                    contact: MessageSquare
                  }[key] || Layout;
                  
                  const isActive = activeSection === key;

                  return (
                    <motion.a 
                      key={key} 
                      href={`#${key}`} 
                      initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group ${
                        isActive 
                          ? 'bg-accent-gold/10 text-accent-gold' 
                          : 'text-text-muted hover:bg-card-bg hover:text-text'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isActive ? 'bg-accent-gold text-black' : 'bg-card-bg group-hover:bg-border'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <span className="font-medium tracking-wide">{value}</span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Sidebar Footer */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-6 border-t border-border space-y-6 bg-card-bg/30"
              >
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={toggleTheme}
                    className="flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-card-bg border border-border hover:border-accent-gold/30 transition-all group shadow-sm"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {theme === 'dark' ? '☀️' : '🌙'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                      {theme === 'dark' ? (lang === 'en' ? 'Light' : 'فاتح') : (lang === 'en' ? 'Dark' : 'داكن')}
                    </span>
                  </button>
                  
                  <button 
                    onClick={toggleLang}
                    className="flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-card-bg border border-border hover:border-accent-blue/30 transition-all group shadow-sm"
                  >
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {lang === 'en' ? '🇸🇦' : '🇺🇸'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                      {lang === 'en' ? 'العربية' : 'English'}
                    </span>
                  </button>
                </div>

                <div className="flex justify-center gap-6 pt-2">
                  {[
                    { icon: Github, href: "#" },
                    { icon: Linkedin, href: "#" },
                    { icon: Instagram, href: "#" },
                    { icon: Mail, href: "#" }
                  ].map((social, i) => (
                    <motion.a 
                      key={i}
                      href={social.href}
                      whileHover={{ y: -3 }}
                      className="text-text-dim hover:text-accent-gold transition-colors"
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-[2rem] p-6 md:p-16 border border-white/5 relative magic-glow overflow-hidden"
          >
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 blur-3xl rounded-full" />
            
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 rounded-full border border-accent-gold/20 bg-accent-gold/5 text-accent-gold text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold mb-6 md:mb-8"
              >
                <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-accent-gold animate-pulse" />
                {t.hero.role}
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-6xl font-arabic mb-4 md:mb-6 leading-tight tracking-tight text-text"
              >
                {t.hero.name}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-text-dim mb-8 md:mb-10 font-medium"
              >
                {lang === 'en' ? 'Human-Crafted Digital Experience' : 'تجربة رقمية صُنعت بلمسة إنسانية'}
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="max-w-xl mx-auto text-xs md:text-base text-text-muted font-light mb-8 md:mb-12 leading-relaxed px-4"
              >
                {t.hero.summary}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 w-full sm:w-auto"
              >
                <a
  href="#projects"
  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-gold text-black px-6 md:px-8 py-3 md:py-3.5 rounded-full text-9px md:text-10px uppercase tracking-widest font-bold hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all group"
>
  <span>{t.hero.cta}</span>
  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={12} />
</a>
                <a
  href="#contact"
  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-card-bg border border-border text-text px-6 md:px-8 py-3 md:py-3.5 rounded-full text-9px md:text-10px uppercase tracking-widest font-bold hover:bg-card-bg/80 transition-all"
>
  {t.hero.hireMe}
</a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      {/* About & Skills */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20">
            <motion.div
              initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-accent-blue" />
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-blue font-bold">{t.about.title}</h2>
              </div>
              <p className="text-2xl md:text-4xl font-arabic leading-tight mb-8">
                {t.about.bio}
              </p>
              <div className="flex flex-wrap gap-4 mt-12">
                <div className="flex items-center gap-3 text-text-muted text-sm">
                  <Code2 size={16} className="text-accent-blue" />
                  <span>Full-Stack</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: isRtl ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-10"
            >
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Terminal size={20} className="text-accent-green" />
                {t.about.skillsTitle}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {t.about.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-text-muted bg-white/5 border border-white/5 px-4 py-3 rounded-xl hover:border-accent-blue/30 transition-all">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue/50" />
                    {skill}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 bg-card-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-[1px] w-12 bg-accent-gold" />
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-gold font-bold">{t.projects.title}</h2>
              </div>
              <h3 className="text-3xl md:text-5xl font-arabic mb-4">{t.projects.title}</h3>
              <p className="text-text-muted text-sm md:text-base max-w-xl mb-8">{t.projects.subtitle}</p>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(t.projects.filters).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`px-4 py-1.5 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all duration-300 border ${
                      activeFilter === key 
                        ? 'bg-accent-gold border-accent-gold text-black shadow-lg shadow-accent-gold/20' 
                        : 'border-white/10 text-text-dim hover:border-white/20 hover:text-slate-300'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <Layers size={40} className="text-white/5 hidden md:block" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, idx) => (
              <motion.div 
                key={`${project.title}-${idx}`} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
              >
                <ProjectCard project={project} isRtl={isRtl} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 relative overflow-hidden">
        {/* Magic Background Elements */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-green/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-20">
            <Briefcase size={24} className="text-accent-blue" />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-blue font-bold">{t.experience.title}</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {t.experience.items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative glass-card rounded-3xl p-8 border border-white/5 hover:border-accent-blue/20 transition-all group magic-glow"
              >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Small Circular Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-accent-blue/20 bg-slate-900 group-hover:border-accent-blue/50 transition-colors">
                      <img 
                        src={resolvePublicPath(item.image)} 
                        alt={item.company}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.company}/100/100`;
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-arabic mb-1">{item.role}</h3>
                        <div className="flex items-center gap-2 text-text font-bold text-xs md:text-sm">
                          <span>{item.company}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-600" />
                          <span className="text-[10px] md:text-xs text-text-muted font-normal flex items-center gap-1">
                            <MapPin size={10} /> {item.location}, {item.country}
                          </span>
                        </div>
                      </div>
                      <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-[8px] md:text-[10px] text-accent-blue font-bold uppercase tracking-widest h-fit">
                        {item.period}
                      </div>
                    </div>

                    <p className="text-xs md:text-sm text-text-muted leading-relaxed">{item.desc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {item.achievements.map((ach, i) => (
                        <div key={i} className="flex items-start gap-3 group/item">
                          <div className="mt-1.5 flex-shrink-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                            <div className="w-1 h-1 rounded-full bg-accent-blue" />
                          </div>
                          <span className="text-[11px] md:text-sm text-slate-300 group-hover/item:text-white transition-colors">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-32 bg-card-bg relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-20">
            <GraduationCap size={28} className="text-accent-green" />
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-green font-bold">{t.education.title}</h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {t.education.items.map((item, idx) => {
              const Wrapper = item.link ? motion.a : motion.div;
              const wrapperProps = item.link ? { href: item.link, target: '_blank', rel: 'noopener noreferrer' } : {};

              return (
                <Wrapper
                  key={idx}
                  {...wrapperProps}
                  initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`glass-card rounded-3xl p-8 border border-white/5 hover:border-accent-green/20 transition-all group magic-glow ${item.link ? 'cursor-pointer' : ''}`}
                >
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
                  {/* Small Circular Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-accent-green/20 bg-slate-900 group-hover:border-accent-green/50 transition-colors">
                      <img 
                        src={resolvePublicPath(item.image)} 
                        alt={item.school}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.school}/100/100`;
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-grow space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold mb-1">{item.degree}</h3>
                        <p className="text-base md:text-lg text-text font-arabic">{item.school}</p>
                      </div>
                      <div className="px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-accent-green/10 border border-accent-green/20 text-[8px] md:text-[10px] text-accent-green font-bold uppercase tracking-widest h-fit">
                        {item.period}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-text-muted text-[10px] md:text-sm">
                      <MapPin size={12} className="text-accent-green" />
                      <span>{item.location}, {item.country}</span>
                    </div>

                    <div className="space-y-2 pt-2">
                      {item.details.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <div className="mt-2 w-1 h-1 rounded-full bg-accent-green opacity-50" />
                          <span className="text-[11px] md:text-sm text-text-muted group-hover:text-slate-300 transition-colors">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Wrapper>
            );
          })}
          </div>

          {/* Magic Languages & Certs Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mt-24">
            <motion.div 
              initial={{ opacity: 0, x: isRtl ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-[2.5rem] p-12 relative overflow-hidden group magic-glow animate-pulse-glow"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center">
                  <Globe size={20} className="text-accent-blue" />
                </div>
                {t.languages.title}
              </h3>
              <div className="grid grid-cols-2 gap-10">
                {t.languages.items.map((lang, i) => (
                  <div key={i} className="space-y-2 group/lang">
                    <p className="text-xl font-bold text-text group-hover/lang:text-accent-blue transition-colors">{lang.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-accent-blue/50"
                        />
                      </div>
                      <span className="text-[10px] text-accent-blue uppercase tracking-widest font-bold">{lang.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-[2.5rem] p-12 relative overflow-hidden group magic-glow animate-pulse-glow"
              style={{ animationDelay: '1s' }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Cpu size={120} />
              </div>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-green/10 flex items-center justify-center">
                  <Cpu size={20} className="text-accent-green" />
                </div>
                {t.certifications.title}
              </h3>
              <div className="space-y-6">
                {t.certifications.items.map((cert, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 text-text-muted hover:text-slate-200 transition-all cursor-default"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-green shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                    <span className="text-lg font-light">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-30 py-32 bg-bg border-t border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-accent-blue font-bold mb-8">{t.contact.title}</h2>
              <p className="text-4xl md:text-6xl font-arabic mb-12 leading-tight">
                {t.contact.subtitle}
              </p>
              
              <div className="space-y-8">
                <a href={`mailto:${t.contact.email}`} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent-blue/10 transition-colors">
                    <Mail size={20} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-dim mb-1">Email</p>
                    <p className="text-lg font-mono">{t.contact.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <Phone size={20} className="text-accent-green" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-dim mb-1">Phone</p>
                    <p className="text-lg font-mono">{t.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                    <MapPin size={20} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-text-dim mb-1">Location</p>
                    <p className="text-sm">{t.contact.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-40 pointer-events-auto glass-card p-10 rounded-3xl border-white/5 magic-glow"
            >
              <form className="relative z-50 pointer-events-auto space-y-6" onSubmit={handleContactSubmit}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-dim ml-1">
                      {lang === 'en' ? 'Name' : 'الاسم'}
                    </label>
                    <input 
                      type="text" 
                      value={contactForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none transition-all" 
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-text-dim ml-1">
                      {lang === 'en' ? 'Email' : 'البريد الإلكتروني'}
                    </label>
                    <input 
                      type="email" 
                      value={contactForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none transition-all" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-text-dim ml-1">
                    {lang === 'en' ? 'Message' : 'الرسالة'}
                  </label>
                  <textarea 
                    rows={4} 
                    value={contactForm.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-accent-blue outline-none transition-all resize-none" 
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-accent-blue text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-accent-blue/90 transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} />
                  {lang === 'en' ? 'Send via WhatsApp' : 'إرسال عبر واتساب'}
                </button>
              </form>
            </motion.div>
          </div>

          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex gap-6">
              <motion.a 
                href="https://www.linkedin.com/in/alsenwi-ahmed-16381136a/" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -5, color: '#D4AF37', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))' }}
                className="text-text-dim transition-all duration-300"
              >
                <Linkedin size={18} />
              </motion.a>
              <motion.a 
                href="https://github.com/Alsenwia3med" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -5, color: '#D4AF37', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))' }}
                className="text-text-dim transition-all duration-300"
              >
                <Github size={18} />
              </motion.a>
              <motion.a 
                href="mailto:alsanwi2019@gmail.com" 
                whileHover={{ y: -5, color: '#D4AF37', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.5))' }}
                className="text-text-dim transition-all duration-300"
              >
                <Mail size={18} />
              </motion.a>
            </div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-slate-700">
              © 2026 {lang === 'en' ? 'Ahmed Abdulkareem Al-Senwi' : 'أحمد عبدالكريم الصنوي'} • {lang === 'en' ? 'BUILT WITH REACT' : 'بني باستخدام ريأكت'}
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
