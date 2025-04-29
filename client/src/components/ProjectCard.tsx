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
    <Card className="project-card overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <div className="h-52 overflow-hidden">
        <img 
          src={image}
          alt={title}
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <a 
            href={previewLink} 
            className="text-primary hover:text-primary/80 flex items-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <LinkIcon className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" /> 
            {t('projects.preview')}
          </a>
          <a 
            href={codeLink} 
            className="text-primary hover:text-primary/80 flex items-center"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4 mr-1 rtl:ml-1 rtl:mr-0" /> 
            {t('projects.code')}
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
