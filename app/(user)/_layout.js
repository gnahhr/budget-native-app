import { Tabs } from "expo-router";
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Provider } from "../../context/budget";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  return (
    <Provider>
      <Tabs initialRouteName="homepage">
        <Tabs.Screen
          name="(homepage)"
          options={{
            headerShown: false,
            headerTitle: "Home Page",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f3f3f7"},
            tabBarIcon: ({color, size}) => <Entypo name="home" size={24} color="black" />,
          }}/>
        <Tabs.Screen
          name="(books)"
          options={{
            headerTitle: "(books)",
            headerShadowVisible: false,
            headerShown: false,
            headerStyle: { backgroundColor: "#f3f3f7"},
            tabBarIcon: ({color, size}) => <MaterialCommunityIcons name="bookshelf" size={24} color="black" />,
        }}/>
        <Tabs.Screen
          name="insights"
          options={{
            headerTitle: "Insights",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f3f3f7"},
            tabBarIcon: ({color, size}) => <FontAwesome name="bar-chart" size={24} color="black" />,
          }}/>
        <Tabs.Screen
          name="debts"
          options={{
            headerTitle: "Debts",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#f3f3f7"},
            tabBarIcon: ({color, size}) => <FontAwesome name="history" size={24} color="black" />,
          }}/>
          <Tabs.Screen
            name="(settings)"
            options={{
              headerTitle: "Settings",
              headerShadowVisible: false,
              headerStyle: { backgroundColor: "#f3f3f7"},
              headerShown: false,
              tabBarIcon: ({color, size}) => <Ionicons name="settings" size={24} color="black" />,
            }}/>
      </Tabs>
    </Provider>
  )
};

export default Layout;