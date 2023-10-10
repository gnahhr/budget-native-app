import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function getInsights(email, type) {
  const response = await axios.get(`${apiURL}/budget/get-insight?email=${email}&type=${type}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  
  return await response;
};