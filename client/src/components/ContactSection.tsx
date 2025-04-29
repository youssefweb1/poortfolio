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
      className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 max-w-xl mx-auto text-slate-600 dark:text-slate-400">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div ref={formRef} className="md:w-1/2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6">
              {t('contact.form.title')}
            </h3>
            
            <ContactForm />
          </div>
          
          <div ref={infoRef} className="md:w-1/2">
            <div className="info-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold mb-6">
                {t('contact.info.title')}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                    <Mail />
                  </div>
                  <div className="mr-4 rtl:mr-0 rtl:ml-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {t('contact.info.email')}
                    </div>
                    <div>youssef@example.com</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                    <Phone />
                  </div>
                  <div className="mr-4 rtl:mr-0 rtl:ml-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {t('contact.info.phone')}
                    </div>
                    <div>+123 456 7890</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-xl">
                    <MapPin />
                  </div>
                  <div className="mr-4 rtl:mr-0 rtl:ml-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {t('contact.info.location')}
                    </div>
                    <div>{t('contact.info.locationValue')}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="info-card bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">
                {t('contact.social.title')}
              </h3>
              
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl transition-colors"
                  aria-label="Dribbble"
                >
                  <FaDribbble />
                </a>
                <a 
                  href="#" 
                  className="w-12 h-12 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary text-xl transition-colors"
                  aria-label="Behance"
                >
                  <FaBehance />
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
