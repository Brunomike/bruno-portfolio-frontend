import React from 'react'
import { Link } from 'react-router-dom'
import { AiFillDashboard, AiFillMessage, AiFillProject, AiOutlineComment,AiOutlineUnorderedList } from 'react-icons/ai'

const Sidebar = () => {
    return (
        <div className='dashboard__sidebar app__flex' id='sidebar'>
            <div className='sidebar__item-container'>
                <Link to={"/dashboard"}>
                    <AiFillDashboard />
                    <div>Home</div>
                </Link>
            </div>
            <div className='sidebar__item-container'>
                <Link to={"/dashboard/messages"}>
                    <AiFillMessage />
                    <div>Messages</div>
                </Link>
            </div>
            <div className='sidebar__item-container'>
                <Link to={"/dashboard/projects"}>
                    <AiFillProject />
                    <div>Projects</div>
                </Link>
            </div>
            <div className='sidebar__item-container'>
                <Link to={"/dashboard/testimonials"}>
                    <AiOutlineComment />
                    <div>Testimonials</div>
                </Link>
            </div>
            <div className='sidebar__item-container'>
                <Link to={"/dashboard/experiences"}>
                    <AiOutlineUnorderedList />
                    <div>Experiences</div>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar
