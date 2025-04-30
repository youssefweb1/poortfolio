import { useEffect, useRef } from 'react';
import { useTheme } from '@/components/ui/theme-toggle';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();

    // Handle window resize
    window.addEventListener('resize', resizeCanvas);

    // Create gradient points
    let points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const pointCount = Math.min(12, Math.floor(window.innerWidth / 150)); // Adjust based on screen size

    // Initialize points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 150 + 100
      });
    }

    // Animation variables
    let animationFrameId: number;
    let lastTime = 0;

    // Choose color palette based on theme
    const getColors = () => {
      if (theme === 'dark') {
        return [
          'rgba(20, 30, 48, 0.8)',
          'rgba(30, 55, 90, 0.5)',
          'rgba(25, 40, 65, 0.6)',
          'rgba(15, 25, 40, 0.7)'
        ];
      }
      return [
        'rgba(210, 230, 255, 0.6)',
        'rgba(220, 240, 255, 0.4)', 
        'rgba(200, 225, 255, 0.5)',
        'rgba(190, 215, 245, 0.6)'
      ];
    };

    // Animation function
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw gradient points
      const colors = getColors();
      
      // First draw the base gradient
      const baseGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      
      baseGradient.addColorStop(0, theme === 'dark' ? 'rgba(22, 32, 50, 0.4)' : 'rgba(240, 248, 255, 0.4)');
      baseGradient.addColorStop(1, theme === 'dark' ? 'rgba(10, 15, 25, 0.2)' : 'rgba(220, 235, 250, 0.2)');
      
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update points
      points.forEach((point, index) => {
        // Move the point
        point.x += point.vx * deltaTime * 0.05;
        point.y += point.vy * deltaTime * 0.05;
        
        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
        
        // Draw gradient for each point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, point.radius
        );
        
        const color = colors[index % colors.length];
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Request next frame
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]); // Re-run when theme changes

  return (
    <canvas
      ref={canvasRef}
      className="animated-bg"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;