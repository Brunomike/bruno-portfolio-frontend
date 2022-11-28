import React, { lazy } from 'react'

const TestimonialContainer = lazy(() => import('../containers/Testimonial/Testimonial'));

const Testimonial = () => {
    return (
        <div className='app__container center'>
            <TestimonialContainer />
        </div>
    )
}

export default Testimonial
