import { Stack } from "expo-router";

const Layout = () => {
  return (
      <Stack initialRouteName="(auth)">
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="authenticate" />
        <Stack.Screen name="forgotPassword" />
      </Stack>
  )
};

export default Layout;
