import React from 'react'

const NotFound = ({ theme }) => {
    return (
        <div className={`not-found-container app__flex ${theme === "light" ? "light-bg" : "dark-bg"}`}>
            <div className='not-found'>
                <h1>Oops!</h1>
                <p className='status'>404 - PAGE NOT FOUND</p>
                <p>The page you are looking for might have been removed ,had its name changed, or is temporarily unavailable.</p>
                <a href='/'>GO TO PORTFOLIO</a>
            </div>
        </div>
    )
}

export default NotFound