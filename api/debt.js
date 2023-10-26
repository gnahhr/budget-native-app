import axios from "axios";
import { Platform } from "react-native";

const apiURL = Platform.OS === "android" ? process.env.EXPO_PUBLIC_API_URL_ANDROID : process.env.EXPO_PUBLIC_API_URL

export async function receiveAndPay(email, payload) {
  const response = await axios.post(`${apiURL}/debt/receive-pay?email=${email}`, payload)
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};

export async function borrowAndLend(email, payload) {
  const response = await axios.post(`${apiURL}/debt/borrow-lend?email=${email}`, payload)
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};

export async function getPaymentHistory(email, name) {
  const response = await axios.get(`${apiURL}/debt/get-payments-history?email=${email}&name=${name}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};

export async function getLendList(email, debtType) {
  const type = debtType === 'debt' ? 'borrowed' : 'lend';
  const response = await axios.get(`${apiURL}/debt/get-lend-list?email=${email}&debtType=${type}`)
  .then(response => response.data)
  .catch(err => console.error(err));
  return await response;
};