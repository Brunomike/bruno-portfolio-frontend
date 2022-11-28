import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'

import baseUrl from '../../../constants'
import FormGroup from '../../../components/FormGroup/FormGroup'
import './Projects.scss'

interface TagAttrs {
    _id: string;
    title: string;
}

interface ProjectAttrs {
    title: string;
    description: string;
    overview: string;
    liveLink: string;
    codeLink: string;
    imageUrl: string;
    projectImageUrl: string;
    category: string;
    tags: TagAttrs[];
    _id: string;
}

const Projects = () => {
    const [formData, setFormData] = useState({
        title: "",
        overview: "",
        description: "",
        liveLink: "",
        codeLink: "",
        category: ""
    })



    const { title, overview, description, liveLink, codeLink, category } = formData
    const [avatar, setAvatar] = useState<File>()
    const [previewImage, setPreviewImage] = useState<File>()
    const [projects, setProjects] = useState<ProjectAttrs[]>([])

    useEffect(() => {
        axios.get(baseUrl + "api/projects")
            .then(res => res.data)
            .then(data => {
                setProjects(data.data.projects)
            })
    }, [])


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newFormData = new FormData();

        if (title === "" || overview === "" || description === "" || codeLink === "" || category === "") {
            toast.error("All fields are required!")
        } else {
            if (previewImage && avatar) {
                newFormData.append("title", formData['title']);
                newFormData.append("overview", formData['overview']);
                newFormData.append("description", formData['description']);
                newFormData.append("liveLink", formData['liveLink']);
                newFormData.append("codeLink", formData['codeLink']);
                newFormData.append("category", formData['category']);

                newFormData.append('uploadedImages', previewImage, previewImage.name)
                newFormData.append('uploadedImages', avatar, avatar.name)

                axios.post(baseUrl + "api/projects", newFormData, { withCredentials: true })
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
            } else {
                toast.error("Please provide the project images");
            }
        }
    }

    const handleDelete = (e: React.FormEvent, id: string) => {
        e.preventDefault()
        axios.delete(baseUrl + "api/projects/" + id, { withCredentials: true })
            .then(res => res.data)
            .then(data => {
                clear()
                let newProjects = projects.filter(project => project._id !== id)
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
            category: ""
        })
        setAvatar(undefined)
        setPreviewImage(undefined)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setAvatar(e.target.files[0])
        }
    }

    const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPreviewImage(e.target.files[0])
        }
    }

    return (
        <div className='dashboard__main'>
            <div className='projects__container'>
                <div className='projects__list'>
                    {projects.length > 0 &&
                        projects.map((project, index) => (
                            <Link to={`/dashboard/projects/${project._id}`} key={`${index}`}>
                                <div className='card project__item'>
                                    <img src={`${baseUrl}images/${project.imageUrl.replace('\\', '/')}`} alt={project.title} />
                                    <div className='project__content'>
                                        <h3>{project.title}</h3>
                                        <p>{project.overview}</p>
                                        <div className='project__tags'>
                                            {project.tags.map((tag, index) => (
                                                <div className='project__tag' key={`${index}-`}>{tag.title}</div>
                                            ))}
                                        </div>
                                        <BsFillTrashFill onClick={(e) => handleDelete(e, project._id)} />
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
                        <FormGroup title={"Title"} id="title" type="text" name={"title"} placeholder="" handleChange={handleChange} value={formData.title} />
                        <FormGroup title={"Overview"} id="overview" type="text" name={"overview"} placeholder="" handleChange={handleChange} value={formData.overview} />
                        <FormGroup title={"Description"} id="description" type="text" name={"description"} placeholder="" handleChange={handleChange} value={formData.description} />
                        <FormGroup title={"Live Link"} id="liveLink" type="text" name={"liveLink"} placeholder="" handleChange={handleChange} value={formData.liveLink} />
                        <FormGroup title={"Code Link"} id="codeLink" type="text" name={"codeLink"} placeholder="" handleChange={handleChange} value={formData.codeLink} />
                        <label htmlFor="category">Choose Project Category</label>
                        <select name={"category"} id="category" value={category} onChange={handleChange}>
                            <option value="front-end" defaultValue={"front-end"}>Front End</option>
                            <option value="mobile app">Mobile App</option>
                            <option value="back-end">Back End</option>
                            <option value="full-stack">Full Stack</option>
                        </select>
                        <FormGroup title={"Project Avater"} type="file" name="projectAvatar" id="projectAvatar" handleChange={handleAvatarChange} />
                        <FormGroup title={"Project Preview"} type="file" name="projectPreview" id="projectPreview" handleChange={handlePreviewChange} />
                        {/* <label htmlFor="uploadedImages">Project Avatar </label>
                        <input type="file" name="projectAvatar" onChange={handleAvatarChange} />
                        <label htmlFor="uploadedImages">Project Preview </label>
                        <input type="file" name="projectPreview" onChange={handlePreviewChange} /> */}
                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default Projects
