import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import FormGroup from '../../../components/FormGroup/FormGroup'
import "./Experience.scss"

const Experience = ({ token }) => {
    const [formData, setFormData] = useState({
        "year": "",
        "role": "",
        "position": "",
        "organization": "",
        "start": "",
        "end": ""
    })
    const [experiences, setExperiences] = useState([])

    const { year, role, position, organization, start, end } = formData

    useEffect(() => {
        axios.get("http://localhost:4000/api/experiences")
            .then(res => res.data)
            .then(data => {
                setExperiences(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (year === "" || role === "" || position === "" || organization === "" || start === "" || end === "") {
            toast.error("All fields are required!")
        } else {
            axios.post("http://localhost:4000/api/experiences", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.data)
                .then(data => {
                    console.log(data);
                    setExperiences(data.data)
                    toast.success(data.message)
                    setFormData({
                        "year": "",
                        "role": "",
                        "position": "",
                        "organization": "",
                        "start": "",
                        "end": ""
                    })
                }).catch(err => {
                    console.log(err)
                    toast.error(err.response.data.message)
                })
        }


    }


    return (
        <div id="experiences-page">
            {experiences && (
                <div className="experience-list">
                    {experiences.map((experience, index) => (
                        <div className='list__experience-item' key={`${index}-list`}>
                            <div className='item__year'>{experience.year}</div>
                            <div className='item__contents'>
                                {experience.ExperienceItems.map((experienceItem, index) => (
                                    <div className='item__content' key={`${index}-item`}>
                                        <div className='item__position'>{experienceItem.position}</div>
                                        <div className='item__company'>{experienceItem.company}</div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <h2>Add new Experience</h2>
                <FormGroup type="number" id="year" name="year" placeholder="" title="Year" value={formData.year} handleChange={handleChange} />
                <FormGroup type="text" id="role" name="role" placeholder="" title="Role" value={formData.role} handleChange={handleChange} />
                <FormGroup type="text" id="position" name="position" placeholder="" title="Position" value={formData.position} handleChange={handleChange} />
                <FormGroup type="text" id="organization" name="organization" placeholder="" title="Organization" value={formData.organization} handleChange={handleChange} />
                <FormGroup type="date" id="start" name="start" placeholder="" title="Start Date" value={formData.start} handleChange={handleChange} />
                <FormGroup type="date" id="end" name="end" placeholder="" title="End Date" value={formData.end} handleChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Experience
