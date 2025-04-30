import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { useIsMobile } from '@/hooks/use-mobile';

interface ThreeSceneProps {
  className?: string;
}

const ThreeScene: React.FC<ThreeSceneProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesGroupRef = useRef<THREE.Group | null>(null);
  const frameIdRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || isInitialized) return;
    
    // Set as initialized to prevent double setup
    setIsInitialized(true);

    // Initialize Three.js scene with device-appropriate settings
    const initScene = () => {
      // Create scene
      sceneRef.current = new THREE.Scene();
      
      // Create camera with wider field of view for mobile
      cameraRef.current = new THREE.PerspectiveCamera(
        isMobile ? 85 : 75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 15;
      
      // Create renderer with reduced quality for mobile
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current as HTMLCanvasElement,
        alpha: true,
        antialias: !isMobile, // Disable antialiasing on mobile
        powerPreference: 'low-power' // Request low power mode
      });
      
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      // Use lower pixel ratio on mobile
      rendererRef.current.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
      
      // Create a group for particles
      particlesGroupRef.current = new THREE.Group();
      sceneRef.current.add(particlesGroupRef.current);
      
      // Create particles - use fewer on mobile
      const particleCount = isMobile ? 30 : 70;
      
      // Simplified geometry for better performance
      const particleGeometry = new THREE.SphereGeometry(0.1, isMobile ? 4 : 8, isMobile ? 4 : 8);
      const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });
      
      for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random positions within a sphere
        const radius = 10;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        
        particle.position.x = radius * Math.sin(phi) * Math.cos(theta);
        particle.position.y = radius * Math.sin(phi) * Math.sin(theta);
        particle.position.z = radius * Math.cos(phi);
        
        // Random scale
        const scale = Math.random() * 0.5 + 0.1;
        particle.scale.set(scale, scale, scale);
        
        // Store original position for animation
        particle.userData = {
          originalPosition: particle.position.clone(),
          randomSpeed: Math.random() * 0.005 + 0.002 // Slower motion for better performance
        };
        
        particlesGroupRef.current.add(particle);
      }
    };

    // Animation loop with frame limiting for better performance
    const animate = (timestamp: number) => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesGroupRef.current) return;
      
      // Frame limiting - only update every ~40ms on mobile (25fps) or ~16ms on desktop (60fps)
      const interval = isMobile ? 40 : 16;
      const elapsed = timestamp - lastTimeRef.current;
      
      if (elapsed > interval) {
        lastTimeRef.current = timestamp - (elapsed % interval);
        
        // Slower rotation for smoother appearance and better performance
        particlesGroupRef.current.rotation.y += isMobile ? 0.0005 : 0.001;
        particlesGroupRef.current.rotation.x += isMobile ? 0.0002 : 0.0005;
        
        // Only animate every other particle on mobile for better performance
        const increment = isMobile ? 2 : 1;
        for (let i = 0; i < particlesGroupRef.current.children.length; i += increment) {
          const particle = particlesGroupRef.current.children[i];
          const time = Date.now() * (particle.userData.randomSpeed as number);
          const originalPos = particle.userData.originalPosition as THREE.Vector3;
          
          // Reduced motion range for smoother animation
          const range = isMobile ? 0.2 : 0.3;
          particle.position.x = originalPos.x + Math.sin(time) * range;
          particle.position.y = originalPos.y + Math.cos(time) * range;
          particle.position.z = originalPos.z + Math.sin(time + Math.PI/2) * range;
        }
        
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Throttled resize handler for better performance
    let resizeTimeout: number;
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(() => {
        if (!cameraRef.current || !rendererRef.current) return;
        
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }, 200); // 200ms debounce
    };

    // Initialize and start animation
    initScene();
    animate(0);
    window.addEventListener('resize', handleResize);

    // Use GSAP for initial animation - skip on mobile
    if (!isMobile && particlesGroupRef.current) {
      gsap.from(particlesGroupRef.current.position, {
        y: -5, // Reduced distance
        duration: 1.5, // Faster animation
        ease: "power2.out" // Simpler easing
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      cancelAnimationFrame(frameIdRef.current);
      
      // Dispose resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (particlesGroupRef.current) {
        particlesGroupRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            }
          }
        });
      }
    };
  }, [isMobile, isInitialized]);

  return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full z-[-2] ${className || ''}`} />;
};

export default ThreeScene;
