import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import ThreeScene from "@/components/ThreeScene";
import { ChevronDown, ArrowRight, ExternalLink } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const isRtl = i18n.dir() === 'rtl';
  
  // For animated typing effect
  const [displayText, setDisplayText] = useState("");
  const nameText = t('name');
  const typingSpeed = 100; // ms per character
  
  // Typing animation effect
  useEffect(() => {
    let index = 0;
    let timer: NodeJS.Timeout;
    
    if (index === 0) {
      timer = setInterval(() => {
        if (index < nameText.length) {
          setDisplayText(prev => prev + nameText.charAt(index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, typingSpeed);
    }
    
    return () => clearInterval(timer);
  }, [nameText]);

  // GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !heroContentRef.current || !heroImageRef.current) return;
    
    // Timeline for smoother sequenced animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Hero text elements animation 
    const textElements = heroContentRef.current.querySelectorAll(".animate-item");
    
    tl.fromTo(
      textElements,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.15,
      },
      0.2 // Start slightly after timeline begins
    );
    
    // Hero image container animation
    tl.fromTo(
      heroImageRef.current,
      { 
        opacity: 0,
        scale: 0.9,
        rotationY: isRtl ? -20 : 20,
      },
      { 
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1.2,
        ease: "back.out(1.4)"
      },
      0.4 // Start slightly after text animation
    );
    
    // Decorative dots animations
    const dots = document.querySelectorAll(".hero-dot");
    tl.fromTo(
      dots, 
      { scale: 0, opacity: 0 },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "back.out(2)"
      },
      0.8 // Start after main elements
    );
    
    // Grid pattern subtle animation
    gsap.to(".hero-grid", {
      backgroundPosition: `${isRtl ? '-' : ''}20px 20px`,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    // Decorative blur gradient animation
    gsap.to(".hero-gradient-blur", {
      rotation: 360,
      transformOrigin: "center center",
      duration: 30,
      repeat: -1,
      ease: "none"
    });
    
    return () => {
      // Cleanup
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isRtl]);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-pattern"
      style={{ willChange: "transform" }}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Dynamic 3D background */}
        <ThreeScene className="opacity-40" />
        
        {/* Animated gradient blurs */}
        <div className="hero-gradient-blur absolute -top-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-primary/10 via-accent/5 to-transparent blur-3xl opacity-60"></div>
        <div className="hero-gradient-blur absolute -bottom-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-gradient-to-r from-accent/10 via-primary/5 to-transparent blur-3xl opacity-50"></div>
        
        {/* Grid pattern overlay with subtle movement */}
        <div className="hero-grid absolute inset-0 opacity-[0.15] dark:opacity-20 z-10"
          style={{ 
            backgroundImage: `
              linear-gradient(to right, hsla(var(--primary), 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, hsla(var(--primary), 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        ></div>
      </div>
      
      {/* Frost glass hero content container */}
      <div className="container relative z-20 px-6 py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-6">
          {/* Left side - Text content */}
          <div 
            ref={heroContentRef} 
            className={`lg:w-1/2 ${isRtl ? 'lg:pr-6' : 'lg:pl-6'}`}
          >
            {/* Profession badge */}
            <div className="animate-item frost-glass inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-2"></span>
              <span>{t('title')}</span>
            </div>
            
            {/* Main heading with animated name */}
            <h1 className="animate-item text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="block mb-2">{t('hero.greeting')}</span>
              <div className="relative inline-flex h-[1.2em] overflow-hidden">
                <span className="gradient-text text-transparent bg-clip-text drop-shadow-sm">
                  {displayText}
                </span>
                <span className="absolute right-0 top-0 h-full w-[3px] bg-primary animate-pulse"></span>
              </div>
            </h1>
            
            {/* Description text */}
            <p className="animate-item mb-8 text-lg leading-relaxed text-muted-foreground max-w-xl">
              {t('hero.description')}
            </p>
            
            {/* CTA buttons */}
            <div className="animate-item flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-full px-6 shadow-lg shadow-primary/10 frost-glass gap-2 group"
              >
                <a href="#projects">
                  {t('hero.viewWork')}
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:${isRtl ? '-translate-x-1' : 'translate-x-1'}`} />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-6 backdrop-blur-md border border-primary/20 hover:border-primary/40 gap-2 group"
              >
                <a href="#contact">
                  {t('hero.contact')}
                  <ExternalLink className="w-4 h-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </div>
            
            {/* Small decorative dots */}
            <div className="relative mt-16 hidden md:block">
              <div className="hero-dot absolute top-0 -left-4 w-2 h-2 rounded-full bg-primary"></div>
              <div className="hero-dot absolute top-12 left-8 w-3 h-3 rounded-full bg-accent/80"></div>
              <div className="hero-dot absolute -top-8 left-12 w-1.5 h-1.5 rounded-full bg-primary/80"></div>
            </div>
          </div>
          
          {/* Right side - Image and decorative elements */}
          <div 
            ref={heroImageRef}
            className="lg:w-1/2 relative"
          >
            <div className="relative mx-auto max-w-md perspective-1000">
              {/* Main spotlight effect */}
              <div className="absolute -inset-10 bg-gradient-to-r from-primary/20 via-accent/20 to-transparent rounded-full blur-3xl opacity-70 z-0 animate-pulse animate-slower"></div>
              
              {/* 3D floating card effect */}
              <div className="relative glass-panel frost-glass rounded-2xl overflow-hidden border border-white/20 shadow-2xl transition-transform duration-300 hover:translate-y-[-5px] hover:translate-x-[2px]">
                {/* Profile image container */}
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a"
                    alt={t('name')} 
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                </div>
                
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
                
                {/* Text overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 hover:translate-y-0 transition-transform duration-300">
                  <div className="rounded-full px-3 py-1 text-xs font-semibold bg-white/10 backdrop-blur-sm inline-block mb-3">
                    {t('title')}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{t('name')}</h3>
                  <p className="text-white/80 text-sm">{t('hero.description').split(' ').slice(0, 5).join(' ')}...</p>
                </div>
                
                {/* Interactive grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 backdrop-blur-[1px] pointer-events-none"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 -right-8 w-20 h-20 rounded-full border border-primary/30 animate-spin-slow"></div>
              <div className="absolute -bottom-4 right-1/4 w-16 h-16 rounded-full border border-accent/30 animate-reverse-spin-slow"></div>
              <div className="hero-dot absolute top-0 right-0 w-3 h-3 rounded-full bg-primary"></div>
              <div className="hero-dot absolute bottom-0 left-0 w-2 h-2 rounded-full bg-accent"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <a 
          href="#about" 
          className="frost-glass flex items-center justify-center w-12 h-12 rounded-full text-primary transition-all duration-300 hover:scale-110 hover:text-white hover:bg-primary/40"
          aria-label={t('nav.about')}
        >
          <ChevronDown className="w-5 h-5 animate-bounce animate-slower" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
