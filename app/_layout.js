import { Stack } from "expo-router";
import { Provider } from "../context/auth";
import { useFonts } from 'expo-font';
import {decode, encode} from 'base-64'

if (!global.btoa) { global.btoa = encode;}
if (!global.atob) { global.atob = decode;}
const Layout = () => {
  const [fontsLoaded] = useFonts({
    'regular': require('../assets/fonts/SFPRODISPLAYREGULAR.otf'),
    'medium': require('../assets/fonts/SFPRODISPLAYMEDIUM.otf'),
    'italics': require('../assets/fonts/SFPRODISPLAYTHINITALIC.otf'),
    'bold': require('../assets/fonts/SFPRODISPLAYBOLD.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider>
      <Stack initialRouteName="home">
        <Stack.Screen name="index" options={{ headerShown: false }}/>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(user)" options={{ headerShown: false }}/>
      </Stack>
    </Provider>
  )
};

export default Layout;
