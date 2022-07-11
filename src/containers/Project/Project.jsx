import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import ProjectPreview from '../../components/ProjectPreview/ProjectPreview'
import './Project.scss'

const Project = ({ to, theme, handleThemeSelection ,token}) => {
    const [project, setProject] = useState(null)
    const [imageList, setImageList] = useState(null)
    const [skill, setSkill] = useState("")
    const params = useParams()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/projects/${params.id}`)
            .then(res => res.data.data)
            .then(data => {
                setProject(data)
            })
    }, [params.id])

    const handleFormSubmit = (e, source) => {
        e.preventDefault()
        if (source !== "skill") {
            const formData = new FormData()
            formData.append("projectId", project.id)

            Array.from(imageList).forEach(file => {

                formData.append("uploadedImages", file, file.name)
            });

            axios.post("http://localhost:4000/api/images", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    toast.success(data.message)
                })
                .catch(err => {
                    toast.error("Failed to add image(s)!")
                })


        } else {
            const data = {
                projectUUID: project.uuid,
                tag: skill
            }
            axios.post("http://localhost:4000/api/projects/tags", data, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    toast.success(data.message)
                    setProject((prevState) => ({
                        ...prevState,
                        ["Tags"]: data.data
                    }))
                    setSkill("")
                })
                .catch(err => {
                    toast.error("Filed to add new skill!")
                })

        }

    }

    const handleFilesInputChage = (e) => {
        setImageList(e.target.files)
    }

    const handleSkillChange = (e) => {
        setSkill(e.target.value)
    }



    switch (to) {
        case "client":
            return (
                <>
                    <Header theme={theme} handleThemeSelection={handleThemeSelection} />
                    {project !== null ?
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
                                                    {project.Tags.length > 0 ?
                                                        project.Tags.map((tag, index) => (
                                                            <div className="skills__skill" key={index}>{tag.name}</div>
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
                                                    <a href={project.liveLink} target="_blank" className='links__link'>LIVE LINK</a>
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
                                <div className="app__section app__flex" styles={{ alignItems: "center", justifyContent: "center" }}>
                                    <div>Project not found</div>
                                </div>
                            </>
                        )}
                    <Footer />
                </>
            )
            break;
        case "admin":
            return (
                <div className="admin-project__container">
                    {project !== null ?
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
                                                    {project.Tags.length > 0 ?
                                                        project.Tags.map((tag, index) => (
                                                            <div className="skills__skill" key={index}>{tag.name}</div>
                                                        ))
                                                        :
                                                        (
                                                            <div className="skills__skill">No skills found!</div>
                                                        )
                                                    }
                                                    <form onSubmit={(e) => handleFormSubmit(e, "skill")} >
                                                        <label>Add Skill</label>
                                                        <input type="text" name="skill" onChange={handleSkillChange} value={skill} multiple />
                                                        <button type="submit">Submit</button>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className='project-details__links project-details__item'>
                                                <h2 className='project-details__content-title'>See Live</h2>
                                                <div className='links'>
                                                    <a href={project.liveLink} target="_blank" className='links__link'>LIVE LINK</a>
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
                                <div className="app__section app__flex" styles={{ alignItems: "center", justifyContent: "center" }}>
                                    <div>Project not found</div>
                                </div>
                            </>
                        )}
                    <form onSubmit={(e) => handleFormSubmit(e, "")} >
                        <label>Image</label>
                        <input type="file" name="uploadedImages" onChange={handleFilesInputChage} multiple />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            )
            break;

    }
}

export default Project
