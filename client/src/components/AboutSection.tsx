import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaCode, 
  FaServer, 
  FaMobileAlt, 
  FaDatabase,
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaFigma
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  // Use a more efficient animation approach
  useEffect(() => {
    const animateElements = () => {
      // We'll use simpler animations with CSS classes instead of heavy GSAP animations
      // This will improve performance significantly
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => {
        if (el instanceof HTMLElement) {
          el.classList.add('will-animate');
          
          // Only run once per element and with a small timeout
          setTimeout(() => {
            el.classList.add('animate');
          }, 100);
        }
      });
    };
    
    // Simple scroll trigger with IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateElements();
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    { value: "5+", label: t('about.stats.experience') },
    { value: "50+", label: t('about.stats.projects') },
    { value: "20+", label: t('about.stats.clients') },
    { value: "99%", label: t('about.stats.satisfaction') }
  ];

  const skills = [
    {
      category: t('about.skills.frontend'),
      items: [
        { icon: <FaReact className="text-[#61DAFB]" />, name: "React" },
        { icon: <SiNextdotjs className="text-foreground" />, name: "Next.js" },
        { icon: <SiTypescript className="text-[#3178C6]" />, name: "TypeScript" },
        { icon: <SiTailwindcss className="text-[#38B2AC]" />, name: "Tailwind" },
        { icon: <FaJs className="text-[#F7DF1E]" />, name: "JavaScript" },
        { icon: <FaHtml5 className="text-[#E34F26]" />, name: "HTML5" },
        { icon: <FaCss3Alt className="text-[#1572B6]" />, name: "CSS3" }
      ]
    },
    {
      category: t('about.skills.backend'),
      items: [
        { icon: <FaNodeJs className="text-[#339933]" />, name: "Node.js" },
        { icon: <FaDatabase className="text-[#47A248]" />, name: "MongoDB" },
        { icon: <FaDatabase className="text-[#336791]" />, name: "PostgreSQL" },
        { icon: <FaServer className="text-[#000000]" />, name: "Express" }
      ]
    },
    {
      category: t('about.skills.tools'),
      items: [
        { icon: <FaGitAlt className="text-[#F05032]" />, name: "Git" },
        { icon: <FaDocker className="text-[#2496ED]" />, name: "Docker" },
        { icon: <FaFigma className="text-[#F24E1E]" />, name: "Figma" }
      ]
    }
  ];

  return (
    <section
      id="about" 
      ref={sectionRef}
      className="py-24 bg-pattern relative overflow-hidden"
    >
      {/* Add 3D layered effects */}
      <div className="bg-3d-layer-1"></div>
      <div className="bg-3d-layer-2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 animate-on-scroll">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            {t('about.title')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
            {t('about.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.introduction')}
          </p>
        </div>
        
        {/* Stats Row - Modern Clean Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-background/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-border/50 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-on-scroll"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Main Content - Two Columns Layout */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* About Me Column */}
          <div ref={bioRef} className="relative animate-on-scroll">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-2xl transform rotate-1 scale-[1.02] blur-[3px]"></div>
            <div className="bg-background/80 backdrop-blur-md rounded-2xl p-8 border border-border/40 relative">
              <h3 className="text-2xl font-bold text-primary mb-6">
                {t('about.bio.title')}
              </h3>
              
              <div className="space-y-4 text-foreground mb-8">
                <p className="leading-relaxed">
                  {t('about.paragraph1')}
                </p>
                <p className="leading-relaxed">
                  {t('about.paragraph2')}
                </p>
                <p className="leading-relaxed">
                  {t('about.paragraph3')}
                </p>
              </div>
              
              {/* Education Card */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h4 className="text-lg font-semibold text-accent mb-4">
                  {t('about.education.title')}
                </h4>
                <div className="space-y-1">
                  <div className="font-medium">{t('about.education.degree')}</div>
                  <div className="text-sm text-muted-foreground">{t('about.education.university')}</div>
                  <div className="text-sm text-muted-foreground/80">{t('about.education.period')}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Column */}
          <div ref={skillsRef} className="animate-on-scroll" style={{ animationDelay: '100ms' }}>
            <div className="bg-background/80 backdrop-blur-md rounded-2xl p-8 border border-border/40 h-full">
              <h3 className="text-2xl font-bold text-accent mb-8">
                {t('about.skills.title')}
              </h3>
              
              <div className="space-y-8">
                {skills.map((category, idx) => (
                  <div key={idx} className="animate-on-scroll" style={{ animationDelay: `${100 + idx * 100}ms` }}>
                    <h4 className="flex items-center text-lg font-semibold mb-4">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {category.items.map((skill, index) => (
                        <div
                          key={index}
                          className="bg-white/5 rounded-lg p-3 flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-1 hover:bg-primary/5"
                        >
                          <div className="text-2xl mb-2">
                            {skill.icon}
                          </div>
                          <div className="text-xs font-medium">{skill.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add CSS animation classes to index.css
// .will-animate { opacity: 0; }
// .animate { animation: fadeInUp 0.6s ease forwards; }

export default AboutSection;
