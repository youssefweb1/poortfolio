import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 glass border-b border-border/30">
      <nav className="container mx-auto py-3 px-6 flex justify-between items-center">
        <div className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          {t('name')}
        </div>
        
        <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <a 
            href="#home" 
            className="px-3 py-2 text-sm font-medium hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {t('nav.home')}
          </a>
          <a 
            href="#about" 
            className="px-3 py-2 text-sm font-medium hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {t('nav.about')}
          </a>
          <a 
            href="#projects" 
            className="px-3 py-2 text-sm font-medium hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {t('nav.projects')}
          </a>
          <a 
            href="#contact" 
            className="px-3 py-2 text-sm font-medium hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
          >
            {t('nav.contact')}
          </a>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ThemeToggle className="hover:bg-muted text-foreground" />
          <LanguageSwitcher className="hover:bg-muted text-foreground" />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-foreground hover:bg-muted"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "md:hidden glass shadow-lg rounded-b-lg absolute w-full left-0 top-full border-x border-b border-border/30 transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
        )}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-3">
          <a 
            href="#home" 
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.home')}
          </a>
          <a 
            href="#about" 
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.about')}
          </a>
          <a 
            href="#projects" 
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.projects')}
          </a>
          <a 
            href="#contact" 
            className="px-3 py-2 text-sm font-medium hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.contact')}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
