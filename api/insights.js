import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function getInsights(params) {
  const response = await axios.get(`${apiURL}/budget/get-insight`, params)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};

export async function analyzeData(email, budgetName) {
  const response = await axios.get(`${apiURL}/analytics/analyze?email=${email}&budgetName=${budgetName}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};