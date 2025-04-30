import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, ChevronDown, MessageCircle, Code, CodeXml } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll to detect when the user has scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);

      // Update active section based on scroll position
      const sections = ["home", "about", "projects", "contact"];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth"
      });
      closeMobileMenu();
    }
  };

  // Navigation items to avoid duplication
  const navItems = [
    { id: "home", label: t('nav.home') },
    { id: "about", label: t('nav.about') },
    { id: "projects", label: t('nav.projects') },
    { id: "contact", label: t('nav.contact') }
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg shadow-md border-b border-border/20" 
          : "py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative z-10 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-accent/60 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/30 p-2 group-hover:border-primary/70 transition-all duration-300">
                <CodeXml className="w-5 h-5 text-primary group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
              </div>
            </div>
            
            {/* Removed the contact button that was here */}
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="bg-card/50 backdrop-blur-sm rounded-full border border-border/30 px-1 py-1 flex items-center mr-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-full transition-colors relative",
                    activeSection === item.id 
                      ? "text-primary-foreground bg-primary" 
                      : "text-foreground hover:text-primary hover:bg-muted"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="flex overflow-hidden p-1 backdrop-blur-sm rounded-full border border-border/30">
                <ThemeToggle className="hover:bg-muted text-foreground" />
                <LanguageSwitcher className="hover:bg-muted text-foreground" />
              </div>
              
              {t('currentLanguage') === 'ar' ? (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="rounded-full text-xs bg-slate-900 hover:bg-slate-800 text-slate-50"
                  onClick={() => scrollToSection("contact")}
                >
                  واتساب
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="rounded-full text-xs bg-[#25D366] hover:bg-[#20BD5C] text-white flex items-center gap-1.5"
                  onClick={() => scrollToSection("contact")}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </Button>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2 rtl:space-x-reverse">
            <div className="flex overflow-hidden p-1 backdrop-blur-sm rounded-full border border-border/30">
              <ThemeToggle className="hover:bg-muted text-foreground" />
              <LanguageSwitcher className="hover:bg-muted text-foreground" />
            </div>
            
            <Button
              variant="default"
              size="icon"
              className="rounded-full"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden bg-background/95 backdrop-blur-md shadow-lg absolute w-full left-0 top-full border-y border-border/20 transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex justify-between items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors",
                activeSection === item.id 
                  ? "bg-primary/10 text-primary" 
                  : "hover:bg-muted hover:text-primary"
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <ChevronDown className="h-4 w-4 text-primary" />
              )}
            </button>
          ))}
          
          <div className="pt-2 mt-2 border-t border-border/20">
            {t('currentLanguage') === 'ar' ? (
              <Button 
                variant="default" 
                size="sm" 
                className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-50"
                onClick={() => scrollToSection("contact")}
              >
                واتساب
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="w-full rounded-lg bg-[#25D366] hover:bg-[#20BD5C] text-white flex items-center justify-center gap-1.5"
                onClick={() => scrollToSection("contact")}
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
