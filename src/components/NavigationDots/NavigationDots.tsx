const NavigationDots = ({ active }: { active: string }) => {
    return (
        <div className='app__navigation'>
            {['home', 'about', 'work', 'skills', 'projects', 'testimonials', 'contact'].map((item, index) => (
                <a
                    href={`#${item}`}
                    key={item + index}
                    className="app__navigation-dot"
                    style={active === item ? { backgroundColor: '#313BAC' } : {}}
                ><span className='dot-hidden'></span></a>
            ))}
        </div>
    )
}
export default NavigationDots;