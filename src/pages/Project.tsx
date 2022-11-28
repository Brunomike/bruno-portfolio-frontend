import React, { lazy } from 'react';
const ProjectContainer = lazy(() => import("../containers/Project/Project"));

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
