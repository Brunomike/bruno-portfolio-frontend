import React, { lazy } from 'react';
import { motion } from 'framer-motion';

const Header = lazy(() => import('../containers/Header/Header'));
const Introduction = lazy(() => import('../containers/Introduction/Introduction'));
const About = lazy(() => import('../containers/About/About'));
const Skills = lazy(() => import('../containers/Skills/Skills'));
const Projects = lazy(() => import('../containers/Projects/Projects'));
const Testimonials = lazy(() => import('../containers/Testimonials/Testimonials'));
const Contact = lazy(() => import('../containers/Contact/Contact'));
const Footer = lazy(() => import('../containers/Footer/Footer'));

interface HomeProps {
    theme: string;
    handleThemeSelection(): void
}

const Home: React.FC<HomeProps> = ({ theme, handleThemeSelection }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Header theme={theme} handleThemeSelection={handleThemeSelection} />
            <Introduction />
            <About />
            <Skills />
            <Projects />
            <Testimonials />
            <Contact />
            <Footer />
        </motion.div>
    )
}

export default Home
