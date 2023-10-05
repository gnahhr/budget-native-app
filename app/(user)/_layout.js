import { Tabs } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Layout = () => {

  return (
    <Tabs initialRouteName="homepage">
      <Tabs.Screen
        name="homepage"
        options={{
          tabBarLabel: "Home",
          headerTitle: "Home Page",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "white"},
          tabBarIcon: ({color, size}) => <Entypo name="home" size={24} color="black" />,
        }}/>
      <Tabs.Screen
        name="books"
        options={{
          tabBarLabel: "Home",
          headerTitle: "Home Page",
          headerShadowVisible: false,
          tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="bookshelf" size={24} color="black" />,
      }}/>
    </Tabs>
  )
};

export default Layout;