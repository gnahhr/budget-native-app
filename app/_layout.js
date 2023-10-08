import { Stack } from "expo-router";
import { Provider } from "../context/auth";

const Layout = () => {
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
