import FrontEnd from './assets/front-end.jpg'
import BackEnd from './assets/backend.jpg'
//import FullStack from './assets/full-stack.png'
import FullStack1 from './assets/fullstack1.jpeg'
import Html from './assets/html.png'
import css from './assets/css.png'
import js from './assets/javascript.png'
import react from './assets/react.png'
import redux from './assets/redux.png'
import nodejs from './assets/node.png'
import sass from './assets/sass.png'
import git from './assets/git.png'
import grahpql from './assets/graphql.png'
import typescript from './assets/typescript.png'


let baseUrl = process.env.NODE_ENV === 'production' ? "https://michaelbruno-portfolio.onrender.com/" : "http://localhost:4000/";
export default baseUrl

export const roles = [
    {
        logo: FrontEnd,
        title: "Front End Development",
        description: "I can build beautiful and functional websites following either vanilla with HTML, CSS and Javascript, also using bootstrap and other CDN's, or using a javascript library like React.",
        technologies: ["HTML", "CSS", "JAVASCRIPT", "REACT"]
    },
    {
        logo: BackEnd,
        title: "Back End Development",
        description: "I can build efficient api's with various back-end technologies foused on node.js framework.",
        technologies: ["Node.js", "Express", "MYSQL", "MongoDB", "RESTFUL-API", "GRAPHQL"]
    },
    {
        logo: FullStack1,
        title: "Full Stack Development",
        description: "I can build fullstack web applications with either server-side rendering with various templating engines (ejs, hbs, e.t.c) or dedicated frontend and backend of the web application.",
        technologies: ["SSR", "EJS", "Combines front and back end tech", "Currently Learning Microservices"]
    },
]

export const skills = [
    {
        title: "HTML",
        logo: Html
    },
    {
        title: "CSS",
        logo: css
    },
    {
        title: "SASS",
        logo: sass
    },
    {
        title: "Javascript",
        logo: js
    },
    {
        title: "Typescript",
        logo: typescript
    },

    {
        title: "React",
        logo: react
    },
    {
        title: "Redux",
        logo: redux
    },
    {
        title: "Node.js",
        logo: nodejs
    },
    {
        title: "Git",
        logo: git
    },
    // {
    //     title: "Graphql",
    //     logo: grahpql
    // },
]

export const experiences = [
    {
        year: 2021,
        items: [
            {
                role: "Intern",
                work: "Software Developer",
                organisation: "J.K.U.A.T"
            },
            {
                role: "Freelancer",
                work: "Software Developer",
                organisation: "J.K.U.A.T"
            },
        ]
    },
    {
        year: 2022,
        items: [
            {
                role: "Permanent",
                work: "Full-stack Developer",
                organisation: "Google"
            },
            {
                role: "Permanent",
                work: "Back-end Developer",
                organisation: "Microsoft"
            },
        ]
    }
]

export const projects = [
    {
        tags: ["Full-stack", "Mobile App"],
        name: "E-Progression",
        title: "E-Progression",
        description: "A modern system that allows parents monitor their students perfomance through an android application",
        projectLink: "#",
        codeLink: "#",
        imgUrl: FrontEnd
    },
    {
        tags: ["Mobile App"],
        name: "E-commerce",
        title: "E-commerce",
        description: "A modern system that allows parents monitor their students perfomance through an android application",
        projectLink: "#",
        codeLink: "#",
        imgUrl: FullStack1
    },
    {
        tags: ["Web App", "Mobile App"],
        name: "E-Progression",
        title: "E-Progression",
        description: "A modern system that allows parents monitor their students perfomance through an android application",
        projectLink: "#",
        codeLink: "#",
        imgUrl: BackEnd
    },
]


export interface ThemeAndHandleTheme {
    to?:string;
    theme: string;
    handleThemeSelection(): void;
}