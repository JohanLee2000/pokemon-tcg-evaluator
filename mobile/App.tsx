import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Provider, PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/screens/Home';
import Profile from './src/screens/Profile';
import Settings from './src/screens/Settings';
import Achievements from './src/screens/Achievements';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider theme={{ version: 2}}>
      <NavigationContainer>
        <Tab.Navigator activeColor="#f0edf6" inactiveColor="#3e2465" barStyle={{ backgroundColor: '#FF5733' }} shifting={true}>
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              tabBarColor: '#FF5733'
            }}
          />
          <Tab.Screen
            name="Achievements"
            component={Achievements}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="trophy" color={color} size={26} />
              ),
              tabBarColor: '#5982C2'
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="account" color={color} size={26} />
              ),
              tabBarColor: '#419a49'
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cog" color={color} size={26} />
              ),
              tabBarColor: '#c3b091'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}