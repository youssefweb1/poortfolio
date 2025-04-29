import { useTranslation } from "react-i18next";
import { Link as LinkIcon, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

  return (
    <div className="project-card group">
      <div className="relative h-52 overflow-hidden rounded-t-lg">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-6 relative">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 glass border border-primary/20 text-primary text-xs font-medium rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-3 rtl:space-x-reverse mt-auto">
          <a 
            href={previewLink} 
            className="glass border border-primary/30 text-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center hover:bg-primary hover:text-white transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="w-3.5 h-3.5 mr-1.5 rtl:ml-1.5 rtl:mr-0" /> 
            {t('projects.preview')}
          </a>
          
          <a 
            href={codeLink} 
            className="glass border border-primary/30 text-foreground px-3 py-1.5 rounded-full text-sm font-medium flex items-center hover:bg-primary hover:text-white transition-colors"
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
