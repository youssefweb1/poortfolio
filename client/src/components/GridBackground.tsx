import { useEffect, useRef } from 'react';
import { useTheme } from './ui/theme-toggle';

interface GridBackgroundProps {
  className?: string;
}

const GridBackground: React.FC<GridBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number>();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup canvas dimensions with device pixel ratio
    const pixelRatio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * pixelRatio;
    canvas.height = rect.height * pixelRatio;
    ctx.scale(pixelRatio, pixelRatio);
    
    // Grid settings
    const gridSize = 50; // Grid cell size
    const lineWidth = 0.5;
    let animationPosition = 0;
    
    // Colors based on theme
    const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const highlightColor = theme === 'dark' ? 'rgba(96, 165, 250, 0.35)' : 'rgba(59, 130, 246, 0.35)';
    
    // Add a subtle grid pattern
    const addGridTexture = (x: number, y: number) => {
      return (x % 200 === 0 || y % 200 === 0) ? 
        (theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)') : 
        gridColor;
    };
    
    // Draw the grid and animation
    const draw = () => {
      if (!canvas || !ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
      
      const width = canvas.width / pixelRatio;
      const height = canvas.height / pixelRatio;
      
      // Draw vertical grid lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = addGridTexture(x, 0);
        ctx.stroke();
      }
      
      // Draw horizontal grid lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = addGridTexture(0, y);
        ctx.stroke();
      }
      
      // Draw moving vertical highlight line
      const highlightX = (animationPosition % (width * 1.5));
      ctx.beginPath();
      ctx.moveTo(highlightX, 0);
      ctx.lineTo(highlightX, height);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = highlightColor;
      ctx.stroke();
      
      // Add a glow effect to vertical line
      ctx.beginPath();
      ctx.moveTo(highlightX, 0);
      ctx.lineTo(highlightX, height);
      ctx.lineWidth = 4;
      ctx.strokeStyle = theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)';
      ctx.stroke();
      
      // Draw moving horizontal highlight line
      const highlightY = (animationPosition * 0.7 % (height * 1.5));
      ctx.beginPath();
      ctx.moveTo(0, highlightY);
      ctx.lineTo(width, highlightY);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = highlightColor;
      ctx.stroke();
      
      // Add a glow effect to horizontal line
      ctx.beginPath();
      ctx.moveTo(0, highlightY);
      ctx.lineTo(width, highlightY);
      ctx.lineWidth = 4;
      ctx.strokeStyle = theme === 'dark' ? 'rgba(96, 165, 250, 0.1)' : 'rgba(59, 130, 246, 0.1)';
      ctx.stroke();
      
      // Draw intersection point with extra highlight
      ctx.beginPath();
      ctx.arc(highlightX, highlightY, 3, 0, Math.PI * 2);
      ctx.fillStyle = theme === 'dark' ? 'rgba(96, 165, 250, 0.6)' : 'rgba(59, 130, 246, 0.6)';
      ctx.fill();
      
      // Update animation position
      animationPosition += 0.3;
      
      // Continue animation
      animationRef.current = requestAnimationFrame(draw);
    };
    
    // Start animation
    draw();
    
    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      ctx.scale(pixelRatio, pixelRatio);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [theme]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className || ''}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default GridBackground;