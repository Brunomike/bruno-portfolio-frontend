import axios from 'axios';

const API_URL = 'http://localhost:4000/api/projects';

//Fetch Projects
const getProjects = async () => {
    const response = await axios.post(API_URL);
    return response.data;
};

//Post Project
const postProject = async (projectData) => {
    const response = await axios.post(API_URL , projectData);
    return response.data;
};




const adminService = {
    getProjects,
    postProject,    
};

export default adminService;