import { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import baseUrl from '../../constants';
import AppWrapper from '../../hoc/AppWrapper';
import MotionWrapper from '../../hoc/MotionWrapper';
import './Projects.scss';

interface TagAttrs {
    _id: string;
    title: string;
}

interface ProjectAttrs {
    _id: string;
    title: string;
    description: string;
    overview: string;
    liveLink: string;
    codeLink: string;
    imageUrl: string;
    projectImageUrl: string;
    category: string;
    tags: TagAttrs[];
}

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
    const [projects, setProjects] = useState<ProjectAttrs[]>([]);
    const [filterProjects, setFilterProjects] = useState<ProjectAttrs[]>([]);

    useEffect(() => {
        axios.get(baseUrl + "api/projects")
            .then((res) => res.data.data)
            .then(data => {
                setProjects(data.projects);
                setFilterProjects(data.projects);
            });
    }, []);

    const handleProjectFilter = (item: string) => {
        setActiveFilter(item);
        setAnimateCard({ y: 100, opacity: 0 });
        setTimeout(() => {
            setAnimateCard({ y: 0, opacity: 1 });
            if (item === 'All') {
                setFilterProjects(projects);
            } else {
                setFilterProjects(projects.filter((project) => project.category.toLowerCase() === item.toLowerCase()));
            }
        }, 500);
    };
    return (
        <section className='app__flex projects'>
            <h2>Projects</h2>
            <div className='app__projects-filter'>
                {['Front-End', 'Mobile App', 'Back-End', 'Full-stack', 'All'].map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleProjectFilter(item)}
                        className={`app__project-filter-item app__flex p-text ${activeFilter === item ? 'item-active' : ''}`} >
                        {item}
                    </div>
                ))}
            </div>
            <motion.div
                animate={animateCard}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className="app__project-portfolio"
            >
                {filterProjects.length > 0 ?
                    filterProjects.map((project, index) => (
                        <div className='app__project-item app_flex' key={index}>
                            <div className='app__project-img app__flex'>
                                <img src={`${baseUrl}images/${project.imageUrl}`} alt={project.title} />
                                <motion.div
                                    whileHover={{ opacity: [0, 1] }}
                                    transition={{ duration: 0.25, ease: 'easeInOut', staggerChildren: 0.5 }}
                                    className="app__project-hover app__flex"
                                >
                                    <a href={project.liveLink} target="_blank" rel="noreferrer">
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.9] }}
                                            transition={{ duration: 0.25 }}
                                            className='app__flex'
                                        >
                                            <AiFillEye />
                                        </motion.div>
                                    </a>
                                    <a href={project.codeLink} target="_blank" rel="noreferrer">
                                        <motion.div
                                            whileInView={{ scale: [0, 1] }}
                                            whileHover={{ scale: [1, 0.9] }}
                                            transition={{ duration: 0.25 }}
                                            className='app__flex'
                                        >
                                            <AiFillGithub />
                                        </motion.div>
                                    </a>
                                </motion.div>
                            </div>

                            <Link to={`/project/${project._id}`} className="nav-link"  >
                                <div className='app__project-content app__flex'>
                                    <h4 className='bold-text'>{project.title}</h4>
                                    {/* <p className='p-text' style={{ marginTop: 10 }}>{project.overview.length > 100 ? project.overview.slice(0, 99) + "..." : project.overview}</p> */}                                    
                                    <div className='app__project-tag app__flex'>
                                        <p className='p-text'>{`${project.category.charAt(0).toUpperCase() + project.category.slice(1)}`}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                    :
                    (
                        <div className='project__empty'>
                            No Project(s) Found in this category!
                        </div>
                    )
                }
                {projects.length > 3 &&
                    <Link to={`/projects`} className='projects_more'>
                        View More
                    </Link>
                }
            </motion.div>
        </section>
    )
}

export default AppWrapper(
    MotionWrapper(Projects),
    'projects',
    'app__section'
)
