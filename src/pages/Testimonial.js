import React from 'react'

import Header from '../containers/Header/Header'
import TestimonialContainer from '../containers/Testimonial/Testimonial'

const Testimonial = ({ theme, handleThemeSelection }) => {
    return (                    
            <div className='app__container center'>
                <TestimonialContainer />
            </div>       
    )
}

export default Testimonial
