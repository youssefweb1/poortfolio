import { useEffect, useState, useRef } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Show cursor only on larger screens
    const checkScreenSize = () => {
      setIsVisible(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    document.addEventListener('mousemove', onMouseMove);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={cursorRef}
      className="hidden lg:block h-[250px] w-[250px] rounded-full fixed transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[-1] opacity-15 transition-[0.1s] ease-out"
      style={{
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.7) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(0, 0, 0, 0) 70%)'
      }}
    />
  );
};

export default Cursor;
