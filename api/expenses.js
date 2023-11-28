import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function allocateExpense(email, budgetName, payload) {
  const response = await axios.post(`${apiURL}/budget/expense?email=${email}&budgetName=${budgetName}`, payload)
  .then(response => response.data)
  .catch(err => console.error(err));
  // console.log(response.data);
  return await response;
};

export async function editExpense(objId, amount) {
  const response = await axios.put(`${apiURL}/budget/edit-expenses/${objId}`, {amount})
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};

export async function getAllExpenses(email) {
  const response = await axios.get(`${apiURL}/budget/get-transactions?email=${email}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function getExpenses(params) {
  const response = await axios.get(`${apiURL}/budget/get-transactions`, params)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};