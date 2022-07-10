import React from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import { Portfolio, Resume, Testimonial, SignUp, Login, Dashboard, Project, NotFound } from '../pages'

function RequireAuth({ children }) {
    const location = useLocation()
    const user = localStorage.getItem("user")

    return user !== null ? children : <Navigate to="/signin" replace />;
}

function AnimatedRoutes({ theme, handleThemeSelection }) {
    const location = useLocation()
    const user = localStorage.getItem("user")
    
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Portfolio theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="resume" element={<Resume theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="project/:id" element={<Project to="client" theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="testimonial" element={<Testimonial to="client" theme={theme} handleThemeSelection={handleThemeSelection} />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="signin" element={<Login />} />

                <Route path="dashboard" element={<RequireAuth><Dashboard main="home" user={user} /></RequireAuth>} />
                <Route path="dashboard/projects" element={<RequireAuth><Dashboard main="projects" user={user} /></RequireAuth>} />
                <Route path="dashboard/projects/:id" element={<RequireAuth><Dashboard main="project" user={user} /></RequireAuth>} />
                <Route path="dashboard/messages" element={<RequireAuth> <Dashboard main="messages" user={user} /></RequireAuth>} />
                <Route path="dashboard/experiences" element={<RequireAuth> <Dashboard main="experiences" user={user} /></RequireAuth>} />
                <Route path="dashboard/testimonials" element={<RequireAuth> <Dashboard main="testimonials" user={user} /></RequireAuth>} />

                <Route path="*" element={< NotFound />} theme={theme} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes