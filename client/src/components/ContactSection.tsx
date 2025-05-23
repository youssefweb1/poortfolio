import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTiktok, 
  FaWhatsapp
} from "react-icons/fa";
import ContactForm from "@/components/ContactForm";

gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Form animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Info animation
    if (infoRef.current) {
      const infoCards = infoRef.current.querySelectorAll('.info-card');
      gsap.fromTo(
        infoCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 75%",
          }
        }
      );
    }

    return () => {
      // Cleanup scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 relative w-full overflow-hidden bg-pattern"
    >
      {/* Background blobs with contained positioning */}
      <div className="absolute top-0 right-0 w-[300px] md:w-96 h-[300px] md:h-96 bg-primary/10 blur-3xl rounded-full translate-x-1/4 -translate-y-1/4 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-96 h-[300px] md:h-96 bg-accent/10 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4 opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-12 sm:mb-16">
          <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-4 text-primary border border-primary/20">
            {t('contact.title')}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {t('contact.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-primary/50 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
          <div ref={formRef} className="w-full md:w-1/2 glass border border-border/50 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl font-bold mb-6 text-primary">
              {t('contact.form.title')}
            </h3>
            
            <ContactForm />
          </div>
          
          <div ref={infoRef} className="w-full md:w-1/2 space-y-6">
            <div className="info-card glass border border-border/50 rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h3 className="text-xl font-bold mb-6 text-primary">
                {t('contact.info.title')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 glass border border-primary/30 group-hover:border-primary/60 transition-colors rounded-full flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="ms-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {t('contact.info.email')}
                    </div>
                    <a href="mailto:yooooussef@yahoo.com" className="hover:text-primary transition-colors">
                      yooooussef@yahoo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 glass border border-primary/30 group-hover:border-primary/60 transition-colors rounded-full flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="ms-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {t('contact.info.phone')}
                    </div>
                    <a href="tel:+966582407507" className="hover:text-primary transition-colors">
                      +966 582 407 507
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 glass border border-primary/30 group-hover:border-primary/60 transition-colors rounded-full flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="ms-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {t('contact.info.location')}
                    </div>
                    <div className="hover:text-primary transition-colors">
                      {t('contact.info.locationValue')}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <div className="w-12 h-12 glass border border-primary/30 group-hover:border-primary/60 transition-colors rounded-full flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div className="ms-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {t('contact.info.portfolio')}
                    </div>
                    <a href="https://yooussef.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      yooussef.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="info-card glass border border-border/50 rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold mb-6 text-primary">
                {t('contact.social.title')}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/youssefweb1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass border border-primary/30 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/youssef-elsabbahy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass border border-primary/30 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.tiktok.com/@yooussef.tech" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass border border-primary/30 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="TikTok"
                >
                  <FaTiktok className="w-4 h-4" />
                </a>
                <a 
                  href="https://wa.me/966582407507" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass border border-primary/30 hover:border-primary/60 hover:text-primary rounded-full flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
