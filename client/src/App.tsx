import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-toggle";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Cursor from "@/components/Cursor";
import FixedButtons from "@/components/FixedButtons";
import Loader from "@/components/Loader";
import AnimatedBackground from "@/components/AnimatedBackground";

function HomePage() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Loader setLoading={setLoading} />
      ) : (
        <>
          <AnimatedBackground />
          <Cursor />
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
          <FixedButtons />
        </>
      )}
    </>
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
