import React from 'react'
import { useSelector } from 'react-redux'

import Header from '../containers/admin/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import Home from '../containers/admin/Home/Home'
import Project from '../containers/Project/Project'
import Projects from '../containers/admin/Projects/Projects'
import Messages from '../containers/admin/Messages/Messages'
import Testimonials from '../containers/admin/Testimonials/Testimonials'
import Experience from '../containers/admin/Experience/Experience'

const Dashboard = ({ main }) => {
    const { user } = useSelector((state) => state.auth)

    return (
        <div className='app__dashboard'>
            <Header />
            <div className='dashboard__content'>
                <Sidebar />
                {user &&
                    <>
                        {main === "home" && <Home token={user.token} />}
                        {main === "projects" && <Projects token={user.token} />}
                        {main === "project" && <Project to="admin" token={user.token} />}
                        {main === "messages" && <Messages token={user.token} />}
                        {main === "testimonials" && <Testimonials token={user.token} />}
                        {main === "experiences" && <Experience token={user.token} />}
                    </>
                }
            </div>
        </div>
    )
}

export default Dashboard
