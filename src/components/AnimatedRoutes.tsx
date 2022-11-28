import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Portfolio, Resume, Testimonial, SignUp, Login, Dashboard, Project, NotFound } from '../pages'

interface User {
    email: string;
    id: string;
    name: string;
}

const user = localStorage.getItem("user");
const isAuthenticated = localStorage.getItem("isAuthenticated");

interface Props {
    theme: string
    handleThemeSelection(): void
}

const AnimatedRoutes: React.FC<Props> = ({ theme, handleThemeSelection }) => {
    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Portfolio theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="resume" element={<Resume theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="project/:id" element={<Project to="client" theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="testimonial" element={<Testimonial />} />
                <Route path="signin" element={<Login />} />
                <Route path="signup" element={<SignUp />} />


                {
                    isAuthenticated ? (
                        <>
                            <Route path="dashboard" element={<Dashboard main="home" handleThemeSelection={handleThemeSelection} />} />
                            <Route path="dashboard/projects" element={<Dashboard main="projects" handleThemeSelection={handleThemeSelection} />} />
                            <Route path="dashboard/projects/:id" element={<Dashboard main="project" handleThemeSelection={handleThemeSelection} />} />
                            <Route path="dashboard/messages" element={<Dashboard main="messages" handleThemeSelection={handleThemeSelection} />} />
                            <Route path="dashboard/experiences" element={<Dashboard main="experiences" handleThemeSelection={handleThemeSelection} />} />
                            <Route path="dashboard/testimonials" element={<Dashboard main="testimonials" handleThemeSelection={handleThemeSelection} />} />
                        </>
                    ) : (                        
                        <Route path="*" element={< NotFound theme={theme}  isUnauthorized={true} />} />
                    )
                }

                <Route path="*" element={< NotFound theme={theme} />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
