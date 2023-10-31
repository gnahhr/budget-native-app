import { Stack } from "expo-router";
import { Entypo } from '@expo/vector-icons';

const Layout = () => {
  return (
      <Stack initialRouteName="(homepage)">
        <Stack.Screen
          name="homepage"
          options={{
            headerShown: "Home Page",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f3f3f7"},
            tabBarIcon: ({color, size}) => <Entypo name="home" size={24} color="black" />,
          }}/>
        <Stack.Screen
          name="editCategories"
          options={{
            headerTitle: "Home Page",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f3f3f7"},
            tabBarIcon: ({color, size}) => <Entypo name="home" size={24} color="black" />,
          }}/>
      </Stack>
  )
};

export default Layout;