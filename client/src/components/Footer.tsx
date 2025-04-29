import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/90 backdrop-blur-md text-white py-12 border-t border-border/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">
              {t('name')}
            </div>
            <div className="text-sm text-white/70 max-w-md text-center md:text-start">
              {t('title')} • <span className="text-primary">{t('hero.greeting')}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-3 rtl:space-x-reverse mb-4">
              <a 
                href="#" 
                className="w-8 h-8 glass border border-white/20 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 glass border border-white/20 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-3.5 h-3.5" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 glass border border-white/20 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="text-white/50 text-xs">
              {t('footer.copyright', { year: currentYear })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
