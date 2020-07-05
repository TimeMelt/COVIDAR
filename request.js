import axios from 'axios';
import {setGlobal} from 'reactn';

// Global data values
export var Data = setGlobal({
  WorldData: {},
  ContinentData: [],
  CountryTimeline: { x: [], y: [] },
  CountryTable: [],
  CountryDashboard: {},
  GlobalTimeline: { x: [], y: [] },
  StatesTable: [],
  StatesDetails: [],
});

// invoke api request
export async function invoke(url) {
  return axios({ method: 'get', url: url})
}

// set timeout/wait duration
export function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

// get data for entire world
export async function getWorldData() {
  var url = 'https://corona.lmao.ninja/v2/all?yesterday';
  const res = invoke(url).then(function (response) {
    setGlobal({WorldData: response.data});
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for global line chart
export async function setGlobalTimeline() {
  var url = `https://corona.lmao.ninja/v2/historical/all`;
  const res = invoke(url).then(function (response) {
    var xVals = Object.keys(response.data.cases);
    var yVals = Object.values(response.data.cases);
    setGlobal({'GlobalTimeline.y': yVals}); // set Y axis values
    setGlobal({'GlobalTimeline.x': xVals}); // set X axis values
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for continent table
export async function setContinentTable() {
  var url = "https://corona.lmao.ninja/v2/continents?yesterday&sort";
  const res = invoke(url).then(function (response) {
    setGlobal({ContinentData: response.data});
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for country table
export async function setCountryTable() {
  var url = "https://corona.lmao.ninja/v2/countries?yesterday&sort";
  const res = invoke(url).then(function (response) {
    setGlobal({CountryTable: response.data});
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for specific country 
export async function setCountryDashboard() {
  var url = `https://corona.lmao.ninja/v2/countries/${countryName}?yesterday=true&strict=true&query`;
  const res = invoke(url).then(function (response) {
    setGlobal({CountryDashboard: response.data});
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for specific countries line chart
export async function setCountryTimeline() {
  var url = `https://corona.lmao.ninja/v2/historical/${countryName}?lastdays=30`;
  const res = invoke(url).then(function (response) {
    var yVals = Object.values(response.data.timeline.cases);
    var xVals =  Object.keys(response.data.timeline.cases);
    setGlobal({'CountryTimeline.y': yVals}); // set Y axis values
    setGlobal({'CountryTimeline.x': xVals}); // set X axis values
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for states table
export async function setStatesTable() {
  var url = "https://corona.lmao.ninja/v2/states?sort&yesterday";
  const res = invoke(url).then(function (response) {
    setGlobal({StatesTable: response.data});
  })
  .catch(function (error) { console.error(error) })
  return res;
}

// get data for specific states details
export async function setStatesDetails() {
  var url = `https://corona.lmao.ninja/v2/states/${stateName}?yesterday=true`;
  const res = invoke(url).then(function (response) {
    setGlobal({StatesDetails: response.data});
  })
  .catch(function (error) { console.error(error) })
  return res;
}