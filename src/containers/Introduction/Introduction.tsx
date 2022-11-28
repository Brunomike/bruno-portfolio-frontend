import { motion } from 'framer-motion'
import {LazyLoadImage} from 'react-lazy-load-image-component';

//import Image from '../../assets/bruno-no-bg-2.png'
import Image from '../../assets/IMG_6234-c-removebg.png'
import node from '../../assets/node.png'
//import redux from '../../assets/redux.png'
import react from '../../assets/react.png'
import sass from '../../assets/sass.png'
import Circle from '../../assets/circle.svg'
//import CircleWhite from '../../assets/bg-white.png'
import AppWrapper from '../../hoc/AppWrapper'
import './Introduction.scss'

const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 1,
            ease: 'easeInOut'
        }
    }
}

const Introduction = () => {
    const savedTheme = localStorage.getItem("myTheme")

    return (
        <section className='app__flex home'>
            <motion.div className='app__intro-badge'
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
            >
                <div className="app__header-badge">
                    <div className="badge-cmp app__flex">
                        <span>👋</span>
                        <div style={{ marginLeft: 20 }}>
                            <p className='p-text'>Hello, I am</p>
                            <p className='head-text'>Michael</p>
                        </div>
                    </div>
                    <div className='tag-cmp app__flex'>
                        <p className='p-text'>Fullstack Developer</p>
                        {/*<p className='p-text'>Freelancer</p> */}
                    </div>
                </div>
            </motion.div>
            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className='intro__photo'
            >
                {/* <img src={Image} alt="Michael Bruno" /> */}
                <LazyLoadImage alt='Michael Bruno'  src={Image}/>
                {savedTheme === "light" ?
                    <motion.img
                        whileInView={{ scale: [0, 1] }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        src={savedTheme === "light" ? Circle : Circle}
                        alt="profile_circle"
                        className={`overlay__circle`}  />
                :
                    <motion.div
                        whileInView={{ scale: [0, 1] }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                        className={`dark__overlay`}  />
            }
               
              
            </motion.div>
            <motion.div
                variants={scaleVariants}
                whileInView={scaleVariants.whileInView}
                className="app__header-circles">
                {[node, react, sass].map((circle, index) => (
                    <div className='circle-cmp app__flex' key={`circle-${index}`}>
                        <img src={circle} alt="circle" />
                    </div>
                ))}
            </motion.div>

        </section>
    )
}

export default AppWrapper(Introduction, 'home', 'dark__section')
