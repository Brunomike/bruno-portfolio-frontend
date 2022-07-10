import React from 'react'
import { motion } from 'framer-motion'

import MotionWrapper from '../../hoc/MotionWrapper'
import AppWrapper from '../../hoc/AppWrapper'
import { roles } from '../../constants'
import './About.scss'

const About = () => {
  return (
    <section className='app__section app__flex about'>
      <h2>About Me</h2>
      <div className='app__flex'>
        <div>
          <h3>Get to know me!</h3>
          <p className=''>
            Hey! It's Michael Bruno and I'm a passionate Full stack developer focused on delivering responsive, scalable and reliable applications. I'm open to Job opportunities where I can contribute, learn and grow.
            <br/>
            <br/>
            I'm always improving myself with each project I get my hands on.
            I am a dedicated person who pursues his dreams, hardworking and results oriented, I always seek to achieve my best version. 
            <br/>
            <br/>
            If you have a good opportunity that matches my skills and experience then don't hesitate to contact me.
          </p>
          <a href='#contact'>Contact</a>
        </div>
        <div>
          <h3>Roles</h3>

          <div className='about__roles'>
            {roles.map((role, index) => (
              <motion.div
                whileInView={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, type: 'tween' }}
                className='role'
                key={index+"-"+role.title}
              >
                <img src={role.logo} alt={role.title} />
                <div className='role__content'>
                  <h4>{role.title}</h4>
                  <p>{role.description}</p>
                </div>

              </motion.div>
            ))}

          </div>
        </div>
      </div>
    </section>
  )
}

export default AppWrapper(
  MotionWrapper(About),
  'about',
  'app__section')
