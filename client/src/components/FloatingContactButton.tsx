import { useState } from "react";
import { Mail, X, Github, Linkedin, Twitter, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const FloatingContactButton: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const socialLinks = [
    { 
      icon: <Github size={18} />, 
      label: "GitHub", 
      href: "#", 
      color: "hover:bg-[#333] hover:text-white"
    },
    { 
      icon: <Linkedin size={18} />, 
      label: "LinkedIn", 
      href: "#", 
      color: "hover:bg-[#0077B5] hover:text-white"
    },
    { 
      icon: <Twitter size={18} />, 
      label: "Twitter", 
      href: "#", 
      color: "hover:bg-[#1DA1F2] hover:text-white"
    },
    { 
      icon: <Instagram size={18} />, 
      label: "Instagram", 
      href: "#", 
      color: "hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#FCAF45] hover:text-white"
    },
    { 
      icon: <Mail size={18} />, 
      label: "Email", 
      href: "mailto:example@example.com", 
      color: "hover:bg-[#EA4335] hover:text-white"
    },
    { 
      icon: <Phone size={18} />, 
      label: "Phone", 
      href: "tel:+123456789", 
      color: "hover:bg-[#25D366] hover:text-white" 
    }
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-40 flex flex-col items-center">
      {/* Social Links */}
      <div 
        className={cn(
          "flex flex-col-reverse items-center space-y-3 space-y-reverse mb-3 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        {socialLinks.map((link, index) => (
          <a 
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center bg-background/90 backdrop-blur-sm shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
              link.color,
              `transition-all duration-300 delay-${index * 100}`
            )}
            aria-label={link.label}
            style={{ 
              transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
              transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)'
            }}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* Contact Button */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleMenu}
        className={cn(
          "w-12 h-12 rounded-full shadow-md backdrop-blur-sm hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 transition-all duration-300",
          isOpen ? "bg-accent hover:bg-accent/90 text-white" : "bg-accent hover:bg-accent/90 text-white"
        )}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        {isOpen ? <X size={20} /> : <Mail size={20} />}
      </Button>
    </div>
  );
};

export default FloatingContactButton;