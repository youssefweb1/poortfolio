import { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/components/ui/theme-toggle';
import { useIsMobile } from '@/hooks/use-mobile';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Get actual device pixel ratio to handle high DPI displays properly
    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
    
    // Set canvas size with adjusted dimensions for responsive layout
    const resizeCanvas = () => {
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      // Set the canvas size in CSS pixels
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      
      // Set the canvas buffer size (actual drawing surface)
      canvas.width = Math.floor(displayWidth * dpr);
      canvas.height = Math.floor(displayHeight * dpr);
      
      // Scale all drawing operations
      ctx.scale(dpr, dpr);
    };

    // Initial resize
    resizeCanvas();

    // Throttled resize handler
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 200);
    };

    // Handle window resize
    window.addEventListener('resize', handleResize);

    // Create gradient points - use fewer points on mobile
    let points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    
    // Reduced number of points based on device
    const pointCount = isMobile 
      ? Math.min(4, Math.floor(window.innerWidth / 250)) 
      : Math.min(6, Math.floor(window.innerWidth / 200));

    // Initialize points with slower movement and smaller radius
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.15, // Reduced velocity
        vy: (Math.random() - 0.5) * 0.15, // Reduced velocity
        radius: Math.random() * 100 + 50  // Smaller radius
      });
    }

    // Animation variables
    let animationFrameId: number;
    let lastTime = 0;
    let frameSkip = 0; // For reducing frame rate on mobile

    // Choose color palette based on theme (with reduced opacity)
    const getColors = () => {
      if (theme === 'dark') {
        return [
          'rgba(20, 30, 48, 0.4)', // Reduced opacity
          'rgba(30, 55, 90, 0.3)', // Reduced opacity
          'rgba(25, 40, 65, 0.35)', // Reduced opacity
          'rgba(15, 25, 40, 0.3)' // Reduced opacity
        ];
      }
      return [
        'rgba(210, 230, 255, 0.3)', // Reduced opacity
        'rgba(220, 240, 255, 0.2)', // Reduced opacity
        'rgba(200, 225, 255, 0.25)', // Reduced opacity
        'rgba(190, 215, 245, 0.3)' // Reduced opacity
      ];
    };

    // Animation function with performance optimizations
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Skip frames on mobile devices for better performance
      if (isMobile) {
        frameSkip++;
        if (frameSkip < 2) { // Render every 2nd frame on mobile
          animationFrameId = requestAnimationFrame(animate);
          return;
        }
        frameSkip = 0;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Get colors array just once per frame
      const colors = getColors();
      
      // Base gradient (simpler, faster to render)
      if (!isMobile) {
        // Only draw base gradient on desktop for performance
        const baseGradient = ctx.createRadialGradient(
          window.innerWidth / 2, window.innerHeight / 2, 0,
          window.innerWidth / 2, window.innerHeight / 2, window.innerWidth * 0.5
        );
        
        baseGradient.addColorStop(0, theme === 'dark' ? 'rgba(22, 32, 50, 0.2)' : 'rgba(240, 248, 255, 0.2)');
        baseGradient.addColorStop(1, theme === 'dark' ? 'rgba(10, 15, 25, 0.1)' : 'rgba(220, 235, 250, 0.1)');
        
        ctx.fillStyle = baseGradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      }
      
      // Update and draw points with performance optimizations
      points.forEach((point, index) => {
        // Slower movement for better performance
        point.x += point.vx * deltaTime * 0.02;
        point.y += point.vy * deltaTime * 0.02;
        
        // Wrap around edges instead of bouncing (more efficient)
        if (point.x < -point.radius) point.x = window.innerWidth + point.radius;
        if (point.x > window.innerWidth + point.radius) point.x = -point.radius;
        if (point.y < -point.radius) point.y = window.innerHeight + point.radius;
        if (point.y > window.innerHeight + point.radius) point.y = -point.radius;
        
        // Draw gradient for each point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, isMobile ? point.radius * 0.7 : point.radius // Smaller radius on mobile
        );
        
        const color = colors[index % colors.length];
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      });
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Handle visibility change to pause animation when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
    };
  }, [theme, isMobile, isVisible]); // Re-run when theme or device type changes

  // Hide animation on low-end devices or if performance is an issue
  useEffect(() => {
    // Simple performance detection
    const checkPerformance = () => {
      const start = performance.now();
      
      // Light stress test
      for (let i = 0; i < 1000; i++) {
        Math.sqrt(i);
      }
      
      const duration = performance.now() - start;
      // If the test takes too long, disable animation
      if (duration > 5) {
        setIsVisible(false);
      }
    };
    
    checkPerformance();
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="animated-bg"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
};

export default AnimatedBackground;