import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="(onboarding)">
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="editCategory" />
    </Stack>
  )
};

export default Layout;
