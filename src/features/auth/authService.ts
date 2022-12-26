import axios from 'axios';
import baseUrl from '../../constants';

const API_URL = `${baseUrl}api/users/`;

export interface LoginAttrs {
    email: string;
    password: string;
}

//Register User
const register = async (userData: any) => {
    const response = await axios.post(API_URL + "signup", userData);
    // if (response.data) {
    //     localStorage.setItem('user', JSON.stringify(response.data));
    // }
    return response.data;
};

//Login User
const login = async (userData: any) => {
    let LOGIN_URL = API_URL + "signin";
    const response = await axios.post(LOGIN_URL, userData, { withCredentials: true });
    //console.log(response.headers['set-cookie']);

    if (response.data) {
        if (response.data.data.message = "Login success") {
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            localStorage.setItem('isAuthenticated', "true");
        }
    }
    return response.data;
};

//Logout
const logout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    //document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";    
    let LOGOUT_URL = API_URL + "signout"
    await axios.get(LOGOUT_URL);
};

const authService = {
    register,
    login,
    logout
};

export default authService;