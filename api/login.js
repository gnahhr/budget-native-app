import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function login (email, password) {

    const response = await axios.post(`${apiURL}/user/login`, {
        "email": email,
        "password": password,
    }, {
        headers:{
          'content-type': 'application/x-www-form-urlencoded',
          'accept': 'application/json'}
      })
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function register (username, email, password) {
    const response = await axios.post(`${apiURL}/user/register`, {
        "userName": username,
        "email": email,
        "password": password,
    })
    .then(response => response.data)
    .catch(err => console.error(err));

    return await response;
};

export async function updateUser (email, payload) {
    const response = await axios.put(`${apiURL}/user/update?email=${email}`, payload, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function forgotPassword (email) {
    const response = await axios.post(`${apiURL}/user/forgot-password`, {email})
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};