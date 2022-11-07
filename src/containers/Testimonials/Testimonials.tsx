import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import baseUrl from '../../constants';
import Empty from '../../assets/empty.svg';
import AppWrapper from '../../hoc/AppWrapper';
import MotionWrapper from '../../hoc/MotionWrapper';
import './Testimonials.scss';


interface TestimonialAttrs {
    "fullName": string;
    "feedback": string;
    "company": string;
    "projectName": string | null;
    "role": string;
    "email": string;
    "portfolioLink": string | null;
    "phoneNumber": string;
    "imageUrl": string|null;
    "createdAt": string;
    "updatedAt": string;
    "id": string;
}


const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<TestimonialAttrs[]>([]);
    const [currentIndex, setcurrentIndex] = useState(0);

    useEffect(() => {
        fetch(baseUrl + 'api/testimonials')
            .then(res => res.json())
            .then(res=>res.data)
            .then(data => {                                
                setTestimonials(data.testimonials);
            })
    }, []);


    const tst = testimonials[currentIndex];

    const handleClick = (index: number) => {
        setcurrentIndex(index)
    }


    return (
        <section className='testimonials app__flex' >
            <h2 className='head-text'>Testimonials</h2>
            {testimonials.length > 0 ? (
                <>
                    <div className='app__testimonial-item app__flex'>
                        <img src={tst.imageUrl ? `${baseUrl}${tst.imageUrl}` : Empty} alt="testimonial" />
                        <div className='app__testimonial-content'>
                            <p className='p-text'>{tst.feedback}</p>
                            <div>
                                <h4 className='bold-text'>{tst.fullName}</h4>
                                {tst.role && (<h5 className='p-text'>{tst.role}</h5>)}
                                {tst.company && (<h5 className='p-text'>{tst.company}</h5>)}
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
