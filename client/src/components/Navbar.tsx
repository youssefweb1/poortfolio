import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Home, User, Briefcase, Mail, Code } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 10);
      
      // Set active section based on scroll position
      const sections = ["home", "about", "projects", "contact"];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
      element.scrollIntoView({ behavior: "smooth" });
      closeMobileMenu();
    }
  };

  return (
    <header className={cn(
      "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
      scrolled ? 
        "bg-background/90 backdrop-blur-md shadow-lg py-3" : 
        "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="group flex items-center space-x-2 rtl:space-x-reverse"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-white transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20">
                <Code size={20} />
              </div>
              <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t('name')}
              </div>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2 rtl:space-x-reverse">
            <NavItem 
              id="home"
              active={activeSection === "home"}
              label={t('nav.home')}
              onClick={() => scrollToSection("home")}
            />
            <NavItem 
              id="about"
              active={activeSection === "about"}
              label={t('nav.about')}
              onClick={() => scrollToSection("about")}
            />
            <NavItem 
              id="projects"
              active={activeSection === "projects"}
              label={t('nav.projects')}
              onClick={() => scrollToSection("projects")}
            />
            <NavItem 
              id="contact"
              active={activeSection === "contact"}
              label={t('nav.contact')}
              onClick={() => scrollToSection("contact")}
            />
          </div>
          
          {/* Right Side Controls */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className={cn(
              "flex space-x-0.5 rtl:space-x-reverse p-1 rounded-full transition-all duration-300",
              scrolled ? "bg-muted/80" : "bg-background/70 backdrop-blur-md"
            )}>
              <ThemeToggle className="hover:bg-white/10 text-foreground" />
              <LanguageSwitcher className="hover:bg-white/10 text-foreground" />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full text-foreground hover:bg-muted/20 focus:ring-0"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/10 shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto py-4 px-6 space-y-1">
          <MobileNavItem 
            label={t('nav.home')}
            onClick={() => scrollToSection("home")}
            active={activeSection === "home"}
          />
          <MobileNavItem 
            label={t('nav.about')}
            onClick={() => scrollToSection("about")}
            active={activeSection === "about"}
          />
          <MobileNavItem 
            label={t('nav.projects')}
            onClick={() => scrollToSection("projects")}
            active={activeSection === "projects"}
          />
          <MobileNavItem 
            label={t('nav.contact')}
            onClick={() => scrollToSection("contact")}
            active={activeSection === "contact"}
          />
        </div>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon?: React.ReactNode;
  id: string;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ id, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative px-5 py-2 text-sm font-medium transition-all duration-300 tracking-wide",
        active ? 
          "text-primary" : 
          "text-foreground/80 hover:text-primary"
      )}
    >
      <span className="relative">
        {label}
      </span>
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-50 opacity-70 rounded-full"></span>
      )}
    </button>
  );
};

interface MobileNavItemProps {
  icon?: React.ReactNode; // Made optional
  label: string;
  active: boolean;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full relative px-6 py-3 text-sm font-medium tracking-wide text-center transition-all duration-200",
        active ? 
          "text-primary" : 
          "text-foreground/80 hover:text-primary"
      )}
    >
      <span className="relative">
        {label}
      </span>
      {active && (
        <span className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-full opacity-70"></span>
      )}
    </button>
  );
};

export default Navbar;
