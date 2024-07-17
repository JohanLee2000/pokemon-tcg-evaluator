import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from './src/screens/Home';
import Cart from './src/screens/Cart';
import Settings from './src/screens/Settings';
import Search from './src/screens/Search';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

//Screen Stacks with header stylings
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name='HomeScreen' component={Home} 
      options={{headerTitle: 'Pokémon TCG Evaluator', headerStyle: {backgroundColor: '#FF5733'}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName='SearchScreen'>
      <Stack.Screen name='SearchScreen' component={Search} 
      options={{headerTitle: 'Search for Pokémon', headerStyle: {backgroundColor: '#5982C2'}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName='CartScreen'>
      <Stack.Screen name='CartScreen' component={Cart} 
      options={{headerTitle: 'Cart', headerStyle: {backgroundColor: '#419a49'}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

const SettingsStack = () => {
  return (
    <Stack.Navigator initialRouteName='SettingsScreen'>
      <Stack.Screen name='SettingsScreen' component={Settings} 
      options={{headerTitle: 'Settings', headerStyle: {backgroundColor: '#c3b091'}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider theme={{ version: 2}}>
      <NavigationContainer>
        <Tab.Navigator 
          activeColor="#f0edf6" 
          inactiveColor="#3e2465" 
          barStyle={{ backgroundColor: '#FF5733' }} //Initial tab bar color
          shifting={true} 
        >
          <Tab.Screen
            name="Home"
            component={HomeStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
              tabBarColor: '#FF5733',
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={26} />
              ),
              tabBarColor: '#5982C2'
            }}
          />
          <Tab.Screen
            name="Cart"
            component={CartStack}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="cart" color={color} size={26} />
              ),
              tabBarColor: '#419a49'
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsStack}
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