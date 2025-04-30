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
      category: "frontend",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
      titleKey: "projects.project1.title",
      descriptionKey: "projects.project1.description",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      previewLink: "https://ecooshield.com",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 2,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
      titleKey: "projects.project2.title",
      descriptionKey: "projects.project2.description",
      technologies: ["PHP", "MySQL", "Bootstrap", "jQuery"],
      previewLink: "https://emaralmasakin.com",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 3,
      category: "interactive",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7",
      titleKey: "projects.project3.title",
      descriptionKey: "projects.project3.description",
      technologies: ["Three.js", "GSAP", "JavaScript"],
      previewLink: "https://iou-studio.com",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 4,
      category: "frontend",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      titleKey: "projects.project4.title",
      descriptionKey: "projects.project4.description",
      technologies: ["HTML", "CSS", "JavaScript", "Tailwind CSS"],
      previewLink: "https://giantwell.com", 
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 5,
      category: "frontend",
      image: "https://images.unsplash.com/photo-1610484826917-0f191a211f59",
      titleKey: "projects.project5.title",
      descriptionKey: "projects.project5.description",
      technologies: ["HTML", "CSS", "JavaScript", "RTL Design"],
      previewLink: "https://ibracademy.sa",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 6,
      category: "frontend",
      image: "https://images.unsplash.com/photo-1586473219010-2ffc57b0d282",
      titleKey: "projects.project6.title",
      descriptionKey: "projects.project6.description",
      technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
      previewLink: "https://fleex-task.web.app",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 7,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1506102383123-c8ef1e872756",
      titleKey: "projects.project7.title",
      descriptionKey: "projects.project7.description",
      technologies: ["PHP", "MySQL", "Bootstrap", "Booking System"],
      previewLink: "https://helpferererhof.at",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 8,
      category: "frontend",
      image: "https://images.unsplash.com/photo-1558655146-605d86becbc2",
      titleKey: "projects.project8.title",
      descriptionKey: "projects.project8.description",
      technologies: ["HTML", "CSS", "JavaScript", "Dark Mode"],
      previewLink: "#",
      codeLink: "https://github.com/youssefweb1" 
    },
    {
      id: 9,
      category: "frontend",
      image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
      titleKey: "projects.project9.title",
      descriptionKey: "projects.project9.description",
      technologies: ["HTML", "CSS", "JavaScript", "Bootstrap"],
      previewLink: "#",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 10,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95",
      titleKey: "projects.project10.title",
      descriptionKey: "projects.project10.description",
      technologies: ["Laravel", "MySQL", "Bootstrap", "jQuery"],
      previewLink: "https://agritalent.com",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 11,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d",
      titleKey: "projects.project11.title",
      descriptionKey: "projects.project11.description",
      technologies: ["Laravel", "MySQL", "Bootstrap", "Scheduling System"],
      previewLink: "https://estisharati.sa",
      codeLink: "https://github.com/youssefweb1"
    },
    {
      id: 12,
      category: "fullstack",
      image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce",
      titleKey: "projects.project12.title",
      descriptionKey: "projects.project12.description",
      technologies: ["Laravel", "MySQL", "Bootstrap", "eCommerce"],
      previewLink: "https://partywizard.sa",
      codeLink: "https://github.com/youssefweb1"
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
      className="py-20 bg-secondary/5 dark:bg-secondary/20 backdrop-blur-sm"
    >
      <div className="container mx-auto px-6">
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-block glass px-3 py-1 rounded-full text-xs font-medium mb-4 text-primary border border-primary/20">
            {t('projects.title')}
          </div>
          <h2 className="section-title text-3xl md:text-4xl font-bold mb-2">
            {t('projects.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-primary/50 mx-auto rounded-full"></div>
        </div>
        
        <div ref={filtersRef} className="mb-12 flex flex-wrap justify-center gap-3">
          <Button 
            onClick={() => setActiveCategory("all")}
            variant={activeCategory === "all" ? "default" : "outline"}
            className={`rounded-full ${activeCategory === "all" ? "neon-btn bg-[#00c3ff]/80 hover:bg-[#00c3ff]/90" : "neon-btn glass hover:bg-[#00c3ff]/5"}`}
          >
            {t('projects.filters.all')}
          </Button>
          <Button 
            onClick={() => setActiveCategory("frontend")}
            variant={activeCategory === "frontend" ? "default" : "outline"}
            className={`rounded-full ${activeCategory === "frontend" ? "neon-btn bg-[#00c3ff]/80 hover:bg-[#00c3ff]/90" : "neon-btn glass hover:bg-[#00c3ff]/5"}`}
          >
            {t('projects.filters.frontend')}
          </Button>
          <Button 
            onClick={() => setActiveCategory("fullstack")}
            variant={activeCategory === "fullstack" ? "default" : "outline"}
            className={`rounded-full ${activeCategory === "fullstack" ? "neon-btn bg-[#00c3ff]/80 hover:bg-[#00c3ff]/90" : "neon-btn glass hover:bg-[#00c3ff]/5"}`}
          >
            {t('projects.filters.fullstack')}
          </Button>
          <Button 
            onClick={() => setActiveCategory("interactive")}
            variant={activeCategory === "interactive" ? "default" : "outline"}
            className={`rounded-full ${activeCategory === "interactive" ? "neon-btn bg-[#00c3ff]/80 hover:bg-[#00c3ff]/90" : "neon-btn glass hover:bg-[#00c3ff]/5"}`}
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
