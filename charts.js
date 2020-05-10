import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { Card, Surface, DataTable } from 'react-native-paper';
import { styles } from './styles.js';
import { invoke, wait } from './request.js';

const LoadingIcon = ({ isIconAnimating }) => <ActivityIndicator size="large" color="#00BCD4" animating={isIconAnimating} />;

// TAble for States information
export const State_Table = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    var url = "https://corona.lmao.ninja/v2/states?sort&yesterday";
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
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchdata()
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    return(
      <View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Card style={styles.card}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>State</DataTable.Title>
                <DataTable.Title numeric>Cases</DataTable.Title>
                <DataTable.Title numeric>Deaths</DataTable.Title>
                <DataTable.Title numeric>Active</DataTable.Title>
              </DataTable.Header>
              <ScrollView >
                  {data.map(function(data, index) { return <DataTable.Row key={index}>
                      <DataTable.Cell>{data.state}</DataTable.Cell>
                      <DataTable.Cell numeric>{data.cases}</DataTable.Cell>
                      <DataTable.Cell numeric>{data.deaths}</DataTable.Cell>
                      <DataTable.Cell numeric>{data.active}</DataTable.Cell>
                  </DataTable.Row>})}
              </ScrollView>
            </DataTable>
          </Card>
        </ScrollView>
        <Text>{'\n'}</Text>
        <LoadingIcon />
      </View>
    );
}

// Table for Continent Information
export const Continent_Table = () => {
    const [data, setData] = useState([]);
    var url = "https://corona.lmao.ninja/v2/continents?yesterday&sort";
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
    return(
      <Surface style={styles.mini_chart}>
        <Card style={styles.card}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Continent</DataTable.Title>
              <DataTable.Title numeric>Cases</DataTable.Title>
              <DataTable.Title numeric>Deaths</DataTable.Title>
              <DataTable.Title numeric>Recovered</DataTable.Title>
            </DataTable.Header>
            
            
            {data.map(function(data, index) { return <DataTable.Row key={index}>
                <DataTable.Cell>{data.continent}</DataTable.Cell>
                <DataTable.Cell numeric>{data.cases}</DataTable.Cell>
                <DataTable.Cell numeric>{data.deaths}</DataTable.Cell>
                <DataTable.Cell numeric>{data.recovered}</DataTable.Cell>
            </DataTable.Row>})}
            
          </DataTable>
        </Card>
      </Surface>
    );
}


// Table for Country Information
export const Country_Table = () => {
    const [refreshing, setRefreshing] = React.useState(false);
    const [data, setData] = useState([]);
    var url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
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
    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetchdata()
      wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    return(
      <View>
        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <Card style={styles.card}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title>Country</DataTable.Title>
                <DataTable.Title numeric>Cases</DataTable.Title>
                  <DataTable.Title numeric>Deaths</DataTable.Title>
                  <DataTable.Title numeric>Recovered</DataTable.Title>
                  </DataTable.Header>
                  
                  <ScrollView >
                      {data.map(function(data, index) { return <DataTable.Row key={index}>
                          <DataTable.Cell>{data.country}</DataTable.Cell>
                          <DataTable.Cell numeric>{data.cases}</DataTable.Cell>
                          <DataTable.Cell numeric>>{data.deaths}</DataTable.Cell>
                          <DataTable.Cell numeric>>{data.recovered}</DataTable.Cell>
                      </DataTable.Row>})}
                  </ScrollView>         
              </DataTable>
          </Card>
        </ScrollView>
        <Text>{'\n'}</Text>
        <LoadingIcon />
      </View>
    );
}