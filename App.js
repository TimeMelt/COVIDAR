import React, {useState, useEffect} from 'react';
import { Text, ActivityIndicator, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { invoke } from './request.js';
import { Surface, Card, Divider } from 'react-native-paper';
import { Continent_Table, Country_Table, State_Table } from './charts.js';
import { styles } from './styles.js';

const Stack = createStackNavigator(); // Create Main Navigator
const Tab = createMaterialBottomTabNavigator(); // Create Tab Navigator
const LoadingIcon = ({ isIconAnimating }) => <ActivityIndicator size="large" color="#00BCD4" animating={isIconAnimating} />;

// Main Router
export default function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="COVIDAR" component={MainTabs} options={{ headerStyle: {backgroundColor: '#78909C'}}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#78909C' }} >
      <Tab.Screen name="World" component={WorldInfo} options={{ tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="earth" color={color} size={26} />)}}/>
      <Tab.Screen name="Countries" component={CountryInfo} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="map" color={color} size={26} />)}}/>
      <Tab.Screen name="States" component={StateInfo} options={{tabBarIcon: ({ color }) => (<MaterialCommunityIcons name="flag" color={color} size={26} />)}}/>
    </Tab.Navigator>
  );
}

// World Tab
const WorldInfo = () => {
  const [data, setData] = useState({});
  var url = 'https://corona.lmao.ninja/v2/all?yesterday';
  function fetchdata() {
    const res = invoke(url).then(function (response) {
      setData(response.data)
    })
    .catch(function (error) { console.error(error) })
    return res;
  } 
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title title='World Info'/>
        <Divider />
        <Card.Actions>
          <Card style={styles.cases_widget} color='green'>
            <Card.Title title='Cases'/>
            <Card.Content><Text style={styles.world_text}>{data.cases}</Text></Card.Content>
          </Card>
          <Card style={styles.deaths_widget}>
            <Card.Title title='Deaths'/>
            <Card.Content><Text style={styles.world_text}>{data.deaths}</Text></Card.Content>
          </Card>
        </Card.Actions>
        <Card.Actions>
          <Card style={styles.recovered_widget}>
            <Card.Title title='Recovered'/>
            <Card.Content><Text style={styles.world_text}>{data.recovered}</Text></Card.Content>
          </Card>
          <Card style={styles.today_widget}>
            <Card.Title title='Today'/>
            <Card.Content><Text style={styles.world_text}>{data.todayCases}</Text></Card.Content>
          </Card>
        </Card.Actions>
      </Card>
      <Text>{'\n'}</Text>
      <Continent_Table />
      <Text>{'\n'}</Text>
    </ScrollView>
  );
}

// Country Tab
function CountryInfo() {
  return (
    <Surface style={styles.chart_container}>
      <Country_Table />
      <Text>{'\n'}</Text>
      <LoadingIcon />
    </Surface>
  );
}

// States Tab
function StateInfo() {
  return (
    <Surface style={styles.chart_container}>
      <State_Table />
      <Text>{'\n'}</Text>
      <LoadingIcon />
    </Surface>
  );
}
