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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    
    // First animate the loader in
    tl.from(loaderRef.current, {
      duration: 0.5,
      opacity: 0,
      ease: 'power2.inOut'
    });
    
    // Start counting up
    let loadingProgress = 0;
    const interval = setInterval(() => {
      loadingProgress += Math.floor(Math.random() * 5) + 1;
      
      if (loadingProgress > 100) {
        loadingProgress = 100;
        clearInterval(interval);
        
        // When reaching 100%, animate the loader out
        gsap.timeline()
          .to(progressBarRef.current, {
            duration: 0.3,
            width: '100%',
            ease: 'power2.inOut'
          })
          .to(counterRef.current, {
            duration: 0.3,
            opacity: 0,
            y: -20,
            ease: 'power2.inOut'
          }, "-=0.1")
          .to(textRef.current, {
            duration: 0.3,
            opacity: 0,
            y: -20,
            ease: 'power2.inOut'
          }, "-=0.2")
          .to(loaderRef.current, {
            duration: 0.5,
            opacity: 0,
            ease: 'power2.inOut',
            onComplete: () => {
              setLoading(false);
            }
          }, "+=0.5");
      }
      
      setProgress(loadingProgress);
    }, 100);
    
    return () => clearInterval(interval);
  }, [setLoading]);
  
  return (
    <div 
      ref={loaderRef}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary/20 z-[100] backdrop-blur-md overflow-hidden"
    >
      <div className="max-w-md w-full px-6">
        <div 
          ref={textRef}
          className="text-center mb-8 relative overflow-hidden"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
            {t('name')}
          </h1>
          <p className="text-muted-foreground">
            {t('loader.message', 'Loading amazing experiences...')}
          </p>
        </div>
        
        <div className="relative w-full h-2 bg-card rounded-full overflow-hidden mb-2">
          <div 
            ref={progressBarRef}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div 
          ref={counterRef}
          className="text-end text-sm font-medium text-primary"
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default Loader;