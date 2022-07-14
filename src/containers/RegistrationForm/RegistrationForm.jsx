import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import Spinner from '../../components/Spinner/Spinner';
import Logo from '../../assets/bruno-logo-no-bg.png'
import FormGroup from '../../components/FormGroup/FormGroup'
import { register, reset } from '../../features/auth/authSlice';
import './RegistrationForm.scss'

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        dob: "",
        password: "",
        confirmPassword: "",
    })

    const { firstName, lastName, email, phoneNumber, dob, password, confirmPassword } = formData

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/signin')
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, dispatch, navigate])

    useEffect(() => {
        if (isSuccess) {
            toast.success('Registration Successful')
        }
    }, [isSuccess])


    const handleChange = (e) => {
        const { value, name } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else {
            const userData = {
                firstName, lastName, email, phoneNumber, dob, password, confirmPassword
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='app__flex registration__container'>
            <div className='registration__title app__flex'>
                <div className='app__flex center'>
                    <img src={Logo} alt="Signup" />
                </div>
            </div>

            <div className='registration__fields'>
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <FormGroup title={"First Name"} type="text" name="firstName" placeholder="" handleChange={handleChange} value={formData.firstName} />
                    <FormGroup title={"Last Name"} type="text" name="lastName" placeholder="" handleChange={handleChange} value={formData.lastName} />
                    <FormGroup title={"Email Address"} type="email" name="email" placeholder="" handleChange={handleChange} value={formData.email} />
                    <FormGroup title={"Date of Birth"} type="date" name="dob" placeholder="" handleChange={handleChange} value={formData.dob} />
                    <FormGroup title={"Phone Number"} type="text" id="phone" name="phoneNumber" placeholder="" handleChange={handleChange} value={formData.phoneNumber} />
                    <FormGroup title={"Password"} type="password" name="password" placeholder="" handleChange={handleChange} value={formData.password} />
                    <FormGroup title={"Confirm Password"} type="password" name="confirmPassword" placeholder="" handleChange={handleChange} value={formData.confirmPassword} />
                    <p style={{ marginBottom: "10px" }}>Already have an account? <Link to={"/signin"}>Signin</Link></p>

                    <button type="submit">SignUp</button>
                    <Link to={"/"}>Back to Portfolio</Link>
                </form>
            </div>
        </div>
    )
}

export default RegistrationForm
