import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import baseUrl from '../../constants';
import FormGroup from '../../components/FormGroup/FormGroup';
import './Testimonial.scss';

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

    const { email, fullName, feedback, role } = formData;
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const navigate = useNavigate()


    useEffect(() => {
        let queryParams = window.location.search
        if (!queryParams.includes("token")) {
            navigate('/#contact')
            toast.error("Contact me to get valid url with token for testimonial submission!")
        }
    }, [navigate])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    let token = window.location.search.split("=")[1]

    const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFile(e.target.files[0]);
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (email === "" || fullName === "" || feedback === "" || role === "") {
            toast.error('Please fill all required fields');
        }
        const newFormData = new FormData()

        // for (const name in formData) {
        //     newFormData.append(name, formData[name]);
        // }

        newFormData.append("email", formData['email']);
        newFormData.append("fullName", formData['fullName']);
        newFormData.append("feedback", formData['feedback']);
        newFormData.append("company", formData['company']);
        newFormData.append("role", formData['role']);
        newFormData.append("phoneNumber", formData['phoneNumber']);
        newFormData.append("portfolioLink", formData['portfolioLink']);

        if (selectedFile) {
            newFormData.append("uploadedImages", selectedFile, selectedFile.name)
        }

        axios.post(baseUrl + "api/testimonials")
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
                <FormGroup title={"Full Name"} id="fullName" type="text" name="fullName" placeholder="" handleChange={handleChange} value={formData.fullName} />
                <FormGroup title={"Email Address"} id="email" type="email" name="email" placeholder="" handleChange={handleChange} value={formData.email} />
                <FormGroup title={"Phone Number"} id="phoneNumber" type="text" name="phoneNumber" placeholder="" handleChange={handleChange} value={formData.phoneNumber} />
                <FormGroup title={"Feedback"} id="feedback" type="text" name="feedback" placeholder="" handleChange={handleChange} value={formData.feedback} />
                <FormGroup title={"Company"} id="company" type="text" name="company" placeholder="" handleChange={handleChange} value={formData.company} />
                <FormGroup title="Image" id="images" type="file" name="uploadedImages" handleChange={handleFileInput} />
                {/* <label htmlFor="uploadedImages"></label>
                <input type="file" name="uploadedImages" onChange={handleFileInput} /> */}
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Testimonial
