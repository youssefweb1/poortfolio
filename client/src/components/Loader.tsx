import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

interface LoaderProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Loader: React.FC<LoaderProps> = ({ setLoading }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);
  const loaderRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!loaderRef.current || !svgRef.current || !pathRef.current) return;
    
    // Get the total length of the logo path for the drawing animation
    const pathLength = pathRef.current.getTotalLength();
    
    // Set initial path state
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 0
    });
    
    // Create main animation timeline
    const tl = gsap.timeline();
    
    // Initial animation - fade in and draw logo
    tl.to(loaderRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      duration: 0.5
    })
    .to(pathRef.current, {
      opacity: 1,
      duration: 0.3
    })
    .to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut"
    })
    .to(svgRef.current, {
      scale: 0.8,
      y: -30,
      duration: 0.7,
      ease: "back.out(1.2)"
    })
    .from(textRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .from(progressRef.current, {
      width: 0,
      opacity: 0,
      duration: 0.5,
      ease: "power1.out"
    }, "-=0.2")
    .from(counterRef.current, {
      opacity: 0,
      y: 10,
      duration: 0.3
    }, "-=0.3");
    
    // Create subtle pulse animation for the SVG
    gsap.to(svgRef.current, {
      y: "-=5",
      scale: 0.83,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    // No shadow animation for the container
    
    // Progress counter simulation
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += Math.floor(Math.random() * 8) + 3;
      
      if (loadingProgress > 100) {
        loadingProgress = 100;
        clearInterval(interval);
        completeLoading();
      }
      
      setProgress(loadingProgress);
    }, 50);
    
    // Final animation when loading completes
    const completeLoading = () => {
      gsap.delayedCall(0.3, () => {
        setLoading(false);
      });
      
      const completeTl = gsap.timeline();
      
      completeTl
        .to(svgRef.current, {
          scale: 1.3,
          fill: "#8b5cf6",
          stroke: "#d946ef",
          ease: "back.out(1.7)",
          duration: 0.6
        })
        .to(progressRef.current, {
          width: "100%",
          backgroundColor: "#8b5cf6",
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.3")
        .to(counterRef.current, {
          color: "#8b5cf6",
          scale: 1.1,
          fontWeight: "bold",
          duration: 0.4
        }, "-=0.4")
        .to([textRef.current, progressRef.current, counterRef.current, containerRef.current], {
          opacity: 0,
          y: -20,
          stagger: 0.1,
          duration: 0.5,
          delay: 0.6
        })
        .to(svgRef.current, {
          y: 0,
          scale: 15,
          opacity: 0,
          duration: 1,
          ease: "power3.in"
        }, "-=0.2")
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut"
        }, "-=0.2");
    };
    
    return () => clearInterval(interval);
  }, [setLoading]);
  
  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md z-[100] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="relative flex flex-col items-center max-w-md w-full px-6"
      >
        {/* Logo SVG with animated stroke */}
        <svg 
          ref={svgRef}
          width="100" 
          height="100" 
          viewBox="0 0 100 100"
          className="mb-8"
        >
          <path
            ref={pathRef}
            d="M50 10 C22 10 10 22 10 50 C10 78 22 90 50 90 C78 90 90 78 90 50 C90 22 78 10 50 10 Z M50 30 C38.954 30 30 38.954 30 50 C30 61.046 38.954 70 50 70 C61.046 70 70 61.046 70 50 C70 38.954 61.046 30 50 30 Z"
            className="fill-none stroke-primary"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Text & progress */}
        <div className="w-full mb-8">
          <div 
            ref={textRef}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold text-white mb-1">
              {t('name')}
            </h2>
            <p className="text-white/80 text-sm">
              {t('loader.message', 'Loading amazing experiences...')}
            </p>
          </div>
          
          {/* Progress tracker */}
          <div className="h-1 w-full bg-white/10 rounded-full mb-1 overflow-hidden">
            <div 
              ref={progressRef}
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div 
            ref={counterRef}
            className="text-right text-xs font-medium text-white/70"
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;