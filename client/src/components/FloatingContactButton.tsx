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
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-center">
      {/* Social Links */}
      <div 
        className="relative"
        aria-label="Contact options"
      >
        <div className={cn(
          "absolute bottom-0 left-0 flex flex-col-reverse gap-3 items-center mb-16 transition-all duration-300 ease-in-out", 
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "w-11 h-11 rounded-full flex items-center justify-center bg-background text-foreground frost-glass", 
                link.color,
              )}
              style={{ 
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                transform: isOpen ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
                opacity: isOpen ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.17, 0.55, 0.55, 1)'
              }}
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Contact Button */}
      <Button
        variant="default"
        size="icon"
        onClick={toggleMenu}
        className={cn(
          "w-11 h-11 rounded-full transition-all duration-300 frost-glass",
          isOpen ? "bg-accent hover:bg-accent/90 rotate-90" : "bg-primary hover:bg-primary/90 rotate-0"
        )}
        style={{
          boxShadow: isOpen
            ? "0 4px 14px rgba(var(--accent), 0.25), 0 0 0 1px rgba(var(--accent), 0.1)"
            : "0 4px 14px rgba(var(--primary), 0.25), 0 0 0 1px rgba(var(--primary), 0.1)"
        }}
        aria-label={isOpen ? "Close contact menu" : "Open contact menu"}
      >
        <div className="relative z-10">
          {isOpen ? <X size={18} strokeWidth={2.5} /> : <Mail size={18} strokeWidth={2.5} />}
        </div>
      </Button>
    </div>
  );
};

export default FloatingContactButton;