import { useTranslation } from "react-i18next";
import { Link as LinkIcon, Github } from "lucide-react";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface ProjectCardProps {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  previewLink: string;
  codeLink: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  image,
  title,
  description,
  technologies,
  previewLink,
  codeLink
}) => {
  const { t } = useTranslation();
  const cardRef = useRef<HTMLDivElement>(null);

  // Add hover effect using GSAP
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const imageContainer = card.querySelector('.image-container');
    const content = card.querySelector('.content');
    
    const handleMouseEnter = () => {
      gsap.to(imageContainer, {
        scale: 1.1,
        duration: 0.7,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        y: -10,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(imageContainer, {
        scale: 1,
        duration: 0.7,
        ease: 'power2.out'
      });
      
      gsap.to(content, {
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="neon-card project-card group relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-white/5 to-white/10 dark:bg-gray-900/95 backdrop-blur-sm dark:backdrop-blur-lg border border-white/10 dark:border-gray-800 transition-all duration-500"
    >
      {/* Neon glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00c3ff]/20 via-[#00c3ff]/10 to-[#00c3ff]/20 dark:from-[#00c3ff]/30 dark:via-[#00c3ff]/20 dark:to-[#00c3ff]/30 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
      
      {/* Additional inner glow */}
      <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#00c3ff]/5 dark:to-[#4080ff]/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      
      <div className="relative h-52 overflow-hidden">
        <div className="image-container absolute inset-0 w-full h-full">
          <img 
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 dark:from-background to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      </div>
      
      <div className="content p-6 relative">
        <h3 className="text-xl font-bold mb-2 text-primary/90 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-foreground dark:text-white/80 mb-5 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-xs font-medium rounded-full border border-primary/20 dark:border-primary/30 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3 rtl:space-x-reverse mt-auto">
          <a 
            href={previewLink} 
            className="neon-btn bg-gradient-to-r from-[#00c3ff]/80 to-[#00c3ff]/90 text-white dark:text-white px-4 py-2 rounded-full text-sm font-medium flex items-center transition-all duration-300 transform hover:-translate-y-1"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> 
            {t('projects.preview')}
          </a>
          
          <a 
            href={codeLink} 
            className="neon-btn glass text-foreground dark:text-white/90 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-[#00c3ff]/5 dark:hover:bg-[#00c3ff]/10 transition-all duration-300 transform hover:-translate-y-1"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> 
            {t('projects.code')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
