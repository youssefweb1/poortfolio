import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Code, 
  Server, 
  Smartphone, 
  Database,
  CheckCircle,
  GraduationCap,
  Calendar,
  Award,
  Building
} from "lucide-react";
import { 
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaDocker,
  FaFigma
} from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiPostgresql, SiExpress } from "react-icons/si";
import { cn } from "@/lib/utils";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.dir() === 'rtl';
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Active tab state for skills display
  const [activeTab, setActiveTab] = useState('frontend');

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Create a main timeline
    const mainTl = gsap.timeline({
      defaults: { 
        ease: "power3.out",
        duration: 0.7
      }
    });

    // Section title animation
    if (titleRef.current) {
      mainTl.fromTo(
        titleRef.current.querySelectorAll(".animate-title"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
          }
        }
      );
    }

    // Stats animations - optimized with a single trigger
    if (statsRef.current) {
      const stats = statsRef.current.querySelectorAll(".stat-card");
      
      gsap.fromTo(
        stats,
        { 
          y: 30, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
          }
        }
      );
      
      // Counter animation for stat numbers
      stats.forEach((statElement) => {
        const valueElement = statElement.querySelector('.stat-value');
        const targetValue = parseFloat(valueElement?.getAttribute('data-value') || '0');
        const valueText = valueElement?.getAttribute('data-text') || '';
        const decimalPlaces = valueText.includes('%') ? 0 : 0;
        
        // Simple counter animation using GSAP
        let obj = { val: 0 };
        gsap.to(obj, {
          val: targetValue,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statElement,
            start: "top 80%",
          },
          onUpdate: function() {
            if (valueElement) {
              valueElement.textContent = Math.floor(obj.val).toString() + valueText;
            }
          }
        });
      });
    }

    // Bio card animation with staggered paragraphs
    if (bioRef.current) {
      const bioElements = bioRef.current.querySelectorAll(".animate-bio");
      
      gsap.fromTo(
        bioElements,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Skills section animations
    if (skillsRef.current) {
      const skillElements = skillsRef.current.querySelectorAll(".animate-skill");
      
      gsap.fromTo(
        skillElements,
        { 
          opacity: 0,
          y: 15
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 75%",
          }
        }
      );
    }
    
    // Timeline animation
    if (timelineRef.current) {
      const timelineItems = timelineRef.current.querySelectorAll(".timeline-item");
      
      gsap.fromTo(
        timelineItems,
        { 
          opacity: 0,
          x: isRtl ? 20 : -20
        },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Cleanup function
    return () => {
      mainTl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isRtl, activeTab]);

  // Stats data with modern icons
  const stats = [
    { 
      icon: <Code className="w-full h-full p-2" />, 
      value: 5, 
      text: "+", 
      label: t('about.stats.experience'),
      color: "from-primary/70 to-primary/10"
    },
    { 
      icon: <Server className="w-full h-full p-2" />, 
      value: 50, 
      text: "+", 
      label: t('about.stats.projects'),
      color: "from-blue-500/70 to-blue-500/10"
    },
    { 
      icon: <Smartphone className="w-full h-full p-2" />, 
      value: 20, 
      text: "+", 
      label: t('about.stats.clients'),
      color: "from-accent/70 to-accent/10"
    },
    { 
      icon: <CheckCircle className="w-full h-full p-2" />, 
      value: 99, 
      text: "%", 
      label: t('about.stats.satisfaction'),
      color: "from-emerald-500/70 to-emerald-500/10"
    }
  ];

  // Skill categories with more modern organization
  const skillCategories = [
    {
      id: 'frontend',
      title: t('about.skills.frontend'),
      icon: <Code className="w-5 h-5" />,
      skills: [
        { icon: <FaReact className="text-[#61DAFB]" />, name: "React", level: 90 },
        { icon: <SiNextdotjs className="text-black dark:text-white" />, name: "Next.js", level: 85 },
        { icon: <SiTypescript className="text-[#3178C6]" />, name: "TypeScript", level: 80 },
        { icon: <SiTailwindcss className="text-[#06B6D4]" />, name: "Tailwind CSS", level: 95 },
        { icon: <FaJs className="text-[#F7DF1E]" />, name: "JavaScript", level: 95 },
        { icon: <FaHtml5 className="text-[#E34F26]" />, name: "HTML5", level: 95 },
        { icon: <FaCss3Alt className="text-[#1572B6]" />, name: "CSS3", level: 90 }
      ]
    },
    {
      id: 'backend',
      title: t('about.skills.backend'),
      icon: <Server className="w-5 h-5" />,
      skills: [
        { icon: <FaNodeJs className="text-[#339933]" />, name: "Node.js", level: 85 },
        { icon: <SiExpress className="text-black dark:text-white" />, name: "Express", level: 80 },
        { icon: <SiMongodb className="text-[#47A248]" />, name: "MongoDB", level: 75 },
        { icon: <SiPostgresql className="text-[#336791]" />, name: "PostgreSQL", level: 70 }
      ]
    },
    {
      id: 'tools',
      title: t('about.skills.tools'),
      icon: <Database className="w-5 h-5" />,
      skills: [
        { icon: <FaGitAlt className="text-[#F05032]" />, name: "Git", level: 90 },
        { icon: <FaDocker className="text-[#2496ED]" />, name: "Docker", level: 75 },
        { icon: <FaFigma className="text-[#F24E1E]" />, name: "Figma", level: 85 }
      ]
    }
  ];

  // Find the active category
  const activeCategory = skillCategories.find(cat => cat.id === activeTab) || skillCategories[0];

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-pattern"
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient overlay */}
        <div className="absolute -top-[20%] left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-[120px]"></div>
        <div className="absolute top-[50%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-accent/5 to-transparent blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="max-w-3xl mx-auto text-center mb-16">
          <div className="animate-title flex justify-center">
            <span className="frost-glass py-2 px-4 rounded-full inline-flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>{t('about.title')}</span>
            </span>
          </div>
          
          <h2 className="animate-title text-3xl md:text-4xl lg:text-5xl font-bold mt-6 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t('about.subtitle')}
            </span>
          </h2>
          
          <p className="animate-title text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('about.introduction')}
          </p>
        </div>
        
        {/* Stats Grid - Modern Card Layout */}
        <div 
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`stat-card frost-glass rounded-xl overflow-hidden relative group`}
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity`}></div>
              
              {/* Card content */}
              <div className="p-6 md:p-8 relative z-10">
                {/* Icon */}
                <div className="rounded-2xl w-12 h-12 flex items-center justify-center text-primary mb-4 bg-primary/10">
                  {stat.icon}
                </div>
                
                {/* Counter */}
                <div 
                  className="stat-value text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent" 
                  data-value={stat.value}
                  data-text={stat.text}
                >
                  0{stat.text}
                </div>
                
                {/* Label */}
                <div className="text-sm mt-1 text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column - Bio */}
          <div className="lg:col-span-5">
            <div ref={bioRef} className="space-y-8">
              {/* Bio card */}
              <div className="frost-glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Top gradient line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
                
                <h3 className="text-2xl font-bold mb-6 animate-bio">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{t('about.bio.title')}</span>
                </h3>
                
                <div className="space-y-4">
                  <p className="animate-bio text-muted-foreground leading-relaxed">
                    {t('about.paragraph1')}
                  </p>
                  <p className="animate-bio text-muted-foreground leading-relaxed">
                    {t('about.paragraph2')}
                  </p>
                  <p className="animate-bio text-muted-foreground leading-relaxed">
                    {t('about.paragraph3')}
                  </p>
                </div>
              </div>
              
              {/* Education Card */}
              <div className="frost-glass rounded-2xl p-6 md:p-8 relative overflow-hidden">
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-primary/30 to-accent/20 blur-sm rounded-bl-full -z-0"></div>
                
                <h3 className="text-2xl font-bold mb-6 animate-bio flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <span>{t('about.education.title')}</span>
                </h3>
                
                <div className="relative">
                  <div ref={timelineRef} className="border-l-2 border-primary/20 pl-6 ml-2 space-y-6">
                    <div className="timeline-item relative">
                      {/* Dot indicator */}
                      <div className="absolute w-4 h-4 bg-primary rounded-full -left-[1.625rem] top-1 shadow-lg shadow-primary/20"></div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-primary" />
                          <span className="font-bold">{t('about.education.university')}</span>
                        </div>
                        <div className="text-lg font-medium">{t('about.education.degree')}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{t('about.education.period')}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="timeline-item relative">
                      {/* Dot indicator */}
                      <div className="absolute w-4 h-4 bg-accent rounded-full -left-[1.625rem] top-1 shadow-lg shadow-accent/20"></div>
                      
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-accent" />
                          <span className="font-bold">Online Certifications</span>
                        </div>
                        <div className="text-lg font-medium">Advanced Web Development</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>2020-2022</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column - Skills */}
          <div className="lg:col-span-7">
            <div ref={skillsRef} className="frost-glass rounded-2xl overflow-hidden">
              {/* Skills tab navigation */}
              <div className="flex border-b border-white/10">
                {skillCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveTab(category.id)}
                    className={cn(
                      "flex-1 px-4 py-5 text-center relative transition-all duration-200 flex items-center justify-center gap-2",
                      activeTab === category.id
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {category.icon}
                    <span>{category.title}</span>
                    
                    {/* Active indicator line */}
                    {activeTab === category.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                    )}
                  </button>
                ))}
              </div>
              
              {/* Skills content */}
              <div className="p-6 md:p-8">
                <div className="animate-skill mb-6">
                  <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                    {activeCategory.icon}
                    <span>{activeCategory.title}</span>
                  </h3>
                  <p className="text-muted-foreground">
                    {activeTab === 'frontend' && "Creating stunning user interfaces with modern technologies."}
                    {activeTab === 'backend' && "Building robust server-side applications and APIs."}
                    {activeTab === 'tools' && "Leveraging industry-standard tools for efficient development."}
                  </p>
                </div>
                
                {/* Skills progress bars */}
                <div className="space-y-6">
                  {activeCategory.skills.map((skill, idx) => (
                    <div key={idx} className="animate-skill">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="font-medium">{skill.name}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{skill.level}%</span>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          style={{ 
                            width: `${skill.level}%`,
                            transition: 'width 1s ease-in-out' 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Skill cards grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {activeCategory.skills.slice(0, 3).map((skill, idx) => (
                <div 
                  key={idx}
                  className="animate-skill frost-glass rounded-xl p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {skill.icon}
                  </div>
                  <div className="font-medium">{skill.name}</div>
                  <div className="text-xs text-muted-foreground mt-1">Proficiency: {skill.level}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
