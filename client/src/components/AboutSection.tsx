import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaDatabase 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
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

    // Content animation
    if (contentRef.current) {
      const textElements = contentRef.current.querySelectorAll("h3, p");
      gsap.fromTo(
        textElements,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
          }
        }
      );
    }

    // Image animation
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Skills animation
    if (skillsRef.current) {
      const skills = skillsRef.current.querySelectorAll("div");
      gsap.fromTo(
        skills,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          scrollTrigger: {
            trigger: skillsRef.current,
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

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 bg-white dark:bg-slate-900"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div ref={imageRef} className="md:w-2/5 mb-10 md:mb-0">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" 
              alt={t('about.imageAlt')} 
              className="rounded-lg shadow-xl w-full h-auto object-cover transform transition-transform hover:scale-[1.02]"
            />
          </div>
          
          <div ref={contentRef} className="md:w-3/5">
            <h3 className="text-2xl font-bold mb-4 text-primary">
              {t('about.subtitle')}
            </h3>
            
            <div className="space-y-4 text-slate-700 dark:text-slate-300">
              <p>
                {t('about.paragraph1')}
              </p>
              <p>
                {t('about.paragraph2')}
              </p>
            </div>
            
            <div ref={skillsRef} className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaReact />
                </div>
                <div className="font-medium">React</div>
              </div>
              <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaNodeJs />
                </div>
                <div className="font-medium">Node.js</div>
              </div>
              <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaJs />
                </div>
                <div className="font-medium">JavaScript</div>
              </div>
              <div className="bg-white dark:bg-slate-800 shadow rounded-lg p-4 text-center">
                <div className="text-primary text-3xl mb-2">
                  <FaDatabase />
                </div>
                <div className="font-medium">MongoDB</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
