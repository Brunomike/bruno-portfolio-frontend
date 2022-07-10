import React from 'react'
import ProjectContainer from "../containers/Project/Project"

const Project = ({ to, theme, handleThemeSelection }) => {
  return (
    <ProjectContainer to={to} theme={theme} handleThemeSelection={handleThemeSelection} />
  )
}

export default Project
