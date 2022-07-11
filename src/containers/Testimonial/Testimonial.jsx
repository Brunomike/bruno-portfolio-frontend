import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import FormGroup from '../../components/FormGroup/FormGroup'
import './Testimonial.scss'

const Testimonial = () => {
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        feedback: "",
        company: "",
        role: "",
        phoneNumber: "",
        portfolioLink: ""
    })
    const [selectedFile, setSelectedFile] = useState(null)

    const navigate = useNavigate()


    useEffect(() => {
        let queryParams = window.location.search
        if (!queryParams.includes("token")) {
            navigate('/#contact')
            toast.error("Contact me to get valid url with token for testimonial submission!")
        }
    }, [navigate])


    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    let token = window.location.search.split("=")[1]

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newFormData = new FormData()

        for (const name in formData) {
            newFormData.append(name, formData[name])
        }

        if (selectedFile) {
            newFormData.append("uploadedImages", selectedFile, selectedFile.name)
        }

        axios.post("http://localhost:4000/api/testimonials", newFormData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.data)
            .then(data => {
                toast.success("Testimonial sent successfully!")
                navigate('/#testimonials')
            })
            .catch(err => {
                toast.error("Failed to send testimonial!")
            })

    }

    return (
        <div className='app__flex testimonial' id='testimonials'>
            <form onSubmit={handleSubmit}>
                <h2 style={{ paddingBottom: "8px" }}>Fill Testimonial</h2>
                <FormGroup title={"Full Name"} type="text" name="fullName" placeholder="" handleChange={handleChange} value={formData.fullName} />
                <FormGroup title={"Email Address"} type="email" name="email" placeholder="" handleChange={handleChange} value={formData.email} />
                <FormGroup title={"Phone Number"} type="text" name="phoneNumber" placeholder="" handleChange={handleChange} value={formData.phoneNumber} />
                <FormGroup title={"Feedback"} type="text" name="feedback" placeholder="" handleChange={handleChange} value={formData.feedback} />
                <FormGroup title={"Company"} type="text" name="company" placeholder="" handleChange={handleChange} value={formData.company} />
                <input type="file" name="uploadedImages" onChange={handleFileInput} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Testimonial
