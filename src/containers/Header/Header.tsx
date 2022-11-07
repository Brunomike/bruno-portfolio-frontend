import React, { useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import Button from '@mui/material/Button'
import { LightModeOutlined as LightMode, DarkModeOutlined as DarkMode } from '@mui/icons-material'
import { motion } from 'framer-motion'

import Logo from '../../assets/bruno-logo-no-bg.png'
import DarkLogo from '../../assets/bruno-logo-dark-no-bg1.png'
import './Header.scss';

const Header = ({ theme, handleThemeSelection }) => {
    const [toggle, setToggle] = useState(false)

    return (
        <nav className='app__navbar'>
            <div className='app__navbar-logo'>
                <a href='/#home'><img src={theme === 'dark' ? Logo : DarkLogo} alt='Michael Bruno Logo' /></a>
            </div>
            <ul className='app__navbar-links'>
                {['home', 'about', 'skills', 'projects', 'contact', 'resume'].map((item, index) => {
                    if (item === 'resume') {
                        return (
                            <li key={`link-${index}`} className='app__flex p-text'>                                                                
                                <a href={`/${item}`}>{item}</a>
                            </li>
                        )
                    } else return (
                        <li key={`link-${index}`} className='app__flex p-text'>
                            <a href={`/#${item}`}>{item}</a>
                        </li>
                    )

                }
                )}
                <li key={`link-theme`} className='app__flex p-text'>
                    <Button onClick={handleThemeSelection} variant="outlined" id="theme-btn" data-mode={theme}>
                        {theme === "light" ? (<LightMode />) : (<DarkMode />)}
                    </Button>
                </li>
            </ul>

            <div className='app__navbar-menu'>
                <HiMenuAlt4 onClick={() => setToggle(true)} />
                {toggle && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <HiX onClick={() => setToggle(false)} />
                        <ul>
                            {['home', 'about', 'skills', 'projects', 'contact', 'resume'].map((item, index) => {
                                if (item === 'resume') {
                                    return (
                                        <li key={item} >                                            
                                        <a href={`/${item}`} onClick={() => setToggle(false)} >{item}</a>
                                        </li>
                                    )
                                } else return (
                                    <li key={item} >
                                        <a href={`/#${item}`} onClick={() => setToggle(false)}>{item}</a>
                                    </li>
                                )
                            }
                            )}
                            <li key={`link-theme`} className='app__flex p-text'>
                                <Button onClick={handleThemeSelection} variant="outlined" id="theme-btn" data-mode={theme}>
                                    {theme === "light" ? (<LightMode />) : (<DarkMode />)}
                                </Button>
                            </li>
                        </ul>
                    </motion.div>
                )}
            </div>

        </nav>
    )
}

export default Header

//<Link to="/resume">{item}</Link>
//<Link to="/resume"  onClick={() => setToggle(false)}>{item}</Link>