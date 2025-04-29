import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Languages } from "lucide-react";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage}
      className={cn("rounded-full relative group", className)}
      aria-label="Toggle language"
    >
      <Languages className="h-4 w-4" />
      <div className="absolute -bottom-10 start-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm border border-border/40 rounded-lg px-2 py-1 text-xs font-medium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap shadow-md pointer-events-none">
        {i18n.language === "ar" ? "Switch to English" : "تغيير إلى العربية"}
      </div>
    </Button>
  );
}
