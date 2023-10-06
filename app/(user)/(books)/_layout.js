import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack initialRouteName="(books)">
      <Stack.Screen name="bookIndex" options={{ headerShown: false }}/>
      <Stack.Screen name="[bookName]" options={{ headerShown: true }}/>
    </Stack>
  )
};

export default Layout;
