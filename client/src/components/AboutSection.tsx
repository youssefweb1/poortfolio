import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Removed animations for instant content display
  useEffect(() => {
    return () => {
      // Cleanup scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Skill data with categories
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
        { icon: <FaCode className="w-6 h-6" />, name: "GSAP" }
      ]
    },
    {
      name: t('about.skillCategories.backend'),
      skills: [
        { icon: <FaPhp className="w-6 h-6" />, name: "PHP" },
        { icon: <FaLaravel className="w-6 h-6" />, name: "Laravel" },
        { icon: <SiMysql className="w-6 h-6" />, name: "MySQL" },
        { icon: <FaServer className="w-6 h-6" />, name: "RESTful API" }
      ]
    },
    {
      name: t('about.skillCategories.platforms'),
      skills: [
        { icon: <FaWordpress className="w-6 h-6" />, name: "WordPress" },
        { icon: <FaCode className="w-6 h-6" />, name: "Salla" },
        { icon: <SiAframe className="w-6 h-6" />, name: "A-Frame" }
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
        { icon: <SiGithub className="w-6 h-6" />, name: "GitHub" },
        { icon: <SiGitlab className="w-6 h-6" />, name: "GitLab" }
      ]
    },
    {
      name: t('about.skillCategories.softSkills'),
      skills: [
        { icon: <FaUsers className="w-6 h-6" />, name: "Team Collaboration" },
        { icon: <FaClock className="w-6 h-6" />, name: "Time Management" },
        { icon: <FaComments className="w-6 h-6" />, name: "Communication" },
        { icon: <FaBookOpen className="w-6 h-6" />, name: "Self-Learning" },
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

  // Timeline data
  const timelineItems = [
    {
      year: "2022 - Present",
      title: "Senior Web Developer",
      company: "TechVision Inc."
    },
    {
      year: "2019 - 2022",
      title: "Full Stack Developer",
      company: "Digital Innovations"
    },
    {
      year: "2017 - 2019",
      title: "Frontend Developer",
      company: "WebCraft Solutions"
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
        
        {/* Experience Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-foreground mb-2">{t('about.experience')}</h3>
            <p className="text-muted-foreground">{t('about.experienceDescription')}</p>
          </div>
          
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-[4.5rem] bottom-10 w-px bg-border/50 transform md:translate-x-px"></div>
          
          {/* Timeline items */}
          <div className="space-y-12 relative">
            {timelineItems.map((item, index) => (
              <div key={index} className="timeline-item relative md:w-1/2 md:odd:ml-auto md:odd:pl-8 md:even:pr-8 md:odd:text-left md:even:text-right">
                {/* Timeline dot */}
                <div className="absolute top-0 md:top-2 left-0 md:left-0 md:odd:left-0 md:even:right-0 w-4 h-4 rounded-full bg-primary transform -translate-x-1/2 md:odd:-translate-x-1/2 md:even:translate-x-1/2"></div>
                
                {/* Timeline content */}
                <div className="ml-6 md:ml-0 pt-1 md:pt-0">
                  <div className="glass px-4 py-4 rounded-lg border border-border/40 hover:border-primary/20 transition-colors">
                    <div className="text-sm text-accent font-medium">{item.year}</div>
                    <div className="text-lg font-semibold">{item.title}</div>
                    <div className="text-muted-foreground text-sm">{item.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;