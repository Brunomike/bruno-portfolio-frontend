import React from 'react'

import Header from '../containers/Header/Header'

const Resume = ({ theme, handleThemeSelection }) => {
    //TODO: Download/serve resume pdf from the backend
    return (
        <>
            <div className='pdf' style={{ position: "relative" }}>
                <object data="http://localhost:4000/api/resume" type="application/pdf" width="100%" height="600px">
                    <>
                        <Header theme={theme} handleThemeSelection={handleThemeSelection} />
                        <div className='app__section dark__section app__flex' style={{paddingTop:"6rem",paddingRight:"8px",paddingLeft:"8px"}}>
                            <p>Your web browser doesn't have a PDF plugin.
                            <a href="http://localhost:4000/api/resume">Click here to download the PDF file.</a></p>
                        </div>
                    </>

                </object>

                <a href="/" className='back-btn'>Go Back</a>
            </div>
        </>
    )
}

export default Resume
