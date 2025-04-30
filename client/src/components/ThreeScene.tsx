import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

interface ThreeSceneProps {
  className?: string;
}

// Declare module for TypeScript
declare module 'three' {
  interface Object3D {
    userData: any;
  }
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene - with optimizations for mobile
    const initScene = () => {
      // Create scene
      sceneRef.current = new THREE.Scene();
      
      // Create camera with a slightly wider field of view on mobile for better visibility
      cameraRef.current = new THREE.PerspectiveCamera(
        isMobile ? 85 : 75,
        document.documentElement.clientWidth / document.documentElement.clientHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = isMobile ? 18 : 15; // Move camera back on mobile
      
      // Create renderer with reduced quality on mobile
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current as HTMLCanvasElement,
        alpha: true,
        antialias: !isMobile, // Disable antialiasing on mobile for better performance
        powerPreference: 'low-power' // Prefer power savings
      });
      
      // Use client dimensions to avoid overflow issues
      rendererRef.current.setSize(
        document.documentElement.clientWidth, 
        document.documentElement.clientHeight
      );
      
      // Lower pixel ratio on mobile for better performance
      rendererRef.current.setPixelRatio(Math.min(
        isMobile ? 1 : window.devicePixelRatio, 
        2
      ));
      
      // Create a group for particles
      particlesGroupRef.current = new THREE.Group();
      sceneRef.current.add(particlesGroupRef.current);
      
      // Create particles - fewer on mobile
      const particleCount = isMobile ? 40 : 80;
      const particleGeometry = new THREE.SphereGeometry(0.1, isMobile ? 4 : 8, isMobile ? 4 : 8);
      const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });
      
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random positions within a sphere
        const radius = isMobile ? 8 : 10; // Smaller radius on mobile
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        // Random scale - smaller on mobile
        const scale = (Math.random() * (isMobile ? 0.3 : 0.5)) + (isMobile ? 0.05 : 0.1);
        particle.scale.set(scale, scale, scale);
        
        // Store original position for animation
        particle.userData = {
          originalPosition: particle.position.clone(),
          // Slower animation speed on mobile
          randomSpeed: (Math.random() * 0.01 + 0.005) * (isMobile ? 0.5 : 1)
        };
        
        particlesGroupRef.current.add(particle);
      }
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesGroupRef.current) return;
      
      // Slower rotation for better performance
      const rotationSpeed = isMobile ? 0.0005 : 0.001;
      particlesGroupRef.current.rotation.y += rotationSpeed;
      particlesGroupRef.current.rotation.x += rotationSpeed / 2;
      
      // Animate individual particles - with reduced amplitude on mobile
      particlesGroupRef.current.children.forEach((particle: THREE.Object3D) => {
        const time = Date.now() * (particle.userData.randomSpeed as number);
        const originalPos = particle.userData.originalPosition as THREE.Vector3;
        const amplitude = isMobile ? 0.2 : 0.3;
        
        particle.position.x = originalPos.x + Math.sin(time) * amplitude;
        particle.position.y = originalPos.y + Math.cos(time) * amplitude;
        particle.position.z = originalPos.z + Math.sin(time + Math.PI/2) * amplitude;
      });
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize with better performance
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      
      resizeTimeout = window.setTimeout(() => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        // Use clientWidth/Height to prevent overflow issues
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }, 200);
    };

    // Initialize and start animation
    initScene();
    animate();
    window.addEventListener('resize', handleResize);

    // Use GSAP for initial animation - simpler on mobile
    if (particlesGroupRef.current) {
      gsap.from(particlesGroupRef.current.position, {
        y: isMobile ? -5 : -10,
        duration: isMobile ? 1.5 : 2,
        ease: "power2.out" // Simpler easing function for better performance
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      
      // Dispose resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (particlesGroupRef.current) {
        particlesGroupRef.current.children.forEach((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).geometry) {
            (child as THREE.Mesh).geometry.dispose();
            if ((child as THREE.Mesh).material instanceof THREE.Material) {
              ((child as THREE.Mesh).material as THREE.Material).dispose();
            }
          }
        });
      }
    };
  }, [isMobile]); // Re-initialize when mobile status changes

  return (
    <div className="three-scene-container relative w-full h-full overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className={`absolute top-0 left-0 w-full h-full z-[-2] ${className || ''}`} 
      />
    </div>
  );
};

export default ThreeScene;
