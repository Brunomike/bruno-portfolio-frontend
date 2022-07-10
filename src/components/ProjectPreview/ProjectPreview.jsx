import React from 'react'

import "./ProjectPreview.scss"

const ProjectPreview = ({ imageUrl }) => {
  return (
    <div className='wrap'>
      <div className='monitor'>
        <div className='monitor__webcam'>
          <div className='webcam__mic'></div>
          <div className='webcam__camera'>
            <div></div>
          </div>
          <div className='webcam__mic'></div>
        </div>
        <img src={`http://localhost:4000/${imageUrl}`} />
      </div>
      <div className='base'>
        <div className='base__center'></div>
      </div>
    </div>
  )
}

export default ProjectPreview
