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
      // Use clientWidth/Height to prevent any overflow issues
      const displayWidth = document.documentElement.clientWidth;
      const displayHeight = document.documentElement.clientHeight;
      
      // Set the canvas size in CSS pixels
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      
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
    
    // Reduced number of points based on device - even fewer points on smaller screens
    const displayWidth = document.documentElement.clientWidth;
    const pointCount = isMobile 
      ? Math.min(3, Math.floor(displayWidth / 300)) // Even fewer on mobile 
      : Math.min(5, Math.floor(displayWidth / 250)); // Reduced on desktop too

    // Initialize points with slower movement and smaller radius
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * displayWidth,
        y: Math.random() * document.documentElement.clientHeight,
        vx: (Math.random() - 0.5) * 0.12, // Even slower velocity
        vy: (Math.random() - 0.5) * 0.12, // Even slower velocity
        radius: Math.random() * 80 + 50  // Smaller radius
      });
    }

    // Animation variables
    let animationFrameId: number;
    let lastTime = 0;
    let frameSkip = 0; // For reducing frame rate on mobile
    let frameSkipCount = isMobile ? 3 : 1; // Skip more frames on mobile

    // Choose color palette based on theme (with further reduced opacity)
    const getColors = () => {
      if (theme === 'dark') {
        return [
          'rgba(20, 30, 48, 0.3)', // Further reduced opacity
          'rgba(30, 55, 90, 0.2)', // Further reduced opacity
          'rgba(25, 40, 65, 0.25)', // Further reduced opacity
          'rgba(15, 25, 40, 0.2)' // Further reduced opacity
        ];
      }
      return [
        'rgba(210, 230, 255, 0.2)', // Further reduced opacity
        'rgba(220, 240, 255, 0.15)', // Further reduced opacity
        'rgba(200, 225, 255, 0.2)', // Further reduced opacity
        'rgba(190, 215, 245, 0.15)' // Further reduced opacity
      ];
    };

    // Animation function with additional performance optimizations
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Skip frames for better performance
      frameSkip++;
      if (frameSkip < frameSkipCount) { 
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      frameSkip = 0;
      
      // Clear canvas - use actual dimensions from canvas
      const displayWidth = document.documentElement.clientWidth;
      const displayHeight = document.documentElement.clientHeight;
      ctx.clearRect(0, 0, displayWidth, displayHeight);
      
      // Get colors array just once per frame
      const colors = getColors();
      
      // Update and draw points with performance optimizations
      points.forEach((point, index) => {
        // Even slower movement for better performance
        point.x += point.vx * deltaTime * 0.015;
        point.y += point.vy * deltaTime * 0.015;
        
        // Wrap around edges instead of bouncing (more efficient)
        if (point.x < -point.radius) point.x = displayWidth + point.radius;
        if (point.x > displayWidth + point.radius) point.x = -point.radius;
        if (point.y < -point.radius) point.y = displayHeight + point.radius;
        if (point.y > displayHeight + point.radius) point.y = -point.radius;
        
        // Draw gradient for each point - smaller radius on all devices for better performance
        const radius = isMobile ? point.radius * 0.6 : point.radius * 0.8;
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, radius
        );
        
        const color = colors[index % colors.length];
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, displayWidth, displayHeight);
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

  // Disable animation on low-end devices or if performance is an issue
  useEffect(() => {
    // More aggressive performance detection
    const checkPerformance = () => {
      const start = performance.now();
      
      // Light stress test
      for (let i = 0; i < 1000; i++) {
        Math.sqrt(i);
      }
      
      const duration = performance.now() - start;
      // More aggressive threshold - disable if taking too long
      if (duration > 4 || document.documentElement.clientWidth < 400) {
        setIsVisible(false);
      }
    };
    
    checkPerformance();
    
    // Also disable on very small screens where it might cause layout issues
    const handleResize = () => {
      if (document.documentElement.clientWidth < 400) {
        setIsVisible(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animated-bg-container">
      <canvas
        ref={canvasRef}
        className="animated-bg"
        aria-hidden="true"
      />
    </div>
  );
};

export default AnimatedBackground;