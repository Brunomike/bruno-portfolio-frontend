import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import Header from '../containers/admin/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import Home from '../containers/admin/Home/Home'
import Project from '../containers/Project/Project'
import Projects from '../containers/admin/Projects/Projects'
import Messages from '../containers/admin/Messages/Messages'
import Testimonials from '../containers/admin/Testimonials/Testimonials'
import Experience from '../containers/admin/Experience/Experience'


interface DashboardProps {
    main: string;
    handleThemeSelection(): void;
}

const Dashboard = ({ main, handleThemeSelection }: DashboardProps) => {
    const { user } = useSelector((state: { auth: any }) => state.auth);
    let isAuthenticated = localStorage.getItem("isAuthenticated");

    if (!isAuthenticated) {
        return <Navigate to="/signin" />
    }

    return (
        <div className='app__dashboard'>
            <Header />
            <div className='dashboard__content'>
                <Sidebar />
                {user &&
                    <>
                        {main === "home" && <Home />}
                        {main === "projects" && <Projects />}
                        {main === "project" && <Project to="admin"  theme={''} handleThemeSelection={handleThemeSelection} />}
                        {main === "messages" && <Messages />}
                        {main === "testimonials" && <Testimonials />}
                        {main === "experiences" && <Experience />}
                    </>
                }
            </div>
        </div>
    )
}

export default Dashboard;
