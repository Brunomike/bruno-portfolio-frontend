import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { login, reset } from '../../features/auth/authSlice';
import Spinner from '../../components/Spinner/Spinner';
import FormGroup from '../../components/FormGroup/FormGroup';
import './LoginForm.scss';
import { AppDispatch } from '../../app/store';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;
    const { user, isLoading, isError, isSuccess, message } = useSelector((state: { auth: any }) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess && user) {
            toast.success('Login Successful');            
                navigate('/dashboard')            
        }

        dispatch(reset());
    }, [isError, isSuccess]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (email === '' || password === '') {
            toast.error('All fields are required!')
        } else {
            const userData = {
                email, password
            }
            dispatch(login(userData));
        }
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className='app__flex login__container'>
            <h2>SignIn</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup title={"Email Address"} id="email" type="email" name={"email"} placeholder="" handleChange={handleChange} value={formData.email} />
                <FormGroup title={"Password"} id="password" type="password" name={"password"} placeholder="" handleChange={handleChange} value={formData.password} />
                <p style={{ marginBottom: "10px" }}>Don't have an account? <Link to={"/signup"}>Signup</Link></p>

                <button type="submit">Signin</button>
                <Link to={"/"}>Back to Portfolio</Link>
            </form>
        </div>
    )
}

export default LoginForm;