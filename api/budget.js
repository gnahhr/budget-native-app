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

export async function deleteCategory(email, budgetName, expenseType, categoryName) {
    const response = await axios.put(`${apiURL}/budget/delete-category?email=${email}&budgetName=${budgetName}&expenseType=${expenseType}&name=${categoryName}`)
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

export async function getRequestAccess(email) {
  const response = await axios.get(`${apiURL}/budget/get-all-request-access?budgetOwner=${email}`)
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

export async function requestAccess(userEmail, budgetOwner) {
  const response = await axios.post(`${apiURL}/budget/request-access?userEmail=${userEmail}&budgetOwner=${budgetOwner}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function grantAccess(budgetOwner, userEmail, budgetName, deny) {
  let payload = {
    userEmail,
    budgetName
  }

  if (deny) {
    payload['deny'] = true;
  }
  const response = await axios.put(`${apiURL}/budget/grant-access?budgetOwner=${budgetOwner}`, payload)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function giveMoney(userEmail, budgetName, amount) {
  const response = await axios.post(`${apiURL}/budget/give-money`, {
    userEmail,
    budgetName,
    amount
  } )
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function addExtraBudget(budgetOwner, budgetName, payload) {
  const response = await axios.post(`${apiURL}/budget/add-extra-budget?budgetOwner=${budgetOwner}&budgetName=${budgetName}`, payload)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function getAllExtraBudget(budgetOwner, budgetName) {
  const response = await axios.get(`${apiURL}/budget/get-all-extra-budget?budgetOwner=${budgetOwner}&budgetName=${budgetName}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function checkExtraBudget(budgetOwner, budgetName) {
  const response = await axios.post(`${apiURL}/budget/check-extra-budget?budgetOwner=${budgetOwner}&budgetName=${budgetName}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function removeBudgetUser(email, budgetName, userEmail) {
  const response = await axios.put(`${apiURL}/budget/delete-user-from-budget?email=${email}&budgetName=${budgetName}`, {
    userEmail,
  } )
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};