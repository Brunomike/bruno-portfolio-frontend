import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import TagsInput from 'react-tagsinput';
import axios from 'axios'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProjectPreview from '../../components/ProjectPreview/ProjectPreview'
import './Project.scss'
import baseUrl from '../../constants'
import FormGroup from '../../components/FormGroup/FormGroup'
import 'react-tagsinput/react-tagsinput.css'

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

interface ProjectProps {
    to: string;
    theme: string;
    handleThemeSelection: () => void;    
}

const Project:React.FC<ProjectProps> = ({ to, theme, handleThemeSelection }) => {
    const [project, setProject] = useState<ProjectAttrs | null>()
    const [imageList, setImageList] = useState<File[]>([])
    const [skills, setSkills] = useState<string[]>([])
    const params = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        axios.get(`${baseUrl}api/projects/${params.id}`)
            .then(res => res.data.data)
            .then(data => {
                setProject(data.project)
            })
    }, [params.id])

    const handleFormSubmit = (e: React.FormEvent, source: string) => {
        e.preventDefault()
        if (project) {
            if (source !== "skill") {
                const formData = new FormData()
                formData.append("projectId", project._id)

                if (imageList) {
                    Array.from(imageList).forEach(file => {
                        formData.append("uploadedImages", file, file.name);
                    });
                }

                axios.post(baseUrl + "api/images", formData, { withCredentials: true })
                    .then(res => res.data)
                    .then(data => {
                        toast.success(data.message)
                    })
                    .catch(err => {
                        toast.error("Failed to add image(s)!")
                    })
            } else {
                const data = {
                    projectId: project._id,
                    tags: skills
                }
                axios.post(baseUrl + "api/projects/tags", data, { withCredentials: true })
                    .then(res => res.data)
                    .then(data => {
                        toast.success(data.message);
                        const existingTags = [...project.tags];
                        const updatedTags = [...existingTags]

                        for (const tag of data.data.tags) {
                            updatedTags.push(tag);
                        }
                        const prevProjectState = { ...project };
                        prevProjectState.tags = updatedTags;

                        setProject(prevProjectState);
                        setSkills([]);

                        // if (project) {
                        //     setProject(prevState => ({
                        //         ...prevState,
                        //         tags: updatedTags
                        //     }));
                        //     setSkills("");
                        // }

                    })
                    .catch(err => {
                        toast.error("Failed to add new skills!")
                    })
            }
        }
    }

    const handleFilesInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = [...e.target.files]
            setImageList(files);
        }
    }

    const handleSkillChange = (skills: string[]) => {        
        setSkills(skills)        
    }

    if (to === "client") {
        return (
            <React.Fragment>
                <Header theme={theme} handleThemeSelection={handleThemeSelection} />
                {project ?
                    (
                        <>
                            <div className='app__section dark__section app__flex' id='project-item'>
                                <h1>{project.title}</h1>
                                <p>This page contains the case study of {project.title} which includes the Project Overview, Tools Used and Live Links to the official product.</p>
                                <a href={project.liveLink} target="_blank">LIVE LINK</a>
                            </div>
                            <div className='app__section' >
                                <div id='project-details__content'>
                                    <ProjectPreview imageUrl={project.projectImageUrl} />

                                    <div className='project-details__content-main'>
                                        <div className='project-details__desc project-details__item'>
                                            <h2 className='project-details__content-title'>Project Overview</h2>
                                            <p>{project.overview}</p>
                                        </div>
                                        <div className='project-details__desc project-details__item'>
                                            <h2 className='project-details__content-title'>Project Description</h2>
                                            <p>{project.description}</p>
                                        </div>
                                        <div className='prfoject-details__tools project-details__item'>
                                            <h2 className='project-details__content-title'>Tools Used</h2>

                                            <div className="skills">
                                                {project.tags.length > 0 ?
                                                    project.tags.map((tag, index) => (
                                                        <div className="skills__skill" key={index}>{tag.title}</div>
                                                    ))
                                                    :
                                                    (
                                                        <div className="skills__skill">No skills found!</div>
                                                    )
                                                }

                                            </div>
                                        </div>
                                        <div className='project-details__links project-details__item'>
                                            <h2 className='project-details__content-title'>See Live</h2>
                                            <div className='links'>
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" className='links__link'>LIVE LINK</a>
                                                <Link to={"/#projects"} className='links__link'>GO BACK</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="app__section app__flex" style={{ alignItems: "center", justifyContent: "center" }}>
                                <div>Project not found</div>
                            </div>
                        </>
                    )}
                <Footer />
            </React.Fragment>
        )
    } else {
        return (
            <div className="admin-project__container">
                {project ?
                    (
                        <>
                            <div className='app__section dark__section app__flex' id='project-item'>
                                <h1>{project.title}</h1>
                                <p>This page contains the case study of {project.title} which includes the Project Overview, Tools Used and Live Links to the official product.</p>
                                <a href={project.liveLink}>LIVE LINK</a>
                            </div>
                            <div className='app__section' >
                                <div id='project-details__content'>
                                    <ProjectPreview imageUrl={project.projectImageUrl} />

                                    <div className='project-details__content-main'>
                                        <div className='project-details__desc project-details__item'>
                                            <h2 className='project-details__content-title'>Project Overview</h2>
                                            <p>{project.overview}</p>
                                        </div>
                                        <div className='project-details__desc project-details__item'>
                                            <h2 className='project-details__content-title'>Project Description</h2>
                                            <p>{project.description}</p>
                                        </div>
                                        <div className='project-details__tools project-details__item'>
                                            <h2 className='project-details__content-title'>Tools Used</h2>

                                            <div className="skills">
                                                {project.tags.length > 0 ?
                                                    project.tags.map((tag, index) => (
                                                        <div className="skills__skill" key={index}>{tag.title}</div>
                                                    ))
                                                    :
                                                    (
                                                        <div className="skills__skill">No skills found!</div>
                                                    )
                                                }
                                                <form onSubmit={(e) => handleFormSubmit(e, "skill")} >
                                                    <TagsInput  value={skills} onChange={handleSkillChange} />                                                
                                                    <button type="submit">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                        <div className='project-details__links project-details__item'>
                                            <h2 className='project-details__content-title'>See Live</h2>
                                            <div className='links'>
                                                <a href={project.liveLink} target="_blank" rel="noreferrer" className='links__link'>LIVE LINK</a>
                                                <Link to={"/#projects"} className='links__link'>GO BACK</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <div className="app__section app__flex" style={{ alignItems: "center", justifyContent: "center" }}>
                                <div>Project not found</div>
                            </div>
                        </>
                    )}
                <form onSubmit={(e) => handleFormSubmit(e, "")} >                    
                    <FormGroup title={"Project Image(s)"} id="image" type="file" name="uploadedImages" handleChange={handleFilesInputChage} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default Project;
