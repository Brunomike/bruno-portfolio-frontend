import React from 'react'
import { BsLinkedin, BsTwitter, BsGithub } from 'react-icons/bs'

import Logo from '../../assets/bruno-logo-no-bg.png'
import './Footer.scss'

const Footer = () => {
    let currentYear = new Date().getFullYear()

    return (
        <footer className='app__flex'>
            <div className='footer__links'>
                <div className='about-summary'>
                    <h2 className='footer__heading'>MICHAEL BRUNO</h2>
                    <p>A Fullstack developer focused on building applications that lead to product success.</p>
                </div>
                <div className='footer__social'>
                    <h2 className='footer__heading'>SOCIAL </h2>
                    <div>
                        <a href='www.linkedin.com/in/brunomike254' target='_blank'>
                            <BsLinkedin />
                        </a>
                        <a href='https://github.com/Brunomike' target='_blank'>
                            <BsGithub />
                        </a>
                        <a href='https://twitter.com/brunomike254' target='_blank'>
                            <BsTwitter />
                        </a>
                    </div>
                </div>
            </div>
            <div className='footer__copyright'>
                <img src={Logo} alt='Michael Bruno-Logo' />
                <span>&copy; Copyright {currentYear}. Made by Michael Bruno.</span>
            </div>
        </footer>
    )
}

export default Footer
