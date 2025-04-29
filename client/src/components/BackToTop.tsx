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
        "fixed bottom-8 right-8 z-40 opacity-0 invisible translate-y-3 transition-all duration-300",
        visible && "opacity-100 visible translate-y-0"
      )}
    >
      <Button
        variant="default"
        size="icon"
        onClick={scrollToTop}
        className="rounded-full bg-primary hover:bg-primary/90 w-11 h-11 text-white shadow-md hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300"
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
      </Button>
    </div>
  );
};

export default BackToTop;