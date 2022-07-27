import axios from 'axios';

const token = localStorage.getItem('login-token');

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
})


// unprotected Route api

export const axiosClientU = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})


export default axiosClient;