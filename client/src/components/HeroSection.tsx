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
      className="relative min-h-screen flex items-center overflow-hidden bg-pattern"
    >
      <ThreeScene className="opacity-60" />
      <div className="hero-overlay"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            ref={textRef}
            className="md:w-1/2 md:pl-12 rtl:md:pr-12 rtl:md:pl-0 mb-10 md:mb-0 order-2 md:order-1"
          >
            <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-6 text-primary border border-primary/20">
              {t('title')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-title">
              {t('hero.greeting')} <span className="typing-animation gradient-text">{t('name')}</span>
            </h1>
            
            <p className="mb-8 hero-description text-muted-foreground max-w-lg text-lg">
              {t('hero.description')}
            </p>
            
            <div className="flex space-x-4 rtl:space-x-reverse hero-buttons">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full transform hover:-translate-y-1 transition-all shadow-lg btn-hover-effect"
              >
                <a href="#projects">{t('hero.viewWork')}</a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="glass border border-primary/30 text-foreground px-6 py-3 rounded-full transform hover:-translate-y-1 transition-all hover:border-primary/60 btn-hover-effect"
              >
                <a href="#contact">{t('hero.contact')}</a>
              </Button>
            </div>
          </div>
          
          <div 
            ref={imageRef}
            className="md:w-1/2 order-1 md:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl"></div>
              <div className="absolute -z-10 w-72 h-72 md:w-[22rem] md:h-[22rem] rounded-full bg-accent/10 dark:bg-accent/5 blur-2xl -translate-x-8 translate-y-8"></div>
              
              {/* Profile image with glow and hover effect */}
              <div className="group relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/60 to-accent/60 blur-xl opacity-30 group-hover:opacity-60 transform group-hover:scale-110 transition-all duration-700"></div>
                
                {/* Orbit circles */}
                <div className="absolute w-full h-full rounded-full border border-white/10 animate-spin-slow"></div>
                <div className="absolute w-[105%] h-[105%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/20 animate-reverse-spin-slow"></div>
                
                {/* Profile container */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/30 dark:border-white/10 shadow-2xl relative z-10 backdrop-blur-sm bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-white/5 hover-scale glow-on-hover">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                    alt={t('name')} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-3"
                  />
                </div>
                
                {/* Small decorative dots */}
                <div className="absolute top-5 right-8 w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <div className="absolute bottom-8 left-5 w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse animate-slower">
        <a 
          href="#about" 
          className="glass flex items-center justify-center w-10 h-10 rounded-full text-primary hover:text-primary/80 transition-colors"
          aria-label={t('nav.about')}
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
