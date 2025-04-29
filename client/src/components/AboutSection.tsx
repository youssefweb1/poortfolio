import { useEffect, useRef } from "react";
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
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll(".stat-item");
      gsap.fromTo(
        stats,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Bio animation with lines appearing one by one
    if (bioRef.current) {
      const paragraphs = bioRef.current.querySelectorAll("p");
      gsap.fromTo(
        paragraphs,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 70%",
          }
        }
      );
    }

    // Skills animation
    if (skillsRef.current) {
      const skillCategories = skillsRef.current.querySelectorAll(".skill-category");
      const skillItems = skillsRef.current.querySelectorAll(".skill-item");
      
      gsap.fromTo(
        skillCategories,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 75%",
          }
        }
      );

      gsap.fromTo(
        skillItems,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.05,
          duration: 0.4,
          delay: 0.4,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 70%",
          }
        }
      );
    }

    return () => {
      // Cleanup scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const stats = [
    { icon: <FaCode />, value: "5+", label: t('about.stats.experience') },
    { icon: <FaServer />, value: "50+", label: t('about.stats.projects') },
    { icon: <FaMobileAlt />, value: "20+", label: t('about.stats.clients') },
    { icon: <FaDatabase />, value: "99%", label: t('about.stats.satisfaction') }
  ];

  const skills = [
    {
      category: t('about.skills.frontend'),
      items: [
        { icon: <FaReact />, name: "React" },
        { icon: <SiNextdotjs />, name: "Next.js" },
        { icon: <SiTypescript />, name: "TypeScript" },
        { icon: <SiTailwindcss />, name: "Tailwind" },
        { icon: <FaJs />, name: "JavaScript" },
        { icon: <FaHtml5 />, name: "HTML5" },
        { icon: <FaCss3Alt />, name: "CSS3" }
      ]
    },
    {
      category: t('about.skills.backend'),
      items: [
        { icon: <FaNodeJs />, name: "Node.js" },
        { icon: <FaDatabase />, name: "MongoDB" },
        { icon: <FaDatabase />, name: "PostgreSQL" },
        { icon: <FaServer />, name: "Express" }
      ]
    },
    {
      category: t('about.skills.tools'),
      items: [
        { icon: <FaGitAlt />, name: "Git" },
        { icon: <FaDocker />, name: "Docker" },
        { icon: <FaFigma />, name: "Figma" }
      ]
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]"></div>
        <div className="absolute top-[60%] right-[5%] w-[30%] h-[40%] rounded-full bg-accent/5 blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block glass px-4 py-1.5 rounded-full text-xs font-medium mb-4 text-primary border border-primary/20">
            {t('about.title')}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-accent">
            {t('about.subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('about.introduction')}
          </p>
        </div>
        
        {/* Stats Bar */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item glass rounded-xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all duration-500 hover:transform hover:translate-y-[-5px] hover:shadow-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary text-xl mb-4">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
        
        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Bio */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div ref={bioRef} className="glass rounded-2xl p-8 md:p-10 border border-white/10 h-full">
              <h3 className="text-2xl font-bold mb-6 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('about.bio.title')}</span>
                <span className="block w-16 h-1 bg-primary/50 mt-2 rounded-full"></span>
              </h3>
              
              <div className="space-y-4 text-foreground">
                <p className="leading-relaxed slide-up">
                  {t('about.paragraph1')}
                </p>
                <p className="leading-relaxed slide-up delay-200">
                  {t('about.paragraph2')}
                </p>
                <p className="leading-relaxed slide-up delay-300">
                  {t('about.paragraph3')}
                </p>
              </div>
              
              {/* Education */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-lg font-semibold mb-4">{t('about.education.title')}</h4>
                <div className="space-y-4">
                  <div className="slide-up delay-400">
                    <div className="font-medium">{t('about.education.degree')}</div>
                    <div className="text-sm text-muted-foreground">{t('about.education.university')}</div>
                    <div className="text-xs text-muted-foreground">{t('about.education.period')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <div ref={skillsRef} className="glass rounded-2xl p-8 md:p-10 border border-white/10">
              <h3 className="text-2xl font-bold mb-8 relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('about.skills.title')}</span>
                <span className="block w-16 h-1 bg-primary/50 mt-2 rounded-full"></span>
              </h3>
              
              <div className="space-y-10">
                {skills.map((category, idx) => (
                  <div key={idx} className="skill-category">
                    <h4 className="text-lg font-semibold mb-4 text-primary/90">{category.category}</h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                      {category.items.map((skill, index) => (
                        <div 
                          key={index} 
                          className="skill-item flex flex-col items-center justify-center p-3 rounded-lg glass border border-white/5 hover:border-primary/20 transition-all duration-300 hover-translate hover:shadow-lg"
                        >
                          <div className="text-2xl text-primary mb-2">
                            {skill.icon}
                          </div>
                          <div className="text-xs font-medium text-center">{skill.name}</div>
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

export default AboutSection;
