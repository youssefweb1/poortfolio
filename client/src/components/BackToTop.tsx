import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div 
      className={cn(
        "fixed bottom-6 right-6 z-40 transition-all duration-300 transform",
        visible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className="rounded-full w-11 h-11 bg-primary hover:bg-primary/90 text-white shadow-lg frost-glass"
        style={{
          boxShadow: "0 4px 14px rgba(var(--primary), 0.25), 0 0 0 1px rgba(var(--primary), 0.1)"
        }}
        aria-label="Back to top"
      >
        <div className="relative z-10">
          <ChevronUp size={20} strokeWidth={2.5} className="relative" />
        </div>
      </Button>
    </div>
  );
};

export default BackToTop;