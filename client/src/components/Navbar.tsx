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
    <header className="fixed top-0 right-0 left-0 z-50 bg-white/70 dark:bg-dark-bg/70 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <div className="font-bold text-xl text-primary">
          {t('name')}
        </div>
        
        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <a 
            href="#home" 
            className="px-3 py-2 hover:text-primary transition-colors"
          >
            {t('nav.home')}
          </a>
          <a 
            href="#about" 
            className="px-3 py-2 hover:text-primary transition-colors"
          >
            {t('nav.about')}
          </a>
          <a 
            href="#projects" 
            className="px-3 py-2 hover:text-primary transition-colors"
          >
            {t('nav.projects')}
          </a>
          <a 
            href="#contact" 
            className="px-3 py-2 hover:text-primary transition-colors"
          >
            {t('nav.contact')}
          </a>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ThemeToggle className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" />
          <LanguageSwitcher className="text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800" />
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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
          "md:hidden bg-white dark:bg-slate-900 shadow-md rounded-b-lg absolute w-full left-0 top-full transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="container mx-auto py-4 px-6 flex flex-col space-y-3">
          <a 
            href="#home" 
            className="px-3 py-2 hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.home')}
          </a>
          <a 
            href="#about" 
            className="px-3 py-2 hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.about')}
          </a>
          <a 
            href="#projects" 
            className="px-3 py-2 hover:text-primary transition-colors"
            onClick={closeMobileMenu}
          >
            {t('nav.projects')}
          </a>
          <a 
            href="#contact" 
            className="px-3 py-2 hover:text-primary transition-colors"
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
