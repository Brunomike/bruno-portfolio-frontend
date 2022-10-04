import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'

import baseUrl from '../../../constants'
import FormGroup from '../../../components/FormGroup/FormGroup'
import './Projects.scss'

const Projects = ({ token }) => {
    const [formData, setFormData] = useState({
        title: "",
        overview: "",
        description: "",
        liveLink: "",
        codeLink: "",
        category: ""
    })

    const { title, overview, description, codeLink, category } = formData
    const [avatar, setAvatar] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        axios.get(baseUrl + "api/projects")
            .then(data => {
                setProjects(data.data.data)
            })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();

        const newFormData = new FormData();

        for (const name in formData) {
            newFormData.append(name, formData[name]);
        }

        if (title === "" || overview === "" || description === "" || codeLink === "" || category === "") {
            toast.error("All fields are required!")
        } else {

            newFormData.append('uploadedImages', previewImage, previewImage.name)
            newFormData.append('uploadedImages', avatar, avatar.name)

            axios.post(baseUrl + "api/projects", newFormData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    clear()
                    toast.success(data.message)
                })
                .catch(err => {
                    if (err.response.data) {
                        //console.log(err.response.data);
                        //toast.error("Something went wrong!")
                        toast.error(err.response.data.message)
                    } else {
                        // console.log({ error: err })
                        // console.log(err.response)
                        toast.error("Something went wrong!")
                    }
                })
        }
    }

    const handleDelete = (e, id) => {
        e.preventDefault()
        axios.delete(baseUrl + "api/projects/" + id, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .then(data => {
                clear()
                let newProjects = projects.filter(project => project.id !== id)
                setProjects(newProjects)
                toast.success(data.message)
            })
            .catch(err => {
                toast.error(err.response.data.message)
            })
    }

    const clear = () => {
        setFormData({
            title: "",
            overview: "",
            description: "",
            liveLink: "",
            codeLink: "",
        })
        setAvatar(null)
        setPreviewImage(null)
    }

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleAvatarChange = (e) => {
        setAvatar(e.target.files[0])
    }

    const handlePreviewChange = (e) => {
        setPreviewImage(e.target.files[0])
    }

    return (
        <div className='dashboard__main'>
            <div className='projects__container'>
                <div className='projects__list'>
                    {projects.length > 0 &&
                        projects.map((project, index) => (
                            <Link to={`/dashboard/projects/${project.id}`} key={`${index}`}>
                                <div className='card project__item'>
                                    <img src={`${baseUrl}images/${project.imageUrl.replace('\\', '/')}`} alt={project.title} />
                                    <div className='project__content'>
                                        <h3>{project.title}</h3>
                                        <p>{project.overview}</p>
                                        <div className='project__tags'>
                                            {project.Tags.map((tag, index) => (
                                                <div className='project__tag' key={`${index}-`}>{tag.name}</div>
                                            ))}
                                        </div>
                                        <BsFillTrashFill onClick={(e) => handleDelete(e, project.id)} />
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className=''>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <h2>Add New Project</h2>
                        <br />
                        <FormGroup title={"Title"} type="text" name={"title"} placeholder="" handleChange={handleChange} value={formData.title} />
                        <FormGroup title={"Overview"} type="text" name={"overview"} placeholder="" handleChange={handleChange} value={formData.overview} />
                        <FormGroup title={"Description"} type="text" name={"description"} placeholder="" handleChange={handleChange} value={formData.description} />
                        <FormGroup title={"Live Link"} type="text" name={"liveLink"} placeholder="" handleChange={handleChange} value={formData.liveLink} />
                        <FormGroup title={"Code Link"} type="text" name={"codeLink"} placeholder="" handleChange={handleChange} value={formData.codeLink} />
                        <label htmlFor="category">Choose Project Category</label>
                        <select name={"category"} id="category" value={category} onChange={handleChange}>
                            <option value="front-end" defaultValue>Front End</option>
                            <option value="mobile app">Mobile App</option>
                            <option value="back-end">Back End</option>
                            <option value="full-stack">Full Stack</option>
                        </select>
                        <label htmlFor="uploadedImages">Project Avatar </label>
                        <input type="file" name="projectAvatar" onChange={handleAvatarChange} />
                        <label htmlFor="uploadedImages">Project Preview </label>
                        <input type="file" name="projectPreview" onChange={handlePreviewChange} />
                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Projects
