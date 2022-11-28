import React from 'react';
import { motion } from 'framer-motion';

import Header from '../containers/Header/Header';
import Introduction from '../containers/Introduction/Introduction';
import About from '../containers/About/About';
import Skills from '../containers/Skills/Skills';
import Projects from '../containers/Projects/Projects';
import Testimonials from '../containers/Testimonials/Testimonials';
import Contact from '../containers/Contact/Contact';
import Footer from '../containers/Footer/Footer';

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
