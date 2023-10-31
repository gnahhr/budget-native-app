import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function allocateBudget(email, payload) {
    const response = await axios.post(`${apiURL}/budget/allocation?email=${email}`, payload )
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function updateBudget(email, budgetName, totalBudget, newName) {
    const response = await axios.put(`${apiURL}/budget/edit-budget-allocation?email=${email}&budgetName=${budgetName}`,{
      totalBudget,
      editBudgetName: newName,
    })
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function updateAllocation(email, budgetName, payload) {
    const response = await axios.put(`${apiURL}/budget/edit-budget-category?email=${email}&budgetName=${budgetName}`, payload)
    .then(response => response.data)
    .catch(err => console.error(err));
    
    return await response;
};

export async function getAllocatedBudget(email, budgetName) {
  const response = await axios.get(`${apiURL}/budget/get-budget-allocation?email=${email}&budgetName=${budgetName}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function getBudgetList(email) {

  const response = await axios.get(`${apiURL}/budget/get-all-budget-name?email=${email}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};

export async function getBudgetUsers(email, budgetName) {
  const response = await axios.get(`${apiURL}/budget/get-all-user-included?email=${email}&budgetName=${budgetName}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};

export async function addBudgetUser(email, budgetName, userEmail) {
  const response = await axios.post(`${apiURL}/budget/add-user?email=${email}&budgetName=${budgetName}`, {
    userEmail,
  } )
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};