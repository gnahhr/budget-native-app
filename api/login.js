import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function login (email, password) {

    const response = await axios.post(`${apiURL}/user/login`, {
        "email": email,
        "password": password,
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

export async function fetchData (email) {
    const response = await axios.get(`${apiURL}/budget/get-budget-allocation?email=${email}`)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};