import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function allocateExpense(payload) {
  
  const response = await axios.post(`${apiURL}/budget/expense`, payload)
  .then(response => response.data)
  .catch(err => console.error(err));
  // console.log(response.data);
  return await response;
};

export async function getAllExpenses(email) {
  const response = await axios.get(`${apiURL}/budget/get-transactions?email=${email}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function getExpenses(email, type) {
  const response = await axios.get(`${apiURL}/budget/get-transactions?email=${email}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};