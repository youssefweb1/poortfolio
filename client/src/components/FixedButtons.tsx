import { useState, useEffect } from "react";
import { ArrowUp, Share2 } from "lucide-react";
import { FaGithub, FaLinkedin, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const FixedButtons: React.FC = () => {
  const { i18n } = useTranslation();
  const [showTopButton, setShowTopButton] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const isRtl = i18n.language === "ar";

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const toggleSocial = () => {
    setSocialOpen(!socialOpen);
  };

  const socialLinks = [
    { 
      icon: <FaGithub className="w-4 h-4" />, 
      url: "https://github.com/youssefweb1", 
      label: "GitHub" 
    },
    { 
      icon: <FaLinkedin className="w-4 h-4" />, 
      url: "https://www.linkedin.com/in/youssef-elsabbahy", 
      label: "LinkedIn" 
    },
    { 
      icon: <FaTiktok className="w-4 h-4" />, 
      url: "https://www.tiktok.com/@yooussef.tech", 
      label: "TikTok" 
    },
    { 
      icon: <FaWhatsapp className="w-4 h-4" />, 
      url: "https://wa.me/966582407507", 
      label: "WhatsApp" 
    }
  ];

  return (
    <>
      {/* Back to Top Button - Right side */}
      <div className="fixed bottom-6 end-6 z-50">
        <Button
          variant="default"
          size="icon"
          className={cn(
            "rounded-full shadow-lg w-12 h-12 bg-primary hover:bg-primary/90 transition-all duration-300",
            showTopButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
          )}
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

      {/* Social Media Buttons - Left side */}
      <div className="fixed bottom-6 start-6 z-50">
        <div className="relative">
          {/* Social Links */}
          <div 
            className={cn(
              "absolute bottom-full mb-2 start-0 transition-all duration-300 flex flex-col gap-2",
              socialOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"
            )}
          >
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="w-10 h-10 glass shadow-lg border border-border/40 hover:border-primary/40 rounded-full flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  transitionDelay: socialOpen ? `${index * 50}ms` : '0ms',
                  opacity: socialOpen ? 1 : 0,
                  transform: socialOpen ? 'translateY(0)' : `translateY(${10 * (socialLinks.length - index)}px)`
                }}
              >
                {link.icon}
              </a>
            ))}
          </div>

          {/* Social Toggle Button */}
          <Button
            variant="default"
            size="icon"
            className={cn(
              "rounded-full shadow-lg w-12 h-12 transition-colors duration-300",
              socialOpen ? "bg-primary hover:bg-primary/90" : "bg-accent hover:bg-accent/90"
            )}
            onClick={toggleSocial}
            aria-label="Toggle social links"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default FixedButtons;