import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-toggle";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Cursor from "@/components/Cursor";
import BackToTop from "@/components/BackToTop";
import FloatingContactButton from "@/components/FloatingContactButton";

// Enhanced 3D background with parallax
function BackgroundGrid() {
  const depthLayerRef = useRef<HTMLDivElement>(null);
  
  // Subtle parallax effect for depth layer - performance optimized
  useEffect(() => {
    const depthLayer = depthLayerRef.current;
    if (!depthLayer) return;
    
    let frameId: number;
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of screen
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Smoothly interpolate to target (smoother animation)
      const lerpFactor = 0.05;
      lastX += (x - 0.5 - lastX) * lerpFactor;
      lastY += (y - 0.5 - lastY) * lerpFactor;
      
      // Using rAF and transform3d for better performance
      const updatePosition = () => {
        if (depthLayer) {
          depthLayer.style.transform = `translate3d(${lastX * 20}px, ${lastY * 20}px, -100px)`;
        }
        frameId = requestAnimationFrame(updatePosition);
      };
      
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePosition);
    };
    
    // Use passive event listener for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, []);
  
  return (
    <>
      {/* Multiple grid layers for 3D depth effect */}
      <div className="grid-overlay"></div>
      <div className="depth-layer" ref={depthLayerRef}></div>
      <div className="dot-matrix"></div>
    </>
  );
}

function HomePage() {
  return (
    <div className="bg-pattern min-h-screen relative">
      {/* Enhanced background grid system */}
      <BackgroundGrid />
      
      <div className="relative z-10">
        <Cursor />
        <Navbar />
        <main className="pt-16">
          <section id="home">
            <HeroSection />
          </section>
          <section id="about">
            <AboutSection />
          </section>
          <section id="projects">
            <ProjectsSection />
          </section>
          <section id="contact">
            <ContactSection />
          </section>
        </main>
        <Footer />
        <BackToTop />
        <FloatingContactButton />
      </div>
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Update the dir attribute when the language changes
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/" component={HomePage} />
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
