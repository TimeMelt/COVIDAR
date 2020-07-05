import React from 'reactn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Surface } from 'react-native-paper';
import { Country_Table, State_Table, Country_Details, State_Details, World_Details} from './charts.js';
import { styles } from './styles.js';
import { NavRef } from './router/Router.js';

const Stack = createStackNavigator(); // Create Main Navigator
const Tab = createMaterialBottomTabNavigator(); // Create Tab Navigator

// Main Navigator
export default function Router() {
  return (
    <NavigationContainer ref={NavRef}>
      <Stack.Navigator>
        <Stack.Screen name="COVIDAR" component={MainTabs} options={{ headerStyle: {backgroundColor: '#78909C'}}}/>
        <Stack.Screen name='Country Details' component={Country_Details} options={{ headerStyle: {backgroundColor: '#78909C'}}}/>
        <Stack.Screen name='State Details' component={State_Details} options={{ headerStyle: {backgroundColor: '#78909C'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#78909C' }} >
      <Tab.Screen name="World" component={WorldInfo} options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="earth" color={color} size={26} />)}}/>
      <Tab.Screen name="Countries" component={CountryInfo} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="pin" color={color} size={26} />)}}/>
      <Tab.Screen name="States" component={StateInfo} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="flag" color={color} size={26} />)}}/>
    </Tab.Navigator>
  );
}

// World Tab
const WorldInfo = () => {
  return(
    <World_Details />
  );
}

// Country Tab
const CountryInfo = () => {
  return (
    <Surface style={styles.chart_container}>
      <Country_Table />
    </Surface>
  );
}

// States Tab
const StateInfo = () => {
  return (
    <Surface style={styles.chart_container}>
      <State_Table />
    </Surface>
  );
}
