import React, { useState, useEffect } from 'react'

import AppWrapper from '../../hoc/AppWrapper'
import MotionWrapper from '../../hoc/MotionWrapper'
import baseUrl, { skills } from '../../constants'
import './Skills.scss'

const Skills = () => {
    const [experiences, setExperiences] = useState([])    

    useEffect(() => {
        fetch(baseUrl + 'api/experiences')
            .then(res => res.json())
            .then(data => {
                setExperiences(data);
            })
    }, [])

    return (
        <section className='skills app__flex' >
            <h2>Skills & Experience</h2>
            <div className='container'>
                <div className='app__flex container__skills'>
                    {skills.map((skill, index) => (
                        <div className='skills__skill app__flex' key={`${index}-${skill.title}`}>
                            <img src={skill.logo} alt={skill.title} />
                            <p>{skill.title}</p>
                        </div>
                    ))}
                </div>
                <div className='app__flex container__experiences'>
                    {experiences.map((group, index) => (
                        <div className='experience__container app__flex' key={`${index}-${group}`}>
                            <div className='experience__year'> {group.year}</div>
                            <div className='experience__items app__flex'>
                                {group.ExperienceItems.map((experience, index) => (
                                    <div className='experience__items-container' key={`${index}#experience__items-container`}>
                                        <div className='experience__item bold-text'>{`${experience.position === 'Intern' ? experience.position + ', ' : ''}${experience.role}`}</div>
                                        <div className='experience__item company-text' >{experience.company}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}

export default AppWrapper(
    MotionWrapper(Skills),
    'skills',
    'dark__section')
