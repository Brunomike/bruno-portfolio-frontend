import React from 'react';

interface PageProps {
    theme: string;
    isUnauthorized?: boolean;
}

const NotFound: React.FC<PageProps> = ({ theme, isUnauthorized }) => {
    return (
        <div className={`not-found-container app__flex ${theme === "light" ? "light-bg" : "dark-bg"}`}>
            <div className='not-found'>
                {isUnauthorized ? (
                    <>
                        <h1>Oops!</h1>
                        <p className='status'>401 - UNAUTHORIZED</p>
                        <p>The page you are looking for requires authorization, please signin.</p>
                        <a href='/signin'>GO TO SIGNIN</a>
                    </>
                ) : (
                    <>
                        <h1>Oops!</h1>
                        <p className='status'>404 - PAGE NOT FOUND</p>
                        <p>The page you are looking for might have been removed ,had its name changed, or is temporarily unavailable.</p>
                        <a href='/'>GO TO PORTFOLIO</a>
                    </>
                )}

            </div>
        </div>
    )
}

export default NotFound