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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  
  // Create animated circles
  const createCircles = () => {
    const circleElements = [];
    for (let i = 0; i < 6; i++) {
      circleElements.push(
        <div 
          key={i} 
          className={`absolute w-40 h-40 rounded-full bg-gradient-to-br from-primary/${20 - i * 2} to-accent/${15 - i * 2} blur-xl`}
          data-circle-index={i}
        ></div>
      );
    }
    return circleElements;
  };
  
  useEffect(() => {
    if (!loaderRef.current) return;
    
    // Animate the circles
    const circles = document.querySelectorAll('[data-circle-index]');
    
    circles.forEach((circle, index) => {
      const delay = index * 0.2;
      
      gsap.set(circle, {
        x: () => Math.random() * window.innerWidth * 0.8 - window.innerWidth * 0.4,
        y: () => Math.random() * window.innerHeight * 0.8 - window.innerHeight * 0.4,
        scale: () => 0.5 + Math.random() * 0.5,
        opacity: 0
      });
      
      gsap.to(circle, {
        opacity: 1,
        duration: 1,
        delay: delay * 0.5
      });
      
      // Create random movement for each circle
      gsap.to(circle, {
        x: '+=70',
        y: '-=40',
        scale: '+=0.1',
        duration: 4 + index,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
    
    // Main animation timeline
    const mainTl = gsap.timeline();
    
    // Initial animation
    mainTl
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(messageRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
      .from(progressBarRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2')
      .from(counterRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.4,
        ease: 'power2.out'
      }, '-=0.2');
    
    // Progress counter
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += Math.floor(Math.random() * 5) + 1;
      
      if (loadingProgress > 100) {
        loadingProgress = 100;
        clearInterval(interval);
        completeLoading();
      }
      
      setProgress(loadingProgress);
      gsap.to(progressBarRef.current, {
        width: `${loadingProgress}%`,
        duration: 0.3,
        ease: 'power1.out'
      });
    }, 80);
    
    // Final animation when loading completes
    const completeLoading = () => {
      const completeTl = gsap.timeline({
        onComplete: () => {
          // After all animations, tell the parent component loading is done
          setTimeout(() => setLoading(false), 200);
        }
      });
      
      completeTl
        .to(progressBarRef.current, {
          backgroundColor: '#22c55e', // Change to green when complete
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)'
        })
        .to(counterRef.current, {
          color: '#22c55e',
          scale: 1.2,
          duration: 0.4,
          ease: 'back.out(2)'
        }, '-=0.6')
        .to([titleRef.current, messageRef.current, progressBarRef.current, counterRef.current], {
          y: -30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
          delay: 0.5,
          ease: 'power2.in'
        })
        .to(circles, {
          opacity: 0,
          scale: 2,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.4')
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        }, '-=0.4');
    };
    
    return () => {
      clearInterval(interval);
      gsap.killTweensOf(circles);
    };
  }, [setLoading]);
  
  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background to-background z-[100] backdrop-blur-md overflow-hidden"
    >
      {/* Animated background circles */}
      <div ref={circlesRef} className="absolute inset-0 overflow-hidden">
        {createCircles()}
      </div>
      
      {/* Content container */}
      <div className="relative max-w-md w-full px-6 z-10">
        {/* Glassmorphism card */}
        <div className="bg-white/5 dark:bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 dark:border-white/5 p-8 shadow-2xl">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent text-center"
          >
            {t('name')}
          </h1>
          
          <p 
            ref={messageRef}
            className="text-center mb-8 text-foreground dark:text-white/70"
          >
            {t('loader.message', 'Loading amazing experiences...')}
          </p>
          
          {/* Progress bar container */}
          <div className="relative h-2 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden mb-3">
            <div 
              ref={progressBarRef}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-purple-500 to-accent rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Counter text */}
          <div 
            ref={counterRef}
            className="text-end text-sm font-medium text-primary"
          >
            {progress}%
          </div>
          
          {/* Animated dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((index) => (
              <div 
                key={index}
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
                style={{ animationDelay: `${index * 0.2}s` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;