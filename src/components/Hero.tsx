import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: -10%;
    width: 500px;
    height: 500px;
    background: var(--primary);
    filter: blur(150px);
    opacity: 0.15;
    pointer-events: none;
  }
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  background: linear-gradient(to right, var(--text-primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  font-weight: 800;
`;

const Subtitle = styled(motion.h2)`
  font-size: 2rem;
  color: var(--accent);
  margin-bottom: 2rem;
  font-weight: 600;
`;

const Description = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  line-height: 1.6;
  color: var(--text-secondary);
`;

const HighlightText = styled.span`
  color: var(--primary-light);
  font-weight: 500;
`;

const Hero = () => {
  return (
    <HeroSection>
      <Title
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hola, soy Juan Carlos
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Desarrollador Front-end Junior
      </Subtitle>
      <Description
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Recién graduado en <HighlightText>Desarrollo de Aplicaciones Web (DAW)</HighlightText>. 
        Me apasiona crear interfaces modernas y accesibles utilizando React y TypeScript. 
        Durante mi formación, he desarrollado diversos proyectos que me han permitido 
        adquirir experiencia práctica en tecnologías como HTML5, CSS3, JavaScript y 
        frameworks modernos. Busco una oportunidad para aplicar mis conocimientos y 
        seguir creciendo como desarrollador.
      </Description>
    </HeroSection>
  );
};

export default Hero; 