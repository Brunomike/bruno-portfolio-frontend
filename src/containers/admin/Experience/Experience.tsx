import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import FormGroup from '../../../components/FormGroup/FormGroup';
import "./Experience.scss";
import baseUrl from '../../../constants';

interface ExperienceItemAttrs {
    year?: string;
    role: string;
    position: string;
    organization: string;
    abbreviation: string;
    startDate: string;
    endDate: string;
}

interface ExperienceAttrs {
    year: string;
    experiences: ExperienceItemAttrs[]
}

const Experience = () => {
    const [formData, setFormData] = useState<ExperienceItemAttrs>({
        year: "",
        role: "",
        position: "",
        organization: "",
        abbreviation: "",
        startDate: "",
        endDate: ""
    })
    const [experiences, setExperiences] = useState<ExperienceAttrs[]>([])

    const { year, role, position, organization, startDate, endDate } = formData

    useEffect(() => {
        axios.get(baseUrl + "api/experiences")
            .then(res => res.data)
            .then((data) => {
                setExperiences(data.data.experiences);
            })
            .catch(err => {
                //console.log(err)
            })
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))        
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (year === "" || role === "" || position === "" || organization === "" || startDate === "" || endDate === "") {            
            toast.error("All fields are required!")
        } else {                    
            axios.post(baseUrl + "api/experiences", formData, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
                .then(res => res.data)
                .then(data => {
                    setExperiences(data.data.experiences);
                    toast.success(data.message);
                    setFormData({
                        year: "",
                        role: "",
                        position: "",
                        organization: "",
                        abbreviation: "",
                        startDate: "",
                        endDate: ""
                    })
                }).catch(err => {
                    toast.error(err.response.data.message);
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
                                {experience.experiences.map((experienceItem, index) => (
                                    <div className='item__content' key={`${index}-item`}>
                                        <div className='item__position'>{experienceItem.position}</div>
                                        <div className='item__company'>{experienceItem.organization}</div>
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
                <FormGroup type="text" id="abbreviation" name="abbreviation" placeholder="" title="Abbreviation" value={formData.abbreviation} handleChange={handleChange} />
                <FormGroup type="date" id="start" name="startDate" placeholder="" title="Start Date" value={formData.startDate} handleChange={handleChange} />
                <FormGroup type="date" id="end" name="endDate" placeholder="" title="End Date" value={formData.endDate} handleChange={handleChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Experience;
