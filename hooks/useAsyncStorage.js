import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key, value) => {
  console.log(key, value);
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(e.message);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.error(e.message);
  }
};