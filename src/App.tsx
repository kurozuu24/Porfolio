import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './styles/App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
import Welcome from './components/Welcome';
import styled from 'styled-components';

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: var(--background);
  color: var(--text-secondary);
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

function App() {
  const location = useLocation();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleStart = () => {
    setShowWelcome(false);
  };

  if (showWelcome) {
    return <Welcome onStart={handleStart} />;
  }

  return (
    <MainContainer>
      <Navbar />
      <ContentContainer>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Hero />} />
            <Route path="/sobre-mi" element={<AboutMe />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/contacto" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
