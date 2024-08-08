import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { createStackNavigator } from "@react-navigation/stack";
import { PaperProvider } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from 'src/assets/styles';

import { CollectionCartProvider } from './src/components/CollectionCartContext'; 

import Home from './src/screens/Home';
import Cart from './src/screens/Cart';
import Cards from './src/screens/Cards';
import Search from './src/screens/Search';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

//Screen Stacks with header stylings
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen'>
      <Stack.Screen name='HomeScreen' component={Home} 
      options={{headerTitle: 'Pokémon TCG Evaluator', headerStyle: {backgroundColor: colors.orange}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName='SearchScreen'>
      <Stack.Screen name='SearchScreen' component={Search} 
      options={{headerTitle: 'Search for Pokémon', headerStyle: {backgroundColor: colors.blue}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

const CardsStack = () => {
  return (
    <Stack.Navigator initialRouteName='CardsScreen'>
      <Stack.Screen name='CardsScreen' component={Cards} 
      options={{headerTitle: 'Cards', headerStyle: {backgroundColor: colors.green}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName='CartScreen'>
      <Stack.Screen name='CartScreen' component={Cart} 
      options={{headerTitle: 'Cart', headerStyle: {backgroundColor: colors.beige}, headerTitleAlign: 'center'}}/>
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <CollectionCartProvider>
      <PaperProvider theme={{ version: 2}}>
        <NavigationContainer>
          <Tab.Navigator 
            activeColor="#f0edf6" 
            inactiveColor="#3e2465" 
            barStyle={{ backgroundColor: colors.orange }} //Initial tab bar color
            shifting={true} 
          >
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
                tabBarColor: colors.orange,
              }}
            />
            <Tab.Screen
              name="Search"
              component={SearchStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="magnify" color={color} size={26} />
                ),
                tabBarColor: colors.blue
              }}
            />
            <Tab.Screen
              name="Cards"
              component={CardsStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="cards" color={color} size={26} />
                ),
                tabBarColor: colors.green
              }}
            />
            <Tab.Screen
              name="Cart"
              component={CartStack}
              options={{
                tabBarIcon: ({ color }) => (
                  <MaterialCommunityIcons name="cart" color={color} size={26} />
                ),
                tabBarColor: colors.beige
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </CollectionCartProvider>
  );
}