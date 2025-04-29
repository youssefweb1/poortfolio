import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Code, Home, User, Briefcase, Mail } from "lucide-react";
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
          "md:hidden absolute top-full left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border/10 shadow-lg transition-all duration-300 ease-in-out overflow-hidden",
          mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container mx-auto py-4 px-6 space-y-2">
          <MobileNavItem 
            icon={<Home size={18} />}
            label={t('nav.home')}
            onClick={() => scrollToSection("home")}
            active={activeSection === "home"}
          />
          <MobileNavItem 
            icon={<User size={18} />}
            label={t('nav.about')}
            onClick={() => scrollToSection("about")}
            active={activeSection === "about"}
          />
          <MobileNavItem 
            icon={<Briefcase size={18} />}
            label={t('nav.projects')}
            onClick={() => scrollToSection("projects")}
            active={activeSection === "projects"}
          />
          <MobileNavItem 
            icon={<Mail size={18} />}
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

const NavItem: React.FC<NavItemProps> = ({ icon, id, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
        active ? 
          "bg-primary/10 text-primary" : 
          "hover:bg-background/80 hover:text-primary"
      )}
    >
      <span className="relative z-10 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300">
        {label}
      </span>
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary transform scale-x-90 opacity-70 rounded-full"></span>
      )}
    </button>
  );
};

interface MobileNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg text-sm font-medium transition-all",
        active ? 
          "bg-primary/10 text-primary" : 
          "hover:bg-background/80 hover:text-primary"
      )}
    >
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </button>
  );
};

export default Navbar;
