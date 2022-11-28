import React, { useState } from 'react'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { toast } from 'react-toastify'
import axios from 'axios'

import baseUrl from '../../constants'
import MotionWrapper from '../../hoc/MotionWrapper'
import AppWrapper from '../../hoc/AppWrapper'
import './Contact.scss'

const Contact = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: "",
        source: "client"
    });

    const { fullName, email, message } = formData

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        })
        );
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.post(baseUrl + "api/messages", formData, {
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then(res => res.data)
            .then(data => {
                setFormData({ fullName: "", email: "", message: "", source: "client" })
                toast.success(data.message)
            })
            .catch(err => {
                toast.error(err.message)
            })
    }

    return (
        <section className='contact' >
            <h1 className='head-text'>Contact Me</h1>
            <div className='app__contact'>
                <div className='contact__item'>
                    <BsFillTelephoneFill />
                    <span>brunomike254@gmail.com</span>
                </div>
                <div className='contact__item'>
                    <MdEmail />
                    <span>+254716573061</span>
                </div>
            </div>
            <form method='post' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Name</label>
                    <input type='text' value={fullName} name='fullName' placeholder='Enter Your Full Name' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' value={email} name='email' placeholder='Enter Your Email' onChange={handleChange} />
                </div>
                <div className='form-group'>
                    <label>Message</label>
                    <textarea name='message' placeholder='Enter Your Message' onChange={handleChange} value={message}>
                    </textarea>
                </div>
                <div>
                    <button type="submit">Submit Message</button>
                </div>
            </form>
        </section>
    )
}

export default AppWrapper(
    MotionWrapper(Contact),
    'contact',
    '')
