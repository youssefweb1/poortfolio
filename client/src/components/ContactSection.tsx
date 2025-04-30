import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Phone, MapPin } from "lucide-react";
import { 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaInstagram, 
  FaDribbble, 
  FaBehance 
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
        { x: -50, opacity: 0 },
        {
          x: 0,
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
        { x: 50, opacity: 0 },
        {
          x: 0,
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
      className="py-20 bg-pattern relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2 opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-4 text-primary border border-primary/20">
            {t('contact.title')}
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-2">
            {t('contact.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-primary/50 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-10">
          <div ref={formRef} className="md:w-1/2 neon-card glass rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6 text-primary">
              {t('contact.form.title')}
            </h3>
            
            <ContactForm />
          </div>
          
          <div ref={infoRef} className="md:w-1/2 space-y-8">
            <div className="info-card neon-card glass rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-primary">
                {t('contact.info.title')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center group">
                  <div className="w-12 h-12 glass neon-btn border-[#00c3ff]/30 group-hover:border-[#00c3ff]/60 transition-all duration-300 rounded-full flex items-center justify-center text-[#00c3ff]">
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
                  <div className="w-12 h-12 glass neon-btn border-[#00c3ff]/30 group-hover:border-[#00c3ff]/60 transition-all duration-300 rounded-full flex items-center justify-center text-[#00c3ff]">
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
                  <div className="w-12 h-12 glass neon-btn border-[#00c3ff]/30 group-hover:border-[#00c3ff]/60 transition-all duration-300 rounded-full flex items-center justify-center text-[#00c3ff]">
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
                  <div className="w-12 h-12 glass neon-btn border-[#00c3ff]/30 group-hover:border-[#00c3ff]/60 transition-all duration-300 rounded-full flex items-center justify-center text-[#00c3ff]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div className="ms-4">
                    <div className="text-xs font-medium text-muted-foreground mb-1">
                      {t('contact.info.portfolio')}
                    </div>
                    <a href="https://youssef.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      {t('contact.info.portfolioValue')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="info-card neon-card glass rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-6 text-primary">
                {t('contact.social.title')}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/youssefweb1" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass neon-btn border-[#00c3ff]/30 hover:border-[#00c3ff]/60 hover:text-[#00c3ff] rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-4 h-4" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/youssef-elsabbahy" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass neon-btn border-[#00c3ff]/30 hover:border-[#00c3ff]/60 hover:text-[#00c3ff] rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-4 h-4" />
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
