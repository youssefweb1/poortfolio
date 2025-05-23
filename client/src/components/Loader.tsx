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
  const loaderBgRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D cube elements
  const cubeRef = useRef<HTMLDivElement>(null);
  const cubeWrapperRef = useRef<HTMLDivElement>(null);
  const cubeFacesRef = useRef<HTMLDivElement[]>([]);
  
  const addCubeFaceRef = (el: HTMLDivElement) => {
    if (el && !cubeFacesRef.current.includes(el)) {
      cubeFacesRef.current.push(el);
    }
  };
  
  // Logo elements
  const circleRef = useRef<HTMLDivElement>(null);
  const logoPiecesRef = useRef<HTMLDivElement[]>([]);
  
  const addLogoPieceRef = (el: HTMLDivElement) => {
    if (el && !logoPiecesRef.current.includes(el)) {
      logoPiecesRef.current.push(el);
    }
  };
  
  // Text elements
  const textRingsRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  
  // Progress elements
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressValueRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLDivElement>(null);
  
  // Logo pieces config
  const logoPieces = [
    { angle: 0, translateX: 0, translateY: -38, width: 12, height: 38 },
    { angle: 60, translateX: 33, translateY: -19, width: 12, height: 38 },
    { angle: 120, translateX: 33, translateY: 19, width: 12, height: 38 },
    { angle: 180, translateX: 0, translateY: 38, width: 12, height: 38 },
    { angle: 240, translateX: -33, translateY: 19, width: 12, height: 38 },
    { angle: 300, translateX: -33, translateY: -19, width: 12, height: 38 }
  ];
  
  // Update progress bar when progress changes
  useEffect(() => {
    if (progressValueRef.current) {
      gsap.to(progressValueRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power1.out"
      });
      
      if (progressTextRef.current) {
        gsap.to(progressTextRef.current, {
          innerText: `${Math.round(progress)}%`,
          duration: 0.3,
          snap: { innerText: 1 },
          ease: "power1.out"
        });
      }
    }
  }, [progress]);
  
  // Main animation setup
  useEffect(() => {
    if (!loaderRef.current || !containerRef.current) return;
    
    // Main Timeline
    const mainTimeline = gsap.timeline();
    
    // Set initial states
    gsap.set(loaderBgRef.current, {
      opacity: 0
    });
    
    gsap.set(cubeRef.current, {
      rotationX: 0,
      rotationY: 0,
      transformPerspective: 800
    });
    
    gsap.set(cubeFacesRef.current, {
      opacity: 0,
      scale: 0.5
    });
    
    gsap.set(logoPiecesRef.current, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 0.4,
      transformOrigin: "center center"
    });
    
    gsap.set([nameRef.current, taglineRef.current, progressBarRef.current, progressTextRef.current], {
      opacity: 0,
      y: 20
    });
    
    gsap.set(textRingsRef.current, {
      opacity: 0,
      rotation: -120,
      scale: 0.5
    });
    
    gsap.set(circleRef.current, { 
      opacity: 0,
      scale: 0.8
    });
    
    // Initial fade in
    mainTimeline
      .to(loaderBgRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power1.out"
      })
      .to(circleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.3")
      .to(logoPiecesRef.current, {
        opacity: 1,
        scale: 1,
        stagger: 0.03,
        duration: 0.6,
        ease: "back.out(2)"
      }, "-=0.5")
      .to(textRingsRef.current, {
        opacity: 1,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.8)"
      }, "-=0.2")
      .to(cubeWrapperRef.current, {
        opacity: 1,
        duration: 0.5
      }, "-=1")
      .to(cubeFacesRef.current, {
        opacity: 1,
        scale: 1,
        stagger: 0.05,
        duration: 0.6,
        ease: "back.out(2)"
      }, "-=0.4")
      .to([nameRef.current, taglineRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.7)"
      }, "-=0.6")
      .to([progressBarRef.current, progressTextRef.current], {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out"
      }, "-=0.4");
    
    // Start continuous animations
    
    // Logo pieces pulsing
    logoPiecesRef.current.forEach((piece, index) => {
      gsap.to(piece, {
        scale: 0.9 + Math.random() * 0.2,
        opacity: 0.7 + Math.random() * 0.3,
        duration: 1 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.1
      });
    });
    
    // Rotating 3D cube
    gsap.to(cubeRef.current, {
      rotationY: 360,
      rotationX: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });
    
    // Rotating text rings
    gsap.to(textRingsRef.current, {
      rotation: 360,
      duration: 30,
      repeat: -1,
      ease: "none"
    });
    
    // Progress counter simulation
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += Math.floor(Math.random() * 3) + 1;
      
      if (loadingProgress > 100) {
        loadingProgress = 100;
        clearInterval(interval);
        completeLoading();
      }
      
      setProgress(loadingProgress);
    }, 80);
    
    // Final animation when loading completes
    const completeLoading = () => {
      // Make sure progress is exactly 100%
      setProgress(100);
      
      const completeTl = gsap.timeline();
      completeTl.eventCallback("onComplete", () => {
        setTimeout(() => setLoading(false), 300);
      });
      
      // Final animation sequence
      completeTl
        // Scale up logo
        .to(circleRef.current, {
          scale: 1.2,
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.7)",
          duration: 0.7,
          ease: "back.out(1.7)"
        })
        // Spin logo pieces outward
        .to(logoPiecesRef.current, {
          x: (_, target) => {
            const piece = target as HTMLElement;
            const currentTranslateX = parseFloat(piece.getAttribute('data-translate-x') || '0');
            return currentTranslateX * 2.5;
          },
          y: (_, target) => {
            const piece = target as HTMLElement;
            const currentTranslateY = parseFloat(piece.getAttribute('data-translate-y') || '0');
            return currentTranslateY * 2.5;
          },
          opacity: 0,
          scale: 1.5,
          duration: 0.8,
          stagger: 0.03,
          ease: "power2.out"
        }, "-=0.5")
        // Scale and fade text elements
        .to([nameRef.current, taglineRef.current, progressBarRef.current, progressTextRef.current], {
          y: -20,
          opacity: 0,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.in"
        }, "-=0.6")
        // Scale up text rings
        .to(textRingsRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 0.7,
          ease: "power2.in"
        }, "-=0.5")
        // Spin and scale the 3D cube
        .to(cubeRef.current, {
          rotationY: "+=120",
          rotationX: "+=120",
          duration: 0.7,
          ease: "power2.inOut"
        }, "-=0.7")
        .to(cubeWrapperRef.current, {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in"
        }, "-=0.4")
        // Final flash and fade out
        .to(circleRef.current, {
          scale: 15,
          opacity: 0,
          duration: 0.8,
          ease: "power3.in"
        }, "-=0.3")
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
      className="fixed inset-0 flex items-center justify-center overflow-hidden z-[100]"
    >
      {/* Background with radial gradient */}
      <div 
        ref={loaderBgRef}
        className="absolute inset-0 bg-gradient-to-r from-slate-950 to-slate-900"
      >
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.5)_0%,rgba(0,0,0,0)_60%)]"></div>
      </div>
      
      <div
        ref={containerRef}
        className="relative flex flex-col items-center justify-center z-10 px-4"
      >
        {/* 3D cube animation - positioned to the side */}
        <div 
          ref={cubeWrapperRef} 
          className="absolute top-[25%] right-[10%] md:right-[25%] opacity-0"
          style={{ perspective: "800px" }}
        >
          <div 
            ref={cubeRef} 
            className="w-16 h-16 md:w-24 md:h-24 relative transform-style-3d"
          >
            {/* Cube faces */}
            <div ref={addCubeFaceRef} className="absolute inset-0 backface-hidden bg-gradient-to-tr from-blue-600/80 to-blue-400/80 rounded-md border border-blue-300/20 shadow-lg transform translate-z-[calc(16px*0.5)] md:translate-z-[calc(24px*0.5)]"></div>
            <div ref={addCubeFaceRef} className="absolute inset-0 backface-hidden bg-gradient-to-tr from-cyan-600/80 to-blue-400/80 rounded-md border border-blue-300/20 shadow-lg transform rotateY-180 translate-z-[calc(16px*0.5)] md:translate-z-[calc(24px*0.5)]"></div>
            <div ref={addCubeFaceRef} className="absolute inset-0 backface-hidden bg-gradient-to-tr from-indigo-600/80 to-blue-500/80 rounded-md border border-blue-300/20 shadow-lg transform rotateY-90 translate-z-[calc(16px*0.5)] md:translate-z-[calc(24px*0.5)]"></div>
            <div ref={addCubeFaceRef} className="absolute inset-0 backface-hidden bg-gradient-to-tr from-blue-700/80 to-indigo-400/80 rounded-md border border-blue-300/20 shadow-lg transform rotateY--90 translate-z-[calc(16px*0.5)] md:translate-z-[calc(24px*0.5)]"></div>
            <div ref={addCubeFaceRef} className="absolute inset-0 backface-hidden bg-gradient-to-tr from-sky-600/80 to-blue-500/80 rounded-md border border-blue-300/20 shadow-lg transform rotateX-90 translate-z-[calc(16px*0.5)] md:translate-z-[calc(24px*0.5)]"></div>
            <div ref={addCubeFaceRef} className="absolute inset-0 backface-hidden bg-gradient-to-tr from-blue-600/80 to-sky-400/80 rounded-md border border-blue-300/20 shadow-lg transform rotateX--90 translate-z-[calc(16px*0.5)] md:translate-z-[calc(24px*0.5)]"></div>
          </div>
        </div>
        
        {/* Main logo and animation */}
        <div className="mb-10 relative">
          {/* Rotating text rings */}
          <div ref={textRingsRef} className="absolute inset-0 w-40 h-40 md:w-48 md:h-48 flex items-center justify-center">
            <div className="absolute w-full h-full rounded-full border-2 border-blue-500/20 border-dashed"></div>
            <div className="absolute w-[110%] h-[110%] rounded-full border-2 border-blue-400/10 border-dashed rotate-45"></div>
            <div className="absolute w-[120%] h-[120%] rounded-full border-2 border-blue-300/10 border-dashed rotate-90"></div>
            <div className="absolute w-[130%] h-[130%] rounded-full border border-blue-200/5"></div>
          </div>
          
          {/* Center circle */}
          <div 
            ref={circleRef} 
            className="w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-blue-900/70 to-slate-900/70 backdrop-blur-md rounded-full relative flex items-center justify-center border border-blue-500/30 shadow-lg"
          >
            {/* Logo pieces */}
            {logoPieces.map((piece, index) => (
              <div
                key={index}
                ref={addLogoPieceRef}
                className="absolute bg-blue-500 rounded-md"
                style={{
                  width: piece.width,
                  height: piece.height,
                  transformOrigin: 'center center',
                  transform: `rotate(${piece.angle}deg) translate(${piece.translateX}px, ${piece.translateY}px)`
                }}
                data-translate-x={piece.translateX}
                data-translate-y={piece.translateY}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Name and Tagline */}
        <h2 
          ref={nameRef} 
          className="text-3xl md:text-4xl font-bold mb-1 text-center text-white"
        >
          {t('name')}
        </h2>
        <div 
          ref={taglineRef} 
          className="text-lg text-blue-300/90 mb-8 text-center font-light"
        >
          مطور ويب شامل
        </div>
        
        {/* Progress bar */}
        <div className="w-60 md:w-80 mx-auto">
          <div 
            ref={progressBarRef}
            className="h-2 w-full rounded-full overflow-hidden bg-slate-800/50 backdrop-blur-sm mb-2 shadow-inner"
          >
            <div 
              ref={progressValueRef}
              className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <div
            ref={progressTextRef}
            className="text-sm text-blue-400/90 text-center font-mono"
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
