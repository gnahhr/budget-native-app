import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function allocateBudget(payload) {

    const response = await axios.post(`${apiURL}/budget/allocation`, payload )
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function updateBudget(email, totalBudget) {
    const response = await axios.put(`${apiURL}/budget/edit-budget-allocation?email=${email}`,{
      totalBudget,
    })
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function updateAllocation(email, payload) {
    const response = await axios.put(`${apiURL}/budget/edit-budget-category?email=${email}`, payload)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function getAllocatedBudget(email) {

  const response = await axios.get(`${apiURL}/budget/get-budget-allocation?email=${email}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};