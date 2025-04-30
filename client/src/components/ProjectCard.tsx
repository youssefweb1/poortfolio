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
      className="project-card group relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-br from-white/5 to-white/10 dark:from-primary/5 dark:via-purple-900/10 dark:to-accent/5 backdrop-blur-sm dark:backdrop-blur-lg border border-white/10 dark:border-primary/10 hover:border-primary/30 transition-all duration-500"
    >
      {/* Decorative accent */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-80 transition-opacity duration-700 -z-10"></div>
      
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
            className="bg-gradient-to-r from-primary/80 to-primary text-white dark:text-white px-4 py-2 rounded-full text-sm font-medium flex items-center hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> 
            {t('projects.preview')}
          </a>
          
          <a 
            href={codeLink} 
            className="glass border border-primary/30 dark:border-white/10 text-foreground dark:text-white/80 px-4 py-2 rounded-full text-sm font-medium flex items-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-all duration-300 transform hover:-translate-y-1"
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
