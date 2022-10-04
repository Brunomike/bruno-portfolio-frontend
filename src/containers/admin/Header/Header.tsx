import React from 'react'
import { Link } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../../features/auth/authSlice'

import Logo from '../../../assets/bruno-logo-no-bg.png'

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/")
    }

    return (
        <div className='app__flex dashboard__header'>
            <Link to="/dashboard"><img src={Logo} alt="Admin Dashboard" /></Link>
            <div className='header__profile'>
                <button className='hamburger'><GiHamburgerMenu /></button>
                <button className='logout' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Header
