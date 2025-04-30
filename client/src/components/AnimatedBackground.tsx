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

    // Grid settings
    const gridSize = Math.min(50, Math.max(25, Math.floor(window.innerWidth / 40))); // Responsive grid size
    const neonGridColor = theme === 'dark' 
      ? { r: 0, g: 195, b: 255 } // Cyan for dark mode
      : { r: 80, g: 120, b: 255 }; // Blue for light mode
    
    // Neon glow points
    let glowPoints: { x: number; y: number; radius: number; alpha: number; speed: number }[] = [];
    const glowPointCount = Math.min(6, Math.floor(window.innerWidth / 300)); // Fewer glow points for better performance
    
    // Create gradient points
    let points: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const pointCount = Math.min(8, Math.floor(window.innerWidth / 200)); // Reduced for better performance
    
    // Initialize glow points
    for (let i = 0; i < glowPointCount; i++) {
      glowPoints.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 200 + 100,
        alpha: 0.1 + Math.random() * 0.4, // Random opacity
        speed: 0.2 + Math.random() * 0.8 // Random pulse speed
      });
    }

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
    let time = 0;

    // Choose color palette based on theme
    const getColors = () => {
      if (theme === 'dark') {
        return [
          'rgba(0, 195, 255, 0.25)', // Neon cyan
          'rgba(80, 100, 255, 0.2)', // Neon blue
          'rgba(120, 0, 255, 0.15)', // Neon purple
          'rgba(20, 30, 48, 0.5)'    // Dark blue
        ];
      }
      return [
        'rgba(100, 210, 255, 0.3)', // Soft cyan
        'rgba(150, 180, 255, 0.25)', // Soft blue
        'rgba(130, 150, 255, 0.2)', // Soft purple
        'rgba(210, 230, 255, 0.35)' // Very light blue
      ];
    };

    // Animation function
    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return;
      
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;
      time += deltaTime * 0.001; // Convert to seconds
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw gradient points
      const colors = getColors();
      
      // First draw the base gradient
      const baseGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      
      baseGradient.addColorStop(0, theme === 'dark' ? 'rgba(10, 15, 30, 0.95)' : 'rgba(245, 250, 255, 0.95)');
      baseGradient.addColorStop(1, theme === 'dark' ? 'rgba(5, 10, 20, 0.9)' : 'rgba(235, 245, 255, 0.9)');
      
      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      
      // Calculate grid with some movement based on time
      const offsetX = Math.sin(time * 0.2) * 5;
      const offsetY = Math.cos(time * 0.2) * 5;
      
      // Draw horizontal grid lines
      for (let y = offsetY % gridSize; y < canvas.height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }
      
      // Draw vertical grid lines
      for (let x = offsetX % gridSize; x < canvas.width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }
      
      // Set grid color with subtle neon effect
      const gridAlpha = theme === 'dark' ? 0.15 : 0.1;
      ctx.strokeStyle = `rgba(${neonGridColor.r}, ${neonGridColor.g}, ${neonGridColor.b}, ${gridAlpha})`;
      ctx.stroke();
      
      // Draw neon glow points that pulse
      glowPoints.forEach((point) => {
        // Calculate pulse effect
        const pulseSize = 0.8 + Math.sin(time * point.speed) * 0.2;
        const currentRadius = point.radius * pulseSize;
        
        // Draw glow
        const glow = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, currentRadius
        );
        
        const r = neonGridColor.r;
        const g = neonGridColor.g;
        const b = neonGridColor.b;
        
        glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${point.alpha})`);
        glow.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${point.alpha * 0.3})`);
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
      
      // Update and draw smooth gradient points
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