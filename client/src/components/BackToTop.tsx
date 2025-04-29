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
        "back-to-top",
        visible && "visible"
      )}
    >
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className="rounded-full bg-primary hover:bg-primary/90 w-12 h-12 text-white shadow-lg shadow-primary/20 glow-on-hover transition-all duration-300"
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </Button>
    </div>
  );
};

export default BackToTop;