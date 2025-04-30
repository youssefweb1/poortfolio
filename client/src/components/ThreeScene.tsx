import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

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

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js scene
    const initScene = () => {
      // Create scene
      sceneRef.current = new THREE.Scene();
      
      // Create camera
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      cameraRef.current.position.z = 15;
      
      // Create renderer
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: canvasRef.current as HTMLCanvasElement,
        alpha: true,
        antialias: true,
      });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      // Create a group for particles
      particlesGroupRef.current = new THREE.Group();
      sceneRef.current.add(particlesGroupRef.current);
      
      // Create particles
      const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x3B82F6 });
      
      for (let i = 0; i < 100; i++) {
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
          randomSpeed: Math.random() * 0.01 + 0.005
        };
        
        particlesGroupRef.current.add(particle);
      }
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !particlesGroupRef.current) return;
      
      // Rotate the entire particle group
      particlesGroupRef.current.rotation.y += 0.001;
      particlesGroupRef.current.rotation.x += 0.0005;
      
      // Animate individual particles
      particlesGroupRef.current.children.forEach((particle) => {
        const time = Date.now() * (particle.userData.randomSpeed as number);
        const originalPos = particle.userData.originalPosition as THREE.Vector3;
        
        particle.position.x = originalPos.x + Math.sin(time) * 0.3;
        particle.position.y = originalPos.y + Math.cos(time) * 0.3;
        particle.position.z = originalPos.z + Math.sin(time + Math.PI/2) * 0.3;
      });
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    // Initialize and start animation
    initScene();
    animate();
    window.addEventListener('resize', handleResize);

    // Use GSAP for initial animation
    if (particlesGroupRef.current) {
      gsap.from(particlesGroupRef.current.position, {
        y: -10,
        duration: 2,
        ease: "power3.out"
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
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
  }, []);

  return <canvas ref={canvasRef} className={`absolute top-0 left-0 w-full h-full z-[-2] ${className || ''}`} />;
};

export default ThreeScene;
