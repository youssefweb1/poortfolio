import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  category: string;
  image: string;
  titleKey: string;
  descriptionKey: string;
  technologies: string[];
  previewLink: string;
  codeLink: string;
}

const ProjectsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
      titleKey: "projects.ecommerce.title",
      descriptionKey: "projects.ecommerce.description",
      technologies: ["React", "Node.js", "MongoDB"],
      previewLink: "#",
      codeLink: "#"
    },
    {
      id: 2,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      titleKey: "projects.social.title",
      descriptionKey: "projects.social.description",
      technologies: ["Next.js", "Express", "Socket.io"],
      previewLink: "#",
      codeLink: "#"
    },
    {
      id: 3,
      category: "interactive",
      image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f",
      titleKey: "projects.3d.title",
      descriptionKey: "projects.3d.description",
      technologies: ["Three.js", "GSAP", "JavaScript"],
      previewLink: "#",
      codeLink: "#"
    },
    {
      id: 4,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      titleKey: "projects.management.title",
      descriptionKey: "projects.management.description",
      technologies: ["React", "GraphQL", "PostgreSQL"],
      previewLink: "#",
      codeLink: "#"
    },
    {
      id: 5,
      category: "frontend",
      image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
      titleKey: "projects.delivery.title",
      descriptionKey: "projects.delivery.description",
      technologies: ["React Native", "Firebase", "Google Maps API"],
      previewLink: "#",
      codeLink: "#"
    },
    {
      id: 6,
      category: "interactive",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      titleKey: "projects.dashboard.title",
      descriptionKey: "projects.dashboard.description",
      technologies: ["Vue.js", "D3.js", "Tailwind CSS"],
      previewLink: "#",
      codeLink: "#"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Title animation
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Filters animation
    if (filtersRef.current) {
      gsap.fromTo(
        filtersRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          delay: 0.2,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Project cards animation
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
          }
        }
      );
    }

    return () => {
      // Cleanup scroll triggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate filtered projects when the category changes
  useEffect(() => {
    if (!projectsRef.current) return;
    
    const cards = projectsRef.current.querySelectorAll('.project-card');
    
    gsap.fromTo(
      cards,
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.05,
        duration: 0.4,
        ease: "power1.out"
      }
    );
  }, [filteredProjects]);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 bg-slate-50 dark:bg-slate-900"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
          <p className="mt-4 max-w-xl mx-auto text-slate-600 dark:text-slate-400">
            {t('projects.subtitle')}
          </p>
        </div>
        
        <div ref={filtersRef} className="mb-8 flex flex-wrap justify-center gap-4">
          <Button 
            onClick={() => setActiveCategory("all")}
            variant={activeCategory === "all" ? "default" : "outline"}
            className="rounded-full"
          >
            {t('projects.filters.all')}
          </Button>
          <Button 
            onClick={() => setActiveCategory("frontend")}
            variant={activeCategory === "frontend" ? "default" : "outline"}
            className="rounded-full"
          >
            {t('projects.filters.frontend')}
          </Button>
          <Button 
            onClick={() => setActiveCategory("fullstack")}
            variant={activeCategory === "fullstack" ? "default" : "outline"}
            className="rounded-full"
          >
            {t('projects.filters.fullstack')}
          </Button>
          <Button 
            onClick={() => setActiveCategory("interactive")}
            variant={activeCategory === "interactive" ? "default" : "outline"}
            className="rounded-full"
          >
            {t('projects.filters.interactive')}
          </Button>
        </div>
        
        <div 
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id}
              image={project.image}
              title={t(project.titleKey)}
              description={t(project.descriptionKey)}
              technologies={project.technologies}
              previewLink={project.previewLink}
              codeLink={project.codeLink}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
