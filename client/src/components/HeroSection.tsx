import { useEffect, useRef, useState } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // More efficient animation approach
  useEffect(() => {
    // Mark as loaded after a short delay to ensure all elements are rendered
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pattern py-20"
    >
      {/* Enhanced 3D layered background effects */}
      <div className="bg-3d-layer-1"></div>
      <div className="bg-3d-layer-2"></div>
      <div className="bg-3d-layer-3"></div>
      
      {/* Animated grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      
      {/* ThreeJS background with reduced opacity for better performance */}
      <ThreeScene className="opacity-40" />
      
      <div 
        ref={contentRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="flex flex-col items-center justify-center text-center mb-16">
          {/* Badge Label - With Reveal Animation */}
          <div 
            className={`transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="inline-block glass px-4 py-1.5 rounded-full text-sm font-medium text-primary border border-primary/20 mb-6">
              {t('title')}
            </div>
          </div>
          
          {/* Main Heading - With Reveal Animation */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/90 to-accent leading-tight max-w-4xl mx-auto transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '200ms' }}
          >
            {t('hero.greeting')} <br className="hidden md:block" /> 
            <span className="typing-animation inline-block">{t('name')}</span>
          </h1>
          
          {/* Description - With Reveal Animation */}
          <p 
            className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '400ms' }}
          >
            {t('hero.description')}
          </p>
          
          {/* Buttons - With Reveal Animation */}
          <div 
            className={`flex flex-wrap gap-4 justify-center transform transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full text-base transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20"
            >
              <a href="#projects">{t('hero.viewWork')}</a>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="glass border border-primary/30 text-foreground px-8 py-6 rounded-full text-base transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/60"
            >
              <a href="#contact">{t('hero.contact')}</a>
            </Button>
          </div>
        </div>
        
        {/* Profile Image Section */}
        <div 
          className={`w-full max-w-md mx-auto transform transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
          style={{ transitionDelay: '300ms' }}
        >
          <div className="relative mx-auto w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Animated background blobs */}
            <div className="absolute -z-10 w-full h-full rounded-full bg-primary/20 dark:bg-primary/10 blur-2xl animate-pulse-slow"></div>
            <div className="absolute -z-10 w-[110%] h-[110%] rounded-full bg-accent/15 dark:bg-accent/10 blur-3xl -translate-x-6 translate-y-6 animate-pulse-slow-reverse"></div>
            
            {/* Profile image container with premium effects */}
            <div className="group relative">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/60 via-accent/40 to-primary/60 blur-xl opacity-30 group-hover:opacity-60 transform scale-90 group-hover:scale-110 transition-all duration-700"></div>
              
              {/* Orbit circles with more premium feel */}
              <div className="absolute w-[101%] h-[101%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 animate-spin-slow"></div>
              <div className="absolute w-[108%] h-[108%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 animate-reverse-spin-slow"></div>
              <div className="absolute w-[115%] h-[115%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/20 animate-spin-slow" style={{ animationDuration: '25s' }}></div>
              
              {/* Floating particles */}
              <div className="absolute top-0 right-[10%] w-3 h-3 rounded-full bg-primary/80 animate-float-slow"></div>
              <div className="absolute bottom-[15%] left-[5%] w-2 h-2 rounded-full bg-accent/80 animate-float-medium"></div>
              <div className="absolute top-[20%] left-[8%] w-1.5 h-1.5 rounded-full bg-chart-3/80 animate-float-slow-reverse"></div>
              
              {/* Premium profile container */}
              <div className="w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden relative z-10 hover-scale transition-all duration-500 glow-on-hover">
                {/* Glass border effect */}
                <div className="absolute inset-0 rounded-full border-[6px] border-white/20 backdrop-blur-md z-20"></div>
                
                {/* Image with hover effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a" 
                    alt={t('name')} 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-3 will-change-transform"
                  />
                </div>
                
                {/* Inner glass highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent opacity-50 z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator with Enhanced Animation */}
      <div 
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '800ms' }}
      >
        <a 
          href="#about" 
          className="glass flex items-center justify-center w-12 h-12 rounded-full text-primary hover:text-white hover:bg-primary/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1"
          aria-label={t('nav.about')}
        >
          <ChevronDown className="w-6 h-6 animate-bounce-slow" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
