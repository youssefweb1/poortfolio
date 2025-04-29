import { useTranslation } from "react-i18next";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaCode, 
  FaBriefcase 
} from "react-icons/fa";
import { Link } from "wouter";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/80 backdrop-blur-xl pt-12 pb-6 border-t border-border/30 relative overflow-hidden">
      {/* Decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full filter blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[100px] -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 mb-10">
          {/* Column 1: About */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent inline-block">
              {t('name')}
            </h3>
            <p className="text-white/70 text-sm mb-4 max-w-xs">
              {t('footer.about', 'A passionate full stack developer specializing in creating modern, efficient, and visually stunning web applications.')}
            </p>
            <div className="mt-auto">
              <div className="flex space-x-3 rtl:space-x-reverse">
                <a 
                  href="https://github.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass border border-white/20 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass border border-white/20 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 glass border border-white/20 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-white">
              {t('footer.quickLinks', 'Quick Links')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="#hero" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-primary transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary/50 rounded-full"></span>
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-white">
              {t('footer.services', 'Services')}
            </h3>
            <ul className="space-y-2">
              <li className="text-white/70 flex items-center gap-2">
                <FaCode className="text-primary w-4 h-4" />
                {t('footer.webDevelopment', 'Web Development')}
              </li>
              <li className="text-white/70 flex items-center gap-2">
                <FaBriefcase className="text-primary w-4 h-4" />
                {t('footer.uiDesign', 'UI/UX Design')}
              </li>
              <li className="text-white/70 flex items-center gap-2">
                <FaCode className="text-primary w-4 h-4" />
                {t('footer.apiDevelopment', 'API Development')}
              </li>
              <li className="text-white/70 flex items-center gap-2">
                <FaCode className="text-primary w-4 h-4" />
                {t('footer.consultation', 'Technical Consultation')}
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div className="flex flex-col">
            <h3 className="text-lg font-bold mb-4 text-white">
              {t('footer.contactInfo', 'Contact Info')}
            </h3>
            <ul className="space-y-3">
              <li className="text-white/70 flex items-start gap-3">
                <FaEnvelope className="text-primary w-4 h-4 mt-1" />
                <span>contact@youssefalsabbahi.com</span>
              </li>
              <li className="text-white/70 flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary w-4 h-4 mt-1" />
                <span>{t('contact.info.locationValue')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border/40 to-transparent my-6"></div>
        
        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-xs mb-4 md:mb-0">
            {t('footer.copyright', { year: currentYear })}
          </div>
          <div className="text-white/50 text-xs">
            <span className="text-primary">❤</span> {t('footer.madeWith', 'Made with passion and modern technologies')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
