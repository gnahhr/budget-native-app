import { Stack } from "expo-router";

const Layout = () => {

  return (
    <Stack initialRouteName="settingsIndex">
      <Stack.Screen
        name="settingsIndex"
        options={{
          headerTitle: "Settings",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f3f3f7"},
        }}/>
      <Stack.Screen
        name="history"
        options={{
          headerTitle: "Transactions",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f3f3f7"},
        }}/>
      {/* <Stack.Screen
        name="notifications"
        options={{
          headerTitle: "Notifications",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#f3f3f7"},
        }}/> */}
    </Stack>
  )
};

export default Layout;