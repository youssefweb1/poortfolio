import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import ThreeScene from "@/components/ThreeScene";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current) return;

    const textElements = textRef.current.querySelectorAll("h1, .hero-title, .hero-description, .hero-buttons");
    
    gsap.fromTo(
      textElements,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1, 
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    gsap.fromTo(
      imageRef.current,
      { scale: 0.8, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 1,
        delay: 0.5,
        ease: "back.out(1.7)"
      }
    );

    return () => {
      // Cleanup any scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <ThreeScene />
      <div className="hero-overlay"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            ref={textRef}
            className="md:w-1/2 md:pl-12 rtl:md:pr-12 rtl:md:pl-0 mb-10 md:mb-0 order-2 md:order-1"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 hero-title text-white">
              {t('hero.greeting')} <span className="gradient-text">{t('name')}</span>
            </h1>
            
            <div className="text-xl md:text-2xl mb-6 hero-title text-slate-300">
              {t('title')}
            </div>
            
            <p className="mb-8 hero-description text-slate-300 max-w-lg">
              {t('hero.description')}
            </p>
            
            <div className="flex space-x-4 rtl:space-x-reverse hero-buttons">
              <Button
                asChild
                className="bg-primary hover:bg-primary/80 text-white px-6 py-3 transform hover:-translate-y-1 transition-all shadow-lg"
              >
                <a href="#projects">{t('hero.viewWork')}</a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-white/30 hover:border-white/60 text-white px-6 py-3 transform hover:-translate-y-1 transition-all"
              >
                <a href="#contact">{t('hero.contact')}</a>
              </Button>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 order-1 md:order-2 flex justify-center"
          >
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden ring-8 ring-primary/20 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                alt={t('name')} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a 
          href="#about" 
          className="text-white/70 hover:text-white"
          aria-label={t('nav.about')}
        >
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
