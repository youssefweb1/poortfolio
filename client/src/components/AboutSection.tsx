import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/hooks/useLanguage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaHtml5, 
  FaCss3Alt, 
  FaPhp,
  FaVuejs,
  FaWordpress,
  FaLaravel,
  FaCode,
  FaGitAlt,
  FaServer,
  FaDatabase,
  FaUsers,
  FaClock,
  FaComments,
  FaBookOpen,
  FaSearch,
  FaTasks,
  FaHeadset
} from "react-icons/fa";
import { 
  SiTailwindcss,
  SiBootstrap, 
  SiJavascript, 
  SiJquery,

  SiMysql,
  SiAframe,
  SiCanva,
  SiFigma,
  SiGithub,
  SiGitlab,
  SiArduino
} from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

// Define types for the experience data
interface ExperienceContentItem {
  date: string;
  role: string;
  company: string;
  details: string[];
}

interface ExperienceItem {
  en: ExperienceContentItem;
  ar: ExperienceContentItem;
}

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation - with reduced intensity
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Content animation
    if (contentRef.current) {
      const textElements = contentRef.current.querySelectorAll("p");
      gsap.fromTo(
        textElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Image animation - with reduced intensity
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Skills animation
    if (skillsRef.current) {
      const skills = skillsRef.current.querySelectorAll(".skill-item");
      gsap.fromTo(
        skills,
        { y: 15, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Experience cards animation
    if (timelineRef.current) {
      const cards = timelineRef.current.querySelectorAll(".experience-card");
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          }
        }
      );
    }

    return () => {
      // Cleanup scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Skill data with categories based on real experience
  const skillCategories = [
    {
      name: t('about.skillCategories.frontend'),
      skills: [
        { icon: <FaHtml5 className="w-6 h-6" />, name: "HTML5" },
        { icon: <FaCss3Alt className="w-6 h-6" />, name: "CSS3" },
        { icon: <SiJavascript className="w-6 h-6" />, name: "JavaScript (ES6)" },
        { icon: <FaVuejs className="w-6 h-6" />, name: "Vue.js" },
        { icon: <SiJquery className="w-6 h-6" />, name: "jQuery & Ajax" },
        { icon: <SiTailwindcss className="w-6 h-6" />, name: "Tailwind CSS" },
        { icon: <SiBootstrap className="w-6 h-6" />, name: "Bootstrap" },
        { icon: <FaCode className="w-6 h-6" />, name: "GSAP" },
        { icon: <SiAframe className="w-6 h-6" />, name: "A-Frame" }
      ]
    },
    {
      name: t('about.skillCategories.backend'),
      skills: [
        { icon: <FaPhp className="w-6 h-6" />, name: "PHP" },
        { icon: <FaLaravel className="w-6 h-6" />, name: "Laravel" },
        { icon: <SiMysql className="w-6 h-6" />, name: "MySQL" },
        { icon: <FaServer className="w-6 h-6" />, name: "RESTful APIs" }
      ]
    },
    {
      name: t('about.skillCategories.platforms'),
      skills: [
        { icon: <FaWordpress className="w-6 h-6" />, name: "WordPress" },
        { icon: <FaCode className="w-6 h-6" />, name: "Shopify" },
        { icon: <FaCode className="w-6 h-6" />, name: "Salla" },
        { icon: <FaServer className="w-6 h-6" />, name: "Domain Setup" },
        { icon: <FaServer className="w-6 h-6" />, name: "Email Config" }
      ]
    },
    {
      name: t('about.skillCategories.concepts'),
      skills: [
        { icon: <FaCode className="w-6 h-6" />, name: "OOP" },
        { icon: <FaCode className="w-6 h-6" />, name: "MVC Architecture" },
        { icon: <FaCode className="w-6 h-6" />, name: "SOLID Principles" },
        { icon: <FaCode className="w-6 h-6" />, name: "Design Patterns" },
        { icon: <FaDatabase className="w-6 h-6" />, name: "Data Structures" },
        { icon: <FaGitAlt className="w-6 h-6" />, name: "Git" },
        { icon: <SiArduino className="w-6 h-6" />, name: "Arduino (Level 1)" }
      ]
    },
    {
      name: t('about.skillCategories.softSkills'),
      skills: [
        { icon: <FaUsers className="w-6 h-6" />, name: "Teamwork" },
        { icon: <FaComments className="w-6 h-6" />, name: "Communication" },
        { icon: <FaBookOpen className="w-6 h-6" />, name: "Self-learning" },
        { icon: <FaSearch className="w-6 h-6" />, name: "Attention to Detail" },
        { icon: <FaTasks className="w-6 h-6" />, name: "Project Management" },
        { icon: <FaHeadset className="w-6 h-6" />, name: "Technical Support" }
      ]
    },
    {
      name: t('about.skillCategories.additional'),
      skills: [
        { icon: <SiCanva className="w-6 h-6" />, name: "Canva" },
        { icon: <SiFigma className="w-6 h-6" />, name: "Figma" },
        { icon: <FaCode className="w-6 h-6" />, name: "ICDL Certified" },
        { icon: <SiArduino className="w-6 h-6" />, name: "Arduino Level 1" },
        { icon: <FaServer className="w-6 h-6" />, name: "Domain & Server Setup" }
      ]
    }
  ];

  // Experience data with both English and Arabic content
  const experienceItems: ExperienceItem[] = [
    {
      en: {
        date: "March 2025 – Present",
        role: "IT Manager",
        company: "Mohamoon Saudi Arabia (Remote)",
        details: [
          "Managing the Lawyers' portal built on WordPress.",
          "Handling servers, domains, and email configurations."
        ]
      },
      ar: {
        date: "مارس 2025 – حتى الآن",
        role: "مدير تكنولوجيا المعلومات (IT Manager)",
        company: "شركة محامو السعودية (عن بُعد)",
        details: [
          "إدارة بوابة المحامين باستخدام ووردبريس.",
          "إدارة الخوادم والدومينات والإيميلات."
        ]
      }
    },
    {
      en: {
        date: "Sep 2024 – Jan 2025",
        role: "Full Stack Developer",
        company: "Estisharati (UAE – Remote)",
        details: [
          "Developed 'Party Wizard' – an eCommerce platform using Laravel.",
          "Built the CRM and consultation booking system 'Estisharati'."
        ]
      },
      ar: {
        date: "سبتمبر 2024 – يناير 2025",
        role: "مطور Full Stack",
        company: "Estisharati (الإمارات – عن بُعد)",
        details: [
          "تطوير نظام 'Party Wizard' – متجر إلكتروني باستخدام Laravel.",
          "بناء نظام CRM لحجوزات الاستشارات."
        ]
      }
    },
    {
      en: {
        date: "Jan 2023 – Nov 2024",
        role: "Full Stack Developer",
        company: "GiantWhale (Remote)",
        details: [
          "Built multiple portfolio websites and eCommerce platforms for Saudi clients."
        ]
      },
      ar: {
        date: "يناير 2023 – نوفمبر 2024",
        role: "مطور Full Stack",
        company: "GiantWhale (عن بُعد)",
        details: [
          "تطوير مواقع بورتفوليو ومنصات تجارة إلكترونية للعملاء في السعودية."
        ]
      }
    },
    {
      en: {
        date: "Jan 2023 – Present",
        role: "Web Developer (Part-time)",
        company: "Motiv-X",
        details: [
          "Enhanced a Laravel-based site with backend and database improvements."
        ]
      },
      ar: {
        date: "يناير 2023 – حتى الآن",
        role: "مطور ويب (دوام جزئي)",
        company: "Motiv-X",
        details: [
          "تحسين موقع Laravel بإصلاحات في الخلفية وقاعدة البيانات."
        ]
      }
    },
    {
      en: {
        date: "Feb 2025 – Present",
        role: "Contest Participant",
        company: "Global Tech Contest – Riyadh",
        details: [
          "Leading technical side for a web-based VR football experience.",
          "Handled performance optimization and integrations."
        ]
      },
      ar: {
        date: "فبراير 2025 – حتى الآن",
        role: "مشارك في مسابقة تقنية",
        company: "مسابقة عالمية – الرياض",
        details: [
          "قيادة الجانب التقني لتجربة واقع افتراضي لمباريات كرة القدم.",
          "تحسين الأداء والتكاملات التقنية."
        ]
      }
    },
    {
      en: {
        date: "2022 – 2023",
        role: "Trainee → Mentor",
        company: "Createivo",
        details: [
          "Completed an intensive Laravel + PHP training program.",
          "Later mentored new students in advanced tasks."
        ]
      },
      ar: {
        date: "2022 – 2023",
        role: "متدرب → مشرف",
        company: "Createivo",
        details: [
          "إتمام تدريب مكثف على PHP وLaravel.",
          "الإشراف لاحقًا على طلاب جدد في المهام المتقدمة."
        ]
      }
    }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-24 bg-pattern relative"
    >
      {/* Geometric decorative elements */}
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl opacity-60"></div>
      <div className="absolute right-0 top-1/3 w-72 h-72 rounded-full bg-accent/5 blur-3xl opacity-70"></div>
      
      <div className="container mx-auto px-6 relative">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-4 text-primary border border-primary/20">
            {t('about.title')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('about.subtitle')}
          </h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground">
              {t('about.shortDescription', 'A passionate developer focused on creating immersive web experiences with modern technologies')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          {/* Profile Image with animated border */}
          <div ref={imageRef} className="order-2 lg:order-1">
            <div className="relative">
              {/* Decorative shapes */}
              <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-primary/30 rounded-lg -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-20 h-20 border-2 border-accent/30 rounded-lg -z-10"></div>
              
              {/* Main image container */}
              <div className="relative group">
                {/* Background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg blur-md group-hover:blur-xl transition-all duration-1000 -z-10"></div>
                
                {/* The image */}
                <div className="relative overflow-hidden rounded-lg shadow-lg border border-border/40">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
                    alt={t('about.imageAlt')} 
                    className="w-full h-auto object-cover aspect-[4/5]" 
                  />
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* About Text Content */}
          <div ref={contentRef} className="order-1 lg:order-2 space-y-6">
            <div className="glass p-8 rounded-lg border border-border/40 relative overflow-hidden">
              {/* Subtle animated accent in the corner */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl"></div>
              
              <h3 className="text-xl font-semibold text-primary mb-4 relative">{t('about.title')}</h3>
              
              <div className="space-y-4 relative">
                <p className="text-foreground leading-relaxed">
                  {t('about.paragraph1')}
                </p>
                <p className="text-foreground leading-relaxed">
                  {t('about.paragraph2')}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills Section */}
        <div ref={skillsRef} className="mb-20">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('about.skills')}</h3>
            <p className="text-muted-foreground">{t('about.skillsDescription')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <div key={index} className="glass p-6 rounded-lg border border-border/40 hover:border-primary/20 transition-colors">
                <h4 className="text-lg font-semibold mb-4 text-center relative">
                  {/* Decorative accent */}
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"></span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{category.name}</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                  {category.skills.map((skill, skillIndex) => (
                    <div 
                      key={skillIndex} 
                      className="skill-item flex flex-col items-center p-3 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/5 transition-all duration-300 group hover:shadow-sm"
                    >
                      <div className="text-primary mb-2 group-hover:scale-110 group-hover:text-accent transition-all duration-300">
                        {skill.icon}
                      </div>
                      <div className="text-sm font-medium text-center">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Redesigned Experience Section */}
        <div ref={timelineRef} className="relative">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('about.experience')}</h3>
            <p className="text-muted-foreground">{t('about.experienceDescription')}</p>
          </div>
          
          {/* New Experience Cards Layout with RTL Support */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {experienceItems.map((item, index) => {
              // Get language-specific content
              const content = currentLanguage === 'ar' ? item.ar : item.en;
              
              return (
                <div 
                  key={index} 
                  className="experience-card glass p-6 rounded-lg border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                >
                  {/* Date Badge - Positioned properly for RTL */}
                  <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-3 text-primary border border-primary/20">
                    {content.date}
                  </div>
                  
                  {/* Role Title */}
                  <h4 className="text-lg font-semibold mb-1 text-foreground">
                    {content.role}
                  </h4>
                  
                  {/* Company Name */}
                  <div className="text-accent mb-4">
                    {content.company}
                  </div>
                  
                  {/* Details with Bullet Points - Uses logical properties for RTL support */}
                  <ul className="space-y-2">
                    {content.details.map((detail: string, detailIndex: number) => (
                      <li key={detailIndex} className="flex items-start">
                        <span className="inline-block text-primary me-2 mt-1.5 rtl:rotate-180">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="10" 
                            height="10" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </span>
                        <span className="text-muted-foreground text-sm">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;