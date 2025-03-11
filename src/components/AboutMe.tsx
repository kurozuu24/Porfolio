import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutSection = styled(motion.section)`
  min-height: 100vh;
  padding: 6rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 30%;
    right: -20%;
    width: 600px;
    height: 600px;
    background: var(--primary);
    filter: blur(180px);
    opacity: 0.1;
    pointer-events: none;
  }
`;

const Title = styled(motion.h2)`
  font-size: 3.5rem;
  background: linear-gradient(to right, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 3rem;
  text-align: center;
  font-weight: 800;
`;

const ContentWrapper = styled(motion.div)`
  max-width: 800px;
  width: 100%;
`;

const Section = styled(motion.div)`
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h3)`
  color: var(--accent);
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Text = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
`;

const SkillsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SkillTag = styled(motion.div)`
  background: var(--card-bg);
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

const AboutMe = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const skills = [
    "React", "TypeScript", "Node.js", "JavaScript",
    "HTML5", "CSS3", "Git", "SQL",
    "MongoDB", "Laravel", "Bootstrap", "Tailwind"
  ];

  return (
    <AboutSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Title variants={itemVariants}>Sobre Mí</Title>
      <ContentWrapper>
        <Section variants={itemVariants}>
          <SectionTitle>Mi Historia</SectionTitle>
          <Text>
            Mi pasión por el desarrollo web comenzó durante mi formación en DAW, donde descubrí 
            el poder de crear experiencias digitales significativas. Como desarrollador front-end junior, 
            combino creatividad y precisión técnica para construir interfaces que no solo son 
            visualmente atractivas, sino también intuitivas y funcionales.
          </Text>
          <Text>
            Durante mi formación, he cultivado una mentalidad de aprendizaje continuo y una 
            fascinación por las últimas tecnologías web. Mi experiencia en proyectos académicos 
            y personales me ha permitido desarrollar una sólida comprensión de las mejores 
            prácticas de desarrollo y la importancia de escribir código limpio y mantenible.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>¿Qué me hace diferente?</SectionTitle>
          <Text>
            Me destaco por mi capacidad para adaptarme rápidamente a nuevas tecnologías y 
            mi compromiso con la excelencia en cada línea de código. Soy un firme defensor 
            del trabajo en equipo y creo en la importancia de la comunicación efectiva en el 
            desarrollo de software.
          </Text>
          <Text>
            Mi formación técnica, combinada con mi creatividad y atención al detalle, me 
            permite abordar los desafíos de desarrollo desde múltiples perspectivas, 
            encontrando soluciones innovadoras que satisfacen tanto los requisitos técnicos 
            como las necesidades del usuario final.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>Tecnologías</SectionTitle>
          <Text>
            Mi stack tecnológico está en constante evolución, pero estas son algunas de las 
            tecnologías con las que trabajo actualmente:
          </Text>
          <SkillsGrid>
            {skills.map((skill, index) => (
              <SkillTag
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                {skill}
              </SkillTag>
            ))}
          </SkillsGrid>
        </Section>
      </ContentWrapper>
    </AboutSection>
  );
};

export default AboutMe; 