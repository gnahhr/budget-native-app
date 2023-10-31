import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function getInsights(params) {
  const response = await axios.get(`${apiURL}/budget/get-insight`, params)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};