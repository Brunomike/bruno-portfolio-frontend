import React from 'react';
import ProjectContainer from "../containers/Project/Project";

export interface ThemeAndHandleTheme {
  to: string;
  theme: string;
  handleThemeSelection(): void;
}

const Project: React.FC<ThemeAndHandleTheme> = ({ to, theme, handleThemeSelection }) => {
  return (
    <ProjectContainer to={to} theme={theme} handleThemeSelection={handleThemeSelection} />
  )
}

export default Project
