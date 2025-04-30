import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import ThreeScene from "@/components/ThreeScene";
import { ChevronDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !imageRef.current) return;

    // Less intensive animations on mobile
    const textElements = textRef.current.querySelectorAll("h1, .hero-title, .hero-description, .hero-buttons");
    
    // Simplified animation with reduced distance and faster timing on mobile
    gsap.fromTo(
      textElements,
      { 
        y: isMobile ? 30 : 50, // Reduced distance on mobile
        opacity: 0 
      },
      { 
        y: 0, 
        opacity: 1, 
        duration: isMobile ? 0.8 : 1, // Faster on mobile
        stagger: isMobile ? 0.15 : 0.2, // Less delay between items
        ease: isMobile ? "power2.out" : "power3.out" // Simpler easing function
      }
    );

    // Simpler animation for profile image on mobile
    gsap.fromTo(
      imageRef.current,
      { 
        scale: isMobile ? 0.9 : 0.8, // Less scaling on mobile
        opacity: 0 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: isMobile ? 0.8 : 1, // Faster on mobile
        delay: isMobile ? 0.3 : 0.5, // Less delay on mobile
        ease: isMobile ? "back.out(1.4)" : "back.out(1.7)" // Simpler bounce effect
      }
    );

    return () => {
      // Cleanup any scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isMobile]); // Re-run when mobile status changes

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-pattern"
    >
      <ThreeScene className="opacity-60" />
      <div className="hero-overlay"></div>
      
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            ref={textRef}
            className="md:w-1/2 md:pl-8 lg:pl-12 rtl:md:pr-8 rtl:lg:pr-12 rtl:md:pl-0 mb-10 md:mb-0 order-2 md:order-1"
          >
            <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-4 sm:mb-6 text-primary border border-primary/20">
              {t('title')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 hero-title">
              {t('hero.greeting')} <span className="gradient-text">{t('name')}</span>
            </h1>
            
            <p className="mb-6 sm:mb-8 hero-description text-muted-foreground max-w-lg text-base sm:text-lg">
              {t('hero.description')}
            </p>
            
            <div className="flex gap-3 sm:gap-4 rtl:space-x-reverse hero-buttons">
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md sm:shadow-lg btn-hover-effect text-sm sm:text-base"
              >
                <a href="#projects">{t('hero.viewWork')}</a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="glass border border-primary/30 text-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:border-primary/60 btn-hover-effect text-sm sm:text-base"
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
              {/* Background decoration - simplified for better performance */}
              <div className="absolute -z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl"></div>
              <div className="absolute -z-10 w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] rounded-full bg-accent/10 dark:bg-accent/5 blur-2xl -translate-x-6 sm:-translate-x-8 translate-y-6 sm:translate-y-8"></div>
              
              {/* Profile image - using responsive sizing */}
              <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/40 dark:border-white/10 shadow-xl relative z-10 backdrop-blur-sm bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-white/5">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                  alt={t('name')} 
                  className="w-full h-full object-cover"
                  loading="eager" // Prioritize loading
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-pulse animate-slower">
        <a 
          href="#about" 
          className="glass flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-primary hover:text-primary/80 transition-colors"
          aria-label={t('nav.about')}
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
