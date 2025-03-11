import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    bottom: 10%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: var(--accent);
    filter: blur(150px);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ProjectCard = styled(motion.div)`
  background: var(--card-bg);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const ProjectContent = styled.div`
  padding: 2rem;
`;

const ProjectTitle = styled.h3`
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

const TechTag = styled(motion.span)`
  background: rgba(99, 102, 241, 0.1);
  color: var(--primary-light);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border: 1px solid rgba(99, 102, 241, 0.2);
`;

const SectionTitle = styled(motion.h2)`
  background: linear-gradient(to right, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
  text-align: center;
`;

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      y: -10,
      transition: {
        duration: 0.2
      }
    }
  };

  const tagVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };

  const projects = [
    {
      title: "Proyecto Final DAW",
      description: "Aplicación web de gestión de tareas colaborativa desarrollada como proyecto final del grado superior. Implementa autenticación de usuarios, tiempo real y diseño responsive.",
      tech: ["React", "Node.js", "MySQL"],
      image: "/images/proyecto-daw.jpg"
    },
    {
      title: "Consultora Páginas Web",
      description: "Proyecto personal de una tienda sobre venta de páginas web.",
      tech: ["JavaScript", "PHP", "MySQL", "Bootstrap"],
      image: "/images/consultora.jpg"
    },
    {
      title: "Portfolio Personal",
      description: "Sitio web personal desarrollado con React y TypeScript, implementando las mejores prácticas de diseño responsive y optimización de rendimiento.",
      tech: ["React", "TypeScript", "Styled Components"],
      image: "/images/portfolio.jpg"
    },
    {
      title: "Página Web de Vinos",
      description: "Página web sobre venta e inscripción de cursos de vinos con menú de administración y vista de estadísticas.",
      tech: ["PHP", "Laravel", "MySQL", "TailwindCSS"],
      image: "/images/vinos.png"
    }
  ];

  return (
    <ProjectsSection>
      <SectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Mis Proyectos
      </SectionTitle>
      <ProjectsGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            variants={cardVariants}
            whileHover="hover"
          >
            {project.image && (
              <ProjectImage 
                src={project.image} 
                alt={project.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            )}
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
              <TechStack>
                {project.tech.map((tech, techIndex) => (
                  <TechTag
                    key={techIndex}
                    variants={tagVariants}
                    whileHover="hover"
                  >
                    {tech}
                  </TechTag>
                ))}
              </TechStack>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsSection>
  );
};

export default Projects; 