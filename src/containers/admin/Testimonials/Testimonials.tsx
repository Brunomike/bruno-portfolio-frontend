import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import baseUrl from '../../../constants';
import Empty from '../../../assets/empty.svg';
import FormGroup from "../../../components/FormGroup/FormGroup";
import "./Testimonials.scss";


interface TestimonialAttrs {
  "fullName": string;
  "feedback": string;
  "company": string;
  "projectName": string | null;
  "role": string;
  "email": string;
  "portfolioLink": string | null;
  "phoneNumber": string;
  "imageUrl": string|null;
  "createdAt": string;
  "updatedAt": string;
  "id": string;
}


const Testimonials = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    title: ""
  })
  const { email, fullName, title } = formData
  const [testimonials, setTestimonials] = useState<TestimonialAttrs[]>([])

  useEffect(() => {
    axios.get(baseUrl + "api/testimonials")
      .then(res => res.data)
      .then(data => {                
        setTestimonials(data.data.testimonials)
      })
  }, [])


  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()

    if (email === "" || fullName === "" || title === "") {
      toast.error("All fields are required!")
    } else {
      axios.post(baseUrl + "api/testimonials/send", formData, {
        headers: {
          "Content-Type":"application/json"
        },
        withCredentials:true
      })
        .then(res => res.data)
        .then(data => {
          toast.success(data.message)
          setFormData({
            email: "",
            fullName: "",
            title: ""
          })
        })
        .catch(err => {
          toast.error("Failed to send request")
        })
    }

  }

  //<div className='item__feedback'>{testimonial.feedback}</div>

  return (
    <div id='admin-testimonial'>
      {testimonials.length > 0 ? (
        <div className="testimonials-list">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-item">
              <img src={testimonial.imageUrl ? `${baseUrl}images/${testimonial.imageUrl}` : Empty} alt="Testimonial" />
              <div className='item__content'>
                <div className='item__name'>{testimonial.fullName}</div>
                {testimonial.role && (<div className='item__company p-text'>{testimonial.role}</div>)}
                {testimonial.company && (<div className='item__company'>{testimonial.company}</div>)}                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='testimonials-list-empty'>No testimonials found!</div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Testimonial Request</h2>
        <FormGroup title={"Email Address"} id="email" type="email" name="email" placeholder="" handleChange={handleChange} value={formData.email} />
        <FormGroup title={"Full Name"} id="fullName" type="text" name="fullName" placeholder="" handleChange={handleChange} value={formData.fullName} />
        <FormGroup title={"Project Title or Work "} id="title" type="text" name="title" placeholder="" handleChange={handleChange} value={formData.title} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Testimonials
