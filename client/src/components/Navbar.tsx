import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X, Code, Home, User, Briefcase, Mail, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const isRtl = i18n.dir() === 'rtl';

  // More optimized scroll handler with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Apply scrolled state immediately for better UX
      if ((scrollPosition > 10 && !scrolled) || (scrollPosition <= 10 && scrolled)) {
        setScrolled(scrollPosition > 10);
      }
      
      // Debounce the more expensive active section calculation
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        // Set active section based on scroll position
        const sections = ["home", "about", "projects", "contact"];
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Adjusted threshold for better detection
            if (rect.top <= 200 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }, 100); // 100ms debounce
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      closeMobileMenu();
    }
  };

  return (
    <header 
      className={cn(
        "fixed top-0 right-0 left-0 z-50 backdrop-saturate-[180%] transition-all duration-300 will-change-transform",
        scrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-md border-b border-white/5 py-3" 
          : "bg-transparent py-5"
      )}
      style={{ transform: "translate3d(0,0,0)" }} // Force GPU acceleration
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="Logo"
            >
              <div className="relative w-10 h-10 flex items-center justify-center rounded-xl overflow-hidden">
                {/* Logo background with glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                {/* Logo icon */}
                <Code size={20} className="relative text-white drop-shadow-sm" />
                
                {/* Animated border */}
                <div className="absolute inset-0 border border-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Name/brand */}
              <div className="font-bold text-xl md:tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t('name').split(' ')[0]}
              </div>
            </a>
          </div>
          
          {/* Desktop navigation in a sleek glass panel */}
          <div className="hidden md:block">
            <div className={cn(
              "frost-glass rounded-full px-1.5 py-1.5 transition-all duration-300",
              scrolled ? "opacity-95 shadow-sm" : "opacity-85"
            )}>
              <div className="flex items-center">
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
            </div>
          </div>
          
          {/* Right Side Controls in glass panel */}
          <div className="flex items-center gap-3">
            <div className={cn(
              "frost-glass rounded-full p-1.5 flex items-center gap-0.5 transition-all duration-300",
              scrolled ? "opacity-95 shadow-sm" : "opacity-85"
            )}>
              <ThemeToggle className="rounded-full w-9 h-9 hover:bg-primary/10" />
              <LanguageSwitcher className="rounded-full w-9 h-9 hover:bg-primary/10" />
            </div>
            
            {/* Mobile menu toggle - simplified */}
            <button
              className="md:hidden rounded-full w-10 h-10 flex items-center justify-center text-foreground hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu - enhanced and modernized */}
      <div 
        className={cn(
          "md:hidden fixed inset-x-0 top-[57px] bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-white/5 transition-all duration-300 ease-out transform",
          mobileMenuOpen 
            ? "translate-y-0 opacity-100 shadow-xl" 
            : "translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto p-5 h-full flex flex-col">
          <div className="space-y-1 py-4">
            <MobileNavItem 
              icon={<Home size={18} />}
              label={t('nav.home')}
              onClick={() => scrollToSection("home")}
              active={activeSection === "home"}
              rtl={isRtl}
            />
            <MobileNavItem 
              icon={<User size={18} />}
              label={t('nav.about')}
              onClick={() => scrollToSection("about")}
              active={activeSection === "about"}
              rtl={isRtl}
            />
            <MobileNavItem 
              icon={<Briefcase size={18} />}
              label={t('nav.projects')}
              onClick={() => scrollToSection("projects")}
              active={activeSection === "projects"}
              rtl={isRtl}
            />
            <MobileNavItem 
              icon={<Mail size={18} />}
              label={t('nav.contact')}
              onClick={() => scrollToSection("contact")}
              active={activeSection === "contact"}
              rtl={isRtl}
            />
          </div>
          
          {/* Mobile contact CTA */}
          <div className="mt-auto pb-8">
            <div className="frost-glass rounded-xl p-4 bg-gradient-to-br from-primary/5 to-accent/5">
              <p className="text-sm text-muted-foreground mb-3">{t('nav.cta.text')}</p>
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full rounded-lg bg-primary/90 hover:bg-primary text-white"
              >
                {t('nav.cta.button')}
              </Button>
            </div>
          </div>
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
        "relative px-4 py-2 mx-0.5 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none",
        active 
          ? "text-primary after:opacity-100 after:scale-x-100 bg-white/5" 
          : "text-muted-foreground hover:text-foreground hover:bg-white/5 after:opacity-0 after:scale-x-0 hover:after:opacity-100 hover:after:scale-x-100"
      )}
    >
      <span>{label}</span>
      
      {/* Interactive underline indicator */}
      <span 
        className={cn(
          "absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 w-12 max-w-[80%] bg-gradient-to-r from-primary/80 to-accent/80 rounded-full transform transition-all duration-300",
          active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
        )}
      ></span>
    </button>
  );
};

interface MobileNavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  rtl: boolean;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ icon, label, active, onClick, rtl }) => {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between py-3.5 px-5 rounded-xl text-base transition-all duration-200 border-l-2",
        active 
          ? "bg-primary/10 text-primary border-primary" 
          : "hover:bg-white/5 text-muted-foreground hover:text-foreground border-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <span className={active ? "text-primary" : "text-muted-foreground"}>{icon}</span>
        <span className={cn("font-medium", active && "text-primary")}>{label}</span>
      </div>
      
      <ChevronRight 
        size={16} 
        className={cn(
          "text-muted-foreground transition-transform",
          rtl && "rotate-180",
          active && "text-primary"
        )} 
      />
    </button>
  );
};

export default Navbar;
