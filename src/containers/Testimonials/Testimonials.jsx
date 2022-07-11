import React, { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'

import Empty from '../../assets/empty.svg'
import AppWrapper from '../../hoc/AppWrapper'
import MotionWrapper from '../../hoc/MotionWrapper';
import './Testimonials.scss'


const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setcurrentIndex] = useState(0);

    useEffect(() => {
        fetch('http://localhost:4000/api/testimonials')
            .then(res => res.json())
            .then(data => {
                setTestimonials(data)
            })
    }, [])


    const tst = testimonials[currentIndex];

    const handleClick = (index) => {
        setcurrentIndex(index)
    }


    return (
        <section className='testimonials app__flex' >
            <h2 className='head-text'>Testimonials</h2>
            {testimonials.length > 0 ? (
                <>
                    <div className='app__testimonial-item app__flex'>
                        <img src={tst.imageUrl ? `http://localhost:4000/${tst.imageUrl}` : Empty} alt="testimonial" />
                        <div className='app__testimonial-content'>
                            <p className='p-text'>{tst.feedback}</p>
                            <div>
                                <h4 className='bold-text'>{tst.fullName}</h4>
                                <h5 className='p-text'>{tst.company}</h5>
                            </div>
                        </div>
                    </div>

                    <div className='app__testimonial-btns app__flex'>
                        <div className='app__flex'
                            onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
                            <HiChevronLeft />
                        </div>
                        <div className='app__flex'
                            onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
                            <HiChevronRight />
                        </div>
                    </div>
                </>
            ) :
                (
                    <>
                        <div className='app__testimonial-item app__flex empty'>
                            <img src={Empty} alt='empty' />
                            <span>No testimonials found!</span>
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default AppWrapper(
    MotionWrapper(Testimonials),
    'testimonials',
    'dark__section')
