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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-pattern"
    >
      <div className="hero-overlay"></div>
      
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div 
            ref={textRef}
            className="md:w-1/2 md:pl-12 rtl:md:pr-12 rtl:md:pl-0 mb-16 sm:mb-20 md:mb-0 order-2 md:order-1"
          >
            <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-6 gradient-text border border-primary/20">
              {t('title')}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 hero-title">
              {t('hero.greeting')} <span className="gradient-text">{t('name')}</span>
            </h1>
            
            <p className="my-8 hero-description text-muted-foreground max-w-lg text-lg">
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
            className="md:w-1/2 order-1 md:order-2 flex justify-center mb-12 sm:mb-16 md:mb-0"
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -z-10 w-72 h-72 md:w-96 md:h-96 rounded-full bg-primary/10 dark:bg-primary/5 blur-2xl"></div>
              <div className="absolute -z-10 w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full bg-accent/10 dark:bg-accent/5 blur-2xl -translate-x-8 translate-y-8"></div>
              
              {/* Profile image with neon effect */}
              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-[6px] border-primary/60 dark:border-primary/40 shadow-[0_0_30px_rgba(0,128,255,0.5)] dark:shadow-[0_0_30px_rgba(0,128,255,0.3)] relative z-10 backdrop-blur-sm bg-gradient-to-br from-white/30 to-white/10 dark:from-white/10 dark:to-white/5 animate-pulse-slow">
                <div className="absolute inset-0 bg-primary/20 dark:bg-primary/10 blur-md"></div>
                <img 
                  src="/images/2.jpeg" 
                  alt={t('name')} 
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={() => scrollToSection('about')}>
  <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
    <button
      onClick={() => scrollToSection('about')}
      className="cursor-pointer glass flex items-center justify-center w-12 h-12 rounded-full text-primary hover:text-primary/80 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,128,255,0.5)] dark:hover:shadow-[0_0_20px_rgba(0,128,255,0.3)] border border-primary/30 hover:border-primary/60"
      aria-label={t('nav.about')}
    >
      <ChevronDown className="w-6 h-6 animate-bounce" />
    </button>
  </div>
</div>

    </section>
  );
};

export default HeroSection;
