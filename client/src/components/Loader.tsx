import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

interface LoaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loader: React.FC<LoaderProps> = ({ setLoading }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  
  // Main container refs
  const loaderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Code animation refs
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const codeLinesRef = useRef<HTMLDivElement[]>([]);
  const addCodeLineRef = (el: HTMLDivElement) => {
    if (el && !codeLinesRef.current.includes(el)) {
      codeLinesRef.current.push(el);
    }
  };
  
  // Particle refs
  const particlesRef = useRef<HTMLDivElement>(null);
  const particleElements = useRef<HTMLDivElement[]>([]);
  const addParticleRef = (el: HTMLDivElement) => {
    if (el && !particleElements.current.includes(el)) {
      particleElements.current.push(el);
    }
  };
  
  // Text content refs
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  
  // Generate code lines
  const codeLines = [
    '<div className="portfolio">',
    '  <Header />',
    '  <main>',
    '    <HeroSection />',
    '    <AboutSection />',
    '    <ProjectsSection />',
    '    <ContactSection />',
    '  </main>',
    '  <Footer />',
    '</div>'
  ];
  
  // Generate particles
  const particles = Array.from({ length: 15 }, (_, i) => i);
  
  // Update progress bar when progress changes
  useEffect(() => {
    if (progressValueRef.current) {
      gsap.to(progressValueRef.current, {
        width: `${progress}%`,
        duration: 0.4,
        ease: "power1.out"
      });
    }
  }, [progress]);
  
  // Main animation setup
  useEffect(() => {
    if (!loaderRef.current) return;
    
    // Initialize GSAP animation
    const mainTimeline = gsap.timeline();
    
    // Set initial states
    gsap.set(particleElements.current, {
      opacity: 0,
      scale: 0,
      x: () => gsap.utils.random(-100, 100),
      y: () => gsap.utils.random(-100, 100),
      backgroundColor: () => {
        const colors = ['#3498db', '#2c6dbe', '#6fb1fc', '#36c2b9', '#5170ff'];
        return colors[Math.floor(Math.random() * colors.length)];
      }
    });
    
    gsap.set(codeLinesRef.current, {
      opacity: 0,
      x: -20,
      transformOrigin: "left"
    });
    
    gsap.set([titleRef.current, subtitleRef.current, progressBarRef.current, counterRef.current], {
      opacity: 0,
      y: 20
    });
    
    // Background initial animation
    mainTimeline.to(loaderRef.current, {
      backgroundColor: 'rgba(10, 15, 30, 0.98)',
      duration: 0.8,
      ease: "power2.inOut"
    });
    
    // Particles animation
    mainTimeline.to(particleElements.current, {
      opacity: 0.7,
      scale: 1,
      stagger: 0.04,
      duration: 0.8,
      ease: "back.out(1.7)",
      onComplete: () => {
        // Start continuous particle animations
        particleElements.current.forEach(particle => {
          gsap.to(particle, {
            x: `+=${gsap.utils.random(-150, 150)}`,
            y: `+=${gsap.utils.random(-150, 150)}`,
            opacity: gsap.utils.random(0.3, 0.8),
            scale: gsap.utils.random(0.8, 1.5),
            duration: gsap.utils.random(10, 20),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
        });
      }
    }, "-=0.4");
    
    // Animate code container in
    mainTimeline.to(codeContainerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "back.out(1.2)"
    }, "-=0.7");
    
    // Animate code lines sequentially
    mainTimeline.to(codeLinesRef.current, {
      opacity: 1,
      x: 0,
      stagger: 0.12,
      duration: 0.5,
      ease: "power1.out"
    }, "-=0.5");
    
    // Animate text and progress elements
    mainTimeline.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "back.out(1.2)"
    }, "-=0.8");
    
    mainTimeline.to([progressBarRef.current, counterRef.current], {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.5");
    
    // Select a random code line to "edit" every few seconds
    const editCodeLine = () => {
      const randomIndex = Math.floor(Math.random() * codeLinesRef.current.length);
      const line = codeLinesRef.current[randomIndex];
      
      gsap.to(line, {
        color: "#5eead4",
        fontWeight: "bold",
        duration: 0.3,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut",
        onComplete: () => {
          gsap.to(line, {
            color: "#94a3b8",
            fontWeight: "normal",
            duration: 0.3
          });
        }
      });
    };
    
    // Start periodic code editing effect
    const editInterval = setInterval(editCodeLine, 2000);
    
    // Progress counter simulation - make it slightly faster
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += Math.floor(Math.random() * 4) + 2;
      
      if (loadingProgress > 100) {
        loadingProgress = 100;
        clearInterval(interval);
        completeLoading();
      }
      
      setProgress(loadingProgress);
    }, 70);
    
    // Final animation sequence when loading completes
    const completeLoading = () => {
      clearInterval(editInterval);
      
      const completeTl = gsap.timeline();
      completeTl.eventCallback("onComplete", () => {
        setTimeout(() => setLoading(false), 200);
      });
      
      // Add completion effects
      completeTl
        // Highlight all code lines in sequence
        .to(codeLinesRef.current, {
          color: "#5eead4",
          fontWeight: "bold",
          stagger: 0.05,
          duration: 0.2,
        })
        // Fill progress bar completely
        .to(progressValueRef.current, {
          width: "100%",
          backgroundColor: "#5eead4",
          duration: 0.4,
          ease: "power3.out"
        }, "-=0.8")
        // Highlight counter
        .to(counterRef.current, {
          color: "#5eead4",
          fontWeight: "bold",
          scale: 1.1,
          duration: 0.3
        }, "-=0.4")
        // Scale up code container
        .to(codeContainerRef.current, {
          scale: 1.05,
          boxShadow: "0 0 30px rgba(94, 234, 212, 0.4)",
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3")
        // Explode particles outward
        .to(particleElements.current, {
          scale: 1.5,
          opacity: 0.9,
          x: (i, el) => {
            const currentX = gsap.getProperty(el, "x") as number;
            return currentX + gsap.utils.random(-200, 200);
          },
          y: (i, el) => {
            const currentY = gsap.getProperty(el, "y") as number;
            return currentY + gsap.utils.random(-200, 200);
          },
          duration: 1,
          stagger: 0.02,
          ease: "power2.out"
        }, "-=0.5")
        // Fade out interface elements
        .to([titleRef.current, subtitleRef.current, progressBarRef.current, counterRef.current], {
          opacity: 0,
          y: -20,
          duration: 0.4,
          stagger: 0.05,
          ease: "power2.in"
        }, "+=0.3")
        // Scale code container up and fade out
        .to(codeContainerRef.current, {
          scale: 1.3,
          opacity: 0,
          duration: 0.6,
          ease: "power3.in"
        }, "-=0.2")
        // Final particle explosion
        .to(particleElements.current, {
          opacity: 0,
          scale: 3,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.out"
        }, "-=0.6")
        // Fade out the entire loader
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut"
        }, "-=0.3");
    };
    
    return () => {
      clearInterval(interval);
    };
  }, [setLoading]);
  
  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl z-[100] overflow-hidden"
    >
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((_, index) => (
          <div
            key={index}
            ref={addParticleRef}
            className="absolute rounded-full opacity-0"
            style={{
              width: `${Math.random() * 20 + 5}px`,
              height: `${Math.random() * 20 + 5}px`,
              left: `${50 + Math.random() * 10}%`,
              top: `${50 + Math.random() * 10}%`,
            }}
          ></div>
        ))}
      </div>
      
      <div
        ref={containerRef}
        className="relative flex flex-col items-center max-w-md w-full px-6 z-10"
      >
        {/* Code animation container */}
        <div 
          ref={codeContainerRef} 
          className="w-full mb-8 bg-slate-900/80 rounded-lg border border-slate-700 overflow-hidden shadow-lg opacity-0 transform -translate-y-4"
        >
          {/* Code header bar */}
          <div className="bg-slate-800 px-4 py-2 border-b border-slate-700 flex items-center">
            <div className="flex space-x-2 rtl:space-x-reverse">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs text-slate-400 mx-auto">portfolio.tsx</div>
          </div>
          
          {/* Code content */}
          <div className="p-4 font-mono text-sm">
            {codeLines.map((line, index) => (
              <div 
                key={index}
                ref={addCodeLineRef}
                className="mb-1 text-slate-400"
                style={{ paddingLeft: `${line.match(/^\s+/)?.[0].length || 0}rem` }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
        
        {/* Text & Progress section */}
        <div className="w-full">
          <div className="text-center mb-6">
            <h2 
              ref={titleRef} 
              className="text-2xl md:text-3xl font-bold text-white mb-2 opacity-0"
            >
              {t('name')}
            </h2>
            <p 
              ref={subtitleRef}
              className="text-blue-300/80 text-sm opacity-0"
            >
              {t('loader.message', 'Initializing workspace environment...')}
            </p>
          </div>
          
          {/* Progress tracker */}
          <div 
            ref={progressBarRef}
            className="h-2 w-full bg-slate-800/80 rounded-full mb-2 overflow-hidden opacity-0 backdrop-blur-md border border-slate-700/50"
          >
            <div 
              ref={progressValueRef}
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div 
            ref={counterRef}
            className="text-right text-sm font-medium text-blue-300/80 opacity-0"
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;