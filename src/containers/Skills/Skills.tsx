import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

import AppWrapper from '../../hoc/AppWrapper';
import MotionWrapper from '../../hoc/MotionWrapper';
import baseUrl, { skills } from '../../constants';
import './Skills.scss';


interface ExperienceAttrs {
    year: string;
    experiences: [
        {
            role: string;
            position: string;
            organization: string;
            abbreviation: string;
            startDate: string;
            endDate: string;
        }
    ]
}

const Skills = () => {
    const [experiences, setExperiences] = useState<ExperienceAttrs[]>([])

    useEffect(() => {
        fetch(baseUrl + 'api/experiences')
            .then(res => res.json())
            .then(res => res.data)
            .then(data => {
                setExperiences(data.experiences);
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
                    {experiences.length > 0 &&
                        experiences.map((group, index) => (
                            <div className='experience__container app__flex' key={`${index}-${group}`}>
                                <div className='experience__year'> {group.year}</div>
                                <div className='experience__items app__flex'>
                                    {group.experiences.map((experience, index) => (
                                        <div className='experience__items-container' key={`${index}#experience__items-container`}>
                                            <div className='experience__item bold-text'>{`${experience.position === 'Intern' ? experience.position + ', ' : ''}${experience.role}`}</div>                                            
                                            {window.innerWidth < 500 ? (                                                
                                                <div className='experience__item company-text'>{experience.organization}</div>
                                            ) : (
                                                <>
                                                    <div className='experience__item company-text' data-tip={experience.organization} >{experience.abbreviation}</div>
                                                    <ReactTooltip place="bottom" type="light" effect="solid" offset={{ top: 14, left: 120 }} padding="8px" />
                                                </>
                                            )}
                                            {/* <Tooltip content="you can have compound alignments" direction="right-end" className="target" tipContentClassName="">
                                                right-end with arrow
                                            </Tooltip>
                                            import Tooltip from 'react-tooltip-lite'; */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section >
    )
}

export default AppWrapper(
    MotionWrapper(Skills),
    'skills',
    'dark__section')
