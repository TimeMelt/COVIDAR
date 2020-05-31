import React, { useState, useEffect } from 'react';
import { View, ScrollView, RefreshControl, ActivityIndicator, Text } from 'react-native';
import { Card, Surface, DataTable, ListView, Divider } from 'react-native-paper';
import { styles } from './styles.js';
import { invoke, wait } from './request.js';
import { goToCountryDetails, goToStateDetails} from './router/quickRouter.js';
import { VictoryPie, VictoryContainer, VictoryChart, VictoryLine, VictoryTheme, VictoryAxis, VictoryLabel } from 'victory-native';

const LoadingIcon = ({ isIconAnimating }) => <ActivityIndicator size="large" color="#00BCD4" animating={isIconAnimating} />; // Loading Icon

// Line Chart for Global Cases
export function Global_Line_Chart() {
  const [casesData, setCasesData] = useState([]);
  const [casesCat, setCases] = useState([]);
  var url = `https://corona.lmao.ninja/v2/historical/all`;
  function fetchdata() {
    const res = invoke(url).then(function (response) {
      var cases = response.data.cases;
      setCasesData(Object.values(cases));
      setCases(Object.keys(cases));
    })
    .catch(function (error) { console.error(error) })
    return res;
  } 
  useEffect(() => {
    fetchdata();
  }, []);
  return(
    <View >
      <ScrollView>
        <Text>{'\n'}</Text>
        <Card style={styles.card}>
          <Card.Title title='Global Cases (Past 30 days)' />
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine 
              style={{
                data: { stroke: "blue" },
                parent: { border: "1px solid #ccc"}
              }}
              data = {casesData}
              categories={{ x: casesCat }}
              interpolation="natural"
            />
            <VictoryAxis dependentAxis label="Cases" theme={VictoryTheme.material} axisLabelComponent={<VictoryLabel dy={22} dx={5}/>} tickLabelComponent={<VictoryLabel dy={-5} angle={45}/>}/>
            <VictoryAxis label="Date" fixLabelOverlap={true} theme={VictoryTheme.material} axisLabelComponent={<VictoryLabel dy={-22}/>}/>
          </VictoryChart>
        </Card>
      </ScrollView>
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
export function Country_Table() {
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
                      {data.map(function(data, index) { return <DataTable.Row key={index} onPress={() => goToCountryDetails(data.country)}>
                          <DataTable.Cell >{data.country} </DataTable.Cell>
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

// Detailed info per Country
export function Country_Details() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  var url = `https://corona.lmao.ninja/v2/historical/${countryName}?lastdays=30`;
  function fetchdata() {
      const res = invoke(url).then(function (response) {
        var rr = response.data.timeline.cases;
        setData(Object.values(rr));
        setData2(Object.keys(rr));
      })
      .catch(function (error) { console.error(error) })
      return res;
  } 
  useEffect(() => {
    fetchdata();
  }, []);
  return(
    <View style={styles.container}>
      <ScrollView>
        <Country_Dashboard />
        <Text>{'\n'}</Text>
        <Card style={styles.card}>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine 
              style={{
                data: { stroke: "blue" },
                parent: { border: "1px solid #ccc"}
              }}
              data = {data}
              categories={{ x: data2 }}
              interpolation="natural"
            />
            <VictoryAxis dependentAxis label="Cases" fixLabelOverlap={true} theme={VictoryTheme.material} axisLabelComponent={<VictoryLabel dy={22}/>} tickLabelComponent={<VictoryLabel dy={-5} angle={45}/>}/>
            <VictoryAxis label="Date" fixLabelOverlap={true} theme={VictoryTheme.material} axisLabelComponent={<VictoryLabel dy={-22}/>}/>
          </VictoryChart>
        </Card>
      </ScrollView>
    </View>
  );
}

// Dashboard of info per Country
function Country_Dashboard() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState({});
  var url = `https://corona.lmao.ninja/v2/countries/${countryName}?yesterday=true&strict=true&query`;
  function fetchdata() {
      const res = invoke(url).then(function (response) {
        var rr = response.data;
        setData(rr);
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
    <View >
      <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Card style={styles.card}>
          <Card.Title title={countryName}/>
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
          <Card.Actions>
            <Card style={styles.active_widget}>
              <Card.Title title='Active'/>
              <Card.Content><Text style={styles.world_text}>{data.active}</Text></Card.Content>
            </Card>
            <Card style={styles.critical_widget}>
              <Card.Title title='Critical'/>
              <Card.Content><Text style={styles.world_text}>{data.critical}</Text></Card.Content>
            </Card>
          </Card.Actions>
        </Card>
        <Text>{'\n'}</Text>
        <Card style={styles.card}>
          <VictoryPie 
            colorScale={["#D50000", '#64DD17', "#7b1fa2",]}
            containerComponent={<VictoryContainer responsive={true}/>}
            data={[
              { x: "Deaths", y: data.deaths },
              { x: "Recovered", y: data.recovered },
              { x: "Active", y: data.active },
            ]}
          />
        </Card>
      </ScrollView>
    </View>
  );
}

// Table for States information
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
              {data.map(function(data, index) { return <DataTable.Row key={index} onPress={() => goToStateDetails(data.state)}>
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

// Detailed info per USA state
export function State_Details() {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = useState({});
  var url = `https://corona.lmao.ninja/v2/states/${stateName}?yesterday=true`;
  function fetchdata() {
      const res = invoke(url).then(function (response) {
        var rr = response.data;
        setData(rr);
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
    <View style={styles.container}>
      <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <Card style={styles.card}>
          <Card.Title title={stateName}/>
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
              <Card.Title title='Tests'/>
              <Card.Content><Text style={styles.world_text}>{data.tests}</Text></Card.Content>
            </Card>
            <Card style={styles.today_widget}>
              <Card.Title title='Todays Cases'/>
              <Card.Content><Text style={styles.world_text}>{data.todayCases}</Text></Card.Content>
            </Card>
          </Card.Actions>
          <Card.Actions>
            <Card style={styles.active_widget}>
              <Card.Title title='Active'/>
              <Card.Content><Text style={styles.world_text}>{data.active}</Text></Card.Content>
            </Card>
            <Card style={styles.critical_widget}>
              <Card.Title title='Todays Deaths'/>
              <Card.Content><Text style={styles.world_text}>{data.todayDeaths}</Text></Card.Content>
            </Card>
          </Card.Actions>
        </Card>
        <Text>{'\n'}</Text>
        <Card>
          <VictoryPie 
            colorScale={["#D50000", "#7b1fa2",]}
            data={[
              { x: "Deaths", y: data.deaths },
              { x: "Active", y: data.active },
            ]}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
