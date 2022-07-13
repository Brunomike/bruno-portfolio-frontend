import axios from 'axios';
import baseUrl from '../../constants';

const API_URL = `${baseUrl}api/users/`;

//Register User
const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data));
    // }
    return response.data;
};

//Login User
const login = async (userData) => {
    let LOGIN_URL = API_URL + "login";
    const response = await axios.post(LOGIN_URL, userData);    
    if (response.data) {
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
            localStorage.setItem('isAuthenticated', true);
        }
    }
    return response.data;
};

//Logout
const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
};

const authService = {
    register,
    login,
    logout
};

export default authService;