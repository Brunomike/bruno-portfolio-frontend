import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Portfolio, Resume, Testimonial, SignUp, Login, Dashboard, Project, NotFound } from '../pages'

const user = localStorage.getItem("user")
const isAuthenticated = localStorage.getItem("isAuthenticated")

function AnimatedRoutes({ theme, handleThemeSelection }) {
    const location = useLocation()

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Portfolio theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="resume" element={<Resume theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="project/:id" element={<Project to="client" theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="testimonial" element={<Testimonial to="client" theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="signin" element={<Login />} />
                <Route path="signup" element={<SignUp />} />

                
                {
                    isAuthenticated && (
                        <>
                            <Route path="dashboard" element={<Dashboard main="home" user={user} />} />
                            <Route path="dashboard/projects" element={<Dashboard main="projects" user={user} />} />
                            <Route path="dashboard/projects/:id" element={<Dashboard main="project" user={user} />} />
                            <Route path="dashboard/messages" element={<Dashboard main="messages" user={user} />} />
                            <Route path="dashboard/experiences" element={<Dashboard main="experiences" user={user} />} />
                            <Route path="dashboard/testimonials" element={<Dashboard main="testimonials" user={user} />} />
                        </>
                    )
                }

                <Route path="*" element={< NotFound />} theme={theme} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes
