import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import Empty from '../../../assets/empty.svg'
import FormGroup from "../../../components/FormGroup/FormGroup"
import "./Testimonials.scss"

const Testimonials = ({ token }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    title: ""
  })
  const { email, fullName, title } = formData
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    axios.get("http://localhost:4000/api/testimonials")
      .then(res => res.data)
      .then(data => {
        setTestimonials(data)
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

    if (email === "" || fullName === "" || title === "") {
      toast.error("All fields are required!")
    } else {
      axios.post("http://localhost:4000/api/testimonials/send", formData, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
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
              <img src={testimonial.imageUrl ? `http://localhost:4000/${testimonial.imageUrl}` : Empty} alt="Testimonial Image" />
              <div className='item__content'>                
                <div className='item__name'>{testimonial.fullName}</div>
                <div className='item__company'>{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='testimonials-list-empty'>No testimonials found!</div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Testimonial Request</h2>
        <FormGroup title={"Email Address"} type="email" name="email" placeholder="" handleChange={handleChange} value={formData.email} />
        <FormGroup title={"Full Name"} type="text" name="fullName" placeholder="" handleChange={handleChange} value={formData.fullName} />
        <FormGroup title={"Project Title or Work "} type="text" name="title" placeholder="" handleChange={handleChange} value={formData.title} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Testimonials
