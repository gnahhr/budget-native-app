import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="home">
      <Stack.Screen name="index" options={{ headerShown: false }}/>
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(user)" options={{ headerShown: false }}/>
    </Stack>
  )
};

export default Layout;
